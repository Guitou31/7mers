// Rendu d'une sorcellerie (sorcellerie.html?s=<id>) depuis SORCELLERIES_DATA :
// description, héritages, niveaux de maîtrise, formes par famille (filtrables,
// capacités cliquables vers le glossaire), glossaire ancré, notes.
(function () {
  "use strict";

  var data = (window.SORCELLERIES_DATA || {}).sorcelleries || [];
  var main = document.getElementById("sorc-main");
  if (!main) return;

  function qs(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }
  function esc(x) {
    return String(x == null ? "" : x).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function norm(x) {
    return String(x || "").normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/\s+/g, " ").trim();
  }
  // Met en gras un intitulé court en tête de paragraphe (« Corruption : … »).
  function paraHTML(t) {
    return "<p>" + esc(t).replace(/^([^:]{2,40}?) :\s/, "<strong>$1 :</strong> ") + "</p>";
  }

  var s = data.find(function (x) { return x.id === qs("s"); }) || data[0];
  if (!s) {
    main.innerHTML += "<p>Aucune sorcellerie documentée pour l'instant.</p>";
    return;
  }
  document.title = s.nom + " — Bréviaire 7ème Mer V2.1";
  document.getElementById("sorc-title").textContent = "Sorcellerie " + s.nom;
  document.getElementById("sorc-sub").textContent = s.accroche || "";

  // ---- Index du glossaire : nom (et alternatives) -> entrée ----
  var glosIndex = {};
  (s.glossaire || []).forEach(function (g, i) {
    var alts = g.nom.replace(/\(([^)]*)\)/g, "/$1").split(/[\/,]| et /);
    alts.forEach(function (a) {
      a = norm(a);
      if (a.length > 2 && glosIndex[a] == null) glosIndex[a] = i;
    });
  });
  function findGlos(cap) {
    var c = norm(cap.replace(/\([^)]*\)/g, "").replace(/[+\-−–]\s*\d+/g, ""));
    if (glosIndex[c] != null) return glosIndex[c];
    var first = c.split(" ")[0];
    return glosIndex[first] != null ? glosIndex[first] : null;
  }
  // Découpe « Attaque (Griffes 0g3), Gaillardise +3, … » sans casser les parenthèses.
  function splitCaps(str) {
    var out = [], depth = 0, cur = "";
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (ch === "," && depth <= 0) { out.push(cur); cur = ""; }
      else cur += ch;
    }
    if (cur.trim()) out.push(cur);
    return out.map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function capChip(cap) {
    var gi = findGlos(cap);
    if (gi == null) return "<span class='sorc-cap is-plain'>" + esc(cap) + "</span>";
    var def = s.glossaire[gi].texte;
    return "<a class='sorc-cap' href='#glos-" + gi + "' title=\"" +
      esc(def.slice(0, 180) + (def.length > 180 ? "…" : "")) + "\">" + esc(cap) + "</a>";
  }

  var html = [];

  // ---- Badges ----
  html.push("<div class='sorc-badges badges'>" +
    (s.nation ? "<span class='badge nation'>" + esc(s.nation) + "</span>" : "") +
    "<span class='badge origine-seconde_edition_adaptee'>Sorcellerie</span></div>");

  // ---- Carte d'une rune (grille filtrable, glyphe compris) ----
  function runeCard(r) {
    var search = norm(r.nom + " " + r.trad + " " + r.famille + " " + r.paras.join(" "));
    return "<div class='sorc-forme sorc-rune' data-search=\"" + esc(search) + "\">" +
      "<div class='sorc-rune-top'>" +
      (r.img ? "<img class='sorc-rune-img' src='" + esc(r.img) + "' alt='" + esc(r.nom) + "' loading='lazy'>" : "") +
      "<div><div class='sorc-forme-head'><span class='sorc-forme-nom'>" +
      String(r.num).padStart(2, "0") + " · " + esc(r.nom) +
      " <em>(« " + esc(r.trad) + " »)</em></span>" +
      "<span class='sorc-nd'>ND " + esc(r.nd) + "</span></div>" +
      (r.famille ? "<span class='sorc-fam-tag'>" + esc(r.famille) + "</span>" : "") +
      "</div></div>" +
      r.paras.map(paraHTML).join("") + "</div>";
  }

  // ---- Modèle générique par sections (Lærdom et suivantes) ----
  if (s.sections && s.sections.length) {
    s.sections.forEach(function (sec) {
      if (sec.type === "runes") {
        html.push("<div class='sorc-block'><h3>" + esc(sec.titre) + "</h3>" +
          (sec.intro ? paraHTML(sec.intro) : "") +
          "<input type='search' id='sorc-search' class='sorc-search' " +
          "placeholder='Filtrer les runes (nom, traduction, effet…)' autocomplete='off'>" +
          "<div class='sorc-formes sorc-runes'>" +
          (s.runes || []).map(runeCard).join("") + "</div></div>");
      } else {
        html.push("<div class='sorc-block'><h3>" + esc(sec.titre) + "</h3>" + sec.html + "</div>");
      }
    });
    main.insertAdjacentHTML("beforeend", html.join("\n"));
    wireSearch();
    return;
  }

  // ---- Modèle Pyeryem (description / héritage / formes / glossaire) ----
  html.push("<div class='sorc-block'><h3>Description</h3>" +
    (s.description || []).map(paraHTML).join("") + "</div>");

  // ---- Héritage et progression ----
  var h = s.heritage || {};
  var herHtml = "<div class='sorc-block'><h3>Héritage et progression</h3>";
  (h.paras || []).forEach(function (p, i) {
    herHtml += paraHTML(p);
    if (i === 0 && h.table) {
      herHtml += "<div class='sorc-tablewrap'><table><tr>" +
        h.table.headers.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>" +
        h.table.rows.map(function (r) {
          return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
        }).join("") + "</table></div>";
    }
  });
  html.push(herHtml + "</div>");

  // ---- Niveaux de maîtrise ----
  html.push("<div class='sorc-block'><h3>Niveaux de maîtrise</h3>" +
    (s.niveaux || []).map(function (n) {
      return "<div class='sorc-niveau'><h4>" + esc(n.titre) + "</h4>" +
        n.paras.map(paraHTML).join("") + "</div>";
    }).join("") + "</div>");

  // ---- Formes animales ----
  html.push("<div class='sorc-block' id='sorc-formes-bloc'><h3>Les formes animales</h3>" +
    (s.formes_intro ? paraHTML(s.formes_intro) : "") +
    "<input type='search' id='sorc-search' class='sorc-search' " +
    "placeholder='Filtrer les formes (nom, capacité…)' autocomplete='off'>");
  (s.familles || []).forEach(function (fam) {
    if (!fam.formes.length && fam.libres) {
      html.push("<p class='sorc-libres'><strong>" + esc(fam.nom) + " :</strong> " +
        fam.libres + " emplacements libres, à définir avec le MJ (voir les notes ci-dessous).</p>");
      return;
    }
    html.push("<div class='sorc-famille'><h4>" + esc(fam.nom) + "</h4><div class='sorc-formes'>");
    fam.formes.forEach(function (f) {
      var search = norm(f.nom + " " + f.vo + " " + f.capacites);
      html.push("<div class='sorc-forme' data-search=\"" + esc(search) + "\">" +
        "<div class='sorc-forme-head'><span class='sorc-forme-nom'>" +
        String(f.num).padStart(2, "0") + " · " + esc(f.nom) +
        " <em>(" + esc(f.vo) + ")</em></span>" +
        "<span class='sorc-nd'>ND " + f.nd + "</span></div>" +
        (f.capacites
          ? "<div class='sorc-caps'>" + splitCaps(f.capacites).map(capChip).join("") + "</div>"
          : "") +
        (f.notes ? "<div class='sorc-forme-notes'>" + esc(f.notes) + "</div>" : "") +
        "</div>");
    });
    html.push("</div></div>");
  });
  html.push("</div>");

  // ---- Glossaire des capacités ----
  html.push("<div class='sorc-block'><h3>Glossaire des capacités</h3><dl class='sorc-glossaire'>" +
    (s.glossaire || []).map(function (g, i) {
      return "<dt id='glos-" + i + "'>" + esc(g.nom) + "</dt><dd>" + esc(g.texte) + "</dd>";
    }).join("") + "</dl></div>");

  // ---- Notes ----
  if ((s.notes || []).length) {
    html.push("<div class='sorc-block'><h3>Notes, révisions et créations de formes</h3>" +
      s.notes.map(paraHTML).join("") + "</div>");
  }

  main.insertAdjacentHTML("beforeend", html.join("\n"));
  wireSearch();

  // ---- Filtre des formes / runes (commun aux deux modèles) ----
  function wireSearch() {
    var input = document.getElementById("sorc-search");
    if (!input) return;
    input.addEventListener("input", function () {
      var q = norm(input.value);
      document.querySelectorAll(".sorc-forme").forEach(function (card) {
        card.style.display = !q || card.getAttribute("data-search").indexOf(q) >= 0 ? "" : "none";
      });
      document.querySelectorAll(".sorc-famille").forEach(function (fam) {
        var visible = fam.querySelectorAll(".sorc-forme:not([style*='none'])").length;
        fam.style.display = visible ? "" : "none";
      });
    });
  }
})();
