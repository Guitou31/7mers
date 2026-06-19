// Généré par csv_to_json.py — ne pas éditer à la main
window.ECOLES_DATA = {
  "_meta": {
    "sources": [
      "Liste ecoles Spadassin pour Appli v2.csv",
      "techniques_corrigees.json",
      "ecoles_enrichies_auto.json",
      "ecoles_enrichies.json"
    ],
    "nb_ecoles": 103,
    "nb_ecoles_enrichies": 72,
    "nb_techniques_definies": 79,
    "nations_uniques": [
      "Avalon",
      "Castille",
      "Cathay",
      "Eisen",
      "Empire du Croissant",
      "Ifri",
      "Inismore",
      "Marches des Highlands",
      "Montaigne",
      "Nations Pirates",
      "Sarmatie",
      "Ussura",
      "Vesten",
      "Vodacce",
      "Îles Glamour"
    ],
    "armes_categories": [
      "Arbalètes",
      "Arcs",
      "Armes d'Hast",
      "Bâtons",
      "Boucliers",
      "Couteau",
      "Épées à 2 mains",
      "Escrime (Rapière)",
      "Escrime (Sabre)",
      "Escrime (Épée)",
      "Fléau",
      "Fouet",
      "Fusil",
      "Gant de combat",
      "Haches",
      "Lances",
      "Masses",
      "Pistolet",
      "Pugilat",
      "Atypique / Accessoire"
    ],
    "repartition_armes": {
      "Arbalètes": 0,
      "Arcs": 0,
      "Armes d'Hast": 2,
      "Bâtons": 6,
      "Boucliers": 7,
      "Couteau": 12,
      "Épées à 2 mains": 5,
      "Escrime (Rapière)": 28,
      "Escrime (Sabre)": 16,
      "Escrime (Épée)": 14,
      "Fléau": 1,
      "Fouet": 2,
      "Fusil": 0,
      "Gant de combat": 4,
      "Haches": 4,
      "Lances": 7,
      "Masses": 0,
      "Pistolet": 0,
      "Pugilat": 3,
      "Atypique / Accessoire": 1
    },
    "origines_possibles": {
      "officielle": "École de Spadassin officielle (7ème Mer 1ère édition)",
      "combat_reclassee": "École de combat (probablement fanmade) reclassée Spadassin",
      "seconde_edition_adaptee": "École issue de la 2ème édition, adaptée au système V1"
    },
    "restrictions_creation": {
      "libre": "Libre à la création de personnage",
      "limitee": "Accès limité à la création (autorisation MJ requise)",
      "interdite": "Interdite à la création de personnage",
      "inconnue": "Restriction non documentée (école pas encore enrichie depuis un PDF)"
    },
    "repartition_restrictions": {
      "libre": 52,
      "interdite": 5,
      "inconnue": 17,
      "limitee": 15
    }
  },
  "techniques": {
    "arracher une arme": {
      "nom": "Arracher une arme",
      "categorie": "Techniques de spadassin classiques",
      "description": "Votre PJ peut utiliser cette compétence pour arracher l’arme de son adversaire et la projeter au loin. Le spadassin utilise son fouet qui va s’enrouler autour de l’arme de son belligérant et le lui arrache des mains en tirant un coup sec sur la poignée de son fouet. Pour réussir cette manœuvre, le spadassin doit d’abord réussir un jet d’attaque contre le ND de son adversaire avec deux augmentations (il vise l’arme) ; s’il y parvient, il doit ensuite réussir un jet d’opposition [Gaillardise contre Détermination de son adversaire] avec un bonus de 5 points (rares sont ceux qui s’y attendent !). Celui qui remporte ce jet arrache l’arme de son adversaire et l’envoie à 1D10+2 mètres. Le spadassin doit donc faire attention de ne pas se retrouver lui-même désarmé lors de cette manœuvre particulièrement difficile.",
      "ecoles_enseignant": [
        "Malone"
      ],
      "tables": []
    },
    "attaque en degaine": {
      "nom": "Attaque en dégaine",
      "categorie": "Techniques de spadassin classiques",
      "description": "Il s’agit de la capacité à dégainer et attaquer en un seul et fluide mouvement nommé Attaque en dégaine. Vous dépensez un seul dé d’action pour dégainer votre arme et attaquer dans le même mouvement. Vous devez utiliser cette technique de combat avec un malus d’une augmentation pour réussir cette manœuvre. Si vous ratez votre attaque contre votre adversaire, votre arme est de toute façon dégainée. De plus, cette manœuvre est particulièrement rapide, vous pouvez l’effectuer [rang d’Attaque en dégaine] phases avant le chiffre indiqué par votre dé d’action. Par exemple, Virgilio doit normalement agir en phase 7 et possède une technique de combat Attaque en dégaine de 3, il pourra donc effectuer cette manœuvre en phase 4.",
      "ecoles_enseignant": [
        "Badayah",
        "Okada-ryu",
        "Vigilare"
      ],
      "tables": []
    },
    "aveuglement": {
      "nom": "Aveuglement",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le spadassin utilise un accessoire de sa tenue (chapeau, cape, foulard…) ou une puissante lumière qu’il lance au visage de son adversaire pour l’aveugler. Pour cela, il doit réussir un jet de [Aveugler + Finesse] contre le ND +10 de son adversaire. Ce dernier verra alors son ND pour être touché chuter à 5 et sa défense active subir une pénalité de 10 points tant qu’il n’aura pas dépensé une action (à son tour ou via une interruption) pour retirer cet objet encombrant de son visage ou se déplacer de manière adéquate pour éviter la lumière ; cette technique de combat n’est utilisable qu’une fois par combat.",
      "ecoles_enseignant": [
        "Larsen"
      ],
      "tables": []
    },
    "ballestra": {
      "nom": "Ballestra",
      "categorie": "Techniques de spadassin classiques",
      "description": "Une Ballestra est une double fente en avant extrêmement spectaculaire et impressionnante pour l’adversaire. De la position de garde, le spadassin effectue une sorte d’entrechat le portant en avant et termine son action en fente. En termes de jeu, le spadassin fait un jet de Finesse + Ballestra contre le ND de l’adversaire avec un nombre d’augmentations égal à la Détermination de ce dernier. Si la Ballestra est réussie, l’adversaire retire un nombre de dés d’action égal à la moitié du nombre d’augmentations prises par le spadassin lors de cette passe d’armes. En revanche, si l’attaque échoue, le spadassin perd purement et simplement sa prochaine action et se retrouve à un ND pour être touché de 5.",
      "ecoles_enseignant": [
        "Rojando & Wilcox",
        "La Pointe au cœur"
      ],
      "tables": []
    },
    "cavatione": {
      "nom": "Cavatione",
      "categorie": "Techniques de spadassin classiques",
      "description": "Une Cavatione est une attaque circulaire conçue pour éloigner les parades d’un adversaire et pour désengager violemment son arme des tentatives d’Emprisonnement. Lorsque vous attaquez votre adversaire, vous pouvez utiliser une Cavatione, en utilisant cette technique de combat à la place d’une attaque classique. Vous devez prendre une augmentation, mais si vous réussissez, votre adversaire ne peut effectuer de défense active en utilisant une parade, à l’exception de celle effectuée à l’aide d’une arme dotée de Défensive (comme les boucliers). En outre, vous pouvez également utiliser une Cavatione à la place d’une parade pour éviter une tentative d’Emprisonner. Si vous prenez une augmentation sur votre jet, en plus de libérer votre arme, vous infligez un nombre de dégâts égaux à la valeur de dommages de votre arme (ce jet de dommages n’est pas modifié par votre Gaillardise mais peut-être augmenté via la prise d’augmentations sur le jet de Cavatione, comme d’habitude).",
      "ecoles_enseignant": [
        "Provolone"
      ],
      "tables": []
    },
    "ceder la place": {
      "nom": "Céder la place",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le but de cette manœuvre est de faire tomber l’adversaire. Si votre adversaire réussit son attaque et passe votre défense passive, vous pouvez effectuer une défense active avec un test de [Finesse + Céder la place] avec un nombre d’augmentation égal à l’esprit de votre attaquant -1. En cas de réussite, vous dégagez votre buste sur le côté afin d’éviter l’attaque, saisissez le bras de votre attaquant et, au moyen d’un croc en jambe, le faites tomber à terre.",
      "ecoles_enseignant": [
        "Braslyn",
        "De Vore",
        "Escuela Pater Noster",
        "Okada-ryu",
        "Wolny Lis",
        "Wu Tsain"
      ],
      "tables": []
    },
    "charge au bouclier": {
      "nom": "Charge au bouclier",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le spadassin qui utilise cette technique doit disposer d’au moins 5 mètres pour prendre son élan. Il court, bouclier en avant, et frappe violemment son adversaire avec son pavois afin de l’envoyer voler au loin. Contre cette attaque, les parades voient leur ND diminué à 5 (sauf bouclier). La cible devra utiliser une autre comme Jeu de jambes, Pas de côté ou Feinte de corps. Si l’adversaire rate sa défense active, il “s’envole”, il est précipité à 1D10 x 0,5 mètres de distance où il touche le sol avec violence ; il encaisse 1g0 de dommages par mètre de “vol” en sus des dommages normaux. S’il rate un jet de Finesse contre un ND de 20, son arme lui échappe et tombe au sol. Cette manœuvre peut être intéressante à utiliser contre un adversaire au bord d’une falaise, attention à la chute !",
      "ecoles_enseignant": [
        "Hallbjorn",
        "Kemmler",
        "Pancerny",
        "Épées de Salomon"
      ],
      "tables": []
    },
    "colle serre": {
      "nom": "Collé-Serré",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le spadassin reste collé à son adversaire, l’empêchant d’utiliser efficacement ses armes d’escrime. Utilisée comme défense passive, son niveau est considéré comme de 2 rangs supérieur contre des armes d’une taille supérieure à un couteau (Arme d’escrime, Arme d’hast…), du moment que vous combattez avec et en portée d’allonge d’une lame courte (couteau, dague, …) mais, en contrepartie, quand vous combattez à une allonge de 1 ou plus, elle est considérée comme de 2 rangs inférieur (minimum 1 rang). Cette technique de combat peut également servir de défense active mais sans bonus ni malus.",
      "ecoles_enseignant": [
        "Angelo",
        "Badayah"
      ],
      "tables": []
    },
    "corps a corps": {
      "nom": "Corps à Corps",
      "categorie": "Techniques de spadassin classiques",
      "description": "Vous devez annoncer cette compétence à la place de la compétence d’attaque habituelle. Si l’attaque porte, vous n’infligez que 0g1 de dommages en attaque à mains nues, mais votre adversaire peut tomber à terre. Vous devez pour cela lui infliger au moins [5 x Gaillardise de la Cible] points de dommages. S’il chute, votre adversaire perd toutes ses actions qu’il aurait mises en réserve et il devra dépenser une action pour se relever. Au sol, ses défenses actives et passives sont basées sur la compétence Roulé-boulé. S’il essaie d’attaquer en étant au sol, il ne peut le faire qu’en utilisant une augmentation (à moins d’utiliser la compétence coup de pied) et le MJ est le seul juge de ce qui est possible ou non (pas de Corps à corps ou de Coup de pommeau par exemple). Pendant la phase au cours de laquelle il se relève, sa défense passive tombe à 5, mais il peut tout de même effectuer une défense active avec deux augmentations. Cette action ne peut permettre d’envoyer au sol un adversaire dont le poids est au moins trois fois supérieur au vôtre.",
      "ecoles_enseignant": [
        "Angelo",
        "Bernouilli",
        "Blitzen",
        "El Puñal Oculto",
        "Finnegan",
        "Keiferhund",
        "Kjemper",
        "Kulachniy Boi",
        "Leegstra",
        "Les Cadets",
        "Lucani",
        "Mac Lellan",
        "Marcina",
        "Necare",
        "Pavois",
        "Peecke",
        "Qor'qunq",
        "Rees",
        "Rogers",
        "Scarron",
        "Shan Dian Dao Te",
        "Skollvfesson",
        "Vipereus Morsus",
        "Winckler",
        "Zimowit"
      ],
      "tables": []
    },
    "coup bas": {
      "nom": "Coup bas",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le spadassin qui utilise cette technique porte un coup bas à son adversaire, comme un coup de pied dans les parties génitales, une morsure à l’oreille ou au nez, une fourchette dans les yeux, l’arrachage des cheveux, le retournement des doigts, etc. Quoi qu’il en soit, s’il réussit son attaque en utilisant cette technique de combat, l’adversaire encaisse 0g1 de dommages (en ignorant l’armure) et voit tous ses ND et tous ses jets de dés augmentés de [niveau de la technique de combat Coup bas x3] jusqu’à la fin de la scène en raison de la douleur qu’il endure. Cette technique ne peut être utilisée qu’une fois pour un même combat et même adversaire.",
      "ecoles_enseignant": [
        "La Gouge"
      ],
      "tables": []
    },
    "coup d'epaule": {
      "nom": "Coup d’épaule",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette violente bourrade (elle inflige 0g2 de Dommages) déstabilise fortement l’adversaire. Il perd autant de Dés d’Action qu’il aurait encaissé de blessures s’il doit être amené à en prendre. L’adversaire peut opposer une Défense Active mais celle-ci ne peut relever que des compétences Jeu de jambes ou Feinte de corps.",
      "ecoles_enseignant": [
        "Bouffe-doublons",
        "Courtepointe",
        "Hennessey",
        "Les Cadets",
        "Yorak"
      ],
      "tables": []
    },
    "coup de pied reflexe": {
      "nom": "Coup de pied réflexe",
      "categorie": "Techniques de spadassin classiques",
      "description": "Un tel coup de pied est une contre-attaque faite sans penser à votre propre défense. Il s'agit d'un coup de pied rapide lancé contre un adversaire au moment où il tente de vous attaquer, dans l'espoir que votre pied l'empêchera de continuer son assaut. Quand un ennemi vous attaque, vous pouvez dépenser une action (comme une défense active) pour donner un coup de pied réflexe. Lancez un jet d'[Esprit + Coup de pied réflexe]. Si vous le touchez, vous lui infligez 0g1 dés de dégâts (en ajoutant votre Gaillardise aux dès non-gardés). S'il reçoit une Blessure Grave, alors l'attaque qu'il tentait d'effectuer est purement et simplement annulée. Vous pouvez prendre des Augmentations sur votre jet pour augmenter vos dommages ou localiser votre coup.",
      "ecoles_enseignant": [
        "Ki Kwanji",
        "Omuhelo",
        "Zheng Yi Quan"
      ],
      "tables": []
    },
    "coup de pommeau": {
      "nom": "Coup de pommeau",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat permet de frapper un adversaire au visage en utilisant le pommeau de son arme. Vous devez annoncer que votre PJ utilise cette technique de combat à la place de sa compétence d’attaque habituelle. Le ND est alors augmenté de 10. Si le coup porte, vous infligez 0g2 dés de dommages, le ND pour toucher votre adversaire est réduit à 5 et toutes ses actions subissent une pénalité d’une augmentation. Ces effets durent jusqu’à que la cible dépense un dé d’action pour se rétablir et en annuler les effets, ou à la fin de la phase actuelle.",
      "ecoles_enseignant": [
        "Ambrogia",
        "Bogatyr",
        "Bouffe-Doublons",
        "Courtepointe",
        "Daphan",
        "Donnerwette",
        "Drexel",
        "Falisci",
        "Geng Yu Qiang",
        "Halfdansson",
        "Höpken",
        "Lucani",
        "Mac Donald",
        "Mac Lellan",
        "Malone",
        "Mubarizdun",
        "Mullooney",
        "Nadziak",
        "O'Faolain",
        "Ottenheim Rasmussen",
        "Swanson",
        "Tréville",
        "Yesukai"
      ],
      "tables": []
    },
    "coup fourre": {
      "nom": "Coup fourré",
      "categorie": "Techniques de spadassin classiques",
      "description": "Un coup fourré est un mélange de parade et de contre- attaque qui exploite la lame de l’adversaire pour guider celle du spadassin. Lorsqu’un adversaire vous attaque, vous pouvez dépenser une action pour réaliser un coup fourré. Effectuez un jet d’[Esprit + Coup fourré] en guise de jet d’attaque contre votre assaillant. Si vous touchez, vous infligez 3g2 de dommages (Vous n’ajoutez pas votre Gaillardise). Si votre adversaire devait recevoir ainsi une blessure grave, l’attaque qu’il était sur le point d’effectuer est tout bonnement annulée.",
      "ecoles_enseignant": [
        "Bugu Takobi",
        "Gbeto",
        "Iyasu",
        "Koncerz",
        "Lipka",
        "Mateenatya",
        "Tin Hinan",
        "Vilkas",
        "Villanova",
        "Wolny Lis",
        "Žynys"
      ],
      "tables": []
    },
    "coup puissant": {
      "nom": "Coup puissant",
      "categorie": "Techniques de spadassin classiques",
      "description": "Vous effectuez une attaque en utilisant toute votre force, mais prévisible. Vous devez annoncer cette action. Vous effectuez un jet de [Gaillardise + Coup puissant] et devez réussir votre jet en utilisant deux augmentations pour que cette attaque spécifique porte. Si vous réussissez votre jet, l’adversaire de votre PJ ne peut pas tenter d’éviter l’attaque en utilisant une défense active.",
      "ecoles_enseignant": [
        "Bernoulli",
        "Bogatyr",
        "Boucher",
        "Caballo Rojo",
        "Chaka",
        "Daphan",
        "Desco Numanaius",
        "Eisenfaust",
        "Gbeto",
        "Guannazar",
        "Haagen",
        "Hammer",
        "Hirojosa",
        "Iyasu",
        "Kippe",
        "Kiriakin",
        "Krzyż",
        "La Gouge",
        "Leegstra",
        "Lucani",
        "Mac Donald",
        "Mac Lellan",
        "Monastic Order of Avalon",
        "Mubarizdun",
        "Nadziak",
        "Ottenheim",
        "Pancerny",
        "Peecke",
        "Pösen",
        "Qor'qunq",
        "Quinn Snedig",
        "Rossini",
        "Salinas",
        "Shan Dian Dao Te",
        "Skollvfesson",
        "Strade",
        "Szybowanie",
        "Tréville",
        "Urostifter",
        "Zimowit"
      ],
      "tables": []
    },
    "decoller": {
      "nom": "Décoller",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat était utilisée autrefois par les chevaliers eisenörs lors des tournois qui les opposaient devant l’Imperator. Elle permet d’éjecter son adversaire de son cheval tout en restant soi-même bien planté dans ses étriers. Elle peut également être utilisée à l’encontre de fantassins de manière très efficace. En termes de jeu, pour réussir cette attaque, le spadassin doit dépenser deux actions (armé son bras, prendre de l’élan et attaquer), remporter un test d’opposition. De son côté, il utilise Gaillardise ou Équitation (le plus faible des deux) + Décoller. L’adversaire, quant à lui, à plusieurs options en fonction de la situation.\n\nS’il s’agit d’un adversaire monté, il peut : - Encaisser le coup : Détermination + Équitation ou Parade (Bouclier) (le plus faible des deux) ;\n\n- Répondre à l’attaque par l’attaque et essayer à son tour d’éjecter son adversaire, il utilise les mêmes compétences que le cavalier qu’il affronte (Gaillardise ou Équitation + Décoller) ;\n\n- Éviter la lance du cavalier : Dextérité + Acrobaties équestres.\n\nS’il s’agit d’un fantassin, il dispose quant à lui de deux options :\n\n- Encaisser le coup : Détermination + Réception de charge (mais la compétence est plutôt rare) ;\n\n- Éviter la lance du cavalier : Dextérité + Jeu de jambes ou Feinte de corps (au choix).\n\nEn cas d’échec, compte-tenu de la puissance du choc, le cavalier envoie son adversaire voler à (rang dans la technique de combat Décoller) x 0,5 mètres de là dans le décor avec les dommages afférents. Mais cette technique de combat est à double tranchant, si votre adversaire répond par une attaque (à cheval) ou une réception de charge (à pied), c’est vous qui risquez d’encaisser des dommages importants, si la possibilité est faible, elle n’est pas à négliger.",
      "ecoles_enseignant": [
        "Pösen"
      ],
      "tables": []
    },
    "defigurer": {
      "nom": "Défigurer",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat permet de défigurer son adversaire. Le spadassin inflige de profondes lacérations mais pas particulièrement douloureuses, elles visent surtout à le dévisager et à provoquer un fort saignement. Les dommages sont diminués d’un dé lancé et gardé, mais l’adversaire subit un malus de 5 à toutes ses actions tant qu’il ne sera pas soigné en raison de la gêne provoquée par son hémorragie faciale. De plus, même si des soins sont effectués, cette blessure ne guérira jamais totalement.",
      "ecoles_enseignant": [
        "Badayah",
        "La Gouge",
        "Smirnov",
        "Ying Sun Wo"
      ],
      "tables": []
    },
    "deplacements circulaires": {
      "nom": "Déplacements circulaires",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le spadassin a appris à se déplacer en cercles et à toujours esquiver du côté faible de l’adversaire (à gauche pour les droitiers, à droite pour les gauchers). Lorsque l’adversaire vous rate (du fait de votre défense active ou passive), vous pouvez réduire votre dé d’action suivant de un pour chaque rang que vous possédez dans cette technique de combat. Vous ne pouvez évidemment pas réduire un dé d’action en dessous de la phase actuelle.",
      "ecoles_enseignant": [
        "Bugu Takobi",
        "Calis",
        "Finnegan",
        "Gbeto",
        "Kulachniy Boi",
        "Lipka",
        "Mateenatya",
        "O'Faolain",
        "Omuhelo",
        "Tin Hinan",
        "Vilkas"
      ],
      "tables": []
    },
    "desarconner": {
      "nom": "Désarçonner",
      "categorie": "Techniques de spadassin classiques",
      "description": "À la différence de la technique de combat Réception de charge, vous utiliser la manœuvre Désarçonner pour faire quitter les étriers au cavalier auquel vous êtes opposé, qu’il vous charge ou non. Pour cela, vous devez réussir un jet d’opposition de Gaillardise + Désarçonner contre la Détermination + Équitation de votre adversaire. Il encaisse alors 0g1 dés de dommages et se retrouve à terre.",
      "ecoles_enseignant": [
        "Haagen",
        "Nahgem",
        "Yesukai"
      ],
      "tables": []
    },
    "desarmer": {
      "nom": "Désarmer",
      "categorie": "Techniques de spadassin classiques",
      "description": "Vous ne pouvez utiliser cette technique de combat que si l’attaque de l’adversaire de votre PJ vient d’échouer contre votre défense passive de parade. Utilisez un dé d’action afin de faire un jet d’opposition de votre [Gaillardise + Désarmer +5] contre [Gaillardise + Attaque (arme utilisée)] de la cible. Si vous remportez l’opposition, votre PJ lui fait sauter son arme des mains ; si vous remportez l’opposition avec un ND augmenté de 10, votre PJ peut même se retrouver avec l’arme de son adversaire en main si vous le désirez. De plus, pour le Désarmement, plutôt que d’utiliser la force brute, vous pouvez utiliser la ruse à la place. Dans ce cas, le jet sera effectué à l’aide de [Esprit + Désarmer du PJ] contre [Esprit + Attaque (arme utilisée)] de l’adversaire.",
      "ecoles_enseignant": [
        "Bahol",
        "Bonita",
        "Caldwell",
        "Chin Te",
        "Courtepointe",
        "De Vore",
        "Donovan",
        "Drexel",
        "Eisenfaust",
        "Escuela Pater Noster",
        "Gautier",
        "Guannazar",
        "Halfdansson",
        "Höpken",
        "Iyasu",
        "Keiferhund",
        "La Guêpe",
        "Leibwächter",
        "Monastic Order of Avalon",
        "Provolone",
        "Rees",
        "Robin Goodfellow",
        "Rogers",
        "Rossini",
        "Szabla Honoru",
        "Tom Morel",
        "Trécy",
        "Vigilare",
        "Winckler",
        "Yael",
        "Zepeda",
        "Épées de Salomon"
      ],
      "tables": []
    },
    "double attaque": {
      "nom": "Double attaque",
      "categorie": "Techniques de spadassin classiques",
      "description": "Lorsque vous utilisez cette technique de combat, vous effectuez deux rapides attaques à l’aide de vos poignards ou hachettes, l’une après l’autre en utilisant une seule action. Vous devez annoncer la double attaque avant d’y avoir recours. Ensuite, vous effectuez vos deux attaques via cette technique de combat. Quand vous utilisez la double attaque, le ND pour toucher votre adversaire augmente de 10 pour ces deux attaques. Contrairement à l’attaque à deux armes classiques, vous infligez les dégâts entiers avec chaque arme et ne perdez pas les attributs « Défensives » des armes utilisées.",
      "ecoles_enseignant": [
        "Al'Marikk",
        "Basulde",
        "Calis",
        "Chaka",
        "Mac Codrum",
        "Mortis",
        "Siggursdottir",
        "Ssang Geom"
      ],
      "tables": []
    },
    "double parade": {
      "nom": "Double parade",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat permet de parer un coup en se servant de deux armes (généralement une arme d’escrime et une arme de parade). Vous pouvez utiliser cette technique de combat en défense active à la place de la compétence parade habituelle de votre PJ ; vous devez l’annoncer. Elle ne peut être utilisée qu’en défense active. Si vous réussissez votre jet, vous bénéficier d’un dé d’héroïsme que vous pourrez utiliser pendant (rang de Double parade) phases.",
      "ecoles_enseignant": [
        "Awal Thmani",
        "Blitzen",
        "Boucher",
        "Calis",
        "Chaka",
        "Desaix",
        "Gautier",
        "Kippe",
        "Krzyż",
        "Qurra",
        "Robertson",
        "Scarron",
        "Scola Carnavale",
        "Smirnov",
        "Soldano",
        "Ssang Geom",
        "Strade",
        "Swanson",
        "Tin Hinan",
        "Torres",
        "Urostifter",
        "Valroux",
        "Villanova",
        "Yael",
        "Žynys"
      ],
      "tables": []
    },
    "emprisonner": {
      "nom": "Emprisonner",
      "categorie": "Techniques de spadassin classiques",
      "description": "On ne peut utiliser cette technique de combat que contre des armes d’escrime. Elle permet de coincer l’épée de votre PJ (ou son bouclier, son Panzerfaust ou autre) dans celle de son adversaire. Annoncez votre intention d’y recourir, puis faites votre jet d’attaque en utilisant cette technique de combat. Si vous le réussissez, votre PJ a momentanément immobilisé l’épée de son adversaire. Durant ce laps de temps, aucun des deux protagonistes ne peut utiliser l’arme coincée. Pour tenter de se dégager, l’adversaire de votre PJ doit utiliser un dé d’action, puis faire un jet d’opposition de [Gaillardise + Parade (arme coincée)] contre Gaillardise + Emprisonner de votre PJ. S’il remporte l’opposition, il débloque son arme ; elle reste coincée dans le cas contraire. Vous pouvez, vous, utiliser un dé d’action pour renforcer la prise de votre PJ : chaque dé d’action utilisé vous fait bénéficier d’une augmentation gratuite lorsque votre adversaire tentera de dégager son arme. L’adversaire de votre PJ peut également choisir de lâcher son arme : votre PJ en aura alors deux. Si vous subissez une blessure, les armes sont automatiquement débloquées.",
      "ecoles_enseignant": [
        "Bonita",
        "Donovan",
        "Eisenfaust",
        "El Puñal Oculto",
        "Fadh-Righ",
        "Gautier",
        "Hallbjorn",
        "Keiferhund",
        "Kemmler",
        "Leibwächter",
        "Pavois",
        "Robertson",
        "Rogers",
        "Rossini",
        "Ssang Geom",
        "Teginbek",
        "Tom Morel",
        "Zepeda",
        "Épées de Salomon"
      ],
      "tables": []
    },
    "esquive acrobatique": {
      "nom": "Esquive acrobatique",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le spadassin utilise ses capacités acrobatiques exceptionnelles pour se défendre en toutes circonstances. Double saut périlleux arrière, roulade, pirouette par-dessus son adversaire, etc. Cette technique de défense peut être utilisée comme défense passive avec 2 fois le niveau de la technique de combat Acrobatie en bonus.",
      "ecoles_enseignant": [
        "Basulde",
        "La Siqueira",
        "Mateenatya",
        "Qurra",
        "Rojando & Wilcox",
        "Zheng Yi Quan"
      ],
      "tables": []
    },
    "exploiter les faiblesses": {
      "nom": "Exploiter les faiblesses",
      "categorie": "Techniques de spadassin classiques",
      "description": "Lorsque votre PJ affrontera une personne qui utilise une arme dont il connaît les points faibles, et ce, même si le PJ n’utilise pas cette arme lui-même pour combattre, il bénéficiera de (rang dans la technique de combat Exploiter les faiblesses) dés non-gardés à utiliser pour n’importe quel jet de compétences d’attaque, de défense ou de dommages par scène de combat contre l’utilisateur de ladite arme.",
      "ecoles_enseignant": [
        "Al-Aïfa",
        "Aldana",
        "Al’Marikk",
        "Ambrogia",
        "Angelo",
        "Bahol",
        "Basulde",
        "Bernoulli",
        "Blitzen",
        "Bogatyr",
        "Bonita",
        "Boucher",
        "Bouffe-Doublons",
        "Braslyn",
        "Bricquébec",
        "Buslayevich",
        "Caballo Rojo",
        "Caldwell",
        "Canis",
        "Charmine",
        "Chima Gongjian Shou",
        "Chin Te",
        "Courtepointe",
        "Daphan",
        "Desaix",
        "Desco Numanaius",
        "Dobrynya",
        "Donnerwetter",
        "Donovan",
        "Drexel",
        "Durante",
        "Délicatesse",
        "Eisenfaust",
        "El Puñal Oculto",
        "Escuela Pater Noster",
        "Fa'tahib",
        "Fadh-Righ",
        "Faileas",
        "Falisci",
        "Finnegan",
        "Gallegos",
        "Gautier",
        "Gosling",
        "Guannazar",
        "Guzman",
        "Haagen",
        "Hainzl",
        "Halfdansson",
        "Hammer",
        "Hennessey",
        "Hirojosa",
        "Hua Shao Ren Te",
        "Höpken",
        "Keiferhund",
        "Kemmler",
        "Kensington",
        "Ki Kwanji",
        "Kippe",
        "Kiriakin",
        "Kjemper",
        "La Guêpe",
        "La Pointe au cœur",
        "Larsen",
        "Leegstra",
        "Leibwächter",
        "Les Cadets",
        "Lucani",
        "Léon des Gueux",
        "Mac Codrum",
        "Mac Donald",
        "Mac Lellan",
        "Malone",
        "Marchenko",
        "Marcina",
        "Monastic Order of Avalon",
        "Mortis",
        "Mubarizdun",
        "Mullooney",
        "Nadja’hari",
        "Nahgem",
        "Necare",
        "Ottenheim",
        "Overmars",
        "O’Faolain",
        "Pavois",
        "Peecke",
        "Provolone",
        "Pösen",
        "Qor’qunq",
        "Quinn",
        "Qurra",
        "Rachecourt",
        "Rasmussen",
        "Rees",
        "Ricardo",
        "Robertson",
        "Robin Goodfellow",
        "Rochefort",
        "Rogers",
        "Rojando & Wilcox",
        "Rossini",
        "Salinas",
        "Sanders",
        "Scarlatti",
        "Scarron",
        "Scola Carnavale",
        "Sersemlik",
        "Shan Dian Dao Te",
        "Siggursdottir",
        "Skollvfesson",
        "Smirnov",
        "Snedig",
        "Soldano",
        "Ssang Geom",
        "Strade",
        "Swanson",
        "Teginbek",
        "Tie Xiong Kung",
        "Tom Morel",
        "Torres",
        "Trecy",
        "Tréville",
        "Urostifter",
        "Valroux",
        "Vigilare",
        "Villanova",
        "Vipereus Morsus",
        "Winckler",
        "Wolny Lis",
        "Wu Tsain",
        "Yesukai",
        "Ying Sun Wo",
        "Zar’houni",
        "Zepeda",
        "Zheng Yi Quan",
        "Zheng Yi Quan",
        "Épées de Salomon"
      ],
      "ecoles_enseignant_groupees": {
        "Arbalète": [
          "Höpken",
          "Ricardo"
        ],
        "Arc": [
          "Buslayevich",
          "Chima Gongjian Shou",
          "Robin Goodfellow"
        ],
        "Armes d’hast": [
          "Haagen",
          "Rossini",
          "Tréville"
        ],
        "Armes improvisées": [
          "Monastic Order of Avalon",
          "Pavois",
          "Qor’qunq",
          "Quinn",
          "Qurra",
          "Scarron"
        ],
        "Art martial défensif": [
          "Wu Tsain",
          "Zheng Yi Quan"
        ],
        "Art martial offensif": [
          "Ki Kwanji",
          "Tie Xiong Kung",
          "Ying Sun Wo",
          "Zheng Yi Quan"
        ],
        "Bâton": [
          "Caldwell",
          "Fa'tahib",
          "Peecke"
        ],
        "Couteau": [
          "Angelo",
          "Bahol",
          "Boucher",
          "Courtepointe",
          "Mortis",
          "Mullooney",
          "Necare",
          "Vipereus Morsus"
        ],
        "Épée": [
          "Desco Numanaius",
          "Donovan",
          "Hua Shao Ren Te",
          "Kemmler",
          "Kippe",
          "Kjemper",
          "Leibwächter",
          "Lucani",
          "Mac Lellan",
          "Ssang Geom",
          "Urostifter",
          "Épées de Salomon"
        ],
        "Épée à deux mains": [
          "Drexel",
          "Mac Donald",
          "Mubarizdun",
          "Sersemlik",
          "Shan Dian Dao Te"
        ],
        "Éventail": [
          "Charmine",
          "Falisci"
        ],
        "Fléau": [
          "Chin Te"
        ],
        "Fouet": [
          "Canis",
          "Malone",
          "Zepeda"
        ],
        "Fronde": [
          "Nadja’hari"
        ],
        "Gant de combat": [
          "Al’Marikk",
          "Eisenfaust",
          "Keiferhund",
          "Smirnov"
        ],
        "Haches": [
          "Bogatyr",
          "Leegstra",
          "Siggursdottir",
          "Skollvfesson"
        ],
        "Lances": [
          "Halfdansson",
          "Kiriakin",
          "Mac Codrum",
          "Nahgem",
          "Pösen",
          "Zar’houni"
        ],
        "Lutte": [
          "Braslyn",
          "Dobrynya",
          "Fadh-Righ",
          "Rees"
        ],
        "Masse": [
          "Hammer",
          "Winckler"
        ],
        "Mousquet": [
          "Durante",
          "Guzman",
          "O’Faolain"
        ],
        "Pistolet": [
          "Bouffe-Doublons",
          "Bricquébec",
          "Donnerwetter",
          "Overmars",
          "Rasmussen"
        ],
        "Pugilat": [
          "Finnegan",
          "Kensington"
        ],
        "Rapière": [
          "Aldana",
          "Ambrogia",
          "Blitzen",
          "Desaix",
          "Délicatesse",
          "Escuela Pater Noster",
          "Faileas",
          "Gautier",
          "Gosling",
          "Hainzl",
          "Hirojosa",
          "La Guêpe",
          "La Pointe au cœur",
          "Larsen",
          "Les Cadets",
          "Léon des Gueux",
          "Marchenko",
          "Ottenheim",
          "Provolone",
          "Rachecourt",
          "Robertson",
          "Rochefort",
          "Scarlatti",
          "Scola Carnavale",
          "Snedig",
          "Strade",
          "Swanson",
          "Tom Morel",
          "Torres",
          "Trecy",
          "Valroux",
          "Villanova"
        ],
        "Sabre": [
          "Al-Aïfa",
          "Basulde",
          "Bernoulli",
          "Bonita",
          "Caballo Rojo",
          "Daphan",
          "El Puñal Oculto",
          "Gallegos",
          "Guannazar",
          "Hennessey",
          "Marcina",
          "Rogers",
          "Rojando & Wilcox",
          "Salinas",
          "Sanders",
          "Soldano",
          "Teginbek",
          "Vigilare",
          "Wolny Lis",
          "Yesukai"
        ]
      },
      "tables": []
    },
    "feinte": {
      "nom": "Feinte",
      "categorie": "Techniques de spadassin classiques",
      "description": "Lorsque votre PJ attaque un adversaire, vous pouvez choisir d’utiliser cette technique de combat ; vous n’avez pas besoin de l’annoncer. Tout d’abord, vous effectuez votre attaque de façon classique (sans spécifier que vous envisagez une feinte). Si vous réussissez votre attaque mais que votre adversaire la pare ou l’évite via une Défense Active, alors seulement vous pouvez déclarer avoir en réalité effectué une feinte. Vous refaites alors votre jet d’attaque (en utilisant Finesse + Feinte) contre un ND égal à sa Défense active + 1 augmentation. Si votre coup porte, il ne peut effectuer une nouvelle défense active jusqu’à la fin de la phase en cours. Par contre, si votre coup échoue, votre adversaire effectuera toutes ses attaques contre vous avec une augmentation gratuite jusqu’à la fin de la phase.",
      "ecoles_enseignant": [
        "Aldana",
        "Ambrogia",
        "Andrews",
        "Angelo",
        "Awal Thmani",
        "Bahol",
        "Bugu Takobi",
        "Caldwell",
        "Chin Te",
        "Desaix",
        "Délicatesse",
        "Faileas",
        "Falisci",
        "Gallegos",
        "Geng Yu Qiang",
        "Gustavo",
        "Hennessey",
        "Hirojosa",
        "Hua Shao Ren Te",
        "Krzyż",
        "La Guêpe",
        "Larsen",
        "Lipka",
        "Marcina",
        "Mullooney",
        "Okada-ryu",
        "Omuhelo",
        "Peecke",
        "Quinn",
        "Robertson",
        "Scarlatti",
        "Sersemlik",
        "Shan Dian Dao Te",
        "Snedig",
        "Swanson",
        "Szabla Honoru",
        "Tin Hinan",
        "Tom Morel",
        "Urostifter",
        "Valroux",
        "Villanova",
        "Wolny Lis",
        "Yael",
        "Zar'houni",
        "Žynys"
      ],
      "tables": []
    },
    "feinte de pirate": {
      "nom": "Feinte de pirate",
      "categorie": "Techniques de spadassin classiques",
      "description": "Les pirates qui apprennent le style de combat de Rogers emploient toutes sortes d’astuce et d’artifices pour surpasser leur adversaire. Ils peuvent donc choisir ces feintes dans la liste suivante :\n\nÀ l’abordage ! : Durant les actions d’abordage, vous augmentez les jets d’abordage de votre camp d’un point. Jusqu’à trois spadassins de l’école de Rogers peuvent modifier ensemble le jet d’abordage dans un même camp.\n\nAmarre donc ça ! Vous lancez et gardez un dé de dommages supplémentaire lorsque vous attaquez votre adversaire avec un cabillot d’amarrage (votre attaque inflige 2g2 dés de dommages, sans compter la Gaillardise). Vous ne souffrez pas de la pénalité de main non-directrice lorsque vous maniez un tel instrument.\n\nDeux mains droites : vous ne subissez pas de pénalité de main non-directrice lorsque vous utilisez un pistolet.\n\nEmbrasse le bastingage ! Vous recevez une augmentation gratuite quand vous utilisez Corps à corps au moment où votre adversaire se sert d’Équilibre comme compétence de défense.\n\nLa mort fond sur sa proie : si vous vous trouvez à au moins un niveau au-dessus de votre cible, vous pouvez dépenser une action pour vous balancer et l’attaquer dans le même mouvement en effectuant un jet de Panache + Acrobatie. Si vous réussissez votre attaque, elle inflige 3g1 dés de dommages et votre adversaire se retrouve face contre terre. Si elle échoue, vous devez faire un autre jet de Panache + Acrobatie contre un ND de 15 ou vous affaler vous-même.\n\nPied marin : vous lancez et gardez un dé supplémentaire lorsque vous utilisez votre compétence Équilibre. Cela n’augmente pas votre ND pour être touché quand vous l’utilisez comme compétence de défense, mais cela améliore vos jets de défense active.\n\nPorté par la dague : en dépensant une action, vous pouvez planter une dague dans une voile proche pour vous laisser descendre jusqu’au pont, évitant ainsi les dommages de chute. Ce faisant, il vous est possible d’attaquer quelqu’un qui se trouve au-dessous de vous en effectuant un jet de Finesse + Équilibre. Si vous réussissez votre attaque, vous infligez un dé de dommages pour chaque tranche de deux niveaux descendus, en arrondissant à l’inférieur.\n\nSabre au poing : vous pouvez vous saisir d’une épée tombée au sol et attaquer avec en une seule et même action du moment que vous vous teniez prêt d’elle au début de ladite action.\n\nTiens bon la bière ! Vous recevez gratuitement l’avantage Grand Buveur. En outre, vous recevez une augmentation gratuite quand vous attaquez avec une chope de bière (Arme improvisée : dommages de 0g1).\n\nTir éclair : vous pouvez dégainer un pistolet et faire feu en une seule action.",
      "ecoles_enseignant": [
        "Rogers"
      ],
      "tables": []
    },
    "feinte de corps": {
      "nom": "Feinte de corps",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de défense est très difficile à exécuter. Le spadassin reste fixe et attend l’attaque de son adversaire (comme le torero attend le taureau) puis se déplace d’un pas ou deux par rotation sur le côté, toujours à la manière d’un torero, ce qui lui permet d’être ensuite idéalement placé pour porter son attaque. Vous devez utiliser une Défense Active avec un test de [Esprit + Feinte de corps] de votre choix à la prochaine attaque de votre cible avec -0g1, mais si vous réussissez cette défense particulièrement épineuse, vous pouvez alors placer une attaque contre un adversaire dont le ND sera diminué de 10 lors de cette manœuvre, et vous bénéficiez d’un dé de dommages supplémentaire (lancé et gardeé) pour chaque tranche de 10 points au-delà de ce seuil.Si cette technique est utilisée en-dehors d’un duel, tout ennemi en-dehors de la cible désignée pour le Feinte de corps bénéficie d’une augmentation gratuite à tous ses jets attaques contre vous.",
      "ecoles_enseignant": [
        "Braslyn",
        "Dobrynya",
        "Gosling",
        "La Siqueira",
        "Salinas",
        "Torres",
        "Ying Sun Wo"
      ],
      "tables": []
    },
    "fente en avant": {
      "nom": "Fente en avant",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat permet de porter une brutale attaque pendant laquelle la garde du spadassin est ouverte. Déclarez l’utilisation de cette technique de combat et effectuez normalement votre jet d’attaque : si le coup porte, vous ferez votre jet de dommages en lançant (sans les garder) [rang de Fente en avant] dés de dommages supplémentaires. En contrepartie, le ND pour être touché de votre PJ tombe à 5 pendant cette phase et vous ne pouvez pas utiliser de défense active jusqu’à la fin de ladite phase.",
      "ecoles_enseignant": [
        "Andrews",
        "Bernoulli",
        "Bogatyr",
        "Daphan",
        "Desaix",
        "Desco Numanaius",
        "Drexel",
        "Fa'tahib",
        "Fadh-Righ",
        "Gosling",
        "Halfdansson",
        "Hua Shao Ren Te",
        "Kemmler",
        "Kjemper",
        "Koncerz",
        "Leegstra",
        "Léon des Gueux",
        "Mac Codrum",
        "Mac Donald",
        "Qor'qunq",
        "Quinn",
        "Rachecourt",
        "Rojando & Wilcox",
        "Siggursdottir",
        "Skollvfesson",
        "Smirnov",
        "Snedig",
        "Tréville",
        "Vipereus Morsus",
        "Winckler",
        "Zar'houni"
      ],
      "tables": []
    },
    "force d'ame": {
      "nom": "Force d’âme",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le personnage est habitué à se faire malmener et résiste bien à la douleur. Pour chaque rang qu’il possède dans cette compétence, le personnage bénéficie de +5 points de santé.",
      "ecoles_enseignant": [
        "Dobrynya",
        "Guannazar",
        "Kensington",
        "Kulachniy Boi",
        "La Siqueira",
        "Leibwächter",
        "Overmars",
        "Yorak",
        "Zimowit"
      ],
      "tables": []
    },
    "frappe a deux mains": {
      "nom": "Frappe à deux mains",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat permet d’utiliser ses deux mains pour frapper un adversaire avec une arme à une main, infligeant ainsi des dégâts plus importants. Déclarez l’utilisation de cette technique de combat avec un test de [Finesse + Frappe à Deux Mains] : si le coup porte, vous ferez votre jet de dommages en lançant et gardant un dé de dommages supplémentaire. Mais comme vous devez ensuite reprendre votre position, votre ND diminue de 10 points (minimum 5) après la prochaine attaque subie ou la fin de la phase.",
      "ecoles_enseignant": [
        "Al Aïfa",
        "Hammer",
        "Ottenheim"
      ],
      "tables": []
    },
    "harceler": {
      "nom": "Harceler",
      "categorie": "Techniques de spadassin classiques",
      "description": "Vous devez annoncer l’utilisation de cette technique lors de votre action. Vous devez de plus sacrifier une autre action et effectuer un test de [Finesse ou Panache + Harceler]. Grâce à cette technique de combat, vous infligez à votre adversaire une multitude de petites blessures en lui tournant autour, avec quelques quolibets. Étourdi par la rapidité de vos attaques, votre adversaire sera désemparé pour le reste du combat, il se battra alors avec un malus d’une augmentation sur toutes ses actions jusqu’à la fin du combat, à l’exception des jets qu’il effectuera pour s’enfuir ; auquel cas ils bénéficieront d’un bonus de deux augmentations.",
      "ecoles_enseignant": [
        "Awal Thmani",
        "Bugu Takobi",
        "Hallbjorn",
        "Léon des Gueux",
        "Szybowanie",
        "Vilkas",
        "Žynys"
      ],
      "tables": []
    },
    "lacerer": {
      "nom": "Lacérer",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette manœuvre nécessite une arme aux bords tranchants et, donc, pas une arme d’estoc. La technique la plus classique consiste à “faire un S” sur la poitrine de son adversaire. Les dégâts ne sont pas très importants mais la douleur ressentie est intense, aussi les dommages sont-ils réduits de deux dés (lancés et gardés) mais la victime subit alors un malus de 5 points à toutes ses actions. On peut utiliser cette technique de combat jusqu’à deux fois de suite efficacement (pour un malus total de -10) ; au- delà, la cible s’habitue à la douleur. La douleur due à la lacération jusqu’à la fin du round suivant.",
      "ecoles_enseignant": [
        "Al Aïfa",
        "Badayah",
        "Sanders",
        "Vilkas"
      ],
      "tables": []
    },
    "maintenir a distance": {
      "nom": "Maintenir à distance",
      "categorie": "Techniques de spadassin classiques",
      "description": "Quand le spadassin utilise cette tactique de combat, le ND de sa cible augmente de 10, ce qui simule la difficulté à le maintenir à distance tout en le frappant, et les dégâts que vous infligez sont alors réduits de 1 dés lancé et gardé. Vous devez être pile à votre portée d’allonge. Votre adversaire, par contre, ne peut vous attaquer que s’il possède une arme au moins aussi longue que la vôtre (d’où l’intérêt d’utiliser des armes d’hast particulièrement grandes). Dans le cas contraire, il devra dépenser un dé d’action et réussir un jet de Jeu de jambes, Acrobatie, Parade ou autre technique de défense approprié… contre un ND égal à votre score de Maintenir à distance multiplié par 5. S’il y parvient, il pourra s’approcher de vous à l’allonge désirée et son action se termine. Si vous deviez vous désengager de lui durant la même phase, il bénéficiera d’une augmentation gratuite s’il effectue une attaque d’opportunité.",
      "ecoles_enseignant": [
        "Délicatesse",
        "Geng Yu Qiang",
        "Haagen",
        "La Siqueira",
        "Léon des Gueux",
        "Mac Codrum",
        "Nahgem"
      ],
      "tables": []
    },
    "marquer": {
      "nom": "Marquer",
      "categorie": "Techniques de spadassin classiques",
      "description": "Faites votre jet d’attaque en utilisant cette technique de combat à la place de la compétence d’attaque habituelle de votre PJ. Si vous réussissez votre jet, votre PJ ne blesse pas son adversaire mais bénéficie de l’un des deux effets suivants : soit il y a un public, il bénéficie alors d’un point de réputation supplémentaire (un seul possible lors du même combat), soit son adversaire se retrouve avec un ND diminué de 10 (minimum 5) jusqu’à ce qu’il reprenne confiance en réussissant une passe d’arme contre l’auteur du marquage.",
      "ecoles_enseignant": [
        "Aldana",
        "Canis",
        "Chariot de Thespis",
        "Donnerwetter",
        "Fa'tahib",
        "Fadh-Righ",
        "Faileas",
        "Falisci",
        "Gallegos",
        "Gbeto",
        "Gosling",
        "Hainzl",
        "Hennessey",
        "Hirojosa",
        "Hua Shao Ren Te",
        "Iyasu",
        "Kensington",
        "Koncerz",
        "La Pointe au cœur",
        "Marchenko",
        "Mubarizdun",
        "Nadja'hari",
        "Nadziak",
        "Pancerny",
        "Rachecourt",
        "Ricardo",
        "Robin Goodfellow",
        "Scarron",
        "Scola Carnavale",
        "Sersemlik",
        "Soldano",
        "Szabla Honoru",
        "Teginbek",
        "Torres",
        "Valroux",
        "Wu Tsain",
        "Zepeda"
      ],
      "tables": []
    },
    "mise a terre": {
      "nom": "Mise à terre",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat permet au spadassin de jeter son adversaire au sol. Le duelliste utilise son fouet qu’il enroule autour de la (les) cheville(s) de son ennemi et tire énergiquement sur la poignée de son arme, projetant ainsi brutalement son adversaire au sol, tête la première. Vous devez utiliser cette aptitude comme compétence d’attaque et réussir votre jet avec deux augmentations (vous visez ses jambes). Si vous touchez, votre adversaire est violemment projeté au sol sur la tête et encaisse un coup qui peut l’assommer (il doit réussir un jet de Gaillardise contre un ND de 10 + 5 par augmentation au-delà des deux premières). De plus, il devra ensuite dépenser un dé d’action pour défaire sa (ses) jambe(s) emmêlée(s), la contrepartie étant que votre fouet est également inutilisable pour vous.",
      "ecoles_enseignant": [
        "Malone"
      ],
      "tables": []
    },
    "mur d'acier": {
      "nom": "Mur d’acier",
      "categorie": "Techniques de spadassin classiques",
      "description": "Votre épée est un outil en mouvement constant qui passe d’une parade à une autre. Vous l’exploitez comme une tortue se sert de sa carapace. Si vous n’avez pas encore attaqué lors de ce tour, vous pouvez utiliser la compétence parade comme défense passive et chaque rang de la compétence Mur d’acier augmente ce ND pour être touché de 3 points.",
      "ecoles_enseignant": [
        "Bonita",
        "Charmine",
        "De Vore",
        "Desco Numanaius",
        "Hainzl",
        "Kjemper"
      ],
      "tables": []
    },
    "poignee de poudre": {
      "nom": "Poignée de poudre",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique ne peut être utilisée qu’une fois par cible et combat. Dans le même mouvement qui suit la projection de la poudre au visage de l’adversaire (jet de Poignée de poudre + Finesse contre le ND pour être touché de l’adversaire avec un malus de une augmentation), il faut frapper d’estoc avec son épée, profitant du réflexe naturel qu’aura l’adversaire de porter ses mains à ses yeux, découvrant ainsi largement sa garde. Si l’attaquant réussit son jet, l’adversaire ne peut pas utiliser de défense active pour parer ou esquiver le coup d’estoc, dont les dommages sont augmentés de un dé lancé et gardé. De plus, s’il ne se décide pas à fuir, il retirera un dé à tous ses tests jusqu’à la fin de la phase suivante en raison de son irritation oculaire.",
      "ecoles_enseignant": [
        "Scola Carnavale"
      ],
      "tables": []
    },
    "prise de bras": {
      "nom": "Prise de bras",
      "categorie": "Techniques de spadassin classiques",
      "description": "Généralement, le spadassin immobilise la lame de son adversaire en la bloquant avec sa propre épée au niveau de la garde. Puis il saisit promptement son poignet et porte un coup d’estoc. Il doit d’abord réussir une Défense Active de Parade. Il peut alors dépenser une action afin de faire un jet d’opposition de [Gaillardise + Prise de bras] contre [Gaillardise + Parade] de la cible. S’il échoue, il peut recommencer en dépensant à nouveau un dès d’action, sinon le spadassin à l’origine de la prise de bras place sa prochaine attaque immédiatement, sans dépenser de dé d’action supplémentaire, contre un ND de la cible réduit de 10 (minimum 5). Si la cible réussit, il dégage son poignet à temps afin de se remettre en garde, mais il aura dépensé un ou plusieurs dés d’action.",
      "ecoles_enseignant": [
        "Kippe",
        "Koncerz",
        "Kulachniy Boi",
        "Les Cadets",
        "Nadziak"
      ],
      "tables": []
    },
    "reproduire": {
      "nom": "Reproduire",
      "categorie": "Techniques de spadassin classiques",
      "description": "Vous pouvez employer n’importe quelle Techniques de combat de votre adversaire à son encontre, comme si vous la possédiez vous-même. La première fois que votre adversaire emploie une technique de combat, vous devez effectuer un jet d’Esprit contre un ND égal à (5 + 5 x rang dans la technique de combat de l’adversaire) afin de comprendre celle-ci et de la gagner au même rang un pour le reste de la scène. Ensuite, chaque fois qu’il emploiera de nouveau cette technique de combat contre vous lors de cette scène, vous pouvez effectuer un autre jet d’Esprit (même seuil). Un succès incrémente votre rang dans cette technique de combat d’un niveau. Le gain maximum est votre rang de maîtrise dans la technique Reproduire. Ce talent ne s’applique que contre un adversaire contre lequel vous vous êtes concentrés sur ses mouvements. Vous ne gardez pas ces techniques de combat, vous les imitez simplement jusqu’à la fin de la scène. Cette technique de combat ne peut s’appliquer que contre un adversaire employant le même type d’arme que le spadassin (il est impossible, par exemple, de copier les mouvements et les compétences utilisées avec un bâton de combat ou un Panzerfaust avec une lame d’escrime).",
      "ecoles_enseignant": [
        "Faileas"
      ],
      "tables": []
    },
    "rasoir": {
      "nom": "Rasoir",
      "categorie": "Techniques de spadassin classiques",
      "description": "Vous avez étudié les bases de l’anatomie et maîtrisez parfaitement le déplacement de votre lame d’escrime afin de profiter de vos connaissances. En conséquence, lorsque vous frappez un adversaire avec une arme d’escrime, vous infligez des blessures précises et extrêmement douloureuses. Pour chaque rang dans cette technique de combat, vous infligez 2 points de santé supplémentaires.",
      "ecoles_enseignant": [
        "Marchenko"
      ],
      "tables": []
    },
    "retourner les attaques": {
      "nom": "Retourner les attaques",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le spadassin qui utilise cette technique de combat retourne l’attaque de son adversaire contre lui. Cette manœuvre doit être utilisée comme défense active avec un ND augmenté de 10 et ne peut être employée lors d’une interruption. Si le spadassin réussi à retourner l’attaque, son antagoniste effectue alors les dommages contre lui-même avec le même jet de dégâts, mais en gardant les dés qui l’arrangent, c’est à dire les plus faibles afin d’encaisser le moins de dommages possibles.",
      "ecoles_enseignant": [
        "Caldwell",
        "Mullooney",
        "Szabla Honoru",
        "Wu Tsain"
      ],
      "tables": []
    },
    "riposte": {
      "nom": "Riposte",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat permet d’effectuer une parade suivie immédiatement d’une contre-attaque. Vous devez tout d’abord tenter une défense active de parade avec un test de [Finesse + Riposte + 5] pour éviter l’attaque visant votre PJ, puis, si vous y êtes parvenu, vous pourrez effectuer ensuite et sans dépenser d’autre dès d’action une attaque contre l’adversaire de votre PJ. Lorsque vous contre-attaquez, vous effectuez le test avec votre Finesse + [rang de Riposte divisé par 2 et arrondi à l’entier supérieur] + [rang d’Attaque divisé par deux (arrondi à l’entier inférieur)] dés pour votre contre-attaque et le ND de cette attaque est augmenté de 5. La Riposte ne peut être utilisée lors d’une interruption.",
      "ecoles_enseignant": [
        "Al Aïfa",
        "Aldana",
        "Ambrogia",
        "Andrews",
        "Awal Thmani",
        "Blitzen",
        "Boucher",
        "Calis",
        "De Vore",
        "Donovan",
        "Fa'tahib",
        "Gallegos",
        "Hainzl",
        "Hallbjorn",
        "Krzyż",
        "La Guêpe",
        "Marchenko",
        "Marcina",
        "Mortis",
        "Pavois",
        "Provolone",
        "Salinas",
        "Scarlatti",
        "Strade",
        "Trécy",
        "Zimowit"
      ],
      "tables": []
    },
    "rompre le combat": {
      "nom": "Rompre le combat",
      "categorie": "Techniques de spadassin classiques",
      "description": "Cette technique de combat permet au spadassin de rompre un combat de manière tactique sans prendre de coups au moment où il prend la fuite. Quand un combat se passe très mal, l’épéiste peut dépenser un dé d’action pour s’enfuir. L’adversaire peut dépenser comme à l’accoutumée un dès d’action pour effectuer immédiatement une attaque sur le fuyard, mais vous y opposez votre jet de technique de combat en Rompre le combat, auquel vous ajoutez au résultat le rang dans cette technique . Si vous réussissez votre jet, vous gagnez 3 phases sur la poursuite qui va s’engager. Si vous ratez, vous encaissez les dégâts, mais avez tout de même réussi à prendre la fuite (sans gagner de phases supplémentaires).",
      "ecoles_enseignant": [
        "Braslyn",
        "Bricquébec",
        "Rees",
        "Necare"
      ],
      "tables": []
    },
    "saut a la perche": {
      "nom": "Saut à la perche",
      "categorie": "Techniques de spadassin classiques",
      "description": "Vous avez appris à utiliser une perche afin d’améliorer les distances de saut (longueur et hauteur) que vous êtes capable d’effectuer. C’est une nouvelle compétence avancée de l’entraînement d’Athlétisme. Les spadassins Nahgem l’utilisent comme une compétence de base. Vous devez utiliser une perche d’une taille au moins égale à la vôtre. Vous effectuez un jet de Gaillardise + Saut à la perche, vous pouvez ajouter votre taille à un saut en hauteur, ou deux fois votre taille à un saut en longueur. Le ND de ce jet est de 15. Pour chaque augmentation que vous prenez sur ce jet, vous pouvez ajouter 0,25 mètres à un saut en hauteur ou 0,5 mètres à un saut en longueur. Vous ne pouvez augmenter la distance d’un saut en hauteur au-delà de la longueur de la perche que vous utilisez ou de deux fois cette distance pour un saut en longueur.",
      "ecoles_enseignant": [
        "Nahgem"
      ],
      "tables": []
    },
    "tourbillon": {
      "nom": "Tourbillon",
      "categorie": "Techniques de spadassin classiques",
      "description": "Le Tourbillon est une attaque rotative conçue pour terrasser plusieurs ennemis inexpérimentés à la fois. Pour chaque rang que vous possédez dans cette technique de combat, ajoutez deux fois ce dernier à votre jet d’attaque lorsque vous combattez des brutes. Ainsi, un maître disposant de 5 rangs dans la technique de combat Tourbillon fera passer le résultat de son jet d’attaque de 19 (+ 2 x 5) à 29.",
      "ecoles_enseignant": [
        "Al'Marikk",
        "Basulde",
        "Chaka",
        "Charmine",
        "Chin Te",
        "Geng Yu Qiang",
        "Lipka",
        "Mateenatya",
        "Okada-ryu",
        "Qurra",
        "Sanders",
        "Sersemlik",
        "Shaktishaalee",
        "Siggursdottir",
        "Soldano",
        "Vigilare"
      ],
      "tables": []
    },
    "veneration du prophete": {
      "nom": "Vénération du Prophète",
      "categorie": "Techniques de spadassin classiques",
      "description": "Au moyen de cette technique de combat, vous pouvez faire tomber votre adversaire à genoux. L’objectif est de planter votre rapière dans l’une de ses rotules. La manœuvre consiste à plonger à ses pieds, la pointe au niveau de ses genoux. Pour réussir cette attaque, il vous faut déjà toucher la rotule de votre adversaire, ce qui nécessite de réussir une attaque en utilisant Vénération du Prophète avec un ND +10. Ensuite, pour que le coup soit porté avec suffisamment de force, il est nécessaire d’infliger une blessure. Dans ce cas, votre adversaire tombe à genoux et ne peux pas se relever sans assistance, ce qui l’empêche de se déplacer jusqu’à la fin de la scène, et diminue tous ses tests d’attaque et défense de 5.  Si, en revanche, vous échouez, vous vous retrouvez au sol dans une position désavantageuse ; votre ND pour être touché n’est que de 5 pour la prochaine action de votre adversaire.",
      "ecoles_enseignant": [
        "Escuela Pater Noster"
      ],
      "tables": []
    },
    "voir le style": {
      "nom": "Voir le style",
      "categorie": "Techniques de spadassin classiques",
      "description": "Au début de chaque combat, les duellistes peuvent tenter un jet de [Esprit + Voir le style], avec un certain nombre d’augmentations. S’ils réussissent leur jet, ils reconnaissent l’école de leur adversaire. Ils bénéficient alors de 1 point de défense passive et active supplémentaire par rang en Voir le style, plus 2 par augmentation prise. Ce bonus de défense n’est valable que pour la défense passive.",
      "ecoles_enseignant": [
        "Awal Thmani",
        "Badayah",
        "Bugu Takobi",
        "Calis",
        "Chaka",
        "De Vore",
        "Fa'tahib",
        "Gbeto",
        "Hallbjorn",
        "Iyasu",
        "Koncerz",
        "Krzyż",
        "Kulachniy Boi",
        "La Siqueira",
        "Lipka",
        "Mateenatya",
        "Mubarizdun",
        "Nadziak",
        "Okada-ryu",
        "Omuhelo",
        "Pancerny",
        "Ssang Geom",
        "Strade",
        "Szabla Honoru",
        "Szybowanie",
        "Tin Hinan",
        "Toutes les écoles",
        "Vilkas",
        "Wolny Lis",
        "Zimowit",
        "Žynys"
      ],
      "tables": [
        [
          [
            "Difficultés des tests de Voir le Style"
          ],
          [
            "Type d’école de l’adversaire",
            "Niveau de Difficulté"
          ],
          [
            "L’adversaire n’a aucune école ou est la même que la vôtre",
            "10"
          ],
          [
            "Ecole reconnue par la Guilde des Spadassins et du même pays que le personnage",
            "15"
          ],
          [
            "Ecole reconnue par la Guilde des Spadassins et du même continent que le personnage",
            "20"
          ],
          [
            "Ecole reconnue par la Guilde des Spadassins d’un autre continent",
            "25"
          ],
          [
            "Ecole non-reconnue par la Guilde des Spadassins et d’un autre continent",
            "30"
          ],
          [
            "Ecole enseignée par une organisation ou société secrète",
            "40"
          ],
          [
            "L’adversaire est un Grand Maitre de son école",
            "+10"
          ]
        ]
      ]
    },
    "assommer": {
      "nom": "Assommer",
      "categorie": "Techniques de combat à mains nues",
      "description": "Pour assommer son adversaire, l’assaillant effectue un jet d’Assommer + Gaillardise contre le ND de la victime. En cas de réussite, la victime effectue un jet de Gaillardise avec un ND égal à trois fois les dommages infligés. Si ce jet est un échec, la victime est alors inconsciente. Si le jet est réussi, elle encaisse les dommages et peut continuer le combat. Si l’attaque est effectuée sans que la victime en soit consciente (embuscade, etc.), le ND est incrémenté de deux augmentations.",
      "ecoles_enseignant": [
        "Kensington",
        "Yorak"
      ],
      "tables": []
    },
    "blocage offensif": {
      "nom": "Blocage offensif",
      "categorie": "Techniques de combat à mains nues",
      "description": "Le blocage est l'art de placer votre bras ou votre jambe entre vous et les coups de votre ennemi. Le blocage offensif est l'acte de frapper le bras ou la jambe de votre ennemi alors qu'il vous porte une attaque à mains nues, votre défense devenant ainsi une attaque. Vous pouvez vous en servir en Défense Active contre toute attaque à mains nues, comme Attaque (Combat de rue), Attaque (Pugilat), Prise, Coup de pied, etc. Si vous réussissez votre Défense Active, vous infligez 1g1 dé de dommages à votre adversaire (vous n'y ajoutez pas votre Gaillardise). Vous pouvez prendre des augmentations pour accroître les dommages infligés comme s'il s'agissait d'une attaque normale, mais vous ne pouvez pas localiser vos coups.",
      "ecoles_enseignant": [
        "Tie Xiong Kung"
      ],
      "tables": []
    },
    "coup de pied saute": {
      "nom": "Coup de pied sauté",
      "categorie": "Techniques de combat à mains nues",
      "description": "Cette technique de combat nécessite la dépense d’un autre dé d’action en plus de celui de l’action en cours, sans quoi vous ne pourrez pas effectuer cette action. Vous effectuez un violent bond vers le haut, en gardant la jambe repliée et en la détendant violemment dans le visage de votre adversaire. Pour cela, vous devez effectuer un coup visé au visage (+ 4 augmentations). Si vous réussissez, votre adversaire encaisse une blessure. De plus, vous lancez les dés de dommages comme d’habitude. Ensuite, la victime effectue un jet de Gaillardise avec un ND égal à votre résultat du jet d’attaque. Si ce jet est un échec, la victime est alors temporairement sonnée et perd toutes ses actions du round en cours. Si le jet est réussi, elle encaisse les dommages et peut continuer le combat. Si l’attaque est effectuée sans que la victime en soit consciente (embuscade, etc.), le jet d’attaque est de 2 augmentations au lieu de 4.",
      "ecoles_enseignant": [
        "Ki Kwanji",
        "Omuhelo",
        "Tie Xiong Kung"
      ],
      "tables": []
    },
    "esquive de projectiles": {
      "nom": "Esquive de projectiles",
      "categorie": "Techniques de combat à mains nues",
      "description": "Vous avez appris à dévier les flèches et autres projectiles tirés dans votre direction sans être blessé par eux. Vous pouvez l'utiliser comme compétence de défense quand vous devez vous défendre contre des armes lancées, des flèches, des pierres de fronde, des carreaux d'arbalète, mais pas contre des armes à feu, des attaques au corps à corps, ou des tirs d'artillerie. Si vous choisissez d'utiliser cette technique de combat comme défense active, vous ajoutez votre rang dans cette technique à la Défense Active et Passive. De plus, vous pouvez utiliser deux Augmentations sur votre jet d'Esprit + Esquive de projectiles pour attraper le projectile plutôt que de le dévier. Si vous parvenez à l'attraper, vous gagnez un dé d'héroïsme qui disparaîtra à la fin du round si vous ne l'utilisez pas.",
      "ecoles_enseignant": [
        "Zheng Yi Quan"
      ],
      "tables": []
    },
    "griffe": {
      "nom": "Griffe",
      "categorie": "Techniques de combat à mains nues",
      "description": "Une griffe est un type d'attaque à mains nues qui utilise vos doigts pour appliquer une forte pression sur la peau de votre adversaire. Bien qu'il en résulte une prise momentanée, elle est relâchée immédiatement. Pour réaliser une telle attaque, faites un jet de Finesse + Griffe contre le ND pour être touché de votre ennemi, plus 10. Les dégâts d'une Griffe sont les mêmes que pour une attaque à mains nues ordinaire, mais comme vous agissez sur des points de pression de votre opposant, il sera aussi étourdi, et perdra son prochain dé d'action, s'il lui en reste un dans le round courant.",
      "ecoles_enseignant": [
        "Ying Sun Wo"
      ],
      "tables": []
    },
    "manchette": {
      "nom": "Manchette",
      "categorie": "Techniques de combat à mains nues",
      "description": "Cette attaque à mains nues inflige 1g1 dé de dommages, mais augmente de 5 le ND que vous essayez d'atteindre. Vous devez déclarer votre intention avant d'effectuer votre jet, et utiliser cette technique de combat à la place de votre technique de combat d'attaque normale.",
      "ecoles_enseignant": [
        "Tie Xiong Kung"
      ],
      "tables": []
    },
    "attaque combinee": {
      "nom": "Attaque combinée",
      "categorie": "Techniques de combat avec animaux",
      "description": "Votre PJ attaque conjointement à son animal, empêchant, par la même, son adversaire de se défendre efficacement. Pour cela, vous devez retarder votre dé d’action pour intervenir lors de la même phase que votre animal. Vous attaquez alors en même temps que votre animal. Si vous et votre animal passez ensemble la défense passive de votre cible, elle ne pourra utiliser pleinement sa défense active que contre vous ou votre animal.",
      "ecoles_enseignant": [
        "Canis",
        "Teginbek"
      ],
      "tables": []
    },
    "attaque de cavalerie": {
      "nom": "Attaque de cavalerie",
      "categorie": "Techniques de combat avec animaux",
      "description": "Le personnage tente de frapper tôt et souvent, puis se replie pour se mettre à l’abri. Vous pouvez diminuer deux de vos dés d’action de votre rang dans cette technique de combat (jusqu’à un minimum de 1) juste avant la première phase de chaque tour de combat lorsque vous êtes à cheval, ce qui vous permettra d’attaquer puis de vous replier avant que votre adversaire ne puisse faire quoi que ce soit excepté se défendre.",
      "ecoles_enseignant": [
        "Buslayevich",
        "Chima Gongjian Shou",
        "Gustavo",
        "Shaktishaalee"
      ],
      "tables": []
    },
    "charge de cavalerie": {
      "nom": "Charge de cavalerie",
      "categorie": "Techniques de combat avec animaux",
      "description": "Le cavalier charge son adversaire en galopant sur une distance d’au moins 50 mètres en ligne droite. Cette manœuvre est très impressionnante, en particulier si l’adversaire est à pied. Cette attaque étant une charge comme à pied, vous lancez [Finesse + Charge de Cavalerie] mais retirez -1g1 puisque cette attaque est considérée comme une charge à pied. Si la charge est un succès, le cavalier ajoute un dé (lancé et gardé) aux dégâts, plus un toutes les deux augmentations.",
      "ecoles_enseignant": [
        "Caballo Rojo",
        "Chima Gongjian Shou",
        "Gustavo",
        "Pancerny",
        "Pösen",
        "Shaktishaalee",
        "Szybowanie",
        "Yesukai"
      ],
      "tables": []
    },
    "detourner l'attention": {
      "nom": "Détourner l’attention",
      "categorie": "Techniques de combat avec animaux",
      "description": "À l’aide de cette technique de combat vous effectuez toute une série de passes d’arme, de coups d’estoc et de bottes pour attirer l’attention de votre adversaire et permettre ainsi à votre animal de porter instinctivement sa prochaine attaque contre un ND de défense passive réduit de [Rang dans cette technique x2], sans que votre adversaire ne puisse effectuer de défense active : il n’a pas remarqué les mouvements de votre allié animal.",
      "ecoles_enseignant": [
        "Kiriakin"
      ],
      "tables": []
    },
    "meute": {
      "nom": "Meute",
      "categorie": "Techniques de combat avec animaux",
      "description": "Cette technique de combat permet de donner des ordres aux chiens sur un champ de bataille afin qu’ils suivent leur maître. Un maître-chien peut ainsi être accompagné de (rang dans la technique de combat Meute) chiens de combat en plus de son chien de tête. Ces chiens sont considérés comme des brutes niveau 1 au rang d’apprenti, niveau 2 au rang de compagnon et niveau 3 au rang de maître.",
      "ecoles_enseignant": [
        "Canis"
      ],
      "tables": []
    },
    "saut de cheval": {
      "nom": "Saut de cheval",
      "categorie": "Techniques de combat avec animaux",
      "description": "Cette technique vous permet de sauter sur un adversaire, monté ou à pied, tout en lui portant un coup d’épée au moment de l’impact. Le cavalier arrivant à hauteur de sa cible saute vigoureusement, pointe en avant sur son adversaire. Si sa monture a été dressée au sein de l’école, elle reviendra immédiatement vers lui après son saut, lui permettant de remonter en selle dès l’action suivante. Si elle réussit, cette attaque a un double effet : d’une part l’adversaire ne peut pas tenter de défense active, d’autre part, il ajoute trois à son prochain dé d’action à cause du choc reçu (si cela l’amène à un résultat supérieur à 10, l’action est perdue).",
      "ecoles_enseignant": [
        "Caballo Rojo",
        "Szybowanie"
      ],
      "tables": []
    },
    "enchainement": {
      "nom": "Enchaînement",
      "categorie": "Techniques d'assassinat",
      "description": "Grâce à cette technique de combat, le personnage peut enchaîner une multitude de coups rapides sur son adversaire. Il peut ainsi enchaîner sur un dé d’action, [rang en Enchaînement] attaques avec le ND pour être touché de l’adversaire qui augmente de 5 par attaque après de la première. Les dommages sont également réduits de 1 dé lancé par attaque au-delà de la première (minimum 1g1). Les attaques possibles par enchaînement sont les suivantes : attaque (arts martiaux défensifs, arts martiaux offensifs, combat de rue, pugilat), coup de pied, coup de tête, direct ou uppercut.",
      "ecoles_enseignant": [
        "Ki Kwanji"
      ],
      "tables": []
    },
    "erafler": {
      "nom": "Érafler",
      "categorie": "Techniques d'assassinat",
      "description": "Cette technique de combat permet au spadassin d’érafler la peau de son adversaire sur une grande longueur. Cette aptitude semble de peu d’utilité, en effet, les dégâts sont peu importants (0g1), et la manœuvre est difficile (ND + 5, surtout si l’adversaire porte une armure, les malus seront alors à la discrétion du MJ suivant les protections de l’adversaire), mais elle permet une meilleure infiltration de la substance qui recouvre l’arme dans le corps de sa victime (vitesse d’action du poison augmentée, à la discrétion du MJ). De plus, elle peut permettre d’infliger une balafre facilement reconnaissable à un ennemi que l’on voudrait pouvoir reconnaître et accuser aisément plus tard.",
      "ecoles_enseignant": [
        "Scarlatti"
      ],
      "tables": []
    },
    "garrotter": {
      "nom": "Garrotter",
      "categorie": "Techniques d'assassinat",
      "description": "Cette technique de combat permet à un assassin de tuer sa cible dans un silence presque total. À cette fin, il utilise une lanière de cuir ou un fil de métal, se glisse silencieusement derrière sa proie, lui passe le fil autour du cou et l’étrangle. La victime ne peut alors ni crier (à cause du filin qui lui écrase la trachée), ni se défendre (l’assassin se gardant d’être trop proche de sa cible).Cette technique de combat ne peut être utilisée qu’après que le spadassin ait réussi un jet de Discrétion ou Déplacement silencieux (en bref, sa cible ne doit pas se rendre compte de ses intentions, sinon son attaque est vouée l’échec). Le garrotteur effectue ensuite son attaque en utilisant sa technique de combat Garrotter contre un ND diminué de 5 en raison du fait que sa victime ne s’y attend pas. Cette dernière n’a ensuite plus qu’une option, essayer d’échapper à la mort. Pour cela, elle doit réussir un jet de [Finesse + Contorsionnisme] ou [Gaillardise + Se dégager] contre un ND de [10 + (Technique de combat Garrotter de l’assassin x 5)]. Si elle n’y parvient pas, elle est victime des règles de noyade dès le deuxième round de combat Il vaudrait mieux qu’elle arrive à échapper à la prise de l’assassin très rapidement !",
      "ecoles_enseignant": [
        "Nadja'hari"
      ],
      "tables": []
    },
    "noyer": {
      "nom": "Noyer",
      "categorie": "Techniques d'assassinat",
      "description": "Cette technique de combat, après avoir réussi à saisir son adversaire, permet de noyer ce dernier dans n’importe quel récipient d’eau pouvant contenir son visage (et plus). Pour ce faire, le personnage usant de cette technique de combat doit avoir réussi un jet de Finesse + Noyer contre un ND égale à (Esprit de l’adversaire x 5). Une fois ce jet réussi, l’assassin a pu plonger son adversaire partiellement ou totalement dans l’eau. Évidemment, la victime peut tenter de se dégager comme pour une prise normale mais doit le faire avec un malus de 5 sur son ND. En outre, pour savoir si l’adversaire est noyé, il est nécessaire de se référer aux règles sur la noyade.",
      "ecoles_enseignant": [
        "Bahol"
      ],
      "tables": []
    },
    "camouflage": {
      "nom": "Camouflage",
      "categorie": "Techniques de combat à distance",
      "description": "Devenu un professionnel de l’embuscade, un tireur de l’école Guzman peut gagner un bonus de |rang en Camouflage] augmentations gratuites sur tous ses jets d’opposition visant à surprendre un adversaire lorsqu’il doit effectuer un tir. Pour pouvoir bénéficier de ce bonus, il doit également bénéficier de temps pour s’installer, chaque quart d’heure lui permet d’accumuler une augmentation.\n\nExemple : Juan a une compétence de 5 en Camouflage, ce qui lui permet de bénéficier de 5 augmentations sur son jet de Finesse + Guet-apens afin de surprendre son adversaire. Mais il n’a bénéficié que d’une demi-heure de préparation, réduisant son bénéfice à 2 augmentations gratuites.\n\nÀ l’inverse, un tireur Guzman sait instinctivement où se placerait un adversaire qui voudrait faire feu sur lui ou un allié. Aussi, lorsqu’il doit effectuer un jet de surprise quand on cherche à lui tirer dessus, lui ou un allié proche il bénéficie de [rang en Camouflage] augmentations gratuites sur son jet.",
      "ecoles_enseignant": [
        "Guzman"
      ],
      "tables": []
    },
    "epingler": {
      "nom": "Épingler",
      "categorie": "Techniques de combat à distance",
      "description": "Vous savez vous servir d’une arme de jet pour clouer la main (ou la manche) d’un adversaire à une surface proche, comme un arbre par exemple. Vous devez lancer une arme de jet en utilisant Épingler (Couteau) plutôt que votre compétence d’attaque habituelle, et ajoute 10 à votre ND pour toucher (pénalité qui ne peut être annulée avec la technique de combat Tir d’adresse). Si vous l’emportez, vous clouez le bras (ou la manche) de votre adversaire et il lâche ce qu’il tenait en main. En outre, il doit dépenser une action et réussir un test de [Gaillardise + Se Dégager] avec un ND de 10 pour se libérer. On ne peut utiliser cette technique de combat que contre des cibles portant des étoffes ou autres vêtements. Épingler une armure en métal (en Dracheneisen ou non) à une surface est tout simplement infaisable.",
      "ecoles_enseignant": [
        "Cappuntina",
        "Necare"
      ],
      "tables": []
    },
    "gros sel": {
      "nom": "Gros sel",
      "categorie": "Techniques de combat à distance",
      "description": "Un tireur de l’école Durante peut utiliser cette technique pour tirer des plombs de la taille du gros sel plutôt que des balles classiques. Cela lui permet, en raison de la quantité de projectiles insérés dans le canon, d’étendre la zone de dispersion de son tir, multipliant les victimes. Toutefois, les dégâts sont moindres. Lorsqu’il veut faire usage de cette technique de combat, le joueur doit le préciser avant de charger son arme, il effectuera ensuite un tir normal et il pourra toucher un nombre de cibles supplémentaire égal à son rang dans la technique de combat Gros sel. Par contre, les victimes ne subiront que 2g1 dégâts. Mais elles devront également faire face à une douleur cuisante et handicapante qui les privera d’un dé lancé et gardé sur tous leurs jets tant que ces blessures légères n’auront pas disparues (transformées en blessures graves ou soignées grâce à la compétence Premier secours).",
      "ecoles_enseignant": [
        "Durante"
      ],
      "tables": []
    },
    "observateur": {
      "nom": "Observateur",
      "categorie": "Techniques de combat à distance",
      "description": "Afin d’améliorer encore la précision du tir, les hommes de Guzman ont pris l’habitude de travailler en binôme : l’un équipé du mousquet de précision Guzman, l’autre d’une longue-vue et de plusieurs appareils de mesure (sens et vitesse du vent, hygrométrie, etc.). Ce dernier observe les cibles potentielles et donnent toutes les indications qui pourraient s’avérer utile au tireur, lui permettant d’optimiser son tir. En termes pratiques, l’observateur permet au tireur de bénéficier de [rang dans sa technique de combat Observateur] dés lancés non gardés sur son jet de tir.",
      "ecoles_enseignant": [
        "Guzman"
      ],
      "tables": []
    },
    "retourne tire": {
      "nom": "Retourné-tiré",
      "categorie": "Techniques de combat à distance",
      "description": "Grâce à cette technique de combat, le personnage est capable de se retourner rapidement et de faire feu dans le même mouvement lors des duels au pistolet sans perdre sa concentration, ce qui lui permet de réduire la valeur de son premier dé d’initiative de 2 points par rang de maîtrise dans cette technique.",
      "ecoles_enseignant": [
        "Overmars"
      ],
      "tables": []
    },
    "tir a blanc": {
      "nom": "Tir à blanc",
      "categorie": "Techniques de combat à distance",
      "description": "Cette technique de combat permet au personnage de faire feu avec une arme ne contenant pas de projectile mais une surdose de poudre. En pratique, lorsque le pistolier appuie sur la détente, un grand nuage de poudre jaillit du canon, faisant immédiatement éternuer et pleurer les personnes se trouvant à moins de trois mètres (5 pour les fusils). Pour cela, le pistolier doit réussir un jet de Tir à blanc + Finesse contre le ND de l’adversaire avec un malus de deux augmentations. S’il y parvient, et si son adversaire ne se décide pas à fuir, il retirera un dé (lancé et gardé) à tous ses jets de compétence pour ses (rang de maîtrise Tir à blanc)prochaines actions en raison de ses irritations des yeux et de la gorge.",
      "ecoles_enseignant": [
        "Bricquébec"
      ],
      "tables": []
    },
    "tir a carreau special": {
      "nom": "Tir à carreau spécial",
      "categorie": "Techniques de combat à distance",
      "description": "Cette technique de combat permet à l’arbalétrier d’utiliser des carreaux spéciaux à la place des normaux. Il en connaît toutes les variétés et est capable d’adapter son tir à leur poids, leur forme, leur longueur. Malgré cela, le ND de sa cible augmente de 5 en raison de la grande variété de ses projectiles. Cette technique de combat remplace celle d’Attaque (Arbalète) quand le tireur utilise des carreaux spéciaux. Voici les principaux carreaux de Ricardo que l’on peut trouver :\n\nCarreau assommant : un petit sac de sable remplace la pointe et permet d’assommer la victime si le tireur a réussi à toucher la tête (4 augmentations) et que la cible rate un jet de Détermination contre un ND de 25. Elle choit alors au sol, assommée.\n\nCarreau d’artifice : ce carreau est utilisé de nuit, on le tire presque à la verticale. Il explose en fusées multicolores en arrivant à une certaine hauteur.\n\nCarreau éclairant : ce carreau, comme le carreau d’artifice est surtout utilisé de nuit, on le tire en l’air. Il explose et permet d’éclairer une vaste zone pendant une minute ou une phase, autorisant le tireur à tirer ses carreaux suivants sans pénalités ou presque sur ses cibles, maintenant éclairées.\n\nCarreau empoisonné : le carreau est évidé, on peut y glisser une ampoule en verre contenant généralement du poison, ce dernier s’écoule, de l’intérieur, jusqu’à la pointe permettant à la substance de se répandre immédiatement dans l’organisme de sa cible si elle subit au moins un point de santé.\n\nCarreau explosif : la pointe est remplacée par des explosifs qui entre en action au premier choc, infligeant 4g4 dés de dommages à la cible mais sans compter les attributs de perforation de l’arme.\n\nCarreau extincteur : la pointe est remplacée par un petit sac étanche rempli d’eau. Ce carreau est idéal pour éteindre une torche ou une lanterne (dont il casse la vitre) à distance et de plonger ainsi ses adversaires dans le noir. Afin de disparaître plus facilement bien évidemment.\n\nCarreau filet : ce carreau, au corps très épais, ne peut se tirer qu’à courte portée. Il contient un filet aux mailles fines et solides qui empêtrera sa victime (voir la technique de combat du même nom).\n\nCarreau fumée : ce carreau explose au premier choc dans un grand nuage de fumée. L’arbalétrier l’utilisera souvent en tirant à ses pieds afin de se camoufler au regard d’un autre tireur (+15 à son ND pour un tir à distance, +5 au corps à corps) ou de s’enfuir.\n\nCarreau marqueur : un petit sac remplace la pointe et explose au contact permettant de répandre une poudre luminescente sur la cible, facilitant le tir de nuit (pénalités annulées).\n\nCarreau perceur d’armure : une pointe métallique renforcée et très pointue facilite l’insertion dans les armures. Elle augmente de 5 l’attribut « Perforant » (à l’exception du Dracheneisen) mais diminue les portées moyennes et longues de 30 et 60.\n\nCarreau rasoir : la pointe de ce carreau se prolonge le long du corps du missile et est effilée comme un rasoir, infligeant 1 lancé et gardé de dommages supplémentaires sur les personnes sans armure. Sur celles qui ont une armure, par contre, il inflige 1 dé de moins à lancer et garder.\n\nCarreau séparateur : ce projectile se sépare en deux carreaux distincts dix mètres après avoir quitté l’arbalète. Il inflige donc deux fois des dommages, mais chacun d’eux avec un dé (à lancer et à garder) en moins.\n\nCarreau volant : ce carreau à la forme allongée est adapté au tir à longue portée, il permet de diminuer de 5 le ND à de telles distances.\n\nCarreau zigzag : ce carreau avance en zigzag, ne permettant pas à sa cible de vraiment se protéger. Ses défenses passives et actives sont diminuées de 5 lorsque l’on utilise ce genre de carreau.\n\nCarreau-grappin : le corps de ce carreau renferme trois bras métalliques inversés qui s’ouvre dès leur départ de l’arbalète. Une cordelette est attachée à un anneau à l’arrière du carreau, permettant de servir de grappin.",
      "ecoles_enseignant": [
        "Ricardo"
      ],
      "tables": []
    },
    "tir d'adresse": {
      "nom": "Tir d’adresse",
      "categorie": "Techniques de combat à distance",
      "description": "Pour chaque rang dont vous disposez dans cette technique de combat, vous soustrayez 5 points à toutes les pénalités relatives au tir (portée, couverture, etc.). Tir d’adresse ne vous permet pas de descendre votre ND sous le niveau de difficulté pour être touché de base, tout comme il ne peut augmenter les dommages infligés. Cependant, cela s’applique aux coups ciblés. Par exemple, si une cible à un ND pour être touché de 20, plus 15 pour les modificateurs (comme un coup ciblé à la main), un spadassin ayant 5 rangs dans la technique de combat Tir d’adresse annulera les 15 points de modificateurs mais ne pourra baisser le ND pour être touché de base (soit 20).",
      "ecoles_enseignant": [
        "Bouffe-Doublons",
        "Buslayevich",
        "Cappuntina",
        "Guzman",
        "Höpken",
        "Nadja'hari",
        "O'Faolain",
        "Overmars",
        "Rasmussen",
        "Ricardo"
      ],
      "tables": []
    },
    "tir d'instinct": {
      "nom": "Tir d’Instinct",
      "categorie": "Techniques de combat à distance",
      "description": "Cette technique de combat permet au personnage de tirer sur une cible à l’instinct et, donc, à une vitesse ahurissante. S’il se fait attaquer et qu’il n’a pas le temps de réagir sans effectuer d’interruption, le joueur peut avancer l’un de ses dés d’action de (rang dans la technique de combat) x 2 phases (phase 1 au minimum) et l’utiliser pour tirer avant si sa nouvelle phase précède celle actuelle. Cette technique de combat est effective, même en cas d’attaque surprise, si l’arme est dans les mains du personnage. Ecoles l’enseignant : Bouffe-Doublons, Bricquébec, Buslayevich, Cappuntina, Chima Gongjian Shou, Durante, Mortis, Rasmussen",
      "ecoles_enseignant": [],
      "tables": []
    },
    "tir en cloche": {
      "nom": "Tir en cloche",
      "categorie": "Techniques de combat à distance",
      "description": "Les spadassins qui maîtrisent cette technique de combat passent des mois à apprendre à faire mouche sur une cible très éloignée. Pour chaque rang dans cette technique de combat, le tireur augmente la portée de son arc de 5 mètres et l’arbalétrier de 10 mètres.",
      "ecoles_enseignant": [
        "Chima Gongjian Shou",
        "Höpken",
        "Robin Goodfellow"
      ],
      "tables": []
    },
    "tir en mouvement": {
      "nom": "Tir en mouvement",
      "categorie": "Techniques de combat à distance",
      "description": "Pour chaque rang dont vous disposez dans cette technique de combat, vous soustrayez une pénalité lors des tirs effectués en mouvement. Par exemple, avec un rang dans cette technique de combat, le tireur ne subit pas de malus lorsqu’il marche prudemment et avec un rang de cinq, lorsqu’il pique un sprint.",
      "ecoles_enseignant": [
        "Durante"
      ],
      "tables": []
    },
    "tir en ricochet": {
      "nom": "Tir en ricochet",
      "categorie": "Techniques de combat à distance",
      "description": "Chaque ricochet confère une augmentation de 5 points au ND du tir et retire 1 dé lancé et gardé aux dommages infligés, mais octroie 1 dé d’héroïsme qui doit être utilisé avant la fin du combat.",
      "ecoles_enseignant": [
        "Donnerwetter",
        "Nadja'hari"
      ],
      "tables": []
    },
    "tir en v": {
      "nom": "Tir en V",
      "categorie": "Techniques de combat à distance",
      "description": "Cette technique de combat permet au personnage de tirer deux flèches simultanément, un projectile de chaque côté du corps de l’arc et enchâssés dans la corde. Les flèches partent ainsi dans deux directions différentes. En visant entre deux adversaires, le personnage peut, avec cinq augmentations (diminué d’autant d’augmentations que le rang dans cette technique de combat) les toucher tous les deux en utilisant sa compétence Attaque (Arc) et leur infliger des dommages normaux.",
      "ecoles_enseignant": [
        "Buslayevich"
      ],
      "tables": []
    },
    "tir par dessus la jambe": {
      "nom": "Tir par-dessus la jambe",
      "categorie": "Techniques de combat à distance",
      "description": "Le personnage à son arme à feu rangée dans un holster de ceinture (une innovation pour l’époque) et fait feu sans dégainer ce dernier, simplement en levant la jambe où est attaché le holster et en pressant la détente. Cela lui permet de gagner (rang dans la technique de combat) phases sur son dé d’action (minimum 1) pour son tir.",
      "ecoles_enseignant": [
        "Donnerwetter"
      ],
      "tables": []
    },
    "tir precis": {
      "nom": "Tir précis",
      "categorie": "Techniques de combat à distance",
      "description": "Le personnage apprend à se concentrer afin de porter le coup là où il le faut. Le rang de cette technique de combat détermine le nombre de rounds pendant lesquels il peut se concentrer. Chaque round de concentration augmente la portée de l’arme de 10 mètres et donne une augmentation gratuite ne pouvant être utilisée que pour un tir localisé (tête, main, etc.).",
      "ecoles_enseignant": [
        "O'Faolain",
        "Rasmussen",
        "Ricardo",
        "Robin Goodfellow",
        "Guzman"
      ],
      "tables": []
    }
  },
  "ecoles": [
    {
      "nom": "Al Aïfa",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Cimeterre",
      "arme_display": "Cimeterre (Sabre)",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Cimeterre tenu garde en haut et la fait balancer",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Sabre",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Frappe à deux mains",
          "variante": null,
          "ref": "frappe a deux mains",
          "source": "csv"
        },
        {
          "nom_base": "Lacérer",
          "variante": null,
          "ref": "lacerer",
          "source": "csv"
        },
        {
          "nom_base": "Riposte",
          "variante": "Sabre",
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Peut utiliser Parade (Escrime) comme défense passive sans pénalités.",
        "compagnon": "Difficulté du jet d'attaque augmentée de 10 mais dommages augmentés de 1g1.",
        "maitre": "Les malus de la technique \"Lacérer\" passent de 5 à 10 et ses dommages ne sont plus diminués. Peut monter la technique au rang 6."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Daphan.",
        "origine_texte": "Castille.",
        "description_longue": [
          "Ce style de combat est originaire de l’Empire du Croissant, il utilise uniquement un cimeterre. C’est un réfugié du nom d’Ahmed Ben Rella Al Aïfa qui introduisit cette école en Castille il y a plus de cent cinquante ans. Il n’existe qu’une seule école dans toute la Castille, à San Cristobal, et les élèves ne se pressent pas à l’entrée, peu enclins à rester trois ans dans une école d’escrime au style si étranger.",
          "Le spadassin pratiquant ce style tient le cimeterre à une ou deux mains suivant les moments et en maintient souvent la garde au niveau de son visage tandis que la lame descend jusqu’à son nombril. Il abat alors violemment sa lame, en utilisant la puissance accrue due à l’effet de levier.",
          "De plus, il tourne souvent sur lui-même à la manière des derviches afin d’utiliser la force centrifuge à son avantage lorsqu’il frappe.",
          "Le défaut de ce style de combat que son pratiquant ne protège pratiquement pas ses membres inférieurs aussi un adversaire bien informé pourra le frapper en cet endroit vulnérable sans grandes difficultés."
        ],
        "academies": "Il n’existe qu’une seule école dans toute la Castille, à San Cristobal. Elle est dirigée par le doyen de l’école.",
        "homologation": "1654",
        "doyen": "Hafiz-Ahmed Ben Rella Al Aïfa (1659).",
        "insigne": "Un cimeterre garde en bas à gauche et pointe en haut à droite, sur fond d’un croissant de lune sur la gauche.",
        "armes_pdf": "Cimeterre",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "La lame d’un apprenti Al Aïfa semble glisser dans l’espace pour toujours se placer en travers de celle de son adversaire.",
            "regles": "Un spadassin Al Aïfa peut utiliser Parade (Escrime) comme défense passive sans pénalités."
          },
          "compagnon": {
            "fluff": "Utilisant les techniques des derviches, le compagnon de l’école Al Aïfa tourne rapidement sur lui-même afin de relâcher son bras avec un maximum de puissance en profitant de la force centrifuge.",
            "regles": "Le spadassin voit la difficulté de son jet d’attaque augmenté de 10 mais les dommages qu’il inflige sont augmentés de 1g1."
          },
          "maitre": {
            "fluff": "Un maître a affiné sa technique de combat Lacérer, lui permettant de frapper son adversaire en des endroits très sensibles (yeux, tendons d’Achille, derrière les genoux…).",
            "regles": "Les blessures infligées par un maître voient leurs malus passer de 5 à 10 et ses dommages ne sont plus diminués. De plus, il peut augmenter son rang dans cette technique de 5 à 6."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Al Marikk",
      "origine": "combat_reclassee",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Katar",
      "arme_display": "Katar",
      "armes_categories": [
        "Gant de combat"
      ],
      "specialisations": [
        "Athlétisme",
        "Gant de combat"
      ],
      "description_courte": "",
      "techniques_combat": [
        {
          "nom_base": "Double Attaque",
          "variante": "Gant de combat",
          "ref": "double attaque",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Gant de combat",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Empire du Croissant.",
        "academies": "Dans la tribu des Kurta’kir.",
        "description_longue": [
          "Les ancêtres de Yakub al’Marikk ont développé le style de combat qui porte aujourd’hui leur nom, mais il l’a perfectionné. Sa famille est connue depuis des temps immémoriaux pour ses excellents combattants au couteau, mais les prouesses athlétiques de Yakub lui ont permis de transformer leurs méthodes ancestrales en un style de combat complet. L’école al’Marikk enseigne à ses spadassins comment utiliser deux katars avec une très grande vitesse et une très grande grâce. Cette technique est très acrobatique – les sauts, les culbutes et les attaques virevoltantes sont choses communes. Il arrive très souvent qu’un pratiquant de cette école saute par-dessus son adversaire pour se retrouver dans son dos afin de l’attaquer par derrière.",
          "La principale faiblesse de ce style est qu’il se concentre essentiellement sur l’offensive, et que les katars sont particulièrement inefficaces quand ils sont employés pour parer."
        ],
        "armes_pdf": "Katar",
        "specialisations_pdf": [
          "Athlétisme",
          "Gant de combat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Al’Marikk est un style de combat croissantin qui exploite deux katars.",
            "regles": "L’élève ne subit aucune pénalité de main non directrice lorsqu’il se bat avec ses katars. De plus, pour chaque attaque effectuée contre une même cible durant un tour de combat, le ND pour être touché de l’adversaire est réduit de deux fois le niveau de maîtrise du spadassin maîtrisant cette école. Ainsi, lorsqu’un compagnon de cette école attaque pour la seconde fois un adversaire dont le ND pour être touché est de 25, ce ND tombe à 21 (Compagnon 2, x2 = 4 ; valable uniquement pour le spadassin). Une bande de brutes compte pour un seul adversaire dans ce cas."
          },
          "compagnon": {
            "fluff": "Un compagnon maîtrise une extraordinaire attaque acrobatique qui lui permet de se retrouver dans le dos de son adversaire.",
            "regles": "En utilisant deux actions (dont une seule doit correspondre à la phase en cours), le spadassin peut effectuer une attaque dans le dos de son adversaire (son ND chute alors à 5). La cible a le droit de réaliser une défense active."
          },
          "maitre": {
            "fluff": "Un maître de l’école al’Marikk peut effectuer des attaques extrêmement mortelles car ses mouvements sont particulièrement acrobatiques.",
            "regles": "Les dommages de vos katars sont augmentés de 0g1 pour un total de 2g3. En outre, le rang de vos compétences Saut et Roulé-boulé augmente de 1 et peut ainsi atteindre le rang 6."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Aldana",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Courtisan",
        "Escrime"
      ],
      "description_courte": "Le Spadassin danse pour déconcentrer son adversaire et être imprévisible",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Rapière",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "marquer",
          "variante": "Rapière",
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "riposte",
          "variante": "Rapière",
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Vous lancez (mais ne gardez pas) un dé d'initiative supplémentaire par niveau de maîtrise.",
        "compagnon": "Ajoutez +5 au ND pour être touché du PJ.",
        "maitre": "Au début de chaque tour, recevez (rang d'Esprit) « dés de transe » à ajouter (sans garder) à n'importe quel jet d'attaque ou de défense active du tour."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Castille.",
        "description_longue": [
          "Aldana, style de combat de prédilection des Castillians, est une technique d’escrime qui ne fait appel qu’à une seule main ; le spadassin tient l’autre dans son dos et présente uniquement le flanc à son adversaire, limitant ainsi les zones que ce dernier peut viser.",
          "Cette technique, conçue pour être utilisée avec des armes d’escrime, combine un mélange de bottes d’escrime et de pas de danse sous forme d’une série de mouvements imprévisibles et erratiques. Le duelliste compte les temps pour lui-même, se jouant mentalement la musique sur laquelle il “danse”, ce qui lui permet d’agir de manière totalement imprévisible en se laissant aller au rythme de cette musique, inconnue de son adversaire. Ses mouvements erratiques le rendent plus difficile à toucher et désorientent son adversaire, dont les hésitations peuvent lui être fatales. Les maîtres de cette école sont particulièrement impressionnants : au combat, ils entrent dans une sorte de transe, dans laquelle tout leur être est entièrement concentré sur le duel. Dans cet état, ils surpassent la plupart des escrimeurs.",
          "Le point faible de cette technique réside dans son point fort, à savoir le rythme sur lequel elle est construite. Un duelliste qui connaît ce style d’escrime pourra reconnaître ce rythme particulier et frappera quand le prochain mouvement de son adversaire sera prévisible."
        ],
        "academies": "On dénombre une grande quantité d’écoles enseignant le style Aldana en Castille. Hors de ses frontières, toutefois, ce style n’est présent qu’en Eisen, dans la ville de Stein et à Kirk, en Vendel.",
        "homologation": "1646",
        "doyen": "Don Andrès Bejarano del Aldana (1653)",
        "insigne": "Une rapière castillane et son ombre pointant vers la droite.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Courtisan",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti sait impressionner ses adversaires par ses mouvements vifs et imprévisibles et fait naître chez eux des moments d’hésitation et d’incertitude.",
            "regles": "L’apprenti lance un dé d’action supplémentaire par niveau de maîtrise des techniques d’école (Apprenti, Compagnon, Maître)."
          },
          "compagnon": {
            "fluff": "Les mouvements hypnotiques et erratiques du compagnon Aldana le rendent plus difficile à toucher.",
            "regles": "Ajoutez deux fois votre rang dans la compétence Danse au ND pour être touché du héros et à ses jets de Défense Active en Parade (Escrime)."
          },
          "maitre": {
            "fluff": "Le maître peut entrer dans une transe et, dans cet état particulier, concentrer tout son être sur le duel.",
            "regles": "Au début de chaque tour, le héros reçoit (rang d’Esprit) “dés de transe”, que vous pourrez ajouter (mais pas garder) à n’importe quel jet d’attaque ou de défense active durant le tour. Vous devez annoncer votre intention de les utiliser avant de faire le jet concerné ; une fois utilisés, vous devrez attendre le début du prochain tour pour en avoir de nouveaux."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Ambrogia",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Rapière et dague",
      "arme_display": "Rapière et dague",
      "armes_categories": [
        "Escrime (Rapière)",
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Escrime"
      ],
      "description_courte": "Répandu depuis quelques années. Utilisation d'une dague en Main Gauche, privilegiant l'efficacité au style",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Riposte",
          "variante": "Rapière",
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "coup de pommeau",
          "variante": "Rapière",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité de main non directrice (dague/main gauche). Avantage Gaucher gratuit. Tortiller la lame ajoute +2 aux dommages.",
        "compagnon": "Lorsque vous infligez une blessure grave, vous pouvez choisir de subir une blessure grave pour en infliger une seconde à l'adversaire.",
        "maitre": "Si une attaque contre vous échoue (défense active ou passive), votre prochain jet d'attaque contre cet adversaire se fait contre un ND de 5 (doit être fait avant la fin du round)."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vodacce.",
        "description_longue": [
          "Le style Ambrogia, qui s’est répandu comme une traînée de poudre ces dernières années, a deux caractéristiques principales. Tout d’abord, les spadassins qui le pratiquent tiennent leur épée de la main gauche et leur dague de parade dans la main droite ; ensuite, le créateur de cette technique d’escrime, Véronica Ambrogia, est aussi l’une des plus célèbres courtisanes de Vodacce.",
          "Si le style Ambrogia se focalise sur l’utilisation de la main gauche (un élément que de nombreux spadassins trouvent difficile à appréhender), il donne surtout la priorité à l’efficacité plutôt qu’au style. Les élèves apprennent à utiliser tout ce qui leur tombe sous la main pour remporter leurs duels. “Après tout, ce sont les vainqueurs qui écrivent l’histoire” leur enseigne Madame Ambrogia.",
          "Et si les autres spadassins appellent ceux qui sortent de cette école “les gamins de Véronica”, aucun d’entre eux n’oserait nier la redoutable efficacité de cette technique d’escrime.",
          "La principale faiblesse de ce style, c’est qu’il repose trop sur le fait de forcer l’adversaire à réagir aux mouvements et aux feintes : si ce dernier choisit de les ignorer, le spadassin adepte de cette technique de combat risque de se retrouver en mauvaise posture."
        ],
        "academies": "On trouve des écoles enseignant le style Ambrogia dans presque toutes les grandes villes de Vodacce et dans quelques villes étrangères, à Pau, Charousse, Prévoy, Montsange, Tamisy en Montaigne, Altamira et San Gustavo en Castille.",
        "homologation": "1656",
        "doyen": "Veronica Ambrogia (1656)",
        "insigne": "Une rapière et une main gauche croisées, la garde de la rapière en bas à gauche et sa pointe en haut à gauche.",
        "armes_pdf": "Rapière et dague",
        "specialisations_pdf": [
          "Couteau",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves de Veronica sont formés pour réagir vite et tirer parti de toutes les occasions.",
            "regles": "L’apprenti ne subit pas la pénalité liée à l’utilisation concomitante d’une dague de parade et d’une épée. En outre, il acquiert automatiquement l’avantage Gaucher et l’entraînement Combat de rue. Enfin, vous pouvez faire légèrement vibrer votre dague ou arme d’escrime lorsque vous frappez, ce qui ajoute 2 points aux dommages infligés (faisant par exemple passer un jet de dommages de 18 à 20)."
          },
          "compagnon": {
            "fluff": "Un compagnon apprend à se mettre en danger pour bénéficier d’une position lui permettant d’infliger plus de dommages.",
            "regles": "Lorsque le héros inflige une blessure grave à son adversaire, il peut choisir de subir une blessure grave afin de lui en infliger une seconde, mais il ne peut décider de subir deux blessures graves ou plus pour en infliger deux ou plus à son adversaire."
          },
          "maitre": {
            "fluff": "Le maître Ambrogia sait parfaitement se positionner pour attaquer son adversaire aux endroits les plus difficiles à défendre.",
            "regles": "Si un assaillant ne parvient pas à toucher le héros du fait de sa défense active ou passive, ce dernier fera son prochain jet d’attaque contre un ND de 5. Si le héros n’attaque pas avant la fin du tour, ce bonus est perdu."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Andrews",
      "origine": "officielle",
      "nations": [
        "Avalon"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Comme Aldana, rapière en avant et main dans le dos, mais sans mouvements latéraux.",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Rapière",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": "Rapière",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Riposte",
          "variante": "Rapière",
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "+2 par rang de Maîtrise au ND pour être touché (sauf lors d'une Fente en avant).",
        "compagnon": "Augmentation Gratuite sur les jets de Défense Active. Bonus égal au rang de Maîtrise au ND lors d'une Fente en avant.",
        "maitre": "Lance et garde un dé de dommages supplémentaire sur Fente en avant (+3g1 total). Bonus au ND pour être touché égal au double du rang de Maîtrise."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Aldana.",
        "origine_texte": "Avalon.",
        "description_longue": [
          "Au premier abord, ce style ressemble considérablement à l’école Aldana. Lorsque le duel débute, le spadassin prend position avec sa rapière dans sa main droite et se tourne pour être de profil face à son ennemi. Il met son autre main dans son dos et aligne son visage dans la direction donnée par son épée. C’est là que s’arrêtent les similitudes.",
          "Les spadassins de style Andrews ne dansent pas. En fait, ils n’effectuent pratiquement aucun mouvement latéral. Alors que les étudiants de Gallegos apprennent à combattre dans des cercles imaginaires, Andrews enseigne le combat dans la longueur, dans d’étroits rectangles. Les étudiants du style Andrews se concentrent sur la défense et attendent une bonne occasion de frapper leur adversaire. Lorsqu’ils voient une ouverture, ils se précipitent en avant en utilisant toute leur puissance. La principale faiblesse de ce style est la difficulté qu’ont les étudiants à penser le combat en dehors de leurs rectangles imaginaires."
        ],
        "academies": "À l’heure actuelle, le style Andrews n’est enseigné que dans les îles Glamour. Ainsi, on compte plus de trente écoles en Avalon, dont quatre à Carleon. De même, l’Inismore peut s’enorgueillir de la présence de près de neuf écoles, dont 2 à Tara. Enfin, les Marches des Highlands possèdent quinze écoles (dont 2 à Kirkwall) enseignant ce style.",
        "homologation": "1653",
        "doyen": "Geoffery Andrews (1653)",
        "insigne": "Une rapière pointant vers le haut, devant un mur.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "La position défensive est systématiquement la première chose qui est enseignée à l’étudiant de ce style.",
            "regles": "Il bénéficie d’un bonus de +2 au ND pour être touché par rang de maîtrise, sauf lorsqu’il effectue une fente en avant, auquel cas il bénéficie d’un +5 sur son ND par rang de maîtrise (le ND de base lors d’une fente en avant est de 5, il passe à 10 pour un apprenti, 15 pour un compagnon, 20 pour un maître)."
          },
          "compagnon": {
            "fluff": "La défense emphatique de l’école est encore développée au rang de compagnon.",
            "regles": "Il bénéficie d’une augmentation gratuite pour toutes ses défenses actives."
          },
          "maitre": {
            "fluff": "Le maître du style Andrews a perfectionné ses attaques, ce qui lui permet de se précipiter sur ses adversaires avec plus de vitesse et de force.",
            "regles": "Lorsqu’il effectue une fente en avant, il obtient un bonus de +1g1 sur son jet de dommages."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Angelo",
      "origine": "combat_reclassee",
      "nations": [
        "Vodacce"
      ],
      "arme": "Dague ou miséricorde",
      "arme_display": "Dague ou miséricorde (Couteau)",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Athlétisme",
        "Couteau"
      ],
      "description_courte": "Style de corps-à-corps pragmatique à la dague (lardoire), fondé sur la technique du 'collé-serré' pour réduire la défense adverse, infliger des blessures massives et entraver les actions de l'ennemi.",
      "techniques_combat": [
        {
          "nom_base": "Collé-Serré",
          "variante": null,
          "ref": "colle serre",
          "source": "csv"
        },
        {
          "nom_base": "Corps-à-Corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Le ND de tous vos adversaires quand vous utilisez la technique de combat Collé-serré comme défense passive chute de 5 (minimum 5).",
        "compagnon": "Les couteaux infligent 2g2 dés de dommages et même 3g2 quand il utilise la technique de combat Collé-serré comme défense passive.",
        "maitre": "Lorsqu’un maître de l’école Angelo utilise la technique de combat Collé-serré comme défense passive, son adversaire perd un dé d’action."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vodacce.",
        "academies": "Ce sont surtout des spadassins plus intéressés par le résultat que par l’esthétique qui se rendent dans cette école. On y trouve donc quelques nobles, mais essentiellement des roturiers et des militaires. Il existe deux écoles qui enseignent cette technique, l’une à Casigula Rosa, l’autre à Reinascienza et la durée d’apprentissage avoisine les deux ans, comme dans la plupart des écoles.",
        "description_longue": [
          "Ce style de combat repose sur le fait qu’un adversaire utilisant une épée longue est très fortement handicapé si vous restez vraiment très proche de lui. Un spadassin maîtrisant cette technique bouge rapidement, tout en restant serré contre son adversaire et utilise son couteau (à la lame courte et large) pour infliger des dommages que son adversaire a du mal à éviter.",
          "Le point faible est justement ce qui fait sa force : le combat corps contre corps. En effet, si un spadassin de l’école Angelo tombe sur un adversaire utilisant une arme d’hast et capable de le maintenir à distance, toutes ses techniques de combat se retrouvent alors complètement caduques et il n’a plus qu’à attendre le coup de grâce."
        ],
        "armes_pdf": "Dague ou miséricorde",
        "specialisations_pdf": [
          "Athlétisme",
          "Couteau"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Le spadassin est capable de trouver le défaut de l’armure et les problèmes dans la défense de son adversaire désemparé par la technique consistant à se coller contre son ennemi.",
            "regles": "Le ND de tous vos adversaires quand vous utilisez la technique de combat Collé-serré comme défense passive chute de 5 (minimum 5)."
          },
          "compagnon": {
            "fluff": "Le compagnon manie parfaitement sa lardoire, son couteau à large ouverture, et sait l’utiliser pour infliger des dégâts importants (il enfonce profondément la lame et la tourne dans la plaie).",
            "regles": "Un compagnon qui utilise un couteau inflige 2g2 dés de dommages et même 3g2 quand il utilise la technique de combat Collé-serré comme défense passive."
          },
          "maitre": {
            "fluff": "Le maître est capable de tourner rapidement autour de son adversaire tout en restant serré afin que celui-ci ne soit pas capable de placer ses attaques ou d’utiliser ses défenses.",
            "regles": "Lorsqu’un maître de l’école Angelo utilise la technique de combat Collé-serré comme défense passive, son adversaire perd un dé d’action."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Awal Thmani",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Ifri"
      ],
      "arme": "Khépesh + bâton",
      "arme_display": "Khépesh (Sabre) + bâton",
      "armes_categories": [
        "Escrime (Sabre)",
        "Bâtons"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Bateleur"
      ],
      "description_courte": "Style privilégiant la vitesse avec l'utilisation d'une sorte de faucille",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Sabre",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Double-Parade",
          "variante": "Sabre / Bâton ou Bouclier",
          "ref": "double parade",
          "source": "docx_v2"
        },
        {
          "nom_base": "Riposte",
          "variante": "Escrime",
          "ref": "riposte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Harceler",
          "variante": null,
          "ref": "harceler",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Vous lancez (mais ne gardez pas) un dé d’initiative supplémentaire par niveau de maitrise des techniques de l’école.",
        "compagnon": "Ajoutez votre rang de Danse à votre Défense Passive et Active.",
        "maitre": "Obtient des \"dès de Transe\" à ajouter à n'importe quel test d'attaque ou défense."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Les adeptes de ce style de Duel apprennent une série de danses complexes divisées en mouvements distincts qu'ils utilisent ensuite dans leurs duels. L'épée traditionnelle associée au Style d'Awal Thmani est une lame courbe en forme de faucille appelée khopesh.",
          "Les Duellistes tiennent leur épée dans une main et manient de l'autre un bâton ou un gourdin de défense (certains pratiquants préfèrent également utiliser un simple bouclier). Toutes les personnes qui s'initient à l'Awal Thmani n'ont pas pour but de devenir Duellistes. Beaucoup de danseurs apprennent et adaptent le Style d'Awal Thmani à leurs propres fins. Ainsi est né un regain d'intérêt pour la musique et les histoires traditionnelles d'antan. Un Duelliste voulant vanter les mérites de son art à des élèves peu portés sur le combat leur fera remarquer que la popularité du Style d'Awal Thmani et l'intérêt pour des cultures autrefois perdues sont bien la preuve que les duels peuvent servir de pont culturel.",
          "La principale faiblesse de l'école d'Awal Thmani réside dans sa nature chorégraphiée. Ses mouvements sont si codifiés qu'un adversaire familier avec ses danses peut en reconnaître les motifs. En particulier, la posture d'ouverture de la manœuvre du \"Premier huit\" est un signal clair qui permet à un ennemi averti d'anticiper l'assaut et de préparer une contre-attaque ciblée avant même que la série de taillades ne soit complétée."
        ],
        "origine_texte": "Ifri",
        "armes_predilection": "Khopesh (sabre courbe en forme de faucille) tenu d'une main ; bâton ou gourdin de défense dans l'autre (certains préfèrent un simple bouclier)",
        "academies": "Ifri ; le style se transmet au sein des troupes de danseurs-duellistes, et sert de « pont culturel » vers des traditions musicales et narratives anciennes",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": "Réflexes éclairs",
            "regles": "L'apprenti lance un dé supplémentaire (non gardé) à tous ses jets d'Initiative"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Le compagnon ajoute son rang de Danse (savoir de Bateleur) à sa Défense Passive et résultats de jets de Défense Passive"
          },
          "maitre": {
            "fluff": "Transe",
            "regles": "Au début de chaque round, le maître reçoit un nombre de dés de transe égal à son rang d'Esprit ; il peut en ajouter et en garder un (un seul par jet) à n'importe quel jet d'attaque ou de défense active du round"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Badayah",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Pesh-Kabz (Poignard)",
      "arme_display": "Pesh-Kabz (Couteau)",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Guérillero"
      ],
      "description_courte": "Style de tribu de 8ème Mer utilisant un couteau dentelé infligeant de terribles blessures",
      "techniques_combat": [
        {
          "nom_base": "Attaque en dégaine",
          "variante": null,
          "ref": "attaque en degaine",
          "source": "docx_v2"
        },
        {
          "nom_base": "Collé-Serré",
          "variante": null,
          "ref": "colle serre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Défigurer",
          "variante": null,
          "ref": "defigurer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Lacérer",
          "variante": null,
          "ref": "lacerer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Possède une lame dentelé du Pesh. Lorsque vous infligez au moins 2 points de dégâts à un adversaire après réduction par l'armure, celui-ci subit 1 point de dégât supplémentaire (ignorant l'armure) à la fin de la phase. Ceci est cumulable pour chaque dégât subi de la sorte pendant la même phase.",
        "compagnon": "\"Lacération de Badayah\". En effectuant une action d'Attaque (Couteau), vous pouvez choisir de prendre une Augmentation (+5 à la Difficulté). Si vous réussissez et infligez au moins 1 point de dégâts, en plus des dégâts normaux, la cible subit une hémorragie. Jusqu'à ce qu'elle soit soignée, la cible subit 3 points de dégâts (ignorant l'armure) chaque fois qu'elle effectue une Action. La cible peut utiliser une Action pour tenter d'arrêter l'hémorragie avec un jet de Détermination + Premiers Secours (ND 20).",
        "maitre": "Lorsque vous utilisez la \"Lacération de Badayah\", le saignement inflige 5 points de dégâts par Action au lieu de 3, et la difficulté (ND) pour l'arrêter passe à 30."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Les Badayah sont une petite tribu nomade de la Huitième Mer, l'une des plus redoutables à parcourir les dunes. Leurs guerriers sont des maîtres de l'embuscade. On prétend qu'ils sont capables d'attendre l'apparition d'une cible en restant cachés dans le sable pendant des jours. Les Badayah sont également les seuls enseignants connus du Style de Duel Badayah. Chaque Duelliste formé au Badayah possède un pesh, un poignard à la lame incurvée, dentelée et affûtée comme un rasoir. Les Blessures infligées par un Duelliste Badayah sont extrêmement douloureuses, au point que les soins d'un médecin expérimenté sont souvent nécessaires pour s'en remettre complètement. On a coutume de dire que le premier pesh tiré est le signe qu'une querelle de Badayah vient de dégénérer. La tradition Badayah veut en effet qu'un poignard ne puisse pas être rengainé tant qu'il n'a pas versé le sang. Cela explique notamment pourquoi leurs duels se poursuivent moins jusqu'à la mort. Les Duellistes Badayah qui ont le plus de cicatrices sont donc soit les plus doués, soit les moins conciliants (et la plupart du temps, ce sont les deux). La philosophie du Badayah est entièrement tournée vers l'offensive et la recherche du coup parfait. Ce style manque de techniques défensives élaborées. Un adepte est donc vulnérable face à des adversaires qui le submergent avec un grand nombre d'attaques rapides, l'empêchant de trouver le temps et l'ouverture nécessaires pour préparer sa propre frappe chirurgicale."
        ],
        "origine_texte": "Huitième Mer (Empire du Croissant)",
        "armes_predilection": "Pesh (poignard à la lame incurvée, dentelée et affûtée comme un rasoir)",
        "academies": "Enseigné exclusivement par la tribu nomade Badayah, maîtres de l'embuscade dans les dunes de la Huitième Mer",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": "Lames dentelées",
            "regles": "Chaque fois que l'apprenti inflige une Blessure Grave avec le pesh, la plaie saigne : la victime subit -5 à toutes ses actions jusqu'à recevoir des soins"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Tant que la victime saigne, elle subit les dommages de base du pesh (la Valeur de Dommages de l'arme, sans le bonus de Gaillardise) chaque fois qu'elle entreprend une action violente (attaque, sprint, charge). Elle peut dépenser une action et réussir un jet d'Esprit + Premiers Secours (ND 20) pour stopper l'hémorragie"
          },
          "maitre": {
            "fluff": null,
            "regles": "Le saignement du maître est presque impossible à endiguer : le ND pour le stopper passe à 30, et la victime saigne désormais à chacune de ses actions, et non plus seulement sur les actions violentes"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Basulde",
      "origine": "combat_reclassee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Une paire de sabres ou de sabres de cavalerie",
      "arme_display": "Une paire de sabres ou de sabres de cavalerie",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Acrobate",
        "Escrime"
      ],
      "description_courte": "Style acrobatique Fidhelis avec deux sabres, basé sur une danse mortelle.",
      "techniques_combat": [
        {
          "nom_base": "Double attaque",
          "variante": null,
          "ref": "double attaque",
          "source": "csv"
        },
        {
          "nom_base": "Esquive acrobatique",
          "variante": null,
          "ref": "esquive acrobatique",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Sabre",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité de main non directrice lorsqu’il se bat avec un sabre dans chaque main. En outre, il peut utiliser sa technique de combat Esquive acrobatique à la place de n’importe quelle compétence de Parade.",
        "compagnon": "Le compagnon gagne gratuitement un rang en Acrobatie et en Esquive acrobatique. Il peut désormais atteindre le rang 6 dans ces techniques de combats.",
        "maitre": "Bénéficie d’un bonus de +1 à son trait de Panache (“gratuitement”). Ce qui augmente aussi la valeur maximale de ce trait de 1"
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Fidhelis.",
        "academies": "Dans les Vitzis fidhelis uniquement.",
        "description_longue": [
          "Les Fidhelis sont un peuple pacifique. Pourtant, face aux brimades que leur infligent tous ceux qui les croisent, ils ont dû apprendre à se défendre. Ils ont ainsi peu à peu développé un style basé sur leurs dons pour l’acrobatie et le spectacle. C’est au sein du Vitzi Basulde que cette école vit le jour.",
          "Leur nature nomade leur a permis de rencontrer de nombreuses cultures, ils empruntèrent donc les styles de ces dernières, en particuliers les merveilleux sabres des Croissantins. Un membre de l’école Basulde porte donc toujours deux lames courbes, le plus souvent des sabres. Ces armes vont lui permettre de frapper vite et fort tout sans le gêner dans ses mouvements.",
          "Le pratiquant ne cesse de bouger et de se lancer dans les sauts les plus audacieux afin de totalement dérouter son adversaire. Un membre de l’école Basulde ne combat pas, il entraîne son adversaire dans une mortelle danse où ses acrobaties vont lui permettre d’esquiver la plupart des coups tandis que les lames blessent profondément son opposant.",
          "Leur faiblesse vient principalement de leur rythme. Il est essentiel pour eux car ils appliquent en fait une série de manœuvres qui s’enchaîne logiquement. Si on les sort de ce rythme, ils sont beaucoup moins dangereux."
        ],
        "armes_pdf": "Une paire de sabres ou de sabres de cavalerie",
        "specialisations_pdf": [
          "Acrobate",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti a appris à utiliser son corps comme une arme. Il a développé sa souplesse au point que les mouvements deviennent naturels.",
            "regles": "Il ne subit pas de pénalité de main non directrice lorsqu’il se bat avec un sabre dans chaque main. En outre, il peut utiliser sa technique de combat Esquive acrobatique à la place de n’importe quelle compétence de Parade."
          },
          "compagnon": {
            "fluff": "À ce rang, le compagnon est une véritable liane. Il connaît des manœuvres totalement inédites et peut esquiver ainsi encore mieux.",
            "regles": "Le compagnon gagne gratuitement un rang en Acrobatie et en Esquive acrobatique. Il peut désormais atteindre le rang 6 dans ces techniques de combats. De plus, un compagnon ne peut jamais rater un jet d’Acrobatie qui a lieu hors d’un combat. Il le réussira simplement. S’il veut prendre des augmentations, il doit faire un jet mais même en cas d’échec sur ce jet, le compagnon aura quand même réussi de manière normale."
          },
          "maitre": {
            "fluff": "Le maître sait comment mêler rapidité et audace. Les maîtres de cette école sont parmi les plus rapides de Théah.",
            "regles": "Lorsque le héros atteint ce niveau, il bénéficie d’un bonus de +1 à son trait de Panache (“gratuitement”). Ce qui augmente aussi la valeur maximale de ce trait de 1 : ainsi un maître de cette technique pourra avoir un rang 6 (voir 7 avec certains avantages) en Panache."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Bernoulli",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Sabre de cavalerie",
      "arme_display": "Sabre de cavalerie",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime",
        "Pugilat"
      ],
      "description_courte": "Présente le flanc et effectue des mouvements circulaires de sabre",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Sabre",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "csv"
        }
      ],
      "avantages_courts": {
        "apprenti": "Ajoutez votre niveau de maîtrise à votre ND pour être touché.",
        "compagnon": "Manœuvre \"flèche\" : effectuez une Fente en avant en sacrifiant des dés d'action. Chaque dé sacrifié ajoute +1 dé aux dommages et +5 au ND de la défense active adverse. Rang gratuit en Fente en avant.",
        "maitre": "Une fois par tour, possibilité de relancer un jet d'attaque raté."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vodacce.",
        "description_longue": [
          "Les Bernouilli font plus qu’importer des artefacts de l’Empire du Croissant ; ils en rapportent aussi le savoir. L’école de Bernouilli naquit de l’utilisation du cimeterre des Croissantins et incorpora le sabre de cavalerie occidental à ses fioritures stylistiques. Les spadassins de l’école de Bernouilli présentent le flanc à leur adversaire (à l’instar du style Aldana de Castille), limitant ainsi les points vulnérables. Les mouvements circulaires du sabre tiennent les adversaires à distance jusqu’à ce qu’ils faiblissent ou laissent une ouverture, dont un maître du style Bernouilli saura profiter.",
          "L’école souffre quelque peu de son approche défensive et la nature du sabre empêche tout ajustement stratégique de dernière seconde. D’un autre côté, il est difficile de toucher les spadassins du style Bernouilli, qui peuvent garder leurs ennemis à distance sans se fatiguer. En Vodacce, où les coups rapides sont d’actualité, les grands gestes méthodiques de l’école de Bernouilli constituent une planche de salut."
        ],
        "academies": "L’École n’a que trois académies en Vodacce : sur l’île Bernouilli, à Porto Spatia et à Jesalute. On ne trouve pas cette École en dehors de la principauté Bernouilli.",
        "homologation": "1648",
        "doyen": "Pietro di Vercelis (1653)",
        "insigne": "Un cimeterre de profil, le tranchant à droite.",
        "armes_pdf": "Sabre de cavalerie",
        "specialisations_pdf": [
          "Escrime",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves de l’école Bernouilli apprennent d’abord à se servir de leur sabre de manière défensive, en détournant plusieurs coups grâce à des gestes amples.",
            "regles": "Ajoutez le double de votre niveau de maîtrise à votre ND pour être touché."
          },
          "compagnon": {
            "fluff": "Vous avez appris une manœuvre au sabre connue sous le nom de “flèche”. Vous pointez l’extrémité de votre sabre à la tête de votre adversaire puis courez, bondissez ou sautez dans sa direction.",
            "regles": "Il vous suffit d’effectuer une Fente en avant, comme d’accoutumée, mais vous pouvez alors renoncer à un certain nombre de vos dés d’action. Pour chaque dé d’action que vous mettez de côté, lancez un dé de plus au jet de dommages et augmentez le ND contre la défense active de cette attaque d’une augmentation. De plus, vos bottes sont désormais parfaitement réglées et vous recevez gratuitement un rang supplémentaire dans la technique de combat Fente en avant lorsque vous devenez Compagnon. Il est possible que vous disposiez alors de 6 rangs dans cette technique de combat. Si tel n’est pas le cas, vous pourrez par la suite faire passer votre technique de combat Fente en avant de 5 à 6 en dépensant 25 XP."
          },
          "maitre": {
            "fluff": "Les maîtres du style Bernouilli en sont au stade où ils peuvent lancer une attaque depuis une position défensive – même s’ils battent en retraite ou décrochent.",
            "regles": "Une fois par tour, il vous est possible de relancer un jet d’attaque raté."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Bogatyr",
      "origine": "officielle",
      "nations": [
        "Ussura"
      ],
      "arme": "Hache de bataille",
      "arme_display": "Hache de bataille",
      "armes_categories": [
        "Haches"
      ],
      "specialisations": [
        "Eclaireur(2 rangs)",
        "Hache 2 Mains"
      ],
      "description_courte": "Style agressif à la grande hache",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "Haches",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Coup Puissant",
          "variante": "Haches",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": "Haches",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Haches",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation gratuite pour attaquer avec une hache. Membre de la guilde uniquement en Ussura/navire ussuran (sinon 5 compétences Chasseur au rang 1).",
        "compagnon": "Lance et garde un dé supplémentaire aux dommages avec une hache (+1g1).",
        "maitre": "Augmente le niveau de peur de 2 (ou donne Peur 2). 2 augmentations gratuites pour résister à la peur."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Ussura.",
        "description_longue": [
          "En temps de guerre, même si le style de combat classique des Ussurans est la hache et le mur de boucliers, cette méthode n’est guère efficace à un contre un. Le style de combat Bogatyr fait usage de la cognée et met de côté le bouclier. Ses pratiquants sont connus pour leur férocité et leur courage. D’ailleurs, le mot “bogatyr” fait référence à la classe des chevaliers errants, qui compte certains des plus grands héros ussurans. En temps de guerre, on rassemble les paysans, on les arme et on leur donne un entraînement de base afin qu’ils sachent former un mur de boucliers et agir en équipe. La plupart des bogatyr œuvre indépendamment des paysans, traquant et combattant les membres d’élite de l’armée adverse, les officiers en particulier. Le bogatyr qui œuvre en compagnie d’une unité demeure généralement derrière celle-ci et s’assure que les paysans restent en formation. Leur secret : être davantage craints que l’armée qui progresse dans leur direction.",
          "Actuellement, l’école de Bogatyr est encore source de tension politique entre la guilde des spadassins et le Gaius. La guilde refusait de reconnaître comme siens les pratiquants des divers styles de combat archaïques et anachroniques d’Ussura. D’un autre côté, la guilde souhaite être présente en Ussura, et y offrir gracieusement ses services. Le Gaius fit bien comprendre à la guilde qu’elle ne pourrait évoluer au sein de ses frontières que si les bogatyrs devenaient des spadassins officiels. Après de longues querelles politiques, il fut convenu d’un compromis officieux. Les bogatyrs sont désormais des membres de la guilde des spadassins quand ils sont en Ussura ou sur un bâtiment battant pavillon ussuran, à l’exclusion de toute autre situation.",
          "Les forces de cette école sont son écrasante férocité et ses techniques intimidantes. On souhaite rarement s’en prendre à un bogatyr mugissant. La faiblesse de cette école réside dans le fait qu’elle compte bien plus sur l’attaque que sur la défense. Un adversaire avisé et patient saura prendre le bogatyr par surprise après un coup manqué par exemple."
        ],
        "academies": "Il est extrêmement rare qu’un maître d’armes Bogatyr veuille bien enseigner son École à une personne qui n’est pas ussurane, aussi très peu d’étrangers ont reçu cette formation.",
        "homologation": "1665, mais uniquement en Ussura",
        "doyen": "Silan (1665)",
        "insigne": "Une hache dont la cognée est en haut et à droite de l'insigne.",
        "armes_pdf": "Hache de bataille",
        "specialisations_pdf": [
          "Éclaireur",
          "Hache à deux mains. De plus",
          "comme son  homologation n’est valable qu’en Ussura",
          "il bénéfice  gratuitement de 2 rangs gratuits à dépenser dans ses  compétences de base du métier Éclaireur"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école Bogatyr exécutent des mouvements précis à l’aide de leur cognée.",
            "regles": "Ainsi, ils bénéficient d’une augmentation gratuite quand ils attaquent avec une hache."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école Bogatyr donnent des coups incroyablement puissants, capables d’infliger des blessures graves aux plus endurcis des adversaires.",
            "regles": "Ils lancent et gardent un dé supplémentaire quand ils effectuent un jet de dommages avec une hache (+1g1, pour un total de 4g3 avant d’ajouter la Gaillardise)."
          },
          "maitre": {
            "fluff": "Les maîtres de cette école ont la réputation de faire montre d’une férocité bestiale au combat. Ils portent souvent des crânes, crocs et griffes d’animaux sauvages qu’ils ont terrassés et hurlent violemment au début du combat, déroutant du même coup leur adversaire.",
            "regles": "Augmentez le niveau de peur du personnage de 2. S’il n’en avait pas, il dispose désormais d’un niveau de peur de 2. En outre, le personnage bénéficie de 2 augmentations gratuites quand il s’agit de résister aux effets de la peur."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Boucher",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Coutelas ou poignard",
      "arme_display": "Coutelas ou poignard",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Détrousseur"
      ],
      "description_courte": "Style de rue rapide et déroutant utilisant deux couteaux pour submerger l'adversaire.",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": "couteau",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "riposte",
          "variante": "couteau",
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Double Parade",
          "variante": "couteau",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité de main non directrice avec deux couteaux. Ajoutez la phase actuelle à l'initiative totale si deux couteaux en main.",
        "compagnon": "Si deux couteaux en main, les adversaires doivent utiliser 2 augmentations pour une défense active contre vos attaques.",
        "maitre": "Attaque en chaîne : utilisez une augmentation (sans bonus) pour attaquer. Si touche, 2e attaque avec 2 augmentations, et ainsi de suite (+1 augmentation/attaque) tant que la défense passive est passée."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Montaigne.",
        "academies": "Bien qu’originaire des bas-fonds des grandes villes montaginoises, l’école Boucher s’est répandue au sein de la haute société de cette nation et est maintenant enseignée dans de nombreuses écoles d’escrime du pays, même si la guilde des spadassins n’apprécie pas forcément cet état de fait.",
        "description_longue": [
          "Le style Boucher naquit dans les rues de Montaigne et n’est pas véritablement considéré comme une “école de gentilshommes”. Cependant, certains duellistes s’intéressent plus aux résultats qu’à l’impression qu’ils donnent à leurs pairs ; ce style fut donc conçu en gardant ces résultats à l’esprit. Les élèves du style Boucher manient un long couteau de chaque main et usent des deux pour porter une série d’attaques destinées à embrouiller et à désorienter leur adversaire.",
          "Boucher est l’un des styles de combat les plus rapides existant actuellement à Théah. Une fois l’allonge supérieure de l’adversaire surmontée, le combattant porte une série d’attaques presque impossible à endiguer.",
          "D’un autre côté, le style Boucher exploite deux armes de petites allonges. Un adversaire avisé qui tient un maître hors de portée ne rencontrera que peu d’ennuis pour se débarrasser du gênant combattant."
        ],
        "armes_pdf": "Coutelas ou poignard",
        "specialisations_pdf": [
          "Couteau",
          "Détrousseur"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves du style Boucher s’entraînent à manier un coutelas dans chaque main.",
            "regles": "Cela annule la pénalité de main non-directrice quand ils se battent au couteau. Ils sont également entraînés à pénétrer la garde de l’ennemi et à frapper rapidement ; ajoutez la phase actuelle à votre initiative totale lorsque vous tenez un couteau dans chaque main. Par exemple, en phase 6, vous pouvez ajouter 6 à votre initiative totale."
          },
          "compagnon": {
            "fluff": "Les compagnons apprennent à attirer l’attention de leur adversaire sur le couteau qui ne l’attaque pas.",
            "regles": "Lorsque vous maniez un couteau de chaque main, tous vos adversaires doivent utiliser deux augmentations s’ils souhaitent se servir d’une défense active contre vos attaques."
          },
          "maitre": {
            "fluff": "Vous pouvez déchaîner une volée de coups contre un adversaire à la fois.",
            "regles": "Vous devez utiliser une augmentation lors de votre première attaque mais n’en tirez aucun avantage. Si vous franchissez la défense passive de votre cible (et même si elle réussit sa défense active), vous bénéficiez d’une deuxième attaque contre cette même cible, cette fois en utilisant deux augmentations (qui ne vous apportent toujours rien). Vous continuez ainsi, en utilisant chaque fois une augmentation supplémentaire, jusqu’à ce que vous ne passiez plus la défense passive de votre cible. On procède à un jet de dommage et un jet de blessure pour chaque attaque réussie."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Caldwell",
      "origine": "combat_reclassee",
      "nations": [
        "Avalon"
      ],
      "arme": "Bâton ou bâton de marche",
      "arme_display": "Bâton ou bâton de marche",
      "armes_categories": [
        "Bâtons"
      ],
      "specialisations": [
        "Bâton",
        "Éclaireur"
      ],
      "description_courte": "Style défensif paysan utilisant un bâton pour déséquilibrer et retourner les attaques ennemies.",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Bâton",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Retourner les attaques",
          "variante": null,
          "ref": "retourner les attaques",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Bénéficie d’un bonus de (5 + 2 x Rang d’école) à son ND pour être touché.",
        "compagnon": "Doit réussir un jet d’Attaque (Bâton) avec trois augmentations (il vise la tête). S’il touche, son adversaire encaisse un coup qui l’assomme (à moins de réussir un jet de Gaillardise contre un ND de 25 + 5 par augmentation au-delà des trois premières).",
        "maitre": "Doit réussir un jet de Finesse contre un ND de 30 ; s’il le réussit, son adversaire est envoyé au sol (sans pouvoir utiliser de défense active) où il est en position idéal pour être assommer. La technique du compagnon peut alors être utilisée (en dépensant un dé d’action) sans augmentations supplémentaires, un 5 suffit donc pour l’assommer (plus d’éventuelles augmentations en sus pour augmenter les chances de le mettre K.O.)."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Avalon.",
        "academies": "Ce style n’est pas très populaire chez la noblesse qui le trouve trop… “rustique”, mais les voyageurs en ont vite vu les avantages. Et dans une telle communauté, il parait normal qu’il se répande petit à petit à travers tout Théah.",
        "description_longue": [
          "Le style Caldwell a été développé par les paysans et les gueux d’Avalon pour lutter contre l’envahisseur montaginois. N’ayant pas le droit d’être armés, ils utilisèrent la seule arme qu’ils pouvaient transporter sans se faire inquiéter : le bâton.",
          "Le style Caldwell est essentiellement un style défensif où l’on apprend aux élèves à retourner les attaques de l’adversaire contre lui. Qu’un adversaire essaie de porter un coup d’estoc et le spadassin recule vivement et accentue la vitesse de l’arme en l’aidant de son bâton, l’ennemi est alors emporté par son propre mouvement ; que l’on porte un coup de taille à un spadassin de l’école Caldwell, il l’évite et pousse son belligérant dans le dos afin qu’il s’écroule au sol.",
          "Le problème de ce style est qu’il apprend très peu à attaquer, on doit essentiellement répondre aux attaques de l’adversaire et si ce dernier connaît le style Caldwell, il portera de fausses attaques afin de déstabiliser son antagoniste avant de lui porter une botte particulièrement efficace et meurtrière."
        ],
        "armes_pdf": "Bâton ou bâton de marche",
        "specialisations_pdf": [
          "Bâton",
          "Éclaireur"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à tirer le meilleur de son bâton, l’intercalant toujours entre lui et l’arme de son adversaire.",
            "regles": "En termes de jeu, cela lui permet de bénéficier d’un bonus de (5 + 2 x Rang d’école) à son ND pour être touché."
          },
          "compagnon": {
            "fluff": "Le compagnon apprend à utiliser son bâton pour mettre son adversaire K.O. en l’assommant.",
            "regles": "Il doit réussir un jet d’Attaque (Bâton) avec trois augmentations (il vise la tête). S’il touche, son adversaire encaisse un coup qui l’assomme (à moins de réussir un jet de Gaillardise contre un ND de 25 + 5 par augmentation au-delà des trois premières)."
          },
          "maitre": {
            "fluff": "Un maître peut utiliser son bâton comme un perchiste moderne afin de se donner beaucoup d’élan et de frapper son adversaire avec ses deux pieds pour le jeter au sol.",
            "regles": "Pour cela, il doit réussir un jet de Finesse contre un ND de 30 ; s’il le réussit, son adversaire est envoyé au sol (sans pouvoir utiliser de défense active) où il est en position idéal pour être assommer. La technique du compagnon peut alors être utilisée (en dépensant un dé d’action) sans augmentations supplémentaires, un 5 suffit donc pour l’assommer (plus d’éventuelles augmentations en sus pour augmenter les chances de le mettre K.O.)."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Calis",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Cathay"
      ],
      "arme": "Armes courtes",
      "arme_display": "Armes courtes (Couteau)",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Bâton"
      ],
      "description_courte": "Style de combat kiwan issu du peuple, basé sur l'utilisation polyvalente d'outils du quotidien et spécialisé dans le maniement d'une paire de gourdins (eskrima) et de la riposte.",
      "techniques_combat": [
        {
          "nom_base": "Double attaque",
          "variante": null,
          "ref": "double attaque",
          "source": "docx_v2"
        },
        {
          "nom_base": "Double parade",
          "variante": null,
          "ref": "double parade",
          "source": "docx_v2"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Lorsque vous utilisez la compétence de spadassin Riposte en maniant deux armes (de type Bâton, Couteau ou deux armes improvisées), vous conservez le total de vos dès pour la Défense Active(Parade), au lieu de diviser leur nombre par deux. Vous devez cependant toujours diviser par deux le nombre de dès pour la contre-attaque. Vous lancez un dé supplémentaire lors de la Riposte, le total de dès lancés lors des deux jets de la Riposte est donc [Gaillardise + Riposte + 1 ]",
        "compagnon": "Une fois par round, vous pouvez utiliser la compétence de spadassin Riposte sans que cela ne vous coûte d'Action. Cette Riposte gratuite doit tout de même être déclenchée par une action de Défense Active (Parade) réussie. Vous lancez deux dés supplémentaires lors de la Riposte, le total de dés lancés lors des deux jets de la Riposte est donc [Gaillardise + Riposte + 1]",
        "maitre": "Lorsque vous utilisez la compétence de spadassin Riposte en maniant deux armes (de type Bâton ou Couteau), vous conservez le total de vos dès pour la Défense Active(Parade) ou la contre-attaque, au choix. Vous lancez trois dés supplémentaires lors de la Riposte, le total de dés lancés lors des deux jets de la Riposte est donc [Gaillardise + Riposte + 3]"
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Le Calis est un style né dans les îles Kiwa, et qui jusqu'à peu ne possédait pas de formation ou de pratique réglementée et unifiée. Il s'agit d'une série de techniques et de manœuvres inventées par des fermiers, pêcheurs et autres roturiers kiwans, afin de se protéger contre diverses menaces locales ou étrangères. Les origines modestes de ce style expliquent son absence de spécialisation : au lieu de se concentrer sur le maniement d'une seule arme, le Calis apprend à ses utilisateurs des techniques usant d'une grande variété d'objets de la vie courante et d'outils que tout travailleur kiwan posséderait. Les pratiquants du Calis apprennent donc à se battre avec des lames, des couteaux, des bâtons, ainsi qu'à mains nues, mais ils sont surtout connus pour leur usage de gourdins de bois rudimentaires appelés eskrima. La notoriété de ce type d'armes est telle que le style tout entier se concentre depuis peu sur leur maniement, en particulier dans les nouvelles écoles de Calis dont les maîtres cherchent à devenir célèbres. Les Duellistes fusoais, toujours en quête de nouvelles méthodes efficaces, ont développé un style de combat s'inspirant des mouvements et principes du Calis, substituant aux eskrima kiwanes une paire de tonfas.",
          "La principale faiblesse du Calis réside dans ses origines roturières. Le style se concentre sur un assaut continu avec des armes légères et manque d'une garde formelle et robuste. Un adversaire utilisant une arme lourde ou un bouclier peut souvent ignorer ou \"forcer\" les parades d'un adepte du Calis, et le style est particulièrement vulnérable face aux techniques d'escrime très structurées qui se basent sur le contrôle de la lame."
        ],
        "origine_texte": "Îles Kiwa (Cathay)",
        "armes_predilection": "Eskrima (gourdins de bois), couteaux, bâtons, armes improvisées et mains nues",
        "academies": "Îles Kiwa (Cathay) ; nouvelles écoles centrées sur l'eskrima ; les duellistes fusoais en ont développé une variante à la paire de tonfas",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Lorsque l'apprenti utilise la technique Double Attaque en maniant deux armes différentes (de type Bâton, Couteau ou armes improvisées), le malus est de -5 par attaque au lieu de -10"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Une fois par round, le compagnon peut utiliser la technique Riposte sans dépenser de dé d'action ; cette riposte gratuite doit tout de même être déclenchée par une défense active de Parade réussie"
          },
          "maitre": {
            "fluff": null,
            "regles": "Lorsque le maître utilise la technique Riposte en maniant deux armes différentes, il ignore le malus de 5 à la Défense active (Parade) et à la contre-attaque"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Chaka",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Ifri"
      ],
      "arme": "Deux bâtons",
      "arme_display": "Deux bâtons",
      "armes_categories": [
        "Bâtons"
      ],
      "specialisations": [
        "Bâton",
        "Athlétisme"
      ],
      "description_courte": "Style avec deux bâtons courts où le duelliste bloque avec un des bâtons l'arme de l'adversaire",
      "techniques_combat": [
        {
          "nom_base": "Double Attaque",
          "variante": "Bâtons",
          "ref": "double attaque",
          "source": "docx_v2"
        },
        {
          "nom_base": "Double Parade",
          "variante": "Bâtons",
          "ref": "double parade",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup Puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de malus à l'utilisation du bracelet-bouclier",
        "compagnon": "Verrou d'Ishilangu : ajoute la Finesse x2 aux dégâts totaux",
        "maitre": "Le Verrou d'Ishilangu voit ses malus réduits"
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Ce style de duel qui tire son nom d'un chef légendaire tient plus des techniques martiales que du combat singulier rituel. Soit Chaka réinventa la guerre pour son peuple, soit il subtilisa les innovations des autres, dans tous les cas, il est célèbre parmi les ifriens pour sa perspicacité et ses victoires militaires. Ce style utilise deux bâtons, un pour l'attaque et l'autre pour la défense, ainsi qu'un petit bouclier-bracelet que l'on fixe à l'avant-bras, un Turkana. Le Style de Duel de Chaka possède une piètre réputation auprès de la plupart des Duellistes, qui lui reprochent d'être indigne. Toutefois pour ceux qui ont l'habitude d'assécher le fleuve, la brutalité expéditive du Style de Chaka leur convient parfaitement. Actuellement, le Style de Chaka jouit d'une grande popularité dans le Royaume de Mbey.",
          "La principale faiblesse du style de Chaka est sa focalisation sur une offensive brutale et directe. Il est conçu pour briser une garde et finir le combat rapidement, mais il manque de subtilité et de mobilité. Un adversaire qui refuse l'engagement direct et qui utilise des feintes ou des déplacements rapides peut facilement exploiter l'approche agressive et prévisible d'un adepte de Chaka."
        ],
        "origine_texte": "Royaume de Mbey (Ifri)",
        "armes_predilection": "Deux bâtons (l'un d'attaque, l'autre de défense) et un Turkana (bracelet-bouclier fixé à l'avant-bras)",
        "academies": "Ifri ; le style jouit aujourd'hui d'une grande popularité dans le Royaume de Mbey",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": "Maîtrise du Turkana",
            "regles": "L'apprenti ignore le malus de -1g1 imposé par le bracelet-bouclier et reçoit gratuitement l'Entraînement Boucliers"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Lors de l'utilisation de la Technique de Double-Attaque, le compagnon ajoute sa Finesse aux dés non gardés de ses jets de dommages au Bâton"
          },
          "maitre": {
            "fluff": "Verrou parfait",
            "regles": "Une fois par round, lorsque le maître touche au Bâton, la Défense Passive de la cible est réduite de 10 (minimum 5) jusqu'à sa prochaine action"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Chin Te",
      "origine": "combat_reclassee",
      "nations": [
        "Cathay"
      ],
      "arme": "Seurng tjat koen",
      "arme_display": "Seurng tjat koen (Fléau)",
      "armes_categories": [
        "Fléau"
      ],
      "specialisations": [
        "Athlétisme",
        "Fléau"
      ],
      "description_courte": "Utilise un fléau toujours en mouvement pour générer de l'élan et frapper sous des angles déroutants.",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": "seurng tjat koen",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "seurng tjat koen",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Fléau",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité de main non directrice avec un seul seurng tjat koen. Augmentation Gratuite sur Attaque (Chaîne) avec cette arme.",
        "compagnon": "Si la première attaque touche, peut dépenser un Dé d'Action immédiatement pour une seconde attaque.",
        "maitre": "Peut dépenser un Dé d'Action pour faire tournoyer l'arme : le jet d'Esprit + Attaque (Chaîne) devient le ND pour être touché (mêlée/mains nues). Augmentation gratuite pour les tireurs contre vous."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "academies": "On ne peut apprendre l’école Chin te que dans la province du Lanna, où il est né.",
        "description_longue": [
          "Chin Te, un paysan du Lanna qui conduisit ses pareils à renverser un bureaucrate gouvernemental corrompu, dit à ses hommes d’utiliser leurs fléaux comme des armes. Aujourd’hui, le style de combat portant son nom utilise le seurng tjat koen, une arme dérivée de ces fléaux. Chin Te savait que ses forces étaient largement en sous-nombre, alors il développa des techniques pour permettre à ses hommes de résister contre de multiples adversaires.",
          "Les pratiquants du style Chin Te se battent parfois avec une paire de seurng tjat koen, mais n’en portent habituellement qu’un seul. Ce style est bâti autour du fait de garder l’arme toujours en mouvement afin d’avoir suffisamment d’élan lorsqu’une attaque devra être portée, ou en adoptant différentes positions avec l’arme tenue par une main sur chaque barre, permettant à son porteur d’utiliser n’importe laquelle de ses mains pour sa prochaine attaque. La faiblesse de cette école vient de son utilisation d’une arme qui ne peut en aucun cas servir à parer des attaques."
        ],
        "armes_pdf": "Seurng tjat koen",
        "specialisations_pdf": [
          "Athlétisme",
          "Fléau"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis s’habituent à utiliser un fléau avec l’une ou l’autre de leurs mains,",
            "regles": "annulant la pénalité de main non directrice lorsqu’ils utilisent une seule arme. Vous gagnez également une Augmentation Gratuite sur vos jets d’Attaque (Fléau) en utilisant un seurng tjat koen."
          },
          "compagnon": {
            "fluff": "Un compagnon maîtrise une attaque circulaire qui lui permet de frapper une seconde fois en utilisant le rebond de son premier coup.",
            "regles": "Pour ce faire, effectuez votre première attaque normalement. Ensuite, si le coup porte, vous pouvez dépenser immédiatement un autre dé d’Action (sans vous préoccuper du fait que celui-ci soit “légal” pour agir dans la phase courante) pour lancer une seconde attaque, dont le jet s’effectue normalement."
          },
          "maitre": {
            "fluff": "Les Maîtres ont appris que même un fléau peut être utilisé pour arrêter des attaques, mais au prix d’efforts particuliers.",
            "regles": "Vous pouvez dépenser un dé d’Action (qu’il soit en réserve ou de la phase courante) pour faire tournoyer votre arme. Lancez pour cela Esprit + Attaque (Fléau). Utilisez alors le résultat de ce jet comme votre ND pour être touché par des armes de mêlée, des armes de jet ou à mains nues jusqu’à votre prochaine action (utilisation d’un dé d’Action). Votre ND pour être touché par des flèches, carreaux ou autres projectiles reste inchangé, mais quiconque vous tire dessus avec une arme à feu bénéficie d’une Augmentation gratuite."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Daphan",
      "origine": "officielle",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Cimeterre",
      "arme_display": "Cimeterre (Sabre)",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Style agressif au cimeterre, basé sur des coups de taille puissants et des techniques pour briser les lames adverses.",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "Sabre",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Sabre",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": "Sabre",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Sabre",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Attaquez une phase plus tôt sur tous vos dés d'action (si phase 1, +5 initiative).",
        "compagnon": "Si l'adversaire réussit une Parade, dépensez 1 dé d'héroïsme pour tenter de briser son arme (Jet de Gaillardise vs ND de l'arme).",
        "maitre": "Utilisez une augmentation et un dé d'héroïsme pour lancer et garder un dé de dommages supplémentaire (+1g1) au lieu d'un dé non gardé."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Empire du Croissant.",
        "academies": "Le style de Daphan ne peut être appris qu’au sein de la tribu des Aldiz’ahali.",
        "description_longue": [
          "Le style de Daphan utilise un cimeterre pour faire des attaques rapides et agressives. Si les coups de taille avec la partie incurvée du cimeterre sont son point fort, il permet également d’en donner avec la section plus droite de la lame située près de la poignée. Un autre mouvement typique de ce style est une technique permettant de briser les armes des adversaires en effectuant une puissante rotation du poignet tandis que l’arme de l’adversaire est coincée entre la lame et la garde du cimeterre. La faiblesse de ce style est son manque de modération ; presque chaque attaque, parade, et feinte est faite avec tout le poids du spadassin. Un adversaire observateur et alerte remarquera les mouvements des muscles du spadassin et pourra donc disposer du temps nécessaire pour réagir convenablement."
        ],
        "armes_pdf": "Cimeterre",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "La première leçon de l’école de Daphan est d’attaquer énergiquement.",
            "regles": "Vous pouvez attaquer une phase avant le chiffre indiqué par vos dés d’initiative. Si un dé d’action indique la phase 1, vous agissez bien à la phase 1 mais votre total d’initiative est augmenté de 5."
          },
          "compagnon": {
            "fluff": "Les compagnons de Daphan ont appris comment briser les armes de leurs adversaires en les coinçant entre la lame et la garde de leur cimeterre. Quelques-uns, y compris Kheired-Din, emploient un cimeterre modifié avec une lame dentelée pour faciliter la chose. Un cimeterre équipé d’une telle modification voit son coût augmenté de 50%.",
            "regles": "Quand votre adversaire réussit une défense active en utilisant une parade, vous pouvez choisir de dépenser un dé d’héroïsme pour essayer de casser l’arme de votre adversaire. Vous devez réussir un jet de Gaillardise contre le ND de l’arme que vous voulez briser (Armes d’escrime et Couteau – 30 ; Armes lourdes – 35 ; Autres – au choix du MJ, mais au moins 40. Ajuster ce seuil en fonction des modificatifs ci-après : +5 pour une arme de qualité ; -5 pour une arme de médiocre qualité ; +10 pour une arme en Dracheneisen ; -5 pour une arme modifiée par une lame dentelée)."
          },
          "maitre": {
            "fluff": "Les maîtres de Daphan peuvent effectuer des attaques extrêmement puissantes.",
            "regles": "En utilisant un dé d’héroïsme, les augmentations que vous choisissez de prendre pour toucher votre adversaire ne se transforment pas en dés lancés mais en dés lancés gardés ! D’où des possibilités extraordinaires au niveau des dommages."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "De Vore",
      "origine": "seconde_edition_adaptee",
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
        "Étiquette"
      ],
      "description_courte": "Style défensif qui peut être utilisé pour protéger ses alliés",
      "techniques_combat": [
        {
          "nom_base": "Céder la place",
          "variante": null,
          "ref": "ceder la place",
          "source": "docx_v2"
        },
        {
          "nom_base": "Désarmer",
          "variante": "Rapière",
          "ref": "desarmer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Riposte",
          "variante": "Rapière",
          "ref": "riposte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Mur d'acier",
          "variante": "Rapière",
          "ref": "mur d'acier",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Tant que vous maniez une rapière dans une main et rien dans l'autre, et que vous n'utilisez aucune Action de mouvement durant cette phase, votre Défense Passive est augmentée de +5 jusqu'au début de votre prochaine action.",
        "compagnon": "\"Politesse de Vore\" : 3 actions de parade gratuites tant que le duelliste ne bouge pas",
        "maitre": "La \"Politesse de Vore\" s'applique également à un allié adjacent."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Dans un petit village appelé Auzat, niché dans les sommets Blancs, se trouve un château nommé le mont de Vore, qui vit la naissance du style de duel éponyme. Cet édifice se dresse sur les rives d'un lac, sous le regard altier de montagnes aux sommets enneigés. De nombreuses personnes s'y rendent dans l'objectif d'y parfaire leur talent. Les étudiants y apprennent les postures adéquates et la supériorité de la Montaigne en toutes choses. Les duellistes de Vore, que l'on dit semblables à des statues, gardent la tête droite et ne bougent que très peu durant les combats. Ils sont des modèles d'efficience. Un Duelliste pratiquant ce style tient sa main directrice et sa rapière ostensiblement plus haut que ne le dicte le confort, parallèlement au sol. Les étudiants de Vore revendiquent ainsi « placer haut la barre du duel ».",
          "Le mont de Vore offre une cravache aux diplômés, afin de leur rappeler l'importance d'une posture et d'un protocole rigoureux. Monsieur Riche la Borre est l'actuel directeur du mont de Vore. Cet homme charismatique est un ancien membre de la Garde éclair. Il perdit son œil gauche lors d'une tentative d'assassinat contre l'Empereur, et se défit du tueur alors qu'il était ensanglanté et aveuglé. Il dut abandonner son poste prestigieux à cause d'un scandale impliquant l'une des filles du Roi-Soleil. Son passé lui évita la corde, et il prit une retraite tranquille dans les montagnes qui l'avaient vu jadis apprendre le de Vore. Il décida d'y consacrer ses dernières années à enseigner aux nouvelles générations le Style qui lui avait tant servi par le passé.",
          "La principale faiblesse du style De Vore est sa rigidité et son manque de mobilité. Sa posture parfaite est conçue pour le duel sur un terrain plat et prévisible. Un adversaire qui utilise le terrain à son avantage, qui force le duelliste De Vore à se déplacer constamment ou qui l'attaque depuis un angle inattendu (par le haut, par le bas) peut facilement briser la posture statique de l'adepte et contourner sa garde redoutable."
        ],
        "origine_texte": "Auzat, dans les Sommets Blancs (Montaigne)",
        "armes_predilection": "Rapière tenue en garde haute (une main, l'autre vide) ; cravache remise aux diplômés en rappel du protocole",
        "academies": "Le Mont de Vore, à Auzat, dans les Sommets Blancs (Montaigne) ; directeur actuel : Monsieur Riche la Borre, ancien de la Garde éclair",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Tant que le de Vore manie une rapière (une main, l'autre vide) et n'effectue aucune action de mouvement durant la phase, sa Défense Passive et le résultat des tests de Défense Active sont augmentés de 5 jusqu'à sa prochaine action"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Tant qu'il n'a pas encore attaqué durant le round, le compagnon effectue ses défenses actives de Parade sans dépenser de dé d'action. Il ne bénéficie cependant pas du bonus d'apprenti de +5 en faisant cela"
          },
          "maitre": {
            "fluff": null,
            "regles": "Le maître peut désigner un allié adjacent : il intercepte et pare les attaques visant cet allié via sa Défense Active ou Passive"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Délicatesse",
      "origine": "combat_reclassee",
      "nations": [
        "Montaigne"
      ],
      "arme": "Rapière ",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Courtisan",
        "Escrime"
      ],
      "description_courte": "Escrime à la rapière adaptée aux vêtements encombrants, utilisant des pas de danse pour garder la distance.",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Rapière",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Pas de côté",
          "variante": null,
          "ref": null,
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Maintenir à distance",
          "variante": null,
          "ref": "maintenir a distance",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité avec robes/encombrement. Pénalités d'armure réduites de moitié. Danse remplace Jeu de jambes. +5 par niveau de maîtrise en défense passive contre Marquer.",
        "compagnon": "Action de défense active supplémentaire gratuite à chaque round, utilisable contre n'importe qui.",
        "maitre": "Peut changer de main avant une attaque : gagne une augmentation pour attaque ou Feinte. Défense passive +5. (Interdiction défense active/autre compétence jusqu'à fin de phase ou autre action). Avantage Gaucher avec main gauche."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Montaigne.",
        "academies": "Ce style n’a que très peu de fervents pratiquants. Les courtisanes vodaccies sont venues récemment étudier ce style et pensent fortement à l’enseigner dans leurs propres écoles de formation. Toutefois, les dames de Montaigne ne veulent pas que leurs propres filles fréquentent ces femmes, et Veronica Ambrogia fait tout son possible pour que cette école ne gagne pas son pays. Quant à Nicole, elle se bat pour que son style soit respecté dans sa province de Viltoille. Malheureusement, elle n’est pas politiquement très puissante et ne bénéficie que de la force de son bras et de ses connaissances techniques de spadassin pour y parvenir. Elle travaille très dur pour gagner les faveurs et le respect de la guilde des spadassins, mais Veronica Ambrogia s’est systématiquement opposée à ce qu’elle puisse passer les épreuves d’homologation. Peut-être cette école gagnera-t-elle le respect qu’elle mérite le jour où un groupe de jeunes femmes, plutôt que des mousquetaires, repousseront une équipe d’inquisiteurs venus attaquer l’Empereur…",
        "description_longue": [
          "L’histoire de l’école Délicatesse commence en 1664 avec une femme spadassin montaginoise nommée Arielle Valroux de Martise. Pendant sa carrière d’escrimeuse, elle était devenue la Némésis du duc Marcel de Sicée, un puissant noble de la cour montaginoise. Les adversaires qu’il lui envoya furent tous défaits sans difficultés. Ainsi, il échafauda un plan machiavélique visant à débarrasser le monde de sa présence. Dame Arielle fut ainsi invitée à un bal en l’honneur de l’Empereur. Elle n’eut d’autre choix que de s’y rendre, habillée d’une robe de bal, et désarmée, de peur d’offenser son hôte ou d’être détruite socialement par les autres dames de la cour. Et c’est lors de ce bal que les hommes du duc attaquèrent.",
          "Désarmée et presque incapable de se déplacer en raison de ses jupes encombrantes, Arielle dut réfléchir rapidement. Saisissant l’une des rapières des gardes, elle résolut ce problème. Mais sa robe rendait le combat difficile. En raison des modes versatiles de la cour, elle avait préféré emprunter celle de sa puissante protectrice, la comtesse Roselyne Étalon de Viltoille. La déchirer était donc impensable car elle aurait perdu un allié puissant. Elle improvisa donc un nouveau style d’escrime.",
          "Au lieu de tenir sa main-gauche habituelle dans son autre main comme l’enseigne l’école Valroux, elle s’empara du bord de sa jupe afin de faciliter ses mouvements. Elle usa de mouvements brusques et de fentes rapides afin de garder ses attaquants à distance et de ne pas abîmer sa tenue. Mais cela ne lui apportait pas grand-chose comme avantage martial. Jusqu’à ce qu’elle se rende compte que la robe qu’elle portait avait été conçue dans le but de danser plus facilement. Alors, en utilisant les pas des danses de la cour plutôt que le jeu de jambes classique d’un spadassin, elle élimina rapidement ses assassins qui n’étaient pas préparés à un tel jeu d’escrime.",
          "Elle est même parvenue à les mettre hors d’état de nuire sans endommager sa robe, tout en dansant au milieu de la salle de bal. La comtesse Roselyn e f ut très impressionnée, de même que le reste de la cour, par les merveilleuses et impressionnantes capacités de la duelliste. À tel point qu’elle demanda à Arielle d’enseigner son art à sa fille. La comtesse souhaitait en effet que celle-ci sache se défendre seule, sans avoir besoin d’un contingent de mousquetaires pour l’accompagner. Désireuse de satisfaire sa protectrice, Arielle fut forcée d’obtempérer et de transformer cette improvisation en une véritable école d’escrime. La fille de la comtesse, Nicole, devint rapidement très douée dans celle-ci et invita plusieurs de ses amies aux cours d’Arielle. Celle-ci, se lassant de son rôle de professeur s’en déchargea sur Nicole dès que celle-ci atteignit le rang de maître. Toutefois, malgré le fait que Nicole apprécie l’escrime et son rôle de professeur, elle n’a jamais voulu rejoindre la guilde des spadassins.",
          "Beaucoup de jeunes femmes sont devenues des étudiantes de l’école, mais peu s’y sont assez consacrées pour atteindre le rang de maître. L’école est restée un passe-temps pour Nicole et un jeu pour les nobles désœuvrées. Elle est considérée comme une école pour les dames, qui n’est pas digne d’un spadassin. Son utilisation lors d’un duel provoquait inévitablement les ricanements de l’adversaire.",
          "Tout cela changea en 1667, lorsque le capitaine mercenaire Joseph von Weisburg apprit les techniques de cette école auprès de Nicole. En effet, il s’était rendu compte qu’elle pouvait lui permettre de mieux combattre dans son encombrante armure, et pas seulement en jupe. Il avait raison et utilisa ces techniques sur le front castillian avec beaucoup de succès, mais pas très longtemps. Il revint à son style classique lorsqu’il se rendit compte qu’il était la risée de ses hommes, même lorsqu’il gagnait. L’utilisation qu’il fit de cette école permit toutefois qu’elle gagne ses lettres de noblesse et un certain respect. Même si elle est rarement utilisée par un spadassin, les ricanements ont cessé.",
          "La faiblesse de cette école est qu’elle enseigne à son étudiant de se déplacer le moins possible et de garder l’adversaire à distance. Le combat rapproché en robe de soirée est très difficile, en raison du corset qui réduit grandement les positions que l’escrimeuse peut adopter et des jupes qui interdisent de nombreux mouvements. Un adversaire pourra ainsi facilement en venir à bout en se rapprochant fortement et en évitant d’être repoussé."
        ],
        "armes_pdf": "Rapière ",
        "specialisations_pdf": [
          "Courtisan",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à se battre malgré des vêtements encombrants (que ce soit des robes ou des armures d’ailleurs…).",
            "regles": "Ainsi, les pénalités en cas de port d’armure sont divisées par deux grâce à cette école. En raison du fait que cette école est basée sur la danse, le spadassin peut utiliser sa compétence Danse à la place de Jeu de jambes pendant le combat. De plus, le spadassin gagne une augmentation de bonus par rang de maîtrise en défense passive quand il est victime d’une tentative de Marquer."
          },
          "compagnon": {
            "fluff": "À ce niveau, un spadassin peut utiliser ses talents de danse pour “changer de partenaire”, même en combattant.",
            "regles": "Ainsi, lorsqu’il est confronté à plusieurs adversaires, le spadassin bénéficie d’une défense active additionnelle qu’il peut utiliser contre n’importe lequel de ses ennemis sans pénalité."
          },
          "maitre": {
            "fluff": "Afin de faciliter ses déplacements, le maître du style Délicatesse apprend à changer rapidement son arme de main et à reprendre ses jupes dans sa main libre.",
            "regles": "Il peut effectuer cette manœuvre avant n’importe quelle attaque et recevoir ainsi une augmentation gratuite sur son prochain jet d’attaque ou de Feinte. Son ND pour être touché est également incrémenté de 5 pendant cette seule phase (en plus des augmentations contre une tentative de Marquer), mais elle ne peut tenter aucune défense active ou d’autres techniques de combat jusqu’à la fin du round ou jusqu’à ce qu’elle dépense une action pour reprendre sa robe dans sa bonne main. En raison de la formation intense à cette manœuvre, les maîtres de cette école ne souffrent plus de la pénalité de main non directrice et peuvent bénéficier de l’avantage Gaucher."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Desaix",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Rapière et main-gauche",
      "arme_display": "Rapière et main-gauche (Couteau)",
      "armes_categories": [
        "Escrime (Rapière)",
        "Couteau"
      ],
      "specialisations": [
        "Escrime"
      ],
      "description_courte": "Réservé aux Chevaliers de la Rose et de la Croix. Utilise Rapière et Main Gauche, mais de manière agressive.",
      "techniques_combat": [
        {
          "nom_base": "Double parade",
          "variante": "couteau/escrime",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "fente en avant",
          "variante": "escrime",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "feinte",
          "variante": "escrime",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité de main non directrice (dague/main gauche). Augmentation gratuite pour parer avec main non directrice.",
        "compagnon": "Peut dépenser un dé d'action pour effectuer deux attaques (une main gauche, une rapière) avec -2 dés aux dommages pour chaque.",
        "maitre": "Une fois par tour, peut dépenser une action pour effectuer une défense active via une interruption."
      },
      "restriction_creation": "interdite",
      "genre_restriction": null,
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Valroux.",
        "origine_texte": "Eisen (Ordre de la Rose et la Croix).",
        "academies": "Uniquement au sein des chevaliers de la Rose et de la Croix, en particulier auprès de Sprague, dans le refuge du Donjon.",
        "description_longue": [
          "Le style de combat de Desaix est dérivé de celui de Valroux. Il utilise lui aussi la combinaison populaire d’une rapière et d’une main gauche, mais s’éloigne de la stratégie défensive de l’école de Valroux. L’école de Desaix s’avère plus sérieuse que son ancêtre et manque de ces sarcasmes et de cette dérision si chères à celle de Valroux. Elle enseigne toutefois une double attaque particulièrement vicieuse qui fait à la fois appel à la rapière et à la main gauche.",
          "L’école de Desaix est une excellente école offensive. La main gauche s’efforce de créer des ouvertures que la rapière peut alors exploiter, et vice versa. Pendant ce temps, les réflexes éclairs de l’étudiant permettent de réagir immédiatement aux attaques de l’adversaire.",
          "L’actuel aîné de la famille Desaix enseigne exclusivement cette technique aux chevaliers de la Rose et de la Croix. Cette charge se transmet de père en fils depuis de nombreuses générations. Heureusement pour les spadassins de Montaigne, les étudiants qui connaissent déjà l’école de Valroux trouvent celle de Desaix très facile à apprendre.",
          "Toutefois, cet ensemble de techniques possède un énorme point faible : on apprend aux élèves à être très offensifs, ce qui les met parfois en danger. Un spadassin expérimenté sait les pousser à attaquer quand il le souhaite puis en profite pour les terrasser lorsqu’ils mordent à l’hameçon."
        ],
        "armes_pdf": "Rapière et main-gauche",
        "specialisations_pdf": [
          "Couteau",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "L’apprenti ne subit pas la pénalité de main non-directrice lorsqu’il se sert d’une dague ou d’une main gauche. En outre, il reçoit une augmentation gratuite lorsqu’il pare à l’aide de l’une de ces armes avec sa main non-directrice."
          },
          "compagnon": {
            "fluff": "",
            "regles": "Le compagnon peut dépenser un dé d’action pour effectuer deux attaques (l’une avec la main gauche, l’autre avec la rapière) contre un même individu, moyennant quoi il lance deux dés de moins sur chaque jet de dommages."
          },
          "maitre": {
            "fluff": "Les réflexes d’un maître de l’école de Desaix sont vifs comme l’éclair.",
            "regles": "Une fois par tour, il peut dépenser une action afin d’effectuer un jet de défense active via une interruption."
          }
        },
        "categorie_creation": "Écoles interdites à la création",
        "_source_pdf": "combat_reclassee",
        "nations_override": [
          "Eisen"
        ],
        "appartenance_requise": "Il faut être membre de l'Ordre de la Rose et la Croix pour apprendre cette école."
      },
      "enrichie": true
    },
    {
      "nom": "Donovan",
      "origine": "officielle",
      "nations": [
        "Avalon"
      ],
      "arme": "Épée longue et petite rondache",
      "arme_display": "Épée longue et petite rondache",
      "armes_categories": [
        "Escrime (Épée)",
        "Boucliers"
      ],
      "specialisations": [
        "Bouclier",
        "Escrime"
      ],
      "description_courte": "Populaire en Îles Glamour, s'appuie sur des coups de taille.",
      "techniques_combat": [
        {
          "nom_base": "emprisonner",
          "variante": "bouclier",
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": "escrime",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "riposte",
          "variante": "escrime",
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de malus bouclier. Augmentation gratuite en utilisant un bouclier.",
        "compagnon": "\"Coup de poignet de Donovan\" : si Parade (Escrime) réussie en défense active, inflige 1g1 dommages + 1g0 par tranche de 5 pts au-dessus du jet d'attaque.",
        "maitre": "\"Botte d'Edwards\" : peut utiliser une action interrompue pour attaquer une fois par tour."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Avalon.",
        "description_longue": [
          "C’est le style de combat le plus populaire en Avalon. Cette technique de combat, qui repose sur l’utilisation d’un bouclier et d’une épée longue plutôt que sur celle d’armes plus modernes comme la rapière et la main gauche, peut paraître quelque peu archaïque. Il ne faut cependant pas oublier que l’épée longue a une lame épaisse et très aiguisée, contrairement à la plupart des rapières.",
          "Cette technique s’appuie sur un éventail de coups de taille et d’estoc, qui gêne les spadassins habitués à ne parer que des coups d’estoc. Les élèves les plus brillants apprennent également à tirer le meilleur parti possible du tranchant de leur épée et à porter des coups de taille à la vitesse de l’éclair.",
          "La principale faiblesse de cette technique tient au fait que les coups de taille les plus élaborés impliquent un temps de préparation : pendant ce temps, la défense du bretteur “flotte”, une faiblesse qu’un autre spadassin peut percevoir et exploiter."
        ],
        "academies": "Toutes les cités importantes (Bedegrane, Carleon [2], Cerwidden Dun, Escavalon, Luthon, Pomitain et Surluse) d’Avalon accueillent au moins une école de Donovan. Dans les autres îles Glamour, seul Kirkwall compte également une école enseignant le style Donovan. Bien qu’une école existe à Kirk, l’Eisen est le seul pays où le style Donovan s’est vraiment développé. Tannen, Insel et Stahlfort ont chacune une école ou l’on enseigne le style Donovan.",
        "homologation": "1644",
        "doyen": "Miles Donovan (1644)",
        "insigne": "Une épée courte dont la lame est derrière une rondache.",
        "armes_pdf": "Épée longue et petite rondache",
        "specialisations_pdf": [
          "Bouclier",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à se servir efficacement de son bouclier.",
            "regles": "Il ne subit pas le malus lié à l’utilisation d’un bouclier et bénéficie même d’une augmentation gratuite à ses défenses actives et passives avec le petit bouclier quand il en utilise un."
          },
          "compagnon": {
            "fluff": "Le compagnon a appris à toujours prendre l’initiative de l’offensive, même lorsqu’il se défend. Il connaît un coup particulier, appelée le “coup de poignet de Donovan”, qui lui permet, lorsqu’il effectue une parade, de venir glisser la lame de son épée courte le long de la main de son adversaire.",
            "regles": "En termes de jeu, si le héros parvient à utiliser la compétence : Parade (Escrime) en défense active, il inflige 1g1 dé de dommages à son adversaire, plus un dé (lancé mais pas gardé) supplémentaire par tranche de 5 points au-dessus du jet d’attaque de son adversaire. Ainsi, si vous faites un jet de défense active supérieur de 17 points au jet d’attaque de votre adversaire, vous lui infligerez 4g1 dés de dommages. Vous n’ajoutez pas le rang de Gaillardise de votre héros au résultat de ce jet de dommages."
          },
          "maitre": {
            "fluff": "La “botte d’Edwards” a été ajoutée à cette technique par son maître, le défunt Jacob Edwards. Cette botte consiste à habituer l’adversaire à parer des coups en diagonale, avant de lui asséner brutalement un coup direct.",
            "regles": "Le maître qui fait appel à cette botte peut utiliser une interruption qui ne lui coûte qu’un seul dé d’action pour effectuer une attaque une fois par tour de combat."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Drexel",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Zweihänder",
      "arme_display": "Zweihänder",
      "armes_categories": [
        "Épées à 2 mains"
      ],
      "specialisations": [
        "Épée à deux mains",
        "Combat de rue"
      ],
      "description_courte": "4 postures de combats avec la Zweihänder",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "Épée 2 mains",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": "Épée 2 mains",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": "Épée 2 mains",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée 2 mains",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Connaît 2 positions de Zweihänder et leurs bonus d'apprenti. +5 à l'initiative totale avec une Zweihänder.",
        "compagnon": "Connaît 1 position supplémentaire et bonus de compagnon. Niveau de peur +1 (ou 1). Peur utilisable pour bonus/réduire peur adverse.",
        "maitre": "Connaît la dernière position et bonus de maître. Niveau de peur +1."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Eisen.",
        "description_longue": [
          "Cette technique fut développée par un mercenaire répondant au nom de Kristoff Drexel, le chef d’une compagnie connue sous le nom des Esprits de Sang. En tant que mercenaire, il découvrit qu’il se retrouvait souvent dans des situations imprévisibles qui exigeaient souplesse de pensée et de combat. Ainsi, il imagina plusieurs moyens d’exploiter la polyvalente Zweihänder eisenöre. Le style de combat de Drexel est très populaire chez les mercenaires en raison de sa faculté à gérer nombre de situations différentes. Souvent, on qualifie ces mercenaires de soldats Doppel, en référence à leurs honoraires : ils sont payés deux fois plus qu’un soldat normal.",
          "L’école de Drexel est connue pour sa souplesse au combat. Un spadassin en usant dispose de plus d’alternatives d’attaques et de défenses qu’avec aucune autre école. Elle propose quatre positions ou manières de brandir la Zweihänder. Chacune à ses avantages et ses désavantages, et s’attache à l’attaque ou à la défense.",
          "Un élève peut rapidement passer d’une position à une autre pour s’adapter à toute nouvelle situation. Toutefois, comme l’école s’attache plus à la souplesse et à une réflexion rapide qu’à une série de coups répétés, elle est parfois source de moments d’hésitation lorsque la situation de combat change soudainement, ce qui peut s’avérer fatal pour l’élève."
        ],
        "academies": "L’école principale se trouve à Stahlfort, sur les terres de la famille von Drexel. Yasmine von Drexel administre actuellement l’École et des académies ont ouvert à Insel, Freiburg, Seeufer, Tannen, Stärke, Siegsburg, et Prachtig. D’autres petites écoles peuvent également être trouvées un peu partout à travers les pays eisenörs. Beaucoup d’étrangers considèrent Drexel comme inefficace et cette École est donc dédaignée à l’étranger.",
        "homologation": "1646",
        "doyen": "Yasmine Drexel (1650)",
        "insigne": "Une zweihander pointant vers le bas (cette position ne correspond à aucune stance).",
        "armes_pdf": "Zweihänder",
        "specialisations_pdf": [
          "Épée à deux mains",
          "Combat de rue"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école Drexel connaissent les bases dont ils ont besoin pour manier la Zweihänder.",
            "regles": "Vous connaissez deux positions de Zweihänder (à choisir dans la liste ci-dessous) et pouvez utiliser chacune des facultés d’apprenti inventoriées sous chaque position que vous maîtrisez. En outre, vous bénéficiez de +5 à votre initiative totale lorsque vous maniez une Zweihänder."
          },
          "compagnon": {
            "fluff": "Les compagnons ont développé les connaissances de base de la Zweihänder et appris à utiliser force comme adresse pour intimider leurs adversaires (ainsi que leurs propres hommes).",
            "regles": "Vous apprenez une position supplémentaire et pouvez utiliser les facultés de compagnon inventoriées sous chaque position que vous maîtrisez. En outre, vous recevez un niveau de peur de 1. Si vous disposez déjà d’un niveau de peur, celui-ci est alors majoré d’un point. Vous pouvez utiliser ce niveau de peur pour soutenir des jets de Commander, les tentatives d’intimidation et les jets de panique. Vous bénéficiez d’une augmentation gratuite à votre jet par point de peur. Enfin, lorsque vous menez des hommes (hommes de main et brutes) contre une créature ou personne qui dispose également d’un niveau de peur, vous retranchez le vôtre du sien jusqu’à la fin de la scène (exemple : si le monstre a un niveau de peur de 3 et que le vôtre est de 2, le niveau de peur du monstre est donc de 1 et le vôtre de 0)."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Drexel maîtrisent tous les secrets de la Zweihänder et deviennent des guerriers redoutés.",
            "regles": "Vous apprenez la dernière position de Zweihänder et pouvez utiliser les facultés de maître inventoriées sous chacune d’elles. Votre niveau de peur est majoré de 1."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Eisenfaust",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Épée bastarde et panzerfaust",
      "arme_display": "Épée bastarde et panzerfaust",
      "armes_categories": [
        "Escrime (Épée)",
        "Gant de combat"
      ],
      "specialisations": [
        "Épée à deux mains et Panzerfaust"
      ],
      "description_courte": "Style défensif où on dévie ou attrape l'arme de l'adversaire avec le Panzerfaust",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": "armes lourdes",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "emprisonner",
          "variante": "panzerfaust",
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": "panzerfaust",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Gant de combat",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de malus Panzerfaust main gauche. Si défense passive tient, gagne 5 pts de marge d'échec de l'attaquant en augmentations pour prochaine attaque.",
        "compagnon": "Si défense active réussie, peut utiliser un dé d'héroïsme pour briser l'arme adverse (Jet Gaillardise vs ND arme).",
        "maitre": "Peut garder une action en réserve. Si utilisée pour attaquer, ajoute des dés de dommages (lancés) égaux au nombre de phases d'attente."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Eisen.",
        "description_longue": [
          "Cette technique, enseignée dans de nombreuses écoles militaires d’Eisen, repose sur l’utilisation concomitante d’une épée bastarde et d’un Panzerfaust, ou gant d’acier. L’élève apprend à dévier les attaques ou à attraper l’arme avec laquelle elles sont portées, pour alors profiter de l’ouverture pour frapper avec son épée bastarde. Il s’agit d’une technique de combat résolument défensive, qui consiste à attendre que l’adversaire fasse une erreur pour attaquer. “Que vous ayez ou non l’initiative de l’offensive importe peu si, ce faisant, vous ouvrez votre garde et permettez ainsi à votre adversaire de placer un coup mortel.”",
          "Cette technique qui repose sur l’exploitation des erreurs de l’adversaire est particulièrement efficace. Au fur et à mesure du combat, l’opposant s’impatiente ou s’énerve et finit par en commettre une. Le spadassin en profitera immédiatement et lui assènera une pluie de coups à l’aide de son épée large.",
          "Le point faible de la technique Eisenfaust, c’est la rigidité qu’acquiert le spadassin au travers de son entraînement. Si l’élève apprend plus de septante passes et bottes, il apprend également à respecter les règles régissant le passage de l’une à l’autre. Il apprend également à ne pas enchaîner certains mouvements, dont la combinaison est peu commode. Un adversaire bien informé saura alors quand frapper."
        ],
        "academies": "On trouve des écoles enseignant le style Eisenfaust à travers tout l’Eisen. On trouve aussi des académies enseignant cette École en Avalon. Typiquement, les maîtres n’enseignent à l’étranger qu’à des personnes fortunées, et de manière individuelle, de sorte que leur École ne se répande pas trop…",
        "homologation": "1644",
        "doyen": "Linnae Knute (1667)",
        "insigne": "Un panzerfaust.",
        "armes_pdf": "Épée bastarde et panzerfaust",
        "specialisations_pdf": [
          "Épée à deux mains",
          "Gant de combat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti peut utiliser une épée large ou épée bastarde dans une main – en utilisant alors l’entraînement Escrime plutôt que Épée à deux mains – et ne subit pas le malus dû à l’utilisation du Panzerfaust dans l’autre.",
            "regles": "Si l’assaillant ne parvient pas à passer la défense passive du héros, ce dernier bénéficie d’une augmentation gratuite par tranche de 5 points de marge d’échec (arrondis à l’entier inférieur) pour sa prochaine attaque. Ces augmentations doivent être utilisées contre le même adversaire et avant la fin du tour, sinon elles sont perdues. Il en est de même si le même adversaire attaque à nouveau le héros avant qu’il n’ait utilisé ces augmentations : il est tout simplement trop tard."
          },
          "compagnon": {
            "fluff": "Le compagnon sait briser l’arme de son adversaire à l’aide de son Panzerfaust.",
            "regles": "Lorsque le héros réussit un jet de défense active en utilisant Parade (Panzerfaust), il peut utiliser un dé d’héroïsme afin de tenter de briser l’arme de son adversaire. Vous devez alors réussir un jet de Gaillardise contre un ND basé sur le type d’arme concerné : Escrime : ND 30 ; Arme lourde : ND 35 ; Autres : décision du MJ, mais au moins ND 40. Auquel on ajoute : ND +5 pour une arme de qualité ; ND-5 pour une arme de piètre qualité et ND+10 pour une arme en Dracheneisen. De plus, un compagnon Eisenfaust est devenu si efficace dans le détournement des coups ennemis, qu’il peut maintenant essayer de les diriger sur un autre adversaire. Une fois par round, il peut rediriger une attaque d’un premier adversaire sur un second. Tout d’abord, le compagnon doit annoncer qu’il va tenter une telle action. Celle-ci ne peut être utilisée lors d’une interruption. Il effectue ensuite simplement un jet de défense active avec sa moins bonne compétence entre Attaque (Panzerfaust) et Parade (Panzerfaust), avec deux augmentations. Il doit alors dépasser le score en attaque de son premier ennemi et la défense passive de son second adversaire. S’il réussit, son ennemi encaissera les dommages qu’il aurait dû endurer."
          },
          "maitre": {
            "fluff": "Le maître a appris l’art de la patience.",
            "regles": "Le héros peut garder une action en réserve en attendant de trouver l’ouverture dans la défense de son adversaire. Si le héros se sert de cette action pour attaquer, il fait son jet de dommages en lançant (sans les garder) un nombre de dés supplémentaire égal au nombre de phases passées à garder l’action en réserve (souvenez-vous des règles concernant les jets à plus de 10 dés). Un héros ne pourra jamais faire son jet de dommages en lançant davantage de (rang de Détermination) dés grâce à cette technique. De même, elle ne permet de garder en réserve qu’un seul dé d’action par tour : tant qu’il est en réserve, vous ne pouvez que mettre en réserve ou défendre activement avec vos autres dés d’action."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Épées de Salomon",
      "origine": "combat_reclassee",
      "nations": [
        "Castille"
      ],
      "arme": "Épée longue et bouclier rectangulaire",
      "arme_display": "Épée longue et bouclier rectangulaire",
      "armes_categories": [
        "Escrime (Épée)",
        "Boucliers"
      ],
      "specialisations": [
        "Escrime",
        "Bouclier"
      ],
      "description_courte": "Style de garde honorable, basé sur l'épée et le grand bouclier et le combat en formation (trinôme).",
      "techniques_combat": [
        {
          "nom_base": "Charge au bouclier",
          "variante": null,
          "ref": "charge au bouclier",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "+3 défense passive si utilise pavois. Pas de pénalité de main non directrice avec pavois.",
        "compagnon": "Si groupe de 3+ Gardiens (formation), chaque Gardien gagne une action supplémentaire en phase 5.",
        "maitre": "Ajoute 5 points à tout jet effectué avec l'épée (attaque, dommages, défense active, etc.)."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Castille (Cité Vaticine).",
        "academies": "Il faut être membre de la garde de l’Église pour apprendre l’école des Épées de Salomon.",
        "description_longue": [
          "La Garde de l’Église fut officiellement créée par Salomon Antone en 609 AV, lorsque Carloman fut couronné Haut Imperator par l’Église du Vaticine. Le style de combat des Gardiens puise son origine dans un séjour qu’Antone fit au Cathay. Les Gardiens portent souvent un bouclier rectangulaire pour protéger la personne qu’on leur a confiée tout en combattant aux côtés de leurs camarades. En effet, bien peu de spadassins apprennent à combattre contre un pavois ou un trinôme. Les Épées de Salomon apprennent à combattre en petits groupes de trois individus et exécutent donc souvent leurs missions en trinôme."
        ],
        "armes_pdf": "Épée longue et bouclier rectangulaire",
        "specialisations_pdf": [
          "Escrime",
          "Bouclier (la compétence Attaque passe  compétence de base à la création)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "La première chose qu’apprend un Gardien est d’escorter ou de protéger l’individu qu’on lui a confié. On lui apprend donc à se battre en se tenant aux côtés d’un individu sans défense ou même d’un prisonnier, tout en utilisant son pavois pour que personne ne soit blessé.",
            "regles": "Si le Gardien se sert de son pavois, il ajoute 3 points à sa défense passive car il doit garder un œil sur plus d’une cible à la fois. En outre, l’apprenti n’est victime d’aucune pénalité de main non directrice quand il se bat à l’aide d’un pavois."
          },
          "compagnon": {
            "fluff": "À ce niveau, le Gardien apprend à se battre aux côtés de ses Frères. Quand ils sont encerclés, les Gardiens se mettent dos à dos et voûtent les épaules, se protégeant au maximum à l’aide de leur pavois. Souvent ils protègent une personne, disposée au centre, quand ils combattent de cette manière.",
            "regles": "Lorsqu’un groupe d’au moins trois Gardiens de l’Église combat ainsi, ils s’attachent à combattre la cible située devant eux, laissant leurs frères veiller sur leurs flancs. Chaque Gardien bénéficie d’une action supplémentaire durant le combat (généralement entreprise pour se mettre près de son protégé). Cette action supplémentaire se déroule toujours en phase 5."
          },
          "maitre": {
            "fluff": "Le Gardien apprend le plus grand secret des épées serpentines de Salomon.",
            "regles": "Il peut donc ajouter 5 points à tout jet qu’il effectue à l’aide de son épée. Cela inclut les jets d’attaque, de dommages, de défense active et de techniques de combats."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee",
        "nations_override": [
          "Castille"
        ],
        "appartenance_requise": "Il faut être membre de la garde de l'Église pour apprendre cette école."
      },
      "enrichie": true
    },
    {
      "nom": "Escuela Pater Noster",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Théologie",
        "Escrime"
      ],
      "description_courte": "Style défensif. Réservé au fidèles Vaticcins à la morale irréprochable.",
      "techniques_combat": [
        {
          "nom_base": "Céder la place",
          "variante": null,
          "ref": "ceder la place",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Vénération du Prophète",
          "variante": null,
          "ref": "veneration du prophete",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Gagne un dé gardé sur chaque action défensive du premier tour si a assisté à une messe récemment.",
        "compagnon": "Les adversaires (non infidèles) perdent un dé gardé sur leurs jets d'attaque (hésitation morale).",
        "maitre": "Bonus +1 en Esprit (max augmentée). Obtient asile et coopération des fidèles."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Castille.",
        "description_longue": [
          "L’Escuela Pater Noster est une des plus anciennes écoles d’escrime de Castille. Elle fut créée aux environs de 1050 AV par les moines castillians de l’ordre de San Benedicto, fidèles suivants du troisième Prophète. Constituée essentiellement d’anciens chevaliers devenus moines, sa mission première fut d’appuyer les campagnes militaires de l’Église du Vaticine contre les infidèles de l’Empire du Croissant. À l’origine organisée comme un ordre religieux, l’école s’ouvrit peu à peu aux profanes et, depuis le milieu du quatorzième siècle, n’est plus constituée que de gentilshommes, vaticins fervents, tous issus de familles à la moralité irréprochable.",
          "L’Escuela Pater Noster est installée au sein de monastères de l’ordre de San Benedicto. L’enseignement y est dispensé en deux ans. Durant cette période, les élèves sont considérés comme des moines à part entière et doivent se soumettre aux restrictions de la vie communautaire : silence, lecture assidue des textes sacrés, chasteté.",
          "Le style de combat de l’Escuela Pater Noster est extrêmement défensif. Le but premier d’un combat n’est pas de tuer l’adversaire mais de l’empêcher de combattre. Les élèves de cette école considèrent que tuer un homme, à moins d’y être forcé, est un péché qu’il faut éviter à tout prix. Cette restriction ne s’applique naturellement qu’aux vaticins, les infidèles ne méritent pas une telle sollicitude.",
          "Afin d’être admis au sein de la Escuela Pater Noster, il faut remplir impérativement les critères suivants : être un fidèle vaticin ; être issu d’une famille à la morale sans tache ; avoir au moins un parent, proche ou lointain, dans les ordres ; avoir le rang de gentilhomme ou être noble. Les trois premiers mois sont un test qui permettra de désigner les élèves dignes de poursuivre l’enseignement de l’école. À l’issu de ce trimestre, une grande cérémonie religieuse, présidée par un évêque, marque l’entrée effective des élèves au sein de l’école."
        ],
        "academies": "En sus du monastère de San Benedicto, au siècle dernier, la Escuela Pater Noster sortit de ses frontières natales et installa deux nouvelles représentations, l’une en Montaigne (au monastère de Saint-Nicobert dans le duché de Glavène), l’autre en Vodacce (dans les monastères de San Pagnozzo sur les terres Lucani et San Davizino sur les terres Mondavi).",
        "homologation": "1654",
        "doyen": "Abbé Sebastian Gajardo (1666), Abbé Modesto Soldadera (1669).",
        "insigne": "Une rapière pointée vers le bas qui se confond avec une croix vaticine pointée vers le bas.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Érudit",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un apprenti de l’Escuela Pater Noster est baigné par l’esprit du Prophète. Il se bat sans peur, car il sait bien qu’une place aux côtés de Theus l’attend après la mort.",
            "regles": "S’il a l’opportunité d’assister à une messe dans la journée précédant son combat, il gagne un dé (qu’il peut lancer et garder) sur chaque action défensive qu’il entreprend durant le premier tour."
          },
          "compagnon": {
            "fluff": "Le compagnon de l’Escuela Pater Noster atteint un tel niveau de spiritualité qu’il peut être considéré comme un moine par les profanes. Il s’habille de préférence avec des vêtements rappelant son statut de quasi- ecclésiastique.",
            "regles": "Tout adversaire qui n’est pas infidèle aura l’impression de combattre contre un homme d’Église et aura tendance à retenir ses coups, à être déstabilisé. Il perd un dé lancé et gardé sur tous ses jets d’attaque, mais pas ses jets de dommages."
          },
          "maitre": {
            "fluff": "Arrivé au stade de maître, le pratiquant de l’Escuela Pater Noster est reconnu partout comme une personne éminemment spirituelle et importante. Il obtient sans aucune difficulté asile et coopération de la part de tous les fidèles qu’il peut rencontrer. Son intimité avec Dieu est telle qu’il devient très difficile de le blesser.",
            "regles": "Lorsque le héros atteint ce niveau, il bénéficie d’un bonus de +1 à son trait d’Esprit (“gratuitement”). Ce qui augmente aussi la valeur maximale de ce trait de 1 : ainsi un maître de cette technique pourra avoir un rang 6 (voir 7 avec certains avantages) en Esprit."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Fadh-Righ",
      "origine": "combat_reclassee",
      "nations": [
        "Avalon"
      ],
      "arme": "Lance et rondache",
      "arme_display": "Lance et rondache",
      "armes_categories": [
        "Lances",
        "Boucliers"
      ],
      "specialisations": [
        "Lance légère",
        "Bouclier"
      ],
      "description_courte": "Combat honorable à la lance et au bouclier. Son origine non-humaine est le seul frein potentiel.",
      "techniques_combat": [
        {
          "nom_base": "Fente en avant",
          "variante": "Lance",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "emprisonner",
          "variante": "Bouclier",
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": "Lance",
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lance légère",
          "ref": "exploiter les faiblesses",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice (bouclier), lance à une main sans pénalité. Ajoute rang de Marquer à Provoquer (Répartie).",
        "compagnon": "Contre arme plus courte : Augmentations illimitées sur l'attaque. Si touche, augmente le ND de la prochaine attaque adverse de 5x le nombre d'Augmentations.",
        "maitre": "Les 3 premières Augmentations pour dégâts avec une lance donnent +1g1 chacune (au lieu de +1g0)."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Bryn Bresail.",
        "academies": "Cette école n’est connue que des Sidhes, mais de nombreux Inishs sont fort intéressés et cherchent à en découvrir les secrets.",
        "description_longue": [
          "L’école de Fadh-Righ est fondée sur l’une des plus anciennes légendes d’Inismore, l’astucieux guerrier Sidhe connu uniquement sous le nom de Long-Bras (Fadh-Righ en cymrique), qui défendit sa patrie contre les Firbolgs et aida à la création de la plus belle nation de Théah. Le guerrier Fadh-Righ utilise une lance dans sa main principale et un bouclier dans l’autre pour sa défense. Comme il convient à un Seigneur Sidhe, le style de Long-Bras est extrêmement voyant et se base sur un éblouissant éventail de coups flamboyants afin de tenir son adversaire à distance.",
          "Ce numéro de théâtre est à la fois sa force et sa faiblesse."
        ],
        "armes_pdf": "Lance et rondache",
        "specialisations_pdf": [
          "Lance légère",
          "Bouclier"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "Les apprentis de l’école de Long-Bras ne subissent pas la pénalité liée à l’utilisation concomitante d’une lance et d’un bouclier. Votre style audacieux vous permet d’ajouter votre rang dans la technique de combat Marquer à toutes les actions d’intimidation que vous effectuez."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école Fadh-Righ gardent leurs ennemis à distance, réduisant de ce fait les effets des éventuelles contre-attaques.",
            "regles": "Lorsque vous vous battez contre un adversaire qui utilise une arme plus petite que la vôtre, vous pouvez utiliser votre allonge supérieure à votre avantage. Quand vous effectuez une attaque contre une telle cible, vous pouvez prendre des augmentations. Si vous réussissez votre attaque, vous augmentez votre ND pour être touché lors de la prochaine attaque de votre adversaire de cinq fois le nombre d’augmentations que vous avez prises."
          },
          "maitre": {
            "fluff": "Les maîtres de Long-Bras frappent dur et fort.",
            "regles": "Lorsque vous prenez des augmentations pour infliger des dommages supplémentaires avec votre lance, les trois premières vous font bénéficier d’un bonus de +1g1 au lieu de +1g0 au jet de dégâts. Au-delà de la troisième, la procédure reprend normalement, toute augmentation fait bénéficier d’un bonus de +1g0 au jet de dommages."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Fa'tahib",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Asaaya (Bâton 2 mains)",
      "arme_display": "Asaaya (Bâtons)",
      "armes_categories": [
        "Bâtons"
      ],
      "specialisations": [
        "Bateleur",
        "Bâton"
      ],
      "description_courte": "Style artistique utilisant danse avec un long bâton",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Bâtons",
          "ref": "exploiter les faiblesses",
          "source": "docx_v2"
        },
        {
          "nom_base": "Fente en avant",
          "variante": "Bâtons",
          "ref": "fente en avant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Marquer",
          "variante": "Bâtons",
          "ref": "marquer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Riposte",
          "variante": "Bâtons",
          "ref": "riposte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Permet d'utiliser \"Représentations\" au lieux de \"Bâtons\" pour se défendre, réduisant la prochaine défense passive de la cible de 5.",
        "compagnon": "Vous pouvez vous déplacer d’un nombre de mètres égal à la moitié de votre compétence de Danse (arrondi à l’entier supérieur) après chaque parade ou attaque avec le bâton.",
        "maitre": "Lorsque vous utilisez la compétence de spadassin Riposte, vous ignorez tous les malus normalement associés à cette action (La division par 2 des compétences de parade et attaque)."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Le Fa'tahib est le Style de Duel traditionnel des élites alwarithlih depuis des générations. S'il s'agissait à l'origine d'un véritable style de combat, il a évolué au fil des années pour devenir une performance artistique. Les démonstrations de Fa'tahib sont fréquentes dans les grandes cérémonies : un artiste y utilise l'asaaya traditionnel (un lourd bâton d'environ un mètre trente) pour démontrer sa maîtrise dans une chorégraphie accompagnée de musique. Le Duelliste exécute ainsi des motifs complexes sans jamais frapper réellement son partenaire.",
          "Bien que les démonstrations artistiques de Fa'tahib soient l'apanage des individus ayant la force brute nécessaire au maniement d'un asaaya, une nouvelle version plus acrobatique s'est récemment développée et s'avère tout aussi populaire. Cette nouvelle version du Fa'tahib est généralement exécutée en même temps qu'une performance traditionnelle, mais elle exige du danseur de l'agilité plutôt que de la force. Si le message de la démonstration traditionnelle est « J'ai une arme et je sais m'en servir ! », la nouvelle danse lui répond « Tu n'es pas si impressionnant, moi aussi je sais danser avec un bâton ! »",
          "Le style Fa'tahib, même dans sa version martiale, reste une performance. Ses mouvements sont amples, télégraphiés et conçus pour être impressionnants. Un adversaire pragmatique et sans fioritures, qui ne se laisse pas impressionner par le spectacle, peut ignorer les feintes et profiter des larges ouvertures créées par les mouvements de danse pour placer des coups simples et directs."
        ],
        "origine_texte": "Empire du Croissant",
        "armes_predilection": "Asaaya (lourd bâton d'environ 1,30 m), manié à deux mains",
        "academies": "Empire du Croissant ; démonstrations artistiques lors des grandes cérémonies des élites alwarithlih, dont une variante acrobatique plus récente",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti peut utiliser sa compétence de Représentation à la place de Bâton pour ses jets de Parade ; si la cible n'est pas elle-même un artiste martial, l'apprenti bénéficie d'une augmentation gratuite à sa prochaine attaque contre cette cible"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Après chaque action d'Attaque ou de Parade au Bâton, le compagnon se déplace d'un nombre de mètres égal à son rang de Danse sans déclencher d'attaque d'opportunité de la part de la cible"
          },
          "maitre": {
            "fluff": null,
            "regles": "Lorsque le maître utilise la technique Riposte, il ignore les malus habituels (la division par deux des compétences de parade et d'attaque)"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Strade",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Vodacce"
      ],
      "arme": "Rapière ou coutelas",
      "arme_display": "Rapière ou coutelas",
      "armes_categories": [
        "Escrime (Rapière)",
        "Couteau"
      ],
      "specialisations": [
        "Escrime",
        "Acrobate"
      ],
      "description_courte": "Style basé sur l'utilisation de l'environnement (murs, caisses, bouteilles, …)",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": "Couteau",
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Riposte",
          "variante": "Couteau",
          "ref": "riposte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Double parade",
          "variante": "Couteau",
          "ref": "double parade",
          "source": "docx_v2"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Strade",
          "ref": "exploiter les faiblesses",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Tant que vous avez une main libre et que vous vous battez dans un environnement offrant des opportunités de mouvement (ruelles, navire, forêt dense...), vous pouvez utiliser votre compétence d'Acrobaties à la place de votre compétence d'Esquive pour vos jets de défense active.",
        "compagnon": "\"La Furia delle Strade\" : Une fois par round, vous pouvez dépenser votre déplacement pour interagir avec l'environnement. Vous effectuez un test de Finesse + Acrobaties (ND 15). En cas de réussite, en plus de votre mouvement normal, vous créez un obstacle pour votre adversaire (vous lui jetez une caisse dessus, coupez une corde pour faire tomber une voile, etc.). Votre adversaire subit immédiatement un malus de -2g1 à sa prochaine action.",
        "maitre": "La \"Furia delle Strade\" inflige en plus des dégâts égaux à Finesse x2"
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Pour l'heure, personne n'a pu retrouver l'inventeur de ce Style, même si nombre de bretteurs qui en sont spécialistes affirment en être à l'origine. Nommé d'après les rues étroites où il est né et a été perfectionné, ce style convient parfaitement aux boulevards sinueux et aux hautes flèches effilées des cités vodaccis.",
          "Un escrimeur qui s'initie au Strade apprend à considérer son environnement comme une course d'obstacles, ainsi que comme une source d'opportunités pour prendre le dessus sur son adversaire. Le Strade favorise l'utilisation d'une lame légère dans la main armée, ce qui laisse l'autre main libre pour voltiger sur les murs, se balancer d'un pont, sauter entre deux bâtiments ou rouler sous une passerelle.",
          "Tout adepte du Strade prend son entraînement très au sérieux, et fait souvent des « essais » au sein des lieux qu'il découvre pour la première fois, afin d'évaluer la distance entre deux bâtiments, le poids qu'une poutre peut recevoir, ou bien encore la hauteur d'un mur qu'il doit escalader. Il vaut mieux vérifier tout cela en amont d'un duel à mort plutôt que de le découvrir en plein milieu. Lorsque deux Duellistes adeptes du style Le Strade se rencontrent, ils ont tendance à faire étalage de leurs dernières trouvailles, et quand cela se produit dans une maison de guilde, leur démonstration peut attirer une sacrée foule et pas mal de parieurs.",
          "La principale faiblesse du style Le Strade est sa dépendance totale à un environnement complexe. Sur un terrain plat, ouvert et sans obstacles (une plaine, une salle de bal vide, un pont large), le duelliste est privé de tous ses avantages acrobatiques. Il est forcé de se battre de manière conventionnelle, ce qui le désavantage grandement face à des écoles plus directes et techniques."
        ],
        "origine_texte": "Vodacce",
        "armes_predilection": "Lame légère dans la main armée, l'autre main libre pour voltiger sur le décor",
        "academies": "Les ruelles sinueuses et les toits des cités vodaccis ; transmission informelle, démonstrations remarquées dans les maisons de guilde",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "En environnement offrant des appuis (ruelles, navire, forêt dense…) et avec une main libre, l'apprenti utilise sa compétence d'Acrobaties à la place de l'habituel Jeu de Jambe pour ses défenses actives"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Une fois par round, le compagnon peut sacrifier son déplacement pour exploiter le décor (jet de Finesse + Acrobaties, ND 15) ; en cas de réussite, son adversaire subit -1g1 à sa prochaine action"
          },
          "maitre": {
            "fluff": null,
            "regles": "Lorsque le maître déclenche la Furia delle Strade, sa victime subit en plus des dommages égaux à sa Finesse x2, réduits uniquement par la Gaillardise de la cible"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Gallegos",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Sabre ou sabre de cavalerie",
      "arme_display": "Sabre ou sabre de cavalerie",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Style où le duelliste effectue un minimum de mouvements",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Rapière",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "riposte",
          "variante": "Rapière",
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "marquer",
          "variante": "Rapière",
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation gratuite parade (Escrime). Action en réserve augmente de 1 point à la fin de la phase.",
        "compagnon": "Rang gratuit en Riposte (Escrime).",
        "maitre": "+10 au ND pour être touché."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Castille.",
        "description_longue": [
          "Également connu sous le nom de style des “Trois cercles”, Gallegos enseigne aux élèves que sauter dans tous les sens est inutile dans un combat. En effet, ils s’entraînent à exécuter des cercles toujours plus petits. Dans chaque cas, alors que le spadassin Gallegos se force à rester dans le cercle, son adversaire se déplace sans arrêt. En gros, l’élève apprend à combattre dans trois cercles avant de devenir maître.",
          "La force principale du style Gallegos est cette faculté quasi surnaturelle à échapper aux bottes en tournant légèrement sur le côté ou en s’écartant tout en exécutant une parade éclair. L’élève apprend à tenir ferme et à patienter jusqu’à ce que l’ennemi vienne à lui, puis riposte avec aussi peu d’efforts que possible.",
          "Toutefois, les élèves du style Gallegos prennent un tel goût à ce genre de combats qu’ils en oublient parfois complètement de se déplacer. Ainsi, un mastodonte de l’école de Leegstra ou une balle bien tirée sont souvent capables de sceller leur destin."
        ],
        "academies": "Il n’y a aucune école familiale de Gallegos en dehors de rancho Gallegos, mais la famille Gallegos ne contrôle pas la totalité de l’enseignement de son style. L’église du Vaticine a ouvert ses propres écoles de Gallegos où les cours sont dispensés par des Maîtres fidèles de l’église du Vaticine.",
        "homologation": "1647",
        "doyen": "Don Samuel Vasquez de Gallegos (1659)",
        "insigne": "Une rapière sur fond de trois cercles concentriques.",
        "armes_pdf": "Sabre ou sabre de cavalerie",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école de Gallegos ont maîtrisé le Premier Cercle. Ils apprennent à miser sur l’attente et observent les attaques de leurs adversaires.",
            "regles": "Vous bénéficiez d’une augmentation gratuite lorsque vous parez avec une arme d’escrime. En outre, lorsque vous mettez une action en réserve, augmentez la phase correspondant à ce dé d’action de 3 points à la fin de la phase. Ainsi, si vous obtenez un 5 à l’initiative et mettez cette action en réserve à la phase 5, le dé devient 8 à la fin de la phase 5. Cela vous permettra certainement d’agir le premier lors des phases suivantes, et donc de prendre l’avantage lorsque votre adversaire sera appauvri en actions."
          },
          "compagnon": {
            "fluff": "Une fois qu’il maîtrise le Deuxième Cercle, le compagnon combat à son aise en faisant de temps à autre un pas sur la gauche ou sur la droite. Il attend une attaque, puis riposte d’un simple tour de main.",
            "regles": "Vous êtes particulièrement doué dans l’art de la riposte et recevez gratuitement un rang dans la technique de combat Riposte (Escrime) lorsque vous devenez Compagnon. Votre rang passera peut-être ainsi à 6. Si tel n’est pas le cas, vous pourrez plus tard augmenter votre rang de technique de combat Riposte de 5 à 6."
          },
          "maitre": {
            "fluff": "Une fois qu’il connaît le Troisième Cercle, le maître n’a même plus besoin de bouger le petit doigt de pied quand il combat. Sa lame preste et ses mouvements gracieux le mettent à l’abri des coups de ses ennemis.",
            "regles": "Lorsque vous effectuer une riposte, vous ne divisez pas par deux vos compétences de parade et d’attaque mais gardez la totalité des rangs de celles-ci, le reste de l’utilisation de cette compétence est inchangée (le malus au ND et la réserve de dés correspondant à la riposte à répartir)."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Gautier",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Rapière et main-gauche équipée d’une lame ouvrante (aussi appelée triple-dague)",
      "arme_display": "Rapière et main-gauche équipée d’une lame ouvrante (Couteau)",
      "armes_categories": [
        "Escrime (Rapière)",
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Escrime"
      ],
      "description_courte": "Rapière et Triple-Dague pour Désarmer ou bloquer l'arme de l'opposant",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": "Couteau",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Double Parade",
          "variante": "Escrime/Couteau",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice (triple dague). Augmentation Gratuite pour parer avec.",
        "compagnon": "Rang gratuit en Désarmer. Si Lier réussi avec triple dague, Dé d'Action supp. immédiat pour Désarmer (ND +5).",
        "maitre": "Peut utiliser Lier (Couteau) en défense. Si défense active réussie, arme adverse liée et technique Compagnon utilisable."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Montaigne.",
        "description_longue": [
          "L’école de Gautier préconise l’utilisation d’une rapière dans la main principale et une variante de la main- gauche, la triple-dague, dans l’autre. Le poignard permet d’Emprisonner ou Désarmer son opposant, permettant alors à la rapière de frapper sans difficultés. Contrairement au verbeux style Valroux, le style Gautier enseigne à ses étudiants à rester silencieux lors de leurs duels, afin de se concentrer sur son adversaire et de le blesser avec l’acier plutôt qu’avec des mots.",
          "Cette attitude est l’une des meilleures doctrines de cette école, mais le dédain des mouvements raffinés qu’elle enseigne peut aussi desservir ses pratiquants."
        ],
        "academies": "La plus grande école du style Gautier se trouve à Bascone, dans la province de la Mothe. Il existe également des écoles enseignant le style Gautier à Buc et Crieux. L’École Gautier est également populaire chez les mousquetaires, car la famille De Tréville de Torignon est aussi très proche de celle des Gautier de la Mothe. Les membres montaginois des chevaliers de la Rose et de la Croix, moins obnubilés par le style Valroux, apprennent également l’École Gautier à Crieux, afin de compléter leur mystérieux style Desaix, qui est également une variante de Valroux. Et finalement, Crieux, comme Buc sont deux villes portuaires, ce qui a rendu l’École Gautier très populaire chez les gens de la mer.",
        "homologation": "1666",
        "doyen": "Maurice Gautier de la Mothe (1666)",
        "insigne": "Une triple dague dont les lames enserrent celle d'une rapière, la garde de la rapière en haut à droite et sa pointe en bas à gauche.",
        "armes_pdf": "Rapière et main-gauche équipée d’une lame ouvrante (aussi appelée triple-dague)",
        "specialisations_pdf": [
          "Couteau",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à utiliser une triple-dague pour se défendre.",
            "regles": "Il ne subit aucune pénalité liée à l’utilisation d’une triple-dague dans sa main non-directrice. De plus, vous bénéficiez d’une augmentation gratuite pour parer à l’aide de cette triple-dague."
          },
          "compagnon": {
            "fluff": "Le compagnon de l’école Gautier maîtrise l’art de désarmer ses adversaires.",
            "regles": "Il bénéficie d’un rang supplémentaire dans sa technique de combat Désarmer, ce qui peut l’amener au rang 6. Si tel n’est pas le cas, il pourra, plus tard, augmenter son rang dans cette technique de combat de 5 à 6. En outre, toutes les fois que le compagnon lie avec succès l’arme de son adversaire avec sa triple-dague, il obtient immédiatement une action gratuite, qui ne peut être utilisée que pour désarmer son adversaire. Le ND pour réussir ce désarmement est augmenté de 5."
          },
          "maitre": {
            "fluff": "Le maître du style Gautier est capable de se défendre à l’aide de sa triple-dague.",
            "regles": "Vous pouvez utiliser votre technique de combat Emprisonner (Couteau) comme défense active. Si vous réussissez ainsi votre défense, vous avez lié la lame de votre adversaire normalement, vous permettant alors d’utiliser votre technique de compagnon à son encontre."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Geng Yu Qiang",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Cathay"
      ],
      "arme": "Lance",
      "arme_display": "Lance",
      "armes_categories": [
        "Lances"
      ],
      "specialisations": [
        "Lance légère",
        "Athlétisme"
      ],
      "description_courte": "Style de combat à la lance shenoise, basé sur une alternance fluide et gracieuse entre des postures offensives et défensives pour déstabiliser l'adversaire.",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "lance",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Lance",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Maintenir à distance",
          "variante": null,
          "ref": "maintenir a distance",
          "source": "csv"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "csv"
        }
      ],
      "avantages_courts": {
        "apprenti": "Si vous effectuez une action d'Attaque et que votre action précédente dans le même round était une Parade, vous bénéficiez d'une Augmentation gratuite (+5 au total). De même, si vous effectuez une action de Parade et que votre action précédente était une Attaque, vous bénéficiez d'une Augmentation gratuite.",
        "compagnon": "Après votre première attaque ou Parade(Lances) à chaque round, vous devez choisir une \"posture\" jusqu'à la fin du round : - Posture Offensive (Si vous aviez paré) : Votre prochaine attaque durant ce round inflige +1g1 de dégâts. - Posture Défensive (Si vous aviez attaqué) : Votre prochaine Parade durant ce round gagne un bonus de +1g1. Vous devez ensuite changer de posture, en offensive si vous parez et en défensive si vous attaquez. Vous pouvez aussi changer de posture contre une Action.",
        "maitre": "Lorsque vous utilisez la \"Méthode Qiang\", vos bonus passent à +2g2. Vous initiez un combat avec la posture de votre choix, et pouvez choisir de sacrifier votre Déplacement pour en changer au lieu de votre Action."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "origine_texte": "Cathay",
        "description_longue": [
          "Style de combat à la lance shenoise, basé sur une alternance fluide et gracieuse entre des postures offensives et défensives pour déstabiliser l'adversaire."
        ],
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Si vous effectuez une action d'Attaque et que votre action précédente dans le même round était une Parade, vous bénéficiez d'une Augmentation gratuite (+5 au total). De même, si vous effectuez une action de Parade et que votre action précédente était une Attaque, vous bénéficiez d'une Augmentation gratuite."
          },
          "compagnon": {
            "fluff": null,
            "regles": "Après votre première attaque ou Parade(Lances) à chaque round, vous devez choisir une \"posture\" jusqu'à la fin du round : - Posture Offensive (Si vous aviez paré) : Votre prochaine attaque durant ce round inflige +1g1 de dégâts. - Posture Défensive (Si vous aviez attaqué) : Votre prochaine Parade durant ce round gagne un bonus de +1g1. Vous devez ensuite changer de posture, en offensive si vous parez et en défensive si vous attaquez. Vous pouvez aussi changer de posture contre une Action."
          },
          "maitre": {
            "fluff": null,
            "regles": "Lorsque vous utilisez la \"Méthode Qiang\", vos bonus passent à +2g2. Vous initiez un combat avec la posture de votre choix, et pouvez choisir de sacrifier votre Déplacement pour en changer au lieu de votre Action."
          }
        },
        "_source_pdf": "spadassin_v2"
      }
    },
    {
      "nom": "Gosling",
      "origine": "officielle",
      "nations": [
        "Avalon"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Style basé sur l'esquive au lieu de la parade",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte de corps",
          "variante": null,
          "ref": "feinte de corps",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation gratuite sur tous les jets de défense active qui ne sont pas des parades.",
        "compagnon": "Après une défense active réussie (non parade), retarde le prochain dé d'action de l'adversaire (peut le faire perdre).",
        "maitre": "\"L'Inévitable\" : Après défense active réussie (non parade), peut dépenser un dé d'action pour une Fente en avant immédiate avec bonus de dommages."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Avalon.",
        "description_longue": [
          "La plupart des duellistes accomplis sont capables de parer une attaque sans laisser perler une goutte de sueur ; les spadassins de l’École Gosling, quant à eux, se vantent de ne plus être là quand la lame ennemie arrive. Basée sur le principe de l’esquive plutôt que sur la parade, l’École de Gosling enseigne à ses élèves à déséquilibrer l’adversaire, physiquement et mentalement, puis à lui porter une attaque subite à laquelle il ne s’attend pas.",
          "La leçon de base est de consentir à faire face aux attaques de son ennemi ; ainsi, la clef de cette leçon sur laquelle un apprenti passe toute sa première année de formation est d’apprendre à ne pas parer. Il apprend donc à éviter, se pencher et se déplacer dans la même direction que la frappe de son adversaire. Combiné avec toute une série de remarques acerbes et de railleries, ce style essaie de forcer l’ennemi à s’énerver, et donc à lancer une attaque rageuse, de laquelle le spadassin sait parfaitement tirer profit. Un maître Gosling est un véritable derviche, un spectacle de mouvements continus et de brusques arrêts lorsqu’il entrevoit une ouverture dans la défense de son adversaire. Il exécute alors une botte secrète brusque que les membres de cette école appellent “l’Inévitable”.",
          "Au premier abord, les techniques de l’École Gosling peuvent sembler très agressives, mais dans la pratique, elles permettent au spadassin d’avoir une grande liberté de mouvements et d’éviter facilement les attaques ennemies. Jusqu’à présent, l’École Gosling utilise uniquement une rapière. C’est une école relativement jeune, malgré tout, et de nombreuses variations existent. En fait, autant qu’il y a d’élèves, car chacun a son propre sens de l’improvisation.",
          "Ce style a deux faiblesses apparentes. D’abord, les spadassins Gosling ont tendance à toujours éviter les attaques adverses en plongeant du même côté, soit à gauche, soit à droite. Un spadassin observateur pourra ainsi discerner l’habitude de son adversaire et anticiper son brusque mouvement. En second lieu, les spadassins Gosling sont notoirement faibles en parade, puisqu’ils passent la majeure partie de leur temps à esquiver plutôt qu’à parer."
        ],
        "academies": "Aujourd’hui encore, Johanna Gosling enseigne le style paternel dans l’arboretum du domaine familial, près de Carleon. Deux de ses élèves, devenus maîtres à leur tour ont également ouvert des écoles à Wandesborrow et Fenshire.",
        "homologation": "1660",
        "doyen": "Johanna Gosling (1660)",
        "insigne": "L’insigne de cette école ne comporte que l’anneau de base.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Athlétisme (Pas de côté devient une compétence de  base)",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "On enseigne au spadassin Gosling à se déplacer en harmonie avec les attaques de son adversaire, pas contre elles. En conséquence, il est idéalement placé lorsque vient cette attaque.",
            "regles": "Les apprentis “Sapling” (Jeune arbre, surnom donné par leurs détracteurs) bénéficient d’une augmentation gratuite sur tous leurs jets de défenses actives qui ne sont pas des parades."
          },
          "compagnon": {
            "fluff": "Un compagnon Gosling est capable de prendre au dépourvu sa proie en sautant brusquement loin de la lame de son ennemi, l’amenant à chuter vers l’avant et le laissant sans défenses après avoir perdu le déroulement de ses passes d’armes.",
            "regles": "Après une défense active réussie (qui ne peut toujours pas être une parade), le prochain dé d’action de votre adversaire est reculé d’une phase, plus une par augmentation prise sur le jet de défense active. Si ces augmentations amènent le dé d’action de votre adversaire au-delà de 10, l’action en question est perdue."
          },
          "maitre": {
            "fluff": "Les maîtres de l’École Gosling maîtrisent parfaitement le timing de l’“Inévitable”, une fente en avant extrêmement brusque et violente.",
            "regles": "Après avoir réussi une défense active autre qu’une parade, le spadassin Gosling peut choisir de dépenser un dé d’action (quel que soit le moment où il aurait dû être utilisé) pour effectuer immédiatement une brusque et violente fente en avant, effectuant son jet comme d’habitude. Toutes les augmentations prises sur le jet de défense active s’ajoutent aux dommages de la fente en avant."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Hainzl",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Pallasch",
      "arme_display": "Pallasch (Épée)",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime",
        "Estudiant"
      ],
      "description_courte": "Style se focalisant sur l'analyse et exploitation des points faibles ennemis",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Mur d'acier",
          "variante": null,
          "ref": "mur d'acier",
          "source": "csv"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation gratuite par niveau de maîtrise pour effectuer une attaque ciblée.",
        "compagnon": "Rang gratuit dans la technique Marquer.",
        "maitre": "Chaque augmentation utilisée pour viser (attaque ciblée) ajoute +1g0 aux dommages."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Cette école a été développée dans la petite université d’Atemlos, dans la province d’Hainzl – une école plus célèbre pour ses mathématiciens que pour ses soldats de métier. Elle a été développée dans le but de créer une école d’escrime non mortelle afin d’arranger les différends entre étudiants, de façon très précise et exacte. Les duels entre étudiants sont rarement mortels, mais les cicatrices sont habituelles et les maîtres de ce style sont fort capables de tuer. Ils utilisent une pallasch avec une grande garde panier.",
          "Le spadassin de cette école se met en garde face à son adversaire et attaque d’un seul coup son point sensible. Il ne déplace que son bras d’arme, qui lui sert aussi bien à l’attaque qu’à la défense. Cette immobilité est la principale faiblesse de ce style."
        ],
        "academies": "Ces dernières années, un certain nombre d’étrangers se sont inscrits à l’université de Durchsetzungburg, seul endroit de Théah où l’on peut apprendre l’école Hainzl.",
        "homologation": "1656",
        "doyen": "Albert von Sydow (1656)",
        "insigne": "Un parchemin sur lequel écrit une rapière.",
        "armes_pdf": "Pallasch",
        "specialisations_pdf": [
          "Escrime",
          "Estudiant"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Le style Hainzl permet de viser un endroit avec une grande précision.",
            "regles": "Vous obtenez une augmentation gratuite par niveau de maîtrise pour effectuer une attaque ciblée (à la main, au visage, etc.) à l’aide d’une arme d’escrime."
          },
          "compagnon": {
            "fluff": "Cette école vous a appris à évaluer d’un seul regard les points sensibles de votre adversaire.",
            "regles": "Vous obtenez un rang supplémentaire dans votre technique de combat Marquer, ce qui peut vous amener au rang 6. Si tel n’est pas le cas, vous pourrez, plus tard, augmenter votre rang dans cette technique de combat de 5 à 6."
          },
          "maitre": {
            "fluff": "Vous maîtrisez tellement bien votre lame d’escrime que vous pouvez utiliser celle-ci pour viser des failles minuscules dans la défense de votre adversaire, le frappant aux endroits les plus vulnérables.",
            "regles": "Chaque augmentation que vous utilisez pour viser vous permet de bénéficier d’un bonus de +1g0 aux dommages que vous infligez avec votre arme d’escrime."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Halfdansson",
      "origine": "combat_reclassee",
      "nations": [
        "Vesten"
      ],
      "arme": "Harpon",
      "arme_display": "Harpon",
      "armes_categories": [
        "Lances"
      ],
      "specialisations": [
        "Arme d'hast",
        "Baleinier"
      ],
      "description_courte": "Ce style de combat utilise le harpon, tentant d'empaler la cible et lui infliger un maximum de dégâts. Non-Reconnue par la Guilde.",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "Lance",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": "Lance",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "fente en avant",
          "variante": "Lance",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lance",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation gratuite harpon vs créatures aquatiques. Peut empaler cible avec augmentation (si blessure grave) : cible ND +5, ND pour être touché -5, dommages continus 2g1.",
        "compagnon": "+1g0 dommages harpon. Plus besoin d'augmentation pour empaler.",
        "maitre": "+0g1 dommages harpon. Rang gratuit Lancer (harpon). Cible empalée doit subir 2 blessures graves pour se dégager."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vestenmannavnjar.",
        "academies": "Cette école de combat s’apprend sur le pont des baleiniers vestens.",
        "description_longue": [
          "Les Vestens se servent de harpons pour chasser en mer. Ils se révèlent particulièrement utiles face aux serpents marins et sirènes, mais également lors d’abordages. Les élèves de l’école de combat de Halfdansson exploitent le harpon de bien violente manière. Ils plongent leur arme dans le corps de leur adversaire puis se saisissent d’un second harpon. Inutile de dire qu’il est très difficile de combattre lorsque l’on vient d’être empalé par un long objet barbelé. Les élèves de Halfdansson cherchent donc à harponner leur adversaire pour ensuite le terrasser à loisir.",
          "La faiblesse de cette école réside dans le fait que ses élèves attachent trop d’importance à cette première attaque, permettant ainsi à un adversaire malin de tirer le meilleur parti de leur préoccupation."
        ],
        "armes_pdf": "Harpon",
        "specialisations_pdf": [
          "Lance légère",
          "Baleinier"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves du style de combat Halfdansson apprennent que le meilleur moyen d’utiliser un harpon est d’infliger une profonde blessure à la cible puis de la laisser s’épuiser.",
            "regles": "Les apprentis bénéficient d’une augmentation gratuite quand ils se servent d’un harpon face aux créatures aquatiques comme les sirènes, les léviathans, les baleines, les serpents de mers, etc. En outre, lorsque vous frappez une cible, vous pouvez utiliser une augmentation pour tenter d’empaler votre cible. Si vous infligez au moins une blessure grave à l’aide d’une telle attaque, votre cible est empalée. Les cibles empalées sont victimes d’un modificateur de +5 à tous leurs ND. En outre, leur ND pour être touché est réduit de 5 points. Enfin, chaque fois que le harpon remue un peu trop dans la blessure infligée, il inflige 2g1 dés de dommages. Si l’arme inflige ainsi une blessure grave, le harpon se dégage et la victime n’est plus empalée."
          },
          "compagnon": {
            "fluff": "Les compagnons ont appris à frapper avec force et précision.",
            "regles": "Ils lancent un dé supplémentaire (+1g0) en ce qui concerne les dommages infligés à l’aide d’un harpon (4g2 ou 4g3). Cela n’affecte aucunement les dommages infligés par un harpon déjà plongé dans le corps d’une victime. Il ne vous est plus nécessaire d’utiliser une augmentation lorsque vous tentez d’empaler une cible."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Halfdansson frappent instinctivement pour effectuer le maximum de dommages et empaler leur cible.",
            "regles": "Vous gardez un dé supplémentaire (+0g1) de dommages lorsque vous touchez à l’aide d’un harpon (4g3 ou 4g4). Vous gagnez un rang supplémentaire dans la compétence Lancer (Harpon), ce qui peut la faire passer à 6. Si tel n’est pas le cas, vous pourrez ultérieurement la faire passer de 5 à 6 en dépensant 25 XP. Lorsque vous empalez une cible à l’aide d’un harpon, il doit infliger 2 blessures graves avant de se dégager."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Hallbjorn",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Vesten"
      ],
      "arme": "Arme 1 Main + Bouclier",
      "arme_display": "Arme 1 Main + Bouclier",
      "armes_categories": [
        "Boucliers"
      ],
      "specialisations": [
        "Épée",
        "Bouclier",
        "Artisan (Bouclier)"
      ],
      "description_courte": "Style utilisant un bouclier fabriqué par le Duelliste, de manière offensive.",
      "techniques_combat": [
        {
          "nom_base": "Emprisonner",
          "variante": "Bouclier",
          "ref": "emprisonner",
          "source": "docx_v2"
        },
        {
          "nom_base": "Harceler",
          "variante": null,
          "ref": "harceler",
          "source": "docx_v2"
        },
        {
          "nom_base": "Charge au bouclier",
          "variante": null,
          "ref": "charge au bouclier",
          "source": "docx_v2"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Lorsque vous effectuez une action d'Attaque équipé de votre bouclier, La Défense Passive de votre cible est réduite d'un montant égal à votre score de Gaillardise à la prochaine attaque qu’il subira.",
        "compagnon": "\"Choc d'Hallbjorn\" : En effectuant une action d'Attaque avec votre bouclier, vous pouvez choisir de prendre une Augmentation (+5 à la Difficulté). Si vous réussissez, en plus des effets de base du coup de bouclier, la cible devient Vulnérable. La prochaine fois que cette cible subit des dégâts (de n'importe quelle source) durant ce round, elle subit 5 points de dégâts supplémentaires.",
        "maitre": "Lorsque vous réussissez votre manœuvre \"Choc d'Hallbjorn\", la cible est non seulement Vulnérable (subissant +5 dégâts à la prochaine attaque), mais elle est également si secouée qu'elle subit un malus de -2g0 à sa prochaine action."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Le créateur de ce Style fut Hallbjorn Ulfsen, un Pilleur vesten légendaire qui abandonna la mer pour intégrer une Maison de Duel vesten. Les guerriers qui le pratiquent maîtrisent le bouclier et l'utilisent à la fois pour se protéger des attaques ennemies et comme une arme. Ils créent des ouvertures dont leurs alliés peuvent profiter tout en percutant leurs adversaires de leur bouclier.",
          "Contrairement à ceux utilisés par les soldats d'autres Nations de Théah, le bouclier rond vesten est fait de bois, parfois renforcé de métal, il reste moins solide que beaucoup d'autres. Cela est délibéré, car un bouclier plus léger permet aux utilisateurs du Hallbjorn de le manier avec plus d'aisance pour frapper. Cependant, ils résistent rarement longtemps aux rigueurs du combat. Pour cette raison, de nombreux Duellistes Hallbjorn apprennent à fabriquer leurs propres boucliers. Ils n'en utiliseraient jamais un fabriqué par quelqu'un d'autre, car ils croient insuffler une partie de leur propre férocité dans leurs créations. Ils les décorent également d'images ou de motifs runiques inspirés de leur vie. Si quelqu'un venait à rassembler tous les boucliers utilisés par un Duelliste et les alignait par ordre chronologique, il pourrait aisément retracer sa vie.",
          "La principale faiblesse du style Hallbjorn réside dans son bouclier. Conçu pour être plus léger et offensif, il est délibérément moins solide que les boucliers militaires traditionnels. Un adepte du Hallbjorn qui utilise son bouclier pour parer des coups puissants (particulièrement d'armes lourdes) risque de le voir se briser en plein combat, le laissant exposé et privé de ses techniques les plus efficaces."
        ],
        "origine_texte": "Vesten",
        "armes_predilection": "Épée et bouclier rond vesten (en bois, léger, conçu autant pour frapper que pour protéger)",
        "academies": "Maisons de Duel vesten ; chaque adepte forge et décore son propre bouclier rond, qu'il ne confierait à personne d'autre",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Lorsque l'apprenti attaque équipé de son bouclier, la Défense Passive de la cible est réduite d'un montant égal à sa Gaillardise contre la prochaine attaque qu'il lui portera"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Lorsque le compagnon touche avec une attaque de bouclier, la cible devient Vulnérable : la prochaine fois qu'elle subit des dommages durant ce round, elle en subit 5 de plus"
          },
          "maitre": {
            "fluff": null,
            "regles": "La cible rendue Vulnérable par le Choc d'Hallbjorn subit également -1g1 à sa prochaine action"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Hennessey",
      "origine": "combat_reclassee",
      "nations": [
        "Inismore"
      ],
      "arme": "Sabre",
      "arme_display": "Sabre",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Armes improvisées",
        "Escrime"
      ],
      "description_courte": "Style d'ivrogne imprévisible combinant sabre et arme improvisée avec un jeu de jambes chancelant.",
      "techniques_combat": [
        {
          "nom_base": "Coup d'épaule",
          "variante": null,
          "ref": "coup d'epaule",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Sabre",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Octroie +5 en Jeu de Jambes en Défense Passive lorsqu'il a bu. Pas de pénalité de main non-directrice s'il tient une choppe ou similaire. Avantage Grand Buveur.",
        "compagnon": "1g1 dès de dommages sur les cibles marquées. Les armes improvisées comme les chopes ne se brisent pas.",
        "maitre": "Peut cracher l'alcool dans le visage de l'ennemi en effectuant un jet d’Attaque (Armes improvisées) avec deux augmentations contre le ND pour être touché de son adversaire. S’il réussit, l’opposant est temporairement aveuglé et est considéré comme combattant dans l’obscurité totale jusqu’à ce qu’il puisse dépenser une action pour se nettoyer les yeux."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Inismore",
        "academies": "L’école Hennessey est enseignée à Tara, en Inismore, mais des maîtres d’armes chancellent d’une ville à l’autre à travers tout le pays.",
        "description_longue": [
          "Connor Hennessey était l’un des spadassins les plus ambitieux d’Inismore. Malheureusement, il était aussi l’un des plus maladroits. Étudiant à Tara, il était aussi inscrit dans une école enseignant le style Andrews. Seulement, après qu’il eut blessé quatre autres élèves, il fut renvoyé. Complètement découragé, Hennessey se mit à boire. Et boire encore. Et boire encore plus. Ses études en souffrirent et il échoua aux examens de l’université.",
          "Après son renvoi, Hennessey sombra dans une profonde dépression ainsi que dans la bouteille. Inspiré par les firbolgs roses qu’il commençait à voir, il développa son propre style d’escrime – complètement approprié à son état d’ivresse permanent. Un mélange approximatif d’Andrews et de Finnegan qui se transforma finalement en un art unique de combat mêlant le sabre dans une main et une chope de bière ou une bouteille de whiskey dans l’autre. Son fondateur parvint alors à recruter des élèves et gagna assez d’argent pour acheter son adhésion à la Guilde des Spadassins (bien qu’il ne reçût qu’une broche de fer lorsqu’il fut éprouvé) et il commença une modeste carrière de duelliste grâce à son style inconnu et si particulier. Connor Hennessey fut finalement tué lors d’une dispute avec deux épéistes Larsen, habitués à se battre contre des hommes ivres lorsqu’ils patrouillent nuitamment dans les rues de Kirk. Ce sont ses premiers élèves qui perpétuèrent ce style et l’enseignèrent à leur tour.",
          "Le jeu de jambes pratiqué par les spadassins Hennessey se compose de mouvements oscillatoires qui rappellent le chancellement d’un homme ivre. Si c’est une technique très efficace pour passer la garde d’un adversaire par un changement soudain de direction, cela rend aussi plus difficile de parer les attaques adverses, car l’élan du spadassin tend à l’envoyer dans une direction fort prévisible. Un adversaire prudent saura en tirer profit, et apprendra à repérer le déplacement du pied qui précède un changement délibéré de position avant une attaque."
        ],
        "armes_pdf": "Sabre",
        "specialisations_pdf": [
          "Armes improvisées",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "Le chancellement de l’ivrogne lui octroie un bonus sur son ND pour être touché égal à son rang de maîtrise multiplié par 5 lorsqu’il utilise la compétence Jeu de jambes en défense passive. En outre, lorsque vous utilisez une chope ou une bouteille d’alcool dans votre seconde main, la pénalité de main non directrice disparaît. Enfin, vous recevez gratuitement l’avantage Grand buveur."
          },
          "compagnon": {
            "fluff": "Connor Hennessey a essayé de copier les techniques de combat d’autres écoles pour les incorporer à son propre style, mais il manquait de technique et sa maladresse rendait ces compétences très dangereuses. De ce fait, il décida finalement d’en faire la signature de son École.",
            "regles": "Quand le compagnon réussit une tentative de Marquer, non seulement il gagne les bonus habituels, mais il inflige également 1g1 dés de dommages, il peut également prendre des augmentations sur son jet pour les augmenter comme d’habitude. En outre, à l’aide de sa chope ou d’une bouteille comme arme improvisée, le compagnon n’a pas besoin de vérifier si l’arme s’est brisée, elle résiste toujours. Alternativement, il peut choisir de la briser volontairement pour profiter de ses angles aiguisés et donc plus dangereux."
          },
          "maitre": {
            "fluff": "Un des tours préférés de Connor Hennessey était, en plein combat, de boire au goulot de sa bouteille (ou de sa chope) puis de cracher l’alcool dans le visage de son adversaire. Il a ensuite fait de cette attaque surprise l’une des techniques de son École d’escrime.",
            "regles": "Un maître peut tenter cette manœuvre en effectuant un jet d’Attaque (Armes improvisées) avec deux augmentations contre le ND pour être touché de son adversaire. S’il réussit, l’opposant est temporairement aveuglé et est considéré comme combattant dans l’obscurité totale jusqu’à ce qu’il puisse dépenser une action pour se nettoyer les yeux."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Hirojosa",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Sabre ou rapière",
      "arme_display": "Sabre ou rapière",
      "armes_categories": [
        "Escrime (Sabre)",
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Bateleur",
        "Escrime"
      ],
      "description_courte": "Style basé sur la danse, plus exubérant que le style Aldana",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "L'adversaire subit un malus d'une augmentation à tous ses jets de défense (déstabilisation par la danse).",
        "compagnon": "\"La Vara\" : Attaque avec ND +2 augmentations. Si touche, l'adversaire perd son prochain dé d'action.",
        "maitre": "Peut utiliser les dés de Réputation comme des dés d'Héroïsme lors de duels publics."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Aldana.",
        "origine_texte": "Castille.",
        "description_longue": [
          "Le style Hirojosa est basé sur la danse, un peu comme Aldana, mais une danse plus exubérante et frénétique. On y utilise également les castagnettes ou un éventail.",
          "Les seuls spadassins plus désinvoltes que les pratiquants d’Hirojosa sont les étudiants du style Valroux, mais les deux écoles apprécient que leurs duels soient publics avec de nombreux spectateurs. Les duellistes Hirojosa aiment également être accompagnés de mariachis. En raison de l’utilisation des castagnettes ou de l’éventail, cette école est très populaire chez les Castillianes, et considérée comme “précieuse” chez les Castillians, même si le sexe n’est pas un critère de sélection.",
          "L’école Hirojosa peut facilement intimider ses adversaires à cause de sa danse rapide et énergique, du bruit de staccato de ses castagnettes ou des papillons virevoltants et colorés de son éventail. L’exhibition publique à laquelle se livrent les spadassins Hirojosa peut être encore plus déstabilisante pour leurs adversaires.",
          "La rivalité qui oppose les styles Aldana et Hirojosa est célèbre, mais s’est récemment intensifiée depuis qu’une scandaleuse rumeur prétend que l’école Aldana ne serait qu’une version abâtardie du style Hirojosa.",
          "La plus grande faiblesse du style Hirojosa est la flamboyance et la fierté qui intimident tant les adversaires. En effet, ses adeptes sont d’incorrigibles cabotins, prenant souvent des risques inconsidérés et inutiles pour faire de leur combat un divertissement inoubliable, même si cela signifie qu’ils vont laisser une ouverture dont leur adversaire pourrait profiter."
        ],
        "academies": "Malgré la haine de la famille Aldana pour cette École, elle parvint à s’installer durablement en Castille. Les membres de la roture et de la petite noblesse y voient une alternative aux écoles des grandes familles castillianes que sont Aldana, Gallegos, Soldano ou Torrès. On trouve des écoles enseignant le style Hirojosa dans les villes castillianes suivantes : Altamira, Barcino, La Pasiega, Puerto de Sur, San Eliseo, San Juan et Tarago.",
        "homologation": "1649",
        "doyen": "Juan de Hirojosa y Torres (1649)",
        "insigne": "Une main tenant une rapière pointe vers le bas à droite.",
        "armes_pdf": "Sabre ou rapière",
        "specialisations_pdf": [
          "Bateleur",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis du style Hirojosa apprennent tout d’abord à danser énergiquement et à utiliser castagnettes et éventail afin de déstabiliser leur adversaire.",
            "regles": "Ce dernier subit alors un malus d’une augmentation à toutes ses jets de défense, actives comme passives."
          },
          "compagnon": {
            "fluff": "Le compagnon apprend à effectuer la “vara”, une botte puissante et rapide, où le spadassin cherche plus à déstabiliser son adversaire qu’à lui infliger des blessures",
            "regles": ". Le ND de votre attaque est accru de deux augmentations. Par contre, si vous la réussissez, votre adversaire perd son prochain dé d’action."
          },
          "maitre": {
            "fluff": "Un maître du style Hirojosa demandera à des mariachis de venir jouer et essaiera de faire venir un maximum de monde afin de le soutenir lors de sa magnifique prestation.",
            "regles": "Il pourra alors utiliser ses dés de réputation de la même façon que ses dés d’héroïsme lors d’un duel en public (et uniquement dans ce cas-là)."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Hua Shao Ren Te",
      "origine": "combat_reclassee",
      "nations": [
        "Cathay"
      ],
      "arme": "Jian",
      "arme_display": "Jian (Épée)",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime",
        "Arts martiaux défensifs"
      ],
      "description_courte": "Style d'escrime noble et défensif, basé sur des mouvements lents et précis pour une technique parfaite.",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Épée",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": "Épée",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": "Épée",
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation Gratuite pour Défense Active avec Jeu de jambes.",
        "compagnon": "Rang gratuit en Feinte.",
        "maitre": "Fente en avant : garde les deux dés de dégâts supplémentaires (+2g2 au total)."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "academies": "L’école Hua Shao Ren Te n’est enseignée que dans la province du Han Hua.",
        "description_longue": [
          "Hua Shao Ren Te combine différentes attaques d’escrime avec des mouvements d’arts martiaux défensifs. L’épée utilisée par cette école est le jian, une arme droite à double tranchant d’une grande flexibilité, dont se servent les nobles et les érudits. Les étudiants apprennent leurs mouvements au ralenti, faisant bien attention à leurs positions afin d’éliminer toute imperfection de leur technique. En fait, la seule expérience du combat à vitesse réelle de beaucoup de pratiquants se fait sur le tas, ce qui fait que certains ont parfois du mal à s’adapter à un rythme accéléré."
        ],
        "armes_pdf": "Jian",
        "specialisations_pdf": [
          "Escrime",
          "Arts martiaux défensifs"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend les positions et les pas qui le protègeront des coups.",
            "regles": "Vous bénéficiez d’une Augmentation Gratuite pour toute Défense Active utilisant la compétence Jeu de jambes."
          },
          "compagnon": {
            "fluff": "Les compagnons maîtrisent une nouvelle position, le Mi Jian (La Main de l’Épée Secrète), dans laquelle vous pouvez étendre votre main libre pour cacher la pointe de votre épée.",
            "regles": "Votre rang dans la technique de combat Feinte est augmenté de 1 gratuitement, ce qui peut le porter éventuellement à 6. Si ce n’est pas le cas, vous pourrez plus tard le faire passer de 5 en 6 en dépensant 25 XP."
          },
          "maitre": {
            "fluff": "Les maîtres ont perfectionné le She Yan Shi (Attaque de l’Oie Sauvage en Piqué), position dans laquelle le spadassin tient son jian d’une manière et à un angle rappelant ceux d’une flèche pointée vers des oiseaux dans le ciel",
            "regles": ". Ceci lui permet de se fendre en avant et de placer tout le poids de son corps derrière sa lame. Quand vous effectuez une Fente en avant, vous gardez les deux dés de dégâts supplémentaires, passant le bonus de +2g0 à +2g2."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Kemmler",
      "origine": "combat_reclassee",
      "nations": [
        "Eisen"
      ],
      "arme": "Épée bastarde et petit écu",
      "arme_display": "Épée bastarde et petit écu",
      "armes_categories": [
        "Escrime (Épée)",
        "Boucliers"
      ],
      "specialisations": [
        "Escrime",
        "Bouclier"
      ],
      "description_courte": "Style de mercenaire défensif utilisant une épée bastarde et un grand bouclier pour parer et contre-attaquer puissamment.",
      "techniques_combat": [
        {
          "nom_base": "Charge au bouclier",
          "variante": null,
          "ref": "charge au bouclier",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité de main directrice avec épée longue + bouclier. +5 au ND équipé d'un Pavois.",
        "compagnon": "2g1 dégâts supplémentaires à l'épée longue",
        "maitre": "Dépense deux actions pour toucher plusieurs adversaires, en lançant un dès de moins de dégâts à chaque cible supplémentaire"
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Eisen.",
        "academies": "Comme Haagen, cette école de combat est enseignée au sein des compagnies de mercenaires eisenöres.",
        "description_longue": [
          "Le style Kemmler a été développé par la compagnie de mercenaires d’Heinrich Kemmler, les “Nacht Falke” (ou Faucons de la nuit) afin de mieux pouvoir se défendre contre plusieurs adversaires (situation courante dans les batailles entre armées). Le pratiquant de ce style utilise une épée bastarde dans sa main non- directrice et un grand bouclier dans sa main directrice.",
          "Ce bouclier lui sert à parer les attaques de ses adversaires (en utilisant sa taille qui lui permet d’en parer plusieurs dans le même mouvement) tout en gardant le bras de son épée armé et prêt à frapper à la moindre ouverture.",
          "Les défauts de cette technique résident dans le fait que son utilisateur manque de visibilité mais également qu’il attend, pare les attaques de ses adversaires puis frappe. Un adversaire bien informé utilisera donc le bouclier de l’utilisateur de cette école pour se cacher, prendre son temps et porter un coup rapide et puissant qu’il ne pourra éviter."
        ],
        "armes_pdf": "Épée bastarde et petit écu",
        "specialisations_pdf": [
          "Escrime",
          "Bouclier"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti du style Kemmler apprend à bien se mettre à l’abri derrière son pavois,",
            "regles": "bénéficiant ainsi d’un bonus de +5 pour son ND. De plus, il n’est pas victime de la pénalité de main non directrice lorsqu’il utilise une épée longue et un bouclier."
          },
          "compagnon": {
            "fluff": "Le compagnon du style Kemmler apprend à relâcher violemment et rapidement le bras qui tient son épée bâtarde,",
            "regles": "lui permettant d’infliger 2g1 (2 lancés mais 1 seul gardé) de dommages supplémentaires."
          },
          "maitre": {
            "fluff": "Un maître du style Kemmler trouve toute sa mesure contre plusieurs adversaires. Il peut alors utiliser la manœuvre dite “Mahd” (ou “fauchage”).",
            "regles": "Protégé par son bouclier, il fait tourner son épée bâtarde au-dessus de sa tête afin de lui faire prendre de la vitesse puis frappe d’un mouvement circulaire tous les adversaires qui l’entourent. Pour utiliser cette technique, le maître doit dépenser deux dés d’actions. Le premier adversaire touché encaisse des dégâts normaux, le second un dé lancé de moins, le troisième, deux dés de moins… jusqu’à ce qu’il n’y ait plus de dés à lancer ou d’adversaire non touché."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Kjemper",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Épée longue et rondache",
      "arme_display": "Épée longue et rondache",
      "armes_categories": [
        "Escrime (Épée)",
        "Boucliers"
      ],
      "specialisations": [
        "Bouclier",
        "Escrime"
      ],
      "description_courte": "Style basé sur la force brute pour briser les défenses, l'arme ou les os de l'adversaire.",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "épée",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Mur d'acier",
          "variante": null,
          "ref": "mur d'acier",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Epée longue une main sans pénalité. Pas de pénalité bouclier, Augmentation Gratuite Parade (bouclier).",
        "compagnon": "Peut attaquer l'arme/bouclier adverse pour la briser (Jet vs ND objet).",
        "maitre": "Garde un dé supplémentaire (+0g1) dommages épée longue."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vestenmannavnjar.",
        "description_longue": [
          "Kjemper est l’un des styles de combat les plus antiques du Vestenmannavnjar, remontant à quelques générations après la bataille entre les Runes Vivantes et le Grand Wyrm. Il a traversé les âges non seulement en raison du sens de la tradition vesten, mais également parce que sa technique est si simple.",
          "Ce modèle utilise une épée longue pour l’attaque et un bouclier rond pour la défense. Souvent, la cible des attaques d’un tel spadassin ne sera pas son ennemi, mais plutôt son arme ou son bouclier. Les spadassins Kjemper prennent plaisir à briser les armes de leur adversaire avant de continuer leurs assauts. Quand il doit faire face à un adversaire violent et agressif, l’épéiste Kjemper se réfugie derrière son bouclier. Lorsque son ennemi s’est épuisé, il contre-attaque avec son bouclier et poursuit avec une grande série de coups d’épée. Si son adversaire chute, il n’hésitera pas à le frapper à terre d’un coup cruel.",
          "La faiblesse du style Kjemper repose sur le fait que le spadassin se concentre sur l’élimination des menaces ennemies (armes, boucliers, etc.) plutôt que de devenir lui-même une menace pour son ennemi."
        ],
        "academies": "Kjemper n’est enseignée que dans les îles vestens. Il faut se rendre sur place pour recevoir son enseignement.",
        "homologation": "1668",
        "doyen": "Ingegerdr Thorgaut (1668)",
        "insigne": "Une épée longue tournée vers le bas devant un bouclier.",
        "armes_pdf": "Épée longue et rondache",
        "specialisations_pdf": [
          "Escrime",
          "Bouclier"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis Kjemper apprennent l’art de manier simultanément un bouclier et une épée longue.",
            "regles": "Vous pouvez utiliser une épée longue d’une seule main sans pénalité. Vous n’avez aucune pénalité pour l’utilisation d’un bouclier en sus de l’épée longue, et vous obtenez une augmentation gratuite lorsque vous parez activement avec votre bouclier."
          },
          "compagnon": {
            "fluff": "Lorsque le spadassin devient compagnon, il apprend à briser le matériel de son adversaire.",
            "regles": "Vous pouvez utiliser votre épée longue pour essayer de briser l’équipement de votre adversaire, en particulier les boucliers et les armes d’escrime, d’un coup puissant. Effectuez un jet de Finesse + Attaque (Arme lourde) pour frapper l’objet, avec un ND égal au ND pour toucher votre adversaire avec deux augmentations. Si vous réussissez, effectuez un jet de dommages contre cette arme. Pour que l’objet casse, vos dommages doivent être supérieurs à un ND défini par le type d’équipement à détruire. Cette attaque spéciale ne peut être parée avec l’arme ciblée, à moins de vouloir que l’objet en question soit touché automatiquement. Chaque augmentation supplémentaire prise sur le ND pour toucher l’objet aura pour conséquence de lancer un dé supplémentaire au jet de dommages (+1g0). Armes d’escrime – 25 ; Couteaux, dagues & mains-gauches – 25 ; Armes lourdes – 35 ; Boucliers – 30 ; Autres armes – à la discrétion du MJ, mais au moins 40. Ces ND sont à ajuster avec les modificateurs suivants : +5 pour un équipement de bonne qualité ; -5 pour un équipement de médiocre qualité ; +15 pour un équipement en Dracheneisen."
          },
          "maitre": {
            "fluff": "Des années à faire virevolter une arme lourde vous ont appris à envoyer des coups violents capables de briser facilement boucliers et ennemis.",
            "regles": "Vous obtenez un dé lancé gardé supplémentaire (+1g1) à vos dommages infligés avec une épée longue."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Kulachniy Boi",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Ussura"
      ],
      "arme": "Mains nues ou gants de combat",
      "arme_display": "Mains nues ou gants de combat",
      "armes_categories": [
        "Pugilat",
        "Gant de combat"
      ],
      "specialisations": [
        "Pugilat",
        "Gant de combat"
      ],
      "description_courte": "Style à mains nues, ou avec des gants et canons d'avant-bras pour affronter les lames.",
      "techniques_combat": [
        {
          "nom_base": "Prise de Bras",
          "variante": "Gant de combat",
          "ref": "prise de bras",
          "source": "docx_v2"
        },
        {
          "nom_base": "Corps à Corps",
          "variante": "Gant de combat",
          "ref": "corps a corps",
          "source": "docx_v2"
        },
        {
          "nom_base": "Force d'âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "docx_v2"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Peut attaquer avec les Rukavitsa avec sa compétence de Pugilat. Augmentation gratuite sur les tests de Duperie visant à dissimuler vos armes. Si vous attaquez un adversaire qui n'est pas conscient que vous portiez des rukavitsa, celui-ci ne peut pas effectuer d'action de défense active contre cette première attaque s’il porte une arme.",
        "compagnon": "Lorsque vous effectuez une action de Parade contre une attaque d'arme blanche, vous pouvez ajouter votre score de Gaillardise comme bonus à votre total de Parade.",
        "maitre": "Vous pouvez dépenser 2 Actions pour porter un unique coup de poing d'une puissance inouïe. Effectuez une action d'Attaque (Pugilat). Si cette attaque réussit, elle inflige la moitié des dégâts(arrondi au supérieur) mais votre adversaire est si secoué et sonné par l'impact qu'il perd l’action de sa prochaine Phase."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Le kulachniy boi (ou « pugilat ») est la plus répandue des formes de duel ussuran. Elle consiste simplement à donner des coups à l'aide de ses poings. Les Duellistes adoptent le kulachniy boi pour des raisons aussi bien pratiques que cérémonielles. Lors des jours fériés ussurans, les duellistes se rencontrent et combattent en veillant à ne pas provoquer de blessure durable. Après tout, les gens se sont rassemblés pour faire la fête. Les choses changent quand un pratiquant de kulachniy boi voyage à travers le monde, où son savoir peut faire la différence entre la vie et la mort. Il porte alors des gants et des canons d'avant-bras en métal, appelés rukavitsa, qui lui permettent d'infliger de plus gros dégâts tout en maintenant l'apparence d'un duel sans arme. La principale faiblesse du Kulachniy Boi est son manque d'allonge. Le pratiquant doit constamment chercher à combler la distance pour être efficace. Un adversaire armé d'une arme plus longue (rapière, lance, etc.) qui parvient à maintenir le duelliste à distance aura un avantage tactique considérable."
        ],
        "origine_texte": "Ussura",
        "armes_predilection": "Poings nus ; rukavitsa (gants et canons d'avant-bras en métal) en voyage",
        "academies": "Ussura ; pratiqué à mains nues lors des fêtes (sans blessure durable), et avec rukavitsa lorsque le duelliste voyage et que sa vie en dépend",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti apprend à se rapprocher et casser la distance efficacement contre la plupart de ses adversaires qui utiliseront une lame et son allonge contre lui. Lorsqu'il subit une attaque d'opportunité de la part d'une cible armée lors qu'il se rapproche d'elle, il peut utiliser une Défense Active de Parade(Gant de combat) sans dépenser de dès d'action. Il bénéficie aussi d'une augmentation gratuite aux jets de Dissimulation pour les dissimuler. Un adversaire armé qui ignore qu'il porte des rukavitsa (donc aucune attaque ou parade faite avec) ne peut pas effectuer de défense active contre sa première attaque"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Lorsqu'il est équipé de ses gants de combat, le compagnon ajoute sa Gaillardise à sa Défense Passive et au résultat de son test de Défense active de Parade(Gant de combat)"
          },
          "maitre": {
            "fluff": null,
            "regles": "Lorsque le maître inflige une Blessure Grave au Pugilat, l'adversaire est si sonné qu'il perd l'action de sa prochaine Phase"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "La Guêpe",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Fleuret",
      "arme_display": "Fleuret",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Réservé aux femmes, le style privilégie vitesse, habileté et attaques sournoises",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Jet d’opposition d’Esprit contre Détermination de son adversaire. Si elle l’emporte, elle bénéficie d’un nombre d’augmentations gratuites égal à son Esprit qu’elle doit utiliser dans le round.",
        "compagnon": "Peut attaquer autant de fois qu’elle le veut avec un seul dé d’action mais aura deux dés lancés de moins sur ses attaques et dommages par attaque supplémentaire.",
        "maitre": "Augmente son Esprit de un rang, pouvant atteindre 6."
      },
      "restriction_creation": "libre",
      "genre_restriction": "femmes",
      "details": {
        "origine_texte": "Montaigne.",
        "description_longue": [
          "Le style de la guêpe (de la “guêpière” pour leurs détracteurs masculins) enseigne à ses pratiquantes à utiliser leur vitesse et leur habileté, alliées à des attaques sournoises et des mouvements troublants pour un homme normalement constitué. En faisant usage d’habiles coups de pied, de feintes rapides et de ruses féminines, les guêpes parviennent à embrouiller leurs adversaires, et à leur asséner de multiples attaques handicapantes.",
          "Beaucoup de femmes souhaitent intégrer cette école, mais peu sont élues en raison du caractère bien trempé que la pratique du fleuret réclame. Toutes les femmes ne sont pas capables de tuer quelqu’un ou de supporter la vue du sang. C’est un style de combat efficace contre les hommes, même s’il peut arriver qu’une guêpe tombe sur un spadassin particulièrement habile ou à la faible moralité (qui ne retiendrait pas ses coups contre une “faible” femme) et qui n’hésiterait pas à faire usage de sa force masculine. Bien sûr, une guêpe qui se retrouverait face à une autre femme perdrait une bonne partie de ses avantages. Ce sont là ses principales faiblesses."
        ],
        "academies": "En 1660, on pouvait trouver des écoles enseignant ce style à Carleon, en Avalon, La Cité du Vaticine et San Christobal en Castille, à Charousse et Pau en Montaigne, à Kirk en Vendel et à Gottkirchen en Eisen. Puis d’autres écoles ouvrirent dans quelques autres grandes villes pour se stabiliser autour d’une quinzaine, on les trouve à Arisan, Buc, Muguet et Crieux en Montaigne ; à Balroux Dawns en Avalon ; à Västeras en Vendel ; à la Reina del Mar et Rioja en Castille ; et finalement à Freiburg en Eisen. Aucune école n’a ouvert ses portes en Vodacce pour la simple raison que les princes marchands s’y opposent. Les femmes n’ont normalement pas accès aux métiers des armes en Vodacce, elles doivent rester à leur place : stregha della sorte, courtisane ou sanzavista, un point c’est tout. L’Inismore et les Marches des Highlands n’en possèdent également pas, pour la raison évidente que les femmes sont souvent aussi solides que les hommes. Enfin, il y a très peu d’écoles en Eisen pour les mêmes raisons. Seules les femmes peuvent apprendre le style de la guêpe.",
        "homologation": "1653",
        "doyen": "Anne-Mélusine Huon de Camerzine (1653)",
        "insigne": "Une guêpe tournée vers la droite.",
        "armes_pdf": "Fleuret",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "genre_restriction": "femmes",
        "niveaux": {
          "apprenti": {
            "fluff": "Le style de la guêpe enseigne à ses apprenties à utiliser leur cerveau et leur vivacité d’esprit, à être plus fines que leurs adversaires et à se mettre plus rapidement en position de garde. S’adapter ou mourir pourrait être leur devise.",
            "regles": "Ainsi, une apprentie peut-elle effectuer un jet d’opposition d’Esprit contre Détermination de son adversaire. Si elle l’emporte, elle bénéficie d’un nombre d’augmentations gratuites égal à son Esprit qu’elle doit utiliser dans le round."
          },
          "compagnon": {
            "fluff": "Les compagnes apprennent à frapper un très grand nombre de fois leur adversaire en une seule attaque afin de lui infliger de multiples coupures et de l’acculer au défaitisme.",
            "regles": "Une compagne peut attaquer autant de fois qu’elle le veut avec un seul dé d’action mais aura deux dés lancés de moins sur ses attaques et dommages par attaque supplémentaire. Par exemple, Hermine peut lancer 7g4 en Attaque et infliger 5g2 de dommages ; mais elle peut choisir d’attaquer deux fois à 5g4 en infligeant 3g2 de dommages ou trois fois à 3g3 en infligeant 1g1 de dommages. Par contre, le jet de blessure de son adversaire se fera de façon globale après l’addition de la totalité des dommages infligés par ces coupures."
          },
          "maitre": {
            "fluff": "Les maîtresses escrimeuses du style de la guêpe apprennent à étudier chaque aspect de leur situation présente, à la manière d’un joueur d’échecs ; toute action entraîne une réaction prévisible qu’il suffit de prévoir pour déterminer la parade la plus appropriée… Alors que les hommes se battent essentiellement à l’aide de leur instinct, les maîtresses de la guêpe utilisent la logique dans les duels.",
            "regles": "Aussi, une maîtresse peut-elle augmenter son Esprit de un rang, pouvant faire passer ce trait à 6, voire 7 avec certains avantages."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "La Pointe au Coeur",
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
        "Courtisan"
      ],
      "description_courte": "Style alliant le duel physique à l'Intrigue",
      "techniques_combat": [
        {
          "nom_base": "Ballestra",
          "variante": null,
          "ref": "ballestra",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "En dépensant un dé d’héroïsme, peut utiliser le système de répartie en plus d’une action normale contre son adversaire : il peut attaquer/parer et en même temps l’intimider, le provoquer ou… le charmer.",
        "compagnon": "S’il réussit un jet d’opposition d’Esprit, il peut obliger son adversaire à le suivre. L’adversaire du héros se voit alors infliger (rang d’Esprit du Compagnon) augmentations à tous ses ND.",
        "maitre": "Gagne deux augmentations gratuites sur toutes ses compétences de Courtisan. De plus, il bénéficie, à chaque tour, d’un nombre de dés lancés gardés à affecter à n’importe quelle action (jet d’attaque, de défense ou de dommages) égal à son rang de Panache."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Aldana ou Valroux, 15 PP si vous possédez les deux.",
        "origine_texte": "Montaigne.",
        "description_longue": [
          "Fondée en 1665 par Camille de Bascone, maître de Valroux, cette école a pour but avoué d’élever le duel au rang d’un art à part entière. Le style “la pointe au cœur” est un mélange flamboyant des techniques de spadassin de Valroux et de la virtuosité impressionnante et harmonieuse d’Aldana. Les élèves de l’école apprennent à déstabiliser leurs adversaires par des mouvements théâtraux, à les pousser à l’erreur à la fois par le verbe et la lame, ce qui fait qu’en peu de temps, les duellistes de la pointe au cœur sont devenus la coqueluche de nombre de courtisans de Charousse. Et quoi de plus humiliant pour un adversaire que de se voir désarmé et blessé avec sa propre rapière ?",
          "Les spadassins de la pointe au cœur sont rapides, très rapides mais leur principale faiblesse réside dans leur passion du duel : ils ont tendance à tout oublier lorsqu’ils pratiquent leur art et quelqu’un qui le sait peut très bien en profiter de ça pour terminer en une passe efficace un duel prévu pour durer, durer, durer…"
        ],
        "academies": "Comme cette École vient juste d’être reconnue, elle ne compte pas encore beaucoup d’académies l’enseignant. En fait, il n’y en a que deux, la première est à Bascone, bien entendu, et la seconde à Charousse.",
        "homologation": "1666",
        "doyen": "Camille de Bascone (1666)",
        "insigne": "Une rapière devant un chapeau montaginois à grande plume, la garde de la rapière en bas à droite et sa pointe en haut à gauche.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Escrime",
          "Courtisan"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti ne cesse de deviser en combattant.",
            "regles": "En dépensant un dé d’héroïsme, l’apprenti peut utiliser le système de répartie en plus d’une action normale contre son adversaire : il peut attaquer/parer et en même temps l’intimider, le provoquer ou… le charmer."
          },
          "compagnon": {
            "fluff": "Le compagnon a appris à entraîner ses adversaires dans des passes d’armes de plus en plus spectaculaires et risquées.",
            "regles": "S’il réussit un jet d’opposition d’Esprit, il peut obliger son adversaire à le suivre. L’adversaire du héros se voit alors infliger (rang d’Esprit du Compagnon) augmentations à tous ses ND."
          },
          "maitre": {
            "fluff": "Un maître de l’école de la pointe au cœur a parfaitement compris la signification de la devise de l’école (“Ce qui compte dans un duel, ce n’est pas de gagner, c’est… le Panache !”) et a élevé l’escrime au rang d’un véritable art, au point que lorsqu’il se déplace, tous les regards convergent vers lui quand il le désire ( Lorsqu’il se bat en duel, c’est un véritable tourbillon de verve, de grâce et d’efficacité.",
            "regles": "lui permettant de gagner 2 points de réputation supplémentaires à chacun de ses duels publics). En termes de jeu, un maître gagne deux augmentations gratuites sur toutes ses compétences de Courtisan. De plus, il bénéficie, à chaque tour, d’un nombre de dés lancés gardés à affecter à n’importe quelle action (jet d’attaque, de défense ou de dommages) égal à son rang de Panache."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Larsen",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Lanterne et rapière",
      "arme_display": "Lanterne et rapière",
      "armes_categories": [
        "Atypique / Accessoire",
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Escrime",
        "Malandrin"
      ],
      "description_courte": "Style profitant de l'obscurité en combattant avec une lanterne",
      "techniques_combat": [
        {
          "nom_base": "Aveuglement",
          "variante": null,
          "ref": "aveuglement",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Parade",
          "variante": "Lanterne",
          "ref": null,
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice (Parade Lanterne). Avantage Entraînement nocturne.",
        "compagnon": "Pénalités obscurité réduites. Action pour éblouir (Esprit + Feinte vs Esprit) : augmente dés d'action adverses du nombre d'augmentations.",
        "maitre": "Plus de malus pénombre. ND pour être touché +10 (pénombre) / +15 (noir total)."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Ligue de Vendel.",
        "description_longue": [
          "L’école de Larsen est le style d’escrime couramment utilisée par le guet de nuit de Kirk, mais également par quelques criminels et brigands de cette ville. L’école enseigne à ses élèves à tirer profit de l’obscurité, mais aussi à confondre leurs adversaires en ouvrant et en refermant le volet d’une lanterne vive (ils se servent ainsi souvent d’une lanterne de combat). Le faisceau soudain et dansant de lumière distrait l’adversaire, ce qui permet à l’élève de passer ses défenses.",
          "La faiblesse du style Larsen réside dans le fait que ses élèves ont tendance à frapper là où leur lanterne est braquée, ce qui les rend quelque peu prévisibles."
        ],
        "academies": "Deux écoles Larsen existent aujourd’hui : la première est à Kirk et la seconde à Västeras. La Reine Élaine a également dépêché un message auprès de Lydia afin qu’elle ouvre une école à Carleon. Jusqu’ici, Lydia ne sait pas si elle doit accepter ou non.",
        "homologation": "1668",
        "doyen": "Ralf Larsen (1668), Lydia Larsen (1669)",
        "insigne": "Une rapière passée dans l’anneau d’une lanterne placée en haut à droite de l’insigne.",
        "armes_pdf": "Lanterne et rapière",
        "specialisations_pdf": [
          "Escrime",
          "Malandrin (la compétence avancée Guet- apens passe compétence de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école Larsen s’entraînent au combat de nuit et toutes leurs techniques sont étudiées pour ces batailles nocturnes.",
            "regles": "Ainsi, ils bénéficient d’une augmentation de bonus sur tous leurs jets de compétences et de techniques de combat lorsqu’ils combattent de nuit et, à l’inverse, d’une augmentation de malus sur les mêmes compétences s’ils se battent de jour. Ensuite, vous pouvez ajouter votre rang en Parade (lanterne) à votre défense passive lorsque vous avez recours à un falot. En outre, vous gagnez l’avantage Entraînement nocturne."
          },
          "compagnon": {
            "fluff": "Vous vous sentez plus à l’aise dans l’obscurité.",
            "regles": "Réduisez les pénalités susmentionnées à –1g0 dans la pénombre et à – 1g1 dans le noir total. En outre, vous avez perfectionné la botte visant à éblouir votre adversaire à l’aide de l’éclat de votre lanterne. Pour éblouir quelqu’un, vous devez utiliser une action et effectuer un jet d’Opposition d’Esprit + Feinte contre l’Esprit de votre adversaire. En cas de réussite, augmentez tous ses dés d’action restant du nombre d’augmentations utilisées sur le jet. Tous les dés d’action franchissant le seuil de 10 sont perdus."
          },
          "maitre": {
            "fluff": "Toute une vie passée dans la pénombre permet aux maîtres de l’école Larsen de ne faire plus qu’un avec la nuit.",
            "regles": "Vous n’êtes plus victime d’un quelconque malus dans la pénombre mais être tout de même pénalisé de –1g1 dans le noir total. En outre, les ombres deviennent presque une armure pour vous. Le ND pour être touché d’un maître augmente de +10 dans la pénombre et de +15 dans l’obscurité totale."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Leegstra",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Hache de bataille ou Épée à deux mains",
      "arme_display": "Hache de bataille ou Épée à deux mains",
      "armes_categories": [
        "Haches",
        "Épées à 2 mains"
      ],
      "specialisations": [
        "Hache OU Épée 2 mains",
        "Lutte"
      ],
      "description_courte": "Style lent destiné à encaisser les coups pour porter des coups puissants",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Épée 2 Mains",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "fente en avant",
          "variante": "Épée 2 Mains",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée 2 Mains",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Peut renoncer à des dés d'action pour garder des dés de dommages supplémentaires (armes lourdes).",
        "compagnon": "Peut renoncer à des dés d'action pour garder des dés de Gaillardise supplémentaires sur jet de blessure.",
        "maitre": "Si adversaire rate jet de blessure (vs armes lourdes), +1 blessure grave par tranche de 10 pts sous le ND."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vestenmannavnjar et Ligue de Vendel.",
        "description_longue": [
          "Cette technique n’est pas tant un style de combat qu’une manifestation de volonté ou une certaine forme de philosophie. Cette technique, qui s’adresse plus particulièrement aux héros équipés d’une arme lourde, comme une épée large ou une hache, fait peu de cas de la sécurité de celui qui la pratique.",
          "On compare souvent le guerrier qui utilise cette technique à un glacier : se déplaçant lentement, ignorant les coups qu’il reçoit et, en définitive, impossible à arrêter. L’élève apprend à encaisser des coups qui tueraient un homme plus faible et à concentrer toute sa puissance dans un coup unique mais mortel. De nombreux récits évoquent ces guerriers, capables de décapiter un adversaire d’un simple mouvement de poignet.",
          "Le défaut principal de cette technique, ainsi que pourra vous l’apprendre n’importe quel élève la connaissant un peu, c’est sa lenteur. La plupart des spadassins combattent ces guerriers comme n’importe quel autre adversaire, commençant par éprouver leurs défenses par quelques petits coups d’estoc. Ils découvrent avec surprise, mais généralement trop tard, que les maîtres Leegstra n’évitent pas ces premiers coups pour porter un seul coup dévastateur. La solution consiste donc à être rapide et efficace. Un adversaire avisé visera au cœur ou à la tête, avant de se mettre à distance sur-le- champ."
        ],
        "academies": "On trouve ainsi des écoles enseignant le style Leegstra dans toutes les villes et bourgs de Vendel, ainsi que dans tous les villages un tant soit peu important du Vestenmannavnjar.",
        "homologation": "1644",
        "doyen": "Hrodgeir (1644)",
        "insigne": "Une épée bâtarde pointant vers le bas.",
        "armes_pdf": "Hache de bataille ou Épée à deux mains",
        "specialisations_pdf": [
          "Hache à deux mains OU Épée à deux mains",
          "Lutte"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend tout d’abord à concentrer la puissance des coups qu’il donne avec des armes lourdes.",
            "regles": "Vous pouvez choisir de ne pas utiliser de dés d’action afin de garder des dés de dommages supplémentaires, en espérant que le coup de votre héros porte. Vous pouvez renoncer à utiliser autant de dés d’action que vous le désirez (un dé de dommage pour un dé d’action non utilisé). Vous devez déclarer votre intention avant de faire votre jet d’attaque ; si vous le ratez, vous perdez les dés d’action sacrifiés."
          },
          "compagnon": {
            "fluff": "Le compagnon apprend à ignorer des blessures qui pourraient tuer des hommes plus faibles.",
            "regles": "Vous pouvez choisir de ne pas utiliser des dés d’action afin de garder des dés de Gaillardise supplémentaires lors d’un jet de blessure. Vous pouvez renoncer à utiliser autant de dés d’action que vous le désirez (un dé de Gaillardise pour un dé d’action non utilisé). Vous devez déclarer votre intention avant de faire votre jet de blessure ; si vous le ratez, vous perdez les dés d’action sacrifiés."
          },
          "maitre": {
            "fluff": "Le maître a appris à infliger des blessures terribles avec son arme lourde.",
            "regles": "Votre héros touche son adversaire en faisant appel à la compétence : Attaque (Hache à deux mains OU Épée à deux mains) ; si son adversaire rate son jet de blessure, il subit une blessure grave, plus une blessure grave par tranche supplémentaire par tranche de 10 points sous le ND de son jet, un peu comme s’il avait été touché par une arme à feu."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Les Cadets",
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
        "Combat de rue",
        "Escrime(Rapière)"
      ],
      "description_courte": "Style militaire montaginois pragmatique à la rapière, alliant l'autorité du grade, la déstabilisation verbale de l'adversaire et une fraternité d'armes indéfectible.",
      "techniques_combat": [
        {
          "nom_base": "Corps à Corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Coup d'épaule",
          "variante": null,
          "ref": "coup d'epaule",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Prise de bras",
          "variante": null,
          "ref": "prise de bras",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Montaigne.",
        "description_longue": [
          "Le style des Cadets est totalement adapté au combat militaire : très pragmatique et le plus efficace possible. L’esthétique, l’élégance ou l’apparat, toutes ces choses, les Cadets les laissent aux Vodaccis ou aux Castillians.",
          "Seul les nobles ou les gentilshommes sont admissibles aux Cadets. Les étrangers sont tolérés, mais les candidats sont malgré tout peu nombreux. Cependant, il ne suffit pas d’être nommé par le directeur de l’école pour en faire réellement partie, encore faut-il être accepté par les Cadets eux-mêmes. Pour cela, le futur élève doit passer une série d’épreuves ; citons par exemple, tenir debout après avoir bu deux litres de vin, se battre à fleuret moucheté les yeux bandés contre un autre prétendant, aller par les rues de la ville et parvenir à se faire provoquer en duel au moins deux fois…"
        ],
        "academies": "L’unique centre de formation est situé au cœur de la capitale de Montaigne, dans le bâtiment où sont logés les soldats du corps des Cadets. L’enseignement y dure deux années complètes, période pendant laquelle l’élève est considéré comme faisant partie du corps des Cadets, et par conséquent susceptible d’être envoyé sur le terrain. Une fois l’an, une grande confrontation “amicale” est organisée contre le corps rival des mousquetaires du roi. La rivalité entre les deux régiments est légendaire en Montaigne.",
        "homologation": "1651",
        "doyen": "Paul Tutin (1668)",
        "insigne": "Une rapière pointée vers le haut, sur fond d’une décoration militaire.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Combat de rue",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un apprenti Cadet possède automatiquement un certain rang militaire. Quoi qu’il en soit, un Cadet, même ne faisant pas partie du corps, possède une aura militaire certaine qui lui ouvre de nombreuses portes.",
            "regles": "Il est considéré comme un sergent (équivalent à l’avantage Office : connétablie à 2 PP). Si l’apprenti ne fait pas partie du corps des Cadets et qu’il a simplement assisté aux cours de l’école, ce grade est honorifique mais peut être effectif en temps de guerre."
          },
          "compagnon": {
            "fluff": "Le compagnon Cadet a une fâcheuse capacité à distraire considérablement ses adversaires. Il peut, par exemple, réciter un poème, hurler une chanson à boire ou tout simplement déverser un flot continu de paroles à propos de tout et n’importe quoi, et cela en combattant avec son efficacité coutumière.",
            "regles": "Les adversaires d’un compagnon Cadet retirent un dé lancé et gardé à leurs jets d’attaque et de parade active, à moins qu’ils n’aient bouché leurs oreilles au préalable."
          },
          "maitre": {
            "fluff": "Un maître Cadet est vénéré par tous les autres Cadets. Ils sont tous prêts à mourir pour lui sans aucune hésitation.",
            "regles": "Un maître est capable de rassembler une troupe de 3D10 Cadets en moins de deux jours. Ce délai peut être plus long si le maître se trouve hors de Montaigne et plus court s’il se trouve dans la capitale de Montaigne."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Keiferhund",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Panzerfaust",
      "arme_display": "Panzerfaust",
      "armes_categories": [
        "Gant de combat"
      ],
      "specialisations": [
        "Athlétisme",
        "Panzerfaust"
      ],
      "description_courte": "Comme Eisenfaust, ce style utilise la Panzerfaust pour briser les armes, mais également pour frapper les ennemis et les déséquilibrer.",
      "techniques_combat": [
        {
          "nom_base": "Corps à Corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les Faiblesses",
          "variante": "Gant de combat",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice (panzerfaust). +1g0 dommages par rang de Maîtrise avec panzerfaust.",
        "compagnon": "Peut utiliser Désarmer sans attendre échec défense passive (pénalité -10). Si échec, ND touché passe à 5.",
        "maitre": "Utilise Lier (Panzerfaust) en défense. Si défense active réussie, arme liée + Dé d'Action supp. immédiat."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "academies": "Il faut appartenir aux Wachhunde pour pouvoir recevoir l’enseignement de l’école Keiferhund.",
        "description_longue": [
          "Le style de combat Keiferhund est originaire de la ville eisenöre de Freiburg. Dans une ville de 600 000 habitants où le credo est “aucune question”, il vaut mieux ne pas s’aventurer dans les quartiers les plus sordides. Face au chaos, deux groupes luttent pour assurer la sécurité du peuple. Le premier étant les Chevaliers de la Rose et la Croix et l’autre les Wachhunde ou “chien de garde”. Ces derniers s’arment d’un panzerfaust dans chaque main. Ayant vu nombre d’atrocités durant la guerre de la Croix, les Wachhunde ne cherchent pas à tuer leurs adversaires. Ils ont développé un style de combat unique visant à neutraliser leur ennemi sans le tuer.",
          "La plus grande faiblesse du style de Keiferhund ou “mâchoire de chien” est sans doute sa retenue pour éviter de tuer l’adversaire. Un spadassin averti saura donc tirer parti de cet avantage, sachant que l’on ne cherche absolument pas à le tuer et prendra des risques totalement insensés."
        ],
        "armes_pdf": "Panzerfaust",
        "specialisations_pdf": [
          "Gant de combat",
          "Lutte"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’essentiel est de ne pas tuer l’adversaire. Un apprenti ne peut pas tuer par accident, seulement mettre hors de combat. Il peut bien sûr achever son adversaire, mais un MJ équitable se devra alors de pénaliser cet assassin justement.",
            "regles": "Le MJ doit dépenser un dé d’héroïsme s’il veut que l’adversaire du joueur utilisant cette technique meure sur le coup ; le joueur peut d’ailleurs contrer le MJ en dépensant lui-même l’un de ses dés d’héroïsme. De plus, le spadassin ne subit pas de malus quant à l’utilisation concomitante de deux Panzerfaust. Enfin, il peut acheter l’avantage Garde de Fer, La Garde de Freiburg pour seulement 2 PP au lieu de 4."
          },
          "compagnon": {
            "fluff": "Les compagnons peuvent “charger” leurs adversaires.",
            "regles": "S’ils réussissent une attaque de Corps à corps, ils peuvent effectuer une prise sans dépenser de dé d’action. Il faut cependant que le compagnon bénéficie d’espace pour prendre son élan (à la discrétion du MJ)."
          },
          "maitre": {
            "fluff": "Au cœur du combat, avec ses coups fulgurants et son style de combat particulier, un maître est impressionnant à voir.",
            "regles": "Il gagne un dé d’héroïsme par adversaire mis hors de combat au round précédent. Ces dés disparaissent à la fin du combat. De plus, on ne peut avoir plus de dés additionnels que son rang en Détermination. Face à une bande de brutes, la maîtrise du Keiferhund est dévastatrice."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Lucani",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Épée large",
      "arme_display": "Épée large",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime",
        "Pugilat"
      ],
      "description_courte": "Style agressif où le duelliste attaque avec une épée large d'une main et son poing de l'autre",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Coup de pommeau",
          "variante": "Épée 2 Mains",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Épée 2 Mains",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée 2 Mains",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Epée large une main sans pénalité. Augmentation Gratuite Défense Active avec Jeu de jambes.",
        "compagnon": "Rang gratuit Corps à corps. Augmentation Gratuite sur attaques Pugilat.",
        "maitre": "Dé d'Action pour attaque combinée (Direct + Epée). ND +5 pour chaque."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Yesukai.",
        "origine_texte": "Vodacce.",
        "description_longue": [
          "Les Lucani ont développé leur style autour du yatagan utilisé par les mercenaires kosars que l’on trouvait sur leurs terres. Ensuite, cette école s’ouvrit non seulement aux membres de la famille Lucani, mais également à leurs soldats aussi bien qu’à leurs domestiques.",
          "La famille Lucani enseigne aujourd’hui son style à toute personne capable d’en payer les modestes honoraires, et a réussi à garder sa spécificité même après la mort de son prince. Ce style, qui n’est pas particulièrement à la mode en Vodacce, fait appel à l’utilisation d’une épée large dans une main et d’un poing fermé dans l’autre, attaquant avec l’un ou l’autre. Il est très agressif et énergique, et ne cherche pas à éviter le contact corporel avec l’ennemi.",
          "Si cela peut se révéler un avantage déterminant, l’ardeur avec laquelle les spadassins de l’école Lucani se précipitent sur leurs ennemis peut les mener à leur perte."
        ],
        "academies": "On peut trouver des écoles Lucani dans les villes de Guarre de Puertofino, Sant’Andrea, et Gorivari. Aucun autre prince vodacci n’a voulu d’écoles enseignant ce style sur ses terres. Seuls les Castillians, les cavaliers de l’École Gustavo en particulier, se sont montrés intéressés, surtout depuis la disparition du prince Lucani et le fait que ce style est maintenant enseigné à quiconque peut payer la formation. Malheureusement, pour le moment, cet intérêt n’est pas suffisant pour justifier l’ouverture d’une École.",
        "homologation": "1645",
        "doyen": "Menandro di Lucani (1645)",
        "insigne": "Un poing brandissant une épée bâtarde dont on ne voit que la garde.",
        "armes_pdf": "Épée large",
        "specialisations_pdf": [
          "Escrime",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’école Lucani enseigne tout d’abord à ses étudiants à utiliser leur épée pour attaquer et leur jeu de jambes pour se défendre.",
            "regles": "Vous pouvez utiliser une épée large d’une seule main sans aucune pénalité, et vous ne tenez plus compte de la pénalité de 2 augmentations lorsque vous effectuez une défense active avec la compétence Jeu de Jambes."
          },
          "compagnon": {
            "fluff": "Le corps d’un compagnon Lucani est une arme presque aussi dangereuse que son épée large.",
            "regles": "Vous obtenez un rang supplémentaire dans votre compétence Corps à corps, ce qui peut vous amener au rang 6. Si tel n’est pas le cas, vous pourrez, plus tard, augmenter votre rang dans cette compétence de 5 à 6. Vous obtenez également une augmentation gratuite pour toutes les actions offensives effectuées avec l’entraînement Pugilat (Attaque, Direct et Uppercut) en raison de la vivacité de vos réactions corporelles."
          },
          "maitre": {
            "fluff": "Un maître de l’école Lucani a appris à attaquer successivement avec son épée large puis son poing, par mouvements rapides et saccadés.",
            "regles": "Vous dépensez un dé d’action pour effectuer cette combinaison d’attaques, qui peut être un coup de poing suivi d’une attaque à l’épée ou inversement. Quand vous effectuez une telle attaque, vous utilisez la compétence Direct pour l’assaut au poing puis Attaque (Arme lourde) pour celui à l’épée. Le ND pour toucher votre adversaire est alors augmenté de +5 au lieu de +10."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Mac Donald",
      "origine": "officielle",
      "nations": [
        "Marches des Highlands"
      ],
      "arme": "Claymore",
      "arme_display": "Claymore",
      "armes_categories": [
        "Épées à 2 mains"
      ],
      "specialisations": [
        "Épée 2 mains",
        "Athlétisme"
      ],
      "description_courte": "Style agressif privilégiant les énormes dégâts de la Claymore",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "Épée 2 Mains",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "fente en avant",
          "variante": "Épée 2 Mains",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Épée 2 Mains",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée 2 Mains",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Ignore pénalité d'un dé au jet d'attaque (claymore).",
        "compagnon": "Peut mettre de côté dés d'attaque avant le jet. Si touche, ajoute ces dés aux dommages (lancés non gardés).",
        "maitre": "Jette et garde un dé supplémentaire dommages claymore (4g3)."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Marches des Highlands.",
        "description_longue": [
          "Les Mac Donald comptent parmi les plus redoutables guerriers des Marches des Highlands. Leurs énormes claymores inspirent la peur à leurs adversaires. Un seul coup d’un Mac Donald entraîné peut couper un homme en deux.",
          "Le style Mac Donald est sauvage et imprévisible. Les membres de ce clan ont la réputation de ne pas tenir compte de leur propre sécurité et d’opter pour une tactique tellement offensive que leurs ennemis n’ont pas le temps de penser à porter un coup.",
          "La principale faiblesse du style Mac Donald réside dans son manque de finesse. Ses élèves préfèrent se ruer comme des brutes au combat, et un adversaire agile et rusé parviendra à les épuiser lentement – tant qu’il n’offre au Highlander aucune ouverture.",
          "Un simple coup peut en effet tuer, et tout ce dont un spadassin de l’école Mac Donald a besoin, c’est une simple ouverture."
        ],
        "academies": "Il y a des écoles qui enseignent le style McDonald dans toutes les Marches des Highlands (Avinloch, Banith Fal, Connickmoor (2), Dunbalafrig, Duncaithe, Dun Nirith, Dunscaly, Dunscanbys, Dun Torcunill (2), Dun Vahl, Eirainay (2), Kirkwall (4), Lintonholm, Loch Borralon, et Nyovn Loch). Avec la réconciliation récente entre l’Avalon et les Highlands, la reine Élaine a demandé au clan McDonald d’ouvrir une école à Carleon. Comme le style se développait, les McDonald ont ouvert plusieurs autres écoles dans les villes voisines. Même si les vieilles haines ont la vie dure, les Avaloniens considèrent la claymore des Highlanders comme une arme plus honorable que la rapière. L’Eisen, qui apprécie aussi les armes “anciennes”, a exprimé de l’intérêt pour le style McDonald, aussi le doyen de l’école envoya-t-il un Maître afin d’ouvrir une école à Insel. Aucun autre pays n’a eu envie de demander aux McDonald (ou à un autre clan) d’ouvrir une école.",
        "homologation": "1644",
        "doyen": "Hamish McDuff (1653)",
        "insigne": "Une claymore pointant vers le haut.",
        "armes_pdf": "Claymore",
        "specialisations_pdf": [
          "Épée à deux mains",
          "Athlétisme"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis du style Mac Donald ignorent la pénalité due au réarmement lors de l’utilisation de la claymore.",
            "regles": "Ils peuvent donc effectuer une attaque par action."
          },
          "compagnon": {
            "fluff": "Les féroces coups d’épée des Highlanders sont aussi sauvages que mortels.",
            "regles": "Avant de jeter les dés pour toucher, vous pouvez mettre de côté tous les dés d’attaque que vous souhaitez plutôt que de les jeter. Si votre coup porte, vous pouvez les ajouter à votre jet de dommages (dés lancés et non gardés)."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Mac Donald ont appris à donner à leurs coups tout le poids de leur corps.",
            "regles": "Par conséquent, vous jetez et gardez un dé supplémentaire lors d’un jet de dommages avec une claymore (ce qui en fait une arme à 4g3, sans compter les modificateurs de Gaillardise)."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Malone",
      "origine": "combat_reclassee",
      "nations": [
        "Avalon",
        "Inismore",
        "Marches des Highlands",
        "Castille",
        "Eisen",
        "Montaigne",
        "Sarmatie",
        "Ussura",
        "Vesten",
        "Vodacce",
        "Îles Glamour"
      ],
      "arme": "Fouet et n’importe quel couteau",
      "arme_display": "Fouet et n’importe quel couteau",
      "armes_categories": [
        "Fouet",
        "Couteau"
      ],
      "specialisations": [
        "Fouet",
        "Couteau"
      ],
      "description_courte": "",
      "techniques_combat": [
        {
          "nom_base": "Arracher une arme",
          "variante": null,
          "ref": "arracher une arme",
          "source": "csv"
        },
        {
          "nom_base": "coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Fouet",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Mise à terre",
          "variante": null,
          "ref": "mise a terre",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "restriction_creation": "limitee",
      "genre_restriction": "femmes",
      "details": {
        "origine_texte": "Guilde des Jennys (enseignée dans toutes les nations de Théah).",
        "academies": "Seuls les membres de la guilde des Jennys peuvent apprendre l’usage du fouet selon les techniques de Jenny Malone.",
        "description_longue": [
          "C’est en utilisant cette technique que Jenny Malone put tuer le client qui l’avait insultée et devenir célèbre en faisant de la légitime défense un droit pour tout citoyen.",
          "Jenny, une prostituée donc, utilisa les objets de travail qu’elle avait sous la main : un fouet et un couteau. Aujourd’hui encore, toutes les techniques de cette école résident sur l’utilisation concomitante de ces deux armes. Bien sûr, elles sont plus adaptées au combat, le couteau a été remplacé par une dague et le fouet est maintenant d’une longueur d’au moins quatre mètres avec un manche et une lanière solides.",
          "Le principe consiste à utiliser le fouet comme première attaque, pour jeter son adversaire au sol ou le désarmer, puis frapper à l’aide du couteau quand l’adversaire est en position défavorable.",
          "Le défaut principal de cette technique est sa dépendance au fouet. Désarmez une femme utilisant l’école Malone et elle sera incapable de se défendre correctement avec seulement son couteau."
        ],
        "armes_pdf": "Fouet et n’importe quel couteau",
        "specialisations_pdf": [
          "Couteau",
          "Fouet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "L’apprentie ne subit pas le malus lié à l’utilisation concomitante d’un fouet et d’une dague. Elle bénéficie aussi d’un bonus de 5 points à son ND pour être touché contre les gentilshommes (enfin, ceux qui se refusent à frapper une femme)."
          },
          "compagnon": {
            "fluff": "",
            "regles": "Un compagnon de l’école Malone bénéficie d’une technique de combat supplémentaire : Double parade (Fouet/Couteau) au niveau 2 qui progresse normalement et d’une augmentation gratuite sur ses attaques au fouet."
          },
          "maitre": {
            "fluff": "Une maîtresse est capable de “saucissonner” son adversaire à l’aide de son fouet.",
            "regles": "Elle frappe de côté en utilisant toute la puissance qu’elle peut y mettre. La lanière du fouet s’enroule alors autour de sa victime, lui immobilisant les bras le long du corps. Il suffit ensuite au maître de garder la lanière tendue en tirant sur le manche pour maintenir le belligérant immobilisé et l’empêcher d’utiliser ses attaques. Pour se sortir de ce pétrin, l’adversaire de la maîtresse devra dépenser un dé d’action et effectuer un jet de Finesse + Contorsionnisme contre un seuil de 25 + les augmentations prises lors de l’attaque, ou rester empêtré jusqu’au prochain round."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee",
        "nations_override": [
          "Avalon",
          "Inismore",
          "Marches des Highlands",
          "Castille",
          "Eisen",
          "Montaigne",
          "Sarmatie",
          "Ussura",
          "Vesten",
          "Vodacce"
        ],
        "genre_restriction": "femmes",
        "appartenance_requise": "Il faut appartenir à la Guilde des Jennys pour acquérir cette école."
      },
      "enrichie": true
    },
    {
      "nom": "Mac Lellan",
      "origine": "officielle",
      "nations": [
        "Marches des Highlands"
      ],
      "arme": "Broadsword",
      "arme_display": "Broadsword (Épée)",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime",
        "Pugilat"
      ],
      "description_courte": "Version plus en finesse de Mac Donald, la Broadsword étant la plus lourde des armes d'escrime",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée 2 Mains",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "peut choisir de sacrifier l’un de ses dés d’action (celui qu’il souhaite) afin d’ajouter un dé gardé (mais non lancé) supplémentaire lors de son jet de dommages pour une seule attaque. Cela doit être annoncé avant d’effectuer l’attaque, et si elle est ratée, le dé d’action est perdu.",
        "compagnon": "Pas de malus au coup de pommeau. +1 à cette Technique, qui peut atteindre le rang 6.",
        "maitre": "Vous pouvez alors effectuer, pour un seul dé d’action, une attaque d’escrime suivie d’un coup de pommeau. Les deux manoeuvres s’effectueront toutefois avec deux augmentations de malus."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Marches des Highlands.",
        "description_longue": [
          "L’école d’escrime de Mac Lellan est récente, mais moins que l’école Finnegan. Elle enseigne à ses spadassins l’utilisation de la broadsword, une épée large moins encombrante que la claymore et plus adaptée au combat moderne.",
          "C’est aussi une arme traditionnelle des clans des Highlands. Même si elle fait moins de dégâts que sa grande sœur, la forte-épée possède le double avantage d’être utilisable d’une seule main et d’être acceptée en dehors des cours highlander.",
          "Cette école utilise les techniques de sa grande sœur mais en profitant de sa plus grande mobilité et de sa grande garde-panier grillagée. C’est une arme d’escrime, mais dont le poids reste élevé.",
          "La principale faiblesse du style Mac Lellan réside justement dans le poids de cette arme. En effet, le spadassin doit régulièrement changer son arme de main en raison de son poids. Un adversaire attentif pourra attendre ce moment pour frapper, les tremblements de l’arme et du bras de l’escrimeur en sont les signes avant-coureurs."
        ],
        "academies": "On trouve la plupart des écoles enseignant ce style dans les Marches des Highlands, en particulier dans les écoles qui n’enseignaient jusqu’à présent que le style McDonald et souhaitaient un peu diversifier leur offre ; on peut donc trouver des maîtres d’arme du style McLellan à Dun Nirith, Connickmoor, Dunscaly, Eirainay, Kirkwall (2) et Loch Borralon. À l’extérieur des Marches, la reine a exprimé son intérêt pour ce style, aussi une école opportuniste s’empressa de recruter un maître d’armes highlander pour l’enseigner aux courtisans de la cour qui voulaient plaire à la reine. L’Eisen fut également intéressée, encore plus que pour le style McDonald et deux écoles ouvrirent rapidement, la première à Seeufer et la seconde à Siegsburg. Enfin, l’Ussura, d’habitude si réticente aux innovations extérieures, dût se reconnaître quelque peu dans ce style et autorisa l’ouverture d’une école dans sa capitale.",
        "homologation": "1665",
        "doyen": "Erskin McLellan (1665)",
        "insigne": "Une épée bâtarde à la garde panier grillagée, pointée vers le haut.",
        "armes_pdf": "Broadsword",
        "specialisations_pdf": [
          "Escrime",
          "Pugilat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprentissage de l’école Mac Lellan implique de suivre un chemin étroit entre puissance et souplesse.",
            "regles": "En utilisant le poids important de son arme, l’apprenti peut choisir de sacrifier l’un de ses dés d’action (celui qu’il souhaite) afin d’ajouter un dé gardé (mais non lancé) supplémentaire lors de son jet de dommages pour une seule attaque. Cela doit être annoncé avant d’effectuer l’attaque, et si elle est ratée, le dé d’action est perdu."
          },
          "compagnon": {
            "fluff": "Un compagnon a appris à effectuer de percutants coups de pommeau à l’aide de sa broadsword.",
            "regles": "Il peut effectuer ces derniers sans subir le malus de deux augmentations au ND pour être touché de son adversaire. De plus, lorsqu’il atteint ce rang, le spadassin Mac Lellan obtient gratuitement un bonus de 1 à sa technique Coup de pommeau. Par conséquent, un spadassin Mac Lellan peut augmenter son Coup de pommeau jusqu’au rang 6."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école Mac Lellan ont appris la “botte de Toird-healbhach” – une attaque d’escrime suivie d’un violent coup de pommeau.",
            "regles": "Vous devez tout d’abord annoncer que vous tentez cette botte. Vous pouvez alors effectuer, pour un seul dé d’action, une attaque d’escrime suivie d’un coup de pommeau. Les deux manœuvres s’effectueront toutefois avec deux augmentations de malus."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Mateenatya",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Cathay"
      ],
      "arme": "Sabre + Bouclier",
      "arme_display": "Sabre + Bouclier",
      "armes_categories": [
        "Escrime (Sabre)",
        "Boucliers"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Bateleur"
      ],
      "description_courte": "Un style de combat acrobatique d'Agnivarsie qui combine le maniement d'une épée courbe et d'un bouclier avec un jeu de jambes et des sauts inégalés pour frapper l'adversaire sous des angles surprenants.",
      "techniques_combat": [
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Esquive acrobatique",
          "variante": null,
          "ref": "esquive acrobatique",
          "source": "docx_v2"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Après avoir effectué une action de mouvement, vous bénéficiez d'un bonus de +1g0 à votre prochain jet de Parade(Bouclier ou Sabre) effectué durant le même round. En cas de Sprint, ce bonus passe à +1g1, et si vous aviez décidé de charger un ennemi, le malus à l’attaque de -2g1 est supprimé et vous pouvez ajouter [Finesse x2] aux dégâts au lieu de [Gaillardise x2]",
        "compagnon": "Vous pouvez dépenser une Action pour effectuer un \"Saut de Mateen\". Vous pouvez vous déplacer jusqu'à votre distance de mouvement normale, puis effectuer une action d'Attaque (Escrime). Si cette attaque réussit, vous ajoutez votre score de compétence en Athlétisme comme bonus fixe au total des dégâts.",
        "maitre": "Après avoir résolu votre « Saut de Mateen » (qu'elle ait réussi ou non), vous pouvez immédiatement vous déplacer de la moitié de votre distance de mouvement normale sans dépenser d'action ni déclencher d’attaque d’opportunité, représentant une roulade ou une pirouette pour vous mettre à l'abri."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "La tradition martiale de l'Agnivarsie, connue sous le nom de rathinatya (« la danse du soldat »), est considérée par beaucoup comme le plus ancien art martial au monde encore pratiqué. Le rathinatya est très éclectique, couvrant la lutte, le combat à l'épée, à la lance et à l'arc. Récemment, des écoles spécialisées sont apparues. L'une d'elles, le Mateenatya, est une méthode de combat inventée par le héros moderne Mateen, basée sur des mouvements acrobatiques combinés au maniement d'un bouclier et d'une épée courbe. Après avoir perdu un bras, Mateen sombra dans la dépression et l'alcoolisme jusqu'à ce qu'une jeune épéiste lui demande de la former. Cette requête lui permit de reprendre le contrôle de sa vie. Mateen retrouva un but, cessa de boire et commença à enseigner à d'autres élèves. Bien qu'incapable de porter le bouclier qui a fait la réputation de son style, son jeu de jambes et ses acrobaties restent inégalés.",
          "La principale faiblesse du Mateenatya réside dans sa nature chorégraphiée. Ses mouvements acrobatiques, bien que spectaculaires et déroutants, suivent un rythme et des motifs prévisibles pour un œil entraîné. Un adversaire patient qui refuse de se laisser submerger par le spectacle peut analyser cette \"danse\" pour en anticiper les temps forts et les temps faibles, lui permettant de placer une attaque précise juste au moment où le duelliste termine une pirouette ou prépare son prochain saut."
        ],
        "origine_texte": "Agnivarsie (Cathay)",
        "armes_predilection": "Épée courbe et bouclier ; jeu de jambes et acrobaties au cœur du style",
        "academies": "Agnivarsie (Cathay) ; école issue du rathinatya (« la danse du soldat »), fondée par le héros moderne Mateen",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Après une action de mouvement, l'apprenti bénéficie de +1g0 à son prochain jet de Parade (Bouclier ou Sabre) du round ; en cas de Sprint, ce bonus passe à +1g1 ; et lorsqu'il charge, le malus de -2g1 est supprimé et il ajoute sa Finesse x2 aux dommages au lieu de sa Gaillardise x2"
          },
          "compagnon": {
            "fluff": "Saut de Mateen",
            "regles": "Lorsque le compagnon attaque à l'Escrime après avoir effectué une action de mouvement durant la phase, il ajoute sa Finesse aux dés non gardés de ses dommages"
          },
          "maitre": {
            "fluff": null,
            "regles": "Après avoir résolu son attaque sautée (qu'elle ait réussi ou non), le maître peut immédiatement se déplacer de la moitié de sa distance de mouvement, sans dépenser d'action ni provoquer d'attaque d'opportunité"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Mubarizdun",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Arme 2 mains au choix",
      "arme_display": "Arme 2 mains au choix",
      "armes_categories": [
        "Épées à 2 mains",
        "Haches",
        "Armes d'Hast"
      ],
      "specialisations": [
        "Armes à 2 mains (au choix)",
        "Athlétisme"
      ],
      "description_courte": "Style agressif basé sur l'intimidation",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "Arme à 2 mains",
          "ref": "coup de pommeau",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Arme à 2 mains",
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Marquer",
          "variante": "Arme à 2 mains",
          "ref": "marquer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arme à 2 mains",
          "ref": "exploiter les faiblesses",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": ". Lorsque vous effectuez une action d'Attaque (Armes Lourdes), vous pouvez lancer une provocation. Vous effectuez un jet d'opposition de Panache + Intimidation contre un ND égal à la Détermination x 5 de votre cible. En cas de réussite : Votre provocation déstabilise l'adversaire. Sa Défense Passive est réduite de 5 contre cette même attaque.",
        "compagnon": "\"Choc de Mubarizdun\" : Au début de votre tour, vous pouvez dépenser 1 Action pour pousser un cri de guerre terrifiant. Jusqu'au début de la prochaine Phase, tous les dégâts que vous subissez sont réduits d'un montant égal à votre score de Détermination. Cependant, cette concentration vous expose, et vous ne pouvez pas effectuer d'action de Défense Active durant ce round.",
        "maitre": "Le \"Choc de Mubarizdun\" : inflige -1g0 à tous les tests ennemis jusqu'au début de votre prochain tour. L'effet de réduction des dégâts sur vous-même s'applique toujours."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Le Mubarizdun est le Style favori des soldats d'élite de l'Empire. Relativement jeune, on peut retracer ses origines jusqu'au général impérial Sepideh. Elle inventa ce Style pour qu'il soit utilisé par l'unité la plus aguerrie de son armée, le Mubar. Cette unité avait l'honneur d'être la première engagée sur-le-champ de bataille, et mettait au défi le général adverse d'envoyer son meilleur guerrier affronter l'un de ses membres. Une fois désigné, le soldat ennemi choisissait son adversaire dans les rangs du Mubar. Les deux guerriers combattaient alors à mort, le but étant de saper le moral du camp du vaincu. La légende veut que les soldats du Mubar n'aient jamais perdu aucun de ces duels.",
          "Bien que les armées modernes de l'Empire du Croissant emploient toujours des soldats formés au Mubarizdun, cette stratégie n'est guère plus usitée. Pourtant, des Duellistes s'entraînent toujours à pratiquer ce Style et l'utilisent avec une efficacité redoutable dans d'autres parties de l'Empire. Maniant à deux mains une épée, une masse ou une hache, un Duelliste du Mubarizdun démoralise ses adversaires en ponctuant ses attaques d'insultes.",
          "La principale faiblesse du Mubarizdun est sa dépendance à la guerre psychologique. Le style perd une grande partie de son efficacité contre un adversaire difficile à intimider ou qui ne comprend pas les insultes (un monstre, un automate, ou quelqu'un ne parlant pas la même langue). Contre une telle cible, les manœuvres de l'école sont inopérantes, et le style redevient un simple combat à l'arme lourde, sans ses finesses tactiques."
        ],
        "origine_texte": "Empire du Croissant",
        "armes_predilection": "Arme lourde à deux mains au choix (épée, masse ou hache), accompagnée d'insultes destinées à démoraliser l'adversaire",
        "academies": "Empire du Croissant ; héritage de l'unité d'élite du Mubar, fondée par la générale impériale Sepideh",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti obtient également Intimidation en compétence Avancée. En attaquant à l'arme lourde, l'apprenti peut lancer une provocation : jet de Panache + Intimidation contre un ND égal à la Détermination x5 de la cible ; en cas de réussite, la Défense Passive de la cible est réduite de 5 contre cette attaque"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Tant que le compagnon renonce à toute défense active durant le round, tous les dommages qu'il subit sont réduits d'un montant égal à sa Détermination x2 (mais minimum 1)"
          },
          "maitre": {
            "fluff": null,
            "regles": "Tant que le maître bénéficie de cette réduction de dommages, tous les ennemis à portée de voix subissent -1g1 à tous leurs jets contre lui"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Mullooney",
      "origine": "combat_reclassee",
      "nations": [
        "Inismore"
      ],
      "arme": "Épée courte et poing",
      "arme_display": "Épée courte et poing",
      "armes_categories": [
        "Escrime (Épée)",
        "Pugilat"
      ],
      "specialisations": [
        "Couteau",
        "Pugilat"
      ],
      "description_courte": "Style de maintien de l'ordre combinant une épée courte défensive et des uppercuts pour neutraliser sans tuer.",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Retourner les attaques",
          "variante": null,
          "ref": "retourner les attaques",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Peut effectuer des attaques de Pugilat avec la main non directrice sans malus. En outre, vous bénéficiez d’une augmentation gratuite sur vos jets de Jeu de jambes en défense active.",
        "compagnon": "Vous pouvez effectuer une Feinte normale mais au lieu d’infliger des dommages avec votre épée, vous effectuez un Uppercut. Vous gagnez une augmentation gratuite sur cette feinte par rang de maîtrise dans l’École Mullooney. En outre, votre ND, en exécutant un Uppercut, passe à 10 au lieu de 5.",
        "maitre": "Peut effectuer un uppercut et un coup de pommeau dans la même action (toutes les deux avec un malus de +5). Les dommages pour les deux attaques sont calculés normalement et tous les effets de l’uppercut s’appliquent à l’adversaire."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Inismore.",
        "academies": "Seule l’école que Mickey Mullooney a ouverte à Tara enseigne ces techniques.",
        "description_longue": [
          "Cette école a été développée par un shérif et boxeur inish du nom de Mickey Mullooney qui devait régulièrement s’interposer dans les bagarres de tavernes. Il trouva également son style très utile pour appréhender sans violence les criminels. Il enseigna alors ses techniques à ses gardes et sentinelles et ouvrit ensuite une École près de Tara où il enseigne son style depuis qu’il est à la retraite.",
          "L’École utilise une épée courte (généralement avec une garde panier très solide) dans la main principale tandis que l’autre main reste libre. L’épée est principalement utilisée comme arme de parade et de distraction, car ces techniques n’ont pas été développées pour blesser ses ennemis (à moins que cela ne soit nécessaire, bien entendu). L’utilisation de l’uppercut est importante dans ce style car il permet de mettre rapidement KO les ivrognes sans leur faire trop de mal.",
          "La principale faiblesse de cette école est qu’elle est principalement défensive et que l’allonge de l’épée courte est sans commune mesure avec une rapière. Ainsi, un adversaire pourra facilement jouer avec un spadassin Mullooney. Il lui suffit également de rester sur la défensive jusqu’à ce que le duelliste inish en ait assez et passe à l’offensive, il suffit alors d’une riposte bien placée pour en finir."
        ],
        "armes_pdf": "Épée courte et poing",
        "specialisations_pdf": [
          "Couteau",
          "Pugilat (la compétence Uppercut devient une  compétence de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’École Mullooney apprennent à utiliser conjointement leur épée courte et leur poing tout en esquivant les attaques",
            "regles": ". Vous pouvez effectuer des attaques de Pugilat avec votre main non directrice sans malus. En outre, vous bénéficiez d’une augmentation gratuite sur vos jets de Jeu de jambes en défense active."
          },
          "compagnon": {
            "fluff": "Un compagnon a appris à tromper son adversaire ; il attire son attention sur son épée et lui décoche un violent uppercut alors qu’il ne fait pas attention à sa main gauche.",
            "regles": "Vous effectuez une Feinte normale mais au lieu d’infliger des dommages avec votre épée, vous effectuez un Uppercut. Vous gagnez une augmentation gratuite sur cette feinte par rang de maîtrise dans l’École Mullooney. En outre, votre ND, en exécutant un Uppercut, passe à 10 au lieu de 5."
          },
          "maitre": {
            "fluff": "Vous avez appris à effectuer une double attaque contre vos adversaires les plus solides (et les plus saouls).",
            "regles": "Le spadassin Mullooney a appris à effectuer un uppercut et un coup de pommeau dans la même action (toutes les deux avec un malus de +5). Les dommages pour les deux attaques sont calculés normalement et tous les effets de l’uppercut s’appliquent à l’adversaire."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Nahgem",
      "origine": "combat_reclassee",
      "nations": [
        "Nations Pirates"
      ],
      "arme": "Sagaie",
      "arme_display": "Sagaie",
      "armes_categories": [
        "Lances"
      ],
      "specialisations": [
        "Lance",
        "Athlétisme"
      ],
      "description_courte": "Style basé sur une frénésie acrobatique et des déplacements imprévisibles, mêlant coups de lance et coups de pied pour troubler et submerger l'adversaire.",
      "techniques_combat": [
        {
          "nom_base": "Désarçonner",
          "variante": null,
          "ref": "desarconner",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lance",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Maintenir à distance",
          "variante": null,
          "ref": "maintenir a distance",
          "source": "csv"
        },
        {
          "nom_base": "Saut à la perche",
          "variante": null,
          "ref": "saut a la perche",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation Gratuite par Niveau de Maîtrise pour résister à la Peur. Augmentation Gratuite attaque lancer de lance.",
        "compagnon": "Saut à la perche comme Défense Active (ND+5). Si réussit, gagne Dé d'Héroïsme (max 3/combat).",
        "maitre": "Coup de pied sauté : Ajoute rang Saut à la perche au ND défense adverse et aux dommages. Paires d'Augmentations donnent une Augmentation Gratuite."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Kanuba.",
        "academies": "Il faut être membre de la tribu des Kanus ou leur être redevable pour apprendre les techniques de l’école Nahgem. Sinon, seul Maître Kazi, au sein des Kreuzritter peut dispenser son enseignement.",
        "description_longue": [
          "Nahgem est le style de combat traditionnel des natifs de Kanuba. C’est un style frénétique, plein d’énergie et de vigueur, et totalement exempt de toute trace d’inquiétude. On enseigne aux élèves de ce style à lancer avec une grande exactitude leur lance sur leur ennemi à distance et à entrer dans un état frénétique si ce dernier vient à portée de mêlée.",
          "Nahgem enseigne que la crainte mène à l’échec et qu’elle sape l’énergie du guerrier. Lors d’une bataille, le combattant peut se déplacer rapidement en aveugle et, apparemment, de manière étrange. En vérité, ces mouvements semblent sauvages et erratiques car ils mélangent des attaques à la lance, des coups de pied et le jeu de jambes afin de décontenancer et déconcentrer son adversaire. Parfois (en particulier quand un ennemi est trop près ou trop loin), le guerrier Nahgem utilisera sa lance pour sauter comme avec une perche et se remettre dans une position plus favorable.",
          "La principale faiblesse de ce style est que chacune de ses attaques énergiques consomme toute la vitalité que le guerrier peut rassembler. C’est pour cette raison que chacune de ses attaques est précédée d’une brève pause tandis que la suivante n’aura lieu que dans un instant. Un ennemi sachant prévoir et identifier ces pauses peut en profiter pour attaquer son adversaire lors de sa préparation, le frappant au moment où il est le plus faible."
        ],
        "armes_pdf": "Sagaie",
        "specialisations_pdf": [
          "Lance légère",
          "Athlétisme"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les débutants dans le style Nahgem apprennent tout d’abord à mettre de côté leurs craintes, de sorte qu’elles n’influent pas sur leur maniement de la lance.",
            "regles": "Vous obtenez une augmentation gratuite sur tous vos jets de résistance à la peur. Les compétences Coup de pied et Lancer (Arme d’hast) sont des compétences de base."
          },
          "compagnon": {
            "fluff": "Les guerriers Nahgem entraînés utilisent leur lance afin de changer d’emplacement durant le combat, sautant de place en place. Les compagnons ont appris à éviter les attaques en sautant promptement hors du chemin d’une attaque.",
            "regles": "Vous pouvez utiliser votre technique de combat de Saut à la perche comme Défense Active, avec un ND augmenté de 5. Si vous réussissez votre défense, vous recevez un dé d’héroïsme pour le combat. Vous ne pouvez gagner plus de trois dés d’héroïsme de cette manière."
          },
          "maitre": {
            "fluff": "L’une des dernières bottes du style Nahgem est une attaque par coup de pied haut. Le maître plante le bout de sa lance dans le sol, balance son corps vers le haut, en lançant un coup de pied puissant en direction du visage de son ennemi.",
            "regles": "Quand vous effectuez une telle attaque, vous utilisez votre compétence Coup de pied, mais vous ajoutez votre rang dans la technique de combat Saut à la perche à votre jet d’attaque et à votre jet de dommages. En outre, toutes les deux augmentations prises lors du jet d’attaque avec la compétence coup de pied, vous bénéficiez d’une augmentation supplémentaire sur les dommages."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Okada-ryu",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Cathay"
      ],
      "arme": "Katana",
      "arme_display": "Katana (Épée)",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime (Épée)",
        "Courtisan"
      ],
      "description_courte": "Une école de kenjutsu traditionnelle et conservatrice du Fuso, centrée sur la discipline et l'art de l'iaijutsu : le dégainé et la coupe en un seul mouvement fluide et fatal.",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Épée",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "docx_v2"
        },
        {
          "nom_base": "Céder la place",
          "variante": null,
          "ref": "ceder la place",
          "source": "docx_v2"
        },
        {
          "nom_base": "Attaque en dégaine",
          "variante": null,
          "ref": "attaque en degaine",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Lorsque vous effectuez une attaque depuis la posture iaijutsu (c'est-à-dire votre première attaque après avoir dégainé), vous obtenez une Augmentation au jet d’attaque et ajoutez votre score de Panache x2 comme bonus fixe au total des dégâts. Dégainer un katana de cette manière est toujours une action gratuite (mais pas la rengainer).",
        "compagnon": "Une fois par round, si un adversaire réussit une attaque de corps à corps contre vous alors que votre sabre est rengainé, vous pouvez immédiatement dépenser 2 Actions pour effectuer une Attaque (Escrime) contre lui. Cette contre-attaque se résout avant que les dégâts de l'adversaire ne soient appliqués.",
        "maitre": "Lorsque vous dépensez 1 Action pour rengainer votre arme et reprendre la posture iaijutsu, vous entrez dans un état de concentration absolue. Jusqu'au début de votre prochain tour, votre Défense Passive est augmentée d'un montant égal à 5 + votre Panache."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Au Fuso, l'épée et le samouraï ont un statut quasi légendaire. Les duels pour l'honneur entre dojos rivaux sont courants. Okada-ryu, le dojo le plus populaire pour le kenjutsu (« l'art de l'épée »), fut fondé par Okada Kanna du clan du Dragon, lui-même entraîné par le légendaire Duelliste Shinmen Takezo. La plus grande rivale d'Okada-ryu est Naito-ryu, fondée par Naito Shiori du clan du Corbeau. Les étudiants d'Okada-ryu sont généralement plus âgés, conservateurs et attachent de l'importance au décorum, tandis que ceux de Naito-ryu sont souvent décrits comme rustres et vulgaires.",
          "La principale faiblesse de l'Okada-ryu est sa concentration quasi totale sur le premier coup. Une fois que la lame est sortie du fourreau et que l'assaut initial a été porté, le style perd son avantage et redevient une escrime au sabre plus conventionnelle. Il est vulnérable face à des adversaires capables de survivre à la première frappe et de forcer le duelliste à un combat d'endurance prolongé où il ne peut pas prendre le temps de rengainer."
        ],
        "origine_texte": "Fuso (Cathay)",
        "armes_predilection": "Katana (kenjutsu, posture iaijutsu)",
        "academies": "Dojo Okada-ryu (Fuso, Cathay), fondé par Okada Kanna du clan du Dragon, élève du légendaire Shinmen Takezo ; grande rivale : Naito-ryu",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Lorsque l'Apprenti utilise la Technique « Attaque en dégaine », il ignore le malus d'une augmentation et ajoute son Panache x2 aux dés non gardés des dommages. Dégainer dans les autres cas reste toujours une action gratuite"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Une fois par combat, si un adversaire réussit une attaque de corps à corps contre le compagnon alors que son sabre est rengainé, celui-ci riposte immédiatement via la technique « Attaque en Dégaine » sans dépenser de dé d'action, résolue avant que les dommages de l'adversaire ne soient appliqués"
          },
          "maitre": {
            "fluff": null,
            "regles": "Lorsque le maître dépense une action pour rengainer son arme et reprendre la posture iaijutsu, sa Défense Passive est augmentée d'un montant égal à 5 + son Panache jusqu'à son prochain tour"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Omuhelo",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Ifri"
      ],
      "arme": "Bâton + pugilat",
      "arme_display": "Bâton + pugilat",
      "armes_categories": [
        "Bâtons",
        "Pugilat"
      ],
      "specialisations": [
        "Bâton ou épée",
        "Arts Martiaux Offensifs"
      ],
      "description_courte": "Style privilégiant les arts martiaux, utilisant l'arme pour parer celle de l'adversaire.",
      "techniques_combat": [
        {
          "nom_base": "Coup de pied réflexe",
          "variante": null,
          "ref": "coup de pied reflexe",
          "source": "docx_v2"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Feinte",
          "variante": "Bâton ou Épée",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup de pied sauté",
          "variante": null,
          "ref": "coup de pied saute",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Tant qu'au moins une de vos mains est libre, vous pouvez utiliser votre compétence Coup de Pied au lieu de votre déplacement, en complément de votre attaque avec votre arme.",
        "compagnon": "\"Ruade de la Gazelle\" : Utilise action et déplacement. Si l'attaque réussit, en plus d'infliger les dégâts normaux, le mouvement acrobatique de votre coup vous place dans une posture défensive unique. Jusqu'au début de votre prochain tour, vous gagnez une \"armure acrobatique\" égale à votre score de Finesse.",
        "maitre": "La Ruade de la Gazelle s'utilise sans sacrifier l'action de déplacement."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Tirant son nom d'un des rituels qui implique un combat singulier, l'Omuhelo est une forme très athlétique de combat se disputant traditionnellement avec les paumes ouvertes. Ce Style de Duel comprend des appuis renversés rapides sur une seule main ainsi que d'autres sortes de basculement, sans compter toute une panoplie de coups secs et de balayages avec les jambes. Les Duellistes ont adapté ce Style pour utiliser une arme dans une main (généralement, il s'agit d'un bâton robuste, même si certains utilisent des épées). Un Duelliste utilise rarement son arme, préférant combattre avec ses pieds.",
          "Un Duelliste qui pratique le Style de l'Omuhelo passe une partie de son entraînement à étudier son arbre généalogique, allant jusqu'à faire de longs voyages pour parler avec des membres de sa famille éloignée ou se rendre en des lieux datant de la jeunesse de ses arrière-grands-parents. Les renversements qu'étudient les élèves de l'Omuhelo symbolisent le lien des Duellistes au monde inversé où résident les morts, et leurs ancêtres. Comprendre qui étaient ces ancêtres et savoir à quoi s'attendre de cette connexion potentielle est important pour les Duellistes. Le Style de l'Omuhelo est fascinant à regarder. Bien des Duellistes en font des représentations solos lors des festivals pour montrer leur talent ou se livrent à des duels n'allant pas plus loin que la phase de démonstration. Ce style flamboyant et marquant en fait l'un des styles les plus connus en Théah. La principale faiblesse de l'Omuhelo est sa dépendance à l'espace et à un sol stable pour ses acrobaties. Dans un environnement confiné (un couloir étroit, une foule dense) ou sur un terrain instable (un pont de corde, le pont d'un navire en pleine tempête), le duelliste ne peut pas utiliser ses appuis renversés et ses balayages. Il est alors privé de ses techniques les plus efficaces et forcé de se battre de manière beaucoup plus conventionnelle et moins efficace."
        ],
        "origine_texte": "Ifri",
        "armes_predilection": "Bâton robuste (ou, plus rarement, une épée) tenu d'une main ; le combat se mène surtout aux pieds, paumes ouvertes",
        "academies": "Ifri ; les renversements symbolisent le lien aux ancêtres, et le style donne lieu à des représentations solos très prisées lors des festivals",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Tant qu'au moins une de ses mains est libre, l'apprenti peut porter un Coup de Pied (savoir d'Arts Martiaux Offensifs) en plus de son attaque à l'arme, à la place de son déplacement"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Ruade de la Gazelle : Lorsque le compagnon attaque, il peut sacrifier son déplacement pour gagner jusqu'à la fin du round une « armure acrobatique » égale à son rang de Finesse, cumulable avec l'armure portée"
          },
          "maitre": {
            "fluff": null,
            "regles": "La Ruade de la Gazelle ne consomme plus le déplacement du maître : il peut se déplacer de sa distance de mouvement normale juste avant ou juste après l'attaque"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Ottenheim",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Escrime",
        "Soldat"
      ],
      "description_courte": "Style d'escrime agressif",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "Rapière",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Rapière",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Frappe à deux mains",
          "variante": null,
          "ref": "frappe a deux mains",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Au début du round, peut choisir +1g0 aux dommages contre -1g0 à la défense passive.",
        "compagnon": "Gagne un niveau de Peur (ou +1). Augmentation gratuite sur les jets d'Intimidation.",
        "maitre": "Choisit une cible : gagne une augmentation gratuite aux dommages pour chaque blessure grave infligée à cette cible."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Eisen.",
        "description_longue": [
          "Otto von Ottenheim développa une école d’escrime qui refléterait réellement le caractère de son pays et ne serait pas aussi “légère” que l’École d’Hainzl. Pour cela, il s’aida de plusieurs maîtres d’armes étrangers qu’il rémunéra à prix d’or. Finalement, il parvint à développer une École utilisant la rapière.",
          "Autant Hainzl est froide et calculatrice, autant Ottenheim est violente et agressive, tout à fait dans l’esprit de l’Eisen. Son pratiquant utilise la force brute comme un Castillian fait appel à la grâce ou un Montaginois au panache, avec dans l’esprit de faire en sorte que votre adversaire se rende et quitte le combat en beuglant comme une vache apeurée ! Une fois leur moral détruit et leur corps meurtri et sanguinolent, les spadassins étrangers comprendraient la véritable nature de l’Eisen, et donc de son escrime !",
          "Bien sûr, la faiblesse de cette École est évidente – elle est dénuée de toute grâce, tant sociale que martiale, et il n’est pas difficile pour quelqu’un qui connaît ce style de combat d’esquiver les attaques du spadassin Ottenheim en attendant une ouverture."
        ],
        "academies": "Otto von Ottenheim utilisa sa fortune personnelle pour ouvrir simultanément quatre écoles : à Insel, Stahlfort, Freiburg et à Atemlos. En 1662, Otto ouvrait également deux écoles à l’étranger : la première à Kirk et la seconde à Charousse. Puis il mourut des mains d’un bandit de grand chemin sur les routes de Montaigne alors qu’il regagnait ses terres natales. Sans la fortune d’Ottenheim (son héritier refusa de continuer à financer la lubie de son père), les ouvertures se ralentirent. Von Reichenbach devint alors le doyen de l’École et réussit tout de même à ouvrir trois autres écoles en Eisen : Steil en 1664, Stutzung en 1666 et Gottkirchen en 1667.",
        "homologation": "1665",
        "doyen": "Leonhardt von Reichenbach (1665)",
        "insigne": "Une rapière parcourue d’étincelles, garde en bas à gauche, pointe en haut à droite.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Escrime",
          "Soldat"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "On enseigne aux pratiquants de l’École Ottenheim à mettre toute leur force dans leurs coups, indépendamment des conséquences. Là où les duellistes des autres nations font sonner leurs épées et s’observent en s’attaquant d’estoc, les spadassins de l’École Ottenheim balance leur rapière de toute leur force, faisant s’entrechoquer les armes dans un tel fracas que l’on croirait entendre les cloches d’une église !",
            "regles": "Ainsi, au début de chaque round, l’apprenti Ottenheim peut choisir de bénéficier de +1g0 sur ses jets de dommages mais perd alors 1g0 sur tous ses jets de défense passive."
          },
          "compagnon": {
            "fluff": "À ce niveau, le spadassin Ottenheim s’est familiarisé avec les techniques de base de cette école et peut maintenant se concentrer sur l’intimidation de son adversaire. Ainsi, il n’hésite pas à faire courir violemment la lame de sa rapière le long de celle de son adversaire pour en faire jaillir des étincelles, ou bien encore, il tapera farouchement du pied en avançant à la rencontre de son adversaire.",
            "regles": "Un spadassin d’Ottenheim gagne ainsi un rang de peur, ou il passe à 1 s’il n’en avait pas. Il bénéficie également d’une augmentation gratuite sur tous ses jets d’intimidation."
          },
          "maitre": {
            "fluff": "Un maître de l’École Ottenheim a appris à se laisser envahir par la violence intrinsèque de son école, s’acharnant contre l’adversaire qui l’a mis en rogne, le pressant d’assauts de plus en plus violents, se concentrant sur lui à la manière d’un cheval équipé d’œillères.",
            "regles": "Au début d’un combat, vous pouvez choisir un adversaire. Pour chaque blessure grave que vous lui infligez, vous recevez une augmentation gratuite sur vos jets de dommages, jusqu’à ce que cet opposant soit inconscient. Si vous changez de cible dans le cours de la bataille, vous perdez cette bonification, que ce soit contre ce nouvel adversaire ou contre l’ancien."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Peecke",
      "origine": "combat_reclassee",
      "nations": [
        "Avalon"
      ],
      "arme": "Bâton de marche",
      "arme_display": "Bâton de marche",
      "armes_categories": [
        "Bâtons"
      ],
      "specialisations": [
        "Athlétisme",
        "Bâton"
      ],
      "description_courte": "Style de combat au bâton basé sur l'équilibre parfait, alternant constamment les attaques de gauche et de droite.",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": "Bâton",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Bâton",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Bâton",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "ND Défense Active contre vos Attaques (sauf Balayage) augmenté de votre rang de Maîtrise.",
        "compagnon": "Peut retirer un Dé d'Action pour augmenter ND touché de la valeur de la phase.",
        "maitre": "Attaque réussie : cible doit faire jet Equilibre/Jeu de jambes (ND = dommages) ou tomber."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Avalon.",
        "academies": "Les élèves de Jasper Peecke enseignent son style en Avalon et cherchent à accroître le plus possible le nombre de praticiens.",
        "description_longue": [
          "En 1631, un Avalonien du nom de Lester Peecke effectua une démonstration de ses compétences avec un bâton à la cour royale de Montaigne. À lui seul, il affronta simultanément trois spadassins armés de rapières et de poignards. Peecke époustoufla la cour en remportant facilement cette bataille, mais dut battre précipitamment en retraite pour l’avoir emporté sur les fils de trois très influents nobles montaginois. Avant d’avoir débarqué sur les côtes d’Avalon, son exploit avait déjà atteint Luthon, et Peecke se trouva assiégé par des jeunes gens voulant apprendre ses techniques ; cependant, il refusa ces offres pour des raisons personnelles. Il mourut en 1642, sans héritiers connus et sans avoir enseigné à qui que ce soit son style.",
          "Mystérieusement, en 1656, alors que le Glamour faisait son grand retour, un homme grand et fort apparut en Avalon, portant le nom de Jasper Peecke et prétendant être le petit-fils de Lester Peecke. Que ce soit vrai ou non, il se bat en utilisant le même style, selon les dires de ceux qui avaient vu l’ancien Peecke combattre. Après dix années d’enseignement, Jasper Peecke disparut à son tour, ne laissant que ses étudiants pour perpétrer cette tradition.",
          "Le style de Peecke utilise un bâton de combat et enseigne l’équilibre comme doctrine principale. Les spadassins attaquent aussi bien à partir de la gauche qu’à partir de la droite, avec une égale fréquence, et ils combinent balancements, retraits et attaques afin de garder leur adversaire dans leur rythme. Le point faible de ce style est la longueur du bâton permettant à un adversaire de l’attraper ou de la dévier facilement.",
          "Les spadassins de Peecke n’appartiennent pas à la guilde des spadassins mais, au lieu de cela, ils bénéficient gratuitement d’un rang supplémentaire dans leur compétence d’Équilibre ainsi que dans une compétence de l’entraînement Athlétisme."
        ],
        "armes_pdf": "Bâton de marche",
        "specialisations_pdf": [
          "Athlétisme",
          "Bâton"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Le spadassin apprend à utiliser son bâton avec ses deux mains afin de pouvoir attaquer et se défendre avec la même facilité vers la droite ou vers la gauche. La plupart des duellistes combattent moins bien contre un adversaire gaucher.",
            "regles": "Quand vous utilisez un bâton de combat, toutes vos défenses actives effectuées contre des attaques ou des coups puissants (mais pas contre des Fauchages) voient leur ND diminuer d’un nombre d’augmentations égal à votre rang de maîtrise."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école Peecke ont appris la valeur d’une bonne défense.",
            "regles": "Au début de chaque round, vous pouvez jeter l’un de vos dés d’action pour augmenter votre ND pour être touché du chiffre indiqué sur ledit dé d’action."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Peecke apprennent une attaque destinée à déséquilibrer leur adversaire et à le faire choir au sol.",
            "regles": "Quand vous réussissez n’importe quelle attaque avec un bâton, votre cible doit effectuer un jet de Finesse + Équilibre ou Finesse + Jeu de jambes contre un ND égal aux dommages infligés par ce coup. Chaque augmentation prise pour augmenter les dommages augmente ce ND de 5. Si votre adversaire échoue, il chute au sol."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Provolone",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Erudit",
        "Escrime"
      ],
      "description_courte": "Style d'étudiant privilégiant l'analyse et les calculs pour attaquer.",
      "techniques_combat": [
        {
          "nom_base": "Cavatione",
          "variante": null,
          "ref": "cavatione",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Impose un malus d'augmentation aux attaques, coups puissants, feintes et fentes de l'adversaire. Réduit le rang Exploiter Faiblesses adverse.",
        "compagnon": "Peut transformer des dés d'action en dés d'héroïsme au début du round (utilisables ce round uniquement).",
        "maitre": "(Détails Maître incomplets dans l'extrait - généralement bonus défensif lié à l'analyse)."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vodacce.",
        "description_longue": [
          "Les apprentis de l’École Provolone étudient les mathématiques, la physique, l’anatomie et la philosophie en plus de l’art du duel et intègrent ces études érudites dans leur style de combat. Au milieu de la bataille, chaque mouvement est parfait, précis et “liquide” ; leurs attaques se font selon l’angle géométrique optimal, visant la partie du corps adverse la plus vulnérable. De même, la position défensive d’un spadassin Provolone est flottante, s’adaptant constamment aux mouvements offensifs de son adversaire pour placer son arme et son corps de façon à être le plus difficile possible à atteindre.",
          "Malheureusement, une École méthodique et conservatrice comme l’est Provolone n’est pas complètement adaptée pour affronter les manœuvres rapides, innovantes et parfois indignes que la plupart des spadassins de Théah utilisent. Une attaque sous un angle inattendu ou une manœuvre utilisant une technique peu familière peuvent permettre à un adversaire de l’emporter. Ensuite, une fois que le prétentieux spadassin Provolone a été touché dans son honneur plus que dans sa chair, il s’énervera et aura tendance à prendre des risques importants pour prouver la supériorité de son École, commettant logiquement des erreurs."
        ],
        "academies": "À l’heure actuelle, il n’existe que cinq écoles enseignant le style Provolone, deux se trouvent à Numa et les trois autres sur les terres de la famille Mondavi, à Chiarisa, à Profeta Chiesa et dans une petite ville du nom de Gavazzini, proche de la frontière avec la Castille. Il n’en existe aucune à l’étranger, le doyen de l’École Provolone, Santino Evangelista, refuse qu’une école Provolone ouvre ailleurs qu’en Vodacce, le siège historique de l’art du duel et de l’escrime.",
        "homologation": "1647",
        "doyen": "Santino Evangelista (1647)",
        "insigne": "Une main tenant une rapière en position de garde.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Érudit",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les études poussées des spadassins Provolone dans les domaines classiques de l’escrime les rendent très difficiles à toucher lorsque leur adversaire utilise des manœuvres traditionnelles. En outre, la formation rigoureuse du spadassin Provolone laisse à son opposant moins d’ouvertures dans sa défense que la grande majorité des Écoles.",
            "regles": "Votre adversaire subit ainsi une augmentation de malus sur ses compétences Attaque et sur ses techniques de combat Coup puissant, Feinte ou Fente en avant. Il ne pourra ainsi pas utiliser la totalité de sa compétence Exploiter les faiblesses (Escrime). Son rang dans cette technique de combat sera réduit de celui du spadassin Provolone. Par exemple, Luis Nuñez, spadassin Aldana affronte Luigi Vuelta, spadassin Provolone, le rang du premier dans la technique de combat Exploiter les faiblesses (Escrime) est de 4 et celui du second de 3 ; au final, après application du malus d’apprenti, Luis n’a finalement qu’un score de 1 dans sa technique de combat !"
          },
          "compagnon": {
            "fluff": "Un compagnon Provolone sait que la précision est plus importante que la vitesse.",
            "regles": "Au début de chaque round, il peut mettre de côté autant de dés d’action que son rang de maîtrise après avoir effectué son jet, réduisant son nombre d’actions et son total d’initiative pour le round. Ces dés d’actions mis de côté se transforment alors en dés d’héroïsme qui doivent être employés dans le round ou être perdus. Ces dés d’héroïsme ne se transforment JAMAIS en points d’expérience, quelles que soient les circonstances."
          },
          "maitre": {
            "fluff": "Un maître Provolone a encore amélioré ses réflexes et ses techniques défensives. À tout moment (qu’il lui reste des dés d’action ou non), un maître peut tenter une manœuvre connue sous le nom de Parade-réflexe. Il s’agit d’un mouvement rapide et instinctif effectué avec la lame de sa rapière afin de repousser celle de l’adversaire au loin.",
            "regles": "C’est une défense active standard effectuée en utilisant la compétence Parade (Escrime). Cette manœuvre ne nécessite aucun dé d’action pour être réalisée mais le rang du spadassin dans sa compétence parade est réduit de moitié (arrondi à l’inférieur). Si la parade-réflexe échoue, le spadassin n’a pas le droit de tenter une nouvelle parade active, car il n’est plus correctement positionné et son arme est hors-jeu. Une parade-réflexe ne peut être tentée que si le maître n’a normalement pas le droit de tenter une parade active (contre un spadassin ayant réussi une Feinte par exemple) et elle ne peut jamais être employée comme élément d’une Riposte."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Qor'qunq",
      "origine": "officielle",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Kris et jambiya",
      "arme_display": "Kris (Couteau) et jambiya (Couteau)",
      "armes_categories": [
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Espion"
      ],
      "description_courte": "Style basé sur une patience calculée et des frappes délibérées pour conserver son énergie avant de déclencher un unique coup fatal et précis.",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Coup Puissant",
          "variante": "Couteau",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Couteau",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": "Couteau",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation Gratuite Fente en avant ou Attaque couteau.",
        "compagnon": "Action de Réserve : jet de Dommages augmenté de 2x nombre de phases retenues.",
        "maitre": "Si touche couteau, dépense Dé d'Héroïsme pour infliger Blessure Grave supplémentaire avant dommages normaux."
      },
      "restriction_creation": "interdite",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Empire du Croissant.",
        "academies": "Le seul moyen d’apprendre les secrets de cette école d’assassin est de faire partie de la secte des Qatihl’i.",
        "description_longue": [
          "Qor’qunq est le style de combat des assassins Qatihl’i. C’est un style délibérément vicieux qui frappe de façon profonde, brutale et fatale. Un assassin utilisant le style Qor’qunq prendra son temps afin de chercher la faiblesse dans la défense ennemie, avant de jaillir comme un diable de sa boîte, et de se précipiter afin d’infliger un coup mortel.",
          "La patience calculatrice de cette secte est la fois la plus grande force et la plus grande faiblesse du style Qor’qunq, puisqu’elle permet à l’assassin de conserver toute son énergie mais donne également à sa proie une chance de battre en retraite et de s’enfuir."
        ],
        "armes_pdf": "Kris et jambiya",
        "specialisations_pdf": [
          "Couteau",
          "Espion (la compétence Poison passe de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Vous êtes à même d’utiliser un couteau pour effectuer une attaque simple, rapide et mortelle.",
            "regles": "Vous obtenez une augmentation gratuite pour toutes les Attaques et Fente en avant que vous effectuez à l’aide d’un couteau. De plus, vous obtenez également le métier Pugilat où la compétence Coup à la gorge passe de base."
          },
          "compagnon": {
            "fluff": "Les compagnons ont appris à retenir leurs coups en attendant une ouverture.",
            "regles": "Lorsque vous frappez en utilisant une action en réserve, votre jet de dommages est augmenté de deux fois le nombre de phases depuis le moment où vous l’avez effectivement mis en réserve. Par exemple, si vous avez mis en réserve une action à la phase 2 et que vous attaquez avec celle-ci en phase 9, vous bénéficiez d’un bonus de (9 - 2) x 2 = 14 blessures légères !"
          },
          "maitre": {
            "fluff": "Les maîtres sont capables de faire du mal à leur victime avec le plus faible des coups.",
            "regles": "Lorsque vous frappez avec succès un ennemi à l’aide de votre couteau, vous pouvez dépenser un dé d’héroïsme afin d’infliger une blessure grave en sus des dégâts de votre coup normal. Cette blessure grave est infligée avant que la résolution des dommages de votre attaque ne soit effectuée, votre adversaire devra donc effectuer deux jets d’encaissement."
          }
        },
        "categorie_creation": "Écoles interdites à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Robertson",
      "origine": "officielle",
      "nations": [
        "Avalon",
        "Marches des Highlands",
        "Inismore",
        "Îles Glamour"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Cape",
        "Escrime"
      ],
      "description_courte": "Style basé sur l'utilisation de la cape de duel en main gauche pour bloquer la lame ennemie",
      "techniques_combat": [
        {
          "nom_base": "Double parade",
          "variante": "Cape/Escrime",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": "Cape",
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Escrime",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice (cape). Augmentation Gratuite défense active avec.",
        "compagnon": "Rang gratuit Enchevêtrement.",
        "maitre": "Si Enchevêtrement réussi avec Augmentation, gagne une attaque gratuite immédiate."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Avalon, Highlands, Inismore.",
        "description_longue": [
          "David Robertson a développé ce style après un voyage en Castille où il a étudié le style Torres, qu’il a adapté au combat en milieu urbain. Les ruelles étroites et les rues encombrées des villes d’Avalon ne permettent pas à un spadassin d’utiliser aisément ses compétences d’esquive face à un taureau de combat. Les duellistes de ce style utilisent une rapière dans leur main principale et une cape dans l’autre. Ils se tiennent fermement face à leur adversaire, bien que, parfois, l’un ou l’autre côté de leur corps soit légèrement avancé en raison de la manœuvre qu’ils sont sur le point d’exécuter. Le style de Robertson implique d’empêtrer la lame de son adversaire dans la cape avant de lui asséner une série d’assauts brutaux. La faiblesse de ce style est sa confiance dans le fait que la cape est son principal moyen de défense."
        ],
        "academies": "On trouve des écoles de ce style dans tout l’Avalon, et il y en a trois rien qu’à Carleon. Le style s’est même répandu parmi les exilés montaginois, qui apprécient l’idée d’utiliser un vêtement comme élément de défense. Il y avait une école de Robertson dans le rancho Torres, à San Juan, avant l’invasion montaginoise, mais Jack Webster la ferma en signe de protestation contre l'occupation militaire. Après la retraite de la Montaigne, il a commencé à voir s’il pouvait la rouvrir. Robertson est aussi très populaire à Kirk et une école s’y trouve. Enfin, même dans les deux autres îles Glamour, des écoles commencent à enseigner le style Robertson ; on peut ainsi l’apprendre à Tara et Newport en Inismore et à Dun Vahl dans les Marches. Les manteaux ussurans sont trop lourds pour être utilisés de cette façon et les Eisenörs ne voient pas pourquoi ils auraient besoin d’un manteau là où le Dracheneisen fait parfaitement l’affaire.",
        "homologation": "1657",
        "doyen": "Jack Webster (1657)",
        "insigne": "Une rapière enroulée dans un manteau.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Cape",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend à utiliser sa cape pour se défendre.",
            "regles": "Il ne subit aucune pénalité pour l’utilisation d’une cape dans sa seconde main et il obtient une augmentation gratuite pour se défendre activement à l’aide de celle-ci."
          },
          "compagnon": {
            "fluff": "Le compagnon de l’école Robertson maîtrise l’art de capturer la lame de son adversaire dans les replis de sa cape.",
            "regles": "Il bénéficie d’un rang supplémentaire dans sa technique de combat Enchevêtrer, ce qui peut l’amener au rang 6. Si tel n’est pas le cas, il pourra, plus tard, augmenter son rang dans cette technique de combat de 5 à 6."
          },
          "maitre": {
            "fluff": "Le maître de l’école Robertson, lorsqu’il a capturé la lame de son adversaire, agit, par réflexe, en lançant une attaque instantanée.",
            "regles": "Une fois réussi l’enchevêtrement avec votre cape en ayant pris une augmentation, vous obtenez immédiatement une attaque gratuite contre votre adversaire sans dépenser un nouveau dé d’action."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Rogers",
      "origine": "combat_reclassee",
      "nations": [
        "Nations Pirates"
      ],
      "arme": "Sabre d’abordage",
      "arme_display": "Sabre d’abordage",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Combat de rue",
        "Escrime"
      ],
      "description_courte": "Style basé sur un enchaînement d'astuces et de feintes déroutantes de pirate, combinées à une parfaite adaptation au roulis d'un navire pour plonger l'adversaire dans la confusion.",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": "Sabre",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": "Sabre",
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Sabre",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        },
        {
          "nom_base": "Feinte de pirate",
          "variante": null,
          "ref": "feinte de pirate",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Equilibre remplace parade. Apprend 1 Feinte de pirate. (Pas membre guilde).",
        "compagnon": "+5 ND être touché sur bateau (sauf surprise). Apprend 1 Feinte de pirate.",
        "maitre": "+2 niveau de peur (ou Peur 2). Apprend 2 Feintes de pirate."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Confrérie de la Côte.",
        "academies": "Auprès des pirates, sur les bateaux des nombreuses factions maritimes : Seadogs (et corsaires d’autres nations), Gentilshommes de Gosse, Confrérie de la Côte, Crimson Rogers et même Corsaires du Croissant ou Faucons vestens, sans oublier les indépendants.",
        "description_longue": [
          "L’école de Rogers est un style de combat qui se transmit de pirate à pirate au fil des ans. On dit que le capitaine Rogers en a inventé les techniques de base, mais elles ont connu tant de remaniements au cours du temps qu’elles ne ressemblent plus au style d’origine. Les vieilles feintes disparaissent pour être remplacées par de nouvelles quand elles ont fait leur temps.",
          "L’école de Rogers dépend beaucoup d’astuces destinées à l’emporter sur l’adversaire et à le plonger dans la plus grande confusion, mais elle enseigne également à ses spadassins à s’adapter au roulis d’un navire durant un combat. Pendant que le marin d’eau douce va s’écraser contre le bastingage, le pirate se rue à la curée.",
          "La principale faiblesse du style Rogers réside dans la technique d’équilibre enseignée aux étudiants. Efficace en temps normal, elle permet à un adversaire bien informé de prévoir le moment où le spadassin ne peut plus esquiver, en observant une flexion de jambes particulière. Ce fléchissement est si bien enraciné dans la technique qu’il se produit même sur la terre ferme."
        ],
        "armes_pdf": "Sabre d’abordage",
        "specialisations_pdf": [
          "Combat de rue",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "",
            "regles": "Vous pouvez utiliser votre compétence Équilibre à la place de n’importe quelle compétence de parade. En outre, vous apprenez une feinte de pirate."
          },
          "compagnon": {
            "fluff": "",
            "regles": "Vous ajoutez +5 à votre ND pour être touché si vous êtes sur un bateau, à moins que vous ne soyez surpris. En outre, vous apprenez une nouvelle feinte de pirate."
          },
          "maitre": {
            "fluff": "",
            "regles": "Vous gagnez un bonus de +2 à votre niveau de peur. Si vous n’en disposiez pas, vous avez maintenant un niveau de peur de 2. Vous acquérez également deux nouvelles feintes de pirate."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Rossini",
      "origine": "combat_reclassee",
      "nations": [
        "Castille"
      ],
      "arme": "Hallebarde ou pertuisane",
      "arme_display": "Hallebarde ou pertuisane",
      "armes_categories": [
        "Armes d'Hast"
      ],
      "specialisations": [
        "Arme d'hast",
        "Lutte"
      ],
      "description_courte": "Style utilisant une hallebarde, faisant attention à ne pas tuer la cible",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": "arme d'hast",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Désarmer",
          "variante": "arme d'hast",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": "arme d'hast",
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arme d’hast",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Peut utiliser Parade/compétence pour protéger personne à 3m sans pénalité.",
        "compagnon": "Une fois par tour, interruption pour parer coûte 1 dé d'action au lieu de 2.",
        "maitre": "Si Parade (Armes d'hast) en défense passive, ND touché +10."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Castille (Cité Vaticine).",
        "academies": "Il faut être membre de la garde de l’Église pour apprendre l’école Rossini.",
        "description_longue": [
          "Cette école fut créée par un dévot Gardien de l’Église en guise d’alternative à l’école de Salomon. Elle s’appuie sur le maniement de la hallebarde, une arme d’hast qui n’est plus à la mode de nos jours. Les Gardiens de l’Église l’utilisent toujours lors des cérémonies officielles et savent parfaitement se servir de cette arme archaïque.",
          "Les Gardiens de l’Église apprennent à maîtriser leurs adversaires en leur infligeant un minimum de dommages. Bien que cela évite de blesser de fervents fidèles, cela peut être une gêne face à un adversaire qui est au courant de cette faiblesse. De plus, si un hallebardier bien entraîné peut faire des ravages, un adversaire avisé saura trouver une ouverture."
        ],
        "armes_pdf": "Hallebarde ou pertuisane",
        "specialisations_pdf": [
          "Armes d’hast",
          "Lutte"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis apprennent avant tout à protéger ceux qu’on leur confie.",
            "regles": "Ainsi, ils peuvent, sans la moindre pénalité, utiliser leur compétence de Parade ou n’importe laquelle de leurs techniques de combat contre tout individu s’en prenant à une personne qu’ils veulent protéger située dans les 3 mètres."
          },
          "compagnon": {
            "fluff": "S’attachant toujours davantage à la sécurité de sa charge, le compagnon apprend à anticiper toutes les attaques.",
            "regles": "Une fois par tour, le Gardien peut utiliser une interruption pour parer une attaque en ne dépensant qu’une action au lieu de deux."
          },
          "maitre": {
            "fluff": "Les maîtres manient leur hallebarde à une vitesse surprenante et parent facilement tous les coups.",
            "regles": "Si le Gardien de l’Église utilise la compétence Parade (Arme d’hast) en guise de Défense Passive, son ND pour être touché est augmenté de 10 points et il bénéficie d’une augmentation gratuite sur sa Défense Active en Parade (Arme d’hast)."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee",
        "nations_override": [
          "Castille"
        ],
        "appartenance_requise": "Il faut être membre de la garde de l'Église pour apprendre cette école."
      },
      "enrichie": true
    },
    {
      "nom": "Sanders",
      "origine": "officielle",
      "nations": [
        "Inismore"
      ],
      "arme": "Sabre, sabre de cavalerie ou sabre d’abordage",
      "arme_display": "Sabre, sabre de cavalerie ou sabre d’abordage",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Style de sabre basé sur le mouvement et l'imprévisibilité",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Lacérer",
          "variante": null,
          "ref": "lacerer",
          "source": "csv"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "+1 dé lancé (non gardé) dommages contre cibles vulnérables aux coupures. Augm. gratuite Tourbillon.",
        "compagnon": "Peut utiliser Athlétisme comme défense passive et active (avec 2 augmentations gratuites).",
        "maitre": "Après une attaque réussie, gagne 2 augmentations gratuites sur la prochaine technique contre un autre ennemi."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Inismore",
        "description_longue": [
          "En dépit du respect qu’il finit par éprouver à l’égard des Écoles de Spadassin qu’il dédaignait auparavant, Sanders ne développa jamais de techniques particulières ou de positions de duel, mais plutôt une science intuitive du combat, un peu à la façon d’un joueur d’échecs. Cependant, son style est tout de même reconnaissable, ses praticiens utilisent un sabre à long tranchant, lacérant leurs adversaires au niveau des membres inférieurs pour les jeter au sol, tout en ayant recours à des offensives extrêmement sportives. Ces changements rapides de rythmes et de positions consternent souvent les adversaires les plus habiles. En dépit de la légende de Sanders comme duelliste, son style épuré et imprévisible s’adapte parfaitement au chaos d’une mêlée, et c’est dans ces moments-là que l’École Sanders est la plus utile et la plus crainte, bien plus que dans un duel.",
          "La faiblesse de cette école est aussi ce qui fait sa force. Sans positions ou manœuvres formalisées, le spadassin doit innover constamment : un adversaire intelligent peut ainsi le forcer à faire montre de trop d’audace, ou lui faire épuiser toutes ses idées."
        ],
        "academies": "On trouve finalement peu d’écoles enseignant le style Sanders. Le fait que son fondateur ait exigé que ses élèves ne connaissent aucun autre style limite beaucoup le nombre de ses étudiants potentiels. Toutefois, comme c’est la seule école reconnue d’Inismore et que le chauvinisme de ce pays est universellement reconnu, il y a des écoles enseignant Sanders dans les villes inishs suivantes : Dunkeen, Darwah, Lochcuan et Carman. Hors d’Inismore, il n’y a qu’en Avalon qu’une école ait ouvert, à Catterick. Aucune autre nation n’a semblé intéressée par cette École exclusive.",
        "homologation": "1664",
        "doyen": "Lyle Sanders (1664)",
        "insigne": "Un sabre pointant vers le haut, tourné vers la droite, sur fond de point d’interrogation.",
        "armes_pdf": "Sabre, sabre de cavalerie ou sabre d’abordage",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "En se concentrant sur son sabre, l’apprenti Sanders apprend à profiter au maximum de son tranchant.",
            "regles": "Un apprenti Sanders ajoute un dé lancé non gardé aux dommages lorsqu’il frappe une victime ne pouvant se protéger de ses lacérations. Les objets inanimés ne sont pas concernés par ce bonus – de même que, à l’initiative du MJ, les créatures qui ne saignent pas, celles qui portent des armures lourdes, etc. L’apprenti gagne également une augmentation gratuite sur tous ses jets de Tourbillon effectués avec un sabre."
          },
          "compagnon": {
            "fluff": "Fluide, imprévisible et exceptionnellement mobile, les mouvements rapides et athlétiques d’un compagnon Sanders rendent ses assauts particulièrement difficiles à éviter pour des spadassins habitués à des techniques formalisées.",
            "regles": "Tout en se déplaçant et en attaquant, le compagnon peut choisir une compétence de l’entraînement Athlétisme comme défense passive (mêmes celles qui ne le permettent pas habituellement). S’il décide d’y avoir recours de manière active, il bénéficie de deux augmentations gratuites sur son jet. Enfin, lorsqu’il a recours à ce talent, ses adversaires devront également recourir à des compétences de l’entraînement Athlétisme pour se défendre passivement et activement."
          },
          "maitre": {
            "fluff": "Sans apprentissage des duels formels, de techniques répétitives ou de positions d’escrime connues, le membre de l’École Sanders tend à être plus à sa place dans le chaos d’une mêlée que dans un duel. De même, ses adversaires le trouveront véritablement dangereux dans un combat sans règles. Ainsi, en s’appuyant sur sa vitesse, son imprévisibilité et son extrême précision, il peut attaquer où bon lui semble, interdisant à ses adversaires de deviner où il va frapper.",
            "regles": "Après avoir réussi une attaque contre un adversaire, le maître de l’École Sanders gagne deux augmentations gratuites sur sa prochaine utilisation d’une technique de combat si cette action a lieu à l’encontre d’un autre ennemi."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Scarron",
      "origine": "combat_reclassee",
      "nations": [
        "Montaigne"
      ],
      "arme": "Toutes les lames d’escrime",
      "arme_display": "Toutes les lames d’escrime (Rapière)",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Combat de rue",
        "Escrime"
      ],
      "description_courte": "Philosophie de l'improvisation, combinant une arme d'escrime avec n'importe quel objet trouvé sur le champ de bataille.",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Double Parade",
          "variante": "arme improvisée/escrime",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Arme improvisée",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice arme improvisée. Augmentation gratuite Parade (Arme improvisée).",
        "compagnon": "Ramasser et attaquer/parer arme improvisée en une action. Augmentation gratuite défense active non-parade.",
        "maitre": "Après attaque arme improvisée, peut dépenser dé d'action pour attaque immédiate escrime (pas de défense active possible)."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Montaigne.",
        "academies": "Bien que trouvant ses origines dans les bagarres de taverne, l’école Scarron s’est répandue au sein de la haute société montaginoise et est maintenant enseignée dans de nombreuses écoles d’escrime du pays, même si la guilde des spadassins n’apprécie pas forcément cet état de fait.",
        "description_longue": [
          "L’école de Scarron n’est pas tant un style de combat que l’incarnation de la philosophie : “la meilleure arme est celle qui nous tombe sous la main”. Les pratiquants de l’école sont connus pour rosser leurs adversaires avec tout ce qui existe, d’une planche à un tisonnier en passant par un crachoir ? pot de chambre ?. Lorsque vos ennemis vous surprennent dans une taverne et que vous n’avez rien de mieux qu’une bouteille de vin et un jambonneau pour vous défendre, il n’y a pas de meilleure école. Scarron est la seule qui offre un entraînement en bonne et due forme dans l’art du maniement des Armes improvisées.",
          "Cette “philosophie” s’avère plus efficace quand elle est appuyée d’une arme d’escrime plus traditionnelle car l’acier est toujours le bienvenu pour se défendre. Les chapeaux à bords larges et lestés au plomb constituent un accessoire assez populaire chez les élèves de Scarron. Un tel couvre-chef est une arme improvisée (molle, dommage 1g1).",
          "Un tabouret n’inspire pas autant de respect qu’une belle rapière, et des adversaires d’expérience passeront des attaques qui seraient restées sans effet si l’élève avait été mieux armé."
        ],
        "armes_pdf": "Toutes les lames d’escrime",
        "specialisations_pdf": [
          "Combat de rue",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les élèves de l’école de Scarron sont familiarisés avec nombre d’objets courants dont ils ont besoin pour se défendre.",
            "regles": "La pénalité de main non-directrice disparaît dès lors que vous utilisez une arme improvisée. En outre, vous bénéficiez d’une augmentation gratuite lorsque vous utilisez la compétence : Parade (arme improvisée) au titre de défense active."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école de Scarron apprennent à réagir promptement face à toute nouvelle situation et bénéficient d’un enseignement bien utile lorsqu’il s’agit d’éviter un coup.",
            "regles": "Vous pouvez ramasser et attaquer ou parer à l’aide d’une arme improvisée en une seule et même action. En outre, vous recevez une augmentation gratuite lors de vos tentatives de défenses actives qui ne sont pas liées à une parade."
          },
          "maitre": {
            "fluff": "Les maîtres du style de Scarron utilisent leur arme improvisée pour détourner l’attention de leurs adversaires de leur rapière",
            "regles": ". Suite à une attaque à l’aide d’une arme improvisée (qu’elle touche ou non), le maître peut utiliser un dé d’action (même s’il aurait dû intervenir ultérieurement dans le tour) pour passer à l’attaque avec une arme d’escrime. Il est impossible d’opposer à cette attaque une défense active."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Scola Carnavale",
      "origine": "combat_reclassee",
      "nations": [
        "Vodacce"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Courtisan",
        "Escrime"
      ],
      "description_courte": "Escrime de la haute société vodacce, mêlant technique à la rapière et ruses de salon (poudre aux yeux, etc.).",
      "techniques_combat": [
        {
          "nom_base": "Double parade",
          "variante": null,
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Poignée de poudre",
          "variante": null,
          "ref": "poignee de poudre",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Être apprenti de la Scola Carnavale est équivalent à posséder l’avantage Relations au rang 4.",
        "compagnon": "Tout adversaire d’un compagnon perd un dé (lancé et gardé) sur tous ses jets de défense active.",
        "maitre": "À chaque fois qu’il réussit une attaque, il gagne un dé d’action qu’il doit dépenser lors de la phase suivante."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vodacce.",
        "academies": "Scola Carnavale est enseignée dans la cité qui la vit naître : Assina. Son influence demeure largement confinée à cette seule cité, bien qu’elle puisse accueillir des élèves de toutes nationalités.",
        "description_longue": [
          "La Scola Carnavale trouve son origine dans l’invention des carnavals par les sept princes gouvernant de la Vodacce. Dans chacune des grandes cités vodaccies, se tient un carnaval qui dure de quelques semaines à plus de huit mois dans la célèbre ville d’Assina. Les nobles et les personnes de condition rivalisent tous en se parant des plus riches costumes et ne sont autorisés à se montrer que costumés. Cependant, l’extravagance gagnant au fil des ans, ces costumes sont devenus de moins en moins confortables. Il fallut par conséquent inventer un style de combat se prêtant à ce genre de situations. C’est ainsi que fut créée la Scola Carnavale, dont le siège historique se situe à Assina.",
          "À Assina, les élèves passent deux années totalement immergés dans la vie sociale de la cité, participant à de nombreuses fêtes et en organisant plusieurs. L’enseignement concerne autant la vie en société, et plus particulièrement celle de Lucani, que l’art de l’escrime. La fin des études est sanctionnée par une grande réception, totalement organisée par les élèves, à laquelle toute la bonne société de Lucani est conviée. Elle marque le dernier jour du carnaval avant son interruption annuelle de quatre mois. Au cours de cet ultime examen, les élèves se défient mutuellement à fleuret moucheté et rivalisent d’ingéniosité pour la plus grande distraction des invités. Cette soirée est l’une des plus courues de toute la Vodacce.",
          "Le style de combat enseigné à la Scola Carnavale rassemble, autour d’un maniement rigoureux de la rapière, toutes les techniques les plus fourbes permettant de mettre l’adversaire mal à l’aise.",
          "Aucune discrimination à l’admission n’est pratiquée au sein de la Scola Carnavale. Il suffit seulement de pouvoir soutenir le train de vie princier demandé à chaque élève. Passer huit mois de l’année à festoyer en changeant de costume pratiquement tous les soirs n’est pas sans entraîner quelques dépenses."
        ],
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Courtisan",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Un apprenti de la Scola Carnavale est un homme du monde, les méandres de la haute société Vodacce n’ont plus de secrets pour lui. Il a par ailleurs acquis un réseau de relations non négligeable, essentiellement au cours des innombrables soirées auxquelles il a assisté.",
            "regles": "Être apprenti de la Scola Carnavale est équivalent à posséder l’avantage Relations au rang 4."
          },
          "compagnon": {
            "fluff": "Le compagnon de la Scola Carnavale est passé maître dans l’art de passer les défenses de ses adversaires au moyen de techniques plus ou moins chevaleresques.",
            "regles": "Tout adversaire d’un compagnon perd un dé (lancé et gardé) sur tous ses jets de défense active."
          },
          "maitre": {
            "fluff": "Un maître de la Scola Carnavale est non seulement une des personnalités les plus en vue de Vodacce, mais également l’un de ses meilleurs bretteurs.",
            "regles": "Sa présence et sa superbe lors des combats lui confèrent un avantage indéniable sur ses adversaires. À chaque fois qu’il réussit une attaque, il gagne un dé d’action qu’il doit dépenser lors de la phase suivante."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Sersemlik",
      "origine": "combat_reclassee",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Dilmekiri",
      "arme_display": "Dilmekiri (Épées à 2 mains)",
      "armes_categories": [
        "Épées à 2 mains"
      ],
      "specialisations": [
        "Épée à deux mains",
        "Athlétisme"
      ],
      "description_courte": "Style impressionnant utilisant une énorme épée à deux mains maniée à une seule main dans un tourbillon d'acier.",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Épée 2 mains",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": "Épée 2 mains",
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Tourbillon",
          "variante": "Épée 2 mains",
          "ref": "tourbillon",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée 2 mains",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Dilmekiri à une main sans pénalité (si place). Pas de pénalité main non directrice. Changer de main gratuit. Augmentation gratuite Intimidation.",
        "compagnon": "Rang gratuit Tourbillon. Ajoute Tourbillon à Intimidation.",
        "maitre": "Bonus attaque Tourbillon vs Hommes de Main. Ajoute rang Tourbillon aux dommages vs tous."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Empire du Croissant",
        "academies": "Le style Sersemlik ne peut être appris qu’au sein de la tribu des Ruzgar’hala.",
        "description_longue": [
          "L’école de Sersemlik utilise le dilmekiri, une épée à deux mains massive et incurvée. Beaucoup de gens utilisent cette épée à deux mains en raison de sa grande taille, afin de permettre à l’élan et à la vitesse circulaire de fournir la force nécessaire pour trancher un homme en deux. Les spadassins de l’école Sersemlik sont habitués à l’utiliser avec une seule main à la fois sur la garde de leur arme, et exécutent des manœuvres en changeant régulièrement de main afin de percer la défense de leurs adversaires. En dépit de la taille et du poids du dilmekiri, le spadassin Sersemlik peut l’utiliser avec une précision étonnante.",
          "La faiblesse de cette école est sa dépendance à l’élan sans lequel ses coups n’ont aucune puissance. Quand l’un des coups du spadassin est intercepté, ou s’il doit soudainement modifier la direction de son épée, il est momentanément vulnérable."
        ],
        "armes_pdf": "Dilmekiri",
        "specialisations_pdf": [
          "Épée à deux mains",
          "Athlétisme"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Une fois qu’un spadassin Sersemlik sait se déplacer avec son épée, il peut maîtriser son poids et sa taille.",
            "regles": "Vous pouvez utiliser un dilmekiri d’une seule main, à condition d’avoir assez de place (2 mètres) sur ses flancs pour pouvoir la faire virevolter. Vous ne souffrez d’aucune pénalité en utilisant un dilmekiri de cette façon et pouvez combattre aussi bien avec la main gauche qu’avec la main droite. Vous pouvez également changer de main sans perdre d’action et sans aucune pénalité sur vos jets. Enfin, vous pouvez également effectuer d’impressionnantes prouesses en faisant tournoyer l’épée afin d’effectuer une action d’Intimidation dans le Système de Répartie avec une augmentation gratuite."
          },
          "compagnon": {
            "fluff": "Les compagnons du style Sersemlik font non seulement tournoyer leur lame, mais eux aussi, devenant alors un véritable cyclone armé de nombreuses lames.",
            "regles": "Vous obtenez un rang supplémentaire dans la technique de combat Tourbillon. Cela peut porter le niveau de cette technique de combat à 6. Vous pouvez également ajouter votre rang dans la technique de combat Tourbillon à votre jet d’Intimidation dans le cadre du Système de Répartie."
          },
          "maitre": {
            "fluff": "Les maîtres du style Sersemlik ont appris à appliquer leurs capacités à exterminer des brutes à des gens plus entraînés et un peu plus talentueux.",
            "regles": "Ils peuvent utiliser leurs bonus de Tourbillon contre des hommes de main comme s’il s’agissait de brutes. Vous pouvez également ajouter votre rang de Tourbillon à tous les dommages que vous infligez à des Hommes de Main, des Héros, des Scélérats ou des Vilains."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Shan Dian Dao Te",
      "origine": "combat_reclassee",
      "nations": [
        "Cathay"
      ],
      "arme": "Dao",
      "arme_display": "Dao (Sabre)",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Épée à deux mains",
        "Athlétisme"
      ],
      "description_courte": "Style militaire d'élite, basé sur une vitesse fulgurante et une précision mortelle à l'épée à deux mains (dao).",
      "techniques_combat": [
        {
          "nom_base": "Corps à corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "csv"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Épée 2 mains",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Épée 2 mains",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée 2 mains",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Jet d'attaque dao : +1 dé non gardé (+1g0). Avantage Réflexes de combat gratuit.",
        "compagnon": "Initiative : lance 1 Dé d'Action supp, utilise Réflexes de combat pour relancer, puis écarte un dé.",
        "maitre": "+10 Initiative totale, lance et garde un Dé d'Action supplémentaire."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "academies": "On ne peut apprendre l’école Shan Dian Dao Te que dans la province du Han Hua.",
        "description_longue": [
          "Shan Dian Dao Te est un style de combat rapide et percutant, utilisant le dao. Le dao est l’arme standard de l’infanterie impériale du Han Hua, et cette technique est celle des spadassins d’élite de l’armée. Les pratiquants de cette école utilisent la vitesse et la force pour dévier l’arme de leurs adversaires hors de leur position d’attaque en frappant avec une précision mortelle. La principale faiblesse de ce style est son origine militaire, ce qui donne en général des mouvements prévisibles."
        ],
        "armes_pdf": "Dao",
        "specialisations_pdf": [
          "Épée à deux mains",
          "Athlétisme"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école Shan Dian Dao Te apprennent à frapper avec une précision impressionnante.",
            "regles": "Quand vous faites un jet d’attaque avec un dao, vous lancez un dé non gardé supplémentaire (+1g0). Vous recevez également une réduction de 1 PP sur l’avantage Reflexes de combat."
          },
          "compagnon": {
            "fluff": "Le dévouement du compagnon à des mouvements rapides atteint de nouveaux sommets.",
            "regles": "Quand vous lancez votre initiative, vous lancez un dé d’Action supplémentaire, utilisez ensuite votre Avantage Réflexes de combat pour relancer un dé, avant de choisir lequel écarter. Par exemple, si vous avez un Panache de 4, vous lancerez 5 dés et en choisirez 4 parmi ceux-ci après en avoir éventuellement relancé un."
          },
          "maitre": {
            "fluff": "Un maître de Shan Dian Dao Te se déplace si rapidement qu’il est difficile de voir ses actions.",
            "regles": "Vous gagnez +10 à votre Initiative totale, et lancez et gardez un Dé d’Action supplémentaire."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Siggursdottir",
      "origine": "combat_reclassee",
      "nations": [
        "Vesten"
      ],
      "arme": "Francisque",
      "arme_display": "Francisque",
      "armes_categories": [
        "Haches"
      ],
      "specialisations": [
        "Athlétisme",
        "Hache"
      ],
      "description_courte": "Cas limite (lancer de hache), mais le cœur du style est le combat au corps à corps avec deux haches.",
      "techniques_combat": [
        {
          "nom_base": "Double attaque",
          "variante": "Haches",
          "ref": "double attaque",
          "source": "csv"
        },
        {
          "nom_base": "lancer",
          "variante": "Haches",
          "ref": null,
          "source": "csv"
        },
        {
          "nom_base": "tourbillon",
          "variante": "Haches",
          "ref": "tourbillon",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Hache",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice hachette. Augmentation gratuite lancer.",
        "compagnon": "Double attaque hachettes : dommages 3g3, ND défense active +10. Rang gratuit Lancer.",
        "maitre": "Si touche cible (Attaque Hachette), dé d'action suivant devient égal à la phase actuelle."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vestenmannavnjar.",
        "academies": "L’école Siggursdottir fut courtisée par Linnae Knute comme les autres écoles vestens afin d’intégrer la guilde des spadassins, mais les principaux maîtres de ce style refusèrent. Aussi, aujourd’hui encore, son enseignement est plutôt confidentiel et limité aux îles vestens.",
        "description_longue": [
          "L’école de Siggursdottir exploite deux francisques maniées à la vitesse de l’éclair. Ses élèves apprennent tout d’abord à lancer une francisque et à en produire rapidement une seconde. Lorsque le combat a lieu au corps à corps, l’élève lance une série d’attaques meurtrières en hurlant des cris de guerre.",
          "La principale faiblesse du style réside dans son attachement à l’instinct et à la rapidité plutôt qu’à la raison et la prudence."
        ],
        "armes_pdf": "Francisque",
        "specialisations_pdf": [
          "Athlétisme",
          "Hache (la compétence avancée Lancer  [Hache] passe compétence de base)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti a appris à porter au moins trois haches sur lui. Il lance la première puis brandit les deux autres.",
            "regles": "Vous n’êtes victime d’aucune pénalité de main non directrice lorsque vous utilisez une hache et vous bénéficiez d’une augmentation gratuite quand vous en lancez une."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école Siggursdottir sont capables de porter une double attaque mortelle, au cours de laquelle leurs deux haches frappent simultanément.",
            "regles": "Pour réaliser cette botte, utilisez la technique de combat Double attaque bien que les deux haches frappent comme une seule. Le jet de dommage s’élève à 3g3 au lieu de 2g2. Le ND visant à faire appel à une défense active face à cette botte augmente de 10 points. Vous gagnez un rang en Lancer (Hache). Si vous disposez déjà de la compétence à 5, elle passe à 6. Dans le cas contraire, vous pourrez par la suite la faire passer de 5 à 6 en dépensant 25 points d’expérience."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école Siggursdottir sont des guerriers enragés qui assènent des coups très violents à l’aide de leurs haches.",
            "regles": "Lorsque vous parvenez à toucher votre cible à l’aide d’un jet d’Attaque (Hache) tout ce qu’il y a de plus normal, votre dé d’action suivant est égal à la phase actuelle."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "La Siqueira",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Castille"
      ],
      "arme": "Lance",
      "arme_display": "Lance",
      "armes_categories": [
        "Lances"
      ],
      "specialisations": [
        "Lance",
        "Torero"
      ],
      "description_courte": "Style inspiré de toréador, utilisant un épieu et des provocations pour inciter à se faire charger.",
      "techniques_combat": [
        {
          "nom_base": "Feinte de corps",
          "variante": null,
          "ref": "feinte de corps",
          "source": "docx_v2"
        },
        {
          "nom_base": "Force d'âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "docx_v2"
        },
        {
          "nom_base": "Maintenir à distance",
          "variante": null,
          "ref": "maintenir a distance",
          "source": "docx_v2"
        },
        {
          "nom_base": "Esquive Acrobatique",
          "variante": null,
          "ref": "esquive acrobatique",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Peut dépenser 1 Action pour effectuer un jet d'opposition de [Panache + Inciter] contre la Détermination x 5 de votre cible. En cas de réussite, votre cible est exaspérée et doit vous prendre pour cible lors de sa prochaine action d'Attaque ou Déplacement si elle souhaitait en faire.",
        "compagnon": "Lorsque vous êtes la cible d'une action de Charge ou qu’un ennemi entre dans votre Allonge pour ensuite vous attaquer, vous pouvez choisir de ne pas faire d'action de défense active. Si l'attaque de votre adversaire manque (en comparant son jet à votre Défense Passive), vous pouvez immédiatement effectuer une Attaque (Lance) en riposte contre lui, sans dépenser d'action.",
        "maitre": "Lorsque vous réussissez votre riposte grâce à la manœuvre \"Prendre le Taureau par les Cornes\" ou une Réception de Charge, vous ajoutez votre score de Finesse x 2 au total des dégâts infligés. Enfin, toutes les charges que le Maitre Siqueira subit sont réduits d’une valeur égale à sa Gaillardise."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Les toreros entraînés à la Siqueira sont formés à maîtriser un taureau avec grâce en exécutant leur danse. Certains disent que le style trouve ses origines chez les bergers et leurs techniques pour se défendre contre les loups et les voleurs. Muni de sa vara, une sorte d'épieu de chasse, le Duelliste contrôle sa cible en la provoquant dans un premier temps, généralement en lui donnant de petits coups avec le bout de son arme, et parfois même en l'insultant.",
          "Une fois l'ennemi à bout, le pratiquant de la Siqueira le pousse à charger. Quand il se rue sur lui, le Duelliste s'écarte d'un pas de côté et frappe le flanc de son adversaire avant de se remettre rapidement à distance. Le but est de garder l'ennemi hors de portée et de le laisser venir pour garder le contrôle au cours du duel.",
          "La principale faiblesse de la Siqueira est sa dépendance totale à la réaction de son adversaire. Le style est conçu pour contrer une charge directe et prévisible. Il est bien moins efficace contre un adversaire patient qui refuse de charger, qui se bat à distance, ou qui utilise des feintes complexes au lieu d'attaques directes."
        ],
        "origine_texte": "Castille",
        "armes_predilection": "Vara (épieu de chasse ; dotée de l'attribut Réception de charge)",
        "academies": "Castille ; héritage des bergers et des toréros, qui maîtrisent le taureau avec grâce à l'aide de la vara",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": "Prendre le Taureau par les Cornes",
            "regles": "L'apprenti obtient une augmentation gratuite pour ses jets de Défense Active et sa Défense Passive quand un ennemi entre dans son allonge via un déplacement normal ou une Charge"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Le compagnon obtient une augmentation gratuite à ses jets d'attaque résultant de Réception de Charge. Une fois par round quand un ennemi entre dans son allonge via un déplacement, il peut utiliser « Réception de Charge » comme si cet ennemi avait utilisé une Charge, avec tous les avantages que cela donne au compagnon Siqueira"
          },
          "maitre": {
            "fluff": null,
            "regles": "Le Maitre peut utiliser une deuxième fois « Réception de charge » sur un simple déplacement ennemi vers son allonge. Sur une riposte réussie via la Réception de charge, le maître ajoute sa Finesse x2 aux dés non gardés des dommages ; de plus, toute charge qu'il subit voit ses dommages réduits d'un montant égal à sa Gaillardise"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Snedig",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Escrime",
        "Médecin"
      ],
      "description_courte": "Style basé sur la connaissance de l'anatomie ennemie.",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": "Rapière",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Rapière",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Fente en avant",
          "variante": "Rapière",
          "ref": "fente en avant",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Peut échanger Dés d'Action contre dés dommages gardés (+1g1) sur attaque rapière.",
        "compagnon": "Peut échanger Dés d'Action contre dés Esprit gardés (+1g1) sur Défense Active. Utilise Exploiter faiblesses (Leegstra).",
        "maitre": "Si adversaire rate jet blessure (Attaque Escrime), +1 blessure grave par 10 pts marge échec."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Leegstra.",
        "origine_texte": "Ligue de Vendel.",
        "description_longue": [
          "Snedig est un style dérivé de celui de Leegstra, qui utilise une arme d’escrime à la place de l’épée large ou de la hache. Ce style combine la détermination de Leegstra avec les connaissances anatomiques d’un médecin.",
          "Si la rapière ne peut bénéficier de la puissance brutale d’une arme lourde, elle peut pénétrer profondément dans les zones vitales de sa cible. Ce style enseigne à ses étudiants à viser les principaux organes du corps humain afin de maximiser l’effet de leurs attaques, tout en se concentrant d’abord sur la défense.",
          "La faiblesse de Snedig est similaire à celle de Leegstra, le style dont il est issu."
        ],
        "academies": "Tor Snedig, jadis médecin, enseigne désormais son École à plein temps dans l’école principale à Kirk. Yolande dirige celle de Västeras mais est actuellement en Montaigne où elle ouvre une école à Charousse sur la demande du gouvernement révolutionnaire de ce pays. D’autres maîtres Snedig contrôlent des écoles à Eskilstuna, Isafjordhur et dans l’une des petites communautés d’Eskjö. Le prix de l’admission est élevé, mais Tor souhaite en réduire le montant au fil des années. Toutefois, l’importance du droit d’entrée n’a fait que renforcer le prestige de cette École au sein de l’élite vendelare.",
        "homologation": "1665",
        "doyen": "Tor Snedig (1665)",
        "insigne": "Une rapière traversant de bas en haut et de gauche à droite, un cœur.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Escrime",
          "Médecin"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "En apprenant le style de Snedig, vous apprenez à concentrer vos attaques à la rapière sur les organes vitaux de vos ennemis.",
            "regles": "Vous pouvez choisir de ne pas utiliser de dés d’action afin de garder des dés de dommages supplémentaires, en espérant que le coup de votre héros porte. Vous pouvez renoncer à utiliser autant de dés d’action que vous le désirez (un dé de dommage pour un dé d’action non utilisé). Vous devez déclarer votre intention avant de faire votre jet d’attaque ; si vous le ratez, vous perdez les dés d’action non utilisés."
          },
          "compagnon": {
            "fluff": "Les compagnons ont appris à dévier des attaques qui auraient tué n’importe quel homme.",
            "regles": "Vous pouvez mettre un dé d’action de côté afin de bénéficier d’un bonus de +1g1 à vos défenses actives. En outre, vous pouvez maintenant utiliser votre technique de combat Exploiter les faiblesses (Escrime) contre les armes lourdes lorsque votre adversaire utilise le style Leegstra."
          },
          "maitre": {
            "fluff": "La connaissance pointue du maître en anatomie et sa sinistre détermination à infliger des dommages létaux rendent ses attaques à la rapière extrêmement mortelles et vicieuses.",
            "regles": "Quand votre adversaire échoue à son jet de Blessure lorsque vous l’avez attaqué à l’aide de votre compétence Attaque (Escrime), il encaisse une blessure grave supplémentaire par tranche de 10 points d’échec."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Soldano",
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
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Style basé sur l'utilisation d'un sabre dans chaque main",
      "techniques_combat": [
        {
          "nom_base": "Double parade",
          "variante": "Sabre",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "marquer",
          "variante": "Sabre",
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "tourbillon",
          "variante": "Sabre",
          "ref": "tourbillon",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Sabre",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice (2 armes Escrime). Reçoit dés d'héroïsme = niveau maîtrise début combat.",
        "compagnon": "Peut dépenser dé d'héroïsme pour abaisser seuil blessure grave de 5 pts (min 5).",
        "maitre": "Une fois par tour (vs vilain), action Intimidation gratuite (+bonus par ennemis vaincus). Vole dés d'héroïsme si réussite."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "reduction_xp": "20 PP pour les personnages connaissant déjà Yael.",
        "origine_texte": "Castille.",
        "description_longue": [
          "Ce style de combat est un emprunt aux Montaginois et aux Croissantins, même si les Castillians ont parfaitement réussi à l’imprégner de leur personnalité. L’élève apprend à combattre armé d’un sabre dans chaque main, tourbillonnant et bondissant au beau milieu de ses ennemis comme une tornade, ne laissant que ruines derrière lui.",
          "Les élèves de Soldano combattent avec intuition et panache, dispersant les hordes de guerriers incompétents qui leur font face, courrouçant ensuite leurs ennemis avant d’exécuter un coup meurtrier de leurs lames jumelles.",
          "Cependant, les combattants de Soldano font parfois preuve d’un peu trop d’exubérance. Dans leur excitation, ils laissent de petites ouvertures dans leur défense dont un adversaire de talent saura tirer parti."
        ],
        "academies": "Il y a quatre écoles de Soldano à Altamira, et quelques autres réparties dans le rancho Soldano. Des écoles existent également dans le rancho Aldana (à San Cristobal en particulier), dans les montagnes de Gallegos (Malaca, San Gustavo et Rioja) et à San Augustin. La plupart des autres nations considèrent le style à deux rapières comme barbare, et détestent ses racines croissantines. La Vodacce serait le pays logique pour ouvrir une école de Soldano, mais on y préfère l’École Bernouilli elle aussi inspirée de styles croissantins. Quelques mousquetaires de la province de Valroux ont appris ce style, mais en raison de la récente guerre et du manque relatif d’intérêt, Montevada ne projette pas encore d’ouvrir une école dans cette province.",
        "homologation": "1652",
        "doyen": "Eduardo Montevada (1664)",
        "insigne": "Deux rapières croisées.",
        "armes_pdf": "Sabre",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école de Soldano sont formés pour se charger d’un grand nombre d’adversaires mal entraînés en même temps – avec style de surcroît.",
            "regles": "Lorsque vous utilisez une lame d’escrime dans chaque main, la pénalité de main non directrice disparaît. En outre, au début de chaque combat, vous recevez un nombre de dés d’héroïsme égal à votre niveau de maîtrise. Les dés d’héroïsme inutilisés à la fin du combat disparaissent."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école de Soldano sont capables de rassembler leurs forces en une seule et même attaque dévastatrice",
            "regles": ". Une fois les dommages infligés à votre adversaire, mais avant qu’il n’effectue son jet de blessure, il vous est possible de dépenser un dé d’héroïsme (par exemple, l’un de ceux octroyés par le niveau d’apprenti ou la technique de combat Double parade) afin d’abaisser de 5 points le nombre requis par l’ennemi pour subir une blessure grave supplémentaire. Vous pouvez le faire autant de fois que vous le souhaitez mais le “seuil de blessure” ne peut descendre en dessous de 5. Par exemple : normalement, un adversaire doit échouer à son jet de blessure de 20 points pour recevoir une blessure grave supplémentaire. En utilisant cette faculté et en dépensant 2 dés d’héroïsme, ce nombre tombe à 10 (5 fois 2 dés d’héroïsme)."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Soldano ont appris à exaspérer et à déjouer les coups de leurs plus dangereux adversaires.",
            "regles": "Une fois par tour, au début d’un tour durant lequel vous affrontez un vilain, vous pouvez user d’une action d’intimidation contre lui sans dépenser d’action. Ajoutez au jet 1 point par brute et 5 points par homme de main que vous avez déjà terrassés lors de ce combat. Si vous l’emportez, au lieu de bénéficier des effets normaux de l’intimidation, vous dérobez au MJ l’un de ses dés d’héroïsme, plus un par tranche de 5 points obtenue au- dessus du ND."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Ssang Geom",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Cathay"
      ],
      "arme": "Deux épées",
      "arme_display": "Deux épées",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Armes exotiques jumelées",
        "Athlétisme"
      ],
      "description_courte": "Style de combat Hanin basé sur une coordination parfaite des épées jumelles pour déchaîner un assaut incessant, briser la garde de l'adversaire et lancer des ripostes imparables.",
      "techniques_combat": [
        {
          "nom_base": "Double Attaque",
          "variante": "Armes exotiques jumelées",
          "ref": "double attaque",
          "source": "docx_v2"
        },
        {
          "nom_base": "Double Parade",
          "variante": "Armes exotiques jumelées",
          "ref": "double parade",
          "source": "docx_v2"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "docx_v2"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Ssang Geom",
          "ref": "exploiter les faiblesses",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de malus de malus de main non-directrice pour 2 épées. Lorsque vous maniez deux armes exotiques jumelées et que vous effectuez une action de Parade, vous pouvez choisir de relancer deux dès.",
        "compagnon": "Vos attaques à deux armes voient leur ND augmenté de 5 au lieu de 10. Vos parades à deux armes vous octroient 2 dés d’héroïsme à utiliser avant la fin du round au lieu de deux.",
        "maitre": "Lorsque vous réussissez une action de Parade contre un adversaire vous pouvez choisir de dépenser 1 Action pour effectuer immédiatement une Attaque (Escrime) en riposte contre lui. Cette attaque est si rapide et bien placée qu'elle ignore l’Attribut « Défensive » conféré par les armes et boucliers."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Le Ssang Geom (« les épées jumelles ») est un style de combat originaire du Han. Longtemps ignoré et méprisé, le style bénéficie aujourd'hui d'un regain d'intérêt grâce à la réputation de son maître le plus célèbre : l'amirale Ji. De nombreuses nouvelles écoles ont vu le jour, souvent dirigées par de prétendus maîtres cherchant à profiter de cette mode. L'amirale Ji elle-même ne forme aucun étudiant, privilégiant ses responsabilités militaires. Le Ssang Geom est un style basé sur l'utilisation de deux épées, une pour la défense et l'autre pour l'attaque, le combattant passant rapidement de l'une à l'autre.",
          "L'adepte du Ssang Geom manie une paire de sabres coréens appelés Ssanghwando. Il s'agit de deux Hwando – des sabres à un seul tranchant – de taille quasi identique, permettant de passer sans effort de l'attaque à la défense. Pour optimiser la vitesse de leurs parades, certains duellistes choisissent d'utiliser une lame très légèrement plus courte et plus légère pour leur main défensive, une subtilité laissée à l'appréciation de chaque combattant.",
          "La principale faiblesse du Ssang Geom est sa dépendance à un rythme et un espace suffisant pour manœuvrer ses deux lames. Le style est moins efficace dans les espaces très confinés. De plus, un adversaire qui parvient à briser le rythme du duelliste avec une manœuvre de \"Briser l'Arme\" ou en immobilisant l'une de ses deux lames peut neutraliser une grande partie de son répertoire offensif et défensif."
        ],
        "origine_texte": "Han (Cathay)",
        "armes_predilection": "Paire de Ssanghwando (deux sabres han à un seul tranchant ; la lame défensive est parfois légèrement plus courte)",
        "academies": "Han (Cathay) ; style longtemps méprisé, popularisé par l'amirale Ji — laquelle ne forme toutefois aucun élève, privilégiant ses responsabilités militaires",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Maniant deux armes exotiques jumelées, l'apprenti supprime le malus de main non-directrice ; de plus, lors d'une action de Parade, il peut relancer un de ses dés, et deux s'il utilise la technique « Double Parade »"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Les deux attaques de la technique « Double Attaque » du compagnon voient leur ND augmenté de 5 (au lieu de 10) ; ses parades à deux armes lui octroient 2 dés d'héroïsme (au lieu de l'unique dé conféré par Double Parade)"
          },
          "maitre": {
            "fluff": null,
            "regles": "Lorsque le maître réussit une Double Parade, il peut choisir de ne pas gagner les deux dès d'héroïsme temporaires normalement conférés, et peut à la place dépenser un dès d'Héroïsme(même temporaire) pour pour riposter aussitôt par une Attaque (Armes exotiques jumelées) si rapide et bien placée qu'elle ignore l'attribut « Défensive » conféré par les armes et les boucliers"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Swanson",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Canne-épée",
      "arme_display": "Canne-épée (Rapière)",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Combat de rue",
        "Escrime"
      ],
      "description_courte": "Style où le fourreau de la canne-épée est tenue en main gauche comme une arme de parade",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": "Rapière",
          "ref": "coup de pommeau",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Double parade",
          "variante": "Escrime/Fourreau",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Fourreau = 1g1 dommages. Pas de pénalité main non directrice. Pas de pénalité Double Parade (canne/fourreau).",
        "compagnon": "\"Cheval de Bois\" : Attaque fourreau (augmentation) immobilise adversaire (ND touché spadassin -5).",
        "maitre": "Dégainer sans pénalité. Une fois par Round, Défense Active (Parade/Double) sans dépenser Dé d'Action."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Ligue de Vendel.",
        "description_longue": [
          "Ce style est notoirement connu pour utiliser une lame d’escrime dans une main et son fourreau dans l’autre, ce qui est considéré comme très lâche (la plupart des spadassins préfèrent garder leur fourreau attaché à leur ceinture).",
          "La seule lame d’escrime dont le fourreau n’est pas porté à la ceinture est la canne-épée, que les pratiquants du style Swanson choisissent maintenant presque exclusivement pour son côté pratique. Sans le style Swanson, la difficulté de se défendre avec une canne-épée, couplée à la tendance des spadassins à jeter la gaine jugée inutile, en ferait un instrument inadéquat pour des duels.",
          "La principale faiblesse de cette école réside dans le fait que l’étudiant doit nécessairement se tenir près de son ennemi en raison de la courte longueur de la lame utilisée."
        ],
        "academies": "On trouve aujourd’hui deux écoles enseignant ce style de combat, la première est à Kirk et la seconde à Västeras.",
        "homologation": "1668",
        "doyen": "Poul Swanson (1668)",
        "insigne": "Une canne-épée (on dirait un bâton ou une crosse très simple).",
        "armes_pdf": "Canne-épée",
        "specialisations_pdf": [
          "Combat de rue",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti de l’école Swanson peut utiliser le fourreau de sa canne-épée comme arme d’escrime.",
            "regles": "Elle fait 1g1 dé de dommages, mais il souffre toujours de la pénalité de +5 s’il essaie d’effectuer une défense active avec sa canne-épée. Il ne subit pas la pénalité de main non-directrice quand il manie le fourreau de son arme dans son autre main. Par contre, les spadassins de l’école Swanson ne subissent pas cette pénalité lorsqu’ils effectuent une double parade (Canne- épée/Fourreau)."
          },
          "compagnon": {
            "fluff": "Le compagnon a appris la technique du “Cheval de Bois”. Le spadassin glisse son fourreau entre les cuisses de son adversaire, limitant ainsi sa mobilité.",
            "regles": "Pour exécuter cette manœuvre, vous devez d’abord la déclarer puis effectuer une attaque avec votre fourreau contre un ND avec un malus d’une augmentation. Si vous réussissez, vous n’infligez aucun dommage, mais vous avez placé votre fourreau entre les jambes de votre ennemi. Diminuez le ND pour être touché de votre spadassin de 5 tant que la gaine de votre arme est située entre les jambes de votre adversaire car votre bras est exposé. Par contre, tant que la gaine reste en place, l’adversaire ne peut pas s’enfuir et ne peut utiliser ses compétences d’Équilibre, de Jeu de jambes et toute autre compétence faisant appel au mouvement des membres inférieurs comme compétence défensive. Vous pouvez laisser votre gaine entre les jambes de votre adversaire aussi longtemps que vous le souhaitez, mais il est plus aisé pour celui-ci de vous toucher aussi longtemps que vous restez dans cette position."
          },
          "maitre": {
            "fluff": "Quand le spadassin atteint le rang de maître, il se rend compte que la clef de la victoire réside dans l’économie de mouvement. Le maître peut utiliser la lame de sa canne-épée de n’importe quelle manière pour attaquer ou se défendre sans aucune pénalité.",
            "regles": "Une fois par round, vous pouvez effectuer une défense active en utilisant votre canne-épée sans dépenser de dé d’action. Vous ne pouvez effectuer qu’une Parade ou une Double-parade à l’aide de cette action gratuite."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Szybowanie",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Sabre de cavalerie",
      "arme_display": "Sabre de cavalerie",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Athlétisme",
        "Equitation"
      ],
      "description_courte": "Style inspiré de la cavalerie, privilégiant les coups hauts et sautés",
      "techniques_combat": [
        {
          "nom_base": "Charge de cavalerie",
          "variante": null,
          "ref": "charge de cavalerie",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Sabre",
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Saut de cheval",
          "variante": null,
          "ref": "saut de cheval",
          "source": "docx_v2"
        },
        {
          "nom_base": "Harceler",
          "variante": null,
          "ref": "harceler",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {
        "apprenti": "Lorsque vous attaquez un adversaire qui se trouve sur un terrain plus bas que le vôtre, vous bénéficiez d'une Augmentation gratuite (+5 au total) sur votre jet d'Attaque. Vous apprenez les bases du « Plongeon de l’Aigle » : Vous pouvez effectuer une action de Charge sautée : Vous effectuez une charge classique mais ignorez le malus de -1g1 normalement imposé.",
        "compagnon": "Vous pouvez dépenser une Action pour effectuer un \"Plongeon de l'Aigle\". Il s'agit d'une Attaque au sabre. Si elle réussit, vous ajoutez votre compétence « Saut » x2 (arrondi au supérieur) au total des dégâts.",
        "maitre": "Lorsque vous réussissez une attaque avec la manœuvre \"Plongeon de l'Aigle\", non seulement vous infligez les dégâts supplémentaires, mais la cible est également jetée à terre par la force de l'impact."
      },
      "restriction_creation": "inconnue",
      "genre_restriction": null,
      "enrichie": true,
      "details": {
        "description_longue": [
          "Du haut de leurs chevaux, les célèbres hussards ailés font de terribles adversaires. Ils pointent leurs lances sur l'ennemi en les chargeant avec férocité. Leur armure inspire la crainte à leurs adversaires, et ils s'occupent de leurs chevaux comme de leurs camarades. Le lien entre un hussard et sa monture est indestructible.  Une hussarde particulièrement perspicace nommée Kyra Mikita se rendit un jour compte que toutes les situations ne permettaient pas de profiter de leur supériorité équine. Elle mit au point le Style de combat du Szybowanie. Peu importe l'arme que l'on a en main, le but de ce Style consiste à trouver un avantage sur le champ de bataille.  Basé sur le combat depuis n'importe quelle hauteur avantageuse, et pas seulement depuis le dos d'un cheval, le Style permet de porter dès que possible un puissant coup nommé Plongeon de l'aigle. Les pratiquants du Szybowanie restent constamment en mouvement sur le champ de bataille pour trouver la position la plus avantageuse.",
          "La principale faiblesse du Szybowanie est sa dépendance absolue à un environnement offrant des dénivelés. Sur un terrain parfaitement plat et sans obstacles, le duelliste est privé de sa tactique principale. Il est forcé de d'utiliser des sauts plus modérés, perdant une bonne partie de l'avantage unique que lui confère son entraînement tout en rendant son attaque prévisible."
        ],
        "origine_texte": "Rzeczpospolita (Fédération Sarmatienne)",
        "armes_predilection": "Sabre (mais « peu importe l'arme ») ; combat depuis une position élevée ; monture dressée au sein de l'école",
        "academies": "Fédération Sarmatienne ; style mis au point par la hussarde Kyra Mikita, fondé sur le combat depuis toute hauteur avantageuse, et non plus seulement à cheval",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Lorsque l'apprenti attaque un adversaire situé plus bas que lui, il bénéficie d'une augmentation gratuite. Il peut en outre effectuer une charge sautée : une Charge classique dont il ignore le malus de -1g1"
          },
          "compagnon": {
            "fluff": "Plongeon de l'Aigle",
            "regles": "Le compagnon peut effectuer une Attaque (Sabre) en piqué sans avoir à charger (il doit quand même effectuer un déplacement ou le « sacrifier » même en cas de surplace). ; en cas de réussite, il ajoute son rang de Sauter x2 aux dés non gardés des dommages"
          },
          "maitre": {
            "fluff": null,
            "regles": "Lorsque le maître réussit un Plongeon de l'Aigle, la cible est en outre jetée à terre par la force de l'impact"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      }
    },
    {
      "nom": "Torres",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Cape",
        "Escrime"
      ],
      "description_courte": "Style basé sur l'utilisation de la cape de duel en main gauche pour défendre et distraire l'adversaire",
      "techniques_combat": [
        {
          "nom_base": "Double parade",
          "variante": "cape/escrime",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Taureaux",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte de corps",
          "variante": null,
          "ref": "feinte de corps",
          "source": "csv"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice (cape). Pas de côté affecte 1 dé d'action supp par niveau de maîtrise.",
        "compagnon": "Défense active : abaisse dés d'action de 2 x niveau de maîtrise phases.",
        "maitre": "Gagne 1 rang d'Esprit (et max +1)."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Castille.",
        "description_longue": [
          "Originellement créée dans le cadre de la tauromachie, le style Torres est l’art d’utiliser une rapière et une cape dans l’autre.",
          "L’élève réalise des mouvements subtils pour attirer l’attention de son adversaire sur la cape, puis la rapière plonge dans son angle mort.",
          "L’école de Torres constitue un style de défense particulièrement efficace. En effet, la cape et l’épée forment un véritable mur de tissu et d’acier séparant l’élève de la lame de son adversaire. Les maîtres de cette école comptent parmi les hommes les plus vifs et agiles du monde.",
          "Néanmoins, le style de combat Torres n’est que de peu d’utilité lorsqu’il s’agit de passer à l’attaque. Même si ses élèves sont rapides et agiles, ils manquent de cette puissance de pénétration dont disposent les élèves d’Eisenfaust et de Leegstra."
        ],
        "academies": "Les quelques Écoles de Torres qui existent aujourd’hui forment leurs élèves aux lois de la Guilde. Comme indiqué ci-dessus, Jaime est souvent hors de Castille et les écoles Torres du rancho Torres viennent de rouvrir après deux années de clandestinité. Cela complique bien entendu les communications. La seule école en dehors du rancho Torres se trouve à Altamira et est dirigé par Jaime. Ses fonctions se sont allégées, surtout depuis que son ami Jack Webster lui a offert d’ouvrir une école à Carleon, même si jusqu’à présent Jaime sait très bien que sa famille n’a pas les ressources nécessaires à cette ouverture.",
        "homologation": "1668",
        "doyen": "Jaime Bejarano de Guzman (1668)",
        "insigne": "Une rapière devant une muletta.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Cape",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école de Torres connaissent l’art d’utiliser leur cape pour détourner l’attention de leur adversaire de leurs véritables intentions.",
            "regles": "Lorsque vous utilisez une cape, la pénalité de main non-directrice est annulée. En outre, votre compétence Pas de côté affecte un dé d’action supplémentaire pour chaque niveau de maîtrise que vous possédez chaque fois que vous vous en servez. Par exemple : un apprenti disposant de 3 rangs dans la compétence Pas de côté qui obtient 7, 7 et 8 à l’initiative peut affecter 2 dés d’action dans le cadre d’une défense active réussie, transformant ainsi son initiative en 4, 4 et 8."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école de Torres ont un jeu de jambes très rapide. Ils ont également appris à cacher leurs mouvements derrière leur cape.",
            "regles": "Lorsque vous effectuez une défense active, abaissez vos dés d’action d’un nombre de phases égal à deux fois votre niveau de maîtrise. Vous bénéficiez d’une augmentation gratuite à toutes vos attaques effectuées avec une lame d’escrime lorsque vous maniez également une cape."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école de Torres comptent parmi les combattants les plus vifs et agiles du monde.",
            "regles": "Lorsque vous atteignez ce niveau, vous gagnez un rang d’Esprit. Cela augmente également votre rang potentiel d’un point en Esprit. Ainsi, un maître de l’école de Torres peut voir son esprit monter à 6 (voire à 7, avec l’avantage Trait légendaire)."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Trécy",
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
        "Courtisan",
        "Escrime"
      ],
      "description_courte": "Style basé sur l'étude des autres styles de duel",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": "Rapière",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Rapière",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Riposte",
          "variante": "Rapière",
          "ref": "riposte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Augmentation gratuite sur tous les jets de Parade (Escrime).",
        "compagnon": "Insensible à la Répartie et aux provocations en combat.",
        "maitre": "Bonus de +1 à la compétence Attaque (Escrime), pouvant aller jusqu'au rang 6."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Montaigne.",
        "description_longue": [
          "Grégoire de Trécy codifia et décrivit l’escrime moderne telle qu’il put l’observer dans ses voyages d’étude. C’est à partir de cette étude qu’il élabora les principes de son art : le duelliste doit s’efforcer d’étudier l’escrime de son adversaire, selon une méthode bien précise (analyse des positions et postures de l’adversaire, tests de sa technique…). Les adeptes de ce style sont de fait parmi les plus fins connaisseurs et pratiquants de l’escrime moderne et analysent leurs adversaires avec une redoutable rapidité.",
          "La faiblesse de ce style réside dans le fait qu’ils risquent d’être troublés par des duellistes exerçant une escrime inhabituelle ; ou abusés par des spadassins qui, connaissant la méthode d’analyse des duellistes Trécy, retournent leur attentisme contre eux en cachant leur jeu. Cette école utilise la rapière."
        ],
        "academies": "L’École de Trécy est enseignée uniquement en Montaigne, Valroux l’éclipse complètement à l’étranger. On peut trouver des écoles enseignant le style Trécy dans l’ouest du pays : à Entour, Bastonne, Vergneux, Bascone et Buc.",
        "homologation": "1645",
        "doyen": "Jean-Grégoire de Trécy (1645)",
        "insigne": "Une rapière tournée vers le haut devant un œil ouvert.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Courtisan",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti apprend avant tout à observer son adversaire et à analyser son escrime. Il est ainsi plus à même de s’en protéger.",
            "regles": "Un spadassin de l’école Trécy bénéficie donc d’une augmentation gratuite sur tous ses jets de Parade (Escrime)."
          },
          "compagnon": {
            "fluff": "À ce niveau, les compagnons de ce style sont des duellistes imperturbables.",
            "regles": "En situation de combat, ils sont alors insensibles au système de répartie, ainsi qu’aux autres types de provocation (comme la technique de compagnon Valroux)."
          },
          "maitre": {
            "fluff": "Les maîtres du style Trécy exercent une escrime extraordinairement fine et subtile.",
            "regles": "Lorsqu’un spadassin atteint ce niveau, il bénéficie d’un bonus de +1 à sa compétence Attaque (Escrime), élevant celle-ci jusqu’au rang 6."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Urostifter",
      "origine": "officielle",
      "nations": [
        "Vesten"
      ],
      "arme": "Épée longue",
      "arme_display": "Épée longue",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime",
        "Athlétisme"
      ],
      "description_courte": "Style à deux épées et aux multiples railleries et provocations",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": "Épée",
          "ref": "coup puissant",
          "source": "csv"
        },
        {
          "nom_base": "Double parade",
          "variante": "Épée",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Épée",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épée",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Epée longue une main sans pénalité. Pas de pénalité main non directrice. Augmentation Gratuite Parade.",
        "compagnon": "Augmentation Gratuite Feinte, Coup puissant et Intimider.",
        "maitre": "+1g0 dommages épée longue. Action supplémentaire par Round pour Intimidation."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vestenmannavnjar.",
        "description_longue": [
          "Urostifter est un antique style de combat vesten qui utilise une paire d’épées longues. Il n’est pas aussi orienté sur la défense que le style Kjemper, préférant décontenancer son adversaire ; le spadassin heurte la lame de son adversaire et utilise d’éblouissantes feintes afin de se créer des ouvertures pour ses assauts. Cela s’accompagne d’un flot continu de railleries.",
          "Il manque à ce style le flair d’un spadassin de Valroux, qui dénigrera les compétences martiales et le sens de la mode de son adversaire, mais il le compense par des saillies au vitriol. Les spadassins d’Urostifter ont tendance à énoncer des plaisanteries horribles sur l’épouse, la mère, la sœur, la petite taille, le surpoids ou l’intelligence de leur adversaire.",
          "Certains duellistes estiment que la faiblesse d’Urostifter réside dans le fait que ce style devient inutile si le spadassin perd l’une de ses lames, mais ce n’est pas vrai. Si l’une de ses armes est brisée ou perdue, il est tout à fait capable de se défendre avec celle qui lui reste. La véritable faiblesse de cette école est qu’elle est trop basée sur la duperie et les railleries ; et si l’ennemi ne réagit pas à ces dards lancés sur son orgueil et sa fierté, le spadassin d’Urostifter sera rapidement mis hors-jeu."
        ],
        "academies": "Comme Leegstra, on trouve des maîtres d’armes pouvant vous enseigner le style Urostifter dans presque toutes les communautés vestens. Cette École n’est pas encore enseignée dans d’autres pays, même si certains Eisenfürsten d’Eisen se sont montrés intéressés.",
        "homologation": "1668",
        "doyen": "Thorfinn Ásgautr (1668)",
        "insigne": "Deux épées longues croisées.",
        "armes_pdf": "Épée longue",
        "specialisations_pdf": [
          "Escrime",
          "Athlétisme"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Le style Urostifter enseigne à ses apprentis à utiliser deux épées longues simultanément.",
            "regles": "Vous pouvez utiliser deux épées longues sans pénalité de main non-directrice. De plus, vous bénéficiez d’une augmentation gratuite lorsque vous effectuez une Parade avec une épée longue."
          },
          "compagnon": {
            "fluff": "Le temps est votre allié pour vaincre vos adversaires.",
            "regles": "Vous bénéficiez d’une augmentation gratuite pour toutes vos Feintes et Coups puissants effectués à l’aide d’une épée longue. De plus, vous bénéficiez également d’une augmentation gratuite quand vous utilisez le Système de Répartie."
          },
          "maitre": {
            "fluff": "Le maître a appris à briser aussi bien le corps que l’esprit de son adversaire.",
            "regles": "Vous lancez, sans le garder, un dé supplémentaire (+1g0) à vos jets de dommages effectués avec une épée longue. Vous bénéficiez également d’une action supplémentaire (+1g1) pour effectuer une action grâce au Système de Répartie."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Valroux",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Rapière et main-gauche",
      "arme_display": "Rapière et main-gauche (Couteau)",
      "armes_categories": [
        "Escrime (Rapière)",
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Escrime"
      ],
      "description_courte": "Style populaire mais classique, basé sur les parades main gauche, provocations et rapidité",
      "techniques_combat": [
        {
          "nom_base": "Double parade",
          "variante": "escrime/couteau",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "marquer",
          "variante": "escrime",
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "feinte",
          "variante": "escrime",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de malus dague. Augmentation gratuite parade main non directrice.",
        "compagnon": "Si attaque avec augmentation touche, adversaire obligé de tenter au moins autant d'augmentations au prochain coup.",
        "maitre": "Bonus +1 Panache (et max +1)."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Montaigne.",
        "description_longue": [
          "Cette technique fait partie de celles qui reposent sur l’utilisation d’une arme d’escrime dans la main directrice et d’une arme de parade dans l’autre. Cette technique de combat est principalement défensive et l’arme accessoire ne sert qu’à parer.",
          "Ceux qui la pratiquent apprennent à provoquer leur adversaire : ils lui font remarquer ses erreurs de placement, soulignent les occasions dont ils auraient pu profiter, en bref, ils s’amusent à humilier leur adversaire avant de l’achever lorsque le duel devient trop ennuyeux.",
          "L’une des principales forces de cette technique, c’est sa rapidité d’exécution. Les maîtres frappent plus souvent et plus rapidement que n’importe qui d’autre. Ils tournent autour de leur adversaire, tout en frappant de plus en plus vite et en l’insultant afin de le pousser à la faute. Remporter un duel contre un spadassin pratiquant cette technique demande une volonté de fer et une patience à toute épreuve.",
          "À l’opposé, son principal défaut, c’est son arrogance. Un spadassin connaissant cette technique saura faire semblant d’ouvrir sa défense : son adversaire ne manquera pas de le lui faire remarquer et baissera légèrement sa garde ; il ne restera plus qu’à frapper."
        ],
        "academies": "On peut trouver des écoles enseignant le style Valroux dans toutes les provinces montaginoises. Plusieurs académies ont fermé leurs portes après la révolution, mais les autres restent ouvertes à tous ceux – noble ou paysan – qui veulent apprendre l’art du duel à la montaginoise. Valroux domine aujourd’hui le monde de l’escrime montaginoise et les autres Écoles se partagent les miettes des escrimeurs ne souhaitant pas apprendre ce style. La famille Valroux a également ouvert des écoles en Avalon, en Vendel et en Eisen. Il en existait également autrefois en Castille, mais elles perdirent tous leurs élèves lorsque l’Empereur reconnut publiquement la sorcellerie Porté en 1664. La Vodacce préfère l’École Ambrogia comme style à deux armes, mais quelques Écoles y ont toutefois été ouvertes. L’Ussura et les Vestens se moquent totalement de l’École Valroux.",
        "homologation": "1644",
        "doyen": "Sébastien Valroux de Martise.",
        "insigne": "Une rapière et une main gauche croisée, la garde de la rapière en bas à droite et sa pointe en haut à gauche.",
        "armes_pdf": "Rapière et main-gauche",
        "specialisations_pdf": [
          "Couteau",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’apprenti ne subit pas le malus lié à l’utilisation d’une dague en même temps que d’une arme d’escrime.",
            "regles": "Il bénéficie aussi d’une augmentation gratuite lorsqu’il utilise l’une de ces armes pour parer avec sa main non-directrice."
          },
          "compagnon": {
            "fluff": "Le compagnon sait faire “monter les enchères” lors des duels.",
            "regles": "Si vous annoncez que vous tentez d’obtenir au moins une augmentation lors d’une attaque et si cette attaque porte, l’adversaire de votre héros est obligé, durant sa prochaine attaque contre vous, de tenter d’obtenir au moins autant d’augmentations que vous."
          },
          "maitre": {
            "fluff": "Les maîtres de cette technique sont les escrimeurs les plus rapides au monde.",
            "regles": "Lorsque le héros atteint ce niveau, il bénéficie d’un bonus de +1 à son trait de Panache (“gratuitement”). Ce qui augmente aussi la valeur maximale de ce trait de 1 : ainsi un maître de cette technique pourra avoir un rang 6 (voir 7 avec certains avantages) en Panache."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Villanova",
      "origine": "officielle",
      "nations": [
        "Vodacce"
      ],
      "arme": "Schiavone et couteau alla stradiota",
      "arme_display": "Schiavone (Épée) et couteau alla stradiota",
      "armes_categories": [
        "Escrime (Épée)",
        "Couteau"
      ],
      "specialisations": [
        "Couteau",
        "Escrime"
      ],
      "description_courte": "Style basé sur les coups bas et autres feintes",
      "techniques_combat": [
        {
          "nom_base": "Coup fourré",
          "variante": "Rapière",
          "ref": "coup fourre",
          "source": "csv"
        },
        {
          "nom_base": "Double Parade",
          "variante": "Rapière/couteau",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "feinte",
          "variante": "Rapière",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Rapière",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Pas de pénalité main non directrice poignard. Augmentation gratuite Parade (Couteau).",
        "compagnon": "Rang gratuit Feinte.",
        "maitre": "Peut diminuer volontairement ND touché (par 5). Si Coup fourré exécuté ensuite, augmentation gratuite par tranche de 5."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Vodacce.",
        "description_longue": [
          "La sinistre famille Villanova use depuis bien longtemps de sinistres machinations politiques pour imposer sa volonté, mais elle abrite également de meurtriers spadassins. L’école de Villanova permet de rendre rapidement les coups, mais elle inclut également de vilaines bottes dans son style de combat.",
          "La plus grande force de l’école Villanova est cette faculté à renvoyer les attaques des adversaires. Elle emploie un mouvement appelé Coup fourré, qui consiste à faire glisser sa lame le long de celle de son adversaire pour lui infliger des dommages dévastateurs. Elle use également d’un grand nombre de feintes et autres manœuvres trompeuses qui permettent au spadassin de dissimuler ses véritables intentions aux yeux de son adversaire.",
          "Malheureusement, l’école de Villanova encourage également la confiance à outrance de ses pratiquants, qui croient souvent que leurs adversaires ne voient pas clair dans leur jeu. Beaucoup d’élèves de l’école Villanova ont sous-estimé leurs adversaires en se relâchant, pour se faire étriper par une botte inattendue. On ne peut arrêter un spadassin de l’école de Villanova prudent. Ceci dit, les spadassins prudents vont généralement dans une autre école."
        ],
        "academies": "Aucun étranger ne connaît l’emplacement exact de l’école Villanova. Les prétendants à cette École sont réunis par groupes de 40 à 50, et attendent près de Porto Serafina, où on leur bande les yeux. Ils effectuent alors un voyage de trois jours à travers le marais de la famille Villanova avant d’atteindre leur destination finale. L’école se trouve dans de vieilles ruines numaines et l’instruction dure environ six mois. Les rumeurs affirmant que les Villanova exigent un serment de fidélité sont fausses, et reposent sur le fait que les étudiants jurent de garder le secret sur leur formation jusqu’à leur mort. L’honneur vodacci empêche généralement les Spadassins de rompre ce vœu, mais cela s’est produit à l’occasion. Le châtiment tombe alors avec toute la violence et la fourberie dont est capable la famille Villanova. Il n’y a absolument rien de vrai non plus dans le fait que les Spadassins ne parvenant pas à maîtriser l’École servent de cibles d’entraînement pour la promotion suivante d’apprentis. Les accidents se produisent chez les élèves et les apprentis dans les mêmes proportions.",
        "homologation": "1658",
        "doyen": "Nicodemo di Villanova (1658)",
        "insigne": "Une rapière pointée vers le bas, masquant presque intégralement un couteau également pointé vers le bas.",
        "armes_pdf": "Schiavone et couteau alla stradiota",
        "specialisations_pdf": [
          "Couteau",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les débutants de l’école de Villanova apprennent à utiliser contre leurs adversaires des armes secondaires que l’on peut aisément dissimuler.",
            "regles": "Vous n’êtes pas victime de la pénalité de main non-directrice lorsque vous utilisez un poignard. En outre, vous bénéficiez d’une augmentation gratuite lorsque vous utilisez la compétence Parade (Couteau) ou une arme cachée (s’il s’agit d’un couteau dissimulé, le bonus est ainsi de deux augmentations). Les élèves de cette école se servent souvent de dagues d’escrime."
          },
          "compagnon": {
            "fluff": "Les compagnons de Villanova ont assez de talent pour dissimuler leurs bottes derrière une série de feintes.",
            "regles": "En devenant compagnon vous recevez gratuitement un rang supplémentaire dans la technique de combat Feinte. Il est possible que vous disposiez alors de six rangs dans cette technique de combat. Si tel n’est pas le cas, vous pourrez par la suite faire passer votre technique de combat Feinte de 5 à 6 en dépensant 25 XP."
          },
          "maitre": {
            "fluff": "Au dernier stade, vous apprenez à piéger votre adversaire en l’invitant à vous attaquer.",
            "regles": "Au début de n’importe quelle phase, vous pouvez volontairement diminuer votre ND pour être touché par tranches de 5 points, jusqu’à un minimum de 5. Si on vous attaque et que vous exécutez un Coup fourré alors que votre ND est ainsi diminué, celui-ci bénéficie d’une augmentation gratuite par tranche de 5 points susmentionnée."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true
    },
    {
      "nom": "Yael",
      "origine": "combat_reclassee",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Shamshir",
      "arme_display": "Shamshir (Sabre)",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Bateleur",
        "Escrime"
      ],
      "description_courte": "Danse mortelle acrobatique utilisant deux sabres courbes dans un tourbillon de feintes et d'entailles.",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": "Sabre",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Double parade",
          "variante": "Sabre",
          "ref": "double parade",
          "source": "csv"
        },
        {
          "nom_base": "Feinte",
          "variante": "Sabre",
          "ref": "feinte",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Sabre",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Peut dépenser 2 dés d'action pour 2 attaques simultanées (1 seule phase courante). Pas de pénalité main non directrice.",
        "compagnon": "Ajoute rang Danse à défense passive, Attaque, Feinte, défense active.",
        "maitre": "Une fois par round, rafale d'attaques (nb = Danse ou Panache) immédiates. Si une rate, suite annulée."
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Empire du Croissant.",
        "academies": "Le style Yael ne peut être appris qu’au sein de la tribu Jadur’rihad.",
        "description_longue": [
          "Yael est un style de combat très obscur, même pour l’Empire du Croissant. Comme le style Aldana, il combine la danse avec l’art de l’épée, mais il utilise les danses tournoyantes et acrobatiques de l’est plutôt que celles lancinantes et sautillantes de l’ouest. En raison de la grâce des mouvements, les étudiants de cette école semblent plus efféminés que les autres, mais ce style n’est pas pour autant dénigré comme une “école de filles”.",
          "Un spadassin de l’école Yael utilise deux shamshirs pour créer une danse sanglante et mortelle avec moult feintes vicieuses et estafilades sanguinolentes, basées sur l’air préféré du spadassin.",
          "Comme Aldana, la faiblesse de cette école réside dans sa trop grande confiance dans le tempo musical. Si son adversaire parvient à identifier l’air en question, il pourra attaquer dans les points faibles de la musique."
        ],
        "armes_pdf": "Shamshir",
        "specialisations_pdf": [
          "Bateleur",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "L’école Yael enseigne à ses étudiants l’utilisation concomitante de deux shamshirs.",
            "regles": "Vous pouvez dépenser deux actions pour effectuer deux attaques simultanées, mais une seule sera retenue comme étant la phase d’attaque. Ainsi, les deux attaques auront lieu dans la même phase. Par exemple, si vous agissez en phase 4 et que vos dés d’action indiquent 4, 7 et 0, vous utiliserez le 4 et soit le 7 soit le 0 pour agir deux fois en 4 (en gagnant donc des phases d’action). Les deux attaques doivent viser le même adversaire (les bandes de brutes comptent comme tel). Vous n’avez aucune pénalité de main non-directrice lorsque vous maniez deux shamshirs."
          },
          "compagnon": {
            "fluff": "En même temps que vous apprenez le style de combat de l’école Yael, on vous enseigne l’importance de la danse au sein de cette école. Cela vous permet d’effectuer des attaques, des parades et des défenses particulièrement gracieuses.",
            "regles": "Vous pouvez ajouter votre rang dans la compétence Danse à votre défense passive effectuée à l’aide de Jeu de jambes ou de Parade. Vous pouvez également ajouter ce rang à toutes vos attaques, feintes et défense active (si effectuées à l’aide de Jeu de Jambes et de Parade)."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école Yael peuvent effectuer une manœuvre terrible : une impressionnante tornade d’attaques sanglantes et rapides.",
            "regles": "Vous pouvez effectuer un tel assaut une fois par round. Vous pouvez décider d’effectuer un certain nombre d’attaques d’un seul coup pour un total égal à votre rang de Danse ou de Panache (celui qui est le plus faible). Notez que ces dés d’actions sont immédiatement dépensés et que vous choisirez le dé qui indique le moment où vous passerez à l’action. Toutes ces attaques ont aussitôt lieu, indépendamment des phases indiquées par les autres dés d’action et toutes doivent viser le même adversaire (une bande de brutes comptant comme un même ennemi). Si l’une de ces attaques ne touche pas car elle ne dépasse pas la défense passive de l’adversaire (on ne parle pas de défense active), toutes les attaques suivantes de la tornade échouent également sans qu’il soit besoin de lancer de dés. Par exemple, si un maître de Yael a un Panache de 3 et une compétence de Danse de 5, il effectue 3 attaques dans la même phase. La première attaque touche mais la seconde échoue à dépasser le ND de l’adversaire, la troisième n’aura donc pas lieu."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Zar'houni",
      "origine": "combat_reclassee",
      "nations": [
        "Empire du Croissant"
      ],
      "arme": "Pilum",
      "arme_display": "Pilum",
      "armes_categories": [
        "Lances"
      ],
      "specialisations": [
        "Lance légère",
        "Éclaireur"
      ],
      "description_courte": "Style basé sur des changements de prise incessants avec une lance légère (sagaie) pour créer un style polymorphe et déroutant, mêlant attaques d'estoc, de taille et lancers.",
      "techniques_combat": [
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "enrichment"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Lance légère",
          "ref": "exploiter les faiblesses",
          "source": "enrichment"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "enrichment"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "restriction_creation": "limitee",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Empire du Croissant.",
        "academies": "Le style Zar’houni ne peut être appris qu’au sein de la tribu Yilan-bazlik.",
        "description_longue": [
          "Cette technique de combat est la plus ancienne de tout l’Empire du Croissant. Elle fut développée à l’époque où les Numains occupaient le pays. Les envahisseurs enrôlèrent de nombreux mercenaires dans leurs phalanges. Ceux d’origine croissantine étaient appelés les Aronis, que la langue locale transforma petit à petit en Zar’houni. Ils utilisaient l’armement fourni par Numa, c’est-à-dire pilum et armure. Après le départ des Numains, les Zar’houni transformèrent au cours des siècles leurs pilums en sagaies et abandonnèrent l’armure. Cette école améliora son style et son armement en suivant les évolutions des techniques de combat et les progressions dans les alliages et artisanats au cours des longs siècles qui l’amenèrent à l’époque moderne.",
          "Les spadassins de l’école Zar’houni utilisent des lances légères (appelées sagaies) qu’ils peuvent manier à une ou à deux mains. Ils peuvent facilement passer de la main gauche à la main droite ou encore à deux mains en quelques fractions de seconde. Ils sont capables d’attaquer d’estoc comme de taille avec une prédilection pour le premier type d’attaque. Ils sont également très efficaces à distance puisque la sagaie peut atteindre de grandes distances sans perdre de sa puissance. Un spadassin Zar’houni a, la plupart du temps, au moins trois à quatre sagaies sur lui pour répondre à tout besoin impérieux et immédiat.",
          "La faiblesse de cette école réside dans le fait que son style remonte à l’antiquité et que ses techniques de combat ne sont plus en phase avec les nouvelles façons de se battre (armes plus légères mais plus tranchantes, couteaux pour combat rapprochés, armes à feu, etc.). Un adversaire qui utiliserait des techniques de combat modernes viendrait facilement à bout d’un spadassin Zar’houni."
        ],
        "armes_pdf": "Pilum",
        "specialisations_pdf": [
          "Lance légère",
          "Éclaireur"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école Zar’houni apprennent à être toujours en mouvement, à bouger leurs membres inférieurs comme supérieurs, afin que l’on ne puisse jamais connaître leurs prochains gestes. De même, on leur enseigne à changer continuellement la position de leur sagaie.",
            "regles": "Pendant la première phase, ils l’ont dans la main gauche, pendant la deuxième, ils la tiennent à deux mains, à la troisième dans la droite, etc. Pour leurs adversaires, cela est très déstabilisant puisqu’ils ne savent jamais où va se trouver la pointe de la sagaie : dirigée sur leur flanc gauche ? Vers leur visage ? Vers leurs chevilles ? Pour toutes ces raisons, le ND de l’adversaire d’un spadassin Zar’houni est amputé de son rang de maîtrise x 5 et transféré au sien. Ainsi, un compagnon Zar’houni bénéficiera d’un bonus de 10 points sur son ND alors que son adversaire verra le sien amputé de 10. Attention toutefois car cette technique n’est efficace que contre un seul adversaire (une bande de brutes compte comme telle) et pas contre des groupes."
          },
          "compagnon": {
            "fluff": "Le compagnon maîtrise une technique de combat à mi- chemin entre le lancer de sa sagaie et une attaque classique.",
            "regles": "Lorsqu’il passe à l’offensive en estoc, il peut, d’un seul coup, utiliser sa seconde main pour donner plus de puissance à sa lance et la lâcher pour qu’elle parte seule sur son adversaire. Une sorte d’attaque en laissant partir son arme si vous préférez. Il lui suffit ensuite d’en prendre une nouvelle et de continuer le combat. Sur le plan ludique, cette attaque inflige 3g3 de dommages au lieu de 3g2 et ne peut être évitée que par un jet de Jeu de jambes, Pas de côté ou Feinte de corps en Défense Active. Quant au changement d’arme, il ne lui consomme qu’une action pour changer d’arme et attaquer dans la même phase."
          },
          "maitre": {
            "fluff": "Le maître apprend à utiliser deux sagaies de façon concomitante pour frapper ses adversaires.",
            "regles": "Il ne subit pas le malus de main non-directrice et bénéficie de deux dés d’action supplémentaires au-delà de son Panache. Un combat contre un maître Zar’houni est donc quelque chose de très déstabilisant, il vous attaque de la main gauche, recule, “lâche” son arme dans votre abdomen, dégaine une nouvelle sagaie et vous attaque à deux mains, repasse à une main, en dégaine une seconde et vous attaque à deux mains ! C’est une horreur pour son adversaire qui ne sait jamais exactement à quoi s’attendre d’un ennemi si polymorphe."
          }
        },
        "categorie_creation": "Écoles à l'accès limité à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Zepeda",
      "origine": "officielle",
      "nations": [
        "Castille"
      ],
      "arme": "Fouet",
      "arme_display": "Fouet",
      "armes_categories": [
        "Fouet"
      ],
      "specialisations": [
        "Athlétisme",
        "Fouet"
      ],
      "description_courte": "Style de contrôle à distance utilisant un fouet pour intimider, Désarmer et faire chuter l'adversaire.",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": "fouet",
          "ref": "desarmer",
          "source": "csv"
        },
        {
          "nom_base": "Emprisonner",
          "variante": "fouet",
          "ref": "emprisonner",
          "source": "csv"
        },
        {
          "nom_base": "marquer",
          "variante": "fouet",
          "ref": "marquer",
          "source": "csv"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Fouet",
          "ref": "exploiter les faiblesses",
          "source": "csv"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "Action claquer fouet : augmente ND touché de niveau maîtrise. Augmentation gratuite attaque fouet.",
        "compagnon": "Remplace Acrobatie/Amortir/Dressage/Prise par Attaque (Fouet). Tirer pieds adversaire (ND+10).",
        "maitre": "Chaque touche avec dommages augmente niveau de peur contre cet adversaire de +1."
      },
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "origine_texte": "Castille.",
        "academies": "Seuls les Castillians sont vraiment intéressés par l’usage du fouet. Bien que quelques étrangers fassent le déplacement pour en percer les secrets, son usage reste plutôt restreint à la Castille, voire au rancho Zepeda. Et il en sera ainsi tant que la guilde des spadassins n’acceptera pas de reconnaître cette école.",
        "description_longue": [
          "Les élèves du style Zepeda apprennent à combattre avec un fouet. Bien que le fouet soit moins meurtrier qu’une rapière ou un poignard, c’est un bon instrument d’intimidation et de protection. Même les spadassins de talent s’éloigneront le plus souvent de son mordant.",
          "L’école de Zepeda n’enseigne pas simplement à ses élèves l’art de faire claquer son fouet. Ils apprennent aussi tout un assortiment de tours, dont la façon d’intimider un adversaire avec la promesse d’une cinglante raclée.",
          "Toutefois, un adversaire qui supporte la douleur d’un coup de fouet ou deux parvient souvent à s’approcher suffisamment près pour qu’il ne soit guère plus efficace face à l’acier meurtrier d’un simple poignard."
        ],
        "armes_pdf": "Fouet",
        "specialisations_pdf": [
          "Athlétisme",
          "Fouet"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de l’école de Zepeda utilisent le fouet comme outil d’intimidation et de peur.",
            "regles": "En dépensant une action à faire claquer votre fouet, vous augmentez votre ND pour être touché de votre niveau de maîtrise pour le reste du tour. Vous pouvez le faire autant de fois que vous le souhaitez. Ce bonus n’est d’aucune utilité face à des adversaires immunisés à la peur et disparaît immédiatement si vous lâchez votre fouet ou qu’il s’emmêle (avec la technique de combat Emprisonner, par exemple). En outre, vous bénéficiez d’une augmentation gratuite sur votre jet d’attaque lorsque vous employez un fouet."
          },
          "compagnon": {
            "fluff": "Les compagnons de l’école de Zepeda utilisent leur fouet de manières plus variées.",
            "regles": "Tant que vous avez le fouet en main, vous pouvez remplacer l’une des compétences suivantes par le rang de votre compétence Attaque (Fouet) : Acrobatie, Amortir une chute, Dressage, Prise. En outre, vous pouvez étendre un adversaire face contre terre en lui tirant les pieds d’un coup sec, mais votre ND pour le toucher augmente alors de 10 points."
          },
          "maitre": {
            "fluff": "Vu leur compétence au fouet, les maîtres de l’école Zepeda sont particulièrement craints.",
            "regles": "Vous utilisez votre fouet pour donner une leçon de respect aux autres. Chaque fois que vous touchez et infligez des dommages à votre adversaire, votre niveau de peur augmente de +1 contre celui-ci jusqu’à la fin du combat. Ainsi, si vous touchez par trois fois un adversaire, et que vous lui infligez au moins une blessure légère par touche, vous disposez contre lui d’un niveau de peur de 3."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "combat_reclassee"
      },
      "enrichie": true
    },
    {
      "nom": "Faileas",
      "origine": "officielle",
      "nations": [
        "Avalon"
      ],
      "arme": "Rapière",
      "arme_display": "Rapière",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Courtisan",
        "Escrime"
      ],
      "description_courte": "Faileas est l’un des nombreux styles à l’épée développé par les Sidhes. Il enseigne au spadassin à utiliser ses compétences de combat et son style en observant les mouvements de l’arme de son adversai",
      "techniques_combat": [
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "enrichment"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "enrichment"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "enrichment"
        },
        {
          "nom_base": "Reproduire",
          "variante": null,
          "ref": "reproduire",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Bryn Bresail.",
        "description_longue": [
          "Faileas est l’un des nombreux styles à l’épée développé par les Sidhes. Il enseigne au spadassin à utiliser ses compétences de combat et son style en observant les mouvements de l’arme de son adversaire et son langage corporel. C’est une technique très difficile à maîtriser et qui exige un grand sens de l’observation et un œil vif, aussi bien que de grandes qualités de spadassin. Cela est naturel pour les Sidhes, qui sont habitués à observer minutieusement les humains, mais très peu d’hommes ont une capacité d’observation aussi intense. Tout humain qui souhaiterait apprendre cette école devrait disposer d’un trait de Panache et d’une compétence de Qui-vive d’un rang au moins égal à 4. Il doit ensuite trouver un Sidhe qui voudra bien l’enseigner à un homme.",
          "Les spadassins Faileas utilisent toujours leur arme dans la main opposée à celle de leur adversaire, ce qui embrouille et énerve la plupart des combattants dès le début du combat. Ils copient également les expressions faciales de leur opposant afin d’essayer de comprendre ce qu’il pense (et l’énerver davantage). Ils poursuivent ensuite en touchant l’acier de la lame de l’adversaire avec la leur afin de sentir chaque subtil mouvement et anticiper les attaques. Le style de combat d’un tel spadassin est extrêmement agaçant. Lorsque l’on avance sur un spadassin Faileas, ce dernier recule ; lorsque l’on se retire, il avance. Le spadassin Faileas semble connaître chacun des mouvements que va effectuer son adversaire avant qu’il ne le fasse réellement.",
          "L’école de Faileas est principalement défensive mais elle peut également fournir une attaque dévastatrice. L’adversaire voit ses propres efforts se retourner contre lui lorsque son modèle est analysé et copié.",
          "La faiblesse de l’école est très simple. Un adversaire qui connaît ses propres faiblesses de spadassin peut les chercher chez son adversaire et gagner ainsi une ouverture."
        ],
        "academies": "Il est probable que Johnny a singé les hommes dans ce domaine également et ouvert une école d’escrime à Bryn Bresail.",
        "homologation": "1667",
        "doyen": "Johnny Faileas (1667)",
        "insigne": "Une rapière devant une coupe figurant le Graal, la garde de la rapière en bas à droite et sa pointe en haut à gauche.",
        "armes_pdf": "Rapière",
        "specialisations_pdf": [
          "Courtisan",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "La première chose qu’apprend un élève de l’école Faileas est de bien s’orienter et d’observer attentivement",
            "regles": ". Il utilise toujours son arme dans la main opposée à celle de son adversaire, bénéficiant ainsi toujours de l’avantage Gaucher contre son adversaire, il apprend également à ignorer la pénalité de main non-directrice. Les étudiants de cette école apprennent à copier le mouvement de leur adversaire et peuvent utiliser leur rang de Panache à la place d’Esprit pour le calcul de la défense passive."
          },
          "compagnon": {
            "fluff": "Les compagnons savent lire dans l’esprit de leur adversaire. Ils observent les expressions faciales et le langage corporel de leurs ennemis qui trahissent leur prochain mouvement",
            "regles": ". S’ils réussissent un jet de Panache contre un ND de 5 fois le rang d’Esprit de l’adversaire, ils peuvent prévoir sa prochaine attaque et bénéficier d’une augmentation gratuite pour effectuer n’importe quelle défense active contre celle-ci. Même si l’attaque porte, le jet de dommages effectué par l’adversaire est pénalisé d’un dé non gardé (-1g0)."
          },
          "maitre": {
            "fluff": "Les maîtres de l’école Faileas ont appris à intimider silencieusement leur adversaire. Ils réussissent à le convaincre qu’il ne peut pas gagner, car le spadassin Faileas anticipe chacun des mouvements qu’il entreprend et y réagit de la façon la plus adaptée.",
            "regles": "Une fois par round, sur une attaque de l’adversaire, le maître Faileas peut effectuer un jet de Panache pour démonter la confiance son adversaire (cela ne compte pas comme une action). L’adversaire doit effectuer un jet de Détermination contre un ND égal au résultat de ce jet. S’il échoue, sa confiance est ébranlée et son attaque est manquée. Si son adversaire réussit son jet de Détermination, il peut effectuer son attaque et sa confiance en lui ne peut être de nouveau ébranlée avant la fin de la scène."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null,
      "absent_csv": true
    },
    {
      "nom": "Pösen",
      "origine": "officielle",
      "nations": [
        "Eisen"
      ],
      "arme": "Épieu de guerre",
      "arme_display": "Épieu de guerre",
      "armes_categories": [
        "Lances"
      ],
      "specialisations": [
        "Cavalier",
        "Lance de cavalerie"
      ],
      "description_courte": "Cette école forme ses élèves à l’utilisation de l’épieu de guerre, une lance de cavalerie dont on se sert à cheval pour chasser le sanglier. Sa lame est dotée d’une sorte de talon transversal pour évi",
      "techniques_combat": [
        {
          "nom_base": "Charge de cavalerie",
          "variante": null,
          "ref": "charge de cavalerie",
          "source": "enrichment"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "enrichment"
        },
        {
          "nom_base": "Décoller",
          "variante": null,
          "ref": "decoller",
          "source": "enrichment"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Épieu de guerre",
          "ref": "exploiter les faiblesses",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Eisen.",
        "description_longue": [
          "Cette école forme ses élèves à l’utilisation de l’épieu de guerre, une lance de cavalerie dont on se sert à cheval pour chasser le sanglier. Sa lame est dotée d’une sorte de talon transversal pour éviter que le sanglier ne remonte la hampe et tue monture comme cavalier. Certains des nobles les plus arrogants se mirent à utiliser l’épieu de guerre dans le but de poursuivre leurs adversaires sur les champs de batailles alors que flèches et épées rebondissaient sur leur armure en Dracheneisen. Cela devint finalement un moyen pour eux de pouvoir prouver leur courage au combat – un handicap consenti, destiné à atténuer la sécurité conférée par le Dracheneisen. Toutefois, la famille Pösen en développa l’usage comme arme de cavalerie dévastatrice. Aujourd’hui, l’épieu de guerre est moins un handicap qu’un style efficace de combat qui exhibe à la vue de tous la noble extraction du combattant.",
          "La force principale de l’école de Pösen est sa violence dévastatrice. L’élève réalise de nombreux efforts en début de bataille, puis se replie souvent vers les réserves pour récupérer et hâbler au sujet du nombre de “porcs” ou de fantassins qu’il a terrassés. Cependant, si la retraite de l’élève est coupée, ses ennuis commencent. Les techniques de l’école de Pösen sont rapidement éprouvantes au niveau physique, et plus d’un noble s’est vu arraché à sa monture, dépouillé de son armure et haché menu par les “porcs”."
        ],
        "academies": "Insel abrite l’école principale, mais il y en a quelques autres dispersées à travers le Königreich. La seule autre école Pösen en Eisen se trouve à Stahlfort : Erich von Sieger est prêt à employer toute technique lui permettant de garder la mainmise sur ses terres. Aucune autre nation n’a porté un quelconque intérêt à cette École, et Fauner est trop occupée à la reconstruction de son pays pour changer ce fait.",
        "homologation": "1644",
        "doyen": "Fauner Konrad von Pösen (1656)",
        "insigne": "Une tête de sanglier.",
        "armes_pdf": "Épieu de guerre",
        "specialisations_pdf": [
          "Cavalier",
          "Lance de cavalerie"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les apprentis de ce style apprennent à utiliser leur épieu de guerre pour garder leurs ennemis à bonne distance tout en frappant depuis leur monture.",
            "regles": "Vous bénéficiez d’un bonus de +15 à votre initiative totale lors du premier tour de chaque combat. Lorsque vous utilisez votre compétence Attaque (lance de cavalerie) lors du premier tour de combat et que vous disposez de suffisamment d’espace pour manœuvrer (au moins 6 mètres sur 6, ou à la discrétion du MJ), vous lancez et gardez un dé de dommages en plus quand votre coup porte. Quant à la portée de l’épieu de guerre, elle est de (GAI x 2) +5."
          },
          "compagnon": {
            "fluff": "Les compagnons savent faire usage de toute leur force dès le début du combat, infligeant ainsi autant de dommages que possible avant de battre en retraite vers des horizons plus sûrs.",
            "regles": "Lors du premier tour de combat, vous pouvez ajouter un rang à votre Gaillardise, votre Finesse et votre Détermination. Si vous le faites, vous devez soustraire 1 rang à ces traits pour le reste de la scène. Si cette pénalité porte l’un de vos traits à 0 (ou que vous avez reçu un nombre de blessures graves égal à deux fois votre nouveau rang de Détermination), vous sombrez immédiatement dans l’inconscience."
          },
          "maitre": {
            "fluff": "Les véritables maîtres de l’école de Pösen savent attaquer vite et souvent, passant souvent pour des tornades d’acier lorsqu’ils traversent un champ de bataille.",
            "regles": "Au début d’un tour, vous pouvez décider d’exploiter les actions qui vous sont normalement allouées lors du tour suivant. Ainsi, si votre Panache est de 3, vous pouvez réaliser jusqu’à six actions lors de ce tour. Néanmoins, si vous dépensez vos 6 dés d’action, vous ne pourrez pas agir au tour suivant. Vous pouvez profiter de cette faculté un tour sur deux."
          }
        },
        "categorie_creation": "Écoles autorisées sans restriction à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true,
      "restriction_creation": "libre",
      "genre_restriction": null,
      "absent_csv": true
    },
    {
      "nom": "Rochefort",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Toutes les armes d’escrime font l’affaire",
      "arme_display": "Toutes les armes d’escrime font l’affaire",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Athlétisme",
        "Escrime"
      ],
      "description_courte": "Le journal d’Argento que le comte de Rochefort réussit à se procurer décrivait des techniques d’escrime utilisant les points faibles de chaque école pour frapper ses élèves au moment où ils sont les p",
      "techniques_combat": [
        {
          "nom_base": "Trois techniques de combat au choix",
          "variante": null,
          "ref": null,
          "source": "enrichment"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Montaigne.",
        "description_longue": [
          "Le journal d’Argento que le comte de Rochefort réussit à se procurer décrivait des techniques d’escrime utilisant les points faibles de chaque école pour frapper ses élèves au moment où ils sont les plus vulnérables.",
          "Ainsi, Rochefort est une école rapide, brutale et cruelle qui repose sur des mouvements véloces et des techniques très offensives ne tenant aucun compte de la défense du spadassin. Totalement tourné vers l’attaque, c’est également là son point faible car le spadassin ne se défend pas : “La meilleure défense, c’est l’attaque.” Mais il suffit que l’adversaire parvienne une fois à le parer et il se retrouve complètement désarçonné !"
        ],
        "academies": "L’École de Rochefort fait effectivement partie de la Guilde des Spadassins, mais elle est inconnue des Spadassins lambda. Seuls les membres des Rasoirs peuvent l’apprendre au siège de la Guilde des Spadassins à Kirk. Le doyen de cette École est aujourd’hui Renato Marchello, le capitaine des Rasoirs. Toutefois si quelqu’un parvenait à se procurer une copie du livre d’Argento, il pourrait certainement développer les mêmes techniques. Le premier tome du journal d’Argento n’a jamais été retrouvé et l’on peut se demander quels secrets il renferme. Le capitaine Renato Marchello est à la recherche de ce volume depuis qu’il a hérité du second tome et a fait de cette recherche une véritable obsession.",
        "homologation": "1661",
        "doyen": "Renato Marchello (1662)",
        "insigne": "L’insigne classique de la Guilde, tourné vers le bas et non vers le haut.",
        "armes_pdf": "Toutes les armes d’escrime font l’affaire",
        "specialisations_pdf": [
          "Athlétisme",
          "Escrime"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Protéiforme, l’apprenti Rochefort peut apprendre de nombreuses Techniques de combat de son choix.",
            "regles": "L’apprenti peut choisir quatre Techniques de combat parmi les suivantes : Attaque en dégaine (Escrime), Ballestra (Escrime), Coup de pommeau (Escrime), Coup puissant (Escrime), Feinte (Escrime), Fente en Avant (Escrime), Force d’âme, Frappe à deux mains (Escrime), Lacérer (Escrime), Harceler (Escrime), Marquer (Escrime), Riposte (Escrime), Tourbillon (Escrime) ou Vénération des Prophètes (Escrime). De plus, il a appris à reconnaître les autres styles de combat très facilement dès les premiers mouvements de son adversaire. Un apprenti bénéficie donc de deux augmentations gratuites lorsqu’il effectue un jet de technique de combat Voir le style."
          },
          "compagnon": {
            "fluff": "Le compagnon Rochefort a de nouvelles Techniques de combat à son répertoire.",
            "regles": "Le compagnon connaît maintenant une technique de combat supplémentaire à choisir dans la liste précédente. De plus, il connaît les techniques utilisées par les membres de la Guilde des Spadassins, il bénéficie deux fois de l’avantage de la technique de combat Exploiter les faiblesses (Escrime) ; il gagne ainsi (deux fois son rang dans cette technique de combat) dés à utiliser lors d’un combat contre des spadassins dont l’école est affiliée à la Guilde."
          },
          "maitre": {
            "fluff": "Le maître dispose d’un large éventail de Techniques de combat.",
            "regles": "Le maître apprend deux nouvelles Techniques de combat dans la liste donnée au rang d’apprenti. Un maître connaît ainsi neuf Techniques de combat. De plus, il bénéficie trois fois de l’avantage de la technique de combat Exploiter les faiblesses (Escrime) ; il gagne ainsi (trois fois son rang dans cette technique de combat) dés à utiliser lors d’un combat contre des spadassins dont l’école est affiliée à la Guilde."
          }
        },
        "categorie_creation": "Écoles interdites à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null,
      "absent_csv": true
    },
    {
      "nom": "Rojando & Wilcox",
      "origine": "officielle",
      "nations": [
        "Avalon",
        "Castille"
      ],
      "arme": "Sabre, sabre de cavalerie ou sabre d’abordage",
      "arme_display": "Sabre, sabre de cavalerie ou sabre d’abordage",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Athlétisme (Rojando)",
        "Escrime",
        "Marin (Wilcox)"
      ],
      "description_courte": "Le style Rojando & Wilcox est principalement basé sur le fait que le spadassin vole littéralement sur son adversaire. Sautant depuis les hauteurs si son ennemi est en dessous de lui ou s’aplatissant a",
      "techniques_combat": [
        {
          "nom_base": "Ballestra",
          "variante": null,
          "ref": "ballestra",
          "source": "enrichment"
        },
        {
          "nom_base": "Esquive acrobatique",
          "variante": null,
          "ref": "esquive acrobatique",
          "source": "enrichment"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "enrichment"
        },
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Avalon et Castille.",
        "description_longue": [
          "Le style Rojando & Wilcox est principalement basé sur le fait que le spadassin vole littéralement sur son adversaire. Sautant depuis les hauteurs si son ennemi est en dessous de lui ou s’aplatissant au sol s’il est plus haut, le spadassin Rojando & Wilcox est une cible fugace, fuyante et en mouvement incessant qui explose soudain en une attaque foudroyante.",
          "La rencontre des escrimeurs Rojando et Wilcox a donc donné naissance à un style d’escrime particulièrement bien équilibré entre des attaques vicieuses et une défense élastique.",
          "Toutefois, tout le monde ne dispose pas de l’énergie débordante nécessaire pour pratiquer cette escrime épuisante. D’ailleurs, la principale faiblesse du style Rojando & Wilcox est la quantité d’énergie qu’elle réclame de ses pratiquants."
        ],
        "academies": "Il y a trop peu de temps que ce style est reconnu pour disposer déjà d’une école. Nicole et Rafael envisagent toutefois d’en ouvrir une, mais ils se chamaillent encore sur l’endroit, Nicole veut que ce soit à Tara et Rafael n’en démord pas, ils s’installeront à Altamira… S’ils continuent comme cela, il y a de bonnes chances que cette école finisse par ouvrir ses portes à … Freiburg !",
        "homologation": "1669",
        "doyen": "Rafael Rojando (1669) et Nicole Wilcox (1669)",
        "insigne": "Quatre sabres entrecroisés, donnant l'impression qu'il n'y en a qu'un, tournoyant sur lui-même.",
        "armes_pdf": "Sabre, sabre de cavalerie ou sabre d’abordage",
        "specialisations_pdf": [
          "Athlétisme (Rojando)",
          "Escrime",
          "Marin (Wilcox)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les spadassins de l’école Rojando & Wilcox apprennent à effectuer leurs attaques de façon “acrobatique” – volant entre ciel et terre en fondant sur leurs cibles.",
            "regles": "Pour exécuter ces attaques acrobatiques, vous devez défausser un deuxième dé d’action (peu importe lequel) et effectuer une Fente en avant normale. Si vous réussissez, vous pouvez ajouter à votre jet de dommages, un nombre de dés lancés égal à votre compétence Saut. Par contre, si l’attaque échoue, vous vous retrouvez au sol."
          },
          "compagnon": {
            "fluff": "Les spadassins de l’école Rojando & Wilcox peuvent parfois exploser en mouvements soudains et fulgurants.",
            "regles": "Un compagnon peut dépenser autant de dés d’héroïsme qu’il le souhaite afin d’effectuer autant d’actions supplémentaires dans un même round de combat."
          },
          "maitre": {
            "fluff": "Les maîtres du style Rojando & Wilcox sautent un peu partout autour de leur adversaire à la manière des sauterelles, effectuant des sauts retournés, des doubles sauts périlleux, des coups de pied retournés ou faisant la roue ; cette manœuvre est d’ailleurs appelée “Grasshopper’s jump” chez les spadassins de Wilcox et “Salto de Langosta” chez ceux de Rojando.",
            "regles": "Lorsqu’il est attaqué, le spadassin peut dépenser une action afin d’effectuer une défense active, qui sera alors obligatoirement une esquive acrobatique avec un ND égal au score d’attaque de l’adversaire. Bien sûr, si votre défense échoue, vous encaisserez des dommages, et serez, en plus, au sol avec tous les inconvénients que cela comporte (voilà ce qu’on gagne à sauter dans tous les coins !). Par contre, si elle réussit, vous bénéficiez de la marge entre votre jet de défense et le score d’attaque de votre opposant comme bonus à votre prochaine action. Par exemple, Collyn est attaquée par une bande de brutes et décide d’utiliser sa technique de Salto de Langosta pour se défendre. Elle lance les dés et obtient 29 sur son jet d’Esquive acrobatique ; cela dépasse le jet d’attaque des brutes de 12 (29 -17). Ainsi, sa prochaine action bénéficiera-t-elle d’un bonus de 12 points. Les brutes, toujours motivées, attaquent de nouveau, Collyn décide alors d’effectuer de nouveau un Salto de Langosta. Les brutes font une superbe attaque à 41 ! Collyn lance les dés et obtient 27, auquel on ajoute 12 (son bonus précédent) pour un total de 39. Elle est, cette fois-ci, touchée et à terre !"
          }
        },
        "categorie_creation": "Écoles interdites à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null,
      "absent_csv": true
    },
    {
      "nom": "Tom Morel",
      "origine": "officielle",
      "nations": [
        "Montaigne"
      ],
      "arme": "Fleuret",
      "arme_display": "Fleuret",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Escrime et (Courtisan ou Estudiant)"
      ],
      "description_courte": "Un spadassin de l’École Tom Morel (Rodrigue lui a donné le nom de son défunt frère) est spécialement entraîné pour se défendre sans faire de mal à autrui, ainsi développe-t-il ses techniques de désarm",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": null,
          "ref": "desarmer",
          "source": "enrichment"
        },
        {
          "nom_base": "Emprisonner",
          "variante": null,
          "ref": "emprisonner",
          "source": "enrichment"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "Escrime",
          "ref": "exploiter les faiblesses",
          "source": "enrichment"
        },
        {
          "nom_base": "Feinte",
          "variante": null,
          "ref": "feinte",
          "source": "enrichment"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "enrichment"
        }
      ],
      "avantages_courts": {
        "apprenti": "",
        "compagnon": "",
        "maitre": ""
      },
      "details": {
        "origine_texte": "Montaigne.",
        "description_longue": [
          "Un spadassin de l’École Tom Morel (Rodrigue lui a donné le nom de son défunt frère) est spécialement entraîné pour se défendre sans faire de mal à autrui, ainsi développe-t-il ses techniques de désarmement ou de persuasion verbale afin de mettre paisiblement fin au conflit. La plupart de ses duels se poursuivent jusqu’à ce que l’un des deux spadassins soit désarmé et de temps en temps au premier sang. Il n’acceptera jamais de duel à mort à moins qu’il n’y ait absolument aucune autre alternative. Et même dans ce cas, il cherchera à convaincre son adversaire de renoncer à ce combat fratricide et qui ne résoudra rien.",
          "La principale faiblesse de ce style réside dans son strict respect du combat éthique. Tous les spadassins de l’École Tom Morel apprennent à respecter la vie, et se reculent systématiquement lorsque leur adversaire est blessé. Ainsi, en simulant une blessure, un opposant astucieux pourra leurrer le spadassin Tom Morel et le mettre dans une position particulièrement défavorable. Depuis que les spadassins de l’École Tom Morel se sont rendu compte que leurs ennemis utilisaient cette tactique, ils font plus attention. Cependant, leur honneur leur dicte de se retirer lorsqu’un adversaire semble en détresse, mieux vaut laisser un filou profiter de cette faiblesse que de bafouer son honneur en assassinant un homme blessé."
        ],
        "academies": "L’École Tom Morel est extrêmement récente, elle vient juste d’être reconnue, aussi n’y a-t-il qu’une seule école d’ouverte, à Charousse. Une seconde est en travaux à Tamisy et devrait ouvrir dans le courant de l’année 1670.",
        "homologation": "1669",
        "doyen": "Rodrigue Morel (1669)",
        "insigne": "Une rapière pointée vers le haut, devant une main gauche paume ouverte.",
        "armes_pdf": "Fleuret",
        "specialisations_pdf": [
          "Escrime et (Courtisan ou Estudiant)"
        ],
        "niveaux": {
          "apprenti": {
            "fluff": "Les spadassins Tom Morel sont bien connus pour se tenir loin de leurs adversaires tout en essayant de les raisonner. Si cela échoue, ils poussent rapidement un assaut afin de toucher leur ennemi avant que quelqu’un ne soit réellement blessé.",
            "regles": "Ainsi, techniquement, une fois leur première action mise en réserve, la valeur de leurs dés d’action restants grimpe en suivant le déroulement des phases. Par exemple, un spadassin Tom Morel a effectué le jet suivant : 2, 4, 5, et 7 ; à la phase 2, il met son action en réserve, à la phase 4, il n’attaque toujours pas ; à la phase 5, il a maintenant deux actions mais n’attaque pas ; à la phase 6, il a toujours deux actions mais son adversaire passe à l’offensive ; le spadassin Tom Morel décide de passer à l’attaque en premier afin de lui donner une leçon, son score d’initiative est alors de 19 (6 + 6 + 7 = 19). Avec ce système, le spadassin Tom Morel est presque toujours certain d’agir juste avant que son adversaire ne le frappe. En outre, ils sont formés pour être très persuasifs afin d’éviter le carnage des duels et reçoivent deux augmentations gratuites sur leurs jets de Convaincre (Système de Répartie) une fois par scène."
          },
          "compagnon": {
            "fluff": "Un compagnon Tom Morel a appris que si un adversaire ne peut être raisonné, une intimidation efficace sera sans doute suffisante pour mettre un terme au combat",
            "regles": ". Une fois par round, un compagnon Tom Morel peut effectuer l’une de ces actions – Désarmer, Emprisonner, Feinte ou Parade (Escrime) – d’une façon particulièrement impressionnante en utilisant autant d’augmentations qu’il le souhaite (en sus de celles éventuellement nécessaires pour ses Techniques de combat) avant d’effectuer son jet. S’il est réussi, l’adversaire perd un dé lancé non gardé par augmentation prise par le duelliste Tom Morel sur toutes ses actions restantes lors du round en cours. Cette capacité peut être utilisée (rang de maîtrise) fois par scène."
          },
          "maitre": {
            "fluff": "Une bonne démonstration d’escrime vaut parfois mieux qu’un long discours.",
            "regles": "Une fois par scène, après avoir réussi une Feinte, un spadassin Tom Morel peut choisir de ne pas infliger de dommages. Au lieu de cela, il fait perler une goutte de sang de l’un des points vulnérables de son adversaire : le cœur, le front, la gorge ou tout autre point vital. Ensuite, le duel reprend normalement, mais il continue de le tancer pour qu’il se rende. Enfin, s’il juge qu’il ne le veut toujours pas, il peut lui infliger automatiquement une blessure grave en réitérant la même manœuvre que précédemment sans effectuer de jet complémentaire mais en dépensant un dé d’action."
          }
        },
        "categorie_creation": "Écoles interdites à la création",
        "_source_pdf": "spadassin"
      },
      "enrichie": true,
      "restriction_creation": "interdite",
      "genre_restriction": null,
      "absent_csv": true
    },
    {
      "nom": "Bugu Takobi",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Nations Pirates"
      ],
      "arme": "Épée courte ou machette",
      "arme_display": "Épée courte ou machette",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime (Épée)",
        "Athlétisme"
      ],
      "description_courte": "L'une des techniques martiales issues d'Ifri fait usage d'une épée courte et d'une gestuelle trompeuse pour déséquilibrer l'adversaire et aménager des ouvertures.",
      "techniques_combat": [
        {
          "nom_base": "Coup fourré",
          "variante": "Épée",
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Feinte",
          "variante": "Épée",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Harceler",
          "variante": null,
          "ref": "harceler",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "L'une des techniques martiales issues d'Ifri fait usage d'une épée courte et d'une gestuelle trompeuse pour déséquilibrer l'adversaire et aménager des ouvertures. Une machette se prête idéalement à cette technique faite de coups vifs et de mouvements rapides qui se jouent de l'allonge de l'opposant. Les gestes dansants et les pas agiles perturbent l'adversaire, permettant d'attaquer rapidement puis d'esquiver habilement la riposte.",
          "Les mawons ont parfait ce style et ses manœuvres déstabilisantes, et s'en sont servi pour combattre leurs oppresseurs atabéens. Aujourd'hui, il existe une poignée d'écoles qui enseignent le Bugu Takobi dans la mer Atabéenne. Les plus renommées sont la Makaranta Takobi (littéralement « École de l'Épée »), localisée dans l'Arc Septentrional de La Bucca près du Havre du Couchant, et le Mémorial de Taiyewo, à Kap-Kalfu, en Jaragua, dans l'ombre des Princes jumeaux. Récemment, une rumeur dit qu'un maître du Bugu Takobi aurait gagné la Fédération Sarmatienne dans l'espoir d'y ouvrir une école.",
          "La principale faiblesse du Bugu Takobi est sa dépendance au mouvement et à l'espace. Le style est bien moins efficace dans un lieu confiné (couloir, foule dense) qui empêche ses \"pas agiles\" et ses \"gestes dansants\". De plus, le besoin d'avoir une main libre le rend vulnérable face à des styles utilisant un bouclier ou une arme secondaire défensive."
        ],
        "origine_texte": "Racines ifriennes ; établie dans les Nations Pirates (La Bucca, Jaragua)",
        "armes_predilection": "Épée courte ou machette (une main, l'autre main libre pour feinter et déséquilibrer)",
        "academies": "Makaranta Takobi (« École de l'Épée »), dans l'Arc Septentrional de La Bucca près du Havre du Couchant ; Mémorial de Taiyewo, à Kap-Kalfu en Jaragua ; une rumeur évoque une école naissante en Fédération Sarmatienne",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Tant que l'apprenti manie une arme d'Escrime dans une main et que l'autre est vide, il ne souffre d'aucun malus lors de l'utilisation de la Technique de combat Feinte"
          },
          "compagnon": {
            "fluff": "Takobi Gudana",
            "regles": "Lors d'une Feinte réussie, les dégâts sont augmentés de  +1g1"
          },
          "maitre": {
            "fluff": null,
            "regles": "Lors d'une attaque menée dans le cadre du Takobi Gudana, le maître bénéficie d'une augmentation gratuite à ses défenses (active ou passive) contre la prochaine attaque de la cible contre lui, et 2 augmentations contre toute tentative de riposte de l'adversaire à cette attaque"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Iyasu",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Ifri"
      ],
      "arme": "Shotel",
      "arme_display": "Shotel",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Athlétisme"
      ],
      "description_courte": "L'Empire aksoumite, terre du deuxième Prophète, tient le savoir pour l'égal de la foi et forme des soldats capables de manier le shotel et la lance — et de courir toute une nuit avant d'affronter l'ennemi au matin.",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": "Sabre",
          "ref": "desarmer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "L'Empire aksoumite, terre du deuxième Prophète, tient le savoir pour l'égal de la foi et forme des soldats capables de manier le shotel et la lance — et de courir toute une nuit avant d'affronter l'ennemi au matin. C'est dans la garde impériale, le zukic'shok, que naquit l'école : son fondateur, le ras Iyasu, capitaine de la garde, étudia auprès des nebīyi la géométrie sacrée des joks pour résoudre un problème tenace — comment frapper un adversaire abrité derrière son bouclier.",
          "Sa réponse fut d'épouser la courbe profonde du shotel, cette lame en faucille dont la pointe contourne les gardes pour mordre le dos, la nuque et les flancs. Le styliste Iyasu ne force pas la défense : il la contourne, par des cercles patients que prolonge l'endurance légendaire des Aksoumites.",
          "La faiblesse de l'école est l'envers de sa lame : la courbe extrême se prête mal à l'estoc et peine à dévier une lame droite et rapide. Contre un escrimeur mobile et sans bouclier — qui ne lui offre aucune garde à contourner — le styliste Iyasu perd l'essentiel de son avantage."
        ],
        "origine_texte": "Empire Aksoumite (Ifri)",
        "armes_predilection": "Shotel (sabre courbe en faucille), tenu à une main",
        "academies": "Née au sein de la garde impériale aksoumite — le zukic'shok —, dont les vétérans, libérés après cinq ans de service, en essaiment l'enseignement dans l'Empire et, plus largement, à travers l'Ifri",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti Iyasu manie le shotel, dont la pointe recourbée passe par-dessus les gardes : la cible ne tire aucun bonus de l'attribut « Défensive » de son bouclier face aux attaques de l'apprenti"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Le crochet de la lame en faucille excelle à arracher une arme : le compagnon Iyasu bénéficie d'une augmentation gratuite sur tous ses jets de Désarmer effectués avec le shotel sur une arme secondaire (bouclier, dague, …)"
          },
          "maitre": {
            "fluff": null,
            "regles": "Le maître Iyasu frappe toujours là où l'armure protège le moins : ses attaques au shotel ignorent la moitié de la valeur d'armure de la cible"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Tin Hinan",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Ifri"
      ],
      "arme": "Takouba",
      "arme_display": "Takouba",
      "armes_categories": [
        "Escrime (Épée)"
      ],
      "specialisations": [
        "Escrime (Épée)",
        "Cape"
      ],
      "description_courte": "Le Maghreb, pays du Peuple bleu et de la Reine bleue, est un joyau de sable où l'on se voile d'indigo contre le soleil et les regards.",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Épée",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Double parade",
          "variante": "Épée / Voile",
          "ref": "double parade",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Le Maghreb, pays du Peuple bleu et de la Reine bleue, est un joyau de sable où l'on se voile d'indigo contre le soleil et les regards. L'école porte le nom de Tin Hinan, matriarche légendaire qui mena son peuple à travers les Sables bénis de la Lune ; ses gardes voilés en codifièrent l'art, que perfectionna ensuite l'escorte de la Reine bleue.",
          "Tout y repose sur le chèche : déployé d'une main, il brouille la ligne de la takouba — droite et fine — dans le miroitement de la chaleur. Le duelliste se fait mirage, insaisissable, frappant d'où on ne l'attend pas.",
          "Mais le mirage a besoin du désert : en pleine lumière, sur un terrain dégagé, face à qui a déjà percé le jeu du voile, l'illusion se dissipe. Et la takouba légère, comme le voile, ne vaut rien contre une armure lourde et la force brute."
        ],
        "origine_texte": "Maghreb (Ifri)",
        "armes_predilection": "Takouba (épée droite) et chèche indigo (voile employé comme une cape)",
        "academies": "Transmise par les gardes voilés du Peuple bleu et par l'escorte de la Reine bleue, des Sables bénis de la Lune aux cités maghrébines, et étudiée çà et là à travers l'Ifri",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti Tin Hinan combat le chèche déployé d'une main : il en ignore le malus de main non-directrice, et un adversaire qui l'affronte pour la première fois ne peut opposer aucune défense active à sa première attaque réussie du duel"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Le compagnon Tin Hinan se fait mirage dès que quelque chose le dérobe au regard — voile déployé, poussière, pénombre ou plein soleil aveuglant : il gagne alors +5 à sa Défense Passive"
          },
          "maitre": {
            "fluff": null,
            "regles": "Tant que le maître Tin Hinan n'a pas été touché durant le round, ses adversaires ne parviennent plus à fixer sa position et subissent -2g0 à toutes leurs attaques contre lui"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Gbeto",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Ifri"
      ],
      "arme": "Lourde lame de chasse",
      "arme_display": "Lourde lame de chasse",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Pister"
      ],
      "description_courte": "Dans la Kurufaba mandéniane, joyau d'or et de sel, la guerre se gagne par le nombre, l'or et la logistique — mais la Xwéda, tapie sous la jungle, a donné à l'Ifri ses chasseresses les plus redoutées : les gbeto, qui abattent l'éléphant et qui, une nuit, s'infiltrèrent dans al-Ghāba pour égorger en silence tous ses chefs..",
      "techniques_combat": [
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Dans la Kurufaba mandéniane, joyau d'or et de sel, la guerre se gagne par le nombre, l'or et la logistique — mais la Xwéda, tapie sous la jungle, a donné à l'Ifri ses chasseresses les plus redoutées : les gbeto, qui abattent l'éléphant et qui, une nuit, s'infiltrèrent dans al-Ghāba pour égorger en silence tous ses chefs.",
          "De cette traque naquit une école de duel. La gbeto chasse l'homme comme la bête : immobile et patiente, elle lit sa proie, puis frappe la première d'un coup que la longue attente a rendu mortel ; et nul fauve, nul colosse ne l'effraie, car elle a affronté plus gros et plus fort qu'un homme.",
          "Sa faiblesse est celle du chasseur : tout est dans l'embuscade et le premier coup. Dans un duel qui s'éternise, face à une proie qui rend coup pour coup sans faiblir, la gbeto — dressée à abattre en quelques frappes, non à échanger les passes — s'essouffle et perd l'avantage."
        ],
        "origine_texte": "Kurufaba mandéniane — Xwéda (Ifri)",
        "armes_predilection": "Lourde lame de chasse (apparentée au sabre), tenue à une main",
        "academies": "Gardée par les chasseresses de la Xwéda, au cœur des jungles et marécages mandénians ; on en murmure l'art dans toute la Kurufaba et au-delà, à travers l'Ifri",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti Gbeto chasse l'homme comme la bête : à la toute première attaque qu'il porte dans un combat, il ajoute sa Finesse aux dés non gardés des dommages — le coup de l'affût, que la longue attente a rendu mortel"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Le compagnon Gbeto sait abattre plus gros que lui : il peut ajouter la Gaillardise de sa propre cible au dès non-gardés de dégâts, au lieu de la sienne"
          },
          "maitre": {
            "fluff": null,
            "regles": "Rien n'effraie le maître Gbeto, qui a affronté plus dangereux qu'un homme : il bénéficie de deux augmentations gratuites aux tests d'Estomac visant à résister à la Peur et l'intimidation. De plus, ses attaques contre une cible déjà victime d'une Blessure Grave divisent son armure par deux (arrondi à l'inférieur) — le coup de grâce du chasseur"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Krzyż",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Sabre",
      "arme_display": "Sabre",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Athlétisme"
      ],
      "description_courte": "Dans la Rzeczpospolita, où la szlachta — c'est-à-dire la quasi-totalité d'une population entièrement anoblie — tient le sabre pour un droit de naissance et l'emblème du sarmatisme (le long manteau cramoisi, la ceinture de tissu, la lame courbe), le Krzyż est le premier art que l'on apprend.",
      "techniques_combat": [
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Double parade",
          "variante": null,
          "ref": "double parade",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup puissant",
          "variante": "Sabre",
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Feinte",
          "variante": "Sabre",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Dans la Rzeczpospolita, où la szlachta — c'est-à-dire la quasi-totalité d'une population entièrement anoblie — tient le sabre pour un droit de naissance et l'emblème du sarmatisme (le long manteau cramoisi, la ceinture de tissu, la lame courbe), le Krzyż est le premier art que l'on apprend. Il ne se réclame d'aucun fondateur : il s'est cristallisé au fil des générations dans les salles d'armes du pays, où des maîtres ont réduit le chaos du sabre à une géométrie enseignable, celle des « tailles en croix ».",
          "Le principe en est une grille de parades qui glissent sans rupture vers la riposte : le sabre ne quitte jamais la ligne, et chaque défense arme déjà l'attaque. C'est un art sobre, sans fioritures, que tout szlachcic se doit de maîtriser avant de prétendre à un style plus personnel.",
          "La principale faiblesse du Krzyż tient à la rigueur même de ses schémas : un adversaire qui multiplie les angles imprévus — un acrobate, un manieur d'armes jumelées — sort le krzyżeur de ses rails et le force à improviser, là où son entraînement le dessert."
        ],
        "origine_texte": "Rzeczpospolita (Fédération Sarmatienne)",
        "armes_predilection": "Sabre (szabla), tenu à une main",
        "academies": "Berceau dans la Rzeczpospolita, où il est l'art-socle de la szlachta. Enseigné aussi à travers les Îles Glamour — Avalon, les Marches des Highlands et Inismore —, où les bretteurs friands du sabre l'ont volontiers adopté",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Dans le cadre d'une Riposte, si la défense active de Parade au sabre de l'apprenti Krzyż réussit, sa contre-attaque ne souffre d'aucun malus au test ([Finesse + Riposte] au lieu de [Finesse + Riposte + 5])"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Une fois par round, après une Riposte réussie, le compagnon Krzyż enchaîne immédiatement une autre attaque au sabre sans dépenser de dé d'action si le premier test est raté, dans les mêmes conditions : sa contre-attaque se teste avec [Finesse + rang de Riposte divisé par 2 et arrondi à l'entier supérieur + rang d'Attaque divisé par deux et arrondi à l'entier inférieur] dés, et le ND de cette attaque est augmenté de 5"
          },
          "maitre": {
            "fluff": null,
            "regles": "Les attaques issues de Riposte du maître Krzyż ignorent l'encaissement de la cible"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)",
        "sous_titre": "la Croix"
      },
      "enrichie": true
    },
    {
      "nom": "Pancerny",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Sabre et tarcza",
      "arme_display": "Sabre et tarcza",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Cavalier"
      ],
      "description_courte": "Sous les hussards ailés, dont l'éclat masque le nombre, ce sont les pancerni — la cavalerie « blindée » de moyenne ligne — qui forment le gros de l'armée de la Rzeczpospolita.",
      "techniques_combat": [
        {
          "nom_base": "Charge de cavalerie",
          "variante": null,
          "ref": "charge de cavalerie",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Charge au bouclier",
          "variante": null,
          "ref": "charge au bouclier",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Sous les hussards ailés, dont l'éclat masque le nombre, ce sont les pancerni — la cavalerie « blindée » de moyenne ligne — qui forment le gros de l'armée de la Rzeczpospolita. Bien plus nombreux et moins fortunés, ils combattent sabre au poing et bouclier rond au bras ; c'est dans leurs rangs, au fil de générations de guerres de frontière contre les Tatars et les cavaliers de l'est, que s'est forgé leur style.",
          "Le Pancerny privilégie la polyvalence et la cohésion : on y apprend à charger avec mesure, à tenir en selle comme à pied, et surtout à combattre épaule contre épaule, chaque cavalier couvrant son voisin.",
          "Sa faiblesse est celle de tout touche-à-tout : sans tranchant décisif face à un pur spécialiste, le pancerny perd en outre une bonne part de son efficacité dès qu'on l'isole de ses camarades."
        ],
        "origine_texte": "Rzeczpospolita (Fédération Sarmatienne)",
        "armes_predilection": "Sabre et tarcza (bouclier rond de cavalier)",
        "academies": "Né dans les rangs de la cavalerie moyenne de la Rzeczpospolita. Enseigné aussi en Ussura, où la parenté des cavaliers des steppes en a favorisé l'essor",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Équipé de son bouclier, l'apprenti Pancerny ajoute +3 à l'attribut « Défensive » de tout bouclier qu'il porte. À pied comme monté, il dispose de la Réception de charge tant qu'il est équipé d'un sabre et d'un bouclier"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Lorsqu'il charge (monté ou à pied), le compagnon Pancerny voit le malus de Charge passer de -1g1 à 0 et ajoute 2g1 aux dommages de la charge (au lieu de sa Gaillardise ×2)"
          },
          "maitre": {
            "fluff": null,
            "regles": "Tant qu'au moins un allié combat à ses côtés, le maître Pancerny et cet allié gagnent +4 à leur Défense Passive ; ce bonus est doublé si l'allié possède lui aussi un bouclier"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Koncerz",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Koncerz",
      "arme_display": "Koncerz",
      "armes_categories": [
        "Escrime (Rapière)"
      ],
      "specialisations": [
        "Escrime (Rapière)",
        "Cavalier"
      ],
      "description_courte": "Quand la kopia — la longue lance des hussards ailés — se brise au premier choc de la charge, il reste au cavalier le koncerz : un estoc démesuré, raide, de section triangulaire, sanglé sous la selle.",
      "techniques_combat": [
        {
          "nom_base": "Fente en avant",
          "variante": null,
          "ref": "fente en avant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Prise de bras",
          "variante": null,
          "ref": "prise de bras",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Quand la kopia — la longue lance des hussards ailés — se brise au premier choc de la charge, il reste au cavalier le koncerz : un estoc démesuré, raide, de section triangulaire, sanglé sous la selle. L'art du Koncerz est né de cette nécessité, dans les écoles de cavalerie de la Rzeczpospolita, pour donner aux hussards privés de leur lance un second coup aussi mortel que le premier.",
          "Ce n'est pas une arme de taille : c'est une pointe, conçue pour trouver le défaut d'une armure et la percer d'un seul estoc. Le styliste apprend à viser le jour entre deux plaques et à concentrer dans sa pointe tout l'élan d'une monture lancée.",
          "Sa faiblesse est inhérente à l'arme : médiocre en taille et en défense circulaire, l'estoc laisse son porteur démuni une fois la pointe liée ou écartée, car la relance est lente."
        ],
        "origine_texte": "Rzeczpospolita (Fédération Sarmatienne)",
        "armes_predilection": "Koncerz (long estoc rigide à section triangulaire)",
        "academies": "Pratique d'estoc des hussards ailés de la Rzeczpospolita. Enseigné aussi en Vodacce, dont la tradition de la pointe et de l'estoc en goûte la rigueur",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Les attaques d'estoc de l'apprenti Koncerz (Fente en avant et Prise de bras) réduisent de moitié la valeur d'armure de la cible"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Un estoc porté par le compagnon Koncerz après une charge — ou depuis une monture — ignore entièrement la valeur d'armure de la cible"
          },
          "maitre": {
            "fluff": null,
            "regles": "Le maître Koncerz reçoit une augmentation gratuite lorsqu'il utilise les techniques Fente en avant et Prise de bras. Quand son estoc inflige une Blessure, la cible subit -5 à toutes ses actions jusqu'à recevoir des soins"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)",
        "sous_titre": "l'estoc des hussards"
      },
      "enrichie": true
    },
    {
      "nom": "Lipka",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Sabre léger",
      "arme_display": "Sabre léger",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Athlétisme"
      ],
      "description_courte": "Aux marches méridionales de la Rzeczpospolita vivent les Lipka, des Tatars de confession dīniste installés depuis des générations au service de la Fédération, dont ils forment une cavalerie légère réputée.",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Sabre",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Tourbillon",
          "variante": null,
          "ref": "tourbillon",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Aux marches méridionales de la Rzeczpospolita vivent les Lipka, des Tatars de confession dīniste installés depuis des générations au service de la Fédération, dont ils forment une cavalerie légère réputée. Fidèles à l'empire qui les a accueillis sans exiger qu'ils abjurent, ils ont conservé l'art du sabre de leurs ancêtres des steppes — et l'ont peu à peu transmis aux Sarmates.",
          "Le Lipka est tout de vitesse et de feintes : la lame légère — l'ordynka — danse autour de l'adversaire, et le duelliste ne s'arrête jamais. C'est un style de mouvement, fait pour celui qui frappe et se dérobe avant la riposte.",
          "Sa faiblesse est le revers de sa légèreté : le sabre léger mord mal l'armure lourde et encaisse mal les coups puissants ; privé de mouvement, le lipka est vulnérable."
        ],
        "origine_texte": "Rzeczpospolita — frontière méridionale (Fédération Sarmatienne)",
        "armes_predilection": "Sabre léger (ordynka), tenu à une main",
        "academies": "Issu des Tatars Lipka au service de la Fédération, le long de la frontière sud de la Rzeczpospolita. Diffusé par les routes steppiques jusque dans l'Empire du Croissant, au Cathay (par le Khazari) et en Ifri (par le Maghreb)",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti Lipka ajoute +1 dé non gardé à tous ses jets d'Initiative et bénéficie d'une augmentation gratuite à ses Feintes au sabre léger"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Une fois par round, après une attaque réussie, le compagnon Lipka peut se déplacer de la moitié de sa distance de mouvement sans dépenser d'action ni provoquer d'attaque d'opportunité"
          },
          "maitre": {
            "fluff": null,
            "regles": "Tant que le maître Lipka a effectué une action de mouvement durant la phase — ou son demi-déplacement à la suite d'une attaque réussie —, sa Défense Passive augmente de 5"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Žynys",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Sabre et dague rituelle",
      "arme_display": "Sabre et dague rituelle",
      "armes_categories": [
        "Escrime (Sabre)",
        "Couteau"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Couteau"
      ],
      "description_courte": "La Curonie, l'autre moitié de la Fédération, n'a jamais ployé sous la foi vaticine : on y honore encore les dievai, et ses prêtres — les Žynys — passent avec ces esprits des pactes que redoutent les étrangers.",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Sabre",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Double parade",
          "variante": "Sabre / Couteaux",
          "ref": "double parade",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Harceler",
          "variante": null,
          "ref": "harceler",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "La Curonie, l'autre moitié de la Fédération, n'a jamais ployé sous la foi vaticine : on y honore encore les dievai, et ses prêtres — les Žynys — passent avec ces esprits des pactes que redoutent les étrangers. Quelques-uns d'entre eux ont fait de leur sacerdoce un art du duel, où la lame n'est que le prolongement de la menace rituelle.",
          "Le Žynys combat enveloppé d'invocations, une dague rituelle au poing gauche qui pare autant qu'elle inquiète. Ses gestes lents et chargés de présages troublent l'adversaire avant même le premier fer, et c'est dans ce trouble qu'il frappe.",
          "La principale faiblesse du Žynys est que sa mise en scène n'opère qu'une fois : un adversaire qui l'a déjà affronté, ou un vaticin aguerri et imperméable aux « superstitions », n'en ressent plus le trouble."
        ],
        "origine_texte": "Curonie (Fédération Sarmatienne)",
        "armes_predilection": "Sabre et dague rituelle (employée en parade)",
        "academies": "Style des prêtres-duellistes païens de Curonie, dépositaires de l'ancienne foi. L'organisation des Ratas (qui régule les Losejas qui ont passé un pacte avec un Dievaï) enseigne également ce style. Enseigné aussi en Ussura, où il rencontre un terreau de croyances anciennes apparenté",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti Žynys gagne la compétence « Intimidation » en compétence de base. Il pare à la dague (y compris avec Double parade) en ajoutant son Panache à son total passif ou au résultat de ses tests actifs ; un adversaire qui l'affronte pour la première fois doit réussir un test de [Esprit + Estomac] à un ND de 20, auquel cas il subit -5 à sa Défense Passive durant le premier round"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Une fois par round, le compagnon Žynys peut relancer l'intégralité d'un test raté sur une Feinte ou une attaque"
          },
          "maitre": {
            "fluff": null,
            "regles": "Le maître Žynys ne subit aucun malus lorsqu'il rate une Feinte. Lorsqu'il touche après une Feinte réussie, la cible subit aussi -1g0 à sa prochaine action"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Vilkas",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Sabre et hachette",
      "arme_display": "Sabre et hachette",
      "armes_categories": [
        "Escrime (Sabre)",
        "Haches"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Haches"
      ],
      "description_courte": "Les grandes forêts de Curonie, où rôdent encore le loup et l'ours, ont leurs propres maîtres : des rôdeurs, braconniers et pisteurs qui connaissent chaque fourré et chaque ombre.",
      "techniques_combat": [
        {
          "nom_base": "Déplacements circulaires",
          "variante": null,
          "ref": "deplacements circulaires",
          "source": "docx_v2"
        },
        {
          "nom_base": "Harceler",
          "variante": null,
          "ref": "harceler",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Lacérer",
          "variante": null,
          "ref": "lacerer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Les grandes forêts de Curonie, où rôdent encore le loup et l'ours, ont leurs propres maîtres : des rôdeurs, braconniers et pisteurs qui connaissent chaque fourré et chaque ombre. De leur manière de chasser l'homme comme la bête est née l'école Vilkas, transmise loin des salles d'armes, autour des feux des villages forestiers.",
          "Le Vilkas chasse en meute et frappe par surprise : sabre dans une main, hachette dans l'autre, le rôdeur harcèle, use le terrain et achève la proie affaiblie. Le sabre ouvre, la hachette achève.",
          "Sa faiblesse est sa dépendance au décor : conçu pour l'escarmouche et le couvert, le Vilkas perd son mordant dans un duel formel à découvert, sans terrain à exploiter."
        ],
        "origine_texte": "Curonie (Fédération Sarmatienne)",
        "armes_predilection": "Sabre et hachette (au corps à corps)",
        "academies": "Art des rôdeurs des grandes forêts curoniennes. Enseigné aussi en Ussura et en Ifri, partout où l'on se bat à couvert et par embuscade",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Maniant sabre et hachette, l'apprenti Vilkas ignore le malus de main non-directrice. Il bénéficie d'une augmentation gratuite lors de l'utilisation de la technique Lacérer. Lorsqu'il emploie la technique Harceler (notamment hors duel), la cible ne bénéficie plus du bonus de deux augmentations à ses tests visant à s'enfuir du combat"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Contre une cible déjà blessée (au moins une Blessure), le compagnon Vilkas ajoute sa Finesse aux dés non gardés de ses dommages"
          },
          "maitre": {
            "fluff": null,
            "regles": "Une fois par round, le maître Vilkas peut effectuer une attaque supplémentaire à la hachette contre un adversaire adjacent qu'il a déjà touché ce round"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)",
        "sous_titre": "le Loup"
      },
      "enrichie": true
    },
    {
      "nom": "Szabla Honoru",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Sabre",
      "arme_display": "Sabre",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Étiquette"
      ],
      "description_courte": "La Liberté dorée de la Rzeczpospolita a fait de chaque szlachcic l'égal des plus grands : tous votent au Sejm, tous se disent nobles, et tous, par conséquent, ont un honneur à défendre l'épée à la main.",
      "techniques_combat": [
        {
          "nom_base": "Désarmer",
          "variante": "Sabre",
          "ref": "desarmer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Retourner les Attaques",
          "variante": null,
          "ref": "retourner les attaques",
          "source": "docx_v2"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Feinte",
          "variante": "Sabre",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "La Liberté dorée de la Rzeczpospolita a fait de chaque szlachcic l'égal des plus grands : tous votent au Sejm, tous se disent nobles, et tous, par conséquent, ont un honneur à défendre l'épée à la main. De cette singularité sont nés une institution — le duel rituel au premier sang — et l'école qui la sert, enseignée dans les cours et les villes du pays.",
          "Le Szabla Honoru est l'art de vaincre sans tuer : coups mesurés, désarmements élégants, retournement des attaques adverses. On y blesse pour humilier, non pour occire, car le sang versé suffit à laver l'offense.",
          "Sa faiblesse est l'envers de sa courtoisie : taillé pour le duel d'honneur codifié, il se retrouve démuni dans une mêlée sans règles, ou face à un adversaire qui méprise l'honneur et frappe pour tuer."
        ],
        "origine_texte": "Rzeczpospolita (Fédération Sarmatienne)",
        "armes_predilection": "Sabre (szabla), tenu à une main",
        "academies": "École des cours et des villes de la Rzeczpospolita, fille de l'anoblissement général de la population. Enseignée aussi en Avalon, dont la culture chevaleresque du duel l'a accueillie",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti Szabla Honoru peut effectuer la technique Retourner les Attaques au sabre face à des armes d'escrime (Sabre, Épées, Rapières) avec un malus au ND de 5 au lieu de 10"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Lorsqu'il touche, le compagnon Szabla Honoru peut porter un coup « maîtrisé » : avant le jet de dégâts d'une attaque réussie, il peut transférer autant de dés non gardés vers les dés gardés qu'il le souhaite, mais les dégâts s'arrêtent dès que l'adversaire subit une Blessure — il n'en prend alors pas davantage"
          },
          "maitre": {
            "fluff": null,
            "regles": "Le maître Szabla Honoru maîtrise la botte Retourner les Attaques : lorsqu'elle réussit, ce n'est plus l'adversaire qui choisit en sa faveur les dés de dégâts qu'il subira — c'est le maître Szabla Honoru qui les choisit à sa place"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)",
        "sous_titre": "le sabre d'honneur"
      },
      "enrichie": true
    },
    {
      "nom": "Nadziak",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Nadziak",
      "arme_display": "Nadziak",
      "armes_categories": [
        "Masses"
      ],
      "specialisations": [
        "Masse",
        "Athlétisme"
      ],
      "description_courte": "Le nadziak — un marteau de cavalier dont le bec d'acier perce les armures que nulle taille n'entame — pend à la selle de bien des szlachcice, qui s'en servent autant pour la guerre que pour régler leurs querelles.",
      "techniques_combat": [
        {
          "nom_base": "Coup de pommeau",
          "variante": null,
          "ref": "coup de pommeau",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Prise de bras",
          "variante": null,
          "ref": "prise de bras",
          "source": "docx_v2"
        },
        {
          "nom_base": "Marquer",
          "variante": null,
          "ref": "marquer",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Le nadziak — un marteau de cavalier dont le bec d'acier perce les armures que nulle taille n'entame — pend à la selle de bien des szlachcice, qui s'en servent autant pour la guerre que pour régler leurs querelles. Réputé déloyal, banni de plus d'un duel d'honneur, il a pourtant son école, transmise par ceux qui préfèrent l'efficacité brutale à l'élégance.",
          "L'art du Nadziak est celui du choc : on frappe pour briser, pour étourdir, pour défoncer la cuirasse. C'est une école de mêlée et de rixe, sans esthétique, mais redoutable dans la fureur du combat.",
          "Sa faiblesse est sa brutalité même : puissant mais lent et lisible, le nadziak laisse un duelliste vif et mobile le déborder — et son port traîne une réputation sulfureuse qui se paie en société."
        ],
        "origine_texte": "Rzeczpospolita (Fédération Sarmatienne)",
        "armes_predilection": "Nadziak (marteau de cavalier à bec d'acier)",
        "academies": "Tradition martiale de la szlachta de la Rzeczpospolita. Enseignée aussi en Eisen, où les rudes combattants apprécient son efficacité contre les armures",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "Lorsque l'apprenti Nadziak manie une arme de type Masse dotée de l'attribut « Fracassant », il lui ajoute l'attribut « Perforant » de la même valeur que son attribut Fracassant"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Lorsque le compagnon Nadziak inflige une Blessure Grave, la cible est sonnée et perd sa prochaine action"
          },
          "maitre": {
            "fluff": null,
            "regles": "Contre une cible portant une armure (Mailles ou davantage), le maître Nadziak ignore la totalité de l'armure ; contre les autres types d'armure, il inflige 0g1 dé de dégâts supplémentaire"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Zimowit",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Pałasz",
      "arme_display": "Pałasz",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Athlétisme"
      ],
      "description_courte": "Sur la frontière orientale de la Rzeczpospolita, là où la Fédération touche l'Ussura et où l'hiver tue plus sûrement que l'ennemi, on ne combat pas comme dans les salles tièdes du pays.",
      "techniques_combat": [
        {
          "nom_base": "Force d'âme",
          "variante": null,
          "ref": "force d'ame",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup puissant",
          "variante": null,
          "ref": "coup puissant",
          "source": "docx_v2"
        },
        {
          "nom_base": "Riposte",
          "variante": null,
          "ref": "riposte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Corps à Corps",
          "variante": null,
          "ref": "corps a corps",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "Sur la frontière orientale de la Rzeczpospolita, là où la Fédération touche l'Ussura et où l'hiver tue plus sûrement que l'ennemi, on ne combat pas comme dans les salles tièdes du pays. L'école Zimowit y est née, parmi les garnisons des marches, façonnée par le froid, les longues campagnes et la nécessité de durer.",
          "Le Zimowit « tient l'hiver » : posture basse, coups amples du lourd pałasz, endurance à toute épreuve qui use l'adversaire autant qu'elle l'écrase. C'est un art de patience et de ténacité, où l'on encaisse pour mieux frapper en retour.",
          "Sa faiblesse est que l'endurance y prime la vitesse : un adversaire mobile et feinteur esquive les grands coups et le prend de vitesse, tournant sa puissance contre lui."
        ],
        "origine_texte": "Rzeczpospolita — frontière ussurane (Fédération Sarmatienne)",
        "armes_predilection": "Pałasz (sabre lourd à lame droite)",
        "academies": "Forgé sur la frontière orientale de la Rzeczpospolita, face aux hivers ussurans. Enseigné aussi dans les Marches des Highlands, dont les durs montagnards y reconnaissent les leurs",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti Zimowit réduit d'un montant égal à sa Détermination ×3 les dommages de la première attaque qui le touche à chaque round"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Tant qu'il a subi au moins une Blessure Grave, le compagnon Zimowit ajoute sa Détermination aux dés non gardés de ses dommages"
          },
          "maitre": {
            "fluff": null,
            "regles": "Une fois par combat, lorsqu'il devrait être mis hors de combat, le maître Zimowit tient debout jusqu'à la fin du round, en ignorant les malus dus à ses Blessures (mais pas la Frustration)"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)"
      },
      "enrichie": true
    },
    {
      "nom": "Wolny Lis",
      "origine": "seconde_edition_adaptee",
      "nations": [
        "Sarmatie"
      ],
      "arme": "Sabre",
      "arme_display": "Sabre",
      "armes_categories": [
        "Escrime (Sabre)"
      ],
      "specialisations": [
        "Escrime (Sabre)",
        "Observation"
      ],
      "description_courte": "La Fédération a toujours produit plus de soldats que de guerres pour les employer, et ses fils s'en vont louer leur sabre d'un bout à l'autre du monde.",
      "techniques_combat": [
        {
          "nom_base": "Feinte",
          "variante": "Sabre",
          "ref": "feinte",
          "source": "docx_v2"
        },
        {
          "nom_base": "Céder la place",
          "variante": null,
          "ref": "ceder la place",
          "source": "docx_v2"
        },
        {
          "nom_base": "Exploiter les faiblesses",
          "variante": "catégorie d'arme au choix",
          "ref": "exploiter les faiblesses",
          "source": "docx_v2"
        },
        {
          "nom_base": "Coup fourré",
          "variante": null,
          "ref": "coup fourre",
          "source": "docx_v2"
        },
        {
          "nom_base": "Voir le style",
          "variante": null,
          "ref": "voir le style",
          "source": "docx_v2"
        }
      ],
      "avantages_courts": {},
      "restriction_creation": "libre",
      "genre_restriction": null,
      "details": {
        "description_longue": [
          "La Fédération a toujours produit plus de soldats que de guerres pour les employer, et ses fils s'en vont louer leur sabre d'un bout à l'autre du monde. C'est dans ces compagnies de mercenaires sarmates — qui combattent un jour pour un prince vodaccis, le lendemain contre lui — qu'est né le Wolny Lis, l'art de survivre à toutes les guerres des autres.",
          "Le Renard n'enseigne pas tant une botte qu'une manière de lire l'adversaire et de retourner son propre jeu contre lui. Le mercenaire qui le pratique a vu mille styles et sait s'adapter à chacun, là où d'autres ne connaissent que le leur.",
          "Sa faiblesse est d'être adaptable mais maître de rien : face à un bagarreur sans style à « lire », il n'a aucune prise, et sa frappe brute reste inférieure à celle des écoles spécialisées."
        ],
        "origine_texte": "Fédération Sarmatienne",
        "armes_predilection": "Sabre, tenu à une main",
        "academies": "Porté par les compagnies mercenaires sarmates qui se louent d'un bout à l'autre du monde. Enseigné aussi dans les Nations Pirates (exporté à Numa), dans l'Empire du Croissant et en Ifri, au gré des champs de bataille",
        "homologation": "Reconnue par la Guilde des Duellistes",
        "rangs_requis": "Compagnon : 3 Techniques de combat au rang 3. Maître : 4 Techniques de combat au rang 4",
        "techniques_toutes_avancees": true,
        "niveaux": {
          "apprenti": {
            "fluff": null,
            "regles": "L'apprenti Wolny Lis ajoute +1g1 à ses jets de Voir le style. S'il parvient à identifier l'école adverse, il obtient 2 points de Défense Passive et active supplémentaires par rang de Voir le style (au lieu de 1)"
          },
          "compagnon": {
            "fluff": null,
            "regles": "Contre un adversaire dont il a identifié l'école (Voir le style réussi), le compagnon Wolny Lis gagne une augmentation gratuite à tous ses jets d'attaque contre cette cible"
          },
          "maitre": {
            "fluff": null,
            "regles": "Une fois par combat, le maître Wolny Lis peut emprunter une Technique de combat qu'il a vu l'adversaire employer, l'utilisant à son propre rang de Voir le style jusqu'à la fin du combat"
          }
        },
        "_source_pdf": "spadassin_v2",
        "categorie_creation": "Écoles de Duelliste (2ᵉ Édition)",
        "sous_titre": "le Renard libre"
      },
      "enrichie": true
    }
  ]
};
