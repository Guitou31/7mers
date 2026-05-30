"""Parse le PDF '06 Compétences (15-11-14).pdf' → competences.json + competences.js.

Le PDF a 48 pages et 2 sections clés :
- "Classement par catégories" (pages 6-7 environ) :
    Liste les compétences par catégorie (11 catégories : artisanales, artistiques,
    commerciales, larronnes, maritimes, martiales, médicales, physiques, rurales,
    savantes, sociales).
    Format : DominicanItalic = nom de catégorie, puis '•' (SymbolMT) + BookAntiqua = nom de compétence.

- "Description des compétences" (pages 8+) :
    Pour chaque compétence :
    - Nom (DominicanItalic)
    - Optionnel "Base :" (BookAntiqua-Bold-Italic) + liste de spécialisations (BookAntiqua-Italic)
    - Optionnel "Avancée :" (BookAntiqua-Bold-Italic) + liste (BookAntiqua-Italic)
    - Description (BookAntiqua normal)

Sortie : { nom, categorie, description, donnent_acces_base, donnent_acces_avancee }
"""

import json
import re
import unicodedata
from pathlib import Path

import fitz  # type: ignore

SOURCE_PDF = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Légendes de la 7ème mer\06 Compétences (15-11-14).pdf"
)
DEST_DIR = Path(__file__).parent
DEST_JSON = DEST_DIR / "competences.json"
DEST_JS = DEST_DIR / "competences.js"

# Overrides de description (maison) : remplacent le texte du PDF pour une compétence donnée.
# Matching insensible casse/accents/apostrophes (clé = nom exact tel qu'il sort du parser).
COMPETENCES_DESCRIPTION_OVERRIDES: dict[str, str] = {
    "Sincérité": (
        "Cette compétence permet de convaincre un interlocuteur de sa bonne foi par la "
        "posture, le regard et le ton, sans nécessairement avancer d'argument élaboré. "
        "À distinguer de Duperie, qui repose sur le mensonge délibéré. "
        "Cette compétence peut également être utilisée avec le système de répartie."
    ),
}

# Ajouts maison : nouvelles compétences à insérer dans la base après parsing.
# Structure identique au reste : nom, categorie, description, donnent_acces_base, donnent_acces_avancee.
COMPETENCES_AJOUTS: list[dict] = [
    {
        "nom": "Duperie",
        "categorie": "Compétences sociales",
        "description": (
            "Cette compétence permet d'user de mensonges pour convaincre son interlocuteur. "
            "Le mensonge le plus élaboré est inutile face à un interlocuteur capable de discerner "
            "un frisson d'appréhension ou un éclair de nervosité dans le regard. La compétence "
            "Duperie permet au héros de donner à ses mensonges toutes les apparences de la vérité "
            "et de dissimuler le mensonge le plus patent derrière un masque de parfaite honnêteté. "
            "Cette compétence peut également être utilisée avec le système de répartie."
        ),
        # Le mapping des métiers est fait à part : Duperie commence avec Gitan (override métier),
        # à enrichir au fur et à mesure par le MJ.
        "donnent_acces_base": ["Gitan"],
        "donnent_acces_avancee": [],
        "variantes": [],
    },
]

# Overrides manuels : pour les compétences génériques absentes du "Classement par catégories"
# (typiquement les compétences "(... à préciser)" qui sont des méta-compétences).
COMPETENCE_CATEGORIE_OVERRIDE: dict[str, str] = {
    "Une compétence d’artisan au choix":            "Compétences artisanales",
    "Autre méthode de prédiction (préciser)":       "Compétences savantes",
    "Connaissance des bas-fonds (cité à préciser)": "Compétences larronnes",
    "Connaissance des routes (nation à préciser)":  "Compétences savantes",
    "Double parade (Armes exotiques jumelées)":     "Compétences martiales",
    "Équitation (type d’animal à préciser s’il ne s’agit pas de chevaux)": "Compétences rurales",
    "Musique (type d’instrument à préciser)":       "Compétences artistiques",
    "Orientation citadine (cité à préciser)":       "Compétences larronnes",
    "Recharger (Type d’armes à préciser)":          "Compétences martiales",
    "Sher da Shi (Charmeur de serpents)":           "Compétences physiques",
    "Soin des animaux (type d’animal à préciser)":  "Compétences rurales",
    "Virevolte":                                     "Compétences physiques",
}

CATEGORIES_VALIDES = {
    "Compétences artisanales",
    "Compétences artistiques",
    "Compétences commerciales",
    "Compétences larronnes",
    "Compétences maritimes",
    "Compétences martiales",
    "Compétences médicales",
    "Compétences physiques",
    "Compétences rurales",
    "Compétences savantes",
    "Compétences sociales",
}


def norm(s: str) -> str:
    nfkd = unicodedata.normalize("NFKD", s)
    no_acc = "".join(c for c in nfkd if not unicodedata.combining(c))
    return re.sub(r"\s+", " ", no_acc.lower().replace("’", "'").replace("‘", "'")).strip()


def clean_text(s: str) -> str:
    if not s:
        return ""
    return re.sub(r"\s+", " ", s).strip()


def split_specialisations(text: str) -> list[str]:
    """Découpe la liste 'Aérostier, Batelier, Galérien, Marine, Pêcheur.' en liste propre."""
    if not text:
        return []
    text = text.strip().rstrip(".").rstrip(",")
    parts = re.split(r"\s*,\s*", text)
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


def _is_dominican_italic(span) -> bool:
    return "Dominican" in span["font"]


def _is_label_bold_italic(span) -> bool:
    """BookAntiqua-BoldItalic = labels 'Base :' / 'Avancée :'."""
    return "BookAntiqua" in span["font"] and "Bold" in span["font"] and ("Italic" in span["font"] or "Oblique" in span["font"])


def _is_book_italic(span) -> bool:
    """BookAntiqua-Italic = liste des spécialisations."""
    return "BookAntiqua" in span["font"] and ("Italic" in span["font"] or "Oblique" in span["font"]) and "Bold" not in span["font"]


def _is_book_regular(span) -> bool:
    return "BookAntiqua" in span["font"] and "Bold" not in span["font"] and "Italic" not in span["font"] and "Oblique" not in span["font"]


def _is_bullet(span) -> bool:
    return "SymbolMT" in span["font"]


# ============================================================
# Pass 1 : parsing du "Classement par catégories"
# ============================================================
def parse_classement(pdf_path: Path) -> dict[str, str]:
    """Renvoie { nom_competence: categorie }.
    Accumule les spans DominicanItalic consécutifs pour détecter les catégories
    multi-lignes (ex: 'Compétences' + 'commerciales').
    """
    mapping: dict[str, str] = {}
    in_classement = False
    current_categorie: str | None = None
    pending_cat: list[str] = []  # buffer pour catégorie multi-spans

    for page_num, span, y in iter_spans(pdf_path):
        txt = span["text"].strip()
        if not txt:
            continue

        # Détection entrée/sortie de la section
        if "CopperplateGothic" in span["font"] and "Bold" in span["font"]:
            tnorm = norm(txt)
            if "classement" in tnorm:
                in_classement = True
                pending_cat = []
                continue
            if "description" in tnorm and "competences" in tnorm:
                in_classement = False
                pending_cat = []
                continue
            continue

        if not in_classement:
            continue

        # Accumule Dominican spans pour détecter catégories multi-ligne
        if _is_dominican_italic(span):
            pending_cat.append(clean_text(txt))
            joined = clean_text(" ".join(pending_cat))
            if joined in CATEGORIES_VALIDES:
                current_categorie = joined
                pending_cat = []
            elif len(pending_cat) > 3:
                # Limite — éviter accumulation infinie de bruit
                pending_cat = pending_cat[-2:]
            continue

        # Tout span non-Dominican (skip bullet) reset le buffer en cas d'échec
        if not _is_bullet(span):
            pending_cat = []

        # Nom de compétence en BookAntiqua (suit un bullet)
        if current_categorie and _is_book_regular(span):
            nom_comp = clean_text(txt)
            if nom_comp and len(nom_comp) >= 2:
                mapping[nom_comp] = current_categorie

    return mapping


# ============================================================
# Pass 2 : parsing du "Description des compétences"
# ============================================================
def parse_descriptions(pdf_path: Path) -> list[dict]:
    """Renvoie la liste ordonnée des compétences avec description, base, avancée."""
    competences: list[dict] = []
    in_descriptions = False
    current: dict | None = None
    current_section: str | None = None  # 'base', 'avancee', 'description', ou None
    # Buffers
    desc_buf: list[str] = []
    base_buf: list[str] = []
    avancee_buf: list[str] = []
    pending_name: list[str] = []

    def commit_current():
        nonlocal current, current_section, desc_buf, base_buf, avancee_buf
        if current is None:
            return
        # Description : joindre les paragraphes
        desc = clean_text(" ".join(desc_buf))
        base = split_specialisations(clean_text(" ".join(base_buf)))
        avancee = split_specialisations(clean_text(" ".join(avancee_buf)))
        if desc or base or avancee:
            current["description"] = desc
            current["donnent_acces_base"] = base
            current["donnent_acces_avancee"] = avancee
            competences.append(current)
        current = None
        current_section = None
        desc_buf = []
        base_buf = []
        avancee_buf = []

    def finalize_pending_name():
        nonlocal current, current_section, pending_name
        if not pending_name:
            return
        nom = clean_text(" ".join(pending_name))
        pending_name = []
        commit_current()
        current = {"nom": nom}
        current_section = "description"  # par défaut, le texte qui suit est description

    for page_num, span, y in iter_spans(SOURCE_PDF):
        txt = span["text"]
        if not txt.strip():
            continue

        # Détection entrée section "Description des compétences"
        if "CopperplateGothic" in span["font"] and "Bold" in span["font"]:
            tnorm = norm(txt)
            if "description" in tnorm and "competences" in tnorm:
                in_descriptions = True
                continue
            # Autres en-têtes CB qui pourraient signaler la fin (none attendu après description)

        if not in_descriptions:
            continue

        # Skip headers/footers
        if span["font"] == "ElGar":
            continue
        if _is_bullet(span):
            continue

        # Nouveau nom de compétence (DominicanItalic) — peut être multi-spans
        if _is_dominican_italic(span):
            pending_name.append(clean_text(txt))
            continue

        # Si on accumulait un nom, on finalise dès le 1er span non-Dominican
        if pending_name:
            finalize_pending_name()

        if current is None:
            continue

        # Labels "Base :" et "Avancée :" en BookAntiqua-BoldItalic
        if _is_label_bold_italic(span):
            label = norm(txt).rstrip(":").strip()
            if "base" in label:
                current_section = "base"
                continue
            if "avancee" in label or "avancée" in label:
                current_section = "avancee"
                continue
            continue

        # Liste de spécialisations (BookAntiqua-Italic) après un label
        if _is_book_italic(span):
            if current_section == "base":
                base_buf.append(txt)
            elif current_section == "avancee":
                avancee_buf.append(txt)
            continue

        # Texte normal (BookAntiqua) = description
        if _is_book_regular(span):
            # Le 1er BookAntiqua-regular après une liste Base/Avancée bascule en description
            if current_section in ("base", "avancee"):
                current_section = "description"
            desc_buf.append(txt)
            continue

    if pending_name:
        finalize_pending_name()
    commit_current()
    return competences


def post_traiter_variantes(competences: list[dict]) -> list[dict]:
    """Détecte les sous-sections (compétences sans Base ni Avancée) et les
    rattache comme 'variantes' de la compétence précédente.

    Cela évite les doublons type 'Mousquet' (qui apparaît sous Tirer et Recharger).
    """
    out: list[dict] = []
    for c in competences:
        nom = c.get("nom", "")
        # Faux positif : titre de table parasites
        if nom.lower().startswith("table "):
            continue
        a_du_contenu = bool(c.get("donnent_acces_base")) or bool(c.get("donnent_acces_avancee"))
        if not a_du_contenu and out:
            # Sous-section : rattache à la compétence précédente
            parent = out[-1]
            parent.setdefault("variantes", [])
            parent["variantes"].append({
                "nom": nom,
                "description": c.get("description", ""),
            })
        else:
            out.append(c)
    return out


def main() -> None:
    print("Pass 1 : classement par catégories…")
    mapping = parse_classement(SOURCE_PDF)
    print(f"  {len(mapping)} compétences mappées à une catégorie")

    print("Pass 2 : descriptions…")
    competences = parse_descriptions(SOURCE_PDF)
    print(f"  {len(competences)} compétences avec description extraites")

    print("Post-traitement : fusion des sous-sections en variantes…")
    competences = post_traiter_variantes(competences)
    nb_var = sum(len(c.get("variantes", [])) for c in competences)
    print(f"  {len(competences)} compétences après fusion ({nb_var} variantes intégrées)")

    # Greffer la catégorie sur chaque compétence avec fallback
    nb_sans_cat = 0
    for c in competences:
        nom = c["nom"]
        cat = mapping.get(nom)
        if not cat:
            # Fallback : enlever la parenthèse finale pour les compétences génériques
            # ex: "Attaque (type d'armes à préciser)" → "Attaque"
            nom_court = re.sub(r"\s*\([^)]*\)\s*$", "", nom).strip()
            if nom_court != nom:
                cat = mapping.get(nom_court)
        if not cat:
            # Fallback 2 : matching insensible casse/accents
            nom_norm = norm(nom)
            for k, v in mapping.items():
                if norm(k) == nom_norm:
                    cat = v
                    break
        if not cat:
            # Fallback 3 : override manuel pour les compétences génériques
            cat = COMPETENCE_CATEGORIE_OVERRIDE.get(nom)
        if cat:
            c["categorie"] = cat
        else:
            c["categorie"] = None
            nb_sans_cat += 1

    # Overrides de description (maison)
    nb_desc_override = 0
    for c in competences:
        if c["nom"] in COMPETENCES_DESCRIPTION_OVERRIDES:
            c["description"] = COMPETENCES_DESCRIPTION_OVERRIDES[c["nom"]]
            nb_desc_override += 1
    if nb_desc_override:
        print(f"  Overrides de description : {nb_desc_override} compétence(s)")

    # Ajouts maison (nouvelles compétences)
    noms_existants = {c["nom"] for c in competences}
    for ajout in COMPETENCES_AJOUTS:
        if ajout["nom"] in noms_existants:
            print(f"  [!] Ajout ignoré (déjà présent) : '{ajout['nom']}'")
            continue
        competences.append(dict(ajout))  # copie pour ne pas muter la source
    if COMPETENCES_AJOUTS:
        print(f"  Ajouts maison : {len(COMPETENCES_AJOUTS)} compétence(s)")

    # Stats
    categories_uniques = sorted({c["categorie"] for c in competences if c.get("categorie")})
    print(f"\n  Catégories : {len(categories_uniques)}")
    for cat in categories_uniques:
        n = sum(1 for c in competences if c.get("categorie") == cat)
        print(f"    {cat:35} : {n}")
    if nb_sans_cat:
        print(f"  [!] {nb_sans_cat} compétences sans catégorie (à vérifier)")

    data = {
        "_meta": {
            "source": SOURCE_PDF.name,
            "nb_competences": len(competences),
            "categories": categories_uniques,
        },
        "competences": competences,
    }
    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    DEST_JSON.write_text(json_text, encoding="utf-8")
    DEST_JS.write_text(
        f"// Généré par pdf_competences_to_json.py — ne pas éditer à la main\n"
        f"window.COMPETENCES_DATA = {json_text};\n",
        encoding="utf-8",
    )
    print(f"\nOK -> {DEST_JSON}")
    print(f"OK -> {DEST_JS}")


if __name__ == "__main__":
    main()
