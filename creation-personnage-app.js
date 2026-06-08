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
    competences_choisies: [],     // [{nom, rang, type_cout}]
    // Bonus d'âge du Héros :
    //   15-25 → trait libre (+1, max 4)
    //   26-35 → métier au choix (base ET avancées +1 rang gratuit)
    //   36-50 → une École de la Nation d'origine (spécialisations +1 rang gratuit)
    bonus_age: {
      trait_libre: null,
      metier_26_35: null,
      ecole_36_50: null,
      ecole_36_50_choix_specs: {},  // map { slotBrut: optionChoisie }
    },
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
        // bonus_age est un sous-objet : on merge avec les défauts pour
        // garantir que toutes les clés existent même si la sauvegarde est
        // antérieure à leur introduction.
        if (obj.bonus_age && typeof obj.bonus_age === "object") {
          state.bonus_age = Object.assign({}, defaultState.bonus_age, obj.bonus_age);
        } else {
          state.bonus_age = Object.assign({}, defaultState.bonus_age);
        }
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
      for (const c of children) {
        if (c == null) continue;
        // Strings ET nombres → text node (sinon appendChild planterait sur un Number).
        if (typeof c === "string" || typeof c === "number") {
          e.appendChild(document.createTextNode(String(c)));
        } else {
          e.appendChild(c);
        }
      }
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
    // Bonus d'âge 15-25 : Trait gratuit (+1, ne dépasse pas 4)
    if (state.bonus_age && state.bonus_age.trait_libre === traitNom) v += 1;
    if (v > 4) v = 4;
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

  // ===== Sélecteur de Langues (modal) =====
  // Reprend la même mise en forme que le tableau des Nations à l'étape 1 :
  // langues groupées par continent (couleurs assorties), plus une section
  // dédiée pour le Théan (langue universelle).
  function ouvrirSelecteurLangues() {
    let dialog = document.getElementById("creation-modal-langues");
    if (!dialog) {
      dialog = el("dialog", { id: "creation-modal-langues", class: "ecole-detail cross-modal" }, [
        el("div", { class: "cross-modal-header" }, [
          el("button", {
            class: "ecole-detail-close",
            "aria-label": "Fermer",
            type: "button",
            onclick: () => dialog.close(),
          }, "×"),
        ]),
        el("div", { id: "creation-modal-langues-content" }),
      ]);
      document.body.appendChild(dialog);
      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
      });
    }
    renderContenuModalLangues(dialog);
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else dialog.setAttribute("open", "");
  }

  function langueEstChoisie(nom) {
    return (state.langues_choisies || []).some(l => l.nom === nom);
  }

  function toggleLangue(nom, dialog) {
    if (!Array.isArray(state.langues_choisies)) state.langues_choisies = [];
    const idx = state.langues_choisies.findIndex(l => l.nom === nom);
    if (idx >= 0) state.langues_choisies.splice(idx, 1);
    else state.langues_choisies.push({ nom });
    saveState();
    refreshPPBar();
    renderContenuModalLangues(dialog);
    renderEtape3Specificites();
    renderEtape3Langues();
  }

  function renderContenuModalLangues(dialog) {
    const langues_nation = data.langues_par_nation || {};
    const langue_univ = data.langue_universelle || {};
    const langueNative = state.nation ? langues_nation[state.nation] : null;
    const content = document.getElementById("creation-modal-langues-content");
    content.innerHTML = "";

    content.appendChild(el("div", { class: "detail-header" }, [
      el("h2", null, "Langues parlées et écrites"),
    ]));
    content.appendChild(el("p", { class: "modal-langues-intro" }, [
      "Chaque langue supplémentaire ", el("strong", null, "coûte 1 PP"),
      ". La langue native de votre Nation est gratuite et toujours acquise. ",
      "Cliquez sur une langue pour l'ajouter ou la retirer.",
    ]));

    // Récap PP du sélecteur (live)
    const nbChoisies = (state.langues_choisies || []).length;
    content.appendChild(el("p", { class: "modal-langues-recap" }, [
      langueNative
        ? el("span", null, ["Native : ", el("strong", null, langueNative), " "])
        : el("em", { class: "spec-empty-list" }, "Pas de langue native (Nation non choisie)"),
      " · ",
      el("strong", null, String(nbChoisies)),
      " langue" + (nbChoisies > 1 ? "s" : "") + " supplémentaire" + (nbChoisies > 1 ? "s" : ""),
      " = ", el("strong", null, nbChoisies + " PP"),
    ]));

    // ===== Section Langue universelle (Théan) =====
    if (langue_univ.nom) {
      const checked = langueEstChoisie(langue_univ.nom);
      content.appendChild(el("div", { class: "nations-continent langues-section continent-universelle" }, [
        el("h5", { class: "nations-continent-titre" }, [
          el("span", { class: "nations-continent-pastille" }),
          "Langue universelle",
          el("span", { class: "nations-continent-equiv" }, " — parlée par les érudits et le clergé"),
        ]),
        el("table", { class: "nations-tbl langues-tbl" }, [
          el("thead", null, el("tr", null, [
            el("th", null, "Langue"),
            el("th", null, "Origine"),
            el("th", null, "Coût"),
          ])),
          el("tbody", null, [
            el("tr", {
              class: "nation-row langue-row" + (checked ? " is-selected" : ""),
              tabindex: "0",
              role: "button",
              "aria-pressed": checked ? "true" : "false",
              onclick: () => toggleLangue(langue_univ.nom, dialog),
              onkeydown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleLangue(langue_univ.nom, dialog);
                }
              },
            }, [
              el("td", { class: "nation-nom" }, langue_univ.nom),
              el("td", { class: "nation-bonus" }, langue_univ.description || "Langue universelle de Theah"),
              el("td", { class: "nation-equiv langue-cout-cell" }, "1 PP"),
            ]),
          ]),
        ]),
      ]));
    }

    // ===== Sections par continent (langues natives des Nations) =====
    const continents = data.continents_ordre || [];
    const meta = data.continents_meta || {};
    for (const continent of continents) {
      const nations = (data.nations || []).filter(
        n => n.continent === continent && langues_nation[n.nom]
      );
      if (!nations.length) continue;
      const m = meta[continent] || {};
      const colorKey = m.couleur || "default";
      const suffixes = [];
      if (m.equivalent) suffixes.push(m.equivalent);
      if (m.parent) suffixes.push("appartient à " + m.parent);
      const equivSpan = suffixes.length
        ? el("span", { class: "nations-continent-equiv" }, " — " + suffixes.join(" / "))
        : null;

      content.appendChild(el("div", { class: "nations-continent langues-section continent-" + colorKey }, [
        el("h5", { class: "nations-continent-titre" }, [
          el("span", { class: "nations-continent-pastille" }),
          continent,
          equivSpan,
        ]),
        el("table", { class: "nations-tbl langues-tbl" }, [
          el("thead", null, el("tr", null, [
            el("th", null, "Langue"),
            el("th", null, "Nation"),
            el("th", null, "Coût"),
          ])),
          el("tbody", null, nations.map(n => {
            const lang = langues_nation[n.nom];
            const isNative = !!(langueNative && lang === langueNative);
            const choisie = langueEstChoisie(lang);
            const checked = isNative || choisie;
            return el("tr", {
              class: "nation-row langue-row"
                + (checked ? " is-selected" : "")
                + (isNative ? " langue-native-row" : ""),
              tabindex: isNative ? "-1" : "0",
              role: isNative ? null : "button",
              "aria-pressed": checked ? "true" : "false",
              "aria-disabled": isNative ? "true" : null,
              title: isNative ? "Langue native — toujours acquise gratuitement" : null,
              onclick: isNative ? null : () => toggleLangue(lang, dialog),
              onkeydown: isNative ? null : (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleLangue(lang, dialog);
                }
              },
            }, [
              el("td", { class: "nation-nom" }, lang),
              el("td", { class: "nation-bonus" }, n.nom),
              el("td", { class: "nation-equiv langue-cout-cell" },
                isNative ? "Gratuite (native)" : "1 PP"),
            ]);
          })),
        ]),
      ]));
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
      // Zone d'en-tête cliquable (toggle de la plage)
      const header = el("div", {
        class: "age-card-header",
        role: "button",
        tabindex: "0",
        "aria-pressed": isSel ? "true" : "false",
        onclick: () => {
          state.age_plage = isSel ? null : age.plage;
          saveState();
          renderEtape3Ages();
          renderEtape3Specificites();
          refreshPPBar();
        },
        onkeydown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            state.age_plage = isSel ? null : age.plage;
            saveState();
            renderEtape3Ages();
            renderEtape3Specificites();
            refreshPPBar();
          }
        },
      }, [
        el("div", { class: "age-plage" }, age.plage),
        el("div", { class: "age-label" }, age.label),
        el("p", { class: "age-bonus" }, age.bonus),
      ]);

      const card = el("div", {
        class: "age-card" + (isSel ? " is-selected" : ""),
      }, [header]);

      // Quand la tranche est sélectionnée → panneau de bonus interactif
      if (isSel) card.appendChild(buildBonusAgePane(age.plage));

      container.appendChild(card);
    });
  }

  // ===== Panneau Bonus d'âge (sous la carte sélectionnée) =====
  function buildBonusAgePane(plage) {
    const pane = el("div", { class: "age-bonus-pane" });
    if (plage === "15-25 ans") {
      pane.appendChild(buildBonusAgeTrait());
    } else if (plage === "26-35 ans") {
      pane.appendChild(buildBonusAgeMetier("metier_26_35",
        "Métier au choix — ses compétences de base ET avancées gagnent +1 rang gratuit."));
    } else if (plage === "36-50 ans") {
      pane.appendChild(buildBonusAgeEcole(
        "Une École de votre Nation d'origine. Ses spécialisations gagnent +1 rang gratuit, comme une école achetée — mais celle-ci est offerte (0 PP)."));
    }
    return pane;
  }

  function buildBonusAgeEcole(description) {
    const ba = state.bonus_age || {};
    const choisi = ba.ecole_36_50;
    const wrap = el("div", { class: "age-bonus-slot" });
    wrap.appendChild(el("h6", { class: "age-bonus-slot-titre" }, "École offerte"));
    wrap.appendChild(el("p", { class: "age-bonus-desc" }, description));
    if (!state.nation) {
      wrap.appendChild(el("p", { class: "age-bonus-vide" },
        "Choisissez une Nation à l'Étape 1 pour activer ce bonus."));
      return wrap;
    }
    if (choisi) {
      wrap.appendChild(el("p", { class: "age-bonus-choisi" }, [
        el("strong", null, choisi),
        " — gratuite, de votre Nation ",
        el("em", null, state.nation),
      ]));

      // Si l'école choisie a des slots 'A OU B' dans ses spécialisations,
      // afficher les sélecteurs ici (le state utilise ecole_36_50_choix_specs).
      const src = trouverSrcEcole(choisi);
      if (src && window.CreationState && window.CreationState.analyserSpecialisationsEcole) {
        const fakeEntry = {
          nom: choisi,
          choix_specialisations: ba.ecole_36_50_choix_specs || {},
        };
        const analyse = window.CreationState.analyserSpecialisationsEcole(fakeEntry, src);
        if (analyse.slots && analyse.slots.length) {
          const sub = el("div", { class: "ecole-specs-choix" });
          const nbAResoudre = analyse.slots.filter(s => !s.choix).length;
          sub.appendChild(el("p", { class: "ecole-specs-choix-titre" },
            "Spécialisations" + (nbAResoudre > 0 ? " (à choisir)" : "")));
          analyse.slots.forEach(slot => {
            const ligne = el("div", { class: "ecole-specs-choix-row" });
            ligne.appendChild(el("span", { class: "ecole-specs-choix-label" }, slot.slotBrut));
            slot.options.forEach(opt => {
              const isOptChoisi = slot.choix === opt;
              ligne.appendChild(el("button", {
                class: "ecole-specs-choix-opt" + (isOptChoisi ? " is-selected" : ""),
                type: "button",
                "aria-pressed": isOptChoisi ? "true" : "false",
                onclick: () => {
                  state.bonus_age = state.bonus_age || {};
                  state.bonus_age.ecole_36_50_choix_specs = state.bonus_age.ecole_36_50_choix_specs || {};
                  state.bonus_age.ecole_36_50_choix_specs[slot.slotBrut] = isOptChoisi ? null : opt;
                  saveState();
                  renderEtape3Ages();
                  renderEtape3Specificites();
                  refreshPPBar();
                },
              }, opt));
            });
            sub.appendChild(ligne);
          });
          wrap.appendChild(sub);
        }
      }
    } else {
      wrap.appendChild(el("p", { class: "age-bonus-vide" }, "Aucune École sélectionnée."));
    }
    wrap.appendChild(el("button", {
      class: "btn-add-creation age-bonus-btn",
      type: "button",
      onclick: () => ouvrirPopupBonusEcole(),
    }, choisi ? "Modifier l'École →" : "Choisir une École →"));
    return wrap;
  }

  function buildBonusAgeTrait() {
    const ba = state.bonus_age || {};
    const choisi = ba.trait_libre;
    const wrap = el("div", { class: "age-bonus-slot" });
    wrap.appendChild(el("h6", { class: "age-bonus-slot-titre" }, "Trait gratuit (+1, max 4)"));
    if (choisi) {
      wrap.appendChild(el("p", { class: "age-bonus-choisi" }, [
        el("strong", null, choisi),
        " (+1 gratuit)",
      ]));
    } else {
      wrap.appendChild(el("p", { class: "age-bonus-vide" },
        "Aucun Trait sélectionné."));
    }
    wrap.appendChild(el("button", {
      class: "btn-add-creation age-bonus-btn",
      type: "button",
      onclick: () => ouvrirPopupBonusTrait(),
    }, choisi ? "Modifier mon Trait gratuit →" : "Choisir un Trait gratuit →"));
    return wrap;
  }

  function buildBonusAgeMetier(slotKey, description) {
    const ba = state.bonus_age || {};
    const choisi = ba[slotKey];
    const wrap = el("div", { class: "age-bonus-slot" });
    wrap.appendChild(el("h6", { class: "age-bonus-slot-titre" }, "Métier bonus"));
    wrap.appendChild(el("p", { class: "age-bonus-desc" }, description));
    if (choisi) {
      wrap.appendChild(el("p", { class: "age-bonus-choisi" }, [el("strong", null, choisi)]));
    } else {
      wrap.appendChild(el("p", { class: "age-bonus-vide" }, "Aucun Métier sélectionné."));
    }
    wrap.appendChild(el("button", {
      class: "btn-add-creation age-bonus-btn",
      type: "button",
      onclick: () => ouvrirPopupBonusMetier(slotKey),
    }, choisi ? "Modifier le Métier →" : "Choisir un Métier →"));
    return wrap;
  }

  // ===== Helper générique : popup modal pour bonus d'âge =====
  // dialogId : identifiant DOM unique pour la dialog.
  // renderFn : (contentDiv, dialog) => void — remplit le contenu.
  function ouvrirPopupBonusAge(dialogId, renderFn) {
    let dialog = document.getElementById(dialogId);
    if (!dialog) {
      dialog = el("dialog", { id: dialogId, class: "ecole-detail cross-modal" }, [
        el("div", { class: "cross-modal-header" }, [
          el("button", {
            class: "ecole-detail-close",
            "aria-label": "Fermer",
            type: "button",
            onclick: () => dialog.close(),
          }, "×"),
        ]),
        el("div", { id: dialogId + "-content" }),
      ]);
      document.body.appendChild(dialog);
      dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    }
    const content = document.getElementById(dialogId + "-content");
    content.innerHTML = "";
    renderFn(content, dialog);
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else dialog.setAttribute("open", "");
  }

  function ouvrirPopupBonusTrait() {
    ouvrirPopupBonusAge("popup-bonus-trait", (content, dialog) => {
      const traits = data.traits_ordre || [];
      const ba = state.bonus_age || {};
      content.appendChild(el("div", { class: "detail-header" }, [
        el("h2", null, "Trait gratuit (15-25 ans)"),
      ]));
      content.appendChild(el("p", { class: "modal-langues-intro" }, [
        "Choisissez le Trait qui reçoit le +1 gratuit. ",
        el("strong", null, "Aucun Trait ne peut dépasser 4 à la création."),
      ]));
      // Pour chaque Trait : ligne avec score actuel et bouton de sélection
      const tableSec = el("div", { class: "nations-continent langues-section continent-default" }, [
        el("h5", { class: "nations-continent-titre" }, [
          el("span", { class: "nations-continent-pastille" }),
          "Vos 5 Traits",
        ]),
        el("table", { class: "nations-tbl langues-tbl" }, [
          el("thead", null, el("tr", null, [
            el("th", null, "Trait"),
            el("th", null, "Score actuel"),
            el("th", null, "Avec le +1"),
          ])),
          el("tbody", null, traits.map(t => {
            const baseScore = calcValeurTrait(t); // 2 / 3 / 4 selon bonus déjà appliqués
            const choisi = ba.trait_libre === t;
            const futur = baseScore + (choisi ? 0 : 1); // si déjà choisi, baseScore intègre le +1
            const futurEff = choisi ? baseScore : baseScore + 1;
            const disabled = !choisi && futurEff > 4;
            return el("tr", {
              class: "nation-row langue-row" + (choisi ? " is-selected" : "")
                + (disabled ? " langue-native-row" : ""),
              tabindex: disabled ? "-1" : "0",
              role: disabled ? null : "button",
              "aria-pressed": choisi ? "true" : "false",
              "aria-disabled": disabled ? "true" : null,
              title: disabled ? "Ce Trait atteindrait 5 — impossible à la création" : null,
              onclick: disabled ? null : () => {
                // Toggle : si déjà choisi, on retire ; sinon on assigne (un seul à la fois)
                state.bonus_age = state.bonus_age || {};
                state.bonus_age.trait_libre = choisi ? null : t;
                saveState();
                renderTraits();
                renderStatsDerivees();
                renderEtape3Ages();
                refreshPPBar();
                dialog.close();
              },
            }, [
              el("td", { class: "nation-nom" }, t),
              el("td", { class: "nation-bonus" }, String(baseScore)),
              el("td", { class: "nation-equiv langue-cout-cell" },
                disabled ? "5 (impossible)" : String(futurEff)),
            ]);
          })),
        ]),
      ]);
      content.appendChild(tableSec);

      // Bouton "Retirer mon choix"
      if (ba.trait_libre) {
        content.appendChild(el("button", {
          class: "btn-mes-spe-clear",
          type: "button",
          onclick: () => {
            state.bonus_age.trait_libre = null;
            saveState();
            renderTraits();
            renderStatsDerivees();
            renderEtape3Ages();
            refreshPPBar();
            dialog.close();
          },
        }, "× Retirer mon Trait gratuit"));
      }
    });
  }

  function ouvrirPopupBonusMetier(slotKey) {
    ouvrirPopupBonusAge("popup-bonus-metier-" + slotKey, (content, dialog) => {
      const metiers = (window.METIERS_DATA && window.METIERS_DATA.metiers) || [];
      const ba = state.bonus_age || {};
      content.appendChild(el("div", { class: "detail-header" }, [
        el("h2", null, "Métier bonus — au choix"),
      ]));
      content.appendChild(el("p", { class: "modal-langues-intro" }, [
        "Sélectionnez le Métier qui sera votre bonus d'âge. ",
        el("strong", null, "Ses compétences de base ET avancées gagneront +1 rang gratuit"),
        ".",
      ]));
      const tri = metiers.slice().sort((a, b) =>
        a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" }));
      const ul = el("ul", { class: "popup-bonus-list" });
      tri.forEach(m => {
        const choisi = ba[slotKey] === m.nom;
        ul.appendChild(el("li", {
          class: "popup-bonus-item" + (choisi ? " is-selected" : ""),
          tabindex: "0",
          role: "button",
          "aria-pressed": choisi ? "true" : "false",
          onclick: () => {
            state.bonus_age = state.bonus_age || {};
            state.bonus_age[slotKey] = choisi ? null : m.nom;
            saveState();
            renderEtape3Ages();
            renderEtape3Specificites();
            refreshPPBar();
            dialog.close();
          },
        }, [
          el("span", { class: "popup-bonus-nom" }, m.nom),
          m.description
            ? el("span", { class: "popup-bonus-desc" }, m.description.slice(0, 90)
              + (m.description.length > 90 ? "…" : ""))
            : null,
        ]));
      });
      content.appendChild(ul);
      if (ba[slotKey]) {
        content.appendChild(el("button", {
          class: "btn-mes-spe-clear",
          type: "button",
          onclick: () => {
            state.bonus_age[slotKey] = null;
            saveState();
            renderEtape3Ages();
            renderEtape3Specificites();
            refreshPPBar();
            dialog.close();
          },
        }, "× Retirer ce Métier bonus"));
      }
    });
  }

  // Popup École bonus (36-50 ans) : filtrée par Nation, groupée par type.
  function ouvrirPopupBonusEcole() {
    ouvrirPopupBonusAge("popup-bonus-ecole-36-50", (content, dialog) => {
      const ba = state.bonus_age || {};
      const choisi = ba.ecole_36_50;
      const nation = state.nation;

      content.appendChild(el("div", { class: "detail-header" }, [
        el("h2", null, "École offerte — 36-50 ans"),
      ]));
      content.appendChild(el("p", { class: "modal-langues-intro" }, [
        nation
          ? el("span", null, ["Sélectionnez une École enseignée dans votre Nation : ",
              el("strong", null, nation), "."])
          : el("strong", { class: "spec-empty-list" },
              "Choisissez d'abord une Nation à l'Étape 1."),
      ]));
      if (!nation) return;

      // Filtre par Nation (en tenant compte des alias : 'Vestenmannavnjar'
      // ↔ 'Vesten', 'Aragosta' ↔ 'Nations Pirates', etc.) puis groupe par type
      const ecData = (window.ECOLES_DATA && window.ECOLES_DATA.ecoles) || [];
      const ecCombat = (window.ECOLES_COMBAT_DATA && window.ECOLES_COMBAT_DATA.ecoles) || [];
      function filtreNation(arr) {
        return arr.filter(ec => ecoleEstDeNation(ec, nation));
      }
      const groupes = [
        { titre: "Écoles de Spadassin",  ecoles: filtreNation(ecData) },
        { titre: "Écoles de Combat",     ecoles: filtreNation(ecCombat) },
        { titre: "Écoles de Courtisan",  ecoles: [] }, // (placeholder pour future addition)
      ];

      // Récap
      const nbTotal = groupes.reduce((a, g) => a + g.ecoles.length, 0);
      if (nbTotal === 0) {
        content.appendChild(el("p", { class: "spec-empty-list" },
          "Aucune École référencée pour la Nation " + nation + "."));
        return;
      }
      content.appendChild(el("p", { class: "modal-langues-recap" }, [
        el("strong", null, nbTotal),
        " École" + (nbTotal > 1 ? "s" : "") + " disponible" + (nbTotal > 1 ? "s" : "") +
        " pour " + nation + " (réparties par type) :",
      ]));

      groupes.forEach(g => {
        if (g.ecoles.length === 0) return;
        const tri = g.ecoles.slice().sort((a, b) =>
          a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" }));
        const ul = el("ul", { class: "popup-bonus-list" });
        tri.forEach(ec => {
          const isChoisi = choisi === ec.nom;
          const armeStr = ec.arme_display || ec.arme || "";
          ul.appendChild(el("li", {
            class: "popup-bonus-item" + (isChoisi ? " is-selected" : ""),
            tabindex: "0",
            role: "button",
            "aria-pressed": isChoisi ? "true" : "false",
            onclick: () => {
              state.bonus_age = state.bonus_age || {};
              state.bonus_age.ecole_36_50 = isChoisi ? null : ec.nom;
              // Réinitialise les choix de slots A/B quand on change d'école
              state.bonus_age.ecole_36_50_choix_specs = {};
              saveState();
              renderEtape3Ages();
              renderEtape3Specificites();
              refreshPPBar();
              dialog.close();
            },
          }, [
            el("span", { class: "popup-bonus-nom" }, ec.nom),
            armeStr
              ? el("span", { class: "popup-bonus-desc" },
                  "Arme : " + armeStr + (ec.description_courte
                    ? " — " + ec.description_courte.slice(0, 70)
                      + (ec.description_courte.length > 70 ? "…" : "")
                    : ""))
              : null,
          ]));
        });
        content.appendChild(el("div", { class: "popup-bonus-groupe" }, [
          el("h5", { class: "popup-bonus-groupe-titre" }, g.titre + " (" + tri.length + ")"),
          ul,
        ]));
      });

      if (ba.ecole_36_50) {
        content.appendChild(el("button", {
          class: "btn-mes-spe-clear",
          type: "button",
          onclick: () => {
            state.bonus_age.ecole_36_50 = null;
            state.bonus_age.ecole_36_50_choix_specs = {};
            saveState();
            renderEtape3Ages();
            renderEtape3Specificites();
            refreshPPBar();
            dialog.close();
          },
        }, "× Retirer cette École bonus"));
      }
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

  // Construit le bloc 'Compétences disponibles à coût réduit', listant
  // toutes les compétences que les Métiers / Entraînements / Écoles déjà
  // choisis font passer à coût base ou avancée, avec la source en regard.
  // Cliquer sur une compétence ouvre sa fiche (modal cross-page).
  function buildCompetencesDispoBloc() {
    const wrapper = el("div", { class: "spec-comp-dispo" });
    if (!window.CreationState || !window.CreationState.getMesCompetencesSets) {
      return wrapper;
    }
    const { base, avancee, sources } = window.CreationState.getMesCompetencesSets();
    const nbBase = base.size, nbAv = avancee.size;
    const total = nbBase + nbAv;

    if (total === 0) {
      wrapper.appendChild(el("p", { class: "spec-empty-list" },
        "Ajoutez des Métiers, Entraînements ou Écoles pour voir ici les " +
        "compétences qui deviendront accessibles à coût réduit."));
      return wrapper;
    }

    // En-tête repliable
    const summary = el("summary", { class: "spec-comp-dispo-summary" }, [
      el("span", { class: "spec-comp-dispo-titre" },
        "Compétences à coût réduit grâce à vos spécialités"),
      el("span", { class: "spec-comp-dispo-stats" }, [
        el("span", { class: "rang-typecout rang-typecout-base" }, nbBase + " base"),
        el("span", { class: "rang-typecout rang-typecout-avancee" }, nbAv + " avancée" + (nbAv > 1 ? "s" : "")),
      ]),
    ]);

    const detailsEl = el("details", { class: "spec-comp-dispo-details", open: true }, [summary]);

    function buildSection(titre, classMod, set, level) {
      if (set.size === 0) return null;
      const noms = Array.from(set).sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
      const ul = el("ul", { class: "spec-comp-dispo-list" });
      noms.forEach(nom => {
        const srcList = sources[level + ":" + nom] || [];
        const srcTxt = srcList.length
          ? srcList.join(" · ")
          : "Source inconnue";
        ul.appendChild(el("li", { class: "spec-comp-dispo-item" }, [
          el("button", {
            class: "spec-comp-dispo-nom",
            type: "button",
            title: "Ouvrir la fiche de la compétence",
            onclick: () => {
              // Ouvre la fiche compétence via le module cross-modal
              if (window.openItem && window.COMPETENCES_DATA) {
                const c = (window.COMPETENCES_DATA.competences || [])
                  .find(x => x.nom === nom);
                if (c) {
                  window.openItem("competence", c, { resetStack: true });
                  return;
                }
              }
              // Fallback : un lien vers la page compétences
              window.open("competences.html", "_blank");
            },
          }, nom),
          el("span", { class: "spec-comp-dispo-sep" }, "—"),
          el("span", { class: "spec-comp-dispo-source" }, srcTxt),
        ]));
      });
      return el("div", { class: "spec-comp-dispo-section " + classMod }, [
        el("h6", { class: "spec-comp-dispo-section-titre" }, [
          el("span", { class: "rang-typecout rang-typecout-" + level }, titre),
          el("span", { class: "spec-comp-dispo-count" }, "(" + set.size + ")"),
        ]),
        ul,
      ]);
    }

    const secBase = buildSection("De base (1 PP / rang)", "is-base", base, "base");
    const secAv = buildSection("Avancées (2 PP / rang)", "is-avancee", avancee, "avancee");
    if (secBase) detailsEl.appendChild(secBase);
    if (secAv) detailsEl.appendChild(secAv);

    wrapper.appendChild(detailsEl);
    return wrapper;
  }

  // ===== Fiche-style : 2 listes de compétences avec radios 0-3 =====
  function getCompRangChoisi(nom) {
    const item = (state.competences_choisies || []).find(c => c.nom === nom);
    return item ? (item.rang || 0) : 0;
  }
  function setCompRangChoisi(nom, rang, type_cout) {
    if (!Array.isArray(state.competences_choisies)) state.competences_choisies = [];
    const idx = state.competences_choisies.findIndex(c => c.nom === nom);
    if (!rang || rang <= 0) {
      if (idx >= 0) state.competences_choisies.splice(idx, 1);
    } else {
      const entry = { nom, rang, type_cout };
      if (idx >= 0) state.competences_choisies[idx] = entry;
      else state.competences_choisies.push(entry);
    }
    saveState();
    refreshPPBar();
    renderEtape3Specificites();
  }

  // Limite de rang à la création de personnage (les rangs 4-5 ne sont
  // atteignables que par progression en jeu / certains avantages rares).
  const RANG_MAX_CREATION = 3;
  const RANG_MAX_ABSOLU = 5;

  // Helper : retrouve la source d'une école (spadassin ou combat) par son nom.
  function trouverSrcEcole(nom) {
    const ecData = (window.ECOLES_DATA && window.ECOLES_DATA.ecoles) || [];
    const ecCombat = (window.ECOLES_COMBAT_DATA && window.ECOLES_COMBAT_DATA.ecoles) || [];
    return ecData.find(x => x.nom === nom) || ecCombat.find(x => x.nom === nom) || null;
  }

  // Filtrage 'École de cette Nation' avec gestion des alias de noms
  // (Vestenmannavnjar↔Vesten, Aragosta↔Nations Pirates, etc.).
  // Délégation à CreationState.ecoleAppartientNation.
  function ecoleEstDeNation(ec, nationOff) {
    if (!ec || !Array.isArray(ec.nations)) return false;
    if (window.CreationState && window.CreationState.ecoleAppartientNation) {
      return window.CreationState.ecoleAppartientNation(ec.nations, nationOff);
    }
    return ec.nations.includes(nationOff);
  }

  function buildRangRadios(nom, type_cout) {
    // Rang offert (gratuit) par les métiers / entraînements / bonus d'âge.
    const offerts = (window.CreationState && window.CreationState.getRangsOfferts)
      ? window.CreationState.getRangsOfferts() : {};
    const offert = offerts[nom] || 0;
    // Rang acheté explicitement par le joueur (au-delà de l'offert).
    const choisi = getCompRangChoisi(nom);
    // Rang total affiché = max(rang choisi, rang offert)
    const cur = Math.max(choisi, offert);
    const pp_par_rang = type_cout === "base" ? 1 : type_cout === "avancee" ? 2 : 3;

    const row = el("div", { class: "fiche-comp-radios", role: "radiogroup" });
    for (let r = 1; r <= RANG_MAX_ABSOLU; r++) {
      const isOffert = r <= offert;                // rang gratuit (non cliquable)
      const isFilled = r <= cur;                   // cercle plein (visuel)
      const isHorsCreation = r > RANG_MAX_CREATION;
      let cssClass = "fiche-radio";
      if (isFilled) cssClass += " is-filled";
      if (isOffert) cssClass += " is-offert";
      if (isHorsCreation) cssClass += " is-hors-creation";

      let tooltip;
      if (isOffert) {
        tooltip = "Rang " + r + " — offert gratuitement par vos spécialités";
      } else if (isHorsCreation) {
        tooltip = "Rang " + r + " — au-delà de la création (max " + RANG_MAX_CREATION + ")";
      } else {
        const aPayer = (r - offert) * pp_par_rang;
        if (r === cur && r > offert) {
          tooltip = "Rang " + r + " — cliquer pour redescendre d'un cran";
        } else {
          tooltip = "Rang " + r + " — " + aPayer + " PP à payer";
        }
      }

      row.appendChild(el("button", {
        class: cssClass,
        type: "button",
        role: "radio",
        "aria-checked": r === cur ? "true" : "false",
        "aria-disabled": (isOffert || isHorsCreation) ? "true" : null,
        "aria-label": "Rang " + r,
        title: tooltip,
        onclick: () => {
          if (isOffert || isHorsCreation) return;
          // Si on clique sur le rang courant, on redescend d'un cran (mais
          // jamais en dessous de l'offert : on retire alors simplement l'entrée).
          if (r === cur && r > offert) {
            const nouveau = r - 1;
            if (nouveau <= offert) setCompRangChoisi(nom, 0, type_cout);
            else setCompRangChoisi(nom, nouveau, type_cout);
            return;
          }
          // Sinon : on stocke le rang total cliqué.
          setCompRangChoisi(nom, r, type_cout);
        },
      }));
    }
    return row;
  }

  function buildFicheCompetences() {
    const wrapper = el("div", { class: "fiche-comp-wrapper" });
    if (!window.CreationState || !window.CreationState.getMesCompetencesSets) {
      wrapper.appendChild(el("p", { class: "spec-empty-list" },
        "Module CreationState non disponible."));
      return wrapper;
    }
    const sets = window.CreationState.getMesCompetencesSets();
    // "base prime" : une compétence présente dans base ET avancée est rangée en base.
    const baseList = Array.from(sets.base)
      .sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
    const avList = Array.from(sets.avancee)
      .filter(c => !sets.base.has(c))
      .sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));

    if (baseList.length === 0 && avList.length === 0) {
      wrapper.appendChild(el("p", { class: "spec-empty-list" },
        "Ajoutez des Métiers, Entraînements ou Écoles pour faire apparaître ici " +
        "des compétences à coût réduit. Les métiers / entraînements bonus d'âge " +
        "offrent +1 rang gratuit sur leurs compétences avancées en plus des bases."));
      return wrapper;
    }

    function buildSection(titre, level, list) {
      if (list.length === 0) return null;
      const sec = el("div", { class: "fiche-comp-section fiche-comp-" + level });
      sec.appendChild(el("h6", { class: "fiche-comp-section-titre" }, [
        el("span", { class: "rang-typecout rang-typecout-" + level }, titre),
        el("span", { class: "fiche-comp-count" }, "(" + list.length + ")"),
      ]));
      const ul = el("ul", { class: "fiche-comp-list" });
      list.forEach(nom => {
        ul.appendChild(el("li", { class: "fiche-comp-row" }, [
          el("button", {
            class: "fiche-comp-nom",
            type: "button",
            title: "Voir la description et les sources",
            onclick: () => ouvrirPopupCompetence(nom),
          }, nom),
          buildRangRadios(nom, level),
        ]));
      });
      sec.appendChild(ul);
      return sec;
    }

    const secBase = buildSection("Compétences de base", "base", baseList);
    const secAv = buildSection("Compétences avancées", "avancee", avList);
    if (secBase) wrapper.appendChild(secBase);
    if (secAv)   wrapper.appendChild(secAv);

    return wrapper;
  }

  // ===== Popup compétence (description + sources) =====
  function ouvrirPopupCompetence(nom) {
    ouvrirPopupBonusAge("popup-fiche-competence", (content, dialog) => {
      const compData = (window.COMPETENCES_DATA && window.COMPETENCES_DATA.competences) || [];
      const c = compData.find(x => x.nom === nom);
      const sets = window.CreationState.getMesCompetencesSets();
      const tc = sets.base.has(nom) ? "base" : sets.avancee.has(nom) ? "avancee" : "hors";
      const tcLabel = tc === "base" ? "De base (1 PP / rang)"
                     : tc === "avancee" ? "Avancée (2 PP / rang)"
                     : "Hors-spécialités (3 PP / rang)";

      content.appendChild(el("div", { class: "detail-header" }, [
        el("h2", null, nom),
        el("div", { class: "badges" }, [
          el("span", { class: "badge rang-typecout-" + tc }, tcLabel),
        ]),
      ]));

      // Description
      if (c && c.description) {
        content.appendChild(el("div", { class: "detail-section" }, [
          el("h3", null, "Description"),
          el("p", { class: "description-paragraph" }, c.description),
        ]));
      }

      // Sources : d'où vient cette compétence ?
      const srcList = (sets.sources && sets.sources[tc + ":" + nom]) || [];
      if (srcList.length) {
        const ul = el("ul", { class: "fiche-popup-sources" });
        srcList.forEach(s => ul.appendChild(el("li", null, s)));
        content.appendChild(el("div", { class: "detail-section" }, [
          el("h3", null, "Sources (vos spécialités)"),
          ul,
        ]));
      } else {
        content.appendChild(el("div", { class: "detail-section" }, [
          el("h3", null, "Sources"),
          el("p", { class: "spec-empty-list" },
            "Aucune source ne donne accès à cette compétence."),
        ]));
      }

      // Sélecteur de rang dans le popup + rappel du rang offert
      const offerts = (window.CreationState && window.CreationState.getRangsOfferts)
        ? window.CreationState.getRangsOfferts() : {};
      const offert = offerts[nom] || 0;
      const rangSection = el("div", { class: "detail-section" }, [
        el("h3", null, "Rang à la création"),
        buildRangRadios(nom, tc),
      ]);
      if (offert > 0) {
        rangSection.appendChild(el("p", { class: "competence-rang-recap" }, [
          "Rang " + offert + " offert gratuitement par vos spécialités",
          " (cercles pleins verrouillés). ",
          "Cercles supplémentaires : ", el("strong", null, (tc === "avancee" ? "2" : tc === "base" ? "1" : "3") + " PP / rang acheté"),
          ".",
        ]));
      }
      rangSection.appendChild(el("p", { class: "competence-rang-note" }, [
        el("em", null,
          "⚠ Une compétence ne peut dépasser 3 rangs à la création. " +
          "Les rangs 4 et 5 sont affichés pour visualisation future (progression en jeu)."),
      ]));
      content.appendChild(rangSection);
    });
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
            // Analyse des slots 'A OU B'
            const src = trouverSrcEcole(e.nom);
            const analyse = (src && window.CreationState && window.CreationState.analyserSpecialisationsEcole)
              ? window.CreationState.analyserSpecialisationsEcole(e, src)
              : { slots: [], resolved: [] };
            const slots = analyse.slots || [];
            const nbAResoudre = slots.filter(s => !s.choix).length;

            const li = el("li", null, [
              el("span", { class: "chosen-item-name" }, e.nom),
              el("span", { class: "chosen-item-meta" }, [
                el("span", { class: "chosen-tag" }, e.type),
                e.hors_nation ? el("span", { class: "chosen-tag chosen-tag-warn" }, "hors-Nation") : null,
                nbAResoudre > 0
                  ? el("span", { class: "chosen-tag chosen-tag-warn" },
                      "⚠ " + nbAResoudre + " choix")
                  : null,
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
            ]);

            // Sous-bloc : choix des spécialisations 'A OU B'
            if (slots.length > 0) {
              const sub = el("div", { class: "ecole-specs-choix" });
              sub.appendChild(el("p", { class: "ecole-specs-choix-titre" },
                "Spécialisations" + (nbAResoudre > 0 ? " (à choisir)" : "")));
              slots.forEach(slot => {
                const ligne = el("div", { class: "ecole-specs-choix-row" });
                ligne.appendChild(el("span", { class: "ecole-specs-choix-label" },
                  slot.slotBrut));
                slot.options.forEach(opt => {
                  const isChoisi = slot.choix === opt;
                  ligne.appendChild(el("button", {
                    class: "ecole-specs-choix-opt" + (isChoisi ? " is-selected" : ""),
                    type: "button",
                    "aria-pressed": isChoisi ? "true" : "false",
                    onclick: () => {
                      // Toggle : si déjà choisi, on annule ; sinon on fixe.
                      e.choix_specialisations = e.choix_specialisations || {};
                      e.choix_specialisations[slot.slotBrut] = isChoisi ? null : opt;
                      saveState();
                      renderEtape3Specificites();
                      refreshPPBar();
                    },
                  }, opt));
                });
                sub.appendChild(ligne);
              });
              li.appendChild(sub);
            }

            ul.appendChild(li);
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
        // Rappel des coûts (compact, en haut)
        const ulC = el("ul", { class: "spec-couts-list" });
        spec.variantes.forEach(v => ulC.appendChild(el("li", null, [
          el("span", { class: "spec-cout-label" }, v.label),
          el("span", { class: "spec-cout-pp" }, v.pp + " PP"),
        ])));
        card.appendChild(ulC);

        // Fiche-style : deux listes (base / avancée) avec radios 0-3.
        card.appendChild(buildFicheCompetences());

        // Fallback : saisie manuelle d'un total PP supplémentaire
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
        const langues_nation = data.langues_par_nation || {};
        const langueNative = state.nation ? langues_nation[state.nation] : null;

        // Langue native (gratuite, héritée de la Nation)
        if (langueNative) {
          card.appendChild(el("p", { class: "spec-langue-native" }, [
            el("strong", null, "Native (gratuite) : "),
            langueNative,
            " — ",
            el("em", null, state.nation),
          ]));
        } else {
          card.appendChild(el("p", { class: "spec-empty-list" },
            "Choisissez une Nation à l'Étape 1 pour avoir une langue native."));
        }

        // Liste des langues choisies (avec ×)
        const choisies = state.langues_choisies || [];
        if (choisies.length) {
          const ul = el("ul", { class: "spec-chosen-list" });
          choisies.forEach((l, i) => {
            ul.appendChild(el("li", null, [
              el("span", { class: "chosen-item-name" }, l.nom),
              el("span", { class: "chosen-item-meta" }, [
                el("span", { class: "chosen-tag" }, "Langue"),
                el("span", { class: "chosen-pp" }, "1 PP"),
              ]),
              el("button", {
                class: "chosen-remove",
                type: "button",
                "aria-label": "Retirer",
                onclick: () => {
                  state.langues_choisies.splice(i, 1);
                  saveState();
                  renderEtape3Specificites();
                  renderEtape3Langues();
                  refreshPPBar();
                },
              }, "×"),
            ]));
          });
          card.appendChild(ul);
        }

        // Bouton ouverture du sélecteur (modal)
        card.appendChild(el("button", {
          class: "btn-add-creation spec-langue-btn",
          type: "button",
          onclick: () => ouvrirSelecteurLangues(),
        }, "Ouvrir le sélecteur de langues →"));

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

    // Théan + autres langues choisies : affichage live
    const choisies = state.langues_choisies || [];
    if (choisies.length) {
      const bloc = el("div", { class: "langue-bloc langue-universelle" }, [
        el("div", { class: "langue-icone" }, "📜"),
        el("div", { class: "langue-content" }, [
          el("strong", null, "Langues supplémentaires (" + choisies.length + " PP) :"),
          el("p", null, choisies.map(l => l.nom).join(", ")),
        ]),
      ]);
      container.appendChild(bloc);
    } else if (langue_univ.nom) {
      // Suggestion : Théan si rien d'autre choisi
      container.appendChild(el("div", { class: "langue-bloc langue-universelle" }, [
        el("div", { class: "langue-icone" }, "📜"),
        el("div", { class: "langue-content" }, [
          el("strong", null, langue_univ.nom + " "),
          el("span", { class: "langue-cout" }, "(1 PP — facultatif)"),
          el("p", null, langue_univ.description),
        ]),
      ]));
    }

    // Indication
    container.appendChild(el("p", { class: "langues-extras" }, [
      el("em", null,
        "Utilisez le bouton « Ouvrir le sélecteur de langues » dans la carte « Langues » " +
        "de l'étape 3 pour choisir vos langues supplémentaires."),
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
