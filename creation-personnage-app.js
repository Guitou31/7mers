(function () {
  "use strict";
  const data = window.CREATION_PERSO_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem;color:#8b3a3a'>Erreur : creation_perso.js introuvable.</p>";
    return;
  }

  // État (session, en mémoire — pas de sauvegarde pour l'instant)
  const state = {
    nation: null,            // nom de la nation choisie
    trait_bonus_nation: null, // trait choisi pour le +1 de Nation
    trait_libre: null,       // trait choisi pour le +1 'à répartir librement'
  };
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
    renderTraits();
    renderNations();
    renderStatsDerivees();
    if (dialog) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }

  // ===== Init =====
  renderIntro();
  renderEtape1Intro();
  renderTraits();
  renderStatsDerivees();
  renderNations();
})();
