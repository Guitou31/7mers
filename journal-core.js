// ============================================================
// Cœur partagé du Journal de campagne.
// Lecture de la base (window.JOURNAL_DB), configs de champs par rubrique,
// rendu des listes d'articles, résolution & auto-détection des liens @.
// Chargé sur toutes les pages du journal, AVANT journal-layout.js.
// Expose window.JournalCore.
// ============================================================
(function () {
  "use strict";

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
    objets:       { label: "Objets",        singular: "objet",         icon: "box" }
  };

  // Champs du formulaire par rubrique. type : text | textarea-rich | select | tags | number.
  // « req » = obligatoire. « half » = demi-largeur (deux colonnes).
  var STATUT_OPTS = ["Vivant", "Mort", "Disparu", "Inconnu"];
  var FIELDS_GENERIC = [
    { key: "name", label: "Nom", type: "text", req: true, placeholder: "Nom de l'entrée" },
    { key: "type", label: "Type", type: "text", half: true, placeholder: "PNJ, Lieu, Autre…" },
    { key: "title", label: "Titre", type: "text", half: true, placeholder: "Titre" },
    { key: "description", label: "Description", type: "textarea-rich" },
    { key: "etiquettes", label: "Étiquettes", type: "tags", placeholder: "espion, noble, …" }
  ];
  var FIELDS = {
    personnages: [
      { key: "name", label: "Personnage", type: "text", req: true, half: true, placeholder: "Nom de l'entrée" },
      { key: "type", label: "Type", type: "text", half: true, placeholder: "PNJ, Joueurs, Autre" },
      { key: "title", label: "Titre", type: "text", half: true, placeholder: "Titre" },
      { key: "familles", label: "Familles", type: "tags", half: true, placeholder: "Écrire, séparé par des virgules" },
      { key: "lieux", label: "Lieux", type: "tags", half: true, placeholder: "Écrire, séparé par des virgules" },
      { key: "nations", label: "Nations", type: "tags", half: true, placeholder: "Écrire, séparé par des virgules" },
      { key: "description", label: "Description", type: "textarea-rich" },
      { key: "age", label: "Âge", type: "text", half: true, placeholder: "Âge" },
      { key: "statut", label: "Statut", type: "select", half: true, options: STATUT_OPTS, default: "Vivant" },
      { key: "sexe", label: "Sexe", type: "text", half: true, placeholder: "Sexe" },
      { key: "pronoms", label: "Pronoms", type: "text", half: true, placeholder: "Il, Elle" },
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
  function htmlToText(html) {
    var d = document.createElement("div");
    d.innerHTML = html || "";
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

  // --- Rendu de la liste d'une rubrique (appelé par journal-layout sur les
  // pages de rubrique). Remplit #journal-main. ---
  function renderRubriqueList(r, mainEl) {
    var meta = rubriqueMeta(r);
    if (!meta || !mainEl) return false;
    var arts = articlesOf(r).sort(function (a, b) {
      return (a.name || "").localeCompare(b.name || "", "fr");
    });

    var addBtn = "<a class='j-btn-add' href='" + editUrl(r) + "'>" +
      "<span class='j-plus'>+</span> Ajouter un " + esc(meta.singular) + "</a>";

    var body;
    if (!arts.length) {
      body = "<div class='j-empty'>" + icon(meta.icon, "j-empty-ico") +
        "<p>Aucun " + esc(meta.singular) + " pour l'instant.</p>" +
        "<p class='j-empty-hint'>Clique sur « Ajouter un " + esc(meta.singular) +
        " » pour créer ton premier article.</p></div>";
    } else {
      body = "<div class='j-card-grid'>" + arts.map(function (a) {
        var snippet = htmlToText(a.description).slice(0, 130);
        var meta2 = [a.type, a.statut].filter(Boolean).join(" · ");
        return "<a class='j-card' href='" + articleUrl(r, a.id) + "'>" +
          "<div class='j-card-name'>" + esc(a.name) + "</div>" +
          (meta2 ? "<div class='j-card-meta'>" + esc(meta2) + "</div>" : "") +
          (snippet ? "<div class='j-card-snippet'>" + esc(snippet) + "</div>" : "") +
          "</a>";
      }).join("") + "</div>";
    }
    mainEl.innerHTML = "<div class='j-actions'>" + addBtn + "</div>" + body;
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
    htmlToText: htmlToText,
    renderDescription: renderDescription,
    renderRubriqueList: renderRubriqueList,
    isRubrique: function (id) { return !!RUBRIQUES[id]; }
  };
})();
