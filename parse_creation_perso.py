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
    "Theah",
    "Nations Pirates",
    "Ifri",
    "Empire du Croissant",
    "Cathay",
]

# Métadonnées par continent : équivalent terrestre + appartenance + clé de couleur
# (Trois Royaumes appartient à Theah géographiquement).
CONTINENTS_META = {
    "Trois Royaumes":      {"equivalent": "Royaume-Uni",                                  "parent": "Theah", "couleur": "trois-royaumes"},
    "Theah":               {"equivalent": "Europe",                                        "parent": None,    "couleur": "theah"},
    "Nations Pirates":     {"equivalent": "Caraïbes, Méditerranée, Canaries (archipels)", "parent": None,    "couleur": "pirates"},
    "Ifri":                {"equivalent": "Afrique",                                       "parent": None,    "couleur": "ifri"},
    "Empire du Croissant": {"equivalent": "Moyen-Orient",                                  "parent": None,    "couleur": "croissant"},
    "Cathay":              {"equivalent": "Asie de l'Est (Chine, Japon, Mongolie…)",       "parent": None,    "couleur": "cathay"},
}

NATIONS = [
    # Trois Royaumes
    ("Avalon",                "Trois Royaumes",      ["Panache", "Détermination"], "Angleterre",                      5),
    ("Inismore",              "Trois Royaumes",      ["Panache", "Esprit"],        "Irlande",                          6),
    ("Marches des Highlands", "Trois Royaumes",      ["Gaillardise", "Finesse"],   "Écosse",                           7),
    # Europe (Théah)
    ("Castille",              "Theah",               ["Finesse", "Esprit"],        "Espagne",                          8),
    ("Eisen",                 "Theah",               ["Gaillardise", "Détermination"], "Empire germanique",            10),
    ("Montaigne",             "Theah",               ["Finesse", "Panache"],       "France (Pré-Révolution)",          11),
    ("Sarmatie",              "Theah",               ["Gaillardise", "Panache"],   "Tchéquie / Prussie / Ex-Bohème",   13),
    ("Ussura",                "Theah",               ["Détermination", "Esprit"],  "Russie",                           15),
    ("Khazaris",              "Theah",               ["Gaillardise", "Finesse"],   "Huns",                             40),  # partage description avec Khazari (Cathay)
    ("Tamatama",              "Theah",               ["Esprit", "Panache"],        "Tziganes",                         None),
    ("Vestenmannavnjar",      "Theah",               ["Gaillardise", "Esprit"],    "Scandinavie + Hollande",           16),
    ("Vodacce",               "Theah",               ["Finesse", "Détermination"], "Italie",                           18),
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

# Corrections regex : le PDF a un caractère 'T' (ligature décorative ?) qui se
# perd à l'extraction, laissant 'éan/éans/éah' au lieu de 'Théan/Théans/Théah'.
TYPO_REGEX_CORRECTIONS: list[tuple[str, str]] = [
    (r"(?<![a-zA-ZÀ-ÿ])éans\b", "Théans"),
    (r"(?<![a-zA-ZÀ-ÿ])éan\b",  "Théan"),
    (r"(?<![a-zA-ZÀ-ÿ])éah\b",  "Théah"),
]
_TYPO_REGEX_COMPILED = [(re.compile(p), r) for p, r in TYPO_REGEX_CORRECTIONS]

# Le bloc d'intro 'Un Héros commence avec un score…' est collé à tort à la
# description du Trait Panache dans le PDF — on le retire de Panache (voir
# extraire_traits) et on le place dans etape_1_intro (texte ci-dessous,
# reformulé par Guillaume).
# Étape 3 — PP, âge et spécificités du personnage.
# Structures des coûts (factuelles, page 48 du livret).
ETAPE_3 = {
    "intro": (
        "Cette étape regroupe la répartition des Points de Personnage (PP) "
        "et le choix des spécificités qui personnalisent votre Héros. "
        "Vous obtenez 60 PP à dépenser intégralement, plus quelques bonus "
        "selon l'âge donné à votre Héros."
    ),
    "pp_base": 60,
    "ages": [
        {
            "plage": "15-25 ans",
            "label": "Jeune",
            "bonus": "Peut monter un autre Trait au choix, et 8 PP réservés aux Avantages.",
        },
        {
            "plage": "26-35 ans",
            "label": "Adulte",
            "bonus": "Un Métier au choix : ses compétences avancées sont au rang 1.",
        },
        {
            "plage": "36-50 ans",
            "label": "Expérimenté",
            "bonus": "Une École de la Nation d'origine ET un Métier ou Entraînement — "
                     "mais pioche un 2ᵉ Travers (Main du Destin).",
        },
    ],
    "rappel_max_creation": (
        "Une compétence ne peut dépasser 3 rangs à la création, même si elle "
        "apparaît dans plusieurs spécialisations."
    ),
    "rappel_ecoles_specs": (
        "Les Écoles peuvent inclure des Métiers ou Entraînements en bonus : "
        "ceux-ci ne comptent pas dans la limite de 3 spécialisations à la création "
        "(idem pour le bonus d'âge)."
    ),
    "specificites": [
        {
            "id": "sorcellerie",
            "nom": "Sorcellerie",
            "resume": "Faire appel à la sorcellerie de son pays d'origine.",
            "variantes": [
                {"label": "Demi-Sang (un parent sorcier, puissance moindre)", "pp": 15},
                {"label": "Sang-Pur (deux parents même sorcellerie)",         "pp": 25},
                {"label": "Sang-Mêlé (deux sorciers différents, puissance moindre pour chacun)", "pp": 35},
            ],
            "page": None,  # page Sorcelleries pas encore implémentée
            "page_label": "À venir",
        },
        {
            "id": "ecoles",
            "nom": "École de Spadassin, Combat, Courtisan ou Professionnelle",
            "resume": "Débloque le niveau Apprenti, des techniques particulières, "
                      "et deux spécialisations.",
            "variantes": [
                {"label": "Spadassin",                            "pp": 20},
                {"label": "Combat / Courtisan / Professionnelle", "pp": 15},
            ],
            "majoration_hors_nation": {"label": "Si l'école n'est pas de la Nation d'origine", "pp": 5},
            "max_creation": 2,
            "pages": [
                {"label": "Écoles de Spadassin",  "url": "ecoles-spadassin.html"},
                {"label": "Écoles de Combat",     "url": "ecoles-combat.html"},
            ],
        },
        {
            "id": "metiers_entrainements",
            "nom": "Métiers et Entraînements",
            "resume": "Acquiert une palette de compétences de base et avancées. "
                      "Toutes les compétences de base passent au rang 1 ; "
                      "les avancées s'achètent ensuite à prix réduit.",
            "cout_unit": 3,
            "max_creation": 3,
            "rappel": "Hors bonus d'âge et bonus des Écoles.",
            "pages": [
                {"label": "Métiers",       "url": "metiers.html"},
                {"label": "Entraînements", "url": "entrainements.html"},
            ],
        },
        {
            "id": "competences",
            "nom": "Compétences (achat au rang)",
            "resume": "Montez le rang d'une compétence (max 3 à la création). "
                      "Le coût dépend du fait qu'elle soit de base ou avancée dans "
                      "une de vos spécialisations.",
            "variantes": [
                {"label": "Compétence de base (dans une de vos spé.)",     "pp": 1},
                {"label": "Compétence avancée (dans une de vos spé.)",     "pp": 2},
                {"label": "Compétence hors-spécialisation (×rang visé)",   "pp": 3},
            ],
            "max_rang_creation": 3,
            "pages": [
                {"label": "Compétences principales", "url": "competences.html"},
                {"label": "Compétences artisanales", "url": "competences-artisanales.html"},
            ],
        },
        {
            "id": "avantages",
            "nom": "Avantages",
            "resume": "Particularités qui font sortir le Héros du lot. Certains "
                      "ne sont accessibles qu'à la création (Noble, Grand, etc.).",
            "cout": "Variable selon l'Avantage.",
            "a_venir": True,
        },
        {
            "id": "langues",
            "nom": "Langues",
            "resume": "La langue natale de votre Nation est gratuite. Vous pouvez "
                      "apprendre d'autres langues (parlées ou écrites).",
            "cout_unit": 1,
            "page": "#langues-tableau",
        },
        {
            "id": "societe_secrete",
            "nom": "Société Secrète",
            "resume": "Réservé aux Héros expérimentés ou en phase avec le but d'une Société.",
            "cout": 5,
            "max_creation": 1,
            "a_venir": True,
        },
    ],
}

# Langues par Nation (langue native locale) + Théan (lingua franca, latin théan).
LANGUES_PAR_NATION = {
    "Avalon":                  "Avalonien",
    "Inismore":                "Inish",
    "Marches des Highlands":   "Highlander",
    "Castille":                "Castillian",
    "Eisen":                   "Eisenör",
    "Montaigne":               "Montaginois",
    "Sarmatie":                "Sarmatien",
    "Ussura":                  "Ussuran",
    "Khazaris":                "Khazarien",
    "Tamatama":                "Tamatama (Tzigane)",
    "Vestenmannavnjar":        "Vesten",
    "Vodacce":                 "Vodacci",
    "Aragosta":                "Aragostan",
    "Jaragua":                 "Jaragua",
    "La Bucca":                "Buccoléen",
    "Numa":                    "Numain",
    "Rahuri":                  "Rahuri",
    "Agnivarsie":              "Agnivarsi",
    "Fuso":                    "Fuso",
    "Han":                     "Han",
    "Khazari":                 "Khazari",
    "Nagaja":                  "Nagaja",
    "Shenzhou":                "Shenzhou",
    "Empire Aksoumite":        "Aksoumi (Ge'ez)",
    "Khémet":                  "Khémetique",
    "Maghreb":                 "Maghrébin",
    "Kurufaba mandéniane":     "Mandé",
    "Royaume de Mbey":         "Mbey (Wolof)",
    "Anatol Ayh":              "Anatol",
    "Ashur":                   "Ashur (Araméen)",
    "Persis":                  "Persan",
    "Sarmion":                 "Sarmion",
    "Huitième Mer":            "Arabe tribal",
}

# Langue universelle (latin théan, parlée par les érudits dans tout Theah)
LANGUE_UNIVERSELLE = {
    "nom": "Théan",
    "description": "L'équivalent du latin de notre monde, encore parlé par les érudits, "
                   "le clergé, et dans le commerce international à travers tout Theah.",
}


STATISTIQUES_DERIVEES = [
    {
        "nom": "Points de Santé",
        "formule_label": "Gaillardise × 5",
        "formule": "gaillardise_5",
        "description": "Le nombre de petites entailles, estafilades, coups… que vous pouvez "
                       "encaisser. Elles se soignent facilement avec des soins ou un simple repos.",
    },
    {
        "nom": "Seuil de blessures graves",
        "formule_label": "Détermination",
        "formule": "determination",
        "description": "Grosses blessures beaucoup plus sérieuses. Lorsqu'elles sont au "
                       "maximum, vous êtes Sans-Défense : un ennemi peut vous achever via une Action.",
    },
    {
        "nom": "Tension",
        "formule_label": "Détermination × 5",
        "formule": "determination_5",
        "description": "Représente votre endurance mentale et votre capacité à rester "
                       "imperturbable. Vous en perdez principalement lors de joutes verbales, "
                       "marchandages ou événements perturbants. Elle guérit rapidement avec "
                       "du repos ou du bon temps avec vos amis.",
    },
    {
        "nom": "Frustration",
        "formule_label": "Esprit",
        "formule": "esprit",
        "description": "Blessure mentale laissée par une confrontation sociale intense. "
                       "Elle guérit avec du repos prolongé ou une activité de détente.",
    },
    {
        "nom": "Actions par tour",
        "formule_label": "Panache",
        "formule": "panache",
        "description": "Le nombre d'actions que vous pouvez faire à chaque tour de combat, "
                       "physique ou social.",
    },
    {
        "nom": "Dés d'héroïsme",
        "formule_label": "Trait le plus bas",
        "formule": "trait_min",
        "description": "Donne divers bénéfices : bonus à un test, empêcher votre héros "
                       "d'être achevé, activer votre Vertu, etc.",
    },
]


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

# Intro 'Conception d'un Héros' aérée par Guillaume — remplace l'extraction PDF.
INTRO_OVERRIDE = (
    "Avant de vous lancer dans 7e Mer, il vous faut un Héros. Pas le Héros de "
    "quelqu’un d’autre… votre Héros. Ce chapitre vous décrira comment le concevoir. "
    "C’est l’occasion de créer un Héros à l’image de vos personnages préférés. "
    "Pour ça, il ne suffit pas de remplir sa feuille de Héros ; il faut lui donner "
    "une substance au-delà de ses Caractéristiques et de ses Rangs. Vous devrez "
    "d’abord répondre à quelques questions importantes afin que d’une caricature "
    "en deux dimensions, votre Héros devienne un personnage en trois dimensions. "
    "Chaque Nation a une acception sensiblement différente du mot « Héros ». Le "
    "lieu de naissance de votre Héros influencera donc beaucoup l’image qu’il "
    "aura de son propre rôle."
    "\n\n"
    "Cette partie fournit une vision d’ensemble de chaque Nation. Elle définit "
    "également à quoi ressemble un Héros de telle ou telle Nation, afin que vous "
    "puissiez déterminer d’où vous voulez que votre Héros vienne. Chaque Nation "
    "a sa propre culture, sa propre ambiance, ses propres thèmes. En choisissant "
    "la Nation natale de votre Héros, vous en adoptez la culture, l’ambiance, "
    "les thèmes. Un Eisenör pourra avoir beaucoup en commun avec un Castillian "
    "ou un Sarmatien, mais il viendra toujours d’Eisen. Et il fera partie de "
    "l’Eisen. Toujours."
    "\n\n"
    "Chaque Nation a sa propre vision d’un Héros. Quelles sont les caractéristiques "
    "propres d’un Héros ? Lesquelles sont les plus importantes ? Lesquelles sont "
    "incompatibles avec cette vision ? Chaque Nation a ses propres réponses à ce "
    "sujet. En choisissant votre Nation, vous choisissez une image particulière "
    "de ce qu’est un « Héros ». Vous pouvez y adhérer, aller à son encontre ou "
    "faire à votre guise. S’opposer à un stéréotype pourra vous valoir d’être "
    "bien vu à l’étranger, mais chez vous, vous ferez figure d’antihéros."
)


def corriger_typos(text: str) -> str:
    for old, new in TYPO_CORRECTIONS.items():
        text = text.replace(old, new)
    for rx, repl in _TYPO_REGEX_COMPILED:
        text = rx.sub(repl, text)
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
    """Intro Étape 0 : version aérée fournie par Guillaume (override).
    Le PDF source est ignoré ; la mise en forme paragraphée est meilleure.
    """
    return INTRO_OVERRIDE


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
        "statistiques_derivees": STATISTIQUES_DERIVEES,
        "continents_ordre": CONTINENTS_ORDER,
        "continents_meta": CONTINENTS_META,
        "nations": nations,
        "etape_3": ETAPE_3,
        "langues_par_nation": LANGUES_PAR_NATION,
        "langue_universelle": LANGUE_UNIVERSELLE,
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
