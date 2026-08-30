#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extrait la sorcellerie Pyeryem du docx (Première partie uniquement — la
« Seconde partie — Suivi des révisions (MJ) » est exclue) et l'écrit dans
sorcelleries.js (fusion par id : ré-exécutable, prêt pour d'autres
sorcelleries).

Structure produite :
  { id, nom, nation, accroche, description[], heritage: {paras[], table},
    niveaux[{titre, paras[]}], formes_intro, familles[{nom, formes[], libres}],
    glossaire[{nom, texte}], notes[] }
"""

import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).parent
DOCX = Path(r"D:/Utilisateur/Guillaume/Bureau/JDR Papier/7ème Mer/Sorcelleries V2 à V1/Pyeryem.docx")
SORTIE = ROOT / "sorcelleries.js"
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

SECTIONS = {"Description", "Héritage et progression", "Niveaux de maîtrise",
            "Les formes animales", "Glossaire des capacités",
            "Notes et révisions Fenelions et Créer une nouvelle forme animale"}
FAMILLES = ["La Forme humaine", "Rapaces", "Autres oiseaux", "Poisson d’eau douce",
            "Formes marines", "Mammifères aquatiques", "Ongulés", "Prédateurs",
            "Petits mammifères", "Reptiles", "Créations personnelles"]
SKIP = {"Pyeryem",
        "Guide de la sorcellerie révisée & suivi des modifications — Les Secrets de la 7ème Mer (V1)",
        "Première partie — La sorcellerie Pyeryem"}


def clean(s):
    s = (s or "").replace("\u00a0", " ").replace("\u202f", " ")
    return re.sub(r"\s+", " ", s).strip()


def txt(el):
    return "".join(t.text or "" for t in el.iter(W + "t"))


def parse_forme(tbl):
    """Table à 1 ligne : c0 = tracker (ignoré), c1 = fiche de la forme."""
    tr = tbl.find(W + "tr")
    tcs = tr.findall(W + "tc")
    if len(tcs) < 2:
        return None
    paras = [clean(txt(p)) for p in tcs[1].findall(W + "p")]
    paras = [p for p in paras if p]
    if not paras:
        return None
    m = re.match(r"^(\d+)\s*·\s*(.+?)\s*\(([^)]+)\)\s*—\s*ND\s*:\s*(\d+)", paras[0])
    if not m:
        # Emplacement libre (Créations personnelles : « 28 · ______ »)
        if re.match(r"^\d+\s*·\s*_+", paras[0]):
            return "libre"
        return None
    forme = {"num": int(m.group(1)), "nom": m.group(2).strip(),
             "vo": m.group(3).strip(), "nd": int(m.group(4)),
             "capacites": "", "notes": ""}
    for p in paras[1:]:
        if p.startswith("Capacités :"):
            forme["capacites"] = p[len("Capacités :"):].strip().rstrip(".")
        elif p.startswith("Notes :"):
            forme["notes"] = p[len("Notes :"):].strip()
        # sinon : rappel de famille — ignoré
    return forme


def main():
    z = zipfile.ZipFile(DOCX)
    body = ET.fromstring(z.read("word/document.xml")).find(W + "body")

    d = {"id": "pyeryem", "nom": "Pyeryem", "nation": "Ussura",
         "accroche": "", "description": [], "heritage": {"paras": [], "table": None},
         "niveaux": [], "formes_intro": "", "familles": [], "glossaire": [], "notes": []}

    section = None
    famille = None
    niveau = None

    for el in body:
        tag = el.tag.replace(W, "")
        if tag == "p":
            t = clean(txt(el))
            if not t or t in SKIP:
                continue
            if t.startswith("Seconde partie"):
                break
            if t in SECTIONS:
                section = t
                famille = None
                niveau = None
                continue
            if section == "Les formes animales" and t in FAMILLES:
                famille = {"nom": t, "formes": [], "libres": 0}
                d["familles"].append(famille)
                continue
            if section == "Niveaux de maîtrise" and re.match(r"^(Apprenti|Adepte|Maître)\s*—", t):
                niveau = {"titre": t, "paras": []}
                d["niveaux"].append(niveau)
                continue
            # Paragraphe de contenu selon la section courante
            if section == "Description":
                d["description"].append(t)
            elif section == "Héritage et progression":
                d["heritage"]["paras"].append(t)
            elif section == "Niveaux de maîtrise" and niveau:
                niveau["paras"].append(t)
            elif section == "Les formes animales" and not famille:
                d["formes_intro"] = (d["formes_intro"] + " " + t).strip()
            elif section == "Glossaire des capacités":
                m = re.match(r"^(.{2,60}?)\s*:\s+(.*)$", t)
                if m:
                    d["glossaire"].append({"nom": m.group(1).strip(), "texte": m.group(2).strip()})
                elif d["glossaire"]:
                    d["glossaire"][-1]["texte"] += " " + t
            elif section and section.startswith("Notes et révisions"):
                d["notes"].append(t)
        elif tag == "tbl":
            if section == "Héritage et progression":
                rows = []
                for tr in el.findall(W + "tr"):
                    rows.append([clean(txt(tc)) for tc in tr.findall(W + "tc")])
                d["heritage"]["table"] = {"headers": rows[0], "rows": rows[1:]}
            elif section == "Les formes animales" and famille is not None:
                f = parse_forme(el)
                if f == "libre":
                    famille["libres"] += 1
                elif f:
                    famille["formes"].append(f)

    # Accroche = première phrase de la description
    if d["description"]:
        m = re.match(r"^(.+?[.!])\s", d["description"][0] + " ")
        d["accroche"] = m.group(1) if m else d["description"][0][:160]

    # Familles vides (hors créations personnelles) : purge de sécurité
    d["familles"] = [f for f in d["familles"] if f["formes"] or f["libres"]]

    # ---- Fusion dans sorcelleries.js ----
    existing = []
    if SORTIE.exists():
        t = SORTIE.read_text(encoding="utf-8")
        existing = json.loads(t[t.index("{"):t.rindex("}") + 1]).get("sorcelleries", [])
    existing = [s for s in existing if s.get("id") != d["id"]]
    existing.append(d)
    existing.sort(key=lambda s: s["nom"])

    payload = {"sorcelleries": existing}
    SORTIE.write_text(
        "// Données des Sorcelleries — GÉNÉRÉ par parse_sorcellerie_*.py, ne pas éditer.\n"
        "window.SORCELLERIES_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8")

    # Rapport
    nf = sum(len(f["formes"]) for f in d["familles"])
    print(f"Pyeryem : {len(d['description'])} paras description, "
          f"{len(d['niveaux'])} niveaux, {len(d['familles'])} familles, {nf} formes, "
          f"{len(d['glossaire'])} entrées de glossaire, {len(d['notes'])} paras de notes.")
    for f in d["familles"]:
        noms = ", ".join(x["nom"] for x in f["formes"]) or f"{f['libres']} emplacements libres"
        print(f"  {f['nom']:22} {noms[:90]}")


if __name__ == "__main__":
    main()
