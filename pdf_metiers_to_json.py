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


def split_competences(text: str) -> list[str]:
    if not text or not text.strip():
        return []
    text = text.strip().rstrip(".").rstrip(",")
    parts = re.split(r"\s*[,.]\s*", text)
    return [clean_text(p) for p in parts if clean_text(p)]


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
