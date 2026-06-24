// ============================================================
// Publication GitHub depuis le navigateur (API Contents).
// Le MJ saisit un jeton « fine-grained » (Contents: Read & write sur le dépôt)
// stocké UNIQUEMENT dans localStorage. saveArticle() récupère journal-data.js,
// y insère/met à jour l'article + une entrée d'activité, et le recommitte.
// Expose window.JournalGitHub.
// ============================================================
(function () {
  "use strict";

  var LS_KEY = "journal_gh_config";
  var PATH = "journal-data.js";
  var DEFAULTS = { owner: "Guitou31", repo: "7mers", branch: "main", token: "" };
  var HEADER =
    "// ============================================================\n" +
    "// Base de données du Journal de campagne.\n" +
    "//   - articles : les articles, regroupés par rubrique.\n" +
    "//   - changes  : journal d'activité (le plus récent en premier).\n" +
    "// Écrit par l'éditeur via l'API GitHub ; lu par toutes les pages du journal.\n" +
    "// ============================================================\n";

  function getConfig() {
    var c;
    try { c = JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch (e) { c = {}; }
    return Object.assign({}, DEFAULTS, c);
  }
  function setConfig(patch) {
    var c = Object.assign(getConfig(), patch);
    localStorage.setItem(LS_KEY, JSON.stringify(c));
    return c;
  }
  function isConfigured() { return !!getConfig().token; }
  function clearToken() { setConfig({ token: "" }); }

  // --- base64 UTF-8 ---
  function b64encode(str) {
    var bytes = new TextEncoder().encode(str), bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function b64decode(b64) {
    var bin = atob(String(b64).replace(/\s/g, ""));
    var bytes = Uint8Array.from(bin, function (c) { return c.charCodeAt(0); });
    return new TextDecoder().decode(bytes);
  }

  function api(path) {
    var c = getConfig();
    return "https://api.github.com/repos/" + c.owner + "/" + c.repo + "/" + path;
  }
  function headers() {
    return {
      "Authorization": "Bearer " + getConfig().token,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
  }

  function parseDbFile(text) {
    var i = text.indexOf("{"), j = text.lastIndexOf("}");
    if (i < 0 || j < 0) throw new Error("Format de journal-data.js inattendu.");
    return JSON.parse(text.slice(i, j + 1));
  }
  function serializeDbFile(dbObj) {
    return HEADER + "window.JOURNAL_DB = " + JSON.stringify(dbObj, null, 2) + ";\n";
  }

  function getFile() {
    var c = getConfig();
    return fetch(api("contents/" + PATH) + "?ref=" + encodeURIComponent(c.branch), { headers: headers() })
      .then(function (res) {
        if (res.status === 404) return { sha: null, db: null }; // fichier pas encore présent
        if (res.status === 401) throw new Error("Jeton refusé (401). Vérifie le jeton GitHub.");
        if (!res.ok) throw new Error("GitHub GET a échoué (" + res.status + ").");
        return res.json().then(function (j) {
          return { sha: j.sha, db: parseDbFile(b64decode(j.content)) };
        });
      });
  }

  function putFile(text, message, sha) {
    var c = getConfig();
    var body = { message: message, content: b64encode(text), branch: c.branch };
    if (sha) body.sha = sha;
    return fetch(api("contents/" + PATH), {
      method: "PUT", headers: headers(), body: JSON.stringify(body)
    }).then(function (res) {
      if (res.status === 401) throw new Error("Jeton refusé (401).");
      if (res.status === 403) throw new Error("Accès refusé (403) : le jeton n'a pas les droits « Contents: Read & write ».");
      if (res.status === 409) throw new Error("Conflit (409) : le fichier a changé entre-temps. Recharge la page et réessaie.");
      if (!res.ok) return res.json().then(function (j) {
        throw new Error("GitHub PUT a échoué (" + res.status + ") : " + (j.message || ""));
      });
      return res.json();
    });
  }

  // --- Upload d'une image (binaire) dans journal-images/ ---
  var _imgCounter = 0;
  function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(String(r.result).split(",")[1] || ""); };
      r.onerror = function () { reject(new Error("Lecture du fichier impossible.")); };
      r.readAsDataURL(file);
    });
  }
  function uploadImage(file) {
    var ext = (file.name.split(".").pop() || "img").toLowerCase().replace(/[^a-z0-9]/g, "") || "img";
    var name = "img-" + Date.now().toString(36) + "-" + (_imgCounter++) + "." + ext;
    var path = "journal-images/" + name;
    var c = getConfig();
    return fileToBase64(file).then(function (b64) {
      return fetch(api("contents/" + path), {
        method: "PUT", headers: headers(),
        body: JSON.stringify({ message: "Journal: image " + name, content: b64, branch: c.branch })
      }).then(function (res) {
        if (res.status === 401) throw new Error("Jeton refusé (401).");
        if (res.status === 403) throw new Error("Accès refusé (403) : droits Contents insuffisants.");
        if (!res.ok) return res.json().then(function (j) {
          throw new Error("Upload image échoué (" + res.status + ") : " + (j.message || ""));
        });
        return path;
      });
    });
  }

  function emptyDb() {
    return {
      articles: { personnages: [], lieux: [], cartes: [], organisations: [], familles: [],
        creatures: [], nations: [], calendriers: [], chronologies: [], journaux: [], quetes: [], objets: [] },
      changes: []
    };
  }

  // Insère/met à jour un article + prépend une entrée d'activité, puis commit.
  // Renvoie une promesse résolue avec le DB à jour.
  function saveArticle(rubrique, article, change) {
    return getFile().then(function (cur) {
      var db = cur.db || emptyDb();
      if (!db.articles) db.articles = emptyDb().articles;
      if (!db.changes) db.changes = [];
      if (!db.articles[rubrique]) db.articles[rubrique] = [];

      var list = db.articles[rubrique];
      var idx = -1;
      for (var i = 0; i < list.length; i++) if (list[i].id === article.id) { idx = i; break; }
      if (idx >= 0) list[idx] = article; else list.push(article);

      if (change) db.changes.unshift(change);
      if (db.changes.length > 500) db.changes = db.changes.slice(0, 500);

      var text = serializeDbFile(db);
      var msg = "Journal: " + (change ? change.action + " " + change.target : "maj " + article.name) +
        " (" + rubrique + ")";
      return putFile(text, msg, cur.sha).then(function () { return db; });
    });
  }

  // Supprime un article + entrée d'activité.
  function deleteArticle(rubrique, id, change) {
    return getFile().then(function (cur) {
      var db = cur.db || emptyDb();
      var list = (db.articles && db.articles[rubrique]) || [];
      db.articles[rubrique] = list.filter(function (a) { return a.id !== id; });
      if (change) db.changes.unshift(change);
      var text = serializeDbFile(db);
      var msg = "Journal: " + (change ? change.action + " " + change.target : "suppr") + " (" + rubrique + ")";
      return putFile(text, msg, cur.sha).then(function () { return db; });
    });
  }

  window.JournalGitHub = {
    getConfig: getConfig, setConfig: setConfig, isConfigured: isConfigured,
    clearToken: clearToken, getFile: getFile, saveArticle: saveArticle, deleteArticle: deleteArticle,
    uploadImage: uploadImage, PATH: PATH
  };
})();
