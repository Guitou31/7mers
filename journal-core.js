// ============================================================
// Cœur partagé du Journal de campagne.
// Lecture de la base (window.JOURNAL_DB), configs de champs par rubrique,
// rendu des listes d'articles, résolution & auto-détection des liens @.
// Chargé sur toutes les pages du journal, AVANT journal-layout.js.
// Expose window.JournalCore.
// ============================================================
(function () {
  "use strict";

  // Après une publication depuis CE navigateur, le journal-data.js servi peut
  // être en retard (cache GitHub Pages ~10 min). La version qu'on vient de
  // publier est gardée en localStorage : si elle est plus récente (rev) que le
  // fichier servi, on l'affiche ; sinon le fichier a rattrapé, on la jette.
  try {
    var _pending = JSON.parse(localStorage.getItem("journal_pending_db") || "null");
    if (_pending && _pending.rev) {
      var _served = window.JOURNAL_DB;
      if (!_served || !_served.rev || _pending.rev > _served.rev) {
        window.JOURNAL_DB = _pending;
      } else {
        localStorage.removeItem("journal_pending_db");
      }
    }
  } catch (e) { }

  // Copies locales des images fraîchement publiées (voir rememberPendingImage
  // dans journal-editer.js) : servies en data-URL tant que le déploiement du
  // site n'a pas rattrapé le commit. Purgées après 30 minutes.
  var PENDING_IMGS = {};
  try {
    var _pimgs = JSON.parse(localStorage.getItem("journal_pending_images") || "{}");
    var _now = Date.now(), _keep = {}, _purged = false;
    Object.keys(_pimgs).forEach(function (k) {
      if (_pimgs[k] && _pimgs[k].t && _now - _pimgs[k].t < 30 * 60 * 1000) _keep[k] = _pimgs[k];
      else _purged = true;
    });
    PENDING_IMGS = _keep;
    if (_purged) localStorage.setItem("journal_pending_images", JSON.stringify(_keep));
  } catch (e) { }
  function imgSrc(p) {
    return (p && PENDING_IMGS[p] && PENDING_IMGS[p].d) || p;
  }

  // Statut singulier d'une rubrique + libellé + icône (icônes via journalIcon).
  var RUBRIQUES = {
    personnages:  { label: "Personnages",  singular: "personnage",   icon: "user" },
    lieux:        { label: "Lieux",         singular: "lieu",          icon: "mappin" },
    cartes:       { label: "Cartes",        singular: "carte",         icon: "map" },
    organisations:{ label: "Organisations", singular: "organisation",  icon: "briefcase" },
    familles:     { label: "Familles",      singular: "famille",       icon: "users" },
    creatures:    { label: "Créatures",     singular: "créature",      icon: "paw" },
    nations:      { label: "Nations",       singular: "nation",        icon: "flag" },
    calendriers:  { label: "Calendriers",   singular: "calendrier",    icon: "calendar" },
    chronologies: { label: "Chronologies",  singular: "chronologie",   icon: "list" },
    journaux:     { label: "Journaux",      singular: "journal",       icon: "book" },
    quetes:       { label: "Quêtes",        singular: "quête",         icon: "compass" },
    objets:       { label: "Objets",        singular: "objet",         icon: "box" },
    services:     { label: "Services",      singular: "service",       icon: "tool" },
    flottille:    { label: "Flottille",     singular: "navire",        icon: "anchor" },
    "routes-commerciales": { label: "Routes commerciales", singular: "route commerciale", icon: "route", fem: true }
  };

  // Champs du formulaire par rubrique. type : text | textarea-rich | select | tags | number.
  // « req » = obligatoire. « half » = demi-largeur (deux colonnes).
  var STATUT_OPTS = ["Vivant", "Mort", "Disparu", "Inconnu"];
  var FIELDS_GENERIC = [
    { key: "name", label: "Nom", type: "text", req: true, placeholder: "Nom de l'entrée" },
    { key: "type", label: "Type", type: "text", half: true, placeholder: "PNJ, Lieu, Autre…" },
    { key: "title", label: "Titre", type: "text", half: true, placeholder: "Titre" },
    { key: "description", label: "Description", type: "textarea-rich" },
    { key: "entrees", label: "Entrées (historique)", type: "entrees" },
    { key: "etiquettes", label: "Étiquettes", type: "tags", placeholder: "espion, noble, …" }
  ];
  var FIELDS = {
    personnages: [
      { key: "name", label: "Personnage", type: "text", req: true, half: true, placeholder: "Nom de l'entrée" },
      { key: "type", label: "Type", type: "select", half: true, options: ["Joueur", "Allié", "Neutre", "Scélérat"], default: "Neutre" },
      { key: "title", label: "Titre", type: "text", half: true, placeholder: "Titre" },
      { key: "familles", label: "Familles", type: "tags", half: true, placeholder: "Écrire, séparé par des virgules" },
      { key: "lieux", label: "Lieux", type: "tags", half: true, placeholder: "Écrire, séparé par des virgules" },
      { key: "nations", label: "Nations", type: "tags", half: true, placeholder: "Écrire, séparé par des virgules" },
      { key: "description", label: "Description", type: "textarea-rich" },
      { key: "entrees", label: "Entrées (historique)", type: "entrees" },
      { key: "age", label: "Âge", type: "text", half: true, placeholder: "Âge" },
      { key: "statut", label: "Statut", type: "select", half: true, options: STATUT_OPTS, default: "Vivant" },
      { key: "sexe", label: "Sexe", type: "text", half: true, placeholder: "Sexe" },
      { key: "pronoms", label: "Pronoms", type: "text", half: true, placeholder: "Il, Elle" },
      { key: "etiquettes", label: "Étiquettes", type: "tags", placeholder: "Écrire, séparé par des virgules" }
    ],
    organisations: [
      { key: "name", label: "Organisation", type: "text", req: true, half: true, placeholder: "Nom de l'organisation" },
      { key: "type", label: "Type", type: "text", half: true, placeholder: "Guilde, Ordre, Société secrète…" },
      { key: "title", label: "Titre", type: "text", half: true, placeholder: "Titre" },
      { key: "lieux", label: "Lieux", type: "tags", half: true, placeholder: "Écrire, séparé par des virgules" },
      { key: "description", label: "Description", type: "textarea-rich" },
      { key: "entrees", label: "Entrées (historique)", type: "entrees" },
      { key: "membres", label: "Membres", type: "membres" },
      { key: "etiquettes", label: "Étiquettes", type: "tags", placeholder: "Écrire, séparé par des virgules" }
    ],
    calendriers: [
      { key: "name", label: "Nom", type: "text", req: true, half: true, placeholder: "Nom du calendrier" },
      { key: "date_actuelle", label: "Date actuelle en jeu", type: "cal-date", half: true },
      { key: "description", label: "Description", type: "textarea-rich" },
      { key: "entrees", label: "Entrées (historique)", type: "entrees" },
      { key: "etiquettes", label: "Étiquettes", type: "tags", placeholder: "Écrire, séparé par des virgules" }
    ],
    quetes: [
      { key: "name", label: "Quête", type: "text", req: true, half: true, placeholder: "Nom de la quête" },
      { key: "statut", label: "Statut", type: "select", half: true, options: ["En cours", "Terminé"], default: "En cours" },
      { key: "type", label: "Type", type: "text", half: true, placeholder: "Principale, Secondaire…" },
      { key: "title", label: "Titre", type: "text", half: true, placeholder: "Titre" },
      { key: "description", label: "Description", type: "textarea-rich" },
      { key: "entrees", label: "Entrées (historique)", type: "entrees" },
      { key: "etiquettes", label: "Étiquettes", type: "tags", placeholder: "Écrire, séparé par des virgules" }
    ]
  };

  function rubriqueMeta(r) { return RUBRIQUES[r] || null; }
  function fieldsFor(r) { return FIELDS[r] || FIELDS_GENERIC; }

  function db() {
    var d = window.JOURNAL_DB || {};
    if (!d.articles) d.articles = {};
    if (!d.changes) d.changes = [];
    return d;
  }
  function articlesOf(r) { return (db().articles[r] || []).slice(); }
  function getArticle(r, id) {
    var list = db().articles[r] || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  // Tous les articles, à plat, avec leur rubrique (pour l'autocomplétion @).
  function allArticles() {
    var out = [];
    var arts = db().articles || {};
    Object.keys(arts).forEach(function (r) {
      (arts[r] || []).forEach(function (a) {
        out.push({ rubrique: r, id: a.id, name: a.name, aliases: a.aliases || [] });
      });
    });
    return out;
  }

  function slugify(s) {
    s = String(s || "");
    if (s.normalize) s = s.normalize("NFKD").replace(/[̀-ͯ]/g, "");
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "sans-nom";
  }

  function articleUrl(r, id) {
    return "journal-article.html?r=" + encodeURIComponent(r) + "&id=" + encodeURIComponent(id);
  }
  function editUrl(r, id) {
    return "journal-editer.html?r=" + encodeURIComponent(r) + (id ? "&id=" + encodeURIComponent(id) : "");
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  // Texte brut depuis une description HTML (pour les extraits de carte).
  // On remplace les fins de bloc et <br> par une espace pour ne pas coller
  // un titre de section au paragraphe suivant.
  function htmlToText(html) {
    var s = String(html || "")
      .replace(/<\s*br\s*\/?>/gi, " ")
      .replace(/<\/(p|div|h[1-6]|li|tr|blockquote)>/gi, " ");
    var d = document.createElement("div");
    d.innerHTML = s;
    return (d.textContent || "").replace(/\s+/g, " ").trim();
  }

  function icon(name, cls) {
    return window.journalIcon ? window.journalIcon(name, cls) : "";
  }

  // --- Auto-détection : relie les noms d'articles cités en clair dans une
  // description déjà rendue (élément DOM), sans toucher aux liens existants. ---
  function autolink(container, selfId) {
    var index = allArticles().filter(function (a) { return a.id !== selfId && a.name; });
    if (!index.length) return;
    // Plus longs noms d'abord (évite de lier « Marek » dans « Marek Wrobleski »).
    index.sort(function (a, b) { return b.name.length - a.name.length; });
    var linkedIds = {};

    index.forEach(function (a) {
      var names = [a.name].concat(a.aliases || []);
      names.forEach(function (nm) {
        if (!nm || nm.length < 3 || linkedIds[a.id]) return;
        var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        var node, target = null, idx = -1;
        var re = new RegExp("(^|[^\\p{L}\\p{N}])(" + escRe(nm) + ")(?=[^\\p{L}\\p{N}]|$)", "iu");
        while ((node = walker.nextNode())) {
          if (node.parentNode && node.parentNode.closest && node.parentNode.closest("a")) continue;
          var m = re.exec(node.nodeValue);
          if (m) { target = node; idx = m.index + m[1].length; break; }
        }
        if (target) {
          var before = target.nodeValue.slice(0, idx);
          var match = target.nodeValue.slice(idx, idx + nm.length);
          var after = target.nodeValue.slice(idx + nm.length);
          var link = document.createElement("a");
          link.className = "j-link";
          link.href = articleUrl(a.rubrique, a.id);
          link.textContent = match;
          var parent = target.parentNode;
          parent.insertBefore(document.createTextNode(before), target);
          parent.insertBefore(link, target);
          parent.insertBefore(document.createTextNode(after), target);
          parent.removeChild(target);
          linkedIds[a.id] = true;
        }
      });
    });
  }
  function escRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // Insère une description (HTML de l'éditeur) dans un élément, puis auto-relie.
  function renderDescription(targetEl, html, selfId) {
    targetEl.innerHTML = html || "";
    try { autolink(targetEl, selfId); } catch (e) { /* regex \p non supporté : on garde les liens @ explicites */ }
  }

  // --- Nations : navigation à deux niveaux (continents → nations) ---
  // Ordre des continents volontairement NON alphabétique (ordre du monde).
  var CONTINENTS = [
    { key: "theah", label: "Theah", nations: ["Avalon", "Castille", "Eisen", "Inismore", "Marche des Highlands", "Montaigne", "Sarmatie", "Ussura", "Vestenmennavenjar", "Vodacce"] },
    { key: "pirates", label: "Nations Pirates", nations: ["Aragosta", "Jaragua", "La Bucca", "Numa", "La Mer Atabéenne (Rahuris)"] },
    { key: "croissant", label: "Empire du Croissant", nations: ["Anatol Ath", "Ashur", "Persis", "Sarmion", "8ème Mer"] },
    { key: "ifri", label: "Ifri", nations: ["Empire Aksoumite", "Khémet", "Maghreb", "Kurafaba mandéniane", "Royame de Mbey"] },
    { key: "cathay", label: "Cathay", nations: ["Agnivarsie", "Fuso", "Han", "Khazari", "Nagaja", "Shenzhou"] },
    { key: "aztlan", label: "Aztlan", nations: ["Alliance Nahucane", "Kuraq", "Tzak K'an"] },
    { key: "tissees", label: "Terres Tissées (1000 Nations)", nations: ["Terres de l'Aube", "Enohtos", "Alliance Sertepe"] }
  ];

  function urlParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }
  // Normalise un nom de nation pour l'appariement (accents, article de tête).
  function normName(s) {
    s = String(s || "");
    if (s.normalize) s = s.normalize("NFKD").replace(/[̀-ͯ]/g, "");
    return s.toLowerCase().replace(/^(?:la|le|les|l'|the)\s+/, "").replace(/\s+/g, " ").trim();
  }
  // Index normalisé (nom + alias) -> article de la rubrique nations.
  function nationIndex() {
    var idx = {};
    articlesOf("nations").forEach(function (a) {
      idx[normName(a.name)] = a;
      (a.aliases || []).forEach(function (al) { idx[normName(al)] = a; });
    });
    return idx;
  }
  function continentByKey(k) {
    for (var i = 0; i < CONTINENTS.length; i++) if (CONTINENTS[i].key === k) return CONTINENTS[i];
    return null;
  }
  function continentOf(nationName) {
    var n = normName(nationName);
    for (var i = 0; i < CONTINENTS.length; i++) {
      for (var j = 0; j < CONTINENTS[i].nations.length; j++) {
        if (normName(CONTINENTS[i].nations[j]) === n) return CONTINENTS[i];
      }
    }
    return null;
  }

  // Citation d'ouverture (épigraphe) d'une fiche, SANS l'auteur.
  function epigraphQuote(htmlDesc) {
    var m = /<blockquote>([\s\S]*?)<\/blockquote>/.exec(htmlDesc || "");
    if (!m) return "";
    var inner = m[1].replace(/<br>\s*<cite>[\s\S]*?<\/cite>/i, "");
    var q = htmlToText(inner);
    // Retire un « — Auteur » accolé en fin de citation (en plus du <cite>).
    return q.replace(/\s*[—–]\s*[A-ZÀ-Þ][^—–]{0,45}$/, "").trim();
  }

  function natCard(a) {
    var quote = epigraphQuote(a.description);
    var body = quote
      ? "<div class='j-card-quote'>" + esc(quote) + "</div>"
      : (function () {
          var s = htmlToText(a.description).slice(0, 110);
          return s ? "<div class='j-card-snippet'>" + esc(s) + "</div>" : "";
        })();
    return "<a class='j-card" + (a.image ? " has-thumb" : "") + "' href='" + articleUrl("nations", a.id) + "'>" +
      (a.image || a.thumb ? "<div class='j-card-thumb" + (a.thumb ? " is-custom" : "") + "'><img src='" + esc(imgSrc(a.thumb || a.image)) + "' alt='' loading='lazy'></div>" : "") +
      "<div class='j-card-body'><div class='j-card-name'>" + esc(a.name) + "</div>" + body + "</div></a>";
  }

  function renderNations(mainEl) {
    if (!mainEl) return false;
    var idx = nationIndex();
    var key = urlParam("continent");

    if (!key) {
      // Niveau 1 : les continents (ordre fixe).
      var cards = CONTINENTS.map(function (c) {
        var overview = idx[normName(c.label)];
        var img = overview && (overview.thumb || overview.image);
        return "<a class='j-card" + (img ? " has-thumb" : "") + "' href='journal-nations.html?continent=" + encodeURIComponent(c.key) + "'>" +
          (img ? "<div class='j-card-thumb" + (overview.thumb ? " is-custom" : "") + "'><img src='" + esc(imgSrc(img)) + "' alt='' loading='lazy'></div>" : "") +
          "<div class='j-card-body'><div class='j-card-name'>" + esc(c.label) + "</div>" +
          "<div class='j-card-meta'>" + c.nations.length + " nations</div></div></a>";
      }).join("");
      // Filet de sécurité : nations sans continent connu (jamais orphelines).
      var known = {};
      CONTINENTS.forEach(function (c) {
        known[normName(c.label)] = 1;
        c.nations.forEach(function (nm) { known[normName(nm)] = 1; });
      });
      var orphans = articlesOf("nations").filter(function (a) {
        if (known[normName(a.name)]) return false;
        return !(a.aliases || []).some(function (al) { return known[normName(al)]; });
      }).sort(function (a, b) { return a.name.localeCompare(b.name, "fr"); });
      var orphHtml = orphans.length
        ? "<div class='j-dash-section-title'>Autres nations</div><div class='j-card-grid'>" +
            orphans.map(natCard).join("") + "</div>"
        : "";

      mainEl.innerHTML =
        "<div class='j-actions'><a class='j-btn-add' href='" + editUrl("nations") + "'><span class='j-plus'>+</span> Ajouter une nation</a></div>" +
        "<div class='j-card-grid'>" + cards + "</div>" + orphHtml;
      return true;
    }

    // Niveau 2 : nations d'un continent (alphabétique).
    var cont = continentByKey(key);
    if (!cont) { mainEl.innerHTML = "<div class='j-empty'><p>Continent inconnu.</p></div>"; return true; }
    var overview = idx[normName(cont.label)];
    var hasDesc = overview && htmlToText(overview.description);
    var hero = (overview && overview.image)
      ? "<div class='j-article-hero'><img src='" + esc(imgSrc(overview.image)) + "' alt='" + esc(cont.label) + "'></div>"
      : "";
    var ov = hasDesc ? "<div class='j-cont-desc j-desc'></div>" : "";
    var noms = cont.nations.slice().sort(function (a, b) { return a.localeCompare(b, "fr"); });
    var cards2 = noms.map(function (nm) {
      var a = idx[normName(nm)];
      if (a) return natCard(a);
      return "<a class='j-card j-card-todo' href='" + editUrl("nations") + "&name=" + encodeURIComponent(nm) + "'>" +
        "<div class='j-card-body'><div class='j-card-name'>" + esc(nm) + "</div>" +
        "<div class='j-card-meta'>à détailler</div></div></a>";
    }).join("");
    mainEl.innerHTML =
      "<div class='j-actions'><a class='j-btn-ghost' href='journal-nations.html'>← Tous les continents</a></div>" +
      "<div class='j-crumb'><a href='journal-nations.html'>Nations</a> <span>›</span> " + esc(cont.label) + "</div>" +
      hero + ov +
      "<div class='j-dash-section-title'>Les nations</div>" +
      "<div class='j-card-grid'>" + cards2 + "</div>";
    // Description complète du continent (avec liens @ résolus).
    var dEl = mainEl.querySelector(".j-cont-desc");
    if (dEl && overview) renderDescription(dEl, overview.description, overview.id);
    return true;
  }

  // --- Rendu de la liste d'une rubrique (appelé par journal-layout sur les
  // pages de rubrique). Remplit #journal-main. ---
  // Carte d'article générique (nom + méta + extrait). hideStatut : n'affiche
  // pas le statut dans la méta (utile quand il est déjà porté par le groupe).
  // extraAttr : attributs HTML supplémentaires sur la carte (ex. data-cat).
  function card(a, r, hideStatut, extraAttr) {
    var snippet = htmlToText(a.description).slice(0, 130);
    var meta2 = [a.type, hideStatut ? "" : a.statut].filter(Boolean).join(" · ");
    return "<a " + (extraAttr ? extraAttr + " " : "") + "class='j-card" + (a.image || a.thumb ? " has-thumb" : "") + "' href='" + articleUrl(r, a.id) + "'>" +
      (a.image || a.thumb ? "<div class='j-card-thumb" + (a.thumb ? " is-custom" : "") + "'><img src='" + esc(imgSrc(a.thumb || a.image)) + "' alt='' loading='lazy'></div>" : "") +
      "<div class='j-card-body'>" +
      "<div class='j-card-name'>" + esc(a.name) + "</div>" +
      (meta2 ? "<div class='j-card-meta'>" + esc(meta2) + "</div>" : "") +
      (snippet ? "<div class='j-card-snippet'>" + esc(snippet) + "</div>" : "") +
      "</div></a>";
  }

  function emptyState(meta) {
    var un = meta.fem ? "une" : "un";
    return "<div class='j-empty'>" + icon(meta.icon, "j-empty-ico") +
      "<p>Aucun" + (meta.fem ? "e" : "") + " " + esc(meta.singular) + " pour l'instant.</p>" +
      "<p class='j-empty-hint'>Clique sur « Ajouter " + un + " " + esc(meta.singular) +
      " » pour créer ton premier article.</p></div>";
  }

  function renderRubriqueList(r, mainEl) {
    var meta = rubriqueMeta(r);
    if (!meta || !mainEl) return false;
    var arts = articlesOf(r).sort(function (a, b) {
      return (a.name || "").localeCompare(b.name || "", "fr");
    });
    var addBtn = "<a class='j-btn-add' href='" + editUrl(r) + "'>" +
      "<span class='j-plus'>+</span> Ajouter " + (meta.fem ? "une" : "un") + " " + esc(meta.singular) + "</a>";
    var body = arts.length
      ? "<div class='j-card-grid'>" + arts.map(function (a) { return card(a, r, false); }).join("") + "</div>"
      : emptyState(meta);
    mainEl.innerHTML = "<div class='j-actions'>" + addBtn + "</div>" + body;
    return true;
  }

  // Personnages : filtre à pastilles par type (Joueurs / Scélérats / Neutres /
  // Alliés). Les types hors catégories (ex. PNJ pas encore reclassé) vont
  // sous une pastille « Autres », affichée seulement si nécessaire.
  var PERSO_CATS = [
    { key: "joueurs", label: "Joueurs", match: /^joueur/ },
    { key: "scelerats", label: "Scélérats", match: /^scelerat/ },
    { key: "neutres", label: "Neutres", match: /^neutre/ },
    { key: "allies", label: "Alliés", match: /^allie/ }
  ];
  function persoCat(a) {
    var t = normName(a.type || "");
    for (var i = 0; i < PERSO_CATS.length; i++) {
      if (PERSO_CATS[i].match.test(t)) return PERSO_CATS[i].key;
    }
    return "autres";
  }

  function renderPersonnages(mainEl) {
    var meta = rubriqueMeta("personnages");
    if (!meta || !mainEl) return false;
    var arts = articlesOf("personnages").sort(function (a, b) {
      return (a.name || "").localeCompare(b.name || "", "fr");
    });
    var addBtn = "<a class='j-btn-add' href='" + editUrl("personnages") +
      "'><span class='j-plus'>+</span> Ajouter un personnage</a>";
    if (!arts.length) {
      mainEl.innerHTML = "<div class='j-actions'>" + addBtn + "</div>" + emptyState(meta);
      return true;
    }

    var counts = { autres: 0 };
    PERSO_CATS.forEach(function (c) { counts[c.key] = 0; });
    var cards = arts.map(function (a) {
      var cat = persoCat(a);
      counts[cat]++;
      return card(a, "personnages", false, "data-cat='" + cat + "'");
    }).join("");

    var chips = "<div class='j-filter'>" +
      "<button class='j-chip is-active' data-f='all' type='button'>Tous (" + arts.length + ")</button>" +
      PERSO_CATS.map(function (c) {
        return "<button class='j-chip' data-f='" + c.key + "' type='button'>" +
          c.label + " (" + counts[c.key] + ")</button>";
      }).join("") +
      (counts.autres
        ? "<button class='j-chip' data-f='autres' type='button'>Autres (" + counts.autres + ")</button>"
        : "") +
      "</div>";

    mainEl.innerHTML = "<div class='j-actions'>" + addBtn + "</div>" + chips +
      "<div class='j-card-grid'>" + cards + "</div>";

    var chipEls = mainEl.querySelectorAll(".j-chip");
    var cardEls = mainEl.querySelectorAll(".j-card-grid .j-card");
    Array.prototype.forEach.call(chipEls, function (chip) {
      chip.addEventListener("click", function () {
        Array.prototype.forEach.call(chipEls, function (c) { c.classList.toggle("is-active", c === chip); });
        var f = chip.getAttribute("data-f");
        Array.prototype.forEach.call(cardEls, function (elc) {
          elc.style.display = (f === "all" || elc.getAttribute("data-cat") === f) ? "" : "none";
        });
      });
    });
    return true;
  }

  // --- Calendrier Théan (structure reprise du calendrier Kanka) ---
  // 358 jours/an : Janvier 30, Février 28, puis 30 pour tous les autres.
  // Ancrage vérifié : le 1er Janvier 1667 est un Mardi.
  var CAL = {
    months: [["Janvier", 30], ["Février", 28], ["Mars", 30], ["Avril", 30], ["Mai", 30], ["Juin", 30],
             ["Juillet", 30], ["Août", 30], ["Septembre", 30], ["Octobre", 30], ["Novembre", 30], ["Décembre", 30]],
    weekdays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    minYear: 1667,                       // le calendrier commence en Janvier 1667
    anchor: { y: 1667, m: 1, wd: 1 },    // 1er Janvier 1667 = Mardi (index 1)
    current: { y: 1667, m: 4, d: 10 }    // date « actuelle » de la campagne
  };
  var CAL_YEAR_DAYS = CAL.months.reduce(function (s, m) { return s + m[1]; }, 0);

  function calDaysFromAnchor(y, m, d) {
    var days = (y - CAL.anchor.y) * CAL_YEAR_DAYS;
    for (var i = 0; i < m - 1; i++) days += CAL.months[i][1];
    return days + (d - 1);
  }
  function calWeekday(y, m, d) {
    var wd = (CAL.anchor.wd + calDaysFromAnchor(y, m, d)) % 7;
    return (wd + 7) % 7;
  }
  function calFormat(c) {
    if (!c || !c.m) return "";
    return c.d + " " + CAL.months[c.m - 1][0] + ", " + c.y;
  }
  // Date « actuelle » de la campagne : définie sur la fiche du calendrier
  // (champ date_actuelle, éditable), sinon valeur par défaut.
  function calCurrent() {
    var cal = (articlesOf("calendriers") || [])[0];
    var c = cal && cal.date_actuelle;
    if (c && c.y && c.m && c.d) return { y: +c.y, m: +c.m, d: +c.d };
    return CAL.current;
  }

  // Tous les événements liés au calendrier : les entrées (historique) de
  // n'importe quel article qui portent une date structurée `cal {y,m,d}`.
  function calEvents() {
    var out = [];
    var arts = db().articles || {};
    Object.keys(arts).forEach(function (r) {
      (arts[r] || []).forEach(function (a) {
        (a.entrees || []).forEach(function (en) {
          if (en.cal && en.cal.y && en.cal.m && en.cal.d) {
            out.push({ y: +en.cal.y, m: +en.cal.m, d: +en.cal.d, name: en.name || "Entrée",
                       rubrique: r, artId: a.id, artName: a.name, enId: en.id || "",
                       dateTxt: en.date || "", html: en.html || "" });
          }
        });
      });
    });
    return out;
  }

  // Popup de survol des événements du calendrier (élément unique réutilisé).
  var calPopEl = null;
  function showCalPop(chip, ev) {
    if (!ev) return;
    if (!calPopEl) {
      calPopEl = document.createElement("div");
      calPopEl.className = "j-cal-pop";
      document.body.appendChild(calPopEl);
    }
    var excerpt = htmlToText(ev.html).slice(0, 220);
    calPopEl.innerHTML =
      "<div class='j-cal-pop-title'>" + esc(ev.name) + "</div>" +
      (ev.dateTxt || calFormat(ev) ? "<div class='j-cal-pop-date'>" + esc(ev.dateTxt || calFormat(ev)) + "</div>" : "") +
      (excerpt ? "<div class='j-cal-pop-body'>" + esc(excerpt) + (htmlToText(ev.html).length > 220 ? "…" : "") + "</div>" : "") +
      "<div class='j-cal-pop-foot'>→ " + esc(ev.artName) + "</div>";
    var r = chip.getBoundingClientRect();
    var left = Math.max(8, Math.min(r.left + window.scrollX, window.scrollX + document.documentElement.clientWidth - 320));
    calPopEl.style.left = left + "px";
    calPopEl.style.top = (r.bottom + window.scrollY + 6) + "px";
    calPopEl.style.display = "block";
  }
  function hideCalPop() {
    if (calPopEl) calPopEl.style.display = "none";
  }

  // Vue mensuelle interactive (navigation mois/année, événements cliquables).
  function renderCalendar(mount, viewY, viewM) {
    var cur = calCurrent();
    var y = +viewY || cur.y, m = +viewM || cur.m;
    if (y < CAL.minYear) { y = CAL.minYear; m = 1; }
    var events = calEvents();
    hideCalPop();

    function nav(dy, dm) {
      var ny = y + dy, nm = m + dm;
      if (nm < 1) { nm = 12; ny--; }
      if (nm > 12) { nm = 1; ny++; }
      if (ny < CAL.minYear || (ny === CAL.minYear && nm < 1)) { ny = CAL.minYear; nm = Math.max(1, nm); }
      if (ny < CAL.minYear) { ny = CAL.minYear; nm = 1; }
      renderCalendar(mount, ny, nm);
    }

    var len = CAL.months[m - 1][1];
    var first = calWeekday(y, m, 1);
    var html = "<div class='j-cal-today'>Aujourd'hui en jeu : <strong>" + esc(calFormat(cur)) + "</strong>" +
      "<span class='j-cal-today-hint'>(modifiable via « Éditer »)</span></div>" +
      "<div class='j-cal-nav'>" +
      "<button class='j-chip' data-nav='today' type='button'>Aujourd'hui</button>" +
      "<span class='j-cal-navgrp'><button class='j-chip' data-nav='pm' type='button' aria-label='Mois précédent'>‹</button>" +
      "<strong class='j-cal-title'>" + esc(CAL.months[m - 1][0]) + " " + y + "</strong>" +
      "<button class='j-chip' data-nav='nm' type='button' aria-label='Mois suivant'>›</button></span>" +
      "<span class='j-cal-navgrp'><button class='j-chip' data-nav='py' type='button' aria-label='Année précédente'>«</button>" +
      "<span class='j-cal-year'>" + y + "</span>" +
      "<button class='j-chip' data-nav='ny' type='button' aria-label='Année suivante'>»</button></span>" +
      "</div><div class='j-cal-scroll'><table class='j-cal'><thead><tr>" +
      CAL.weekdays.map(function (w) { return "<th>" + w + "</th>"; }).join("") +
      "</tr></thead><tbody>";

    var day = 1;
    while (day <= len) {
      html += "<tr>";
      for (var c = 0; c < 7; c++) {
        if ((day === 1 && c < first) || day > len) { html += "<td class='j-cal-empty'></td>"; continue; }
        var isToday = (y === cur.y && m === cur.m && day === cur.d);
        var evHtml = "";
        for (var k = 0; k < events.length; k++) {
          var e = events[k];
          if (e.y === y && e.m === m && e.d === day) {
            evHtml += "<a class='j-cal-ev' data-ev='" + k + "' href='" + articleUrl(e.rubrique, e.artId) +
              (e.enId ? "#" + esc(e.enId) : "") + "'>" + esc(e.name) + "</a>";
          }
        }
        html += "<td class='j-cal-day" + (isToday ? " is-today" : "") + "'>" +
          "<span class='j-cal-num'>" + day + "</span>" + evHtml + "</td>";
        day++;
      }
      html += "</tr>";
    }
    html += "</tbody></table></div>";
    mount.innerHTML = html;

    mount.querySelector("[data-nav='pm']").addEventListener("click", function () { nav(0, -1); });
    mount.querySelector("[data-nav='nm']").addEventListener("click", function () { nav(0, 1); });
    mount.querySelector("[data-nav='py']").addEventListener("click", function () { nav(-1, 0); });
    mount.querySelector("[data-nav='ny']").addEventListener("click", function () { nav(1, 0); });
    mount.querySelector("[data-nav='today']").addEventListener("click", function () {
      var c = calCurrent();
      renderCalendar(mount, c.y, c.m);
    });
    // Popup de survol : montre l'entrée (titre, date, extrait), pas l'article.
    Array.prototype.forEach.call(mount.querySelectorAll(".j-cal-ev"), function (chip) {
      chip.addEventListener("mouseenter", function () {
        showCalPop(chip, events[+chip.getAttribute("data-ev")]);
      });
      chip.addEventListener("mouseleave", hideCalPop);
    });
  }

  // Quêtes : en cours mises en avant en haut, terminées séparées plus bas,
  // avec un filtre (Toutes / En cours / Terminées).
  function isQueteDone(a) { return /^(termin|fini|complet|accompli|reussi|echou)/.test((a.statut || "").toLowerCase()); }

  function renderQuetes(mainEl) {
    var meta = rubriqueMeta("quetes");
    if (!meta || !mainEl) return false;
    var arts = articlesOf("quetes").sort(function (a, b) { return (a.name || "").localeCompare(b.name || "", "fr"); });
    var addBtn = "<a class='j-btn-add' href='" + editUrl("quetes") + "'><span class='j-plus'>+</span> Ajouter une quête</a>";
    if (!arts.length) {
      mainEl.innerHTML = "<div class='j-actions'>" + addBtn + "</div>" + emptyState(meta);
      return true;
    }
    var encours = arts.filter(function (a) { return !isQueteDone(a); });
    var termine = arts.filter(isQueteDone);

    function grp(label, cls, list) {
      if (!list.length) return "";
      return "<div class='j-quete-group " + cls + "'><div class='j-quete-title'>" + label + "</div>" +
        "<div class='j-card-grid'>" + list.map(function (a) { return card(a, "quetes", true); }).join("") + "</div></div>";
    }
    var filter = "<div class='j-filter'>" +
      "<button class='j-chip is-active' data-f='all' type='button'>Toutes</button>" +
      "<button class='j-chip' data-f='encours' type='button'>En cours (" + encours.length + ")</button>" +
      "<button class='j-chip' data-f='termine' type='button'>Terminées (" + termine.length + ")</button></div>";

    mainEl.innerHTML = "<div class='j-actions'>" + addBtn + "</div>" + filter +
      grp("En cours", "grp-encours", encours) + grp("Terminées", "grp-termine", termine);

    var chips = mainEl.querySelectorAll(".j-chip");
    var groups = mainEl.querySelectorAll(".j-quete-group");
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener("click", function () {
        Array.prototype.forEach.call(chips, function (c) { c.classList.toggle("is-active", c === chip); });
        var f = chip.getAttribute("data-f");
        Array.prototype.forEach.call(groups, function (g) {
          g.style.display = (f === "all" || g.classList.contains("grp-" + f)) ? "" : "none";
        });
      });
    });
    return true;
  }

  window.JournalCore = {
    RUBRIQUES: RUBRIQUES,
    rubriqueMeta: rubriqueMeta,
    fieldsFor: fieldsFor,
    db: db,
    articlesOf: articlesOf,
    getArticle: getArticle,
    allArticles: allArticles,
    slugify: slugify,
    articleUrl: articleUrl,
    editUrl: editUrl,
    esc: esc,
    imgSrc: imgSrc,
    htmlToText: htmlToText,
    renderDescription: renderDescription,
    renderRubriqueList: renderRubriqueList,
    renderNations: renderNations,
    renderQuetes: renderQuetes,
    renderPersonnages: renderPersonnages,
    CAL: CAL,
    calFormat: calFormat,
    calCurrent: calCurrent,
    renderCalendar: renderCalendar,
    continentOf: continentOf,
    CONTINENTS: CONTINENTS,
    isRubrique: function (id) { return !!RUBRIQUES[id]; }
  };
})();
