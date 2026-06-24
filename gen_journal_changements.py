#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Génère le flux « Changements récents » du Journal de campagne à partir de
l'historique git des pages de rubrique (journal-personnages.html, etc.).

Chaque commit qui touche une page de rubrique produit une entrée :
    { author, date, action ("créé"/"modifié"), target (libellé), type, page }

Lancer après chaque mise à jour du journal, puis committer journal-changements.js :
    python gen_journal_changements.py

Sous Windows, forcer l'UTF-8 si besoin :
    set PYTHONUTF8=1 & python gen_journal_changements.py
"""

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
SORTIE = ROOT / "journal-changements.js"

# Pages de rubrique suivies → (libellé affiché, catégorie).
# (Source de vérité alignée sur SECTIONS dans journal-layout.js.)
RUBRIQUES = {
    "journal-personnages.html":   ("Personnages",   "monde"),
    "journal-lieux.html":         ("Lieux",         "monde"),
    "journal-cartes.html":        ("Cartes",        "monde"),
    "journal-organisations.html": ("Organisations", "monde"),
    "journal-familles.html":      ("Familles",      "monde"),
    "journal-creatures.html":     ("Créatures",     "monde"),
    "journal-nations.html":       ("Nations",       "monde"),
    "journal-calendriers.html":   ("Calendriers",   "temps"),
    "journal-chronologies.html":  ("Chronologies",  "temps"),
    "journal-journaux.html":      ("Journaux",      "temps"),
    "journal-quetes.html":        ("Quêtes",        "jeu"),
    "journal-objets.html":        ("Objets",        "jeu"),
}

SEP = "\x00"   # séparateur d'enregistrement
FS = "\x01"    # séparateur de champ


def git_log():
    """Renvoie la sortie git log (name-status) sur les pages de rubrique."""
    cmd = [
        "git", "-C", str(ROOT), "log", "--no-merges",
        "--date=short", "--name-status",
        "--pretty=format:%x00%an%x01%ad%x01%H", "--",
    ] + list(RUBRIQUES.keys())
    try:
        out = subprocess.run(
            cmd, capture_output=True, text=True, encoding="utf-8", errors="replace"
        )
    except FileNotFoundError:
        print("[X] git introuvable. Flux laissé vide.")
        return None
    if out.returncode != 0:
        print("[X] git log a échoué :", (out.stderr or "").strip())
        return None
    return out.stdout


def construire_entrees(brut):
    entrees = []
    if not brut:
        return entrees
    for chunk in brut.split(SEP):
        chunk = chunk.strip("\n")
        if not chunk:
            continue
        lignes = chunk.split("\n")
        entete = lignes[0].split(FS)
        if len(entete) < 3:
            continue
        author, date = entete[0].strip(), entete[1].strip()
        for ligne in lignes[1:]:
            ligne = ligne.strip()
            if not ligne:
                continue
            parts = ligne.split("\t")
            statut = parts[0]
            # Renommage (R100) : chemin final = dernier champ.
            fichier = parts[-1]
            if fichier not in RUBRIQUES:
                continue
            code = statut[0]
            if code == "A":
                action = "créé"
            elif code in ("M", "R", "C"):
                action = "modifié"
            else:
                continue  # D (supprimé) et autres : ignorés
            label, cat = RUBRIQUES[fichier]
            entrees.append({
                "author": author,
                "date": date,
                "action": action,
                "target": label,
                "type": cat,
                "page": fichier,
            })
    # Tri décroissant par date, puis ordre stable (git rend déjà du récent vers l'ancien).
    entrees.sort(key=lambda e: e["date"], reverse=True)
    return entrees


def main():
    brut = git_log()
    entrees = construire_entrees(brut)
    last = entrees[0]["date"] if entrees else None

    payload = {"lastUpdated": last, "entries": entrees}
    js = (
        "// Flux « Changements récents » — GÉNÉRÉ AUTOMATIQUEMENT.\n"
        "// Ne pas éditer à la main : lancer gen_journal_changements.py qui lit\n"
        "// l'historique git des pages du journal et régénère ce fichier.\n"
        "window.JOURNAL_CHANGEMENTS = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n"
    )
    SORTIE.write_text(js, encoding="utf-8")
    print(f"OK : {len(entrees)} entrée(s) écrite(s) dans {SORTIE.name}"
          + (f" (dernière maj : {last})" if last else " (flux vide)"))


if __name__ == "__main__":
    sys.exit(main())
