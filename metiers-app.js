(function () {
  "use strict";
  const data = window.METIERS_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem;color:#8b3a3a'>Erreur : metiers.js introuvable.</p>";
    return;
  }

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

  const RESTRICTION_LABELS = {
    nationalite: "Restriction de Nationalité",
    societe: "Restriction de Société",
    aucune: "Sans restrictions",
  };

  const state = { search: "", categories: new Set(), restrictions: new Set() };

  function matchMetier(m) {
    if (state.categories.size > 0) {
      const cats = m.categories || [];
      if (!cats.some(c => state.categories.has(c))) return false;
    }
    if (state.restrictions.size > 0) {
      const r = m.restriction_type || "aucune";
      if (!state.restrictions.has(r)) return false;
    }
    if (state.search) {
      const q = normalize(state.search);
      const hay = normalize([m.nom, m.description || "", (m.competences_base || []).join(" "),
        (m.competences_avancees || []).join(" "), (m.categories || []).join(" ")].join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function renderCard(m) {
    const cats = m.categories || [];
    const nbComp = (m.competences_base || []).length + (m.competences_avancees || []).length;
    const r = m.restriction_type || "aucune";
    const restrictionBadge = r === "nationalite"
      ? el("span", { class: "badge restriction-nationalite", title: m.restriction_texte || "" }, "🌍 Nationalité")
      : r === "societe"
        ? el("span", { class: "badge restriction-societe", title: m.restriction_texte || "" }, "🛡 Société")
        : null;
    return el("li", {
      class: "ecole-card", tabindex: "0", role: "button",
      "aria-label": "Voir le détail du métier " + m.nom,
      onclick: () => window.openItem("metier", m, { resetStack: true }),
      onkeydown: (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); window.openItem("metier", m, { resetStack: true }); } },
    }, [
      el("h2", null, m.nom),
      el("p", { class: "arme" }, nbComp + " compétences"),
      el("div", { class: "badges" }, [
        ...cats.map(c => el("span", { class: "badge nation" }, c.replace("Métiers ", ""))),
        restrictionBadge,
      ]),
    ]);
  }

  function renderGrid() {
    const grid = document.getElementById("metiers-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");
    const filtered = data.metiers.filter(matchMetier).sort((a, b) => compareFR(a.nom, b.nom));
    grid.innerHTML = "";
    if (!filtered.length) { empty.hidden = false; count.textContent = "0 métier"; }
    else {
      empty.hidden = true;
      count.textContent = filtered.length + " métier" + (filtered.length > 1 ? "s" : "") + " sur " + data.metiers.length;
      const frag = document.createDocumentFragment();
      for (const m of filtered) frag.appendChild(renderCard(m));
      grid.appendChild(frag);
    }
    const t = state.categories.size + state.restrictions.size + (state.search ? 1 : 0);
    const counter = document.getElementById("filters-active-count");
    if (t > 0) { counter.textContent = t; counter.hidden = false; } else counter.hidden = true;
  }

  function buildCategoriesFilter() {
    const container = document.getElementById("filter-categories");
    const counts = {};
    for (const m of data.metiers) for (const c of (m.categories || [])) counts[c] = (counts[c] || 0) + 1;
    const order = (data._meta && data._meta.categories) || Object.keys(counts).sort(compareFR);
    for (const cat of order) {
      if (!counts[cat]) continue;
      const cb = el("input", {
        type: "checkbox", value: cat,
        onchange: (e) => {
          if (e.target.checked) state.categories.add(cat); else state.categories.delete(cat);
          renderGrid();
        },
      });
      const shortLabel = cat.replace("Métiers ", "");
      container.appendChild(el("label", null, [
        cb, el("span", null, shortLabel),
        el("span", { class: "count" }, "(" + counts[cat] + ")"),
      ]));
    }
  }

  function buildRestrictionsFilter() {
    const container = document.getElementById("filter-restrictions");
    const counts = {};
    for (const m of data.metiers) {
      const r = m.restriction_type || "aucune";
      counts[r] = (counts[r] || 0) + 1;
    }
    // Ordre voulu : Nationalité, Société, Sans restrictions
    for (const r of ["nationalite", "societe", "aucune"]) {
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

  function wireEvents() {
    const search = document.getElementById("search");
    let timer = null;
    search.addEventListener("input", (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => { state.search = e.target.value.trim(); renderGrid(); }, 120);
    });
    document.getElementById("reset-filters").addEventListener("click", () => {
      state.search = ""; state.categories.clear(); state.restrictions.clear();
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

  buildCategoriesFilter();
  buildRestrictionsFilter();
  wireEvents();
  renderGrid();
})();
