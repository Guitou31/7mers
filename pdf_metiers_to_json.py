"""Parse le PDF '04 Métiers (15-11-14).pdf' → metiers.json + metiers.js.

Structure par métier :
- CopperplateGothic-Light : nom du métier
- DominicanItalic : section headers (Supplément d'origine, Catégories, Description,
  Compétences de base, Compétences avancées, Réputation)
- BookAntiqua : contenu

Note : tous les métiers du PDF sont 'autorisés sans restriction à la création'.
"""

import json
import re
import unicodedata
from pathlib import Path

import fitz  # type: ignore

SOURCE_PDF = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Légendes de la 7ème mer\04 Métiers (15-11-14).pdf"
)
DEST_DIR = Path(__file__).parent
DEST_JSON = DEST_DIR / "metiers.json"
DEST_JS = DEST_DIR / "metiers.js"

# Normalisation des catégories. Le matching ignore casse / accents / apostrophes typographiques.
CATEGORIE_NORMALIZE = {
    "Métiers des arts":         "Métiers des Arts",
    "Métiers des armes":        "Métiers des Armes",
    "Métiers d'Orateur":        "Métiers d’Orateurs",   # singulier → pluriel, apostrophe typo
    "Métier du Réconfort":      "Métiers du Réconfort", # singulier → pluriel
    "métiers de serviteurs":    "Métiers de Serviteurs",
}


def _normkey(s: str) -> str:
    """Clé de comparaison insensible casse/accents/apostrophes pour les catégories."""
    nfkd = unicodedata.normalize("NFKD", s)
    no_acc = "".join(c for c in nfkd if not unicodedata.combining(c))
    return no_acc.lower().replace("’", "'").replace("‘", "'").strip()


# Pré-calcule un index inversé pour matching rapide
_CAT_NORMALIZE_INDEX = {_normkey(k): v for k, v in CATEGORIE_NORMALIZE.items()}


def normaliser_categorie(cat: str) -> str:
    cat = cat.strip()
    key = _normkey(cat)
    if key in _CAT_NORMALIZE_INDEX:
        return _CAT_NORMALIZE_INDEX[key]
    return cat


def split_categories(text: str) -> list[str]:
    """Découpe 'Métiers des Armes et Métiers de la Maraude.' en 2 catégories.
    Sépare sur ',', '.' et ' et '. Applique CATEGORIE_NORMALIZE.
    """
    if not text or not text.strip():
        return []
    text = text.strip().rstrip(".")
    # Split sur , . ou " et " (mot isolé)
    parts = re.split(r"\s*,\s*|\s+et\s+", text)
    out: list[str] = []
    seen: set[str] = set()
    for p in parts:
        p = clean_text(p).rstrip(".")
        if not p:
            continue
        p = normaliser_categorie(p)
        if p not in seen:
            seen.add(p)
            out.append(p)
    return out


SECTION_TITLES = {
    "supplement d'origine", "supplément d'origine",
    "categories", "catégories", "categorie", "catégorie",
    "description",
    "competences de base", "compétences de base",
    "competences avancees", "compétences avancées",
    "reputation", "réputation",
}


def norm(s: str) -> str:
    nfkd = unicodedata.normalize("NFKD", s)
    no_acc = "".join(c for c in nfkd if not unicodedata.combining(c))
    no_acc = no_acc.replace("’", "'").replace("‘", "'").replace(" ", " ")
    return re.sub(r"\s+", " ", no_acc.lower()).strip().rstrip(":")


def clean_text(s: str) -> str:
    if not s:
        return ""
    return re.sub(r"\s+", " ", s).strip()


# Mots-clés indiquant qu'un fragment est une phrase explicative (encart N.B.)
# et non une vraie compétence. Matching insensible à la casse.
_PHRASE_PARASITE_KEYWORDS = (
    "indicat",          # 'toutes ces compétences sont indicatives'
    "il en existe",     # 'il en existe de nombreuses autres'
    "acquérir",         # 'vous pouvez acquérir d'autres…'
    "acquerir",
    "vous pouvez",      # 'vous pouvez en acquérir d'autres…'
    "pp par rang",      # 'à raison d'un PP par rang'
    "pp chacune",
    "rang 1 pour",      # 'rang 1 pour 1 PP'
    "1 pp",             # 'au prix de 1 PP par rang'
    "compétences sont",
    "competences sont",
    "compétence sont",
    "au prix de",
    "en fonction de",   # 'en fonction de la compétence de base' (séquelle parens cassées)
    "au choix",         # 'une compétence de base d'Artisan au choix' (Gitan av.)
)


def _is_phrase_parasite(s: str) -> bool:
    """Détecte un fragment qui est en réalité un morceau de note 'N.B.'
    (ex: 'Toutes ces compétences sont indicatives', 'N', 'B', 'PP par rang')."""
    if len(s) < 3:  # filtre fragments 'N', 'B' (issus de 'N.B.')
        return True
    s_low = s.lower().strip()
    if s_low in ("etc", "etc."):  # 'etc' n'est pas une compétence
        return True
    return any(pat in s_low for pat in _PHRASE_PARASITE_KEYWORDS)


# 'parmi :' marque une liste de choix dans le PDF.
_PARMI_RE = re.compile(r"\bparmi\s*:\s*", re.IGNORECASE)
# Capture 'Vraie compétence et une|N compétence(s)…' (instruction collée à une vraie comp).
_ET_COMPETENCE_INSTRUCTION_RE = re.compile(
    r"^(.+?)\s+et\s+(?:une|deux|trois|plusieurs|\d+)\s+comp[eé]tences?\b",
    re.IGNORECASE,
)


def _strip_competence_instruction(p: str) -> list[str]:
    """Nettoie un fragment du type :
    - 'X compétences au rang Y parmi : NomA' → ['NomA']
    - 'Évaluation et une compétence artisanale au rang 2 parmi : Aubergiste' → ['Évaluation', 'Aubergiste']
    - 'Spectacle de rue et une compétence de base d'Artisan au choix' → ['Spectacle de rue']
    - sinon : [fragment] inchangé.
    """
    m_parmi = _PARMI_RE.search(p)
    if m_parmi:
        before = p[:m_parmi.start()].strip()
        after = p[m_parmi.end():].strip()
        out = []
        m_et = _ET_COMPETENCE_INSTRUCTION_RE.match(before)
        if m_et:
            real = m_et.group(1).strip()
            if real and not _is_phrase_parasite(real):
                out.append(real)
        if after and not _is_phrase_parasite(after):
            out.append(after)
        return out
    # Pas de "parmi :" mais éventuellement "X et une|N compétence…" en suffixe d'instruction.
    m_et2 = _ET_COMPETENCE_INSTRUCTION_RE.match(p)
    if m_et2:
        real = m_et2.group(1).strip()
        return [real] if real and not _is_phrase_parasite(real) else []
    return [p]


def split_competences(text: str) -> list[str]:
    if not text or not text.strip():
        return []
    text = text.strip().rstrip(".").rstrip(",")
    parts = re.split(r"\s*[,.]\s*", text)
    out: list[str] = []
    seen: set[str] = set()
    for p in parts:
        p_clean = clean_text(p)
        if not p_clean or _is_phrase_parasite(p_clean):
            continue
        for sub in _strip_competence_instruction(p_clean):
            sub = clean_text(sub)
            key = sub.lower()
            if sub and not _is_phrase_parasite(sub) and key not in seen:
                seen.add(key)
                out.append(sub)
    return out


def iter_spans(pdf_path: Path):
    doc = fitz.open(str(pdf_path))
    for page_num, page in enumerate(doc, start=1):
        for blk in page.get_text("dict")["blocks"]:
            if blk.get("type") != 0:
                continue
            for line in blk.get("lines", []):
                y = line["bbox"][1]
                for span in line.get("spans", []):
                    yield page_num, span, y


def parse_pdf(pdf_path: Path) -> list[dict]:
    metiers: list[dict] = []
    current_categorie_creation: str = "libre"
    current_metier: dict | None = None
    current_section: str | None = None
    pending_name: list[str] = []
    pending_heading: list[str] = []
    buffer_text: list[str] = []
    in_metier_section = False  # devient True après l'en-tête "Métiers autorisés..."

    def commit_section():
        nonlocal buffer_text
        if current_metier is None or current_section is None:
            buffer_text = []
            return
        text = clean_text(" ".join(buffer_text))
        # 'Supplément d'origine' : section reconnue comme délimiteur mais NON stockée
        # (info inutile aux joueurs, et certains suppléments sont introuvables).
        if current_section in ("supplement d'origine", "supplément d'origine"):
            pass
        elif current_section in ("categories", "catégories", "categorie", "catégorie"):
            current_metier["categories"] = split_categories(text)
        elif current_section == "description":
            current_metier["description"] = text
        elif current_section in ("competences de base", "compétences de base"):
            current_metier["competences_base"] = split_competences(text)
        elif current_section in ("competences avancees", "compétences avancées"):
            current_metier["competences_avancees"] = split_competences(text)
        elif current_section in ("reputation", "réputation"):
            current_metier["reputation"] = text
        buffer_text = []

    def commit_metier():
        nonlocal current_metier, current_section
        if current_metier is None:
            return
        commit_section()
        # Filtre : doit avoir une description ou des compétences pour être validé
        if (current_metier.get("description") or current_metier.get("competences_base")
                or current_metier.get("competences_avancees")):
            current_metier.setdefault("restriction_creation", current_categorie_creation)
            metiers.append(current_metier)
        current_metier = None
        current_section = None

    def finalize_pending_name():
        nonlocal current_metier, pending_name
        if not pending_name:
            return
        nom = clean_text(" ".join(pending_name))
        pending_name = []
        commit_metier()
        current_metier = {"nom": nom}

    for page_num, span, y in iter_spans(pdf_path):
        txt = span["text"]
        if not txt.strip():
            continue

        # En-tête de section restriction (CopperplateGothic-Bold)
        if "CopperplateGothic" in span["font"] and "Bold" in span["font"]:
            tnorm = norm(txt)
            if "metiers autorises" in tnorm or "métiers autorisés" in tnorm or "sans restriction" in tnorm:
                current_categorie_creation = "libre"
                in_metier_section = True
            elif "limit" in tnorm and "creation" in tnorm:
                current_categorie_creation = "limitee"
                in_metier_section = True
            elif "interdit" in tnorm and "creation" in tnorm:
                current_categorie_creation = "interdite"
                in_metier_section = True
            continue

        # Nom de métier (CopperplateGothic-Light)
        if "CopperplateGothic" in span["font"] and "Light" in span["font"]:
            pending_name.append(clean_text(txt))
            continue

        if pending_name:
            finalize_pending_name()

        # Skip headers/footers
        if span["font"] == "ElGar":
            continue

        if not in_metier_section:
            continue

        is_dominican = "Dominican" in span["font"]

        # Titre de section (DominicanItalic, possiblement multi-spans)
        if is_dominican:
            pending_heading.append(clean_text(txt))
            joined_norm = norm(" ".join(pending_heading))
            if joined_norm in SECTION_TITLES:
                commit_section()
                current_section = joined_norm
                pending_heading = []
            elif len(pending_heading) > 4:
                pending_heading = pending_heading[-3:]
            continue

        # Tout non-Dominican abandonne la tentative heading
        pending_heading = []

        # Texte normal dans une section
        if current_metier is not None and current_section is not None:
            buffer_text.append(txt)

    if pending_name:
        finalize_pending_name()
    commit_metier()
    return metiers


# ============================================================
# Overrides maison : restrictions, suppressions, modifications
# ============================================================

METIERS_SUPPRIMES = {"Conférencier", "Aérostier", "Seigneur du crime"}

# Overrides manuels des compétences pour les métiers atypiques
# (parsing PDF imparfait OU structure 'X compétences au choix parmi N').
#
# Format par métier (toutes les clés sont optionnelles) :
#   competences_base / competences_avancees : liste FIXE qui REMPLACE la valeur parsée.
#   competences_base_choix / competences_avancees_choix : structure 'choix' :
#     { "nb": N, "options": [...], "note": "..." (optionnel) }
#
# Lookup côté UI : 'Une compétence d'artisan au choix' = vrai nom dans
# competences.json, donc rendu cliquable via findCompetence.
METIERS_COMPETENCES_OVERRIDES: dict[str, dict] = {
    "Shirbaz (magicien)": {
        # Mal lues par le parser (capturées comme description).
        "competences_base": ["Éloquence", "Étiquette", "Mode"],
    },
    "Galérien": {
        # Idem : seul Qui-vive + un choix d'artisan.
        "competences_base": ["Qui-vive", "Une compétence d'artisan au choix"],
    },
    "Contrebandier": {
        # 2 base fixes + 1 choix (contrebandier terrestre OU marin).
        "competences_base": ["Déplacement silencieux", "Évaluation"],
        "competences_base_choix": {
            "nb": 1,
            "options": [
                "Connaissance des routes (nation à préciser)",
                "Canotage",
            ],
            "note": "Connaissance des routes pour un contrebandier terrestre, "
                    "Canotage pour un contrebandier marin (Nation à préciser dans les deux cas).",
        },
        # 10 avancées + le même choix (pour ajouter une 2ème Nation).
        "competences_avancees": [
            "Conduite d’attelage",
            "Connaissance des bas-fonds (cité)",
            "Corruption",
            "Dissimulation",
            "Falsification",
            "Fouille",
            "Guet-apens",
            "Marchandage",
            "Qui-vive",
        ],
        "competences_avancees_choix": {
            "nb": 1,
            "options": [
                "Connaissance des routes (nation à préciser)",
                "Canotage",
            ],
            "note": "Permet de choisir une deuxième Nation (alternative à la compétence de base ci-dessus).",
        },
    },
    "Gitan": {
        "competences_base": [],
        "competences_base_choix": {
            "nb": 3,
            "options": [
                "Conduite d’attelage", "Danse", "Sens de l’orientation", "Sincérité", "Duperie",
            ],
        },
    },
    "Artiste": {
        "competences_base": [],
        "competences_base_choix": {
            "nb": 3,
            "options": [
                "Chant", "Compositeur", "Création littéraire", "Dessin",
                "Musique (instrument)", "Sculpture",
            ],
        },
    },
    "Gwai Liao (Bureaucrate)": {
        "competences_base": [],
        "competences_base_choix": {
            "nb": 3,
            "options": [
                "Calcul", "Création littéraire", "Éloquence", "Étiquette", "Mode", "Recherches",
            ],
        },
    },
    "Rahib (Moine)": {
        "competences_base": [],
        "competences_base_choix": {
            "nb": 3,
            "options": [
                "Calligraphie", "Chant", "Création littéraire", "Discrétion",
                "Histoire", "Philosophie",
            ],
        },
    },
    "Courtisane": {
        "competences_base": [],
        "competences_base_choix": {
            "nb": 3,
            "options": [
                "Danse", "Étiquette", "Jenny", "Masseur", "Mode", "Séduction",
            ],
        },
    },
}

# Restrictions : (type_filtre, texte_affiché). type = 'nationalite' | 'societe'.
METIERS_RESTRICTIONS: dict[str, tuple[str, str]] = {
    # --- Nationalité ---
    "Baleinier":              ("nationalite", "Être de nationalité Vesten ou Rahuri (Nations Pirates)."),
    "Barde":                  ("nationalite", "Être de nationalité avalonienne, inish ou highlander."),
    "Bonne aventure":         ("nationalite", "Être de nationalité cathayane, ou appartenir au peuple des Fidhelis (Sarmatie ou Ussura)."),
    "Cao Yao (Acupuncteur)":  ("nationalite", "Être de nationalité cathayane."),
    "Caravanier":             ("nationalite", "Être de nationalité cathayane, croissantine, sarmatienne ou ussurane."),
    "Courtisane":             ("nationalite", "Être une femme, de nationalité vodacce ou croissantine."),
    "Fauconnier":             ("nationalite", "Être de nationalité ussurane, sarmatienne ou khazari (Cathay)."),
    "Feng Shui Shi (Géomancien)": ("nationalite", "Être de nationalité cathayane."),
    "Gitan":                  ("nationalite", "Appartenir au peuple des Fidhelis (Sarmatie ou Ussura)."),
    "Guérisseur":             ("nationalite", "Être de nationalité rahuri, du Nouveau Monde ou des 1000 Nations."),
    "Gwai Liao (Bureaucrate)": ("nationalite", "Être de nationalité cathayane."),
    "Rahib (Moine)":          ("nationalite", "Être de nationalité croissantine."),
    "Shirbaz (magicien)":     ("nationalite", "Être de nationalité croissantine."),
    "Skalde":                 ("nationalite", "Être de nationalité vesten."),
    "Torero":                 ("nationalite", "Être de nationalité castillane."),
    "Légionnaire":            ("nationalite", "Être originaire de La Numa (Nations Pirates)."),
    # --- Société / appartenance ---
    "Acolyte":                ("societe", "Faire partie de la Société Secrète des Kreuzritter."),
    "Archéologue":            ("societe", "Faire partie de la Société des Explorateurs."),
    "Pauvre Chevalier":       ("societe", "Faire partie de la Société Secrète des Chevaliers de la Rose et de la Croix."),
    "Rasoir":                 ("societe", "Être membre des Rasoirs."),
    "Chevalier":              ("societe", "Être membre d'un Ordre de chevalerie ou mousquetaire de Montaigne."),
    "Dilettante":             ("societe", "Être d'origine noble."),
    "Maître d’armes":         ("societe", "Être Maître dans au moins une école d'Escrime."),
}

PARAGRAPHE_BALEINIER = (
    "Du côté de la mer Atabéenne, toute la faune marine est plus monstrueuse et "
    "terrifiante que la normale. Poissons et autres créatures maritimes d'ordinaire "
    "paisibles sont plus grands et généralement plus agressifs. Les prédateurs que "
    "produit cet océan sont d'une taille obscène, dotés de gueules, de pics et de "
    "tentacules capables de briser un homme adulte comme un rien, voire de tirer des "
    "vaisseaux entiers dans les profondeurs. Parmi les Rahuris, les pêcheurs et les "
    "marins sont très respectés et honorés en tant que puissants guerriers et "
    "pourvoyeurs. Quiconque choisit de prendre la Mer pour y chasser des monstres "
    "exécute la volonté des dieux."
)


def _nk(s: str) -> str:
    """Clé de comparaison de nom : sans accents, minuscule, apostrophes normalisées."""
    nfkd = unicodedata.normalize("NFKD", s or "")
    no_acc = "".join(c for c in nfkd if not unicodedata.combining(c))
    return re.sub(r"\s+", " ", no_acc.lower().replace("’", "'").replace("‘", "'")).strip()


def appliquer_overrides(metiers: list[dict]) -> list[dict]:
    """Applique suppressions, restrictions et modifications maison après parsing."""
    supprimes = {_nk(s) for s in METIERS_SUPPRIMES}
    restrictions = {_nk(k): v for k, v in METIERS_RESTRICTIONS.items()}
    vus_restriction: set[str] = set()
    vus_suppression: set[str] = set()

    result: list[dict] = []
    for m in metiers:
        nk = _nk(m["nom"])
        if nk in supprimes:
            vus_suppression.add(nk)
            continue
        if nk in restrictions:
            rtype, rtexte = restrictions[nk]
            m["restriction_type"] = rtype
            m["restriction_texte"] = rtexte
            vus_restriction.add(nk)
        else:
            m["restriction_type"] = "aucune"
            m["restriction_texte"] = ""
        result.append(m)

    # Modifications spéciales : Baleinier
    for m in result:
        if _nk(m["nom"]) == _nk("Baleinier"):
            desc = (m.get("description", "") or "").rstrip()
            m["description"] = (desc + "\n\n" + PARAGRAPHE_BALEINIER).strip()
            # Compétence de base : retirer "Connaissance des nœuds", ajouter "Lancer (Lance)"
            base = [c for c in m.get("competences_base", []) if _nk(c) != _nk("Connaissance des nœuds")]
            if not any(_nk(c) == _nk("Lancer (Lance)") for c in base):
                base.append("Lancer (Lance)")
            m["competences_base"] = base
            # Compétences avancées : ajouter "Connaissance des nœuds" + "Attaque (Lance)"
            av = list(m.get("competences_avancees", []))
            if not any(_nk(c) == _nk("Connaissance des nœuds") for c in av):
                av.append("Connaissance des nœuds")
            if not any(_nk(c) == _nk("Attaque (Lance)") for c in av):
                av.append("Attaque (Lance)")
            m["competences_avancees"] = av

    # Overrides de compétences (Shirbaz, Galérien, Contrebandier, Gitan, Artiste,
    # Gwai Liao, Rahib, Courtisane) — voir METIERS_COMPETENCES_OVERRIDES.
    comp_overrides = {_nk(k): (k, v) for k, v in METIERS_COMPETENCES_OVERRIDES.items()}
    vus_comp: set[str] = set()
    for m in result:
        nk = _nk(m["nom"])
        if nk in comp_overrides:
            vus_comp.add(nk)
            _, override = comp_overrides[nk]
            for key in ("competences_base", "competences_avancees",
                        "competences_base_choix", "competences_avancees_choix"):
                if key in override:
                    m[key] = override[key]
    for nk, (k, _) in comp_overrides.items():
        if nk not in vus_comp:
            print(f"  [!] Override compétences non appliqué (métier introuvable) : '{k}'")

    # Avertissements si une clé d'override n'a matché aucun métier (typo possible)
    for k in restrictions:
        if k not in vus_restriction:
            print(f"  [!] Restriction non appliquée (métier introuvable) : '{k}'")
    for s in supprimes:
        if s not in vus_suppression:
            print(f"  [!] Suppression non appliquée (métier introuvable) : '{s}'")

    return result


def main() -> None:
    print("Parsing PDF Métiers…")
    metiers = parse_pdf(SOURCE_PDF)
    print(f"  {len(metiers)} métiers extraits")

    print("Application des overrides (restrictions, suppressions, Baleinier)…")
    metiers = appliquer_overrides(metiers)
    print(f"  {len(metiers)} métiers après suppressions")

    # Stats catégories (qui sont DANS chaque métier, pas en pré-passe)
    from collections import Counter
    rest_count = Counter(m.get("restriction_type", "aucune") for m in metiers)
    print(f"  Restrictions : {dict(rest_count)}")
    all_cats = Counter()
    for m in metiers:
        for cat in m.get("categories", []):
            all_cats[cat] += 1
    print(f"\n  {len(all_cats)} catégories distinctes :")
    for cat, n in sorted(all_cats.items(), key=lambda x: -x[1]):
        print(f"    {cat:40} : {n}")

    sans_cat = [m["nom"] for m in metiers if not m.get("categories")]
    if sans_cat:
        print(f"\n  [!] {len(sans_cat)} métiers sans catégorie : {sans_cat[:10]}{'…' if len(sans_cat) > 10 else ''}")

    data = {
        "_meta": {
            "source": SOURCE_PDF.name,
            "nb_metiers": len(metiers),
            "categories": sorted(all_cats.keys()),
        },
        "metiers": metiers,
    }
    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    DEST_JSON.write_text(json_text, encoding="utf-8")
    DEST_JS.write_text(
        f"// Généré par pdf_metiers_to_json.py — ne pas éditer à la main\n"
        f"window.METIERS_DATA = {json_text};\n",
        encoding="utf-8",
    )
    print(f"\nOK -> {DEST_JSON}")
    print(f"OK -> {DEST_JS}")


if __name__ == "__main__":
    main()
