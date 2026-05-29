"""Construit ecoles.json (+ ecoles.js) à partir de :
  - Liste ecoles Spadassin pour Appli v2.csv  : liste des écoles et résumés
  - techniques_corrigees.json                  : descriptions corrigées (docx)
  - ecoles_enrichies.json                      : enrichissements manuels par école (PDF)

Usage : python csv_to_json.py
Relance ce script après toute modification d'une des sources.

Précédence pour les descriptions de techniques :
  techniques_corrigees.json (docx, corrigé) > rien (affichage "non disponible")
Le CSV 'Liste Techniques.csv' n'est plus utilisé directement ici.
"""

import csv
import json
import re
import unicodedata
from pathlib import Path

from armes_categories import CATEGORIES as ARMES_CATEGORIES, extract_categories, format_arme_display

SOURCE_CSV = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Applications\Tirage de Duelliste\Liste ecoles Spadassin pour Appli v2.csv"
)
DEST_DIR = Path(__file__).parent
TECHNIQUES_JSON = DEST_DIR / "techniques_corrigees.json"
ENRICHISSEMENTS_AUTO_JSON = DEST_DIR / "ecoles_enrichies_auto.json"  # généré depuis PDF
ENRICHISSEMENTS_JSON = DEST_DIR / "ecoles_enrichies.json"            # overrides manuels
DEST_JSON = DEST_DIR / "ecoles.json"
DEST_JS = DEST_DIR / "ecoles.js"

CATEGORIE_TO_RESTRICTION = {
    "Écoles autorisées sans restriction à la création": "libre",
    "Écoles à l'accès limité à la création": "limitee",
    "Écoles interdites à la création": "interdite",
}

# Renommages de noms d'école pour fusionner des doublons venus de sources différentes.
# Appliqué à la fois aux noms du CSV et aux clés des fichiers d'enrichissement.
ECOLE_NAME_REMAP: dict[str, str] = {
    "Gauthier": "Gautier",              # coquille dans le récap PDF / CSV
    "La Pointe au cœur": "La Pointe au Coeur",  # œ vs oe (on garde la forme sans œ)
    "Marikk": "Al Marikk",              # doublon dans le CSV (la vraie école est Al'Marikk)
    "Bernouilli": "Bernoulli",          # le PDF écrit 'Bernouilli', on garde 'Bernoulli'
}

# Override complet de la liste de techniques d'une école (corrige les coquilles CSV).
# Clé = nom canonique d'école, valeur = liste de techniques (format "Nom (variante)").
ECOLE_TECHNIQUES_OVERRIDE: dict[str, list[str]] = {
    # Coquille CSV : techniques collées sans virgule. Liste correcte fournie par Guillaume.
    "Bernoulli": [
        "Exploiter les faiblesses (Sabre)",
        "Corps à corps",
        "Coup puissant",
        "Fente en avant",
        "Voir le style",
    ],
}


def canonicaliser_nom_ecole(nom: str) -> str:
    """Applique ECOLE_NAME_REMAP pour normaliser les variantes en un nom canonique."""
    return ECOLE_NAME_REMAP.get(nom, nom)


# Écoles initialement marquées 'combat_reclassee' (*) dans le CSV mais qui sont
# en réalité des écoles de 2nde édition adaptées par Guillaume. Le PDF source
# fan-made sera fourni plus tard. En attendant on corrige l'origine.
ECOLES_SECONDE_EDITION: set[str] = {
    "Awal Thmani", "Badayah", "Calis", "Chaka", "De Vore", "Fa'tahib",
    "Geng Yu Qiang", "Hallbjorn", "Kulachniy Boi", "Mateenatya", "Mubarizdun",
    "Okada-ryu", "Omuhelo", "Siqueira", "Ssang Geom", "Strade", "Szybowanie",
}

# Mapping de normalisation des nations pour les filtres :
# certaines régions / îles / organisations sont rattachées à une nation parent.
NATION_REMAP = {
    # Trois Royaumes (Îles Glamour) : 3 nations distinctes
    "Bryn Bresail": "Avalon",
    "Highlands": "Marches des Highlands",
    "Marche des Highlands": "Marches des Highlands",  # singulier → pluriel
    # Vesten
    "Vestenmannavnjar": "Vesten",
    "Ligue de Vendel": "Vesten",
    # Régions sans nation propre
    "Confrérie de la Côte": "Nations Pirates",
    "Conférie de la Côte": "Nations Pirates",
    "Fidhelis": "Sarmatie",
    "Kanuba": "Nations Pirates",
    "Colonie de Marcina": "Nations Pirates",
    "Corsaires du Croissant": "Empire du Croissant",
    "Kosars": "Empire du Croissant",
    "Pirates": "Nations Pirates",
    # Organisations religieuses Vaticine
    "Église du Vaticine": "Castille",
    "Inquisition": "Castille",
    "Les Filles de Sophie": "Castille",
    "Los Vagos": "Castille",
    # Organisations eisenores
    "Die Kreuzritter": "Eisen",
    "Les Nibelungen": "Eisen",
    # Organisations Vodacce
    "Rilasciare": "Vodacce",
    "Fraternité de Bahol": "Vodacce",
    # Sociétés savantes (rattachées par défaut à Montaigne, peuvent être discutées)
    "Collège invisible": "Montaigne",
    "Société des explorateurs": "Montaigne",
    "Société des Explorateurs": "Montaigne",
    # Autres factions
    "N.O.M": "Nations Pirates",
    "Empire numain": "Vodacce",                # historique, plus existant en 1668
}

# Termes à IGNORER complètement lors du split des nations (bruit textuel).
NATION_IGNORE: set[str] = {
    "marins",
}

# Nations virtuelles : ajoutées à une école si elle est enseignée dans TOUT un sous-ensemble.
# Ex: "Îles Glamour" si l'école est apprenable dans les 3 royaumes (Avalon + Inismore + Marches).
NATIONS_VIRTUELLES = {
    "Îles Glamour": {"Avalon", "Inismore", "Marches des Highlands"},
}


def ajouter_nations_virtuelles(nations: list[str]) -> list[str]:
    """Ajoute les nations virtuelles si les conditions sont remplies."""
    s = set(nations)
    result = list(nations)
    for virtuelle, requises in NATIONS_VIRTUELLES.items():
        if requises.issubset(s) and virtuelle not in s:
            result.append(virtuelle)
    return result


def normalize(s: str) -> str:
    if not s:
        return ""
    nfkd = unicodedata.normalize("NFKD", s)
    sans_accents = "".join(c for c in nfkd if not unicodedata.combining(c))
    cleaned = (
        sans_accents.replace("-", " ")
        .replace("’", "'")
        .replace("‘", "'")
    )
    return re.sub(r"\s+", " ", cleaned.lower()).strip()


# Alias de noms de techniques (clé = nom normalisé, valeur = nom d'affichage canonique).
# Sert à corriger les variantes/artefacts pour que la ref se résolve vers le docx.
TECHNIQUE_NOM_ALIASES: dict[str, str] = {
    "charge": "Charge de cavalerie",          # 'Charge' seul = charge de cavalerie (évite confusion)
    "vo voir le style": "Voir le style",      # artefact d'extraction PDF (fragment 'Vo' collé)
    "feintes de pirate": "Feinte de pirate",  # Rogers écrit au pluriel ; docx au singulier
}

# Faux noms de techniques à IGNORER (sous-titres capturés à tort dans la police rouge).
TECHNIQUES_IGNOREES: set[str] = {
    "regle speciale",   # 'Règle spéciale' = sous-titre de description, pas une technique
}


def canonicaliser_technique(nom_base: str) -> str | None:
    """Renvoie le nom d'affichage canonique d'une technique, ou None si à ignorer.
    Applique TECHNIQUE_NOM_ALIASES et TECHNIQUES_IGNOREES (matching normalisé).
    """
    key = normalize(nom_base)
    if key in TECHNIQUES_IGNOREES:
        return None
    return TECHNIQUE_NOM_ALIASES.get(key, nom_base)


def parse_origine(nom: str) -> tuple[str, str]:
    nom = nom.strip()
    if nom.endswith("**"):
        return nom[:-2].strip(), "seconde_edition_adaptee"
    if nom.endswith("*"):
        return nom[:-1].strip(), "combat_reclassee"
    return nom, "officielle"


def split_list(value: str) -> list[str]:
    if not value or not value.strip():
        return []
    parts = [re.sub(r"\s+", " ", p).strip() for p in value.split(",")]
    return [p for p in parts if p]


def split_nations(value: str) -> list[str]:
    """Découpe un champ nation sur ',' et ' et '. Applique NATION_REMAP.
    Filtre : ignore le contenu entre parenthèses (notes/commentaires), les chaînes
    trop longues (> 40 chars = probable phrase parasite du PDF), et les mots de
    NATION_IGNORE. Déduplique en préservant l'ordre.
    """
    if not value or not value.strip():
        return []
    cleaned = value.strip().rstrip(".")
    # Retire le contenu entre parenthèses (notes/explications hors nation)
    cleaned = re.sub(r"\s*\([^)]*\)", "", cleaned).strip()
    # Split sur ',' puis sur ' et '
    raw_parts: list[str] = []
    for chunk in cleaned.split(","):
        for sub in re.split(r"\s+et\s+", chunk):
            raw_parts.append(sub)
    seen: set[str] = set()
    ordered: list[str] = []
    for p in raw_parts:
        n = re.sub(r"\s+", " ", p).strip().rstrip(".")
        if not n:
            continue
        # Filtre : trop long = bruit textuel d'origine PDF
        if len(n) > 40:
            continue
        # Filtre : mot ignoré explicitement
        if n in NATION_IGNORE:
            continue
        n = NATION_REMAP.get(n, n)
        if n in seen:
            continue
        seen.add(n)
        ordered.append(n)
    return ordered


def clean_text(value: str) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value).strip()


def parse_technique_ref(raw) -> dict:
    """'Riposte (Sabre)' -> {'nom_base': 'Riposte', 'variante': 'Sabre'}.
    Accepte aussi un dict déjà formé (pour techniques_supplementaires).
    """
    if isinstance(raw, dict):
        return {
            "nom_base": raw.get("nom_base", "").strip(),
            "variante": (raw.get("variante") or None),
        }
    raw = clean_text(raw)
    m = re.match(r"^(.+?)\s*\(([^)]+)\)\s*$", raw)
    if m:
        return {"nom_base": m.group(1).strip(), "variante": m.group(2).strip()}
    return {"nom_base": raw, "variante": None}


def load_techniques_corrigees() -> dict[str, dict]:
    if not TECHNIQUES_JSON.exists():
        print(f"[!] {TECHNIQUES_JSON.name} introuvable — lance d'abord docx_techniques_to_json.py")
        return {}
    raw = json.loads(TECHNIQUES_JSON.read_text(encoding="utf-8"))
    return raw.get("techniques", {})


def load_enrichissements() -> dict[str, dict]:
    """Charge les enrichissements en fusionnant auto (PDF) + manuels.
    Les overrides manuels écrasent l'auto champ par champ pour chaque école.
    Les clés sont canonicalisées via ECOLE_NAME_REMAP.
    """
    merged: dict[str, dict] = {}
    if ENRICHISSEMENTS_AUTO_JSON.exists():
        auto = json.loads(ENRICHISSEMENTS_AUTO_JSON.read_text(encoding="utf-8"))
        for nom, data in (auto.get("ecoles") or {}).items():
            canon = canonicaliser_nom_ecole(nom)
            merged[canon] = dict(data)
    if ENRICHISSEMENTS_JSON.exists():
        manuel = json.loads(ENRICHISSEMENTS_JSON.read_text(encoding="utf-8"))
        for nom, data in (manuel.get("ecoles") or {}).items():
            canon = canonicaliser_nom_ecole(nom)
            if canon in merged:
                merged[canon].update(data)
            else:
                merged[canon] = dict(data)
    return merged


def main() -> None:
    techniques_db = load_techniques_corrigees()
    enrichissements = load_enrichissements()

    ecoles: list[dict] = []
    techniques_non_trouvees: dict[str, list[tuple[str, str]]] = {}

    with SOURCE_CSV.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        cle_compagnon = next(
            (k for k in reader.fieldnames or [] if "Compagnon" in k),
            "Avantage Compagnon",
        )
        all_rows = list(reader)

    # Pré-passe : identifier les noms canoniques qui existent en version 'non-officielle'
    # (combat_reclassee ou seconde_edition_adaptee). Ces versions ont la priorité sur les doublons 'officielle'.
    noms_avec_version_specifique: set[str] = set()
    for row in all_rows:
        nom_brut = row.get("Nom de l'école", "")
        if not nom_brut.strip():
            continue
        nom, origine = parse_origine(nom_brut)
        nom = canonicaliser_nom_ecole(nom)
        if nom in ECOLES_SECONDE_EDITION:
            origine = "seconde_edition_adaptee"
        if origine != "officielle":
            noms_avec_version_specifique.add(nom)

    # Passe principale
    for row in all_rows:
            nom_brut = row["Nom de l'école"]
            if not nom_brut or not nom_brut.strip():
                continue
            nom, origine = parse_origine(nom_brut)
            nom = canonicaliser_nom_ecole(nom)
            # Correction : ces écoles ont * dans le CSV par erreur, en réalité ce sont des 2nde éd.
            if nom in ECOLES_SECONDE_EDITION:
                origine = "seconde_edition_adaptee"
            # Dédup : si une version 'spécifique' existe pour ce nom, on skip la version 'officielle'
            if origine == "officielle" and nom in noms_avec_version_specifique:
                print(f"  [dédup] '{nom_brut}' ignoré : '{nom}' existe déjà avec une origine plus spécifique")
                continue

            # Techniques du CSV (ou override manuel si coquille connue)
            if nom in ECOLE_TECHNIQUES_OVERRIDE:
                techniques_raw = list(ECOLE_TECHNIQUES_OVERRIDE[nom])
            else:
                techniques_raw = split_list(row["Techniques de combat"])
            techniques_enrichies: list[dict] = []
            seen_keys: set[str] = set()
            for t_raw in techniques_raw:
                ref = parse_technique_ref(t_raw)
                canon = canonicaliser_technique(ref["nom_base"])
                if canon is None:
                    continue  # technique ignorée (faux nom)
                ref["nom_base"] = canon
                key = normalize(canon)
                ref["ref"] = key if key in techniques_db else None
                ref["source"] = "csv"
                techniques_enrichies.append(ref)
                seen_keys.add(key)
                if ref["ref"] is None:
                    techniques_non_trouvees.setdefault(key, []).append((nom, t_raw))

            enrichment = enrichissements.get(nom, {})
            for t_supp in enrichment.get("techniques_supplementaires", []):
                ref = parse_technique_ref(t_supp)
                canon = canonicaliser_technique(ref["nom_base"])
                if canon is None:
                    continue
                ref["nom_base"] = canon
                key = normalize(canon)
                if key in seen_keys:
                    continue
                ref["ref"] = key if key in techniques_db else None
                ref["source"] = "enrichment"
                techniques_enrichies.append(ref)
                seen_keys.add(key)
                if ref["ref"] is None:
                    techniques_non_trouvees.setdefault(key, []).append((nom, ref["nom_base"]))

            arme_brute = clean_text(row["Arme utilisée"])
            # Si le PDF donne une arme plus précise, on la préfère
            if enrichment and enrichment.get("armes_pdf"):
                arme_brute = enrichment["armes_pdf"]
            ecole = {
                "nom": nom,
                "origine": origine,
                "nations": split_nations(row["Nations d'enseignement"]),
                "arme": arme_brute,
                "arme_display": format_arme_display(arme_brute),
                "armes_categories": extract_categories(arme_brute),
                "specialisations": split_list(row["Spécialisations"]),
                "description_courte": clean_text(row["Descriptions techniques"]),
                "techniques_combat": techniques_enrichies,
                "avantages_courts": {
                    "apprenti": clean_text(row.get("Avantage Apprenti", "")),
                    "compagnon": clean_text(row.get(cle_compagnon, "")),
                    "maitre": clean_text(row.get("Avantage Maitre", "")),
                },
                "restriction_creation": "inconnue",
                "genre_restriction": None,
            }
            if enrichment:
                details = {k: v for k, v in enrichment.items() if k != "techniques_supplementaires"}
                ecole["details"] = details
                ecole["enrichie"] = True
                categorie = enrichment.get("categorie_creation", "")
                ecole["restriction_creation"] = CATEGORIE_TO_RESTRICTION.get(categorie, "inconnue")
                if enrichment.get("genre_restriction"):
                    ecole["genre_restriction"] = enrichment["genre_restriction"]
                # Le PDF est plus précis que le CSV : on remplace les nations
                # (le CSV met souvent 'Îles Glamour' pour ce que le PDF détaille en Avalon/Inismore/etc.)
                pdf_nations = split_nations(enrichment.get("origine_texte", ""))
                if pdf_nations:
                    ecole["nations"] = pdf_nations
                # Override final : si le manuel précise nations_override, ça écrase tout
                if enrichment.get("nations_override"):
                    ecole["nations"] = list(enrichment["nations_override"])
            else:
                ecole["enrichie"] = False

            # Nations virtuelles (Îles Glamour si les 3 royaumes présents, etc.)
            ecole["nations"] = ajouter_nations_virtuelles(ecole["nations"])

            ecoles.append(ecole)

    # Écoles présentes dans le PDF mais absentes du CSV (ex: école interdite oubliée du CSV)
    noms_csv = {e["nom"] for e in ecoles}
    for nom_pdf, enrichment in enrichissements.items():
        if nom_pdf in noms_csv:
            continue
        details = {k: v for k, v in enrichment.items() if k != "techniques_supplementaires"}
        categorie = enrichment.get("categorie_creation", "")
        # Techniques supplémentaires uniquement (pas de CSV pour celles-ci)
        techs = []
        seen = set()
        for t_supp in enrichment.get("techniques_supplementaires", []):
            ref = parse_technique_ref(t_supp)
            canon = canonicaliser_technique(ref["nom_base"])
            if canon is None:
                continue
            ref["nom_base"] = canon
            key = normalize(canon)
            if key in seen:
                continue
            seen.add(key)
            ref["ref"] = key if key in techniques_db else None
            ref["source"] = "enrichment"
            techs.append(ref)
            if ref["ref"] is None:
                techniques_non_trouvees.setdefault(key, []).append((nom_pdf, ref["nom_base"]))
        nations_pdf = split_nations(enrichment.get("origine_texte", ""))
        arme_brute = enrichment.get("armes_pdf", "")
        ecole = {
            "nom": nom_pdf,
            "origine": "officielle",  # Les écoles ajoutées via PDF sont officielles V1
            "nations": ajouter_nations_virtuelles(nations_pdf),
            "arme": arme_brute,
            "arme_display": format_arme_display(arme_brute),
            "armes_categories": extract_categories(arme_brute),
            "specialisations": enrichment.get("specialisations_pdf", []),
            "description_courte": (details.get("description_longue") or [""])[0][:200],
            "techniques_combat": techs,
            "avantages_courts": {"apprenti": "", "compagnon": "", "maitre": ""},
            "details": details,
            "enrichie": True,
            "restriction_creation": CATEGORIE_TO_RESTRICTION.get(categorie, "inconnue"),
            "genre_restriction": enrichment.get("genre_restriction"),
            "absent_csv": True,
        }
        ecoles.append(ecole)

    nations: set[str] = set()
    for e in ecoles:
        nations.update(e["nations"])

    restrictions_count = {"libre": 0, "interdite": 0, "inconnue": 0}
    for e in ecoles:
        restrictions_count[e["restriction_creation"]] = restrictions_count.get(e["restriction_creation"], 0) + 1

    # Compteurs catégories d'armes
    armes_count = {c: 0 for c in ARMES_CATEGORIES}
    for e in ecoles:
        for c in e.get("armes_categories", []):
            armes_count[c] = armes_count.get(c, 0) + 1

    data = {
        "_meta": {
            "sources": [
                SOURCE_CSV.name,
                TECHNIQUES_JSON.name,
                ENRICHISSEMENTS_AUTO_JSON.name,
                ENRICHISSEMENTS_JSON.name,
            ],
            "nb_ecoles": len(ecoles),
            "nb_ecoles_enrichies": sum(1 for e in ecoles if e["enrichie"]),
            "nb_techniques_definies": len(techniques_db),
            "nations_uniques": sorted(nations, key=str.casefold),
            "armes_categories": ARMES_CATEGORIES,
            "repartition_armes": armes_count,
            "origines_possibles": {
                "officielle": "École de Spadassin officielle (7ème Mer 1ère édition)",
                "combat_reclassee": "École de combat (probablement fanmade) reclassée Spadassin",
                "seconde_edition_adaptee": "École issue de la 2ème édition, adaptée au système V1",
            },
            "restrictions_creation": {
                "libre": "Libre à la création de personnage",
                "limitee": "Accès limité à la création (autorisation MJ requise)",
                "interdite": "Interdite à la création de personnage",
                "inconnue": "Restriction non documentée (école pas encore enrichie depuis un PDF)",
            },
            "repartition_restrictions": restrictions_count,
        },
        "techniques": techniques_db,
        "ecoles": ecoles,
    }

    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    DEST_JSON.write_text(json_text, encoding="utf-8")
    DEST_JS.write_text(
        f"// Généré par csv_to_json.py — ne pas éditer à la main\n"
        f"window.ECOLES_DATA = {json_text};\n",
        encoding="utf-8",
    )

    print(f"OK -> {DEST_JSON}")
    print(f"OK -> {DEST_JS}")
    print(f"  {len(ecoles)} écoles ({data['_meta']['nb_ecoles_enrichies']} enrichies via PDF)")
    print(f"  {len(techniques_db)} techniques (docx corrigé)")
    print(f"  {len(nations)} nations : {sorted(nations, key=str.casefold)}")

    if techniques_non_trouvees:
        print(
            f"\n[!] {len(techniques_non_trouvees)} techniques utilisées par des écoles "
            f"mais absentes du docx corrigé :"
        )
        for key, refs in sorted(techniques_non_trouvees.items()):
            ecoles_set = sorted({e for e, _ in refs})
            exemple = refs[0][1]
            print(
                f"  - '{exemple}'  (clé '{key}', ex: {', '.join(ecoles_set[:3])}"
                + (f", +{len(ecoles_set)-3} autres" if len(ecoles_set) > 3 else "")
                + ")"
            )


if __name__ == "__main__":
    main()
