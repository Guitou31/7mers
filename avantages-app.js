(function () {
  "use strict";
  const data = window.AVANTAGES_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem;color:#8b3a3a'>Erreur : avantages.js introuvable.</p>";
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
    only_v2: false,
    only_h: false,
    // Filtres liés à la Nation
    nation_filtre: null,   // null | "restriction" | "reduction" | "bloque"
  };

  // Récupère la Nation choisie à l'étape 1 de la création (si CreationState).
  function getNationCourante() {
    if (!window.CreationState) return null;
    const st = window.CreationState.load();
    return st.nation || null;
  }

  function matchAvantage(a) {
    if (state.categories.size > 0 && !state.categories.has(a.categorie)) return false;
    if (state.only_v2 && !a.v2) return false;
    if (state.only_h && !a.h_heroisme) return false;
    if (state.nation_filtre) {
      const nation = getNationCourante();
      if (!nation) return false; // pas de Nation choisie → ces filtres sont sans effet
      if (state.nation_filtre === "restriction") {
        // Avantages réservés à ma Nation
        if (a.type_lien !== "restriction" || a.nation_lien !== nation) return false;
      } else if (state.nation_filtre === "reduction") {
        // Avantages avec réduction pour ma Nation
        if (a.type_lien !== "reduction" || a.nation_lien !== nation) return false;
      } else if (state.nation_filtre === "bloque") {
        // Avantages restreints à une AUTRE Nation que la mienne
        if (a.type_lien !== "restriction" || a.nation_lien === nation) return false;
      }
    }
    if (state.search) {
      const q = normalize(state.search);
      const hay = normalize([
        a.nom, a.description || "", a.cout_raw || "",
        a.nation_lien || "",
      ].join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function renderBadges(a) {
    const badges = el("div", { class: "badges" });
    badges.appendChild(el("span", { class: "badge nation" },
      (a.categorie || "").toUpperCase()));
    if (a.v2) badges.appendChild(el("span", { class: "badge avant-badge-v2" }, "2ᵉ Éd."));
    if (a.h_heroisme) badges.appendChild(el("span", { class: "badge avant-badge-h" }, "(H)"));
    if (a.type_lien === "restriction") {
      badges.appendChild(el("span", { class: "badge avant-badge-restrict",
        title: "Réservé à " + (a.nation_lien || "") }, "→ " + (a.nation_lien || "")));
    } else if (a.type_lien === "reduction") {
      badges.appendChild(el("span", { class: "badge avant-badge-reduc",
        title: "Réduction pour " + (a.nation_lien || "") }, "↓ " + (a.nation_lien || "")));
    }
    return badges;
  }

  function renderCard(a) {
    return el("li", {
      class: "ecole-card avant-card",
      tabindex: "0",
      role: "button",
      "aria-label": "Voir le détail de l'avantage " + a.nom,
      onclick: () => ouvrirAvantage(a),
      onkeydown: (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ouvrirAvantage(a); } },
    }, [
      el("h2", null, a.nom),
      el("p", { class: "arme avant-cout" }, a.cout_raw + " PP"),
      renderBadges(a),
    ]);
  }

  function renderGrid() {
    const grid = document.getElementById("avantages-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");
    const filtered = data.avantages.filter(matchAvantage).sort((a, b) => compareFR(a.nom, b.nom));
    grid.innerHTML = "";
    if (!filtered.length) {
      empty.hidden = false;
      count.textContent = "0 avantage";
    } else {
      empty.hidden = true;
      count.textContent = filtered.length + " avantage" + (filtered.length > 1 ? "s" : "") +
        " sur " + data.avantages.length;
      const frag = document.createDocumentFragment();
      for (const a of filtered) frag.appendChild(renderCard(a));
      grid.appendChild(frag);
    }
    const total = state.categories.size + (state.search ? 1 : 0) +
                  (state.only_v2 ? 1 : 0) + (state.only_h ? 1 : 0) +
                  (state.nation_filtre ? 1 : 0);
    const counter = document.getElementById("filters-active-count");
    if (total > 0) { counter.textContent = total; counter.hidden = false; } else counter.hidden = true;
  }

  // ===== Modal détail d'avantage =====
  function ouvrirAvantage(a) {
    let dialog = document.getElementById("avantage-modal");
    if (!dialog) {
      dialog = el("dialog", { id: "avantage-modal", class: "ecole-detail cross-modal" }, [
        el("div", { class: "cross-modal-header" }, [
          el("button", {
            class: "ecole-detail-close",
            "aria-label": "Fermer",
            type: "button",
            onclick: () => dialog.close(),
          }, "×"),
        ]),
        el("div", { id: "avantage-modal-content" }),
      ]);
      document.body.appendChild(dialog);
      dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    }
    const content = document.getElementById("avantage-modal-content");
    content.innerHTML = "";
    content.appendChild(el("div", { class: "detail-header" }, [
      el("h2", null, a.nom),
      renderBadges(a),
    ]));

    // Coût
    content.appendChild(el("div", { class: "detail-section" }, [
      el("h3", null, "Coût"),
      el("p", { class: "description-paragraph avant-cout-detail" },
        [a.cout_raw, " PP"]),
    ]));

    // Lien à une Nation
    if (a.type_lien && a.nation_lien) {
      const phrase = a.type_lien === "restriction"
        ? ("Cet avantage est réservé aux personnages de la Nation " + a.nation_lien + ".")
        : ("Disponible pour tous, à coût réduit pour la Nation " + a.nation_lien + ".");
      content.appendChild(el("div", { class: "detail-section avant-section-nation" }, [
        el("h3", null, a.type_lien === "restriction" ? "Restriction de Nation" : "Réduction pour une Nation"),
        el("p", { class: "description-paragraph" }, phrase),
      ]));
    }

    // Description
    content.appendChild(el("div", { class: "detail-section" }, [
      el("h3", null, "Description"),
      el("p", { class: "description-paragraph" },
        a.description || "(à venir — voir le supplément V1)"),
    ]));

    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else dialog.setAttribute("open", "");
  }

  // ===== Filtres : catégories + nation =====
  function buildCategoriesFilter() {
    const container = document.getElementById("filter-categories");
    if (!container) return;
    const counts = {};
    for (const a of data.avantages) {
      const k = a.categorie || "Autres";
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
      container.appendChild(el("label", null, [
        cb, el("span", null, cat),
        el("span", { class: "count" }, "(" + (counts[cat] || 0) + ")"),
      ]));
    }
  }

  function buildNationFilter() {
    const container = document.getElementById("filter-nation");
    const info = document.getElementById("filter-nation-info");
    if (!container) return;
    const nation = getNationCourante();
    // Nettoie d'abord les anciennes options éventuelles
    container.querySelectorAll("label, button.btn-mes-spe-clear").forEach(e => e.remove());
    if (!nation) {
      info.textContent = "Filtres disponibles après avoir choisi une Nation à l'étape 1 de la Création de personnage.";
      return;
    }
    info.textContent = "Nation actuelle : " + nation;
    const nbRestrict = data.avantages.filter(a => a.type_lien === "restriction" && a.nation_lien === nation).length;
    const nbReduc   = data.avantages.filter(a => a.type_lien === "reduction"   && a.nation_lien === nation).length;
    const nbBloque  = data.avantages.filter(a => a.type_lien === "restriction" && a.nation_lien && a.nation_lien !== nation).length;
    const options = [
      { key: "restriction", label: "Réservés à ma Nation (" + nbRestrict + ")" },
      { key: "reduction",   label: "Réduction pour ma Nation (" + nbReduc + ")" },
      { key: "bloque",      label: "Bloqués (autre Nation) (" + nbBloque + ")" },
    ];
    options.forEach(opt => {
      const cb = el("input", {
        type: "radio", name: "nation-filtre", value: opt.key,
        checked: state.nation_filtre === opt.key,
        onchange: (e) => {
          if (e.target.checked) {
            state.nation_filtre = opt.key;
            renderGrid();
          }
        },
      });
      container.appendChild(el("label", null, [cb, el("span", null, opt.label)]));
    });
    container.appendChild(el("button", {
      class: "btn-mes-spe-clear",
      type: "button",
      onclick: () => {
        state.nation_filtre = null;
        document.querySelectorAll('input[name="nation-filtre"]').forEach(i => i.checked = false);
        renderGrid();
      },
    }, "× Désactiver"));
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
      state.categories.clear();
      state.only_v2 = false;
      state.only_h = false;
      state.nation_filtre = null;
      document.getElementById("search").value = "";
      document.querySelectorAll(".checkbox-list input[type=checkbox]").forEach(c => c.checked = false);
      document.querySelectorAll('input[name="nation-filtre"]').forEach(i => i.checked = false);
      renderGrid();
    });
    document.getElementById("filter-v2").addEventListener("change", (e) => {
      state.only_v2 = e.target.checked; renderGrid();
    });
    document.getElementById("filter-h").addEventListener("change", (e) => {
      state.only_h = e.target.checked; renderGrid();
    });
    const toggle = document.getElementById("filters-toggle");
    const filters = document.getElementById("filters");
    toggle.addEventListener("click", () => {
      const open = filters.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Quand la Nation change (depuis la page Création de personnage) →
    // on re-construit le filtre Nation et on re-render.
    window.addEventListener("creation-state-changed", () => {
      buildNationFilter();
      renderGrid();
    });
    window.addEventListener("storage", (e) => {
      if (e.key === (window.CreationState && window.CreationState.STORAGE_KEY)) {
        buildNationFilter();
        renderGrid();
      }
    });
  }

  buildCategoriesFilter();
  buildNationFilter();
  wireEvents();
  renderGrid();
})();
