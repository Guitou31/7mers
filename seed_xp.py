#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Initialise le Suivi XP du journal (db.xp dans journal-data.js) à partir du
Google Sheet « Suivi xp personnage 7ème Mer » (totaux du Résumé + historique).

- Totaux de référence = onglet « Résumé xp » (le sheet ayant quelques
  incohérences internes dans l'historique de Lü Min, le Résumé fait foi).
- Historique migré tel quel (15 entrées, 02/02 → 23/08/2026) + une entrée
  « reprise » pour l'état antérieur au suivi détaillé.
- xp_av (XP d'Avantages) démarre à 0 pour tous : ce suivi est nouveau.

Idempotent : remplace db.xp s'il existe déjà.
"""

import json
from pathlib import Path

ROOT = Path(__file__).parent
DATA = ROOT / "journal-data.js"

PERSOS = [
    {"id": "darmuid",    "nom": "Darmuid",    "joueur": "Renaud",  "groupe": "actif",   "xp_mj": 150, "xp_av": 0},
    {"id": "don-felipe", "nom": "Don Felipe", "joueur": "Fred",    "groupe": "actif",   "xp_mj": 150, "xp_av": 0},
    {"id": "dorian",     "nom": "Dorian",     "joueur": "Rémi",    "groupe": "actif",   "xp_mj": 150, "xp_av": 0},
    {"id": "ingrid",     "nom": "Ingrid",     "joueur": "Vanessa", "groupe": "actif",   "xp_mj": 150, "xp_av": 0},
    {"id": "lu-ji",      "nom": "Lü Ji",      "joueur": "Anthony", "groupe": "actif",   "xp_mj": 150, "xp_av": 0},
    {"id": "lu-min",     "nom": "Lü Min",     "joueur": "Anthony", "groupe": "pnj",     "xp_mj": 140, "xp_av": 0,
     "note": "Serviteur (PNJ)"},
    {"id": "marek",      "nom": "Marek Wrobleski", "joueur": "Johann/MTO", "groupe": "retrait", "xp_mj": 75, "xp_av": 0},
    {"id": "mendoza",    "nom": "Mendoza",    "joueur": "Morgane", "groupe": "retrait", "xp_mj": 100, "xp_av": 0},
]

TOUS = ["don-felipe", "mendoza", "dorian", "darmuid", "ingrid", "lu-ji", "lu-min", "marek"]


def G(ids, xps):
    return [{"id": i, "xp": x} for i, x in zip(ids, xps) if x]


# Du plus ancien au plus récent (inversé à l'écriture).
HISTORIQUE = [
    {"date": "2026-01-25", "raison": "Reprise du Google Sheet — état avant le suivi détaillé",
     "type": "mj", "gains": G(TOUS, [30, 20, 20, 30, 10, 25, 10, 16])},
    {"date": "2026-02-02", "raison": "Fin de la session 7 (25/01/2026) — Avancement de la quête principale et aléas",
     "type": "mj", "gains": G(TOUS, [5, 5, 5, 5, 10, 10, 10, 14])},
    {"date": "2026-02-08", "raison": "Fin de la session 8 — Avancement quête secondaire, découverte de l'identité "
     "de Rocío Sandoval, sœur jumelle du roi Amadeo Sandoval",
     "type": "mj", "gains": G(TOUS, [10, 10, 10, 10, 15, 10, 5, 10])},
    {"date": "2026-03-22", "raison": "Session 9",
     "type": "mj", "gains": G(TOUS, [5] * 8)},
    {"date": "2026-03-22", "raison": "Fin de la Session 10 — 2ème morceau de carte + démon tué",
     "type": "mj", "gains": G(TOUS, [10, 20, 20, 10, 20, 10, 20, 15])},
    {"date": "2026-04-19", "raison": "Correction manuelle (Marek)",
     "type": "mj", "gains": [{"id": "marek", "xp": -10}]},
    {"date": "2026-04-19", "raison": "Session — Début Arène et libération d'esclaves",
     "type": "mj", "gains": G(TOUS, [10] * 8)},
    {"date": "2026-05-03", "raison": "Fin session Numa",
     "type": "mj", "gains": G(TOUS, [5, 5, 10, 20, 20, 20, 10, 0])},
    {"date": "2026-05-03", "raison": "Correction session Numa",
     "type": "mj", "gains": G(["don-felipe", "mendoza"], [5, 5])},
    {"date": "2026-05-11", "raison": "Session 3 Mai",
     "type": "mj", "gains": G(TOUS, [5] * 8)},
    {"date": "2026-05-17", "raison": "Correction session Numa",
     "type": "mj", "gains": G(["don-felipe", "mendoza", "dorian"], [10, 10, 10])},
    {"date": "2026-05-22", "raison": "Session 17 Mai (début Voleur de Soleil)",
     "type": "mj", "gains": G(TOUS[:7], [5] * 7)},
    {"date": "2026-06-26", "raison": "Session 31 Mai — Voleur de Soleil 2/3",
     "type": "mj", "gains": G(["don-felipe", "dorian", "darmuid", "ingrid", "lu-ji", "lu-min"], [5] * 6)},
    {"date": "2026-06-29", "raison": "Fin du scénario du Voleur de Soleil",
     "type": "mj", "gains": G(["don-felipe", "lu-ji", "dorian", "darmuid", "ingrid", "lu-min"],
                              [25, 20, 20, 20, 20, 20])},
    {"date": "2026-07-23", "raison": "Mini-scénario arc Kogarashi",
     "type": "mj", "gains": G(["don-felipe", "lu-ji", "dorian", "lu-min"], [5, 10, 10, 15])},
    {"date": "2026-08-23", "raison": "Session Numa",
     "type": "mj", "gains": G(["don-felipe", "lu-ji", "dorian", "darmuid", "ingrid", "lu-min"],
                              [15, 15, 15, 25, 25, 35])},
]


def main():
    # Contrôle : somme de l'historique vs totaux officiels (information).
    calc = {p["id"]: 0 for p in PERSOS}
    for e in HISTORIQUE:
        for g in e["gains"]:
            calc[g["id"]] += g["xp"]
    for p in PERSOS:
        flag = "" if calc[p["id"]] == p["xp_mj"] else \
            f"  (historique={calc[p['id']]} — écart hérité du sheet, le Résumé fait foi)"
        print(f"  {p['nom']:18} total={p['xp_mj']:>3}{flag}")

    t = DATA.read_text(encoding="utf-8")
    i, j = t.index("{"), t.rindex("}")
    header, db, tail = t[:i], json.loads(t[i:j + 1]), t[j + 1:]
    db["xp"] = {"persos": PERSOS, "historique": list(reversed(HISTORIQUE))}
    DATA.write_text(header + json.dumps(db, ensure_ascii=False, indent=2) + tail, encoding="utf-8")
    print(f"db.xp écrit : {len(PERSOS)} personnages, {len(HISTORIQUE)} entrées d'historique.")


if __name__ == "__main__":
    main()
