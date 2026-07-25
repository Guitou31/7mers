#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Corrige un bug des fiches HTML « intégrables » (Fiche de Personnage +
Liste de Compétences) : leur composant interne charge `this.data` une seule
fois au démarrage, puis toute modification (clic sur un trait, saisie d'un
champ) réécrit TOUT le localStorage avec cette copie périmée — écrasant les
valeurs pré-remplies par l'import (#import / setFicheData).

Le patch ajoute `this.refresh()` (relecture du localStorage) avant chaque
mutation, faisant du localStorage la source de vérité unique.

Idempotent : ne fait rien si le patch est déjà appliqué. À relancer si les
fiches sont re-générées par leur outil d'origine.
"""

from pathlib import Path

ROOT = Path(__file__).parent
FICHES = [
    ROOT / "Fiche de Personnage 7ème Mer (intégrable).html",
    ROOT / "Liste de Compétences 7ème Mer (intégrable).html",
]

# NB : dans les fichiers, le code du composant vit dans une chaîne JS où les
# retours à la ligne sont des séquences littérales « \n » (backslash + n).
SAVE = ("this.saveData = () => { try { localStorage.setItem(this.KEY, "
        "JSON.stringify(this.data)); } catch (e) {} };")
REFRESH = ("\\n    this.refresh = () => { try { this.data = "
           "JSON.parse(localStorage.getItem(this.KEY) || '{}'); } catch (e) "
           "{ this.data = {}; } if (typeof this.data !== 'object' || !this.data) "
           "this.data = {}; this.data.traits = this.data.traits || {}; };")

PATCHES = [
    # 1) définit this.refresh juste après this.saveData
    (SAVE, SAVE + REFRESH),
    # 2) rafraîchit avant la saisie d'un champ (onInput)
    ("if (!k) return;\\n      this.data[k] = el.type === 'checkbox' ? el.checked : el.value;",
     "if (!k) return;\\n      this.refresh();\\n      this.data[k] = el.type === 'checkbox' ? el.checked : el.value;"),
    # 3) rafraîchit avant le clic sur un trait (fiche de personnage seulement)
    ("if (!c) return;\\n      const t = c.dataset.trait, v = +c.dataset.v, cur = this.data.traits[t] || 0;",
     "if (!c) return;\\n      this.refresh();\\n      const t = c.dataset.trait, v = +c.dataset.v, cur = this.data.traits[t] || 0;"),
]


def main():
    for f in FICHES:
        t = f.read_text(encoding="utf-8")
        if "this.refresh = () =>" in t:
            print(f"déjà patché : {f.name}")
            continue
        applied = 0
        for old, new in PATCHES:
            n = t.count(old)
            if n == 0:
                continue
            if n > 1:
                print(f"  ! motif multiple ({n}×) dans {f.name} — patch annulé par sécurité")
                break
            t = t.replace(old, new)
            applied += 1
        else:
            f.write_text(t, encoding="utf-8")
            print(f"patché : {f.name} ({applied} correctifs)")


if __name__ == "__main__":
    main()
