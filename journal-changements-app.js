// Rendu du flux « Changements récents », groupé par jour, façon Kanka.
// Lit window.JOURNAL_CHANGEMENTS (généré par gen_journal_changements.py).
(function () {
  "use strict";

  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  function parseIso(iso) {
    var p = String(iso || "").split("-");
    return p.length >= 3 ? { y: +p[0], m: +p[1], d: +p[2] } : null;
  }
  function dayLabel(iso) {
    var o = parseIso(iso);
    if (!o) return iso;
    return o.d + " " + (MOIS[o.m - 1] || "") + " " + o.y;
  }
  function dateShort(iso) {
    var o = parseIso(iso);
    if (!o) return iso;
    var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
    return pad(o.d) + "." + pad(o.m) + "." + o.y;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render() {
    var mount = document.getElementById("changes-feed");
    if (!mount) return;
    var data = window.JOURNAL_CHANGEMENTS || {};
    var entries = (data.entries || []).slice();

    if (!entries.length) {
      mount.innerHTML =
        "<div class='j-empty'>" +
        (window.journalIcon ? window.journalIcon("activity", "j-empty-ico") : "") +
        "<p>Aucun changement enregistré pour l'instant.</p>" +
        "<p class='j-empty-hint'>Le flux se remplit dès que tu modifies une rubrique du journal " +
        "et que tu lances <code>gen_journal_changements.py</code>.</p></div>";
      return;
    }

    // Tri décroissant par date (au cas où), puis regroupement par jour.
    entries.sort(function (a, b) { return (a.date < b.date) ? 1 : (a.date > b.date ? -1 : 0); });

    var html = "";
    var lastDay = null;
    var listOpen = false;
    entries.forEach(function (e) {
      if (e.date !== lastDay) {
        if (listOpen) { html += "</div>"; listOpen = false; }
        html += "<div class='j-feed-day'>" + esc(dayLabel(e.date)) + "</div>";
        html += "<div class='j-feed-list'>";
        listOpen = true;
        lastDay = e.date;
      }
      var isCreate = (e.action === "créé");
      var target = e.page
        ? "<a class='what' href='" + esc(e.page) + "'>" + esc(e.target) + "</a>"
        : "<span class='what'>" + esc(e.target) + "</span>";
      html +=
        "<div class='j-feed-row'>" +
        "<span class='j-feed-dot " + (isCreate ? "create" : "modify") + "'></span>" +
        "<span class='j-feed-text'><span class='who'>" + esc(e.author) + "</span> a " +
        esc(e.action) + " " + target + "</span>" +
        "<span class='j-feed-date'>" + esc(dateShort(e.date)) + "</span>" +
        "</div>";
    });
    if (listOpen) html += "</div>";
    mount.innerHTML = html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
