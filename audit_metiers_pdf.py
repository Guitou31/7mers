"""Audit : compare l'état actuel de metiers.json à la source brute du PDF.

Extrait pour chaque métier les sections 'Compétences de base' et 'Compétences
avancées' telles que présentes dans le PDF (sans aucune transformation
maison), puis compare avec metiers.json.

Génère un fichier 'Audit metiers PDF vs actuel.md' qui liste pour chaque
métier les compétences PDF, les compétences actuelles, et le diff.
"""

import json
import re
import unicodedata
from pathlib import Path

import fitz  # type: ignore

PDF = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Légendes de la 7ème mer\04 Métiers (15-11-14).pdf"
)
DEST_DIR = Path(__file__).parent
METIERS_JSON = DEST_DIR / "metiers.json"
DEST_MD = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Audit metiers PDF vs actuel.md"
)


def _nk(s: str) -> str:
    nfkd = unicodedata.normalize("NFKD", s)
    no_acc = "".join(c for c in nfkd if not unicodedata.combining(c))
    return re.sub(r"\s+", " ", no_acc.lower().replace("’", "'").replace("‘", "'").strip())


# Sections clés (DominicanItalic typiquement). On les détecte par regex.
SECTION_HEADERS = [
    "Restriction",
    "Supplément d’origine",
    "Catégories",
    "Description",
    "Compétences de base",
    "Compétences avancées",
    "Réputation",
]


def extract_raw_metiers_from_pdf() -> dict[str, dict]:
    """Parse le PDF en repérant les noms de métier (CopperplateGothic-Light) et
    extrait les sections texte sans aucune transformation."""
    doc = fitz.open(str(PDF))

    # Récolte tous les spans avec position pour reconstruire l'ordre.
    spans = []
    for page_num, page in enumerate(doc, start=1):
        for blk in page.get_text("dict")["blocks"]:
            if blk.get("type") != 0:
                continue
            for line in blk.get("lines", []):
                for span in line.get("spans", []):
                    spans.append({
                        "page": page_num,
                        "text": span["text"],
                        "font": span.get("font", ""),
                        "size": span.get("size", 0),
                    })

    metiers: dict[str, dict] = {}
    current_metier: str | None = None
    current_section: str | None = None
    buffer: list[str] = []
    in_metier_section = False  # devient True après "Métiers autorisés sans restriction"

    def flush_section():
        nonlocal buffer
        if current_metier is not None and current_section is not None:
            text = " ".join(buffer).strip()
            metiers.setdefault(current_metier, {})[current_section] = text
        buffer = []

    for sp in spans:
        text = sp["text"].strip()
        if not text:
            continue
        font = sp["font"]

        # En-tête principal : "Métiers autorisés sans restriction à la création"
        if "Métiers autorisés" in text:
            in_metier_section = True
            continue
        if not in_metier_section:
            continue

        # Nom de métier : police CopperplateGothic
        if "CopperplateGothic" in font:
            flush_section()
            current_metier = text
            current_section = None
            continue

        # Section header : DominicanItalic
        if "DominicanItalic" in font and text in SECTION_HEADERS:
            flush_section()
            current_section = text
            continue

        # Sinon : contenu de la section courante
        if current_section is not None:
            buffer.append(text)

    flush_section()
    return metiers


def split_competences_raw(text: str) -> list[str]:
    """Split simple sur virgules/points, sans aucun filtre. Conserve TOUT."""
    if not text:
        return []
    text = text.strip().rstrip(".").rstrip(",")
    parts = re.split(r"\s*[,.]\s*", text)
    return [re.sub(r"\s+", " ", p).strip() for p in parts if p.strip()]


def main() -> None:
    print("Extraction PDF…")
    raw = extract_raw_metiers_from_pdf()
    print(f"  {len(raw)} métiers détectés dans le PDF")

    print("Lecture metiers.json…")
    md = json.loads(METIERS_JSON.read_text(encoding="utf-8"))["metiers"]
    by_key = {_nk(m["nom"]): m for m in md}

    out: list[str] = [
        "# Audit : compétences PDF vs état actuel\n\n",
        "Comparaison pour chaque métier entre :\n",
        "- **PDF brut** : ce que dit le PDF source (sans filtre N.B., sans override, sans modification v1)\n",
        "- **Actuel** : ce qu'il y a dans metiers.json après tout le pipeline\n\n",
        "Légende :\n",
        "- ✅ : identique\n",
        "- ➕ : présent dans actuel mais PAS dans PDF (ajout maison)\n",
        "- ➖ : présent dans PDF mais PAS dans actuel (perdu / retiré)\n",
        "- ⭐ : présent dans les deux\n\n",
        "---\n\n",
    ]

    metiers_avec_diff = 0
    for nom_pdf in sorted(raw.keys(), key=lambda x: x.lower()):
        d = raw[nom_pdf]
        base_pdf = split_competences_raw(d.get("Compétences de base", ""))
        av_pdf = split_competences_raw(d.get("Compétences avancées", ""))

        m = by_key.get(_nk(nom_pdf))
        if not m:
            out.append(f"## {nom_pdf} — ⚠ INTROUVABLE dans metiers.json\n\n")
            out.append(f"_PDF base_ : {', '.join(base_pdf)}\n\n")
            out.append(f"_PDF av_   : {', '.join(av_pdf)}\n\n")
            out.append("---\n\n")
            continue

        base_act = list(m.get("competences_base", []))
        av_act = list(m.get("competences_avancees", []))
        ch_b = m.get("competences_base_choix")
        ch_a = m.get("competences_avancees_choix")
        if ch_b:
            base_act = base_act + ["[CHOIX " + str(ch_b.get("nb")) + " parmi : " + ", ".join(ch_b.get("options", [])) + "]"]
        if ch_a:
            av_act = av_act + ["[CHOIX " + str(ch_a.get("nb")) + " parmi : " + ", ".join(ch_a.get("options", [])) + "]"]

        def diff_section(label: str, pdf_list: list[str], act_list: list[str]) -> tuple[list[str], bool]:
            keys_pdf = {_nk(x) for x in pdf_list}
            keys_act = {_nk(x) for x in act_list}
            common = keys_pdf & keys_act
            only_pdf = keys_pdf - keys_act
            only_act = keys_act - keys_pdf
            has_diff = bool(only_pdf or only_act)
            lines = [f"\n**{label}**\n"]
            lines.append(f"- PDF brut ({len(pdf_list)}) : {', '.join(pdf_list) or '_(vide)_'}\n")
            lines.append(f"- Actuel ({len(act_list)}) : {', '.join(act_list) or '_(vide)_'}\n")
            if only_pdf:
                # retrouver les valeurs originales
                lost = [x for x in pdf_list if _nk(x) in only_pdf]
                lines.append(f"- ➖ Perdues (présentes PDF, absentes actuel) : **{', '.join(lost)}**\n")
            if only_act:
                added = [x for x in act_list if _nk(x) in only_act]
                lines.append(f"- ➕ Ajoutées (absentes PDF, présentes actuel) : **{', '.join(added)}**\n")
            if not has_diff:
                lines = [f"\n**{label}** — ✅ identique ({len(pdf_list)} items)\n"]
            return lines, has_diff

        base_lines, base_diff = diff_section("Base", base_pdf, base_act)
        av_lines, av_diff = diff_section("Avancées", av_pdf, av_act)
        has_diff = base_diff or av_diff
        if has_diff:
            metiers_avec_diff += 1

        emoji = "⚠" if has_diff else "✅"
        out.append(f"## {nom_pdf} — {emoji}\n")
        out.extend(base_lines)
        out.extend(av_lines)
        out.append("\n---\n\n")

    # Liste des métiers présents dans actuel mais ABSENTS du PDF
    raw_keys = {_nk(n) for n in raw}
    only_in_actuel = [m["nom"] for m in md if _nk(m["nom"]) not in raw_keys]
    if only_in_actuel:
        out.insert(11, f"## ⚠ Métiers dans metiers.json mais absents du PDF (= invention possible)\n\n")
        for n in only_in_actuel:
            out.insert(12, f"- {n}\n")
        out.insert(11 + len(only_in_actuel) + 1, "\n---\n\n")

    # Résumé en haut
    summary = (
        f"## Résumé\n\n"
        f"- {len(raw)} métiers extraits du PDF\n"
        f"- {len(md)} métiers dans metiers.json\n"
        f"- **{metiers_avec_diff}** métiers avec différences (à examiner)\n"
        f"- **{len(md) - metiers_avec_diff}** métiers identiques au PDF\n"
        f"- {len(only_in_actuel)} métier(s) dans actuel mais absent(s) du PDF\n\n"
        f"---\n\n"
    )
    out.insert(11, summary)

    text = "".join(out)
    DEST_MD.write_text(text, encoding="utf-8")
    print(f"\nOK -> {DEST_MD}")
    print(f"  {metiers_avec_diff} métiers avec différences sur {len(md)}")
    print(f"  {len(only_in_actuel)} métiers présents dans actuel mais absents du PDF")
    if only_in_actuel:
        print(f"  → {only_in_actuel}")


if __name__ == "__main__":
    main()
