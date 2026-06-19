#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Met à jour le docx « Liste des Techniques de combat.docx » en ajoutant,
dans chaque ligne « Écoles l'enseignant : … », les écoles indiquées dans
NOUVELLES_ECOLES qui enseignent la technique (d'après ecoles.json) et qui
ne figurent pas encore dans le docx.

Gère la technique « Exploiter les faiblesses » (liste regroupée par arme).
Préserve le formatage (ajoute un run en fin de paragraphe). Fait un .bak.
"""

import copy
import json
import re
import unicodedata
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).parent
DOCX = Path(r"D:/Utilisateur/Guillaume/Bureau/JDR Papier/7ème Mer"
           r"/Ecoles combat & co/Liste des Techniques de combat.docx")
ECOLES_JSON = ROOT / "ecoles.json"

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
XML = "http://www.w3.org/XML/1998/namespace"

# Écoles récemment ajoutées à intégrer au docx (Ifri + Sarmatie).
NOUVELLES_ECOLES = [
    "Iyasu", "Tin Hinan", "Gbeto",
    "Krzyż", "Pancerny", "Koncerz", "Žynys", "Vilkas",
    "Nadziak", "Zimowit", "Wolny Lis",
]


def norm(s):
    s = unicodedata.normalize("NFKD", (s or "").replace("’", "'"))
    s = "".join(c for c in s if not unicodedata.combining(c)).lower().replace("-", " ")
    return re.sub(r"\s+", " ", s).strip()


def w(tag):
    return f"{{{W}}}{tag}"


def texte_p(p):
    return "".join(t.text or "" for t in p.iter(w("t")))


def style_p(p):
    pPr = p.find(w("pPr"))
    if pPr is None:
        return ""
    ps = pPr.find(w("pStyle"))
    return ps.get(w("val")) if ps is not None else ""


def construire_maps():
    """Renvoie (par_technique, par_arme_exploiter)."""
    d = json.loads(ECOLES_JSON.read_text(encoding="utf-8"))
    nouv = set(NOUVELLES_ECOLES)
    ordre = {n: i for i, n in enumerate(NOUVELLES_ECOLES)}
    par_tech, par_arme = {}, {}
    for ref, t in d["techniques"].items():
        new = sorted([e for e in t.get("ecoles_enseignant", []) if e in nouv],
                     key=lambda x: ordre[x])
        if new:
            par_tech[norm(t["nom"])] = new
        grp = t.get("ecoles_enseignant_groupees")
        if grp:
            for arme, ecs in grp.items():
                ne = sorted([e for e in ecs if e in nouv], key=lambda x: ordre[x])
                if ne:
                    par_arme[norm(arme)] = ne
    return par_tech, par_arme


def editer_paragraphe(p, nouvelles, texte):
    """Ajoute les écoles à la fin de la liste du paragraphe (préserve le style)."""
    a_ajouter = [e for e in nouvelles if e not in texte]
    if not a_ajouter:
        return []
    runs = [r for r in p if r.tag == w("r") and r.find(w("t")) is not None]
    if not runs:
        return []
    last = runs[-1]
    ts = texte.rstrip()
    if ts.endswith(","):
        prefix = "" if texte.endswith(" ") else " "
    else:
        prefix = ", "
    ajout = prefix + ", ".join(a_ajouter)

    new_r = ET.SubElement(p, w("r"))
    rpr = last.find(w("rPr"))
    if rpr is not None:
        new_r.append(copy.deepcopy(rpr))
    t = ET.SubElement(new_r, w("t"))
    t.set(f"{{{XML}}}space", "preserve")
    t.text = ajout
    return a_ajouter


def main():
    if not DOCX.exists():
        print(f"[X] docx introuvable : {DOCX}")
        return
    par_tech, par_arme = construire_maps()

    raw = zipfile.ZipFile(DOCX).read("word/document.xml").decode("utf-8")
    # Préserve tous les préfixes de namespace
    for m in re.finditer(r'xmlns:(\w+)="([^"]+)"', raw):
        ET.register_namespace(m.group(1), m.group(2))
    root = ET.fromstring(raw)
    body = root.find(w("body"))

    tech_norm, in_exploiter = None, False
    rapport = []
    for p in list(body):
        if p.tag != w("p"):
            continue
        st = style_p(p)
        txt = texte_p(p)
        if st == "Titre3":
            tech_norm = norm(txt)
            in_exploiter = tech_norm == "exploiter les faiblesses"
            continue
        t_strip = txt.strip()
        est_ligne_ecoles = t_strip.lower().startswith("ecoles l'enseignant") or \
            t_strip.lower().startswith("ecoles l’enseignant")
        if est_ligne_ecoles and not in_exploiter and tech_norm:
            # Techniques universelles (« Toutes les écoles ») : ne rien ajouter.
            if "toutes les ecoles" in norm(txt):
                continue
            ajoutes = editer_paragraphe(p, par_tech.get(tech_norm, []), txt)
            if ajoutes:
                rapport.append((tech_norm, ajoutes))
        elif in_exploiter and st == "Paragraphedeliste":
            m = re.match(r"^\s*([^:]+?)\s*:", txt)
            if m:
                ajoutes = editer_paragraphe(p, par_arme.get(norm(m.group(1)), []), txt)
                if ajoutes:
                    rapport.append(("exploiter/" + m.group(1).strip(), ajoutes))

    # Backup + réécriture du docx
    bak = DOCX.with_suffix(".docx.bak")
    if not bak.exists():
        bak.write_bytes(DOCX.read_bytes())
    new_xml = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n'
               + ET.tostring(root, encoding="unicode")).encode("utf-8")
    src = zipfile.ZipFile(DOCX)
    noms = src.namelist()
    contents = {n: src.read(n) for n in noms}
    src.close()
    contents["word/document.xml"] = new_xml
    with zipfile.ZipFile(DOCX, "w", zipfile.ZIP_DEFLATED) as z:
        for n in noms:
            z.writestr(n, contents[n])

    print(f"Backup : {bak.name}")
    print(f"Techniques mises à jour : {len(rapport)}")
    for tech, ec in rapport:
        print(f"  {tech} ← +{', '.join(ec)}")


if __name__ == "__main__":
    main()
