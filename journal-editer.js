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
  var pendingImageFile = null;  // nouvelle image ENTIÈRE choisie (à uploader au save)
  var pendingThumbFile = null;  // vignette recadrée (pour les listes uniquement)
  var thumbCleared = false;     // l'utilisateur a choisi « sans recadrer » sur l'existante
  var imageRemoved = false;     // l'utilisateur a retiré l'image existante

  // --- Construction du formulaire ---
  function fieldControl(f) {
    var val = existing ? existing[f.key] : (f.default || "");
    if (f.type === "textarea-rich") {
      var wrap = el("div", "j-rich");
      editorEl = el("div", "j-rich-area");
      editorEl.contentEditable = "true";
      editorEl.setAttribute("role", "textbox");
      editorEl.setAttribute("aria-multiline", "true");
      editorEl.innerHTML = (existing && existing.description) || "";
      wrap.appendChild(buildToolbar(editorEl));
      wrap.appendChild(editorEl);
      wrap.appendChild(el("div", "j-rich-hint", "Astuce : tape <strong>@</strong> puis un nom pour lier un autre article (personnage, nation, organisation…)."));
      return wrap;
    }
    if (f.type === "entrees") {
      var ec = buildEntreesControl(Array.isArray(val) ? val : []);
      inputs[f.key] = ec;
      return ec;
    }
    if (f.type === "membres") {
      var mc = buildMembersControl(Array.isArray(val) ? val : []);
      inputs[f.key] = mc;                 // conteneur ; lu via readMembers()
      return mc;
    }
    if (f.type === "select") {
      var sel = el("select", "j-input");
      var opts = (f.options || []).slice();
      // Valeur héritée hors liste (ex. « PNJ ») : on l'ajoute pour ne pas
      // l'écraser silencieusement à l'ouverture de la fiche.
      if (val && opts.indexOf(val) < 0) opts.push(val);
      opts.forEach(function (o) {
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

  // --- Entrées datées (historique) : chaque entrée a un titre, une date
  // libre (ex. « 26 Mars, 1667 ») et son propre éditeur riche (@ compris). ---
  function buildEntreesControl(list) {
    var root = el("div", "j-entrees");
    var rows = el("div", "j-entrees-rows");
    root.appendChild(rows);

    function addRow(en) {
      en = en || {};
      var row = el("div", "j-entree-edit");
      if (en.id) row.setAttribute("data-id", en.id);

      var head = el("div", "j-entree-edit-head");
      var name = el("input", "j-input e-name");
      name.type = "text"; name.placeholder = "Titre de l'entrée";
      name.value = en.name || "";
      var date = el("input", "j-input e-date");
      date.type = "text"; date.placeholder = "Date (ex. 26 Mars, 1667)";
      date.value = en.date || "";
      var up = el("button", "j-membre-del", "↑"); up.type = "button"; up.title = "Monter";
      var down = el("button", "j-membre-del", "↓"); down.type = "button"; down.title = "Descendre";
      var del = el("button", "j-membre-del", "✕"); del.type = "button"; del.title = "Supprimer l'entrée";
      up.addEventListener("click", function () {
        var prev = row.previousElementSibling;
        if (prev) rows.insertBefore(row, prev);
      });
      down.addEventListener("click", function () {
        var next = row.nextElementSibling;
        if (next) rows.insertBefore(next, row);
      });
      del.addEventListener("click", function () {
        if (confirm("Supprimer cette entrée ?")) row.remove();
      });
      head.appendChild(name); head.appendChild(date);
      head.appendChild(up); head.appendChild(down); head.appendChild(del);

      // Liaison au calendrier Théan : la date structurée place l'entrée
      // sur le calendrier interactif (le texte de date reste libre).
      var cal = (en.cal && en.cal.y && en.cal.m && en.cal.d)
        ? { y: +en.cal.y, m: +en.cal.m, d: +en.cal.d } : null;
      var calRow = el("div", "j-entree-calrow");
      var calBtn = el("button", "j-btn-ghost e-callink", "");
      calBtn.type = "button";
      function calLabel() {
        calBtn.textContent = cal ? "🗓 " + Core.calFormat(cal) : "🗓 Lier au calendrier";
      }
      calLabel();
      var panel = el("div", "j-entree-calpanel");
      panel.style.display = "none";
      var selY = el("input", "j-input"); selY.type = "number";
      selY.min = Core.CAL.minYear; selY.style.maxWidth = "90px"; selY.title = "Année";
      var selM = el("select", "j-input"); selM.title = "Mois";
      Core.CAL.months.forEach(function (mm, i) {
        var o = el("option", null, mm[0]); o.value = i + 1; selM.appendChild(o);
      });
      var selD = el("select", "j-input"); selD.title = "Jour";
      function rebuildDays() {
        var len = Core.CAL.months[(+selM.value || 1) - 1][1];
        var cur = +selD.value || 1;
        selD.innerHTML = "";
        for (var dd = 1; dd <= len; dd++) {
          var o = el("option", null, String(dd)); o.value = dd; selD.appendChild(o);
        }
        selD.value = Math.min(cur, len);
      }
      selM.addEventListener("change", rebuildDays);
      var ok = el("button", "j-btn-add", "OK"); ok.type = "button";
      var clr = el("button", "j-btn-ghost", "Retirer la date"); clr.type = "button";
      panel.appendChild(selY); panel.appendChild(selM); panel.appendChild(selD);
      panel.appendChild(ok); panel.appendChild(clr);
      calBtn.addEventListener("click", function () {
        var show = panel.style.display === "none";
        if (show) {
          selY.value = cal ? cal.y : Core.CAL.current.y;
          selM.value = cal ? cal.m : Core.CAL.current.m;
          rebuildDays();
          selD.value = cal ? cal.d : Core.CAL.current.d;
        }
        panel.style.display = show ? "flex" : "none";
      });
      ok.addEventListener("click", function () {
        cal = { y: +selY.value || Core.CAL.current.y, m: +selM.value || 1, d: +selD.value || 1 };
        date.value = Core.calFormat(cal);   // texte de date auto-rempli (modifiable)
        calLabel(); panel.style.display = "none";
      });
      clr.addEventListener("click", function () {
        cal = null; calLabel(); panel.style.display = "none";
      });
      calRow.appendChild(calBtn); calRow.appendChild(panel);
      row._getCal = function () { return cal; };

      var rich = el("div", "j-rich");
      var area = el("div", "j-rich-area e-body");
      area.contentEditable = "true";
      area.setAttribute("role", "textbox");
      area.setAttribute("aria-multiline", "true");
      area.innerHTML = en.html || "";
      rich.appendChild(buildToolbar(area));
      rich.appendChild(area);
      wireMentions(area);

      row.appendChild(head);
      row.appendChild(calRow);
      row.appendChild(rich);
      rows.appendChild(row);
      return row;
    }

    (list || []).forEach(addRow);
    var add = el("button", "j-btn-ghost", "+ Ajouter une entrée");
    add.type = "button";
    add.addEventListener("click", function () {
      var row = addRow();
      row.querySelector(".e-name").focus();
    });
    root.appendChild(add);

    root.readEntrees = function () {
      var out = [];
      Array.prototype.forEach.call(rows.querySelectorAll(".j-entree-edit"), function (row) {
        var nm = row.querySelector(".e-name").value.trim();
        var clone = row.querySelector(".e-body").cloneNode(true);
        Array.prototype.forEach.call(clone.querySelectorAll("[contenteditable]"), function (n) {
          n.removeAttribute("contenteditable");
        });
        var html = clone.innerHTML.trim();
        if (!nm && !Core.htmlToText(html)) return;   // entrée vide : ignorée
        out.push({
          id: row.getAttribute("data-id") || ("ent-" + Date.now().toString(36) + "-" + out.length),
          name: nm,
          date: row.querySelector(".e-date").value.trim(),
          cal: (row._getCal && row._getCal()) || null,
          html: html
        });
      });
      return out;
    };
    return root;
  }

  // --- Membres d'une organisation : lignes nom + rôle. Le nom propose les
  // personnages existants (recherche en tapant) mais accepte du texte libre.
  function buildMembersControl(list) {
    var root = el("div", "j-membres");
    var rows = el("div", "j-membres-rows");
    root.appendChild(rows);

    function suggestions(q) {
      q = q.toLowerCase();
      return (Core.articlesOf("personnages") || []).filter(function (p) {
        return p.name && p.name.toLowerCase().indexOf(q) >= 0;
      }).slice(0, 6);
    }

    function addRow(m) {
      m = m || {};
      var row = el("div", "j-membre-row");
      if (m.id) row.setAttribute("data-id", m.id);
      var nameWrap = el("div", "j-membre-namewrap");
      var name = el("input", "j-input m-name");
      name.type = "text";
      name.placeholder = "Personnage (recherche en tapant)";
      name.value = m.name || "";
      var sugg = el("div", "j-membre-sugg");
      nameWrap.appendChild(name); nameWrap.appendChild(sugg);
      var role = el("input", "j-input m-role");
      role.type = "text";
      role.placeholder = "Rôle (Chef, Membre…)";
      role.value = m.role || "";
      var del = el("button", "j-membre-del", "✕");
      del.type = "button"; del.title = "Retirer ce membre";
      del.addEventListener("click", function () { row.remove(); });

      name.addEventListener("input", function () {
        row.removeAttribute("data-id");   // nom modifié : le lien sera re-résolu
        var q = name.value.trim();
        var hits = q ? suggestions(q) : [];
        if (!hits.length) { sugg.innerHTML = ""; sugg.style.display = "none"; return; }
        sugg.innerHTML = hits.map(function (p) {
          return "<div class='j-membre-sugg-item' data-id='" + p.id + "'>" + Core.esc(p.name) + "</div>";
        }).join("");
        sugg.style.display = "block";
        Array.prototype.forEach.call(sugg.children, function (it) {
          it.addEventListener("mousedown", function (e) {
            e.preventDefault();
            name.value = it.textContent;
            row.setAttribute("data-id", it.getAttribute("data-id"));
            sugg.style.display = "none";
          });
        });
      });
      name.addEventListener("blur", function () {
        setTimeout(function () { sugg.style.display = "none"; }, 150);
      });

      row.appendChild(nameWrap); row.appendChild(role); row.appendChild(del);
      rows.appendChild(row);
      return row;
    }

    (list || []).forEach(addRow);
    var add = el("button", "j-btn-ghost", "+ Ajouter un membre");
    add.type = "button";
    add.addEventListener("click", function () {
      var row = addRow();
      row.querySelector(".m-name").focus();
    });
    root.appendChild(add);

    root.readMembers = function () {
      var out = [];
      Array.prototype.forEach.call(rows.querySelectorAll(".j-membre-row"), function (row) {
        var nm = row.querySelector(".m-name").value.trim();
        if (!nm) return;
        var id = row.getAttribute("data-id") || "";
        if (!id) {
          // Résolution par nom exact (le personnage existe peut-être déjà).
          var hit = (Core.articlesOf("personnages") || []).filter(function (p) {
            return (p.name || "").toLowerCase() === nm.toLowerCase();
          })[0];
          if (hit) id = hit.id;
        }
        out.push({ id: id, name: nm, role: row.querySelector(".m-role").value.trim() });
      });
      return out;
    };
    return root;
  }

  var CAMERA_SVG = "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'/><circle cx='12' cy='13' r='4'/></svg>";

  // --- Recadrage d'image : glisser pour choisir la zone, zoom, ratio. ---
  // Renvoie une promesse : File recadré (ou original si « sans recadrer »),
  // null/undefined si annulé. L'export est plafonné à 960 px de large.
  var CROP_RATIOS = [
    { label: "Paysage", w: 16, h: 9 },
    { label: "Standard", w: 4, h: 3 },
    { label: "Carré", w: 1, h: 1 },
    { label: "Portrait", w: 3, h: 4 }
  ];

  function openCropper(file) {
    return new Promise(function (resolve) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onerror = function () { URL.revokeObjectURL(url); resolve(file); };
      img.onload = build;
      img.src = url;

      function build() {
        var iw = img.naturalWidth, ih = img.naturalHeight;
        var ratio = 4 / 3;
        var sx, sy, sw, sh;           // rectangle source affiché (dans l'image)

        var overlay = el("div", "j-modal-overlay");
        overlay.innerHTML =
          "<div class='j-modal j-crop-modal'>" +
          "<h2>Recadrer la vignette</h2>" +
          "<div class='j-filter' id='crop-ratios'></div>" +
          "<canvas class='j-crop-canvas' id='crop-canvas'></canvas>" +
          "<div class='j-crop-zoom'><span>Zoom</span><input type='range' id='crop-zoom' min='100' max='400' value='100'></div>" +
          "<p class='j-rich-hint'>Ce cadrage ne concerne que la <strong>vignette des listes</strong> ; " +
          "la fiche de l'article montre toujours l'image entière. Fais glisser l'image pour choisir la zone.</p>" +
          "<div class='j-form-actions'>" +
          "<button class='j-btn-add' id='crop-ok' type='button'>Valider le cadrage</button>" +
          "<button class='j-btn-ghost' id='crop-raw' type='button'>Utiliser sans recadrer</button>" +
          "<button class='j-btn-ghost' id='crop-cancel' type='button'>Annuler</button>" +
          "</div></div>";
        document.body.appendChild(overlay);

        var canvas = overlay.querySelector("#crop-canvas");
        var ctx = canvas.getContext("2d");
        var zoomInput = overlay.querySelector("#crop-zoom");
        var ratiosBox = overlay.querySelector("#crop-ratios");

        CROP_RATIOS.forEach(function (r, i) {
          var b = el("button", "j-chip" + (i === 1 ? " is-active" : ""), r.label + " " + r.w + ":" + r.h);
          b.type = "button";
          b.addEventListener("click", function () {
            Array.prototype.forEach.call(ratiosBox.children, function (c) { c.classList.remove("is-active"); });
            b.classList.add("is-active");
            ratio = r.w / r.h;
            fit();
          });
          ratiosBox.appendChild(b);
        });

        // Plus grand rectangle au ratio courant contenu dans l'image (zoom 1).
        function coverRect() {
          var w = iw, h = iw / ratio;
          if (h > ih) { h = ih; w = ih * ratio; }
          return { w: w, h: h };
        }
        function clamp() {
          if (sx < 0) sx = 0;
          if (sy < 0) sy = 0;
          if (sx + sw > iw) sx = iw - sw;
          if (sy + sh > ih) sy = ih - sh;
        }
        function draw() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        }
        function fit() {
          zoomInput.value = 100;
          var c = coverRect();
          sw = c.w; sh = c.h;
          sx = (iw - sw) / 2; sy = (ih - sh) / 2;
          var cw = Math.min(420, overlay.querySelector(".j-crop-modal").clientWidth - 48);
          canvas.width = cw;
          canvas.height = Math.round(cw / ratio);
          draw();
        }

        zoomInput.addEventListener("input", function () {
          var z = Math.max(100, +zoomInput.value || 100) / 100;
          var c = coverRect();
          var cx = sx + sw / 2, cy = sy + sh / 2;
          sw = c.w / z; sh = c.h / z;
          sx = cx - sw / 2; sy = cy - sh / 2;
          clamp(); draw();
        });

        var dragging = false, lastX = 0, lastY = 0;
        canvas.addEventListener("pointerdown", function (e) {
          dragging = true; lastX = e.clientX; lastY = e.clientY;
          try { canvas.setPointerCapture(e.pointerId); } catch (err) { }
          e.preventDefault();
        });
        canvas.addEventListener("pointermove", function (e) {
          if (!dragging) return;
          sx -= (e.clientX - lastX) * (sw / canvas.width);
          sy -= (e.clientY - lastY) * (sh / canvas.height);
          lastX = e.clientX; lastY = e.clientY;
          clamp(); draw();
        });
        canvas.addEventListener("pointerup", function () { dragging = false; });
        canvas.addEventListener("pointercancel", function () { dragging = false; });

        function finish(result) {
          URL.revokeObjectURL(url);
          overlay.remove();
          resolve(result);
        }
        overlay.addEventListener("click", function (e) { if (e.target === overlay) finish(null); });
        overlay.querySelector("#crop-cancel").addEventListener("click", function () { finish(null); });
        overlay.querySelector("#crop-raw").addEventListener("click", function () { finish(file); });
        overlay.querySelector("#crop-ok").addEventListener("click", function () {
          var outW = Math.round(Math.min(960, sw));
          var outH = Math.round(outW / ratio);
          var oc = document.createElement("canvas");
          oc.width = outW; oc.height = outH;
          oc.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
          var isPng = /png/i.test(file.type) || /\.png$/i.test(file.name || "");
          oc.toBlob(function (blob) {
            if (!blob) { finish(file); return; }
            finish(new File([blob], "recadree." + (isPng ? "png" : "jpg"),
              { type: isPng ? "image/png" : "image/jpeg" }));
          }, isPng ? "image/png" : "image/jpeg", 0.88);
        });

        fit();
      }
    });
  }

  function buildImageControl() {
    var wrap = el("div", "j-image-field");
    var preview = el("div", "j-image-preview");
    function setPreview(src) {
      preview.innerHTML = src
        ? "<img src='" + src + "' alt=''>"
        : "<span class='j-image-ph'>" + CAMERA_SVG + "</span>";
    }
    setPreview((existing && Core.imgSrc(existing.thumb || existing.image)) || "");

    var controls = el("div", "j-image-controls");
    var pick = el("label", "j-btn-ghost", "Choisir une image");
    var input = el("input"); input.type = "file"; input.accept = "image/*"; input.style.display = "none";
    pick.appendChild(input);
    var crop = el("button", "j-btn-ghost", "Recadrer"); crop.type = "button";
    var rm = el("button", "j-btn-ghost", "Retirer"); rm.type = "button";
    controls.appendChild(pick); controls.appendChild(crop); controls.appendChild(rm);

    // Réduit l'image ENTIÈRE si très grande (max 1600 px de large) avant envoi.
    function downscaleImage(file) {
      return new Promise(function (resolve) {
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onerror = function () { URL.revokeObjectURL(url); resolve(file); };
        img.onload = function () {
          var iw = img.naturalWidth, ih = img.naturalHeight;
          if (iw <= 1600) { URL.revokeObjectURL(url); resolve(file); return; }
          var c = document.createElement("canvas");
          c.width = 1600; c.height = Math.round(ih * 1600 / iw);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          var isPng = /png/i.test(file.type);
          c.toBlob(function (b) {
            URL.revokeObjectURL(url);
            resolve(b ? new File([b], "image." + (isPng ? "png" : "jpg"),
              { type: isPng ? "image/png" : "image/jpeg" }) : file);
          }, isPng ? "image/png" : "image/jpeg", 0.9);
        };
        img.src = url;
      });
    }

    // Choix d'un fichier : le recadrage produit la VIGNETTE (listes) ;
    // l'image entière est conservée telle quelle (réduite si énorme).
    input.addEventListener("change", function () {
      var f = input.files && input.files[0];
      input.value = "";
      if (!f) return;
      openCropper(f).then(function (result) {
        if (!result) return;                       // annulé : rien ne change
        downscaleImage(f).then(function (orig) {
          pendingImageFile = orig;
          pendingThumbFile = (result === f) ? null : result;   // « sans recadrer » = pas de vignette
          thumbCleared = false; imageRemoved = false;
          setPreview(URL.createObjectURL(pendingThumbFile || pendingImageFile));
        });
      });
    });

    // Recadrer : (re)génère uniquement la vignette, à partir de la nouvelle
    // image si une a été choisie, sinon de l'image déjà publiée.
    crop.addEventListener("click", function () {
      var srcP;
      if (pendingImageFile) {
        srcP = Promise.resolve(pendingImageFile);
      } else if (existing && existing.image && !imageRemoved) {
        srcP = fetch(Core.imgSrc(existing.image)).then(function (r) {
          if (!r.ok) throw new Error();
          return r.blob();
        }).then(function (b) {
          return new File([b], (existing.image.split("/").pop() || "image"),
            { type: b.type || "image/jpeg" });
        });
      } else {
        return;
      }
      srcP.then(function (f) {
        return openCropper(f).then(function (result) {
          if (!result) return;                     // annulé
          if (result === f) { pendingThumbFile = null; thumbCleared = true; }
          else { pendingThumbFile = result; thumbCleared = false; }
          setPreview(URL.createObjectURL(pendingThumbFile || f));
        });
      }).catch(function () {
        msg("Impossible de charger l'image à recadrer (fais-le depuis le site en ligne).", "err");
      });
    });

    rm.addEventListener("click", function () {
      pendingImageFile = null; pendingThumbFile = null;
      imageRemoved = true; thumbCleared = false; input.value = "";
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

  // --- Barre d'outils de l'éditeur riche (liée à un éditeur donné) ---
  function buildToolbar(ed) {
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
        ed.focus();
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
      // La popup n'est que masquée (jamais détruite) : tester sa VISIBILITÉ,
      // sinon Entrée resterait avalée après le premier usage d'un @.
      if (!popup || popup.style.display === "none") return;
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
      else if (f.type === "entrees") art[f.key] = inputs[f.key].readEntrees();
      else if (f.type === "membres") art[f.key] = inputs[f.key].readMembers();
      else if (f.type === "tags") art[f.key] = splitTags(inputs[f.key].value);
      else art[f.key] = (inputs[f.key].value || "").trim();
    });
    art.slug = Core.slugify(art.name);
    if (imageRemoved) { art.image = ""; art.thumb = ""; }   // les uploads écraseront (cf. save)
    art.updated = today();
    if (!art.created) art.created = today();
    art.author = GH.getConfig().author || "Guillaume";
    return art;
  }

  // --- Messages ---
  function msg(text, kind) {
    var box = document.querySelector(".j-form-msg");
    if (box) {
      box.textContent = text;
      box.className = "j-form-msg " + (kind || "");
      // Rendre le message visible (l'échec de publication passait inaperçu).
      if (text) box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
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
    // Uploads éventuels avant publication : l'image ENTIÈRE (fiche) et la
    // VIGNETTE recadrée (listes). Copies locales pour affichage immédiat
    // (le site ne sert les fichiers qu'après déploiement, ~1-2 min).
    var uploads = Promise.resolve();
    if (pendingImageFile) {
      var imgFile = pendingImageFile;
      uploads = uploads.then(function () {
        msg("Envoi de l'image…", "");
        return GH.uploadImage(imgFile).then(function (path) {
          art.image = path;
          if (!pendingThumbFile) art.thumb = "";   // l'ancienne vignette est périmée
          return rememberPendingImage(path, imgFile);
        });
      });
    }
    if (pendingThumbFile) {
      var thFile = pendingThumbFile;
      uploads = uploads.then(function () {
        msg("Envoi de la vignette…", "");
        return GH.uploadImage(thFile).then(function (path) {
          art.thumb = path;
          return rememberPendingImage(path, thFile);
        });
      });
    } else if (thumbCleared) {
      art.thumb = "";
    }
    uploads.then(publish).catch(function (err) {
      setBusy(false); msg("Échec image : " + (err.message || err), "err");
    });
  }

  // Mémorise l'image envoyée (dataURL) en localStorage ; journal-core.js la
  // substitue au chemin tant que le site n'a pas déployé le fichier.
  function rememberPendingImage(path, file) {
    return new Promise(function (resolve) {
      var r = new FileReader();
      r.onload = function () {
        try {
          var map = JSON.parse(localStorage.getItem("journal_pending_images") || "{}");
          var keys = Object.keys(map).sort(function (a, b) { return (map[a].t || 0) - (map[b].t || 0); });
          while (keys.length >= 3) delete map[keys.shift()];   // borne la taille
          map[path] = { d: String(r.result), t: Date.now() };
          localStorage.setItem("journal_pending_images", JSON.stringify(map));
        } catch (e) { /* quota dépassé : l'image apparaîtra après déploiement */ }
        resolve();
      };
      r.onerror = function () { resolve(); };
      r.readAsDataURL(file);
    });
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
      "avec la permission <strong>Contents : Read & write</strong> sur le dépôt. " +
      "Colle bien la <strong>valeur</strong> du jeton (elle commence par <code>github_pat_</code>), " +
      "pas son nom.</p>" +
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
      "<button class='j-btn-ghost' id='cfg-test'>Tester la connexion</button>" +
      "<button class='j-btn-ghost' id='cfg-cancel'>Annuler</button>" +
      "<button class='j-btn-danger' id='cfg-clear'>Effacer le jeton</button>" +
      "</div>" +
      "<div class='j-form-msg' id='cfg-msg'></div></div>";
    document.body.appendChild(overlay);
    function close() { overlay.remove(); }
    function saveFields() {
      GH.setConfig({
        author: overlay.querySelector("#cfg-author").value.trim() || "Guillaume",
        token: overlay.querySelector("#cfg-token").value.trim(),
        owner: overlay.querySelector("#cfg-owner").value.trim(),
        repo: overlay.querySelector("#cfg-repo").value.trim(),
        branch: overlay.querySelector("#cfg-branch").value.trim() || "main"
      });
    }
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    overlay.querySelector("#cfg-cancel").addEventListener("click", close);
    overlay.querySelector("#cfg-clear").addEventListener("click", function () {
      GH.setConfig({ token: "" }); close(); msg("Jeton effacé.", "");
    });
    overlay.querySelector("#cfg-test").addEventListener("click", function () {
      saveFields();
      var box = overlay.querySelector("#cfg-msg");
      box.textContent = "Test en cours…"; box.className = "j-form-msg";
      GH.testConnection().then(function (ok) {
        box.textContent = "✓ " + ok; box.className = "j-form-msg ok";
      }).catch(function (err) {
        box.textContent = "✗ " + (err.message || err); box.className = "j-form-msg err";
      });
    });
    overlay.querySelector("#cfg-save").addEventListener("click", function () {
      saveFields();
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
    var navLink = document.querySelector('.j-item[data-sec="journal-' + R + '"]');
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
