(function () {
  "use strict";
  const rawData = window.COMPETENCES_DATA;
  if (!rawData) {
    document.body.innerHTML = "<p style='padding:2rem;color:#8b3a3a'>Erreur : competences.js introuvable.</p>";
    return;
  }

  // Filtrage par page : 'competences' = toutes sauf artisanales,
  // 'competences-artisanales' = uniquement les artisanales.
  const pageId = (document.body && document.body.dataset && document.body.dataset.page) || "competences";
  const isArtisanalesPage = pageId === "competences-artisanales";
  const isArtisanale = (c) => /artisanal/i.test(c.categorie || "");
  const filteredCompetences = rawData.competences.filter(c =>
    isArtisanalesPage ? isArtisanale(c) : !isArtisanale(c)
  );
  const filteredCategories = (rawData._meta && rawData._meta.categories || [])
    .filter(cat => isArtisanalesPage ? /artisanal/i.test(cat) : !/artisanal/i.test(cat));
  const data = {
    _meta: { ...(rawData._meta || {}), categories: filteredCategories },
    competences: filteredCompetences,
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
      for (const c of children) {
        if (c == null) continue;
        e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      }
    }
    return e;
  }
  function compareFR(a, b) { return a.localeCompare(b, "fr", { sensitivity: "base" }); }

  const state = {
    search: "",
    categories: new Set(),
    mes_spe: null,   // null | 'base' | 'avancee' | 'toutes'
  };

  // Met en cache les sets de compétences issues des spé. Recalculé au besoin.
  let _mesCompCache = null;
  function getMesCompSets() {
    if (_mesCompCache) return _mesCompCache;
    if (!window.CreationState) return { base: new Set(), avancee: new Set() };
    _mesCompCache = window.CreationState.getMesCompetencesSets();
    return _mesCompCache;
  }
  function invaliderMesCompCache() { _mesCompCache = null; }

  function matchCompetence(c) {
    if (state.categories.size > 0 && !state.categories.has(c.categorie)) return false;
    // Filtre 'Issues de mes spécialités'
    if (state.mes_spe) {
      const sets = getMesCompSets();
      const inBase = sets.base.has(c.nom);
      const inAv = sets.avancee.has(c.nom);
      if (state.mes_spe === "base"    && !inBase) return false;
      if (state.mes_spe === "avancee" && !inAv) return false;
      if (state.mes_spe === "toutes"  && !(inBase || inAv)) return false;
    }
    if (state.search) {
      const q = normalize(state.search);
      const hay = normalize([
        c.nom, c.description || "",
        (c.donnent_acces_base || []).join(" "),
        (c.donnent_acces_avancee || []).join(" "),
        (c.variantes || []).map(v => v.nom + " " + (v.description || "")).join(" "),
      ].join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function renderCard(c) {
    const nbBase = (c.donnent_acces_base || []).length;
    const nbAv = (c.donnent_acces_avancee || []).length;
    const total = nbBase + nbAv;
    const catShort = (c.categorie || "Autre").replace("Compétences ", "").toUpperCase();
    return el("li", {
      class: "ecole-card",
      tabindex: "0",
      role: "button",
      "aria-label": "Voir le détail de la compétence " + c.nom,
      onclick: () => window.openItem("competence", c, { resetStack: true }),
      onkeydown: (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); window.openItem("competence", c, { resetStack: true }); } },
    }, [
      el("h2", null, c.nom),
      el("p", { class: "arme" }, total + " spécialisation" + (total > 1 ? "s" : "") +
        " (" + nbBase + " base / " + nbAv + " avancée)"),
      el("div", { class: "badges" }, [el("span", { class: "badge nation" }, catShort)]),
    ]);
  }

  function renderGrid() {
    const grid = document.getElementById("competences-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");
    const filtered = data.competences.filter(matchCompetence).sort((a, b) => compareFR(a.nom, b.nom));
    grid.innerHTML = "";
    if (!filtered.length) {
      empty.hidden = false;
      count.textContent = "0 compétence";
    } else {
      empty.hidden = true;
      count.textContent = filtered.length + " compétence" + (filtered.length > 1 ? "s" : "") + " sur " + data.competences.length;
      const frag = document.createDocumentFragment();
      for (const c of filtered) frag.appendChild(renderCard(c));
      grid.appendChild(frag);
    }
    const total = state.categories.size + (state.search ? 1 : 0) + (state.mes_spe ? 1 : 0);
    const counter = document.getElementById("filters-active-count");
    if (total > 0) { counter.textContent = total; counter.hidden = false; } else counter.hidden = true;
  }

  // Filtre 'Issues de mes spécialités' (utilise CreationState)
  function buildMesSpeFilter() {
    const container = document.getElementById("filter-mes-spe");
    if (!container) return;
    container.innerHTML = "";
    if (!window.CreationState) {
      container.appendChild(el("p", { class: "filter-empty-note" },
        "Filtre disponible une fois la page Création de personnage utilisée."));
      return;
    }
    const sets = getMesCompSets();
    const nbBase = sets.base.size;
    const nbAv = sets.avancee.size;
    if (nbBase === 0 && nbAv === 0) {
      container.appendChild(el("p", { class: "filter-empty-note" },
        "Ajoutez des Métiers ou Entraînements à votre création pour activer ce filtre."));
      return;
    }
    const options = [
      { key: "base",    label: "De base (" + nbBase + ")" },
      { key: "avancee", label: "Avancées (" + nbAv + ")" },
      { key: "toutes",  label: "Toutes les miennes (" + (nbBase + nbAv) + ")" },
    ];
    options.forEach(opt => {
      const cb = el("input", {
        type: "radio", name: "mes-spe", value: opt.key,
        checked: state.mes_spe === opt.key,
        onchange: (e) => {
          if (e.target.checked) {
            state.mes_spe = opt.key;
            renderGrid();
          }
        },
      });
      container.appendChild(el("label", null, [
        cb, el("span", null, opt.label),
      ]));
    });
    // Bouton 'Aucun filtre'
    container.appendChild(el("button", {
      class: "btn-mes-spe-clear",
      type: "button",
      onclick: () => {
        state.mes_spe = null;
        document.querySelectorAll('input[name="mes-spe"]').forEach(i => i.checked = false);
        renderGrid();
      },
    }, "× Désactiver"));
  }

  function buildCategoriesFilter() {
    const container = document.getElementById("filter-categories");
    if (!container) return;
    const counts = {};
    for (const c of data.competences) {
      const k = c.categorie || "Sans catégorie";
      counts[k] = (counts[k] || 0) + 1;
    }
    const order = (data._meta && data._meta.categories) || Object.keys(counts).sort(compareFR);
    for (const cat of order) {
      const cb = el("input", {
        type: "checkbox", value: cat,
        onchange: (e) => {
          if (e.target.checked) state.categories.add(cat); else state.categories.delete(cat);
          renderGrid();
        },
      });
      const shortLabel = cat.replace("Compétences ", "");
      container.appendChild(el("label", null, [
        cb, el("span", null, shortLabel),
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
      state.search = ""; state.categories.clear(); state.mes_spe = null;
      document.getElementById("search").value = "";
      document.querySelectorAll(".checkbox-list input[type=checkbox]").forEach(c => (c.checked = false));
      document.querySelectorAll('input[name="mes-spe"]').forEach(i => i.checked = false);
      renderGrid();
    });
    // Si la création de personnage change (depuis cette page ou un autre onglet),
    // on invalide le cache et on rebuild le filtre 'Mes spé' (le compte change).
    window.addEventListener("creation-state-changed", () => {
      invaliderMesCompCache();
      buildMesSpeFilter();
      renderGrid();
    });
    window.addEventListener("storage", (e) => {
      if (e.key === (window.CreationState && window.CreationState.STORAGE_KEY)) {
        invaliderMesCompCache();
        buildMesSpeFilter();
        renderGrid();
      }
    });
    const toggle = document.getElementById("filters-toggle");
    const filters = document.getElementById("filters");
    toggle.addEventListener("click", () => {
      const open = filters.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  buildCategoriesFilter();
  buildMesSpeFilter();
  wireEvents();
  renderGrid();
})();
