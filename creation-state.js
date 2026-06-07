/**
 * Module partagé pour la création de personnage.
 * Permet de lire/écrire l'état de la création depuis n'importe quelle page
 * du site (Métiers, Écoles, Entraînements, Compétences, etc.).
 *
 * État stocké dans localStorage sous la clé 'creation_perso_state_v1'.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "creation_perso_state_v1";

  // Forme par défaut (utilisée pour les pages qui n'ont pas encore d'état)
  const DEFAULT_STATE = {
    // Étape 1
    nation: null,
    trait_bonus_nation: null,
    trait_libre: null,
    // Étape 2
    arcane: null,
    // Étape 3
    age_plage: null,
    sorcellerie: null,
    // Nouvelle shape avec noms persistés
    ecoles_choisies: [],          // [{nom, type, hors_nation}]
    metiers_choisis: [],          // [{nom}]
    entrainements_choisis: [],    // [{nom}]
    langues_choisies: [],         // [{nom}]
    societe_secrete: null,        // null | {nom}
    avantages_choisis: [],        // [{nom, pp}]
    competences_choisies: [],     // [{nom, rang, type_cout}]
    // Saisies manuelles libres (fallback)
    pp_avantages: 0,
    pp_competences: 0,
  };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULT_STATE);
      const obj = JSON.parse(raw);
      return Object.assign({}, DEFAULT_STATE, obj);
    } catch (e) {
      console.warn("CreationState.load : impossible de lire le state", e);
      return Object.assign({}, DEFAULT_STATE);
    }
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Dispatch un event personnalisé pour que la page courante puisse réagir
      window.dispatchEvent(new CustomEvent("creation-state-changed", { detail: state }));
    } catch (e) { /* quota/private mode : ignore */ }
  }

  // ===== Helpers d'ajout / retrait d'éléments par catégorie =====
  // Chaque fonction renvoie true si l'item est désormais présent, false sinon.

  function _ensureList(state, key) {
    if (!Array.isArray(state[key])) state[key] = [];
    return state[key];
  }

  function toggleMetier(nom) {
    const state = load();
    const list = _ensureList(state, "metiers_choisis");
    const idx = list.findIndex(m => m.nom === nom);
    if (idx >= 0) {
      list.splice(idx, 1);
      save(state);
      return false;
    } else {
      list.push({ nom });
      save(state);
      return true;
    }
  }

  function toggleEntrainement(nom) {
    const state = load();
    const list = _ensureList(state, "entrainements_choisis");
    const idx = list.findIndex(m => m.nom === nom);
    if (idx >= 0) {
      list.splice(idx, 1);
      save(state);
      return false;
    } else {
      list.push({ nom });
      save(state);
      return true;
    }
  }

  /**
   * Toggle une école.
   * @param {string} nom Nom de l'école
   * @param {string} type 'Spadassin' | 'Combat' | 'Courtisan' | 'Pro'
   * @param {string[]} ecoleNations Liste des nations natives de l'école (pour
   *                                déterminer auto si hors-Nation)
   */
  function toggleEcole(nom, type, ecoleNations) {
    const state = load();
    const list = _ensureList(state, "ecoles_choisies");
    const idx = list.findIndex(e => e.nom === nom);
    if (idx >= 0) {
      list.splice(idx, 1);
      save(state);
      return false;
    } else {
      // Détection auto hors-Nation : si la Nation choisie n'est pas dans
      // les nations natives de l'école → +5 PP de majoration.
      let hors_nation = false;
      if (state.nation && Array.isArray(ecoleNations) && ecoleNations.length) {
        hors_nation = !ecoleNations.includes(state.nation);
      }
      list.push({ nom, type, hors_nation });
      save(state);
      return true;
    }
  }

  function isInCreation(category, nom) {
    const state = load();
    const list = state[category] || [];
    return list.some(item => item.nom === nom);
  }

  function reset() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  // Calcul du total PP (utilisable depuis n'importe quelle page si besoin)
  function calculerPP(state) {
    state = state || load();
    let total = 0;
    if (state.sorcellerie === "demi-sang") total += 15;
    if (state.sorcellerie === "sang-pur")  total += 25;
    if (state.sorcellerie === "sang-mele") total += 35;
    (state.ecoles_choisies || []).forEach(e => {
      let cout = e.type === "Spadassin" ? 20 : 15;
      if (e.hors_nation) cout += 5;
      total += cout;
    });
    total += (state.metiers_choisis || []).length * 3;
    total += (state.entrainements_choisis || []).length * 3;
    total += (state.langues_choisies || []).length * 1;
    if (state.societe_secrete || state.has_societe_secrete) total += 5;
    (state.competences_choisies || []).forEach(c => {
      const cout = c.type_cout === "base" ? 1 : c.type_cout === "avancee" ? 2 : 3;
      total += cout * (c.rang || 1);
    });
    (state.avantages_choisis || []).forEach(a => total += (a.pp || 0));
    // Fallback saisies manuelles
    total += (parseInt(state.pp_avantages, 10) || 0);
    total += (parseInt(state.pp_competences, 10) || 0);
    return total;
  }

  // ===== Helper UI : bouton "Ajouter à ma création" =====
  // Crée et renvoie un <button> dont l'apparence et le texte se mettent à jour.
  // categorie = "metiers_choisis" | "entrainements_choisis" | "ecoles_choisies"
  // toggleFn = la fonction toggle correspondante
  // labelAdd / labelRemove = textes des deux états
  function buildToggleButton({ categorie, nom, toggleFn, labelAdd, labelRemove, prix }) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-add-creation";
    function refresh() {
      const isIn = isInCreation(categorie, nom);
      btn.classList.toggle("is-added", isIn);
      btn.innerHTML = isIn
        ? "✓ " + labelRemove + (prix ? " <span class='btn-pp'>(" + prix + " PP)</span>" : "")
        : "+ " + labelAdd + (prix ? " <span class='btn-pp'>(" + prix + " PP)</span>" : "");
    }
    btn.addEventListener("click", () => {
      toggleFn();
      refresh();
    });
    // Réagit aux changements externes (ex: reset depuis la page création)
    window.addEventListener("creation-state-changed", refresh);
    refresh();
    return btn;
  }

  // Exposition globale
  window.CreationState = {
    STORAGE_KEY,
    load,
    save,
    toggleMetier,
    toggleEntrainement,
    toggleEcole,
    isInCreation,
    reset,
    calculerPP,
    buildToggleButton,
  };
})();
