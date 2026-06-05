/*
 * cross-modal.js — Modal unifié + pile de navigation pour le Bréviaire 7ème Mer.
 *
 * Permet d'ouvrir n'importe quelle fiche (compétence, métier, entraînement, école)
 * sans changer de page, et de revenir en arrière dans la chaîne de clics.
 *
 * API publique (window.*) :
 *   openItem(type, identifier, opts)  - ouvre la modal pour un élément
 *     type = 'competence' | 'metier' | 'entrainement' | 'ecole'
 *     identifier = nom (string) ou objet item complet
 *     opts = { resetStack: bool }  - true = vide la pile (clic depuis grille)
 *   closeModal()
 *   goBackModal()
 *   buildCrossLink(type, nom)  - crée un <a> qui ouvre la modal au clic
 *
 * Pré-requis : les data files (ecoles.js, metiers.js, entrainements.js, competences.js)
 *              doivent être chargés AVANT cross-modal.js.
 */
(function () {
  "use strict";

  // ===== Helpers de base =====
  function normalize(s) {
    return (s || "").toString()
      .replace(/œ/g, "oe").replace(/Œ/g, "OE")
      .replace(/æ/g, "ae").replace(/Æ/g, "AE")
      .replace(/[''`]/g, "'")        // apostrophes typo. → apostrophe ASCII
      .normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  }

  // Alias d'écoles (corrige les fautes de saisie dans le docx techniques).
  // Clé = nom tel qu'écrit (n'importe quelle casse), valeur = nom canonique attendu dans la base.
  const ECOLE_NAME_ALIASES = {
    "donnerwette": "Donnerwetter",
    "ottenheim rasmussen": "Ottenheim",
    "quinn snedig": "Quinn",
    "al'marikk": "Al Marikk",
    "bernouilli": "Bernoulli",
    "la pointe au coeur": "La Pointe au Coeur",
    // 'Tulwar' et 'Rachecourt' : volontairement non aliasés
    // → s'afficheront en texte (école introuvable / supprimée).
  };
  function slugify(s) {
    return normalize(s).replace(/['']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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

  // ===== Labels constants =====
  const ORIGINE_LABELS = {
    officielle: "Officielle",
    combat_reclassee: "Combat reclassée",
    seconde_edition_adaptee: "Seconde édition",
  };
  const NIVEAU_LABELS = { apprenti: "Apprenti", compagnon: "Compagnon", maitre: "Maître" };

  // ===== Lookup helpers =====
  // Aliases d'affichage → nom canonique (display court ↔ vraie compétence).
  const COMPETENCE_ALIASES = {
    "recharger": "Recharger (Type d’armes à préciser)",
  };
  // Patterns pour les variantes (ex: 'Recharger (Arc)' → fiche canonique unique).
  // Le display reste tel quel ; seul le clic résout vers la canonique.
  const COMPETENCE_PATTERN_ALIASES = [
    { pattern: /^recharger\s*\(.+?\)$/i,        target: "Recharger (Type d’armes à préciser)" },
    { pattern: /^parade\s*\(.+?\)$/i,           target: "Parade (Type d’armes à préciser)" },
    { pattern: /^blocage\s*\(.+?\)$/i,          target: "Blocage" },
    { pattern: /^tir\s+d['’]adresse\s*\(.+?\)$/i, target: "Tir d’adresse" },
    { pattern: /^connaissance\s+des\s+routes\s*\(.+?\)$/i,
      target: "Connaissance des routes (nation à préciser)" },
  ];

  function findCompetence(nom) {
    const data = window.COMPETENCES_DATA;
    if (!data) return null;
    const k = normalize(nom);
    let found = data.competences.find(c => normalize(c.nom) === k);
    if (found) return found;
    // Alias court → canonique
    if (COMPETENCE_ALIASES[k]) {
      const target = normalize(COMPETENCE_ALIASES[k]);
      found = data.competences.find(c => normalize(c.nom) === target);
      if (found) return found;
    }
    // Patterns (Recharger (X) → canonique)
    for (const a of COMPETENCE_PATTERN_ALIASES) {
      if (a.pattern.test(k)) {
        const target = normalize(a.target);
        found = data.competences.find(c => normalize(c.nom) === target);
        if (found) return found;
      }
    }
    // Fallback : strip parenthèse finale
    const sansParen = nom.replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (sansParen !== nom) {
      const k2 = normalize(sansParen);
      found = data.competences.find(c => normalize(c.nom) === k2);
      if (found) return found;
      found = data.competences.find(c => normalize(c.nom).startsWith(k2 + " ("));
      if (found) return found;
    }
    return null;
  }
  function findMetier(nom) {
    const data = window.METIERS_DATA;
    if (!data) return null;
    const k = normalize(nom);
    return data.metiers.find(m => normalize(m.nom) === k) || null;
  }
  function findEntrainement(nom) {
    const data = window.ENTRAINEMENTS_DATA;
    if (!data) return null;
    const k = normalize(nom);
    return data.entrainements.find(e => normalize(e.nom) === k) || null;
  }
  function findEcole(nom) {
    const data = window.ECOLES_DATA;
    if (!data) return null;
    const k = normalize(nom);
    return data.ecoles.find(e => normalize(e.nom) === k) || null;
  }
  function findEcoleCombat(nom) {
    const data = window.ECOLES_COMBAT_DATA;
    if (!data) return null;
    const k = normalize(nom);
    return data.ecoles.find(e => normalize(e.nom) === k) || null;
  }
  // Cherche dans Spadassin puis Combat (avec alias de fautes de saisie docx).
  // Retourne { type: 'ecole' | 'ecole_combat', ecole } ou null.
  function findEcoleAny(nom) {
    const aliased = ECOLE_NAME_ALIASES[normalize(nom)] || nom;
    const e1 = findEcole(aliased);
    if (e1) return { type: "ecole", ecole: e1 };
    const e2 = findEcoleCombat(aliased);
    if (e2) return { type: "ecole_combat", ecole: e2 };
    return null;
  }
  function findTechnique(nom) {
    const data = window.ECOLES_DATA;
    if (!data || !data.techniques) return null;
    const k = normalize(nom);
    // Les clés de techniques sont déjà normalisées (lowercase, sans accents).
    if (data.techniques[k]) return data.techniques[k];
    // Fallback : recherche par nom complet
    for (const key in data.techniques) {
      if (normalize(data.techniques[key].nom) === k) return data.techniques[key];
    }
    return null;
  }
  function findByTypeAndNom(type, nom) {
    if (type === "competence") return findCompetence(nom);
    if (type === "metier") return findMetier(nom);
    if (type === "entrainement") return findEntrainement(nom);
    if (type === "ecole") return findEcole(nom);
    if (type === "ecole_combat") return findEcoleCombat(nom);
    if (type === "technique") return findTechnique(nom);
    return null;
  }

  // Pour les liens "spécialisation" depuis une école/compétence : cherche
  // dans entraînements puis métiers, renvoie {type, nom} ou null.
  // Pattern alias : 'Escrime (Épées)' / 'Escrime (Sabres)' / 'Escrime (Rapières)'
  // → résolu vers l'entraînement 'Escrime' (sous-catégories internes au PDF).
  const SPECIALISATION_PATTERN_ALIASES = [
    { pattern: /^escrime\s*\(.+?\)$/i, target: "Escrime", type: "entrainement" },
  ];
  function findSpecialisation(nom) {
    const e = findEntrainement(nom);
    if (e) return { type: "entrainement", nom: e.nom };
    const m = findMetier(nom);
    if (m) return { type: "metier", nom: m.nom };
    // Aliases : display préservé, lookup résolu vers la cible
    const k = normalize(nom);
    for (const a of SPECIALISATION_PATTERN_ALIASES) {
      if (a.pattern.test(k)) {
        if (a.type === "entrainement") {
          const e2 = findEntrainement(a.target);
          if (e2) return { type: "entrainement", nom: e2.nom };
        } else {
          const m2 = findMetier(a.target);
          if (m2) return { type: "metier", nom: m2.nom };
        }
      }
    }
    return null;
  }

  // ===== Universal modal element (injecté une fois) =====
  function ensureModalElement() {
    let dialog = document.getElementById("cross-modal");
    if (dialog) return dialog;
    dialog = el("dialog", { id: "cross-modal", class: "ecole-detail cross-modal" }, [
      el("div", { class: "cross-modal-header" }, [
        el("button", {
          class: "cross-modal-back",
          id: "cross-modal-back",
          "aria-label": "Retour à la fiche précédente",
          title: "Retour (ou Échap pour fermer)",
          type: "button",
          onclick: goBackModal,
        }, "← Retour"),
        el("button", {
          class: "ecole-detail-close",
          id: "cross-modal-close",
          "aria-label": "Fermer",
          type: "button",
          onclick: closeModal,
        }, "×"),
      ]),
      el("div", { id: "cross-modal-content" }),
    ]);
    document.body.appendChild(dialog);

    // Click outside (backdrop) to close.
    // Pattern canonique : un clic sur le backdrop natif d'un <dialog> a target === dialog.
    // Un clic sur un enfant a target === enfant. On ne peut PAS utiliser
    // getBoundingClientRect ici : openItem() peut redimensionner la modal entre le clic
    // et le bubble, faisant tomber le clic hors du nouveau rect (= fermeture parasite).
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) closeModal();
    });
    return dialog;
  }

  // ===== Stack de navigation =====
  // Chaque entrée : { type, nom }. Le dernier élément = item affiché.
  let modalStack = [];

  function updateBackButtonVisibility() {
    const btn = document.getElementById("cross-modal-back");
    if (!btn) return;
    btn.style.visibility = modalStack.length > 1 ? "visible" : "hidden";
  }

  // ===== API publique =====
  function openItem(type, identifier, opts) {
    opts = opts || {};
    let item;
    let nom;
    if (typeof identifier === "string") {
      nom = identifier;
      item = findByTypeAndNom(type, nom);
      if (!item) {
        console.warn(`openItem: ${type} '${nom}' introuvable`);
        return;
      }
    } else {
      item = identifier;
      nom = item.nom;
    }
    if (opts.resetStack) modalStack = [];
    modalStack.push({ type, nom });
    renderCurrent();
    showModal();
  }

  function closeModal() {
    modalStack = [];
    const dialog = document.getElementById("cross-modal");
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    history.replaceState(null, "", location.pathname);
  }

  function goBackModal() {
    if (modalStack.length <= 1) {
      closeModal();
      return;
    }
    modalStack.pop();
    renderCurrent();
  }

  function showModal() {
    const dialog = ensureModalElement();
    if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    else if (!dialog.hasAttribute("open")) dialog.setAttribute("open", "");
    dialog.scrollTop = 0;
  }

  function renderCurrent() {
    if (modalStack.length === 0) return;
    const top = modalStack[modalStack.length - 1];
    const item = findByTypeAndNom(top.type, top.nom);
    const container = document.getElementById("cross-modal-content");
    container.innerHTML = "";
    if (!item) {
      container.appendChild(el("p", null, "Item introuvable : " + top.type + " / " + top.nom));
      return;
    }
    if (top.type === "competence") renderCompetence(item, container);
    else if (top.type === "metier") renderMetier(item, container);
    else if (top.type === "entrainement") renderEntrainement(item, container);
    else if (top.type === "ecole") renderEcole(item, container);
    else if (top.type === "ecole_combat") renderEcole(item, container);  // même renderer
    else if (top.type === "technique") renderTechnique(item, container);
    history.replaceState(null, "", "#" + top.type + "/" + slugify(top.nom));
    updateBackButtonVisibility();
  }

  // ===== Cross-link builder =====
  // Crée un <a> qui, au clic, appelle openItem au lieu de naviguer.
  function buildCrossLink(type, nom, displayLabel) {
    return el("a", {
      class: "specialisation-link",
      href: type + ".html#" + slugify(nom),
      title: "Ouvrir " + nom,
      onclick: (ev) => {
        ev.preventDefault();
        openItem(type, nom);
      },
    }, displayLabel || nom);
  }

  // Spécialisation : peut être entraînement ou métier — lookup auto
  function buildSpecialisationLink(nom) {
    const found = findSpecialisation(nom);
    if (found) {
      return buildCrossLink(found.type, found.nom, nom);
    }
    return el("span", { class: "specialisation-text", title: "Spécialisation non référencée" }, nom);
  }

  // Compétence : lookup avec fallbacks
  function buildCompetenceLink(nom) {
    const comp = findCompetence(nom);
    if (comp) {
      return buildCrossLink("competence", comp.nom, nom);
    }
    return document.createTextNode(nom);
  }

  // === Inline list helpers (séparées par virgule) ===
  function inlineSpecialisations(noms) {
    const out = [];
    noms.forEach((nom, i) => {
      if (i > 0) out.push(document.createTextNode(", "));
      out.push(buildSpecialisationLink(nom));
    });
    return out;
  }

  // ============================================================
  // ============   RENDERERS PAR TYPE   ========================
  // ============================================================

  // --- Compétence ---
  function renderCompetence(c, container) {
    const catShort = (c.categorie || "Autre").replace("Compétences ", "").toUpperCase();
    container.appendChild(el("div", { class: "detail-header" }, [
      el("h2", { id: "cross-modal-title" }, c.nom),
      el("div", { class: "badges" }, [el("span", { class: "badge nation" }, catShort)]),
    ]));

    if (c.description) {
      container.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Description"),
        el("p", { class: "description-paragraph" }, c.description),
      ]));
    }

    // 4 sources possibles : métiers/entraînements × base/avancée.
    // On utilise les listes séparées si présentes, sinon on retombe sur le
    // donnent_acces_base/_avancee fusionné (rétro-compat).
    const hasSeparated = (
      Array.isArray(c.donnent_acces_metiers_base) ||
      Array.isArray(c.donnent_acces_entrainements_base)
    );
    let metiers_b, metiers_a, ent_b, ent_a;
    if (hasSeparated) {
      metiers_b = c.donnent_acces_metiers_base || [];
      metiers_a = c.donnent_acces_metiers_avancee || [];
      ent_b     = c.donnent_acces_entrainements_base || [];
      ent_a     = c.donnent_acces_entrainements_avancee || [];
    } else {
      // Fallback : split l'ancienne liste fusionnée via findSpecialisation
      const splitMixed = (lst) => {
        const m = [], e = [];
        (lst || []).forEach(n => {
          const f = findSpecialisation(n);
          if (f && f.type === "entrainement") e.push(n);
          else m.push(n);
        });
        return [m, e];
      };
      [metiers_b, ent_b] = splitMixed(c.donnent_acces_base);
      [metiers_a, ent_a] = splitMixed(c.donnent_acces_avancee);
    }

    // Bloc "Base" : 2 sous-sections (Métiers + Entraînements), masquées si vides
    if (metiers_b.length || ent_b.length) {
      const blocBase = el("div", { class: "detail-section" }, [
        el("h3", null, "Donne accès en Base"),
      ]);
      if (metiers_b.length) {
        blocBase.appendChild(el("h4", { class: "acces-sous-titre" },
          "Métiers (" + metiers_b.length + ")"));
        blocBase.appendChild(el("p", { class: "specialisations-line" },
          inlineSpecialisations(metiers_b)));
      }
      if (ent_b.length) {
        blocBase.appendChild(el("h4", { class: "acces-sous-titre" },
          "Entraînements (" + ent_b.length + ")"));
        blocBase.appendChild(el("p", { class: "specialisations-line" },
          inlineSpecialisations(ent_b)));
      }
      container.appendChild(blocBase);
    } else {
      container.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Donne accès en Base"),
        el("p", { class: "avantage-vide" }, "Aucune source"),
      ]));
    }

    // Bloc "Avancée" : idem
    if (metiers_a.length || ent_a.length) {
      const blocAv = el("div", { class: "detail-section" }, [
        el("h3", null, "Donne accès en Avancée"),
      ]);
      if (metiers_a.length) {
        blocAv.appendChild(el("h4", { class: "acces-sous-titre" },
          "Métiers (" + metiers_a.length + ")"));
        blocAv.appendChild(el("p", { class: "specialisations-line" },
          inlineSpecialisations(metiers_a)));
      }
      if (ent_a.length) {
        blocAv.appendChild(el("h4", { class: "acces-sous-titre" },
          "Entraînements (" + ent_a.length + ")"));
        blocAv.appendChild(el("p", { class: "specialisations-line" },
          inlineSpecialisations(ent_a)));
      }
      container.appendChild(blocAv);
    } else {
      container.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Donne accès en Avancée"),
        el("p", { class: "avantage-vide" }, "Aucune source"),
      ]));
    }

    if (c.variantes && c.variantes.length) {
      const section = el("div", { class: "detail-section" }, [
        el("h3", null, "Variantes / sous-compétences"),
      ]);
      for (const v of c.variantes) {
        section.appendChild(el("div", { class: "niveau-bloc" }, [
          el("h4", { class: "niveau-titre" }, v.nom),
          v.description ? el("p", { class: "niveau-fluff" }, v.description) : null,
        ]));
      }
      container.appendChild(section);
    }
  }

  // --- Métier ---
  function renderMetier(m, container) {
    const cats = m.categories || [];
    container.appendChild(el("div", { class: "detail-header" }, [
      el("h2", { id: "cross-modal-title" }, m.nom),
      el("div", { class: "badges" }, [
        ...cats.map(c => el("span", { class: "badge nation" }, c)),
        m.restriction_type === "nationalite"
          ? el("span", { class: "badge restriction-nationalite" }, "🌍 Restriction de Nationalité")
          : m.restriction_type === "societe"
            ? el("span", { class: "badge restriction-societe" }, "🛡 Restriction de Société")
            : null,
      ]),
    ]));

    // Encart de restriction (texte explicite)
    if (m.restriction_texte) {
      container.appendChild(el("div", { class: "detail-banner banner-restriction" }, [
        el("strong", null, "Condition d'accès : "),
        el("span", null, m.restriction_texte),
      ]));
    }

    if (m.description) {
      const paras = m.description.split(/\n{2,}/).filter(Boolean);
      container.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Description"),
        ...paras.map(p => el("p", { class: "description-paragraph" }, p)),
      ]));
    }

    const meta = [];
    if (m.reputation) meta.push(["Réputation", m.reputation]);
    if (meta.length) {
      const dl = el("dl", { class: "detail-meta" });
      for (const [k, v] of meta) {
        dl.appendChild(el("dt", null, k + " :"));
        dl.appendChild(el("dd", null, v));
      }
      container.appendChild(el("div", { class: "detail-section" }, dl));
    }

    const compSection = el("div", { class: "detail-section" }, [
      el("h3", null, "Compétences accessibles"),
    ]);
    compSection.appendChild(renderCompetencesGroup(
      "Compétences de base", m.competences_base, m.competences_base_choix, "competence-base"
    ));
    compSection.appendChild(renderCompetencesGroup(
      "Compétences avancées", m.competences_avancees, m.competences_avancees_choix, "competence-avancee"
    ));
    // Encart 'indicatives' réservé au métier d'Artisan (cas particulier).
    if (m.nom === "Artisan") {
      compSection.appendChild(el("p", { class: "metier-note-pp" }, [
        el("em", null, "Toutes ces compétences sont indicatives — vous pouvez en demander d'autres (achetables au coût standard d'1 PP par rang)."),
      ]));
    }
    container.appendChild(compSection);
  }

  // Rendu d'un groupe (base ou avancées) : liste fixe + un ou plusieurs blocs 'choix'.
  function renderCompetencesGroup(label, items, choixOrList, cssClass) {
    const group = el("div", { class: "competence-section " + cssClass });
    group.appendChild(el("h4", null, label));
    const hasItems = items && items.length > 0;
    // Support dict (legacy) ou list[dict] (nouveau Artisan).
    const choixList = !choixOrList ? []
      : Array.isArray(choixOrList) ? choixOrList
      : [choixOrList];
    const validChoix = choixList.filter(c => c && c.options && c.options.length > 0);
    if (!hasItems && validChoix.length === 0) {
      group.appendChild(el("p", { class: "avantage-vide" }, "Aucune"));
      return group;
    }
    if (hasItems) {
      group.appendChild(el("ul", { class: "competence-list" },
        items.map(c => el("li", null, [buildCompetenceLink(c)]))));
    }
    validChoix.forEach(choix => {
      const intro = "Choisir " + choix.nb + " compétence" + (choix.nb > 1 ? "s" : "")
        + " parmi :";
      const div = el("div", { class: "competence-choix" }, [
        el("p", { class: "competence-choix-intro" }, intro),
      ]);
      const ul = el("ul", { class: "competence-list competence-choix-options" });
      choix.options.forEach(opt => ul.appendChild(el("li", null, [buildCompetenceLink(opt)])));
      div.appendChild(ul);
      if (choix.note) {
        div.appendChild(el("p", { class: "competence-choix-note" }, [
          el("em", null, choix.note),
        ]));
      }
      group.appendChild(div);
    });
    return group;
  }

  // --- Entraînement ---
  function renderEntrainement(entry, container) {
    const r = (entry.categorie_creation || "").toLowerCase().includes("limit") ? "limitee" : "libre";
    const restrictionBadge = el("span",
      { class: "badge restriction-" + (r === "limitee" ? "limitee" : "libre") },
      r === "limitee" ? "⚠ Accès limité" : "Libre"
    );
    container.appendChild(el("div", { class: "detail-header" }, [
      el("h2", { id: "cross-modal-title" }, entry.nom),
      el("div", { class: "badges" }, [restrictionBadge]),
    ]));
    if (entry.description) {
      container.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Description"),
        el("p", { class: "description-paragraph" }, entry.description),
      ]));
    }
    container.appendChild(el("div", { class: "detail-section" }, [
      el("h3", null, "Compétences accessibles"),
      renderCompetencesSection("Compétences de base", entry.competences_base, "competence-base"),
      renderCompetencesSection("Compétences avancées", entry.competences_avancees, "competence-avancee"),
    ]));
  }

  // ===== Renderer Technique =====
  function renderTechnique(t, container) {
    const catShort = t.categorie || "Technique";
    container.appendChild(el("div", { class: "detail-header" }, [
      el("h2", { id: "cross-modal-title" }, t.nom),
      el("div", { class: "badges" }, [el("span", { class: "badge nation" }, catShort)]),
    ]));

    // Description (paragraphes séparés par lignes vides)
    if (t.description) {
      const descSec = el("div", { class: "detail-section" }, [el("h3", null, "Description")]);
      const paras = t.description.split(/\n{2,}/).filter(Boolean);
      paras.forEach(p => descSec.appendChild(el("p", { class: "description-paragraph" }, p)));
      // Tables éventuelles
      (t.tables || []).forEach(tbl => {
        const table = el("table", { class: "technique-table" });
        const tbody = el("tbody");
        tbl.forEach((row, idx) => {
          const tr = el("tr");
          row.forEach(cell => tr.appendChild(el(idx === 0 ? "th" : "td", null, cell)));
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        descSec.appendChild(table);
      });
      container.appendChild(descSec);
    }

    // Helper : transforme un nom d'école en lien (ou texte selon le cas).
    function ecoleNode(nomEc) {
      if (/^toutes les /i.test(nomEc)) return el("em", null, nomEc);
      const r = findEcoleAny(nomEc);
      if (r) return buildCrossLink(r.type, r.ecole.nom, r.ecole.nom);
      return el("span", { class: "ecole-inconnue", title: "École non trouvée dans la base" }, nomEc);
    }
    function appendInlineList(parent, items) {
      items.forEach((it, i) => {
        if (i > 0) parent.appendChild(document.createTextNode(", "));
        parent.appendChild(ecoleNode(it));
      });
    }

    // Écoles enseignant cette technique : format groupé par arme si fourni, sinon plat.
    const groupees = t.ecoles_enseignant_groupees;
    const ecoles = t.ecoles_enseignant || [];
    if (groupees && Object.keys(groupees).length > 0) {
      const totalEcoles = ecoles.length;
      const sec = el("div", { class: "detail-section" }, [
        el("h3", null, "Écoles enseignant cette technique (" + totalEcoles + ", regroupées par arme)"),
      ]);
      const list = el("ul", { class: "ecoles-groupees-list" });
      for (const arme of Object.keys(groupees)) {
        const ecs = groupees[arme];
        const li = el("li", { class: "ecoles-groupees-arme" });
        li.appendChild(el("strong", null, arme + " : "));
        appendInlineList(li, ecs);
        list.appendChild(li);
      }
      sec.appendChild(list);
      container.appendChild(sec);
    } else if (ecoles.length > 0) {
      const sec = el("div", { class: "detail-section" }, [
        el("h3", null, "Écoles enseignant cette technique (" + ecoles.length + ")"),
      ]);
      const line = el("p", { class: "specialisations-line" });
      appendInlineList(line, ecoles);
      sec.appendChild(line);
      container.appendChild(sec);
    }
  }

  function renderCompetencesSection(label, items, cssClass) {
    if (!items || items.length === 0) {
      return el("div", { class: "competence-section " + cssClass }, [
        el("h4", null, label),
        el("p", { class: "avantage-vide" }, "Aucune"),
      ]);
    }
    return el("div", { class: "competence-section " + cssClass }, [
      el("h4", null, label),
      el("ul", { class: "competence-list" }, items.map(c => el("li", null, [buildCompetenceLink(c)]))),
    ]);
  }

  // --- École ---
  function renderEcole(ecole, container) {
    if (ecole.enrichie) renderEcoleEnrichie(ecole, container);
    else renderEcoleCompacte(ecole, container);
  }

  function renderEcoleHeader(ecole) {
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
    return el("div", { class: "detail-header" }, [
      el("h2", { id: "cross-modal-title" }, ecole.nom),
      el("div", { class: "badges" }, [
        ...ecole.nations.map(n => el("span", { class: "badge nation" }, n)),
        el("span", { class: "badge origine-" + ecole.origine }, ORIGINE_LABELS[ecole.origine] || ecole.origine),
        restrictionBadge, genreBadge,
      ]),
    ]);
  }

  function renderTechniquesSection(ecole) {
    if (!ecole.techniques_combat || !ecole.techniques_combat.length) return null;
    const techniquesDB = (window.ECOLES_DATA && window.ECOLES_DATA.techniques) || {};
    const section = el("div", { class: "detail-section" }, [el("h3", null, "Techniques de combat")]);
    for (const t of ecole.techniques_combat) {
      const techDef = t.ref ? techniquesDB[t.ref] : null;
      // Si la technique a une fiche, son nom devient un lien cliquable vers la fiche technique.
      const nomNode = techDef
        ? buildCrossLink("technique", techDef.nom, t.nom_base)
        : document.createTextNode(t.nom_base);
      const title = el("div", { class: "technique-nom" }, [
        nomNode,
        t.variante ? el("span", { class: "technique-variante" }, " (" + t.variante + ")") : null,
      ]);
      let body;
      if (techDef) {
        const paras = (techDef.description || "").split(/\n{2,}/).filter(Boolean);
        body = el("div", { class: "technique-desc" });
        paras.forEach(p => body.appendChild(el("p", null, p)));
        (techDef.tables || []).forEach(tbl => {
          const table = el("table", { class: "technique-table" });
          const tbody = el("tbody");
          tbl.forEach((row, idx) => {
            const tr = el("tr");
            row.forEach(cell => tr.appendChild(el(idx === 0 ? "th" : "td", null, cell)));
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);
          body.appendChild(table);
        });
      } else {
        // Pas une technique du recueil : c'est peut-être une COMPÉTENCE accordée
        // directement par l'école (cas rares : Pas de côté, Coup de pied, Lancer, Parade…).
        const comp = findCompetence(t.nom_base);
        if (comp) {
          body = el("p", { class: "technique-desc technique-competence" }, [
            el("em", null, "Compétence accordée directement par l'école : "),
            buildCrossLink("competence", comp.nom, comp.nom),
          ]);
        } else {
          body = el("p", { class: "technique-missing" },
            "Description non disponible (technique absente du recueil corrigé).");
        }
      }
      section.appendChild(el("div", { class: "technique-item" }, [title, body]));
    }
    return section;
  }

  function renderEcoleCompacte(ecole, container) {
    container.appendChild(renderEcoleHeader(ecole));
    const meta = el("dl", { class: "detail-meta" }, [
      el("dt", null, "Arme :"),
      el("dd", null, ecole.arme_display || ecole.arme || "—"),
      el("dt", null, "Spécialisations :"),
      el("dd", null, ecole.specialisations.length ? inlineSpecialisations(ecole.specialisations) : "—"),
    ]);
    container.appendChild(el("div", { class: "detail-section" }, meta));
    if (ecole.description_courte) {
      container.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Description du style"),
        el("p", { class: "description-text" }, ecole.description_courte),
      ]));
    }
    const techSection = renderTechniquesSection(ecole);
    if (techSection) container.appendChild(techSection);
    const av = ecole.avantages_courts || {};
    container.appendChild(el("div", { class: "detail-section" }, [
      el("h3", null, "Avantages par niveau de maîtrise"),
      renderAvantageCourt("Apprenti", av.apprenti),
      renderAvantageCourt("Compagnon", av.compagnon),
      renderAvantageCourt("Maître", av.maitre),
    ]));
  }

  function renderAvantageCourt(label, texte) {
    return el("div", { class: "avantage-niveau" }, [
      el("span", { class: "niveau-label" }, label),
      texte ? el("p", null, texte) : el("p", { class: "avantage-vide" }, "(non renseigné)"),
    ]);
  }

  function renderEcoleEnrichie(ecole, container) {
    const d = ecole.details || {};
    container.appendChild(renderEcoleHeader(ecole));
    if (d.appartenance_requise) {
      container.appendChild(el("div", { class: "detail-banner banner-appartenance" }, [
        el("strong", null, "Appartenance requise : "),
        el("span", null, d.appartenance_requise),
      ]));
    }
    if (d.description_longue && d.description_longue.length) {
      container.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Description du style"),
        ...d.description_longue.map(p => el("p", { class: "description-paragraph" }, p)),
      ]));
    }
    // Méta-infos
    const meta = [];
    const armeVal = ecole.arme_display || ecole.arme;
    if (armeVal) meta.push(["Arme(s) de prédilection", document.createTextNode(armeVal)]);
    const cats = (ecole.armes_categories || []).join(", ");
    if (cats) meta.push(["Catégorie(s) d'arme", document.createTextNode(cats)]);
    if (ecole.specialisations.length) {
      meta.push(["Spécialisations", el("span", null, inlineSpecialisations(ecole.specialisations))]);
    }
    const origineVal = d.origine_texte || ecole.nations.join(", ");
    if (origineVal) meta.push(["Origine", document.createTextNode(origineVal)]);
    if (d.academies) meta.push(["Académies", document.createTextNode(d.academies)]);
    if (d.homologation) meta.push(["Homologation", document.createTextNode(d.homologation)]);
    if (d.doyen) meta.push(["Doyen", document.createTextNode(d.doyen)]);
    if (d.insigne) meta.push(["Insigne", document.createTextNode(d.insigne)]);
    if (meta.length) {
      const dl = el("dl", { class: "detail-meta" });
      for (const [k, v] of meta) {
        dl.appendChild(el("dt", null, k + " :"));
        dl.appendChild(el("dd", null, [v]));
      }
      container.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Informations"),
        dl,
      ]));
    }
    // Niveaux
    const niveaux = d.niveaux || {};
    if (Object.keys(niveaux).length) {
      const section = el("div", { class: "detail-section" }, [el("h3", null, "Niveaux de maîtrise")]);
      for (const key of ["apprenti", "compagnon", "maitre"]) {
        const niv = niveaux[key];
        if (!niv) continue;
        section.appendChild(el("div", { class: "niveau-bloc" }, [
          el("h4", { class: "niveau-titre" }, NIVEAU_LABELS[key]),
          niv.fluff ? el("p", { class: "niveau-fluff" }, niv.fluff) : null,
          niv.regles ? el("div", { class: "niveau-regles" }, [
            el("span", { class: "niveau-regles-label" }, "Effet de jeu : "),
            el("span", null, niv.regles),
          ]) : null,
        ]));
      }
      container.appendChild(section);
    }
    const techSection = renderTechniquesSection(ecole);
    if (techSection) container.appendChild(techSection);
  }

  // ===== URL profondes : #type/slug ouvre direct =====
  function openFromHash() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash) return;
    const parts = hash.split("/");
    if (parts.length === 2) {
      // Format type/slug (nouveau)
      const [type, slug] = parts;
      let item = null;
      if (type === "competence" && window.COMPETENCES_DATA) {
        item = window.COMPETENCES_DATA.competences.find(c => slugify(c.nom) === slug);
      } else if (type === "metier" && window.METIERS_DATA) {
        item = window.METIERS_DATA.metiers.find(m => slugify(m.nom) === slug);
      } else if (type === "entrainement" && window.ENTRAINEMENTS_DATA) {
        item = window.ENTRAINEMENTS_DATA.entrainements.find(e => slugify(e.nom) === slug);
      } else if (type === "ecole" && window.ECOLES_DATA) {
        item = window.ECOLES_DATA.ecoles.find(e => slugify(e.nom) === slug);
      } else if (type === "ecole_combat" && window.ECOLES_COMBAT_DATA) {
        item = window.ECOLES_COMBAT_DATA.ecoles.find(e => slugify(e.nom) === slug);
      } else if (type === "technique" && window.ECOLES_DATA && window.ECOLES_DATA.techniques) {
        item = Object.values(window.ECOLES_DATA.techniques).find(t => slugify(t.nom) === slug);
      }
      if (item) openItem(type, item, { resetStack: true });
    } else {
      // Ancien format : #slug, fallback selon la page courante
      const page = (document.body && document.body.dataset && document.body.dataset.page) || "";
      let type = null;
      if (page === "competences" || page === "competences-artisanales") type = "competence";
      else if (page === "metiers") type = "metier";
      else if (page === "entrainements") type = "entrainement";
      else if (page === "ecoles-spadassin") type = "ecole";
      else if (page === "ecoles-combat") type = "ecole_combat";
      else if (page === "techniques") type = "technique";
      if (type) {
        const data = type === "competence" ? window.COMPETENCES_DATA?.competences :
                     type === "metier" ? window.METIERS_DATA?.metiers :
                     type === "entrainement" ? window.ENTRAINEMENTS_DATA?.entrainements :
                     type === "ecole_combat" ? window.ECOLES_COMBAT_DATA?.ecoles :
                     type === "technique" ? Object.values(window.ECOLES_DATA?.techniques || {}) :
                     window.ECOLES_DATA?.ecoles;
        const item = data?.find(x => slugify(x.nom) === hash);
        if (item) openItem(type, item, { resetStack: true });
      }
    }
  }

  // ESC ferme la modal (en plus du comportement natif de <dialog>)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const dialog = document.getElementById("cross-modal");
      if (dialog && dialog.open) {
        e.preventDefault();
        closeModal();
      }
    }
  });

  function init() {
    ensureModalElement();
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ===== Expose =====
  window.openItem = openItem;
  window.closeModal = closeModal;
  window.goBackModal = goBackModal;
  window.buildCrossLink = buildCrossLink;
  window.buildSpecialisationLink = buildSpecialisationLink;
  window.buildCompetenceLink = buildCompetenceLink;
  window.inlineSpecialisations = inlineSpecialisations;
  window.crossModalSlugify = slugify;
})();
