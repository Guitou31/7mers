"""Génère arcanes.json + .js à partir du PDF '01 Arcanes (15-11-14).pdf'.

Stratégie de contenu (prudence droits) :
- Noms des Travers, Vertus, et table de mapping Arcane→(Travers, Vertu) :
  données structurelles factuelles du jeu, listées telles quelles.
- Effets mécaniques (1 phrase '*Le MJ peut activer ce travers pour…*') :
  règles fonctionnelles courtes, conservées intégralement.
- Résumés narratifs courts (1 phrase paraphrasée) : rédigés ici à la main
  par soucis de ne pas reproduire la prose éditoriale du livre source
  (Les Secrets de la 7ème Mer). Guillaume peut compléter / nuancer s'il
  le souhaite dans son outil.

Illustrations : extraites séparément dans images/arcanes/ (12 visuels uniques).
"""

import json
import re
from pathlib import Path

DEST_DIR = Path(__file__).parent
DEST_JSON = DEST_DIR / "arcanes.json"
DEST_JS = DEST_DIR / "arcanes.js"


# Table 1 du PDF (page 4) — Arcanes des Héros : mapping factuel
# (numéro de carte, nom de la carte, Travers, Vertu).
ARCANES_HEROS: list[tuple[int, str, str, str]] = [
    (0,  "Le bateleur",         "Curieux",            "Béni des dieux"),
    (1,  "Le magicien",          "Ambitieux",          "Volontaire"),
    (2,  "La papesse",           "Hédoniste",          "Intuitif"),
    (3,  "L’impératrice",        "Libertin",           "Rassurant"),
    (4,  "L’empereur",           "Impulsif",           "Confiant"),
    (5,  "Le hiérophante",       "Naïf",               "Inspiré"),
    (6,  "Les amoureux",         "Amour impossible",   "Passionné"),
    (7,  "Le chariot",           "Présomptueux",       "Victorieux"),
    (8,  "La force",             "Couard",             "Courageux"),
    (9,  "L’ermite",             "Entier",             "Concentré"),
    (10, "Roue de la fortune",   "Malchanceux",        "Chanceux"),
    (11, "La justice",           "Critique",           "Exemplaire"),
    (12, "Le pendu",             "Indécis",            "Altruiste"),
    (13, "La mort",              "Téméraire",          "Impassible"),
    (14, "La tempérance",        "Envieux",            "Maître de soi"),
    (15, "Légion",               "Dévoué",             "Perspicace"),
    (16, "La maison de Dieu",    "Arrogant",           "Mystérieux"),
    (17, "L’étoile",             "Borné",              "Charismatique"),
    (18, "La lune",              "Distrait",           "Observateur"),
    (19, "Le soleil",            "Fier",               "Amical"),
    (20, "Le jugement",          "Fanatique",          "Psychologue"),
    (21, "Le monde",             "Cupide",             "Baroudeur"),
]


# Résumés courts (1 phrase) écrits ici pour ne pas reproduire la prose
# narrative du livre source.
TRAVERS: dict[str, dict] = {
    "Ambitieux": {
        "resume": "Le PJ veut surtout du pouvoir : avoir prise sur les autres compte plus que la richesse.",
        "activation": "Le MJ peut activer ce travers pour forcer le PJ à tout faire pour accroître son influence, même via un marché risqué.",
    },
    "Amour impossible": {
        "resume": "Le PJ tombe amoureux des mauvaises personnes : trop loin de son rang ou liées à ses ennemis.",
        "activation": "Le MJ peut activer ce travers pour faire naître l’amour dans le cœur du PJ.",
    },
    "Arrogant": {
        "resume": "Le PJ se croit supérieur aux autres et le fait sentir ouvertement.",
        "activation": "Le MJ peut activer ce travers pour forcer le PJ à exprimer du mépris ou du dédain envers quelqu’un.",
    },
    "Borné": {
        "resume": "Le PJ ne change jamais d’avis une fois sa décision prise.",
        "activation": "Le MJ peut activer ce travers pour empêcher le PJ de revenir sur sa position.",
    },
    "Couard": {
        "resume": "Le PJ a un instinct de conservation prononcé et fuit les risques même justifiés.",
        "activation": "Quand le PJ s’apprête à faire quelque chose de dangereux, le MJ peut activer ce travers pour le forcer à fuir.",
    },
    "Critique": {
        "resume": "Le PJ juge sur l’apparence et change difficilement d’opinion sur autrui.",
        "activation": "Le MJ peut activer ce travers pour forcer le PJ à tirer des conclusions hâtives sur une personne qu’il rencontre.",
    },
    "Cupide": {
        "resume": "Le PJ s’illumine devant l’argent : il en veut toujours davantage.",
        "activation": "Lors d’un partage de butin ou face à une tentative de corruption, le MJ peut activer ce travers pour qu’il en tire le maximum.",
    },
    "Curieux": {
        "resume": "Le PJ ne peut pas s’empêcher d’aller voir ce qui se passe, quitte à se mettre en danger.",
        "activation": "Le MJ peut activer ce travers pour pousser le PJ à enquêter là où il ne devrait pas.",
    },
    "Dévoué": {
        "resume": "Le PJ est entièrement loyal envers une personne ou une cause, jusqu’au sacrifice.",
        "activation": "Le MJ peut activer ce travers pour forcer le PJ à agir au profit de son objet de dévotion, au détriment du reste.",
    },
    "Distrait": {
        "resume": "L’esprit du PJ vagabonde au pire moment.",
        "activation": "Le MJ peut activer ce travers pour faire rater au PJ un détail crucial qui lui passe sous le nez.",
    },
    "Entier": {
        "resume": "Le PJ ne fait jamais les choses à moitié : tout ou rien.",
        "activation": "Le MJ peut activer ce travers pour forcer le PJ à pousser une action à l’extrême.",
    },
    "Envieux": {
        "resume": "Le PJ jalouse ce que les autres possèdent ou ont accompli.",
        "activation": "Le MJ peut activer ce travers pour amener le PJ à convoiter ce qu’un autre détient.",
    },
    "Fanatique": {
        "resume": "Le PJ suit une cause avec une ferveur aveugle.",
        "activation": "Le MJ peut activer ce travers pour forcer le PJ à défendre sa cause sans nuance.",
    },
    "Fier": {
        "resume": "Le PJ refuse de paraître diminué : ses succès doivent être vus, ses faiblesses cachées.",
        "activation": "Le MJ peut activer ce travers pour empêcher le PJ d’accepter de l’aide ou de reconnaître une erreur.",
    },
    "Hédoniste": {
        "resume": "Le PJ recherche systématiquement le plaisir et le confort.",
        "activation": "Le MJ peut activer ce travers pour pousser le PJ à choisir le plaisir immédiat plutôt que le devoir.",
    },
    "Impulsif": {
        "resume": "Le PJ agit avant de réfléchir.",
        "activation": "Le MJ peut activer ce travers pour forcer le PJ à réagir immédiatement, sans planification.",
    },
    "Indécis": {
        "resume": "Le PJ a du mal à trancher entre plusieurs options.",
        "activation": "Le MJ peut activer ce travers pour paralyser le PJ devant un choix important.",
    },
    "Libertin": {
        "resume": "Le PJ enchaîne les conquêtes amoureuses sans s’attacher.",
        "activation": "Le MJ peut activer ce travers pour pousser le PJ à céder à une nouvelle séduction.",
    },
    "Malchanceux": {
        "resume": "Quoi que fasse le PJ, le sort semble lui jouer des tours.",
        "activation": "Le MJ peut activer ce travers au moment où le PJ tente sa chance pour le voir échouer.",
    },
    "Naïf": {
        "resume": "Le PJ tend à croire ce qu’on lui dit, surtout venant d’une figure d’autorité.",
        "activation": "Le MJ peut activer ce travers pour faire avaler au PJ un mensonge ou une promesse trompeuse.",
    },
    "Présomptueux": {
        "resume": "Le PJ surestime ses capacités et croit pouvoir tout réussir.",
        "activation": "Le MJ peut activer ce travers pour forcer le PJ à se lancer dans un défi au-dessus de ses moyens.",
    },
    "Téméraire": {
        "resume": "Le PJ se jette dans l’action sans considérer les conséquences.",
        "activation": "Le MJ peut activer ce travers pour pousser le PJ à prendre un risque inconsidéré.",
    },
}


VERTUS: dict[str, dict] = {
    "Altruiste": {
        "resume": "Le PJ aide autrui spontanément, parfois au prix de ses propres intérêts.",
        "activation": "Permet de venir en aide à un autre PJ ou PNJ dans le besoin, avec un bonus contextuel.",
    },
    "Amical": {
        "resume": "Le PJ inspire la sympathie ; les inconnus tendent à lui faire confiance facilement.",
        "activation": "Permet de transformer une rencontre tendue en échange courtois.",
    },
    "Baroudeur": {
        "resume": "Le PJ est endurci par les voyages et tient bon dans des conditions extrêmes.",
        "activation": "Permet d’ignorer temporairement la fatigue, la faim, le froid ou la chaleur.",
    },
    "Béni des dieux": {
        "resume": "Une présence divine semble veiller sur le PJ aux moments critiques.",
        "activation": "Permet de relancer un jet raté en moment de péril réel.",
    },
    "Chanceux": {
        "resume": "Les petits coups du sort jouent en faveur du PJ.",
        "activation": "Permet de transformer un échec mineur en succès, ou de tomber pile sur la bonne chose au bon moment.",
    },
    "Charismatique": {
        "resume": "Le PJ attire naturellement l’attention et inspire ceux qui l’écoutent.",
        "activation": "Permet de galvaniser un groupe, ou d’imposer son point de vue dans un débat.",
    },
    "Concentré": {
        "resume": "Le PJ reste imperturbable même au cœur de l’agitation.",
        "activation": "Permet d’ignorer les distractions environnantes pour mener à bien une action délicate.",
    },
    "Confiant": {
        "resume": "Le PJ ne doute jamais de lui : il avance sans vaciller.",
        "activation": "Permet d’ignorer une pénalité due au stress ou à l’incertitude.",
    },
    "Courageux": {
        "resume": "Le PJ affronte ce que d’autres fuiraient.",
        "activation": "Permet d’ignorer la peur ou de bénéficier d’un bonus face à une menace écrasante.",
    },
    "Exemplaire": {
        "resume": "Le PJ incarne un modèle ; sa conduite force le respect.",
        "activation": "Permet d’inspirer un PNJ neutre à devenir un allié temporaire.",
    },
    "Impassible": {
        "resume": "Le PJ ne laisse rien transparaître de ses émotions.",
        "activation": "Permet de garder un secret sous interrogatoire ou de bluffer une situation tendue.",
    },
    "Inspiré": {
        "resume": "Le PJ a des éclairs d’intuition qui guident son action.",
        "activation": "Permet d’avoir la bonne idée au bon moment lors d’une enquête ou d’un défi.",
    },
    "Intuitif": {
        "resume": "Le PJ devine ce que les autres dissimulent sans pouvoir l’expliquer.",
        "activation": "Permet de demander discrètement au MJ un indice sur la véritable nature d’un PNJ ou d’une situation.",
    },
    "Maître de soi": {
        "resume": "Le PJ contrôle ses émotions et impulsions, même sous pression.",
        "activation": "Permet de résister à une provocation, séduction ou intimidation.",
    },
    "Mystérieux": {
        "resume": "Le PJ dégage une aura intrigante ; on en devine rarement les motivations.",
        "activation": "Permet de capter l’attention d’un PNJ qui voudra en savoir plus.",
    },
    "Observateur": {
        "resume": "Le PJ remarque les détails que les autres laissent passer.",
        "activation": "Permet de demander au MJ ce qui cloche dans une scène, un PNJ ou un objet.",
    },
    "Passionné": {
        "resume": "Quand le PJ s’investit, il y va de tout son cœur.",
        "activation": "Permet de doubler l’effet d’un jet réussi quand l’enjeu touche un objet d’affection.",
    },
    "Perspicace": {
        "resume": "Le PJ comprend vite ce qui se trame autour de lui.",
        "activation": "Permet de saisir immédiatement l’intention cachée derrière une parole ou un geste.",
    },
    "Psychologue": {
        "resume": "Le PJ cerne rapidement la personnalité de ses interlocuteurs.",
        "activation": "Permet de prédire la réaction d’un PNJ à une approche donnée.",
    },
    "Rassurant": {
        "resume": "La présence du PJ apaise ; les autres se sentent en sécurité auprès de lui.",
        "activation": "Permet de calmer une foule, une panique, ou de regagner la confiance d’un allié blessé.",
    },
    "Victorieux": {
        "resume": "Quand l’issue d’un combat est en jeu, le PJ trouve l’ouverture.",
        "activation": "Permet de transformer un échange équilibré en victoire décisive.",
    },
    "Volontaire": {
        "resume": "Le PJ s’accroche à ses objectifs avec une opiniâtreté à toute épreuve.",
        "activation": "Permet de continuer une action que d’autres abandonneraient (fatigue, blessure, désespoir).",
    },
}


# Intro Étape 2 (mécanique de la Main du Destin), reformulée concise.
INTRO_ETAPE_2 = (
    "La Main du Destin est le seul élément aléatoire de la création de votre Héros, "
    "mais l’un des plus structurants pour son rôle dans l’aventure."
    "\n\n"
    "Les Sorte Streghe, sorcières de la Destinée, lisent l’aura des Héros à travers "
    "20 Arcanes (en plus de l’Arcane 0 et de l’Arcane 21, soit 22 cartes au total). "
    "Chaque carte révèle une Vertu (élément qui fait du PJ un Héros) et un Travers "
    "(sa plus grande faiblesse émotionnelle)."
    "\n\n"
    "Le MJ tire au hasard et donne une carte par joueur, qui gagne la Vertu et le "
    "Travers associés. Si le tirage convient mal au concept, le PJ peut tirer une "
    "seconde carte et choisir le couple Vertu / Travers parmi les deux."
    "\n\n"
    "Activation de la Vertu : une fois par partie, sans coût, dans une circonstance "
    "appropriée (rencontre, autre Héros blessé, etc.). Permet d’obtenir un avantage "
    "ponctuel."
    "\n\n"
    "Activation du Travers : une fois par partie, à votre initiative ou proposée par "
    "le MJ. Rapporte un point d’Héroïsme. Le joueur peut toujours refuser une proposition "
    "du MJ — mais accepter, c’est créer du jeu et révéler la profondeur de son PJ."
)


def main() -> None:
    # Travers : ordre alphabétique (cohérent avec le sommaire)
    travers_list = [
        {"nom": nom, **infos}
        for nom, infos in sorted(TRAVERS.items(), key=lambda kv: kv[0].lower())
    ]
    vertus_list = [
        {"nom": nom, **infos}
        for nom, infos in sorted(VERTUS.items(), key=lambda kv: kv[0].lower())
    ]

    arcanes_list = []
    for num, nom_carte, travers, vertu in ARCANES_HEROS:
        arcanes_list.append({
            "numero": num,
            "nom": nom_carte,
            "travers": travers,
            "vertu": vertu,
        })

    # Vérification croisée : toutes les valeurs travers/vertu de la table
    # doivent être présentes dans nos dicts.
    travers_attendus = {a["travers"] for a in arcanes_list}
    vertus_attendues = {a["vertu"] for a in arcanes_list}
    manquants_t = travers_attendus - set(TRAVERS.keys())
    manquants_v = vertus_attendues - set(VERTUS.keys())
    if manquants_t:
        print(f"  [!] Travers présents dans la table mais absents du dict : {manquants_t}")
    if manquants_v:
        print(f"  [!] Vertus présentes dans la table mais absentes du dict : {manquants_v}")

    data = {
        "_meta": {
            "source": "01 Arcanes (15-11-14).pdf (résumés paraphrasés, table de mapping factuelle)",
            "nb_arcanes": len(arcanes_list),
            "nb_travers": len(travers_list),
            "nb_vertus": len(vertus_list),
        },
        "intro_etape_2": INTRO_ETAPE_2,
        "arcanes": arcanes_list,
        "travers": travers_list,
        "vertus": vertus_list,
    }

    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    DEST_JSON.write_text(json_text, encoding="utf-8")
    DEST_JS.write_text(
        f"// Généré par parse_arcanes.py — ne pas éditer à la main\n"
        f"window.ARCANES_DATA = {json_text};\n",
        encoding="utf-8",
    )
    print(f"OK -> {DEST_JSON}")
    print(f"OK -> {DEST_JS}")
    print(f"  {len(arcanes_list)} arcanes, {len(travers_list)} travers, {len(vertus_list)} vertus")


if __name__ == "__main__":
    main()
