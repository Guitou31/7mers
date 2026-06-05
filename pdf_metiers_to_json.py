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

# Normalisations de noms de compétences référencés par les métiers.
# Appliqué aux competences_base et competences_avancees + aux options des choix.
# Patterns :
#   - 'X (cité…)' → 'X (Nation à préciser)' pour les 3 compétences voyageuses
#   - Fautes de casse classiques du PDF (Guet- apens, bas- fonds, Pique- assiette)
COMPETENCES_REF_NORMALISATIONS: list[tuple[str, str]] = [
    # Cité → Nation (compétence canonique = (Nation à préciser))
    (r"^Connaissance\s+des\s+bas[-\s]+fonds\s*\(\s*cit[ée]\s*(?:à\s+préciser)?\s*\)$",
     "Connaissance des bas-fonds (Nation à préciser)"),
    (r"^Contacts\s*\(\s*cit[ée]\s*(?:à\s+préciser)?\s*\)$",
     "Contacts (Nation à préciser)"),
    (r"^Orientation\s+citadine\s*\(\s*cit[ée]\s*(?:à\s+préciser)?\s*\)$",
     "Orientation citadine (Nation à préciser)"),
    # Fautes de casse (espace après tiret)
    (r"^Guet[-\s]+apens$",          "Guet-apens"),
    (r"^Pique[-\s]+assiette$",      "Pique-assiette"),
    (r"^Connaissance\s+des\s+bas[-\s]+fonds(\s*\(.+\))?$",
     r"Connaissance des bas-fonds\1"),
    (r"^Qui[-\s]+vive$",            "Qui-vive"),
    # Méta-compétences "à préciser" : forme abrégée → canonique cliquable
    (r"^Équitation$",
     "Équitation (type d’animal à préciser s’il ne s’agit pas de chevaux)"),
    (r"^Musique\s*\(\s*instrument(?:\s+au\s+choix)?\s*\)$",
     "Musique (type d’instrument à préciser)"),
    (r"^Connaissance\s+des\s+routes\s*\(\s*[Nn]ation\s*\)$",
     "Connaissance des routes (nation à préciser)"),
    (r"^Contacts\s*\(\s*Nation\s*\)$",
     "Contacts (Nation à préciser)"),
    (r"^Potamologie\s*\(\s*fleuve\s*\)$",
     "Potamologie (fleuve à préciser)"),
    # Soin(s) des [animal X] → compétence canonique unique
    # (toutes les variantes : chevaux, chiens, oiseaux, bovins, etc. + sans suffixe)
    (r"^Soins?\s+des?\s+(?:animaux|chevaux|chiens|oiseaux|bovins|chats|rats)(?:\s*\([^)]*\))?$",
     "Soin des animaux (type d’animal à préciser)"),
    # Qualificatifs "(X uniquement)" : la compétence canonique n'en a pas
    (r"^Géomancie\s*\(.+?uniquement\)$",                              "Géomancie"),
    (r"^I\s+Ching\s*\(.+?uniquement\)$",                              "I Ching"),
    (r"^Lancer\s+de\s+fusée\s*\(.+?uniquement\)$",                    "Lancer de fusée"),
    (r"^Sher\s+[Dd]a\s+Shi(\s*\(.+?\))?$",
     "Sher da Shi (Charmeur de serpents)"),
    (r"^Conduite\s+de\s+traîneaux?(\s*\(.+?\))?$",                    "Conduite de traîneau"),
    (r"^Fabricant\s+de\s+cerfs-volants\s*\(.+?uniquement\)$",         "Fabricant de cerfs-volants"),
    (r"^Fabricant\s+de\s+feux\s+d[’']artifice\s*\(.+?uniquement\)$",  "Fabricant de feux d’artifice"),
    (r"^Fabricant\s+d[’']Armes?\s+à\s+feu$",                          "Fabricant d’arme à feu"),
    # Pluriel/singulier + fautes courantes
    (r"^Mèche$",                                                       "Mèches"),
    (r"^Tailleur\s+de\s+pierres$",                                     "Tailleur de pierre"),
    (r"^Premier\s+[Ss]ecours$",                                        "Premiers secours"),
    (r"^Fabrication\s+d[’']armes?\s+à\s+feu$",                         "Fabricant d’arme à feu"),
    # Espaces manquants/excessifs autour des parenthèses (X(Arc) → X (Arc))
    (r"^(Attaque|Tirer|Recharger|Lancer)\s*\(\s*([^)]+?)\s*\)$",      r"\1 (\2)"),
    # Recharger (X) : règle maison universelle → display 'Recharger' simple
    # (lien résolu vers la canonique 'Recharger (Type d'armes à préciser)' via findCompetence).
    (r"^Recharger\s*\(.+?\)$",                                          "Recharger"),
]

import re as _re_norm
_COMPETENCES_REF_NORM_RX = [(_re_norm.compile(p), r) for p, r in COMPETENCES_REF_NORMALISATIONS]


def normaliser_ref_competence(nom: str) -> str:
    """Applique les normalisations (cité→Nation, fautes de casse) à un nom de compétence."""
    for rx, repl in _COMPETENCES_REF_NORM_RX:
        m = rx.match(nom)
        if m:
            return rx.sub(repl, nom)
    return nom


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
ARTISAN_SPECIALITES = [
    "Aubergiste", "Barbier", "Boucher", "Bouilleur de cru", "Boulanger", "Brasseur",
    "Calligraphe", "Céramiste", "Chandelon", "Chapelier", "Charpentier", "Chaudronnier",
    "Confiseur", "Construction navale", "Cordonnier", "Couturier", "Cuisinier",
    "Ébéniste", "Écrivain public", "Embaumeur", "Éventailliste",
    "Fabricant d’arme à feu", "Fabricant de cerfs-volants", "Fabricant de dards",
    "Fabricant de feux d’artifice", "Fabricant de vitraux", "Fabricant de voiles",
    "Facteur d’arcs", "Fileur", "Fleuriste", "Forgeron", "Fourreur", "Haubergier",
    "Horloger", "Imprimeur", "Jardinier", "Joaillier", "Luthier", "Masseur", "Maçon",
    "Meunier", "Miroitier", "Orfèvre", "Papetier", "Parfumeur", "Perruquier", "Potier",
    "Poudrier", "Régisseur", "Sabotier", "Savonnier", "Sellier", "Serrurier",
    "Souffleur de verre", "Tailleur", "Tailleur de pierre", "Tanner", "Teinturier",
    "Tisserand", "Tonnelier", "Vannier", "Vigneron",
]


METIERS_COMPETENCES_OVERRIDES: dict[str, dict] = {
    "Artisan": {
        # 1 fixe + 2 choix : Service/Bricoleur (selon le métier exercé) + 1 spécialité
        "competences_base": ["Sens des affaires"],
        "competences_base_choix": [
            {
                "nb": 1,
                "options": ["Service", "Bricoleur"],
                "note": "Selon le métier exercé (Service pour les artisans à clientèle, "
                        "Bricoleur pour les fabricants).",
            },
            {
                "nb": 1,
                "options": list(ARTISAN_SPECIALITES),
                "note": "Liste non exhaustive — choisis ta spécialité artisanale.",
            },
        ],
        # Les avancées ne sont pas encore définies par Guillaume — on laisse celles du PDF.
    },
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

# ============================================================
# Modifications déclaratives des métiers (corrections du docx "Correction
# des compétences des métiers"). Appliquées APRÈS la normalisation
# (cité→Nation, fautes de casse) et APRÈS les COMPETENCES_OVERRIDES.
#
# Opérations supportées par métier (toutes optionnelles) :
#   retirer_base / retirer_av     : liste de noms à supprimer
#   ajouter_base / ajouter_av     : liste de noms à ajouter (à la fin)
#   remplacer_base / remplacer_av : liste de (ancien, nouveau)
#   set_base / set_av             : liste qui REMPLACE entièrement
#   deplacer_av_vers_base         : liste de noms à déplacer av → base
#   set_base_choix / set_av_choix : dict {nb, options, note?}
#   retirer_dans_description      : substring à retirer (paragraphe parasite)
#   retirer_dans_reputation       : substring à retirer
# Matching : insensible casse/accents/apostrophes.
# ============================================================

METIERS_MODIFICATIONS: dict[str, dict] = {
    "Archéologue": {
        # Choix 1 parmi 3 (au lieu d'avoir les 3 toutes incluses).
        "retirer_av": ["Connaissance des pièges", "Connaissance des runes", "Connaissance des Sidhes"],
        "set_av_choix": {"nb": 1, "options": [
            "Connaissance des pièges", "Connaissance des runes", "Connaissance des Sidhes",
        ]},
    },
    "Armateur": {
        "retirer_av": ["Construction navale", "Étiquette", "Banquier"],
    },
    "Arnaqueur": {
        "remplacer_base": [("Sincérité", "Duperie")],
        "retirer_av": ["Intimidation", "Jouer", "Cancanier", "Étiquette", "Corruption"],
    },
    "Barde": {
        "retirer_av": ["Diplomatie", "Connaissance des plantes"],
    },
    "Bateleur": {
        # Base : ne garder que 'Danse' (suppression de "et Éloquence", Chant, Comédie).
        "set_base": ["Danse"],
        "retirer_av": ["Comportementalisme", "Discrétion", "Séduction",
                       "Conduite d’attelage", "Connaissance des routes (nation)"],
    },
    "Batelier": {
        "retirer_av": ["Diplomatie", "Lancer", "Qui-vive"],
    },
    "Bonne aventure": {
        "retirer_av": ["Autre méthode de prédiction (préciser)", "Autre (préciser)"],
    },
    "Cadet": {
        # Base : 2 fixes + choix (Tâches domestiques académies / Valet autres).
        "set_base": ["Jeu de jambes", "Ordre serré"],
        "set_base_choix": {
            "nb": 1,
            "options": ["Tâches domestiques", "Valet"],
            "note": "Tâches domestiques dans les académies, Valet pour les autres.",
        },
        # Av : retirer les fragments cassés du split, mettre un choix propre.
        "retirer_av": [
            "Orientation citadine (la ville ou se situe l’académie) ou Connaissance des routes (sa nation",
            "pour les autres)",
        ],
        "set_av_choix": {
            "nb": 1,
            "options": [
                "Orientation citadine (Nation à préciser)",
                "Connaissance des routes (nation à préciser)",
            ],
            "note": "Nation de l'Académie pour les deux compétences.",
        },
    },
    "Caravanier": {
        "retirer_av": ["Guet-apens", "Sincérité"],
    },
    "Cao Yao (Acupuncteur)": {
        "retirer_av": ["Qui-vive"],
        "ajouter_av": [
            "Examiner", "Hypnotisme", "Blocage d’articulation", "Comportementalisme",
            "Connaissance des plantes", "Recherches", "Sciences de la nature",
        ],
    },
    "Chevalier": {
        "retirer_av": ["Guet-apens", "Mode", "Séduction"],
    },
    "Chroniqueur": {
        # Note : 'Contacts (cité)' déjà renommé 'Contacts (Nation à préciser)' par la normalisation.
        "retirer_av": ["Comportementalisme", "Étiquette", "Éloquence"],
    },
    "Cocher": {
        "retirer_av": ["Guet-apens"],
    },
    "Colporteur": {
        "retirer_av": ["Sincérité", "Narrer", "Comportementalisme"],
    },
    "Comédien": {
        "retirer_av": ["Linguistique", "Sincérité"],
    },
    "Commandement": {
        "retirer_av": ["Code secret", "Histoire", "Ordre serré", "Intimidation",
                       "Artillerie", "Lancer de fusée (Cathayan uniquement)"],
        "set_av_choix": {
            "nb": 1,
            "options": ["Artillerie", "Lancer de fusée (Cathayan uniquement)"],
        },
    },
    "Contrebandier": {
        # Base/av_choix déjà définis dans METIERS_COMPETENCES_OVERRIDES (terrestre/marin).
        # Reste : retirer Guet-apens des av.
        "retirer_av": ["Guet-apens"],
    },
    "Diplomate": {
        "retirer_av": ["Économie"],
    },
    "Domestique": {
        "retirer_av": ["Marchandage", "Cancanier", "Couturier",
                       "Conduite d’attelage", "Conduite de traîneau (Ussura)"],
        "set_av_choix": {
            "nb": 1,
            "options": ["Conduite d’attelage", "Conduite de traîneau (Ussura)"],
        },
    },
    "Courtisan": {
        "retirer_av": ["Corruption", "Comportementalisme", "Politique", "Héraldique"],
    },
    "Courtisane": {
        "ajouter_av": ["Musique (instrument au choix)", "Dilettantisme"],
        # Choix base déjà défini (3 parmi 6) dans METIERS_COMPETENCES_OVERRIDES.
        # Choix supplémentaire en avancées : Compositeur OU Création littéraire.
        "set_av_choix": {
            "nb": 1,
            "options": ["Compositeur", "Création littéraire"],
        },
    },
    "Détrousseur": {
        "ajouter_av": ["Course de vitesse", "Duperie", "Pickpocket"],
    },
    "Éclaireur": {
        "retirer_av": ["Connaissance des animaux", "Escalade", "Pêche"],
    },
    "Érudit": {
        # Avancées entièrement en choix 10 parmi 18.
        "set_av": [],
        "set_av_choix": {
            "nb": 10,
            "options": [
                "Architecture", "Astronomie", "Connaissance des animaux",
                "Connaissance des plantes", "Connaissance des Syrneths",
                "Création littéraire", "Droit", "Économie", "Éloquence",
                "Géographie", "Héraldique", "Linguistique", "Mathématiques",
                "Numismatique", "Occultisme", "Philosophie",
                "Sciences de la nature", "Théologie",
            ],
        },
    },
    "Escamoteur": {
        "retirer_av": ["Comportementalisme", "Corruption"],
    },
    "Espion": {
        "retirer_av": ["Comportementalisme", "Hypnotisme", "Langage des signes", "Déguisement"],
        "remplacer_base": [("Sincérité", "Duperie")],
        "remplacer_av": [("Sincérité", "Duperie")],
    },
    "Estudiant": {
        # Note : 'Orientation citadine (cité)' → renommée par normalisation.
        # 'Contacts (cité)' → idem.
        "retirer_av": ["Chant", "Contacts (Nation à préciser)", "Jouer", "Parier"],
    },
    "Explorateur": {
        "retirer_av": ["Qui-vive", "Diplomatie", "Conduite d’attelage", "Équitation"],
        "set_av_choix": {
            "nb": 1,
            "options": ["Conduite d’attelage", "Équitation"],
        },
    },
    "Fouineur": {
        # Les 3 '(cité)' normalisés en '(Nation à préciser)' par la normalisation.
        "retirer_av": ["Étiquette", "Héraldique", "Langage des signes",
                       "Numismatique", "Qui-vive"],
    },
    "Fournisseur de drogues": {
        "retirer_av": ["Évaluation"],
    },
    "Galérien": {
        # Base défini par COMPETENCES_OVERRIDES = [Qui-vive, Une compétence d'artisan…]
        # On ajoute 'Équilibre' en base, et Course d'endurance + Nager en av.
        "ajouter_base": ["Équilibre"],
        "ajouter_av": ["Course d’endurance", "Nager"],
    },
    "Galopin": {
        "ajouter_av": ["Tricher"],
    },
    "Garde du corps": {
        "ajouter_av": ["Prise", "Blocage d’articulation"],
    },
    "Guérillero": {
        "ajouter_av": ["Connaissance des plantes"],
    },
    "Guérisseur": {
        "ajouter_av": ["Examiner", "Hypnotisme", "Jardinier", "Soin des animaux"],
    },
    "Guide": {
        # Base : retirer 'Orientation citadine (cité)' (devient choix), ajouter Marchandage déplacé.
        # Note : 'Contacts (cité)' déjà normalisée en '(Nation à préciser)'.
        "retirer_base": ["Orientation citadine (Nation à préciser)"],
        "deplacer_av_vers_base": ["Marchandage"],
        "set_base_choix": {
            "nb": 1,
            "options": [
                "Orientation citadine (Nation à préciser)",
                "Sens de l’orientation",
            ],
        },
        "retirer_av": ["Comportementalisme", "Guet-apens", "Séduction",
                       "Sens de l’orientation"],
    },
    "Hors-la-loi": {
        "retirer_av": ["Qui-vive"],
    },
    "Ingénieur": {
        "retirer_base": ["Architecture"],
        "retirer_av": ["Maçon", "Création Littéraire", "Construction navale"],
        "set_base_choix": {
            "nb": 1,
            "options": ["Architecture", "Construction navale"],
        },
    },
    "Intendant": {
        # 'Contacts (cité)' normalisée en '(Nation à préciser)'.
        "retirer_av": ["Contacts (Nation à préciser)", "Corruption",
                       "Intimidation", "Sens des affaires"],
    },
    "Jenny": {
        # Casse de 'bas-fonds' normalisée + cité→Nation.
        "retirer_av": ["Fouille"],
    },
    "Juge d’armes": {
        "retirer_av": ["Corruption"],
    },
    "Légionnaire": {
        "retirer_av": ["Corruption", "Débrouillardise", "Jouer", "Langage des signes"],
        "retirer_dans_description": (
            "Règle spéciale : cette spécialisation coûte 5 PP au lieu de 2 car rares "
            "sont ceux qui maîtrisent aujourd’hui le métier de Légionnaire de l’ancienne "
            "Numa. Par contre, ils reçoivent gratuitement l’avantage, entraînement au "
            "port de l’armure."
        ),
    },
    "Maistrance": {
        "retirer_av": ["Galvaniser", "Stratégie", "Tactique"],
    },
    "Maître d’armes": {
        "retirer_av": ["Comportementalisme", "Galvaniser", "Guet-apens", "Roulé-boulé"],
    },
    "Marchand": {
        "retirer_av": ["Banquier", "Comportementalisme", "Corruption", "Étiquette"],
    },
    "Marin": {
        "retirer_av": ["Jouer", "Sincérité", "Pêche"],
    },
    "Pauvre Chevalier": {
        "retirer_av": ["Amortir une chute", "Forgeron", "Jeu de jambes", "Potier", "Séduction"],
        "retirer_dans_reputation": (
            "Ces métiers sont réservées à des personnages très expérimentés, donc à priori, "
            "pas des personnages-joueurs débutants. Quant aux métiers Aérostier et Politicien, "
            "ils n’existent pas au moment de la création de personnage, que ce soit en 1656 ou "
            "en 1668. Ils ne seront donc proposés aux joueurs qu’à la discrétion du MJ."
        ),
    },
    "Prêtre": {
        # Casse de 'Pique-assiette' normalisée.
        "retirer_av": ["Comportementalisme"],
    },
    "Rasoir": {
        "retirer_av": ["Comportementalisme", "Tactique", "Commander"],
    },
    "Receleur": {
        "ajouter_av": ["Dissimulation", "Falsification", "Déplacement silencieux", "Logistique"],
    },
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


def _iter_choix(value) -> list[dict]:
    """Helper : un champ competences_*_choix peut être :
    - None / absent → []
    - dict {nb, options, note?} (legacy) → [dict]
    - list[dict] (nouveau, supporte plusieurs blocs choix) → tel quel.
    """
    if not value:
        return []
    if isinstance(value, dict):
        return [value]
    if isinstance(value, list):
        return [c for c in value if c]
    return []


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
    # Gwai Liao, Rahib, Courtisane, Artisan) — voir METIERS_COMPETENCES_OVERRIDES.
    comp_overrides = {_nk(k): (k, v) for k, v in METIERS_COMPETENCES_OVERRIDES.items()}
    vus_comp: set[str] = set()
    for m in result:
        nk = _nk(m["nom"])
        if nk in comp_overrides:
            vus_comp.add(nk)
            _, override = comp_overrides[nk]
            for key in ("competences_base", "competences_avancees"):
                if key in override:
                    m[key] = override[key]
            # Choix : auto-wrap dict → liste pour cohérence
            for key in ("competences_base_choix", "competences_avancees_choix"):
                if key in override:
                    v = override[key]
                    if isinstance(v, dict):
                        m[key] = [v]
                    elif isinstance(v, list):
                        m[key] = list(v)
                    else:
                        m[key] = []
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


def normaliser_competences_metiers(metiers: list[dict]) -> None:
    """Applique COMPETENCES_REF_NORMALISATIONS aux noms de compétences
    dans competences_base, competences_avancees, et options des choix."""
    def norm_liste(lst):
        if not lst: return lst
        return [normaliser_ref_competence(x) for x in lst]
    def norm_choix_list(ch_list):
        if not ch_list: return ch_list
        if isinstance(ch_list, dict):  # legacy auto-wrap
            ch_list = [ch_list]
        for ch in ch_list:
            if ch and "options" in ch:
                ch["options"] = norm_liste(ch["options"])
        return ch_list
    for m in metiers:
        if m.get("competences_base"):
            m["competences_base"] = norm_liste(m["competences_base"])
        if m.get("competences_avancees"):
            m["competences_avancees"] = norm_liste(m["competences_avancees"])
        if m.get("competences_base_choix"):
            m["competences_base_choix"] = norm_choix_list(m["competences_base_choix"])
        if m.get("competences_avancees_choix"):
            m["competences_avancees_choix"] = norm_choix_list(m["competences_avancees_choix"])


def appliquer_modifications(metiers: list[dict]) -> None:
    """Applique METIERS_MODIFICATIONS (retirer/ajouter/remplacer/set/choix/…)
    aux métiers existants. Matching insensible casse/accents/apostrophes."""
    mods = {_nk(k): (k, v) for k, v in METIERS_MODIFICATIONS.items()}
    vus: set[str] = set()

    def _retirer(lst: list[str], a_retirer: list[str]) -> list[str]:
        keys = {_nk(x) for x in a_retirer}
        return [x for x in lst if _nk(x) not in keys]

    def _ajouter_unique(lst: list[str], a_ajouter: list[str]) -> list[str]:
        existing = {_nk(x) for x in lst}
        result = list(lst)
        for x in a_ajouter:
            if _nk(x) not in existing:
                result.append(x)
                existing.add(_nk(x))
        return result

    def _remplacer(lst: list[str], pairs: list[tuple[str, str]]) -> list[str]:
        if not pairs: return lst
        mapping = {_nk(o): n for o, n in pairs}
        return [mapping.get(_nk(x), x) for x in lst]

    for m in metiers:
        nk = _nk(m["nom"])
        if nk not in mods:
            continue
        vus.add(nk)
        _, op = mods[nk]
        base = list(m.get("competences_base", []))
        av = list(m.get("competences_avancees", []))

        # Set (remplace toute la liste)
        if "set_base" in op:        base = list(op["set_base"])
        if "set_av" in op:          av = list(op["set_av"])
        # Retirer
        if "retirer_base" in op:    base = _retirer(base, op["retirer_base"])
        if "retirer_av" in op:      av = _retirer(av, op["retirer_av"])
        # Remplacer
        if "remplacer_base" in op:  base = _remplacer(base, op["remplacer_base"])
        if "remplacer_av" in op:    av = _remplacer(av, op["remplacer_av"])
        # Déplacer av → base
        if "deplacer_av_vers_base" in op:
            keys = {_nk(x) for x in op["deplacer_av_vers_base"]}
            a_deplacer = [x for x in av if _nk(x) in keys]
            av = [x for x in av if _nk(x) not in keys]
            base = _ajouter_unique(base, a_deplacer)
        # Ajouter
        if "ajouter_base" in op:    base = _ajouter_unique(base, op["ajouter_base"])
        if "ajouter_av" in op:      av = _ajouter_unique(av, op["ajouter_av"])
        # Set choix : accepte dict (auto-wrap en liste à 1 élément) ou list.
        if "set_base_choix" in op:
            v = op["set_base_choix"]
            m["competences_base_choix"] = [dict(v)] if isinstance(v, dict) else [dict(x) for x in v]
        if "set_av_choix" in op:
            v = op["set_av_choix"]
            m["competences_avancees_choix"] = [dict(v)] if isinstance(v, dict) else [dict(x) for x in v]
        # Description / Réputation
        if "retirer_dans_description" in op:
            sub = op["retirer_dans_description"]
            desc = m.get("description", "") or ""
            m["description"] = " ".join(desc.replace(sub, "").split()).strip()
        if "retirer_dans_reputation" in op:
            sub = op["retirer_dans_reputation"]
            rep = m.get("reputation", "") or ""
            m["reputation"] = " ".join(rep.replace(sub, "").split()).strip()

        m["competences_base"] = base
        m["competences_avancees"] = av

    for nk, (nom, _) in mods.items():
        if nk not in vus:
            print(f"  [!] Modification non appliquée (métier introuvable) : '{nom}'")


# ============================================================
# Corrections v2 : lecture d'un fichier Markdown éditable par Guillaume
# Format : un bloc par métier avec un code block contenant :
#   base: A, B, C
#   av: X, Y, Z
#   base_choix: nb=1; options=A, B, C; note=...  (vide = pas de choix)
#   av_choix:   nb=1; options=A, B, C
# Lignes manquantes = pas de changement sur ce champ.
# ============================================================

CORRECTIONS_MD_V2 = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Corrections des compétences des métiers v2.md"
)

_METIER_HEADER_V2_RE = re.compile(r"^###\s+(.+?)\s+—\s+", re.MULTILINE)
_CODE_BLOCK_V2_RE = re.compile(r"```\s*\n(.*?)```", re.DOTALL)


def _parse_choix_str(s: str) -> dict | None:
    """'nb=1; options=A, B, C; note=texte' → {'nb':1, 'options':[A,B,C], 'note':'texte'}"""
    s = s.strip()
    if not s:
        return None
    result: dict = {}
    for part in s.split(";"):
        part = part.strip()
        if "=" not in part:
            continue
        k, v = part.split("=", 1)
        k, v = k.strip(), v.strip()
        if k == "nb":
            try:
                result["nb"] = int(v)
            except ValueError:
                pass
        elif k == "options":
            result["options"] = [x.strip() for x in v.split(",") if x.strip()]
        elif k == "note":
            result["note"] = v
    if "nb" not in result or "options" not in result or not result["options"]:
        return None
    return result


def parse_corrections_v2(text: str) -> dict[str, dict]:
    """Parse le markdown → {metier_nom: {base|av|base_choix|av_choix: ...}}"""
    result: dict[str, dict] = {}
    headers = list(_METIER_HEADER_V2_RE.finditer(text))
    for i, hdr in enumerate(headers):
        nom = hdr.group(1).strip()
        start = hdr.end()
        end = headers[i + 1].start() if i + 1 < len(headers) else len(text)
        block_section = text[start:end]
        m_code = _CODE_BLOCK_V2_RE.search(block_section)
        if not m_code:
            continue
        entry: dict = {}
        # base_choix et av_choix peuvent apparaître plusieurs fois (chaque ligne
        # ajoute un bloc de choix). Si une ligne est vide, on retient juste qu'on a
        # vu la clé (pour distinguer 'pas de choix' de 'champ absent').
        for line in m_code.group(1).splitlines():
            line = line.strip()
            if not line or ":" not in line:
                continue
            k, v = line.split(":", 1)
            k = k.strip().lower()
            v = v.strip()
            if k == "base":
                entry["base"] = [x.strip() for x in v.split(",") if x.strip()]
            elif k == "av":
                entry["av"] = [x.strip() for x in v.split(",") if x.strip()]
            elif k == "base_choix":
                entry.setdefault("base_choix", [])
                parsed = _parse_choix_str(v)
                if parsed:
                    entry["base_choix"].append(parsed)
            elif k == "av_choix":
                entry.setdefault("av_choix", [])
                parsed = _parse_choix_str(v)
                if parsed:
                    entry["av_choix"].append(parsed)
        if entry:
            result[nom] = entry
    return result


def appliquer_corrections_v2(metiers: list[dict]) -> None:
    if not CORRECTIONS_MD_V2.exists():
        print(f"  (Pas de fichier {CORRECTIONS_MD_V2.name} — étape v2 ignorée)")
        return
    text = CORRECTIONS_MD_V2.read_text(encoding="utf-8")
    corrections = parse_corrections_v2(text)
    print(f"  {len(corrections)} bloc(s) parsé(s) dans le fichier v2")

    by_key = {_nk(m["nom"]): m for m in metiers}
    nb_changed = 0
    nb_introuvables = 0
    for nom, c in corrections.items():
        nk = _nk(nom)
        if nk not in by_key:
            print(f"  [!] '{nom}' introuvable")
            nb_introuvables += 1
            continue
        m = by_key[nk]
        changed = False
        if "base" in c and c["base"] != m.get("competences_base", []):
            m["competences_base"] = c["base"]
            changed = True
        if "av" in c and c["av"] != m.get("competences_avancees", []):
            m["competences_avancees"] = c["av"]
            changed = True
        if "base_choix" in c:
            # c["base_choix"] est une liste (possiblement vide). On normalise la
            # comparaison en convertissant la valeur courante en liste aussi.
            cur = _iter_choix(m.get("competences_base_choix"))
            new = c["base_choix"]  # déjà une liste
            if new != cur:
                if new:
                    m["competences_base_choix"] = new
                else:
                    m.pop("competences_base_choix", None)
                changed = True
        if "av_choix" in c:
            cur = _iter_choix(m.get("competences_avancees_choix"))
            new = c["av_choix"]
            if new != cur:
                if new:
                    m["competences_avancees_choix"] = new
                else:
                    m.pop("competences_avancees_choix", None)
                changed = True
        if changed:
            nb_changed += 1
    print(f"  {nb_changed} métier(s) effectivement modifié(s) par v2")
    if nb_introuvables:
        print(f"  ⚠ {nb_introuvables} bloc(s) sans métier correspondant")


def sync_competences_acces(metiers: list[dict]) -> None:
    """Reconstruit donnent_acces_base / donnent_acces_avancee de chaque compétence
    à partir des métiers ET des entraînements (sources de vérité après modifs).
    Lit competences.json + entrainements.json, met à jour, ré-écrit + competences.js.
    """
    comp_path = DEST_DIR / "competences.json"
    comp_js_path = DEST_DIR / "competences.js"
    if not comp_path.exists():
        print("  [!] competences.json absent — sync ignorée")
        return
    cdata = json.loads(comp_path.read_text(encoding="utf-8"))
    competences = cdata.get("competences", [])
    # Index par clé normalisée → nom canonique (de la base de compétences)
    canon: dict[str, str] = {_nk(c["nom"]): c["nom"] for c in competences}

    # Construction de l'index inverse, séparé par TYPE de source (métier vs entraînement)
    # ET par niveau (base vs avancée). 4 dicts au total.
    from collections import defaultdict
    metiers_base: dict[str, set[str]] = defaultdict(set)
    metiers_av: dict[str, set[str]] = defaultdict(set)
    ent_base: dict[str, set[str]] = defaultdict(set)
    ent_av: dict[str, set[str]] = defaultdict(set)

    # Alias pour le lookup (display court → canonique).
    COMPETENCE_ALIASES_NK = {
        _nk("Recharger"): _nk("Recharger (Type d’armes à préciser)"),
    }
    # Patterns : 'Recharger (Arc)' / 'Recharger (Arbalète)' → fiche canonique unique
    RECHARGER_PATTERN = re.compile(r"^recharger\s*\(.+?\)$", re.IGNORECASE)
    canon_recharger_nk = _nk("Recharger (Type d’armes à préciser)")

    def _ajouter(comp_str: str, niveau: str, source_type: str, source_nom: str):
        key = _nk(comp_str)
        if key in COMPETENCE_ALIASES_NK:
            key = COMPETENCE_ALIASES_NK[key]
        elif RECHARGER_PATTERN.match(key):
            key = canon_recharger_nk
        if key not in canon:
            return  # pas de compétence canonique : laisse tel quel (sera affiché en texte)
        if source_type == "metier":
            (metiers_base if niveau == "base" else metiers_av)[key].add(source_nom)
        else:
            (ent_base if niveau == "base" else ent_av)[key].add(source_nom)

    # Métiers
    nb_metiers = 0
    for m in metiers:
        nb_metiers += 1
        nm = m["nom"]
        for c in m.get("competences_base", []):
            _ajouter(c, "base", "metier", nm)
        for c in m.get("competences_avancees", []):
            _ajouter(c, "av", "metier", nm)
        for choix_b in _iter_choix(m.get("competences_base_choix")):
            for c in choix_b.get("options", []):
                _ajouter(c, "base", "metier", nm)
        for choix_av in _iter_choix(m.get("competences_avancees_choix")):
            for c in choix_av.get("options", []):
                _ajouter(c, "av", "metier", nm)

    # Entraînements (Pugilat, Pistolet, etc. donnent accès à des compétences)
    ent_path = DEST_DIR / "entrainements.json"
    nb_entrainements = 0
    if ent_path.exists():
        edata = json.loads(ent_path.read_text(encoding="utf-8"))
        for e in edata.get("entrainements", []):
            nb_entrainements += 1
            en = e["nom"]
            for c in e.get("competences_base", []):
                _ajouter(c, "base", "entrainement", en)
            for c in e.get("competences_avancees", []):
                _ajouter(c, "av", "entrainement", en)
    print(f"  Sources scannées : {nb_metiers} métiers + {nb_entrainements} entraînements")

    # Pour la rétro-compat, on garde aussi les listes 'donnent_acces_base'
    # et 'donnent_acces_avancee' fusionnées (utilisé en fallback côté UI si besoin).
    acces_base: dict[str, set[str]] = defaultdict(set)
    acces_av: dict[str, set[str]] = defaultdict(set)
    for k, v in metiers_base.items():    acces_base[k] |= v
    for k, v in ent_base.items():        acces_base[k] |= v
    for k, v in metiers_av.items():      acces_av[k] |= v
    for k, v in ent_av.items():          acces_av[k] |= v

    # Affecte les listes triées (FR)
    def _tri(lst):
        return sorted(lst, key=lambda x: x.lower())

    nb_modif = 0
    for c in competences:
        key = _nk(c["nom"])
        new_m_b = _tri(list(metiers_base.get(key, [])))
        new_m_a = _tri(list(metiers_av.get(key, [])))
        new_e_b = _tri(list(ent_base.get(key, [])))
        new_e_a = _tri(list(ent_av.get(key, [])))
        new_base = _tri(list(acces_base.get(key, [])))
        new_av = _tri(list(acces_av.get(key, [])))
        changed = (
            new_m_b != c.get("donnent_acces_metiers_base", []) or
            new_m_a != c.get("donnent_acces_metiers_avancee", []) or
            new_e_b != c.get("donnent_acces_entrainements_base", []) or
            new_e_a != c.get("donnent_acces_entrainements_avancee", []) or
            new_base != c.get("donnent_acces_base", []) or
            new_av != c.get("donnent_acces_avancee", [])
        )
        if changed:
            c["donnent_acces_metiers_base"] = new_m_b
            c["donnent_acces_metiers_avancee"] = new_m_a
            c["donnent_acces_entrainements_base"] = new_e_b
            c["donnent_acces_entrainements_avancee"] = new_e_a
            # Rétro-compat : liste fusionnée (métiers + entraînements)
            c["donnent_acces_base"] = new_base
            c["donnent_acces_avancee"] = new_av
            nb_modif += 1
    print(f"  {nb_modif} compétence(s) avec liste d'accès mise à jour")

    # Réécrit competences.json + competences.js
    json_text = json.dumps(cdata, ensure_ascii=False, indent=2)
    comp_path.write_text(json_text, encoding="utf-8")
    comp_js_path.write_text(
        f"// Généré par pdf_competences_to_json.py + pdf_metiers_to_json.py (synchro inverse)\n"
        f"window.COMPETENCES_DATA = {json_text};\n",
        encoding="utf-8",
    )
    print(f"  OK -> {comp_path}")
    print(f"  OK -> {comp_js_path}")


def main() -> None:
    print("Parsing PDF Métiers…")
    metiers = parse_pdf(SOURCE_PDF)
    print(f"  {len(metiers)} métiers extraits")

    print("Application des overrides (restrictions, suppressions, Baleinier)…")
    metiers = appliquer_overrides(metiers)
    print(f"  {len(metiers)} métiers après suppressions")

    print("Normalisation (cité→Nation, fautes de casse)…")
    normaliser_competences_metiers(metiers)

    print(f"Application de {len(METIERS_MODIFICATIONS)} modifications maison…")
    appliquer_modifications(metiers)

    print(f"Application des corrections v2 ({CORRECTIONS_MD_V2.name})…")
    appliquer_corrections_v2(metiers)

    print("Normalisation finale (cité→Nation, méta-compétences, qualificatifs)…")
    normaliser_competences_metiers(metiers)

    print("Synchro inverse : reconstruction de donnent_acces_* dans competences.json…")
    sync_competences_acces(metiers)

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
