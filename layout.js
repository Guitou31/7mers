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
  const SECTIONS = [
    { id: "index",                 file: "index.html",                label: "Accueil",                available: true,  category: "home"     },
    { id: "creation-personnage",   file: "creation-personnage.html",  label: "Création de personnage", available: false, category: "creation" },
    { id: "appartenance",          file: "appartenance.html",         label: "Appartenance",           available: false, category: "creation" },
    { id: "metiers",               file: "metiers.html",              label: "Métiers",                available: true,  category: "creation" },
    { id: "entrainements",         file: "entrainements.html",        label: "Entraînements",          available: true,  category: "creation" },
    { id: "competences",           file: "competences.html",          label: "Compétences",            available: true,  category: "creation" },
    { id: "avantages",             file: "avantages.html",            label: "Avantages",              available: false, category: "creation" },
    { id: "ecoles-spadassin",      file: "ecoles-spadassin.html",     label: "Écoles de Spadassin",    available: true,  category: "combat"   },
    { id: "ecoles-combat",         file: "ecoles-combat.html",        label: "Écoles de Combat",       available: true,  category: "combat"   },
    { id: "ecoles-pro",            file: "ecoles-pro.html",           label: "Écoles Professionnelles",available: false, category: "combat"   },
    { id: "sorcelleries",          file: "sorcelleries.html",         label: "Sorcelleries",           available: false, category: "magie"    },
    { id: "societes-secretes",     file: "societes-secretes.html",    label: "Sociétés Secrètes",      available: false, category: "monde"    },
  ];

  const CATEGORY_LABELS = {
    creation: "Création & Personnage",
    combat:   "Combat & Écoles",
    magie:    "Surnaturel",
    monde:    "Monde de Théah",
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

    // Menu horizontal
    const menuItems = SECTIONS.map((s) => {
      const isCurrent = s.id === currentId;
      const cls =
        "menu-item" +
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
    });

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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
