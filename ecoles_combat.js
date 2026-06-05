// Généré par pdf_ecoles_combat_to_json.py — ne pas éditer à la main
window.ECOLES_COMBAT_DATA = {
  "_meta": {
    "source": "16 Ecoles de combat (16-11-14).pdf",
    "nb_ecoles": 66,
    "nb_exclues_deja_spadassin": 31,
    "nations_uniques": [
      "Avalon",
      "Castille",
      "Cathay",
      "Eisen",
      "Empire du Croissant",
      "Inismore",
      "Marches des Highlands",
      "Montaigne",
      "Nations Pirates",
      "Ussura",
      "Vesten",
      "Vodacce"
    ],
    "repartition_armes": {
      "Escrime (Sabre)": 8,
      "Lances": 2,
      "Fouet": 1,
      "Couteau": 8,
      "Escrime (Rapière)": 5,
      "Pugilat": 4,
      "Escrime (Épée)": 2,
      "Boucliers": 1,
      "Haches": 1,
      "Gant de combat": 1,
      "Atypique / Accessoire": 3
    },
    "repartition_restrictions": {
      "libre": 35,
      "limitee": 15,
      "interdite": 16
    },
    "armes_categories": [
      "Atypique / Accessoire",
      "Boucliers",
      "Couteau",
      "Escrime (Rapière)",
      "Escrime (Sabre)",
      "Escrime (Épée)",
      "Fouet",
      "Gant de combat",
      "Haches",
      "Lances",
      "Pugilat"
    ],
    "restrictions_creation": {
      "libre": "Libre à la création",
      "limitee": "Accès limité à la création (autorisation MJ)",
      "interdite": "Interdite à la création"
    }
  },
  "ecoles": [
    {
      "nom": "Bahol",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Couteau",
      "arme_display": "Couteau",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Combat de rue",
        "Couteau"
      ],
      "description_courte": "L’école de Bahol fut fondée il y a plus de trois cents ans par Bahol lui-même. Comprenant que les hommes avaient la faiblesse de ne pas respirer dans l’eau et étant déjà maître assassin, il basa les t",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Noyer",
          "variante": null,
          "ref": "noyer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Fraternité de Bahol",
        "academies": "Cette école n’est enseignée qu’aux assassins de la Fraternité de Bahol.",
        "description_longue": [
          "L’école de Bahol fut fondée il y a plus de trois cents ans par Bahol lui-même. Comprenant que les hommes avaient la faiblesse de ne pas respirer dans l’eau et étant déjà maître assassin, il basa les techniques de son école sur deux piliers : le couteau et la noyade. En faisant ce choix, il pouvait porter en permanence son arme de prédilection sans attirer l’attention. Il utilisa aussi cette école pour signer certains crimes de sa société secrète en noyant des gens dans des vasques d’eau ou les fontaines des jardins de certains châteaux.",
          "Le principe de base de l’école est de jouer entre le couteau et la main libre, c’est-à-dire, faire en sorte de capter l’attention de l’adversaire d’une main et d’attaquer de la seconde quelle que soit la technique ou l’arme.",
          "Au vu de ses origines, la Guilde des Spadassins a non seulement refusé de reconnaître l’école Bahol, mais elle s’est aussi considérée comme offensée par les techniques “déloyales” employées par Bahol, elle a donc envoyé des Rasoirs dans tout Théah pour rechercher et punir ceux qui en font usage.",
          "La faiblesse de ce style réside bien entendu dans son utilisation de l’eau. Si le spadassin Bahol combat dans un lieu sans étendue d’eau, une partie de ses techniques est inutile. C’est pourquoi les spadassins Bahol cherchent toujours à choisir le lieu d’affrontement."
        ],
        "armes_pdf": "Couteau",
        "specialisations_pdf": [
          "Combat de rue",
          "Couteau"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves de l’école Bahol apprennent à manier le coutelas d’une main et à garder la seconde libre.",
            "regles": "Capables de faire changer leur couteau de main à volonté, ils ne subissent pas les pénalités de main non-directrice. De plus, apprenant à se servir de leur main libre pour attraper leur adversaire afin de le noyer, les apprentis reçoivent une augmentation gratuite lorsqu’ils utilisent leur compétence Noyer."
          },
          "compagnon": {
            "fluff": "Les compagnons Bahol apprennent à attirer l’attention de leur adversaire sur leur main libre afin de pouvoir sournoisement planter leur coutelas pendant ce temps- là.",
            "regles": "Ainsi, les compagnons Bahol bénéficient de deux augmentations gratuites lors d’une attaque au couteau par round de combat."
          },
          "maitre": {
            "fluff": "Maîtrisant parfaitement les distractions en usant de leurs mains, les maîtres Bahol peuvent faire passer leur coutelas d’une main à l’autre si rapidement que l’adversaire a l’impression de voir un couteau dans chaque main.",
            "regles": "Ce faisant, le maître, en plus d’une attaque au couteau, bénéficie d’une attaque gratuite à mains nues (toutes les compétences de combat de rue sont comprises), juste après l’assaut au coutelas, et ce sans que cela lui coûte de dé d’action (cette technique ne peut être utilisée qu’une fois par round). De plus, le maître est devenu un expert pour noyer ses adversaires et gagne ainsi un rang gratuit dans sa technique de combat Noyer (cette dernière peut éventuellement atteindre le rang 6, si ce n’est pas le cas, il pourra l’incrémenter ultérieurement en payant 25 XP)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Blitzen",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Katzbalger et pistolet ou pistolet de duel",
      "arme_display": "Katzbalger et pistolet ou pistolet de duel",
      "armes_categories": [],
      "specialisations": [
        "Escrime",
        "Commandement"
      ],
      "description_courte": "Blitzen (“éclair”) est un style de combat particulièrement détesté par la Guilde des Spadassins pour la bonne raison qu’il mélange allègrement escrime classique et armes à feu, une hérésie de la pire ",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Double parade",
          "variante": null,
          "ref": "double parade",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Eisen.",
        "academies": "En Eisen uniquement, auprès de quelques maîtres d’armes poursuivis par les Rasoirs de la Guilde des Spadassins.",
        "description_longue": [
          "Blitzen (“éclair”) est un style de combat particulièrement détesté par la Guilde des Spadassins pour la bonne raison qu’il mélange allègrement escrime classique et armes à feu, une hérésie de la pire espèce pour les rasoirs de la Guilde. C’est un style qui utilise un sabre dans une main et un pistolet dans l’autre. Les spadassins Blitzen utilisent généralement ce dernier afin de tirer sur l’adversaire avant d’arriver au corps à corps. De plus, ils utilisent très souvent des armes-jouets ; par exemple, des pistolets prolongés d’une lame d’escrime, des épées-pistolets, etc.",
          "Leur formation met l’accent sur la pratique de rapides coups tranchants à l’aide du sabre et sur la prise d’initiative, faisant remarquer que “celui qui contrôle le rythme de la bataille en contrôle aussi le dénouement”. C’est pourquoi ils n’hésitent pas à utiliser certaines techniques qui font froncer les sourcils de tous les aficionados d’une escrime plus classique. En effet, ils n’hésitent pas à utiliser leur arme à feu afin d’effectuer une double parade, avant d’appuyer sur la détente et de faire ainsi feu à une distance des plus rapprochée et meurtrière. Tout cela fait de cette école une des moins appréciées des gentilshommes, mais aussi une des plus efficaces. L’ennui, c’est que les rasoirs de la Guilde des Spadassins cherchent à éliminer tous les praticiens de ce style. Ils sont en tête de leur liste noire (devant les élèves des écoles Rasmussen et Donnerwetter, c’est dire !).",
          "La faiblesse du Blitzen réside dans son attaque à l’aide du pistolet ; un adversaire peut attirer son tir et frapper le canon du pistolet afin d’en détourner le coup vers le sol et de laisser son ennemi dans une position des plus malséante, les flancs non protégés et prêts à subir votre attaque."
        ],
        "armes_pdf": "Katzbalger et pistolet ou pistolet de duel",
        "specialisations_pdf": [
          "Escrime",
          "Commandement"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’escrimeur Blitzen sait utiliser un pistolet dans sa main non directrice sans en subir les pénalités.",
            "regles": "De plus, il bénéficie d’une augmentation supplémentaire pour faire feu sur ses adversaires à bout portant et son pistolet est considéré comme une arme de mêlée."
          },
          "compagnon": {
            "fluff": "Le compagnon Blitzen sait parfaitement utiliser la combinaison de son arme d’escrime et de son pistolet.",
            "regles": "Il peut utiliser le second à la place de la première dans certaines de ses manœuvres ; en particulier Corps à corps et Riposte. Dans le cas de cette dernière technique de combat, il peut effectuer sa défense à l’aide de sa parade (Escrime) et son assaut à l’aide de son attaque (Pistolet). Imaginez la surprise de votre adversaire lorsque sur son attaque, il devra encaisser une décharge de pistolet !"
          },
          "maitre": {
            "fluff": "Un maître Blitzen contrôle le rythme de la bataille.",
            "regles": "Au début de chaque round, il peut choisir de relancer l’un de ses dés d’action dans le but d’obtenir un résultat qui le satisfera davantage - le nouveau résultat devra être conservé quel qu’en soit le résultat. De plus, il maîtrise maintenant parfaitement l’utilisation concomitante d’une lame d’escrime et d’un pistolet. Lorsqu’il effectue une attaque d’escrime, il peut choisir de prendre trois augmentations. Si son attaque porte, il peut utiliser immédiatement son dé d’action suivant pour effectuer un tir à l’aide de son pistolet et effectuer un tir à bout portant en lançant un dé supplémentaire et en gardant deux dés de plus au lieu d’un seul, soit des dommages de 5g5 !"
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Bonita",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Sabre",
      "arme_display": "Sabre",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Le style Bonita enseigne à ses élèves à tenir ferme contre plusieurs adversaires dans l’attente de trouver une chance de fuir. Il est conçu dans le but de tenir les inquisiteurs vindicatifs à distance",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Mur d’acier",
          "variante": null,
          "ref": "mur d'acier",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Gallegos.",
        "origine_texte": "Collège invisible.",
        "academies": "Uniquement auprès d’un maître d’arme du Collège Invisible.",
        "description_longue": [
          "Le style Bonita enseigne à ses élèves à tenir ferme contre plusieurs adversaires dans l’attente de trouver une chance de fuir. Il est conçu dans le but de tenir les inquisiteurs vindicatifs à distance pendant que les assistants rassemblent les notes afin de les sauver. Il s’agit d’une école d’escrime principalement défensive, qui s’appuie sur d’habiles parades pour la défense et un jeu de jambes leste pour fuir. Les élèves de ce style savent quand tenir bon et quand fuir. Ils restent vigilants et cherchent autant que possible à défendre un goulet d’étranglement pour réduire le nombre de leurs adversaires. L’école permet de gagner du temps pour le compte d’un collègue tout en minimisant les risques pour soi.",
          "La faiblesse de cette école est son manque relatif d’agressivité et le mouvement constant de la rapière de parade. Un individu qui connaît cette faiblesse distinguera la cadence des parades et trouvera le moyen de l’exploiter sans crainte d’une contre-attaque."
        ],
        "armes_pdf": "Sabre",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école de Bonita se livrent à un jeu d’attente, guettant attaques et occasions de fuir.",
            "regles": "Vous bénéficiez d’une augmentation gratuite quand vous retenez une action, augmentez le dé en question d’un point au terme de la phase. Ainsi, si vous obtenez un 5 à l’initiative et que vous retenez ce dé lors de la phase 5, il passera à 6 au terme de celle-ci. Vous aurez donc plus de chances d’agir le premier lors de phases ultérieures, ce qui vous permettra de fuir lorsque votre adversaire n’aura guère plus d’actions."
          },
          "compagnon": {
            "fluff": "Le compagnon sait échapper à ses poursuivants et est capable de se préparer à une traque avant même qu’elle ne débute.",
            "regles": "Vous bénéficiez d’une augmentation supplémentaire au début de toute poursuite. En outre, vous pouvez ajouter votre technique de combat Mur d’acier à toute tentative de défense active que vous effectuez avec Parade (Escrime)."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Bonita se font rarement surprendre dans une situation où ils sont incapables de se défendre.",
            "regles": "Lorsque vous êtes à court d’actions, il vous est possible de dépenser un dé d’héroïsme pour effectuer une défense active. En outre, vous gagnez gratuitement un rang dans la compétence Parade (Escrime), qui passe alors à 6."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Bouffe- doublons",
      "origine": "officielle",
      "nations": [
        "Nations Pirates"
      ],
      "arme": "Pistolet",
      "arme_display": "Pistolet",
      "armes_categories": [],
      "specialisations": [
        "Combat de rue",
        "Pistolet"
      ],
      "description_courte": "Bouffe-doublons est l’un des capitaines pirates les plus connus de Théah. Sa férocité sur les mers et son utilisation concomitante de deux pistolets ont gravé son image dans la mémoire collective. Nom",
      "techniques_combat": [
        {
          "nom_base": "Coup d’épaule",
          "variante": null,
          "ref": "coup d'epaule",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Pistolet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’instinct",
          "variante": null,
          "ref": "tir d'instinct",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Pirates.",
        "academies": "Auprès des pirates, sur les bateaux des nombreuses factions maritimes : Seadogs (et corsaires d’autres nations), Gentilshommes de Gosse, Confrérie de la Côte, Crimson Rogers et même Corsaires du Croissant ou Faucons vestens, sans oublier les indépendants.",
        "description_longue": [
          "Bouffe-doublons est l’un des capitaines pirates les plus connus de Théah. Sa férocité sur les mers et son utilisation concomitante de deux pistolets ont gravé son image dans la mémoire collective. Nombreux sont ensuite les coureurs des océans à avoir imité son style et à avoir marché dans ses empreintes.",
          "Ayant été développé dans le feu des batailles et dans l’ivresse de veillées dans les bars, ce style sans protocole est d’une étonnante efficacité. Le style bouffe-doublons est plus un style de dévastation qu’un style de combat.",
          "Il suffit de sortir ses pistolets et de tirer sur toutes les cibles vulnérables, puis de matraquer les survivants avec le pommeau de ses armes jusqu’à ce qu’ils soient tous au sol.",
          "Les spadassins de l’école Bouffe-doublons portent de grandes ceintures où l’on trouve autant de pistolets qu’ils peuvent en mettre. On n’est jamais trop prudent.",
          "Le principe essentiel de l’école Bouffe-doublons est que la meilleure défense réside dans une attaque fournie et vicieuse. Malgré tout, il leur arrive de manquer de pistolets. Comme ils n’apprennent pas à recharger rapidement comme d’autres écoles au pistolet, un pirate de l’école Bouffe-doublons qui a tiré sa dernière balle n’est plus qu’un pirate hurlant et gesticulant comme les autres."
        ],
        "armes_pdf": "Pistolet",
        "specialisations_pdf": [
          "Combat de rue",
          "Pistolet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Pour un tireur Bouffe-doublons, le pistolet est considéré comme une arme de mêlée.",
            "regles": "Il gagne une augmentation gratuite en Attaque (arme à feu) avec un pistolet quand la cible est à portée de mêlée (c’est à dire qu’elle est capable de frapper avec une épée)."
          },
          "compagnon": {
            "fluff": "Un tireur Bouffe-doublons maîtrise parfaitement la technique du tir à deux armes.",
            "regles": "Lancer et garder un dé de dommages supplémentaire lorsque vous tirez à deux pistolets (les dommages passent à 6g5)."
          },
          "maitre": {
            "fluff": "Un maître tireur de l’école Bouffe-doublons est si brutal qu’il pourrait faire blanchir Légion lui-même.",
            "regles": "Pour chaque mort qu’il a causé dans ce round, il gagne un dé lancé gardé supplémentaire sur ses jets d’intimidation."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Braslyn",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Lutte",
      "arme_display": "Lutte",
      "armes_categories": [],
      "specialisations": [
        "Athlétisme",
        "Lutte"
      ],
      "description_courte": "Créée par Braslyn dit l’Imprenable, cette école est basée sur le mouvement, la souplesse et la rapidité, et non comme beaucoup d’écoles de lutte sur la puissance et la fermeté des prises. Tous les mem",
      "techniques_combat": [
        {
          "nom_base": "Céder la place",
          "variante": null,
          "ref": "ceder la place",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lutte",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte de corps",
          "variante": null,
          "ref": "feinte de corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Rompre le combat",
          "variante": null,
          "ref": "rompre le combat",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Dobrynya.",
        "origine_texte": "Ussura.",
        "academies": "Uniquement à Sousdal en Ussura, auprès de Braslyn, son inventeur.",
        "description_longue": [
          "Créée par Braslyn dit l’Imprenable, cette école est basée sur le mouvement, la souplesse et la rapidité, et non comme beaucoup d’écoles de lutte sur la puissance et la fermeté des prises. Tous les membres de Braslyn gagnent dans cette école l’épée de Damoclès Rivalité : école de Yorak (1PP) qui ne leur rapporte rien mais simule leur antagonisme avec l’autre école de lutte de Sousdal.",
          "La méthode de prédilection d’entraînement de Braslyn n’est donc pas très violente. Il utilise un mannequin de bois avec des bras multiples, dont les mouvements permanents sont orchestrés par un second étudiant qui apprend ainsi à quantifier sa respiration pendant que l’autre tente d’éviter les petites bosses et écorchures que pourraient lui occasionner le mannequin.",
          "La faiblesse de cette école, comme beaucoup d’autres, se trouve au cœur des techniques qu’elle enseigne comme une supériorité par rapport aux autres écoles. En l’occurrence, si savoir éviter les attaques de son adversaire est utile, à un moment ou à un autre, le lutteur sera saisi par son adversaire et un pratiquant de l’école Braslyn aura du mal à encaisser les coups s’il ne parvient pas à se dégager."
        ],
        "armes_pdf": "Lutte",
        "specialisations_pdf": [
          "Athlétisme",
          "Lutte"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti Braslyn apprend les bases, c’est à dire éviter le coup et les prises.",
            "regles": "De fait, un apprenti gagne une augmentation gratuite sur sa compétence Jeu de jambes quand il l’utilise en défense active. En outre, il bénéficie d’une augmentation gratuite par Rang de maîtrise dans l’école sur tous ses jets de technique de combat Se dégager."
          },
          "compagnon": {
            "fluff": "Le compagnon de l’école sait que la rapidité n’est pas tout et a appris à rendre son corps le plus souple possible pour tenter de se dégager.",
            "regles": "Le compagnon gagne l’avantage Corps de serpent et reçoit une augmentation gratuite par rang de maîtrise dans l’école sur tous ses jets de technique de combat Feinte de corps."
          },
          "maitre": {
            "fluff": "Les maîtres sont souvent surnommés les anguilles par leurs amis lutteurs, même si les gens de Yorak les appelleraient plus les savonnettes. Toujours est-il qu’ils sont quasiment imprenables.",
            "regles": "Les maîtres Braslyn peuvent passer gratuitement leurs techniques de combat Se dégager et Feinte de corps au rang 6."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Bricquébec",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Pistolet de poche",
      "arme_display": "Pistolet de poche",
      "armes_categories": [],
      "specialisations": [
        "Arnaqueur",
        "Pistolet"
      ],
      "description_courte": "Hector l’Archembault de Bricquebec est un vieil espion qui fut de tous les complots organisés ces trente dernières années. Il connaissait un nombre de secrets impressionnants sur tous les Grands de Mo",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Pistolet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Rompre le combat",
          "variante": null,
          "ref": "rompre le combat",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir à blanc",
          "variante": null,
          "ref": "tir a blanc",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’instinct",
          "variante": null,
          "ref": "tir d'instinct",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Montaigne.",
        "academies": "Dans les milieux interlopes de Théah, ou directement auprès d’Hector l’Archembault de Bricquebec.",
        "description_longue": [
          "Hector l’Archembault de Bricquebec est un vieil espion qui fut de tous les complots organisés ces trente dernières années. Il connaissait un nombre de secrets impressionnants sur tous les Grands de Montaigne, et sur quelques autres. Et ces derniers auraient bien aimé les enterrer avec lui. Roi de la dissimulation et pistolier émérite, il conjugua ces deux talents pour inventer le holster de poignet. Cette invention fait jaillir un pistolet miniature de l’intérieur de la manche, directement dans la main, permettant ensuite de faire feu. Bien que cette arme soit d’une puissance moindre que celle d’un pistolet classique, Bricquebec parvint à compenser son imprécision par la rapidité et la surprise. Passé maître dans l’art de dissimuler ce dispositif, ce dernier lui sauva plusieurs fois la vie avant qu’il ne se décide à l’enseigner à quelques autres espions et amis proches.",
          "Et c’est bien malgré lui que ses techniques se diffusèrent dans les milieux interlopes, en particulier, arnaqueurs, espions et joueurs professionnels, qui voyaient là le moyen de disposer d’une arme à feu invisible et rapidement disponible en cas de problèmes. Aujourd’hui, pour survivre dans son exil vendelar, Bricquebec a décidé d’enseigner ses techniques aux marchands vendelars qui adorent l’idée de disposer “d’un as dans leur manche”.",
          "La faiblesse de cette école repose bien entendu sur le manque de puissance du pistolet de poche et son coup unique. Une fois le projectile éjecté, le tireur Bricquebec se retrouve bien démuni face à un mousquetaire armé d’une rapière affûtée…"
        ],
        "armes_pdf": "Pistolet de poche",
        "specialisations_pdf": [
          "Arnaqueur",
          "Pistolet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à se servir du pistolet de poche de manière à compenser son imprécision.",
            "regles": "En termes de jeu, cela lui permet d’annuler le malus d’une augmentation à tous ses jets de Tirer (Pistolet) lorsqu’il utilise un pistolet de poche. Il apprend également à dissimuler au mieux son arme, bénéficiant ainsi d’une augmentation gratuite par rang de maîtrise sur son jet de Dissimulation."
          },
          "compagnon": {
            "fluff": "Le compagnon de l’école Bricquebec maîtrise le holster de poignet et ne rate que très rarement son arme lorsque celle-ci est éjectée.",
            "regles": "En termes de jeu, le compagnon réduit la pénalité de tir de (rang de maîtrise) augmentations et voit son ND réduit à 5 pour saisir l’arme lors de son éjection. Autant dire qu’en une seule action, le tireur Bricquebec peut dégainer, faire feu et faire mouche."
          },
          "maitre": {
            "fluff": "Le maître de l’école Bricquebec dispose de deux holsters de poignet équipés de pistolets de poche, un pour chaque main.",
            "regles": "Il maîtrise maintenant parfaitement le holster de poignet et peut faire feu simultanément avec ses deux pistolets de poche en même temps qu’il dégaine, sans avoir à effectuer aucun jet complémentaire ni être pénalisé par une quelconque augmentation. Cela lui permet d’infliger 3g3 dés de dommage. Dernier avantage, et non des moindres, son adversaire est toujours surpris par une telle manœuvre, ce qui fait chuter sa défense passive à 5 et devrait ainsi permettre au tireur Bricquebec de prendre des augmentations pour viser une zone sensible ou augmenter ses dommages."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Buslayevich",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Arc court ou arc dissymétrique",
      "arme_display": "Arc court ou arc dissymétrique",
      "armes_categories": [],
      "specialisations": [
        "Arc",
        "Cavalier"
      ],
      "description_courte": "Les archers ussurans sont respectés dans tout Théah. Non pas parce qu’ils ont développé une école de tir à l’arc particulière comme celle de RobinWood en Avalon, mais parce que l’archerie est bel et b",
      "techniques_combat": [
        {
          "nom_base": "Attaque de cavalerie",
          "variante": null,
          "ref": "attaque de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arc",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’instinct",
          "variante": null,
          "ref": "tir d'instinct",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir en V",
          "variante": null,
          "ref": "tir en v",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Ussura.",
        "academies": "Uniquement en Ussura.",
        "description_longue": [
          "Les archers ussurans sont respectés dans tout Théah. Non pas parce qu’ils ont développé une école de tir à l’arc particulière comme celle de RobinWood en Avalon, mais parce que l’archerie est bel et bien un art de vivre en Ussura comme en témoigne cette école d’escrime. Ils la voient moins comme une forme de combat que comme un moyen de rester en vie, chassant et tuant avec une silencieuse efficacité pour se nourrir. Ils bandent leur arc, visent avec soin et ne tirent que lorsqu’ils savent que le trait portera au but.",
          "Toutefois, cette technique ne s’applique pas aux disciples de Volkh Buslayevich.",
          "Buslayevich était un bandit qui tirait à l’arc à dos de cheval. Il sortait des bois en tonitruant, décochait quelques flèches, avec rapidité et précision, s’emparait de ce qu’il voulait puis repartait à toute vitesse. Les rares individus qui survécurent à ses attaques affirmèrent qu’il attaquait promptement et s’en allait encore plus vite qu’il était arrivé. Il enseigna ses méthodes à ses enfants, qui les transmirent à d’autres et on retrouva bientôt ses techniques dans toute la nation.",
          "Lors des rares temps de guerre, les archers montés constituent une force de cavalerie d’élite. L’école de Buslayevich enseigne l’équitation et un style de tir à l’arc réfléchi qui permet à l’élève de tirer rapidement sans perdre de précision. D’ailleurs, ces élèves sont particulièrement précis malgré la philosophie de l’école prétendant que l’archer doit simplement tirer en direction d’une cible plutôt que viser.",
          "La faiblesse de l’école est qu’elle compte sur l’instinct, la vitesse et la manœuvrabilité. Même si ces caractéristiques se révèlent parfois efficaces, elles se retournent contre l’élève face à un adversaire qui saisit mieux la nature du terrain et qui accule l’archer, ce qui limite ses alternatives."
        ],
        "armes_pdf": "Arc court ou arc dissymétrique",
        "specialisations_pdf": [
          "Arc (la compétence avancée Tir à l’arc monté passe  compétence de base)",
          "Cavalier (la compétence avancée  Voltige passe compétence de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école Buslayevich sont les meilleurs archers montés de Théah.",
            "regles": "Les apprentis de cette école bénéficient d’une augmentation gratuite sur tous leurs jets de tir à l’arc au galop et sur toute tentative visant à contrôler leur cheval sans utiliser les rênes."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école Buslayevich sont des experts en équitation et surpassent n’importe quel cavalier.",
            "regles": "L’élève bénéficie d’un nombre d’augmentations gratuites égal à son niveau de Maîtrise sur tous ses jets de Voltige et de Dressage, et de deux augmentations gratuites sur les jets de poursuite effectués à dos de cheval."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école Buslayevich réalisent souvent des exploits d’équitation et de tir à l’arc qui n’ont rien d’humain.",
            "regles": "L’élève gagne un rang en Tir au galop, ce qui fait passer sa technique de combat à 6. En outre, au début de chaque tour, il bénéficie de 3 dés d’héroïsme qu’il ne peut utiliser que tant qu’il a un arc en main ou qu’il est à dos de cheval. Ces dés disparaissent à la fin du combat s’ils n’ont pas été dépensés. Enfin, il bénéficie d’une augmentation gratuite supplémentaire sur les jets de poursuite effectués à dos de cheval (cela en fait donc trois au total)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Caballo Rojo",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Sabre de cavalerie ou lance lourde",
      "arme_display": "Sabre de cavalerie ou lance lourde",
      "armes_categories": [
        "Escrime (Sabre)",
        "Lances"
      ],
      "specialisations": [
        "Cavalier",
        "Escrime",
        "Lances"
      ],
      "description_courte": "L’élève passe trois années complètes en formation. Durant les premiers mois, il essaie diverses montures puis son tuteur décide de celle qui lui convient le mieux. Celle-ci ne le quittera plus durant ",
      "techniques_combat": [
        {
          "nom_base": "Charge de cavalerie",
          "variante": null,
          "ref": "charge de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime ou Lance de cavalerie",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Saut de cheval",
          "variante": null,
          "ref": "saut de cheval",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Castille.",
        "academies": "L’école Caballo Rojo est originaire de Castille et demeure, aujourd’hui encore, peu présente hors de ce territoire. Sa renommée de meilleure école d’escrime à cheval a, en revanche, dépassé les frontières de Castille, et l’école accueille de nombreux élèves étrangers. Elle fut fondée à la fin du siècle dernier avec le rôle de plus en plus prépondérant que prenait la cavalerie dans l’art de la guerre. Le roi Federico Sandoval II eut l’idée de former un corps d’élite équipé de chevaux castillans, connus dans le monde entier pour leurs qualités exceptionnelles. Ce corps se structura très rapidement en école ; il établit son principal lieu d’enseignement dans le sud de la Castille, terre d’élevage privilégiée pour les montures utilisées par les élèves.",
        "description_longue": [
          "L’élève passe trois années complètes en formation. Durant les premiers mois, il essaie diverses montures puis son tuteur décide de celle qui lui convient le mieux. Celle-ci ne le quittera plus durant sa formation et il pourra, s’il en a les moyens financiers, l’acquérir à la fin de ses études. Un pur-sang castillan coûte 1 500 guilders au bas mot.",
          "Le style Caballo Rojo mêle le combat à l’épée et à la lance. Les techniques enseignées ne sont pleinement efficaces que si elles sont pratiquées montées. L’accent est particulièrement mis sur l’esthétique des manœuvres. Le spectacle d’un duel entre deux cavaliers formés à l’école Caballo Rojo est une chose rare et très prisée des connaisseurs.",
          "Être membre de l’école Caballo Rojo requiert un certain niveau de vie. En effet, tous les frais d’entretien de la monture sont à la charge de son cavalier. Cela place une certaine barrière à l’entrée qui limite l’accession à l’école aux nobles et aux bourgeois très fortunés. Une fois admis, il n’existe plus aucune discrimination entre élèves. Caballo Rojo est avant tout une école d’excellence. Bien entendu ne sont sélectionnés que les jeunes gens ayant déjà acquis une certaine dextérité à l’équitation. Un examen de passage est systématiquement pratiqué."
        ],
        "armes_pdf": "Sabre de cavalerie ou lance lourde",
        "specialisations_pdf": [
          "Équitation",
          "Escrime ou Lance de cavalerie (au choix du  joueur entre ces deux derniers)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti de l’école Caballo Rojo est un cavalier émérite, il ne tombe jamais de son cheval pendant un combat, sauf si c’est la monture elle-même qui tombe.",
            "regles": "Même à demi conscient, l’apprenti est capable de se maintenir en selle et de donner l’ordre à son cheval de fuir."
          },
          "compagnon": {
            "fluff": "Lorsque l’élève de l’école Caballo Rojo arrive au rang de compagnon, il devient totalement inséparable de sa monture.",
            "regles": "Tous ses jets en compétences d’attaque ou de défense active entrepris à dos de cheval sont gratifiés de 2 dés supplémentaires (lancés mais non gardés)."
          },
          "maitre": {
            "fluff": "Un maître de Caballo Rojo est un des meilleurs cavaliers au monde. Il fait si bien corps avec sa monture qu’il la dirige aussi bien qu’il dirigerait ses propres jambes et peut se déplacer avec une agilité surprenante durant un duel.",
            "regles": "Tout adversaire, qui tente de l’atteindre et échoue, est totalement exposé et son ND pour être touché tombe à 5 sur la prochaine attaque du cavalier."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Canis",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Fouet",
      "arme_display": "Fouet",
      "armes_categories": [
        "Fouet"
      ],
      "specialisations": [
        "Combat de rue",
        "Piqueux"
      ],
      "description_courte": "Originaire de Casigula Rosa, sur les terres Falisci, Sergio Perroni s’est installé sur les terres Bernouilli il y a quelques années à la demande de la guilde des marchands de cette principauté. Là, il",
      "techniques_combat": [
        {
          "nom_base": "Attaque combinée",
          "variante": null,
          "ref": "attaque combinee",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Fouet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Meute",
          "variante": null,
          "ref": "meute",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Vodacce.",
        "academies": "Installée à Porto Spatia, l’école se compose de trois bâtiments principaux et d’une cour, le tout formant un “U” ouvert sur les quais de la ville. Arborant le blason de l’école (de sable à deux têtes de chien arrachées et adossées d’argent), la porte principale donne directement sur la cour de l’école où se trouvent plusieurs ateliers de dressage (cerceaux, poutres, obstacles, etc.). Une fois dans la cour, on peut voir un bâtiment sur la droite. Il accueille toute l’administration sur deux étages (registres, bibliothèque, adhésion, recrutement, signature de contrat, etc.), ainsi que les quartiers du maître au dernier étage. À l’opposé de cet édifice de pierres se tient son jumeau, décoré à la mode gothique de gargouilles et de petites sculptures. Là, à l’étage on peut trouver les dortoirs des étudiants et, au rez-de- chaussée, les salles de cours. Enfin, au fond de la cour, comme on peut le deviner aux multiples aboiements des molosses, se trouve un bâtiment regroupant les niches et les salles de soins des animaux qui font la réputation de l’école de Canis.",
        "description_longue": [
          "Originaire de Casigula Rosa, sur les terres Falisci, Sergio Perroni s’est installé sur les terres Bernouilli il y a quelques années à la demande de la guilde des marchands de cette principauté. Là, il développa ses talents de piqueux et, depuis maintenant quatre ans, il enseigne à ses élèves le dressage du chien de combat. Son école n’est reconnue par aucune guilde mais elle est tout de même financée par quelques marchands Bernouilli qui envoient certains de leurs hommes étudier les techniques de Sergio Perroni.",
          "Unique au monde, l’école de Canis entend bien le rester et elle pousse ses étudiants et ses chiens à travailler en permanence. C’est ainsi qu’à toute heure du jour et de la nuit les entraînements se poursuivent inlassablement.",
          "La force de cette école est la maîtrise de l’animal, mais aussi le fait que l’étudiant de l’école Canis puisse se battre sans problème aux cotés de ce dernier. Usant ainsi du fouet pour attaquer en même temps que ses chiens, l’étudiant peut paraître totalement invincible s’il est entouré d’une meute. Néanmoins comme toutes les écoles ont leur faiblesse, l’école Canis n’y échappe pas. Si le maître-chien est sans ses animaux il se retrouve déstabilisé en raison de l’habitude qu’il a de compter sur ses compagnons.",
          "L’école est aussi très stricte :  Il est interdit (en tous cas officiellement) que des maîtres-chiens s’affrontent entre eux.",
          " Le changement de rang de maîtrise s’effectue uniquement dans l’école sous le jugement du Grand Maître en personne et est validé à la suite de différentes démonstrations de dressage.",
          " Si un étudiant perd son chien de tête il doit donner 250 guilders à l’école pour en avoir un autre et passer 3 mois à réapprendre les bases avec son nouvel animal.",
          " Bien qu’entraînés aussi dans ce but, il est interdit à deux maîtres-chiens se trouvant dans la même bataille d’être sur le même niveau d’engagement pour des raisons de sécurité."
        ],
        "armes_pdf": "Fouet",
        "specialisations_pdf": [
          "Combat de rue",
          "Piqueux. \n\n “Chien de tête” typique de l’école Canis \n\n (Homme de Main à 15 points) \n\n ND  : 15 \n\n Traits  : Gaillardise 3",
          "Dextérité 2",
          "Esprit 1 (Perspicacité  5)",
          "Détermination 1",
          "Panache 1 \n\n Qualité d’obéissance  : Stable ou Immuable \n\n Coefficient d’apprentissage  : Rapide ou Appliqué \n\n Compétences  : Attaque (morsure) 4g2",
          "Jeu de jambes 2",
          "Dommages (morsure 3g2). \n\n Tours et talents  : au minimum",
          "Attaquer  sur  commande et Répondre à la voix",
          "mais il peut en  connaître encore trois autres compte-tenu de sa  Perspicacité"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti connaît le comportement canin et sait donc comment réagir face à un chien ou un loup.",
            "regles": "Toutes ses actions face à un animal canin se font avec un bonus de deux augmentations et le ND pour être touché du spadassin est augmenté de 5. De plus, il bénéficie gratuitement de l’avantage Entraînement nocturne, et enfin, d’un jet supplémentaire au-delà de la Perspicacité de l’animal sur la table du Potentiel de dressage (reportez-vous au fichier Points de Règle)."
          },
          "compagnon": {
            "fluff": "Le compagnon et ses animaux agissent tellement de concert que leur adversaire a du mal à se concentrer sur sa défense, ne sachant lequel va porter son attaque.",
            "regles": "En termes de jeu, son ND pour être touché diminue de (nombre de chiens x 2), pour un minimum de 5, tandis que sa défense active se voit infliger le même malus. Enfin, le compagnon a droit à deux jets supplémentaires au-delà de la Perspicacité de l’animal sur la table du Potentiel de dressage."
          },
          "maitre": {
            "fluff": "Le maître et son animal de tête se comprennent particulièrement bien.",
            "regles": "L’un des deux peut se jeter devant l’autre pour encaisser les dommages à la place de son ami et ce, en dépensant simplement un dé d’action. Enfin, le maître a droit à trois jets supplémentaires au-delà de la Perspicacité de l’animal sur la table du Potentiel de dressage."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Cappuntina",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Couteau de lancer",
      "arme_display": "Couteau de lancer",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Bateleur",
        "Couteau"
      ],
      "description_courte": "Bien que la guilde des spadassins et beaucoup d’autres cercles ne la reconnaissent pas comme une véritable école, les femmes de Vodacce restent persuadées que le style Cappuntina est un outil très pré",
      "techniques_combat": [
        {
          "nom_base": "Épingler",
          "variante": null,
          "ref": "epingler",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’instinct",
          "variante": null,
          "ref": "tir d'instinct",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Vodacce.",
        "academies": "Le style Cappuntina ne peut s’apprendre qu’auprès des femmes vodaccies, en particulier dans les cercles Nacosto Sorella, mais pas seulement. Il est très difficile pour un homme de se le faire enseigner.",
        "description_longue": [
          "Bien que la guilde des spadassins et beaucoup d’autres cercles ne la reconnaissent pas comme une véritable école, les femmes de Vodacce restent persuadées que le style Cappuntina est un outil très précieux. C’est avant tout une forme d’autodéfense. Le nom vient de “épingle à chapeau” et l’école fut créée à l’attention des femmes seules qui doivent se défendre lorsque leur mari n’est pas dans les environs. Aujourd’hui, elle exploite les couteaux de lancer, qu’une femme peut aisément dissimuler dans sa manche ou attacher dans ses cheveux.",
          "La force principale du style Cappuntina est sa surprenante rapidité. Les élèves apprennent à neutraliser leurs adversaires en leur clouant les mains ou les manches, à leur couper les tendons pour les ralentir et à les frapper lorsqu’ils ne peuvent plus se défendre. Les pratiquants du style Cappuntina apprennent à frapper vite, puis à fuir avant que leurs adversaires n’aient la chance de recouvrer leurs esprits. Les maîtresses Cappuntina peuvent “couper les jarrets” de leurs adversaires avant même qu’ils réalisent être attaqués, puis fuir avant qu’il ne leur faille faire face à une lame.",
          "La faiblesse de l’école de Cappuntina est qu’elle manque de la résistance des autres écoles de spadassins. Si une élève ne peut rapidement neutraliser son adversaire, elle n’aura alors guère plus de chances de l’arrêter."
        ],
        "armes_pdf": "Couteau de lancer",
        "specialisations_pdf": [
          "Bateleur",
          "Couteau (la compétence avancée Lancer  [Couteau] passe compétence de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis du style Cappuntina apprennent à sortir leur arme rapidement et à la lancer dans la foulée.",
            "regles": "Lorsqu’elles lancent un poignard, elles ne sont pas victimes de la pénalité de main non-directrice. Elles sortent et lancent un poignard en une seule et même action. En outre, elles achètent la compétence Lancer (Couteau) comme s’il s’agissait d’une compétence de base."
          },
          "compagnon": {
            "fluff": "Les compagnons du style Cappuntina savent frapper avec plus d’une arme à la fois",
            "regles": ". Lorsque vous dépensez une action pour attaquer, vous pouvez lancer un nombre de poignards égal à votre niveau de maîtrise (compagnon = 2 et maître = 3). Tous les poignards d’une même attaque doivent viser une même cible et vous n’effectuez qu’un jet d’attaque pour tous ceux-ci. S’ils touchent, il s’agit de dommages groupés, à savoir 1g1 par poignard (2 poignards infligent 2g2 de dommages et trois poignards 3g3)."
          },
          "maitre": {
            "fluff": "Les maîtres du style Cappuntina sont capables de neutraliser plus d’un adversaire. Certains sont à même de démolir des bandes de brutes entières d’une seule volée de poignards.",
            "regles": "Lorsque vous devenez maître dans cette école, vous pouvez viser une cible différente par attaque de poignard, mais vous devez alors effectuer des jets d’attaque séparés. En outre, pour chaque poignard que vous décidez de ne pas lancer (sur les trois que vous avez par action), vous obtenez une augmentation gratuite au jet d’attaque de chaque poignard restant."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Chariot de Thespis",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Toutes les lames d’escrime",
      "arme_display": "Toutes les lames d’escrime (Rapière)",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Bateleur",
        "Escrime"
      ],
      "description_courte": "Le Chariot de Thespis rassemble de nombreuses troupes théâtrales qui mettent en scène des pièces historiques ponctuées de féroces duels à travers toute la Montaigne. Le réalisme des scènes d’action et",
      "techniques_combat": [
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Trois techniques au choix",
          "variante": null,
          "ref": null,
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Montaigne",
        "academies": "Au sein des troupes de théâtre de Montaigne.",
        "description_longue": [
          "Le Chariot de Thespis rassemble de nombreuses troupes théâtrales qui mettent en scène des pièces historiques ponctuées de féroces duels à travers toute la Montaigne. Le réalisme des scènes d’action et de combat est tellement saisissant que de nombreux paris sont engagés sur l’éventualité d’un accident mortel… En effet, les comédiens mettent un point d’honneur à devenir le personnage qu’ils interprètent : ne vont-ils pas jusqu’à apprendre les compétences de celui-ci auprès d’un professionnel ?",
          "La faiblesse de cette école réside dans le fait qu’elle copie les autres écoles sans vraiment en saisir l’esprit et la finesse. Elle n’est donc pas capable de reproduire les effets les plus spectaculaires et doit se contenter de manœuvres plutôt simples."
        ],
        "armes_pdf": "Toutes les lames d’escrime",
        "specialisations_pdf": [
          "Bateleur",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend d’abord à reproduire les manières des artisans et des bourgeois, leur tour de main, leur façon de faire.",
            "regles": "L’apprenti gagne 1 XP supplémentaire par session dans une compétence liée à un métier susceptible d’être physiquement reproduit (Danse, Déplacement silencieux, etc.) s’il peut observer un expert (niveau 5 ou 6 dans ladite compétence) en train de la pratiquer pendant au moins une heure. Il peut également dépenser 1 dé d’héroïsme pour reproduire le résultat d’un jet de compétence physique lié à un entraînement. Ce dé est utilisé lors de la phase où est fait le jet de compétence."
          },
          "compagnon": {
            "fluff": "Le compagnon s’entraîne les armes à la main à singer les coups donnés par les hommes en arme.",
            "regles": "Le compagnon gagne 1 XP supplémentaire par session dans une compétence liée à un entraînement s’il observe un expert l’utilisant pendant une heure au moins. Il peut également dépenser 1 dé d’héroïsme pour reproduire le résultat d’un jet de combat. Ce dé est utilisé lors de la phase où est fait le jet de compétence."
          },
          "maitre": {
            "fluff": "Avec un peu de concentration, le maître est maintenant capable de reproduire la moindre subtilité des passes d’armes des plus grands spadassins.",
            "regles": "Le maître gagne 1 XP supplémentaire par session dans une école d’escrime possédée ou non s’il observe un expert dans l’école considérée. Il doit maîtriser les entraînements et métiers exigés par l’apprentissage de base. Il peut également dépenser 1 dé d’héroïsme pour reproduire une technique d’apprenti issue d’une autre école d’escrime qu’il a déjà observée auprès d’un maître de cette dernière. Ce dé est utilisé lors de la phase où est fait le jet de technique de combat."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Charmine",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Éventail",
      "arme_display": "Éventail",
      "armes_categories": [],
      "specialisations": [
        "Courtisan",
        "Éventail"
      ],
      "description_courte": "Tout récemment, une nouvelle école de spadassin s’est développée et gagne un peu de popularité parmi la gent féminine de Théah. Toutefois, cela tient plus à ses inventeurs qu’au style en lui-même. Lor",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Éventail",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Mur d’acier",
          "variante": null,
          "ref": "mur d'acier",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Swanson.",
        "origine_texte": "Société des explorateurs.",
        "academies": "Bien qu’elle soit née au sein de la Société des Explorateurs, Charmine est aussi enseignée aux dames qui souhaitent l’apprendre, mais elles ne sont pas nombreuses à avoir la détermination nécessaire.",
        "description_longue": [
          "Tout récemment, une nouvelle école de spadassin s’est développée et gagne un peu de popularité parmi la gent féminine de Théah. Toutefois, cela tient plus à ses inventeurs qu’au style en lui-même. Lorsque Jeannette de Charmine, une noble dame montaginoise rencontra, lors d’un banquet à la cour en 1667, don Nero Raimundo Ramirez de Guzman, l’ambassadeur castillian qui succédait à don Andrès Bejarano del Aldana, ce fut un véritable coup de foudre. Le Castillian fit la cour à la Montaginoise tout au long de l’année qui suivit avec une telle assiduité que toute la cour bruissait de leur relation. Cependant, le jour où ils décidèrent d’annoncer leur mariage, la guerre éclata entre la Castille et la Montaigne. Chacun dans un camp, leurs familles respectives refusèrent alors de permettre cette union. En réponse, les deux amants fuguèrent et s’enfuirent ensemble pour chercher fortune. Ils seraient morts de faim sans le bruit qu’avait fait leur relation. En effet, les gens qui avaient entendu leur histoire n’étaient que trop heureux de les aider, devinant qu’ils feraient ainsi partie de l’une des plus grandes romances de Théah. Tous ceux qui avaient rencontré le couple avaient vu la façon dont ils faisaient attention l’un à l’autre et personne n’avait le courage de les séparer. Toutefois, les amoureux savaient que le scandale et le romantisme ne font pas une vie. Heureusement, Nero et Jeannette étaient des érudits ; en fait, leur passion commune pour l’archéologie et l’exploration était l’un des piliers de leur relation. Ils intégrèrent alors pleinement la société des explorateurs (dont ils étaient tous deux mécènes) et partirent ensemble à l’aventure. La société était heureuse de les aider, tandis que la célébrité du couple contribuait à attirer de nouveaux mécènes. Malheureusement, Jeannette n’était pas vraiment faite pour l’aventure. Elle portait toujours le style de vêtements que l’on est en droit d’attendre d’une dame de Montaigne, peu importe où elle se trouvait. Comme elle refusait de modifier sa façon de se vêtir, elle s’habitua bientôt à sa robe déchirée et à ses cheveux emmêlés. Elle faisait tout son possible pour, au moins, commencer une aventure dans une tenue décente, même si chaque voyage la conduisait dans la boue et les ronces. Toutefois, ce qui l’irritait profondément, c’était le nombre d’éventails qu’elle devait emporter avec elle. Les délicates créations montaginoises étaient généralement les premières choses à être détruites dans les jungles et les ruines qu’elle et Nero exploraient. C’était, pour elle, un problème ennuyeux car elle appréciait la vie d’aventure qu’elle menait avec son mari, mais elle voulait également pouvoir garder un éventail en état de marche plus de cinq minutes. Nero, en mari dévoué, était sensible à la détresse de sa femme. Pour leur premier anniversaire de mariage, il lui offrit un cadeau spécial. À grands frais, il avait fait faire pour elle un nouvel éventail, qui allait durer. Les ailettes avaient été réalisées avec de fines plaques d’acier, puis avaient été percées de petits trous. Ceux-ci permettaient à la dentelle et au tissu de soie de garder l’éventail assemblé. Il était un peu lourd, mais il était beau et robuste, tout comme la dame elle-même, et Jeannette l’adora. Il leur fallut un peu plus d’un mois avant de remarquer une autre utilisation à cet éventail. Lors d’une expédition dans l’Archipel de Minuit, ils furent attaqués par des indigènes en colère. Nero, pourtant excellent escrimeur, fut débordé, forçant Jeannette à devoir se défendre. Son éventail était la seule arme qu’elle avait sous la main, et elle fut surprise de voir avec quelle facilité elle pouvait parer les lances de ses adversaires. Avec Jeannette en mesure de se défendre, la pression sur Nero se relâcha et ils parvinrent à repousser l’assaut de cette tribu. Le couple comprit alors que l’éventail de Jeannette pourrait servir à des fins plus utiles et débuta le développement de nouvelles techniques permettant de l’utiliser comme une arme. Peu après, ils eurent l’idée d’aiguiser le bord des ailettes, ce qui en fait une arme contondante qui permet de parer lorsqu’il est fermé et une arme tranchante lorsqu’il est ouvert. Nero adapta ensuite certaines de ses techniques de combat de l’école Swanson à l’utilisation de l’éventail pour en faire une arme dangereuse. Bien des gens pensent que l’idée n’est pas aussi originale que le couple l’affirme. Ils insinuent que leurs compétences à l’éventail ont été apprises lors d’un voyage secret au Cathay, où ces choses-là sont censées être monnaie courante. Cependant, rien ne permet d’affirmer que cette rumeur est vraie et elle n’est sans doute rien d’autre que de la jalousie. Il n’y a que quelques maîtres de cette école. Elle est toute récente, et Jeannette et Nero restent rarement au même endroit assez longtemps pour enseigner leurs techniques. Si cette école intéresse quelques dames de la cour, elles manquent de constance et devant la rigueur nécessaire pour apprendre une école de combat, elles changent bien souvent d’avis sur la nécessité de maîtriser l’éventail alors qu’elles peuvent faire jouer à un homme le rôle de garde du corps. Toute personne (homme ou femme) qui maîtrise le combat à la rapière considère bien souvent que cette école n’est rien d’autre qu’une distraction à la mode pour les dames de la cour. La force de l’école, c’est qu’elle utilise une arme inattendue, et que son utilisateur se comporte de manière tout à fait inhabituelle et donc déstabilisante. L’école apprend à utiliser principalement l’éventail afin de se défendre et de maintenir les adversaires à distance. Quant aux attaques, elles sont portées l’éventail ouvert avec de grandes attaques obliques qui permettent d’utiliser le bord tranchant de l’éventail. La faiblesse de ce style est la petite taille des lames d’éventail, qui permet plus de balafrer son adversaire que de lui infliger de véritables dégâts. Une fois que vous connaissez ce style et la variété des attaques possibles avec un éventail, vous pouvez vous maintenir à distance et attaquer lorsque vous voyez une ouverture."
        ],
        "armes_pdf": "Éventail",
        "specialisations_pdf": [
          "Courtisan",
          "Éventail"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Peu de gens s’attendent à une attaque portée avec l’éventail d’une dame.",
            "regles": "Ainsi, vous gagnez une augmentation gratuite sur votre première action du combat (soit une défense active, soit une attaque). Le MJ peut ignorer ce bonus si vous vous battez contre quelqu’un qui se souviendra de vos compétences à l’éventail en raison d’une précédente rencontre. Enfin, vous recevez gratuitement la langue Langage de l’éventail."
          },
          "compagnon": {
            "fluff": "Vous pouvez également utiliser le claquement sonore qui se produit lors de l’ouverture de l’éventail pour surprendre et distraire votre adversaire.",
            "regles": "Vous avez maintenant appris à utiliser votre éventail aussi bien de la main gauche que de la main droite, ce qui vous permet d’ignorer la pénalité de main non-directrice. Vous bénéficiez d’une augmentation gratuite sur vos défenses active et passive. Toutefois, vous ne pouvez utiliser cette technique dans la même phase que celle où vous tentez un Coup de pommeau (car l’éventail doit être fermé) ou tant que votre éventail n’est pas prêt pour le combat."
          },
          "maitre": {
            "fluff": "Vous avez maintenant appris à utiliser simultanément deux éventails dans un combat.",
            "regles": "Vous gagnez un dé d’action supplémentaire à chaque round de combat. La vitesse de vos attaques vous permet également de relancer l’un de vos dés d’action comme si vous possédiez l’avantage Réflexes de combat. Si vous avez déjà cet avantage, il s’ajoute à votre technique de maître, ce qui vous permet alors de relancer deux dés d’action. Enfin, si vous souhaitez combiner cette école avec une autre afin de créer un style de grand-maître, il convient de considérer l’éventail comme un couteau, ce qui peut permettre des combinaisons du type Valroux et Charmine ou Ambrogia et Charmine – voire, encore mieux Hirojosa (qui utilise déjà l’éventail) et Charmine. Il pourrait également être intéressant de créer un style de Grand Maître combinant Charmine et Falisci, mais aucune femme ne s’y est pour le moment essayée."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Chima Gongjian Shou",
      "origine": "officielle",
      "nations": [
        "Cathay"
      ],
      "arme": "Arc court",
      "arme_display": "Arc court",
      "armes_categories": [],
      "specialisations": [
        "Arc",
        "Cavalier"
      ],
      "description_courte": "Chima Gongjian Shou est le style de tir à l’arc monté de précision des cavaliers des steppes du Xian Bei. Il s’agit d’un dérivé de l’école Vahiy de la tribu des Atlar’vahir de l’Empire du Croissant de",
      "techniques_combat": [
        {
          "nom_base": "Attaque de cavalerie",
          "variante": null,
          "ref": "attaque de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Charge de cavalerie",
          "variante": null,
          "ref": "charge de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arc",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’instinct",
          "variante": null,
          "ref": "tir d'instinct",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir en cloche",
          "variante": null,
          "ref": "tir en cloche",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Cathay.",
        "academies": "Chima Gongjian Shou ne peut être appris qu’au sein des tribus du Xian Bei.",
        "description_longue": [
          "Chima Gongjian Shou est le style de tir à l’arc monté de précision des cavaliers des steppes du Xian Bei. Il s’agit d’un dérivé de l’école Vahiy de la tribu des Atlar’vahir de l’Empire du Croissant de Lune. Contrairement à la technique Vahiy, Chima Gongjian Shou n’est pas basé sur la stratégie. Au lieu de cela, c’est plutôt un style de combat de masse où chaque cavalier est libre d’attaquer la cible de son choix. Ses actions individuelles ne nuisent pas à l’unité de sa formation, car elle n’existe pas. De plus, l’indépendance du combattant lui permet d’être à son potentiel maximal même s’il n’a pas une armée avec lui.",
          "Ce style, comme beaucoup de techniques de combat monté, repose sur la capacité à se déplacer rapidement, à harceler ses ennemis, et à se dégager promptement. Parce qu’il tente de minimiser son exposition au feu de l’adversaire, le combattant doit tirer rapidement et avec précision s’il veut optimiser son efficacité. La précipitation est la principale faiblesse de cette école."
        ],
        "armes_pdf": "Arc court",
        "specialisations_pdf": [
          "Arc",
          "Cavalier"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "On enseigne à l’apprenti à ce que chacun de ses tirs fasse mouche.",
            "regles": "Quand vous déterminez les dommages pour une flèche, lancez +1g0 dés par Niveau de Maîtrise (1 pour Apprenti, 2 pour Compagnon, 3 pour Maître). Il peut aussi utiliser Tir d’instinct (Arc) en étant à cheval."
          },
          "compagnon": {
            "fluff": "Les compagnons ont appris à sortir et tirer une flèche en un clin d’œil, même à cheval.",
            "regles": "Quand vous utilisez Tir d’instinct, le ND est simplement le ND pour être touché de votre cible."
          },
          "maitre": {
            "fluff": "Un Maître de l’école Chima Gongjian Shou est comme flou dans un combat, fonçant et frappant tel l’éclair.",
            "regles": "Quand vous êtes à cheval, vous pouvez réduire vos dés d’Action de votre rang dans la technique de combat Charge (jusqu’à un minimum de 1) juste avant la phase 1 de chaque round de chaque combat, au lieu de le faire uniquement avant le premier round."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Courtepointe",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Dague ou poignard",
      "arme_display": "Dague ou poignard",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Malandrin"
      ],
      "description_courte": "Cette école des bas-fonds a été fondée par le célèbre bandit de Charousse qui a voulu perfectionner l’art délicat de l’assassinat. En effet, les élèves de l’école Courtepointe apprennent les mille et ",
      "techniques_combat": [
        {
          "nom_base": "Coup d’épaule",
          "variante": null,
          "ref": "coup d'epaule",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Montaigne",
        "academies": "Dans les bas-fonds de Charousse essentiellement, mais vous pouvez parfois trouver un praticien de cette école au sein des pègres d’autres grandes cités montaginoises.",
        "description_longue": [
          "Cette école des bas-fonds a été fondée par le célèbre bandit de Charousse qui a voulu perfectionner l’art délicat de l’assassinat. En effet, les élèves de l’école Courtepointe apprennent les mille et une manières de tuer avec rapidité et silence le riche bourgeois égaré dans les sombres ruelles de la capitale montaginoise. Le style Courtepointe mise tout sur la surprise et s’avère inutile en situation de combat : les élèves préfèrent alors filer à l’avalonienne en couvrant leur retraite d’une volée de poignards.",
          "La diffusion des techniques enseignées ne dépasse guère la Cour des Miracles mais une rumeur chuchote que les secrets de ce style auraient été révélés à un mercenaire eisenör envers qui Courtepointe avait une dette de vie."
        ],
        "armes_pdf": "Dague ou poignard",
        "specialisations_pdf": [
          "Couteau",
          "Malandrin"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend tout d’abord à rester discret et se cacher de manière opportune.",
            "regles": "Il bénéficie de (rang de maîtrise) augmentations gratuites sur tous les jets impliquant la compétence Guet-apens. Lorsque l’apprenti réussit un jet de Guet-apens, l’adversaire surpris ne peut pousser aucun cri durant un round (+ nombre de rounds égal au nombre d’augmentations prises). De plus, il peut ajouter son rang dans la compétence Guet-apens à tous ses jets lorsqu’il prend un adversaire par surprise."
          },
          "compagnon": {
            "fluff": "Le compagnon sait maintenant jaillir de sa cachette tel un diable de sa boîte pour poignarder son ennemi.",
            "regles": "Lorsque le compagnon réussit un jet de Guet-apens, son adversaire surpris subit un malus de dés lancés égal au rang de maîtrise du compagnon Courtepointe. Et ce, pendant un nombre de rounds de 1 + 1 par augmentation prise."
          },
          "maitre": {
            "fluff": "Le maître apparait si soudainement que sa victime n’a même pas le temps de pousser un cri.",
            "regles": "Un maître Courtepointe bénéficie d’un bonus de +1 à son trait de Panache (“gratuitement”). Ce qui augmente aussi la valeur maximale de ce trait de 1 : ainsi un maître de cette technique pourra avoir un rang 6 (voir 7 avec certains avantages) en Panache."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Desco Numanaius",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Glaive",
      "arme_display": "Glaive",
      "armes_categories": [],
      "specialisations": [
        "Escrime (Épées)",
        "Légionnaire"
      ],
      "description_courte": "Cette école a été développée il y a très longtemps comme une méthode de combat des troupes d’élite de l’Empire numain. Si tous les légionnaires numains savaient se battre, ceux formés au sein de l’éco",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Mur d’acier",
          "variante": null,
          "ref": "mur d'acier",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Empire numain.",
        "academies": "Aujourd’hui complètement anachronique, cette école de combat n’est enseignée qu’à Numa par quelques passionnés d’escrime antique.",
        "description_longue": [
          "Cette école a été développée il y a très longtemps comme une méthode de combat des troupes d’élite de l’Empire numain. Si tous les légionnaires numains savaient se battre, ceux formés au sein de l’école Desco étaient de loin les meilleurs. Généralement, un légionnaire ne pouvait espérer apprendre cette école de combat qu’après avoir survécu à sa septième année de service (un légionnaire s’engageait pour vingt-cinq ans). En tant que tel, ils étaient le plus souvent des vétérans de multiples guerres, l’Empire numain étant souvent en conflit, soit avec des factions internes, soit avec des pays limitrophes.",
          "Aujourd’hui, au milieu du XVIIème siècle, les techniques de l’école Desco sont quasiment perdues. La majorité des Théans, en dehors de quelques érudits de Numa et d’historiens spécialisés dans l’époque de l’Empire numain ne connaissent pas son existence. Son arme favorite, c’est son esprit brutal, et la volonté de durer sans vouloir être à la mode. Pourtant, malgré ses attributs archaïques, il existe un petit groupe d’hommes et de femmes, des nobles de la ville de Numa, en Vodacce, qui étudient les techniques de cette école et ont à cœur de garder vivant les idéaux des légionnaires Desco Numanaius. Leur apprentissage est toutefois limité car les techniques du rang de maître se sont perdues au fil du temps, et aucun document décrivant ce niveau n’a été découvert à ce jour. Les abbayes, les académies et les bibliothèques qui auraient pu contenir de tels livres semblent toutes avoir été détruites par les guerres, les incendies et d’autres tragédies.",
          "Cette école n’enseigne pas seulement une manière de se battre, elle apprend également une manière de vivre rigoureuse, dure et exigeante. Sa force de cette école repose sur la pratique de manœuvres bien coordonnées et rabâchées lors des entraînements. Aussi, le combat en unité est privilégié par les soldats numains qui, ensemble, forment un groupe de camarades soudés, forts, rapides et plus puissants que n’importe qui d’autre. Ainsi, plusieurs membres de cette école combattant ensemble forment un ensemble meurtrier alors qu’un légionnaire seul est bien moins efficace."
        ],
        "armes_pdf": "Glaive",
        "specialisations_pdf": [
          "Épée courte",
          "Légionnaire"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un spadassin Desco est économe en énergie comme en action : ajoutez votre rang de maîtrise au total de votre initiative. Un spadassin Desco est rigoureux, concentré et déterminé et ne se laisse pas facilement intimider :",
            "regles": "ajoutez son rang de maîtrise à tous les jets de Gaillardise qu’il effectue pour encaisser des dommages. Un spadassin Desco est loyal envers ses camarades : ajoutez son rang de maîtrise à la défense active et passive de tous les autres spadassins Desco qui l’entourent, vous obtenez respectivement le même bonus."
          },
          "compagnon": {
            "fluff": "Un spadassin Desco est économe en énergie comme en action :",
            "regles": "il peut dépenser un dé d’action pour gagner un dé lancé non gardé supplémentaire sur n’importe quelle action, en défense comme en attaque, car il attend la bonne occasion. Un spadassin Desco est rigoureux, concentré et déterminé et ne se laisse pas facilement intimider : ajoutez le double de son rang de maîtrise à tous ses jets de dommages. Un spadassin Desco est loyal envers ses camarades : il peut utiliser une action pour effectuer une parade contre une attaque visant un autre spadassin Desco avec lequel il combat sans subir de pénalité."
          },
          "maitre": {
            "fluff": "Le rang de maître a été perdu dans le vent de l’histoire et ne peut être appris par un Théan moderne. Toutefois, pour être complet, voici la description de ce rang au cas où, en particulier après la découverte d’un vieux manuscrit découvrant la technique en question. Il est bien entendu qu’une telle découverte entraînerait immédiatement l’acquisition de l’épée de Damoclès Pourchassé (2 PP) par les membres de l’école Desco Numanaius. Un spadassin Desco est économe en énergie comme en action :",
            "regles": "il peut effectuer une attaque sur une interruption (rappel : une interruption nécessite la dépense de deux dés d’action et permet normalement d’effectuer une défense active). Un spadassin Desco est rigoureux, concentré et déterminé et ne se laisse pas facilement intimider : ajoutez le rang de maîtrise du spadassin en dés lancés non gardés sur tous ses jets de résistance à la peur ou à l’intimidation. Un spadassin Desco est loyal envers ses camarades : si au moins un autre spadassin Desco combat avec le maître, il garde sa défense passive normale lorsqu’il effectue une fente en avant."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Dobrynya",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Lutte",
      "arme_display": "Lutte",
      "armes_categories": [],
      "specialisations": [
        "Athlétisme",
        "Lutte"
      ],
      "description_courte": "Les Ussurans sont célèbres pour leur résistance et leur robustesse. Les guerriers qui choisissent d’étudier au sein de l’école Dobrynya décident d’incarner ces qualités. Leur style de combat ne requie",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lutte",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte de corps",
          "variante": null,
          "ref": "feinte de corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Force d’âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Ussura.",
        "academies": "Uniquement en Ussura.",
        "description_longue": [
          "Les Ussurans sont célèbres pour leur résistance et leur robustesse. Les guerriers qui choisissent d’étudier au sein de l’école Dobrynya décident d’incarner ces qualités. Leur style de combat ne requiert l’utilisation d’aucune arme et ne compte sur aucune entourloupe ou duperie. L’école enseigne à ses élèves à supporter la douleur, à ne pas renoncer face aux épreuves et à sortir d’un combat victorieux grâce aux vertus que sont l’endurance et l’opiniâtreté.",
          "Ces lutteurs s’entraînent énormément en extérieur, le plus souvent sans grand-chose à se mettre sur le dos. Ils s’adaptent donc aux conditions de leur environnement. Chaque matin, ils courent entre dix et vingt kilomètres dans les bois. Leur entraînement consiste à trouver un arbre du bon diamètre, à ôter leur chemise et à étreindre le tronc. Ils exercent autant de force que possible pendant une heure au moins contre l’arbre en question. Ensuite, ils rentrent en courant. Ils s’entraînent malgré le froid, la neige, la pluie ou tout autre souci météorologique.",
          "Le style de combat de l’école de Dobrynya est simple mais efficace. Le lutteur saisit son adversaire et l’étreint à la manière d’un ours jusqu’à ce qu’il perde la vie. Cela prend parfois un certain temps, mais l’élève est patient et suffisamment fort pour attendre et laisser le temps faire.",
          "La faiblesse de cette école est que ses pratiquants doivent approcher leur adversaire pour s’en saisir puis maintenir leur prise. Ceux qui parviennent à éviter la prise du lutteur ont un avantage certain."
        ],
        "armes_pdf": "Lutte",
        "specialisations_pdf": [
          "Athlétisme (la compétence avancée Étreinte passe  compétence de base)",
          "Lutte"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’élève a développé une compréhension avancée des principes de lutte. Il connaît le meilleur moyen de retenir son adversaire et sait tirer le meilleur parti de sa force.",
            "regles": "Un apprenti du style de combat Dobrynya bénéficie d’une augmentation gratuite sur tous les jets de Prise et de Se dégager. En outre, réduisez les dommages infligés par le temps d’un dé lancé et gardé (-1g1) par niveau de maîtrise."
          },
          "compagnon": {
            "fluff": "À ce niveau, l’élève a appris à étreindre son adversaire comme dans un étau, et à resserrer sa prise avec la douleur.",
            "regles": "Quand le personnage subit des dommages qui infligent moins de 2 blessures graves, l’adversaire qu’il étreint subit les blessures d’une Prise. En outre, le personnage bénéficie d’une augmentation gratuite sur tous ses jets de Désarmer (Lutte)."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Dobrynya sont capables de résister à d’incroyables dommages physiques.",
            "regles": "Lorsque vous ratez un jet de blessure, divisez la marge d’échec de moitié (en arrondissant à l’entier inférieur) avant d’autres blessures graves. En outre, vos années passées à étouffer des ennemis ont fait de vous une sorte d’étau vivant. Vous gagnez un rang supplémentaire dans la compétence Étreinte, ce qui la fait passer à 6."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Donnerwetter",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Pistolet ou pistolet de duel",
      "arme_display": "Pistolet ou pistolet de duel",
      "armes_categories": [],
      "specialisations": [
        "Chasseur de primes",
        "Pistolet"
      ],
      "description_courte": "Cette école de pistolet a été développée par Hugo Donnerwetter, un grand chasseur de primes devant l’éternel. Spécialiste des cibles très dangereuses, il avait pris l’habitude lorsqu’il lisait une aff",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Pistolet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir en ricochet",
          "variante": null,
          "ref": "tir en ricochet",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir par-dessus la jambe",
          "variante": null,
          "ref": "tir par dessus la jambe",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Rasmussen.",
        "origine_texte": "Eisen.",
        "academies": "Il n’est, pour le moment, possible d’apprendre cette école d’escrime qu’en Eisen, mais elle se développe rapidement et des maîtres d’arme seront bientôt disponibles à l’étranger.",
        "description_longue": [
          "Cette école de pistolet a été développée par Hugo Donnerwetter, un grand chasseur de primes devant l’éternel. Spécialiste des cibles très dangereuses, il avait pris l’habitude lorsqu’il lisait une affiche sur laquelle était inscrit “Mort ou vif” de la comprendre : “à ramener mort, posera moins de problèmes”. Il tirait d’abord puis posait les questions ensuite. À force de manier le pistolet, il en devint un véritable expert, capable d’utiliser l’environnement pour aider sa balle à transpercer son adversaire. Sur ses vieux jours, il enseigna ses techniques à un jeune très prometteur qui décida ensuite d’enseigner ces techniques plutôt que de continuer les chasses de son maître, il trouvait cela moins dangereux.",
          "Comme pour toutes les écoles d’armes à feu, la faiblesse de cette école réside dans le fait qu’une fois qu’il a tiré ses balles, le spadassin n’est plus dans la meilleure posture qui soit !",
          "De plus, comme pour l’école Rasmussen, ce style est détesté par la guilde des spadassins et tous les prétextes sont bons pour réduire définitivement leurs pistolets au silence."
        ],
        "armes_pdf": "Pistolet ou pistolet de duel",
        "specialisations_pdf": [
          "Chasseur de primes",
          "Pistolet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Le tir, rien que le tir, toujours le tir. D’abord l’apprenti apprend à faire mouche à tous les coups.",
            "regles": "Il peut utiliser un dé d’action pour bénéficier d’un bonus de 1g1 sur ses jets d’attaque et de dommages avec une Arme à feu. Sa portée avec une arme à feu est également augmentée de 5 mètres."
          },
          "compagnon": {
            "fluff": "Le compagnon sait maintenant concentrer son tir sur les points vitaux de sa cible. Ses tirs sont, la plupart du temps, mortels",
            "regles": ". Il peut utiliser un dé d’héroïsme pour abaisser à 5 le seuil de Blessures Graves supplémentaires. Sa portée avec une arme à feu est également augmentée de 15 mètres."
          },
          "maitre": {
            "fluff": "Le maître a passé des heures et des heures à démonter, remonter, charger et décharger son arme. Il la connaît aussi bien que son propre corps.",
            "regles": "Il peut utiliser un dé d’héroïsme pour diminuer son temps de chargement de 10 actions. Sa portée avec une arme à feu est également augmentée de 25 mètres."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Durante",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Tromblon de marine",
      "arme_display": "Tromblon de marine",
      "armes_categories": [],
      "specialisations": [
        "Marine",
        "Fusils"
      ],
      "description_courte": "Durante di Vestini est l’un des oncles du prince Marco Edorado di Vestini, mais il n’a que quatre ans de plus que son seigneur et l’on pourrait presque les prendre pour des frères. Durante a toujours ",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Mousquet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Gros sel",
          "variante": null,
          "ref": "gros sel",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’instinct",
          "variante": null,
          "ref": "tir d'instinct",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir en mouvement",
          "variante": null,
          "ref": "tir en mouvement",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Vodacce.",
        "academies": "Au sein de la flotte Vestini, ou à bord du Crimson Rogers , auprès de Domingo.",
        "description_longue": [
          "Durante di Vestini est l’un des oncles du prince Marco Edorado di Vestini, mais il n’a que quatre ans de plus que son seigneur et l’on pourrait presque les prendre pour des frères. Durante a toujours adoré la mer et il a passé plus de temps sur le pont des navires de la flotte Vestini qu’à Serine ou Fontaine. Durante est ainsi une exception au sein de la famille Vestini, dont les terres sont voisines de l’Eisen et ne communiquent pas avec la mer.",
          "Toutefois, un prince-marchand n’est rien sans sa flotte commerciale et lorsque Gespucci di Bernouilli s’attaqua frontalement aux navires de la Ligue de Vendel, Durante parvint à convaincre son neveu de se joindre à lui. D’abord réticent, Edorado finit par accéder à sa demande et le nomma amiral de la flotte. Mais cessons-là ces digressions pour revenir à l’école Durante.",
          "Dans sa jeunesse, alors que la plupart des nobles vodaccis hantent les palais méridionaux des îles princières, Durante se mesurait à la vie âpre et difficile de marin. De stature plutôt malingre, il craignait sans cesse qu’un affrontement ou un autre avec des pirates, des navires des flottes des autres princes ou d’autres nations ne finisse par mettre un terme à sa palpitante existence.",
          "Il se tourna alors vers les armes à feu qui présentent l’avantage de pouvoir éliminer son adversaire avant qu’il ne soit au contact. Malheureusement, compte tenu de la lenteur du chargement de l’arme et du nombre d’ennemis potentiels que l’on peut affronter lors d’un abordage, ces armes ne permettent d’obtenir qu’un répit, et pas le salut définitif que recherchait Durante.",
          "Vestini en était-là de ses réflexions lorsqu’il rencontra Domingo. Ce marin, encore jeune, mais déjà loup de mer, lui enseigna le maniement du tromblon de marine. Avec cette arme, Durante était capable de toucher plusieurs adversaires en même temps et elle pourrait lui permettre de survivre aux affrontements maritimes.",
          "Afin d’optimiser le potentiel de cette arme, Durante, grâce à l’argent familial et à l’aide de Domingo, expérimenta de nombreuses possibilités et techniques. Finalement, il mit au point un canon assez solide pour supporter le chargement d’autres projectiles que les balles classiques. Partant de ce postulat qui pouvait lui permettre de varier à l’infini ce qui sortirait du canon de son arme, il mit au point plusieurs techniques telles que l’arrosage ou le gros sel.",
          "Fier de ses découvertes, Durante en fit la démonstration à son prince en lui demandant l’autorisation d’appeler cette école de tir au tromblon, école Vestini. Malheureusement, depuis quelques temps, Durante subissait des revers en mer face à la flotte vendelare et n’était plus dans les faveurs de son seigneur. Il refusa donc cette demande arguant du manque de noblesse d’une telle technique, alors que même qu’Alcide di Mondavi envisageait d’octroyer son nom à l’école d’escrime Provolone. Associer son patronyme à une école d’arme à feu serait déshonorant, surtout pour celui que les autres princes considèrent comme l’un des meilleurs acteurs du “Grand Jeu”.",
          "Vexé, Durante décida alors de donner son prénom à cette école au tromblon et l’enseigna à quelques marins de sa flotte. De son côté, Domingo, aigri par son absence de promotion malgré l’aide qu’il avait apportée à Durante, décida de déserter et rejoignit l’équipage de Reis, à bord du Crimson Rogers . Ainsi, petit à petit, l’école Durante (Domingo refuse de l’appeler ainsi) commença à se répandre dans le milieu maritime, en particulier en Vodacce.",
          "La faiblesse de cette école repose sur le manque de puissance du tromblon. Certes, il peut toucher plusieurs cibles, mais il est rarement mortel et, comme toutes les armes à feu, une fois le tromblon déchargé, le tireur se retrouve en position de faiblesse."
        ],
        "armes_pdf": "Tromblon de marine",
        "specialisations_pdf": [
          "Marine",
          "Mousquet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Avant tout, un apprenti de l’école Durante doit être à l’aise sur le pont d’un navire afin d’utiliser au mieux son tromblon contre ses ennemis.",
            "regles": "Un apprenti reçoit gratuitement l’avantage Estomac bien accroché et il annule une augmentation de malus sur ses tirs avec un tromblon lorsqu’il est en mer."
          },
          "compagnon": {
            "fluff": "Un compagnon de l’école Durante appréhende au mieux l’environnement maritime dans lequel il évolue. On lui enseigne également comment charger son arme avec toutes sortes de projectiles. Projectiles bout portant courte portée longue portée Balles 5g4 5g3 3g2 (1) Projectiles anguleux ou pointus 5g4 5g3 3g2 Projectiles métalliques 5g3 5g2 3g2 (1) Projectiles en pierre 5g2 5g2 3g2 (1) Projectiles en bois 5g1 5g1 (1) 3g1 (1) Matières organiques solides 3g1 (1) 3g1 (1) 3g1 (1) (1) Pas de blessures graves possibles, on n’effectue pas de jets d’encaissement, la victime reçoit simplement les blessures légères.",
            "regles": "Un compagnon annule deux augmentations de malus sur ses tirs avec un tromblon lorsqu’il est en mer. De plus, il n’est jamais à cours de munitions, tout ce qui se trouve dans son environnement peut servir de projectiles (couverts de table, cailloux, échardes de bois, etc.). Reportez-vous au petit tableau ci-dessous pour connaître les dommages infligés par ces projectiles variés. (Fourchettes, éclats de silex, pointes de flèches, etc.) (chair humaine, déchets alimentaires, etc.)"
          },
          "maitre": {
            "fluff": "Un maître Durante évolue sur la mer avec une dextérité déconcertante. Il sait également parfaitement réaliser son dosage de poudre en fonction de la quantité et du poids des projectiles qu’il insère dans le canon de son arme rendant ainsi son tir plus mortel.",
            "regles": "Un maître annule trois augmentations de malus sur ses tirs avec un tromblon lorsqu’il est en mer. Contrairement à la règle qui veut que les tromblons n’infligent des blessures graves que tous les 20 points d’échec au jet de blessure, un maître de l’école Durante descend ce seuil à 10 points, comme pour toutes les autres armes à feu."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "El Puñal Oculto",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Sabre et couteau de chasse",
      "arme_display": "Sabre et couteau de chasse",
      "armes_categories": [
        "Escrime (Sabre)",
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Escrime"
      ],
      "description_courte": "El Puñal Oculto est basé sur la célèbre école d’Aldana mais dote d’une seconde arme les manœuvres et bottes rythmiques de ce style, qu’il s’agisse d’un puñal (un poignard à simple tranchant) manié de ",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Aldana.",
        "origine_texte": "Los Vagos.",
        "academies": "Cette école n’est enseignée qu’aux membres de los Vagos.",
        "description_longue": [
          "El Puñal Oculto est basé sur la célèbre école d’Aldana mais dote d’une seconde arme les manœuvres et bottes rythmiques de ce style, qu’il s’agisse d’un puñal (un poignard à simple tranchant) manié de la main non directrice ou d’une dague à ressort installée dans la poignée de la rapière (el puñal del estoque). On tient généralement le puñal contre le bras afin de porter des coups de taille. Bien que l’allonge de cette attaque soit courte, elle rend l’arme moins vulnérable face à une attaque visant à désarmer. Plus important encore, cela cache souvent l’arme aux yeux de l’adversaire, qui ne la voit que lorsqu’il est trop tard. Ce type d’attaque exige de son utilisateur qu’il soit toujours en mouvement. Le spadassin tente de s’approcher autant que possible de son adversaire, bloque son arme et l’achève en usant de son puñal. Comme la plupart des bottes d’El Puñal Oculto s’inspirent de l’école d’Aldana, la majeure partie des adversaires commencent par hésiter, attendant que les mouvements de l’élève paraissent plus prévisibles, et ont une bien mauvaise surprise quand une dague apparaît de nulle part et les transperce.",
          "La faiblesse d’El Puñal Oculto réside dans le fait qu’elle n’offre pas de seconde chance. Une fois la présence du puñal caché révélée, l’effet de surprise est perdu."
        ],
        "armes_pdf": "Sabre et couteau de chasse",
        "specialisations_pdf": [
          "Couteau",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves d’El Puñal Oculto apprennent à se servir de leurs deux mains au combat, ce qui leur permet d’utiliser efficacement leurs deux armes.",
            "regles": "L’apprenti n’est victime d’aucune pénalité de main non directrice quand il utilise un puñal et bénéficie même d’une augmentation gratuite quand il en manie un dans cette même main."
          },
          "compagnon": {
            "fluff": "Les compagnons savent attaquer à l’aide de leur main non directrice quand ils se battent au corps à corps.",
            "regles": "Si vous réussissez une attaque de Corps à corps (Escrime), vous pouvez automatiquement effectuer une attaque au couteau à 1g2 sans pénalité. Quel que soit le résultat de cette attaque gratuite, votre adversaire tombe au sol, face contre terre."
          },
          "maitre": {
            "fluff": "Les maîtres d’El Puñal Oculto font montre d’un grand art pour minuter le moment exact où leur poignard, toujours dissimulé, va infliger le plus de dommages.",
            "regles": "Une fois par combat, un maître peut infliger un coup de pommeau gratuitement, qu’il doit exploiter après une attaque d’Escrime réussie. Les dommages infligés par le biais de cette attaque sont lancés comme s’il s’agissait d’une attaque au couteau normale. Une fois celle-ci menée, le personnage peut effectuer un coup de pommeau supplémentaire plutôt que d’attaquer normalement, dont les dommages sont calculés de la même façon."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Falisci",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Éventail",
      "arme_display": "Éventail",
      "armes_categories": [],
      "specialisations": [
        "Éventail",
        "Courtisane"
      ],
      "description_courte": "Cette école a été inventée par une courtisane de la famille Falisci. Utilisant quotidiennement son éventail, et sachant qu’un couteau dissimulé dans ses vêtements restait dangereux si elle était fouil",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Éventail",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Charmine.",
        "origine_texte": "Vodacce.",
        "academies": "Tout comme l’école Cappuntina, l’école Falisci est surtout destinée aux courtisanes vodaccies de la famille Falisci et est rarement enseignée en dehors de ce cercle.",
        "description_longue": [
          "Cette école a été inventée par une courtisane de la famille Falisci. Utilisant quotidiennement son éventail, et sachant qu’un couteau dissimulé dans ses vêtements restait dangereux si elle était fouillée, elle décida de mettre au point des techniques de combat utilisant l’éventail. Elle avait entendu parler de l’histoire de Jeannette de Charmine, mais elle estimait que le modèle utilisé par la Montaginoise était bien trop lourd pour nombre de bras féminins. Elle prit donc un autre parti, elle fit munir les lattes de l’éventail de lames rétractables qui pouvaient être facilement dégainées en cas de problème. C’est une école idéale pour les soirées habillées qui peuvent dégénérer.",
          "Aujourd’hui elle est intégrée à l’école des courtisanes de la famille Falisci, même Catriana Bella Note, la directrice actuelle, en connaît les bases.",
          "La faiblesse de cette école réside dans le manque de solidité de son arme principale ; en effet, un simple coup un peu violent et bien porté peut détruire l’éventail, laissant alors la demoiselle sans défense."
        ],
        "armes_pdf": "Éventail",
        "specialisations_pdf": [
          "Éventail",
          "Courtisane"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à se servir de son éventail comme d’une arme véritable.",
            "regles": "Il bénéficie d’une augmentation gratuite lorsqu’elle attaque avec son éventail (dégâts équivalents à ceux d’un stylet). Elle utilise son Esprit et non sa Gaillardise pour infliger des dégâts car les blessures qu’elle cause sont plutôt le fait de coups précis en des points vulnérables. Enfin, les multiples lames de l’éventail provoquent mille blessures qui épuisent progressivement l’adversaire : celui-ci subit (niveau de maîtrise) Blessures légères supplémentaires à la fin de chaque tour par attaque ayant infligé des dommages. Enfin, vous recevez gratuitement la langue Langage de l’éventail."
          },
          "compagnon": {
            "fluff": "L’éventail du compagnon devient un véritable papillon d’acier et de soie dont le vol déstabilise l’adversaire.",
            "regles": "L’ennemi perd un nombre de points égal à l’Esprit du compagnon à ses Défenses passive et active. De plus, le compagnon réagit avec une rapidité fulgurante : il peut avancer n’importe lequel de ses dés d’action d’un nombre de phases égal à son rang d’Esprit."
          },
          "maitre": {
            "fluff": "Prenant du recul sur le combat et usant de ses atouts, un maître de l’école Falisci analyse les faiblesses de son adversaire.",
            "regles": "Il bénéficie d’un rang supplémentaire en Esprit ce qui peut amener son score à 6, voire 7 avec certains avantages."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Finnegan",
      "origine": "officielle",
      "nations": [
        "Inismore"
      ],
      "arme": "Pugilat",
      "arme_display": "Pugilat",
      "armes_categories": [
        "Pugilat"
      ],
      "specialisations": [
        "Lutte",
        "Pugilat"
      ],
      "description_courte": "Roary Finnegan est le champion incontesté du combat à mains nues en Inismore. Vous n’avez qu’à lui demander. À lui ou à toutes les personnes qu’il a envoyées au tapis. Cela représente un sacré paquet ",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Pugilat",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Inismore.",
        "academies": "Malgré sa popularité croissante, le style Finnegan n’est, pour le moment, enseigné qu’en Inismore.",
        "description_longue": [
          "Roary Finnegan est le champion incontesté du combat à mains nues en Inismore. Vous n’avez qu’à lui demander. À lui ou à toutes les personnes qu’il a envoyées au tapis. Cela représente un sacré paquet de monde. Depuis quelques années, il enseigne son style de pugilat à toute personne intéressée et qui peut se payer les important frais de “scolarité”.",
          "Finnegan a développé une forme de combat radicalement différente des styles conventionnels de combat aux poings. Au lieu de porter tout son poids sur les talons, il le porte sur la plante des pieds. Au lieu de s’en remettre à des coups rapides, il fait des pas de côté, donne des uppercuts, des coups circulaires et des coups au corps.",
          "La principale faiblesse du style Finnegan est sa tendance à rester en retrait et à observer l’adversaire. Un ennemi offensif peut pousser à l’attaque et faire en sorte que le pugiliste doive toujours se déplacer, sans conserver un bon équilibre."
        ],
        "armes_pdf": "Pugilat",
        "specialisations_pdf": [
          "Lutte",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves du style Finnegan apprennent à frapper fort. Très fort.",
            "regles": "Vos attaques à mains nues infligent 0g2 dés de dommages ou lieu de 0g1."
          },
          "compagnon": {
            "fluff": "Ceux qui apprennent le style Finnegan doivent être prêts à souffrir d’innombrables bleus et os brisés, ce qui les endurcit considérablement et augmente leur capacité à ignorer les blessures.",
            "regles": "Lorsque vous ratez un jet de blessures, divisez votre marge d’échec par deux (arrondie à l’inférieur) avant de subir une quelconque blessure grave supplémentaire."
          },
          "maitre": {
            "fluff": "Pour dire les choses simplement, vous vous battez mieux après avoir bu quelques pintes.",
            "regles": "Les pénalités imposées par les règles d’ébriété ne s’appliquent pas aux maîtres du style Finnegan pour les jets d’attaque et de dommages, ainsi que pour les jets de blessures et les tentatives de défense active. De surcroît, elles se transforment en bonus. Les maîtres ne tombent jamais inconscients à cause de l’alcool. En outre, les Grands buveurs peuvent quand même bénéficier de ces bonus !"
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Guannazar",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Sabre",
      "arme_display": "Sabre",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Bourreau",
        "Escrime"
      ],
      "description_courte": "Javier Guannazar de Torres fut l’un des sadiques les plus infâmes de toute la Castille jusqu’à sa mort prématurée entre les mains des envahisseurs montaginois. Il développa un style d’escrime qui soul",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Force d’âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Villanova.",
        "origine_texte": "Inquisition.",
        "academies": "Cette école ne peut être apprise qu’au sein de l’Inquisition vaticine.",
        "description_longue": [
          "Javier Guannazar de Torres fut l’un des sadiques les plus infâmes de toute la Castille jusqu’à sa mort prématurée entre les mains des envahisseurs montaginois. Il développa un style d’escrime qui souligne son penchant pour la torture et la cruauté, et l’a enseigné au sein de l’Inquisition. S’il ne devint jamais lui-même un chevalier-inquisiteur, il instruisit plusieurs d’entre eux sur les manières les plus fines d’extraire la vérité de la bouche des hérétiques et de leurs défenseurs. Depuis sa mort, ils ont perpétué (perpétré ?) sa mémoire, développé sa doctrine et ajouté des aspects plus subtils de la formation d’un inquisiteur (tel que la lecture du Théan ou l’étiquette).",
          "Le style Guannazar n’a pas de particularités remarquables et emprunte beaucoup de son jeu d’escrime au style Villanova. Un spadassin Guannazar doit connaître parfaitement le système nerveux et les points de douleur du corps humain, aussi bien que les aspects les moins scientifiques du métier de bourreau, faisant de cette école un style particulièrement répugnant, tout spécialement pour ses adversaires et victimes.",
          "La principale faiblesse du style Guannazar est sa concentration sur la douleur. Un spadassin Guannazar doit faire mal à son adversaire et ne fait pas aussi attention qu’il le devrait au jeu d’escrime de son adversaire. Une fente en avant ou une riposte bien placée peut facilement prendre un praticien de ce style par surprise."
        ],
        "armes_pdf": "Sabre",
        "specialisations_pdf": [
          "Bourreau",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis du style Guannazar apprennent à infliger d’atroces petites blessures au lieu d’essayer d’éliminer leur adversaire.",
            "regles": "Lorsque vous réussissez une attaque, vous pouvez échanger votre jet de dommages contre un jet d’Interrogatoire, avec la possibilité d’extraire de cruciales informations ou de casser la volonté de votre adversaire."
          },
          "compagnon": {
            "fluff": "Les compagnons apprennent à inciter leurs adversaires à se repentir et à implorer la pitié et le pardon de l’inquisiteur (ce dont il n’est pas un grand dispensateur).",
            "regles": "Vous pouvez augmenter votre niveau de peur d’un point pour le reste de la scène si vous réussissez un jet d’Interrogatoire avec un ND dont le seuil est la Détermination x 5 de la victime (pour utiliser la compétence Torture, il faudra que les circonstances s’y prêtent, à la discrétion du MJ). Toutes les deux augmentations supplémentaires que vous prenez sur ce jet, vous bénéficiez d’un niveau de peur supplémentaire. Si vous n’aviez pas de niveau de peur avant ce jet, il est maintenant égal à 1 (ou plus avec des augmentations)."
          },
          "maitre": {
            "fluff": "Un maître de l’école Guannazar est capable de tourner et tordre la lame de son arme afin de faire durer la douleur le plus longtemps possible.",
            "regles": "Lorsque vous devez calculer vos dommages, vous pouvez choisir de faire deux jets distincts, chacun d’eux avec une pénalité de 2g1, mais tous les deux utilisant votre Gaillardise. Ainsi, par exemple, un spadassin avec une Gaillardise de 4 devrait infliger 6g2 de dommages à son adversaire ; il pourra cependant choisir d’infliger deux fois 4g1 à la place."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Gustavo",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Sabre de cavalerie",
      "arme_display": "Sabre de cavalerie",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Cavalier",
        "Escrime"
      ],
      "description_courte": "Les fiers cavaliers de Castille sont d’excellents bretteurs, même à cheval. L’école de Gustavo naquit du désir de former des escrimeurs aussi efficaces à pied qu’à cheval. Elle apprend donc à ses élèv",
      "techniques_combat": [
        {
          "nom_base": "Attaque de cavalerie",
          "variante": null,
          "ref": "attaque de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Charge de cavalerie",
          "variante": null,
          "ref": "charge de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Valroux.",
        "origine_texte": "Los Vagos.",
        "academies": "Cette école n’est enseignée qu’aux membres de los Vagos.",
        "description_longue": [
          "Les fiers cavaliers de Castille sont d’excellents bretteurs, même à cheval. L’école de Gustavo naquit du désir de former des escrimeurs aussi efficaces à pied qu’à cheval. Elle apprend donc à ses élèves à se servir d’une épée à dos de cheval. Même si certains restent persuadés qu’une telle tactique manque d’honneur par rapport aux duels classiques, les Castillians les plus pragmatiques, en particulier ceux qui portent un masque blanc grimaçant au plus fort de la nuit, saisissent la valeur de sa souplesse…",
          "La principale force de l’école de Gustavo réside dans sa vitesse dévastatrice et sa capacité à rester hors de portée de l’adversaire. Les élèves apprennent à frapper vite et fort, tirant le meilleur parti de la taille et de la manœuvrabilité de leur monture, puis battant en retraite avant que leur adversaire n’ait l’occasion de contre-attaquer.",
          "Toutefois, quand le cavalier ne peut fuir, les véritables problèmes commencent. Les techniques de l’école de Gustavo n’offrent guère de solution à un combattant qui s’attarde et les cavaliers qui ne disposent pas d’issue de secours sont le plus souvent jetés à terre puis égorgés."
        ],
        "armes_pdf": "Sabre de cavalerie",
        "specialisations_pdf": [
          "Cavalier (la compétence avancée Voltige passe  compétence de base)",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de ce style apprennent à utiliser leur épée à cheval pour tenir leurs adversaires à bonne distance.",
            "regles": "Vous bénéficiez d’un bonus de +10 à votre initiative totale lors du premier tour de tout combat. En outre, lorsque vous utilisez la technique de combat Attaque de cavalerie lors du premier tour de combat, vous lancez et gardez un dé de dommage supplémentaire si vous touchez. Enfin, vous bénéficiez d’une augmentation gratuite lorsque vous tentez de maîtriser votre cheval sans vous servir des rênes. Il vous faut bien évidemment être à cheval pour profiter de tous ces avantages."
          },
          "compagnon": {
            "fluff": "Les compagnons tirent le meilleur parti de leur monture et sont capables de pousser leur cheval à réaliser d’incroyables exploits.",
            "regles": "Vous bénéficiez d’une augmentation gratuite par niveau de maîtrise sur tous vos jets de Voltige et de Dressage, et d’une augmentation gratuite sur les jets de poursuite que vous effectuez à cheval. En outre, vous n’êtes pas victime de la pénalité de main non directrice quand vous maniez une épée à dos de cheval."
          },
          "maitre": {
            "fluff": "Les véritables maîtres de l’école de Gustavo savent attaquer vite et souvent, passant généralement pour des tornades d’acier quand ils fondent sur leurs ennemis.",
            "regles": "Au début d’un tour, vous pouvez décider d’exploiter les actions qui vous sont normalement allouées lors du tour suivant. Ainsi, si votre Panache est de 3, vous pouvez réaliser jusqu’à 6 actions durant ce tour. Néanmoins, si vous dépensez vos 6 dés d’action, vous ne pourrez pas agir au tour suivant. Vous pouvez profiter de cette habilité un tour sur deux. Il n’est pas nécessaire d’être à cheval pour profiter de cet avantage (même si cela est préférable)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Guzman",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Mousquet de précision",
      "arme_display": "Mousquet de précision",
      "armes_categories": [],
      "specialisations": [
        "Guérillero",
        "Fusils"
      ],
      "description_courte": "Spadassin confirmé et tireur d’élite d’exception, Javier Gallegos de Guzman lutta avec acharnement contre l’envahisseur montaginois. Vu ses faibles effectifs, chaque mort était une catastrophe, et il ",
      "techniques_combat": [
        {
          "nom_base": "Camouflage",
          "variante": null,
          "ref": "camouflage",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Mousquet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Observateur",
          "variante": null,
          "ref": "observateur",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir précis",
          "variante": null,
          "ref": "tir precis",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Castille.",
        "academies": "À partir de l’été 1666, au sein de l’unité de guérilleros de Javier Gallegos de Guzman pendant la guerre contre l’envahisseur montaginois. À partir de Primus 1669, à San Juan.",
        "description_longue": [
          "Spadassin confirmé et tireur d’élite d’exception, Javier Gallegos de Guzman lutta avec acharnement contre l’envahisseur montaginois. Vu ses faibles effectifs, chaque mort était une catastrophe, et il chercha un moyen de limiter ses pertes au maximum. Pour cela, il eut finalement recours aux méthodes de guérilla et d’embuscade qui lui permettaient de compenser le désavantage numérique qui était le sien face aux mousquetaires et soldats montaginois.",
          "Dans le même ordre d’idée, afin de pallier le retard technologique qu’il accusait face aux troupes montaginoises, Javier décida de développer un mousquet de précision qui permettrait d’abattre l’ennemi à grande distance et de manière certaine. Plusieurs mois de travail avec des armuriers de talent lui permirent de mettre au point ce que l’on appelle aujourd’hui le mousquet de précision Guzman. Il s’agit d’un mousquet de précision de gros calibre équipé d’une lunette, mais surtout, d’un système de répétition qui permet de tirer à cadence élevée.",
          "D’une grande complexité, cette arme nécessite un apprentissage long et consciencieux pour être correctement maîtrisée. De plus, en raison de son coût, tous les hommes de Guzman ne pouvaient en recevoir un, il fit donc une sélection parmi les meilleurs tireurs, faisant de ses autres hommes, des équipiers fonctionnant en binôme avec les tireurs. Chaque tireur a alors un observateur en renfort qui analyse tous les paramètres ambiants pour maximiser les chances de toucher de celui qui appuie sur la détente.",
          "La faiblesse de cette école réside dans le délai de mise en place. Pour être efficace, un binôme a besoin d’au moins deux ou trois heures pour se placer de manière optimale et installer ses appareils de mesure. Aussi, pris “au débotté”, ils sont faciles à éliminer."
        ],
        "armes_pdf": "Mousquet de précision",
        "specialisations_pdf": [
          "Guérillero",
          "Mousquet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti de l’école Guzman apprend tout d’abord à se placer de manière idéale pour avoir le meilleur angle de tir. On lui enseigne également à observer longuement et à grande distance afin d’être capable d’effectuer des tirs à très longue portée. Avant de devenir un tireur, l’apprenti de l’école Guzman apprend à repérer les détails qui lui permettront d’optimiser un tir. Pour cela, il occupera le poste d’observateur en soutien d’un tireur confirmé et pourra, s’il en a les moyens, commander un mousquet de précision Guzman. Le prix de ce mousquet est de 150 guilders. Au moins deux mois sont nécessaires pour réaliser une telle arme. Dégâts : 6g3 Portée : 125 mètres Modificateurs : courte portée (ND -10), longue portée (ND- 20) Nombre d’actions pour recharger : 2 Prix : 150 guilders Règles spéciales : elles sont plutôt nombreuses compte-tenu des améliorations apportées : - l’arme est précise et permet au tireur de gagner un bonus de +1g0 au jet de Tirer. - l’arme est encombrante et extrêmement difficile à dissimuler, vous êtes pénalisé de cinq augmentations lorsque vous cherchez à la dissimuler. - le mousquet de précision s’utilise avec un affût. Une personne qui appuie son mousquet de précision sur un affût doit passer une action à le positionner avant de tirer. D’un autre côté, si elle se passe de cet affût, elle subit un malus de trois augmentations à son tir. Il est possible de se servir d’affûts improvisés, comme le faite d’un mur, un rocher, un encadrement de fenêtre, etc. - la crosse de l’arme contient de quoi tirer 7 coups pour un pistolet et 15 coups pour un mousquet. Le temps de chargement est réduit à 2 actions et permet donc à un tireur de tirer toutes les 3 actions. À l’issue, le chargement de l’intégralité de l’arme nécessite 140 actions pour un pistolet et 300 actions pour un mousquet. Enfin, comparé aux autres systèmes à chargement rapide, le système à répétition est relativement stable, aussi l’arme ne rencontre- t-elle un problème d’ignition que sur une majorité de “1” ou de “2” sur le jet de tir. - grâce au système du chien indirect, le fusil de précision Guzman n’est sujet à des problèmes d’ignition que si la totalité des dés lancés par le tireur affiche des “1”.",
            "regles": "Il reçoit gratuitement l’avantage Œil de faucon. S’il possède déjà cet avantage, son bonus est doublé. En termes techniques, c’est un mousquet de précision, de gros calibre, à canon long, avec un chien à action indirecte et une détente réglée. Il est également équipé de l’invention de Guzman : le système à répétition et d’une lunette pour observer au mieux sa cible."
          },
          "compagnon": {
            "fluff": "Le compagnon de l’école Guzman s’est familiarisé avec son arme. Il l’utilise depuis plusieurs mois, voire plusieurs années et en maîtrise parfaitement les subtilités techniques (mire, correction, compensation du vent, etc.). Ses gestes sont presque devenus des réflexes et il est capable d’utiliser le système de rechargement à répétition avec une dextérité et une rapidité sans comparaison. Aucun autre utilisateur d’armes à feu de tout Théah ne peut égaler sa cadence de tir.",
            "regles": "Un compagnon de l’école Guzman ne dépense qu’une action pour charger son arme et une seconde pour tirer, ce qui lui permet de faire feu toutes les deux actions."
          },
          "maitre": {
            "fluff": "Un binôme de l’école Guzman est redoutable avec un fusil de précision. Ainsi, lorsqu’un tireur de l’école Guzman peut s’appuyer sur les observations d’un coéquipier également formé dans cette école, il est capable d’effectuer des tirs d’une précision inégalable et mortelle (au sens propre du mot).",
            "regles": "Un maître de l’école Guzman ajoute aux dommages qu’il inflige avec son mousquet de précision le rang dans la technique de combat Observateur de son coéquipier en dés lancés gardés. Exemple : Juan, maître de l’école Guzman, est le tireur et inflige normalement 6g3 dés de dommages. Antonio, apprenti de l’école Guzman, est son observateur, il a un rang 2 dans sa technique de combat Observateur. Juan effectuera donc 8g5 dés de dommages s’il parvient à toucher sa cible grâce à l’appui de son équipier."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Haagen",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Ronçone",
      "arme_display": "Ronçone",
      "armes_categories": [],
      "specialisations": [
        "Arme d’hast",
        "Combat de rue"
      ],
      "description_courte": "Ce style de combat a été mis au point pour affronter un adversaire monté avec plus de facilité. C’est un certain Erich Haagen, sergent d’un Eisenfürst, qui développa ces techniques. Elles sont aujourd",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarçonner",
          "variante": null,
          "ref": "desarconner",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arme d’hast",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Maintenir à distance",
          "variante": null,
          "ref": "maintenir a distance",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Eisen.",
        "academies": "Elle est essentiellement enseignée au sein des unités mercenaires en Eisen.",
        "description_longue": [
          "Ce style de combat a été mis au point pour affronter un adversaire monté avec plus de facilité. C’est un certain Erich Haagen, sergent d’un Eisenfürst, qui développa ces techniques. Elles sont aujourd’hui enseignées dans la plupart des unités mercenaires d’Eisen.",
          "Le pratiquant de cette école utilise une ronçone (même si d’autres armes peuvent faire l’affaire) et se tient fermement sur ses deux jambes. Profitant de la longueur de son arme, il attaque et maintient son adversaire à distance, empêchant ce dernier de pouvoir riposter. Il peut ainsi l’achever tranquillement sans que son belligérant puisse véritablement intervenir. Mais les techniques de cette école sont surtout redoutables contre un adversaire monté sur un cheval.",
          "Malheureusement, cette école a un très gros défaut, ce qui fait justement sa force : la longueur de son arme. En effet, il suffit de passer la lame de la ronçone pour se retrouver très proche du pratiquant de cette école qui ne peut utiliser ses techniques, adaptées pour un combat de loin."
        ],
        "armes_pdf": "Ronçone",
        "specialisations_pdf": [
          "Arme d’hast",
          "Combat de rue"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un apprenti de l’école Haagen apprend à se servir de sa hallebarde contre des adversaires montés",
            "regles": ". Il acquiert un bonus de 5 points à toutes ses actions (et un bonus de 10 à son ND pour être touché) contre un adversaire monté."
          },
          "compagnon": {
            "fluff": "Un compagnon de l’école Haagen apprend à charger avec sa hallebarde et utilise sa vitesse pour frapper son adversaire de la pointe.",
            "regles": "Pour utiliser cette technique, le praticien doit disposer d’au moins dix mètres en ligne droite. Les dégâts qu’ils infligent alors sont augmentés d’un dé (lancé et gardé) et d’un dé supplémentaire toutes les deux augmentations."
          },
          "maitre": {
            "fluff": "Un maître de l’école Haagen peut utiliser l’espace qui se trouve derrière la lame de sa hallebarde afin de tuer et jeter son adversaire au sol. Il feinte une attaque au visage avant de rabaisser rapidement son arme et d’attraper, avec cet espace, la cheville de son adversaire puis de tirer violemment.",
            "regles": "Vous devez réussir une Attaque (Arme d’hast) avec deux augmentations (vous visez ses jambes). Si vous touchez, votre adversaire est violemment projeter au sol sur la tête et encaisse un coup qui peut l’assommer (il doit réussir un jet de Gaillardise contre un ND de 10 + 5 par augmentation au-delà des deux premières). Dans la foulée, vous pouvez frapper votre adversaire au sol sans défense (ND 5) en dépensant un autre dé d’action."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Hammer",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Marteau de guerre",
      "arme_display": "Marteau de guerre",
      "armes_categories": [],
      "specialisations": [
        "Masses",
        "Pugilat"
      ],
      "description_courte": "Cette école d’escrime a été développée par les Nibelungen, les forgerons qui travaillent le Dracheneisen. On y apprend à utiliser de la manière la plus efficace et meurtrière possible le monstrueux ma",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Masse",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Frappe à deux mains",
          "variante": null,
          "ref": "frappe a deux mains",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Lancer",
          "variante": "Marteau de guerre",
          "ref": null,
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Les Nibelungen.",
        "academies": "Seuls les membres des Nibelungen peuvent apprendre l’école Hammer, elle n’est pas enseignée en dehors de leur organisation.",
        "description_longue": [
          "Cette école d’escrime a été développée par les Nibelungen, les forgerons qui travaillent le Dracheneisen. On y apprend à utiliser de la manière la plus efficace et meurtrière possible le monstrueux marteau de forgeron qu’ils utilisent dans leur labeur quotidien.",
          "En effet, manier d’une seule main un marteau si gigantesque que même un Vesten le manierait à deux nécessite beaucoup d’entraînement.",
          "Cette école compense sa lenteur par la puissance de ses coups. Ils frappent peut-être moins que les autres, mais de façon plus violente. Sa faiblesse vient d’ailleurs de cette lenteur et de ce manque de maniabilité chez son pratiquant qui le laisse souvent sans défense après avoir porté un coup."
        ],
        "armes_pdf": "Marteau de guerre",
        "specialisations_pdf": [
          "Masse",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les années passées à apprendre le travail de la forge ont rendu le spadassin plus endurant et plus résistant à la chaleur.",
            "regles": "Vous diminuez de 10 blessures légères tous dégâts infligés par de la chaleur ou du feu. De plus, vous lancez et gardez un dé supplémentaire pour encaisser des dommages."
          },
          "compagnon": {
            "fluff": "Un compagnon connaît les faiblesses du Dracheneisen et sait comment frapper pour que son marteau entre en résonance avec la pièce d’armure qu’il cogne,",
            "regles": "annulant ainsi la protection de cette dernière et ajoutant un dé (à lancer et à garder) de dommages supplémentaire à l’encontre de tout porteur d’armure en Dracheneisen."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école Hammer comptent parmi les hommes les plus forts de tout Théah.",
            "regles": "Lorsque vous atteignez ce niveau, vous gagnez un rang de Gaillardise. Cela augmente également votre rang potentiel d’un point en Gaillardise. Ainsi, un maître de l’école Hammer peut voir sa Gaillardise monter à 6 (voire 7 avec l’avantage Trait légendaire)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Höpken",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Arbalète à étrier",
      "arme_display": "Arbalète à étrier",
      "armes_categories": [],
      "specialisations": [
        "Arbalète",
        "Athlétisme"
      ],
      "description_courte": "L’invention de l’arbalète fut à la fois une malédiction et un don du ciel pour l’Eisen. Son carreau est capable de percer une armure complète en Dracheneisen, un exploit que les arcs ne peuvent imiter",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arbalète",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir en cloche",
          "variante": null,
          "ref": "tir en cloche",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Eisen.",
        "academies": "L’école Höpken est enseignée uniquement en Eisen.",
        "description_longue": [
          "L’invention de l’arbalète fut à la fois une malédiction et un don du ciel pour l’Eisen. Son carreau est capable de percer une armure complète en Dracheneisen, un exploit que les arcs ne peuvent imiter. Et même s’il s’agissait d’une arme chère, elle permit d’aligner sur les champs de bataille les paysans peu ou pas entraînés.",
          "L’un de ces paysans, un homme répondant au nom d’Adrian Höpken, devint si habile à l’arbalète qu’il enseigna ses techniques à une multitude d’élèves avides une fois la guerre de la Croix terminée.",
          "Le style de Höpken touche plus précisément à la précision du tir et à la rapidité du rechargement de l’arme. En outre, Adrian réalisa une arbalète lourde de grande puissance plus à même encore de percer les armures en Dracheneisen. Grâce à un système d’engrenages et à un objet rappelant un chausse-pied, Adrian enseigne à ses élèves à recharger aussi vite que l’éclair.",
          "Toutefois, la faiblesse de cette école réside précisément dans les outils qu’elle utilise. En effet, l’arbalète n’est efficace que lorsque son utilisateur est un minimum immobile. En outre, le système de tir provoque un petit bruit sec juste avant le départ du carreau, ce qui permet à un adversaire preste et vigilant de l’éviter."
        ],
        "armes_pdf": "Arbalète à étrier",
        "specialisations_pdf": [
          "Arbalète",
          "Athlétisme"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école de Höpken connaissent quelques trucs dont ils se servent lorsqu’ils tirent à l’aide d’une arbalète.",
            "regles": "Quand vous touchez, vous lancez un dé de dommages supplémentaire (pour un total de 3g3) et pouvez acheter la compétence Recharger (Arbalète) comme s’il s’agissait d’une compétence de base."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école de Höpken savent tirer le meilleur parti de l’arbalète. Ils tirent donc plus loin et avec une plus grande précision qu’un utilisateur inexpérimenté.",
            "regles": "La portée de votre arbalète augmente de 10 mètres, et ses modificateurs de courte et longue portée sont respectivement de 0 et –5 (au lieu de –5 et –10). En outre, il vous est possible de réaliser une arbalète lourde qui inflige 4g3 de dommages plutôt que 3g3. Elle coûte 5 000 guilders. Quiconque a une Gaillardise inférieure à 4 doit dépenser 3 actions supplémentaires pour recharger cette arbalète."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Höpken sont généralement rangés parmi les meilleurs arbalétriers de Théah (avec ceux de l’école de Ricardo).",
            "regles": "La portée de votre arbalète augmente de 15 mètres, et ses modificateurs de courte et longue portée sont respectivement de +5 et 0. Enfin, vous pouvez passer votre compétence Recharger (Arbalète) du rang 5 au rang 6, réduisant ainsi votre temps de rechargement à 0, ce qui vous permet de tirer à chaque action."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Kensington",
      "origine": "officielle",
      "nations": [
        "Avalon"
      ],
      "arme": "Pugilat",
      "arme_display": "Pugilat",
      "armes_categories": [
        "Pugilat"
      ],
      "specialisations": [
        "Combat de rue",
        "Pugilat"
      ],
      "description_courte": "Un seul type de combattant à mains nues vous décrira les boxeurs Finnegan comme un style immoral : les pugilistes de l’École Kensington (aucun boxeur de Finnegan ne dira qu’il combat de manière malhon",
      "techniques_combat": [
        {
          "nom_base": "Assommer",
          "variante": null,
          "ref": "assommer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Pugilat",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Force d’âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Avalon",
        "academies": "On peut apprendre l’école Kensington en se rendant en Avalon.",
        "description_longue": [
          "Un seul type de combattant à mains nues vous décrira les boxeurs Finnegan comme un style immoral : les pugilistes de l’École Kensington (aucun boxeur de Finnegan ne dira qu’il combat de manière malhonnête ; les actes sont plus forts que les mots, et pourquoi détruire la surprise en en parlant trop ?).",
          "Lord Sterling Kensington tint 57 rounds face à Roary Finnegan et chacun de ces assauts était un exemple de tout ce que l’Inish était capable d’inventer en matière de “magouille, roublardise, coups douteux et railleries agressives”. Finalement, Kensington fut battu par KO au 58ème round.",
          "Alors, Kensington décida de codifier la pratique du sport à mains nues dans les îles Glamour en s’inspirant des règles de la Guilde des Spadassins. Dans ce but, il publia en 1668 un livre intitulé : “Lord Kensington’s Theory of Well- Mannered, Orderly Pugilisms and Fist Battle, with a new Introduction by Dr. Heinrich Stoss” (les théories de Lord Kensington sur le combat à mains nues, le pugilat et le combat aux poings, avec une nouvelle introduction du docteur Heinrich Stoss) et ouvrit un salon pour enseigner ses techniques à Carleon.",
          "Parmi ses enseignements : n’utiliser que les poings ; ne pas frapper son adversaire en dessous de la taille ; les coups portés aux endroits vulnérables (en particulier les parties génitales, et pour les femmes, la poitrine) sont interdits et sont considérés comme de la fraude ; se tenir à une distance d’un pas de son adversaire ; et la liste continue… Cependant, Kensington ne surveille pas constamment les cours donnés dans son école (c’est le résultat du grand nombre de coups qu’il a reçu dans sa vie et qui le cloue régulièrement au lit), et ses instructeurs en profitent pour enseigner des manœuvres interdites mais tellement pratiques….",
          "En développant son style de combat à mains nues, Lord Kensington utilisa sa grande force : il envoyait de violents directs et il encaissait sans broncher ceux de son adversaire. Au cours des premières séances de développement de ces techniques, il se rendit compte qu’un violent coup porté à la mâchoire ou au foie pouvait mettre KO son adversaire. La sagesse lui dicta alors d’enseigner à ses élèves d’éviter ces coups violents plutôt que de les encaisser en ayant recours à des déplacements latéraux (pour ne pas copier les mouvements circulaires de Finnegan).",
          "Les étudiants du style Kensington s’appellent entre eux “boxers” (de l’Avalonien box, qui veut dire boîte) en raison de leur tendance à se déplacer de manière linéaire et latérale, un peu comme s’ils suivaient les lignes d’une boîte. Les boxeurs de l’École Kensington cherchent régulièrement la confrontation avec les pugilistes de l’École Finnegan afin de prouver la supériorité de leur style sur celui du vieil Inish.",
          "Un combattant de l’École Kensington a tendance à garder ses poings très haut, afin de protéger son visage, puis de décaler, sans interruption, son poids d’une jambe sur l’autre. Cette position lui permet de se baisser rapidement si le besoin s’en fait sentir, de lancer un direct ou d’envoyer un uppercut très facilement. Les boxeurs envoient des coups très violents qui ont tendance à blesser leurs propres poings dans le processus ; pour lutter contre cela, ils portent maintenant des gants en cuir renforcés aux articulations.",
          "Les faiblesses de Kensington sont de trois types. Tout d’abord, ils ont tendance à concentrer leurs coups sur le visage de leur adversaire, ainsi un opposant familier de ce style pourra y concentrer sa défense.",
          "Ensuite, parce Kensington fait appel à son jeu de jambes avant de porter un coup, un adversaire peut ainsi prévoir le moment où ce dernier va porter une attaque et se défendre de manière appropriée.",
          "Enfin, la dernière faiblesse de cette école réside dans sa croyance inébranlable en l’honnêteté de ses adversaires. Ainsi, ils n’utilisent eux-mêmes que les techniques autorisées par Kensington, mais c’est une faiblesse que l’on corrige rapidement après quelques KO non réglementaires…"
        ],
        "armes_pdf": "Pugilat",
        "specialisations_pdf": [
          "Combat  de  rues",
          "Pugilat  (Uppercut  devient  une  compétence de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "La première étape de la formation d’un boxeur de l’École Kensington consiste à le frapper violemment et sans ménagement jusqu’à ce qu’il parvienne à éviter les coups.",
            "regles": "Ainsi, le boxeur bénéficie de un dé lancé non gardé supplémentaire par rang de maîtrise sur ses défenses actives lorsqu’il utilise la compétence Jeu de jambes. Ensuite, puisque les rounds d’affrontement des boxeurs prennent fin si l’un d’entre eux tombe au sol, ils apprennent à rester bien stables sur leurs pieds : contre une tentative d’utilisation de la manœuvre Corps à corps, le boxeur bénéficie du même bonus que précédemment, mais ses dés sont cette fois-ci gardés (et non lancés). Enfin, l’apprenti ignore les pénalités de main non directrice pour toutes les attaques à mains nues liées aux entraînements Pugilat ou Combat de rues (à l’exception du Coup de pied et d’Attaque : armes improvisées)."
          },
          "compagnon": {
            "fluff": "Les enchaînements d’attaques d’un compagnon boxeur sont particulièrement dévastateurs, car chaque coup est préparé de manière à sonner l’adversaire.",
            "regles": "Toutes les fois qu’un compagnon inflige une blessure grave, il réduit également l’Esprit de son adversaire de 1 rang jusqu’à la fin du round. Un boxeur qui inflige plus d’une blessure grave sur une seule attaque réduit l’esprit de son opposant de 1 rang par blessure grave sans pouvoir toutefois le faire descendre en dessous du rang 1."
          },
          "maitre": {
            "fluff": "Avant d’avoir atteint le rang de Maître, un boxeur Kensington a encaissé une quantité de coups de poings incroyables d’adversaires à la puissance musculaire hors norme et en a lui-même distribué plus que sa part…",
            "regles": "Ainsi, le maître gagne un rang gratuit sur ses techniques de combat de Force d’âme et Direct. Ces techniques de combat peuvent atteindre le rang 6. Si ce n’est pas le cas, elles le pourront ultérieurement contre un coût de 25 XP pour passer du rang 5 au rang 6."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Ki Kwanji",
      "origine": "officielle",
      "nations": [
        "Cathay"
      ],
      "arme": "Art martial offensif",
      "arme_display": "Art martial offensif",
      "armes_categories": [],
      "specialisations": [
        "Arts martiaux offensifs",
        "Pugilat"
      ],
      "description_courte": "Ki Kwanji est un art martial récent, créé depuis une cinquantaine d’années. Contrairement aux autres arts martiaux, qui sont destinés à la défense ou à des exercices spirituels, ce style s’est dévelop",
      "techniques_combat": [
        {
          "nom_base": "Coup de pied réflexe",
          "variante": null,
          "ref": "coup de pied reflexe",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup de pied sauté",
          "variante": null,
          "ref": "coup de pied saute",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Enchaînement",
          "variante": null,
          "ref": "enchainement",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Art martial offensif",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Cathay.",
        "academies": "On ne peut apprendre l’école Ki Kwanji que dans la province du Lanna.",
        "description_longue": [
          "Ki Kwanji est un art martial récent, créé depuis une cinquantaine d’années. Contrairement aux autres arts martiaux, qui sont destinés à la défense ou à des exercices spirituels, ce style s’est développé comme un sport. Il y a des tournois organisés au Lanna où deux hommes échangent des coups de poing et des coups de pied jusqu’à ce que l’un des deux soit K.O., et ce style s’est répandu en dehors de ces compétitions brutales.",
          "Il s’agit d’un style de combat très agressif, mais avec un nombre de mouvements assez limité, ce qui le rend assez prévisible, mais toujours difficile à affronter et divertissant pour ceux qui aiment ça."
        ],
        "armes_pdf": "Art martial offensif",
        "specialisations_pdf": [
          "Arts martiaux offensifs",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les mains des Apprentis bougent aussi vite que l’éclair.",
            "regles": "Vos Attaques (Pugilat) et Attaque (Arts martiaux offensifs) sont considérées comme étant une seule et même compétence : Attaque (Ki Kwanji). Cela signifie que, comme votre apprentissage comprend les entraînements Arts martiaux offensifs et Pugilat, vous démarrez avec Attaque (Ki Kwanji) à un rang de 2, avant même de dépenser des PP sur ces compétences."
          },
          "compagnon": {
            "fluff": "Le Compagnon attaque son ennemi pendant la préparation de ses attaques, avant même qu’il ait pu les lancer.",
            "regles": "Vous gagnez un rang gratuit en Coup de pied réflexe, ce qui peut porter votre rang à 6. Si ce n’est pas le cas, vous pourrez le faire passer plus tard de 5 à 6 en dépensant 25 XP."
          },
          "maitre": {
            "fluff": "Le Maître donne des coups de pied bas en sautillant, puis en frappant tibia contre tibia.",
            "regles": "Pour effectuer une telle attaque, faites un Coup de pied normal, que vous ne pourrez pas localiser. Si vous réussissez votre coup, votre adversaire encaisse automatiquement une Blessure Grave, puis vous lancez votre jet de dommages comme d’habitude."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Kippe",
      "origine": "officielle",
      "nations": [],
      "arme": "Épée longue",
      "arme_display": "Épée longue",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime",
        "Combat de rue"
      ],
      "description_courte": "Cette école située en Pösen forme les mercenaires les plus aguerris d’Eisen. Polyvalence et pragmatisme en sont les maîtres mots de cette école et transparaissent dans leur style de combat. En effet, ",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Double parade",
          "variante": null,
          "ref": "double parade",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Prise de bras",
          "variante": null,
          "ref": "prise de bras",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "Eisen",
        "origine_texte": "",
        "academies": "L’école Kippe n’est enseignée que dans l’académie du même nom.",
        "description_longue": [
          "Cette école située en Pösen forme les mercenaires les plus aguerris d’Eisen. Polyvalence et pragmatisme en sont les maîtres mots de cette école et transparaissent dans leur style de combat. En effet, l’élève manie l’épée longue et une arme improvisée d’une poigne vigoureuse fort susceptible de troubler un adversaire épris d’honneur. De plus, l’élève fait montre d’une grande souplesse tactique sur le champ de bataille et s’avère efficace dans de nombreuses situations de combat car il maîtrise une large palette d’entraînements.",
          "Les élèves de cette Académie militaire constituent l’essentiel des officiers subalternes de l’armée de la Pösen. Envisager une carrière d’officier exige la rapide acquisition du métier Commandement. Cependant, la fin de la Guerre de la Croix a favorisé la pratique du mercenariat…"
        ],
        "armes_pdf": "Épée longue",
        "specialisations_pdf": [
          "Escrime",
          "Combat de rue"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "L’apprenti possède gratuitement l’avantage Académie militaire et bénéficie d’une réduction de 2 PP sur l’avantage Charge. Il ne souffre pas de la pénalité de main non directrice avec une arme improvisée."
          },
          "compagnon": {
            "fluff": "",
            "regles": "Le compagnon acquiert l’avantage Vétéran suite à ses nombreuses campagnes. De plus, forgé par le feu et le sang de multiples batailles, le compagnon sait réagir avec pragmatisme lorsqu’une de ses attaques ou parades échoue : en dépensant un dé d’héroïsme, il peut relancer ce jet. Ce talent exige que le compagnon utilise une arme dans sa main non directrice pour être effectif."
          },
          "maitre": {
            "fluff": "Le maître est à l’apogée de sa carrière d’officier que ce soit dans l’armée régulière ou une compagnie de mercenaires :",
            "regles": "sa Gaillardise gagne un rang et peut atteint le rang 6. Le maître connaît de nombreuses ruses de guerre qui troublent l’adversaire : en dépensant un dé d’héroïsme, il peut faire relancer le jet d’Attaque ou de Défense Active de l’adversaire. Ce talent exige que le maître utilise une arme dans sa main non directrice pour être effectif."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Kiriakin",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Épieu de chasse",
      "arme_display": "Épieu de chasse",
      "armes_categories": [
        "Lances"
      ],
      "specialisations": [
        "Lances",
        "Veneur"
      ],
      "description_courte": "Ce style de combat a été développé par Andréï Nikolaïevitch Kiriakin, le grand veneur du Gaius. Le spadassin combat à l’aide d’un épieu de chasse et d’un compagnon à quatre pattes, le plus souvent un ",
      "techniques_combat": [
        {
          "nom_base": "Attaque combinée",
          "variante": null,
          "ref": "attaque combinee",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Détourner l’attention",
          "variante": null,
          "ref": "detourner l'attention",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lance légère",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Teginbek.",
        "origine_texte": "Ussura.",
        "academies": "L’école Kiriakin n’est enseignée qu’en Ussura, à des personnes proches des bêtes et possédant déjà un compagnon animal susceptible de les appuyer au combat.",
        "description_longue": [
          "Ce style de combat a été développé par Andréï Nikolaïevitch Kiriakin, le grand veneur du Gaius. Le spadassin combat à l’aide d’un épieu de chasse et d’un compagnon à quatre pattes, le plus souvent un loup ou un chien, même si un chat sauvage ou un ours peuvent faire l’affaire.",
          "Les techniques principales de ce style consistent à détourner l’attention de son adversaire pendant que son allié porte un coup. Suivant les partenaires, le caractère et les techniques privilégiées de chaque binôme, ce peut être l’animal qui détourne l’attention et le spadassin qui porte l’attaque ou inversement.",
          "Affronter deux adversaires se connaissant parfaitement et rompus aux techniques de combat est redoutable pour tout duelliste, mais ici encore plus, car il est particulièrement difficile de prévoir ce que va faire un animal, même dressé.",
          "La faiblesse de ce style vient du lien qui unit maître et animal. Blessez ou tuez l’animal et le spadassin sera incapable de se battre correctement et efficacement et vous pourrez en venir facilement à bout."
        ],
        "armes_pdf": "Épieu de chasse",
        "specialisations_pdf": [
          "Lance légère",
          "Veneur"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti connaît le comportement animal et sait donc comment réagir face à un adversaire bestial.",
            "regles": "Toutes ses actions face à un ennemi animal se font avec un bonus de deux augmentations et le ND pour être touché du spadassin est augmenté de 5."
          },
          "compagnon": {
            "fluff": "Le compagnon et son animal agissent tellement de concert que",
            "regles": "leur adversaire a du mal à se concentrer sur sa défense, ne sachant lequel va porter son attaque, aussi son ND pour être touché diminue-t-il de 10 (minimum 5) tandis que sa défense active se voit affligée d’un malus de deux augmentations."
          },
          "maitre": {
            "fluff": "Le maître et son animal se comprennent particulièrement bien.",
            "regles": "L’un des deux peut se jeter devant l’autre pour encaisser les dommages à la place de son ami et ce, en dépensant simplement un dé d’action."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "La Gouge",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Pugilat",
      "arme_display": "Pugilat",
      "armes_categories": [
        "Pugilat"
      ],
      "specialisations": [
        "Combat de rue",
        "Pugilat"
      ],
      "description_courte": "C’est un style de combat très particulier qui a été développé par les bûcherons, chasseurs et trappeurs de Podshiversk en Ussura. Ces individus durs aux conditions de vie impitoyables sont connus pour",
      "techniques_combat": [
        {
          "nom_base": "Coup bas",
          "variante": null,
          "ref": "coup bas",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Défigurer",
          "variante": null,
          "ref": "defigurer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Pugilat",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Ussura.",
        "academies": "Il faut avoir appris à se battre dans la ville ussurane de Podshiversk.",
        "description_longue": [
          "C’est un style de combat très particulier qui a été développé par les bûcherons, chasseurs et trappeurs de Podshiversk en Ussura. Ces individus durs aux conditions de vie impitoyables sont connus pour leur sauvagerie. Le but de la Gouge n’est pas simplement de gagner – c’est d’estropier son adversaire de manière permanente.",
          "Un spadassin de cette école se bat à mains nues et utilise tout ce qui lui tombe sous la main et tous les coups bas imaginables pour vaincre son adversaire. Il n’hésitera pas à lui crever les yeux avec ses doigts ou à lui arracher l’oreille avec les dents.",
          "Les faiblesses de ce style sont de deux types ; tout d’abord, le spadassin n’est pas armé et ensuite la sauvagerie de ses pratiques le rend un peu fou ; il peut donc lui arriver de faire des choses totalement aberrantes et inutiles en plein milieu d’un combat."
        ],
        "armes_pdf": "Pugilat",
        "specialisations_pdf": [
          "Combat de rue (la compétence avancée Casser un  membre passe compétence de base)",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un apprenti de La Gouge apprend tout d’abord à encaisser. Il peut recevoir des blessures qui laisseraient sur le carreau des hommes deux à trois fois plus forts que lui.",
            "regles": "Votre personnage ignore totalement les 10 premières blessures légères qu’il encaisse à chaque fois que son total revient à zéro, c’est-à-dire la première fois qu’il est touché et après chaque blessure grave."
          },
          "compagnon": {
            "fluff": "Un compagnon retrouve la sauvagerie du prédateur. Il se met à utiliser sa bouche comme un carnassier, il mord son adversaire et lui arrache des morceaux de chair, nez, lèvres, oreilles et doigts ont sa préférence car ils sont rarement protégés efficacement et font très mal.",
            "regles": "Vous gardez un dé supplémentaire sur vos dommages à mains nues. De plus, le niveau de Peur de votre personnage augmente de 2 en raison de son comportement à la limite du cannibalisme."
          },
          "maitre": {
            "fluff": "Un maître a développé ses techniques d’apprenti et de compagnon à un niveau inhumain.",
            "regles": "Sa Détermination augmente d’un point et peut atteindre 6, il garde un dé supplémentaire sur ses dommages (pour un total de 2) ; il bénéficie également d’une augmentation de 2 niveaux de Peur (pour un total final de 4), car il lui arrive souvent d’avoir des pratiques cannibales comme manger le cœur ou les yeux de son ennemi."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Leibwächter",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Pavois",
      "arme_display": "Pavois",
      "armes_categories": [
        "Boucliers"
      ],
      "specialisations": [
        "Bouclier",
        "Garde du corps"
      ],
      "description_courte": "C’est l’école traditionnelle des hommes-boucliers de l’Imperator, les gardes du corps d’élite qui veillaient sur sa personne. C’était leur devoir et leur privilège de se tenir aux côtés de l’Imperator",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Force d’âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Eisen",
        "academies": "Il faut avoir appartenu à la garde de fer qui protégeait l’Imperator pour pouvoir apprendre cette école de combat. Avec sa disparition, et parce qu’ils doivent bien survivre, certains anciens gardes du corps de l’Imperator enseignent aujourd’hui leurs techniques à des personnes qui paient bien.",
        "description_longue": [
          "C’est l’école traditionnelle des hommes-boucliers de l’Imperator, les gardes du corps d’élite qui veillaient sur sa personne. C’était leur devoir et leur privilège de se tenir aux côtés de l’Imperator et si nécessaire, de mourir pour le protéger. Comme c’est souvent le cas, de simples gardes du corps, les Leibwächter devenaient souvent des amis et des conseillers de l’Imperator et de ses proches.",
          "Pendant la guerre de la Croix, ils moururent en grand nombre pour protéger le dirigeant de l’Eisen, tant et si bien qu’ils sont aujourd’hui moins d’une dizaine à être encore en vie. Ceux qui étaient de garde le jour de la mort de l’Imperator moururent à leur tour de manière mystérieuse. L’un d’entre eux aurait survécu et vivrait caché, quelque part dans les égouts de Freiburg.",
          "Un Leibwächter est en parfaite santé, mais il n’est pas forcément grand, c’est plus une question de mental et de devoir ; il doit être capable de donner sa vie quand il le faudra. Ainsi, la force de cette école réside dans le fait qu’ils ne craignent pas la mort et sont prêts à tout pour protéger leur maître.",
          "Leur plus grande faiblesse est justement que le Leibwächter se moque de sa vie et ne pense qu’à protéger celle de son seigneur. Ainsi, il suffit de prendre pour cible la personne que défend le Leibwächter pour qu’il se jette de lui-même sur la lame de votre rapière !"
        ],
        "armes_pdf": "Pavois",
        "specialisations_pdf": [
          "Bouclier",
          "Garde du corps"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "Un homme-bouclier peut utiliser un bouclier et une autre arme (au choix, mais dans laquelle il au moins un rang de 2 en attaque) sans subir de pénalité de main non-directrice. Ils sont également bien entraînés pour encaisser des dommages importants et poursuivre le combat. En outre, les spadassins Leibwächter ajoutent leur rang de maîtrise à tous leurs jets effectués à partir des compétences du métier de garde du corps."
          },
          "compagnon": {
            "fluff": "Le compagnon Leibwächter peut utiliser n’importe laquelle de ses défenses actives pour protéger un tiers sans subir de pénalités.",
            "regles": "Lorsqu’il doit s’interposer pour protéger son seigneur, il ne dépense qu’un dé d’action pour effectuer une interruption au lieu des deux habituels."
          },
          "maitre": {
            "fluff": "Les plus puissants et habiles Leibwächters sont plus rapides que forts.",
            "regles": "Ainsi, lorsqu’ils ont besoin d’effectuer une défense active, ils considèrent leur dé d’action suivant comme inférieur de deux phases à ce qu’il est réellement. Enfin, en dépensant un dé d’héroïsme, le spadassin Leibwächter peut effectuer une défense active en plus de ses dés d’action pour protéger son seigneur."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Léon des Gueux",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Escrime",
        "Malandrin"
      ],
      "description_courte": "Ce style de combat a été mis au point par Léon Denisard Rivaille, dit Léon des Gueux, un ancien mousquetaire expulsé après un complot dont il était le bouc émissaire. Également membre des chevaliers d",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Harceler",
          "variante": null,
          "ref": "harceler",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Maintenir à distance",
          "variante": null,
          "ref": "maintenir a distance",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Les Cadets.",
        "origine_texte": "Montaigne.",
        "academies": "Cette école est enseignée dans la pègre charoussienne, au sein du gang que dirige Léon des Gueux. Pour le moment, il a réussi à éviter les fuites.",
        "description_longue": [
          "Ce style de combat a été mis au point par Léon Denisard Rivaille, dit Léon des Gueux, un ancien mousquetaire expulsé après un complot dont il était le bouc émissaire. Également membre des chevaliers de la Rose et la Croix, il développa un style de combat moins esthétique mais plus efficace afin de s’imposer dans la pègre et de contraindre cette dernière à suivre ses vues.",
          "Cette école de combat se pratique essentiellement de nuit, pendant que les honnêtes gens dorment. Le praticien de la technique Léon des Gueux utilise une très longue rapière et maintient son adversaire à distance tout en lui infligeant de multiples éraflures afin de le désorienter et qu’il ne sache plus où se trouve son adversaire dans les ténèbres qui l’entourent.",
          "Évidemment, la faiblesse de cette technique est qu’elle est difficilement applicable en pleine journée (à moins que votre adversaire ne soit temporairement aveuglé, grâce à de la fumée ou un bandeau)."
        ],
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Escrime",
          "Malandrin"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à se battre en aveugle, à situer son adversaire au bruit, à l’odeur et aux courants d’air qu’il déclenche dans ses mouvements.",
            "regles": "Toutes ces techniques lui permettent de se battre de nuit (et dans d’autres circonstances similaires) sans aucun malus et même de bénéficier d’un bonus de 5 points sur son ND pour être touché de nuit."
          },
          "compagnon": {
            "fluff": "Le compagnon apprend l’art de la retraite.",
            "regles": "En situation de combat, si cela se passe mal pour lui, il peut s’enfuir en dépensant un dé d’action et sans pouvoir subir d’attaque de son adversaire. Une poursuite peut alors s’engager, le compagnon gagnant un bonus de 3 phases sur son adversaire dès le départ. Si la fuite intervient de nuit ou dans l’obscurité, le spadassin utilisant les techniques de Léon des Gueux ne peut être poursuivi, il a tout simplement disparu dans le noir."
          },
          "maitre": {
            "fluff": "Le maître a appris à utiliser les sources lumineuses de ses adversaires à son avantage.",
            "regles": "Si, lors d’un combat nocturne, votre adversaire utilise une source lumineuse pour se battre, vous pouvez utiliser le reflet de cette lumière sur votre arme pour l’aveugler et lui porter une attaque dans le même mouvement. Celle-ci vise la tête (plus facile en raison de la position de l’arme) ou le cœur. Le coup à la tête inflige deux dés de dommages supplémentaires (lancés et gardés) ; tandis que celui au cœur ne peut être évité, inflige également deux dés de dommages supplémentaires, mais voit son ND augmenté de 10."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Mac Codrum",
      "origine": "officielle",
      "nations": [
        "Marches des Highlands"
      ],
      "arme": "Rets et trident",
      "arme_display": "Rets et trident",
      "armes_categories": [],
      "specialisations": [
        "Lances",
        "Filet"
      ],
      "description_courte": "Les Mac Codrum sont bien connus dans les Highlands pour leurs liens avec les selkies, les Sidhes venus de la mer. Ces derniers leurs enseignèrent une manière de combattre dans l’eau bien particulière ",
      "techniques_combat": [
        {
          "nom_base": "Double attaque",
          "variante": null,
          "ref": "double attaque",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lance légère",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Maintenir à distance",
          "variante": null,
          "ref": "maintenir a distance",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Marche des Highlands.",
        "academies": "Évidemment, il faut être membre du clan McCodrum ou en mériter une faveur pour apprendre les techniques de l’école McCodrum.",
        "description_longue": [
          "Les Mac Codrum sont bien connus dans les Highlands pour leurs liens avec les selkies, les Sidhes venus de la mer. Ces derniers leurs enseignèrent une manière de combattre dans l’eau bien particulière à l’aide d’un trident et d’un filet.",
          "C’est un certain Seamus Mac Codrum qui développa la technique pour qu’elle s’adapte au combat terrestre. Le filet sert essentiellement à parer et à empêtrer tandis que le trident est utilisé pour frapper un adversaire immobilisé ou en mauvaise posture. Le défaut de ce style de combat réside dans sa relative lenteur. En effet, le filet comme le trident sont des armes relativement lentes aux trajectoires plutôt faciles à anticiper et un combattant aguerri saura facilement comment venir à bout d’un spadassin de l’école Mac Codrum."
        ],
        "armes_pdf": "Rets et trident",
        "specialisations_pdf": [
          "Lance légère",
          "Filet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Afin de s’aguerrir et de se muscler, l’apprenti apprend à combattre en milieu aquatique.",
            "regles": "Tous ses malus sont diminués de 10 points lorsqu’il combat dans un milieu liquide et son ND est augmenté de 5 points, toujours dans un tel environnement. Sa compétence Nager augmente également de 2 rangs (possibilité d’aller au-delà du rang 3 à la création et d’atteindre le rang 6 par la suite)."
          },
          "compagnon": {
            "fluff": "Un compagnon peut utiliser son filet pour empêtrer son ou ses adversaires.",
            "regles": "Pour cela, il doit effectuer un jet d’Attaque (Filet) dont le ND est augmenté de 10 (+5 par adversaire en sus du premier). Si le jet est réussi, les adversaires du spadassin sont pris dans les rets et se voient affligés d’un malus de 10 points à toutes leurs actions. Pour se libérer, ils doivent dépenser une action et réussir un jet de Finesse contre un ND de 25 + les augmentations prises lors de l’assaut (au-delà du nombre d’adversaires)."
          },
          "maitre": {
            "fluff": "Le maître apprend à immobiliser son adversaire avec son trident, technique à laquelle son adversaire ne s’attend absolument pas, puisque c’est en général le filet qu’il utilise pour empêtrer. La largeur des dents du trident est étudiée pour être un peu plus large qu’un cou humain, ainsi, lorsqu’un compagnon combat un adversaire proche d’une paroi dans laquelle son arme peut se planter, il l’utilise pour bloquer son adversaire au cou contre le mur. Incapable de bouger, l’adversaire peut alors être achevé sans difficulté avec n’importe quelle autre arme qu’il porte sur lui (généralement un coutelas de marin).",
            "regles": "Pour réussir cette attaque dîtes du “clou de Selkie”, le spadassin doit réussir une Attaque : Arme d’hast contre un ND augmenté de 4 rangs (ce qui simule la difficulté à viser le cou) et son adversaire doit se trouver très proche d’une surface peu solide (mur en bois, en torchis, en plâtre, voire en briques, mais pas en pierre, ni la roche d’une caverne). S’il réussit, son ennemi est cloué au mur par le cou, incapable de se défendre autrement que par des parades (avec un malus de 15 points). Ce dernier peut toujours essayer de se sortir de cette galère en dépensant un dé d’action et en réussissant un jet de Gaillardise contre un ND égal à cinq fois le rang du spadassin en Attaque : Arme d’hast plus 15 points ; ainsi, il devra réussir un jet de 40 si le spadassin a 4 en Attaque : Arme d’hast (4x5+15=35) !"
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Marchenko",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Acrobate",
        "Escrime"
      ],
      "description_courte": "Marchenko est le résultat de l’une des manigances d’Aleksi Pavtlow Markov v’Novgorov. Après la retraite d’Ussura du général Montègue, il décida de créer un style d’escrime ussuran. Pour cela il rassem",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Rasoir",
          "variante": null,
          "ref": "rasoir",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Valroux ou Basulde, 15 PP s’il connaît les deux.",
        "origine_texte": "Ussura (en outre, les spadassins montaginois qui ont permis la création de ce style sont retournés dans leur pays. S’ils ont fait le serment de ne pas ouvrir une École en utilisant ces techniques, ils pourraient tout à fait prendre un apprenti ou deux, permettant ainsi à des personnages montaginois d’apprendre également ce style).",
        "academies": "Le seul maître de cette école est, pour le moment, Grusha Kolotcha Lozkinov, le général des Adayrats de la Rurik. Elle choisit qui est digne de recevoir cet enseignement.",
        "description_longue": [
          "Marchenko est le résultat de l’une des manigances d’Aleksi Pavtlow Markov v’Novgorov. Après la retraite d’Ussura du général Montègue, il décida de créer un style d’escrime ussuran. Pour cela il rassembla à Pavtlow un groupe d’acrobates fidhelis et de déserteurs montaginois (en échange d’un asile et d’un passage garanti vers la Montaigne et la garantie qu’ils n’ouvriraient pas leur propre académie en rentrant). Et leur demanda de développer une École d’escrime qui pourrait être reconnue par la Guilde des Spadassins.",
          "C’est lui qui dirigea la résistance face à l’invasion montaginoise, “les habitants fiers et loyaux de la Rurik” ont ainsi été capables de rivaliser avec l’armée moderne montaginoise. Tout en travaillant en apparence dans l’intérêt de l’Ussura, le véritable objectif d’Aleksi est d’ouvrir sa province aux étrangers, afin que ses gens se retrouvent en contact avec d’autres cultures, et affaiblissent finalement leur foi dans les “vieilles voies” de Matushka. Aleksi a placé (c’est- à-dire qu’il le contrôle), un cousin comme responsable de cette École d’escrime et l’a autorisé à donner son nom au style développé. Aleksi espère ainsi dissocier son nom du style d’escrime qu’il a permis de créer afin que ceux qui restent soupçonneux quant à ses motifs réels (en particulier dans les autres provinces) soient plus réceptifs à cette nouvelle école et l’aident à s’installer sur leurs terres.",
          "Actuellement, les seuls maîtres de l’École Marchenko sont la poignée d’acrobates et de spadassins qui l’ont fondée et l’homme responsable de l’École (cependant, lui-même vient juste d’atteindre le rang de maître). Une fois que quelques experts se seront révélés parmi ses étudiants, le style pourra s’exporter au-delà de la Rurik et la Guilde des Spadassins sera sollicitée pour reconnaître l’École financée par Aleksi.",
          "Un duelliste Marchenko favorise les attaques voyantes et intrépides qui incorporent souvent une roulade, un saut ou un plongeon. Les manœuvres acrobatiques (le legs des Fidhelis qui ont aidé au développement de ce modèle) sont une partie si importante de la philosophie de l’école Marchenko que ses pratiquants passent la moitié de leur temps d’entraînement sur des fils d’équilibre, des tapis amortisseurs et des sauts d’obstacles.",
          "Tout en prêtant une importante flexibilité à leur style, sa nature acrobatique est également sa principale faiblesse pour un adversaire observateur. Le spadassin Marchenko tend inconsciemment certains de ses muscles avant de passer à l’action, rendant ses manœuvres suivantes très prévisibles. Plutôt que de frapper simplement le flanc adverse qui se présente devant sa lame, le spadassin Marchenko préfère souvent tenter une manœuvre plus difficile et spectaculaire. Un adversaire chevronné saura tirer profit de cela, leurrant son adversaire en s’arrangeant constamment pour être une cible difficile et forçant le spadassin à tenter une manœuvre si difficile qu’il ne la réussira pas."
        ],
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Acrobate",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’instruction de base de l’École Marchenko reste la souplesse et l’agilité d’une défense adaptée à chaque individu. Actuellement, les seuls maîtres de l’École Marchenko sont la poignée d’acrobates et de spadassins qui l’ont fondée et l’homme responsable de l’École (cependant, lui-même vient juste d’atteindre le rang de maître). Une fois que quelques experts se seront révélés parmi ses étudiants, le style pourra s’exporter au-delà de la Rurik et la Guilde des Spadassins sera sollicitée pour reconnaître l’École financée par Aleksi.",
            "regles": "Chaque apprenti choisit une compétence d’Acrobate et reçoit une augmentation libre sur toutes ses défenses actives en utilisant cette compétence. Un spadassin Marchenko peut choisir une compétence supplémentaire à chaque rang de maîtrise (le personnage peut tout à fait choisir deux fois la même compétence pour recevoir deux augmentations gratuites sur ses jets de défense active)."
          },
          "compagnon": {
            "fluff": "Un compagnon Marchenko a appris qu’attaque et défense peuvent s’effectuer simultanément.",
            "regles": "Après avoir réussi une défense active en utilisant n’importe laquelle de ses compétences d’acrobate, il peut ajouter son rang dans cette compétence au jet d’attaque qui suit si ce dernier est effectué dans la même phase. En outre, prolongation du contrôle qu’il a sur sa lame, un compagnon sait utiliser sa rapière de manière inventive. Il peut utiliser sa technique de combat Marquer (Escrime) au milieu du combat pour couper des cordes, des bougies et autres articles similaires. Le ND de base est de 15, bien qu’il puisse être plus élevé ou plus faible à la discrétion du MJ, en particulier si quelqu’un tente de l’empêcher de réaliser sa manœuvre. Il peut également substituer sa technique de combat Marquer (Escrime) à n’importe quelle compétence où son épée est utilisée pour réussir cette action. Par exemple, Marquer peut être utilisé à la place de Pickpocket pour prendre les clefs de la prison à la ceinture d’un garde, à la place de Lancer pour envoyer une arme à un allié ou encore Connaissance des pièges si l’épée est utilisée pour couper les cordes d’un piège syrneth mortel."
          },
          "maitre": {
            "fluff": "Un maître Marchenko a appris à utiliser ses capacités sportives pour se créer des angles d’attaque dans des positions que peu de spadassins peuvent prendre.",
            "regles": "Indépendamment de la compétence passive utilisée dans un round pour se défendre, le maître peut utiliser n’importe quelle compétence d’acrobate comme défense active aussi longtemps qu’il peut y faire appel (par exemple, Équilibriste, s’il n’est plus sur une corde). En outre, il peut substituer n’importe quelle compétence du métier acrobate à la parade lorsqu’il effectue une Riposte."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Marcina",
      "origine": "officielle",
      "nations": [
        "Nations Pirates"
      ],
      "arme": "Rapière ou sabre",
      "arme_display": "Rapière ou sabre",
      "armes_categories": [
        "Escrime (Rapière)",
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "L’École de Marcina a été développée par et pour les colons de cette île de l’Archipel de Minuit. Elle combine les fortes traditions continentales castillianes relatives à l’escrime avec le bon sens in",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Aldana ou Gallegos.",
        "origine_texte": "Colonie de Marcina",
        "academies": "Cette école de combat ne peut être apprise que sur l’île de Marcina.",
        "description_longue": [
          "L’École de Marcina a été développée par et pour les colons de cette île de l’Archipel de Minuit. Elle combine les fortes traditions continentales castillianes relatives à l’escrime avec le bon sens instinctif des indigènes de l’île s’ils veulent survivre dans leur milieu hostile. Les jungles et autres terrains de Marcina sont souvent si denses que les manœuvres des Écoles Aldana, Torres et Soldano sont inutilisables. Le style de Marcina a été développé afin de lutter contre ce phénomène. Les spadassins ne s’exercent pas seulement dans une salle d’entraînement, mais aussi à l’extérieur, sur les plages et dans les forêts tropicales de l’île. Dans la jungle, un ennemi peut apparaître à tout moment et à portée immédiate de combat. Le spadassin doit donc apprendre à réagir avec une vitesse exceptionnelle à des attaques pouvant venir de n’importe quelle direction. Marcina incorpore également certaines des techniques de combat des indigènes Erego. Ainsi, la manœuvre de Corps à corps de l’École Marcina est effectuée grâce à un croc-en-jambe plutôt qu’avec l’utilisation classique d’une torsion du corps.",
          "Il est facile de reconnaître le style de Marcina en faisant attention à ses mouvements de balancement et à l’utilisation intensive qu’il fait du jeu de jambes. Les techniques de combat à la rapière de manière “rapprochée” ne sont pas très appréciées de leurs cousins du continent qui les trouvent laides, mais les habitants de Marcina leur répondent qu’elle n’est peut-être pas du plus bel effet esthétique, mais qu’elle est extrêmement pratique et évite de voir son arme empêtrée dans les broussailles ou échappée par accident depuis le haut d’une falaise…",
          "La principale faiblesse de cette École est l’habitude qu’ont ses pratiquants de se battre dans des espaces très restreints, ainsi un adversaire expérimenté saura qu’il vaut mieux se maintenir à distance afin de réduire la marge de manœuvre du spadassin Marcina.",
          "Les maîtres du style Marcina pensent aujourd’hui sérieusement à envoyer l’un des leurs passer les épreuves de la Guilde des Spadassins à Kirk. Pour le moment, ils hésitent encore car les Castillians du continent exercent sur eux une certaine pression politique afin que cette École de “sauvages, d’exilés et de marins” reste sur son île, ils ne souhaitent pas qu’elle soit associée aux nobles styles castillians. Cela a amené les spadassins de l’École Marcina à se scinder en deux groupes aux opinions divergentes : le premier veut se rendre à Kirk, se moquant bien de ce que raconte les Castillians, le second se moque bien de l’opinion de ces bellâtres du continent et se demande pourquoi il faudrait que leur École fasse partie de la Guilde, après tout, “Croyez-vous sérieusement qu’un pirate ou un Urub s’enfuira en apercevant votre broche ?”"
        ],
        "armes_pdf": "Rapière ou sabre",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend qu’une attaque ennemie peut venir de n’importe quelle direction et doit donc se tenir prêt à réagir à tout moment.",
            "regles": "La compétence Guet-apens devient ainsi une compétence de base s’il la connaît déjà ou une spécialité dans le cas contraire. Il reçoit également une augmentation gratuite sur ses jets de Qui-vive et de Jeu de jambes lorsque celui-ci est utilisé en défense active."
          },
          "compagnon": {
            "fluff": "Les spadassins de l’École Marcina apprennent à utiliser les accidents de terrain à leur avantage en manœuvrant leur adversaire pour l’amener dans une situation défavorable (si tous les environnements ne sont pas aussi traîtres que les profondeurs de la jungle, les rues sont pavées de pierres instables, les tavernes sont remplies de chaises et de tables, ainsi, tous les terrains ont des imperfections que le spadassin de Marcina peut utiliser à son avantage).",
            "regles": "Ainsi, le compagnon Marcina peut choisir de dépenser une action pour mettre son adversaire en difficulté. Pour cela, il effectue un jet de Finesse + Jeu de jambes contre le ND pour être touché de l’adversaire. S’il réussit, la marge de réussite est transformée en augmentations qu’il peut utiliser ensuite librement sur n’importe quelle autre attaque, défense active ou technique de combat pendant tout le round. Ces augmentations peuvent être réparties sur plusieurs jets mais doivent absolument être employées dans le même round que l’attaque. Exemple : Ignacio réussit son jet de Finesse + Jeu de jambes (jet : 37, ND : 25), il reçoit alors deux augmentations (37 – 25 = 12, soit 2 augmentations) qu’il peut utiliser librement sur ses deux prochaines actions encore à sa disposition. Les compagnons de l’École Marcina peuvent également employer leur compétence Jeu de jambes comme défense active dans toutes les situations qui exigent normalement un jet d’Équilibre."
          },
          "maitre": {
            "fluff": "Le maître a encore perfectionné sa capacité de réaction aux attaques surprises. Il esquivera des attaques sans même s’en rendre compte.",
            "regles": "Une fois par round, le maître Marcina peut effectuer une défense active, avec la compétence Jeu de jambes, sans dépenser de dé d’action."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Monastic Order of Avalon",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Armes improvisées",
      "arme_display": "Armes improvisées (Atypique / Accessoire)",
      "armes_categories": [
        "Atypique / Accessoire"
      ],
      "specialisations": [
        "Combat de rue",
        "Pugilat"
      ],
      "description_courte": "Les Frères constituent un groupe d’individus roublards qui semblent incarner les penchants bagarreurs de leur nation d’adoption. L’ordre existe depuis plus longtemps que l’Église d’Avalon mais a intég",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arme improvisée",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Église du Vaticine.",
        "academies": "Seuls les “Coquins de la Croix” peuvent apprendre les techniques de combat du Monastic Order of Avalon.",
        "description_longue": [
          "Les Frères constituent un groupe d’individus roublards qui semblent incarner les penchants bagarreurs de leur nation d’adoption. L’ordre existe depuis plus longtemps que l’Église d’Avalon mais a intégré ses rangs depuis.",
          "Les Frères viennent de Montaigne. Il s’agissait d’un groupe composé de trente moines qui protégeaient la veuve et l’orphelin avec un style qui attirait souvent les crapules rancunières jusqu’aux portes de leurs monastères. Un Frère avait généralement pour habitude d’humilier son adversaire afin d’attirer une foule aussi grande que possible, les sarcasmes et huées de son enthousiaste public l’aidant à vaincre son ennemi.",
          "Les Frères furent chassés de Montaigne lorsque sept d’entre eux se trouvèrent enfermés dans leur monastère alors qu’on y mettait le feu. Les Frères avaient à plusieurs reprises insultés une famille locale de nobliaux, les Barnave de Montabert, et l’ordre la tient encore pour responsable du crime.",
          "Sans les preuves nécessaires pour étayer leur accusation, les Frères émigrèrent en Inismore, où ils s’établirent de manière permanente et construisirent un monastère plus humble que le précédent. Certains visitèrent les Îles Enchantées et y continuèrent leurs bonnes œuvres, étouffant les révoltes et contrariant les criminels, tout en conservant l’apparence de membres du clergé. On pensait de la plupart de ces hommes qu’ils poursuivaient l’œuvre de Robin Goodfellow, rehaussant ainsi l’image des Frères.",
          "Lorsque le vent de leurs exploits commença à se répandre, leur nouveau monastère tripla de volume, attirant de nombreux acolytes qui souhaitaient se joindre aux “Coquins de la Croix”. Les Frères réalisèrent bientôt que les liens émotionnels et politiques qu’ils entretenaient avec le peuple des Trois Royaumes étaient plus étroits que ceux qui les unissaient au lointain Hiérophante. Ainsi, lorsque la Reine Élaine fonda l’Église d’Avalon, ils devinrent les ardents défenseurs de cette nouvelle foi.",
          "Les Frères combattent le plus souvent avec ce qui leur tombe sous la main mais savent tout de même se servir d’une épée ou d’un gourdin. Souvent, ils portent une ceinture de cuir bouilli sous leur robe, ce qui leur permet d’exécuter une manœuvre surnommée “les torons de Theus”. Celle-ci est réalisée lorsque le Frère laisse approcher son adversaire. Le Frère passe alors à l’offensive, usant de ses talents pour désarmer ou assommer son adversaire. Toutefois, même si cette technique fonctionne particulièrement bien dans le cadre des combats à mains nues, les ceintures n’offrent que peu de protection contre des épées affûtées. Un Frère tue rarement, préférant punir le pécheur en lui faisant des bleus et en lui brisant quelques os."
        ],
        "armes_pdf": "Armes improvisées",
        "specialisations_pdf": [
          "Combat de rue (la compétence Attaque [Arme  improvisée] passe de base)",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "À ce niveau, maîtrisant véritablement ses poings, le Frère bénéficie d’une augmentation gratuite sur tous ses jets de Pugilat. Lors d’un combat au cours duquel le Frère a frappé son ou ses adversaires à trois reprises au moins, il peut utiliser un dé d’héroïsme pour ajouter un point à son total de Réputation. Pour que cela prenne effet, le personnage doit être accompagné de deux témoins en plus de ses adversaires."
          },
          "compagnon": {
            "fluff": "Le Frère apprend à se battre avec tout ce qui lui tombe sous la main sans briser l’objet en question.",
            "regles": "Le Frère manie l’Arme improvisée comme s’il s’agissait d’une arme normale, ce qui lui permet de conserver les 10 obtenus aux dommages sans risquer de la briser."
          },
          "maitre": {
            "fluff": "Le Frère sait quelles Armes improvisées sont les mieux adaptées face à l’armement de son adversaire.",
            "regles": "Ainsi, il bénéficie d’une augmentation gratuite sur toutes les attaques qu’il porte à l’aide d’une arme improvisée. De plus, le Frère apprend la technique des “torons de Theus” qui lui permet d’utiliser une ceinture de combat. Le Frère pousse son adversaire à frapper à un endroit protégé dissimulé par sa robe. Cela relève du Corps à corps, sauf que le Frère laisse venir l’assaillant et lui offre une ouverture pour le frapper. Le Frère déclare d’abord qu’il souhaite employer les torons puis son adversaire le frappe. Si le Frère évite l’attaque de son assaillant en réussissant un jet de Défense Active, alors son ND pour être touché s’élève de 10 sur son attaque suivante. S’il n’attaque pas avant la fin du tour, ou s’il change d’adversaire, le ND pour être touché retrouve son niveau normal. Un Frère ne peut se servir de cette technique sans sa ceinture de combat."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Mortis",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Dague, miséricorde ou poignard",
      "arme_display": "Dague, miséricorde (Couteau) ou poignard",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Assassin",
        "Couteau"
      ],
      "description_courte": "Lorsqu’elle se détacha de l’école de Boucher, il y a de cela des années, l’école Mortis s’intéressa de plus près à son utilisation dans le cadre d’assassinats. Les élèves du style Mortis ont dans chaq",
      "techniques_combat": [
        {
          "nom_base": "Double attaque",
          "variante": null,
          "ref": "double attaque",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’instinct",
          "variante": null,
          "ref": "tir d'instinct",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Mortis.",
        "origine_texte": "Die Kreuzritter.",
        "academies": "Seuls les Kreuzritter peuvent recevoir l’enseignement de l’école Mortis.",
        "description_longue": [
          "Lorsqu’elle se détacha de l’école de Boucher, il y a de cela des années, l’école Mortis s’intéressa de plus près à son utilisation dans le cadre d’assassinats. Les élèves du style Mortis ont dans chaque main un poignard effilé connu sous le nom de stylet, dont ils se servent pour porter une série d’attaques destinées à terrasser l’adversaire aussi rapidement que possible. À l’instar de l’école Vipereus Morsus de la Rilasciare (qui exploite également le stylet), le but est bien d’abattre sa victime. Panache et style passent après les réalités pratiques.",
          "Il existe plusieurs différences entre les écoles Mortis et Boucher. Ses élèves lancent plus souvent avec force leurs poignards contre leurs adversaires. En outre, il n’est pas rare qu’ils enduisent leurs lames de poison. S’il existe encore quelque honneur chez les criminels, tel n’est pas le cas pour les assassins. Les élèves de Mortis exploitent également intimidation et effet de surprise pour tuer leur proie en prenant le minimum de risques.",
          "Bien entendu, le style Mortis est victime des mêmes défauts que l’école Boucher. Même s’il est possible de compenser en les lançant, les poignards disposent d’une allonge bien courte. Pire encore, les élèves de Mortis sont habitués à combattre des adversaires pétrifiés de terreur. Du coup, il leur arrive de se faire surprendre par un spadassin sans peur."
        ],
        "armes_pdf": "Dague, miséricorde ou poignard",
        "specialisations_pdf": [
          "Assassin",
          "Couteau (la compétence avancée Lancer  [Couteau] passe compétence de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves de l’école de combat Mortis sont formés pour manier un stylet dans chaque main.",
            "regles": "Cela annule donc la pénalité de main non directrice et leur confère une augmentation gratuite lorsqu’ils attaquent avec un stylet."
          },
          "compagnon": {
            "fluff": "Mortis enseigne à ses élèves l’art de tirer parti d’un adversaire surpris.",
            "regles": "Lorsqu’un compagnon du style Mortis utilise des augmentations pour frapper un adversaire surpris, chacune lui confère un dé gardé de dommages supplémentaire (+1g1) au lieu d’un simple dé lancé (+1g0)."
          },
          "maitre": {
            "fluff": "Une fois que l’élève maîtrise totalement le style Mortis, il connaît les litanies de la mort. Il administre à son adversaire les derniers sacrements afin de lui faire perdre son sang-froid.",
            "regles": "Au début de chaque tour, avant la phase 1, le niveau de peur du maître augmente d’un point (ce qui lui donne un niveau de peur de 1 s’il n’en dispose pas). Cela continue pendant un nombre de tours égal au Panache du maître, après quoi son niveau de peur reste le même jusqu’à la fin du combat."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Nadja'hari",
      "origine": "officielle",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Fronde",
      "arme_display": "Fronde",
      "armes_categories": [],
      "specialisations": [
        "Assassin",
        "Fronde"
      ],
      "description_courte": "On suppose que l’école Nadja’hari vient du fin fond du désert, là où il est surtout constitué d’un sol pierreux. Les gens de ces régions trouvent autour d’eux assez de munitions pour s’en servir de fa",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Fronde",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Garrotter",
          "variante": null,
          "ref": "garrotter",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir en ricochet",
          "variante": null,
          "ref": "tir en ricochet",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Empire du Croissant.",
        "academies": "L’art de la fronde s’est étendu à tout l’Empire du Croissant, il suffit donc d’être de cette nationalité pour trouver une personne capable de vous l’enseigner.",
        "description_longue": [
          "On suppose que l’école Nadja’hari vient du fin fond du désert, là où il est surtout constitué d’un sol pierreux. Les gens de ces régions trouvent autour d’eux assez de munitions pour s’en servir de façon presque continue avec leurs frondes. Ils ont développé des techniques de tir particulièrement puissantes qui font que leurs pierres ont une très grande capacité de perforation, approchant la puissance du pistolet sans les problèmes liés au rechargement, à l’humidité de la poudre, etc. Un autre avantage de cette arme est qu’elle est d’une très grande discrétion. En fait, il ne s’agit que d’une bande de cuir que l’on peut facilement faire passer pour une ceinture ou un bandeau. Rien ne vous empêche ensuite de l’utiliser comme un garrot fort efficace.",
          "La principale faiblesse de ce style réside dans l’amplitude nécessaire au frondeur pour réussir adroitement son tir. Il a besoin d’espace pour donner la vitesse nécessaire à la puissance de perforation de son arme. Si ce n’est pas le cas, le tir n’est qu’un jet de fronde ordinaire sans grande efficacité."
        ],
        "armes_pdf": "Fronde",
        "specialisations_pdf": [
          "Assassin",
          "Fronde"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à donner plus de puissance à ses tirs de fronde. On lui enseigne un mouvement de poignet qui lui permet de démultiplier la puissance de son arme et d’avoir ainsi une capacité de perforation approchant celle d’un pistolet.",
            "regles": "Les dommages qu’un tireur Nadja’hari inflige à l’aide d’une fronde sont de 1g3 au lieu de 1g2. Pour optimiser ses dégâts, le frondeur devra donc viser en utilisant sa technique de combat Tir d’adresse afin d’augmenter son nombre de dés lancés et pouvoir effectuer des dommages au-delà de 1g1 et atteindre au moins 3g3."
          },
          "compagnon": {
            "fluff": "Le compagnon Nadja’hari apprend à tirer le meilleur parti de sa fronde. On lui enseigne qu’en utilisant plusieurs pierres de taille moindre, il peut toucher plusieurs adversaires en même temps et, ainsi, faire de gros dommages dans les rangs adverses.",
            "regles": "En effectuant un jet d’Attaque (Fronde) avec un ND de 5 par cible supplémentaire, il peut infliger des dommages à chacune de ces victimes. Le nombre de cibles supplémentaires qu’il peut atteindre est limité par sa technique de combat Tir d’adresse et les dommages qu’il inflige à chacune de ses victimes sont de 1g2 au lieu de 1g3."
          },
          "maitre": {
            "fluff": "Le maître de l’école Nadja’hari sait utiliser sa fronde pour servir ses desseins d’assassin. Il sait parfaitement étrangler ses victimes.",
            "regles": "Il bénéficie, en effet, d’une augmentation gratuite sur tous ses jets de Garrotter effectués à l’aide d’une lanière de cuir (ce qui comprend sa fronde). Il sait également parfaitement la dissimuler sur lui, lui permettant de bénéficier de deux augmentations gratuites dans sa compétence Dissimulation. Enfin, il a appris une technique qui lui permet, même lorsqu’il est complètement désarmé, de pouvoir attaquer ses ennemis. En effet, il est capable de lancer des pierres de fronde avec ses mains et une efficacité bien plus qu’honorable. Il utilise sa capacité d’Attaque(fronde) en lieu et place de sa compétence Lancer (armes improvisées) avec les mêmes dommages qu’une fronde utilisée par un tireur lambda (c’est-à-dire, autre qu’un frondeur Nadja’hari), soit 1g2."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Necare",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Dague, miséricorde ou poignard",
      "arme_display": "Dague, miséricorde (Couteau) ou poignard",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Espion"
      ],
      "description_courte": "Le style de Necare est une école d’assassins, spécialisée dans le maniement de petits poignards bien cachés sur soi. Comme il s’agit d’armes légères, elles ne sont guère meurtrières en combat. Mais po",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Épingler",
          "variante": null,
          "ref": "epingler",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Rompre le combat",
          "variante": null,
          "ref": "rompre le combat",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Cappuntina.",
        "origine_texte": "Les Filles de Sophie.",
        "academies": "Seuls les Filles de Sophie et Fils de Lugh peuvent apprendre l’école Necare.",
        "description_longue": [
          "Le style de Necare est une école d’assassins, spécialisée dans le maniement de petits poignards bien cachés sur soi. Comme il s’agit d’armes légères, elles ne sont guère meurtrières en combat. Mais pour en faire des armes mortelles, les élèves enduisent souvent leur lame de poison. L’assassinat typique consiste à étreindre la victime, à la poignarder alors qu’elle est sans défense, à la jeter au sol puis à fuir pendant que le poison prend effet.",
          "La priorité de tout assassin formé au style de Necare est de ne pas paraître menaçant. À cet égard, la plupart des élèves de cette école sont charmants et séduisants. Généralement, ils se lient d’amitié avec la victime, la fréquentant durant plusieurs mois afin de gagner sa confiance. Certains entretiennent même des relations amoureuses avec leur victime pour écarter tout soupçon et maximiser leurs chances de la surprendre dans un moment d’inattention.",
          "Les assassins de l’école de Necare reçoivent des Filles leurs missions, qui décrivent la victime et offrent certains paramètres spécifiques – généralement en rapport avec les activités de la cible (“Ne laissez pas Anthony Russel mettre un pied à Freiburg.”, par exemple). Généralement, ils laissent la vie sauve à leur victime jusqu’au dernier moment, des fois qu’un revers de destinée l’entraîne sur une autre voie. Mais lorsque les élèves de Necare frappent, ils ne font montre d’aucune pitié."
        ],
        "armes_pdf": "Dague, miséricorde ou poignard",
        "specialisations_pdf": [
          "Couteau",
          "Espion (les compétences avancées Dissimulation et  Poison passent compétences de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis Necare apprennent à s’approcher suffisamment de leur cible pour que leurs coups soient efficaces.",
            "regles": "Vous bénéficiez d’une augmentation gratuite par niveau de maîtrise lorsque vous tentez de dissimuler sur vous une petite arme (comme une dague). Lorsque vous utilisez une dague, vous pouvez ajouter votre niveau de maîtrise aux dommages que vous infligez. En outre, vous vous êtes immunisé contre un type de poison et gagnez l’avantage Immunité au poison."
          },
          "compagnon": {
            "fluff": "Dès lors que les assassins Necare se font plus compétents, ils apprennent à utiliser beaucoup plus de poisons et manient leurs poignards avec davantage d’efficacité.",
            "regles": "Vous bénéficiez d’une augmentation gratuite lorsque vous utilisez la compétence Poison. Mais vous bénéficiez également d’une augmentation gratuite lorsque vous attaquez avec une dague, sans compter que vous ajoutez votre rang de compétence Corps à corps aux dommages infligés avec une telle arme. Enfin, vous gagnez un rang dans la compétence Dissimulation. Cela peut faire passer votre rang de compétence à 6. Dans le cas contraire, vous pourrez par la suite faire passer votre compétence Dissimulation du rang 5 au rang 6 en dépensant 25 XP."
          },
          "maitre": {
            "fluff": "Les maîtres du style Necare connaissent une botte qui s’appelle “la Touche”.",
            "regles": "Lorsque vous l’employez, effectuez un jet de Finesse + Attaque (Couteau) accompagné de trois augmentations sur le ND. Si vous le réussissez, alors vous empoisonnez votre victime et lui infligez 1 blessure légère. La victime doit effectuer un jet de Perception contre un ND de 5 + 5 fois votre rang de Dissimulation pour constater que vous l’avez blessée. Le même ND s’applique par la suite à toute personne souhaitant découvrir plus tard les causes de la mort. En outre, vous avez développé une très grande résistance aux poisons. Considérez que vous disposez de l’avantage Immunité aux poisons face à tous les types de poisons."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "O'Faolain",
      "origine": "officielle",
      "nations": [
        "Inismore"
      ],
      "arme": "Mousquet",
      "arme_display": "Mousquet",
      "armes_categories": [],
      "specialisations": [
        "Fusils",
        "Pugilat"
      ],
      "description_courte": "Meaghan O’Faolain était une fermière sans éducation d’Inismore. Lorsque son mari fut tué par son Seigneur, Sir Ryan O’Really, en raison de son incapacité à régler les taxes, elle décida qu’il était te",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Mousquet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir précis",
          "variante": null,
          "ref": "tir precis",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Inismore.",
        "academies": "L’école O’Faolain n’est enseignée qu’en Inismore.",
        "description_longue": [
          "Meaghan O’Faolain était une fermière sans éducation d’Inismore. Lorsque son mari fut tué par son Seigneur, Sir Ryan O’Really, en raison de son incapacité à régler les taxes, elle décida qu’il était temps de mettre un terme à ses agissements. N’ayant aucune notion de “l’honneur à la gentilhomme”, elle prit les mousquets de son défunt époux et se fît justice elle-même. Grâce à ses cinq mousquets, elle décima la garde personnelle de Sir O’Really et tira dans les genoux de ce dernier afin que chaque jour de sa vie il se souvienne d’elle. Ils furent alors nombreux à la rejoindre pour apprendre ses techniques, son école était née. Ces hommes furent alors appelés les Francs-Tireurs.",
          "Les membres de cette école ne font pas dans la dentelle, ils ne savent pas tenir une épée, mais personne ne manie mieux le mousquet qu’eux. La légende veut que Meaghan O’Faolain ait réussi à couper une corde à l’aide d’une balle à plus de 100 mètres de distance. Ceux qui ne connaissaient pas sa technique crurent d’ailleurs avoir affaire à une Sidhe qui dirigeait ses balles par sa seule volonté.",
          "La principale faiblesse de cette école réside dans le fait que l’assaillant doit toujours se tenir à distance de son adversaire de façon à ce que celui-ci ne puisse lui porter un coup au corps à corps."
        ],
        "armes_pdf": "Mousquet",
        "specialisations_pdf": [
          "Mousquet",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Le premier enseignement de l’école O’Faolain, est : “un mousquet c’est bien, mais deux c’est mieux !”.",
            "regles": "Vous ne tenez pas compte des pénalités de main non directrice quand vous utilisez un mousquet. De plus, vous pouvez porter jusqu’à six mousquets sur vous sans subir la moindre pénalité. Enfin, vous rechargez deux fois plus vite."
          },
          "compagnon": {
            "fluff": "Les mousquets sont vos plus fidèles compagnons, aussi vous les connaissez bien.",
            "regles": "Un compagnon de l’école O’Faolain ne tient plus compte des pénalités à ses jets d’attaque au mousquet."
          },
          "maitre": {
            "fluff": "",
            "regles": "Lorsqu’il atteint ce rang, le Franc-Tireur obtient gratuitement un rang en Finesse. Ce bonus augmente également son maximum de 1. Par conséquent, un maître peut atteindre un score de 6, voire 7 avec certains avantages."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Overmars",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Pistolet de duel",
      "arme_display": "Pistolet de duel",
      "armes_categories": [],
      "specialisations": [
        "Athlétisme",
        "Pistolet"
      ],
      "description_courte": "Jarvis Overmars fut l’un des apprentis d’Erl Rasmussen, le célèbre pistolier. Jarvis est un homme qui aime le danger, l’adrénaline et ne se sent en vie que lorsqu’il met son existence en péril. Tireur",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Pistolet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Force d’âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Retourné-tiré",
          "variante": null,
          "ref": "retourne tire",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Ligue de Vendel.",
        "academies": "Différents endroits des environs de Västeras. En effet, compte tenu de la recherche active dont il est la cible de la part des Rasoirs de la guilde des spadassins, Jarvis Overmars change régulièrement de cachette.",
        "description_longue": [
          "Jarvis Overmars fut l’un des apprentis d’Erl Rasmussen, le célèbre pistolier. Jarvis est un homme qui aime le danger, l’adrénaline et ne se sent en vie que lorsqu’il met son existence en péril. Tireur d’élite, il devient donc rapidement l’un des hommes les plus craints en duel au pistolet. Insensible à la peur, toujours maître de lui, il préfère laisser ses adversaires faire feu avant d’appuyer sur la détente, un peu comme s’il jouait à la “roulette ussurane” avec l’arme de son adversaire.",
          "Toutefois, grâce à son audace, sa réputation et une vista certaine, jamais il n’a été touché par les armes de ses adversaires. Comme s’il était protégé. En réalité, les victoires d’Overmars reposent plus sur un incroyable contrôle de soi, une capacité d’intimidation avérée, un grand sens de l’observation et des techniques subtiles.",
          "Il repère toujours le terrain avant d’affronter son adversaire, fait en sorte de toujours être dos au soleil, repère les aspérités du sol, les vents dominants qui pourraient déstabiliser son bras au moment du tir. Mais également, il place son corps de telle manière qu’il offre la cible la plus petite possible à son adversaire. Car si cela n’est pas naturel pour les tireurs des Secrets de la Septième Mer , le fait de se tenir de profil lui permet également d’aligner sa visée avec son œil directeur de manière idéale.",
          "Enfin, son fait d’arme le plus notable est d’avoir affronté, puis vaincu, et même tué, son maître, Erl Rasmussen, lors d’un duel mémorable un petit matin brumeux de Septimus 1668 dans les environs de Västeras. Ce fait d’armes récent lui a permis d’acquérir une grande notoriété et un épais portefeuille d’élèves qui lui permettrait de vivre de sa maîtrise du pistolet.",
          "Malheureusement, il doit également faire face à la vindicte de la guilde des spadassins. Ainsi, il a, à plusieurs reprises, échappé in-extremis à des Rasoirs envoyés par Linnae Knute.",
          "La faiblesse d’un élève de l’école Overmars est d’une évidente simplicité : il vous laisse tirer le premier. Si son adversaire est capable de garder son calme et de faire feu sans se précipiter, il peut très bien ne pas lui laisser la chance de riposter."
        ],
        "armes_pdf": "Pistolet de duel",
        "specialisations_pdf": [
          "Athlétisme",
          "Pistolet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti de l’école Overmars apprend à tirer avec ses deux mains. En effet, s’il venait à être blessé au bras de tir classique, il doit être capable de tirer avec son autre main. Également, les apprentis reçoivent l’ordre de Jarvis Overmars de se faire réaliser un pistolet de duel adapté à leur morphologie.",
            "regles": "Lorsqu’ils utilisent une arme à feu, les tireurs de l’école Overmars ne sont pas victimes de la pénalité de main non-directrice. Cette arme au coût élevé (tarif minimal de 100 guilders) permet au tireur de bénéficier d’une augmentation gratuite lorsqu’il fait feu avec ce pistolet (en supplément de l’augmentation déjà accordée par le pistolet de duel)."
          },
          "compagnon": {
            "fluff": "Le compagnon de l’école Overmars apprend à garder son calme en toute circonstance. En particulier lors des duels au pistolet. Un pistolier si sûr de ses capacités qu’il préfère laisser à son adversaire la chance de le toucher le premier plutôt que de tirer doit être redoutable, non ?",
            "regles": "Il bénéficie ainsi de deux augmentations gratuites sur tous ses jets de peur. De même, s’il participe à un duel au pistolet et qu’il laisse son adversaire faire feu le premier, ce dernier subit une pénalité de deux augmentations, intimidé par les réflexes, le sang-froid et le fair-play de son adversaire :"
          },
          "maitre": {
            "fluff": "Le maître de l’école Overmars apprend à affronter tous les cas de duels possibles, en particulier, il sait utiliser concomitamment deux pistolets contre un ou plusieurs adversaires. Cela lui permet de tirer avec deux pistolets sur deux cibles en même temps dans la même action, comme lors des duels triangulaires. En fait, le maître a appris à faire de ses deux yeux des yeux directeurs, chacun d’eux se concentrant sur un adversaire différent et donnant la ligne de tir du bras se trouvant du même côté du corps.",
            "regles": "En termes de jeu, même s’il s’agit de la même action, chacun des deux tirs doit faire l’objet d’un jet d’attaque, le ND de chacune des cibles n’étant pas le même. Cette technique est bien entendu utilisable en dehors des champs de duel."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Pavois",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Arme improvisée",
      "arme_display": "Arme improvisée",
      "armes_categories": [
        "Atypique / Accessoire"
      ],
      "specialisations": [
        "Athlétisme",
        "Combat de rue"
      ],
      "description_courte": "Moins une école qu’une forme de philosophie, le style de combat dit “du Pavois” enseigne à ses élèves l’art de l’improvisation et de la vivacité d’esprit. Chaque monstre des ruines est unique et les p",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arme improvisée",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Société des Explorateurs.",
        "academies": "Les techniques de l’école du Pavois sont réservées exclusivement aux membres de la Société des Explorateurs.",
        "description_longue": [
          "Moins une école qu’une forme de philosophie, le style de combat dit “du Pavois” enseigne à ses élèves l’art de l’improvisation et de la vivacité d’esprit. Chaque monstre des ruines est unique et les pavois doivent apprendre à utiliser tout ce qui leur tombe sous la main – sel, sucre, soufre, voire eau de source – pour écarter les menaces.",
          "La principale faiblesse du style du pavois réside dans le fait que son utilisateur cherche surtout à protéger autrui, ce qui fait qu’il lui arrive souvent d’être lui- même à découvert, et donc vulnérable. Un adversaire connaissant ce style portera donc une feinte sur la personne que protège de pavois afin d’entraîner sa réaction puis attaquera alors le pavois sans grande défense."
        ],
        "armes_pdf": "Arme improvisée",
        "specialisations_pdf": [
          "Athlétisme",
          "Combat de rue"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Le pavois apprend à transformer en arme tout ce qui lui tombe sous la main.",
            "regles": "Ignorez la pénalité de main non- directrice lorsque vous vous servez d’une arme improvisée. En outre, lancez un dé si l’arme se brise durant un combat. Sur un nombre pair, l’arme ne se brise finalement pas. Enfin, recevez gratuitement le métier Garde du corps."
          },
          "compagnon": {
            "fluff": "Protéger la vie d’autrui est l’objectif de tout pavois qui se respecte.",
            "regles": "Vous gagnez un rang dans la compétence Interposition. Cela peut faire passer votre rang de compétence à 6. Dans le cas contraire, vous pourrez par la suite faire passer votre compétence Interposition du rang 5 au rang 6 en dépensant 25 XP. De plus, lorsque vous effectuez un jet d’esquive pour éviter les effets d’un piège, vous pouvez aider une autre personne à l’esquiver en n’obtenant qu’une augmentation au lieu des deux normalement requises."
          },
          "maitre": {
            "fluff": "Les meilleurs pavois développent des réflexes éclairs.",
            "regles": "Quel que soit le trait dont vous vous servez lors d’une défense active ou d’un jet d’esquive (généralement l’Esprit), celui-ci est considéré comme d’un rang supérieur. En outre, vous pouvez retrancher jusqu’à deux phases aux dés d’action que vous dépensez pour effectuer une défense active."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Quinn",
      "origine": "officielle",
      "nations": [
        "Nations Pirates"
      ],
      "arme": "Dague, miséricorde, poignard et sgain dubh",
      "arme_display": "Dague, miséricorde (Couteau), poignard et sgain dubh",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Espion"
      ],
      "description_courte": "Ce style de combat a été développé par Ethan Quinn, un spécialiste de l’assassinat travaillant au sein du N.O.M. Cette société secrète ne disposant que de faibles effectifs, il est bien entendu que ce",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "N.O.M.",
        "academies": "Seul Ethan Quinn enseigne cette école d’escrime aux hommes et femmes qu’ils jugent dignes de devenir les plus grands assassins du NOM.",
        "description_longue": [
          "Ce style de combat a été développé par Ethan Quinn, un spécialiste de l’assassinat travaillant au sein du N.O.M. Cette société secrète ne disposant que de faibles effectifs, il est bien entendu que cette école n’est enseignée qu’à un très petit nombre de personnes. Au jour d’aujourd’hui, Ethan Quinn, le maître assassin ne l’aurait enseignée qu’à une petite dizaine d’élèves.",
          "Les spadassins de l’école Quinn maîtrisent parfaitement l’art de passer inaperçu. Ils savent parfaitement se fondre dans l’ombre ou dans une foule. De plus, toutes leurs techniques de combat sont basées sur la surprise de leurs victimes.",
          "La principale faiblesse de ce style réside justement en cet avantage ; en effet, si le spadassin de l’école Quinn ne parvient pas à surprendre son adversaire, il sera une proie facile pour un duelliste confirmé."
        ],
        "armes_pdf": "Dague, miséricorde, poignard et sgain dubh",
        "specialisations_pdf": [
          "Couteau",
          "Espion"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école Quinn apprennent tout d’abord à faire de leur couteau une arme particulièrement meurtrière, en particulier lorsqu’ils agissent par surprise.",
            "regles": "Ainsi bénéficient-ils d’un bonus de +1g0 aux dommages qu’ils infligent avec une telle arme (donc 2g2). Ces dommages passent même à +1g1 s’ils font suite à une attaque surprise (en réussissant un jet de déplacement silencieux). D’ailleurs, ils bénéficient également d’une augmentation gratuite sur leurs jets de déplacement silencieux."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école Quinn apprennent maintenant à utiliser leur couteau de façon particulièrement rapide et efficace, un coup, une blessure grave.",
            "regles": "Ils bénéficient de deux augmentations gratuites à tous leurs jets d’attaques effectués à l’aide d’un couteau. De plus, ils ont affiné leurs techniques de déplacement dans l’ombre, aussi bénéficient-ils maintenant de deux augmentations gratuites sur leurs jets de déplacement silencieux (à la place d’une)."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école Quinn apprennent à infliger une attaque fulgurante presque toujours mortelle pour leur cible.",
            "regles": "En un coup, il tue cette dernière avant de disparaître dans l’ombre. Lorsqu’il passe à l’attaque, un spadassin Quinn peut dépenser deux dés d’Héroïsme pour infliger automatiquement une blessure grave, en sus des dommages normaux. De plus, si la victime est surprise, il peut dépenser un dé d’héroïsme par blessure grave qu’il souhaite infliger (pas de limitation en dehors de la réserve de dés d’Héroïsme du MJ)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Qurra",
      "origine": "officielle",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Armes improvisées",
      "arme_display": "Armes improvisées (Atypique / Accessoire)",
      "armes_categories": [
        "Atypique / Accessoire"
      ],
      "specialisations": [
        "Acrobate",
        "Combat de rue"
      ],
      "description_courte": "C’est une situation malheureuse mais indéniable que la grande majorité des marins des bateaux croissantins n’ont pas choisi cette vie. Certains ont été victimes d’un enlèvement, d’autres furent captur",
      "techniques_combat": [
        {
          "nom_base": "Double parade",
          "variante": null,
          "ref": "double parade",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Esquive acrobatique",
          "variante": null,
          "ref": "esquive acrobatique",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arme improvisée",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Corsaires du Croissant.",
        "academies": "Sur les bancs de nage des galères des Corsaires du Croissant.",
        "description_longue": [
          "C’est une situation malheureuse mais indéniable que la grande majorité des marins des bateaux croissantins n’ont pas choisi cette vie. Certains ont été victimes d’un enlèvement, d’autres furent capturés à la guerre et mis en esclavage, les raisons ne manquent pas.",
          "Certains ne sont que les victimes des circonstances, servant sous la bannière de Kheired-Din parce qu’ils n’ont rien d’autre dans la vie. Ces infortunés reçoivent rarement une instruction convenable dans l’art de l’escrime, car il est facile de les remplacer une fois qu’ils sont tombés au combat. C’est qu’il en a toujours été, et, sans doute, qu’il en sera toujours de même.",
          "L’un de ces esclaves inconnus servait à bord du Ciel étrange et ne parvenait pas à se satisfaire d’un destin si cruel. Il remarqua que tous ses camarades d’infortune se battaient aussi courageusement que n’importe qui, même s’ils étaient captifs ; il leur apprit alors à se battre comme un seul homme. Il remarqua également que ceux qui parvenaient à survivre sous les coups de fouet d’Edahgo avaient développé résistance, force et souplesse, qualités intrinsèques de tout escrimeur.",
          "Cet homme, que l’on connaît simplement sous le patronyme de Qurra incita alors ses camarades à s’entraider dans la violence des combats. Ils développèrent ainsi des techniques de combat à plusieurs et s’entraînèrent dans les rares périodes de calme. Puis, une fois au cœur de la bataille, ils coopérèrent efficacement.",
          "On ne sait jamais quelle arme va vous tomber entre les mains lorsqu’un bateau corsaire engage un navire ennemi, ainsi Qurra et ses camarades ont appris à faire feu de tout bois. Kheired-Din était ravi de l’efficacité de son équipage jusqu’à ce que Qurra et un grand nombre de ses apprentis se joignent à Espera lorsqu’il s’échappa à bord de la Clef de Liberté.",
          "Les esclaves restants furent sévèrement punis, pour décourager toute nouvelle tentative d’évasion, mais il permit que ses hommes continuent de s’exercer avec les techniques de combat de Qurra, car leurs compétences s’étaient révélées à plusieurs reprises capitales dans le cours des batailles navales. Entre la puissante flotte des corsaires et les évadés, ce style s’est répandu parmi la communauté pirate et n’importe quel boucanier servant à bord d’un navire croissantin peut aujourd’hui l’apprendre auprès de l’un de ses congénères.",
          "Qurra est un style de combat acrobatique et ses pratiquants font un usage fréquent des compétences qu’ils ont appris à bord des navires (Escalade, Équilibre, Sauter, Nager, etc.). Ensuite, ce style se fonde sur des attaques et des défenses à plusieurs spadassins. Les spadassins Qurra sont beaucoup plus dangereux lorsqu’ils sont en groupe. Entre un combattant effectuant une roulade entre vos jambes pour vous frapper dans le dos et un autre vous sautant à la figure pour vous attaquer aux épaules, même les spadassins les plus expérimentés ont des difficultés à se défendre efficacement contre un tandem de spadassins Qurra.",
          "La faiblesse de Qurra est que ce style repose sur des mouvements particulièrement sportifs. Il suffit donc d’acculer le spadassin contre un mur ou dans un angle pour rendre ses attaques beaucoup moins efficaces. Sans ses attaques audacieuses et ses défenses acrobatiques, un duelliste de l’école Qurra est vulnérable aux coups d’un spadassin expérimenté."
        ],
        "armes_pdf": "Armes improvisées",
        "specialisations_pdf": [
          "Acrobate",
          "Combat de rues"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "Un apprenti de l’École Qurra considère toutes les armes qui lui tombent sous la main comme des armes improvisées tout en gardant leurs différents bonus et malus. Ensuite, comme il passe son temps en mer à développer ses compétences, il reçoit un rang dans la compétence Natation, qu’il possède ou non un métier ou un entraînement permettant de développer cette compétence."
          },
          "compagnon": {
            "fluff": "Le style Qurra encourage les actions collectives, ainsi les compagnons qui agissent au moins à deux lors d’une bataille peuvent coordonner leurs manœuvres",
            "regles": ". Lorsqu’au moins deux spadassins Qurra combattent ensemble, ils peuvent ajouter leur rang dans la compétence Acrobatie à toutes les attaques de leur camarade, et cela de manière réciproque. De plus, si le groupe attaque la même cible (un groupe de brutes compte comme une cible), ce bonus s’applique également aux défenses actives faisant appel à cette compétence."
          },
          "maitre": {
            "fluff": "Un maître de l’École Qurra a dû faire face à une grande variété d’adversaires, de styles de combat et d’armes. Il est cependant toujours vivant, et il a appris beaucoup de tous ces ennemis.",
            "regles": "Ainsi, il peut dépenser un dé d’héroïsme pour utiliser n’importe laquelle des techniques de combat suivantes au rang 2 : Corps à corps, Coup de pommeau, Coup puissant, Désarmer, Double Attaque, Emprisonner, Feinte, Fente en avant, Frappe à deux mains, Marquer ou Riposte. Ces techniques de combat peuvent être utilisées en utilisant la compétence Arme improvisée et une arme adaptée (à la discrétion du MJ). Ainsi, comme il dispose de deux rangs dans cette technique de combat, ses dés explosent. Ces techniques de combat ne peuvent pas être augmentées (à moins que le maître n’ait accès à ces techniques de combat via une autre école d’escrime)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Rasmussen",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Pistolet ou pistolet de duel",
      "arme_display": "Pistolet ou pistolet de duel",
      "armes_categories": [],
      "specialisations": [
        "Courtisan",
        "Pistolet"
      ],
      "description_courte": "Certains Vendelars pensent qu’il ne suffit pas d’être à la page. Il faut innover ! Ils ont le sentiment que l’utilisation de l’épée pour régler les questions d’honneur est terriblement désuète et que ",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Pistolet",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’instinct",
          "variante": null,
          "ref": "tir d'instinct",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir précis",
          "variante": null,
          "ref": "tir precis",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Ligue de Vendel.",
        "academies": "L’école Rasmussen est enseignée en Vendel, mais elle se répand aujourd’hui dans d’autres nations, et l’on peut ainsi trouver des maîtres d’armes susceptibles de vous enseigner les techniques au pistolet d’Erl Rasmussen en Eisen, en Montaigne ou en Avalon.",
        "description_longue": [
          "Certains Vendelars pensent qu’il ne suffit pas d’être à la page. Il faut innover ! Ils ont le sentiment que l’utilisation de l’épée pour régler les questions d’honneur est terriblement désuète et que la toute dernière arme, le pistolet, devrait être celle de la dernière génération. Quelques individus, adeptes des préceptes de feu Erl Rasmussen, mettent ces idéaux en pratique. Ils s’entraînent au tir quotidiennement. Ce sont de fins tireurs, qui dégainent à une vitesse hors du commun.",
          "La guilde des spadassins n’approuve pas leurs activités et, officieusement, les deux groupes se livrent une véritable guerre des nerfs. La révélation récente de l’appartenance de maître Val Mokk à cette école a provoqué une véritable onde de choc dans les deux camps."
        ],
        "armes_pdf": "Pistolet ou pistolet de duel",
        "specialisations_pdf": [
          "Courtisan",
          "Pistolet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis sont parfaitement conscients qu’une fois qu’ils ont tiré, il leur faut un certain temps pour recharger. Mieux vaut alors avoir un autre pistolet sous la main. Ils apprennent donc à sortir et à tirer rapidement avec un autre pistolet.",
            "regles": "Vous pouvez sortir un pistolet et tirer en une seule et même action. En outre, réduisez votre pénalité de tir à courte portée de 5 points par niveau de maîtrise."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école Rasmussen ont appris à tirer de manière réflexe face à une menace.",
            "regles": "Vous pouvez utiliser une interruption pour attaquer avec un pistolet que vous avez en main (vous pouvez même utiliser d’un coup 3 actions pour sortir votre pistolet et tirer en guise d’interruption). En outre, ajoutez 10 mètres à la portée effective de vos tirs au pistolet."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école Rasmussen savent que si la vitesse a son importance, la précision est primordiale. Ils peuvent utiliser des actions pour viser une cible en particulier.",
            "regles": "Chaque action consécutive passée à viser à l’aide d’un pistolet confère aux dommages +1g0. Vous pouvez ainsi lancer jusqu’à 3 dés supplémentaires. Lorsque vous faites feu avec deux pistolets, l’habituel bonus de +1g1 s’applique, faisant passer les dommages à 6g4, 7g4 ou 8g4 selon le nombre d’actions passées à viser. En outre, vous gagnez un rang en Attaque (Armes à feu). Cela peut faire passer votre compétence à 6. Si tel n’est pas le cas, alors vous pourrez par la suite faire passer votre compétence de 5 à 6 en dépensant 25 points d’expérience. Enfin, ajoutez 10 mètres de plus à la portée effective de vos tirs au pistolet (pour un total de +20 mètres)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Rees",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Lutte",
      "arme_display": "Lutte",
      "armes_categories": [],
      "specialisations": [
        "Athlétisme",
        "Lutte"
      ],
      "description_courte": "C’est la famille Rees, qui depuis la fin du vieil empire, s’est retrouvée la gardienne des techniques de lutte. N’hésitant pas à enseigner ses techniques à tous ceux qui souhaitaient les apprendre, il",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lutte",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Rompre le combat",
          "variante": null,
          "ref": "rompre le combat",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Ligue de Vendel.",
        "academies": "L’école de lutte Rees n’est enseignée qu’aux lutteurs les plus prometteurs et qui intégreront ensuite cette famille. Ils peuvent être originaires de n’importe quelle nation, le recrutement ne dépend que de la compétence.",
        "description_longue": [
          "C’est la famille Rees, qui depuis la fin du vieil empire, s’est retrouvée la gardienne des techniques de lutte. N’hésitant pas à enseigner ses techniques à tous ceux qui souhaitaient les apprendre, ils finirent par réussir à réintégrer la lutte dans les techniques de combat enseignées aux soldats, d’abord de Vendel, puis rapidement d’Eisen, et enfin en Avalon et en Ussura.",
          "Mais, malins, ils réservèrent certaines techniques plus complexes aux initiés et aux membres de la famille. Aujourd’hui encore, ces techniques ne sont pas enseignées à tout le monde et une sélection des meilleurs lutteurs est effectuée par les membres féminins de la famille Rees tandis que les hommes enseignent leurs techniques à ces privilégiés dans leur école de Kirk.",
          "De plus, les femmes de la famille ont tendance à épouser les lutteurs qu’elles découvrent en imposant que leurs enfants gardent le nom de Rees, ce qui contribue à améliorer le niveau et à garder les meilleurs lutteurs de Théah dans le giron familial.",
          "Le problème de ce style de combat réside dans le fait qu’il s’effectue essentiellement au contact avec son adversaire, il suffit donc de maintenir le spadassin Rees à distance pour que celui-ci ne puisse utiliser ses techniques de combat."
        ],
        "armes_pdf": "Lutte",
        "specialisations_pdf": [
          "Athlétisme",
          "Lutte"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend les finesses de la lutte et",
            "regles": "peut donc utiliser toutes les compétences de l’entraînement Lutte avec un dé supplémentaire (à lancer mais pas à garder)."
          },
          "compagnon": {
            "fluff": "Un compagnon sait utiliser son corps pour se protéger très efficacement par des mouvements désordonnés et non prévisibles, par des esquives subites ou en plongeant au sol",
            "regles": "… toutes ces techniques lui permettent de bénéficier d’un bonus de 5 points sur son ND pour être touché, et même de 10 points contre un autre lutteur. De plus, il peut utiliser toutes ses compétences de l’entraînement Lutte avec deux dés supplémentaires (à lancer mais pas à garder)."
          },
          "maitre": {
            "fluff": "Un maître apprend à récupérer plus vite de ses blessures afin de combattre plus longtemps et efficacement sur un tapis de lutte.",
            "regles": "Toutes les phases, il récupère un point de blessure légère (donc jusqu’à dix par tour) et ses jets pour déterminer s’il encaisse une blessure grave se font avec un bonus d’une augmentation. Abattre un praticien confirmé de l’école Rees est loin d’être une partie de plaisir. De plus, il peut utiliser toutes ses compétences de l’entraînement Lutte avec trois dés supplémentaires (à lancer mais pas à garder)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Ricardo",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Arbalète de Ricardo",
      "arme_display": "Arbalète de Ricardo",
      "armes_categories": [],
      "specialisations": [
        "Arbalète",
        "Athlétisme"
      ],
      "description_courte": "La Vodacce fut célèbre durant la guerre de la Croix pour les nombreux mercenaires arbalétriers qu’elle fournit aux armées des différents Eisenfürst d’Eisen. Et malgré l’apparition des armes à feu, la ",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arbalète",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir à carreau spécial",
          "variante": null,
          "ref": "tir a carreau special",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir d’adresse",
          "variante": null,
          "ref": "tir d'adresse",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir précis",
          "variante": null,
          "ref": "tir precis",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Vodacce.",
        "academies": "L’école Ricardo n’est enseignée qu’en Vodacce, à quelques arbalétriers talentueux et à l’avenir tracé.",
        "description_longue": [
          "La Vodacce fut célèbre durant la guerre de la Croix pour les nombreux mercenaires arbalétriers qu’elle fournit aux armées des différents Eisenfürst d’Eisen. Et malgré l’apparition des armes à feu, la Vodacce continue de former des arbalétriers. En effet, cette arme puissante est plus sûre d’utilisation et plus silencieuse que ses cousines à poudre.",
          "Elle est, de fait, devenue une arme de tireur solitaire, de tireur d’élite, d’assassin. Aussi, une évolution de l’arme bien naturelle se produisit. Un armurier vodacci du nom de Ricardo réduisit sa taille, affina sa ligne, la rendit plus légère, tout en augmentant sa puissance grâce à un système complexe d’engrenages dans son boîtier de mécanisme. L’arbalète de Ricardo est de la taille d’un petit bouclier et s’arrime sur l’avant-bras, une flexion du poignet fait partir le carreau, le système mécanique de l’arbalète se met alors en branle, tendant la corde et insérant un nouveau carreau à partir du chargeur ; chargeur qui contient 5 carreaux.",
          "Ricardo mit également au point toute une série de carreaux aux effets très variés et adaptés à des arbalétriers exigeants. Son arme paraît simple d’utilisation mais toute une technique est nécessaire pour la maîtriser, sinon le coup ne part pas ou part mal.",
          "La faiblesse de cette technique de combat réside dans le fait que lorsque le chargeur est vide, le spadassin se retrouve sans munitions et est alors très vulnérable, il faut donc l’inciter à tirer ses carreaux alors que l’on ne risque rien."
        ],
        "armes_pdf": "Arbalète de Ricardo",
        "specialisations_pdf": [
          "Arbalète",
          "Athlétisme"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un apprenti sait utiliser cette arme de fabrication exceptionnelle qu’est l’arbalète de Ricardo.",
            "regles": "Il ajoute sa propre puissance au tir en infléchissant rapidement et puissamment son poignet. Il peut ajouter sa Gaillardise aux dommages comme pour une arme de mêlée."
          },
          "compagnon": {
            "fluff": "Un compagnon peut utiliser la technique dite de “l’agrafage”. Pour cela, sa cible doit être près d’un quelconque élément de mobilier ou d’un mur, et ce meuble ou ce mur doivent être en bois, plâtre, ou tout autre matériau qu’une telle arme puisse pénétrer.",
            "regles": "Vous effectuez alors un jet d’Attaque (Arbalète) avec 3 augmentations. Si vous réussissez votre jet, la cible doit dépenser un dé d’action pour se détacher ou subir un malus de 5 à son ND pour être touché par n’importe quelle autre attaque. Si vous lui agrafer les deux bras, il ne peut plus bouger et vous êtes libre de faire un carton sur cet adversaire immobile."
          },
          "maitre": {
            "fluff": "Un maître de l’école Ricardo est capable de tirer le meilleur de son arbalète et",
            "regles": "peut donc dépenser une action pour effectuer deux attaques. Il lance alors deux dés de moins sur ses jets d’attaque."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Robin Goodfellow",
      "origine": "officielle",
      "nations": [],
      "arme": "Arc long",
      "arme_display": "Arc long",
      "armes_categories": [],
      "specialisations": [
        "Arc",
        "Chasseur"
      ],
      "description_courte": "Robin Goodfellow a d’abord enseigné à sa bande de voleurs à se servir d’un arc long. Pendant des années, seuls une douzaine d’hommes étaient dans le secret, mais Robin finit par révéler sa technique à",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arc",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir en cloche",
          "variante": null,
          "ref": "tir en cloche",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tir précis",
          "variante": null,
          "ref": "tir precis",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "academies": "L’école Robin Goodfellow n’ouvre ses portes qu’aux habitants des îles d’Émeraude, car les souverains successifs d’Avalon ne souhaitaient voir cet art, si efficace dans les grandes batailles, quitter leur île.",
        "description_longue": [
          "Robin Goodfellow a d’abord enseigné à sa bande de voleurs à se servir d’un arc long. Pendant des années, seuls une douzaine d’hommes étaient dans le secret, mais Robin finit par révéler sa technique à tous les nouveaux venus. Les élèves apprirent à construire des arcs spéciaux et à décocher leurs flèches à une cadence ahurissante. Ils finirent par compter parmi les archers les plus rapides du monde, tirant à des distances extrêmes et désarmant même leurs adversaires de leurs traits.",
          "Cette école représente ce qui se fait de mieux dans l’utilisation de l’arc long. Les maîtres de ce style accomplissent des exploits impossibles à réaliser pour des archers de moindre talent.",
          "Sa principale faiblesse est la pause qui précède chaque tir. Un adversaire peut en profiter pour tirer ou pour plonger à l’abri."
        ],
        "armes_pdf": "Arc long",
        "specialisations_pdf": [
          "Arc",
          "Chasseur"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’une des premières leçons apprises par les apprentis est la manière de construire leur arc.",
            "regles": "L’arme ainsi fabriquée permet d’ajouter sa Gaillardise à tous ses jets de dommages avec l’arc comme s’il s’agissait d’une arme de mêlée."
          },
          "compagnon": {
            "fluff": "Une fois qu’ils savent viser et tirer, les élèves de cette école améliorent leur rapidité à encocher.",
            "regles": "Au rang de compagnon, un personnage peut dépenser une action pour effectuer deux attaques. Il lance alors deux dés de moins sur ses jets d’attaque."
          },
          "maitre": {
            "fluff": "",
            "regles": "Lorsqu’ils atteignent ce rang, les archers obtiennent gratuitement un bonus de 1 à leur Finesse. Ce bonus augmente également de 1 le rang maximum du personnage en Finesse. Par conséquent, un maître de l’école Robin Goodfellow peut augmenter sa Finesse jusqu’à 6 (voire 7 avec certains avantages)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Salinas",
      "origine": "officielle",
      "nations": [
        "Nations Pirates"
      ],
      "arme": "Sabre d’abordage",
      "arme_display": "Sabre d’abordage",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime",
        "Marin"
      ],
      "description_courte": "Cette école a été créée par le grand duelliste Roberto Salinas, connu pour sa grande connaissance des styles castillians et son bourlingage à travers le monde. Elle a pris naissance alors que Salinas ",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte de corps",
          "variante": null,
          "ref": "feinte de corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Aldana, Gallegos, Hirojosa ou Soldano.",
        "origine_texte": "Pirates et marins.",
        "academies": "À l’heure actuelle, il n’y a que trois maîtres du style Salinas et Roberto est l’un d’entre eux. Il faut donc trouver l’un de ces trois maîtres d’armes pour pouvoir apprendre cette école.",
        "description_longue": [
          "Cette école a été créée par le grand duelliste Roberto Salinas, connu pour sa grande connaissance des styles castillians et son bourlingage à travers le monde. Elle a pris naissance alors que Salinas se promenait dans le port de Barcino.",
          "Après avoir beaucoup navigué, il avait pu observer les Écoles des pirates. Un aspect remarquable de ces styles était la prédominance des sabres d’abordage avec de grandes gardes-panier plutôt que des armes plus légères. Plus tard, il se rendit compte que cela venait des mauvais traitements que cette arme supporte pendant les traversées. Une arme de marin doit supporter de longues années d’utilisation, d’exposition aux éléments et être capable de parer les coups des ennemis, qu’ils utilisent des masses, des rapières, des haches de bataille, des claymores ou des épées longues ; on ne sait jamais contre qui l’on va se battre en haute mer.",
          "Salinas en vint à apprécier ces sabres, mais il se rendit rapidement compte qu’ils étaient la cause du manque de grâce et de compétence des marins dans les Écoles d’escrime. Aussi développa-t-il une nouvelle école d’escrime, appropriée aux sabres des marins. L’École Salinas est le résultat de ses travaux.",
          "Salinas est facile à apprendre et inspirée de plusieurs Écoles castillianes. Fondamentalement, ce modèle apprend à son pratiquant à éviter et parer les coups de son adversaire tout en se positionnant idéalement pour le frapper. Cette École enseigne également à tirer profit du poids et de la puissance accrue du sabre sur la rapière, afin de causer des dommages plus importants. Salinas est pratique, fiable et rapide, comme son créateur l’a voulue, car les besoins d’un marin en matière d’escrime sont différents de ceux d’un spadassin. Comme dit précédemment, il est relativement facile d’apprendre l’École Salinas, en particulier pour les marins. D’abord, ils apprennent à utiliser leur sabre d’abordage avec grâce et vitesse, à la manière d’un spadassin utilisant une rapière ou un fleuret. Une fois habitués à l’utilisation de cette arme, on leur enseigne à frapper là où leur arme peut infliger un maximum de dommages. Ils apprennent ainsi à effectuer une douzaine de coups différents qui touchent tous des endroits vitaux : muscles, veines et artères qui causent une grande douleur et réduisent les capacités de l’adversaire. Les maîtres de cette École terminent souvent leurs combats en quelques secondes ; leurs assauts sont rapides et mortels, visant avec soin les zones vitales et maximisant la puissance du sabre d’abordage."
        ],
        "armes_pdf": "Sabre d’abordage",
        "specialisations_pdf": [
          "Escrime",
          "Marin"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Salinas enseigne d’abord à ses apprentis à utiliser leur sabre d’abordage avec grâce et vitesse.",
            "regles": "Vous ignorez le malus d’une augmentation en attaque normalement infligé à l’utilisateur de cette arme."
          },
          "compagnon": {
            "fluff": "Les compagnons apprennent à infliger des dommages handicapants qui réduisent les compétences martiales de leurs adversaires.",
            "regles": "Pour chaque blessure grave infligée à votre adversaire, il subit une pénalité de 1g0 à toutes ses actions tant qu’il n’a pas bénéficié de Premiers soins."
          },
          "maitre": {
            "fluff": "Les maîtres du style Salinas savent terminer un combat très rapidement, en finissant avec leur adversaire en un seul coup mortel.",
            "regles": "Une fois par round, vous pouvez effectuer une attaque spéciale : vous obtenez deux dés gardés supplémentaires sur vos dommages et votre adversaire subit un malus d’une augmentation sur sa parade active."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Scarlatti",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Fleuret",
      "arme_display": "Fleuret",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Assassin",
        "Escrime"
      ],
      "description_courte": "Si l’on comparait les différents styles d’escrime à des animaux, celui qui correspondrait le plus à l’école Scarlatti serait sans nul doute le serpent. En effet, les spadassins de cette école utilisen",
      "techniques_combat": [
        {
          "nom_base": "Érafler",
          "variante": null,
          "ref": "erafler",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Vodacce.",
        "academies": "Tout comme Ricardo, Scarlatti est surtout enseignée à des spadassins ayant une vocation d’assassin, car l’utilisation des poisons est réprouvée non seulement par la guilde des spadassins, mais également par les autorités. Être découvert signifierait être poursuivi par les Rasoirs et les polices des pays dans lesquels vous officiez.",
        "description_longue": [
          "Si l’on comparait les différents styles d’escrime à des animaux, celui qui correspondrait le plus à l’école Scarlatti serait sans nul doute le serpent. En effet, les spadassins de cette école utilisent une rapière ainsi que de multiples drogues et poisons.",
          "D’ailleurs, ces drogues et poisons, ils les utilisent également sur eux avant un combat afin de doper leurs réflexes et d’améliorer aussi bien leur puissance que leur encaissement. La mort la plus douloureuse possible, et pas forcément la plus rapide, est ce qu’ils recherchent. Les poisons dont ils recouvrent leur rapière ou leurs bagues (et gants, langue, cheveux…) sont particulièrement agressifs et abominables pour leurs victimes.",
          "La faiblesse de ce style vient du fait que le spadassin essaie de toucher son adversaire uniquement pour l’empoisonner, il suffit donc de connaître (ou de deviner) quel est l’élément de sa tenue qui est empoisonné et de l’éviter pour ensuite le vaincre facilement par des techniques d’escrime plus classiques."
        ],
        "armes_pdf": "Fleuret",
        "specialisations_pdf": [
          "Assassin",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un spadassin de l’école Scarlatti est mithridatisé pendant toute la durée de son apprentissage.",
            "regles": "Aussi, tous les poisons voient leurs effets diminués, à la discrétion du MJ, mais pour donner un ordre d’idée, un poison mortel infligera des dommages importants, le coma ou l’inconscience ; un soporifique verra ses effets diminuer des 2/3 ou disparaître ; un aveuglant ne sera que temporaire ; un affaiblissant n’aura pratiquement pas d’effets…"
          },
          "compagnon": {
            "fluff": "Un compagnon sait empoisonner les éléments de sa tenue de façon très efficace et imprévisible pour son adversaire (même sa langue peut faire l’affaire, lui- même étant immunisé !) et à frapper, également, de manière inattendue son ennemi.",
            "regles": "Vous effectuez un jet de Finesse contre le ND pour être touché de votre adversaire. Si vous réussissez, ce dernier ne peut utiliser de défense active pour éviter l’attaque, surpris qu’il est par votre technique non conformiste."
          },
          "maitre": {
            "fluff": "Un maître est devenu un expert dans l’art des poisons. Il connaît des poisons qui vous affecteront lorsqu’il vous soufflera au visage, d’autres qui agissent de façon olfactive ou de façon binaire (séparés, ils n’ont aucun effet, c’est mélangés qu’ils deviennent mortels) et donc utilisables par un tiers (son gant gauche imbibé d’un produit et le droit d’un autre, ainsi ce n’est pas mortel pour lui).",
            "regles": "Toutes ces techniques font qu’il fait ses jets liés à la compétence Poison comme si elle était de deux rangs supérieurs. De plus, les poisons qu’il utilise ont des effets plus prononcés (à la discrétion du MJ) et peuvent être utilisés lors d’un combat simplement en dépensant un dé d’héroïsme, ce qui simule la facilité qu’il a à empoisonner son adversaire. Lorsque l’on affronte un maître de l’école Scarlatti, il faut partir avec l’idée d’être empoisonné et donc toujours prévoir un antidote ; en espérant qu’il soit suffisamment puissant pour être efficace."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Shaktishaalee",
      "origine": "officielle",
      "nations": [],
      "arme": "Tulwar",
      "arme_display": "Tulwar",
      "armes_categories": [],
      "specialisations": [
        "Escrime",
        "Cavalier"
      ],
      "description_courte": "Shaktishaalee enseigne l’usage du tulwar, l’arme nationale du Tashil. Le tulwar est une arme à grande lame courbe, conçue pour frapper de taille. Les étudiants de cette école attaquent avec une grande",
      "techniques_combat": [
        {
          "nom_base": "Attaque de cavalerie",
          "variante": null,
          "ref": "attaque de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Charge de cavalerie",
          "variante": null,
          "ref": "charge de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "academies": "On ne peut apprendre l’école Shaktishaalee que dans la province du Tashil.",
        "description_longue": [
          "Shaktishaalee enseigne l’usage du tulwar, l’arme nationale du Tashil. Le tulwar est une arme à grande lame courbe, conçue pour frapper de taille. Les étudiants de cette école attaquent avec une grande férocité, frappant tous ceux qui se mettent en travers de leur chemin.",
          "Le désavantage de cette technique est d’être basée sur le combat monté, à tel point que des mouvements qui ne sont habituellement pas utilisés à cheval peuvent surprendre ses pratiquants."
        ],
        "armes_pdf": "Tulwar",
        "specialisations_pdf": [
          "Escrime",
          "Cavalier"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un Apprenti de Shaktishaalee utilise les mêmes mouvements quand il est à pied que quand il est à cheval.",
            "regles": "Vous pouvez utiliser la technique de combat Attaque de cavalerie même quand vous êtes à pied, à la place d’Attaque (Escrime)."
          },
          "compagnon": {
            "fluff": "Un Compagnon Shaktishaalee peut montrer pourquoi son école est réputée pour former les meilleurs spadassins montés du monde.",
            "regles": "Vous gagnez un rang gratuit en Attaque de cavalerie, ce qui peut faire passer votre rang à 6. Si ce n’est pas le cas, vous pourrez passer plus tard de 5 à 6 en dépensant 25 XP."
          },
          "maitre": {
            "fluff": "Un Maître Shaktishaalee est capable de démontrer pourquoi son style se nomme “Puissant”.",
            "regles": "Quand vous lancez les dommages d’une Attaque de cavalerie, vous pouvez relancer votre jet, et garder le résultat de votre choix. Par exemple, si vous avez 4 en Gaillardise et que vous prenez 3 Augmentations pour votre jet, vous lancez 4g0 (Gaillardise) + 3g0 (Augmentations) + 2g2 (dégâts du tulwar) = 9g2. Votre premier jet donne 1, 4, 5, 6, 6, 7, 9, 16, et 23; en gardant 2 dés, cela fait 39. Votre second jet donne 2, 4, 5, 7, 7, 7, 12, 18, et 19, pour un total de 37 en gardant 2 dés. Vous décidez que vous préférez infliger 39 blessures plutôt que 37, donc votre ennemi encaisse 39 blessures légères."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Skollvfesson",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Hache bipenne",
      "arme_display": "Hache bipenne",
      "armes_categories": [
        "Haches"
      ],
      "specialisations": [
        "Athlétisme",
        "Haches"
      ],
      "description_courte": "Cette technique de combat a été développée il y a des centaines d’années par les pillards vestens qui ravageaient les côtes des mondes civilisés de Théah comme l’Avalon, l’Ussura, la Montaigne, l’Eise",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Hache à deux mains",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Vestenmannavnjar.",
        "academies": "Aucune autre nation n’envisagerait de s’automutiler avant un combat ! Rien que pour cette raison, vous aurez compris que l’école Skollvfesson n’est enseignée que dans les îles vestens.",
        "description_longue": [
          "Cette technique de combat a été développée il y a des centaines d’années par les pillards vestens qui ravageaient les côtes des mondes civilisés de Théah comme l’Avalon, l’Ussura, la Montaigne, l’Eisen ou même la Castille, la Vodacce ou l’Empire du Croissant.",
          "Dans cette école originaire des fjords du Vestenmannavnjar, les élèves apprennent à fortifier leur corps et s’éveillent au sang afin de porter un violent coup de hache sous l’aiguillon de la souffrance : l’adversaire a l’horrible impression de recevoir la blessure qu’il vient d’infliger à son ennemi ! La tradition Skollvfesson fonde sa terrible réputation sur cette logique du talion : toute blessure infligée appelle une contre-blessure.",
          "Le spadassin ne porte qu’une paire de braies et sa hache à double tranchant. Avant tout combat, le guerrier s’auto-scarifie avec sa hache, s’infligeant volontairement de multiples blessures, il frappe également violemment sa hache sur ses coudes en criant des mots inintelligibles afin de mieux pouvoir entrer en transe.",
          "Quand il entre dans cette transe, le Vesten ressent moins les dommages et n’a peur de rien.",
          "La faiblesse de ce style réside dans sa violence. Il ne fait pas dans la finesse, un adversaire observateur trouvera donc de nombreuses ouvertures dans sa défense qu’il pourra exploiter à son avantage."
        ],
        "armes_pdf": "Hache bipenne",
        "specialisations_pdf": [
          "Athlétisme",
          "Hache à deux mains"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend tout d’abord les rituels d’auto- scarification et de concentration qui lui permettent d’entrer en transe, et ainsi de moins ressentir les dommages.",
            "regles": "Un apprenti de l’école Skollvfesson n’est sonné qu’à Détermination +1 (+2 avec Résistance à la douleur). Malheureusement, pour obtenir cette anesthésie de son corps, il est obligé de s’infliger volontairement 2d10 blessures légères pour lesquelles vous devrez effectuer un jet d’encaissement. De plus, il peut avancer l’un de ses dés d’action de (rang de maîtrise) phases, lorsqu’un adversaire lui inflige des dégâts. Enfin, il bénéficie également d’une réduction de 3 PP sur l’achat de l’avantage Baersark."
          },
          "compagnon": {
            "fluff": "",
            "regles": "Le compagnon peut dépenser 1 dé d’Héroïsme pour annuler 1 Blessure Grave. Lorsque le compagnon subit des dégâts (blessure grave) suite à une attaque adverse, il peut porter une attaque gratuite durant la même phase."
          },
          "maitre": {
            "fluff": "Le maître de l’école Skollvfesson sait faire abstraction de sa douleur pour continuer de se battre avec violence.",
            "regles": "Vous n’êtes sonné qu’à Détermination +2 (+3 avec Résistance à la douleur) et inconscient à (Détermination +1) x 2. Ainsi, un spadassin de l’école Skollvfesson avec une Détermination de 3 pourra encaisser 4 blessures graves avant d’être sonné et 8 avant d’être inconscient. De plus, si le maître possède l’avantage Baersark, il annule 1 blessure légère par phase lors d’une crise de rage baersark. Enfin, le niveau de peur du viking augmente de 3 rangs."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Smirnov",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Griffes",
      "arme_display": "Griffes",
      "armes_categories": [
        "Gant de combat"
      ],
      "specialisations": [
        "Athlétisme",
        "Gant de combat"
      ],
      "description_courte": "Cette école a été développée par Nikita Smirnov, un garde-chasse féru d’observation animale. À force d’épier les animaux, il en vint à imaginer des griffes utilisables en combat et qui ressemblaient à",
      "techniques_combat": [
        {
          "nom_base": "Défigurer",
          "variante": null,
          "ref": "defigurer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Double parade",
          "variante": null,
          "ref": "double parade",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Gant de combat",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Ussura.",
        "academies": "Tous ceux qui veulent apprendre les techniques de combat de l’école Smirnov se retrouvent une fois tous les trois ans à la fin de l’automne sur la place principale de Pavtlow où viennent les chercher les professeurs qui font rapidement le tri parmi eux en une quinzaine de jours, puis ils disparaissent dans la froideur de l’hiver ussuran. Après ces trois années, ils font leur réapparition en connaissant parfaitement leurs techniques de combat.",
        "description_longue": [
          "Cette école a été développée par Nikita Smirnov, un garde-chasse féru d’observation animale. À force d’épier les animaux, il en vint à imaginer des griffes utilisables en combat et qui ressemblaient à la fois à celles de l’ours et celles du loup.",
          "L’enseignement de ces guerriers repose sur l’étude du comportement animal et de l’utilisation des griffes métalliques attachées à leur avant-bras. Ils attaquent à la façon d’un chat ou d’un loup, se défendent à la manière d’un renard ou d’un ours, bref ils se comportent comme une bête pour affronter leur adversaire.",
          "La principale faiblesse de cette école vient du fait que toute personne connaissant bien le comportement animal pourra déduire des positions du spadassin de l’école Smirnov sa méthode d’attaque. Un second problème est que ses deux griffes sont des armes à courte portée et que quelqu’un les maintenant à distance sera capable d’en venir à bout plutôt facilement."
        ],
        "armes_pdf": "Griffes",
        "specialisations_pdf": [
          "Athlétisme",
          "Gant de combat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "Un apprenti apprend à utiliser de façon concomitante et sans malus ses deux griffes. De plus, connaissant parfaitement le comportement des animaux sauvages, il peut combattre ces derniers avec un bonus de deux augmentations sur toutes ses actions et un autre de 5 sur son ND pour être touché."
          },
          "compagnon": {
            "fluff": "Un compagnon sait effrayer les animaux comme les hommes avec beaucoup d’efficacité.",
            "regles": "Son niveau de peur augmente de 2 et tous les animaux fuient automatiquement, sauf s’ils sont retenus, auxquels cas leur maître se voit infliger un malus de deux dés pour leur faire effectuer n’importe quelle action (à l’exception de la fuite)."
          },
          "maitre": {
            "fluff": "Un maître sait sauter sur son adversaire à la manière d’un lynx, essayant de l’éventrer à l’aide de ses griffes.",
            "regles": "Pour effectuer cette manœuvre, il doit disposer d’au moins 5 mètres en ligne droite, dépenser un dé d’action, puis réussir une Attaque : Griffe avec un ND augmenté de 5. S’il réussit, son attaque ne peut être évitée de façon active, et les deux griffes infligent des dégâts (soit deux jets de dommages)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Teginbek",
      "origine": "officielle",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Yatagan ou sabre de cavalerie et faucon",
      "arme_display": "Yatagan ou sabre de cavalerie et faucon",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime",
        "Fauconnier"
      ],
      "description_courte": "Cette féroce école d’escrime est très ancienne chez les Kosars, mais elle a toujours un grand succès parmi la jeunesse. C’est un mélange de fauconnerie traditionnelle et de techniques de duel qui est ",
      "techniques_combat": [
        {
          "nom_base": "Attaque combinée",
          "variante": null,
          "ref": "attaque combinee",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Kosars.",
        "academies": "Cette école kosar n’est enseignée qu’aux fauconniers kosars les plus brillants.",
        "description_longue": [
          "Cette féroce école d’escrime est très ancienne chez les Kosars, mais elle a toujours un grand succès parmi la jeunesse. C’est un mélange de fauconnerie traditionnelle et de techniques de duel qui est toutefois particulièrement mortel. L’école s’appuie sur des attaques synchronisées de l’oiseau et du spadassin, un peu comme Kiriakin. Ainsi, alors que l’adversaire tente d’écarter le faucon qui essaie de lui crever les yeux, le spadassin pousse une attaque vicieuse et dévastatrice.",
          "Le spadassin apprend également à utiliser dans les duels son gant de fauconnier afin de parer les coups de son adversaire en attrapant sa lame, un peu comme les spadassins de l’École Eisenfaust. Le gant sert aussi, bien entendu, de perchoir au faucon ; il est généralement fait de cuir épais, et parfois renforcé de mailles en acier.",
          "Le yatagan est l’arme préférée des Kosars, mais certains d’entre eux ont adopté le sabre de cavalerie.",
          "La faiblesse de ce style est évidente : son faucon. Éliminez ce volatile et le spadassin Teginbek ne vous posera plus beaucoup de soucis…"
        ],
        "armes_pdf": "Yatagan ou sabre de cavalerie et faucon",
        "specialisations_pdf": [
          "Escrime",
          "Fauconnier"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti commence à développer un lien empathique avec son faucon. Ils restent ensemble constamment et apprennent à se mouvoir avec le plus de synchronisme possible.",
            "regles": "Chaque round, si le faucon n’est pas inconscient, le spadassin Teginbek reçoit un dé d’action supplémentaire et bien identifié (par une autre couleur par exemple) qui ne peut être utilisé que pour le faucon. À ce stade, le faucon est entraîné pour viser la marque faite par le spadassin. Ainsi, lorsqu’il réussit une tentative de Marquer (Escrime), il peut choisir de renoncer aux effets normaux de cette technique de combat. Ainsi, il fait alors bénéficier son faucon de deux dés lancés non gardés sur sa prochaine attaque. L’apprenti bénéficie également gratuitement de l’entraînement Gant de combat et ne subit pas la pénalité de main non directrice lorsqu’il l’utilise avec la technique de combat Emprisonner. Enfin, son faucon peut développer comme tour majeur la technique de combat Attaque aux yeux."
          },
          "compagnon": {
            "fluff": "Le lien entre l’escrimeur et le rapace devient plus aigu et intuitif. L’un de ses tours préférés est d’utiliser le faucon pour attaquer violemment son adversaire.",
            "regles": "Ainsi, lorsqu’il effectue un jet de Marquer (Escrime), il bénéficie du bonus standard de cette technique de combat auquel il ajoute celui d’apprenti. Vous pouvez également utiliser vos propres dés d’action pour faire agir le faucon."
          },
          "maitre": {
            "fluff": "Le maître Teginbek et son faucon agissent maintenant comme un seul être. Ils peuvent coordonner leurs attaques à un degré tel que les griffes du faucon deviennent une prolongation du poing de l’escrimeur.",
            "regles": "Ainsi, le spadassin Teginbek peut effectuer une attaque (Escrime) avec un ND augmenté de 10 pour effectuer une attaque coordonnée. Si cette dernière réussit, il effectue deux fois les dommages : une pour l’arme du spadassin et l’autre pour le faucon. Si le jet échoue, le ND pour frapper le faucon est réduit à 5 pour le reste du round."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Tie Xiong Kung",
      "origine": "officielle",
      "nations": [],
      "arme": "Poings et pieds",
      "arme_display": "Poings et pieds",
      "armes_categories": [
        "Pugilat"
      ],
      "specialisations": [
        "Arts martiaux offensifs",
        "Combat de rue"
      ],
      "description_courte": "Tie Xiong Kung est un art martial aux coups puissants qui se concentre sur le fait d’infliger les plus lourds dégâts possibles afin de neutraliser la menace ennemie rapidement et efficacement. Ce styl",
      "techniques_combat": [
        {
          "nom_base": "Blocage offensif",
          "variante": null,
          "ref": "blocage offensif",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup de pied sauté",
          "variante": null,
          "ref": "coup de pied saute",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Art martial offensif",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Manchette",
          "variante": null,
          "ref": "manchette",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "academies": "On ne peut apprendre l’école Tie Xiong Kung que dans la province du Koryo.",
        "description_longue": [
          "Tie Xiong Kung est un art martial aux coups puissants qui se concentre sur le fait d’infliger les plus lourds dégâts possibles afin de neutraliser la menace ennemie rapidement et efficacement. Ce style enseigné depuis plus de dix-sept siècles, a son origine parmi les héros guerriers de ce qui est aujourd’hui le royaume de Koryo. Il porte le nom de son fondateur, Tie Xiong, un homme étonnant, plein de force et de courage.",
          "Ce style apprend à ses étudiants à garder leurs adversaires à la limite de la portée de leurs bras, où ils peuvent les frapper avec de puissants coups de pied ou de poing, et où les attaques à leur encontre peuvent être bloquées par des mouvements infligeant eux- mêmes des dégâts. La principale faiblesse de cette école est sa dépendance par rapport à cette distance d’attaque qui doit être maintenue. Un ennemi se rapprochant un peu trop brisera cette tactique, et obligera le pratiquant à reculer ou à repousser l’assaillant."
        ],
        "armes_pdf": "Poings et pieds",
        "specialisations_pdf": [
          "Arts martiaux offensifs",
          "Combat de rue"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "On apprend aux étudiants de Tie Xiong Kung à frapper aussi fort que possible sur chacune de leurs attaques.",
            "regles": "Vos Manchettes infligent 1g2 dés de dommages."
          },
          "compagnon": {
            "fluff": "Les compagnons apprennent que les armes sont pratiquement des extensions du bras de leurs ennemis, et qu’elles doivent être brisées, comme un bras doit l’être.",
            "regles": "Vous pouvez utiliser une Manchette pour tenter de briser des armes. Pour essayer de frapper l’arme, lancez Finesse + Manchette contre le ND de votre opposant, plus deux Augmentations pour localiser votre attaque sur l’arme. Si vous touchez, effectuez un jet de dommages contre l’arme. Pour la briser, vous devez atteindre un ND basé sur l’arme visée. Cette attaque ne peut être parée par l’arme attaquée, toute tentative en ce sens conduit l’arme à être touchée automatiquement. Vous pouvez prendre des Augmentations sur votre attaque pour augmenter vos dégâts."
          },
          "maitre": {
            "fluff": "Des années d’entraînement et d’expérience ont rendu les jambes d’un maître assez fortes pour frapper avec la force d’un cheval.",
            "regles": "Quand vous frappez un adversaire avec un Coup de pied, celui-ci traite vos dégâts comme s’ils provenaient d’une arme à feu, causant une Blessure Grave pour chaque tranche de 10 points sur la marge d’échec de son Jet de Blessures (au lieu de 20)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Tréville",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Mousquet ou mousquet de Teschen",
      "arme_display": "Mousquet ou mousquet de Teschen",
      "armes_categories": [],
      "specialisations": [
        "Arme d’hast",
        "Fusils"
      ],
      "description_courte": "Les techniques relatives aux Mousquets de la famille Tréville sont assez récentes. On les mit au point plus particulièrement pour les mousquetaires mais elles se sont depuis démocratisées dans le rest",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arme d’hast",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Montaigne.",
        "academies": "Les techniques de l’école Tréville sont enseignées au sein de l’armée montaginoise, en particulier aux unités de mousquetaires.",
        "description_longue": [
          "Les techniques relatives aux Mousquets de la famille Tréville sont assez récentes. On les mit au point plus particulièrement pour les mousquetaires mais elles se sont depuis démocratisées dans le reste de l’armée montaginoise.",
          "Propreté et bon entretien de l’arme, utilisation efficace des arcs de tir, précision de la visée, ainsi que bonne mesure de la poudre contribuent à allonger la portée des Armes à feu. Cela ne veut pas dire qu’un élève de l’école Tréville est incapable de se défendre au corps à corps – loin de là. Il s’exerce grandement au maniement de la baïonnette, ce qui lui confère un avantage redoutable sur les adversaires qui ne s’attendent pas à faire face à des Armes d’hast.",
          "La principale faiblesse des techniques de l’école Tréville réside dans leur dépendance aux projectiles. Les techniques de corps à corps n’y sont pas aussi développées que dans les autres écoles d’escrime de Théah. Les lourds mousquets ne sont pas conçus comme des Armes d’hast, et face à des individus armés de lances et de piques, l’école Tréville ne s’avère guère efficace."
        ],
        "armes_pdf": "Mousquet ou mousquet de Teschen",
        "specialisations_pdf": [
          "Arme d’hast",
          "Mousquet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves du style Tréville développent une affinité avec les Mousquets et les baïonnettes.",
            "regles": "Vous bénéficiez de 10 mètres de portée supplémentaire lorsque vous utilisez un mousquet. En outre, vous recevez gratuitement une augmentation gratuite sur vos jets d’attaque avec la baïonnette au canon."
          },
          "compagnon": {
            "fluff": "Au fil du temps, les compagnons du style Tréville continuent d’améliorer leur adresse au tir.",
            "regles": "Vous bénéficiez désormais de 20 mètres de portée supplémentaire lorsque vous utilisez un mousquet. Enfin, vous ajoutez 10 points à votre initiative totale quand vous maniez la baïonnette au canon grâce à l’allonge que vous confère cette arme d’hast."
          },
          "maitre": {
            "fluff": "Les maîtres du style Tréville restent de fins tireurs en toutes circonstances.",
            "regles": "Vous bénéficiez maintenant de 30 mètres de portée supplémentaire lorsque vous vous servez d’un mousquet. En outre, vous pouvez utiliser un dé d’héroïsme pour annuler tous les modificateurs normaux aux ND pour être touchés d’une cible. Ainsi, quelle que soit la couverture, la distance et autres facteurs semblables, si votre victime dispose d’un ND de 20, vous ne devrez faire que 20 pour la toucher. Les modificateurs de ND spéciaux, comme la capacité du compagnon Aldana ou celle d’esquive de Pyeryem, s’appliquent toujours."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Vigilare",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Schiavone",
      "arme_display": "Schiavone (Épée)",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime",
        "Garde du corps"
      ],
      "description_courte": "Les dirigeants des Filles de Sophie complotent depuis des millénaires et planifient leurs intrigues politiques sur des siècles. Elles ont appris assez rapidement qu’une simple flèche ou lame tuant l’u",
      "techniques_combat": [
        {
          "nom_base": "Attaque en dégaine",
          "variante": null,
          "ref": "attaque en degaine",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Les Filles de Sophie.",
        "academies": "Seules les Filles de Sophie et Fils de Lugh peuvent apprendre l’école Vigilare.",
        "description_longue": [
          "Les dirigeants des Filles de Sophie complotent depuis des millénaires et planifient leurs intrigues politiques sur des siècles. Elles ont appris assez rapidement qu’une simple flèche ou lame tuant l’un de leurs pions pouvait briser un plan soigneusement conçu depuis des siècles. Afin de préserver leurs agents et leurs pions les plus importants, les Filles ont secrètement développé une école leur permettant de former des gardes du corps capables de protéger leurs intérêts.",
          "Carmella Parmaggiore fut une espionne talentueuse pendant de longues années avant d’être promue maître d’arme par les Filles de Sophie. Ayant travaillé comme domestique chez de nombreuses familles nobles de Vodacce, elle avait acquis, à la fois d’excellentes capacités de discrétion et l’apprentissage des écoles Ambrogia et Villanova. Carmella observa et charma plusieurs spadassins de ces deux familles afin qu’ils lui révèlent leurs secrets de famille et d’escrime. Elle enseigne aujourd’hui ses techniques aux gardes du corps des Filles de Sophie, et ce sont, d’ailleurs, très souvent des Fils de Lugh.",
          "Vigilare est à la fois le style de combat des gardes du corps des Filles de Sophie et une façon de penser. Carmella enseigne à ses élèves à ne pas utiliser d’armes dans leur main non directrice, comme l’école Villanova. Cela leur permet d’avoir une plus grande polyvalence dans leurs manœuvres : coups à deux mains, utilisation d’armes improvisées, tir avec un pistolet, ou protéger quelqu’un. Vigilare est conçue pour être utilisée à l’aide d’une arme d’escrime.",
          "Par nécessité, les gardes de Sophie sont souvent seuls et doivent régulièrement protéger leur Dame de multiples attaquants. Par conséquent, on enseigne aux praticiens de Vigilare à agir rapidement, frapper durement et foncer sur l’adversaire suivant. C’est pourquoi les combats des spadassins Vigilare sont particulièrement sanglants, ils doivent en effet éliminer tous leurs ennemis de façon certaine. L’école Vigilare enseigne également à ses praticiens à se comporter correctement dans la bonne société et à se déplacer discrètement afin de passer inaperçus parmi celle-ci. Cela leur permet de repérer les menaces potentielles avant qu’elles ne deviennent un véritable danger. De plus, ils n’hésitent pas à appliquer la philosophie de combat de Carmella (“Frappez le premier, frappez fort”) afin de neutraliser préventivement toute menace.",
          "La faiblesse du style Vigilare est le duel. En effet, on enseigne aux spadassins Vigilare à se battre contre de multiples adversaires. Aussi, s’ils doivent se battre longuement contre un seul adversaire doué, ils finissent toujours par commettre une erreur qui leur coûtera la vie."
        ],
        "armes_pdf": "Schiavone",
        "specialisations_pdf": [
          "Escrime",
          "Garde du corps"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un apprenti du style Vigilare a appris à se battre contre plusieurs adversaires simultanément.",
            "regles": "Vous bénéficiez d’une augmentation gratuite sur tous vos jets d’attaque et de défense lorsque vous êtes engagés contre au moins trois adversaires simultanément."
          },
          "compagnon": {
            "fluff": "Le compagnon maîtrise la capacité d’infliger un coup dévastateur à ses ennemis.",
            "regles": "Dépensez des dés d’actions (quantité limitée par votre rang de Finesse) avant d’effectuer votre première attaque. En réalité, vous venez d’effectuer un assaut particulièrement véloce sur plusieurs adversaires en même temps (autant que de dés d’action que vous avez dépensés). Si votre attaque réussit, ils encaissent tous immédiatement une blessure grave. Par contre, chacun d’eux peut effectuer une défense active afin d’éviter d’être blessé."
          },
          "maitre": {
            "fluff": "Un maître de l’école Vigilare sait analyser les faiblesses de multiples adversaires, les observer et réagir rapidement afin de tous les mettre K.O. Cet apprentissage a développé ses réflexes et sa vivacité d’esprit.",
            "regles": "Lorsqu’il atteint ce rang, le spadassin Vigilare obtient gratuitement un bonus de 1 à son Esprit. Ce bonus augmente également de 1 le rang maximum du personnage en Esprit. Par conséquent, un maître de l’école Vigilare peut augmenter son Esprit jusqu’à 6 (voire 7 avec certains avantages)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Vipereus Morsus",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Dague, miséricorde ou poignard",
      "arme_display": "Dague, miséricorde (Couteau) ou poignard",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Combat de rue",
        "Couteau"
      ],
      "description_courte": "Les assassins de la Rilasciare ont développé une technique vicieuse qui leur permet d’approcher leur cible pour lui asséner promptement un coup fatal. Bien qu’il ne s’agisse pas d’une école officielle",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Courtepointe.",
        "origine_texte": "Rilasciare.",
        "academies": "Seuls les membres de la Rilasciare peuvent apprendre l’école Vipereus Morsus.",
        "description_longue": [
          "Les assassins de la Rilasciare ont développé une technique vicieuse qui leur permet d’approcher leur cible pour lui asséner promptement un coup fatal. Bien qu’il ne s’agisse pas d’une école officielle (en dehors de l’organisation, peu de monde sait qu’elle existe), elle se révèle précieuse quand le temps est compté et qu’une cible doit définitivement disparaître. Ils l’appellent Vipereus Morsus, une élégante expression de vieux Théan qui signifie “la morsure de la vipère”.",
          "Vipereus Morsus naquit d’une prétention toute pratique – s’assurer que la cible succombe au coup. Ses pratiquants n’ont souvent qu’une seule et unique occasion de frapper et doivent en faire le meilleur usage possible. Elle est conçue pour porter des coups discrets, rapides et fatals. En outre, elle privilégie l’utilisation de longs poignards plutôt que d’armes d’escrime. En tant que moyen d’assassinat, elle est brutale : il s’agit d’attaquer l’adversaire par surprise et de l’achever avant même qu’il ne se rende compte qu’il est en danger. Les élèves de Vipereus Morsus apprennent à frapper les points vitaux, comme l’artère carotide ou entre les côtes. Le coup occasionne une grosse hémorragie ou fait éclater un organe vital – juste ce qu’il faut pour que le travail soit bien fait. Si la victime ne décède pas tout de suite, elle saignera rapidement à mort. Même ceux qui reçoivent des soins médicaux ne survivent pas plus d’un jour ou deux.",
          "Toutefois, il existe des inconvénients. Comme elle n’est pas conçue pour les combats qui durent, elle n’offre que peu de protection et ne peut venir à bout d’un adversaire patient. Tout spadassin compétent et prévenu peut la parer aisément et les combats un peu trop longs tournent toujours en défaveur de l’utilisateur. La plupart des pratiquants de Vipereus Morsus apprennent à décrocher du combat si leurs premiers coups ne portent pas.",
          "Vipereus Morsus est une école de combat grossière et déshonorante. Nul dame ou gentilhomme habité du plus petit soupçon de fair-play ne songerait à y avoir recours. Les Rilasciare s’en servent comme d’un moyen répugnant pour une fin malheureusement nécessaire – terrasser ceux que la Cour Secrète condamne. Dans leur esprit, nul meurtre n’est noble. Si cela doit être fait, c’est sous le coup de quelque force majeure ; le fair- play n’intervient jamais. Les plus mystérieux assassins de la Rilasciare agrémentent cette école de poison ou de quelque autre perfidie, juste pour renforcer leurs chances…"
        ],
        "armes_pdf": "Dague, miséricorde ou poignard",
        "specialisations_pdf": [
          "Combat de rue",
          "Couteau"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "Vipereus Morsus annule la pénalité de main non-directrice lorsque vous utilisez un poignard et offre une augmentation gratuite à votre jet d’attaque quand vous vous servez d’un stylet. Les coups ciblés à l’aide d’un stylet bénéficient d’une augmentation gratuite."
          },
          "compagnon": {
            "fluff": "Les compagnons de Vipereus Morsus manquent rarement leur coup car ils veulent toujours frapper juste.",
            "regles": "Lorsque vous ratez une attaque au poignard de moins de deux fois votre compétence Attaque (Couteau), le coup porte tout de même au but. Déterminez les dommages comme d’habitude ; votre adversaire n’a pas droit à un jet de blessure suite au coup."
          },
          "maitre": {
            "fluff": "Les maîtres savent profondément lacérer leur adversaire d’un seul coup.",
            "regles": "Si votre adversaire réussit son jet de blessure pour des dommages que vous lui avez occasionnés à l’aide d’un jet d’Attaque (Couteau), vous pouvez le forcer à refaire le jet. Un seul jet supplémentaire est autorisé par coup ; s’il l’emporte la deuxième fois, pas de chance pour vous."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null
    },
    {
      "nom": "Winckler",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Masse d’armes ou matraque",
      "arme_display": "Masse d’armes ou matraque",
      "armes_categories": [],
      "specialisations": [
        "Garde du corps",
        "Masses"
      ],
      "description_courte": "À travers tout Théah, on trouve de nombreux nobles et bourgeois exposés à de multiples risques. Très vite, ils ressentirent le besoin d’être efficacement protégés. C’est ainsi qu’il y a soixante-quatr",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Masse ou Matraque",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Leibwächter.",
        "origine_texte": "Eisen.",
        "academies": "L’école est dirigée par Victor Winckler, le petit-fils du fondateur, qui s’assure que chacun de ses élèves est capable de se concentrer sur son apprentissage et n’a pas le cerveau trop épais. De plus, il n’autorise l’enseignement du style Winckler qu’aux personnes disposant déjà de capacités martiales. Ceci pour décourager les assassins, les espions et autres voleurs d’intégrer son école afin d’en percer les secrets.",
        "description_longue": [
          "À travers tout Théah, on trouve de nombreux nobles et bourgeois exposés à de multiples risques. Très vite, ils ressentirent le besoin d’être efficacement protégés. C’est ainsi qu’il y a soixante-quatre ans, un spadassin du nom d’Albrecht Winckler pratiquant le style Eisenfaust développa ses propres techniques de protection rapprochées.",
          "En effet, l’homme s’aperçut qu’il était en mesure de satisfaire cette demande et ouvrit une école afin de former les gardes du corps réclamé. Il transforma alors de simples fermiers et laboureurs en de véritables et efficaces gardes du corps.",
          "Ce style enseigne l’utilisation pragmatique de la masse, de la matraque et des mains nues. Ces différentes pratiques permettent en effet de se battre dans les espaces confinés des manoirs, châteaux, villas ou entrepôts de leurs clients et permettent également de maîtriser facilement malotrus et pickpockets.",
          "La faiblesse de ce style est évidente. En effet, ils sont prêts à se sacrifier pour sauver la personne qu’ils défendent, laissant souvent d’impressionnantes ouvertures dans leur système de défense."
        ],
        "armes_pdf": "Masse d’armes ou matraque",
        "specialisations_pdf": [
          "Garde du corps et Masse ou Matraque"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti de l’école Winckler apprend à voir venir le danger qui guette son client et lui-même.",
            "regles": "Il bénéficie d’une augmentation gratuite sur tous ses jets de Qui-vive (surtout afin de repérer des personnes faisant usage des compétences Déguisement, Déplacement silencieux, Discrétion ou Guet-apens). De plus, l’apprenti bénéficie gratuitement de l’enseignement du métier Garde du corps."
          },
          "compagnon": {
            "fluff": "Le compagnon du style Winckler apprend à combattre et venir en aide à un client.",
            "regles": "Il peut renoncer à un dé d’action qu’il cèdera à un tiers qui devra obligatoirement utiliser ce dernier afin d’effectuer une Défense Active. Il ne peut céder ainsi qu’un nombre de dés d’action égal à son rang de maîtrise."
          },
          "maitre": {
            "fluff": "Un maître sait très bien qu’il devra peut-être un jour se sacrifier afin de sauver son client.",
            "regles": "Ainsi, afin de se préparer à un tel sacrifice, le maître fait passer sa compétence Interposition de 5 à 6. De plus, il apprend à se servir de sa masse, de sa matraque ou de ses poings pour assommer les importuns. Pour cela, il doit réussir une attaque contre le ND de son adversaire avec quatre augmentations (il vise la nuque). Lorsqu’il réussit, tous les dés de dommages qu’il lance sont gardés. Si l’adversaire atteint alors deux fois son rang de Détermination en blessures graves, il est assommé. Mais en réalité, il n’a véritablement encaissé que (Gaillardise -1) blessures légères. Il se réveillera alors dans (60 - Gaillardise dés) minutes."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Wu Tsain",
      "origine": "officielle",
      "nations": [],
      "arme": "Arts martiaux défensifs",
      "arme_display": "Arts martiaux défensifs",
      "armes_categories": [],
      "specialisations": [
        "Arts martiaux défensifs",
        "Feng Shui Shi (Géomancien)"
      ],
      "description_courte": "Dire que Wu Tsain est un art martial pacifique est largement en dessous de la vérité. Non seulement il enseigne l’utilisation de mouvements de défense, mais il est en plus non violent. Un étudiant con",
      "techniques_combat": [
        {
          "nom_base": "Céder la place",
          "variante": null,
          "ref": "ceder la place",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Art martial défensif",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Retourner les attaques",
          "variante": null,
          "ref": "retourner les attaques",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "academies": "On ne peut apprendre l’école Wu Tsain que dans la province du Khimal.",
        "description_longue": [
          "Dire que Wu Tsain est un art martial pacifique est largement en dessous de la vérité. Non seulement il enseigne l’utilisation de mouvements de défense, mais il est en plus non violent. Un étudiant contrarie son adversaire en le désorientant et en l’embrouillant avec de soudaines attaques s’arrêtant juste avant le contact.",
          "Il s’agit d’un art relativement nouveau, vieux d’environ soixante-dix ans. Son fondateur était un Feng Shui Shi qui voulait combiner son besoin de se protéger avec la philosophie de sa religion. Toutes les positions et tous les mouvements de ce style sont analogues aux règles de la géomancie. En conséquence, le pratiquant préfère retourner l’énergie d’un adversaire vers lui, plutôt que de s’investir lui-même dans l’énergie négative d’une attaque. La faiblesse de cette école est son pacifisme même. Si un ennemi sait que sa cible ne ripostera pas vraiment, il l’attaquera sans peur de représailles."
        ],
        "armes_pdf": "Arts martiaux défensifs",
        "specialisations_pdf": [
          "Arts martiaux défensifs",
          "Feng shui shi"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un apprenti reste calme face aux attaques de son ennemi. Il apprend également comment effectuer de fausses attaques qui brisent le chi de son adversaire.",
            "regles": "Vous bénéficiez d’une augmentation gratuite lorsque vous utilisez la compétence Esquive en Défense Active. Quand vous faites une attaque pour Marquer, vous pouvez renoncer aux deux options habituelles (soit il y a un public, il bénéficie alors d’un point de réputation supplémentaire (un seul possible lors du même combat), soit son adversaire se retrouve avec un ND diminué de 10 [minimum 5] jusqu’à ce qu’il reprenne confiance en réussissant une passe d’arme contre l’auteur du marquage.). Si vous le faites, vous pouvez augmenter son prochain dé d’action de 1, plus le nombre d’augmentations que vous avez pris sur votre jet de Marquer. Si ce dé d’action dépasse 10, il est tout simplement écarté."
          },
          "compagnon": {
            "fluff": "Les compagnons se perfectionnent encore plus dans l’art de leur propre défense.",
            "regles": "Vous gardez maintenant un dé de plus (+0g1) quand vous utilisez Esquive en défense active. De plus, vous n’avez plus besoin d’abandonner l’option sur les dés d’héroïsme lors de l’utilisation de Marquer pour augmenter le prochain dé d’action de votre ennemi. En d’autres termes, quand vous Marquez un adversaire, vous augmentez son prochain dé d’action comme décrit pour les apprentis, ET vous lui faîtes perdre 1 point de réputation ou 10 points sur son ND pour être touché."
          },
          "maitre": {
            "fluff": "Les maîtres de Wu Tsain plient comme le roseau face aux attaques.",
            "regles": "Votre rang dans la compétence Esquive est augmenté de 1, pouvant ainsi le faire passer à 6. Si ce n’est pas le cas, vous pourrez plus tard le faire passer de 5 à 6 en dépensant 25 XP. De plus, vous n’avez plus aucun choix à faire sur vos actions de Marquer : vous augmentez son prochain dé d’action, vous lui faites perdre 1 point de réputation ET 10 points sur son ND pour être touché."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Yesukai",
      "origine": "officielle",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Yatagan",
      "arme_display": "Yatagan",
      "armes_categories": [],
      "specialisations": [
        "Cavalier",
        "Escrime"
      ],
      "description_courte": "Les Kosars sont parmi les meilleurs cavaliers de Théah, mais également des bandits impitoyables capables de raser une petite ville ussurane en moins d’une journée !",
      "techniques_combat": [
        {
          "nom_base": "Charge de cavalerie",
          "variante": null,
          "ref": "charge de cavalerie",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Désarçonner",
          "variante": null,
          "ref": "desarconner",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Kosars.",
        "academies": "Cette école kosar n’est enseignée qu’aux cavaliers kosars les plus brillants.",
        "description_longue": [
          "Les Kosars sont parmi les meilleurs cavaliers de Théah, mais également des bandits impitoyables capables de raser une petite ville ussurane en moins d’une journée !",
          "Comme ailleurs dans le monde, les Kosars règlent leurs différents par l’intermédiaire de duels, mais contrairement aux autres nations, les leurs n’ont pas lieu à pied, mais à dos de cheval, un yatagan à la main. Voltigeurs hors pairs, ces affrontements sont un véritable spectacle équestre au cours duquel les deux cavaliers font usage des acrobaties les plus téméraires pour désarçonner leur adversaire et prouver leur bon droit.",
          "Aussi, afin de toujours être en position de force, certains Kosars s’entraînèrent spécifiquement pour ces duels, donnant, au fil des siècles, naissance à l’École Yesukai. Un guerrier Yesukai est plus à l’aise sur son cheval qu’au sol lorsqu’il doit combattre. Vous pourrez par exemple le voir vous charger debout sur son cheval, prêt à bondir, ou encore pourrait-il ordonner à son cheval de se mettre à genoux pour qu’il puisse se glisser sous le ventre du vôtre et se relever violemment pour vous désarçonner. En bref, il est capable de faire à peu près tout ce qu’il souhaite sur sa monture.",
          "Toutefois, les guerriers Yesukai ont deux grandes faiblesses : leur style de combat n’est efficace que sur leur monture, il suffit donc d’abattre cette dernière pour les handicaper de manière importante. Ensuite, leur trop grande confiance en eux peut les amener à faire des erreurs lorsqu’ils effectuent certaines de leurs voltiges, à vous de faire en sorte qu’un tel événement se produise."
        ],
        "armes_pdf": "Yatagan",
        "specialisations_pdf": [
          "Cavalier (Voltige devient une compétence de base)",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’école Yesukai enseigne tout d’abord à ses étudiants à utiliser leur yatagan pour attaquer et leur monture pour se défendre.",
            "regles": "Lorsque vous utilisez un yatagan d’une seule main, vous obtenez une augmentation gratuite sur n’importe quelle défense active effectuée avec la compétence Équitation, mais également à votre ND pour être touché lorsque vous êtes monté. Enfin, vous bénéficiez d’une augmentation gratuite lorsque vous tentez de maîtriser votre cheval sans vous servir des rênes. Il vous faut bien évidemment être à cheval pour profiter de tous ces avantages."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’École Yesukai sont de véritables as de la voltige équestre.",
            "regles": "Ils reçoivent un rang supplémentaire dans leur compétence Voltige, ce qui peut les amener au rang 6. Si tel n’est pas le cas, ils pourront, plus tard, augmenter leur rang dans cette compétence de 5 à 6. De même ils sont capables d’effectuer une manœuvre qu’ils appellent “Vider les étriers”. Cette manœuvre consiste simplement à “déchausser” simultanément les deux étriers pour se laisser tomber en arrière et s’allonger sur l’arrière- train du cheval, évitant ainsi le coup ennemi tout en permettant de porter un coup dans le dos de son adversaire. Pour réussir cette manœuvre, le compagnon Yesukai doit dépenser une action (de réserve ou d’interruption), réussir un jet de Voltige contre le jet d’attaque de son adversaire +10. S’il y parvient, il peut alors effectuer une attaque avec trois augmentations de malus."
          },
          "maitre": {
            "fluff": "Un maître de l’École Yesukai est capable d’effectuer en combat des acrobaties équestres absolument époustouflantes. Alors que son cheval est au galop, il peut prendre appui sur le pommeau de sa selle, pour envoyer un violent coup de pied à son adversaire, avant de passer sous le ventre de son cheval pour se remettre en selle ! Et ainsi de suite.",
            "regles": "Ainsi, un maître Yesukai monté sur son cheval peut effectuer des “attaques de voltige”. Pour cela, il utilise sa compétence Voltige en lieu et place de sa compétence Attaque et les dommages sont calculés ainsi : (Gaillardises de la monture et de son cavalier) dés lancés et (Gaillardise du cavalier) dés gardés. Si l’adversaire ainsi frappé était lui aussi monté, il est désarçonné s’il encaisse au moins une blessure grave."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Ying Sun Wo",
      "origine": "officielle",
      "nations": [],
      "arme": "Arts martiaux offensifs",
      "arme_display": "Arts martiaux offensifs",
      "armes_categories": [],
      "specialisations": [
        "Arts martiaux offensifs",
        "Combat de rue"
      ],
      "description_courte": "Ying Sun Wo est un art martial dangereux, inspiré des attaques du faucon et d’autres prédateurs sauvages. Il ne se limite pas aux mouvements considérés comme fair-play ou même honorables, mais se conc",
      "techniques_combat": [
        {
          "nom_base": "Défigurer",
          "variante": null,
          "ref": "defigurer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Art martial offensif",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Feinte de corps",
          "variante": null,
          "ref": "feinte de corps",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Griffe",
          "variante": null,
          "ref": "griffe",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "academies": "On ne peut apprendre l’école Ying Sun Wo que dans les provinces du Tashil et du Tiakhar.",
        "description_longue": [
          "Ying Sun Wo est un art martial dangereux, inspiré des attaques du faucon et d’autres prédateurs sauvages. Il ne se limite pas aux mouvements considérés comme fair-play ou même honorables, mais se concentre plutôt sur l’attaque des zones vulnérables ou des points faibles. Petit à petit, les enseignants du Ying Sun Wo ont migré vers le Tiakhar où il est maintenant l’art martial prédominant parmi les nobles et les militaires.",
          "Les créateurs de ce style ont passé l’essentiel de leur temps dans les montagnes du Tashil à observer les animaux sauvages pour trouver de nouveaux mouvements à mimer. Ils ont développé des enchaînements de courts assauts brutaux et de longues attaques qui peuvent être extrêmement efficaces. Toutefois, si un adversaire arrive à percevoir le rythme dans le style du pratiquant, il pourra en anticiper les mouvements."
        ],
        "armes_pdf": "Arts martiaux offensifs",
        "specialisations_pdf": [
          "Arts martiaux offensifs",
          "Combat de rue"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "La première chose qu’un apprenti apprend est de parer les coups.",
            "regles": "Vous bénéficiez d’une augmentation gratuite quand vous utilisez Blocage comme Défense Active."
          },
          "compagnon": {
            "fluff": "Les maîtres enseignent qu’un ennemi est comme un serpent avec qui il faut agir comme le ferait un faucon pour vaincre un adversaire, en fermant ses serres autour du cou du serpent.",
            "regles": "Vous avez appris le Sheh Ji Bai Shou (“Main Écrasant le Serpent”), une attaque avec Griffe frappant à la gorge de l’ennemi. Pour effectuer cette attaque, vous devez utiliser deux dés d’action (un seul doit être “légal” pour cette phase). Lancez ensuite Finesse + Griffe ou Finesse + Coup à la gorge, en choisissant la compétence de rang le plus élevé. Le ND pour ce jet est le ND pour être touché de la cible + 20. Si cette attaque réussit, vous infligez automatiquement une Blessure Grave, réduisez le ND de la cible de 5, et enfin lancez les dégâts pour une attaque à mains nues normale. Vous pouvez prendre des augmentations sur votre jet d’attaque afin d’accroître vos dégâts."
          },
          "maitre": {
            "fluff": "Les maîtres du Ying Sun Wo sont devenus très performants sur l’attaque du Sheh Ji Bai Shou, et l’utilisent souvent en conjonction avec un coup supplémentaire du pied ou de leur main libre.",
            "regles": "Réaliser cette attaque ne nécessite plus 2 dés d’action, et son ND n’est plus augmenté que de 10 points. Vous pouvez augmenter le ND du Sheh Ji Bai Shou de 10 points supplémentaires. Si vous le faites et que votre attaque porte, vous pouvez dépenser un dé d’action (qui n’a pas besoin d’être “légal” pour la phase en cours) afin d’effectuer immédiatement une attaque avec coup de pied, Attaque (Arts martiaux offensifs), ou Attaque (Combat de rue)."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    },
    {
      "nom": "Yorak",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Lutte",
      "arme_display": "Lutte",
      "armes_categories": [],
      "specialisations": [
        "Athlétisme",
        "Lutte"
      ],
      "description_courte": "Pour Yorak, dit Yorak l’Ancien, la plus grande vertu d’un lutteur est sa ténacité. Son école, qui ne possède que peu d’étudiants, est basée sur le credo de ne jamais fléchir ; malheureusement cette ve",
      "techniques_combat": [
        {
          "nom_base": "Assommer",
          "variante": null,
          "ref": "assommer",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Coup d’épaule",
          "variante": null,
          "ref": "coup d'epaule",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lutte",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Force d’âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Dobrynya.",
        "origine_texte": "Ussura.",
        "academies": "Uniquement à Sousdal en Ussura, auprès de Yorak l’ancien, son inventeur.",
        "description_longue": [
          "Pour Yorak, dit Yorak l’Ancien, la plus grande vertu d’un lutteur est sa ténacité. Son école, qui ne possède que peu d’étudiants, est basée sur le credo de ne jamais fléchir ; malheureusement cette vertu n’arrange pas la réputation de l’école car, depuis sa création il y a une quinzaine d’années, au moins cinq élèves sont morts à l’entraînement pour avoir appliqué à la lettre cette devise. Tous les membres gagnent en entrant dans cette école l’épée de Damoclès Rivalité : école de Braslyn (1PP) qui ne leur rapporte rien mais simule leur antagonisme avec l’autre école de lutte de Sousdal.",
          "La faiblesse de cette école réside bien entendu dans le fait d’encaisser les coups de l’adversaire avant de porter les siens. Un jour ou l’autre on finit par rencontrer quelqu’un de plus fort que soi et l’on finit au tapis."
        ],
        "armes_pdf": "Lutte",
        "specialisations_pdf": [
          "Athlétisme",
          "Lutte"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprentissage est difficile dans l’école et seuls les plus résistants peuvent continuer à endurer la douleur de l’entraînement.",
            "regles": "L’apprenti Yorak reçoit gratuitement l’avantage Résistance à la douleur."
          },
          "compagnon": {
            "fluff": "Le compagnon de l’école est comme un pilier de pierre, il ne fléchit quasiment plus devant la douleur d’une blessure – quelle qu’elle soit.",
            "regles": "Le compagnon Yorak peut ajouter son Rang de maîtrise en dés lancés (mais pas gardés) à n’importe quel jet de Gaillardise face à des blessures ou à la douleur en général."
          },
          "maitre": {
            "fluff": "Les maîtres Yorak sont plus que rares. À l’heure actuelle, il n’y a que Yorak l’Ancien et son fils qui aient réussi à atteindre ce rang de maîtrise. Leur résistance face à la douleur arrive à un tel point qu’on les dit complètement insensibles – en tous points…",
            "regles": "Le maître Yorak peut ajouter son Rang de maîtrise dans l’école à n’importe quel jet de Gaillardise (dés gardés) fait pour encaisser des dommages. Autrement dit, pour encaisser des blessures, un maître lance 6g3, en plus, sur son jet, le niveau de maître se cumulant avec celui de compagnon… Néanmoins, vu la perte de cette école en nombre d’étudiants, un membre de l’école Yorak de ce niveau perd 5 points de moralité, représentant son impassibilité à l’encontre de toute situation."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null
    },
    {
      "nom": "Zheng Yi Quan",
      "origine": "officielle",
      "nations": [],
      "arme": "Arts martiaux offensifs, Arts martiaux défensifs",
      "arme_display": "Arts martiaux offensifs, Arts martiaux défensifs",
      "armes_categories": [],
      "specialisations": [
        "Arts martiaux offensifs",
        "Arts martiaux défensifs"
      ],
      "description_courte": "Zheng Yi Quan est le plus vieil art martial de tout le Cathay, avec une histoire écrite sur plus de 2000 ans. À l’origine, il fut créé par un ordre de moines reclus dans un temple au cœur des montagne",
      "techniques_combat": [
        {
          "nom_base": "Coup de pied réflexe",
          "variante": null,
          "ref": "coup de pied reflexe",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Esquive acrobatique",
          "variante": null,
          "ref": "esquive acrobatique",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Esquive de projectiles",
          "variante": null,
          "ref": "esquive de projectiles",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Art martial défensif et Art martial offensif",
          "ref": "exploiter les faiblesses",
          "source": "pdf_combat"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "pdf_combat"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "academies": "On ne peut apprendre l’école Zheng Yi Quan que dans la province du Han Hua.",
        "description_longue": [
          "Zheng Yi Quan est le plus vieil art martial de tout le Cathay, avec une histoire écrite sur plus de 2000 ans. À l’origine, il fut créé par un ordre de moines reclus dans un temple au cœur des montagnes. Toutefois, l’un de leurs maîtres finit par admettre qu’ils ne devaient pas rester cloîtrer, mais sillonner le pays afin d’enseigner leur style de combat aux paysans pour les aider à se défendre contre les bandits.",
          "Il s’agit de l’un des seuls arts martiaux à combiner à la fois des techniques offensives et des mouvements défensifs. Ce style se concentre sur la mobilité et la défense, en particulier contre les flèches utilisées par les bandits. Sa principale force est sa grande variété d’attaques et de défenses, mais c’est aussi sa grande faiblesse ; avec autant d’options parmi lesquelles choisir, l’étudiant peut parfois hésiter et présenter quelques instants de vulnérabilité qui pourront être exploités par un ennemi rapide."
        ],
        "armes_pdf": "Arts martiaux offensifs, Arts martiaux défensifs",
        "specialisations_pdf": [
          "Arts martiaux offensifs",
          "Arts martiaux défensifs"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend que la seule utilité du Zheng Yi Quan est sa propre défense.",
            "regles": "Vous pouvez ajouter votre niveau de Maîtrise du Zheng Yi Quan x 5 à votre ND pour être touché."
          },
          "compagnon": {
            "fluff": "Les compagnons apprennent à éviter les dangers en sautant hors de leur chemin. En fait, beaucoup d’entre eux peuvent sauter au-dessus de la tête d’un ennemi pour éviter ses attaques.",
            "regles": "Vous gagnez un rang gratuit en Esquive acrobatique, pouvant le faire passer à 6. Si ce n’est pas le cas, vous pourrez le faire passer plus tard de 5 à 6 en dépensant 25 XP."
          },
          "maitre": {
            "fluff": "Les maîtres de Zheng Yi Quan ont appris le terrible secret du Lung Shiji (“Attaque du Dragon”), un acte qui accroît et concentre le qi du combattant en une puissante attaque extrêmement précise.",
            "regles": "À la phase 10 d’un round de combat, vous pouvez dépenser toutes vos actions en réserve ou de la phase courante pour effectuer une attaque avec l’une des compétences suivantes : Attaque (Arts martiaux offensifs), Coup de pied, Coup à la gorge, Manchette, Corps-à-corps, Prise, ou Blocage d’articulation. Chaque dé d’action dépensé sur cette attaque vous donne un dé gardé supplémentaire (+1g1) sur votre jet d’attaque."
          }
        }
      },
      "enrichie": true,
      "restriction_creation": "limitee",
      "genre_restriction": null
    }
  ]
};
