#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extrait la sorcellerie Lærdom du « Guide_Skjaeren_Laerdom.docx » vers
sorcelleries.js (fusion par id) + copie les 25 glyphes de runes dans
images/runes/laerdom-NN.png.

Modèle produit (générique, rendu par sorcellerie-app.js) :
  { id, nom, nation, accroche,
    sections: [{titre, html} | {titre, type:"runes", intro}],
    runes: [{num, nom, trad, nd, famille, img, paras[]}] }
"""

import html as H
import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).parent
DOCX = Path(r"D:/Utilisateur/Guillaume/Bureau/JDR Papier/7ème Mer/Sorcelleries V2 à V1/Guide_Skjaeren_Laerdom.docx")
SORTIE = ROOT / "sorcelleries.js"
IMGDIR = ROOT / "images" / "runes"

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
RNS = "{http://schemas.openxmlformats.org/package/2006/relationships}"


def clean(s):
    s = (s or "").replace("\u00a0", " ").replace("\u202f", " ")
    return re.sub(r"\s+", " ", s).strip()


def esc(s):
    return H.escape(clean(s), quote=False)


def P(t):
    """Paragraphe avec intitulé court éventuellement mis en gras."""
    e = esc(t)
    return "<p>" + re.sub(r"^([^:]{2,40}?) :\s", r"<strong>\1 :</strong> ", e) + "</p>"


def UL(items):
    return "<ul>" + "".join("<li>" + esc(x) + "</li>" for x in items) + "</ul>"


def TABLE(headers, rows):
    h = "<tr>" + "".join("<th>" + esc(c) + "</th>" for c in headers) + "</tr>"
    b = "".join("<tr>" + "".join("<td>" + c + "</td>" for c in r) + "</tr>" for r in rows)
    return "<div class='sorc-tablewrap'><table>" + h + b + "</table></div>"


def traiter_glyphe(path):
    """Détourage de la pierre runique : le blanc EXTÉRIEUR (connecté aux bords)
    devient transparent, la pierre grise et ses rehauts blancs intérieurs sont
    préservés. Recadrage au contour + petite marge. Écrase le fichier."""
    from collections import deque
    from PIL import Image
    SEUIL = 240
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    lum = list(img.convert("L").getdata())
    fond = bytearray(w * h)          # 1 = blanc extérieur (à rendre transparent)
    dq = deque()
    for x in range(w):
        for y in (0, h - 1):
            i = y * w + x
            if lum[i] >= SEUIL and not fond[i]:
                fond[i] = 1
                dq.append(i)
    for y in range(h):
        for x in (0, w - 1):
            i = y * w + x
            if lum[i] >= SEUIL and not fond[i]:
                fond[i] = 1
                dq.append(i)
    while dq:
        i = dq.popleft()
        x, y = i % w, i // w
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                j = ny * w + nx
                if not fond[j] and lum[j] >= SEUIL:
                    fond[j] = 1
                    dq.append(j)
    px = list(img.getdata())
    px = [(r, g, b, 0) if fond[i] else (r, g, b, a)
          for i, (r, g, b, a) in enumerate(px)]
    img.putdata(px)
    bbox = img.getbbox()             # bbox de l'alpha non nul
    if bbox:
        pad = 4
        bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad),
                min(w, bbox[2] + pad), min(h, bbox[3] + pad))
        img = img.crop(bbox)
    img.save(path, optimize=True)


def main():
    z = zipfile.ZipFile(DOCX)
    body = ET.fromstring(z.read("word/document.xml")).find(W + "body")
    rels = ET.fromstring(z.read("word/_rels/document.xml.rels"))
    rid2file = {rel.get("Id"): rel.get("Target") for rel in rels.findall(RNS + "Relationship")}

    def style(p):
        pPr = p.find(W + "pPr")
        if pPr is None:
            return ""
        ps = pPr.find(W + "pStyle")
        return ps.get(W + "val") if ps is not None else ""

    def txt(el):
        return "".join(t.text or "" for t in el.iter(W + "t"))

    def cell_paras(tc):
        return [clean(txt(p)) for p in tc.findall(W + "p") if clean(txt(p))]

    def tbl_image(tbl):
        for blip in tbl.iter(A + "blip"):
            rid = blip.get(R + "embed")
            if rid and rid in rid2file:
                return rid2file[rid].lstrip("/")   # ex. media/image1.png
        return None

    # ---- Collecte séquentielle : paragraphes par section, tables par ordre ----
    paras = {}          # titre courant -> liste (texte, est_liste)
    tables = []
    heading = None

    for el in body:
        tag = el.tag.replace(W, "")
        if tag == "p":
            t = clean(txt(el))
            if not t:
                continue
            st = style(el)
            if st in ("Titre1", "Titre2", "Titre3"):
                heading = t
                paras.setdefault(heading, [])
                continue
            if t == "Rayon et durée des runes de temps":   # pseudo-titre (style para)
                heading = t
                paras.setdefault(heading, [])
                continue
            if heading:
                paras.setdefault(heading, []).append((t, st == "Paragraphedeliste"))
        elif tag == "tbl":
            tables.append(el)

    def get(h):
        return paras.get(h, [])

    # ---- Sections HTML ----
    sections = []

    # 1. Lærdom en bref
    bref = [t for t, _ in get("Lærdom en bref")]
    sections.append({"titre": "Lærdom en bref", "html": "".join(P(t) for t in bref)})

    # 2. Les trois pouvoirs
    sections.append({"titre": "Les trois pouvoirs",
                     "html": "".join(P(t) for t, _ in get("Les trois pouvoirs"))})

    # 3. Lignées et progression (table #0 sans la colonne ☐ + paras utiles)
    lign = tables[0]
    lrows = []
    for i, tr in enumerate(lign.findall(W + "tr")):
        cells = [" ".join(cell_paras(tc)) for tc in tr.findall(W + "tc")]
        lrows.append(cells[1:])            # colonne 0 = case à cocher (fiche imprimable)
    lhtml = TABLE(lrows[0], [[esc(c) for c in r] for r in lrows[1:]])
    utiles = [t for t, _ in get("Lignée — seul le sang fait foi")
              if "☐" not in t and not re.search(r"_{4,}", t)]
    lhtml += "".join(P(t) for t in utiles)
    prog = [t for t, _ in get("Progression et ronds de rang")]
    if prog:
        lhtml += P(prog[0]) + UL([re.sub(r"^○\s*", "", t) for t in prog[1:]])
    sections.append({"titre": "Lignées et progression", "html": lhtml})

    # 4. Procédures selon la famille de rune (table #1, cellules multi-paragraphes)
    proc = tables[1]
    prows = []
    for tr in proc.findall(W + "tr"):
        prows.append(["<br>".join(esc(p) for p in cell_paras(tc)) for tc in tr.findall(W + "tc")])
    phtml = "".join(P(t) for t, _ in get("Procédures selon la famille de rune"))
    phtml += TABLE([re.sub("<br>.*", "", c) for c in prows[0]], prows[1:])
    sections.append({"titre": "Procédures selon la famille de rune", "html": phtml})

    # 5. Rayon et durée (table #2 imbriquée : 2 mini-tables) + para de conclusion
    sub = tables[2].findall(".//" + W + "tr")
    mini = []
    for tr in sub:
        cells = [" ".join(cell_paras(tc)) for tc in tr.findall(".//" + W + "tc")]
        if len(cells) == 2:
            mini.append(cells)
    half = [r for r in mini]
    t1 = [r for r in half[0:5]]
    t2 = [r for r in half[5:9]]
    rhtml = ("<div class='sorc-duo'>" +
             TABLE(t1[0], [[esc(c) for c in r] for r in t1[1:]]) +
             TABLE(t2[0], [[esc(c) for c in r] for r in t2[1:]]) + "</div>")
    rhtml += "".join(P(t) for t, _ in get("Rayon et durée des runes de temps"))
    sections.append({"titre": "Rayon et durée des runes de temps", "html": rhtml})

    # 6. Limites et dangers (sous-sections + table Disruption #3)
    lim = ""
    dang = get("Le danger des runes")
    if dang:
        lim += "<h4>Le danger des runes</h4>" + UL([t for t, _ in dang])
    disr = get("Disruption : jamais deux effets de rune sur la même personne")
    lim += "<h4>Disruption : jamais deux effets de rune sur la même personne</h4>"
    if disr:
        lim += P(disr[0][0])
    dt = tables[3]
    drows = [[" ".join(cell_paras(tc)) for tc in tr.findall(W + "tc")] for tr in dt.findall(W + "tr")]
    lim += TABLE(drows[0], [[esc(c) for c in r] for r in drows[1:]])
    for t, _ in disr[1:]:
        lim += P(t)
    for titre in ("Invoquer", "Inscrire", "Devenir"):
        items = get(titre)
        if items:
            lim += "<h4>" + esc(titre) + "</h4>" + UL([t for t, _ in items])
    sections.append({"titre": "Limites et dangers", "html": lim})

    # 7. Les vingt-cinq runes (tables #4..#28) + glyphes
    IMGDIR.mkdir(parents=True, exist_ok=True)
    runes = []
    intro = " ".join(t for t, _ in get("Les vingt-cinq runes"))
    for tbl in tables[4:29]:
        tr = tbl.find(W + "tr")
        tcs = tr.findall(W + "tc")
        ps = cell_paras(tcs[1]) if len(tcs) > 1 else []
        if not ps:
            continue
        m = re.match(r"^(\d+)\s*·\s*(.+?)\s*\(«\s*(.+?)\s*»\)\s*—\s*ND\s*(.+)$", ps[0])
        if not m:
            continue
        rune = {"num": int(m.group(1)), "nom": m.group(2).strip(), "trad": m.group(3).strip(),
                "nd": clean(m.group(4)), "famille": ps[1] if len(ps) > 1 else "",
                "img": "", "paras": ps[2:]}
        media = tbl_image(tbl)
        if media:
            dest = IMGDIR / ("laerdom-%02d.png" % rune["num"])
            dest.write_bytes(z.read("word/" + media.lstrip("/")))
            try:
                traiter_glyphe(dest)
            except Exception as e:
                print(f"  ! glyphe {dest.name} non traité : {e}")
            rune["img"] = "images/runes/" + dest.name
        runes.append(rune)
    sections.append({"titre": "Les vingt-cinq runes", "type": "runes", "intro": intro})

    # 8. Annexe (table #29)
    at = tables[29]
    arows = [[" ".join(cell_paras(tc)) for tc in tr.findall(W + "tr" if False else W + "tc")]
             for tr in at.findall(W + "tr")]
    sections.append({"titre": "Annexe — les runes en un coup d'œil",
                     "html": TABLE(arows[0], [[esc(c) for c in r] for r in arows[1:]])})

    # ---- Objet sorcellerie ----
    accroche = ""
    if bref:
        m = re.match(r"^(.+?[.!])\s", bref[0] + " ")
        accroche = m.group(1) if m else bref[0][:160]
    d = {"id": "laerdom", "nom": "Lærdom", "nation": "Vestenmannavnjar & Vendel",
         "accroche": accroche, "sections": sections, "runes": runes}

    # ---- Fusion dans sorcelleries.js ----
    existing = []
    if SORTIE.exists():
        t = SORTIE.read_text(encoding="utf-8")
        existing = json.loads(t[t.index("{"):t.rindex("}") + 1]).get("sorcelleries", [])
    existing = [s for s in existing if s.get("id") != d["id"]]
    existing.append(d)
    existing.sort(key=lambda s: s["nom"])
    SORTIE.write_text(
        "// Données des Sorcelleries — GÉNÉRÉ par parse_sorcellerie_*.py, ne pas éditer.\n"
        "window.SORCELLERIES_DATA = " + json.dumps({"sorcelleries": existing}, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8")

    print(f"Lærdom : {len(sections)} sections, {len(runes)} runes "
          f"({sum(1 for r in runes if r['img'])} glyphes copiés dans images/runes/).")
    for r in runes[:5]:
        print(f"  {r['num']:02d} {r['nom']:12} (« {r['trad']} »)  ND {r['nd']}  [{r['famille']}]  {len(r['paras'])} paras")


if __name__ == "__main__":
    main()
