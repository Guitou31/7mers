(function () {
  "use strict";

  const data = window.COMPETENCES_DATA;
  if (!data) {
    document.body.innerHTML =
      "<p style='padding:2rem;color:#8b3a3a'>Erreur : competences.js introuvable. " +
      "Lance <code>python pdf_competences_to_json.py</code> dans le dossier du site.</p>";
    return;
  }

  // Index global pour le cross-linking (compétence → spécialisation cliquable)
  // Cherche dans entrainements (et plus tard métiers).
  const entrainementsByNom = {};
  if (window.ENTRAINEMENTS_DATA && window.ENTRAINEMENTS_DATA.entrainements) {
    for (const e of window.ENTRAINEMENTS_DATA.entrainements) {
      entrainementsByNom[normalizeKey(e.nom)] = e.nom;
    }
  }

  function normalizeKey(s) {
    return (s || "").toString().normalize("NFKD")
      .replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  }

  function slugify(s) {
    return normalizeKey(s)
      .replace(/['']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
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

  // === Lookup d'une spécialisation : renvoie {url, label} ou null si non trouvée ===
  function lookupSpecialisation(nom) {
    const key = normalizeKey(nom);
    if (entrainementsByNom[key]) {
      return { url: "entrainements.html#" + slugify(entrainementsByNom[key]), label: entrainementsByNom[key] };
    }
    // Plus tard : chercher dans métiers
    return null;
  }

  // Rend une liste de spécialisations en éléments inline, avec liens cliquables si trouvés
  function renderSpecialisationsInline(noms) {
    const out = [];
    noms.forEach((nom, i) => {
      if (i > 0) out.push(document.createTextNode(", "));
      const found = lookupSpecialisation(nom);
      if (found) {
        out.push(el("a", { class: "specialisation-link", href: found.url, title: "Ouvrir " + found.label }, nom));
      } else {
        out.push(el("span", { class: "specialisation-text", title: "Spécialisation non encore référencée" }, nom));
      }
    });
    return out;
  }

  // === État + filtres ===
  const state = {
    search: "",
    categories: new Set(),
  };

  function matchCompetence(c) {
    if (state.categories.size > 0 && !state.categories.has(c.categorie)) return false;
    if (state.search) {
      const q = normalizeKey(state.search);
      const hay = normalizeKey([
        c.nom,
        c.description || "",
        (c.donnent_acces_base || []).join(" "),
        (c.donnent_acces_avancee || []).join(" "),
        (c.variantes || []).map(v => v.nom + " " + (v.description || "")).join(" "),
      ].join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  // === Rendu carte ===
  function renderCard(c) {
    const nbBase = (c.donnent_acces_base || []).length;
    const nbAv = (c.donnent_acces_avancee || []).length;
    const total = nbBase + nbAv;
    const catShort = (c.categorie || "Autre").replace("Compétences ", "");
    return el("li", {
      class: "ecole-card",
      tabindex: "0",
      role: "button",
      "aria-label": "Voir le détail de la compétence " + c.nom,
      onclick: () => openDetail(c),
      onkeydown: (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openDetail(c); }
      },
    }, [
      el("h2", null, c.nom),
      el("p", { class: "arme" }, total + " spécialisation" + (total > 1 ? "s" : "") +
        " (" + nbBase + " base / " + nbAv + " avancée)"),
      el("div", { class: "badges" }, [
        el("span", { class: "badge nation" }, catShort),
      ]),
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
      count.textContent = filtered.length + " compétence" + (filtered.length > 1 ? "s" : "") +
        " sur " + data.competences.length;
      const frag = document.createDocumentFragment();
      for (const c of filtered) frag.appendChild(renderCard(c));
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

  // === Modal détail ===
  function openDetail(c) {
    const container = document.getElementById("competence-detail-content");
    container.innerHTML = "";
    const catShort = (c.categorie || "Autre").replace("Compétences ", "");
    container.appendChild(
      el("div", { class: "detail-header" }, [
        el("h2", { id: "competence-detail-title" }, c.nom),
        el("div", { class: "badges" }, [el("span", { class: "badge nation" }, catShort)]),
      ])
    );

    if (c.description) {
      container.appendChild(
        el("div", { class: "detail-section" }, [
          el("h3", null, "Description"),
          el("p", { class: "description-paragraph" }, c.description),
        ])
      );
    }

    // Base
    const base = c.donnent_acces_base || [];
    container.appendChild(
      el("div", { class: "detail-section" }, [
        el("h3", null, "Spécialisations qui donnent Base"),
        base.length
          ? el("p", { class: "specialisations-line" }, renderSpecialisationsInline(base))
          : el("p", { class: "avantage-vide" }, "Aucune"),
      ])
    );

    // Avancée
    const av = c.donnent_acces_avancee || [];
    container.appendChild(
      el("div", { class: "detail-section" }, [
        el("h3", null, "Spécialisations qui donnent Avancée"),
        av.length
          ? el("p", { class: "specialisations-line" }, renderSpecialisationsInline(av))
          : el("p", { class: "avantage-vide" }, "Aucune"),
      ])
    );

    // Variantes
    if (c.variantes && c.variantes.length) {
      const section = el("div", { class: "detail-section" }, [
        el("h3", null, "Variantes / sous-compétences"),
      ]);
      for (const v of c.variantes) {
        section.appendChild(
          el("div", { class: "niveau-bloc" }, [
            el("h4", { class: "niveau-titre" }, v.nom),
            v.description ? el("p", { class: "niveau-fluff" }, v.description) : null,
          ])
        );
      }
      container.appendChild(section);
    }

    // Mise à jour URL hash
    history.replaceState(null, "", "#" + slugify(c.nom));
    const dialog = document.getElementById("competence-detail");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    dialog.scrollTop = 0;
  }

  function closeDetail() {
    const dialog = document.getElementById("competence-detail");
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    history.replaceState(null, "", location.pathname);
  }

  // === Init filtres ===
  function buildCategoriesFilter() {
    const container = document.getElementById("filter-categories");
    const counts = {};
    for (const c of data.competences) {
      const k = c.categorie || "Sans catégorie";
      counts[k] = (counts[k] || 0) + 1;
    }
    const order = (data._meta && data._meta.categories) || Object.keys(counts).sort(compareFR);
    for (const cat of order) {
      const cb = el("input", {
        type: "checkbox",
        value: cat,
        onchange: (e) => {
          if (e.target.checked) state.categories.add(cat);
          else state.categories.delete(cat);
          renderGrid();
        },
      });
      const shortLabel = cat.replace("Compétences ", "");
      container.appendChild(
        el("label", null, [
          cb,
          el("span", null, shortLabel),
          el("span", { class: "count" }, "(" + (counts[cat] || 0) + ")"),
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
      state.categories.clear();
      document.getElementById("search").value = "";
      document.querySelectorAll(".checkbox-list input[type=checkbox]").forEach(c => (c.checked = false));
      renderGrid();
    });

    document.getElementById("competence-detail-close").addEventListener("click", closeDetail);
    const dialog = document.getElementById("competence-detail");
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) closeDetail();
    });
    dialog.addEventListener("close", () => {
      history.replaceState(null, "", location.pathname);
    });

    const toggle = document.getElementById("filters-toggle");
    const filters = document.getElementById("filters");
    toggle.addEventListener("click", () => {
      const open = filters.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // === URL profondes : ouvre directement la compétence si #slug ===
  function openFromHash() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash) return;
    const target = data.competences.find(c => slugify(c.nom) === hash);
    if (target) openDetail(target);
  }

  buildCategoriesFilter();
  wireEvents();
  renderGrid();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
