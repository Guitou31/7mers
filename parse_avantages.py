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
    # 'only' → 'Seulement' (terminologie française uniforme)
    raw = re.sub(r"\bonly\b", "Seulement", raw, flags=re.IGNORECASE)
    txt = raw

    # Détection des Nations mentionnées (peut y en avoir plusieurs :
    # '3 à 5 Ussuran ou Sarmatien Seulement'). On matche les tokens du
    # plus long au plus court en masquant chaque match pour éviter les
    # chevauchements (Sorcière Strega vs Strega).
    nations = []
    reste = txt
    premiere_pos = None
    for tok in sorted(NATION_TOKENS, key=len, reverse=True):
        m = re.search(r"(?<!\w)" + re.escape(tok) + r"(?!\w)", reste, re.IGNORECASE)
        if m:
            nations.append(tok)
            if premiere_pos is None or m.start() < premiere_pos:
                premiere_pos = m.start()
            reste = reste[:m.start()] + ("#" * len(tok)) + reste[m.end():]
    nation = nations[0] if nations else None

    # Distinction restriction / réduction :
    # - "only" / "seulement" / nation seule (sans '/' avant) → restriction
    # - "X / Y NATION" → réduction si Y < X
    # Sans nation : on n'a aucun lien (peut-être tarif progressif)
    type_lien = None
    if nation:
        # Chercher '/' avant la 1ʳᵉ Nation : si présent → réduction
        # Sinon → restriction (l'avantage est exclusif à cette Nation).
        avant_nation = txt[:premiere_pos] if premiere_pos is not None else txt
        if "/" in avant_nation:
            type_lien = "reduction"
        else:
            type_lien = "restriction"
        # 'only' / 'seulement' renforce la restriction (même avec /)
        if re.search(r"\bonly\b", txt, re.IGNORECASE) or "seulement" in txt.lower():
            type_lien = "restriction"
        # Coûts CROISSANTS avec slash ('10/20/40 Eisenor', '3/5/7 Nation
        # Pirate') = tarif progressif d'un avantage restreint à la Nation,
        # pas une réduction (les réductions sont décroissantes : '6 / 3').
        if type_lien == "reduction":
            m2 = re.match(r"^(\d+)\s*/\s*(\d+)", txt)
            if m2 and int(m2.group(2)) > int(m2.group(1)):
                type_lien = "restriction"

    # Extraire les nombres pour tri (premier / dernier)
    nums = [int(m) for m in re.findall(r"\d+", txt)]
    cout_min = nums[0] if nums else None
    cout_max = nums[-1] if nums else cout_min

    return raw, type_lien, nations, cout_min, cout_max


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


# Corrections de gentilés pour l'affichage des réductions
# (typos du docx, noms de Nation utilisés comme gentilé, etc.)
GENTILE_FIX = {
    "Castille":            "Castillans",
    "Nation Pirate":       "Nations Pirates",
    "Voddaci":             "Vodacci",
    "Eiseinor":            "Eisenors",
    "Ussuran ou Sertepes": "Ussurans et Sertepes",
}


def pluriel_gentile(s):
    """'Eisenor' → 'Eisenors', 'Montaginois' → 'Montaginois', 'Vodacci' → 'Vodacci'.
    Ne pluralise que les gentilés à un seul mot."""
    s = s.strip()
    if s in GENTILE_FIX:
        return GENTILE_FIX[s]
    if " " in s:
        return s
    if s[-1:].lower() in ("s", "x", "z", "i"):
        return s
    return s + "s"


def construire_cout_affiche(a):
    """Libellé de coût clair pour les cartes et le modal.
    Réductions : '4 / 2 Eisenor' → '4 PP (2 PP pour les Eisenors)'.
    Restrictions : '3 Aztlan' → '3 PP' (la Nation est dans le badge)."""
    raw = a["cout_raw"]
    if a["type_lien"] == "reduction":
        m = re.match(r"^(\d+(?:\s*à\s*\d+)?)\s*/\s*(\d+)\s*(si\s+)?(.+)$", raw)
        if m:
            x, y, si, qui = m.group(1).strip(), m.group(2).strip(), m.group(3), m.group(4).strip()
            if si:
                return f"{x} PP ({y} PP si {qui})"
            return f"{x} PP ({y} PP pour les {pluriel_gentile(qui)})"
    if a["type_lien"] == "restriction" and a["nation_lien"]:
        # Partie numérique en tête ('3 à 5', '10/20/40', '1+', '1 à 26'...)
        # Greedy avec arrêt sur la majuscule du gentilé ('3 à 5 Ussuran' →
        # '3 à 5', le 'à' minuscule fait partie de la plage de coût).
        m = re.match(r"^([\d][\d\s/à+,\-]*)(?=[A-ZÀ-Ü])", raw)
        if m and m.group(1).strip():
            return m.group(1).strip().rstrip(",-") + " PP"
    # Défaut : suffixe PP si chiffres présents et pas déjà de 'pp' dans la chaîne
    if re.search(r"\d", raw) and "pp" not in raw.lower():
        return raw + " PP"
    return raw


# Corrections manuelles : classification et/ou libellé de coût.
# Appliquées en dernier (priorité sur la détection automatique).
COUT_OVERRIDES = {
    "Araignée dressée": {
        # Limitée aux Vodacci ; moins chère pour les Sorcières Strega
        # (la sorcellerie Sorte est de toute façon exclusivement vodacci).
        "type_lien": "restriction",
        "nation_lien": "Vodacce",
        "nations_lien": ["Vodacce"],
        "cout_affiche": "2 PP (1 PP pour les Sorcières Strega)",
        "cout_min": 1, "cout_max": 2,
    },
    "Lame du mystère": {
        "cout_affiche": "Variable (selon la lame)",
    },
    "Arme du clan Mac Eachern": {
        # Réservé aux Îles Glamour (Avalon, Inismore, Marches des Highlands).
        # Coût réel : 5 PP.
        "type_lien": "restriction",
        "nation_lien": "Îles Glamour",
        "nations_lien": ["Avalon", "Inismore", "Marches des Highlands"],
        "cout_affiche": "5 PP",
        "cout_min": 5, "cout_max": 5,
    },
    "Pizkaya": {
        # Réservé aux Fidhelis (Ussura / Sarmatie).
        "type_lien": "restriction",
        "nation_lien": "Ussura / Sarmatie",
        "nations_lien": ["Ussura", "Sarmatie"],
        "cout_affiche": "15 PP (Fidhelis Seulement)",
    },
    "Âme Indomptable": {
        "nations_lien": ["Nations Pirates", "Mille Nations"],
        "cout_affiche": "4 PP (2 PP pour les Nations Pirates et Mille Nations)",
    },
    "Liste de clients importants": {
        "cout_affiche": "1 PP (réservé aux Jennys et Courtisanes)",
    },
    "Lame épaissie": {
        "cout_affiche": "2 PP par fil (10 PP max)",
    },
    "Arme achetée": {
        "cout_affiche": "Variable (+2 PP au coût initial de l'arme)",
    },
}


# Réécritures des descriptions courtes trop sommaires ou renvoyant au PDF
# ('voir p38', 'voir table'...). Affichées directement sur les cartes.
DESC_OVERRIDES = {
    "Lame du mystère":
        "Lame montaginoise dotée d'un pouvoir mystérieux, frappée du sceau "
        "de Renart ou d'Isengrin (effets selon la lame).",
    "Sang Sidhe":
        "Sang féerique d'Avalon : composez vos bénédictions (séduction, "
        "vision du Glamour, longévité…) et malédictions Sidhes.",
    "Lame castillane":
        "Lame de maître castillane (Aldana, Gallegos, Soldano…) offrant "
        "un bonus propre à son école d'escrime.",
    "Porte-Poisse":
        "Vous subissez un 2ᵉ Travers (Main du Destin).",
    "Coursier du vent":
        "Un cheval Pur-Sang du Croissant offert à la création.",
    "Héritage":
        "Propriété, équipement ou biens reçus en héritage (valeur selon "
        "les PP investis).",
    "Arme Sidhe":
        "Arc, dague, épée ou lance Sidhe enchantée. -1 PP si vous avez "
        "l'avantage Sang Sidhe.",
    "Doigts de Fée":
        "+1g0 aux tests de minutie (crochetage, joaillerie, "
        "prestidigitation…).",
    "Sens Aiguisés":
        "+1g0 à tous les jets de Perception.",
}


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
            cout_raw, type_lien, nations_tok, c_min, c_max = parser_cout(cout_brut)
            # Normalise chaque Nation détectée, dédoublonne en gardant l'ordre
            nations_off = []
            for tok in nations_tok:
                off = normaliser_nation(tok)
                if off not in nations_off:
                    nations_off.append(off)
            nation_off = " / ".join(nations_off) if len(nations_off) > 1 \
                else (nations_off[0] if nations_off else None)

            entry = {
                "nom": nom,
                "categorie": cur_section,
                "cout_raw": cout_raw,
                "cout_min": c_min,
                "cout_max": c_max,
                "type_lien": type_lien,          # "restriction" | "reduction" | None
                "nation_lien": nation_off,        # libellé (peut être 'A / B')
                "v2": v2,
                "h_heroisme": h_heroisme,
                "description": description,
            }
            if len(nations_off) > 1:
                entry["nations_lien"] = nations_off
            avantages.append(entry)
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

    # Applique les réécritures de descriptions courtes
    for a in unique:
        if a["nom"] in DESC_OVERRIDES:
            a["description"] = DESC_OVERRIDES[a["nom"]]

    # Libellé de coût clair + corrections manuelles
    for a in unique:
        a["cout_affiche"] = construire_cout_affiche(a)
        if a["nom"] in COUT_OVERRIDES:
            a.update(COUT_OVERRIDES[a["nom"]])

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
