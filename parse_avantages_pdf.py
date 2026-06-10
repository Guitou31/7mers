#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Enrichit avantages.json avec les descriptions longues du PDF V1
'09 Avantages (10-09-14).pdf' (Légendes de la 7ème mer).

Structure typographique du PDF :
  - CopperplateGothic-Bold ~18pt : catégories (Background, Avalon, ...)
  - DominicanItalic ~13.9pt      : noms d'avantages (et sous-variantes)
  - BookAntiqua-BoldItalic ~9pt  : lignes 'Coût : X PP'
  - BookAntiqua(-Italic) ~9pt    : description (fluff + règles)

Particularités gérées :
  - Les blocs 'Table N : ...' sont absorbés dans l'avantage précédent.
  - Certains avantages ont des sous-variantes titrées (Séduisant →
    Éblouissant..., Relations → Allié/Confident/Informateur, etc.) :
    absorption manuelle via SOUS_BLOCS.
  - Les sections nationales dupliquent certains noms (Grande famille
    existe comme qualité de Serviteur ET comme avantage castillan) :
    résolution par préférence de catégorie selon nation_lien du docx.

Sortie : ajoute aux avantages matchés les champs
  - description_v1 : liste de paragraphes
  - cout_v1        : texte de la ligne de coût du PDF
puis régénère avantages.json + avantages.js.
"""

import json
import re
import unicodedata
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).parent
PDF = Path(r"D:/Utilisateur/Guillaume/Bureau/JDR Papier/7ème Mer/Légendes de la 7ème mer/09 Avantages (10-09-14).pdf")
JSON_PATH = ROOT / "avantages.json"
JS_PATH = ROOT / "avantages.js"

SKIP_PAGES = {0, 1, 2}  # couverture + sommaire


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = s.replace("’", "'").replace("œ", "oe")
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return s.strip()


# Sous-variantes : combien de blocs nommés suivant le parent doivent être
# fusionnés dans sa description (les blocs 'Table...' sont absorbés à part).
SOUS_BLOCS = {
    "artefact syrneth": 10,        # Boîte argentée ... Sabre d'abordage
    "artefacts sidhes": 4,         # Arc, Dague, Épée, Lance Sidhe
    "seduisant": 4,                # Séduisant(5), Éblouissant, Intimidant, Beauté divine
    "expression inquietante": 3,   # Sombre, Angoissant, Inquiétant
    "relations": 3,                # Allié, Confident, Informateur
    "sens de l humour": 3,         # Grand guignol, Humour noir, Le bon mot
    "relation fidhelie": 3,        # Contacts, Adoption, Dans le secret
    "lame castilliane": 6,         # Aldana, Gallegos, Ochoa, Soldano, Torres, Zepeda
    "lame du mystere": 6,          # Règles générales + Renart/Isengrin/Bonnegrâce/Malemort/Lemaître
    "parent proche": 10,           # Chef de famille ... Sorcier
    "sang sidhe": 19,              # Bénédictions ... Vulnérabilité au sel
    "dracheneisen": 1,             # Modifications de Panzerfaust
    "serviteur": 14,               # Types ... Sorcier (qualités)
    "citation": 16,                # Médailles ... Indulgence
}


def extraire_events():
    """Liste d'événements (kind, text) dans l'ordre de lecture."""
    doc = fitz.open(PDF)
    events = []
    for pno in range(len(doc)):
        if pno in SKIP_PAGES:
            continue
        d = doc[pno].get_text("dict")
        for block in d["blocks"]:
            if "lines" not in block:
                continue
            for line in block["lines"]:
                if not line["spans"]:
                    continue
                text = "".join(sp["text"] for sp in line["spans"]).strip()
                if not text:
                    continue
                sp0 = max(line["spans"], key=lambda sp: len(sp["text"]))
                font = sp0["font"]
                size = sp0["size"]

                if "ElGar" in font:
                    continue  # en-têtes de page / numéros
                if "CopperplateGothic" in font and size > 14:
                    events.append(("categorie", text))
                elif "Dominican" in font and size > 11:
                    events.append(("nom", text))
                elif "BoldItalic" in font and re.match(r"^co[uû]t", text, re.IGNORECASE):
                    events.append(("cout", text))
                else:
                    events.append(("texte", text))
    return events


def lignes_vers_paragraphes(lignes):
    paras = []
    buf = ""
    for ligne in lignes:
        ligne = ligne.strip()
        if not ligne:
            continue
        if buf:
            if buf.endswith("-"):
                buf = buf[:-1] + ligne
            else:
                buf += " " + ligne
        else:
            buf = ligne
        if re.search(r"[.:!?;…]\s*$", ligne):
            paras.append(re.sub(r"\s+", " ", buf).strip())
            buf = ""
    if buf:
        paras.append(re.sub(r"\s+", " ", buf).strip())
    return paras


def grouper(events):
    """Groupe les événements en blocs {nom, categorie, cout_v1, paragraphes}."""
    bruts = []
    cur = None
    cur_cat = None
    # Fusion des noms coupés sur 2 lignes consécutives
    fusionnes = []
    for kind, text in events:
        if kind == "nom" and fusionnes and fusionnes[-1][0] == "nom":
            fusionnes[-1] = ("nom", fusionnes[-1][1] + " " + text)
        else:
            fusionnes.append((kind, text))

    for kind, text in fusionnes:
        if kind == "categorie":
            # Changement de section : on clôt le bloc courant pour éviter
            # que le texte d'introduction de la nouvelle section (avant son
            # premier avantage) ne pollue la description du bloc précédent.
            if cur:
                bruts.append(cur)
                cur = None
            cur_cat = text
        elif kind == "nom":
            if cur:
                bruts.append(cur)
            cur = {"nom": text, "categorie": cur_cat,
                   "cout_v1": None, "lignes": []}
        elif kind == "cout":
            if cur:
                if cur["cout_v1"]:
                    cur["lignes"].append(text)
                else:
                    cur["cout_v1"] = text
        elif kind == "texte":
            if cur:
                cur["lignes"].append(text)
    if cur:
        bruts.append(cur)

    # ===== Absorption =====
    # 1. Les blocs 'Table...' / 'Légende de la table' fusionnent toujours
    #    dans le bloc précédent.
    # 2. Les sous-variantes (SOUS_BLOCS) fusionnent dans leur parent,
    #    avec leur nom inséré en tête de paragraphe.
    result = []
    absorb_left = 0
    # L'absorption SOUS_BLOCS ne se déclenche qu'à la PREMIÈRE occurrence
    # d'un nom parent : les sections nationales répètent 'Serviteur' (etc.)
    # comme simple sous-titre et ne doivent pas avaler les avantages voisins.
    triggered = set()
    for b in bruts:
        nom_n = norm(b["nom"])
        est_table = nom_n.startswith("table ") or nom_n.startswith("legende de la table")
        if result and est_table:
            # Table → absorbée silencieusement (le contenu linéarisé d'une
            # table PDF est illisible ; on garde juste la mention).
            result[-1]["lignes"].append("(" + b["nom"] + " — voir le PDF source.)")
            continue
        if result and absorb_left > 0:
            parent = result[-1]
            titre = b["nom"] + (" — " + b["cout_v1"] if b["cout_v1"] else "")
            parent["lignes"].append("◆ " + titre + " :")
            parent["lignes"].extend(b["lignes"])
            absorb_left -= 1
            continue
        # Nouveau bloc autonome
        result.append(b)
        if nom_n in SOUS_BLOCS and nom_n not in triggered:
            absorb_left = SOUS_BLOCS[nom_n]
            triggered.add(nom_n)
        else:
            absorb_left = 0

    for b in result:
        b["paragraphes"] = lignes_vers_paragraphes(b["lignes"])
        del b["lignes"]
    return result


# Alias nom docx (normalisé) → noms PDF candidats (normalisés)
ALIASES = {
    "liste de clients importants": ["liste de clients importante"],
    "education castillane": ["education castilliane"],
    "lame castillane": ["lame castilliane"],
    "immunise a un poison": ["immunite au poison"],
    "arme sidhe": ["artefacts sidhes"],
    "animal domestique extra": ["animal domestique extraordinaire"],
    "arme du clan mac eachern": ["arme du clan maceachern"],
    "heritage du clan mac codrum": ["heritage du clan maccodrum"],
    "polyglotte": ["linguiste"],
    "accoutume a la chaleur froid": ["accoutumance a la chaleur ou au froid"],
}

# nation_lien (docx) → catégories PDF préférées en cas de doublon de nom
NATION_TO_CAT = {
    "Castille": ["Castille"],
    "Avalon": ["Avalon"],
    "Eisen": ["Eisen"],
    "Empire du Croissant": ["Empire du Croissant"],
    "Vestenmannavnjar": ["Ligue de Vendel", "Vestenmannavnjar"],
    "Vodacce": ["Vodacce"],
    "Ussura": ["Ussura"],
    "Montaigne": ["Montaigne"],
    "Sorcière Strega": ["Vodacce"],
    "Sorcier Porté": ["Montaigne"],
    "Sarmatie": ["Ussura"],          # Pizkaya (Fhidelis)
    "Nations Pirates": ["Archipel de Minuit"],
}


def choisir_bloc(blocs, nation_lien):
    """Choisit le meilleur bloc PDF parmi des homonymes."""
    if len(blocs) == 1:
        return blocs[0]
    # 1. Préférence de catégorie selon la Nation du docx
    if nation_lien and nation_lien in NATION_TO_CAT:
        cats = NATION_TO_CAT[nation_lien]
        for b in blocs:
            if b["categorie"] in cats:
                return b
    # 2. Le bloc le plus riche (description la plus longue)
    return max(blocs, key=lambda b: sum(len(p) for p in b["paragraphes"]))


def main():
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    avantages = data["avantages"]

    events = extraire_events()
    pdf_avs = grouper(events)
    print(f"PDF : {len(pdf_avs)} blocs d'avantages (apres absorption)")

    # Index PDF par nom normalisé → liste de blocs (doublons possibles)
    pdf_index = {}
    for av in pdf_avs:
        key = norm(av["nom"])
        if not key:
            continue
        pdf_index.setdefault(key, []).append(av)

    matched = 0
    non_matches = []
    for a in avantages:
        key = norm(a["nom"])
        candidates = [key] + ALIASES.get(key, [])
        blocs = None
        for cand in candidates:
            if cand in pdf_index:
                blocs = pdf_index[cand]
                break
        if not blocs:
            # Match par préfixe
            for pk, pv in pdf_index.items():
                if pk.startswith(key) or key.startswith(pk):
                    blocs = pv
                    break
        if blocs:
            bloc = choisir_bloc(blocs, a.get("nation_lien"))
            if bloc["paragraphes"]:
                a["description_v1"] = bloc["paragraphes"]
                if bloc["cout_v1"]:
                    a["cout_v1"] = bloc["cout_v1"]
                matched += 1
                continue
        non_matches.append(
            a["nom"] + ("  [V2]" if a.get("v2") else "")
            + ("  (H)" if a.get("h_heroisme") else ""))

    print(f"Matches : {matched}/{len(avantages)}")
    print(f"Sans description V1 ({len(non_matches)}) :")
    for nm in non_matches:
        print("  -", nm)

    data["_meta"]["source_v1"] = "09 Avantages (10-09-14).pdf"
    data["_meta"]["nb_descriptions_v1"] = matched

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2),
                         encoding="utf-8")
    js = ("// Genere par parse_avantages.py + parse_avantages_pdf.py - ne pas editer a la main\n"
          "window.AVANTAGES_DATA = " +
          json.dumps(data, ensure_ascii=False, indent=2) + ";\n")
    JS_PATH.write_text(js, encoding="utf-8")
    print("\n[ok] avantages.json / avantages.js regeneres")


if __name__ == "__main__":
    main()
