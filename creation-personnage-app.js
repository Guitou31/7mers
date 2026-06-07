(function () {
  "use strict";
  const data = window.CREATION_PERSO_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem;color:#8b3a3a'>Erreur : creation_perso.js introuvable.</p>";
    return;
  }

  // ===== State + persistance localStorage =====
  const STORAGE_KEY = "creation_perso_state_v1";
  const PP_BUDGET = 60;

  const defaultState = {
    // Étape 1
    nation: null,
    trait_bonus_nation: null,
    trait_libre: null,
    // Étape 2
    arcane: null,
    // Étape 3
    age_plage: null,
    sorcellerie: null,
    // Nouvelle shape : listes avec noms (alimentées depuis les pages externes)
    ecoles_choisies: [],          // [{nom, type, hors_nation}]
    metiers_choisis: [],          // [{nom}]
    entrainements_choisis: [],    // [{nom}]
    langues_choisies: [],         // [{nom}]
    societe_secrete: null,        // null | {nom}
    // Saisies manuelles libres
    pp_avantages: 0,
    pp_competences: 0,
    // Fallback ancienne shape (compteurs)
    nb_ecoles_spadassin: 0,
    nb_ecoles_autres: 0,
    nb_ecoles_hors_nation: 0,
    nb_metiers_entrainements: 0,
    nb_langues_extra: 0,
    has_societe_secrete: false,
  };

  const state = Object.assign({}, defaultState);

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      if (obj && typeof obj === "object") {
        Object.keys(defaultState).forEach(k => {
          if (k in obj) state[k] = obj[k];
        });
      }
    } catch (e) {
      console.warn("loadState : impossible de lire le state", e);
    }
  }
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* quota plein, navigation privée… on ignore */ }
  }
  function resetState() {
    if (!confirm("Réinitialiser tous les choix de création ?")) return;
    Object.keys(state).forEach(k => state[k] = defaultState[k]);
    // Utilise CreationState.reset() pour nettoyer le storage ET notifier les
    // autres composants (notamment la barre PP globale, qui doit disparaître).
    if (window.CreationState && window.CreationState.reset) {
      window.CreationState.reset();
    } else {
      saveState();
    }
    location.reload();
  }
  loadState();
  // Marque la création comme 'démarrée' : à partir de maintenant, la barre
  // PP globale s'affichera sur toutes les pages tant qu'on n'a pas reset.
  if (window.CreationState && window.CreationState.markStarted) {
    window.CreationState.markStarted();
  }

  // Calcul du total PP dépensés.
  // Priorité aux listes (noms persistés) ; fallback compteurs si liste vide.
  function calculerPP() {
    let total = 0;
    // Sorcellerie
    if (state.sorcellerie === "demi-sang") total += 15;
    if (state.sorcellerie === "sang-pur")  total += 25;
    if (state.sorcellerie === "sang-mele") total += 35;
    // Écoles : depuis la liste si présente, sinon compteurs
    if (state.ecoles_choisies && state.ecoles_choisies.length) {
      state.ecoles_choisies.forEach(e => {
        let cout = e.type === "Spadassin" ? 20 : 15;
        if (e.hors_nation) cout += 5;
        total += cout;
      });
    } else {
      total += (state.nb_ecoles_spadassin || 0) * 20;
      total += (state.nb_ecoles_autres || 0) * 15;
      total += (state.nb_ecoles_hors_nation || 0) * 5;
    }
    // Métiers + Entraînements : sommes des deux listes OU compteur fallback
    const nbMet = (state.metiers_choisis || []).length;
    const nbEnt = (state.entrainements_choisis || []).length;
    if (nbMet || nbEnt) {
      total += (nbMet + nbEnt) * 3;
    } else {
      total += (state.nb_metiers_entrainements || 0) * 3;
    }
    // Langues
    if (state.langues_choisies && state.langues_choisies.length) {
      total += state.langues_choisies.length;
    } else {
      total += (state.nb_langues_extra || 0);
    }
    // Société Secrète
    if (state.societe_secrete || state.has_societe_secrete) total += 5;
    // Avantages + Compétences (saisie manuelle)
    total += (parseInt(state.pp_avantages, 10) || 0);
    total += (parseInt(state.pp_competences, 10) || 0);
    return total;
  }

  function refreshPPBar() {
    const bar = document.getElementById("pp-bar");
    if (!bar) return;
    // On préfère le calcul du module global (inclut les compétences chiffrées
    // via les sélecteurs de rang et les avantages choisis) ; fallback sur le
    // calcul local si le module n'est pas chargé.
    const total = (window.CreationState && window.CreationState.calculerPP)
      ? window.CreationState.calculerPP(state)
      : calculerPP();
    const restant = PP_BUDGET - total;
    bar.classList.toggle("is-overspent", restant < 0);
    bar.classList.toggle("is-exact", restant === 0);
    bar.classList.toggle("is-leftover", restant > 0);
    const valDepenses = document.getElementById("pp-bar-depenses");
    const valRestant = document.getElementById("pp-bar-restant");
    const valBudget = document.getElementById("pp-bar-budget");
    if (valDepenses) valDepenses.textContent = total;
    if (valRestant) valRestant.textContent = (restant >= 0 ? "+" : "") + restant;
    if (valBudget) valBudget.textContent = PP_BUDGET;
  }

  // Met à jour state[clé] + sauve + rafraîchit le compteur PP + refresh ciblé.
  function setState(cle, valeur, refreshFns) {
    state[cle] = valeur;
    saveState();
    refreshPPBar();
    if (refreshFns) refreshFns.forEach(fn => fn());
  }
  // Base 2 dans chaque Trait (règle de jeu)
  const TRAIT_BASE = 2;

  // ===== Helpers =====
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k.startsWith("on") && typeof attrs[k] === "function") e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] === true) e.setAttribute(k, "");
      else if (attrs[k] != null && attrs[k] !== false) e.setAttribute(k, attrs[k]);
    }
    if (children != null) {
      if (!Array.isArray(children)) children = [children];
      for (const c of children) { if (c == null) continue; e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); }
    }
    return e;
  }

  // ===== Stepper =====
  function activerStep(n) {
    document.querySelectorAll(".creation-step").forEach(b => {
      b.classList.toggle("is-active", b.dataset.step === String(n));
    });
    document.querySelectorAll(".creation-step-content").forEach(s => {
      s.hidden = (s.dataset.stepContent !== String(n));
    });
  }
  document.querySelectorAll(".creation-step").forEach(b => {
    b.addEventListener("click", () => activerStep(b.dataset.step));
  });

  // ===== Étape 0 : Intro =====
  function renderIntro() {
    const container = document.getElementById("step-0-intro");
    if (!container) return;
    const paragraphs = (data.intro || "").split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    paragraphs.forEach(p => container.appendChild(el("p", { class: "creation-paragraph" }, p)));
  }

  // ===== Étape 1 : intro (paragraphes + sauts de ligne simples) =====
  // Convention : '\n\n' = nouveau paragraphe, '\n' simple = <br> dans paragraphe.
  function renderEtape1Intro() {
    const container = document.getElementById("step-1-intro");
    if (!container) return;
    const text = data.etape_1_intro || "";
    const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    paragraphs.forEach(para => {
      const lines = para.split("\n").map(l => l.trim()).filter(Boolean);
      const p = el("p", { class: "creation-paragraph" });
      lines.forEach((line, i) => {
        if (i > 0) p.appendChild(el("br"));
        p.appendChild(document.createTextNode(line));
      });
      container.appendChild(p);
    });
  }

  // ===== Étape 1 : Traits + Nations =====
  // Sélecteur radio style 7ème Mer :
  //  - 2 cercles noirs : base 2
  //  - +1 cercle 'rouge accent' si le Trait reçoit le point libre
  //  - +1 cercle 'doré' si le Trait reçoit le bonus de Nation
  //  - Cliquer sur la ligne d'un Trait pose/déplace le +1 libre.
  function calcValeurTrait(traitNom) {
    let v = TRAIT_BASE;
    if (state.trait_libre === traitNom) v += 1;
    if (state.trait_bonus_nation === traitNom) v += 1;
    return v;
  }

  function renderTraitRow(traitNom) {
    const desc = (data.traits_descriptions && data.traits_descriptions[traitNom]) || "";
    const isLibre = state.trait_libre === traitNom;
    const isNation = state.trait_bonus_nation === traitNom;
    const valeur = calcValeurTrait(traitNom);
    // Génère 5 cercles ; le rang détermine la couleur :
    // - <= TRAIT_BASE : base (noir)
    // - rang du +1 libre : rouge
    // - rang du +1 nation : doré
    const cercles = el("div", { class: "trait-cercles" });
    let rangCourant = TRAIT_BASE;
    for (let rang = 1; rang <= 5; rang++) {
      let cls = "trait-cercle";
      if (rang <= TRAIT_BASE) {
        cls += " is-filled is-base";
      } else if (isLibre && rang === TRAIT_BASE + 1) {
        cls += " is-filled is-libre";
      } else if (isNation && rang === valeur) {
        cls += " is-filled is-nation";
      }
      cercles.appendChild(el("span", { class: cls }));
    }
    const valeurLabel = el("span", { class: "trait-valeur" }, String(valeur));
    return el("button", {
      class: "trait-row trait-row-button"
             + (isLibre ? " has-libre" : "")
             + (isNation ? " has-nation" : ""),
      type: "button",
      "aria-label": "Donner le point libre à " + traitNom,
      onclick: () => toggleTraitLibre(traitNom),
    }, [
      el("div", { class: "trait-label" }, [
        el("strong", null, traitNom),
        el("p", { class: "trait-desc" }, desc),
      ]),
      el("div", { class: "trait-droite" }, [cercles, valeurLabel]),
    ]);
  }

  function toggleTraitLibre(traitNom) {
    // Cliquer sur le trait déjà choisi : annule. Sinon : déplace.
    state.trait_libre = (state.trait_libre === traitNom) ? null : traitNom;
    saveState();
    renderTraits();
    renderStatsDerivees();
  }

  // ===== Étape 1.2 : statistiques dérivées (auto) =====
  function valeursTraits() {
    const v = {};
    (data.traits_ordre || []).forEach(t => { v[t] = calcValeurTrait(t); });
    return v;
  }

  // Calcule une stat selon sa formule. Retourne un nombre.
  function calculerStat(formule, traits) {
    switch (formule) {
      case "gaillardise_5":   return traits["Gaillardise"] * 5;
      case "determination":   return traits["Détermination"];
      case "determination_5": return traits["Détermination"] * 5;
      case "esprit":          return traits["Esprit"];
      case "panache":         return traits["Panache"];
      case "trait_min":       return Math.min(...Object.values(traits));
      default:                return "—";
    }
  }

  function renderStatsDerivees() {
    const container = document.getElementById("stats-derivees");
    if (!container) return;
    container.innerHTML = "";
    const traits = valeursTraits();
    (data.statistiques_derivees || []).forEach(stat => {
      const valeur = calculerStat(stat.formule, traits);
      container.appendChild(el("div", { class: "stat-row" }, [
        el("div", { class: "stat-label" }, [
          el("strong", null, stat.nom),
          el("span", { class: "stat-formule" }, stat.formule_label),
          el("p", { class: "stat-desc" }, stat.description),
        ]),
        el("div", { class: "stat-valeur" }, String(valeur)),
      ]));
    });
  }

  function renderTraits() {
    const grid = document.getElementById("traits-grid");
    if (!grid) return;
    grid.innerHTML = "";
    (data.traits_ordre || []).forEach(t => grid.appendChild(renderTraitRow(t)));
  }

  // ===== Tableau des Nations groupé par continent =====
  function renderNations() {
    const root = document.getElementById("nations-table");
    if (!root) return;
    root.innerHTML = "";
    const continents = data.continents_ordre || [];
    const meta = data.continents_meta || {};
    for (const continent of continents) {
      const nations = data.nations.filter(n => n.continent === continent);
      if (!nations.length) continue;
      const m = meta[continent] || {};
      // Titre enrichi : 'Theah (Europe)' / 'Trois Royaumes (Royaume-Uni — Theah)'
      const titreFrags = [continent];
      const meta_suffix = [];
      if (m.equivalent) meta_suffix.push(m.equivalent);
      if (m.parent) meta_suffix.push("appartient à " + m.parent);
      const colorKey = m.couleur || "default";
      const sousTitre = meta_suffix.length
        ? el("span", { class: "nations-continent-equiv" }, " — " + meta_suffix.join(" / "))
        : null;
      const section = el("div", { class: "nations-continent continent-" + colorKey }, [
        el("h5", { class: "nations-continent-titre" }, [
          el("span", { class: "nations-continent-pastille" }),
          continent,
          sousTitre,
        ]),
        el("table", { class: "nations-tbl" }, [
          el("thead", null, el("tr", null, [
            el("th", null, "Nation"),
            el("th", null, "Bonus de Trait (+1)"),
            el("th", null, "Équivalent terrestre"),
          ])),
          el("tbody", null, nations.map(n => {
            const isSelected = state.nation === n.nom;
            return el("tr", {
              class: "nation-row" + (isSelected ? " is-selected" : ""),
              tabindex: "0", role: "button",
              "aria-label": "Voir la description de " + n.nom,
              onclick: () => ouvrirNation(n.nom),
              onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ouvrirNation(n.nom); } },
            }, [
              el("td", { class: "nation-nom" }, n.nom),
              el("td", { class: "nation-bonus" }, n.bonus_traits.join(" ou ")),
              el("td", { class: "nation-equiv" }, n.equivalent_terrestre || "—"),
            ]);
          })),
        ]),
      ]);
      root.appendChild(section);
    }
  }

  // ===== Modal Nation (description + boutons Trait) =====
  function ouvrirNation(nationNom) {
    const nation = data.nations.find(n => n.nom === nationNom);
    if (!nation) return;
    afficherModalLocale(nation);
  }

  function afficherModalLocale(nation) {
    let dialog = document.getElementById("creation-modal");
    if (!dialog) {
      dialog = el("dialog", { id: "creation-modal", class: "ecole-detail cross-modal" }, [
        el("div", { class: "cross-modal-header" }, [
          el("button", {
            class: "ecole-detail-close",
            id: "creation-modal-close",
            "aria-label": "Fermer",
            type: "button",
            onclick: () => dialog.close(),
          }, "×"),
        ]),
        el("div", { id: "creation-modal-content" }),
      ]);
      document.body.appendChild(dialog);
      // Clic sur backdrop ferme
      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
      });
    }
    const content = document.getElementById("creation-modal-content");
    content.innerHTML = "";
    content.appendChild(el("div", { class: "detail-header" }, [
      el("h2", { id: "creation-modal-title" }, nation.nom),
      el("div", { class: "badges" }, [
        el("span", { class: "badge nation" }, nation.continent),
        nation.equivalent_terrestre
          ? el("span", { class: "badge" }, "≈ " + nation.equivalent_terrestre)
          : null,
      ]),
    ]));

    // Description : préserve les sous-titres (préfixe '### ' = h4 sous-section).
    if (nation.description) {
      const paras = nation.description.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
      const sec = el("div", { class: "detail-section" }, [el("h3", null, "Description")]);
      paras.forEach(p => {
        if (p.startsWith("### ")) {
          sec.appendChild(el("h4", { class: "nation-sous-titre" }, p.substring(4).trim()));
        } else {
          sec.appendChild(el("p", { class: "description-paragraph" }, p));
        }
      });
      content.appendChild(sec);
    } else {
      content.appendChild(el("div", { class: "detail-section" }, [
        el("h3", null, "Description"),
        el("p", { class: "avantage-vide" }, "Description à venir."),
      ]));
    }

    // Choix du Trait bonus
    const choixSection = el("div", { class: "detail-section" }, [
      el("h3", null, "Bonus de Trait — choisir 1 parmi 2"),
      el("p", { class: "creation-note" },
        "Cliquez sur un Trait pour le sélectionner. Il recevra +1 (Trait à 3 au lieu de 2)."),
    ]);
    const boutons = el("div", { class: "trait-bouton-row" });
    nation.bonus_traits.forEach(t => {
      const isCurrent = state.nation === nation.nom && state.trait_bonus_nation === t;
      boutons.appendChild(el("button", {
        class: "trait-bouton" + (isCurrent ? " is-selected" : ""),
        type: "button",
        onclick: () => selectionnerNationEtTrait(nation.nom, t, dialog),
      }, t));
    });
    choixSection.appendChild(boutons);
    content.appendChild(choixSection);

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function selectionnerNationEtTrait(nationNom, trait, dialog) {
    state.nation = nationNom;
    state.trait_bonus_nation = trait;
    saveState();
    renderTraits();
    renderNations();
    renderStatsDerivees();
    renderEtape3Langues();  // langue native dépend de la Nation
    if (dialog) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }

  // ===== Étape 2 : Main du Destin (Arcanes) =====
  const arcanesData = window.ARCANES_DATA || null;
  // Mapping numéro Arcane 7ème Mer → fichier image (numérotation tarot
  // français traditionnel : le Mat est n°22 dans le jeu, mais Arcane 0
  // en 7ème Mer ; certaines cartes sont à des numéros différents — par ex.
  // La Force est n°11 en tarot mais n°8 en 7ème Mer).
  const ARCANE_IMAGES = {
    0:  "images/arcanes/22-le-mat.jpg",
    1:  "images/arcanes/1-le-bateleur.jpg",
    2:  "images/arcanes/2-la-papesse.jpg",
    3:  "images/arcanes/3-l-imperatrice.jpg",
    4:  "images/arcanes/4-l-empereur.jpg",
    5:  "images/arcanes/5-le-pape.jpg",
    6:  "images/arcanes/6-l-amoureux.jpg",
    7:  "images/arcanes/7-le-chariot.jpg",
    8:  "images/arcanes/11-la-force.jpg",
    9:  "images/arcanes/9-l-hermite.jpg",
    10: "images/arcanes/10-la-roue-de-fortune.jpg",
    11: "images/arcanes/8-la-justice.jpg",
    12: "images/arcanes/12-le-pendu.jpg",
    13: "images/arcanes/13-l-arcane-sans-nom.jpg",
    14: "images/arcanes/14-la-temperance.jpg",
    15: "images/arcanes/15-le-diable.jpg",
    16: "images/arcanes/16-la-maison-dieu.jpg",
    17: "images/arcanes/17-l-etoile.jpg",
    18: "images/arcanes/18-la-lune.jpg",
    19: "images/arcanes/19-le-soleil.jpg",
    20: "images/arcanes/20-le-jugement.jpg",
    21: "images/arcanes/21-le-monde.jpg",
  };

  function renderEtape2Intro() {
    if (!arcanesData) return;
    const container = document.getElementById("step-2-intro");
    if (!container) return;
    const text = arcanesData.intro_etape_2 || "";
    const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    paragraphs.forEach(p => container.appendChild(el("p", { class: "creation-paragraph" }, p)));
  }

  function renderArcanes() {
    if (!arcanesData) return;
    const grid = document.getElementById("arcanes-grid");
    if (!grid) return;
    grid.innerHTML = "";
    (arcanesData.arcanes || []).forEach(a => {
      const isSelected = state.arcane === a.numero;
      const imgPath = ARCANE_IMAGES[a.numero];
      const children = [];
      if (imgPath) {
        children.push(el("img", {
          class: "arcane-img-mini",
          src: imgPath,
          alt: a.nom,
          loading: "lazy",
        }));
      }
      children.push(
        el("div", { class: "arcane-numero" }, String(a.numero)),
        el("div", { class: "arcane-nom" }, a.nom),
        el("div", { class: "arcane-paire" }, [
          el("span", { class: "arcane-vertu" }, a.vertu),
          el("span", { class: "arcane-sep" }, "·"),
          el("span", { class: "arcane-travers" }, a.travers),
        ]),
      );
      const carte = el("button", {
        class: "arcane-carte" + (isSelected ? " is-selected" : ""),
        type: "button",
        "aria-label": "Arcane " + a.numero + " — " + a.nom,
        onclick: () => selectionnerArcane(a.numero),
      }, children);
      grid.appendChild(carte);
    });
  }

  function tirageAleatoire() {
    if (!arcanesData || !arcanesData.arcanes || !arcanesData.arcanes.length) return;
    // Tire un arcane différent de l'actuel si possible
    const n = arcanesData.arcanes.length;
    let candidat;
    do {
      candidat = Math.floor(Math.random() * n);
    } while (state.arcane === candidat && n > 1);
    state.arcane = candidat;
    saveState();
    renderArcanes();
    renderArcaneSelection();
    // Scroll vers le détail pour rendre visible le résultat
    const bloc = document.getElementById("arcane-selection-bloc");
    if (bloc) setTimeout(() => bloc.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  function selectionnerArcane(numero) {
    state.arcane = (state.arcane === numero) ? null : numero;
    saveState();
    renderArcanes();
    renderArcaneSelection();
  }

  function renderArcaneSelection() {
    if (!arcanesData) return;
    const bloc = document.getElementById("arcane-selection-bloc");
    const container = document.getElementById("arcane-selection");
    if (!bloc || !container) return;
    if (state.arcane == null) {
      bloc.hidden = true;
      return;
    }
    bloc.hidden = false;
    container.innerHTML = "";
    const a = arcanesData.arcanes.find(x => x.numero === state.arcane);
    if (!a) return;
    const vertu = arcanesData.vertus.find(v => v.nom === a.vertu);
    const travers = arcanesData.travers.find(t => t.nom === a.travers);

    const imgPath = ARCANE_IMAGES[a.numero];
    const headerChildren = [
      el("div", { class: "arcane-tirage-numero" }, String(a.numero)),
      el("div", { class: "arcane-tirage-titre" }, [
        el("h5", null, a.nom),
        el("p", { class: "creation-note" }, "Arcane tiré"),
      ]),
    ];
    if (imgPath) {
      headerChildren.push(el("img", {
        class: "arcane-img-grande",
        src: imgPath,
        alt: a.nom,
      }));
    }
    container.appendChild(el("div", { class: "arcane-tirage-header" }, headerChildren));

    // Vertu
    container.appendChild(el("div", { class: "arcane-pair-bloc arcane-vertu-bloc" }, [
      el("h6", null, [
        el("span", { class: "legende-vertu" }, "Vertu"),
        " : ",
        el("strong", null, a.vertu),
      ]),
      vertu ? el("p", { class: "arcane-resume" }, vertu.resume) : null,
      vertu ? el("p", { class: "arcane-activation" }, [
        el("em", null, vertu.activation),
      ]) : null,
    ]));

    // Travers
    container.appendChild(el("div", { class: "arcane-pair-bloc arcane-travers-bloc" }, [
      el("h6", null, [
        el("span", { class: "legende-travers" }, "Travers"),
        " : ",
        el("strong", null, a.travers),
      ]),
      travers ? el("p", { class: "arcane-resume" }, travers.resume) : null,
      travers ? el("p", { class: "arcane-activation" }, [
        el("em", null, travers.activation),
      ]) : null,
    ]));
  }

  // ===== Étape 3 : PP & Spécificités =====
  function renderEtape3Intro() {
    const e3 = data.etape_3;
    if (!e3) return;
    const container = document.getElementById("step-3-intro");
    if (!container) return;
    container.innerHTML = "";
    container.appendChild(el("p", { class: "creation-paragraph" }, e3.intro));
    container.appendChild(el("p", { class: "creation-paragraph budget-pp" }, [
      "Budget de base : ",
      el("strong", null, String(e3.pp_base) + " PP"),
      " à dépenser intégralement (hors bonus d'âge).",
    ]));
  }

  function renderEtape3Ages() {
    const e3 = data.etape_3;
    if (!e3 || !e3.ages) return;
    const container = document.getElementById("step-3-ages");
    if (!container) return;
    container.innerHTML = "";
    e3.ages.forEach(age => {
      const isSel = state.age_plage === age.plage;
      container.appendChild(el("button", {
        class: "age-card age-btn" + (isSel ? " is-selected" : ""),
        type: "button",
        onclick: () => {
          state.age_plage = isSel ? null : age.plage;
          saveState();
          renderEtape3Ages();
          refreshPPBar();
        },
      }, [
        el("div", { class: "age-plage" }, age.plage),
        el("div", { class: "age-label" }, age.label),
        el("p", { class: "age-bonus" }, age.bonus),
      ]));
    });
  }

  // Helper : counter -/+ pour incrémenter/décrémenter un nombre.
  function counterControl(stateKey, min, max) {
    const cur = state[stateKey] || 0;
    const dec = el("button", {
      class: "counter-btn",
      type: "button",
      disabled: cur <= min,
      onclick: () => {
        if (state[stateKey] > min) {
          state[stateKey] = state[stateKey] - 1;
          saveState();
          renderEtape3Specificites();
          refreshPPBar();
        }
      },
    }, "−");
    const inc = el("button", {
      class: "counter-btn",
      type: "button",
      disabled: max != null && cur >= max,
      onclick: () => {
        if (max == null || state[stateKey] < max) {
          state[stateKey] = state[stateKey] + 1;
          saveState();
          renderEtape3Specificites();
          refreshPPBar();
        }
      },
    }, "+");
    return el("div", { class: "counter-wrap" }, [
      dec,
      el("span", { class: "counter-value" }, String(cur)),
      inc,
    ]);
  }

  function renderEtape3Specificites() {
    const e3 = data.etape_3;
    if (!e3 || !e3.specificites) return;
    const container = document.getElementById("step-3-specificites");
    if (!container) return;
    container.innerHTML = "";

    // Rappels en haut
    if (e3.rappel_max_creation) {
      container.appendChild(el("p", { class: "creation-note rappel" }, [
        el("strong", null, "Rappel : "),
        e3.rappel_max_creation,
      ]));
    }
    if (e3.rappel_ecoles_specs) {
      container.appendChild(el("p", { class: "creation-note rappel" }, [
        el("strong", null, "Bonus écoles : "),
        e3.rappel_ecoles_specs,
      ]));
    }

    const grid = el("div", { class: "specs-cards-grid" });
    e3.specificites.forEach(spec => {
      const card = el("div", { class: "spec-card" + (spec.a_venir ? " is-a-venir" : "") });
      // En-tête
      card.appendChild(el("div", { class: "spec-card-head" }, [
        el("h5", null, spec.nom),
        spec.a_venir ? el("span", { class: "spec-badge-avenir" }, "À venir") : null,
      ]));
      // Résumé
      if (spec.resume) {
        card.appendChild(el("p", { class: "spec-resume" }, spec.resume));
      }

      // Sélecteurs interactifs spécifiques selon spec.id
      if (spec.id === "sorcellerie") {
        const optsRow = el("div", { class: "spec-sorcel-row" });
        const aucune = el("button", {
          class: "spec-sorcel-btn" + (state.sorcellerie == null ? " is-selected" : ""),
          type: "button",
          onclick: () => { state.sorcellerie = null; saveState(); renderEtape3Specificites(); refreshPPBar(); },
        }, "Aucune (0 PP)");
        optsRow.appendChild(aucune);
        const mapSorc = {"Demi-Sang": "demi-sang", "Sang-Pur": "sang-pur", "Sang-Mêlé": "sang-mele"};
        spec.variantes.forEach(v => {
          const label = v.label.split(" (")[0];
          const key = mapSorc[label];
          if (!key) return;
          const sel = state.sorcellerie === key;
          optsRow.appendChild(el("button", {
            class: "spec-sorcel-btn" + (sel ? " is-selected" : ""),
            type: "button",
            onclick: () => { state.sorcellerie = sel ? null : key; saveState(); renderEtape3Specificites(); refreshPPBar(); },
          }, label + " (" + v.pp + " PP)"));
        });
        card.appendChild(optsRow);

      } else if (spec.id === "ecoles") {
        // Liste des écoles ajoutées depuis les pages dédiées (clic dans le modal)
        const ecoles = state.ecoles_choisies || [];
        if (ecoles.length === 0) {
          card.appendChild(el("p", { class: "spec-empty-list" },
            "Aucune école choisie. Cliquez sur le bouton 'Ajouter' depuis une fiche école."));
          // Fallback : compteurs anciens si présents
          if ((state.nb_ecoles_spadassin || 0) + (state.nb_ecoles_autres || 0) > 0) {
            card.appendChild(el("p", { class: "spec-max" }, "(Compteurs historiques en cours : utilisez plutôt les boutons des fiches.)"));
            card.appendChild(el("div", { class: "spec-interactif" }, [
              el("label", { class: "spec-mini-label" }, "Spadassin (20 PP) :"),
              counterControl("nb_ecoles_spadassin", 0, 2),
            ]));
            card.appendChild(el("div", { class: "spec-interactif" }, [
              el("label", { class: "spec-mini-label" }, "Autres (15 PP) :"),
              counterControl("nb_ecoles_autres", 0, 2),
            ]));
            card.appendChild(el("div", { class: "spec-interactif" }, [
              el("label", { class: "spec-mini-label" }, "Hors Nation (+5 PP) :"),
              counterControl("nb_ecoles_hors_nation", 0, 2),
            ]));
          }
        } else {
          const ul = el("ul", { class: "spec-chosen-list" });
          ecoles.forEach((e, i) => {
            const cout = (e.type === "Spadassin" ? 20 : 15) + (e.hors_nation ? 5 : 0);
            ul.appendChild(el("li", null, [
              el("span", { class: "chosen-item-name" }, e.nom),
              el("span", { class: "chosen-item-meta" }, [
                el("span", { class: "chosen-tag" }, e.type),
                e.hors_nation ? el("span", { class: "chosen-tag chosen-tag-warn" }, "hors-Nation") : null,
                el("span", { class: "chosen-pp" }, cout + " PP"),
              ]),
              el("button", {
                class: "chosen-remove",
                type: "button",
                "aria-label": "Retirer",
                onclick: () => {
                  state.ecoles_choisies.splice(i, 1);
                  saveState();
                  renderEtape3Specificites();
                  refreshPPBar();
                },
              }, "×"),
            ]));
          });
          card.appendChild(ul);
        }
        card.appendChild(el("p", { class: "spec-max" }, [
          "⚠ Max ", el("strong", null, "2 écoles"), " à la création.",
        ]));

      } else if (spec.id === "metiers_entrainements") {
        const metiers = state.metiers_choisis || [];
        const ents = state.entrainements_choisis || [];
        if (metiers.length === 0 && ents.length === 0) {
          card.appendChild(el("p", { class: "spec-empty-list" },
            "Aucun Métier / Entraînement choisi. Cliquez sur 'Ajouter' depuis une fiche."));
          if ((state.nb_metiers_entrainements || 0) > 0) {
            card.appendChild(el("p", { class: "spec-max" }, "(Compteur historique en cours.)"));
            card.appendChild(el("div", { class: "spec-interactif" }, [
              el("label", { class: "spec-mini-label" }, "Nombre (3 PP) :"),
              counterControl("nb_metiers_entrainements", 0, 3),
            ]));
          }
        } else {
          const ul = el("ul", { class: "spec-chosen-list" });
          metiers.forEach((m, i) => {
            ul.appendChild(el("li", null, [
              el("span", { class: "chosen-item-name" }, m.nom),
              el("span", { class: "chosen-item-meta" }, [
                el("span", { class: "chosen-tag" }, "Métier"),
                el("span", { class: "chosen-pp" }, "3 PP"),
              ]),
              el("button", {
                class: "chosen-remove",
                type: "button",
                "aria-label": "Retirer",
                onclick: () => {
                  state.metiers_choisis.splice(i, 1);
                  saveState();
                  renderEtape3Specificites();
                  refreshPPBar();
                },
              }, "×"),
            ]));
          });
          ents.forEach((e, i) => {
            ul.appendChild(el("li", null, [
              el("span", { class: "chosen-item-name" }, e.nom),
              el("span", { class: "chosen-item-meta" }, [
                el("span", { class: "chosen-tag" }, "Entraînement"),
                el("span", { class: "chosen-pp" }, "3 PP"),
              ]),
              el("button", {
                class: "chosen-remove",
                type: "button",
                "aria-label": "Retirer",
                onclick: () => {
                  state.entrainements_choisis.splice(i, 1);
                  saveState();
                  renderEtape3Specificites();
                  refreshPPBar();
                },
              }, "×"),
            ]));
          });
          card.appendChild(ul);
        }
        card.appendChild(el("p", { class: "spec-max" }, [
          "⚠ Max ", el("strong", null, "3 spécialités"), " à la création (hors bonus écoles/âge).",
        ]));

      } else if (spec.id === "competences") {
        // Rappel des coûts
        const ul = el("ul", { class: "spec-couts-list" });
        spec.variantes.forEach(v => ul.appendChild(el("li", null, [
          el("span", { class: "spec-cout-label" }, v.label),
          el("span", { class: "spec-cout-pp" }, v.pp + " PP"),
        ])));
        card.appendChild(ul);

        // Liste des compétences choisies via les sélecteurs de rang
        const comps = (state.competences_choisies || []).filter(c => (c.rang || 0) > 0);
        if (comps.length === 0) {
          card.appendChild(el("p", { class: "spec-empty-list" },
            "Aucune compétence chiffrée. Cliquez sur 'Rang' depuis une fiche compétence."));
        } else {
          // Recalcule le type_cout en direct pour l'affichage
          let mesSets = { base: new Set(), avancee: new Set() };
          if (window.CreationState) mesSets = window.CreationState.getMesCompetencesSets();
          const ulC = el("ul", { class: "spec-chosen-list" });
          comps.forEach((c, i) => {
            let tc = "hors";
            if (mesSets.base.has(c.nom)) tc = "base";
            else if (mesSets.avancee.has(c.nom)) tc = "avancee";
            const pprang = tc === "base" ? 1 : tc === "avancee" ? 2 : 3;
            const cout = pprang * (c.rang || 0);
            const tcLabel = tc === "base" ? "base" : tc === "avancee" ? "avancée" : "hors-spé";
            ulC.appendChild(el("li", null, [
              el("span", { class: "chosen-item-name" }, c.nom),
              el("span", { class: "chosen-item-meta" }, [
                el("span", { class: "chosen-tag" }, "Rang " + (c.rang || 0)),
                el("span", { class: "chosen-tag rang-typecout-" + tc }, tcLabel),
                el("span", { class: "chosen-pp" }, cout + " PP"),
              ]),
              el("button", {
                class: "chosen-remove",
                type: "button",
                "aria-label": "Retirer",
                onclick: () => {
                  // On retire l'entrée correspondante (par nom, plus sûr que par index si rerender entre-temps)
                  const idx = (state.competences_choisies || []).findIndex(x => x.nom === c.nom);
                  if (idx >= 0) state.competences_choisies.splice(idx, 1);
                  saveState();
                  renderEtape3Specificites();
                  refreshPPBar();
                },
              }, "×"),
            ]));
          });
          card.appendChild(ulC);
        }

        // Fallback : saisie manuelle d'un total PP (utile si on ne passe pas par les rangs)
        const inp = el("input", {
          class: "spec-pp-input",
          type: "number",
          min: "0",
          step: "1",
          value: String(state.pp_competences || 0),
          oninput: (e) => {
            state.pp_competences = parseInt(e.target.value, 10) || 0;
            saveState();
            refreshPPBar();
          },
        });
        card.appendChild(el("div", { class: "spec-interactif" }, [
          el("label", { class: "spec-mini-label" }, "PP additionnels (saisie libre) :"),
          inp,
          el("span", { class: "spec-cout-pp" }, "PP"),
        ]));

      } else if (spec.id === "avantages") {
        const inp = el("input", {
          class: "spec-pp-input",
          type: "number",
          min: "0",
          step: "1",
          value: String(state.pp_avantages || 0),
          oninput: (e) => {
            state.pp_avantages = parseInt(e.target.value, 10) || 0;
            saveState();
            refreshPPBar();
          },
        });
        card.appendChild(el("div", { class: "spec-interactif" }, [
          el("label", { class: "spec-mini-label" }, "Total PP dépensés en avantages :"),
          inp,
          el("span", { class: "spec-cout-pp" }, "PP"),
        ]));

      } else if (spec.id === "langues") {
        card.appendChild(el("div", { class: "spec-interactif" }, [
          el("label", { class: "spec-mini-label" }, "Langues supplémentaires (1 PP/unité) :"),
          counterControl("nb_langues_extra", 0, null),
        ]));
        card.appendChild(el("p", { class: "spec-resume" },
          "Inclut Théan et toute autre langue choisie. La langue native de votre Nation est gratuite."));

      } else if (spec.id === "societe_secrete") {
        const sel = !!state.has_societe_secrete;
        card.appendChild(el("button", {
          class: "spec-sorcel-btn" + (sel ? " is-selected" : ""),
          type: "button",
          onclick: () => { state.has_societe_secrete = !sel; saveState(); renderEtape3Specificites(); refreshPPBar(); },
        }, sel ? "✓ Société Secrète (5 PP)" : "Ajouter (5 PP)"));
      }

      // Boutons pages (sous le sélecteur)
      if (spec.pages && spec.pages.length) {
        const pages = el("div", { class: "spec-pages-row" });
        spec.pages.forEach(p => {
          pages.appendChild(el("a", {
            class: "spec-page-btn",
            href: p.url,
            target: "_blank",
            rel: "noopener",
          }, [p.label, " →"]));
        });
        card.appendChild(pages);
      } else if (spec.page) {
        card.appendChild(el("a", {
          class: "spec-page-btn",
          href: spec.page,
          target: spec.page.startsWith("#") ? "_self" : "_blank",
          rel: "noopener",
        }, [spec.page_label || "Ouvrir →"]));
      } else if (spec.page_label) {
        card.appendChild(el("span", { class: "spec-page-btn is-disabled" }, spec.page_label));
      }
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  function renderEtape3Langues() {
    const langues_nation = data.langues_par_nation || {};
    const langue_univ = data.langue_universelle || {};
    const container = document.getElementById("step-3-langues");
    const descEl = document.getElementById("langues-description");
    if (!container) return;
    container.innerHTML = "";

    // Description
    if (descEl) {
      descEl.innerHTML = "";
      descEl.appendChild(document.createTextNode(
        "La langue native de votre Nation est gratuite. Chaque langue supplémentaire (parlée ou écrite) coûte 1 PP."
      ));
    }

    // Langue native (selon Nation choisie)
    const langueNative = state.nation ? langues_nation[state.nation] : null;
    if (langueNative) {
      container.appendChild(el("div", { class: "langue-bloc langue-native" }, [
        el("div", { class: "langue-icone" }, "🗣"),
        el("div", { class: "langue-content" }, [
          el("strong", null, "Langue native"),
          el("p", null, [
            langueNative,
            " (gratuite — héritée de votre Nation ",
            el("em", null, state.nation),
            ")",
          ]),
        ]),
      ]));
    } else {
      container.appendChild(el("div", { class: "langue-bloc langue-vide" }, [
        el("em", null, "Choisissez une Nation à l'Étape 1 pour voir votre langue native."),
      ]));
    }

    // Théan
    if (langue_univ.nom) {
      container.appendChild(el("div", { class: "langue-bloc langue-universelle" }, [
        el("div", { class: "langue-icone" }, "📜"),
        el("div", { class: "langue-content" }, [
          el("strong", null, langue_univ.nom + " "),
          el("span", { class: "langue-cout" }, "(1 PP)"),
          el("p", null, langue_univ.description),
        ]),
      ]));
    }

    // Autres langues : indication
    container.appendChild(el("p", { class: "langues-extras" }, [
      el("em", null, "Vous pouvez ajouter d'autres langues (1 PP chacune). "),
      "Consultez la liste des Nations à l'Étape 1 pour voir leurs langues natives.",
    ]));
  }

  // ===== Init =====
  renderIntro();
  renderEtape1Intro();
  renderTraits();
  renderStatsDerivees();
  renderNations();
  renderEtape2Intro();
  renderArcanes();
  renderArcaneSelection();
  renderEtape3Intro();
  renderEtape3Ages();
  renderEtape3Specificites();
  renderEtape3Langues();
  const btnTirage = document.getElementById("btn-tirage-aleatoire");
  if (btnTirage) btnTirage.addEventListener("click", tirageAleatoire);

  // Reset complet (efface localStorage et recharge la page)
  const btnReset = document.getElementById("pp-bar-reset");
  if (btnReset) btnReset.addEventListener("click", resetState);

  // Rafraîchissement à chaque retour sur la page (au cas où l'utilisateur
  // aurait ajouté/retiré des items depuis une fiche ouverte en sous-onglet).
  function refreshFromStorage() {
    loadState();
    renderTraits();
    renderStatsDerivees();
    renderNations();
    renderArcanes();
    renderArcaneSelection();
    renderEtape3Ages();
    renderEtape3Specificites();
    renderEtape3Langues();
    refreshPPBar();
  }
  // Quand state localStorage change ailleurs (autre onglet ou cross-modal sur cette page).
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) refreshFromStorage();
  });
  window.addEventListener("creation-state-changed", refreshFromStorage);
  // Quand l'utilisateur revient sur l'onglet
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshFromStorage();
  });

  // 1ᵉʳ rafraîchissement du compteur PP après init
  refreshPPBar();
})();
