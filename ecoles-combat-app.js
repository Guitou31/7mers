(function () {
  "use strict";

  const data = window.ECOLES_COMBAT_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem;color:#8b3a3a'>Erreur : ecoles_combat.js introuvable.</p>";
    return;
  }

  const RESTRICTION_LABELS = { libre: "Libre", limitee: "Accès limité", interdite: "Interdite", inconnue: "Non documentée" };
  const GENRE_LABELS = { femmes: "Réservée aux femmes", hommes: "Réservée aux hommes" };

  const state = {
    search: "",
    nations: new Set(),
    armes: new Set(),
    restrictions: new Set(),
    genres: new Set(),
  };

  function normalize(s) {
    return (s || "").toString().normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k.startsWith("on") && typeof attrs[k] === "function") e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] === true) e.setAttribute(k, "");
      else if (attrs[k] != null && attrs[k] !== false) e.setAttribute(k, attrs[k]);
    }
    if (children != null) {
      if (!Array.isArray(children)) children = [children];
      for (const c of children) { if (c == null) continue; e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); }
    }
    return e;
  }
  function compareFR(a, b) { return a.localeCompare(b, "fr", { sensitivity: "base" }); }

  function matchEcole(ecole) {
    if (state.nations.size > 0 && !ecole.nations.some(n => state.nations.has(n))) return false;
    if (state.armes.size > 0 && !(ecole.armes_categories || []).some(c => state.armes.has(c))) return false;
    if (state.restrictions.size > 0 && !state.restrictions.has(ecole.restriction_creation)) return false;
    if (state.genres.size > 0 && !state.genres.has(ecole.genre_restriction)) return false;
    if (state.search) {
      const q = normalize(state.search);
      const haystack = normalize([
        ecole.nom, ecole.arme, ecole.arme_display || "",
        (ecole.armes_categories || []).join(" "),
        ecole.description_courte, (ecole.specialisations || []).join(" "),
        ecole.nations.join(" "),
        (ecole.techniques_combat || []).map(t => t.nom_base + " " + (t.variante || "")).join(" "),
      ].join(" "));
      if (!haystack.includes(q)) return false;
    }
    return true;
  }

  function renderCard(ecole) {
    const nationsBadges = ecole.nations.map(n => el("span", { class: "badge nation" }, n));
    const restrictionBadge = ecole.restriction_creation === "interdite"
      ? el("span", { class: "badge restriction-interdite" }, "⛔ Interdite à la création")
      : ecole.restriction_creation === "limitee"
        ? el("span", { class: "badge restriction-limitee" }, "⚠ Accès limité")
        : null;
    const genreBadge = ecole.genre_restriction === "femmes"
      ? el("span", { class: "badge genre-femmes" }, "♀ Réservée aux femmes")
      : ecole.genre_restriction === "hommes"
        ? el("span", { class: "badge genre-hommes" }, "♂ Réservée aux hommes")
        : null;
    return el("li", {
      class: "ecole-card is-enrichie",
      tabindex: "0", role: "button",
      "aria-label": "Voir le détail de l'école " + ecole.nom,
      onclick: () => window.openItem("ecole_combat", ecole, { resetStack: true }),
      onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.openItem("ecole_combat", ecole, { resetStack: true }); } },
    }, [
      el("h2", null, ecole.nom),
      el("p", { class: "arme" }, ecole.arme_display || ecole.arme || "—"),
      el("div", { class: "badges" }, [...nationsBadges, restrictionBadge, genreBadge]),
    ]);
  }

  function renderGrid() {
    const grid = document.getElementById("ecoles-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");
    const filtered = data.ecoles.filter(matchEcole).sort((a, b) => compareFR(a.nom, b.nom));
    grid.innerHTML = "";
    if (!filtered.length) { empty.hidden = false; count.textContent = "0 école"; }
    else {
      empty.hidden = true;
      count.textContent = filtered.length + " école" + (filtered.length > 1 ? "s" : "") + " sur " + data.ecoles.length;
      const frag = document.createDocumentFragment();
      for (const e of filtered) frag.appendChild(renderCard(e));
      grid.appendChild(frag);
    }
    updateActiveFilterCount();
  }

  function updateActiveFilterCount() {
    const total = state.nations.size + state.armes.size + state.restrictions.size + state.genres.size + (state.search ? 1 : 0);
    const counter = document.getElementById("filters-active-count");
    if (total > 0) { counter.textContent = total; counter.hidden = false; } else counter.hidden = true;
  }

  function buildNationsFilter() {
    const container = document.getElementById("filter-nations");
    const counts = {};
    for (const e of data.ecoles) for (const n of e.nations) counts[n] = (counts[n] || 0) + 1;
    const nations = (data._meta && data._meta.nations_uniques) || Object.keys(counts).sort(compareFR);
    for (const n of nations) {
      const cb = el("input", {
        type: "checkbox", value: n,
        onchange: (e) => {
          if (e.target.checked) state.nations.add(n); else state.nations.delete(n);
          renderGrid();
        },
      });
      container.appendChild(el("label", null, [
        cb, el("span", null, n),
        el("span", { class: "count" }, "(" + (counts[n] || 0) + ")"),
      ]));
    }
  }

  function buildArmesFilter() {
    const container = document.getElementById("filter-armes");
    const counts = (data._meta && data._meta.repartition_armes) || {};
    const order = Object.keys(counts).sort(compareFR);
    for (const cat of order) {
      const count = counts[cat] || 0;
      if (!count) continue;
      const cb = el("input", {
        type: "checkbox", value: cat,
        onchange: (e) => {
          if (e.target.checked) state.armes.add(cat); else state.armes.delete(cat);
          renderGrid();
        },
      });
      container.appendChild(el("label", null, [
        cb, el("span", null, cat),
        el("span", { class: "count" }, "(" + count + ")"),
      ]));
    }
  }

  function buildRestrictionsFilter() {
    const container = document.getElementById("filter-restrictions");
    const counts = {};
    for (const e of data.ecoles) counts[e.restriction_creation] = (counts[e.restriction_creation] || 0) + 1;
    for (const r of Object.keys(RESTRICTION_LABELS)) {
      if (!counts[r]) continue;
      const cb = el("input", {
        type: "checkbox", value: r,
        onchange: (e) => {
          if (e.target.checked) state.restrictions.add(r); else state.restrictions.delete(r);
          renderGrid();
        },
      });
      container.appendChild(el("label", null, [
        cb, el("span", null, RESTRICTION_LABELS[r]),
        el("span", { class: "count" }, "(" + counts[r] + ")"),
      ]));
    }
  }

  function buildGenresFilter() {
    const container = document.getElementById("filter-genres");
    const counts = {};
    for (const e of data.ecoles) if (e.genre_restriction) counts[e.genre_restriction] = (counts[e.genre_restriction] || 0) + 1;
    if (Object.keys(counts).length === 0) { container.parentElement.style.display = "none"; return; }
    for (const g of Object.keys(GENRE_LABELS)) {
      if (!counts[g]) continue;
      const cb = el("input", {
        type: "checkbox", value: g,
        onchange: (e) => {
          if (e.target.checked) state.genres.add(g); else state.genres.delete(g);
          renderGrid();
        },
      });
      container.appendChild(el("label", null, [
        cb, el("span", null, GENRE_LABELS[g]),
        el("span", { class: "count" }, "(" + counts[g] + ")"),
      ]));
    }
  }

  function wireEvents() {
    const search = document.getElementById("search");
    let timer = null;
    search.addEventListener("input", (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => { state.search = e.target.value.trim(); renderGrid(); }, 120);
    });
    document.getElementById("reset-filters").addEventListener("click", () => {
      state.search = "";
      state.nations.clear(); state.armes.clear(); state.restrictions.clear(); state.genres.clear();
      document.getElementById("search").value = "";
      document.querySelectorAll(".checkbox-list input[type=checkbox]").forEach(c => (c.checked = false));
      renderGrid();
    });
    const toggle = document.getElementById("filters-toggle");
    const filters = document.getElementById("filters");
    toggle.addEventListener("click", () => {
      const open = filters.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  buildNationsFilter();
  buildArmesFilter();
  buildRestrictionsFilter();
  buildGenresFilter();
  wireEvents();
  renderGrid();
})();
