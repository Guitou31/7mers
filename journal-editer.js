// Éditeur d'article : formulaire par rubrique, éditeur de texte riche avec
// liens @ (autocomplétion sur les articles existants), config du jeton GitHub,
// et sauvegarde directe via l'API GitHub.
(function () {
  "use strict";

  var Core = window.JournalCore, GH = window.JournalGitHub;

  function qs(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }
  function today() { return new Date().toISOString().slice(0, 10); }
  function splitTags(s) {
    return String(s || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  var R = qs("r"), ID = qs("id");
  var meta = Core.rubriqueMeta(R);
  var existing = ID ? Core.getArticle(R, ID) : null;
  var fields = Core.fieldsFor(R);
  var inputs = {};        // key -> élément input
  var editorEl = null;    // contenteditable description
  var pendingImageFile = null;  // nouvelle image choisie (à uploader au save)
  var imageRemoved = false;     // l'utilisateur a retiré l'image existante

  // --- Construction du formulaire ---
  function fieldControl(f) {
    var val = existing ? existing[f.key] : (f.default || "");
    if (f.type === "textarea-rich") {
      var wrap = el("div", "j-rich");
      wrap.appendChild(buildToolbar());
      editorEl = el("div", "j-rich-area");
      editorEl.contentEditable = "true";
      editorEl.setAttribute("role", "textbox");
      editorEl.setAttribute("aria-multiline", "true");
      editorEl.innerHTML = (existing && existing.description) || "";
      wrap.appendChild(editorEl);
      wrap.appendChild(el("div", "j-rich-hint", "Astuce : tape <strong>@</strong> puis un nom pour lier un autre article (personnage, nation, organisation…)."));
      return wrap;
    }
    if (f.type === "select") {
      var sel = el("select", "j-input");
      (f.options || []).forEach(function (o) {
        var opt = el("option", null, o); opt.value = o;
        if (o === val) opt.selected = true;
        sel.appendChild(opt);
      });
      inputs[f.key] = sel;
      return sel;
    }
    var inp = el("input", "j-input");
    inp.type = "text";
    if (f.placeholder) inp.placeholder = f.placeholder;
    if (Array.isArray(val)) val = val.join(", ");
    inp.value = val || "";
    inputs[f.key] = inp;
    return inp;
  }

  var CAMERA_SVG = "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'/><circle cx='12' cy='13' r='4'/></svg>";

  function buildImageControl() {
    var wrap = el("div", "j-image-field");
    var preview = el("div", "j-image-preview");
    function setPreview(src) {
      preview.innerHTML = src
        ? "<img src='" + src + "' alt=''>"
        : "<span class='j-image-ph'>" + CAMERA_SVG + "</span>";
    }
    setPreview((existing && existing.image) || "");

    var controls = el("div", "j-image-controls");
    var pick = el("label", "j-btn-ghost", "Choisir une image");
    var input = el("input"); input.type = "file"; input.accept = "image/*"; input.style.display = "none";
    pick.appendChild(input);
    var rm = el("button", "j-btn-ghost", "Retirer"); rm.type = "button";
    controls.appendChild(pick); controls.appendChild(rm);

    input.addEventListener("change", function () {
      var f = input.files && input.files[0];
      if (!f) return;
      pendingImageFile = f; imageRemoved = false;
      setPreview(URL.createObjectURL(f));
    });
    rm.addEventListener("click", function () {
      pendingImageFile = null; imageRemoved = true; input.value = "";
      setPreview("");
    });

    wrap.appendChild(preview);
    wrap.appendChild(controls);
    return wrap;
  }

  function renderForm(mainEl) {
    var form = el("form", "j-form");
    form.addEventListener("submit", function (e) { e.preventDefault(); save(); });
    form.appendChild(buildImageControl());

    var grid = el("div", "j-form-grid");
    fields.forEach(function (f) {
      var cell = el("div", "j-field" + (f.half ? " half" : "") + (f.type === "textarea-rich" ? " full" : ""));
      var lab = el("label", "j-label", Core.esc(f.label) + (f.req ? " <span class='j-req'>*</span>" : ""));
      cell.appendChild(lab);
      cell.appendChild(fieldControl(f));
      grid.appendChild(cell);
    });
    form.appendChild(grid);

    var bar = el("div", "j-form-actions");
    var saveBtn = el("button", "j-btn-add", "Enregistrer");
    saveBtn.type = "submit"; saveBtn.id = "j-save-btn";
    var cancel = el("a", "j-btn-ghost", "Annuler");
    cancel.href = "journal-" + R + ".html";
    var cfg = el("button", "j-btn-ghost", "Configuration GitHub");
    cfg.type = "button"; cfg.addEventListener("click", function () { openConfig(); });
    bar.appendChild(saveBtn); bar.appendChild(cancel); bar.appendChild(cfg);
    if (existing) {
      var del = el("button", "j-btn-danger", "Supprimer");
      del.type = "button"; del.addEventListener("click", remove);
      bar.appendChild(del);
    }
    form.appendChild(bar);
    form.appendChild(el("div", "j-form-msg", ""));

    mainEl.innerHTML = "";
    mainEl.appendChild(form);
    if (editorEl) wireMentions(editorEl);
  }

  // --- Barre d'outils de l'éditeur riche ---
  function buildToolbar() {
    var tools = [
      { cmd: "bold", label: "G", title: "Gras", style: "font-weight:700" },
      { cmd: "italic", label: "I", title: "Italique", style: "font-style:italic" },
      { cmd: "underline", label: "S", title: "Souligné", style: "text-decoration:underline" },
      { cmd: "strikeThrough", label: "B", title: "Barré", style: "text-decoration:line-through" },
      { block: "h3", label: "Titre", title: "Sous-titre" },
      { cmd: "insertUnorderedList", label: "•", title: "Liste à puces" },
      { cmd: "insertOrderedList", label: "1.", title: "Liste numérotée" },
      { link: true, label: "🔗", title: "Lien web" },
      { cmd: "insertHorizontalRule", label: "―", title: "Séparateur" }
    ];
    var bar = el("div", "j-rich-toolbar");
    tools.forEach(function (t) {
      var b = el("button", "j-tool", t.label);
      b.type = "button"; b.title = t.title;
      if (t.style) b.setAttribute("style", t.style);
      b.addEventListener("mousedown", function (e) { e.preventDefault(); }); // garde la sélection
      b.addEventListener("click", function () {
        editorEl.focus();
        if (t.block) document.execCommand("formatBlock", false, t.block);
        else if (t.link) { var u = prompt("URL du lien :", "https://"); if (u) document.execCommand("createLink", false, u); }
        else document.execCommand(t.cmd, false, null);
      });
      bar.appendChild(b);
    });
    return bar;
  }

  // --- Autocomplétion @ ---
  var popup = null, popItems = [], popIndex = 0, popCtx = null;

  function wireMentions(ed) {
    ed.addEventListener("input", updateMention);
    ed.addEventListener("keyup", function (e) {
      if (["ArrowUp", "ArrowDown", "Enter", "Tab", "Escape"].indexOf(e.key) < 0) updateMention();
    });
    ed.addEventListener("keydown", function (e) {
      if (!popup) return;
      if (e.key === "ArrowDown") { e.preventDefault(); moveSel(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveSel(-1); }
      else if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); choose(popIndex); }
      else if (e.key === "Escape") { e.preventDefault(); closePopup(); }
    });
    ed.addEventListener("blur", function () { setTimeout(closePopup, 150); });
  }

  function getMentionContext() {
    var sel = window.getSelection();
    if (!sel.rangeCount) return null;
    var range = sel.getRangeAt(0);
    if (!range.collapsed) return null;
    var node = range.startContainer;
    if (node.nodeType !== 3) return null;
    var offset = range.startOffset;
    var text = node.nodeValue.slice(0, offset);
    var m = /(?:^|[\s ])@([^\s@ ]{0,40})$/.exec(text);
    if (!m) return null;
    return { node: node, query: m[1], start: offset - m[1].length - 1, end: offset };
  }

  function updateMention() {
    var ctx = getMentionContext();
    if (!ctx) { closePopup(); return; }
    popCtx = ctx;
    var q = ctx.query.toLowerCase();
    var items = Core.allArticles().filter(function (a) {
      if (a.id === ID) return false;
      var hay = [a.name].concat(a.aliases || []).join(" ").toLowerCase();
      return !q || hay.indexOf(q) >= 0;
    }).sort(function (a, b) { return a.name.localeCompare(b.name, "fr"); }).slice(0, 8);
    if (!items.length) {
      showPopup([{ empty: true, name: q ? "Aucun article « " + ctx.query + " »" : "Aucun article à lier" }]);
      popItems = [];
      return;
    }
    showPopup(items);
  }

  function showPopup(items) {
    popItems = items; popIndex = 0;
    if (!popup) { popup = el("div", "j-mention-pop"); document.body.appendChild(popup); }
    popup.innerHTML = items.map(function (it, i) {
      if (it.empty) return "<div class='j-mention-item is-empty'>" + Core.esc(it.name) + "</div>";
      var meta2 = Core.rubriqueMeta(it.rubrique);
      return "<div class='j-mention-item" + (i === 0 ? " is-active" : "") + "' data-i='" + i + "'>" +
        "<span class='j-mention-name'>" + Core.esc(it.name) + "</span>" +
        "<span class='j-mention-cat'>" + Core.esc(meta2 ? meta2.singular : it.rubrique) + "</span></div>";
    }).join("");
    Array.prototype.forEach.call(popup.querySelectorAll(".j-mention-item[data-i]"), function (node) {
      node.addEventListener("mousedown", function (e) { e.preventDefault(); choose(+node.getAttribute("data-i")); });
    });
    // Position près du curseur.
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var rect = sel.getRangeAt(0).getBoundingClientRect();
      var x = rect.left || 0, y = (rect.bottom || 0);
      popup.style.left = (window.scrollX + x) + "px";
      popup.style.top = (window.scrollY + y + 4) + "px";
    }
    popup.style.display = "block";
  }

  function moveSel(d) {
    var n = popup.querySelectorAll(".j-mention-item[data-i]");
    if (!n.length) return;
    popIndex = (popIndex + d + n.length) % n.length;
    Array.prototype.forEach.call(n, function (node, i) { node.classList.toggle("is-active", i === popIndex); });
  }

  function choose(i) {
    if (!popItems.length || !popItems[i] || popItems[i].empty || !popCtx) { closePopup(); return; }
    var a = popItems[i];
    var range = document.createRange();
    range.setStart(popCtx.node, popCtx.start);
    range.setEnd(popCtx.node, popCtx.end);
    range.deleteContents();
    var link = el("a", "j-link", Core.esc(a.name));
    link.href = Core.articleUrl(a.rubrique, a.id);
    range.insertNode(link);
    var space = document.createTextNode(" ");
    link.parentNode.insertBefore(space, link.nextSibling);
    var nr = document.createRange();
    nr.setStartAfter(space); nr.collapse(true);
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(nr);
    closePopup();
  }

  function closePopup() {
    if (popup) { popup.style.display = "none"; }
    popCtx = null;
  }

  // --- Récupération de l'article depuis le formulaire ---
  function getEditorHtml() {
    var clone = editorEl.cloneNode(true);
    // Nettoie les attributs d'édition.
    Array.prototype.forEach.call(clone.querySelectorAll("[contenteditable]"), function (n) {
      n.removeAttribute("contenteditable");
    });
    return clone.innerHTML.trim();
  }

  function collect() {
    var art = existing ? JSON.parse(JSON.stringify(existing)) : {};
    art.id = ID || (R.slice(0, 3) + "-" + Date.now().toString(36));
    art.rubrique = R;
    fields.forEach(function (f) {
      if (f.type === "textarea-rich") art[f.key] = getEditorHtml();
      else if (f.type === "tags") art[f.key] = splitTags(inputs[f.key].value);
      else art[f.key] = (inputs[f.key].value || "").trim();
    });
    art.slug = Core.slugify(art.name);
    if (imageRemoved) art.image = "";          // l'image uploadée écrasera (cf. save)
    art.updated = today();
    if (!art.created) art.created = today();
    art.author = GH.getConfig().author || "Guillaume";
    return art;
  }

  // --- Messages ---
  function msg(text, kind) {
    var box = document.querySelector(".j-form-msg");
    if (box) { box.textContent = text; box.className = "j-form-msg " + (kind || ""); }
  }
  function setBusy(b) {
    var btn = document.getElementById("j-save-btn");
    if (btn) { btn.disabled = b; btn.textContent = b ? "Enregistrement…" : "Enregistrer"; }
  }

  // --- Sauvegarde ---
  function save() {
    var name = (inputs.name && inputs.name.value || "").trim();
    if (!name) { msg("Le nom est obligatoire.", "err"); inputs.name && inputs.name.focus(); return; }
    if (!GH.isConfigured()) { openConfig(); msg("Configure ton jeton GitHub pour publier.", "err"); return; }
    var art = collect();
    var isNew = !ID;
    var change = {
      author: GH.getConfig().author || "Guillaume",
      action: isNew ? "créé" : "modifié",
      target: art.name, rubrique: R, id: art.id, date: today()
    };
    setBusy(true);
    var publish = function () {
      msg("Publication sur GitHub…", "");
      GH.saveArticle(R, art, change).then(function (db) {
        window.JOURNAL_DB = db;
        window.location.href = Core.articleUrl(R, art.id);
      }).catch(function (err) {
        setBusy(false); msg("Échec : " + (err.message || err), "err");
      });
    };
    // Si une image a été choisie, on l'upload d'abord, puis on publie l'article.
    if (pendingImageFile) {
      msg("Envoi de l'image…", "");
      GH.uploadImage(pendingImageFile).then(function (path) {
        art.image = path; publish();
      }).catch(function (err) {
        setBusy(false); msg("Échec image : " + (err.message || err), "err");
      });
    } else {
      publish();
    }
  }

  function remove() {
    if (!existing) return;
    if (!GH.isConfigured()) { openConfig(); return; }
    if (!confirm("Supprimer « " + existing.name + " » ? Cette action écrit sur GitHub.")) return;
    var change = { author: GH.getConfig().author || "Guillaume", action: "supprimé",
      target: existing.name, rubrique: R, id: ID, date: today() };
    setBusy(true); msg("Suppression…", "");
    GH.deleteArticle(R, ID, change).then(function () {
      window.location.href = "journal-" + R + ".html";
    }).catch(function (err) { setBusy(false); msg("Échec : " + (err.message || err), "err"); });
  }

  // --- Modale de configuration GitHub ---
  function openConfig() {
    var cfg = GH.getConfig();
    var overlay = el("div", "j-modal-overlay");
    overlay.innerHTML =
      "<div class='j-modal'>" +
      "<h2>Configuration GitHub</h2>" +
      "<p class='j-modal-lead'>Le jeton reste uniquement dans ce navigateur. Crée un jeton « fine-grained » " +
      "avec la permission <strong>Contents : Read & write</strong> sur le dépôt.</p>" +
      "<label class='j-label'>Ton nom (auteur des entrées)</label>" +
      "<input class='j-input' id='cfg-author' value='" + Core.esc(cfg.author || "Guillaume") + "'>" +
      "<label class='j-label'>Jeton GitHub</label>" +
      "<input class='j-input' id='cfg-token' type='password' placeholder='github_pat_…' value='" + Core.esc(cfg.token || "") + "'>" +
      "<details class='j-modal-adv'><summary>Dépôt (avancé)</summary>" +
      "<label class='j-label'>Propriétaire</label><input class='j-input' id='cfg-owner' value='" + Core.esc(cfg.owner) + "'>" +
      "<label class='j-label'>Dépôt</label><input class='j-input' id='cfg-repo' value='" + Core.esc(cfg.repo) + "'>" +
      "<label class='j-label'>Branche</label><input class='j-input' id='cfg-branch' value='" + Core.esc(cfg.branch) + "'>" +
      "</details>" +
      "<div class='j-form-actions'>" +
      "<button class='j-btn-add' id='cfg-save'>Enregistrer</button>" +
      "<button class='j-btn-ghost' id='cfg-cancel'>Annuler</button>" +
      "<button class='j-btn-danger' id='cfg-clear'>Effacer le jeton</button>" +
      "</div></div>";
    document.body.appendChild(overlay);
    function close() { overlay.remove(); }
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    overlay.querySelector("#cfg-cancel").addEventListener("click", close);
    overlay.querySelector("#cfg-clear").addEventListener("click", function () {
      GH.setConfig({ token: "" }); close(); msg("Jeton effacé.", "");
    });
    overlay.querySelector("#cfg-save").addEventListener("click", function () {
      GH.setConfig({
        author: overlay.querySelector("#cfg-author").value.trim() || "Guillaume",
        token: overlay.querySelector("#cfg-token").value.trim(),
        owner: overlay.querySelector("#cfg-owner").value.trim(),
        repo: overlay.querySelector("#cfg-repo").value.trim(),
        branch: overlay.querySelector("#cfg-branch").value.trim() || "main"
      });
      close(); msg(GH.isConfigured() ? "Configuration enregistrée." : "Jeton manquant.", GH.isConfigured() ? "" : "err");
    });
  }

  // --- Init ---
  function init() {
    var main = document.getElementById("journal-main");
    var head = document.getElementById("journal-pagehead");
    if (!meta) {
      if (head) head.innerHTML = "<div class='ph-text'><h1>Rubrique inconnue</h1></div>";
      return;
    }
    var navLink = document.querySelector('.j-item[href="journal-' + R + '.html"]');
    if (navLink) navLink.classList.add("is-current");
    if (head) {
      head.innerHTML =
        (window.journalIcon ? window.journalIcon(meta.icon, "ph-ico") : "") +
        "<div class='ph-text'>" +
        "<div class='j-crumb'><a href='journal-" + R + ".html'>" + Core.esc(meta.label) + "</a> <span>›</span> " +
        (existing ? "Éditer" : "Nouveau") + "</div>" +
        "<h1>" + (existing ? Core.esc(existing.name) : "Nouveau " + Core.esc(meta.singular)) + "</h1></div>";
    }
    document.title = (existing ? "Éditer " + existing.name : "Nouveau " + meta.singular) + " — Journal 7ème Mer";
    renderForm(main);
    // Pré-remplit le nom si fourni (ex. créer une nation depuis un continent).
    if (!ID) {
      var preNom = qs("name");
      if (preNom && inputs.name) inputs.name.value = preNom;
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
