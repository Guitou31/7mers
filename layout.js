// Layout partagé du Bréviaire 7ème Mer : titre/sous-titre + menu horizontal.
// Inclure ce script (et style.css) dans toutes les pages du site, puis ajouter
// <div id="page-layout"></div> au début du <body>.
// L'élément <body> doit avoir un attribut data-page="<id>" pour marquer la page active.

(function () {
  "use strict";

  const SITE_TITLE = "Bréviaire 7ème Mer V2.1";
  const SITE_SUBTITLE = "Système 1ère Édition, Univers 2ème Édition";

  // Catégories logiques pour grouper le menu (sur l'accueil et le menu).
  // Chaque section a : id (URL), label, available (false = grisé "à venir"), category.
  // Champ optionnel `group` : sections partageant la même valeur sont regroupées
  // sous un même bouton dropdown dans le menu horizontal (libellé via GROUP_LABELS).
  const SECTIONS = [
    { id: "index",                 file: "index.html",                label: "Accueil",                available: true,  category: "home"     },
    { id: "creation-personnage",   file: "creation-personnage.html",  label: "Création de personnage", available: false, category: "creation" },
    { id: "appartenance",          file: "appartenance.html",         label: "Appartenance",           available: false, category: "creation" },
    { id: "metiers",               file: "metiers.html",              label: "Métiers",                available: true,  category: "creation" },
    { id: "entrainements",         file: "entrainements.html",        label: "Entraînements",          available: true,  category: "creation" },
    { id: "competences",              file: "competences.html",              label: "Compétences principales",  available: true,  category: "creation", group: "competences" },
    { id: "competences-artisanales",  file: "competences-artisanales.html",  label: "Compétences artisanales",  available: true,  category: "creation", group: "competences" },
    { id: "avantages",             file: "avantages.html",            label: "Avantages",              available: false, category: "creation" },
    { id: "ecoles-spadassin",      file: "ecoles-spadassin.html",     label: "Écoles de Spadassin",    available: true,  category: "combat",   group: "ecoles_techniques" },
    { id: "ecoles-combat",         file: "ecoles-combat.html",        label: "Écoles de Combat",       available: true,  category: "combat",   group: "ecoles_techniques" },
    { id: "techniques",            file: "techniques.html",           label: "Liste des techniques",   available: true,  category: "combat",   group: "ecoles_techniques" },
    { id: "sorcelleries",          file: "sorcelleries.html",         label: "Sorcelleries",           available: false, category: "magie"    },
    { id: "societes-secretes",     file: "societes-secretes.html",    label: "Sociétés Secrètes",      available: false, category: "monde"    },
  ];

  const CATEGORY_LABELS = {
    creation: "Création & Personnage",
    combat:   "Combat & Écoles",
    magie:    "Surnaturel",
    monde:    "Monde de Théah",
  };

  // Libellés des groupes (bouton dropdown dans le menu horizontal).
  const GROUP_LABELS = {
    ecoles_techniques: "Écoles & Techniques",
    competences:       "Compétences",
  };

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") e.className = attrs[k];
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

  function getCurrentPageId() {
    return (document.body && document.body.dataset && document.body.dataset.page) || "";
  }

  function renderHeader() {
    const currentId = getCurrentPageId();

    // Topbar avec titre + sous-titre
    const topbar = el("header", { class: "topbar" }, [
      el("div", { class: "topbar-inner" }, [
        el("a", { class: "topbar-titlelink", href: "index.html" }, [
          el("h1", null, SITE_TITLE),
          el("p", { class: "subtitle" }, SITE_SUBTITLE),
        ]),
        el(
          "button",
          {
            class: "menu-toggle",
            id: "menu-toggle",
            "aria-expanded": "false",
            "aria-controls": "main-menu",
            "aria-label": "Ouvrir le menu",
          },
          "☰ Menu"
        ),
      ]),
    ]);

    // Helper : crée l'élément <a> ou <span> pour une section.
    function renderSectionLink(s, extraClass) {
      const isCurrent = s.id === currentId;
      const baseCls = extraClass || "menu-item";
      const cls = baseCls +
        (s.available ? "" : " is-disabled") +
        (isCurrent ? " is-current" : "");
      const attrs = { class: cls, "data-category": s.category };
      if (s.available) {
        attrs.href = s.file;
        if (isCurrent) attrs["aria-current"] = "page";
        return el("a", attrs, s.label);
      } else {
        attrs.title = "À venir";
        attrs["aria-disabled"] = "true";
        return el("span", attrs, s.label);
      }
    }

    // Menu horizontal : itère les sections, regroupe par `group` en dropdown.
    const menuItems = [];
    const emittedGroups = new Set();
    for (const s of SECTIONS) {
      if (s.group) {
        if (emittedGroups.has(s.group)) continue;
        emittedGroups.add(s.group);
        const groupSections = SECTIONS.filter((x) => x.group === s.group);
        const hasCurrent = groupSections.some((x) => x.id === currentId);
        const label = GROUP_LABELS[s.group] || s.group;
        const button = el(
          "button",
          {
            type: "button",
            class: "menu-item menu-dropdown-button" + (hasCurrent ? " is-current" : ""),
            "aria-haspopup": "true",
            "aria-expanded": "false",
            "data-category": s.category,
          },
          [label, el("span", { class: "menu-dropdown-caret", "aria-hidden": "true" }, " ▾")]
        );
        const panel = el(
          "div",
          { class: "menu-dropdown-panel", role: "menu" },
          groupSections.map((gs) => renderSectionLink(gs, "menu-dropdown-item"))
        );
        menuItems.push(
          el("div", { class: "menu-dropdown" + (hasCurrent ? " is-active" : "") }, [button, panel])
        );
      } else {
        menuItems.push(renderSectionLink(s));
      }
    }

    const menu = el("nav", { class: "main-menu", id: "main-menu", "aria-label": "Navigation principale" },
      menuItems
    );

    return [topbar, menu];
  }

  // Expose pour usage par la page d'accueil
  window.SITE_SECTIONS = SECTIONS;
  window.SITE_CATEGORY_LABELS = CATEGORY_LABELS;
  window.SITE_TITLE = SITE_TITLE;

  // Auto-inject quand le DOM est prêt
  function inject() {
    const container = document.getElementById("page-layout");
    if (!container) return; // pages sans layout (peu probable)
    const parts = renderHeader();
    for (const p of parts) container.appendChild(p);

    // Toggle menu mobile
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("main-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // Dropdowns du menu (click + clavier + click extérieur).
    const dropdowns = document.querySelectorAll(".menu-dropdown");
    function closeAllDropdowns(except) {
      dropdowns.forEach((d) => {
        if (d === except) return;
        d.classList.remove("is-open");
        const btn = d.querySelector(".menu-dropdown-button");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }
    dropdowns.forEach((d) => {
      const btn = d.querySelector(".menu-dropdown-button");
      if (!btn) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = !d.classList.contains("is-open");
        closeAllDropdowns(d);
        d.classList.toggle("is-open", willOpen);
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu-dropdown")) closeAllDropdowns(null);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllDropdowns(null);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
