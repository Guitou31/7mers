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
  const PP_BUDGET = 60;

  // Forme par défaut (utilisée pour les pages qui n'ont pas encore d'état)
  const DEFAULT_STATE = {
    // Drapeau : true dès que la page Création de personnage a été ouverte
    // au moins une fois depuis le dernier reset. Sert à n'afficher la
    // barre PP globale que si une création est effectivement en cours.
    _started: false,
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

  // ===== Compétences : type_cout (base / avancee / hors) =====
  // Calcule l'ensemble des noms de compétences qui sont 'de base' ou 'avancées'
  // dans au moins un des métiers/entraînements choisis par le joueur.
  // Inclut les options des choix.
  function getMesCompetencesSets() {
    const state = load();
    const baseSet = new Set();
    const avSet = new Set();

    function ajouterDe(source) {
      (source.competences_base || []).forEach(c => baseSet.add(c));
      (source.competences_avancees || []).forEach(c => avSet.add(c));
      // Choix : peut être dict (legacy) ou list[dict]
      const choixBase = source.competences_base_choix;
      if (Array.isArray(choixBase)) {
        choixBase.forEach(ch => (ch.options || []).forEach(o => baseSet.add(o)));
      } else if (choixBase && choixBase.options) {
        choixBase.options.forEach(o => baseSet.add(o));
      }
      const choixAv = source.competences_avancees_choix;
      if (Array.isArray(choixAv)) {
        choixAv.forEach(ch => (ch.options || []).forEach(o => avSet.add(o)));
      } else if (choixAv && choixAv.options) {
        choixAv.options.forEach(o => avSet.add(o));
      }
    }

    // Métiers
    const mData = window.METIERS_DATA && window.METIERS_DATA.metiers || [];
    (state.metiers_choisis || []).forEach(m => {
      const src = mData.find(x => x.nom === m.nom);
      if (src) ajouterDe(src);
    });
    // Entraînements
    const eData = window.ENTRAINEMENTS_DATA && window.ENTRAINEMENTS_DATA.entrainements || [];
    (state.entrainements_choisis || []).forEach(e => {
      const src = eData.find(x => x.nom === e.nom);
      if (src) ajouterDe(src);
    });
    return { base: baseSet, avancee: avSet };
  }

  function typeCoutCompetence(compNom) {
    const { base, avancee } = getMesCompetencesSets();
    if (base.has(compNom))    return "base";
    if (avancee.has(compNom)) return "avancee";
    return "hors";
  }

  function getCompetenceRang(compNom) {
    const state = load();
    const item = (state.competences_choisies || []).find(c => c.nom === compNom);
    return item ? item.rang : 0;
  }

  function setCompetenceRang(compNom, rang) {
    const state = load();
    if (!Array.isArray(state.competences_choisies)) state.competences_choisies = [];
    const idx = state.competences_choisies.findIndex(c => c.nom === compNom);
    const tc = typeCoutCompetence(compNom);
    if (!rang || rang <= 0) {
      if (idx >= 0) state.competences_choisies.splice(idx, 1);
    } else {
      const entry = { nom: compNom, rang: rang, type_cout: tc };
      if (idx >= 0) state.competences_choisies[idx] = entry;
      else state.competences_choisies.push(entry);
    }
    save(state);
  }

  // Coût total d'une compétence à un certain rang (utile pour preview).
  function coutCompetenceTotal(rang, type_cout) {
    const par_rang = type_cout === "base" ? 1 : type_cout === "avancee" ? 2 : 3;
    return rang * par_rang;
  }

  function reset() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    // Notifie les autres composants (pp-bar globale, boutons d'ajout, etc.)
    // pour qu'ils se mettent à jour / se cachent.
    window.dispatchEvent(new CustomEvent("creation-state-changed",
      { detail: Object.assign({}, DEFAULT_STATE) }));
  }

  function markStarted() {
    const state = load();
    if (!state._started) {
      state._started = true;
      save(state);
    }
  }

  function isStarted(state) {
    return !!(state && state._started);
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
    // Compétences : on recalcule dynamiquement le type_cout, car le joueur
    // peut avoir ajouté un métier/entraînement APRÈS avoir choisi un rang
    // (ce qui ferait basculer la compétence de 'hors' à 'base'/'avancee').
    const _setsCache = getMesCompetencesSets();
    (state.competences_choisies || []).forEach(c => {
      let tc = "hors";
      if (_setsCache.base.has(c.nom)) tc = "base";
      else if (_setsCache.avancee.has(c.nom)) tc = "avancee";
      const cout = tc === "base" ? 1 : tc === "avancee" ? 2 : 3;
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
    PP_BUDGET,
    load,
    save,
    toggleMetier,
    toggleEntrainement,
    toggleEcole,
    isInCreation,
    reset,
    markStarted,
    isStarted,
    calculerPP,
    buildToggleButton,
    // Compétences
    getMesCompetencesSets,
    typeCoutCompetence,
    getCompetenceRang,
    setCompetenceRang,
    coutCompetenceTotal,
  };
})();
