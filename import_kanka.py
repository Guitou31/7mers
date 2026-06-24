#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Importe un export JSON Kanka (dézippé) vers journal-data.js.

- Mappe les types Kanka vers les rubriques du journal.
- Récupère champs, descriptions (entry + posts), relations (familles, nations),
  étiquettes (tags).
- Convertit les mentions Kanka [type:entity_id] en liens @ vers les articles.
- Nettoie le HTML (couleurs/classes Kanka) pour le thème parchemin.

Usage :
    set PYTHONUTF8=1 & python import_kanka.py "C:\\chemin\\vers\\export_kanka_dezippe"
"""

import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).parent
SORTIE = ROOT / "journal-data.js"
DEFAUT_EXPORT = Path(r"D:/Utilisateur/Guillaume/Bureau/7eme-mer-crjr_20260624_161316")

# Dossier Kanka -> (rubrique journal, type de mention Kanka)
DOSSIER_RUBRIQUE = {
    "characters": "personnages",
    "locations": "lieux",
    "maps": "cartes",
    "organisations": "organisations",
    "families": "familles",
    "creatures": "creatures",
    "races": "nations",
    "calendars": "calendriers",
    "timelines": "chronologies",
    "journals": "journaux",
    "quests": "quetes",
    "items": "objets",
}
# Type de mention Kanka -> rubrique
MENTION_RUBRIQUE = {
    "character": "personnages", "location": "lieux", "organisation": "organisations",
    "family": "familles", "creature": "creatures", "race": "nations",
    "item": "objets", "quest": "quetes", "journal": "journaux", "map": "cartes",
    "calendar": "calendriers",
}
RUBRIQUES = ["personnages", "lieux", "cartes", "organisations", "familles",
             "creatures", "nations", "calendriers", "chronologies", "journaux",
             "quetes", "objets"]
PREFIXE = {r: r[:3] for r in RUBRIQUES}


def slugify(s):
    import unicodedata
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:60] or "sans-nom"


def art_id(rubrique, entity_id):
    return f"{PREFIXE[rubrique]}-{entity_id}"


def nettoyer_html(html):
    """Retire les attributs class/style (couleurs Kanka, cruft Word) et balises o:p."""
    if not html:
        return ""
    html = re.sub(r"<\/?o:p>", "", html)
    html = re.sub(r'\s(?:class|style|lang|align)="[^"]*"', "", html)
    html = re.sub(r"<span>\s*<\/span>", "", html)
    html = re.sub(r"<p>\s*<\/p>", "", html)
    return html.strip()


def combine_contenu(d):
    """entry principal + posts (chacun précédé de son titre)."""
    ent = d.get("entity") or {}
    raw = d.get("entry") or ent.get("entry") or ""
    posts = d.get("posts") or ent.get("posts") or []
    posts = sorted(posts, key=lambda p: p.get("position") or 0)
    for p in posts:
        nom = (p.get("name") or "").strip()
        corps = p.get("entry") or ""
        if nom and nom.lower() not in ("entry", "premier post"):
            raw += f"<h3>{nom}</h3>"
        raw += corps
    return raw


def main():
    export = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAUT_EXPORT
    if not export.exists():
        print(f"[X] Dossier export introuvable : {export}")
        return 1

    # --- Tags : tag_id -> nom ---
    tags = {}
    for f in (export / "tags").glob("*.json"):
        try:
            t = json.load(open(f, encoding="utf-8"))
            tags[t["id"]] = t["name"]
        except Exception:
            pass

    # --- Gallery : uuid -> fichier image. Copiées vers journal-images/ ---
    gal = {}
    for f in (export / "gallery").glob("*"):
        if f.suffix.lower() == ".json":
            continue
        gal[f.stem] = f
    img_dir = ROOT / "journal-images"
    img_dir.mkdir(exist_ok=True)
    n_img = [0]

    def copier_image(ent):
        u = ent.get("image_uuid")
        if not u or u not in gal:
            return ""
        src = gal[u]
        dest = img_dir / (u + src.suffix.lower())
        try:
            shutil.copyfile(src, dest)
            n_img[0] += 1
            return "journal-images/" + dest.name
        except Exception:
            return ""

    # --- Pass 1 : charge toutes les entités, construit l'index ---
    articles = {r: [] for r in RUBRIQUES}
    index = {}            # entity.id -> (rubrique, id, name)
    raw_desc = {}         # (rubrique, id) -> html brut (mentions non résolues)
    changes = []

    for dossier, rubrique in DOSSIER_RUBRIQUE.items():
        for f in sorted((export / dossier).glob("*.json")):
            try:
                d = json.load(open(f, encoding="utf-8"))
            except Exception as e:
                print(f"  ! illisible {f.name}: {e}")
                continue
            if not isinstance(d, dict) or "name" not in d:
                continue
            ent = d.get("entity") or {}
            eid = ent.get("id")
            aid = art_id(rubrique, eid or d.get("id"))

            # Étiquettes
            etq = []
            for et in ent.get("entityTags", []) or []:
                nm = tags.get(et.get("tag_id"))
                if nm:
                    etq.append(nm)

            art = {
                "id": aid, "slug": slugify(d["name"]), "rubrique": rubrique,
                "name": d["name"],
                "type": (ent.get("type") or d.get("type") or "").strip(),
                "title": (d.get("title") or "").strip(),
                "image": copier_image(ent),
                "etiquettes": etq,
                "description": "",  # rempli au pass 2
                "created": (d.get("created_at") or "")[:10],
                "updated": (d.get("updated_at") or "")[:10],
                "author": "Guillaume",
            }
            # Champs spécifiques personnage
            if rubrique == "personnages":
                art["familles"] = [cf["family"]["name"] for cf in d.get("character_families", [])
                                   if cf.get("family", {}).get("name")]
                art["nations"] = [cr["race"]["name"] for cr in d.get("character_races", [])
                                  if cr.get("race", {}).get("name")]
                art["lieux"] = []
                art["age"] = str(d.get("age") or "").strip()
                art["sexe"] = (d.get("sex") or "").strip()
                art["pronoms"] = (d.get("pronouns") or "").strip()
                art["statut"] = "Vivant"

            articles[rubrique].append(art)
            if eid:
                index[eid] = (rubrique, aid, d["name"])
            raw_desc[(rubrique, aid)] = combine_contenu(d)

            d_created = art["created"]
            if d_created:
                changes.append({"author": "Guillaume", "action": "créé",
                                "target": d["name"], "rubrique": rubrique,
                                "id": aid, "date": d_created})

    # --- Pass 2 : résout les mentions + nettoie le HTML ---
    mention_re = re.compile(r"\[([a-z_]+):(\d+)(?:\|([^\]]*))?\]")
    non_resolues = [0]

    def remplace_mention(m):
        typ, eid, label = m.group(1), int(m.group(2)), m.group(3)
        cible = index.get(eid)
        if cible:
            rub, aid, nom = cible
            txt = label or nom
            return f'<a class="j-link" href="journal-article.html?r={rub}&id={aid}">{txt}</a>'
        non_resolues[0] += 1
        return label or ""

    for rub in RUBRIQUES:
        for art in articles[rub]:
            html = raw_desc.get((rub, art["id"]), "")
            html = nettoyer_html(html)               # nettoie d'abord (couleurs Kanka)
            html = mention_re.sub(remplace_mention, html)  # puis pose les liens @ (class conservée)
            art["description"] = html

    changes.sort(key=lambda c: c["date"], reverse=True)

    db = {"articles": articles, "changes": changes}
    header = (
        "// ============================================================\n"
        "// Base de données du Journal de campagne.\n"
        "//   - articles : les articles, regroupés par rubrique.\n"
        "//   - changes  : journal d'activité (le plus récent en premier).\n"
        "// Écrit par l'éditeur via l'API GitHub ; lu par toutes les pages du journal.\n"
        "// (Import initial depuis Kanka via import_kanka.py.)\n"
        "// ============================================================\n"
    )
    SORTIE.write_text(header + "window.JOURNAL_DB = "
                      + json.dumps(db, ensure_ascii=False, indent=2) + ";\n",
                      encoding="utf-8")

    # Rapport
    total = sum(len(v) for v in articles.values())
    print(f"OK : {total} articles écrits dans {SORTIE.name}")
    for r in RUBRIQUES:
        if articles[r]:
            print(f"  {r:14} {len(articles[r])}")
    print(f"Mentions @ non résolues (texte conservé) : {non_resolues[0]}")
    print(f"Images copiées dans journal-images/ : {n_img[0]}")
    print(f"Entrées d'activité : {len(changes)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
