// Vue d'un article du journal. Lit ?r=<rubrique>&id=<id>, affiche les champs
// et la description (avec liens @ + auto-détection des noms cités).
(function () {
  "use strict";

  function qs(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  function render() {
    var Core = window.JournalCore;
    var main = document.getElementById("journal-main");
    var head = document.getElementById("journal-pagehead");
    if (!Core || !main) return;

    var r = qs("r"), id = qs("id");
    var meta = Core.rubriqueMeta(r);
    var art = Core.getArticle(r, id);

    // Surligne la rubrique dans la barre latérale.
    var navLink = document.querySelector('.j-item[href="journal-' + r + '.html"]');
    if (navLink) navLink.classList.add("is-current");

    if (!meta || !art) {
      if (head) head.innerHTML = "<div class='ph-text'><h1>Article introuvable</h1></div>";
      main.innerHTML = "<div class='j-empty'><p>Cet article n'existe pas (ou plus).</p>" +
        "<p class='j-empty-hint'><a href='journal-tableau-de-bord.html'>Retour au tableau de bord</a></p></div>";
      return;
    }

    document.title = art.name + " — Journal 7ème Mer";

    // En-tête : fil d'Ariane + nom + titre.
    if (head) {
      head.innerHTML =
        (window.journalIcon ? window.journalIcon(meta.icon, "ph-ico") : "") +
        "<div class='ph-text'>" +
        "<div class='j-crumb'><a href='journal-" + r + ".html'>" + Core.esc(meta.label) +
        "</a> <span>›</span> " + Core.esc(art.name) + "</div>" +
        "<h1>" + Core.esc(art.name) + "</h1>" +
        (art.title ? "<div class='ph-sub'>" + Core.esc(art.title) + "</div>" : "") +
        "</div>";
    }

    // Corps : actions + fiche d'infos + description.
    var actions = "<div class='j-actions'>" +
      "<a class='j-btn-add' href='" + Core.editUrl(r, id) + "'>Éditer</a></div>";

    // Champs informatifs (hors nom/titre/description), seulement si remplis.
    var SKIP = { name: 1, title: 1, description: 1 };
    var rows = "";
    Core.fieldsFor(r).forEach(function (f) {
      if (SKIP[f.key]) return;
      var v = art[f.key];
      if (Array.isArray(v)) v = v.filter(Boolean).join(", ");
      if (v == null || v === "") return;
      rows += "<div class='j-info-row'><span class='j-info-k'>" + Core.esc(f.label) +
        "</span><span class='j-info-v'>" + Core.esc(v) + "</span></div>";
    });
    var info = rows ? "<div class='j-article-info'>" + rows + "</div>" : "";

    var descWrap = document.createElement("div");
    descWrap.className = "j-desc";
    Core.renderDescription(descWrap, art.description, id);
    var descHtml = (art.description && Core.htmlToText(art.description))
      ? descWrap.outerHTML
      : "<div class='j-desc j-desc-empty'><em>Pas encore de description.</em></div>";

    main.innerHTML = actions + info + descHtml;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
