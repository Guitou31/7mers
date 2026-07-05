#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Remplit le champ `membres` des organisations de journal-data.js à partir
des appartenances (organisation_memberships) de l'export Kanka.

Idempotent : ne duplique pas un membre déjà présent (même id), ne touche à
rien d'autre dans le fichier. À lancer une fois après l'ajout du champ.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).parent
DATA = ROOT / "journal-data.js"
EXPORT = Path(r"D:/Utilisateur/Guillaume/Bureau/7eme-mer-crjr_20260624_161316")


def main():
    if not EXPORT.exists():
        print(f"[X] Export Kanka introuvable : {EXPORT}")
        return 1

    # organisation model-id -> (entity-id, nom)
    orgs = {}
    for f in (EXPORT / "organisations").glob("*.json"):
        d = json.load(open(f, encoding="utf-8"))
        ent = d.get("entity") or {}
        if ent.get("id"):
            orgs[d["id"]] = (ent["id"], d["name"])

    t = DATA.read_text(encoding="utf-8")
    i, j = t.index("{"), t.rindex("}")
    header, db, tail = t[:i], json.loads(t[i:j + 1]), t[j + 1:]
    by_id = {a["id"]: a for a in db["articles"]["organisations"]}

    ajouts = []
    for f in (EXPORT / "characters").glob("*.json"):
        d = json.load(open(f, encoding="utf-8"))
        ent = d.get("entity") or {}
        if not ent.get("id"):
            continue
        cid = "per-" + str(ent["id"])
        ms = d.get("organisation_memberships") or d.get("organisationMemberships") or []
        for m in ms:
            o = orgs.get(m.get("organisation_id"))
            if not o:
                continue
            art = by_id.get("org-" + str(o[0]))
            if art is None:
                continue
            membres = art.setdefault("membres", [])
            if any(x.get("id") == cid for x in membres):
                continue
            membres.append({"id": cid, "name": d["name"],
                            "role": (m.get("role") or "").strip()})
            ajouts.append((o[1], d["name"]))

    for a in db["articles"]["organisations"]:
        if a.get("membres"):
            a["membres"].sort(key=lambda m: (m.get("name") or "").lower())

    DATA.write_text(header + json.dumps(db, ensure_ascii=False, indent=2) + tail,
                    encoding="utf-8")

    print(f"{len(ajouts)} appartenances ajoutées :")
    for org, perso in sorted(ajouts):
        print(f"  {org:32} <- {perso}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
