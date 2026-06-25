#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extrait les descriptions de Nations du « 7e-Mer-V2-Livre-de-Base.pdf » et
les injecte (en HTML : <h3> pour les sous-titres, <p> pour le corps) dans
journal-data.js, rubrique nations.

Nettoie : en-têtes/pieds de page, « ç » décoratifs, lettrines, tirets
conditionnels, espaces multiples. Détecte les titres par taille de police.

Usage :
    python extract_book_nations.py --test 19 20        # affiche le HTML d'une plage
    python extract_book_nations.py --apply theah        # injecte une nation
    python extract_book_nations.py --apply-all          # injecte toutes les nations Theah
"""

import html
import json
import re
import string
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).parent
PDF = Path(r"D:/Utilisateur/Guillaume/Bureau/JDR Papier/7ème Mer/Livres/7e-Mer-V2-Livre-de-Base.pdf")
DATA = ROOT / "journal-data.js"

TITLE_MIN = 30.0  # >= : titre de nation (ignoré, c'est le nom de l'article)
H3_MIN = 15.0     # >= : grande section (Culture, Religion…) -> <h3>
H4_MIN = 12.3     # >= : sous-section (provinces, nations en relation…) -> <h4>
# (le corps de texte est ~10-11pt)

# Nom d'article (rubrique nations) -> (page PDF début, page PDF fin).
# (page imprimée = page PDF + 1)
PLAGES_NOM = {
    "Theah": (19, 20),
    "Avalon": (21, 25),
    "Castille": (26, 31),
    "Eisen": (32, 40),
    "Marche des Highlands": (41, 45),
    "Inismore": (46, 51),
    "Montaigne": (52, 61),
    "Sarmatie": (62, 69),
    "Ussura": (70, 77),
    "Vestenmennavenjar": (78, 84),
    "Vodacce": (85, 93),
}


def is_furniture(t):
    low = t.strip()
    if not low:
        return True
    if low in ("ç", "Ç", "•"):
        return True
    if re.search(r"CHAPITRE\s+\d|7E MER LIVRE DE BASE|LIVRE DE BASE", low, re.I):
        return True
    if re.fullmatch(r"\d{1,3}", low):
        return True
    return False


def clean(t):
    t = t.replace("­", "")          # tiret conditionnel
    t = re.sub(r"\s+", " ", t).strip()
    return t


def ends_sentence(t):
    """Vrai si t se termine par une ponctuation de fin de phrase (pour décider
    de fusionner ou non deux blocs fragmentés par une illustration)."""
    return bool(re.search(r"[.!?…][»\"')’»\s]*$", t.strip()))


def is_italic_block(b):
    spans = [s for l in b["lines"] for s in l["spans"]]
    return bool(spans) and all((s["flags"] & 2) for s in spans)


def extract_html(p0, p1):
    """Ligne par ligne : taille -> titre/sous-titre/corps. Épigraphe italique
    en tête de nation -> <blockquote>. Fusion des blocs fragmentés (illustrations)
    tant que la phrase n'est pas terminée. Lettrines & césures recollées."""
    d = fitz.open(PDF)
    items = []
    para = ""
    pending_cap = ""
    head = ""
    head_tag = ""

    def flush_para():
        nonlocal para, pending_cap
        t = clean(para)
        para = ""
        if not t:
            return
        if pending_cap:
            t = pending_cap + t
            pending_cap = ""
        items.append(("p", t))

    def flush_head():
        nonlocal head, head_tag
        t = clean(head)
        if t:
            items.append((head_tag, t))
        head, head_tag = "", ""

    def add_heading(tag, text):
        nonlocal head, head_tag
        flush_para()
        if head and head_tag == tag:
            head += " " + text.strip()
        else:
            flush_head()
            head, head_tag = text.strip(), tag

    def add_body(text, new_block):
        nonlocal para
        flush_head()
        t = text.strip()
        if not t:
            return
        if para.endswith("­"):                       # césure (tiret conditionnel)
            para = para[:-1] + t
        elif re.search(r"[a-zà-ÿ]-$", para) and t[:1].islower():
            para = para[:-1] + t                      # césure (tiret ordinaire en fin de ligne)
        elif para and new_block and ends_sentence(para):
            flush_para()
            para = t
        elif para:
            para += " " + t
        else:
            para = t

    for i in range(p0, p1 + 1):
        page = d[i]
        pw = page.rect.width
        blocks = [b for b in page.get_text("dict")["blocks"] if b.get("type", 0) == 0]

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
                    t = clean("".join(s["text"] for l in b["lines"] for s in l["spans"]))
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

        # Ordre de lecture : colonne gauche puis droite, de haut en bas.
        mid = pw / 2
        blocks.sort(key=lambda b: (0 if (b["bbox"][0] + b["bbox"][2]) / 2 < mid else 1, round(b["bbox"][1])))

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

    parts = []
    for tag, t in items:
        parts.append(t if tag == "raw" else "<" + tag + ">" + html.escape(t, quote=False) + "</" + tag + ">")
    return "\n".join(parts)


def load_db():
    t = DATA.read_text(encoding="utf-8")
    i, j = t.index("{"), t.rindex("}")
    return t[:i], json.loads(t[i:j + 1]), t[j + 1:]


def norm(s):
    import unicodedata
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    return s.lower().strip()


def apply(noms):
    header, db, tail = load_db()
    nations = db["articles"]["nations"]
    par_nom = {norm(a["name"]): a for a in nations}
    done = []
    for nom in noms:
        p0, p1 = PLAGES_NOM[nom]
        art = par_nom.get(norm(nom))
        if not art:
            print(f"  ! article introuvable : {nom}")
            continue
        art["description"] = extract_html(p0, p1)
        done.append((art["name"], len(art["description"])))
    DATA.write_text(header + "window.JOURNAL_DB = "
                    + json.dumps(db, ensure_ascii=False, indent=2) + ";\n",
                    encoding="utf-8")
    print(f"Injecté {len(done)} description(s) dans {DATA.name} :")
    for nom, n in done:
        print(f"  {nom:24} {n:>6} car.")


def main():
    if len(sys.argv) >= 2 and sys.argv[1] == "--test":
        print(extract_html(int(sys.argv[2]), int(sys.argv[3])))
        return 0
    if len(sys.argv) >= 2 and sys.argv[1] == "--apply-all":
        apply(list(PLAGES_NOM.keys()))
        return 0
    if len(sys.argv) >= 3 and sys.argv[1] == "--apply":
        apply([sys.argv[2]])
        return 0
    print("Usage : --test p0 p1 | --apply <Nom> | --apply-all")
    return 1


if __name__ == "__main__":
    sys.exit(main())
