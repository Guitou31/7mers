// ============================================================
// Base de données du Journal de campagne.
//   - articles : les articles, regroupés par rubrique.
//   - changes  : journal d'activité (le plus récent en premier).
// Ce fichier est LU par toutes les pages du journal (aucun jeton requis),
// et ÉCRIT par l'éditeur via l'API GitHub (clic « Enregistrer » → commit).
// Ne pas réorganiser à la main pendant qu'on édite en ligne : l'éditeur
// récupère toujours la dernière version avant d'écrire.
// ============================================================
window.JOURNAL_DB = {
  "articles": {
    "personnages": [],
    "lieux": [],
    "cartes": [],
    "organisations": [],
    "familles": [],
    "creatures": [],
    "nations": [],
    "calendriers": [],
    "chronologies": [],
    "journaux": [],
    "quetes": [],
    "objets": []
  },
  "changes": []
};
