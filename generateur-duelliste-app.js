// Générateur de duelliste — tire au sort l'école adverse selon le lieu du duel.
// Source de données : window.ECOLES_DATA (ecoles.js), partagée avec le reste du site.
(function () {
  "use strict";

  const data = window.ECOLES_DATA;
  const statusEl = document.getElementById("gen-status");
  const btn = document.getElementById("generate-btn");

  if (!data || !Array.isArray(data.ecoles) || data.ecoles.length === 0) {
    if (statusEl) statusEl.textContent = "Erreur : données des écoles (ecoles.js) introuvables.";
    if (btn) btn.disabled = true;
    return;
  }

  const ECOLES = data.ecoles;
  const TECHNIQUES = data.techniques || {};

  // --- Modèle de nations (15 nations du site) ---
  const THEAH_CONTINENTAL = ["Castille", "Eisen", "Montaigne", "Sarmatie", "Ussura", "Vesten", "Vodacce"];
  const GLAMOUR_REALMS = ["Avalon", "Inismore", "Marches des Highlands"];
  const THEAH_NATIONS = THEAH_CONTINENTAL.concat(GLAMOUR_REALMS); // 10 nations Théanes réelles (base des « voisins »)
  const CONTINENTAL_NATIONS = ["Ifri", "Cathay", "Empire du Croissant"];

  // Lieux proposés dans le menu (15 options, dont « Îles Glamour » = regroupement des 3 royaumes).
  const LOCATION_GROUPS = [
    { label: "Théah (Continent)", options: THEAH_CONTINENTAL },
    { label: "Théah — Îles Glamour", options: ["Avalon", "Inismore", "Marches des Highlands", "Îles Glamour"] },
    { label: "Hors-la-loi", options: ["Nations Pirates"] },
    { label: "Autres Continents", options: ["Ifri", "Cathay", "Empire du Croissant"] },
  ];
  const OPTION_LABELS = { "Îles Glamour": "Îles Glamour (les 3 royaumes)" };

  const ORIGINE_LABELS = {
    officielle: "Officielle",
    combat_reclassee: "Combat reclassée",
    seconde_edition_adaptee: "Seconde édition",
  };

  const VOIR_LE_STYLE_FALLBACK = "Au début de chaque combat, les duellistes peuvent tenter un jet de « Voir le style + Esprit », avec un certain nombre d’augmentations. S’ils réussissent leur jet, ils reconnaissent l’école de leur adversaire. Ils bénéficient alors de 2 points de défense passive supplémentaire par rang en « Voir le style », plus 2 par augmentation prise. Ce bonus de défense n’est valable que pour la défense passive.";
  const MISSING_TECH_DESC = "Description non disponible dans les données du Bréviaire.";

  // --- Index nation -> écoles (une école taguée N nations apparaît dans N listes) ---
  const schoolsByNation = {};
  for (const e of ECOLES) {
    for (const n of e.nations || []) {
      (schoolsByNation[n] = schoolsByNation[n] || []).push(e);
    }
  }

  // --- Helpers ---
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function normalizeTech(s) {
    return (s || "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  }

  // --- Construction du menu des lieux ---
  const select = document.getElementById("location-select");
  for (const grp of LOCATION_GROUPS) {
    const og = document.createElement("optgroup");
    og.label = grp.label;
    for (const val of grp.options) {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = OPTION_LABELS[val] || val;
      og.appendChild(opt);
    }
    select.appendChild(og);
  }

  function updateProbaText() {
    const loc = select.value;
    let txt;
    if (loc === "Nations Pirates") txt = "60 % Pirate · 30 % Théan · 10 % Exotique";
    else if (CONTINENTAL_NATIONS.includes(loc)) txt = "70 % Local · 30 % Visiteur";
    else txt = "60 % Local · 30 % Voisin (Théah) · 10 % Exotique";
    document.getElementById("proba-summary").innerHTML = "<strong>Probabilités :</strong> " + txt;
  }

  function updatePoolNote() {
    const loc = select.value;
    const localCount = (schoolsByNation[loc] || []).length;
    document.getElementById("gen-pool-note").textContent =
      localCount + " école(s) enseignée(s) à « " + loc + " » · " + ECOLES.length + " écoles au total dans le tirage.";
  }

  // --- Tirage de l'origine selon le lieu ---
  function rollOrigin(loc) {
    const roll = getRandomInt(1, 100);
    let group = "", type = "";

    if (loc === "Nations Pirates") {
      if (roll <= 60) { group = "Nations Pirates"; type = "Locale"; }
      else if (roll <= 90) { group = pick(THEAH_NATIONS); type = "Théan"; }
      else { group = pick(CONTINENTAL_NATIONS); type = "Exotique"; }
    } else if (CONTINENTAL_NATIONS.includes(loc)) {
      if (roll <= 70) { group = loc; type = "Locale"; }
      else { group = pick(THEAH_NATIONS.concat(CONTINENTAL_NATIONS).filter(n => n !== loc)); type = "Visiteur"; }
    } else { // Théah continental, royaume Glamour, ou « Îles Glamour »
      if (roll <= 60) { group = loc; type = "Locale"; }
      else if (roll <= 90) { group = pick(THEAH_NATIONS.filter(n => n !== loc)); type = "Théah (Voisin)"; }
      else { group = pick(CONTINENTAL_NATIONS); type = "Exotique"; }
    }
    return { group: group, type: type, roll: roll };
  }

  // --- Résolution d'une description de technique ---
  function resolveTechDesc(t) {
    const key = (t.ref && t.ref.trim()) ? t.ref.trim() : normalizeTech(t.nom_base);
    let entry = TECHNIQUES[key];
    if (!entry) entry = TECHNIQUES[normalizeTech(t.nom_base)]; // repli si ref vide ou inconnue
    if (entry && entry.description) return entry.description;
    if (normalizeTech(key) === "voir le style") return VOIR_LE_STYLE_FALLBACK;
    return null; // null => description manquante
  }

  // --- Avantage d'un niveau : règles enrichies en priorité, sinon avantage court ---
  function getNiveau(school, key) {
    const n = school.details && school.details.niveaux && school.details.niveaux[key];
    const regles = (n && n.regles) || (school.avantages_courts && school.avantages_courts[key]) || "";
    const fluff = (n && n.fluff) || "";
    return { regles: (regles || "").trim(), fluff: (fluff || "").trim() };
  }

  function getDescription(school) {
    if (school.description_courte && school.description_courte.trim()) return school.description_courte.trim();
    const dl = school.details && school.details.description_longue;
    if (Array.isArray(dl) && dl.length) return dl[0];
    return "—";
  }

  // --- Répartition des rangs de techniques par niveau de maîtrise ---
  // Les trois niveaux sont tirés indépendamment, chacun selon ses règles
  // (basées sur les prérequis 7ème Mer). « Voir le style » est comptée comme
  // une technique à part entière.
  function shuffleIndices(n) {
    const a = Array.from({ length: n }, (_, i) => i);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Apprenti : chaque technique 1–3, avec au moins une technique à 2 minimum.
  function genApprentiRanks(n) {
    const r = Array.from({ length: n }, () => getRandomInt(1, 3));
    if (n > 0 && Math.max.apply(null, r) < 2) r[Math.floor(Math.random() * n)] = 2;
    return r;
  }

  // Compagnon : 3 techniques à 3 minimum (1 fixée à 3, 2 tirées de 3 à 5) ;
  // les autres techniques de 1 à 4 ; sans jamais atteindre 4 techniques à 4+
  // (ce qui ferait un Maître).
  function genCompagnonRanks(n) {
    const r = new Array(n).fill(0);
    const idx = shuffleIndices(n);
    const nbPre = Math.min(3, n);
    const prereq = idx.slice(0, nbPre);
    const autres = idx.slice(nbPre);
    if (prereq.length) r[prereq[0]] = 3;                       // fixée à 3
    for (let k = 1; k < prereq.length; k++) r[prereq[k]] = getRandomInt(3, 5);
    const nbPrereqGe4 = prereq.slice(1).filter(i => r[i] >= 4).length;
    const maxAutresGe4 = Math.max(0, 3 - nbPrereqGe4);
    for (const i of autres) r[i] = getRandomInt(1, 4);
    let a4 = autres.filter(i => r[i] >= 4);
    while (a4.length > maxAutresGe4) {                          // évite 4 techniques à 4+
      const i = a4[Math.floor(Math.random() * a4.length)];
      r[i] = getRandomInt(1, 3);
      a4 = autres.filter(j => r[j] >= 4);
    }
    return r;
  }

  // Maître : 4 techniques à 4 minimum (4 ou 5 au hasard) ; la/les technique(s)
  // restante(s) tirée(s) de 3 à 5.
  function genMaitreRanks(n) {
    const r = new Array(n).fill(0);
    const idx = shuffleIndices(n);
    const k = Math.min(4, n);
    for (let i = 0; i < k; i++) r[idx[i]] = getRandomInt(4, 5);
    for (let i = k; i < n; i++) r[idx[i]] = getRandomInt(3, 5);
    return r;
  }

  // --- Techniques de l'école (en garantissant « Voir le style ») ---
  function buildTechniques(school) {
    const techs = (school.techniques_combat || []).slice();
    const hasVLS = techs.some(t =>
      (t.ref && normalizeTech(t.ref) === "voir le style") || normalizeTech(t.nom_base) === "voir le style"
    );
    if (!hasVLS) techs.unshift({ nom_base: "Voir le style", variante: null, ref: "voir le style" });

    const n = techs.length;
    const app = genApprentiRanks(n);
    const comp = genCompagnonRanks(n);
    const mait = genMaitreRanks(n);

    return techs.map((t, i) => {
      const label = t.nom_base + (t.variante ? " (" + t.variante + ")" : "");
      const desc = resolveTechDesc(t);
      return { name: label, desc: desc, ranks: { 1: app[i], 2: comp[i], 3: mait[i] } };
    });
  }

  // --- Badges (réutilise les classes du site) ---
  function badge(cls, text) {
    const s = document.createElement("span");
    s.className = cls;
    s.textContent = text;
    return s;
  }
  function buildBadges(school) {
    const c = document.getElementById("res-badges");
    c.innerHTML = "";
    for (const n of school.nations || []) c.appendChild(badge("badge nation", n));
    c.appendChild(badge("badge origine-" + school.origine, ORIGINE_LABELS[school.origine] || school.origine));
    if (school.restriction_creation === "interdite") c.appendChild(badge("badge restriction-interdite", "⛔ Interdite à la création"));
    else if (school.restriction_creation === "limitee") c.appendChild(badge("badge restriction-limitee", "⚠ Accès limité"));
    if (school.genre_restriction === "femmes") c.appendChild(badge("badge genre-femmes", "♀ Réservée aux femmes"));
    else if (school.genre_restriction === "hommes") c.appendChild(badge("badge genre-hommes", "♂ Réservée aux hommes"));
  }

  function setNiveauBox(which, niv) {
    const fluffEl = document.getElementById("fluff-" + which);
    fluffEl.textContent = niv.fluff || "";
    fluffEl.style.display = niv.fluff ? "block" : "none";
    document.getElementById("txt-" + which).textContent = niv.regles || "—";
  }

  // --- Affichage du résultat ---
  let currentDuelTechniques = [];

  function displayResult(school, origin, type, roll) {
    document.getElementById("res-name").textContent = school.nom;
    document.getElementById("res-origin").textContent = origin + " (" + type + ")";
    document.getElementById("res-weapon").textContent = school.arme_display || school.arme || "—";
    document.getElementById("res-specs").textContent = (school.specialisations || []).join(", ") || "—";
    document.getElementById("res-desc").textContent = getDescription(school);
    buildBadges(school);

    setNiveauBox("apprentice", getNiveau(school, "apprenti"));
    setNiveauBox("journeyman", getNiveau(school, "compagnon"));
    setNiveauBox("master", getNiveau(school, "maitre"));

    // Pré-remplit les compétences avec les spécialisations de l'école (dots à cocher à la main).
    const skillInputs = document.querySelectorAll(".stats-block:last-child .blank-input");
    skillInputs.forEach((inp, i) => { inp.value = (school.specialisations && school.specialisations[i]) || ""; });

    document.getElementById("res-roll").textContent = String(roll).padStart(2, "0");

    currentDuelTechniques = buildTechniques(school);

    const radios = document.getElementsByName("mastery-level");
    radios[0].checked = true;
    updateMasteryDisplay();

    const card = document.getElementById("result-card");
    card.style.display = "block";
    card.style.animation = "none";
    void card.offsetHeight; // force le reflow pour rejouer l'animation
    card.style.animation = "gen-slideUp 0.35s ease-out";
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateMasteryDisplay() {
    const radios = document.getElementsByName("mastery-level");
    let level = 1;
    for (const r of radios) if (r.checked) level = parseInt(r.value, 10);

    document.getElementById("adv-apprentice").style.display = "block";
    document.getElementById("adv-journeyman").style.display = level >= 2 ? "block" : "none";
    document.getElementById("adv-master").style.display = level >= 3 ? "block" : "none";

    const container = document.getElementById("tech-container");
    container.innerHTML = "";
    for (const item of currentDuelTechniques) {
      const dotsCount = item.ranks[level];

      const div = document.createElement("div");
      div.className = "tech-item";

      const header = document.createElement("div");
      header.className = "tech-header";
      const name = document.createElement("div");
      name.className = "tech-name";
      name.textContent = item.name;
      const dots = document.createElement("div");
      dots.className = "tech-dots";
      for (let i = 0; i < 5; i++) {
        const d = document.createElement("div");
        d.className = "dot" + (i < dotsCount ? " filled" : "");
        dots.appendChild(d);
      }
      header.appendChild(name);
      header.appendChild(dots);

      const desc = document.createElement("div");
      desc.className = "tech-desc" + (item.desc ? "" : " is-missing");
      desc.textContent = item.desc || MISSING_TECH_DESC;

      div.appendChild(header);
      div.appendChild(desc);
      container.appendChild(div);
    }
  }

  // --- Tirage ---
  function generate() {
    const loc = select.value;
    let origin = rollOrigin(loc);
    let attempts = 0;
    // Re-tire si la région obtenue n'a aucune école (évite un cul-de-sac).
    while ((schoolsByNation[origin.group] || []).length === 0 && attempts < 50) {
      origin = rollOrigin(loc);
      attempts++;
    }
    const pool = schoolsByNation[origin.group] || [];
    let school, displayOrigin = origin.group, displayType = origin.type;
    if (pool.length) {
      school = pick(pool);
    } else {
      // Repli ultime : une école au hasard dans tout le jeu de données.
      school = pick(ECOLES);
      displayOrigin = (school.nations && school.nations[0]) || "?";
      displayType = "Par défaut";
    }
    displayResult(school, displayOrigin, displayType, origin.roll);
  }

  // --- Événements ---
  select.addEventListener("change", () => { updateProbaText(); updatePoolNote(); });
  btn.addEventListener("click", generate);
  for (const r of document.getElementsByName("mastery-level")) r.addEventListener("change", updateMasteryDisplay);

  // --- Init ---
  updateProbaText();
  updatePoolNote();
})();
