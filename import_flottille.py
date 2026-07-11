#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Importe « Flottille_des_Heros.docx » dans journal-data.js :

- Flottille : Vue d'ensemble + 3 fiches navires (La Seconde Chance, Brigantin
  de la Ligue, Brick de la CCA). Le pacte avec la Ligue (§5) est rattaché au
  brigantin, le chantier Serafin (§7) au brick.
- Services : Entretien et travaux (§3), Équipage : soldes et frais (§4).
- Routes commerciales : une fiche par route (table du §6) + le pattern de
  marchandage complet (§6).

Les tableaux Word deviennent des tableaux HTML (.j-tablewrap > table).
Idempotent : ré-exécuter remplace les articles du même nom.
"""

import datetime
import json
import re
import unicodedata
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).parent
DATA = ROOT / "journal-data.js"
DOCX = Path(r"D:/Utilisateur/Guillaume/Bureau/Flottille_des_Heros.docx")
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def slugify(s):
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:60] or "sans-nom"


# ---------- Lecture du docx en une liste d'items (type, contenu) ----------
def lire_docx():
    z = zipfile.ZipFile(DOCX)
    body = ET.fromstring(z.read("word/document.xml")).find(W + "body")

    def style(p):
        pPr = p.find(W + "pPr")
        if pPr is None:
            return ""
        ps = pPr.find(W + "pStyle")
        return ps.get(W + "val") if ps is not None else ""

    def txt(el):
        return "".join(t.text or "" for t in el.iter(W + "t")).strip()

    items = []  # (kind, data) : kind in h1/h2/li/p/table
    for el in body:
        tag = el.tag.replace(W, "")
        if tag == "p":
            t = txt(el)
            if not t:
                continue
            st = style(el)
            if st == "Titre1":
                items.append(("h1", t))
            elif st == "Titre2":
                items.append(("h2", t))
            elif st == "Paragraphedeliste":
                items.append(("li", t))
            else:
                items.append(("p", t))
        elif tag == "tbl":
            rows = []
            for tr in el.findall(W + "tr"):
                cells = []
                for tc in tr.findall(W + "tc"):
                    paras = [txt(p) for p in tc.findall(W + "p")]
                    cells.append("<br>".join(esc(x) for x in paras if x))
                rows.append(cells)
            items.append(("table", rows))
    return items


# ---------- Items -> HTML ----------
def items_html(items, demote=False):
    """demote=True : h2 du doc -> h4 (sous une fiche), sinon h2->h3."""
    out = []
    ul = []

    def flush_ul():
        if ul:
            out.append("<ul>" + "".join("<li>" + esc(x) + "</li>" for x in ul) + "</ul>")
            ul.clear()

    for kind, data in items:
        if kind == "li":
            ul.append(data)
            continue
        flush_ul()
        if kind == "p":
            out.append("<p>" + esc(data) + "</p>")
        elif kind == "h2":
            out.append(("<h4>" if demote else "<h3>") + esc(data) + "</h4>" if demote
                       else "<h3>" + esc(data) + "</h3>")
        elif kind == "table":
            rows = data
            html = ["<div class='j-tablewrap'><table>"]
            for i, cells in enumerate(rows):
                tag = "th" if i == 0 else "td"
                html.append("<tr>" + "".join(
                    "<" + tag + ">" + c + "</" + tag + ">" for c in cells) + "</tr>")
            html.append("</table></div>")
            out.append("".join(html))
    flush_ul()
    return "\n".join(out)


def main():
    items = lire_docx()

    # Découpage par sections Titre1 (préfixe « N. »)
    sections = {}
    num = None
    for kind, data in items:
        if kind == "h1":
            m = re.match(r"^(\d+)\.", data)
            num = m.group(1) if m else None
            sections.setdefault(num, [])
            continue
        if num is not None:
            sections[num].append((kind, data))

    # Sous-sections de la partie 2 (fiches navires) découpées par Titre2
    fiches = {}
    cle = None
    for kind, data in sections.get("2", []):
        if kind == "h2":
            m = re.match(r"^2\.(\d)", data)
            cle = m.group(1) if m else None
            fiches.setdefault(cle, [])
            continue
        if cle is not None:
            fiches[cle].append((kind, data))

    today = datetime.date.today().isoformat()

    def article(rubrique, name, title, typ, html):
        return {
            "id": rubrique.split("-")[0][:3] + "-" + slugify(name),
            "slug": slugify(name), "rubrique": rubrique, "name": name,
            "type": typ, "title": title, "image": "", "aliases": [],
            "etiquettes": [], "description": html, "entrees": [],
            "created": today, "updated": today, "author": "Guillaume",
        }

    arts = []

    # --- Flottille ---
    arts.append(article("flottille", "Vue d'ensemble de la flottille", "", "Synthèse",
                        items_html(sections.get("1", []))))
    arts.append(article("flottille", "La Seconde Chance", "Schooner de Dorian", "Navire",
                        items_html(fiches.get("1", []))))
    brig = items_html(fiches.get("2", []))
    if sections.get("5"):
        brig += "\n<h3>Le pacte avec la Ligue de Vendel</h3>\n" + items_html(sections["5"])
    arts.append(article("flottille", "Le Brigantin de la Ligue de Vendel", "", "Navire", brig))
    brick = items_html(fiches.get("3", []))
    if sections.get("7"):
        brick += "\n<h3>Le chantier du brick chez les Serafin</h3>\n" + items_html(sections["7"])
    arts.append(article("flottille", "Le Brick de la CCA", "", "Navire", brick))

    # --- Services ---
    arts.append(article("services", "Entretien et travaux", "Chantier naval", "Règles",
                        items_html(sections.get("3", []))))
    arts.append(article("services", "Équipage : soldes et frais d'exploitation", "", "Règles",
                        items_html(sections.get("4", []))))

    # --- Routes commerciales ---
    # Le pattern complet (§6)…
    arts.append(article("routes-commerciales", "Pattern de marchandage", "Exploitation en temps mort",
                        "Règles", items_html(sections.get("6", []))))
    # …et une fiche par route (première table du §6 : Route|Durée|Marge|Exposition)
    table_routes = next((d for k, d in sections.get("6", []) if k == "table"), None)
    if table_routes:
        heads = table_routes[0]
        for row in table_routes[1:]:
            nom = re.sub(r"<br>.*", "", row[0]).strip()
            if not nom:
                continue
            html = "".join("<p><strong>" + esc(re.sub(r"<br>.*", "", heads[i])) + " :</strong> "
                           + row[i] + "</p>" for i in range(1, len(row)))
            arts.append(article("routes-commerciales", nom, "", "Route", html))

    # --- Injection dans journal-data.js ---
    t = DATA.read_text(encoding="utf-8")
    i, j = t.index("{"), t.rindex("}")
    header, db, tail = t[:i], json.loads(t[i:j + 1]), t[j + 1:]
    n_new, n_maj = 0, 0
    for a in arts:
        lst = db["articles"].setdefault(a["rubrique"], [])
        old = next((x for x in lst if x["name"].lower() == a["name"].lower()), None)
        if old:
            old["description"] = a["description"]
            old["type"] = old.get("type") or a["type"]
            old["title"] = old.get("title") or a["title"]
            old["updated"] = today
            n_maj += 1
        else:
            lst.append(a)
            db.setdefault("changes", []).insert(0, {
                "author": "Guillaume", "action": "créé", "target": a["name"],
                "rubrique": a["rubrique"], "id": a["id"], "date": today})
            n_new += 1
    DATA.write_text(header + json.dumps(db, ensure_ascii=False, indent=2) + tail,
                    encoding="utf-8")
    print(f"{n_new} articles créés, {n_maj} mis à jour :")
    for a in arts:
        print(f"  [{a['rubrique']:20}] {a['name']:42} {len(a['description']):>6} car.")


if __name__ == "__main__":
    main()
