// Export de la création de personnage vers les fiches HTML « intégrables »
// (Fiche de Personnage + Liste de Compétences). Deux modes par fiche :
//  - « Ouvrir pré-remplie » : ouvre la fiche hébergée avec #import=<base64>,
//    l'API embarquée de la fiche applique les données (puis Ctrl+P → PDF).
//  - « Télécharger (HTML) » : copie autonome de la fiche avec les données
//    injectées (appliquées une seule fois), modifiable par le joueur.
(function () {
  "use strict";

  var FICHE_PERSO = "Fiche de Personnage 7ème Mer (intégrable).html";
  var FICHE_COMP = "Liste de Compétences 7ème Mer (intégrable).html";
  var TRAITS = ["Gaillardise", "Finesse", "Esprit", "Détermination", "Panache"];

  // Catégories des données -> les 4 blocs de la Liste de Compétences.
  var CAT_MAP = {
    "Compétences martiales": "mar",
    "Compétences physiques": "phy",
    "Compétences rurales": "phy",
    "Compétences maritimes": "phy",
    "Compétences larronnes": "phy",
    "Compétences savantes": "sav",
    "Compétences médicales": "sav",
    "Compétences artisanales": "sav",
    "Compétences artistiques": "sav",
    "Compétences sociales": "soc",
    "Compétences commerciales": "soc"
  };

  function slugTrait(t) {
    return t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function noms(list) { return (list || []).map(function (x) { return x.nom; }); }

  function valeurTrait(st, nom) {
    var v = 2;                                     // base 7ème Mer
    if (st.trait_libre === nom) v += 1;
    if (st.trait_bonus_nation === nom) v += 1;
    if (st.bonus_age && st.bonus_age.trait_libre === nom) v += 1;
    return v;
  }

  // ---- Données de la Fiche de Personnage ----
  function buildFichePerso() {
    var st = window.CreationState.load();
    var d = {};
    if (st.nation) d.nationalite = st.nation;

    var arcNom = typeof st.arcane === "string" ? st.arcane : (st.arcane && st.arcane.nom);
    if (arcNom) {
      d.arcane = arcNom;
      var arc = (((window.ARCANES_DATA || {}).arcanes) || []).find(function (a) { return a.nom === arcNom; });
      if (arc) { d.vertu = arc.vertu || ""; d.travers = arc.travers || ""; }
    }

    var mets = noms(st.metiers_choisis);
    if (st.bonus_age && st.bonus_age.metier_26_35) mets.push(st.bonus_age.metier_26_35 + " (bonus d'âge)");
    if (mets.length) d.metiers = mets.join(", ");
    var ents = noms(st.entrainements_choisis);
    if (ents.length) d.entrainements = ents.join(", ");
    var ecs = (st.ecoles_choisies || []).map(function (e) {
      return e.nom + (e.type ? " (" + e.type + ")" : "");
    });
    if (ecs.length) d.ecoles = ecs.join(", ");
    var avs = noms(st.avantages_choisis);
    if (st.sorcellerie) avs.unshift("Sorcellerie (" + st.sorcellerie + ")");
    if (avs.length) d.avantages = avs.join(", ");
    if (st.societe_secrete && st.societe_secrete.nom) d.societe = st.societe_secrete.nom;

    // Traits (base 2 + bonus nation/libre/âge) + statistiques dérivées.
    var traits = {}, vals = [];
    TRAITS.forEach(function (t) {
      var v = valeurTrait(st, t);
      traits[slugTrait(t)] = v;
      vals.push(v);
    });
    d.traits = traits;
    d["sante-max"] = traits.gaillardise * 5;
    d["blessures-max"] = traits.determination;
    d["tension-max"] = traits.determination * 5;
    d["frustration-max"] = traits.esprit;
    d.heroisme = Math.min.apply(null, vals);

    // Langues : ligne 1 = Théan (parlé) ; puis langue natale ; puis choisies.
    d["langue-1-parle"] = true;
    var cp = window.CREATION_PERSO_DATA || {};
    var natale = st.nation && cp.langues_par_nation ? cp.langues_par_nation[st.nation] : null;
    if (natale && typeof natale !== "string") natale = natale.nom;
    var idx = 2;
    if (natale) {
      d["langue-" + idx] = natale + " (natale)";
      d["langue-" + idx + "-parle"] = true;
      d["langue-" + idx + "-ecrit"] = true;
      idx++;
    }
    (st.langues_choisies || []).forEach(function (l) {
      if (idx > 7) return;
      d["langue-" + idx] = l.nom;
      d["langue-" + idx + "-parle"] = true;
      idx++;
    });
    return d;
  }

  // ---- Données de la Liste de Compétences ----
  function catDe(nomComp) {
    var comps = ((window.COMPETENCES_DATA || {}).competences) || [];
    var base = nomComp.replace(/\s*\(.*\)\s*$/, "");   // « Escrime (Épées) » -> « Escrime »
    var c = comps.find(function (x) { return x.nom === nomComp; }) ||
            comps.find(function (x) { return x.nom === base; });
    return (c && CAT_MAP[c.categorie]) || "sav";
  }

  function buildFicheComp() {
    var sets = window.CreationState.getMesCompetencesSets();
    var rows = { mar: [], phy: [], sav: [], soc: [] };
    var vus = {};
    function add(nom, level) {
      var k = nom.toLowerCase();
      if (!vus[k]) {
        vus[k] = { nom: nom, base: false, av: false };
        rows[catDe(nom)].push(vus[k]);
      }
      vus[k][level] = true;
    }
    sets.base.forEach(function (n) { add(n, "base"); });
    sets.avancee.forEach(function (n) { add(n, "av"); });

    var d = {};
    Object.keys(rows).forEach(function (cat) {
      rows[cat].sort(function (a, b) { return a.nom.localeCompare(b.nom, "fr"); });
      rows[cat].forEach(function (c, i) {
        var pref;
        if (i < 17) pref = "comp-" + cat + "-" + (i + 1);          // recto
        else if (i < 34) pref = "comp-v-" + cat + "-" + (i - 16);  // verso
        else return;
        d[pref] = c.nom;
        if (c.base) d[pref + "-base"] = true;
        if (c.av) d[pref + "-av"] = true;
      });
    });
    return d;
  }

  // ---- Actions ----
  function b64(data) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  }

  function ouvrir(fiche, data) {
    window.open(encodeURIComponent(fiche) + "#import=" + encodeURIComponent(b64(data)), "_blank");
  }

  function telecharger(fiche, data, nomFichier) {
    fetch(encodeURIComponent(fiche)).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    }).then(function (html) {
      // Script d'amorçage : applique les données UNE fois (marqueur unique),
      // les modifications ultérieures du joueur restent prioritaires.
      var uid = "seed-" + Date.now().toString(36);
      var seed = "\n<script>(function(){var D=" +
        JSON.stringify(data).replace(/<\//g, "<\\/") +
        ";var n=0,t=setInterval(function(){" +
        "if(window.setFicheData&&document.querySelector('[data-k]')){clearInterval(t);" +
        "var ok=true;try{ok=!localStorage.getItem('" + uid + "');}catch(e){}" +
        "if(ok){window.setFicheData(D,{merge:true});try{localStorage.setItem('" + uid + "','1');}catch(e){}}}" +
        "else if(n++>300)clearInterval(t);},100);})();</scr" + "ipt>\n";
      var i = html.lastIndexOf("</body>");
      var out = i >= 0 ? html.slice(0, i) + seed + html.slice(i) : html + seed;
      var blob = new Blob([out], { type: "text/html" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = nomFichier;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    }).catch(function (e) {
      alert("Téléchargement impossible (" + e.message + ").\n" +
        "Utilise le site en ligne — ou « Ouvrir pré-remplie » puis Ctrl+S.");
    });
  }

  function nomPerso() {
    var st = window.CreationState.load();
    return st.nation ? "Heros de " + st.nation : "Heros 7eme Mer";
  }

  function init() {
    var bloc = document.getElementById("export-fiche");
    if (!bloc || !window.CreationState) return;
    document.getElementById("export-fp-open").addEventListener("click", function () {
      ouvrir(FICHE_PERSO, buildFichePerso());
    });
    document.getElementById("export-fp-dl").addEventListener("click", function () {
      telecharger(FICHE_PERSO, buildFichePerso(), "Fiche - " + nomPerso() + ".html");
    });
    document.getElementById("export-lc-open").addEventListener("click", function () {
      ouvrir(FICHE_COMP, buildFicheComp());
    });
    document.getElementById("export-lc-dl").addEventListener("click", function () {
      telecharger(FICHE_COMP, buildFicheComp(), "Competences - " + nomPerso() + ".html");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
