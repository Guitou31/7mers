# -*- coding: utf-8 -*-
r"""Exporte les données de référence du site en Markdown lisible,
pour le dossier « Projet Claude » (connaissances du projet claude.ai).

Usage :  python export_projet_claude.py
Sortie : ..\Projet Claude\*.md   (un fichier par catégorie)

À relancer après toute modification des données du site
(ecoles.json, avantages.json, sorcelleries.js, etc.).
"""
import json
import os
import re
import html as H
from datetime import date

ICI = os.path.dirname(os.path.abspath(__file__))
SORTIE = os.path.normpath(os.path.join(ICI, "..", "Projet Claude"))
os.makedirs(SORTIE, exist_ok=True)

def charger(nom):
    return json.load(open(os.path.join(ICI, nom), encoding="utf-8"))

def charger_js(nom, prefixe):
    src = open(os.path.join(ICI, nom), encoding="utf-8").read()
    i = src.index(prefixe) + len(prefixe)
    return json.loads(src[i:].strip().rstrip(";"))

def ecrire(nom, lignes):
    texte = "\n".join(lignes).rstrip() + "\n"
    texte = re.sub(r"\n{3,}", "\n\n", texte)
    chemin = os.path.join(SORTIE, nom)
    open(chemin, "w", encoding="utf-8", newline="\n").write(texte)
    print(f"  {nom:38s} {os.path.getsize(chemin)/1024:7.1f} Ko")
    return nom

# ---------------------------------------------------------------- HTML -> MD
def table_to_md(frag):
    lignes = re.findall(r"<tr[^>]*>(.*?)</tr>", frag, flags=re.S)
    out = []
    for i, tr in enumerate(lignes):
        cells = re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", tr, flags=re.S)
        cells = [re.sub(r"<[^>]+>", "", c).strip() for c in cells]
        out.append("| " + " | ".join(cells) + " |")
        if i == 0:
            out.append("|" + "---|" * len(cells))
    return "\n" + "\n".join(out) + "\n"

def html_to_md(s):
    s = re.sub(r"<table.*?</table>", lambda m: table_to_md(m.group(0)), s, flags=re.S)
    s = re.sub(r"<h3[^>]*>(.*?)</h3>", r"\n\n**\1**\n\n", s, flags=re.S)
    s = re.sub(r"<h4[^>]*>(.*?)</h4>", r"\n\n**\1**\n\n", s, flags=re.S)
    s = re.sub(r"<li[^>]*>(.*?)</li>", r"- \1\n", s, flags=re.S)
    s = re.sub(r"</?(ul|ol)[^>]*>", "\n", s)
    s = re.sub(r"<(strong|b)>(.*?)</\1>", r"**\2**", s, flags=re.S)
    s = re.sub(r"<(em|i)>(.*?)</\1>", r"*\2*", s, flags=re.S)
    s = re.sub(r"<br\s*/?>", "\n", s)
    s = re.sub(r"</p>\s*<p[^>]*>", "\n\n", s)
    s = re.sub(r"</?p[^>]*>", "\n", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = H.unescape(s)
    return re.sub(r"\n{3,}", "\n\n", s).strip()

ORIGINES = {
    "officielle": "officielle (7ème Mer V1)",
    "combat_reclassee": "école de combat reclassée Spadassin",
    "seconde_edition_adaptee": "seconde édition, adaptée V1",
}
RESTRICTIONS = {
    "libre": "libre à la création",
    "limitee": "accès limité à la création",
    "interdite": "interdite à la création",
    "inconnue": "non documentée",
}

AUJOURDHUI = date.today().strftime("%d/%m/%Y")
fichiers = []

def entete(titre, sous_titre):
    return [f"# {titre}", "", f"*{sous_titre} — export du site du {AUJOURDHUI} (7ème Mer V1, campagne de Guillaume).*", ""]

# ---------------------------------------------------------------- Écoles
def bloc_ecole(e):
    out = [f"## {e['nom']} — {e.get('arme_display') or e.get('arme') or '—'}", ""]
    if e.get("redacted"):
        out += ["> ⚠️ École **classifiée** : masquée aux joueurs sur le site (réservée MJ).", ""]
    infos = []
    if e.get("nations"):
        infos.append("**Nations :** " + ", ".join(e["nations"]))
    infos.append("**Origine :** " + (ORIGINES.get(e.get("origine")) or e.get("origine") or "—"))
    infos.append("**Création :** " + (RESTRICTIONS.get(e.get("restriction_creation")) or "—"))
    if e.get("genre_restriction"):
        infos.append("**Réservée aux " + ("femmes" if e["genre_restriction"] == "femmes" else "hommes") + "**")
    out += ["- " + " · ".join(infos)]
    if e.get("specialisations"):
        out += ["- **Spécialisations :** " + ", ".join(e["specialisations"])]
    tcs = []
    for tc in e.get("techniques_combat") or []:
        nom = tc.get("nom_base") or ""
        if tc.get("variante"):
            nom += f" ({tc['variante']})"
        if nom:
            tcs.append(nom)
    if tcs:
        out += ["- **Techniques de combat :** " + ", ".join(tcs)]
    out += [""]
    d = e.get("details") or {}
    if d.get("sous_titre"):
        out += [f"*« {d['sous_titre']} »*", ""]
    paras = d.get("description_longue") or ([e["description_courte"]] if e.get("description_courte") else [])
    for p in paras:
        out += [p, ""]
    if d.get("academies"):
        out += ["**Académies :** " + d["academies"], ""]
    niveaux = d.get("niveaux") or {}
    for grade, label in (("apprenti", "Apprenti"), ("compagnon", "Compagnon"), ("maitre", "Maître")):
        n = niveaux.get(grade) or {}
        fluff, regles = (n.get("fluff") or "").strip(), (n.get("regles") or "").strip()
        court = ((e.get("avantages_courts") or {}).get(grade) or "").strip()
        if not (fluff or regles or court):
            continue
        out += [f"**{label}.**" + (f" *{fluff}*" if fluff else "")]
        if regles or court:
            out += [regles or court]
        out += [""]
    return out

def export_ecoles(fichier, titre, donnees):
    ecoles = sorted(donnees["ecoles"], key=lambda e: e["nom"].lower())
    out = entete(titre, f"{len(ecoles)} écoles")
    for e in ecoles:
        out += bloc_ecole(e)
    return ecrire(fichier, out)

ec = charger("ecoles.json")
ecc = charger("ecoles_combat.json")
print("Génération dans :", SORTIE)
fichiers.append(export_ecoles("06-ecoles-spadassin.md", "Écoles de Spadassin", ec))
fichiers.append(export_ecoles("07-ecoles-combat.md", "Écoles de combat", ecc))

# ---------------------------------------------------------------- Techniques
out = entete("Techniques de combat", f"{len(ec['techniques'])} techniques")
for k in sorted(ec["techniques"], key=str.lower):
    t = ec["techniques"][k]
    out += [f"## {t['nom']}", "", f"*{t.get('categorie') or 'Technique'}*", ""]
    if t.get("description"):
        out += [t["description"], ""]
    for tbl in t.get("tables") or []:
        for i, row in enumerate(tbl):
            out.append("| " + " | ".join(str(c) for c in row) + " |")
            if i == 0:
                out.append("|" + "---|" * len(row))
        out.append("")
    gr = t.get("ecoles_enseignant_groupees")
    if gr:
        out += ["**Écoles l'enseignant (par arme) :**"]
        for arme, lst in gr.items():
            out += [f"- {arme} : " + ", ".join(lst)]
        out += [""]
    elif t.get("ecoles_enseignant"):
        out += ["**Écoles l'enseignant :** " + ", ".join(t["ecoles_enseignant"]), ""]
fichiers.append(ecrire("08-techniques-combat.md", out))

# ---------------------------------------------------------------- Entraînements
ent = charger("entrainements.json")["entrainements"]
out = entete("Entraînements", f"{len(ent)} entraînements")
for e in sorted(ent, key=lambda x: x["nom"].lower()):
    out += [f"## {e['nom']}", ""]
    if e.get("categorie_creation"):
        out += [f"- **Création :** {e['categorie_creation']}"]
    out += ["- **Compétences de base :** " + (", ".join(e.get("competences_base") or []) or "aucune")]
    out += ["- **Compétences avancées :** " + (", ".join(e.get("competences_avancees") or []) or "aucune"), ""]
    if e.get("description"):
        out += [e["description"], ""]
fichiers.append(ecrire("05-entrainements.md", out))

# ---------------------------------------------------------------- Métiers
met = charger("metiers.json")["metiers"]
out = entete("Métiers", f"{len(met)} métiers")
for m in sorted(met, key=lambda x: x["nom"].lower()):
    out += [f"## {m['nom']}", ""]
    infos = []
    if m.get("categories"):
        infos.append("**Catégories :** " + ", ".join(m["categories"]))
    if m.get("reputation"):
        infos.append("**Réputation :** " + m["reputation"])
    r = m.get("restriction_creation")
    if r and r != "libre":
        infos.append("**Création :** " + (m.get("restriction_texte") or RESTRICTIONS.get(r, r)))
    if infos:
        out += ["- " + " · ".join(infos)]
    out += ["- **Compétences de base :** " + (", ".join(m.get("competences_base") or []) or "aucune")]
    out += ["- **Compétences avancées :** " + (", ".join(m.get("competences_avancees") or []) or "aucune"), ""]
    if m.get("description"):
        out += [m["description"], ""]
fichiers.append(ecrire("04-metiers.md", out))

# ---------------------------------------------------------------- Compétences
comps = charger("competences.json")["competences"]
par_cat = {}
for c in comps:
    par_cat.setdefault(c.get("categorie") or "Autres", []).append(c)
out = entete("Compétences", f"{len(comps)} compétences")
for cat in sorted(par_cat, key=str.lower):
    out += [f"## {cat}", ""]
    for c in sorted(par_cat[cat], key=lambda x: x["nom"].lower()):
        out += [f"### {c['nom']}", ""]
        if c.get("description"):
            out += [c["description"], ""]
        mb = c.get("donnent_acces_metiers_base") or []
        ma = c.get("donnent_acces_metiers_avancee") or []
        eb = c.get("donnent_acces_entrainements_base") or []
        ea = c.get("donnent_acces_entrainements_avancee") or []
        if mb or eb:
            out += ["- **De base dans :** " + ", ".join(mb + eb)]
        if ma or ea:
            out += ["- **Avancée dans :** " + ", ".join(ma + ea)]
        if mb or eb or ma or ea:
            out += [""]
fichiers.append(ecrire("03-competences.md", out))

# ---------------------------------------------------------------- Avantages
avs = charger("avantages.json")["avantages"]
par_cat = {}
for a in avs:
    par_cat.setdefault(a.get("categorie") or "Autres", []).append(a)
out = entete("Avantages", f"{len(avs)} avantages")
for cat in sorted(par_cat, key=str.lower):
    out += [f"## {cat}", ""]
    for a in sorted(par_cat[cat], key=lambda x: x["nom"].lower()):
        cout = a.get("cout_affiche") or (str(a.get("cout_raw") or "?") + " PP")
        out += [f"### {a['nom']} — {cout}", ""]
        if a.get("nation_lien") or a.get("type_lien"):
            lien = a.get("nation_lien") or a.get("type_lien")
            out += [f"- **Lié :** {lien}", ""]
        paras = a.get("description_v1") or ([a["description"]] if a.get("description") else [])
        for p in paras:
            out += [p, ""]
fichiers.append(ecrire("09-avantages.md", out))

# ---------------------------------------------------------------- Arcanes
arc = charger("arcanes.json")
out = entete("Arcanes (Étape 2 de la création)", f"{len(arc['arcanes'])} arcanes, avec vertus et travers")
if arc.get("intro_etape_2"):
    out += [arc["intro_etape_2"], ""]
out += ["| N° | Arcane | Vertu | Travers |", "|---|---|---|---|"]
for a in arc["arcanes"]:
    out += [f"| {a.get('numero', '')} | {a['nom']} | {a.get('vertu', '')} | {a.get('travers', '')} |"]
out += ["", "## Vertus", ""]
for v in arc["vertus"]:
    out += [f"### {v['nom']}", "", v.get("resume") or "", "", "**Activation :** " + (v.get("activation") or ""), ""]
out += ["## Travers", ""]
for v in arc["travers"]:
    out += [f"### {v['nom']}", "", v.get("resume") or "", "", "**Activation :** " + (v.get("activation") or ""), ""]
fichiers.append(ecrire("02-arcanes.md", out))

# ---------------------------------------------------------------- Création de personnage
cp = charger("creation_perso.json")
out = entete("Création de personnage — règles et nations", "traits, statistiques dérivées, nations, langues, âges")
if cp.get("intro"):
    out += [cp["intro"], ""]
out += ["## Étape 1 — Traits", ""]
if cp.get("etape_1_intro"):
    out += [cp["etape_1_intro"], ""]
for t in cp["traits_ordre"]:
    out += [f"**{t}** : {cp['traits_descriptions'].get(t, '')}", ""]
out += ["## Statistiques dérivées", ""]
for s in cp["statistiques_derivees"]:
    out += [f"**{s['nom']}** ({s.get('formule_label', '')}) : {s.get('description', '')}", ""]
out += ["## Nations (bonus de Trait à la création)", ""]
nations_par_cont = {}
for n in cp["nations"]:
    nations_par_cont.setdefault(n.get("continent") or "Autres", []).append(n)
ordre = cp.get("continents_ordre") or sorted(nations_par_cont)
for cont in ordre:
    if cont not in nations_par_cont:
        continue
    meta_c = (cp.get("continents_meta") or {}).get(cont) or {}
    eq = f" *(équivalent : {meta_c['equivalent']})*" if meta_c.get("equivalent") else ""
    out += [f"### {cont}{eq}", ""]
    for n in nations_par_cont[cont]:
        eq_n = f" *(équivalent : {n['equivalent_terrestre']})*" if n.get("equivalent_terrestre") else ""
        out += [f"#### {n['nom']}{eq_n}", ""]
        if n.get("bonus_traits"):
            out += ["- **Bonus de Trait au choix :** " + " ou ".join(n["bonus_traits"])]
        langue = (cp.get("langues_par_nation") or {}).get(n["nom"])
        if langue:
            out += [f"- **Langue :** {langue}"]
        out += [""]
        if n.get("description"):
            out += [n["description"], ""]
lu = cp.get("langue_universelle") or {}
if lu:
    out += [f"**Langue universelle — {lu.get('nom', '')} :** {lu.get('description', '')}", ""]
e3 = cp.get("etape_3") or {}
out += ["## Étape 3 — Points de Personnage", ""]
if e3.get("intro"):
    out += [e3["intro"], ""]
for a in e3.get("ages") or []:
    out += [f"- **{a.get('plage', '')} ({a.get('label', '')})** : {a.get('bonus', '')}"]
out += [""]
for cle in ("rappel_max_creation", "rappel_ecoles_specs"):
    if e3.get(cle):
        out += [e3[cle], ""]
specs = e3.get("specificites")
if isinstance(specs, list):
    for s in specs:
        if isinstance(s, dict):
            out += [f"**{s.get('nom', '')}** : {s.get('description', s.get('texte', ''))}", ""]
        else:
            out += [str(s), ""]
elif isinstance(specs, str):
    out += [specs, ""]
fichiers.append(ecrire("01-creation-personnage.md", out))

# ---------------------------------------------------------------- Sorcelleries
so = charger_js("sorcelleries.js", "window.SORCELLERIES_DATA = ")["sorcelleries"]
out = entete("Sorcelleries", ", ".join(s["nom"] for s in so))
for s in sorted(so, key=lambda x: x["nom"].lower()):
    out += [f"## {s['nom']} ({s.get('nation', '')})", ""]
    if s.get("accroche"):
        out += [f"*{s['accroche']}*", ""]
    # Modèle générique par sections (Lærdom)
    for sec in s.get("sections") or []:
        out += [f"### {sec.get('titre', '')}", ""]
        if sec.get("html"):
            out += [html_to_md(sec["html"]), ""]
        if sec.get("intro"):
            out += [sec["intro"], ""]
    for r in s.get("runes") or []:
        out += [f"### Rune {r.get('num', '')} — {r['nom']} (« {r.get('trad', '')} »)", ""]
        out += [f"- **Famille :** {r.get('famille', '')} · **ND :** {r.get('nd', '')}", ""]
        for p in r.get("paras") or []:
            out += [p, ""]
    # Modèle Pyeryem
    for p in s.get("description") or []:
        out += [p, ""]
    if s.get("heritage"):
        out += ["### Héritages", ""]
        for p in s["heritage"].get("paras") or []:
            out += [p, ""]
    for niv in s.get("niveaux") or []:
        out += [f"### {niv.get('titre', '')}", ""]
        for p in niv.get("paras") or []:
            out += [p, ""]
    if s.get("formes_intro"):
        out += ["### Les formes animales", "", s["formes_intro"], ""]
    for fam in s.get("familles") or []:
        out += [f"#### {fam['nom']}", ""]
        for f in fam.get("formes") or []:
            ligne = f"- **{f['nom']}**"
            if f.get("vo"):
                ligne += f" ({f['vo']})"
            if f.get("nd") is not None:
                ligne += f" — ND {f['nd']}"
            detail = " ; ".join(x for x in (f.get("capacites"), f.get("notes")) if x)
            if detail:
                ligne += f" : {detail}"
            out += [ligne]
        out += [""]
    if s.get("glossaire"):
        out += ["### Glossaire des capacités animales", ""]
        for g in s["glossaire"]:
            out += [f"- **{g['nom']}** : {g.get('texte', '')}"]
        out += [""]
    for p in s.get("notes") or []:
        out += [p, ""]
fichiers.append(ecrire("10-sorcelleries.md", out))

# ---------------------------------------------------------------- LISEZ-MOI
out = [
    "# Données de référence — 7ème Mer V1 (campagne de Guillaume)",
    "",
    f"*Généré le {AUJOURDHUI} depuis les données du site www.fenelion.fr/7mers par `export_projet_claude.py`.*",
    "",
    "Ce dossier contient, en Markdown lisible, tout le référentiel de jeu du site",
    "(ce qui entoure la création et la vie des personnages, hors personnages eux-mêmes).",
    "À déposer dans les **connaissances d'un Projet Claude** pour éviter de relire les PDF sources.",
    "",
    "| Fichier | Contenu |",
    "|---|---|",
    "| 01-creation-personnage.md | Règles de création : traits, statistiques dérivées, nations et bonus, langues, âges et PP |",
    "| 02-arcanes.md | Les 22 arcanes avec vertus et travers (résumé + activation) |",
    "| 03-competences.md | Les 270 compétences par catégorie, avec les métiers/entraînements qui y donnent accès |",
    "| 04-metiers.md | Les 105 métiers : description, compétences de base et avancées, réputation |",
    "| 05-entrainements.md | Les 32 entraînements : description, compétences de base et avancées |",
    "| 06-ecoles-spadassin.md | Les 101 écoles de Spadassin : description, grades (Apprenti/Compagnon/Maître), techniques |",
    "| 07-ecoles-combat.md | Les 66 écoles de combat (même format) — contient l'école classifiée Quinn (réservée MJ) |",
    "| 08-techniques-combat.md | Les 79 techniques de combat, avec les écoles qui les enseignent |",
    "| 09-avantages.md | Les 175 avantages par catégorie, avec coût en PP |",
    "| 10-sorcelleries.md | Lærdom (25 runes) et Pyeryem (formes animales, glossaire) |",
    "",
    "## Mise à jour",
    "",
    "Après toute modification des données du site, relancer depuis le dossier du site :",
    "",
    "```",
    "python export_projet_claude.py",
    "```",
    "",
    "puis remplacer dans le Projet Claude les fichiers qui ont changé.",
]
fichiers.append(ecrire("00-LISEZ-MOI.md", out))

print(f"\n{len(fichiers)} fichiers générés dans : {SORTIE}")
