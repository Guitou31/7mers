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


def main() -> None:
    print("Parsing PDF Métiers…")
    metiers = parse_pdf(SOURCE_PDF)
    print(f"  {len(metiers)} métiers extraits")

    # Stats catégories (qui sont DANS chaque métier, pas en pré-passe)
    from collections import Counter
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
