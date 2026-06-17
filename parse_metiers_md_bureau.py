#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Applique le fichier « Métiers et compétences — 7ème Mer.md » (édité par
Guillaume sur le Bureau) sur le site.

Ce .md fait foi pour les COMPÉTENCES des métiers (base / avancées / choix).
Le script :
  1. insère les nouvelles compétences sociales (COMPETENCES_AJOUTS) absentes
     de competences.json (Charmer, Convaincre, Inciter, Persifler, …) ;
  2. lit le .md et met à jour competences_base / _avancees / _choix de chaque
     métier dans metiers.json (le reste — description, réputation, restriction
     — est préservé) ;
  3. reconstruit les liens compétence ↔ métier (sync_competences_acces) ;
  4. réécrit metiers.json/.js + competences.json/.js et signale les écarts.

À relancer après chaque édition du .md.
"""

import json
import re
import unicodedata
from pathlib import Path

import pdf_metiers_to_json as M
import pdf_competences_to_json as C

ROOT = Path(__file__).parent
# Version éditée par Guillaume (renommée avec underscores). Repli sur la
# version à espaces si jamais l'underscore n'existe pas.
_BUREAU = Path("D:/Utilisateur/Guillaume/Bureau")
MD = _BUREAU / "Métiers_et_compétences___7ème_Mer.md"
if not MD.exists():
    MD = _BUREAU / "Métiers et compétences — 7ème Mer.md"
METIERS_JSON = ROOT / "metiers.json"
METIERS_JS = ROOT / "metiers.js"
COMP_JSON = ROOT / "competences.json"


def _nk(s):
    s = unicodedata.normalize("NFKD", (s or "").replace("’", "'"))
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    return re.sub(r"\s+", " ", s).strip()


# ---------- Parsing du .md ----------
def _split_comps(s):
    s = s.strip()
    if s in ("—", "-", ""):
        return []
    return [x.strip() for x in re.split(r",\s+", s) if x.strip()]


def _parse_choix(s):
    """'N au choix parmi : opt1, opt2 _(NB : note)_' -> {nb, options, note?}."""
    m = re.match(r"(\d+)\s*au choix parmi\s*:\s*(.*)$", s.strip())
    if not m:
        return None
    nb = int(m.group(1))
    rest = m.group(2).strip()
    note = None
    mn = re.search(r"_\(NB\s*:\s*(.*)\)_\s*$", rest)   # greedy : note peut contenir des ')'
    if mn:
        note = mn.group(1).strip()
        rest = rest[:mn.start()].strip()
    options = [x.strip() for x in re.split(r",\s+", rest) if x.strip()]
    bloc = {"nb": nb, "options": options}
    if note:
        bloc["note"] = note
    return bloc


def parse_md(path):
    metiers = {}
    cur = None
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.rstrip()
        m = re.match(r"^##\s+(.+?)\s*$", line)
        if m:
            nom = m.group(1).strip()
            # Sections méta (ex. « ## Modifications de cette révision (…) ») :
            # on stoppe la lecture des métiers.
            if re.search(r"modifications|révision|revision|\b\d{4}\b", nom, re.I):
                break
            cur = {"nom": nom, "base": [], "av": [], "base_choix": [], "av_choix": []}
            metiers[nom] = cur
            continue
        if cur is None:
            continue
        mb = re.match(r"^-\s*\*\*Base\s*\(\d+\)\s*:\*\*\s*(.*)$", line)
        if mb:
            cur["base"] = _split_comps(mb.group(1))
            continue
        ma = re.match(r"^-\s*\*\*Avanc[eé]es\s*\(\d+\)\s*:\*\*\s*(.*)$", line)
        if ma:
            cur["av"] = _split_comps(ma.group(1))
            continue
        mc = re.match(r"^\s*-\s*\*Choix\s+(base|avanc[eé]es)\s*:\*\s*(.*)$", line)
        if mc:
            kind = "base_choix" if mc.group(1).startswith("base") else "av_choix"
            bloc = _parse_choix(mc.group(2))
            if bloc:
                cur[kind].append(bloc)
            continue
    return metiers


# ---------- Insertion des nouvelles compétences ----------
def inserer_nouvelles_competences(cdata):
    existants = {_nk(c["nom"]) for c in cdata["competences"]}
    ajoutes = []
    for a in C.COMPETENCES_AJOUTS:
        if _nk(a["nom"]) in existants:
            continue
        cdata["competences"].append({
            "nom": a["nom"],
            "description": a.get("description", ""),
            "donnent_acces_base": [],
            "donnent_acces_avancee": [],
            "categorie": a.get("categorie", "Compétences sociales"),
            "donnent_acces_metiers_base": [],
            "donnent_acces_metiers_avancee": [],
            "donnent_acces_entrainements_base": [],
            "donnent_acces_entrainements_avancee": [],
        })
        ajoutes.append(a["nom"])
    return ajoutes


# ---------- Application aux métiers ----------
def appliquer_md(metiers_data, md):
    par_nom = {m["nom"]: m for m in metiers_data["metiers"]}
    par_nk = {_nk(m["nom"]): m for m in metiers_data["metiers"]}
    maj, introuvables = [], []
    for nom, e in md.items():
        m = par_nom.get(nom) or par_nk.get(_nk(nom))
        if not m:
            introuvables.append(nom)
            continue
        m["competences_base"] = e["base"]
        m["competences_avancees"] = e["av"]
        # choix : on pose la clé si non vide, sinon on la retire
        if e["base_choix"]:
            m["competences_base_choix"] = e["base_choix"]
        else:
            m.pop("competences_base_choix", None)
        if e["av_choix"]:
            m["competences_avancees_choix"] = e["av_choix"]
        else:
            m.pop("competences_avancees_choix", None)
        maj.append(nom)
    manquants_md = [m["nom"] for m in metiers_data["metiers"] if m["nom"] not in md
                    and _nk(m["nom"]) not in {_nk(k) for k in md}]
    return maj, introuvables, manquants_md


# ---------- Validation : compétences référencées sans fiche ----------
META_PAT = re.compile(r"à préciser|au choix|fleuve|type d|nation à|cité à|Nation à|d['’]animal", re.I)


def competences_orphelines(metiers_data, cdata):
    canon = {_nk(c["nom"]) for c in cdata["competences"]}
    # alias/patterns gérés par la sync (ne pas signaler)
    pat_alias = [re.compile(p, re.I) for p in (
        r"^recharger\s*\(", r"^parade\s*\(", r"^blocage\s*\(",
        r"^tir\s+d['’]adresse\s*\(", r"^connaissance\s+des\s+routes\s*\(",
    )]
    orph = {}
    for m in metiers_data["metiers"]:
        refs = list(m.get("competences_base", [])) + list(m.get("competences_avancees", []))
        for ch in M._iter_choix(m.get("competences_base_choix")) + M._iter_choix(m.get("competences_avancees_choix")):
            refs += ch.get("options", [])
        for r in refs:
            k = _nk(r)
            if k in canon:
                continue
            if META_PAT.search(r) or any(p.match(k) for p in pat_alias):
                continue
            orph.setdefault(r, []).append(m["nom"])
    return orph


def main():
    if not MD.exists():
        print(f"[X] .md introuvable : {MD}")
        return
    md = parse_md(MD)
    print(f"Métiers lus dans le .md : {len(md)}")

    # 1) Nouvelles compétences
    cdata = json.loads(COMP_JSON.read_text(encoding="utf-8"))
    ajoutes = inserer_nouvelles_competences(cdata)
    COMP_JSON.write_text(json.dumps(cdata, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Compétences ajoutées : {', '.join(ajoutes) or '— (déjà présentes)'}")

    # 2) Application aux métiers
    mdata = json.loads(METIERS_JSON.read_text(encoding="utf-8"))
    maj, introuvables, manquants = appliquer_md(mdata, md)
    print(f"Métiers mis à jour : {len(maj)} / {len(mdata['metiers'])}")
    if introuvables:
        print(f"  [!] Dans le .md mais introuvables côté site : {introuvables}")
    if manquants:
        print(f"  [!] Sur le site mais absents du .md (inchangés) : {manquants}")

    # Écrit metiers.json + metiers.js
    txt = json.dumps(mdata, ensure_ascii=False, indent=2)
    METIERS_JSON.write_text(txt, encoding="utf-8")
    METIERS_JS.write_text(
        "// Généré par pdf_metiers_to_json.py — ne pas éditer à la main\n"
        "window.METIERS_DATA = " + txt + ";\n", encoding="utf-8")

    # 3) Synchro inverse compétences ↔ métiers (réécrit competences.json/.js)
    M.sync_competences_acces(mdata["metiers"])

    # 4) Validation
    cdata2 = json.loads(COMP_JSON.read_text(encoding="utf-8"))
    orph = competences_orphelines(mdata, cdata2)
    if orph:
        print("\n  [!] Compétences référencées SANS fiche (typo ?) :")
        for nom, ms in sorted(orph.items()):
            print(f"     - {nom}  ← {', '.join(ms)}")
    else:
        print("\n  Aucune compétence orpheline. ✔")
    print("\n[ok] metiers + competences régénérés")


if __name__ == "__main__":
    main()
