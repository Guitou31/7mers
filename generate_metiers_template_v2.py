"""Génère un fichier Markdown pré-rempli pour la révision v2 des métiers.

Cible : 3 compétences de base + 7 compétences avancées par métier (in fine).

Le fichier généré contient un bloc par métier avec l'état actuel.
Tu remplaces simplement les lignes 'base:' / 'av:' / 'base_choix:' / 'av_choix:'
par l'état final souhaité. Le parser dans pdf_metiers_to_json.py détecte
les différences et applique automatiquement.

Format des choix :
    base_choix: nb=N; options=A, B, C; note=texte optionnel
    av_choix:   nb=N; options=A, B, C

Lignes vides ou absentes = pas de modification sur ce champ.
"""

import json
from pathlib import Path

DEST_DIR = Path(__file__).parent
SOURCE_JSON = DEST_DIR / "metiers.json"
DEST_MD = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Corrections des compétences des métiers v2.md"
)

CIBLE_BASE = 3
CIBLE_AV = 7


def _iter_choix(v):
    if not v: return []
    if isinstance(v, dict): return [v]
    if isinstance(v, list): return [c for c in v if c]
    return []


def fmt_choix(ch: dict) -> str:
    """Formate UN choix en chaîne 'nb=N; options=A, B, C; note=...'."""
    if not ch:
        return ""
    parts = [f"nb={ch['nb']}"]
    parts.append("options=" + ", ".join(ch.get("options", [])))
    if ch.get("note"):
        parts.append(f"note={ch['note']}")
    return "; ".join(parts)


def metier_status(m: dict) -> tuple[int, int, str]:
    nb_base = len(m.get("competences_base", [])) + sum(
        (ch.get("nb") or 0) for ch in _iter_choix(m.get("competences_base_choix"))
    )
    nb_av = len(m.get("competences_avancees", [])) + sum(
        (ch.get("nb") or 0) for ch in _iter_choix(m.get("competences_avancees_choix"))
    )
    if m["nom"] == "Artisan":
        marker = "⭐ (cas particulier)"
    elif nb_base == CIBLE_BASE and nb_av == CIBLE_AV:
        marker = "✓ conforme"
    else:
        marker = f"⚠ {nb_base} base / {nb_av} av"
    return nb_base, nb_av, marker


def main() -> None:
    data = json.loads(SOURCE_JSON.read_text(encoding="utf-8"))
    metiers = sorted(data["metiers"], key=lambda m: m["nom"].lower())

    out: list[str] = []
    out.append(
        f"# Corrections des compétences des métiers — v2\n\n"
        f"**Cible : {CIBLE_BASE} compétences de base + {CIBLE_AV} compétences avancées** "
        f"par métier (in fine, en utilisant des choix au besoin).\n\n"
        f"## Comment éditer ce fichier\n\n"
        f"Pour chaque métier :\n"
        f"1. **Modifie** les lignes `base:` `av:` `base_choix:` `av_choix:` "
        f"pour refléter l'état final souhaité.\n"
        f"2. Laisse `base_choix:` / `av_choix:` vide si pas de choix.\n"
        f"3. Tu peux laisser des métiers tels quels (le parser ne change rien "
        f"si l'état actuel = état écrit).\n\n"
        f"**Format des choix :** `nb=N; options=A, B, C; note=texte optionnel`\n"
        f"(le `;` sépare les paramètres ; les virgules sont pour la liste d'options).\n\n"
        f"**Astuces :**\n"
        f"- Ouvre dans VS Code, Notepad++, Obsidian, ou Word\n"
        f"- Sauvegarde régulièrement, ce fichier survit aux sessions Claude\n"
        f"- Quand tu veux appliquer, dis-le-moi et je relance le pipeline\n\n"
    )

    # Sommaire / avancement
    ok = []
    todo = []
    art = None
    for m in metiers:
        if m["nom"] == "Artisan":
            art = m
            continue
        nb_b, nb_av, _ = metier_status(m)
        if nb_b == CIBLE_BASE and nb_av == CIBLE_AV:
            ok.append(m["nom"])
        else:
            todo.append((m["nom"], nb_b, nb_av))

    out.append(f"## Avancement\n\n")
    out.append(f"- ✓ **Conformes ({CIBLE_BASE}/{CIBLE_AV})** : "
               f"{len(ok)}/{len(metiers) - (1 if art else 0)}\n")
    if ok:
        out.append(f"  - {', '.join(ok)}\n")
    out.append(f"- ⚠ **À ajuster** : {len(todo)}\n")
    if todo:
        for n, b, a in todo:
            out.append(f"  - {n} _(base {b} / av {a})_\n")
    if art:
        out.append(f"- ⭐ **Cas particulier** : Artisan (à laisser tel quel)\n")
    out.append("\n---\n\n")

    out.append(f"## Métiers (par ordre alphabétique)\n\n")
    for m in metiers:
        nb_b, nb_av, marker = metier_status(m)
        cats = ", ".join(m.get("categories", []))
        rtype = m.get("restriction_type", "aucune")
        rtxt = m.get("restriction_texte", "")
        out.append(f"### {m['nom']} — {marker}\n\n")
        out.append(f"_Catégories : {cats}_\n\n")
        if rtype != "aucune":
            out.append(f"_Restriction ({rtype}) : {rtxt}_\n\n")

        base = m.get("competences_base", [])
        av = m.get("competences_avancees", [])
        ch_bs = _iter_choix(m.get("competences_base_choix"))
        ch_as = _iter_choix(m.get("competences_avancees_choix"))

        out.append("```\n")
        out.append(f"base: {', '.join(base)}\n")
        out.append(f"av: {', '.join(av)}\n")
        # Une ligne par bloc choix. Toujours afficher au moins une ligne vide
        # pour faciliter l'édition par Guillaume.
        if ch_bs:
            for ch in ch_bs:
                out.append(f"base_choix: {fmt_choix(ch)}\n")
        else:
            out.append("base_choix: \n")
        if ch_as:
            for ch in ch_as:
                out.append(f"av_choix: {fmt_choix(ch)}\n")
        else:
            out.append("av_choix: \n")
        out.append("```\n\n")

    text = "".join(out)
    DEST_MD.write_text(text, encoding="utf-8")
    print(f"OK -> {DEST_MD}")
    print(f"  {len(metiers)} métiers générés")
    print(f"  Conformes : {len(ok)} / À ajuster : {len(todo)} / Cas particulier : 1 (Artisan)")


if __name__ == "__main__":
    main()
