"""Catégorisation des armes 7ème Mer V1 selon les règles de Guillaume.

19 catégories utilisées dans le site (18 catégories de règles + 1 catégorie 'Atypique / Accessoire' pour les cas spéciaux).

Usage :
    from armes_categories import extract_categories, format_arme_display
    cats = extract_categories("Pesh-Kabz (Poignard)")  # ['Couteau']
    disp = format_arme_display("Pesh-Kabz (Poignard)", cats)  # "Pesh-Kabz (Couteau)"
"""

import re
import unicodedata

# === Liste officielle des catégories ===
CATEGORIES = [
    "Arbalètes",
    "Arcs",
    "Armes d'Hast",
    "Bâtons",
    "Boucliers",
    "Couteau",
    "Épées à 2 mains",
    "Escrime (Rapière)",
    "Escrime (Sabre)",
    "Escrime (Épée)",
    "Fléau",
    "Fouet",
    "Fusil",
    "Gant de combat",
    "Haches",
    "Lances",
    "Masses",
    "Pistolet",
    "Pugilat",
    # Catégorie spéciale, pour cape de duel / lanterne / arme improvisée
    "Atypique / Accessoire",
]

# === Mapping mot-clé (regex) → liste de catégories ===
# L'ordre compte : on teste les patterns plus spécifiques avant les génériques.
# Tous les patterns sont matchés sur le texte normalisé (lowercase + sans accents).
WEAPON_PATTERNS: list[tuple[str, list[str]]] = [
    # --- Cas spéciaux multi-catégories ---
    (r"arme[s]?\s+(2|deux)\s+mains?\s+au\s+choix",
     ["Épées à 2 mains", "Haches", "Armes d'Hast"]),
    (r"toutes?\s+(les\s+)?(armes?|lames?)\s+d['\s]?escrime",
     ["Escrime (Rapière)"]),  # selon décision Guillaume : Rapière uniquement

    # --- Variantes 2 mains à détecter avant les 1 mains ---
    (r"\bepee?\s+(a|à)?\s*2\s+mains?\b", ["Épées à 2 mains"]),
    (r"\bepee?\s+(a|à)?\s*deux\s+mains?\b", ["Épées à 2 mains"]),
    (r"\bhache\s+ou\s+epee?\s+2\s+mains?\b", ["Haches", "Épées à 2 mains"]),
    (r"\bzweihander\b", ["Épées à 2 mains"]),
    (r"\bclaymore\b", ["Épées à 2 mains"]),
    (r"\bdilmekiri\b", ["Épées à 2 mains"]),
    (r"\bhache\s+(a|à)?\s*2\s+mains?\b", ["Haches"]),
    (r"\bhache\s+(a|à)?\s*deux\s+mains?\b", ["Haches"]),
    (r"\bbaton\s+(a|à)?\s*2\s+mains?\b", ["Bâtons"]),
    (r"\bbaton\s+(a|à)?\s*deux\s+mains?\b", ["Bâtons"]),
    (r"\basaaya\b", ["Bâtons"]),

    # --- Escrime (Rapière) ---
    (r"\brapiere\b", ["Escrime (Rapière)"]),
    (r"\bfleuret\b", ["Escrime (Rapière)"]),
    (r"\bcanne[-\s]?epee?\b", ["Escrime (Rapière)"]),
    (r"\bestoc\b", ["Escrime (Rapière)"]),

    # --- Escrime (Sabre) ---
    (r"\bcimeterre\b", ["Escrime (Sabre)"]),
    (r"\bshamshir\b", ["Escrime (Sabre)"]),
    (r"\bkhepesh\b", ["Escrime (Sabre)"]),
    (r"\bdao\b", ["Escrime (Sabre)"]),
    (r"\bsabres?\b", ["Escrime (Sabre)"]),  # inclut "sabre de cavalerie", "sabre d'abordage"

    # --- Escrime (Épée) ---
    (r"\bjian\b", ["Escrime (Épée)"]),
    (r"\bkatana\b", ["Escrime (Épée)"]),
    (r"\bpallasch\b", ["Escrime (Épée)"]),
    (r"\bschiavone\b", ["Escrime (Épée)"]),
    (r"\bbroadsword\b", ["Escrime (Épée)"]),
    (r"\bespadon\b", ["Escrime (Épée)"]),
    (r"\bepee?\s+(longue|bastarde|batarde|courte|large)\b", ["Escrime (Épée)"]),
    (r"\bepees?\b", ["Escrime (Épée)"]),  # générique "épée", catch-all après les spécifiques

    # --- Couteau ---
    (r"\bcouteaux?\b", ["Couteau"]),
    (r"\bpoignards?\b", ["Couteau"]),
    (r"\bdague[s]?\b", ["Couteau"]),
    (r"\balla\s+stradiota\b", ["Couteau"]),
    (r"\barmes?\s+courtes?\b", ["Couteau"]),
    (r"\bcoutelas\b", ["Couteau"]),
    (r"\bpesh[-\s]?kabz\b", ["Couteau"]),
    (r"\btriple[-\s]?dague\b", ["Couteau"]),
    (r"\bmain[-\s]?gauche\b", ["Couteau"]),  # arme de parade en main gauche = couteau/dague
    (r"\bkris\b", ["Couteau"]),               # dague malaise/indonésienne
    (r"\bjambiya\b", ["Couteau"]),            # dague arabe/orientale
    (r"\bmisericorde\b", ["Couteau"]),        # dague médiévale

    # --- Bâtons ---
    (r"\bbatons?\b", ["Bâtons"]),

    # --- Haches ---
    (r"\bhachettes?\b", ["Haches"]),
    (r"\bhaches?\b", ["Haches"]),
    (r"\bfrancisque\b", ["Haches"]),

    # --- Lances ---
    (r"\blances?\b", ["Lances"]),
    (r"\bsagaie\b", ["Lances"]),
    (r"\bpilum\b", ["Lances"]),
    (r"\bharpon\b", ["Lances"]),
    (r"\bepieu\b", ["Lances"]),

    # --- Armes d'Hast ---
    (r"\bhallebarde\b", ["Armes d'Hast"]),
    (r"\barmes?\s+d['\s]?hast\b", ["Armes d'Hast"]),

    # --- Boucliers ---
    (r"\bboucliers?\b", ["Boucliers"]),
    (r"\brondaches?\b", ["Boucliers"]),
    (r"\b(petit\s+)?ecu\b", ["Boucliers"]),
    (r"\bpavois\b", ["Boucliers"]),

    # --- Gant de combat ---
    (r"\bkatars?\b", ["Gant de combat"]),
    (r"\bpanzerfausts?\b", ["Gant de combat"]),
    (r"\bgantelet[s]?\b", ["Gant de combat"]),
    (r"\bgriffes?\b", ["Gant de combat"]),
    (r"\bgants?\s+de\s+combat\b", ["Gant de combat"]),

    # --- Pugilat ---
    (r"\bmains?\s+nues?\b", ["Pugilat"]),
    (r"\bpugilat\b", ["Pugilat"]),
    (r"\bpoings?\b", ["Pugilat"]),
    (r"\buppercuts?\b", ["Pugilat"]),

    # --- Fléau ---
    (r"\bfleaux?\b", ["Fléau"]),
    (r"\bseurng\s+tjat\s+koen\b", ["Fléau"]),

    # --- Fouet (catégorie à part — utilisé par Zepeda, Malone et de futures écoles) ---
    (r"\bfouet[s]?\b", ["Fouet"]),

    # --- Atypique / Accessoire ---
    (r"\bcape[s]?\s+de\s+duel\b", ["Atypique / Accessoire"]),
    (r"\blanternes?\b", ["Atypique / Accessoire"]),
    (r"\barmes?\s+improvisee?s?\b", ["Atypique / Accessoire"]),
]

# === Mapping noms d'arme connus → catégorie principale ===
# Sert pour le format d'affichage : si l'arme dans le texte n'est pas reconnaissable
# par le joueur en termes de catégorie de règle, on l'affiche "Nom (Catégorie)".
# Les noms en clé sont normalisés (lowercase + sans accents).
NOMS_RECONNAISSABLES_PAR_CATEGORIE = {
    # Si le mot est dans le nom d'arme, le joueur identifie déjà la catégorie.
    "Escrime (Rapière)": ["rapiere", "fleuret"],
    "Escrime (Sabre)": ["sabre"],
    "Escrime (Épée)": ["epee"],
    "Épées à 2 mains": ["zweihander", "claymore", "epee", "espadon"],
    "Couteau": ["couteau", "dague", "poignard", "coutelas"],
    "Bâtons": ["baton"],
    "Haches": ["hache", "francisque"],
    "Lances": ["lance", "sagaie", "harpon", "epieu", "pilum"],
    "Armes d'Hast": ["hallebarde"],
    "Boucliers": ["bouclier", "rondache", "ecu", "pavois"],
    "Gant de combat": ["gant", "katar", "panzerfaust", "gantelet", "griffe"],
    "Pugilat": ["main nue", "mains nues", "pugilat", "poing"],
    "Fléau": ["fleau"],
    "Fouet": ["fouet"],
    "Atypique / Accessoire": ["cape", "lanterne", "arme improvisee"],
}


def _normalize(s: str) -> str:
    """Normalisation pour matching : lowercase + sans accents + apostrophes typographiques → ASCII."""
    if not s:
        return ""
    nfkd = unicodedata.normalize("NFKD", s)
    sans_accents = "".join(c for c in nfkd if not unicodedata.combining(c))
    cleaned = sans_accents.replace("’", "'").replace("‘", "'").replace(" ", " ")
    return re.sub(r"\s+", " ", cleaned.lower()).strip()


def split_armes(arme_str: str) -> list[str]:
    """Sépare une chaîne d'armes en composants individuels.
    Sépare sur '+', ',', ' et ', ' ou ', ' / '. Préserve les parenthèses.
    """
    if not arme_str:
        return []
    # Protéger les parenthèses du split
    placeholder_map = {}
    def replace_paren(m):
        key = f"__PAREN_{len(placeholder_map)}__"
        placeholder_map[key] = m.group(0)
        return key
    masked = re.sub(r"\([^)]*\)", replace_paren, arme_str)

    # Split sur les séparateurs (on traite "ou" et "et" prudemment, en tant que mots isolés)
    parts = re.split(r"\s*(?:\+|/|,|\s+et\s+|\s+ou\s+)\s*", masked)

    # Restaurer les parenthèses
    result = []
    for p in parts:
        p = p.strip()
        if not p:
            continue
        for key, val in placeholder_map.items():
            p = p.replace(key, val)
        result.append(p)
    return result


def extract_categories(arme_str: str) -> list[str]:
    """Extrait toutes les catégories d'armes appliquables à une école.
    Préserve l'ordre d'apparition, dédoublonne. Les patterns sont testés
    dans l'ordre et un caractère déjà matché n'est pas re-matché
    (évite que 'épée 2 mains' déclenche aussi 'épée' générique).
    """
    if not arme_str:
        return []
    parts = split_armes(arme_str)
    seen: set[str] = set()
    ordered: list[str] = []

    for part in parts:
        part_norm = _normalize(part)
        part_categories: list[str] = []
        matched_chars: list[bool] = [False] * len(part_norm)
        stop_other_patterns = False

        for pattern, categories in WEAPON_PATTERNS:
            if stop_other_patterns:
                break
            for m in re.finditer(pattern, part_norm):
                # Si cette plage chevauche un match précédent, on l'ignore
                if any(matched_chars[i] for i in range(m.start(), m.end()) if i < len(matched_chars)):
                    continue
                # Marque ces caractères comme matchés
                for i in range(m.start(), m.end()):
                    if i < len(matched_chars):
                        matched_chars[i] = True
                for cat in categories:
                    if cat not in part_categories:
                        part_categories.append(cat)
            # Cas spéciaux multi-catégories : on arrête le scan après détection
            if len(categories) >= 3 and part_categories:
                stop_other_patterns = True

        for cat in part_categories:
            if cat not in seen:
                seen.add(cat)
                ordered.append(cat)

    return ordered


def _arme_contient_categorie(part: str, categorie: str) -> bool:
    """Le nom d'arme (hors parenthèses) contient-il un mot reconnaissable de la catégorie ?
    Les keywords matchent avec un 's' optionnel pour tolérer le pluriel.
    """
    base = re.sub(r"\s*\([^)]*\)\s*", " ", part)
    base_norm = _normalize(base)
    keywords = NOMS_RECONNAISSABLES_PAR_CATEGORIE.get(categorie, [])
    for kw in keywords:
        kw_norm = _normalize(kw)
        if re.search(r"\b" + re.escape(kw_norm) + r"s?\b", base_norm):
            return True
    return False


def _categorie_courte(categorie: str) -> str:
    """Pour les parenthèses : 'Escrime (Sabre)' → 'Sabre' (plus court à lire)."""
    m = re.match(r"^Escrime \((.+)\)$", categorie)
    if m:
        return m.group(1)
    return categorie


def _format_partie(part: str) -> str:
    """Formatte une partie d'arme isolée :
    - Pas de parenthèse → ajoute '(Cat)' si nom de base ne contient pas la cat
    - Parenthèse présente → la garde uniquement si elle correspond exactement à la cat,
      sinon la remplace par '(Cat)' (ex: 'Pesh-Kabz (Poignard)' → 'Pesh-Kabz (Couteau)')
    - Formules génériques ('au choix', 'toutes lames') → garde tel quel
    - Plusieurs catégories pour cette partie → garde tel quel
    """
    cats = extract_categories(part)
    if not cats:
        return part
    if len(cats) > 1:
        return part
    primary = cats[0]
    short = _categorie_courte(primary)
    part_norm = _normalize(part)
    if any(s in part_norm for s in ["toutes lames", "toutes les armes", "au choix"]):
        return part

    paren_match = re.search(r"\s*\(([^)]*)\)\s*$", part)
    base = re.sub(r"\s*\([^)]*\)\s*$", "", part).strip()

    if paren_match:
        paren_content = paren_match.group(1).strip()
        paren_norm = _normalize(paren_content)
        short_norm = _normalize(short)
        primary_norm = _normalize(primary)
        # Si la parenthèse est exactement le nom de la cat (court ou long) → garde
        if paren_norm == short_norm or paren_norm == primary_norm:
            return part
        # Sinon remplace par la catégorie courte
        return f"{base} ({short})"
    # Pas de parenthèse : ajoute la cat si le nom ne la suggère pas
    if _arme_contient_categorie(part, primary):
        return part
    return f"{part} ({short})"


_SEPARATORS_RE = re.compile(r"(\s*(?:\+|/|,|\s+et\s+|\s+ou\s+)\s*)")


def format_arme_display(arme_str: str) -> str:
    """Formatte l'affichage d'une arme en préservant les séparateurs originaux.
    Pour chaque partie : ajoute/remplace la catégorie entre parenthèses si utile.
    """
    if not arme_str:
        return ""
    # Protège les parenthèses pour ne pas que les virgules à l'intérieur soient prises comme séparateurs
    placeholder_map = {}
    def _stash(m):
        key = f"\x00P{len(placeholder_map)}\x00"
        placeholder_map[key] = m.group(0)
        return key
    masked = re.sub(r"\([^)]*\)", _stash, arme_str)

    # Split en GARDANT les séparateurs (groupes capturants alternés)
    chunks = _SEPARATORS_RE.split(masked)

    # Restaure les parenthèses et formate chaque partie de contenu
    out_pieces = []
    for i, chunk in enumerate(chunks):
        for key, val in placeholder_map.items():
            chunk = chunk.replace(key, val)
        if i % 2 == 0:
            # Partie de contenu (arme)
            out_pieces.append(_format_partie(chunk.strip()) if chunk.strip() else chunk)
        else:
            # Séparateur — préservé tel quel
            out_pieces.append(chunk)
    return "".join(out_pieces)


# === Test rapide quand exécuté en standalone ===
if __name__ == "__main__":
    tests = [
        "Cimeterre",
        "Rapière",
        "Pesh-Kabz (Poignard)",
        "Rapière et dague",
        "Sabre + Bouclier",
        "Asaaya (Bâton 2 mains)",
        "Toutes lames d'escrime",
        "Arme 2 mains au choix",
        "Coutelas ou Poignard (x2)",
        "Bâton + pugilat",
        "Épée longue + Rondache",
        "Rapière + Cape de duel",
        "Rapière et lanterne",
        "Mains nues ou gants de combat",
        "Sabre et Arme improvisée",
        "Fouet + Couteau",
        "Hache ou épée 2 mains",
        "Pilum / Sagaie",
        "Sabre, sabre de cavalerie ou sabre d'abordage",
    ]
    for t in tests:
        cats = extract_categories(t)
        disp = format_arme_display(t)
        print(f"  {t!r:55} → {cats}")
        print(f"      display: {disp!r}")
