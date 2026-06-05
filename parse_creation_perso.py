"""Parse 'Livret Création Perso 1.pdf' → creation_perso.json + .js.

Contenu extrait :
- Intro (page 2) : texte 'Conception d'un Héros'
- Étape 1 traits (page 46) : descriptions des 5 Traits
- Liste des Nations (page 3) : nom + bonus traits + équivalent terrestre
- Descriptions de chaque Nation (pages 5-42)

Corrections automatiques (typos du PDF source) :
- 'Astuce'     → 'Esprit'
- 'Résolution' → 'Détermination'
"""

import json
import re
from pathlib import Path

import fitz  # type: ignore

PDF = Path(
    r"D:\Utilisateur\Guillaume\Bureau\JDR Papier\7ème Mer"
    r"\Livret création perso\Livret Création Perso 1.pdf"
)
DEST_DIR = Path(__file__).parent
DEST_JSON = DEST_DIR / "creation_perso.json"
DEST_JS = DEST_DIR / "creation_perso.js"


# ============================================================
# Table des Nations (corrigée : Astuce→Esprit, Résolution→Détermination)
# Format : (nom, continent, [bonus_traits], équivalent terrestre, page_pdf)
# Pages 1-indexed (comme dans le PDF). None = description non trouvée
# dans ce PDF (à compléter manuellement plus tard).
# ============================================================
CONTINENTS_ORDER = [
    "Trois Royaumes",
    "Europe",
    "Nations Pirates",
    "Ifri",
    "Empire du Croissant",
    "Cathay",
]

NATIONS = [
    # Trois Royaumes
    ("Avalon",                "Trois Royaumes",      ["Panache", "Détermination"], "Angleterre",                      5),
    ("Inismore",              "Trois Royaumes",      ["Panache", "Esprit"],        "Irlande",                          6),
    ("Marches des Highlands", "Trois Royaumes",      ["Gaillardise", "Finesse"],   "Écosse",                           7),
    # Europe (Théah)
    ("Castille",              "Europe",              ["Finesse", "Esprit"],        "Espagne",                          8),
    ("Eisen",                 "Europe",              ["Gaillardise", "Détermination"], "Empire germanique",            10),
    ("Montaigne",             "Europe",              ["Finesse", "Panache"],       "France (Pré-Révolution)",          11),
    ("Sarmatie",              "Europe",              ["Gaillardise", "Panache"],   "Tchéquie / Prussie / Ex-Bohème",   13),
    ("Ussura",                "Europe",              ["Détermination", "Esprit"],  "Russie",                           15),
    ("Khazaris",              "Europe",              ["Gaillardise", "Finesse"],   "Huns",                             40),  # partage description avec Khazari (Cathay)
    ("Tamatama",              "Europe",              ["Esprit", "Panache"],        "Tziganes",                         None),
    ("Vestenmannavnjar",      "Europe",              ["Gaillardise", "Esprit"],    "Scandinavie + Hollande",           16),
    ("Vodacce",               "Europe",              ["Finesse", "Détermination"], "Italie",                           18),
    # Nations Pirates
    ("Aragosta",              "Nations Pirates",     ["Panache", "Finesse"],       "Bahamas",                          34),
    ("Jaragua",               "Nations Pirates",     ["Gaillardise", "Finesse"],   "Haïti",                            35),
    ("La Bucca",              "Nations Pirates",     ["Panache", "Esprit"],        "Les Açores",                       33),
    ("Numa",                  "Nations Pirates",     ["Détermination", "Esprit"],  "Grèce (en archipel)",              32),
    ("Rahuri",                "Nations Pirates",     ["Gaillardise", "Détermination"], "Caraïbes indigènes",           35),  # partage description avec Jaragua
    # Cathay
    ("Agnivarsie",            "Cathay",              ["Esprit", "Panache"],        "Inde Mongole (Perse)",             37),
    ("Fuso",                  "Cathay",              ["Gaillardise", "Détermination"], "Japon",                        38),
    ("Han",                   "Cathay",              ["Détermination", "Panache"], "Corée",                            39),
    ("Khazari",               "Cathay",              ["Gaillardise", "Finesse"],   "Mongolie",                         40),
    ("Nagaja",                "Cathay",              ["Finesse", "Esprit"],        "Thaïlande / Asie du Sud-Est",      41),
    ("Shenzhou",              "Cathay",              ["Gaillardise", "Détermination"], "Chine",                        42),
    # Ifri
    ("Empire Aksoumite",      "Ifri",                ["Esprit", "Panache"],        "Empire Éthiopien",                 23),
    ("Khémet",                "Ifri",                ["Détermination", "Esprit"],  "Égypte Antique",                   24),
    ("Maghreb",               "Ifri",                ["Finesse", "Détermination"], "Maghreb (Califat Hafside)",        22),
    ("Kurufaba mandéniane",   "Ifri",                ["Gaillardise", "Détermination"], "Empires du Mali / Songhaï",    20),
    ("Royaume de Mbey",       "Ifri",                ["Finesse", "Panache"],       "Empire du Djolof",                 21),
    # Empire du Croissant
    ("Anatol Ayh",            "Empire du Croissant", ["Esprit", "Panache"],        "Turquie Ottomane",                 26),
    ("Ashur",                 "Empire du Croissant", ["Esprit", "Finesse"],        "Syrie Ottomane",                   27),
    ("Persis",                "Empire du Croissant", ["Panache", "Détermination"], "Séfévide (Iran)",                  28),
    ("Sarmion",               "Empire du Croissant", ["Gaillardise", "Finesse"],   "Israël (Ashkénazes)",              29),
    ("Huitième Mer",          "Empire du Croissant", ["Gaillardise", "Détermination"], "Péninsule Arabique (tribus)",  30),
]


# Description multi-page : certaines nations courent sur plusieurs pages.
# Ici, on indique pour chaque nation la (les) page(s) de continuation.
NATIONS_CONTINUATION_PAGES = {
    "Castille":         [9],
    "Eisen":            [],
    "Montaigne":        [12],            # page 13/14 = Sarmatie (cf. ci-dessous)
    "Sarmatie":         [14],            # quote en encart sur p.14
    "Vestenmannavnjar": [17],
    "Khémet":           [25],
}


# Corrections systématiques du PDF source (typos à remplacer dans tous les textes)
TYPO_CORRECTIONS = {
    "Astuce":     "Esprit",
    "astuce":     "esprit",
    "Résolution": "Détermination",
    "résolution": "détermination",
}

# Le bloc d'intro 'Un Héros commence avec un score…' est collé à tort à la
# description du Trait Panache dans le PDF — on le retire de Panache (voir
# extraire_traits) et on le place dans etape_1_intro (texte ci-dessous,
# reformulé par Guillaume).
ETAPE_1_INTRO = (
    "Un Héros commence avec un score de 2 dans toutes ses Caractéristiques.\n"
    "Vous disposez en plus de 1 points à distribuer dans la Caractéristique "
    "de votre choix.\n"
    "Vous pouvez réduire un de vos Traits à 1 pour en augmenter une autre à 3. "
    "Soyez prévenus qu’en faisant ainsi, le Trait en question sera généralement "
    "un handicap (un seul dès gardé), et l’augmenter plus tard de 1 à 2 aura le "
    "même coût que l’augmenter de 2 à 3.\n"
    "\n"
    "Ajoutez ensuite le Bonus de Nation en choisissant une Nation, qui consiste "
    "à Augmenter un Trait parmi deux proposés.\n"
    "\n"
    "Aucun trait ne peut dépasser 4 à la création, et le maximum « normal » "
    "pendant l’aventure est à 5. Pendant l’aventure et via l’XP, la somme des "
    "traits ne peut dépasser 20 (ceux qui sont à 6 ou 7 grâce à un Avantage ou "
    "autre seront considérées comme étant à 5 dans le calcul)."
)

# Marqueur de troncature dans la description Panache du PDF.
PANACHE_TRUNCATE_AFTER = "le nombre d’actions que le héros pourra entreprendre durant un tour."


def corriger_typos(text: str) -> str:
    for old, new in TYPO_CORRECTIONS.items():
        text = text.replace(old, new)
    return text


def nettoyer_text(text: str) -> str:
    """Retire le caractère décoratif 'ç' en tête de page + normalise les espaces."""
    # Header de page parasite '7E MER LIVRE DE BASE NNN'
    text = re.sub(r"^7E\s*MER\s+LIVRE\s+DE\s+BASE\s+\d+\s*\n", "", text,
                  flags=re.MULTILINE | re.IGNORECASE)
    # Remplace les puces décoratives en début de paragraphe
    text = re.sub(r"^ç\s*", "", text, flags=re.MULTILINE)
    # Tirets cadratins/conditionnels du PDF
    text = text.replace("­\n", "")  # tiret conditionnel + saut de ligne = mot continu
    text = text.replace("­", "")
    # Espaces multiples
    text = re.sub(r"[ \t]+", " ", text)
    # Lignes vides multiples → une seule
    text = re.sub(r"\n\s*\n\s*\n+", "\n\n", text)
    return text.strip()


def extraire_intro(doc) -> str:
    """Page 2 : intro 'Conception d'un Héros'."""
    text = doc[1].get_text("text")
    return corriger_typos(nettoyer_text(text))


TRAITS_NOMS = ("Gaillardise", "Finesse", "Détermination", "Esprit", "Panache")


def extraire_traits(doc) -> dict:
    """Page 46 : descriptions des 5 Traits (puces '• Trait est …')."""
    text = doc[45].get_text("text")
    text = corriger_typos(text)
    traits = {}
    # Découpe sur chaque puce '•' suivie d'un bloc
    for m in re.finditer(r"•\s*\n([^•]+?)(?=•|Étape\s+1\.2|\Z)", text, re.DOTALL):
        body = m.group(1).strip()
        if not body:
            continue
        # Le 1er mot peut être 'Le' (cas 'Le Panache') ; sinon directement le nom du trait
        first = body.split(None, 1)
        if not first:
            continue
        if first[0] == "Le" and len(first) > 1:
            rest = first[1].split(None, 1)
            if not rest:
                continue
            nom_trait = rest[0]
            desc = rest[1] if len(rest) > 1 else ""
        else:
            nom_trait = first[0]
            desc = first[1] if len(first) > 1 else ""
        if nom_trait not in TRAITS_NOMS:
            continue
        # Strip 'est ' / 'sont ' initial + nettoyage
        desc = re.sub(r"^(?:est|sont)\s+", "", desc).strip()
        desc = re.sub(r"\s+", " ", desc)
        # Pour Panache : tronquer le bloc 'Un Héros commence avec…' qui
        # a été collé à tort par le PDF (sert d'intro d'étape, pas de description).
        if nom_trait == "Panache":
            idx = desc.find(PANACHE_TRUNCATE_AFTER)
            if idx >= 0:
                desc = desc[: idx + len(PANACHE_TRUNCATE_AFTER)].strip()
        traits[nom_trait] = desc
    return traits


# Sous-titres récurrents du PDF (listés dans toutes les nations).
SOUS_TITRES_CONNUS = {
    "Apparence", "Religion", "Religions", "Professions typiques", "Sorcellerie",
    "Politique", "Nourriture et boisson", "Vêtements", "Note du MJ", "Histoire",
    "Géographie", "Société", "Régime politique", "Culture", "Langue", "Linguistique",
    "Cuisine", "Loisirs", "Tenue vestimentaire", "Population", "Étiquette",
    "Le Royaume", "Le Pays", "Architecture", "Coutumes",
}


def _est_titre_section(text: str) -> bool:
    """Détecte un sous-titre : présent dans la liste blanche OU heuristique
    (court, pas de point final)."""
    t = text.strip()
    if t in SOUS_TITRES_CONNUS:
        return True
    if len(t) < 35 and not t.endswith(".") and "\n" not in t and " " not in t.lstrip():
        # Mot unique court (ex: Apparence) → titre probable
        return True
    return False


def _est_titre_nation(text: str, nation_nom: str) -> bool:
    """Vrai si le texte ne contient QUE le titre de la nation (et rien d'autre).
    Ex: 'L'Avalon' avant le 1er paragraphe."""
    t = text.strip().lower()
    n = nation_nom.lower()
    # 'l'avalon', 'avalon', 'le shenzhou', 'la castille', 'la fédération sarmatienne', etc.
    prefixes = ("l'", "le ", "la ", "les ", "l’")
    for p in prefixes:
        if t == p + n: return True
    if t == n: return True
    # Cas 'la fédération sarmatienne' qui contient 'sarmatie'
    if "fédération" in t and "sarmatie" in n: return True
    return False


def _nettoyer_bloc(text: str) -> str:
    """Joint les lignes wrappées du PDF en un paragraphe propre."""
    # Retire les sauts de ligne internes (wrap visuel du PDF) : on garde une
    # seule ligne propre. Les tirets conditionnels et 'ç' sont déjà retirés
    # par nettoyer_text en amont.
    out = re.sub(r"\s*\n\s*", " ", text)
    out = re.sub(r"[ \t]+", " ", out)
    return out.strip()


def extraire_description_nation(doc, nation_nom: str, page_num: int,
                                continuation_pages: list[int]) -> str:
    """Extrait la description d'une nation à partir d'une page principale +
    pages de continuation, en utilisant get_text('blocks') pour préserver les
    vrais paragraphes. Sous-titres préfixés par '### ' (rendu en h4 côté UI).
    """
    if page_num is None:
        return ""
    pages = [page_num] + (continuation_pages or [])
    blocs_collectes: list[str] = []
    for p in pages:
        if not (1 <= p <= doc.page_count):
            continue
        for b in doc[p - 1].get_text("blocks"):
            # b = (x0, y0, x1, y1, text, block_no, block_type)
            raw = b[4]
            if not raw or not raw.strip():
                continue
            # Filtre le header 'ç' (caractère décoratif seul)
            stripped = raw.strip()
            if stripped == "ç" or stripped == "":
                continue
            # Filtre header de page '7E MER LIVRE DE BASE NNN' (avec ou sans 'ç' qui suit)
            if re.match(r"^7E\s*MER\s+LIVRE\s+DE\s+BASE\s+\d+(\s*ç)?\s*$",
                        stripped, re.I | re.MULTILINE):
                continue
            # Filtre 'V', 'A', autres caractères décoratifs solitaires en début
            if len(stripped) <= 2 and not stripped.isalnum():
                continue
            blocs_collectes.append(raw)

    # Reformatage : on traite chaque bloc, possiblement en l'éclatant si la
    # 1ère ligne est un sous-titre collé au paragraphe qui suit.
    paragraphes: list[str] = []
    for raw in blocs_collectes:
        first_nl = raw.find("\n")
        if first_nl > 0:
            tete = raw[:first_nl].strip()
            queue = raw[first_nl+1:]
            # Cas 1 : titre de la nation en tête de bloc → on le retire
            if _est_titre_nation(tete, nation_nom):
                raw = queue
            # Cas 2 : sous-titre connu en tête de bloc → on le sépare en h4
            elif tete in SOUS_TITRES_CONNUS or _est_titre_section(tete):
                paragraphes.append("### " + tete)
                raw = queue
        # Si le bloc tout entier est un sous-titre (cas où il a son propre bloc)
        raw_oneline = _nettoyer_bloc(raw)
        if not raw_oneline:
            continue
        if _est_titre_section(raw_oneline):
            paragraphes.append("### " + raw_oneline)
        else:
            paragraphes.append(raw_oneline)

    full = "\n\n".join(paragraphes)
    full = corriger_typos(full)
    return full


def main() -> None:
    print(f"Lecture {PDF.name}…")
    doc = fitz.open(str(PDF))
    print(f"  {doc.page_count} pages")

    intro = extraire_intro(doc)
    print(f"  Intro : {len(intro)} chars")

    traits = extraire_traits(doc)
    print(f"  Traits : {len(traits)} extraits → {list(traits.keys())}")

    nations = []
    nb_with_desc = 0
    for nom, continent, bonus, equivalent, page in NATIONS:
        desc = extraire_description_nation(
            doc, nom, page,
            NATIONS_CONTINUATION_PAGES.get(nom, []),
        )
        if desc:
            nb_with_desc += 1
        nations.append({
            "nom": nom,
            "continent": continent,
            "bonus_traits": bonus,
            "equivalent_terrestre": equivalent,
            "description": desc,
            "page_pdf": page,
        })
    print(f"  Nations : {len(nations)} ({nb_with_desc} avec description, "
          f"{len(nations)-nb_with_desc} à compléter)")

    data = {
        "_meta": {
            "source": PDF.name,
            "corrections_typos": TYPO_CORRECTIONS,
        },
        "intro": intro,
        "etape_1_intro": ETAPE_1_INTRO,
        "traits_ordre": ["Gaillardise", "Finesse", "Détermination", "Esprit", "Panache"],
        "traits_descriptions": traits,
        "continents_ordre": CONTINENTS_ORDER,
        "nations": nations,
    }

    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    DEST_JSON.write_text(json_text, encoding="utf-8")
    DEST_JS.write_text(
        f"// Généré par parse_creation_perso.py — ne pas éditer à la main\n"
        f"window.CREATION_PERSO_DATA = {json_text};\n",
        encoding="utf-8",
    )
    print(f"\nOK -> {DEST_JSON}")
    print(f"OK -> {DEST_JS}")


if __name__ == "__main__":
    main()
