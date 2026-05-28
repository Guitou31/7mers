"""Parse les PDFs d'écoles (spadassin + combat reclassées) → ecoles_enrichies_auto.json.

Utilise PyMuPDF (fitz) pour exploiter les fonts du PDF :
- CopperplateGothic-Light = nom de l'école
- CopperplateGothic-Bold  = catégorie (libre / interdite à la création)
- DominicanItalic         = titre de section (Réduction, Origine, etc.)
- BookAntiqua             = fluff narratif (texte normal)
- BookAntiqua-Italic      = règles mécaniques (dans les sections de niveau)

Plusieurs PDFs peuvent être configurés via PDFS_A_PARSER. Pour chaque PDF, on peut
fournir un `filter_schools` (liste de noms d'école à conserver) — utile pour les
PDFs comme "Ecoles de combat" où on ne veut qu'une sélection d'écoles reclassées.

Sortie : ecoles_enrichies_auto.json — fusion de toutes les écoles parsées.
"""

import json
import re
import unicodedata
from pathlib import Path

import fitz  # type: ignore

DEST_DIR = Path(__file__).parent
DEST_JSON = DEST_DIR / "ecoles_enrichies_auto.json"

# Configuration : PDFs à parser, avec optionnellement un filtre d'écoles à conserver.
PDFS_A_PARSER: list[dict] = [
    {
        "path": Path(
            r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
            r"\Légendes de la 7ème mer\11 Ecoles de spadassin (16-11-14).pdf"
        ),
        # Pas de filtre → toutes les écoles du PDF sont extraites
        "filter_schools": None,
        "tag_source": "spadassin",
    },
    {
        "path": Path(
            r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
            r"\Légendes de la 7ème mer\16 Ecoles de combat (16-11-14).pdf"
        ),
        # Filtre : écoles à enrichir depuis le PDF Combat (reclassées Spadassin + officielles
        # qui sont décrites dans ce PDF)
        "filter_schools": {
            # Reclassées Spadassin (origine = combat_reclassee dans le CSV via *)
            "Al Marikk", "Angelo", "Awal Thmani", "Badayah", "Basulde", "Caldwell",
            "Calis", "Chaka", "Chin Te", "De Vore", "Délicatesse", "Épées de Salomon",
            "Fadh-Righ", "Fa'tahib", "Geng Yu Qiang", "Halfdansson", "Hallbjorn",
            "Hennessey", "Hua Shao Ren Te", "Kemmler", "Kulachniy Boi", "Malone",
            "Mateenatya", "Mubarizdun", "Mullooney", "Nahgem", "Okada-ryu", "Omuhelo",
            "Peecke", "Rogers", "Rossini", "Scarron", "Scola Carnavale", "Sersemlik",
            "Shan Dian Dao Te", "Siggursdottir", "Siqueira", "Ssang Geom", "Szybowanie",
            "Yael", "Zar'houni",
            # Officielles décrites dans le PDF Combat (origine reste "officielle" — pas d'astérisque)
            "Boucher", "Daphan", "Desaix", "Keiferhund", "Qor'qunq", "Zepeda",
        },
        "tag_source": "combat_reclassee",
    },
]

SECTION_TITLES = {
    "réduction", "reduction",
    "origine",
    "description",
    "académies et lieux d'apprentissage", "academies et lieux d'apprentissage",
    "homologation",
    "doyen de l'école", "doyen de l'ecole",
    "insigne",
    "armes de prédilection", "armes de predilection",
    "spécialisations", "specialisations",
    "niveaux de maîtrise", "niveaux de maitrise",
    # Niveaux : variantes masculines et féminines (ex: La Guêpe)
    "apprenti", "apprentie",
    "compagnon", "compagne",
    "maître", "maitre", "maîtresse", "maitresse",
    "techniques de combat",
}
NIVEAU_KEYS = {
    "apprenti", "apprentie",
    "compagnon", "compagne",
    "maître", "maitre", "maîtresse", "maitresse",
}
NIVEAU_NORMALIZE = {
    "apprenti": "apprenti", "apprentie": "apprenti",
    "compagnon": "compagnon", "compagne": "compagnon",
    "maître": "maitre", "maitre": "maitre",
    "maîtresse": "maitre", "maitresse": "maitre",
}
NIVEAU_FEMININS = {"apprentie", "compagne", "maîtresse", "maitresse"}

# Remap de noms d'école pour gérer les variantes d'orthographe entre PDF et CSV.
# Appliqué juste avant la comparaison au filter_schools (et au stockage final).
# Doit rester en cohérence avec ECOLE_NAME_REMAP de csv_to_json.py.
ECOLE_NAME_REMAP_PDF: dict[str, str] = {
    "Al’Marikk": "Al Marikk",   # apostrophe typographique dans le PDF Combat
    "Al'Marikk": "Al Marikk",   # variante apostrophe ASCII
    "Gauthier": "Gautier",
    "La Pointe au cœur": "La Pointe au Coeur",
}


def canonicaliser_nom_ecole(nom: str) -> str:
    # 1) mapping explicite
    if nom in ECOLE_NAME_REMAP_PDF:
        return ECOLE_NAME_REMAP_PDF[nom]
    # 2) normalise apostrophes typographiques → ASCII (ex: 'Zar’houni' → "Zar'houni")
    norm = nom.replace("’", "'").replace("‘", "'")
    return norm


def _nom_match_filter(nom: str, filter_schools: set[str]) -> bool:
    """Compare avec tolérance aux apostrophes typographiques et au remap explicite."""
    if nom in filter_schools:
        return True
    canon = canonicaliser_nom_ecole(nom)
    return canon in filter_schools


def norm_title(s: str) -> str:
    nfkd = unicodedata.normalize("NFKD", s)
    no_acc = "".join(c for c in nfkd if not unicodedata.combining(c))
    # Apostrophes typographiques → ASCII pour le matching avec SECTION_TITLES
    no_acc = no_acc.replace("’", "'").replace("‘", "'").replace(" ", " ")
    return re.sub(r"\s+", " ", no_acc.lower()).strip().rstrip(":")


def is_italic(span) -> bool:
    return bool(span["flags"] & 2) or "Italic" in span["font"] or "Oblique" in span["font"]


def font_family(span) -> str:
    f = span["font"]
    # Normalise variantes (Italic, Bold)
    base = f.split("-")[0]
    return base


def iter_spans(pdf_path: Path):
    """Yield (page_num, span_dict, line_y) pour chaque span de chaque page."""
    doc = fitz.open(str(pdf_path))
    for page_num, page in enumerate(doc, start=1):
        for blk in page.get_text("dict")["blocks"]:
            if blk.get("type") != 0:
                continue
            for line in blk.get("lines", []):
                y = line["bbox"][1]
                for span in line.get("spans", []):
                    yield page_num, span, y


def clean_text(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def split_list_csv(s: str) -> list[str]:
    parts = re.split(r"\s*,\s*", s)
    return [p.strip().rstrip(".") for p in parts if p.strip()]


def parse_technique_name(raw: str) -> dict:
    raw = clean_text(raw)
    m = re.match(r"^(.+?)\s*\(([^)]+)\)\s*$", raw)
    if m:
        return {"nom_base": m.group(1).strip(), "variante": m.group(2).strip()}
    return {"nom_base": raw, "variante": None}


def is_school_name(span, current_section: str | None) -> bool:
    """Nom d'école = CopperplateGothic-Light, premier span après une catégorie ou un changement d'école."""
    return "CopperplateGothic" in span["font"] and "Light" in span["font"]


def is_section_heading(span) -> tuple[bool, str | None]:
    """Section heading = DominicanItalic OU BookAntiqua-Italic intitulé reconnu."""
    txt = clean_text(span["text"])
    if not txt:
        return False, None
    key = norm_title(txt)
    if "Dominican" in span["font"] and key in SECTION_TITLES:
        return True, key
    return False, None


def parse_pdf(pdf_path: Path, filter_schools: set[str] | None = None, tag_source: str = "") -> dict:
    """Parse un PDF d'écoles → dict { 'Nom École': { ...enrichissement... } }.

    filter_schools : si fourni, ne conserve que ces écoles (correspondance exacte sur le nom).
    tag_source     : tag textuel ajouté dans chaque entrée pour debug/traçabilité.
    """
    ecoles: dict[str, dict] = {}
    current_categorie: str = "Écoles autorisées sans restriction à la création"
    current_ecole: dict | None = None
    current_ecole_name: str | None = None
    current_ecole_categorie: str | None = None  # figée au démarrage de l'école
    current_section: str | None = None
    current_niveau_key: str | None = None
    # Pour collecter les techniques de combat : on conserve les noms (DominicanItalic
    # dans la section techniques) sans leur description
    in_techniques_section = False
    # Buffer pour noms d'école multi-lignes
    pending_school_name: list[str] = []
    # Buffer pour noms de techniques multi-lignes (en section techniques)
    pending_technique_name: list[str] = []
    # Buffer pour titres de section multi-lignes hors techniques
    # (ex: 'Académies et lieux' + 'd'apprentissage' splittés sur 2 spans dans le PDF Combat)
    pending_heading: list[str] = []

    # Buffers
    # description : liste de paragraphes (chaque paragraphe = list de spans accumulés)
    # niveau : 'fluff' (BookAntiqua) + 'regles' (BookAntiqua-Italic)
    buffer_text: list[str] = []
    niveau_fluff: list[str] = []
    niveau_regles: list[str] = []
    techniques_buffer: list[str] = []

    last_y: float | None = None

    def commit_section_to_school():
        """Pousse le contenu du buffer dans la section courante de l'école."""
        nonlocal buffer_text, niveau_fluff, niveau_regles
        if current_ecole is None or current_section is None:
            buffer_text = []
            niveau_fluff = []
            niveau_regles = []
            return

        text_joined = " ".join(buffer_text).strip()
        # Sections simples
        if current_section in ("réduction", "reduction"):
            current_ecole["reduction_xp"] = clean_text(text_joined)
        elif current_section == "origine":
            current_ecole["origine_texte"] = clean_text(text_joined)
        elif current_section == "description":
            # Découpe en paragraphes : on a déjà mis '\n\n' entre les paragraphes
            paras = [clean_text(p) for p in re.split(r"\n\n+", text_joined) if clean_text(p)]
            current_ecole["description_longue"] = paras
        elif current_section in ("académies et lieux d'apprentissage", "academies et lieux d'apprentissage"):
            current_ecole["academies"] = clean_text(text_joined)
        elif current_section == "homologation":
            current_ecole["homologation"] = clean_text(text_joined)
        elif current_section in ("doyen de l'école", "doyen de l'ecole"):
            current_ecole["doyen"] = clean_text(text_joined)
        elif current_section == "insigne":
            current_ecole["insigne"] = clean_text(text_joined)
        elif current_section in ("armes de prédilection", "armes de predilection"):
            current_ecole.setdefault("armes_pdf", clean_text(text_joined).rstrip("."))
        elif current_section in ("spécialisations", "specialisations"):
            current_ecole.setdefault("specialisations_pdf", split_list_csv(text_joined))
        elif current_section in NIVEAU_KEYS:
            niv_key = NIVEAU_NORMALIZE[current_section]
            current_ecole.setdefault("niveaux", {})
            current_ecole["niveaux"][niv_key] = {
                "fluff": clean_text(" ".join(niveau_fluff)),
                "regles": clean_text(" ".join(niveau_regles)),
            }

        buffer_text = []
        niveau_fluff = []
        niveau_regles = []

    def commit_school():
        nonlocal current_ecole, current_ecole_name, current_ecole_categorie, current_section, current_niveau_key, in_techniques_section, techniques_buffer
        if current_ecole is None or current_ecole_name is None:
            return
        commit_section_to_school()
        # Filtre les faux positifs (encarts ex: "Les positions de la Zweihänder")
        # Une vraie école a au moins origine_texte OU description_longue
        if not current_ecole.get("origine_texte") and not current_ecole.get("description_longue"):
            current_ecole = None
            current_ecole_name = None
            current_ecole_categorie = None
            current_section = None
            in_techniques_section = False
            techniques_buffer = []
            return
        if techniques_buffer:
            seen = set()
            techs = []
            for raw in techniques_buffer:
                ref = parse_technique_name(raw)
                # Déduplication insensible à la casse / accents (ex: 'emprisonner' vs 'Emprisonner')
                key = (
                    norm_title(ref["nom_base"]),
                    norm_title(ref.get("variante") or ""),
                )
                if key not in seen:
                    seen.add(key)
                    techs.append(ref)
            current_ecole["techniques_supplementaires"] = techs
        # Utilise la catégorie figée au démarrage de l'école (pas celle en cours)
        current_ecole["categorie_creation"] = current_ecole_categorie or current_categorie
        if tag_source:
            current_ecole["_source_pdf"] = tag_source
        # Canonicalise le nom (gère "Al'Marikk" → "Al Marikk" etc.)
        nom_canonique = canonicaliser_nom_ecole(current_ecole_name)
        # Filtre éventuel : tolérant aux apostrophes typographiques
        if filter_schools is None or _nom_match_filter(current_ecole_name, filter_schools) or nom_canonique in filter_schools:
            ecoles[nom_canonique] = current_ecole
        current_ecole = None
        current_ecole_name = None
        current_ecole_categorie = None
        current_section = None
        in_techniques_section = False
        techniques_buffer = []

    def finalize_pending_school_name():
        """Si on a accumulé des fragments de nom d'école, valider et créer l'école."""
        nonlocal current_ecole, current_ecole_name, current_ecole_categorie, pending_school_name
        if not pending_school_name:
            return
        name = clean_text(" ".join(pending_school_name))
        pending_school_name = []
        commit_school()  # commit l'éventuelle école précédente
        current_ecole = {}
        current_ecole_name = name
        current_ecole_categorie = current_categorie

    for page_num, span, y in iter_spans(pdf_path):
        txt = span["text"]
        if not txt.strip():
            continue

        # Catégorie (CopperplateGothic-Bold, multi-ligne possible)
        if "CopperplateGothic" in span["font"] and "Bold" in span["font"]:
            t = clean_text(txt).lower()
            # 3 catégories possibles : libre, limitée, interdite
            if "interdite" in t:
                current_categorie = "Écoles interdites à la création"
            elif "limit" in t or "acces" in t or "accès" in t:
                current_categorie = "Écoles à l'accès limité à la création"
            elif "restriction" in t or "autoris" in t:
                current_categorie = "Écoles autorisées sans restriction à la création"
            continue

        # Nom d'école (CopperplateGothic-Light) — peut être multi-lignes
        if "CopperplateGothic" in span["font"] and "Light" in span["font"]:
            pending_school_name.append(clean_text(txt))
            continue

        # Tout autre span : on finalise le nom d'école pending s'il y en a un
        if pending_school_name:
            finalize_pending_school_name()

        # Skip headers/footers
        if span["font"] == "ElGar":
            continue

        is_dominican = "Dominican" in span["font"]

        # ---- En section "techniques de combat" : DominicanItalic = nom de technique ----
        if in_techniques_section and current_ecole is not None:
            if is_dominican:
                pending_technique_name.append(clean_text(txt))
            else:
                if pending_technique_name:
                    techniques_buffer.append(" ".join(pending_technique_name))
                    pending_technique_name = []
            continue

        # ---- Hors techniques : DominicanItalic = potentiel titre de section ----
        if is_dominican:
            pending_heading.append(clean_text(txt))
            joined_norm = norm_title(" ".join(pending_heading))
            if joined_norm in SECTION_TITLES:
                heading_key = joined_norm
                commit_section_to_school()
                if pending_technique_name:
                    techniques_buffer.append(" ".join(pending_technique_name))
                    pending_technique_name = []
                current_section = heading_key
                pending_heading = []
                last_y = None
                if heading_key == "techniques de combat":
                    in_techniques_section = True
                elif heading_key in NIVEAU_KEYS:
                    current_niveau_key = NIVEAU_NORMALIZE[heading_key]
                    in_techniques_section = False
                    if heading_key in NIVEAU_FEMININS and current_ecole is not None:
                        current_ecole["genre_restriction"] = "femmes"
                else:
                    current_niveau_key = None
                    in_techniques_section = False
            # Limite la taille du buffer pour éviter qu'il grandisse à l'infini sur du bruit
            if len(pending_heading) > 4:
                pending_heading = pending_heading[-3:]
            continue

        # Tout span non-DominicanItalic abandonne la tentative de heading multi-ligne
        pending_heading = []

        # ---- Texte normal dans une section ----
        if current_ecole is not None and current_section is not None:
            new_para = last_y is not None and (y - last_y) > 14
            last_y = y

            if current_section in NIVEAU_KEYS:
                if is_italic(span):
                    niveau_regles.append(txt)
                else:
                    niveau_fluff.append(txt)
            else:
                if new_para and buffer_text:
                    buffer_text.append("\n\n")
                buffer_text.append(txt)

    # Dernière école
    if pending_school_name:
        finalize_pending_school_name()
    commit_school()
    return ecoles


def main() -> None:
    ecoles: dict[str, dict] = {}
    per_pdf_stats = []
    for cfg in PDFS_A_PARSER:
        pdf_path = cfg["path"]
        if not pdf_path.exists():
            print(f"[!] PDF introuvable : {pdf_path}")
            continue
        filter_schools = cfg.get("filter_schools")
        tag_source = cfg.get("tag_source", "")
        print(f"Parsing {pdf_path.name}…")
        parsed = parse_pdf(pdf_path, filter_schools=filter_schools, tag_source=tag_source)
        # Détection de doublons inter-PDFs
        for nom in parsed:
            if nom in ecoles:
                print(f"  [!] Doublon : '{nom}' déjà parsé via {ecoles[nom].get('_source_pdf')}, écrasé par {tag_source}")
        ecoles.update(parsed)
        # Vérifier que toutes les écoles attendues du filter ont été trouvées
        if filter_schools:
            trouvees = set(parsed.keys()) & filter_schools
            manquantes = filter_schools - trouvees
            if manquantes:
                print(f"  [!] {len(manquantes)} école(s) demandée(s) non trouvée(s) dans {pdf_path.name} : {sorted(manquantes)}")
        per_pdf_stats.append({
            "pdf": pdf_path.name,
            "nb_extraites": len(parsed),
            "filter_size": len(filter_schools) if filter_schools else None,
        })

    libres = [n for n, e in ecoles.items() if "interdite" not in e.get("categorie_creation", "").lower()]
    interdites = [n for n, e in ecoles.items() if "interdite" in e.get("categorie_creation", "").lower()]
    avec_niveaux_complets = [n for n, e in ecoles.items() if e.get("niveaux") and all(e["niveaux"].get(k) for k in ("apprenti", "compagnon", "maitre"))]
    avec_techniques = [n for n, e in ecoles.items() if e.get("techniques_supplementaires")]
    avec_description = [n for n, e in ecoles.items() if e.get("description_longue")]

    data = {
        "_meta": {
            "sources": [str(c["path"].name) for c in PDFS_A_PARSER],
            "per_pdf_stats": per_pdf_stats,
            "nb_ecoles": len(ecoles),
            "libres": sorted(libres),
            "interdites": sorted(interdites),
            "avec_niveaux_complets": len(avec_niveaux_complets),
            "avec_techniques": len(avec_techniques),
            "avec_description": len(avec_description),
        },
        "ecoles": ecoles,
    }

    DEST_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OK -> {DEST_JSON}")
    print(f"  {len(ecoles)} écoles ({len(libres)} libres, {len(interdites)} interdites)")
    print(f"  {len(avec_description)} avec description longue")
    print(f"  {len(avec_niveaux_complets)} avec 3 niveaux complets")
    print(f"  {len(avec_techniques)} avec techniques")
    print(f"  Libres : {sorted(libres)[:10]}...")
    print(f"  Interdites : {sorted(interdites)}")


if __name__ == "__main__":
    main()
