(function () {
  "use strict";

  const data = window.METIERS_DATA;
  if (!data) {
    document.body.innerHTML =
      "<p style='padding:2rem;color:#8b3a3a'>Erreur : metiers.js introuvable. " +
      "Lance <code>python pdf_metiers_to_json.py</code> dans le dossier du site.</p>";
    return;
  }

  function normalize(s) {
    return (s || "").toString().normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function slugify(s) {
    return normalize(s).replace(/['']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") e.className = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function") e.addEventListener(k.slice(2), attrs[k]);
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
  function compareFR(a, b) { return a.localeCompare(b, "fr", { sensitivity: "base" }); }

  // Cross-linking : compétences cliquables vers competences.html
  const competencesByKey = {};
  if (window.COMPETENCES_DATA && window.COMPETENCES_DATA.competences) {
    for (const c of window.COMPETENCES_DATA.competences) {
      competencesByKey[normalize(c.nom)] = c.nom;
    }
  }
  function lookupCompetence(nom) {
    const k1 = normalize(nom);
    if (competencesByKey[k1]) return competencesByKey[k1];
    const sansParen = nom.replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (sansParen !== nom) {
      const k2 = normalize(sansParen);
      if (competencesByKey[k2]) return competencesByKey[k2];
      for (const k in competencesByKey) {
        if (k.startsWith(k2 + " (")) return competencesByKey[k];
      }
    }
    return null;
  }
  function renderCompetenceLink(nom) {
    const found = lookupCompetence(nom);
    if (found) {
      return el("a", {
        class: "specialisation-link",
        href: "competences.html#" + slugify(found),
        title: "Ouvrir la compétence : " + found,
      }, nom);
    }
    return document.createTextNode(nom);
  }

  const state = { search: "", categories: new Set() };

  function matchMetier(m) {
    if (state.categories.size > 0) {
      const cats = m.categories || [];
      if (!cats.some(c => state.categories.has(c))) return false;
    }
    if (state.search) {
      const q = normalize(state.search);
      const hay = normalize([
        m.nom,
        m.description || "",
        (m.competences_base || []).join(" "),
        (m.competences_avancees || []).join(" "),
        (m.categories || []).join(" "),
        m.supplement_origine || "",
      ].join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function renderCard(m) {
    const cats = m.categories || [];
    const nbComp = (m.competences_base || []).length + (m.competences_avancees || []).length;
    return el("li", {
      class: "ecole-card",
      tabindex: "0",
      role: "button",
      "aria-label": "Voir le détail du métier " + m.nom,
      onclick: () => openDetail(m),
      onkeydown: (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openDetail(m); } },
    }, [
      el("h2", null, m.nom),
      el("p", { class: "arme" }, nbComp + " compétences"),
      el("div", { class: "badges" }, cats.map(c => el("span", { class: "badge nation" }, c.replace("Métiers ", "")))),
    ]);
  }

  function renderGrid() {
    const grid = document.getElementById("metiers-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");
    const filtered = data.metiers.filter(matchMetier).sort((a, b) => compareFR(a.nom, b.nom));
    grid.innerHTML = "";
    if (!filtered.length) {
      empty.hidden = false;
      count.textContent = "0 métier";
    } else {
      empty.hidden = true;
      count.textContent = filtered.length + " métier" + (filtered.length > 1 ? "s" : "") +
        " sur " + data.metiers.length;
      const frag = document.createDocumentFragment();
      for (const m of filtered) frag.appendChild(renderCard(m));
      grid.appendChild(frag);
    }
    updateActiveFilterCount();
  }

  function updateActiveFilterCount() {
    const t = state.categories.size + (state.search ? 1 : 0);
    const counter = document.getElementById("filters-active-count");
    if (t > 0) { counter.textContent = t; counter.hidden = false; }
    else counter.hidden = true;
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
      el("ul", { class: "competence-list" }, items.map(c => el("li", null, [renderCompetenceLink(c)]))),
    ]);
  }

  function openDetail(m) {
    history.replaceState(null, "", "#" + slugify(m.nom));
    const container = document.getElementById("metier-detail-content");
    container.innerHTML = "";
    const cats = m.categories || [];
    container.appendChild(
      el("div", { class: "detail-header" }, [
        el("h2", { id: "metier-detail-title" }, m.nom),
        el("div", { class: "badges" }, cats.map(c => el("span", { class: "badge nation" }, c))),
      ])
    );

    if (m.description) {
      container.appendChild(
        el("div", { class: "detail-section" }, [
          el("h3", null, "Description"),
          el("p", { class: "description-paragraph" }, m.description),
        ])
      );
    }

    // Méta-infos
    const meta = [];
    if (m.supplement_origine) meta.push(["Supplément d'origine", m.supplement_origine]);
    if (m.reputation) meta.push(["Réputation", m.reputation]);
    if (meta.length) {
      const dl = el("dl", { class: "detail-meta" });
      for (const [k, v] of meta) {
        dl.appendChild(el("dt", null, k + " :"));
        dl.appendChild(el("dd", null, v));
      }
      container.appendChild(el("div", { class: "detail-section" }, dl));
    }

    // Compétences (cliquables)
    container.appendChild(
      el("div", { class: "detail-section" }, [
        el("h3", null, "Compétences accessibles"),
        renderCompetenceList("Compétences de base", m.competences_base, "competence-base"),
        renderCompetenceList("Compétences avancées", m.competences_avancees, "competence-avancee"),
      ])
    );

    const dialog = document.getElementById("metier-detail");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    dialog.scrollTop = 0;
  }

  function closeDetail() {
    const dialog = document.getElementById("metier-detail");
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    history.replaceState(null, "", location.pathname);
  }

  function buildCategoriesFilter() {
    const container = document.getElementById("filter-categories");
    const counts = {};
    for (const m of data.metiers) {
      for (const c of (m.categories || [])) counts[c] = (counts[c] || 0) + 1;
    }
    const order = (data._meta && data._meta.categories) || Object.keys(counts).sort(compareFR);
    for (const cat of order) {
      if (!counts[cat]) continue;
      const cb = el("input", {
        type: "checkbox", value: cat,
        onchange: (e) => {
          if (e.target.checked) state.categories.add(cat);
          else state.categories.delete(cat);
          renderGrid();
        },
      });
      const shortLabel = cat.replace("Métiers ", "");
      container.appendChild(
        el("label", null, [
          cb,
          el("span", null, shortLabel),
          el("span", { class: "count" }, "(" + counts[cat] + ")"),
        ])
      );
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
    document.getElementById("metier-detail-close").addEventListener("click", closeDetail);
    const dialog = document.getElementById("metier-detail");
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) closeDetail();
    });
    const toggle = document.getElementById("filters-toggle");
    const filters = document.getElementById("filters");
    toggle.addEventListener("click", () => {
      const open = filters.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function openFromHash() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash) return;
    const target = data.metiers.find(m => slugify(m.nom) === hash);
    if (target) openDetail(target);
  }

  buildCategoriesFilter();
  wireEvents();
  renderGrid();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
