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

HEAD_MIN = 14.0   # >= : sous-titre (<h3>)
TITLE_MIN = 30.0  # >= : titre de nation (ignoré, c'est le nom de l'article)

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


def extract_html(p0, p1):
    """Traitement ligne par ligne : chaque ligne est classée par sa taille
    (titre vs corps), les césures de fin de ligne (tiret conditionnel) sont
    recollées, et les lettrines réintégrées au paragraphe."""
    d = fitz.open(PDF)
    items = []          # (tag, texte)
    pending_cap = ""
    para = ""           # paragraphe en cours
    head = ""           # sous-titre en cours

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
        nonlocal head
        t = clean(head)
        head = ""
        if t:
            items.append(("h3", t))

    def add_body(text):
        nonlocal para
        flush_head()
        if para.endswith("­"):           # césure : recoller sans espace
            para = para[:-1] + text.lstrip()
        elif para:
            para += " " + text
        else:
            para = text

    for i in range(p0, p1 + 1):
        page = d[i]
        pw = page.rect.width
        blocks = [b for b in page.get_text("dict")["blocks"] if b.get("type", 0) == 0]
        # Ordre de lecture : colonne gauche puis droite, de haut en bas.
        blocks.sort(key=lambda b: (0 if b["bbox"][0] < pw / 2 - 20 else 1, round(b["bbox"][1])))
        for b in blocks:
            flush_para()                  # nouveau bloc = nouveau paragraphe
            for line in b["lines"]:
                spans = line["spans"]
                if not spans:
                    continue
                text = "".join(s["text"] for s in spans)
                size = max(s["size"] for s in spans)
                stripped = text.strip()
                if not stripped or is_furniture(stripped):
                    continue
                if len(stripped) == 1 and stripped in string.ascii_uppercase:
                    flush_para()
                    pending_cap = stripped   # lettrine
                    continue
                if size >= TITLE_MIN:
                    continue                 # titre de la nation : ignoré
                if size >= HEAD_MIN:
                    flush_para()
                    head += (" " if head else "") + text.strip()
                else:
                    add_body(text)
        flush_para()
    flush_head()
    flush_para()

    parts = []
    for tag, t in items:
        parts.append("<" + tag + ">" + html.escape(t, quote=False) + "</" + tag + ">")
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
