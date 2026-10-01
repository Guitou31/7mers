// Suivi XP du journal de campagne (journal-xp.html).
// - Tableau des personnages : actifs cochés par défaut, serviteurs (PNJ) en
//   couleur distincte et décochés, « en retrait » grisés en fin de liste.
// - Trois compteurs par personnage : XP MJ, XP d'Avantages, total.
// - Ajout d'XP aux cochés (montant + raison + type), publié sur GitHub comme
//   les articles (jeton requis) ; clic sur une valeur = correction directe.
// - Historique complet, le plus récent en premier.
(function () {
  "use strict";

  var GH = window.JournalGitHub;
  var GROUPES = [
    { key: "actif",   label: "Personnages actifs" },
    { key: "pnj",     label: "Serviteurs (PNJ)" },
    { key: "retrait", label: "En retrait — retour hypothétique" }
  ];
  // Teinte légère de la ligne selon la nationalité du personnage.
  // (Mendoza reste gris neutre ; le pourpre de Marek reste voilé par le
  // grisé « en retrait ».)
  var TEINTES = {
    "darmuid":    "rgba(46, 125, 50, 0.10)",   // Inish — vert d'Irlande
    "don-felipe": "rgba(179, 38, 30, 0.10)",   // Castillan + sorcier de feu — rouge
    "dorian":     "rgba(2, 119, 189, 0.10)",   // La Bucca — bleu océan de l'île libre
    "ingrid":     "rgba(96, 125, 139, 0.16)",  // Vesten — gris-bleu glacial
    "lu-ji":      "rgba(255, 160, 0, 0.12)",   // Cathay — or impérial
    "lu-min":     "rgba(255, 160, 0, 0.12)",   // Cathay — or impérial
    "marek":      "rgba(136, 14, 79, 0.10)"    // Sarmatie — pourpre
  };
  var HISTO_DEFAUT = 25;
  var histoTout = false;

  function el(id) { return document.getElementById(id); }
  function esc(x) {
    return String(x == null ? "" : x).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function norm(x) {
    return String(x || "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  }
  function xpData() {
    return (window.JOURNAL_DB && window.JOURNAL_DB.xp) || { persos: [], historique: [] };
  }
  function persoNom(id) {
    var p = xpData().persos.find(function (x) { return x.id === id; });
    return p ? p.nom : id;
  }
  function dateFr(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    return m ? m[3] + "/" + m[2] + "/" + m[1] : (iso || "");
  }
  function msg(text, kind) {
    var box = el("xp-msg");
    box.textContent = text;
    box.className = "j-form-msg " + (kind || "");
  }

  // Lien vers la fiche personnage du journal si elle existe (par nom).
  function ficheHref(nom) {
    if (!window.JournalCore) return null;
    var arts = window.JournalCore.articlesOf("personnages") || [];
    var hit = arts.find(function (a) {
      return norm(a.name) === norm(nom) || norm(a.name).indexOf(norm(nom)) === 0;
    });
    return hit ? window.JournalCore.articleUrl("personnages", hit.id) : null;
  }

  // ---- Tableau ----
  function renderTable() {
    var xp = xpData();
    var cochesAvant = {};
    document.querySelectorAll(".xp-check").forEach(function (c) {
      cochesAvant[c.getAttribute("data-id")] = c.checked;
    });
    var out = ["<table class='xp-table'><tr><th></th><th>Personnage</th>" +
      "<th>XP MJ</th><th>XP Avantages</th><th>Total</th></tr>"];
    GROUPES.forEach(function (grp) {
      var persos = xp.persos.filter(function (p) { return (p.groupe || "actif") === grp.key; });
      if (!persos.length) return;
      out.push("<tr class='xp-grp'><td colspan='5'>" + esc(grp.label) + "</td></tr>");
      persos.forEach(function (p) {
        var coche = cochesAvant[p.id] != null ? cochesAvant[p.id] : grp.key === "actif";
        var href = ficheHref(p.nom);
        var nomHtml = href
          ? "<a class='j-link' href='" + href + "'>" + esc(p.nom) + "</a>"
          : esc(p.nom);
        var teinte = TEINTES[p.id] ? " style='background:" + TEINTES[p.id] + "'" : "";
        out.push("<tr class='xp-row is-" + grp.key + "'" + teinte + ">" +
          "<td><input type='checkbox' class='xp-check' data-id='" + p.id + "'" +
          (coche ? " checked" : "") + "></td>" +
          "<td class='xp-nom'>" + nomHtml +
          (p.joueur ? " <span class='xp-joueur'>(" + esc(p.joueur) + ")</span>" : "") +
          (p.note ? " <span class='xp-note'>" + esc(p.note) + "</span>" : "") + "</td>" +
          "<td class='xp-val' data-id='" + p.id + "' data-champ='mj' " +
          "title='Cliquer pour corriger'>" + (p.xp_mj || 0) + "</td>" +
          "<td class='xp-val' data-id='" + p.id + "' data-champ='avantage' " +
          "title='Cliquer pour corriger'>" + (p.xp_av || 0) + "</td>" +
          "<td class='xp-total'>" + ((p.xp_mj || 0) + (p.xp_av || 0)) + "</td></tr>");
      });
    });
    out.push("</table>");
    el("xp-table").innerHTML = out.join("");

    document.querySelectorAll(".xp-val").forEach(function (cell) {
      cell.addEventListener("click", function () { corriger(cell); });
    });
  }

  // ---- Historique ----
  function renderHisto() {
    var h = xpData().historique || [];
    var list = histoTout ? h : h.slice(0, HISTO_DEFAUT);
    var out = list.map(function (e) {
      var badge = e.type === "avantage"
        ? "<span class='xp-badge xp-badge-av'>Avantage</span>"
        : "<span class='xp-badge xp-badge-mj'>MJ</span>";
      var gains = (e.gains || []).map(function (g) {
        return esc(persoNom(g.id)) + " <strong>" + (g.xp > 0 ? "+" : "") + g.xp + "</strong>";
      }).join(" · ");
      return "<div class='xp-entree'><div class='xp-entree-head'>" +
        "<span class='xp-date'>" + esc(dateFr(e.date)) + "</span>" + badge +
        "<span class='xp-raison'>" + esc(e.raison || "") + "</span></div>" +
        "<div class='xp-gains'>" + gains + "</div></div>";
    });
    if (!histoTout && h.length > HISTO_DEFAUT) {
      out.push("<button class='j-btn-ghost' id='xp-histo-plus' type='button'>Afficher tout (" +
        h.length + " entrées)</button>");
    }
    el("xp-histo").innerHTML = out.join("") || "<p class='j-desc-empty'><em>Aucune entrée.</em></p>";
    var plus = el("xp-histo-plus");
    if (plus) plus.addEventListener("click", function () { histoTout = true; renderHisto(); });
  }

  // ---- Actions ----
  function envoyer(entry, okMsg) {
    if (!GH || !GH.isConfigured()) {
      msg("Jeton GitHub manquant : clique sur « Configuration GitHub ».", "err");
      return;
    }
    var btn = el("xp-ajouter");
    btn.disabled = true;
    msg("Publication en cours…", "");
    GH.saveXpEntry(entry).then(function (db) {
      window.JOURNAL_DB = db;
      btn.disabled = false;
      msg(okMsg, "ok");
      renderTable();
      renderHisto();
    }).catch(function (err) {
      btn.disabled = false;
      msg("Échec : " + (err.message || err), "err");
    });
  }

  function ajouter() {
    var montant = parseInt(el("xp-montant").value, 10);
    var raison = el("xp-raison").value.trim();
    var type = el("xp-type").value;
    var ids = [];
    document.querySelectorAll(".xp-check:checked").forEach(function (c) {
      ids.push(c.getAttribute("data-id"));
    });
    if (!montant) { msg("Indique un montant d'XP.", "err"); return; }
    if (!raison) { msg("Indique une raison (ex. « Session du 12 octobre »).", "err"); return; }
    if (!ids.length) { msg("Coche au moins un personnage.", "err"); return; }
    envoyer({
      date: new Date().toISOString().slice(0, 10),
      raison: raison,
      type: type,
      gains: ids.map(function (id) { return { id: id, xp: montant }; })
    }, "+" + montant + " XP (" + type + ") pour " + ids.length + " personnage" +
       (ids.length > 1 ? "s" : "") + " — publié ✓");
    el("xp-raison").value = "";
  }

  function corriger(cell) {
    var id = cell.getAttribute("data-id");
    var champ = cell.getAttribute("data-champ");
    var p = xpData().persos.find(function (x) { return x.id === id; });
    if (!p) return;
    var actuel = champ === "avantage" ? (p.xp_av || 0) : (p.xp_mj || 0);
    var saisie = prompt("Nouvelle valeur « XP " + (champ === "avantage" ? "Avantages" : "MJ") +
      " » pour " + p.nom + " :", actuel);
    if (saisie == null) return;
    var val = parseInt(saisie, 10);
    if (isNaN(val) || val === actuel) return;
    envoyer({
      date: new Date().toISOString().slice(0, 10),
      raison: "Correction — " + p.nom + " (XP " + (champ === "avantage" ? "Avantages" : "MJ") +
        " : " + actuel + " → " + val + ")",
      type: champ === "avantage" ? "avantage" : "mj",
      gains: [{ id: id, xp: val - actuel }]
    }, "Correction publiée ✓");
  }

  // ---- Configuration GitHub (modale minimale, même stockage que l'éditeur) ----
  function openConfig() {
    var c = GH.getConfig();
    var overlay = document.createElement("div");
    overlay.className = "j-modal-overlay";
    overlay.innerHTML =
      "<div class='j-modal'><h2>Configuration GitHub</h2>" +
      "<p class='j-modal-lead'>Le jeton reste uniquement dans ce navigateur. Colle la " +
      "<strong>valeur</strong> du jeton (<code>github_pat_…</code>), pas son nom.</p>" +
      "<label class='j-label'>Ton nom (auteur)<input id='xpc-author' class='j-input' value='" + esc(c.author || "Guillaume") + "'></label>" +
      "<label class='j-label'>Jeton GitHub<input id='xpc-token' class='j-input' type='password' value='" + esc(c.token || "") + "'></label>" +
      "<div class='j-form-actions'>" +
      "<button class='j-btn-add' id='xpc-save' type='button'>Enregistrer</button>" +
      "<button class='j-btn-ghost' id='xpc-test' type='button'>Tester la connexion</button>" +
      "<button class='j-btn-ghost' id='xpc-cancel' type='button'>Annuler</button></div>" +
      "<div class='j-form-msg' id='xpc-msg'></div></div>";
    document.body.appendChild(overlay);
    function close() { overlay.remove(); }
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    overlay.querySelector("#xpc-cancel").addEventListener("click", close);
    function saveFields() {
      GH.setConfig({
        author: overlay.querySelector("#xpc-author").value.trim() || "Guillaume",
        token: overlay.querySelector("#xpc-token").value.trim()
      });
    }
    overlay.querySelector("#xpc-test").addEventListener("click", function () {
      saveFields();
      var box = overlay.querySelector("#xpc-msg");
      box.textContent = "Test en cours…"; box.className = "j-form-msg";
      GH.testConnection().then(function (ok) {
        box.textContent = "✓ " + ok; box.className = "j-form-msg ok";
      }).catch(function (err) {
        box.textContent = "✗ " + (err.message || err); box.className = "j-form-msg err";
      });
    });
    overlay.querySelector("#xpc-save").addEventListener("click", function () {
      saveFields(); close(); refreshBanner();
      msg(GH.isConfigured() ? "Configuration enregistrée." : "Jeton manquant.", GH.isConfigured() ? "ok" : "err");
    });
  }

  function refreshBanner() {
    el("xp-config-banner").hidden = GH && GH.isConfigured();
  }

  function init() {
    if (!el("xp-table")) return;
    renderTable();
    renderHisto();
    refreshBanner();
    el("xp-ajouter").addEventListener("click", ajouter);
    el("xp-config-btn").addEventListener("click", openConfig);
    el("xp-config-btn2").addEventListener("click", openConfig);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
