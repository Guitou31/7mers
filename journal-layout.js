// Mise en page du Journal de campagne : barre latérale sombre (façon Kanka)
// injectée dans #journal-sidebar, en-tête de page auto dans #journal-pagehead,
// et état vide par défaut si #journal-main est vide.
//
// Chaque page du journal doit :
//   - avoir <body data-page="journal-xxx">
//   - inclure style.css + journal.css
//   - contenir la structure .journal-shell (voir n'importe quelle page journal-*.html)
//   - inclure journal-changements.js (données) AVANT ce script, puis ce script.

(function () {
  "use strict";

  var CAMPAIGN_TITLE = "7ème Mer CRJR";

  // --- Icônes (SVG inline, viewBox 0 0 24 24). fill:true → rempli, sinon tracé. ---
  var ICONS = {
    home: "<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><polyline points='9 22 9 12 15 12 15 22'/>",
    bookmark: "<path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/>",
    activity: "<polyline points='22 12 18 12 15 21 9 3 6 12 2 12'/>",
    user: "<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/>",
    mappin: "<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'/><circle cx='12' cy='10' r='3'/>",
    map: "<polygon points='1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6'/><line x1='8' y1='2' x2='8' y2='18'/><line x1='16' y1='6' x2='16' y2='22'/>",
    briefcase: "<rect x='2' y='7' width='20' height='14' rx='2' ry='2'/><path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'/>",
    users: "<path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M23 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/>",
    paw: { fill: true, svg: "<circle cx='5.5' cy='11' r='2'/><circle cx='9.5' cy='6.8' r='2'/><circle cx='14.5' cy='6.8' r='2'/><circle cx='18.5' cy='11' r='2'/><path d='M12 12c-2.8 0-5 2.2-5 4.6 0 1.7 1.3 2.9 3 2.9 .9 0 1.4-.35 2-.35s1.1.35 2 .35c1.7 0 3-1.2 3-2.9 0-2.4-2.2-4.6-5-4.6z'/>" },
    flag: "<path d='M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z'/><line x1='4' y1='22' x2='4' y2='15'/>",
    calendar: "<rect x='3' y='4' width='18' height='18' rx='2' ry='2'/><line x1='16' y1='2' x2='16' y2='6'/><line x1='8' y1='2' x2='8' y2='6'/><line x1='3' y1='10' x2='21' y2='10'/>",
    list: "<line x1='8' y1='6' x2='21' y2='6'/><line x1='8' y1='12' x2='21' y2='12'/><line x1='8' y1='18' x2='21' y2='18'/><line x1='3' y1='6' x2='3.01' y2='6'/><line x1='3' y1='12' x2='3.01' y2='12'/><line x1='3' y1='18' x2='3.01' y2='18'/>",
    book: "<path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/><path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/>",
    compass: "<circle cx='12' cy='12' r='10'/><polygon points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76'/>",
    box: "<line x1='16.5' y1='9.4' x2='7.5' y2='4.21'/><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/><polyline points='3.27 6.96 12 12.01 20.73 6.96'/><line x1='12' y1='22.08' x2='12' y2='12'/>",
    tool: "<path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/>",
    anchor: "<circle cx='12' cy='5' r='3'/><line x1='12' y1='22' x2='12' y2='8'/><path d='M5 12H2a10 10 0 0 0 20 0h-3'/>",
    route: "<circle cx='6' cy='19' r='3'/><circle cx='18' cy='5' r='3'/><path d='M12 19h4.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H12'/>",
    back: "<line x1='19' y1='12' x2='5' y2='12'/><polyline points='12 19 5 12 12 5'/>"
  };

  // --- Sections du menu (ordre = ordre d'affichage). « top » = hors catégorie. ---
  var SECTIONS = [
    { id: "journal-tableau-de-bord", file: "journal-tableau-de-bord.html", label: "Tableau de bord", icon: "home", top: true, desc: "Vue d'ensemble de la campagne." },
    { id: "journal-favoris", file: "journal-favoris.html", label: "Favoris", icon: "bookmark", top: true, desc: "Tes articles épinglés." },
    { id: "journal-changements", file: "journal-changements.html", label: "Changements récents", icon: "activity", top: true, desc: "Activité récente de la campagne." },

    { id: "journal-personnages", file: "journal-personnages.html", label: "Personnages", icon: "user", category: "monde", desc: "Les figures de la campagne." },
    { id: "journal-lieux", file: "journal-lieux.html", label: "Lieux", icon: "mappin", category: "monde", desc: "Les endroits visités ou évoqués." },
    { id: "journal-cartes", file: "journal-cartes.html", label: "Cartes", icon: "map", category: "monde", desc: "Cartes et plans." },
    { id: "journal-organisations", file: "journal-organisations.html", label: "Organisations", icon: "briefcase", category: "monde", desc: "Guildes, ordres et factions." },
    { id: "journal-familles", file: "journal-familles.html", label: "Familles", icon: "users", category: "monde", desc: "Lignées et maisonnées." },
    { id: "journal-creatures", file: "journal-creatures.html", label: "Créatures", icon: "paw", category: "monde", desc: "Bêtes et monstres rencontrés." },
    { id: "journal-nations", file: "journal-nations.html", label: "Nations", icon: "flag", category: "monde", desc: "Les nations de Théah et d'ailleurs." },

    { id: "journal-calendriers", file: "journal-calendriers.html", label: "Calendriers", icon: "calendar", category: "temps", desc: "Calendriers de la campagne." },
    { id: "journal-chronologies", file: "journal-chronologies.html", label: "Chronologies", icon: "list", category: "temps", desc: "Frises et lignes du temps." },
    { id: "journal-journaux", file: "journal-journaux.html", label: "Journaux", icon: "book", category: "temps", desc: "Récits de séance et journaux de bord." },

    { id: "journal-quetes", file: "journal-quetes.html", label: "Quêtes", icon: "compass", category: "jeu", desc: "Intrigues et objectifs en cours." },
    { id: "journal-objets", file: "journal-objets.html", label: "Objets", icon: "box", category: "jeu", desc: "Objets notables et trésors." },

    { id: "journal-services", file: "journal-services.html", label: "Services", icon: "tool", category: "commerce", desc: "Prestations et savoir-faire monnayables." },
    { id: "journal-flottille", file: "journal-flottille.html", label: "Flottille", icon: "anchor", category: "commerce", desc: "Les navires de la compagnie." },
    { id: "journal-routes-commerciales", file: "journal-routes-commerciales.html", label: "Routes commerciales", icon: "route", category: "commerce", desc: "Itinéraires marchands et comptoirs." }
  ];
  var CATEGORY_LABELS = { monde: "Monde", temps: "Temps", jeu: "Jeu", commerce: "Commerce" };

  // Expose pour les autres scripts (tableau de bord, changements…).
  window.JOURNAL_SECTIONS = SECTIONS;
  window.JOURNAL_ICONS = ICONS;

  // --- Helpers ---
  function iconHtml(name, cls) {
    var ic = ICONS[name];
    if (!ic) return "";
    var inner = typeof ic === "string" ? ic : ic.svg;
    var fill = (typeof ic === "object" && ic.fill);
    var klass = (cls || "j-ico") + (fill ? " fill" : "");
    return "<span class='" + klass + "'><svg viewBox='0 0 24 24' aria-hidden='true'>" + inner + "</svg></span>";
  }
  // Exposé pour réutilisation (tableau de bord).
  window.journalIcon = iconHtml;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function currentId() {
    return (document.body && document.body.dataset && document.body.dataset.page) || "";
  }
  function sectionById(id) {
    for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].id === id) return SECTIONS[i];
    return null;
  }

  // « Mis à jour il y a X » à partir d'une date ISO (YYYY-MM-DD).
  function relativeFr(iso) {
    if (!iso) return "";
    var parts = String(iso).split("-");
    if (parts.length < 3) return "";
    var d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
    var now = window.JOURNAL_NOW ? new Date(window.JOURNAL_NOW) : new Date();
    var days = Math.floor((now - d) / 86400000);
    if (isNaN(days)) return "";
    if (days <= 0) return "aujourd'hui";
    if (days === 1) return "hier";
    if (days < 30) return "il y a " + days + " jours";
    var months = Math.floor(days / 30);
    if (months < 12) return "il y a " + months + " mois";
    var years = Math.floor(days / 365);
    return "il y a " + years + (years === 1 ? " an" : " ans");
  }

  // --- Construction de la barre latérale ---
  function buildSidebar(mount) {
    mount.innerHTML = "";
    var changes = (window.JOURNAL_DB && window.JOURNAL_DB.changes) || [];
    var lastDate = changes.length ? changes[0].date
      : (window.JOURNAL_CHANGEMENTS && window.JOURNAL_CHANGEMENTS.lastUpdated);

    var head = el("div", "j-head");
    head.appendChild(el("div", "j-head-title", CAMPAIGN_TITLE));
    var rel = relativeFr(lastDate);
    head.appendChild(el("div", "j-head-sub", rel ? "Mis à jour " + rel : "Journal de campagne"));
    var back = el("a", "j-back");
    back.href = "index.html";
    back.innerHTML = iconHtml("back", "") + "<span>Retour au Bréviaire</span>";
    head.appendChild(back);
    mount.appendChild(head);

    var nav = el("nav", "j-nav");
    nav.setAttribute("aria-label", "Sections du journal");
    var cur = currentId();

    function addItem(s) {
      var a = el("a", "j-item" + (s.id === cur ? " is-current" : ""));
      a.href = s.file;
      // Calendriers : s'il n'y a qu'un seul calendrier, mener directement
      // à sa fiche plutôt qu'à une liste d'un seul élément.
      if (s.id === "journal-calendriers" && window.JournalCore) {
        var cals = window.JournalCore.articlesOf("calendriers");
        if (cals.length === 1) a.href = window.JournalCore.articleUrl("calendriers", cals[0].id);
      }
      a.setAttribute("data-category", s.category || "top");
      a.setAttribute("data-sec", s.id);
      if (s.id === cur) a.setAttribute("aria-current", "page");
      a.innerHTML = iconHtml(s.icon) + "<span>" + s.label + "</span>";
      nav.appendChild(a);
    }

    // Items « top » (Tableau de bord, Favoris, Changements récents).
    SECTIONS.filter(function (s) { return s.top; }).forEach(addItem);

    // Groupes par catégorie.
    var cats = [];
    SECTIONS.forEach(function (s) {
      if (s.category && cats.indexOf(s.category) < 0) cats.push(s.category);
    });
    cats.forEach(function (cat) {
      nav.appendChild(el("div", "j-cat", CATEGORY_LABELS[cat] || cat));
      SECTIONS.filter(function (s) { return s.category === cat; }).forEach(addItem);
    });

    mount.appendChild(nav);
  }

  // --- En-tête de page + état vide ---
  function buildPageHead(mount) {
    var s = sectionById(currentId());
    if (!s) return;
    mount.innerHTML =
      iconHtml(s.icon, "ph-ico") +
      "<div class='ph-text'><h1>" + s.label + "</h1>" +
      (s.desc ? "<div class='ph-sub'>" + s.desc + "</div>" : "") +
      "</div>";
  }

  function fillEmptyState(main) {
    if (!main) return;
    // Ne rien faire si la page a déjà du contenu.
    if (main.querySelector("*") || (main.textContent || "").trim()) return;
    var s = sectionById(currentId());
    var label = s ? s.label.toLowerCase() : "cette rubrique";
    main.appendChild(el("div", "j-empty",
      iconHtml(s ? s.icon : "book", "j-empty-ico") +
      "<p>Rien dans « " + (s ? s.label : "cette rubrique") + " » pour l'instant.</p>" +
      "<p class='j-empty-hint'>Ajoute tes articles directement dans cette page (" +
      (s ? s.file : "") + ").</p>"));
  }

  // --- Toggle mobile ---
  function wireMobile() {
    var toggle = document.getElementById("journal-toggle");
    var sidebar = document.getElementById("journal-sidebar");
    if (!toggle || !sidebar) return;
    var shell = document.querySelector(".journal-shell");
    var backdrop = el("div", "journal-backdrop");
    if (shell) shell.appendChild(backdrop);

    function setOpen(open) {
      sidebar.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    toggle.addEventListener("click", function () {
      setOpen(!sidebar.classList.contains("is-open"));
    });
    backdrop.addEventListener("click", function () { setOpen(false); });
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest(".j-item")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function init() {
    var sidebar = document.getElementById("journal-sidebar");
    if (sidebar) buildSidebar(sidebar);
    var head = document.getElementById("journal-pagehead");
    if (head) buildPageHead(head);
    // Sur une page de rubrique, afficher la liste de ses articles (+ bouton Ajouter).
    var main = document.getElementById("journal-main");
    var rub = currentId().replace(/^journal-/, "");
    if (main && window.JournalCore && window.JournalCore.isRubrique(rub)) {
      if (rub === "nations" && window.JournalCore.renderNations) {
        window.JournalCore.renderNations(main);
      } else if (rub === "quetes" && window.JournalCore.renderQuetes) {
        window.JournalCore.renderQuetes(main);
      } else if (rub === "personnages" && window.JournalCore.renderPersonnages) {
        window.JournalCore.renderPersonnages(main);
      } else {
        window.JournalCore.renderRubriqueList(rub, main);
      }
    } else {
      fillEmptyState(main);
    }
    wireMobile();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
