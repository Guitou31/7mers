"""Parse le PDF '05 Entraînements (10-07-13).pdf' → entrainements_auto.json puis applique
les modifications maison de Guillaume (fusions, renommages).

Structure du PDF (identique aux écoles) :
- CopperplateGothic-Bold  : catégorie (libre / accès limité)
- CopperplateGothic-Light : nom de l'entraînement
- DominicanItalic         : titre de section (Description, Compétences de base, Compétences avancées)
- BookAntiqua             : contenu

Sortie : entrainements.json + entrainements.js (window.ENTRAINEMENTS_DATA = ...)
"""

import json
import re
import unicodedata
from pathlib import Path

import fitz  # type: ignore

SOURCE_PDF = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Légendes de la 7ème mer\05 Entraînements (10-07-13).pdf"
)
DEST_DIR = Path(__file__).parent
DEST_JSON = DEST_DIR / "entrainements.json"
DEST_JS = DEST_DIR / "entrainements.js"

SECTION_TITLES = {
    "description",
    "competences de base", "compétences de base",
    "competences avancees", "compétences avancées",
}

CATEGORIE_TO_RESTRICTION = {
    "Entraînements autorisés sans restriction à la création": "libre",
    "Entraînements à l'accès limité à la création": "limitee",
}


def norm_title(s: str) -> str:
    nfkd = unicodedata.normalize("NFKD", s)
    no_acc = "".join(c for c in nfkd if not unicodedata.combining(c))
    no_acc = no_acc.replace("’", "'").replace("‘", "'").replace(" ", " ")
    return re.sub(r"\s+", " ", no_acc.lower()).strip().rstrip(":")


def clean_text(value: str) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value).strip()


def split_competences(text: str) -> list[str]:
    """Découpe une liste de compétences séparées par ',', '.' ou ';'. Conserve les parenthèses.
    Filtre les placeholders 'Aucune' (PDF originel indique 'Aucune' quand il n'y a rien).
    """
    if not text or not text.strip():
        return []
    placeholder_map = {}
    def _stash(m):
        key = f"\x00P{len(placeholder_map)}\x00"
        placeholder_map[key] = m.group(0)
        return key
    masked = re.sub(r"\([^)]*\)", _stash, text)
    parts = re.split(r"\s*[,.;]\s*", masked)
    result = []
    for p in parts:
        for k, v in placeholder_map.items():
            p = p.replace(k, v)
        p = clean_text(p)
        if not p:
            continue
        # Filtre les placeholders "Aucune"
        if p.lower() in ("aucune", "aucun", "-"):
            continue
        result.append(p)
    return result


def renommer_arme_dans_competences(competences: list[str], remplacements: list[tuple[str, str]]) -> list[str]:
    """Remplace les variantes d'arme entre parenthèses dans les noms de compétences,
    puis déduplique en gardant l'ordre.
    remplacements : liste de (motif_arme, nouveau_nom). Le motif est inséré dans une regex
    insensible à la casse, sans tenir compte des accents (utilisé via fonction de normalisation).
    """
    def normalize(s):
        nfkd = unicodedata.normalize("NFKD", s)
        return "".join(c for c in nfkd if not unicodedata.combining(c)).lower()

    out = []
    seen = set()
    for c in competences:
        modif = c
        for ancien, nouveau in remplacements:
            ancien_norm = normalize(ancien)
            # Cherche dans la version normalisée puis remplace dans la version originale
            modif_norm = normalize(modif)
            pat_paren = re.compile(r"\(" + re.escape(ancien_norm) + r"\)")
            if pat_paren.search(modif_norm):
                # Remplace toutes les occurrences entre parens, insensible à la casse/accents
                idx = 0
                rebuilt = []
                for m in pat_paren.finditer(modif_norm):
                    rebuilt.append(modif[idx:m.start()])
                    rebuilt.append(f"({nouveau})")
                    idx = m.end()
                rebuilt.append(modif[idx:])
                modif = "".join(rebuilt)
        if modif not in seen:
            seen.add(modif)
            out.append(modif)
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


def parse_pdf() -> list[dict]:
    """Parse le PDF, renvoie la liste ordonnée des entraînements bruts."""
    entrainements: list[dict] = []
    current_categorie: str = "Entraînements autorisés sans restriction à la création"
    current_entry: dict | None = None
    current_entry_categorie: str | None = None
    current_section: str | None = None
    pending_school_name: list[str] = []
    pending_heading: list[str] = []
    buffer_text: list[str] = []

    def commit_section():
        nonlocal buffer_text
        if current_entry is None or current_section is None:
            buffer_text = []
            return
        joined = " ".join(buffer_text).strip()
        text = clean_text(joined)
        if current_section == "description":
            current_entry["description"] = text
        elif current_section in ("competences de base", "compétences de base"):
            current_entry["competences_base"] = split_competences(text)
        elif current_section in ("competences avancees", "compétences avancées"):
            current_entry["competences_avancees"] = split_competences(text)
        buffer_text = []

    def commit_entry():
        nonlocal current_entry, current_entry_categorie, current_section
        if current_entry is None:
            return
        commit_section()
        # Filtre faux positifs : doit avoir au moins description
        if not current_entry.get("description"):
            current_entry = None
            current_entry_categorie = None
            current_section = None
            return
        current_entry["categorie_creation"] = current_entry_categorie or current_categorie
        entrainements.append(current_entry)
        current_entry = None
        current_entry_categorie = None
        current_section = None

    def finalize_pending_name():
        nonlocal current_entry, current_entry_categorie, pending_school_name
        if not pending_school_name:
            return
        name = clean_text(" ".join(pending_school_name))
        pending_school_name = []
        commit_entry()
        current_entry = {"nom": name}
        current_entry_categorie = current_categorie

    for page_num, span, y in iter_spans(SOURCE_PDF):
        txt = span["text"]
        if not txt.strip():
            continue

        # Catégorie (CopperplateGothic-Bold)
        if "CopperplateGothic" in span["font"] and "Bold" in span["font"]:
            t = clean_text(txt).lower()
            if "limit" in t or "acces" in t or "accès" in t:
                current_categorie = "Entraînements à l'accès limité à la création"
            elif "restriction" in t or "autoris" in t:
                current_categorie = "Entraînements autorisés sans restriction à la création"
            continue

        # Nom d'entraînement (CopperplateGothic-Light)
        if "CopperplateGothic" in span["font"] and "Light" in span["font"]:
            pending_school_name.append(clean_text(txt))
            continue

        if pending_school_name:
            finalize_pending_name()

        if span["font"] == "ElGar":
            continue

        is_dominican = "Dominican" in span["font"]

        if is_dominican:
            pending_heading.append(clean_text(txt))
            joined_norm = norm_title(" ".join(pending_heading))
            if joined_norm in SECTION_TITLES:
                commit_section()
                current_section = joined_norm
                pending_heading = []
            if len(pending_heading) > 4:
                pending_heading = pending_heading[-3:]
            continue

        pending_heading = []

        if current_entry is not None and current_section is not None:
            buffer_text.append(txt)

    if pending_school_name:
        finalize_pending_name()
    commit_entry()
    return entrainements


# =========================================================================
# Transformations maison de Guillaume
# =========================================================================

def appliquer_modifs_guillaume(entries: list[dict]) -> list[dict]:
    """Applique les fusions et renommages personnels :
    - Escrime : préciser 3 catégories + renommer compétences (Escrime) → (Sabres, Rapières ou Épées)
    - Hache + Hache à deux mains → Haches
    - Lance de cavalerie + Lance légère → Lances
    - Matraque → Masses (fusion)
    - Mousquet → Fusils (incluant Arquebuses)
    """
    by_nom = {e["nom"]: e for e in entries}

    # ---- Escrime : précisions Sabres/Rapières/Épées ----
    if "Escrime" in by_nom:
        e = by_nom["Escrime"]
        e["description"] = (
            "Cette catégorie regroupe trois sous-catégories d'armes blanches d'escrime : "
            "Sabres (lames courbes à une main), Rapières (rapière, fleuret, estoc, canne-épée) "
            "et Épées (épée droite, épée longue, katana, etc.). "
            "Les bonus s'appliquent à la sous-catégorie choisie lors de l'apprentissage de la compétence. "
            "" + e["description"]
        )
        def reword(s: str) -> str:
            return s.replace("(Escrime)", "(Sabres, Rapières ou Épées)")
        e["competences_base"] = [reword(c) for c in e.get("competences_base", [])]
        e["competences_avancees"] = [reword(c) for c in e.get("competences_avancees", [])]

    # ---- Fusion Hache + Hache à deux mains → Haches ----
    if "Hache" in by_nom and "Hache à deux mains" in by_nom:
        hache = by_nom["Hache"]
        h2m = by_nom["Hache à deux mains"]
        hache["nom"] = "Haches"
        hache["description"] = (
            "Cet entraînement regroupe les haches à une main et les haches à deux mains "
            "(version maison fusionnée pour simplifier). "
            "" + hache["description"]
            + " " + h2m.get("description", "")
        )
        remplacements = [("Hache à deux mains", "Haches"), ("Hache", "Haches")]
        hache["competences_base"] = renommer_arme_dans_competences(
            hache.get("competences_base", []) + h2m.get("competences_base", []), remplacements
        )
        hache["competences_avancees"] = renommer_arme_dans_competences(
            hache.get("competences_avancees", []) + h2m.get("competences_avancees", []), remplacements
        )
        entries = [e for e in entries if e["nom"] != "Hache à deux mains"]
        by_nom = {e["nom"]: e for e in entries}

    # ---- Fusion Lance de cavalerie + Lance légère → Lances ----
    lance_cav_nom = next((n for n in ["Lance de cavalerie"] if n in by_nom), None)
    lance_leg_nom = next((n for n in ["Lance légère"] if n in by_nom), None)
    if lance_cav_nom and lance_leg_nom:
        lc = by_nom[lance_cav_nom]
        ll = by_nom[lance_leg_nom]
        remplacements_lances = [
            ("Lance de cavalerie", "Lances"),
            ("Lance légère", "Lances"),
            ("Lance", "Lances"),
        ]
        lances = {
            "nom": "Lances",
            "categorie_creation": lc["categorie_creation"],
            "description": (
                "Cet entraînement regroupe les lances de cavalerie (lourdes, utilisées à cheval) "
                "et les lances légères (utilisées au sol ou jetées) — version maison fusionnée. "
                "" + lc.get("description", "")
                + " " + ll.get("description", "")
            ),
            "competences_base": renommer_arme_dans_competences(
                lc.get("competences_base", []) + ll.get("competences_base", []), remplacements_lances
            ),
            "competences_avancees": renommer_arme_dans_competences(
                lc.get("competences_avancees", []) + ll.get("competences_avancees", []), remplacements_lances
            ),
        }
        # Remplace les 2 par l'unique "Lances"
        new_entries = []
        inserted = False
        for e in entries:
            if e["nom"] in (lance_cav_nom, lance_leg_nom):
                if not inserted:
                    new_entries.append(lances)
                    inserted = True
            else:
                new_entries.append(e)
        entries = new_entries
        by_nom = {e["nom"]: e for e in entries}

    # ---- Matraque → fusion avec Masse (= Masses) ----
    if "Masse" in by_nom and "Matraque" in by_nom:
        m = by_nom["Masse"]
        ma = by_nom["Matraque"]
        m["nom"] = "Masses"
        m["description"] = (
            "Cet entraînement regroupe les masses d'armes et les matraques "
            "(version maison fusionnée). "
            "" + m["description"]
            + " " + ma.get("description", "")
        )
        remplacements_masses = [("Matraque", "Masses"), ("Masse", "Masses")]
        m["competences_base"] = renommer_arme_dans_competences(
            m.get("competences_base", []) + ma.get("competences_base", []), remplacements_masses
        )
        m["competences_avancees"] = renommer_arme_dans_competences(
            m.get("competences_avancees", []) + ma.get("competences_avancees", []), remplacements_masses
        )
        entries = [e for e in entries if e["nom"] != "Matraque"]
        by_nom = {e["nom"]: e for e in entries}

    # ---- Mousquet → renommé "Fusils" englobant Arquebuses + Mousquets ----
    if "Mousquet" in by_nom:
        m = by_nom["Mousquet"]
        m["nom"] = "Fusils"
        m["description"] = (
            "Cet entraînement, propre à la version maison, regroupe le maniement des deux "
            "principaux types d'armes à feu d'épaule de Théah : les arquebuses (anciennes, "
            "à mèche) et les mousquets (modernes, à platine à silex). Tous deux requièrent "
            "un temps de rechargement notable mais infligent des dégâts redoutables. "
            "" + m["description"]
        )
        remplacements_fusils = [("Arquebuse", "Fusils"), ("Mousquet", "Fusils")]
        m["competences_base"] = renommer_arme_dans_competences(
            m.get("competences_base", []), remplacements_fusils
        )
        m["competences_avancees"] = renommer_arme_dans_competences(
            m.get("competences_avancees", []), remplacements_fusils
        )

    # ---- Arc : ajouter Recharger (Arc) en base (règle maison universelle de
    #      rechargement applicable aussi aux arcs, même si la valeur de
    #      rechargement y est dérisoire). ----
    if "Arc" in by_nom:
        a = by_nom["Arc"]
        base = list(a.get("competences_base", []))
        if not any("recharger" in c.lower() and "arc" in c.lower() for c in base):
            base.append("Recharger (Arc)")
            a["competences_base"] = base

    # ---- Pugilat : filtrer 2 phrases parasites capturées comme compétences
    #      (paragraphe explicatif mal coupé par le parser PDF). ----
    if "Pugilat" in by_nom:
        p = by_nom["Pugilat"]
        PARASITES_PREFIXES = (
            "ces entraînements sont limités",
            "ils nécessitent donc l",
            "ce sont des entraînements",
            "autorisation du mj",
        )
        def _est_parasite(c: str) -> bool:
            cl = c.lower().strip()
            return any(cl.startswith(p) for p in PARASITES_PREFIXES) or len(cl) > 80
        p["competences_avancees"] = [c for c in p.get("competences_avancees", [])
                                     if not _est_parasite(c)]

    # ---- Normalisation finale : applique COMPETENCES_REF_NORMALISATIONS
    #      du module métiers (Calligraphe→Calligraphie, Équitation→canonique,
    #      Soin des chevaux→Soin des animaux, Uppercut suffixe, etc.). ----
    try:
        from pdf_metiers_to_json import normaliser_ref_competence
        for e in entries:
            for k in ("competences_base", "competences_avancees"):
                if e.get(k):
                    e[k] = [normaliser_ref_competence(c) for c in e[k]]
    except ImportError:
        pass  # autonomie : si pdf_metiers indisponible, pas grave

    return entries


def main() -> None:
    raw = parse_pdf()
    entries = appliquer_modifs_guillaume(raw)

    libres = [e for e in entries if e.get("categorie_creation", "").lower().startswith("entraînements autorisés")]
    limitees = [e for e in entries if "limit" in e.get("categorie_creation", "").lower()]

    data = {
        "_meta": {
            "source": SOURCE_PDF.name,
            "nb_entrainements_total": len(entries),
            "nb_libres": len(libres),
            "nb_limitees": len(limitees),
            "categorie_to_restriction": CATEGORIE_TO_RESTRICTION,
            "modifs_maison": [
                "Escrime divisée en sous-catégories Sabres/Rapières/Épées",
                "Hache + Hache à deux mains fusionnés en Haches",
                "Lance de cavalerie + Lance légère fusionnés en Lances",
                "Matraque fusionnée dans Masses",
                "Mousquet renommé Fusils (englobe Arquebuses + Mousquets)",
            ],
        },
        "entrainements": entries,
    }

    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    DEST_JSON.write_text(json_text, encoding="utf-8")
    DEST_JS.write_text(
        f"// Généré par pdf_entrainements_to_json.py — ne pas éditer à la main\n"
        f"window.ENTRAINEMENTS_DATA = {json_text};\n",
        encoding="utf-8",
    )

    print(f"OK -> {DEST_JSON}")
    print(f"OK -> {DEST_JS}")
    print(f"  {len(entries)} entraînements ({len(libres)} libres, {len(limitees)} limitées)")
    print(f"  Modifs maison appliquées : voir _meta.modifs_maison")
    # Liste rapide
    for e in entries:
        rest = "limitée" if "limit" in e.get("categorie_creation", "").lower() else "libre"
        print(f"    [{rest:8}] {e['nom']}  (base: {len(e.get('competences_base', []))}, av: {len(e.get('competences_avancees', []))})")


if __name__ == "__main__":
    main()
