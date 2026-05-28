(function () {
  "use strict";

  const data = window.ENTRAINEMENTS_DATA;
  if (!data) {
    document.body.innerHTML =
      "<p style='padding:2rem;color:#8b3a3a'>Erreur : entrainements.js introuvable. " +
      "Lance <code>python pdf_entrainements_to_json.py</code> dans le dossier du site.</p>";
    return;
  }

  const RESTRICTION_LABELS = {
    libre: "Libre",
    limitee: "Accès limité",
  };

  const state = {
    search: "",
    restrictions: new Set(),
  };

  function normalize(s) {
    return (s || "").toString().normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") e.className = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function")
          e.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] === true) e.setAttribute(k, "");
        else if (attrs[k] != null && attrs[k] !== false) e.setAttribute(k, attrs[k]);
      }
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

  function compareFR(a, b) {
    return a.localeCompare(b, "fr", { sensitivity: "base" });
  }

  function getRestriction(entry) {
    const cat = (entry.categorie_creation || "").toLowerCase();
    if (cat.includes("limit")) return "limitee";
    return "libre";
  }

  function matchEntry(entry) {
    const r = getRestriction(entry);
    if (state.restrictions.size > 0 && !state.restrictions.has(r)) return false;
    if (state.search) {
      const q = normalize(state.search);
      const haystack = normalize(
        [
          entry.nom,
          entry.description,
          (entry.competences_base || []).join(" "),
          (entry.competences_avancees || []).join(" "),
        ].join(" ")
      );
      if (!haystack.includes(q)) return false;
    }
    return true;
  }

  function renderCard(entry) {
    const r = getRestriction(entry);
    const badges = [
      el("span", { class: "badge restriction-" + (r === "limitee" ? "limitee" : "libre") },
        r === "limitee" ? "⚠ Accès limité" : "Libre"),
    ];
    const nbCompetences = (entry.competences_base || []).length + (entry.competences_avancees || []).length;
    return el("li", {
      class: "ecole-card",
      tabindex: "0",
      role: "button",
      "aria-label": "Voir le détail de l'entraînement " + entry.nom,
      onclick: () => openDetail(entry),
      onkeydown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail(entry);
        }
      },
    }, [
      el("h2", null, entry.nom),
      el("p", { class: "arme" }, nbCompetences + " compétences"),
      el("div", { class: "badges" }, badges),
    ]);
  }

  function renderGrid() {
    const grid = document.getElementById("entrainements-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");
    const filtered = data.entrainements
      .filter(matchEntry)
      .sort((a, b) => compareFR(a.nom, b.nom));

    grid.innerHTML = "";
    if (filtered.length === 0) {
      empty.hidden = false;
      count.textContent = "0 entraînement";
    } else {
      empty.hidden = true;
      count.textContent = filtered.length + " entraînement" + (filtered.length > 1 ? "s" : "") +
        " sur " + data.entrainements.length;
      const frag = document.createDocumentFragment();
      for (const e of filtered) frag.appendChild(renderCard(e));
      grid.appendChild(frag);
    }
    updateActiveFilterCount();
  }

  function updateActiveFilterCount() {
    const total = state.restrictions.size + (state.search ? 1 : 0);
    const counter = document.getElementById("filters-active-count");
    if (total > 0) {
      counter.textContent = total;
      counter.hidden = false;
    } else {
      counter.hidden = true;
    }
  }

  function renderCompetenceList(label, items, cssClass) {
    if (!items || items.length === 0) {
      return el("div", { class: "competence-section " + cssClass }, [
        el("h4", null, label),
        el("p", { class: "avantage-vide" }, "Aucune"),
      ]);
    }
    return el("div", { class: "competence-section " + cssClass }, [
      el("h4", null, label),
      el("ul", { class: "competence-list" },
        items.map(c => el("li", null, c))
      ),
    ]);
  }

  function openDetail(entry) {
    const container = document.getElementById("entrainement-detail-content");
    container.innerHTML = "";
    const r = getRestriction(entry);
    const restrictionBadge = el("span",
      { class: "badge restriction-" + (r === "limitee" ? "limitee" : "libre") },
      r === "limitee" ? "⚠ Accès limité" : "Libre"
    );

    container.appendChild(
      el("div", { class: "detail-header" }, [
        el("h2", { id: "entrainement-detail-title" }, entry.nom),
        el("div", { class: "badges" }, [restrictionBadge]),
      ])
    );

    if (entry.description) {
      container.appendChild(
        el("div", { class: "detail-section" }, [
          el("h3", null, "Description"),
          el("p", { class: "description-paragraph" }, entry.description),
        ])
      );
    }

    container.appendChild(
      el("div", { class: "detail-section" }, [
        el("h3", null, "Compétences accessibles"),
        renderCompetenceList("Compétences de base", entry.competences_base, "competence-base"),
        renderCompetenceList("Compétences avancées", entry.competences_avancees, "competence-avancee"),
      ])
    );

    const dialog = document.getElementById("entrainement-detail");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    dialog.scrollTop = 0;
  }

  function closeDetail() {
    const dialog = document.getElementById("entrainement-detail");
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function buildRestrictionsFilter() {
    const container = document.getElementById("filter-restrictions");
    const counts = {};
    for (const e of data.entrainements) {
      const r = getRestriction(e);
      counts[r] = (counts[r] || 0) + 1;
    }
    for (const r of Object.keys(RESTRICTION_LABELS)) {
      if (!counts[r]) continue;
      const cb = el("input", {
        type: "checkbox",
        value: r,
        onchange: (e) => {
          if (e.target.checked) state.restrictions.add(r);
          else state.restrictions.delete(r);
          renderGrid();
        },
      });
      container.appendChild(
        el("label", null, [
          cb,
          el("span", null, RESTRICTION_LABELS[r]),
          el("span", { class: "count" }, "(" + counts[r] + ")"),
        ])
      );
    }
  }

  function wireEvents() {
    const search = document.getElementById("search");
    let timer = null;
    search.addEventListener("input", (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.search = e.target.value.trim();
        renderGrid();
      }, 120);
    });

    document.getElementById("reset-filters").addEventListener("click", () => {
      state.search = "";
      state.restrictions.clear();
      document.getElementById("search").value = "";
      document.querySelectorAll(".checkbox-list input[type=checkbox]").forEach(c => (c.checked = false));
      renderGrid();
    });

    document.getElementById("entrainement-detail-close").addEventListener("click", closeDetail);
    const dialog = document.getElementById("entrainement-detail");
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) closeDetail();
    });

    const toggle = document.getElementById("filters-toggle");
    const filters = document.getElementById("filters");
    toggle.addEventListener("click", () => {
      const open = filters.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  buildRestrictionsFilter();
  wireEvents();
  renderGrid();
})();
