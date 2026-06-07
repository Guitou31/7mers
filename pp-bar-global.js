/**
 * Barre PP globale.
 * Affiche une mini barre 'Points de Personnages dépensés / budget' fixée en
 * bas à droite de toutes les pages du site, dès qu'une création de personnage
 * est en cours.
 *
 * Apparition  : dès qu'on a ouvert la page Création de personnage au moins
 *               une fois (state._started === true).
 * Disparition : reset depuis la page Création de personnage (clear localStorage
 *               + dispatch creation-state-changed).
 *
 * Sur la page Création de personnage elle-même, ce module ne fait rien (la
 * barre PP locale, plus complète, prend le relais).
 */
(function () {
  "use strict";
  if (!window.CreationState) return;

  // Ne pas activer sur la page création (barre dédiée déjà présente).
  const page = document.body && document.body.dataset && document.body.dataset.page;
  if (page === "creation-personnage") return;

  const PP_BUDGET = window.CreationState.PP_BUDGET || 60;
  let barEl = null;

  function buildBar() {
    if (barEl) return barEl;
    const root = document.createElement("aside");
    root.id = "pp-bar-global";
    root.className = "pp-bar-global";
    root.setAttribute("aria-label", "Points de Personnages — création en cours");
    root.innerHTML =
      '<a class="pp-bar-global-link" href="creation-personnage.html"' +
      ' title="Ouvrir la page Création de personnage">' +
      '  <span class="pp-bar-global-label">PP</span>' +
      '  <span class="pp-bar-global-chiffres">' +
      '    <span class="pp-bar-global-depenses" data-role="depenses">0</span>' +
      '    <span class="pp-bar-global-sep">/</span>' +
      '    <span class="pp-bar-global-budget" data-role="budget">' + PP_BUDGET + '</span>' +
      '  </span>' +
      '  <span class="pp-bar-global-restant" data-role="restant">+0</span>' +
      '</a>';
    document.body.appendChild(root);
    barEl = root;
    return root;
  }

  function removeBar() {
    if (barEl && barEl.parentNode) barEl.parentNode.removeChild(barEl);
    barEl = null;
  }

  function refresh() {
    const state = window.CreationState.load();
    if (!window.CreationState.isStarted(state)) {
      removeBar();
      return;
    }
    const bar = buildBar();
    const total = window.CreationState.calculerPP(state);
    const restant = PP_BUDGET - total;
    bar.classList.toggle("is-overspent", restant < 0);
    bar.classList.toggle("is-exact", restant === 0);
    bar.classList.toggle("is-leftover", restant > 0);
    const elD = bar.querySelector('[data-role="depenses"]');
    const elR = bar.querySelector('[data-role="restant"]');
    const elB = bar.querySelector('[data-role="budget"]');
    if (elD) elD.textContent = String(total);
    if (elR) elR.textContent = (restant >= 0 ? "+" : "") + restant;
    if (elB) elB.textContent = String(PP_BUDGET);
  }

  // Init après que le DOM soit prêt (script chargé en fin de body — DOM ok).
  refresh();

  // Réagit aux changements (même page : event custom, autre onglet : storage).
  window.addEventListener("creation-state-changed", refresh);
  window.addEventListener("storage", function (e) {
    if (e.key === window.CreationState.STORAGE_KEY) refresh();
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) refresh();
  });
})();
