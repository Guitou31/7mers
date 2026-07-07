#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Re-sépare, pour les articles importés de Kanka qui avaient des « posts »,
la description générale (entry principal) des entrées datées (posts).

Avant ce patch, import_kanka.py fusionnait tout dans `description`.
Après : `description` = entry principal seul ; `entrees` = [{id, name, date,
html}] dans l'ordre des positions Kanka. La date n'existe pas dans l'export
(lien calendrier non exporté) : champ laissé vide, à remplir à la main.

Ne touche qu'aux articles dont le fichier Kanka contient des posts.
"""

import json
import re
import sys
from pathlib import Path

import import_kanka as IK

EXPORT = IK.DEFAUT_EXPORT
DATA = IK.SORTIE


def main():
    if not EXPORT.exists():
        print(f"[X] Export Kanka introuvable : {EXPORT}")
        return 1

    # Index entity.id -> (rubrique, article-id, nom) pour résoudre les mentions.
    index = {}
    for dossier, rubrique in IK.DOSSIER_RUBRIQUE.items():
        for f in (EXPORT / dossier).glob("*.json"):
            try:
                d = json.load(open(f, encoding="utf-8"))
            except Exception:
                continue
            if not isinstance(d, dict) or "name" not in d:
                continue
            ent = d.get("entity") or {}
            if ent.get("id"):
                index[ent["id"]] = (rubrique, f"{IK.PREFIXE[rubrique]}-{ent['id']}", d["name"])

    mention_re = re.compile(r"\[([a-z_]+):(\d+)(?:\|([^\]]*))?\]")

    def resolve(html):
        def rep(m):
            cible = index.get(int(m.group(2)))
            label = m.group(3)
            if cible:
                rub, aid, nom = cible
                return ('<a class="j-link" href="journal-article.html?r=' + rub +
                        "&id=" + aid + '">' + (label or nom) + "</a>")
            return label or ""
        return mention_re.sub(rep, html)

    t = DATA.read_text(encoding="utf-8")
    i, j = t.index("{"), t.rindex("}")
    header, db, tail = t[:i], json.loads(t[i:j + 1]), t[j + 1:]
    by_id = {}
    for lst in db["articles"].values():
        for a in lst:
            by_id[a["id"]] = a

    patched = []
    for dossier, rubrique in IK.DOSSIER_RUBRIQUE.items():
        for f in (EXPORT / dossier).glob("*.json"):
            try:
                d = json.load(open(f, encoding="utf-8"))
            except Exception:
                continue
            if not isinstance(d, dict):
                continue
            ent = d.get("entity") or {}
            posts = d.get("posts") or ent.get("posts") or []
            if not posts or not ent.get("id"):
                continue
            art = by_id.get(f"{IK.PREFIXE[rubrique]}-{ent['id']}")
            if art is None:
                continue
            raw = d.get("entry") or ent.get("entry") or ""
            art["description"] = resolve(IK.nettoyer_html(raw))
            posts = sorted(posts, key=lambda p: p.get("position") or 0)
            art["entrees"] = [{
                "id": "ent-k" + str(p.get("id") or n),
                "name": (p.get("name") or "").strip(),
                "date": "",
                "html": resolve(IK.nettoyer_html(p.get("entry") or "")),
            } for n, p in enumerate(posts)]
            patched.append((art["name"], len(art["entrees"])))

    DATA.write_text(header + json.dumps(db, ensure_ascii=False, indent=2) + tail,
                    encoding="utf-8")
    print(f"{len(patched)} article(s) re-séparé(s) :")
    for nom, n in patched:
        print(f"  {nom:32} description épurée + {n} entrée(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
