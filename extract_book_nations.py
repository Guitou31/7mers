#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extrait les descriptions de Nations des PDF officiels de 7e Mer et les
injecte (HTML : <h3>/<h4> pour les titres, <p> pour le corps, <blockquote>
pour l'épigraphe) dans journal-data.js, rubrique nations.

Nettoyages : en-têtes/pieds, lettrines, césures (tiret conditionnel & ordinaire),
fusion des blocs fragmentés par une illustration, épigraphe italique isolée.
Exclusions : encadrés à fond sombre (appartés bleus + morceaux de parchemin)
détectés automatiquement, pages entières (personnalités…), et troncature de
section (garder N paragraphes après un titre puis sauter jusqu'au titre suivant).

Pagination : page imprimée = page PDF + 1.

Usage :
    python extract_book_nations.py --test pirates 19 25     # affiche le HTML
    python extract_book_nations.py --apply pirates          # injecte tout un livre
    python extract_book_nations.py --apply livre-base
"""

import html
import json
import re
import string
import sys
import unicodedata
from pathlib import Path

import fitz

ROOT = Path(__file__).parent
DATA = ROOT / "journal-data.js"
LIVRES = Path(r"D:/Utilisateur/Guillaume/Bureau/JDR Papier/7ème Mer/Livres")

TITLE_MIN = 30.0  # >= : titre de nation (ignoré)
H3_MIN = 15.0     # >= : grande section -> <h3>
H4_MIN = 12.3     # >= : sous-section -> <h4>

# Configuration par livre. Pour chaque nation : pages PDF (début, fin),
# et options : exclude (pages PDF entières à sauter), truncate (titre normalisé
# -> nb de paragraphes gardés avant de sauter jusqu'au prochain <h3>).
BOOKS = {
    "livre-base": {
        "pdf": LIVRES / "7e-Mer-V2-Livre-de-Base.pdf",
        "nations": {
            "Theah": {"pages": (19, 20)},
            "Avalon": {"pages": (21, 25)},
            "Castille": {"pages": (26, 31)},
            "Eisen": {"pages": (32, 40)},
            "Marche des Highlands": {"pages": (41, 45)},
            "Inismore": {"pages": (46, 51)},
            "Montaigne": {"pages": (52, 61)},
            "Sarmatie": {"pages": (62, 69)},
            "Ussura": {"pages": (70, 77)},
            "Vestenmennavenjar": {"pages": (78, 84)},
            "Vodacce": {"pages": (85, 93)},
        },
    },
    "pirates": {
        "pdf": LIVRES / "7e-Mer-Nations-Pirates.pdf",
        "nations": {
            "Numa": {"pages": (19, 37), "truncate": {"religion": 1}},
            "La Bucca": {"pages": (39, 59), "exclude": set(range(53, 60))},
            "La Mer Atabéenne (Rahuris)": {"pages": (61, 79)},
            "Aragosta": {"pages": (81, 101), "exclude": set(range(89, 94)) | set(range(98, 102)),
                         "drop": {"societes secretes"}},
            "Jaragua": {"pages": (103, 121), "exclude": set(range(112, 119))},
        },
    },
}


def is_furniture(t):
    low = t.strip()
    if not low:
        return True
    if low in ("ç", "Ç", "•"):
        return True
    # En-têtes/pieds : toujours en CAPITALES -> match sensible à la casse
    # (pour ne pas jeter « 7e Mer » ou « Ce chapitre » dans le corps de texte).
    if re.search(r"CHAPITRE\s+\d|7E MER|LIVRE DE BASE|NATIONS PIRATES", low):
        return True
    if re.fullmatch(r"\d{1,3}", low):
        return True
    return False


def clean(t):
    t = t.replace("­", "")
    return re.sub(r"\s+", " ", t).strip()


def ends_sentence(t):
    return bool(re.search(r"[.!?…][»\"')’\s]*$", t.strip()))


def is_italic_block(b):
    spans = [s for l in b["lines"] for s in l["spans"]]
    return bool(spans) and all((s["flags"] & 2) for s in spans)


def dark_rects(page):
    """Rectangles à fond sombre (encadrés bleus, morceaux de parchemin)."""
    out = []
    for dr in page.get_drawings():
        f = dr.get("fill")
        if not f:
            continue
        r = dr["rect"]
        if r.width * r.height < 3000:
            continue
        lum = 0.299 * f[0] + 0.587 * f[1] + 0.114 * f[2]
        if lum < 0.40:
            out.append(r)
    return out


def in_dark(bbox, rects):
    cx, cy = (bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2
    return any(r.x0 <= cx <= r.x1 and r.y0 <= cy <= r.y1 for r in rects)


def extract_html(pdf, p0, p1, exclude=frozenset(), truncate=None, drop=frozenset()):
    truncate = truncate or {}
    d = fitz.open(pdf)
    items = []
    para = ""
    pending_cap = ""
    head = ""
    head_tag = ""
    trunc_left = [None]   # None = hors troncature ; sinon nb de paragraphes encore gardés
    dropping = [False, None]   # [section supprimée en cours ?, niveau du titre déclencheur]

    def flush_para():
        nonlocal para, pending_cap
        t = clean(para)
        para = ""
        if not t:
            return
        if pending_cap:
            t = pending_cap + t
            pending_cap = ""
        if dropping[0]:
            return                         # section supprimée : paragraphe ignoré
        if trunc_left[0] is not None:
            if trunc_left[0] <= 0:
                return                     # troncature : paragraphe ignoré
            trunc_left[0] -= 1
        items.append(("p", t))

    def flush_head():
        nonlocal head, head_tag
        t = clean(head)
        if t:
            items.append((head_tag, t))
        head, head_tag = "", ""

    def add_heading(tag, text):
        nonlocal head, head_tag
        nt = norm(text.strip())
        # Fin d'une section supprimée : un <h3> (toujours) ou un <h4> de même niveau.
        if dropping[0] and (tag == "h3" or dropping[1] == "h4"):
            dropping[0] = False
        # Début d'une section à supprimer (titre + contenu jusqu'au titre suivant).
        if nt in drop:
            flush_para()
            dropping[0], dropping[1] = True, tag
            return
        if dropping[0]:
            return                          # dans une section supprimée : titres ignorés
        if tag == "h4" and trunc_left[0] is not None:
            return                          # troncature : sous-titres sautés
        flush_para()
        if tag == "h3" and trunc_left[0] is not None:
            trunc_left[0] = None            # nouveau <h3> -> fin de la troncature
        if head and head_tag == tag:
            head += " " + text.strip()
        else:
            flush_head()
            head, head_tag = text.strip(), tag
        if tag == "h3" and nt in truncate:
            trunc_left[0] = truncate[nt]

    def add_body(text, new_block):
        nonlocal para
        flush_head()
        t = text.strip()
        if not t:
            return
        if para.endswith("­"):
            para = para[:-1] + t
        elif re.search(r"[a-zà-ÿ]-$", para) and t[:1].islower():
            para = para[:-1] + t
        elif para and new_block and ends_sentence(para):
            flush_para()
            para = t
        elif para:
            para += " " + t
        else:
            para = t

    for i in range(p0, p1 + 1):
        if i in exclude:
            continue
        page = d[i]
        pw = page.rect.width
        rects = dark_rects(page)
        blocks = [b for b in page.get_text("dict")["blocks"]
                  if b.get("type", 0) == 0 and not in_dark(b["bbox"], rects)]

        # Épigraphe (1re page) : blocs italiques au-dessus du corps -> blockquote.
        if i == p0:
            def is_body_block(b):
                sz = max(s["size"] for l in b["lines"] for s in l["spans"])
                txt = "".join(s["text"] for l in b["lines"] for s in l["spans"]).strip()
                return (not is_italic_block(b)) and sz < H4_MIN and not is_furniture(txt)
            body_ys = [b["bbox"][1] for b in blocks if b["lines"] and is_body_block(b)]
            ymin = min(body_ys) if body_ys else 1e9
            epi = [b for b in blocks if is_italic_block(b) and b["bbox"][1] < ymin + 5
                   and max(s["size"] for l in b["lines"] for s in l["spans"]) < H3_MIN]
            if epi:
                ids = {id(b) for b in epi}
                blocks = [b for b in blocks if id(b) not in ids]
                epi.sort(key=lambda b: b["bbox"][1])
                quote, author = [], ""
                for b in epi:
                    lines_txt = ["".join(s["text"] for s in l["spans"]) for l in b["lines"]]
                    t = clean(" ".join(lines_txt))
                    if not t:
                        continue
                    if t[0] in "—–-":
                        author = t
                    else:
                        quote.append(t)
                bq = "<blockquote>" + html.escape(" ".join(quote), quote=False)
                if author:
                    bq += "<br><cite>" + html.escape(author, quote=False) + "</cite>"
                items.append(("raw", bq + "</blockquote>"))

        # Tri par bord gauche : un bloc pleine largeur (intro, x0 petit) reste
        # en colonne gauche -> lu en premier (la lettrine lui reste attachée).
        mid = pw / 2
        blocks.sort(key=lambda b: (0 if b["bbox"][0] < mid - 20 else 1, round(b["bbox"][1])))

        for b in blocks:
            first = True
            for line in b["lines"]:
                spans = line["spans"]
                if not spans:
                    continue
                text = "".join(s["text"] for s in spans)
                size = max(s["size"] for s in spans)
                st = text.strip()
                if not st or is_furniture(st):
                    continue
                if len(st) == 1 and st in string.ascii_uppercase:
                    flush_para()
                    pending_cap = st
                    first = False
                    continue
                if size >= TITLE_MIN:
                    first = False
                    continue
                if size >= H3_MIN:
                    add_heading("h3", text)
                elif size >= H4_MIN:
                    add_heading("h4", text)
                else:
                    add_body(text, first)
                first = False

    flush_head()
    flush_para()

    parts = [t if tag == "raw" else "<" + tag + ">" + html.escape(t, quote=False) + "</" + tag + ">"
             for tag, t in items]
    return "\n".join(parts)


def norm(s):
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"^(?:la|le|les|l'|the)\s+", "", s.lower()).strip()


def slugify(s):
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:60] or "sans-nom"


def load_db():
    t = DATA.read_text(encoding="utf-8")
    i, j = t.index("{"), t.rindex("}")
    return t[:i], json.loads(t[i:j + 1]), t[j + 1:]


def write_db(header, db):
    DATA.write_text(header + "window.JOURNAL_DB = "
                    + json.dumps(db, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")


def apply(book_key):
    book = BOOKS[book_key]
    pdf = book["pdf"]
    header, db, tail = load_db()
    nations = db["articles"]["nations"]
    by_norm = {norm(a["name"]): a for a in nations}
    report = []
    for name, cfg in book["nations"].items():
        p0, p1 = cfg["pages"]
        desc = extract_html(pdf, p0, p1, cfg.get("exclude", frozenset()),
                            cfg.get("truncate"), cfg.get("drop", frozenset()))
        art = by_norm.get(norm(name))
        if art:
            art["description"] = desc
            action = "maj"
        else:
            art = {"id": "nat-" + slugify(name), "slug": slugify(name), "rubrique": "nations",
                   "name": name, "type": "Nation", "title": "", "image": "", "aliases": [],
                   "description": desc, "etiquettes": [], "created": "", "updated": "",
                   "author": "Guillaume"}
            nations.append(art)
            by_norm[norm(name)] = art
            action = "créé"
        report.append((name, action, len(desc), desc.count("<h3>"), desc.count("<h4>")))
    write_db(header, db)
    print(f"Livre « {book_key} » -> journal-data.js :")
    for name, action, n, h3, h4 in report:
        print(f"  [{action:4}] {name:30} {n:>6} car.  {h3} h3  {h4} h4")


def main():
    a = sys.argv[1:]
    if len(a) == 4 and a[0] == "--test":
        print(extract_html(BOOKS[a[1]]["pdf"], int(a[2]), int(a[3])))
        return 0
    if len(a) == 2 and a[0] == "--apply":
        apply(a[1])
        return 0
    print("Usage : --test <book> p0 p1 | --apply <book>")
    return 1


if __name__ == "__main__":
    sys.exit(main())
