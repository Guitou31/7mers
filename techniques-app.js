(function () {
  "use strict";

  // La base techniques vient de ecoles.js (window.ECOLES_DATA.techniques).
  const techniquesDB = (window.ECOLES_DATA && window.ECOLES_DATA.techniques) || null;
  if (!techniquesDB) {
    document.body.innerHTML = "<p style='padding:2rem;color:#8b3a3a'>Erreur : techniques (ecoles.js) introuvables.</p>";
    return;
  }
  // Construit un array trié par nom pour l'affichage en grille.
  const techniques = Object.values(techniquesDB).slice().sort((a, b) =>
    a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" }));

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

  const state = { search: "", categories: new Set() };

  function matchTechnique(t) {
    if (state.categories.size > 0 && !state.categories.has(t.categorie)) return false;
    if (state.search) {
      const q = normalize(state.search);
      const hay = normalize([
        t.nom, t.description || "",
        (t.ecoles_enseignant || []).join(" "),
        t.categorie || "",
      ].join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function shortCategorie(cat) {
    // Affiche la catégorie telle que définie (sentence case), sans tronquer ni uppercase.
    return cat || "Technique";
  }

  function renderCard(t) {
    const nbEcoles = (t.ecoles_enseignant || []).length;
    const catShort = shortCategorie(t.categorie);
    return el("li", {
      class: "ecole-card",
      tabindex: "0",
      role: "button",
      "aria-label": "Voir le détail de la technique " + t.nom,
      onclick: () => window.openItem("technique", t, { resetStack: true }),
      onkeydown: (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); window.openItem("technique", t, { resetStack: true }); } },
    }, [
      el("h2", null, t.nom),
      el("p", { class: "arme" }, nbEcoles + " école" + (nbEcoles > 1 ? "s" : "") + " enseignante" + (nbEcoles > 1 ? "s" : "")),
      el("div", { class: "badges" }, [el("span", { class: "badge nation" }, catShort)]),
    ]);
  }

  function renderGrid() {
    const grid = document.getElementById("techniques-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");
    const filtered = techniques.filter(matchTechnique);
    grid.innerHTML = "";
    if (!filtered.length) {
      empty.hidden = false;
      count.textContent = "0 technique";
    } else {
      empty.hidden = true;
      count.textContent = filtered.length + " technique" + (filtered.length > 1 ? "s" : "") + " sur " + techniques.length;
      const frag = document.createDocumentFragment();
      for (const t of filtered) frag.appendChild(renderCard(t));
      grid.appendChild(frag);
    }
    const total = state.categories.size + (state.search ? 1 : 0);
    const counter = document.getElementById("filters-active-count");
    if (total > 0) { counter.textContent = total; counter.hidden = false; } else counter.hidden = true;
  }

  function buildCategoriesFilter() {
    const container = document.getElementById("filter-categories");
    if (!container) return;
    const counts = {};
    for (const t of techniques) {
      const k = t.categorie || "Sans catégorie";
      counts[k] = (counts[k] || 0) + 1;
    }
    const order = Object.keys(counts).sort(compareFR);
    for (const cat of order) {
      const cb = el("input", {
        type: "checkbox", value: cat,
        onchange: (e) => {
          if (e.target.checked) state.categories.add(cat); else state.categories.delete(cat);
          renderGrid();
        },
      });
      container.appendChild(el("label", null, [
        cb, el("span", null, shortCategorie(cat)),
        el("span", { class: "count" }, "(" + (counts[cat] || 0) + ")"),
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
      state.search = ""; state.categories.clear();
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
  wireEvents();
  renderGrid();
})();
