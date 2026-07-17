// Résolution de voyage commercial — implémente le « Système de commerce
// maritime » (spécification de Guillaume). Formule validée sur les 7 cas de
// test de référence : brut = investi × marge (± événements), − redevance
// Ligue, − frais. Le site ne lance pas les dés : le MJ saisit les scores.
(function () {
  "use strict";

  var NAVIRES = [
    { id: "seconde-chance", nom: "La Seconde Chance", type: "Schooner", caleUtile: 80, caches: 20,
      coutMensuel: 500, coutDelegue: 600, redevance: 0, contrebande: true },
    { id: "diligente", nom: "La Diligente", type: "Brigantin", caleUtile: 100, caches: 0,
      coutMensuel: 500, coutDelegue: 500, redevance: 0.20, contrebande: false },
    { id: "providence", nom: "The Providence", type: "Brick", caleUtile: 180, caches: 0,
      coutMensuel: 800, coutDelegue: 800, redevance: 0, contrebande: false }
  ];

  var ROUTES = [
    { id: "cabotage", nom: "Cabotage (A/R < 4 semaines)", min: 1, max: 1, marge: 0.10, jets: 1 },
    { id: "continental", nom: "Trajet continental (Théah)", min: 2, max: 4, marge: 0.50, jets: 1 },
    { id: "intercontinental", nom: "Intercontinental (Ifri, Croissant)", min: 4, max: 6, marge: 1.00, jets: 1 },
    { id: "tres-long", nom: "Très long trajet (Cathay, Nouveau Monde)", min: 8, max: 12, marge: 2.00, jets: 2 }
  ];

  // Table des événements. delta/mult/cout = effets automatiques ;
  // gainD/coutD = formules de dés à lancer à la main ; special prime sur tout.
  var EVENTS = [
    { max: 6, nom: "Prise pirate", special: "prise", note: "Navire ET cargaison perdus — à jouer en scène si les PJ sont à bord." },
    { min: 7, max: 7, nom: "Tempête majeure", cout: 500, note: "2 dégâts graves (500 G comptés), retard important, 1d6 tonneaux de rations perdus." },
    { min: 8, max: 8, nom: "Surplus local", delta: -8 },
    { min: 9, max: 9, nom: "Assaut pirate", special: "assaut", coutD: "réparations 1d6 × 250 G", note: "Cargaison perdue." },
    { min: 10, max: 10, nom: "Tempête", cout: 250, note: "1 dégât grave (250 G compté), retard." },
    { min: 11, max: 11, nom: "Forte concurrence", delta: -5 },
    { min: 12, max: 12, nom: "Fret ou passager d'opportunité", gainD: "1d10 × 20 G" },
    { min: 13, max: 13, nom: "Contrôle douanier tatillon", note: "Droits doublés ; la part illicite HORS caches est saisie (les caches non découvertes sont épargnées)." },
    { min: 14, max: 14, nom: "Épidémie à bord", cout: 100, note: "Retard d'une semaine, quarantaine possible." },
    { min: 15, max: 15, nom: "Marché saturé", mult: 0.5 },
    { min: 16, max: 16, nom: "Voyage sans histoire" },
    { min: 17, max: 17, nom: "Avarie mineure", cout: 50 },
    { min: 18, max: 18, nom: "Bonne affaire", delta: 5 },
    { min: 19, max: 19, nom: "Désertion", coutD: "1d6 matelots × 5 G de prime", note: "1d6 matelots perdus." },
    { min: 20, max: 20, nom: "Contrôle douanier allégé", note: "Marge +1d6 points — lance et saisis le résultat dans l'ajustement." },
    { min: 21, max: 22, nom: "Petite concurrence", delta: -2 },
    { min: 23, max: 23, nom: "Grogne de l'équipage", coutD: "prime = moitié des soldes du voyage", note: "…sinon 1d6 matelots perdus." },
    { min: 24, max: 25, nom: "Voyage sans histoire" },
    { min: 26, max: 26, nom: "Rencontre en mer", note: "Rumeur utile (narratif)." },
    { min: 27, max: 27, nom: "Assaut pirate", special: "assaut", coutD: "réparations 1d6 × 250 G", note: "Cargaison perdue." },
    { min: 28, max: 28, nom: "Très bonne affaire", delta: 10 },
    { min: 29, max: 29, nom: "Épave ou cargaison flottante", gainD: "1d10 × 30 G" },
    { min: 30, max: 31, nom: "Pénurie locale", mult: 1.5 },
    { min: 32, max: 33, nom: "Vents favorables", delta: 2, note: "Une semaine gagnée, rations économisées." },
    { min: 34, max: 35, nom: "Sauvetage en mer", gainD: "1d10 × 10 G", note: "…ou un contact durable." },
    { min: 36, max: 38, nom: "Information précieuse", note: "Prochain voyage : marge +10 points (à noter)." },
    { min: 39, max: 41, nom: "Vermine dans la cale", coutD: "1d6 tonneaux de rations × 10 G", note: "" },
    { min: 42, max: 44, nom: "Grande pénurie locale", mult: 2.5 },
    { min: 45, max: 47, nom: "Commande exclusive", note: "Prochain voyage : marge × 1,5 (à noter)." },
    { min: 48, max: 49, nom: "Faveur d'un armateur", note: "Un puissant doit une faveur au navire (narratif)." },
    { min: 50, nom: "Coup de maître", mult: 2, note: "Contact commercial durable." }
  ];
  // Substitutions en cabotage (grande piraterie improbable près des côtes).
  var SUBS_CABOTAGE = {
    "prise": { nom: "Échouage", cout: 500, coutD: "1d6 tonneaux jetés × 75 G", note: "2 dégâts graves (500 G comptés)." },
    "assaut": { nom: "Racket côtier", coutD: "1d10 × 10 G", note: "…ou 1 dégât grave de représailles (250 G)." }
  };

  function navire() { return NAVIRES[+el("v-navire").value]; }
  function route() { return ROUTES[+el("v-route").value]; }
  function el(id) { return document.getElementById(id); }
  function num(id) { return +el(id).value || 0; }
  function fmt(n) { return Math.round(n).toLocaleString("fr-FR") + " G"; }

  function eventFor(score) {
    var e = null;
    for (var i = 0; i < EVENTS.length; i++) {
      var r = EVENTS[i];
      if ((r.min == null || score >= r.min) && (r.max == null || score <= r.max)) { e = r; break; }
    }
    if (!e) return null;
    if (route().id === "cabotage" && e.special && SUBS_CABOTAGE[e.special]) {
      var s = SUBS_CABOTAGE[e.special];
      return { nom: s.nom, cout: s.cout || 0, coutD: s.coutD, note: s.note || "", delta: 0, mult: 1 };
    }
    return e;
  }

  // --- Remplissage des sélecteurs + plafonds/seuil ---
  function initSelects() {
    NAVIRES.forEach(function (n, i) {
      var o = document.createElement("option");
      o.value = i; o.textContent = n.nom + " (" + n.type + ")";
      el("v-navire").appendChild(o);
    });
    ROUTES.forEach(function (r, i) {
      var o = document.createElement("option");
      o.value = i; o.textContent = r.nom + " — marge " + Math.round(r.marge * 100) + " %";
      if (r.id === "continental") o.selected = true;
      el("v-route").appendChild(o);
    });
  }

  function refresh() {
    var n = navire(), r = route(), taux = num("v-taux");
    var plafInv = n.caleUtile * taux;
    var plafCaches = n.caches * taux * 2;
    el("v-inv-hint").textContent = "(plafond " + fmt(plafInv) + ")";
    el("v-caches-hint").textContent = n.contrebande
      ? "(plafond " + fmt(plafCaches) + ", marge doublée)" : "(pas de caches)";
    el("v-caches").disabled = !n.contrebande;
    if (!n.contrebande) el("v-caches").value = 0;
    el("v-duree-hint").textContent = "(" + r.min + (r.max > r.min ? " à " + r.max : "") + " mois)";
    var d = Math.min(Math.max(num("v-duree"), r.min), r.max);
    el("v-duree").value = d;
    el("v-score2-wrap").style.display = r.jets === 2 ? "" : "none";

    var cout = el("v-delegue").checked ? n.coutDelegue : n.coutMensuel;
    var frais = cout * d;
    var seuil = frais / (r.marge * (1 - n.redevance));
    var inv = num("v-inv");
    var warn = inv > 0 && inv + num("v-caches") * 2 < seuil;  // caches comptent double (marge ×2)
    el("v-seuil").innerHTML =
      "Frais du voyage : <strong>" + fmt(frais) + "</strong> · Seuil de rentabilité (cale seule) : <strong>" + fmt(seuil) + "</strong>" +
      (inv > 0 && inv < seuil && !num("v-caches")
        ? "<div class='voy-warn'>⚠ Investissement sous le seuil : voyage perdant même sans événement.</div>" : "");
    if (inv > plafInv) el("v-inv").value = plafInv;
    if (num("v-caches") > plafCaches) el("v-caches").value = plafCaches;
  }

  // --- Événements : affichage + pré-remplissage des ajustements ---
  function refreshEvents() {
    var scores = [num("v-score1")];
    if (route().jets === 2) scores.push(num("v-score2"));
    var box = el("v-events");
    box.innerHTML = "";
    var delta = 0, mult = 1, couts = 0, special = null;

    scores.forEach(function (s, idx) {
      if (!s) return;
      var e = eventFor(s);
      if (!e) return;
      if (e.special === "prise") special = "prise";
      else if (e.special === "assaut" && special !== "prise") special = "assaut";
      delta += e.delta || 0;
      mult *= (e.mult == null ? 1 : e.mult);
      couts += e.cout || 0;
      var bits = [];
      if (e.delta) bits.push("marge " + (e.delta > 0 ? "+" : "") + e.delta + " pts");
      if (e.mult != null && e.mult !== 1) bits.push("marge × " + e.mult);
      if (e.cout) bits.push("coût " + fmt(e.cout));
      if (e.gainD) bits.push("à lancer : gain " + e.gainD);
      if (e.coutD) bits.push("à lancer : " + e.coutD);
      var cls = e.special ? " voy-ev-special" : "";
      box.innerHTML += "<div class='voy-ev" + cls + "'><strong>" + (scores.length > 1 ? "Jet " + (idx + 1) + " — " : "") +
        e.nom + "</strong>" + (bits.length ? " · " + bits.join(" · ") : "") +
        (e.note ? "<div class='voy-ev-note'>" + e.note + "</div>" : "") + "</div>";
    });

    el("v-delta").value = delta;
    el("v-mult").value = mult;
    el("v-couts").value = couts;
    el("v-gains").value = 0;
    box.dataset.special = special || "";
  }

  // --- Résolution (formule validée sur les cas de test) ---
  function resoudre() {
    var n = navire(), r = route();
    var d = num("v-duree");
    var frais = (el("v-delegue").checked ? n.coutDelegue : n.coutMensuel) * d;
    var inv = num("v-inv"), caches = num("v-caches");
    var delta = num("v-delta"), mult = +el("v-mult").value || 1;
    var gains = num("v-gains"), couts = num("v-couts");
    var special = el("v-events").dataset.special;
    var out;

    if (special === "prise") {
      out = "<div class='voy-result voy-neg'><h3>☠ Prise pirate</h3>" +
        "<p>Le navire et sa cargaison sont perdus — la suite se joue en scène. " +
        "Pertes matérielles : navire + " + fmt(inv + caches) + " de cargaison + " + fmt(frais) + " de frais engagés.</p></div>";
    } else if (special === "assaut") {
      var net0 = -(inv + caches) - frais - couts;
      out = "<div class='voy-result voy-neg'><h3>⚔ Assaut pirate — cargaison perdue</h3>" +
        "<table class='voy-lines'>" +
        "<tr><td>Cargaison perdue</td><td>−" + fmt(inv + caches) + "</td></tr>" +
        "<tr><td>Frais du voyage</td><td>−" + fmt(frais) + "</td></tr>" +
        "<tr><td>Réparations / coûts</td><td>−" + fmt(couts) + "</td></tr>" +
        "<tr class='voy-net'><td>NET</td><td>" + fmt(net0) + "</td></tr></table>" +
        "<p class='voy-ev-note'>Pas de redevance à la Ligue : rien n'a été vendu.</p></div>";
    } else {
      var mL = Math.max(0, r.marge + delta / 100) * mult;
      var mC = Math.max(0, r.marge * 2 + delta / 100) * mult;
      var brut = inv * mL + caches * mC + gains;
      var ligue = n.redevance * Math.max(0, brut);
      var net = brut - ligue - frais - couts;
      out = "<div class='voy-result " + (net >= 0 ? "voy-pos" : "voy-neg") + "'>" +
        "<h3>" + (net >= 0 ? "✔" : "✘") + " Résultat du voyage</h3>" +
        "<table class='voy-lines'>" +
        "<tr><td>Marge légale effective</td><td>" + Math.round(mL * 100) + " %</td></tr>" +
        (caches ? "<tr><td>Marge caches effective</td><td>" + Math.round(mC * 100) + " %</td></tr>" : "") +
        "<tr><td>Bénéfice brut" + (gains ? " (gains fixes compris)" : "") + "</td><td>" + fmt(brut) + "</td></tr>" +
        (n.redevance ? "<tr><td>Redevance Ligue (20 %)</td><td>−" + fmt(ligue) + "</td></tr>" : "") +
        "<tr><td>Frais du voyage</td><td>−" + fmt(frais) + "</td></tr>" +
        (couts ? "<tr><td>Coûts d'événement</td><td>−" + fmt(couts) + "</td></tr>" : "") +
        "<tr class='voy-net'><td>NET</td><td>" + (net >= 0 ? "+" : "") + fmt(net) + "</td></tr></table></div>";
    }
    el("v-result").innerHTML = out;
    el("v-result").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function init() {
    initSelects();
    ["v-navire", "v-route", "v-taux", "v-duree", "v-delegue", "v-inv", "v-caches"].forEach(function (id) {
      el(id).addEventListener("change", function () { refresh(); refreshEvents(); });
      el(id).addEventListener("input", refresh);
    });
    ["v-score1", "v-score2"].forEach(function (id) {
      el(id).addEventListener("input", refreshEvents);
    });
    el("v-resoudre").addEventListener("click", resoudre);
    refresh();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
