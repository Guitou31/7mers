#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Met à jour le journal avec le système de commerce maritime V2 :

- « Pattern de marchandage » devient « Système de commerce maritime »
  (constantes, navires, routes, résolution, table des événements complète,
  conversions, substitutions cabotage, équilibrage).
- « La Route de Sarmatie » : contenu remanié (par-navire, cargaisons,
  option chantier, Fidhelis, exemple complet).
- Fiches navires : renommées (La Diligente, The Providence — anciens noms en
  alias pour préserver les liens), section « Données de commerce » ajoutée
  ou remplacée sur les trois navires.

Idempotent. Source : route_sarmatie.md + systeme_commerce_maritime.md
(contenu intégré ici en HTML).
"""

import datetime
import json
from pathlib import Path

ROOT = Path(__file__).parent
DATA = ROOT / "journal-data.js"
TODAY = datetime.date.today().isoformat()


def table(headers, rows):
    h = "<tr>" + "".join(f"<th>{c}</th>" for c in headers) + "</tr>"
    b = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
    return f"<div class='j-tablewrap'><table>{h}{b}</table></div>"


def ul(items):
    return "<ul>" + "".join(f"<li>{x}</li>" for x in items) + "</ul>"


# ---------------------------------------------------------------- Système
SYSTEME_HTML = "\n".join([
    "<p><strong>Principe :</strong> bénéfice brut = argent investi × marge de la route, "
    "modifié par un jet d'événements, moins la redevance de la Ligue le cas échéant, "
    "moins les frais du navire. Monnaie : le Guilder (G), 1 G = 100 cents.</p>",
    "<p>La page <a class='j-link' href='journal-voyage.html'>Résolution de voyage</a> "
    "fait tous ces calculs automatiquement.</p>",

    "<h3>Constantes</h3>",
    table(["Constante", "Valeur", "Remarque"], [
        ["Taux d'investissement", "75 G / tonneau de cale utile",
         "Bouton de réglage : 50 (âpre) / 75 (standard) / 100 (lucratif)"],
        ["Taux des caches", "150 G / tonneau de cache", "Contrebande dense en valeur (2 × le taux)"],
        ["Redevance de la Ligue", "20 % du bénéfice brut", "La Diligente uniquement"],
        ["Dégât grave", "250 G + 1 semaine de réparation", ""],
    ]),

    "<h3>Les navires</h3>",
    table(["Navire", "Type", "Cale (utile)", "Caches", "Coût mensuel", "Plafond invest.", "Plafond caches", "Particularités"], [
        ["La Seconde Chance", "Schooner", "90 t (80 t)", "20 t", "500 G (600 G avec capitaine délégué)",
         "6 000 G", "3 000 G", "Le plus rapide ; seul navire autorisé à la contrebande (caches + Aspect trompeur)"],
        ["La Diligente", "Brigantin", "110 t (100 t)", "—", "500 G (capitaine délégué compris)",
         "7 500 G", "—", "Propriété de la Ligue de Vendel : 20 % du brut, commerce légal uniquement"],
        ["The Providence", "Brick", "200 t (180 t)", "—", "800 G (capitaine délégué compris)",
         "13 500 G", "—", "Disponible une fois retapé (chantier Serafin)"],
    ]),
    "<p>Plafond d'investissement = cale utile × taux ; plafond des caches = caches × taux des caches. "
    "La cale utile = cale totale moins les vivres (0,5 tonneau de rations par 10 marins et par semaine ; "
    "réavitaillement aux escales).</p>",

    "<h3>Les routes</h3>",
    table(["Route", "Définition", "Durée", "Marge", "Jets d'événement"], [
        ["Cabotage", "Aller-retour de moins de 4 semaines", "1 mois", "10 %", "1"],
        ["Trajet continental", "D'un bout à l'autre de la Théah", "2 à 4 mois", "50 %", "1"],
        ["Trajet intercontinental", "Théah ↔ Ifri ↔ Empire du Croissant", "4 à 6 mois", "100 %", "1"],
        ["Très long trajet", "Vers le Cathay ou le Nouveau Monde", "8 à 12 mois", "200 %", "2"],
    ]),
    "<p><strong>Contrebande :</strong> marge de la route doublée, réservée aux caches. "
    "Saisie totale si les caches sont découvertes.</p>",

    "<h3>Résolution d'un voyage</h3>",
    "<ol>"
    "<li>Vérifier les plafonds (investissement ≤ plafond du navire, caches ≤ plafond des caches).</li>"
    "<li>Frais = coût mensuel (± capitaine délégué) × durée en mois.</li>"
    "<li>Seuil de rentabilité = frais ÷ (marge × 0,8 si Ligue) — en dessous, le voyage part perdant même sans événement.</li>"
    "<li>Jet d'événement en Lancer &amp; Garder de d6 (les 6 explosent), à mapper sur la table ci-dessous "
    "(substitutions en cabotage ; 2 jets cumulés sur les très longs trajets).</li>"
    "<li>Marges effectives (additions puis multiplications, plancher à 0) : "
    "marge légale = (marge + Σ points ÷ 100) × multiplicateurs ; "
    "marge caches = (marge × 2 + Σ points ÷ 100) × multiplicateurs.</li>"
    "<li>Brut = investissement × marge légale + caches × marge caches + gains fixes.</li>"
    "<li>Redevance Ligue = 20 % du brut (jamais négative).</li>"
    "<li>Net = brut − redevance − frais − coûts d'événement (réparations, primes…).</li>"
    "<li>Cas spéciaux (priment sur tout) : <strong>Assaut pirate</strong> — cargaison perdue, "
    "net = −(investissement + caches) − frais − 1d6 × 250 de réparations, pas de redevance ; "
    "<strong>Prise pirate</strong> — navire et cargaison perdus (à jouer en scène si les PJ sont à bord) ; "
    "<strong>Contrôle tatillon</strong> — la part illicite hors caches est saisie "
    "(les caches non découvertes sont épargnées).</li>"
    "</ol>",

    "<h3>Table des événements</h3>",
    "<p>1 point de marge = 1 point de pourcentage.</p>",
    table(["Score", "Événement", "Effet"], [
        ["≤ 6", "Prise pirate", "Navire et cargaison perdus — à jouer en scène si les PJ sont à bord"],
        ["7", "Tempête majeure", "2 dégâts graves, retard important, 1d6 tonneaux de rations perdus"],
        ["8", "Surplus local", "Marge −8 points"],
        ["9", "Assaut pirate", "Cargaison perdue, 1d6 dégâts graves"],
        ["10", "Tempête", "1 dégât grave, retard"],
        ["11", "Forte concurrence", "Marge −5 points"],
        ["12", "Fret ou passager d'opportunité", "Gain fixe : 1d10 × 20 G"],
        ["13", "Contrôle douanier tatillon", "Droits doublés ; la part illicite hors caches est saisie"],
        ["14", "Épidémie à bord", "100 G, retard d'une semaine, quarantaine possible"],
        ["15", "Marché saturé", "Marge × 0,5"],
        ["16", "Voyage sans histoire", "—"],
        ["17", "Avarie mineure", "50 G"],
        ["18", "Bonne affaire", "Marge +5 points"],
        ["19", "Désertion", "1d6 matelots perdus, prime de 5 G par tête pour recompléter"],
        ["20", "Contrôle douanier allégé", "Marge +1d6 points"],
        ["21–22", "Petite concurrence", "Marge −2 points"],
        ["23", "Grogne de l'équipage", "Prime d'une demi-solde à tout l'équipage, sinon 1d6 matelots perdus"],
        ["24–25", "Voyage sans histoire", "—"],
        ["26", "Rencontre en mer", "Rumeur utile (narratif)"],
        ["27", "Assaut pirate", "Cargaison perdue, 1d6 dégâts graves"],
        ["28", "Très bonne affaire", "Marge +10 points"],
        ["29", "Épave ou cargaison flottante", "Gain fixe : 1d10 × 30 G"],
        ["30–31", "Pénurie locale", "Marge × 1,5"],
        ["32–33", "Vents favorables", "Marge +2 points ; une semaine gagnée, rations économisées"],
        ["34–35", "Sauvetage en mer", "Gain fixe : 1d10 × 10 G — ou un contact durable"],
        ["36–38", "Information précieuse", "Prochain voyage : marge +10 points"],
        ["39–41", "Vermine dans la cale", "1d6 tonneaux de rations perdus"],
        ["42–44", "Grande pénurie locale", "Marge × 2,5"],
        ["45–47", "Commande exclusive", "Prochain voyage : marge × 1,5"],
        ["48–49", "Faveur d'un armateur", "Un puissant doit une faveur au navire"],
        ["50+", "Coup de maître", "Marge × 2 et contact commercial durable"],
    ]),

    "<h3>Conversions utiles</h3>",
    ul(["1 dégât grave = 250 G + 1 semaine de réparation",
        "1 tonneau de marchandises perdu ≈ 75 G d'investissement (150 G en caches)",
        "Rations : 0,5 tonneau par 10 marins et par semaine ; 10 G le tonneau"]),

    "<h3>Substitutions en cabotage</h3>",
    "<p>Les eaux côtières ne connaissent guère la grande piraterie :</p>",
    table(["Remplace", "Événement", "Effet"], [
        ["Prise pirate", "Échouage", "1d6 tonneaux de marchandises jetés, 2 dégâts graves"],
        ["Assaut pirate", "Racket côtier", "1d10 × 10 G — ou 1 dégât grave de représailles"],
    ]),

    "<h3>Équilibrage</h3>",
    ul(["Sous le seuil de rentabilité (frais ÷ marge, × 0,8 avec la Ligue), le voyage part perdant — "
        "le seuil du brick est le double de celui du schooner",
        "À capital égal, le petit navire gagne plus (frais moindres) ; le brick ne domine que cale pleine",
        "Concentration du risque : un seul Assaut pirate frappe tout le navire "
        "(jusqu'à 13 500 G d'un coup sur The Providence plein)"]),
])

# ---------------------------------------------------------------- Route
ROUTE_HTML = "\n".join([
    "<p>Première ligne régulière de la flottille : <strong>Tarago (Castille) ↔ Rokiecin (Sarmatie)</strong>. "
    "Environ 11 000 km (≈ 5 900 milles nautiques). Trajet continental — marge de base 50 % — "
    "permettant 2 à 3 rotations par an.</p>",

    "<h3>Par navire</h3>",
    table(["Navire", "Vitesse moyenne", "Trajet simple", "Aller-retour", "Frais / voyage", "Seuil de rentabilité"], [
        ["La Seconde Chance", "5–6 nœuds", "7 semaines", "4 mois", "2 000 G", "4 000 G"],
        ["La Diligente", "4–5 nœuds", "8–9 semaines", "5 mois", "2 500 G", "6 250 G"],
        ["The Providence", "4–5 nœuds", "8–9 semaines", "5 mois", "4 000 G", "8 000 G"],
    ]),
    "<p>Frais / voyage = coût mensuel retenu × durée de l'aller-retour. "
    "Seuil = frais ÷ (marge × 0,8 pour La Diligente, marge sinon). "
    "L'aller-retour comprend le négoce : une à deux semaines par tête de ligne.</p>",

    "<h3>Cargaisons</h3>",
    "<p>Les marchandises n'ont pas d'effet mécanique propre : elles donnent la couleur des cales.</p>",
    "<h4>À l'aller</h4>",
    ul(["Olives et huile d'olive",
        "Safran — production limitée, quelques quintaux : la légende de la route",
        "Acier castillan (lames, outils) — sert aussi de monnaie d'échange aux Fidhelis"]),
    "<h4>Au retour</h4>",
    ul(["Blé — concurrence féroce : le MJ joue sans pitié les événements Concurrence et Surplus local sur cette cargaison",
        "Bois et fournitures navales (mâts, espars, chanvre, goudron) — si encombrant que la cale "
        "ne transporte rien d'autre que les vivres"]),
    "<h4>Option chantier (bois)</h4>",
    "<p>Une cargaison de bois débarquée au chantier Serafin au lieu d'être revendue : "
    "−10 % sur le coût des travaux de The Providence, et une traçabilité nulle — pas de fournisseurs "
    "locaux, pas de factures, pas de témoins (utile pour déguiser le navire).</p>",

    "<h3>Les affaires avec les Fidhelis</h3>",
    ul(["<strong>Production limitée :</strong> à chaque passage, 1d6 tonneaux de tabac + 1d10 tonneaux "
        "d'eau-de-vie (maximum 16 — tient dans les 20 tonneaux de caches de La Seconde Chance). "
        "Variante à valider : 2d6 + 2d10 (max 32) pour recréer le dilemme caches pleines / transport à découvert",
        "<strong>Troc obligatoire :</strong> cession à 50–60 % de la valeur marchande, payée en marchandises "
        "castillanes sûres et portables (safran, huile, bon acier) — contre-valeur immobilisée dès l'aller",
        "<strong>Valeurs indicatives :</strong> tabac ≈ 110 G le tonneau au troc (valeur marchande 200 G) ; "
        "eau-de-vie ≈ 55 G (valeur marchande 100 G)",
        "<strong>Écoulement :</strong> chargées dans les caches, ces marchandises comptent comme investissement "
        "de contrebande — marge de la route doublée, 100 % sur cette liaison. Marché noir nécessaire à l'arrivée, "
        "ou falsification des comptes si consommation personnelle (taverne d'Ochoa) ; cargaison illicite saisie "
        "par un Contrôle douanier tatillon hors caches non découvertes",
        "<strong>Règle d'or :</strong> les Fidhelis se souviennent de qui les traite honnêtement — un partenaire "
        "loyal reçoit sa part des rumeurs colportées d'un bout à l'autre de la Théah"]),

    "<h3>Exemple de résolution complète</h3>",
    "<p><em>La Seconde Chance</em>, aller-retour Tarago–Rokiecin (4 mois, frais 2 000 G) : cale légale "
    "6 000 G + caches remplies au troc fidheli (12 tonneaux obtenus, contre-valeur ≈ 1 100 G immobilisée "
    "à l'aller, comptés 1 800 G d'investissement caches).</p>",
    ul(["Voyage sans histoire : brut = 6 000 × 50 % + 1 800 × 100 % = 4 800 G → net <strong>+2 800 G</strong>",
        "Avec Pénurie locale (× 1,5) : brut = 4 500 + 2 700 = 7 200 G → net <strong>+5 200 G</strong>",
        "Avec Assaut pirate : cargaison et caches perdues, − réparations → net ≈ <strong>−10 000 G</strong>"]),
])

# --------------------------------------------------- Données de commerce
MARK = "<h3>Données de commerce</h3>"

def donnees_commerce(rows):
    return MARK + "\n" + table(["Caractéristique", "Valeur"], rows)

COMMERCE_NAVIRES = {
    "La Seconde Chance": donnees_commerce([
        ["Cale totale (utile)", "90 t (80 t)"],
        ["Caches de contrebande", "20 t"],
        ["Coût mensuel", "500 G (600 G avec capitaine délégué)"],
        ["Plafond d'investissement", "6 000 G"],
        ["Plafond des caches", "3 000 G"],
        ["Contrebande", "Oui — seul navire autorisé (caches + Aspect trompeur)"],
    ]),
    "La Diligente": donnees_commerce([
        ["Cale totale (utile)", "110 t (100 t)"],
        ["Caches de contrebande", "—"],
        ["Coût mensuel", "500 G (capitaine délégué compris)"],
        ["Plafond d'investissement", "7 500 G"],
        ["Redevance de la Ligue", "20 % du bénéfice brut"],
        ["Contrebande", "Interdite (rupture de contrat avec la Ligue)"],
    ]),
    "The Providence": donnees_commerce([
        ["Cale totale (utile)", "200 t (180 t)"],
        ["Caches de contrebande", "—"],
        ["Coût mensuel", "800 G (capitaine délégué compris)"],
        ["Plafond d'investissement", "13 500 G"],
        ["Disponibilité", "Une fois retapé (chantier Serafin)"],
    ]),
}

RENOMMAGES = {
    "Le Brigantin de la Ligue de Vendel": ("La Diligente", "Brigantin de la Ligue de Vendel"),
    "Le Brick de la CCA": ("The Providence", "Brick (ex-CCA)"),
}


def main():
    t = DATA.read_text(encoding="utf-8")
    i, j = t.index("{"), t.rindex("}")
    header, db, tail = t[:i], json.loads(t[i:j + 1]), t[j + 1:]

    def by_name(rub, name):
        return next((a for a in db["articles"][rub] if a["name"].lower() == name.lower()
                     or name in (a.get("aliases") or [])), None)

    # 1) Système de commerce maritime (remplace Pattern de marchandage)
    art = by_name("routes-commerciales", "Pattern de marchandage") \
        or by_name("routes-commerciales", "Système de commerce maritime")
    if art:
        if art["name"] != "Système de commerce maritime":
            art.setdefault("aliases", []).append(art["name"])
            art["name"] = "Système de commerce maritime"
        art["title"] = "Règles du commerce"
        art["type"] = "Règles"
        art["description"] = SYSTEME_HTML
        art["updated"] = TODAY
        print("maj  :", art["name"])

    # 2) Route de Sarmatie
    art = by_name("routes-commerciales", "La Route de Sarmatie")
    if art:
        art["description"] = ROUTE_HTML
        art["title"] = "Tarago (Castille) ↔ Rokiecin (Sarmatie)"
        art["updated"] = TODAY
        print("maj  :", art["name"])

    # 3) Renommages des navires + données de commerce
    for old, (new, title) in RENOMMAGES.items():
        art = by_name("flottille", old) or by_name("flottille", new)
        if art and art["name"] != new:
            art.setdefault("aliases", [])
            if art["name"] not in art["aliases"]:
                art["aliases"].append(art["name"])
            art["name"] = new
            art["title"] = title
            print(f"renom: {old} -> {new}")
    for name, bloc in COMMERCE_NAVIRES.items():
        art = by_name("flottille", name)
        if not art:
            print("  ! navire introuvable :", name)
            continue
        d = art["description"]
        if MARK in d:
            d = d[:d.index(MARK)].rstrip()
        art["description"] = d + "\n" + bloc
        art["updated"] = TODAY
        print("data :", name)

    DATA.write_text(header + json.dumps(db, ensure_ascii=False, indent=2) + tail,
                    encoding="utf-8")
    print("journal-data.js écrit.")


if __name__ == "__main__":
    main()
