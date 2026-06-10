#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Parse le fichier extracted.txt (issu de 'Avantages triés.docx')
et génère avantages.json + avantages.js."""

import json
import re
import os
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "_tmp_avantages" / "extracted.txt"
JSON_OUT = ROOT / "avantages.json"
JS_OUT = ROOT / "avantages.js"


# Liste de noms de Nation / catégories utilisées dans les coûts pour
# détecter la restriction ou la réduction. On accepte aussi des suffixes
# 'only' / 'seulement' qui indiquent une restriction stricte.
# IMPORTANT : on traite "Sorcier Porté", "Sorcier Sang-Mêlé", "Sorcière Strega"
# comme des "Nations" au sens du filtre.
NATION_TOKENS = [
    # Nations classiques
    "Aztlan", "Avalonien", "Castillan", "Castille", "Vodacci", "Voddaci",
    "Montaginois", "Eisenor", "Eiseinor", "Ussuran", "Sarmatien",
    "Vesten", "Vendel", "Croissantin", "Cathayan", "Sertepes",
    "Nation Pirate", "Mille Nations",
    # Variantes "sorcier"
    "Sorcier Porté", "Sorcier Sang-Mêlé", "Sorcière Strega",
    "Sorcier Strega", "Sorcière Vodacce", "Fhidelis",
]

# Sections (catégories d'avantages) repérées dans le document
SECTIONS = {
    "Avantages Innés":        "Innés",
    "Avantages Martiaux":     "Martiaux",
    "Avantages Sociaux":      "Sociaux",
    "Avantages Savants":      "Savants",
    "Avantages Maritimes":    "Maritimes",
    "Avantages de Compétences": "Compétences",
    "Autres Avantages":       "Autres",
}

HEADERS_IGNORE = {"Avantage", "Coût en PP", "Description"}


def detecter_cout(s: str) -> bool:
    """Vrai si la chaîne ressemble à un coût d'avantage.

    Accepte : '5', '1 à 5', '3 Aztlan', '10 / 5 si Sorcier...', '1+',
    '6 / 3 Montaginois', 'Variable, Vendel', 'Sorcier Porté only',
    '2 pp/fil, 10 max. Vodacci seulement', '15 Ussuran/Sarmatien Fhidelis'.
    """
    s = s.strip()
    if not s:
        return False
    if s in HEADERS_IGNORE:
        return False
    # Doit être court (les descriptions sont généralement longues)
    if len(s) > 70:
        return False
    # Indicateurs habituels
    if re.match(r"^\d", s):
        return True
    if s.lower().startswith(("variable", "var.", "var ", "var,")):
        return True
    if "only" in s.lower() or "seulement" in s.lower():
        return True
    # NB : ne PAS matcher 'sorcier' seul — 'Sorcier Latent' est un nom
    # d'avantage, pas un coût. 'Sorcier Porté only' est couvert par 'only'.
    return False


def parser_cout(brut: str):
    """Extrait (cout_raw, type_lien, nation_lien, cout_min, cout_max) d'une
    chaîne de coût.

    type_lien :
      - "restriction" : avantage réservé à la Nation
      - "reduction"   : disponible pour tous, moins cher pour la Nation
      - None          : pas de lien à une Nation
    nation_lien : nom du token Nation matché (pour le filtre) ou None
    cout_min / cout_max : tentatives d'extraction numérique pour tri
    """
    raw = brut.strip()
    txt = raw

    # Détection de la Nation mentionnée (le token le plus long match)
    nation = None
    for tok in sorted(NATION_TOKENS, key=len, reverse=True):
        if re.search(r"(?<!\w)" + re.escape(tok) + r"(?!\w)", txt, re.IGNORECASE):
            nation = tok
            break

    # Distinction restriction / réduction :
    # - "only" / "seulement" / nation seule (sans '/' avant) → restriction
    # - "X / Y NATION" → réduction si Y < X
    # Sans nation : on n'a aucun lien (peut-être tarif progressif)
    type_lien = None
    if nation:
        # Chercher '/' avant le token Nation : si présent → réduction
        # Sinon → restriction (l'avantage est exclusif à cette Nation).
        avant_nation = txt.lower().split(nation.lower())[0]
        if "/" in avant_nation:
            type_lien = "reduction"
        else:
            type_lien = "restriction"
        # 'only' / 'seulement' renforce la restriction (même avec /)
        if re.search(r"\bonly\b", txt, re.IGNORECASE) or "seulement" in txt.lower():
            type_lien = "restriction"

    # Extraire les nombres pour tri (premier / dernier)
    nums = [int(m) for m in re.findall(r"\d+", txt)]
    cout_min = nums[0] if nums else None
    cout_max = nums[-1] if nums else cout_min

    return raw, type_lien, nation, cout_min, cout_max


def normaliser_nation(nat: str) -> str:
    """Map les tokens vers les noms officiels utilisés à l'étape 1.
    Le renvoyé est le nom *exact* du JSON creation_perso.js (ou un nom
    de groupe spécial pour les Sorciers / restrictions non-Nation)."""
    mapping = {
        "Avalonien":         "Avalon",
        "Castillan":         "Castille",
        "Castille":          "Castille",
        "Vodacci":           "Vodacce",
        "Voddaci":           "Vodacce",
        "Montaginois":       "Montaigne",
        "Eisenor":           "Eisen",
        "Eiseinor":          "Eisen",
        "Ussuran":           "Ussura",
        "Sarmatien":         "Sarmatie",
        "Vesten":            "Vestenmannavnjar",
        "Vendel":            "Vestenmannavnjar",
        "Croissantin":       "Empire du Croissant",
        "Cathayan":          "Cathay",
        "Sertepes":          "Sertepes",        # nom interne (cf. Dur à cuir)
        "Nation Pirate":     "Nations Pirates",
        "Mille Nations":     "Mille Nations",
        # Aztlan : pas dans le pays officiel, gardons l'étiquette telle quelle
        "Aztlan":            "Aztlan",
        # Sorciers / spéciaux : pas une Nation, mais on garde l'étiquette
        "Sorcier Porté":     "Sorcier Porté",
        "Sorcier Sang-Mêlé": "Sorcier Sang-Mêlé",
        "Sorcière Strega":   "Sorcière Strega",
        "Sorcier Strega":    "Sorcière Strega",
        "Sorcière Vodacce":  "Sorcière Vodacce",
        "Fhidelis":          "Fhidelis",
    }
    return mapping.get(nat, nat)


def main():
    if not SRC.exists():
        print(f"❌ Fichier introuvable : {SRC}")
        return
    lignes = SRC.read_text(encoding="utf-8").splitlines()
    print(f"Lecture {SRC.name} : {len(lignes)} lignes")

    # Filtre les headers de tableau
    lignes = [l.strip() for l in lignes if l.strip() and l.strip() not in HEADERS_IGNORE]

    # Identifier les indices des lignes "section header"
    section_idx = []
    for i, l in enumerate(lignes):
        if l in SECTIONS:
            section_idx.append((i, SECTIONS[l]))
    print(f"Sections détectées : {[s[1] for s in section_idx]}")

    # Parser séquentiellement
    avantages = []
    cur_section = "Autres"
    section_idx_pos = 0
    i = 0
    while i < len(lignes):
        # Passage à une nouvelle section ?
        if section_idx_pos < len(section_idx) and i == section_idx[section_idx_pos][0]:
            cur_section = section_idx[section_idx_pos][1]
            section_idx_pos += 1
            i += 1
            continue

        # Cherche une paire (nom, cout) : on regarde si la ligne suivante
        # ressemble à un coût.
        if i + 1 < len(lignes) and detecter_cout(lignes[i+1]):
            nom_brut = lignes[i]
            cout_brut = lignes[i+1]

            # Filtres : exclure les paragraphes descriptifs (longs)
            if len(nom_brut) > 80 or nom_brut.endswith("."):
                i += 1
                continue

            # Description : prochaines lignes jusqu'à un nouveau coût ou
            # nouvelle section (qui est suivie de "Avantage" mais on a déjà
            # filtré). Heuristique : on s'arrête à la prochaine ligne qui
            # est un nom (i.e. la ligne suivante ressemble à un coût).
            j = i + 2
            desc_lines = []
            while j < len(lignes):
                # Si la ligne suivante est une section, on stoppe.
                if lignes[j] in SECTIONS:
                    break
                # Si la ligne actuelle ressemble à un nom d'avantage suivi
                # d'un coût → on stoppe.
                if j + 1 < len(lignes) and detecter_cout(lignes[j+1]):
                    break
                desc_lines.append(lignes[j])
                j += 1

            description = " ".join(desc_lines).strip()
            description = re.sub(r"\s+", " ", description)
            # Nettoyage : tiret list parasitaire
            description = description.replace("- ", " ").strip()

            # Flags V2 / (H)
            v2 = "*" in nom_brut
            h_heroisme = "(H)" in nom_brut
            # Nom propre (sans * ni (H))
            nom = nom_brut.replace("(H)", "").replace("*", "").strip()
            # Garder les espaces avant les parenthèses (ex: "Animal domestique extra.")
            nom = re.sub(r"\s+", " ", nom).rstrip(".").strip()

            # Parser le coût
            cout_raw, type_lien, nation, c_min, c_max = parser_cout(cout_brut)
            nation_off = normaliser_nation(nation) if nation else None

            avantages.append({
                "nom": nom,
                "categorie": cur_section,
                "cout_raw": cout_raw,
                "cout_min": c_min,
                "cout_max": c_max,
                "type_lien": type_lien,          # "restriction" | "reduction" | None
                "nation_lien": nation_off,        # nom officiel de Nation/spé
                "v2": v2,
                "h_heroisme": h_heroisme,
                "description": description,
            })
            i = j
        else:
            i += 1

    # Dédoublonnage : "Héros local" et "Rythme de sommeil" apparaissent
    # plusieurs fois dans le source, on garde l'avantage du 1er passage.
    vus = set()
    unique = []
    for a in avantages:
        key = a["nom"]
        if key in vus:
            continue
        vus.add(key)
        unique.append(a)

    print(f"Avantages extraits : {len(avantages)} ({len(unique)} uniques)")

    # Stats
    par_cat = {}
    for a in unique:
        par_cat[a["categorie"]] = par_cat.get(a["categorie"], 0) + 1
    print("Par catégorie :", par_cat)

    nb_restriction = sum(1 for a in unique if a["type_lien"] == "restriction")
    nb_reduction = sum(1 for a in unique if a["type_lien"] == "reduction")
    nb_v2 = sum(1 for a in unique if a["v2"])
    nb_h = sum(1 for a in unique if a["h_heroisme"])
    print(f"  - Restreints a Nation : {nb_restriction}")
    print(f"  - Reduction Nation    : {nb_reduction}")
    print(f"  - 2e Edition (*)      : {nb_v2}")
    print(f"  - Heroisme (H)        : {nb_h}")

    meta = {
        "source": "Avantages triés.docx (Guillaume)",
        "nb_avantages": len(unique),
        "categories": list(SECTIONS.values()),
        "par_categorie": par_cat,
    }

    out = {"_meta": meta, "avantages": unique}

    # Écrire JSON
    JSON_OUT.write_text(
        json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[ok] {JSON_OUT.name}")

    # Écrire JS
    js = ("// Genere par parse_avantages.py - ne pas editer a la main\n"
          "window.AVANTAGES_DATA = " +
          json.dumps(out, ensure_ascii=False, indent=2) + ";\n")
    JS_OUT.write_text(js, encoding="utf-8")
    print(f"[ok] {JS_OUT.name}")


if __name__ == "__main__":
    main()
