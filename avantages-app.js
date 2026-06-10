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
    nation_cible: null,    // Nation sélectionnée dans le dropdown (toutes Nations)
    nation_filtre: null,   // null | "restriction" | "reduction" | "bloque"
  };

  // Récupère la Nation choisie à l'étape 1 de la création (si CreationState).
  function getNationCourante() {
    if (!window.CreationState) return null;
    const st = window.CreationState.load();
    return st.nation || null;
  }

  // Liste des Nations (et groupes spéciaux : Sorcier Porté, Mille Nations…)
  // réellement référencées par les avantages.
  function nationsDisponibles() {
    const set = new Set();
    data.avantages.forEach(a => nationsLiees(a).forEach(n => set.add(n)));
    return Array.from(set).sort(compareFR);
  }

  // Nation présélectionnée : celle de la création, avec mapping des alias
  // (Fuso → Cathay, Aragosta → Nations Pirates, etc.).
  function nationParDefaut() {
    const courante = getNationCourante();
    if (!courante) return null;
    const dispo = new Set(nationsDisponibles());
    if (dispo.has(courante)) return courante;
    if (window.CreationState && window.CreationState.nationsCandidatesEcoles) {
      const cands = window.CreationState.nationsCandidatesEcoles(courante);
      for (const c of cands) {
        if (dispo.has(c)) return c;
      }
    }
    return null;
  }

  function matchAvantage(a) {
    if (state.categories.size > 0 && !state.categories.has(a.categorie)) return false;
    if (state.only_v2 && !a.v2) return false;
    if (state.only_h && !a.h_heroisme) return false;
    if (state.nation_filtre && state.nation_cible) {
      const nation = state.nation_cible;
      const liees = nationsLiees(a);
      if (state.nation_filtre === "restriction") {
        // Avantages réservés à ma Nation
        if (a.type_lien !== "restriction" || !liees.includes(nation)) return false;
      } else if (state.nation_filtre === "reduction") {
        // Avantages avec réduction pour ma Nation
        if (a.type_lien !== "reduction" || !liees.includes(nation)) return false;
      } else if (state.nation_filtre === "bloque") {
        // Avantages restreints à une AUTRE Nation que la mienne
        if (a.type_lien !== "restriction" || liees.includes(nation)) return false;
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

  // Libellé de coût : pré-calculé par le parseur (cout_affiche), avec
  // fallback brut (suffixe ' PP' seulement si chiffre présent).
  function libelleCout(a) {
    if (a.cout_affiche) return a.cout_affiche;
    return /\d/.test(a.cout_raw) ? a.cout_raw + " PP" : a.cout_raw;
  }

  // Liste des Nations liées (gère les restrictions multi-Nations comme
  // les Îles Glamour : Avalon, Inismore, Marches des Highlands).
  function nationsLiees(a) {
    if (Array.isArray(a.nations_lien) && a.nations_lien.length) return a.nations_lien;
    return a.nation_lien ? [a.nation_lien] : [];
  }

  function renderCard(a) {
    const dansCreation = window.CreationState
      && window.CreationState.isInCreation("avantages_choisis", a.nom);
    return el("li", {
      class: "ecole-card avant-card" + (dansCreation ? " is-in-creation" : ""),
      tabindex: "0",
      role: "button",
      "aria-label": "Voir le détail de l'avantage " + a.nom,
      onclick: () => ouvrirAvantage(a),
      onkeydown: (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ouvrirAvantage(a); } },
    }, [
      el("h2", null, a.nom),
      el("p", { class: "arme avant-cout" }, libelleCout(a)),
      a.description
        ? el("p", { class: "avant-desc" }, a.description)
        : null,
      renderBadges(a),
      dansCreation
        ? el("span", { class: "avant-in-creation-tag" }, "✓ Dans ma création")
        : null,
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

  // ===== Ajout à la création =====
  // La Nation de la création correspond-elle à l'une des Nations liées ?
  // (avec alias : un Fuso correspond à Cathay, un Aragosta à Nations Pirates)
  function nationCreationCorrespond(a) {
    const nation = getNationCourante();
    if (!nation) return false;
    const liees = nationsLiees(a);
    if (!liees.length) return false;
    let cands = [nation];
    if (window.CreationState && window.CreationState.nationsCandidatesEcoles) {
      cands = window.CreationState.nationsCandidatesEcoles(nation);
    }
    return liees.some(l => cands.includes(l));
  }

  // Étiquette de restriction non-Nation (Sorcier Porté, Sorcière Strega…) :
  // dépend de la Sorcellerie, pas de la Nationalité → on ne bloque pas.
  function estRestrictionSorcellerie(a) {
    return nationsLiees(a).some(l => /sorci/i.test(l));
  }

  // Coût suggéré (PP) : premier nombre du libellé ; si réduction et que la
  // Nation de la création correspond, le nombre entre parenthèses.
  function coutSuggere(a) {
    const aff = a.cout_affiche || a.cout_raw || "";
    if (a.type_lien === "reduction" && nationCreationCorrespond(a)) {
      const m = aff.match(/\(\s*(\d+)\s*PP/);
      if (m) return parseInt(m[1], 10);
    }
    const m2 = aff.match(/\d+/);
    return m2 ? parseInt(m2[0], 10) : 0;
  }

  // Section 'Ma création' du modal : bouton ajouter/retirer + coût ajustable.
  function buildAjoutCreation(a) {
    if (!window.CreationState) return null;
    const wrap = el("div", { class: "detail-section avant-ajout" });

    function refresh() {
      wrap.innerHTML = "";
      wrap.appendChild(el("h3", null, "Ma création"));

      const ppActuel = window.CreationState.getAvantagePP(a.nom); // null si absent
      const estDedans = ppActuel !== null;
      const nation = getNationCourante();

      // Restriction de Nation incompatible → blocage (sauf restrictions
      // de Sorcellerie, qui ne dépendent pas de la Nationalité).
      const bloque = a.type_lien === "restriction"
        && nation
        && !estRestrictionSorcellerie(a)
        && !nationCreationCorrespond(a);

      if (bloque && !estDedans) {
        wrap.appendChild(el("p", { class: "avant-ajout-bloque" },
          "Indisponible : réservé à " + a.nation_lien +
          " (votre Nation : " + nation + ")."));
        return;
      }
      if (bloque && estDedans) {
        wrap.appendChild(el("p", { class: "avant-ajout-bloque" },
          "⚠ Cet avantage est réservé à " + a.nation_lien +
          " mais votre Nation est désormais " + nation + "."));
      }
      if (a.type_lien === "restriction" && !nation && !estDedans) {
        wrap.appendChild(el("p", { class: "avant-ajout-note" },
          "Réservé à " + a.nation_lien + " — choisissez votre Nation à l'étape 1 pour vérifier."));
      }
      if (estRestrictionSorcellerie(a)) {
        wrap.appendChild(el("p", { class: "avant-ajout-note" },
          "Réservé : " + a.nation_lien + " (dépend de votre Sorcellerie, pas de votre Nationalité)."));
      }
      if (a.type_lien === "reduction" && nationCreationCorrespond(a)) {
        wrap.appendChild(el("p", { class: "avant-ajout-note avant-ajout-reduc" },
          "✓ Réduction appliquée pour votre Nation (" + nation + ")."));
      }

      // Champ PP (modifiable : utile pour les coûts variables '2 à 8')
      const valeurInitiale = estDedans ? ppActuel : coutSuggere(a);
      const inp = el("input", {
        class: "spec-pp-input",
        type: "number",
        min: "0",
        step: "1",
        value: String(valeurInitiale),
      });
      if (estDedans) {
        // 'change' (et non 'input') : évite de reconstruire la section à
        // chaque frappe (le save déclenche creation-state-changed → refresh).
        inp.addEventListener("change", () => {
          window.CreationState.setAvantagePP(a.nom, inp.value);
        });
      }
      wrap.appendChild(el("div", { class: "spec-interactif" }, [
        el("label", { class: "spec-mini-label" }, "Coût en PP :"),
        inp,
        el("span", { class: "spec-cout-pp" }, "PP"),
      ]));

      const btn = el("button", {
        class: "btn-add-creation" + (estDedans ? " is-added" : ""),
        type: "button",
        onclick: () => {
          window.CreationState.toggleAvantage(a.nom, inp.value);
          refresh();
        },
      }, estDedans ? "✓ Retirer de ma création" : "+ Ajouter à ma création");
      wrap.appendChild(btn);
    }

    function onChange() {
      // Auto-nettoyage : si la section n'est plus dans le DOM (modal
      // reconstruit), on détache le listener.
      if (!wrap.isConnected) {
        window.removeEventListener("creation-state-changed", onChange);
        return;
      }
      refresh();
    }
    window.addEventListener("creation-state-changed", onChange);
    refresh();
    return wrap;
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

    // Coût (le docx de Guillaume fait foi — pas de rappel V1)
    content.appendChild(el("div", { class: "detail-section" }, [
      el("h3", null, "Coût"),
      el("p", { class: "description-paragraph avant-cout-detail" }, libelleCout(a)),
    ]));

    // Lien à une Nation
    if (a.type_lien && a.nation_lien) {
      const liees = nationsLiees(a);
      let cible;
      if (liees.length > 1) {
        cible = liees.join(", ") + " (" + a.nation_lien + ")";
      } else {
        cible = a.nation_lien;
      }
      const phrase = a.type_lien === "restriction"
        ? (liees.length > 1
            ? "Cet avantage est réservé aux personnages des Nations : " + cible + "."
            : "Cet avantage est réservé aux personnages de la Nation " + cible + ".")
        : ("Disponible pour tous, à coût réduit pour : " + cible + ".");
      content.appendChild(el("div", { class: "detail-section avant-section-nation" }, [
        el("h3", null, a.type_lien === "restriction" ? "Restriction de Nation" : "Réduction pour une Nation"),
        el("p", { class: "description-paragraph" }, phrase),
      ]));
    }

    // Ajout à la création de personnage
    const ajout = buildAjoutCreation(a);
    if (ajout) content.appendChild(ajout);

    // Description détaillée V1 (extraite du PDF '09 Avantages').
    // Le résumé court ('en bref') est affiché sur la carte, plus besoin
    // de le répéter ici. S'il n'y a pas de version V1, on retombe sur le
    // résumé court pour ne pas laisser un modal vide.
    if (Array.isArray(a.description_v1) && a.description_v1.length) {
      const sec = el("div", { class: "detail-section" }, [
        el("h3", null, "Description détaillée"),
      ]);
      a.description_v1.forEach(p => {
        if (p.startsWith("◆")) {
          // Sous-variante (ex: 'Éblouissant — Coût : 10 PP')
          sec.appendChild(el("h4", { class: "avant-v1-sub" },
            p.replace(/^◆\s*/, "").replace(/\s*:\s*$/, "")));
        } else {
          sec.appendChild(el("p", { class: "description-paragraph" }, p));
        }
      });
      content.appendChild(sec);
    } else {
      content.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Description"),
        el("p", { class: "description-paragraph" },
          a.description || "(à venir)"),
      ]));
    }

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
    if (!container) return;
    container.innerHTML = "";

    // Présélection : la Nation de la création (si pas déjà choisi manuellement)
    if (state.nation_cible == null) {
      const def = nationParDefaut();
      if (def) state.nation_cible = def;
    }

    // Dropdown de toutes les Nations référencées par les avantages
    const sel = el("select", {
      class: "nation-select",
      "aria-label": "Nation à filtrer",
      onchange: (e) => {
        state.nation_cible = e.target.value || null;
        state.nation_filtre = null;
        buildNationFilter();
        renderGrid();
      },
    });
    sel.appendChild(el("option", { value: "" }, "— Choisir une Nation —"));
    nationsDisponibles().forEach(n => {
      const opt = el("option", { value: n }, n);
      if (state.nation_cible === n) opt.setAttribute("selected", "");
      sel.appendChild(opt);
    });
    container.appendChild(sel);

    // Note : Nation de la création si différente / absente
    const courante = getNationCourante();
    if (courante) {
      container.appendChild(el("p", { class: "filter-empty-note" },
        "Nation de ma création : " + courante));
    }

    const nation = state.nation_cible;
    if (!nation) {
      container.appendChild(el("p", { class: "filter-empty-note" },
        "Sélectionnez une Nation pour filtrer les avantages réservés, réduits ou bloqués."));
      return;
    }

    const nbRestrict = data.avantages.filter(a => a.type_lien === "restriction" && nationsLiees(a).includes(nation)).length;
    const nbReduc   = data.avantages.filter(a => a.type_lien === "reduction"   && nationsLiees(a).includes(nation)).length;
    const nbBloque  = data.avantages.filter(a => a.type_lien === "restriction" && nationsLiees(a).length && !nationsLiees(a).includes(nation)).length;
    const options = [
      { key: "restriction", label: "Réservés à cette Nation (" + nbRestrict + ")" },
      { key: "reduction",   label: "Réduction pour cette Nation (" + nbReduc + ")" },
      { key: "bloque",      label: "Bloqués (autres Nations) (" + nbBloque + ")" },
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
