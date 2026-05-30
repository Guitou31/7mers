"""Parse le docx 'Liste des Techniques de combat' (version corrigée par Guillaume).

Produit techniques_corrigees.json :
{ clé_normalisée: { nom, description, categorie, ecoles_enseignant: [...], tables: [...] } }

Le docx utilise :
- Titre1 : catégorie (ex: 'Techniques de spadassin classiques')
- Titre3 : nom de la technique
- Paragraphes sans style : description, puis ligne 'Ecoles l'enseignant : ...'
- Tableaux <w:tbl> : extraits dans le champ 'tables' (matrices de cellules)

Cas particuliers gérés :
- 'Ecoles l'enseignant (regroupées par armes) :' avec lignes suivantes 'Arme : E1, E2'
- Apostrophes typographiques (U+2019) et espaces insécables (U+00A0)
- Tableaux séparés du texte courant
"""

import json
import re
import unicodedata
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

SOURCE_DOCX = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Ecoles combat & co\Liste des Techniques de combat.docx"
)
DEST_DIR = Path(__file__).parent
DEST_JSON = DEST_DIR / "techniques_corrigees.json"
DEST_JS = DEST_DIR / "techniques_corrigees.js"

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
NBSP = " "

_ECOLES_HEADER_RE = re.compile(
    r"^\s*Ecoles?\s+l'enseignant(?:\s*\(([^)]*)\))?\s*:\s*(.*)$",
    re.IGNORECASE,
)
# Capture l'arme (groupe 1) ET la liste d'écoles (groupe 2). Tolère puce '•' ou '-' initial.
_CONTINUATION_RE = re.compile(r"^\s*[•\-]?\s*([^:]{1,40})\s*:\s*(.+)$")

# Renommage des catégories (sortie du parser).
CATEGORIE_RENAMES = {
    "Techniques de spadassin à mains nues": "Techniques de combat à mains nues",
    "Techniques de spadassin avec animaux": "Techniques de combat avec animaux",
    "Techniques de spadassin d'assassinat": "Techniques d'assassinat",
    "Techniques de spadassin d’assassinat": "Techniques d'assassinat",
}

# Faux titres de techniques (paragraphes en Titre3 qui ne sont pas des techniques).
# Matching par clé normalisée (préfixe).
TITRES_IGNORES_PREFIX = (
    "ces techniques sont basees",  # paragraphe d'intro de catégorie en Titre3
)

# Override des écoles enseignantes (corrige les oublis/erreurs du docx).
# Clé = nom normalisé de la technique, valeur = liste d'écoles à FORCER.
TECHNIQUE_ECOLES_OVERRIDE: dict[str, list[str]] = {
    "gros sel": ["Durante"],
    "tir a carreau special": ["Ricardo"],
}

# Écoles à RETIRER de la liste 'ecoles_enseignant' partout où elles apparaissent
# (mentions erronées dans le docx — Tulwar est un type de sabre, pas une école).
ECOLE_NAMES_FILTER_OUT = {"tulwar"}


def normalize(s: str) -> str:
    if not s:
        return ""
    nfkd = unicodedata.normalize("NFKD", s)
    sans_accents = "".join(c for c in nfkd if not unicodedata.combining(c))
    cleaned = sans_accents.replace("-", " ").replace("’", "'").replace("‘", "'")
    return re.sub(r"\s+", " ", cleaned.lower()).strip()


def normalize_for_matching(text: str) -> str:
    return text.replace(NBSP, " ").replace("’", "'").replace("‘", "'")


def get_paragraph_style(p) -> str | None:
    pStyle = p.find(f".//{W}pStyle")
    return pStyle.get(W + "val") if pStyle is not None else None


def get_paragraph_text(p) -> str:
    return "".join((t.text or "") for t in p.iter(W + "t"))


def parse_ecoles_list(text: str) -> list[str]:
    parts = re.split(r"\s*[,;]\s*", text.strip())
    return [re.sub(r"\s+", " ", p).strip() for p in parts if p.strip()]


def extract_table(tbl) -> list[list[str]]:
    """Extrait un tableau Word sous forme de matrice de strings."""
    rows = []
    for tr in tbl.iter(W + "tr"):
        row = []
        for tc in tr.iter(W + "tc"):
            # Texte de chaque paragraphe de la cellule
            cell_paras = []
            for p in tc.iter(W + "p"):
                cell_paras.append(get_paragraph_text(p).strip())
            cell = "\n".join(filter(None, cell_paras)).strip()
            row.append(cell)
        if row:
            rows.append(row)
    return rows


def iter_body_elements(root):
    """Parcourt les enfants directs du body, en distinguant paragraphes (p) et tableaux (tbl)."""
    body = root.find(f"{W}body")
    if body is None:
        return
    for child in body:
        tag = child.tag
        if tag == W + "p":
            yield ("p", child)
        elif tag == W + "tbl":
            yield ("tbl", child)


def main() -> None:
    with zipfile.ZipFile(SOURCE_DOCX) as z:
        xml = z.read("word/document.xml").decode("utf-8")
    root = ET.fromstring(xml)

    techniques: dict[str, dict] = {}
    current_categorie: str | None = None
    current_tech: dict | None = None
    current_paras: list[str] = []
    current_ecoles: list[str] = []
    current_ecoles_groupees: dict[str, list[str]] = {}
    current_tables: list[list[list[str]]] = []
    in_ecoles_section = False     # True après en-tête "Ecoles l'enseignant"
    grouped_mode = False          # True si en-tête indique 'regroupées par catégories d'armes'

    def reset_state():
        nonlocal current_tech, current_paras, current_ecoles, current_ecoles_groupees
        nonlocal current_tables, in_ecoles_section, grouped_mode
        current_tech = None
        current_paras = []
        current_ecoles = []
        current_ecoles_groupees = {}
        current_tables = []
        in_ecoles_section = False
        grouped_mode = False

    def flush():
        nonlocal current_tech
        if current_tech is None:
            return
        key = normalize(current_tech["nom"])
        # Filtre 1 : faux titres (intro de catégorie capturée comme Titre3)
        if any(key.startswith(pref) for pref in TITRES_IGNORES_PREFIX):
            reset_state()
            return
        description = "\n\n".join(p.strip() for p in current_paras if p.strip())
        current_tech["description"] = description
        # Override des écoles (corrections manuelles)
        if key in TECHNIQUE_ECOLES_OVERRIDE:
            current_tech["ecoles_enseignant"] = list(TECHNIQUE_ECOLES_OVERRIDE[key])
        else:
            # Filtre les noms d'écoles non-valides (Tulwar, etc.)
            current_tech["ecoles_enseignant"] = [
                e for e in current_ecoles if normalize(e) not in ECOLE_NAMES_FILTER_OUT
            ]
            # Si groupé par arme : conserver aussi la structure groupée (filtrée).
            if grouped_mode and current_ecoles_groupees:
                groupees_filtered = {}
                for arme, ecoles in current_ecoles_groupees.items():
                    keep = [e for e in ecoles if normalize(e) not in ECOLE_NAMES_FILTER_OUT]
                    if keep:
                        groupees_filtered[arme] = keep
                if groupees_filtered:
                    current_tech["ecoles_enseignant_groupees"] = groupees_filtered
        current_tech["tables"] = current_tables
        techniques[key] = current_tech
        reset_state()

    for kind, element in iter_body_elements(root):
        if kind == "tbl":
            if current_tech is not None:
                table_data = extract_table(element)
                if table_data:
                    current_tables.append(table_data)
            continue

        # kind == "p"
        p = element
        style = get_paragraph_style(p)
        text = get_paragraph_text(p).strip()
        if not text:
            continue

        if style == "Titre1":
            flush()
            # Renomme la catégorie au passage (mapping pour normaliser le vocabulaire).
            text_norm = text.replace("’", "'")
            current_categorie = CATEGORIE_RENAMES.get(text_norm, text_norm)
            continue

        if style == "Titre3":
            flush()
            current_tech = {
                "nom": text,
                "categorie": current_categorie or "",
            }
            continue

        if current_tech is None:
            continue

        # Détection de l'en-tête "Ecoles l'enseignant"
        normalized = normalize_for_matching(text)
        m = _ECOLES_HEADER_RE.match(normalized)
        if m:
            in_ecoles_section = True
            paren = (m.group(1) or "").lower()
            if "regroup" in paren or "categor" in paren or "catégor" in paren:
                grouped_mode = True
            ecoles_inline = parse_ecoles_list(m.group(2))
            current_ecoles.extend(ecoles_inline)
            continue

        if in_ecoles_section:
            # Lignes "Arme : École1, École2" qui suivent l'en-tête
            m2 = _CONTINUATION_RE.match(text)
            if m2:
                arme = m2.group(1).strip()
                ecoles = parse_ecoles_list(m2.group(2))
                current_ecoles.extend(ecoles)
                if grouped_mode:
                    current_ecoles_groupees.setdefault(arme, []).extend(ecoles)
                continue
            # Sinon : on quitte le mode ecoles et on reprend en description
            in_ecoles_section = False
            grouped_mode = False
            current_paras.append(text)
        else:
            current_paras.append(text)

    flush()

    data = {
        "_meta": {
            "source": SOURCE_DOCX.name,
            "nb_techniques": len(techniques),
            "categories": sorted(
                {t["categorie"] for t in techniques.values() if t["categorie"]}
            ),
        },
        "techniques": techniques,
    }

    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    DEST_JSON.write_text(json_text, encoding="utf-8")
    DEST_JS.write_text(
        f"// Généré par docx_techniques_to_json.py — ne pas éditer à la main\n"
        f"window.TECHNIQUES_CORRIGEES = {json_text};\n",
        encoding="utf-8",
    )

    print(f"OK -> {DEST_JSON}")
    print(f"OK -> {DEST_JS}")
    print(f"  {len(techniques)} techniques")
    print(f"  Catégories : {data['_meta']['categories']}")

    # Stats : techniques avec tableau
    with_tables = [t for t in techniques.values() if t.get("tables")]
    if with_tables:
        print(f"  {len(with_tables)} technique(s) avec tableau(x) :")
        for t in with_tables:
            print(f"    - {t['nom']} ({len(t['tables'])} tableau(x))")


if __name__ == "__main__":
    main()
