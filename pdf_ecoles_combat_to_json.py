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
    CATEGORIE_TO_RESTRICTION,
)
from armes_categories import extract_categories, format_arme_display

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


def transformer_ecole(nom: str, enrichment: dict) -> dict:
    """Convertit la sortie du parser PDF en école au format compatible cross-modal.js.

    Format de sortie similaire aux écoles Spadassin enrichies, avec champ details.
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
        techniques.append({
            "nom_base": nom_base,
            "variante": variante,
            "ref": None,  # pas de référence directe au docx techniques pour les combat
            "source": "pdf_combat",
        })

    return {
        "nom": nom,
        "origine": "officielle",  # toutes les écoles du PDF Combat sont V1 officielles
        "nations": nations,
        "arme": arme,
        "arme_display": arme_display,
        "armes_categories": armes_cats,
        "specialisations": enrichment.get("specialisations_pdf", []),
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

    # 2. Parser le PDF Combat (toutes les écoles, sans filtre d'inclusion)
    print(f"Parsing {PDF_COMBAT.name}…")
    raw_ecoles = parse_pdf(PDF_COMBAT, filter_schools=None, tag_source="combat_only")
    print(f"  {len(raw_ecoles)} écoles brutes extraites")

    # 3. Filtrer les exclusions + transformer
    ecoles: list[dict] = []
    nb_exclues = 0
    for nom_raw, enrichment in raw_ecoles.items():
        # Canonicalise le nom (pour le matching avec exclusions)
        nom_canon = canonicaliser_nom_ecole(nom_raw)
        if nom_canon in exclusions:
            nb_exclues += 1
            continue
        ecoles.append(transformer_ecole(nom_canon, enrichment))

    print(f"  → {len(ecoles)} écoles de combat retenues ({nb_exclues} exclues car déjà en Spadassin)")

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
