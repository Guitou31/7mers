"""Parse le PDF '16 Ecoles de combat' et produit ecoles_combat.json + .js.

Inclut TOUTES les écoles de combat sauf celles déjà présentes dans ecoles.json
(= les écoles Spadassin + celles reclassées par Guillaume).

Les écoles de combat ont la même structure que les écoles de spadassin enrichies
(description longue, niveaux fluff+règles, techniques, méta-infos). Le format de
sortie est donc compatible avec renderEcole/renderEcoleEnrichie de cross-modal.js.
"""

import json
import re
import sys
from pathlib import Path

DEST_DIR = Path(__file__).parent
sys.path.insert(0, str(DEST_DIR))

import fitz  # type: ignore
from pdf_to_enrichissements import parse_pdf
from csv_to_json import (
    split_nations,
    ajouter_nations_virtuelles,
    canonicaliser_nom_ecole,
    canonicaliser_technique,
    CATEGORIE_TO_RESTRICTION,
    normalize,
    load_techniques_corrigees,
)
from armes_categories import extract_categories, format_arme_display


# ============================================================
# Nettoyage des spécialisations (renoms maison vers entraînements/métiers,
# strip suffixes informatifs, filtre parasites de Canis, split 'X ou Y').
# ============================================================
SPEC_RENAMES = {
    "mousquet":              "Fusils",
    "lance legere":          "Lances",
    "lance de cavalerie":    "Lances",
    "hache a deux mains":    "Haches",
    "masse":                 "Masses",
    "matraque":              "Masses",
    "combat de rues":        "Combat de rue",
    "feng shui shi":         "Feng Shui Shi (Géomancien)",
    "equitation":            "Cavalier",  # discipline → entraînement Cavalier
    "epee courte":           "Escrime (Épées)",  # sous-catégorie d'Escrime
}

# Suffixes parenthétiques 'X (la compétence avancée Y passe/devient...)'
# ou '(au choix du joueur entre...)' à retirer pour ne garder que X.
SPEC_STRIP_SUFFIX_RE = re.compile(
    r"\s*\([^)]*(?:pass[a-z]+|devie[a-z]+|au\s+choix)[^)]*\)$",
    re.IGNORECASE | re.DOTALL,
)

# Mots-clés qui marquent un fragment de stat-block (école Canis, chien de meute)
# capturé à tort comme spécialisation par le parser PDF.
SPEC_PARASITE_KEYWORDS = (
    "trait", "dommages", "qualité d'obéissance", "qualite d'obeissance",
    "coefficient", "compte-tenu", "perspicacité", "perspicacite",
    "morsure", "tours et talents", "obéissance", "obeissance",
    "sur commande", "à la voix", "a la voix",  # tours du chien (Canis)
)


def _pre_clean_spec(s: str) -> str:
    """Si la spec contient un saut de ligne ou un '. ' avec suite longue,
    ne garde que la première partie (ex: 'Piqueux. \\n\\nChien...' → 'Piqueux')."""
    s = s.split("\n", 1)[0].strip()
    if ". " in s:
        head = s.split(". ", 1)[0].strip()
        if head and len(head) < len(s):
            s = head
    return s


def _est_spec_parasite(s: str) -> bool:
    if len(s) > 60:
        return True
    s_low = s.lower()
    if any(kw in s_low for kw in SPEC_PARASITE_KEYWORDS):
        return True
    # Pattern stat-block : '<Mot> <chiffre>' (Dextérité 2, Esprit 1, Jeu de jambes 2…)
    if re.match(r"^[A-Za-zÀ-ÿ' ]+\s+\d+(\s*\([^)]*\))?$", s):
        return True
    return False


def nettoyer_specialisations(specs: list[str]) -> list[str]:
    """Applique nettoyage + normalisation + split à une liste de spécialisations
    brutes (issues du parser PDF) pour produire une liste cliquable."""
    out: list[str] = []
    seen: set[str] = set()
    for raw in specs or []:
        s = _pre_clean_spec(raw)
        if not s:
            continue
        # Strip suffixe informatif (la compétence avancée X passe…) AVANT
        # le test parasite, sinon les entrées longues mais valides sont filtrées.
        s = SPEC_STRIP_SUFFIX_RE.sub("", s).strip(" .")
        if _est_spec_parasite(s):
            continue
        # Split sur ' ou ' et ' et ' → plusieurs spécialisations
        for part in re.split(r"\s+(?:ou|et)\s+", s):
            p = part.strip(" .")
            if not p or _est_spec_parasite(p):
                continue
            # Rename canonique
            k = normalize(p)
            if k in SPEC_RENAMES:
                p = SPEC_RENAMES[k]
            kp = normalize(p)
            if kp in seen:
                continue
            seen.add(kp)
            out.append(p)
    return out

# Écoles de combat à exclure totalement (en plus des doublons Spadassin).
ECOLES_COMBAT_SUPPRIMEES = {"Rachecourt"}  # technique trop spécifique (sorcier Porté)

PDF_COMBAT = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Légendes de la 7ème mer\16 Ecoles de combat (16-11-14).pdf"
)
ECOLES_JSON = DEST_DIR / "ecoles.json"  # source de la liste à exclure
DEST_JSON = DEST_DIR / "ecoles_combat.json"
DEST_JS = DEST_DIR / "ecoles_combat.js"


def charger_exclusions() -> set[str]:
    """Renvoie l'ensemble des noms d'écoles Spadassin déjà dans le site (à exclure)."""
    if not ECOLES_JSON.exists():
        print(f"[!] {ECOLES_JSON.name} introuvable — lance d'abord csv_to_json.py")
        return set()
    raw = json.loads(ECOLES_JSON.read_text(encoding="utf-8"))
    return {e["nom"] for e in raw.get("ecoles", [])}


def transformer_ecole(nom: str, enrichment: dict, techniques_db: dict) -> dict:
    """Convertit la sortie du parser PDF en école au format compatible cross-modal.js.

    Format de sortie similaire aux écoles Spadassin enrichies, avec champ details.
    techniques_db : dict des techniques corrigées (docx) pour résoudre les 'ref'.
    """
    details = {k: v for k, v in enrichment.items()
               if k not in ("techniques_supplementaires", "_source_pdf", "categorie_creation")}
    categorie = enrichment.get("categorie_creation", "")
    restriction = CATEGORIE_TO_RESTRICTION.get(categorie, "inconnue")

    # Nations : depuis origine_texte du PDF (normalisé + remap + virtuelles)
    nations = split_nations(enrichment.get("origine_texte", ""))
    nations = ajouter_nations_virtuelles(nations)

    # Arme : depuis armes_pdf
    arme = enrichment.get("armes_pdf", "")
    arme_display = format_arme_display(arme) if arme else ""
    armes_cats = extract_categories(arme) if arme else []

    # Techniques supplémentaires (depuis le PDF) — pas de description ici, juste les noms
    techs_raw = enrichment.get("techniques_supplementaires", [])
    techniques = []
    seen = set()
    for t in techs_raw:
        nom_base = t.get("nom_base", "").strip() if isinstance(t, dict) else str(t).strip()
        variante = t.get("variante") if isinstance(t, dict) else None
        key = (nom_base.lower(), (variante or "").lower())
        if key in seen or not nom_base:
            continue
        seen.add(key)
        # Canonicalise (alias Charge→Charge de cavalerie, etc.) ou ignore (Règle spéciale).
        canon = canonicaliser_technique(nom_base)
        if canon is None:
            continue
        # Résout la ref vers la base de techniques du docx (même mécanisme que Spadassin).
        ref_key = normalize(canon)
        ref = ref_key if ref_key in techniques_db else None
        techniques.append({
            "nom_base": canon,
            "variante": variante,
            "ref": ref,
            "source": "pdf_combat",
        })

    return {
        "nom": nom,
        "origine": "officielle",  # toutes les écoles du PDF Combat sont V1 officielles
        "nations": nations,
        "arme": arme,
        "arme_display": arme_display,
        "armes_categories": armes_cats,
        "specialisations": nettoyer_specialisations(enrichment.get("specialisations_pdf", [])),
        "description_courte": (details.get("description_longue") or [""])[0][:200],
        "techniques_combat": techniques,
        "avantages_courts": {"apprenti": "", "compagnon": "", "maitre": ""},
        "details": details,
        "enrichie": True,
        "restriction_creation": restriction,
        "genre_restriction": enrichment.get("genre_restriction"),
    }


def main() -> None:
    # 1. Liste des écoles déjà dans Spadassin (à exclure)
    exclusions = charger_exclusions()
    print(f"Exclusions (écoles déjà en Spadassin) : {len(exclusions)}")

    # Base de techniques corrigées (docx) pour résoudre les descriptions.
    techniques_db = load_techniques_corrigees()
    print(f"Techniques corrigées chargées : {len(techniques_db)}")

    # 2. Parser le PDF Combat (toutes les écoles, sans filtre d'inclusion)
    print(f"Parsing {PDF_COMBAT.name}…")
    raw_ecoles = parse_pdf(PDF_COMBAT, filter_schools=None, tag_source="combat_only")
    print(f"  {len(raw_ecoles)} écoles brutes extraites")

    # 3. Filtrer les exclusions + transformer
    ecoles: list[dict] = []
    nb_exclues = 0
    nb_supprimees = 0
    for nom_raw, enrichment in raw_ecoles.items():
        # Canonicalise le nom (pour le matching avec exclusions)
        nom_canon = canonicaliser_nom_ecole(nom_raw)
        if nom_canon in ECOLES_COMBAT_SUPPRIMEES:
            nb_supprimees += 1
            continue
        if nom_canon in exclusions:
            nb_exclues += 1
            continue
        ecoles.append(transformer_ecole(nom_canon, enrichment, techniques_db))
    if nb_supprimees:
        print(f"  {nb_supprimees} école(s) supprimée(s) explicitement : {sorted(ECOLES_COMBAT_SUPPRIMEES)}")

    print(f"  → {len(ecoles)} écoles de combat retenues ({nb_exclues} exclues car déjà en Spadassin)")

    # Stat techniques résolues
    nb_tech = sum(len(e["techniques_combat"]) for e in ecoles)
    nb_tech_ok = sum(1 for e in ecoles for t in e["techniques_combat"] if t.get("ref"))
    print(f"  Techniques : {nb_tech_ok}/{nb_tech} avec description (ref résolue)")

    # 4. Stats
    from collections import Counter
    nations_count = Counter()
    for e in ecoles:
        for n in e["nations"]:
            nations_count[n] += 1
    restrictions_count = Counter(e["restriction_creation"] for e in ecoles)
    armes_count = Counter()
    for e in ecoles:
        for c in e["armes_categories"]:
            armes_count[c] += 1
    print(f"\n  Restrictions : {dict(restrictions_count)}")
    print(f"  Nations distinctes : {len(nations_count)} → {sorted(nations_count.keys(), key=str.casefold)}")
    print(f"  Catégories d'armes : {len(armes_count)}")

    # 5. Output
    data = {
        "_meta": {
            "source": PDF_COMBAT.name,
            "nb_ecoles": len(ecoles),
            "nb_exclues_deja_spadassin": nb_exclues,
            "nations_uniques": sorted(nations_count.keys(), key=str.casefold),
            "repartition_armes": dict(armes_count),
            "repartition_restrictions": dict(restrictions_count),
            "armes_categories": sorted(armes_count.keys()) if armes_count else [],
            "restrictions_creation": {
                "libre": "Libre à la création",
                "limitee": "Accès limité à la création (autorisation MJ)",
                "interdite": "Interdite à la création",
            },
        },
        "ecoles": sorted(ecoles, key=lambda e: e["nom"].lower()),
    }
    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    DEST_JSON.write_text(json_text, encoding="utf-8")
    DEST_JS.write_text(
        f"// Généré par pdf_ecoles_combat_to_json.py — ne pas éditer à la main\n"
        f"window.ECOLES_COMBAT_DATA = {json_text};\n",
        encoding="utf-8",
    )
    print(f"\nOK -> {DEST_JSON}")
    print(f"OK -> {DEST_JS}")


if __name__ == "__main__":
    main()
