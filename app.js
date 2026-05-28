(function () {
  "use strict";

  const data = window.ECOLES_DATA;
  if (!data) {
    document.body.innerHTML =
      "<p style='padding:2rem;color:#8b3a3a'>Erreur : ecoles.js introuvable. " +
      "Lance <code>python csv_to_json.py</code> dans le dossier du site.</p>";
    return;
  }

  const ORIGINE_LABELS = {
    officielle: "Officielle",
    combat_reclassee: "Combat reclassée",
    seconde_edition_adaptee: "Seconde édition",
  };
  const RESTRICTION_LABELS = {
    libre: "Libre",
    limitee: "Accès limité",
    interdite: "Interdite",
    inconnue: "Non documentée",
  };
  const GENRE_LABELS = {
    femmes: "Réservée aux femmes",
    hommes: "Réservée aux hommes",
  };
  const NIVEAU_LABELS = {
    apprenti: "Apprenti",
    compagnon: "Compagnon",
    maitre: "Maître",
  };

  const state = {
    search: "",
    nations: new Set(),
    armes: new Set(),
    origines: new Set(),
    restrictions: new Set(),
    genres: new Set(),
  };

  // ===== Helpers =====

  function normalize(s) {
    return (s || "")
      .toString()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  }

  function slugify(s) {
    return normalize(s).replace(/['']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  // Cross-linking : index des spécialisations (entraînements + métiers)
  const specialisationsIndex = {};
  if (window.ENTRAINEMENTS_DATA && window.ENTRAINEMENTS_DATA.entrainements) {
    for (const e of window.ENTRAINEMENTS_DATA.entrainements) {
      specialisationsIndex[normalize(e.nom)] = { nom: e.nom, page: "entrainements" };
    }
  }
  if (window.METIERS_DATA && window.METIERS_DATA.metiers) {
    for (const m of window.METIERS_DATA.metiers) {
      const k = normalize(m.nom);
      if (!specialisationsIndex[k]) {
        specialisationsIndex[k] = { nom: m.nom, page: "metiers" };
      }
    }
  }
  function renderSpecialisationLink(nom) {
    const k = normalize(nom);
    const found = specialisationsIndex[k];
    if (found) {
      return el("a", {
        class: "specialisation-link",
        href: found.page + ".html#" + slugify(found.nom),
        title: "Ouvrir : " + found.nom + " (" + found.page + ")",
      }, nom);
    }
    return document.createTextNode(nom);
  }
  function renderSpecialisationsInline(noms) {
    const out = [];
    noms.forEach((nom, i) => {
      if (i > 0) out.push(document.createTextNode(", "));
      out.push(renderSpecialisationLink(nom));
    });
    return out;
  }

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") e.className = attrs[k];
        else if (k === "dataset") Object.assign(e.dataset, attrs[k]);
        else if (k.startsWith("on") && typeof attrs[k] === "function")
          e.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] === true) e.setAttribute(k, "");
        else if (attrs[k] != null && attrs[k] !== false)
          e.setAttribute(k, attrs[k]);
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

  // ===== Filtrage =====

  function matchEcole(ecole) {
    if (state.nations.size > 0) {
      const hasNation = ecole.nations.some((n) => state.nations.has(n));
      if (!hasNation) return false;
    }
    if (state.armes.size > 0) {
      const cats = ecole.armes_categories || [];
      const hasArme = cats.some((c) => state.armes.has(c));
      if (!hasArme) return false;
    }
    if (state.origines.size > 0 && !state.origines.has(ecole.origine)) {
      return false;
    }
    if (state.restrictions.size > 0 && !state.restrictions.has(ecole.restriction_creation)) {
      return false;
    }
    if (state.genres.size > 0 && !state.genres.has(ecole.genre_restriction)) {
      return false;
    }
    if (state.search) {
      const q = normalize(state.search);
      const haystack = normalize(
        [
          ecole.nom,
          ecole.arme,
          ecole.arme_display || "",
          (ecole.armes_categories || []).join(" "),
          ecole.description_courte,
          ecole.specialisations.join(" "),
          ecole.nations.join(" "),
          ecole.techniques_combat
            .map((t) => t.nom_base + " " + (t.variante || ""))
            .join(" "),
        ].join(" ")
      );
      if (!haystack.includes(q)) return false;
    }
    return true;
  }

  function getFiltered() {
    return data.ecoles
      .filter(matchEcole)
      .sort((a, b) => compareFR(a.nom, b.nom));
  }

  // ===== Rendu cartes =====

  function renderCard(ecole) {
    const nationsBadges = ecole.nations.map((n) =>
      el("span", { class: "badge nation" }, n)
    );
    const enrichieBadge = ecole.enrichie
      ? el(
          "span",
          { class: "badge enrichie", title: "Fiche complète disponible" },
          "📖 Fiche complète"
        )
      : null;
    const restrictionBadge =
      ecole.restriction_creation === "interdite"
        ? el(
            "span",
            { class: "badge restriction-interdite", title: "Interdite à la création de personnage" },
            "⛔ Interdite à la création"
          )
        : ecole.restriction_creation === "limitee"
        ? el(
            "span",
            { class: "badge restriction-limitee", title: "Accès limité à la création (autorisation MJ requise)" },
            "⚠ Accès limité"
          )
        : null;
    const genreBadge =
      ecole.genre_restriction === "femmes"
        ? el(
            "span",
            { class: "badge genre-femmes", title: "École réservée aux personnages féminins" },
            "♀ Réservée aux femmes"
          )
        : ecole.genre_restriction === "hommes"
        ? el(
            "span",
            { class: "badge genre-hommes", title: "École réservée aux personnages masculins" },
            "♂ Réservée aux hommes"
          )
        : null;
    const card = el(
      "li",
      {
        class: "ecole-card" + (ecole.enrichie ? " is-enrichie" : ""),
        tabindex: "0",
        role: "button",
        "aria-label": "Voir le détail de l'école " + ecole.nom,
        onclick: () => openDetail(ecole),
        onkeydown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openDetail(ecole);
          }
        },
      },
      [
        el("h2", null, ecole.nom),
        el("p", { class: "arme" }, ecole.arme_display || ecole.arme || "—"),
        el("div", { class: "badges" }, [
          ...nationsBadges,
          el(
            "span",
            { class: "badge origine-" + ecole.origine },
            ORIGINE_LABELS[ecole.origine] || ecole.origine
          ),
          restrictionBadge,
          genreBadge,
          enrichieBadge,
        ]),
      ]
    );
    return card;
  }

  function renderGrid() {
    const grid = document.getElementById("ecoles-grid");
    const empty = document.getElementById("empty-state");
    const count = document.getElementById("results-count");
    const filtered = getFiltered();

    grid.innerHTML = "";
    if (filtered.length === 0) {
      empty.hidden = false;
      count.textContent = "0 école";
    } else {
      empty.hidden = true;
      count.textContent =
        filtered.length +
        " école" +
        (filtered.length > 1 ? "s" : "") +
        " sur " +
        data.ecoles.length;
      const frag = document.createDocumentFragment();
      for (const e of filtered) frag.appendChild(renderCard(e));
      grid.appendChild(frag);
    }

    updateActiveFilterCount();
  }

  function updateActiveFilterCount() {
    const total =
      state.nations.size +
      state.armes.size +
      state.origines.size +
      state.restrictions.size +
      state.genres.size +
      (state.search ? 1 : 0);
    const counter = document.getElementById("filters-active-count");
    if (total > 0) {
      counter.textContent = total;
      counter.hidden = false;
    } else {
      counter.hidden = true;
    }
  }

  // ===== Modal détail =====

  function renderTechniqueTable(rows) {
    if (!rows || !rows.length) return null;
    const table = el("table", { class: "technique-table" });
    const tbody = el("tbody");
    rows.forEach((row, rowIdx) => {
      const tr = el("tr");
      row.forEach((cell) => {
        const tag = rowIdx === 0 ? "th" : "td";
        tr.appendChild(el(tag, null, cell));
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  function renderTechnique(t) {
    const techDef = t.ref ? data.techniques[t.ref] : null;
    const title = el("div", { class: "technique-nom" }, [
      t.nom_base,
      t.variante
        ? el("span", { class: "technique-variante" }, " (" + t.variante + ")")
        : null,
    ]);
    let body;
    if (techDef) {
      const paras = (techDef.description || "").split(/\n{2,}/).filter(Boolean);
      body = el("div", { class: "technique-desc" });
      paras.forEach((p) => body.appendChild(el("p", null, p)));
      (techDef.tables || []).forEach((tbl) => {
        const table = renderTechniqueTable(tbl);
        if (table) body.appendChild(table);
      });
    } else {
      body = el(
        "p",
        { class: "technique-missing" },
        "Description non disponible (technique absente du recueil corrigé)."
      );
    }
    return el("div", { class: "technique-item" }, [title, body]);
  }

  function renderAvantageCourt(label, texte) {
    return el("div", { class: "avantage-niveau" }, [
      el("span", { class: "niveau-label" }, label),
      texte
        ? el("p", null, texte)
        : el("p", { class: "avantage-vide" }, "(non renseigné)"),
    ]);
  }

  function renderHeader(ecole) {
    const restrictionBadge =
      ecole.restriction_creation === "interdite"
        ? el("span", { class: "badge restriction-interdite" }, "⛔ Interdite à la création")
        : ecole.restriction_creation === "limitee"
        ? el("span", { class: "badge restriction-limitee" }, "⚠ Accès limité")
        : null;
    const genreBadge =
      ecole.genre_restriction === "femmes"
        ? el("span", { class: "badge genre-femmes" }, "♀ Réservée aux femmes")
        : ecole.genre_restriction === "hommes"
        ? el("span", { class: "badge genre-hommes" }, "♂ Réservée aux hommes")
        : null;
    return el("div", { class: "detail-header" }, [
      el("h2", { id: "ecole-detail-title" }, ecole.nom),
      el("div", { class: "badges" }, [
        ...ecole.nations.map((n) => el("span", { class: "badge nation" }, n)),
        el(
          "span",
          { class: "badge origine-" + ecole.origine },
          ORIGINE_LABELS[ecole.origine] || ecole.origine
        ),
        restrictionBadge,
        genreBadge,
      ]),
    ]);
  }

  function renderTechniquesSection(ecole) {
    if (ecole.techniques_combat.length === 0) return null;
    const section = el("div", { class: "detail-section" }, [
      el("h3", null, "Techniques de combat"),
    ]);
    for (const t of ecole.techniques_combat) {
      section.appendChild(renderTechnique(t));
    }
    return section;
  }

  /* ----- Mode COMPACT (école non enrichie : CSV uniquement) ----- */

  function renderCompact(ecole, container) {
    container.appendChild(renderHeader(ecole));

    const meta = el("dl", { class: "detail-meta" }, [
      el("dt", null, "Arme :"),
      el("dd", null, ecole.arme_display || ecole.arme || "—"),
      el("dt", null, "Spécialisations :"),
      el("dd", null, ecole.specialisations.length ? renderSpecialisationsInline(ecole.specialisations) : "—"),
    ]);
    container.appendChild(el("div", { class: "detail-section" }, meta));

    if (ecole.description_courte) {
      container.appendChild(
        el("div", { class: "detail-section" }, [
          el("h3", null, "Description du style"),
          el("p", { class: "description-text" }, ecole.description_courte),
        ])
      );
    }

    const techSection = renderTechniquesSection(ecole);
    if (techSection) container.appendChild(techSection);

    const av = ecole.avantages_courts || {};
    container.appendChild(
      el("div", { class: "detail-section" }, [
        el("h3", null, "Avantages par niveau de maîtrise"),
        renderAvantageCourt("Apprenti", av.apprenti),
        renderAvantageCourt("Compagnon", av.compagnon),
        renderAvantageCourt("Maître", av.maitre),
      ])
    );
  }

  /* ----- Mode ENRICHI (PDF + docx) ----- */

  function renderEnrichi(ecole, container) {
    const d = ecole.details || {};

    container.appendChild(renderHeader(ecole));

    // (Note: reduction_xp conservée dans details mais non affichée — Guillaume ne fait pas jouer cette règle)

    // Encart d'appartenance (Guilde des Jennys, garde de l'Église…)
    if (d.appartenance_requise) {
      container.appendChild(
        el("div", { class: "detail-banner banner-appartenance" }, [
          el("strong", null, "Appartenance requise : "),
          el("span", null, d.appartenance_requise),
        ])
      );
    }

    // Description longue
    if (d.description_longue && d.description_longue.length) {
      container.appendChild(
        el("div", { class: "detail-section" }, [
          el("h3", null, "Description du style"),
          ...d.description_longue.map((p) =>
            el("p", { class: "description-paragraph" }, p)
          ),
        ])
      );
    }

    // Méta-infos en grille
    const metaEntries = [
      ["Arme(s) de prédilection", ecole.arme_display || ecole.arme],
      ["Catégorie(s) d'arme", (ecole.armes_categories || []).join(", ")],
      ["Spécialisations", ecole.specialisations.length ? renderSpecialisationsInline(ecole.specialisations) : ""],
      ["Origine", d.origine_texte || ecole.nations.join(", ")],
      ["Académies", d.academies],
      ["Homologation", d.homologation],
      ["Doyen", d.doyen],
      ["Insigne", d.insigne],
    ].filter(([_, v]) => v);

    if (metaEntries.length) {
      const dl = el("dl", { class: "detail-meta" });
      for (const [label, val] of metaEntries) {
        dl.appendChild(el("dt", null, label + " :"));
        dl.appendChild(el("dd", null, val));
      }
      container.appendChild(
        el("div", { class: "detail-section" }, [
          el("h3", null, "Informations"),
          dl,
        ])
      );
    }

    // Niveaux de maîtrise (fluff + règles)
    const niveaux = d.niveaux || {};
    if (Object.keys(niveaux).length) {
      const section = el("div", { class: "detail-section" }, [
        el("h3", null, "Niveaux de maîtrise"),
      ]);
      for (const key of ["apprenti", "compagnon", "maitre"]) {
        const niv = niveaux[key];
        if (!niv) continue;
        section.appendChild(
          el("div", { class: "niveau-bloc" }, [
            el("h4", { class: "niveau-titre" }, NIVEAU_LABELS[key]),
            niv.fluff
              ? el("p", { class: "niveau-fluff" }, niv.fluff)
              : null,
            niv.regles
              ? el("div", { class: "niveau-regles" }, [
                  el("span", { class: "niveau-regles-label" }, "Effet de jeu : "),
                  el("span", null, niv.regles),
                ])
              : null,
          ])
        );
      }
      container.appendChild(section);
    }

    // Techniques (avec descriptions du docx)
    const techSection = renderTechniquesSection(ecole);
    if (techSection) container.appendChild(techSection);
  }

  function openDetail(ecole) {
    const container = document.getElementById("ecole-detail-content");
    container.innerHTML = "";
    if (ecole.enrichie) renderEnrichi(ecole, container);
    else renderCompact(ecole, container);

    const dialog = document.getElementById("ecole-detail");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    dialog.scrollTop = 0;
  }

  function closeDetail() {
    const dialog = document.getElementById("ecole-detail");
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  // ===== Initialisation filtres =====

  function buildNationsFilter() {
    const container = document.getElementById("filter-nations");
    const counts = {};
    for (const e of data.ecoles) {
      for (const n of e.nations) counts[n] = (counts[n] || 0) + 1;
    }
    const nations = data._meta.nations_uniques || Object.keys(counts).sort(compareFR);
    for (const n of nations) {
      const cb = el("input", {
        type: "checkbox",
        value: n,
        onchange: (e) => {
          if (e.target.checked) state.nations.add(n);
          else state.nations.delete(n);
          renderGrid();
        },
      });
      container.appendChild(
        el("label", null, [
          cb,
          el("span", null, n),
          el("span", { class: "count" }, "(" + (counts[n] || 0) + ")"),
        ])
      );
    }
  }

  function buildArmesFilter() {
    const container = document.getElementById("filter-armes");
    if (!container) return;
    const counts = (data._meta && data._meta.repartition_armes) || {};
    const order = (data._meta && data._meta.armes_categories) || Object.keys(counts);
    for (const cat of order) {
      const count = counts[cat] || 0;
      if (!count) continue; // ne montre que les catégories utilisées par au moins 1 école
      const cb = el("input", {
        type: "checkbox",
        value: cat,
        onchange: (e) => {
          if (e.target.checked) state.armes.add(cat);
          else state.armes.delete(cat);
          renderGrid();
        },
      });
      container.appendChild(
        el("label", null, [
          cb,
          el("span", null, cat),
          el("span", { class: "count" }, "(" + count + ")"),
        ])
      );
    }
  }

  function buildOriginesFilter() {
    const container = document.getElementById("filter-origines");
    const counts = {};
    for (const e of data.ecoles) {
      counts[e.origine] = (counts[e.origine] || 0) + 1;
    }
    const origines = Object.keys(ORIGINE_LABELS);
    for (const o of origines) {
      const cb = el("input", {
        type: "checkbox",
        value: o,
        onchange: (e) => {
          if (e.target.checked) state.origines.add(o);
          else state.origines.delete(o);
          renderGrid();
        },
      });
      container.appendChild(
        el("label", null, [
          cb,
          el("span", null, ORIGINE_LABELS[o]),
          el("span", { class: "count" }, "(" + (counts[o] || 0) + ")"),
        ])
      );
    }
  }

  function buildRestrictionsFilter() {
    const container = document.getElementById("filter-restrictions");
    const counts = {};
    for (const e of data.ecoles) {
      counts[e.restriction_creation] = (counts[e.restriction_creation] || 0) + 1;
    }
    const restrictions = Object.keys(RESTRICTION_LABELS);
    for (const r of restrictions) {
      if (!counts[r]) continue;  // Ne montre que les restrictions présentes
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
          el("span", { class: "count" }, "(" + (counts[r] || 0) + ")"),
        ])
      );
    }
  }

  function buildGenresFilter() {
    const container = document.getElementById("filter-genres");
    const counts = {};
    for (const e of data.ecoles) {
      if (e.genre_restriction) {
        counts[e.genre_restriction] = (counts[e.genre_restriction] || 0) + 1;
      }
    }
    if (Object.keys(counts).length === 0) {
      container.parentElement.style.display = "none";
      return;
    }
    for (const g of Object.keys(GENRE_LABELS)) {
      if (!counts[g]) continue;
      const cb = el("input", {
        type: "checkbox",
        value: g,
        onchange: (e) => {
          if (e.target.checked) state.genres.add(g);
          else state.genres.delete(g);
          renderGrid();
        },
      });
      container.appendChild(
        el("label", null, [
          cb,
          el("span", null, GENRE_LABELS[g]),
          el("span", { class: "count" }, "(" + counts[g] + ")"),
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
      state.nations.clear();
      state.armes.clear();
      state.origines.clear();
      state.restrictions.clear();
      state.genres.clear();
      document.getElementById("search").value = "";
      document
        .querySelectorAll(".checkbox-list input[type=checkbox]")
        .forEach((c) => (c.checked = false));
      renderGrid();
    });

    document
      .getElementById("ecole-detail-close")
      .addEventListener("click", closeDetail);

    const dialog = document.getElementById("ecole-detail");
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) closeDetail();
    });

    const toggle = document.getElementById("filters-toggle");
    const filters = document.getElementById("filters");
    toggle.addEventListener("click", () => {
      const open = filters.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ===== Boot =====

  buildNationsFilter();
  buildArmesFilter();
  buildOriginesFilter();
  buildRestrictionsFilter();
  buildGenresFilter();
  wireEvents();
  renderGrid();
})();
