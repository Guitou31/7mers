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
    trait_bonus: null,       // trait choisi pour le +1
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

  // ===== Étape 1 : Traits + Nations =====
  // Sélecteur radio style 7ème Mer : 5 cercles, 'TRAIT_BASE' remplis, +1 cliquable si Nation choisie
  function renderTraitRow(traitNom) {
    const desc = (data.traits_descriptions && data.traits_descriptions[traitNom]) || "";
    const isBonus = state.trait_bonus === traitNom;
    const valeur = TRAIT_BASE + (isBonus ? 1 : 0);
    // Génère 5 cercles (rangs 1 à 5)
    const cercles = el("div", { class: "trait-cercles" });
    for (let rang = 1; rang <= 5; rang++) {
      const filled = rang <= valeur;
      cercles.appendChild(el("span", {
        class: "trait-cercle" + (filled ? " is-filled" : "")
                              + (rang === valeur && isBonus ? " is-bonus" : ""),
        title: filled ? "Rang " + rang : "",
      }));
    }
    return el("div", { class: "trait-row" }, [
      el("div", { class: "trait-label" }, [
        el("strong", null, traitNom),
        el("p", { class: "trait-desc" }, desc),
      ]),
      cercles,
    ]);
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
    for (const continent of continents) {
      const nations = data.nations.filter(n => n.continent === continent);
      if (!nations.length) continue;
      const section = el("div", { class: "nations-continent" }, [
        el("h5", { class: "nations-continent-titre" }, continent),
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

    // Description
    if (nation.description) {
      const paras = nation.description.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
      const sec = el("div", { class: "detail-section" }, [el("h3", null, "Description")]);
      paras.forEach(p => sec.appendChild(el("p", { class: "description-paragraph" }, p)));
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
      const isCurrent = state.nation === nation.nom && state.trait_bonus === t;
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
    state.trait_bonus = trait;
    renderTraits();
    renderNations();
    if (dialog) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }

  // ===== Init =====
  renderIntro();
  renderTraits();
  renderNations();
})();
