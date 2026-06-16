#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Post-processeur : applique les corrections V2 des écoles de Spadassin
depuis le docx 'Ecoles_spadassin_V2_claudé.docx' sur ecoles.json + ecoles.js.

À RELANCER après csv_to_json.py (qui régénère ecoles.json depuis les CSV),
ou seul quand on a corrigé le docx. Charge ecoles.json, met à jour les
écoles présentes dans le docx (rendu enrichi), ajoute les nouvelles, puis
réécrit ecoles.json ET ecoles.js.

Règle des Nations (demande de Guillaume) :
  - Origine en Ifri / Cathay / Nations Pirates / Empire du Croissant
    → apprenable dans TOUT le continent : nations = [continent].
  - Sinon → nation précise (Montaigne, Vodacce, Vesten, Ussura, Castille,
    Sarmatie…).
"""

import json
import re
import unicodedata
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).parent
DOCX = Path(r"D:/Utilisateur/Guillaume/Bureau/JDR Papier/7ème Mer"
           r"/Ecoles combat & co/Ecoles_spadassin_V2_claudé.docx")
ECOLES_JSON = ROOT / "ecoles.json"
ECOLES_JS = ROOT / "ecoles.js"

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


# ---------- Extraction docx ----------
def extraire_paragraphes(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        xml = z.read("word/document.xml")
    root = ET.fromstring(xml)
    out = []
    for p in root.iter(W + "p"):
        parts = []
        for t in p.iter(W + "t"):
            parts.append(t.text or "")
        out.append("".join(parts))
    return out


# ---------- Helpers ----------
def _ap(s):
    """Normalise les apostrophes typographiques."""
    return (s or "").replace("’", "'").replace("‘", "'")


def _norm(s):
    s = unicodedata.normalize("NFKD", _ap(s))
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    return re.sub(r"\s+", " ", s).strip()


def _ref(nom_base):
    """Clé de référence d'une technique (minuscule, sans accent)."""
    s = unicodedata.normalize("NFKD", _ap(nom_base))
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    s = s.replace("-", " ")
    return re.sub(r"\s+", " ", s).strip()


# Marqueurs de champ (préfixes, comparaison souple sur apostrophe)
def _champ(ligne, prefixes):
    l = _ap(ligne).strip()
    for pref in prefixes:
        if l.lower().startswith(pref.lower()):
            return l[len(pref):].strip(" .:")
    return None


# ---------- Parsing d'une école ----------
NIVEAU_DECLENCHEURS = (
    "l'apprenti", "le compagnon", "le maitre", "le maître", "lorsqu", "lors d",
    "tant qu", "une fois", "apres", "après", "maniant", "quand", "du haut",
    "tirant", "il ", "vous ", "chaque", "votre", "au debut", "au début", "ce ",
)


def _split_niveau(texte):
    """Sépare un éventuel nom de manœuvre (fluff) de l'effet (regles).
    Heuristique prudente : si la 1ʳᵉ phrase est courte (≤ 5 mots, ≤ 45 car.)
    et ne ressemble pas à une phrase d'effet → c'est un nom de manœuvre."""
    texte = texte.strip()
    m = re.match(r"^([^.]{1,45}?)\.\s+([A-ZÀ-Ü].*)$", texte, re.DOTALL)
    if m:
        titre = m.group(1).strip()
        reste = m.group(2).strip()
        nb_mots = len(titre.split())
        debut = _norm(titre)
        if nb_mots <= 6 and not any(debut.startswith(d) for d in
                                    (_norm(x) for x in NIVEAU_DECLENCHEURS)):
            return titre, reste
    return None, texte


def parse_ecoles(paras):
    ecoles = []
    cur = None
    section = None  # 'desc' | 'tech' | 'niveaux'
    n = len(paras)
    i = 0
    while i < n:
        raw = paras[i]
        ligne = _ap(raw).strip()
        i += 1
        if not ligne:
            continue

        m = re.match(r"^(\d+)\.\s+(.+)$", ligne)
        if m and not _norm(ligne).startswith("toutes les"):
            # Nouvelle école
            if cur:
                ecoles.append(cur)
            cur = {
                "nom": m.group(2).strip(),
                "origine": "", "description": [], "academies": "",
                "homologation": "", "armes": "", "specialisations": [],
                "techniques": [], "niveaux": {}, "rangs_requis": "",
            }
            section = "desc_wait"
            continue
        if cur is None:
            continue

        v = _champ(ligne, ["Origine"])
        if v is not None and section in ("desc_wait", "desc"):
            cur["origine"] = v
            continue
        if _norm(ligne) == "description":
            section = "desc"
            continue
        v = _champ(ligne, ["Académies et lieux d'apprentissage", "Academies et lieux"])
        if v is not None:
            cur["academies"] = v
            section = None
            continue
        v = _champ(ligne, ["Homologation"])
        if v is not None:
            cur["homologation"] = v
            continue
        v = _champ(ligne, ["Armes de prédilection", "Armes de predilection"])
        if v is not None:
            cur["armes"] = v
            continue
        v = _champ(ligne, ["Spécialisations", "Specialisations"])
        if v is not None:
            cur["specialisations"] = [s.strip() for s in re.split(r"[·•]", v) if s.strip()]
            continue
        if _norm(ligne) == "techniques de combat":
            section = "tech"
            continue
        if _norm(ligne).startswith("toutes les techniques de combat"):
            cur["techniques_toutes_avancees"] = True
            continue
        if _norm(ligne) == "niveaux de maitrise":
            section = "niveaux"
            continue
        v = _champ(ligne, ["Rangs requis"])
        if v is not None:
            cur["rangs_requis"] = v
            continue
        for label, key in (("Apprenti", "apprenti"), ("Compagnon", "compagnon"),
                           ("Maître", "maitre"), ("Maitre", "maitre")):
            v = _champ(ligne, [label])
            if v is not None:
                cur["niveaux"][key] = v
                break
        else:
            # Contenu de section courante
            if section == "desc":
                cur["description"].append(ligne)
            elif section == "tech":
                cur["techniques"].append(ligne)
            continue
    if cur:
        ecoles.append(cur)
    return ecoles


# ---------- Mapping Nations ----------
CONTINENTS_TOUS = {
    "ifri": "Ifri",
    "cathay": "Cathay",
    "nations pirates": "Nations Pirates",
    "empire du croissant": "Empire du Croissant",
}
# Nations Theah / Trois Royaumes (origine précise)
NATIONS_PRECISES = {
    "montaigne": "Montaigne",
    "vodacce": "Vodacce",
    "vesten": "Vesten",
    "ussura": "Ussura",
    "castille": "Castille",
    "fédération sarmatienne": "Sarmatie",
    "federation sarmatienne": "Sarmatie",
    "sarmatie": "Sarmatie",
    "rzeczpospolita": "Sarmatie",
    "avalon": "Avalon",
    "inismore": "Inismore",
    "eisen": "Eisen",
}


def origine_to_nations(origine):
    o = _norm(origine)

    def present(key):
        # Limite de mot pour éviter 'ifri' dans 'ifriennes'
        return re.search(r"\b" + re.escape(key) + r"\b", o) is not None

    # Cas particulier : une école « établie/implantée dans » un lieu prime
    # sur de simples « racines » historiques (ex. Bugu Takobi : racines
    # ifriennes mais établie dans les Nations Pirates).
    m = re.search(r"(?:etablie?|implantee?|installee?|basee?)\s+(?:dans|en|au[x]?)\s+(.+)$", o)
    zone_prioritaire = m.group(1) if m else None

    def chercher(zone):
        for key, cont in CONTINENTS_TOUS.items():
            if re.search(r"\b" + re.escape(key) + r"\b", zone):
                return [cont]
        for key, nat in NATIONS_PRECISES.items():
            if re.search(r"\b" + re.escape(key) + r"\b", zone):
                return [nat]
        return None

    if zone_prioritaire:
        r = chercher(zone_prioritaire)
        if r:
            return r
    # Sinon : analyse de toute la chaîne d'origine
    for key, cont in CONTINENTS_TOUS.items():
        if present(key):
            return [cont]
    for key, nat in NATIONS_PRECISES.items():
        if present(key):
            return [nat]
    # Repli : texte brut (à corriger à la main si besoin)
    return [origine.strip()]


# ---------- Techniques ----------
def parse_technique(ligne):
    ligne = ligne.strip()
    m = re.match(r"^(.*?)\s*\((.+)\)\s*$", ligne)
    if m:
        nom_base = m.group(1).strip()
        variante = m.group(2).strip()
    else:
        nom_base = ligne
        variante = None
    return {"nom_base": nom_base, "variante": variante,
            "ref": _ref(nom_base), "source": "docx_v2"}


# ---------- Spécialisations : nettoyage léger ----------
def nettoyer_specialisations(specs):
    out = []
    for s in specs:
        s = _ap(s).strip()
        s = re.sub(r"\s*\((entra[iî]nement)\)\s*$", "", s, flags=re.IGNORECASE)
        s = re.sub(r"^M[ée]tier\s+", "", s)
        # Normalise quelques pluriels d'armes vers la forme entraînement
        repl = {"Couteaux": "Couteau", "Bâtons": "Bâton", "Gants de Combat": "Gant de combat"}
        s = repl.get(s, s)
        out.append(s.strip())
    return out


# ---------- armes_categories (best-effort, pour nouvelles écoles) ----------
def deduire_armes_categories(specs, meta_categories):
    """Mappe les spécialisations d'armes vers les catégories canoniques."""
    mapping = [
        (r"escrime \(sabre\)|sabre", "Escrime (Sabre)"),
        (r"escrime \(rapi", "Escrime (Rapière)"),
        (r"escrime \(ép|escrime \(ep|\bép[ée]e\b", "Escrime (Épée)"),
        (r"b[âa]ton", "Bâtons"),
        (r"couteau", "Couteau"),
        (r"lance", "Lances"),
        (r"pugilat", "Pugilat"),
        (r"gant", "Gant de combat"),
        (r"bouclier", "Boucliers"),
        (r"hache", "Haches"),
        (r"2 mains|deux mains", "Épées à 2 mains"),
    ]
    cats = []
    blob = _norm(" · ".join(specs))
    for pat, cat in mapping:
        if re.search(pat, blob) and cat in meta_categories and cat not in cats:
            cats.append(cat)
    if not cats:
        cats = ["Atypique / Accessoire"]
    return cats


# ---------- Construction du patch ----------
def construire_details(e):
    d = {
        "description_longue": list(e["description"]),
        "origine_texte": e["origine"],
        "armes_predilection": e["armes"],
        "academies": e["academies"],
        "homologation": e["homologation"],
        "rangs_requis": e["rangs_requis"],
        "techniques_toutes_avancees": e.get("techniques_toutes_avancees", False),
        "niveaux": {},
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)",
    }
    for key in ("apprenti", "compagnon", "maitre"):
        if key in e["niveaux"]:
            fluff, regles = _split_niveau(e["niveaux"][key])
            d["niveaux"][key] = {"fluff": fluff, "regles": regles}
    return d


# Écoles du docx qui correspondent à une école déjà présente sous un nom
# différent : on fusionne (mise à jour) au lieu de créer un doublon, et on
# renomme l'école au nom du docx (le docx fait foi).
#   nom docx (normalisé) -> nom existant dans ecoles.json
ALIAS_NOMS_EXISTANTS = {
    "la siqueira": "Siqueira",
}


def appliquer(data, ecoles_docx):
    par_nom = {x["nom"]: x for x in data["ecoles"]}
    par_nom_norm = {_norm(k): v for k, v in par_nom.items()}
    maj, crees = [], []

    for e in ecoles_docx:
        nations = origine_to_nations(e["origine"])
        specs = nettoyer_specialisations(e["specialisations"])
        techniques = [parse_technique(t) for t in e["techniques"]]
        details = construire_details(e)
        desc_courte = (e["description"][0].split(". ")[0] + "."
                       if e["description"] else "")

        cible = par_nom.get(e["nom"]) or par_nom_norm.get(_norm(e["nom"]))
        # Fusion par alias (ex. 'La Siqueira' du docx = 'Siqueira' existante)
        if not cible and _norm(e["nom"]) in ALIAS_NOMS_EXISTANTS:
            cible = par_nom.get(ALIAS_NOMS_EXISTANTS[_norm(e["nom"])])
        if cible:
            cible["nom"] = e["nom"]   # renomme au nom du docx
            cible["nations"] = nations
            cible["specialisations"] = specs
            cible["techniques_combat"] = techniques
            cible["enrichie"] = True
            # Fusionne details en préservant d'éventuelles clés existantes utiles
            old = cible.get("details") or {}
            for k in ("doyen", "insigne", "appartenance_requise"):
                if k in old and k not in details:
                    details[k] = old[k]
            cible["details"] = details
            if not cible.get("description_courte"):
                cible["description_courte"] = desc_courte
            maj.append(e["nom"])
        else:
            arme_courte = e["armes"].split(";")[0].split("(")[0].split(",")[0].strip()
            data["ecoles"].append({
                "nom": e["nom"],
                "origine": "seconde_edition_adaptee",
                "nations": nations,
                "arme": arme_courte,
                "arme_display": arme_courte,
                "armes_categories": deduire_armes_categories(
                    specs, data.get("_meta", {}).get("armes_categories", [])),
                "specialisations": specs,
                "description_courte": desc_courte,
                "techniques_combat": techniques,
                "avantages_courts": {},
                "restriction_creation": "libre",
                "genre_restriction": None,
                "details": details,
                "enrichie": True,
            })
            crees.append(e["nom"])
    return maj, crees


def main():
    if not DOCX.exists():
        print(f"[X] docx introuvable : {DOCX}")
        return
    paras = extraire_paragraphes(DOCX)
    ecoles_docx = parse_ecoles(paras)
    print(f"Écoles parsées dans le docx : {len(ecoles_docx)}")

    data = json.loads(ECOLES_JSON.read_text(encoding="utf-8"))
    maj, crees = appliquer(data, ecoles_docx)

    # Méta
    data.setdefault("_meta", {})["nb_ecoles"] = len(data["ecoles"])

    print(f"  Mises à jour ({len(maj)}) : {', '.join(maj)}")
    print(f"  Créées ({len(crees)}) : {', '.join(crees) or '—'}")

    # Vérifs Nations
    print("\n  Nations attribuées :")
    for e in ecoles_docx:
        print(f"    {e['nom']:<16} ← {e['origine'][:45]:<45} → {origine_to_nations(e['origine'])}")

    ECOLES_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2),
                           encoding="utf-8")
    header = "// Généré par csv_to_json.py — ne pas éditer à la main\n"
    ECOLES_JS.write_text(header + "window.ECOLES_DATA = "
                         + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
                         encoding="utf-8")
    print("\n[ok] ecoles.json / ecoles.js régénérés")


if __name__ == "__main__":
    main()
