=====================================================================
 MINECRAFT V2
=====================================================================
 Un clone complet de Minecraft :
   - minecraft-v2.html : le jeu entier dans un seul fichier, à ouvrir dans
     un navigateur, en solo ou à plusieurs en réseau local (server.js)
   - app/ : le même jeu en APPLICATION WINDOWS (installateur, icône sur le
     Bureau, plein écran, serveur réseau intégré)
   - assets/ : textures, sons, police et musiques, avec leurs licences

 Minecraft V1 (l'ancien jeu) est dans un autre dépôt (privé) :
 https://github.com/pythontester123/minecraft-v1

=====================================================================
 MINECRAFT V2 — L'APPLICATION WINDOWS (la façon la plus simple de jouer)
=====================================================================

  Installer :
    1. Télécharger l'installateur (page « Releases » du dépôt GitHub) :
         https://github.com/pythontester123/minecraft-v2/releases/latest/download/Minecraft-V2-Installation.exe
       puis double-cliquer sur « Minecraft-V2-Installation.exe ».
    2. Windows peut afficher « Windows a protégé votre ordinateur » (le jeu
       n'est pas signé par un éditeur connu, c'est normal pour un jeu fait
       maison) : cliquer « Informations complémentaires » puis
       « Exécuter quand même ».
    3. L'installation prend quelques secondes, puis le jeu se lance.
       Une icône « Minecraft V2 » est créée sur le Bureau et dans le menu
       Démarrer : il suffit ensuite de double-cliquer dessus.

  Dans l'application :
    - Le jeu s'ouvre en plein écran. F11 (ou Alt+Entrée) : plein écran /
      fenêtre. « Quitter le jeu » sur l'écran titre pour fermer.
    - Le monde est sauvegardé automatiquement quand on ferme le jeu
      (même avec la croix ou Alt+F4).
    - Les mondes sont rangés dans %APPDATA%\Minecraft V2 ; ils sont gardés
      si on désinstalle ou réinstalle le jeu.
    - Pour mettre à jour : installer la nouvelle version par-dessus.
    - Pour désinstaller : Paramètres Windows → Applications → Minecraft V2.

  Récupérer les mondes du navigateur dans l'application :
    1. Ouvrir minecraft-v2.html (la nouvelle version) dans le navigateur,
       comme avant : « Un joueur », choisir le monde, « Exporter ».
       Un fichier « NomDuMonde.mcv2 » est enregistré (Téléchargements).
    2. Dans l'application : « Un joueur » → « Importer » → choisir ce fichier.
    (Exporter/Importer sert aussi à faire une copie de sauvegarde d'un monde
     ou à l'envoyer à un ami.)

  Jouer à deux avec l'application : plus besoin de « node server.js » !
    - L'hôte : Échap → « Ouvrir en réseau local » → « Ouvrir le monde ».
      La première fois, Windows demande d'autoriser « Minecraft V2 » sur le
      réseau : cliquer « Autoriser » (réseaux privés). L'écran affiche
      l'adresse à donner, par exemple 192.168.1.20:3000.
    - L'ami (avec l'application) : « Multijoueur » → taper cette adresse →
      « Rejoindre ». Sans l'application : ouvrir http://192.168.1.20:3000
      dans un navigateur.

  Pour les développeurs (fabriquer l'installateur) :
      cd app
      npm install
      npm start        (lance le jeu sans l'installer)
      npm run dist     (crée app/dist/Minecraft-V2-Installation.exe)
    À chaque modification de app/ ou de minecraft-v2.html envoyée sur GitHub,
    GitHub Actions refabrique l'installateur et le publie dans « Releases »
    (.github/workflows/app-windows.yml).
    L'application utilise Electron (le moteur de Chrome) : main.js ouvre la
    fenêtre, lan.js est le serveur du réseau local, scripts/prepare.js copie
    minecraft-v2.html dans l'application, build/icon.ico est l'icône
    (dessinée par scripts/make_icon.py avec les textures du jeu).

=====================================================================
 minecraft-v2.html — Minecraft V2 (solo, ou à deux en réseau local)
=====================================================================

JOUER À DEUX (ou plus, jusqu'à 8) SUR LE MÊME RÉSEAU — comme « Ouvrir en LAN »
(avec l'application Windows, c'est encore plus simple : voir plus haut)

  Sur le PC de l'HÔTE (celui qui a le monde), version navigateur :
    1. Ouvrir un terminal dans le dossier du jeu et lancer le serveur :
         node server.js
       (la première fois : « npm install » ; si Windows demande d'autoriser
       Node.js sur le réseau, cliquer « Autoriser » pour les réseaux privés)
    2. Ouvrir minecraft-v2.html comme d'habitude, charger son monde.
    3. Échap → « Ouvrir en réseau local » → « Ouvrir le monde ».
       L'écran affiche l'adresse à donner à l'ami, par exemple :
         http://192.168.1.20:3000

  Sur le PC de l'AMI :
    4. Ouvrir cette adresse dans le navigateur (Chrome, Edge, Firefox…).
    5. « Multijoueur (réseau local) » → choisir un pseudo → « Rejoindre ».
       (On peut aussi ouvrir son propre minecraft-v2.html et taper
       l'adresse 192.168.1.20:3000 dans le champ « Adresse de l'hôte ».)

  Ce qui est partagé : le monde entier (blocs posés/cassés, eau, TNT,
  portes, cultures), les créatures (qui attaquent les deux joueurs), les
  objets au sol, l'XP, les coffres et les fours, les villageois (échanges),
  les loups (chacun apprivoise les siens), l'heure, la météo et le chat (T).
  Chaque joueur voit l'autre avec son pseudo au-dessus de la tête.

  À savoir :
    - Le monde est sauvegardé uniquement chez l'hôte. L'inventaire, la vie
      et la position de l'ami sont gardés dans ce monde : en revenant avec
      le même pseudo, il retrouve ses affaires.
    - Le jeu ne se met pas en pause avec Échap quand le monde est ouvert,
      et il continue de tourner même si l'hôte change de fenêtre.
    - Seul l'hôte change de dimension : quand il prend un portail, l'ami
      le suit automatiquement dans le Nether, l'End (ou l'Overworld).
    - Seul l'hôte peut dormir pour passer la nuit ; le lit de l'ami lui
      sert de point de réapparition.
    - Si l'hôte quitte ou ferme le réseau local, l'ami revient à l'écran
      « Multijoueur » avec un message.
    - Les mondes sont rangés par navigateur ET par façon d'ouvrir le jeu :
      l'hôte doit continuer d'ouvrir minecraft-v2.html comme avant (double
      clic sur le fichier) pour retrouver ses mondes.

Un clone complet de Minecraft dans UN SEUL fichier HTML, en WebGL2 pur,
sans aucune dépendance ni connexion réseau : il suffit d'ouvrir
minecraft-v2.html dans un navigateur récent (Chrome, Edge, Firefox, Safari).

Contenu :
  - Monde infini généré procéduralement (16 biomes : plaines, forêts,
    bouleaux, taïga, désert, montagnes, marais, jungle, savane, plages,
    rivières, océans, zones enneigées...), grottes, minerais par profondeur,
    arbres (chêne, bouleau, sapin, acacia, grand chêne), fleurs, cactus,
    cannes à sucre, citrouilles, pastèques, donjons avec coffres piégés.
  - 120 blocs et 115 objets : outils et armures (bois/pierre/fer/or/diamant),
    nourriture, teintures, seaux, arc et flèches, TNT, lits, portes, échelles,
    dalles, barrières, vitres, lanternes, fours, coffres, établi...
  - Éclairage par propagation (soleil + torches/lave/pierre lumineuse),
    occlusion ambiante et éclairage lissé, cycle jour/nuit avec soleil,
    lune, étoiles, nuages volumétriques, pluie et neige, brouillard.
  - Eau et lave qui coulent (sources infinies, obsidienne/pierres),
    sable et gravier qui tombent, cultures (blé, carottes, pommes de terre),
    pousses qui grandissent, herbe qui s'étend, feuilles qui se décomposent.
  - 8 créatures avec IA : cochon, vache, mouton (tondable, teintable),
    poule (pond des œufs), zombie, squelette (tire des flèches), creeper
    (explose), araignée. Apparition la nuit et dans le noir, feu au soleil.
  - Survie complète : vie, faim/saturation, armure, air sous l'eau, XP et
    niveaux, dégâts de chute, poison, mort et réapparition au lit.
  - Artisanat 2×2 et 3×3 (159 recettes, livre de recettes intégré),
    cuisson au four avec combustibles, inventaire créatif avec recherche.
  - Le Nether : cadre de portail en obsidienne (4×5, coins facultatifs,
    jusqu'à 21×21), allumé au briquet ; dimension à part avec cavernes de
    netherrack, mer de lave, pierre lumineuse, quartz, sable des âmes ;
    retour par portail (coordonnées ÷8), portail de sortie construit auto.
  - Forteresses du Nether : ponts en briques du Nether au-dessus de la lave,
    salles avec lanternes, coffres et générateur de blazes ; blazes volants
    qui tirent des boules de feu (bâtons de blaze, poudre de blaze).
  - Reproduction des animaux (nourrir deux animaux → bébé qui grandit),
    vent sur les feuilles, l'herbe et les cultures.
  - Technique : génération et maillage des chunks dans des Web Workers
    (transferables), sauvegarde IndexedDB binaire (un Uint16Array par
    chunk modifié, plus de limite des 5 Mo de localStorage ; les anciennes
    sauvegardes localStorage sont migrées automatiquement).
  - Version 1.1 :
    * Ombres dynamiques du soleil et de la lune (shadow map 2048 px, PCF),
      faces à l'ombre légèrement bleutées ; option « Ombres dynamiques ».
    * Eau avec vagues, reflet du ciel (Fresnel) et éclat du soleil.
    * Villages (plaines, savane, désert, taïga, neige) : maisons, grandes
      maisons, fermes, puits, lampadaires, chemins, coffres ; villageois
      à 5 métiers (fermier, bibliothécaire, forgeron, prêtre, boucher) qui
      échangent contre des émeraudes (clic droit). /locate village
    * Loups : apprivoiser avec des os, assis/debout au clic droit, nourrir
      avec de la viande ; ils défendent et attaquent avec vous.
    * Sons de blocs par matériau (synthèse modale et granulaire) et vrais
      enregistrements de pas, d'atterrissage, d'outil cassé et d'orbes
      d'XP (Kenney, CC0). Police pixel Monocraft (OFL).
    * Les créatures des deux dimensions sont sauvegardées, et les
      villageois ne réapparaissent pas en double au rechargement.
    * Ressources externes et licences : dossier assets/ (LICENSES.md).
  - Version 1.2 :
    * Icônes d'objets remplacées par de vraies textures pixel art du pack
      Pixel Perfection CE (CC BY-SA 4.0) : outils, armes, armures, nourriture,
      minerais, teintures, seaux, arc (qui se tend en main), etc.
    * Les fleurs, pousses, champignons, toile, torches, échelles et les
      cultures (blé, carottes, pommes de terre) utilisent aussi ces textures.
    * Icônes plates pour la porte, la lanterne, la canne à sucre et le lit.
  - Version 1.3 (graphismes et animations) :
    * Vraies textures Pixel Perfection pour les blocs (pierre, minerais,
      bois, feuilles, laine, coffre, fissures de minage…) ; eau, lave et
      portail du Nether animés image par image ; couleurs de biomes adoucies.
    * Soleil et lune texturés, avec les 8 phases de la lune (une par nuit).
    * Créatures refaites avec les modèles et les textures de l'original :
      joueur, zombie, squelette, creeper, cochon, vache, mouton, poule,
      araignée (yeux qui brillent la nuit), blaze, loup (sauvage, apprivoisé
      avec collier, en colère) et villageois habillés selon leur biome et
      leur métier. Les bébés ont une grosse tête.
    * Nouvelles animations : bras qui se balancent, squelette qui vise à
      l'arc, zombies bras tendus (parfois armés), creeper qui gonfle et
      clignote, mouton qui broute l'herbe (et refait sa laine), villageois
      qui secoue la tête, loup qui s'ébroue en sortant de l'eau.
    * Objets tenus en main en 3e personne, joueur accroupi, vrai bras en
      1re personne qui suit la caméra avec un léger retard.
    * Particules animées : explosions, fumée des torches, braises de lave,
      particules du portail, feuilles qui tombent, gouttes de pluie qui
      rebondissent, éclaboussures, coup d'épée balayant, orbes d'XP qui
      changent de couleur, objets ramassés qui volent vers le joueur.
    * Orages : éclairs visibles, flash qui illumine le ciel et le monde,
      tonnerre retardé selon la distance.
    * Ombres rondes sous les créatures et les objets.
    * Post-traitement (option « Effets ») : halo lumineux (bloom), rayons
      du soleil à travers les nuages et les arbres, étalonnage des couleurs,
      vignettage, anticrénelage FXAA, ondulation de l'image sous l'eau.
  - Version 1.4 (shaders) : Options > « Shaders : élevés / ultra / désactivés »
    * Ciel physique : la couleur du ciel est calculée comme dans la vraie
      atmosphère (diffusion de Rayleigh et de Mie, ozone). Couchers de soleil
      dorés puis violets, disque solaire éblouissant, nuit bleutée sous la lune.
    * Nuages volumétriques : de vrais nuages en 3D (bruit Perlin-Worley) qui
      avancent avec le vent, éclairés par le soleil, plus nombreux et plus
      sombres sous la pluie ; ils projettent leur ombre sur le paysage.
    * Rayons de lumière volumétriques à travers les arbres et les reliefs,
      brume légère au loin qui prend la couleur du ciel.
    * Eau réaliste : vagues, réfraction (on voit le fond), couleur qui fonce
      avec la profondeur, reflets du décor et du ciel, écume sur les berges.
    * Éclairage HDR : ombres douces, lumière qui traverse les feuilles,
      blocs lumineux qui brillent (torches, pierre lumineuse, lave, citrouilles),
      relief sur les textures, flaques et sol mouillé sous la pluie.
    * Rendu cinéma : tonemapping ACES, adaptation de l'œil (on y voit mieux
      la nuit et dans les grottes après quelques secondes), anticrénelage
      temporel (TAA), halo lumineux.
    * « Ultra » double la précision des nuages et des rayons : à réserver aux
      cartes graphiques puissantes. Si le jeu rame, le jeu le signale ;
      choisissez « élevés » ou « désactivés ».
  - Version 1.5 (multijoueur) : Échap > « Ouvrir en réseau local » pour
    inviter des amis sur le même réseau (voir « JOUER À DEUX » plus haut) ;
    écran « Multijoueur (réseau local) » sur l'écran titre pour rejoindre.
  - Version 1.6 (application) : Minecraft V2 devient une application Windows
    avec installateur, icône, plein écran et serveur réseau intégré ;
    « Exporter » / « Importer » un monde (fichier .mcv2) ; boîte de dialogue
    du jeu pour renommer et supprimer les mondes.
  - Version 1.7 (confort et sons) :
    * Interface plus grande par défaut (inventaire, établi, coffres, four,
      barre d'objets), réglable dans Options > « Interface » (Auto, 80 % à 240 %).
    * Comme dans Minecraft, avec un paquet d'objets « dans la main » :
      clic droit maintenu en glissant = 1 objet dans chaque case survolée
      (pratique pour poser 8 planches en rond et faire un coffre) ;
      clic gauche maintenu en glissant = le paquet est partagé à parts égales.
    * 164 vrais sons enregistrés (libres de droits) : casser, creuser, poser et
      marcher sur chaque matière (pierre, bois, herbe, terre, gravier, sable,
      neige, laine, verre, métal, eau), cris, blessures et morts des animaux et
      des monstres, coups et coups critiques, portes, coffres, TNT, arc, œufs,
      boules de neige, cisailles, portail, pluie et tonnerre. Crédits dans
      assets/sounds/CREDITS.md.
    * Mes musiques : Options > « Ajouter mes musiques… » (MP3, MP4, OGG, WAV…).
      Elles passent de temps en temps pendant la partie, avec des silences
      entre deux morceaux comme dans Minecraft. Options > « Musique » pour
      choisir : celle du jeu, les vôtres, ou les deux.
  - Version 1.8 (musique vibe) : nouveau choix Options > « Musique : vibe ».
    Il joue les musiques créées par le propriétaire du jeu et intégrées dedans
    (assets/music/vibe), l'une après l'autre avec quelques secondes de pause.
    Tout le monde les a, même sans rien importer.
  - Version 2.0 (l'update de l'End) :
    * L'End : des forts sont cachés sous terre. Fabriquez des yeux de l'Ender
      (perle de l'Ender + poudre de blaze), lancez-les pour trouver le fort,
      remplissez les 12 cadres du portail et sautez dedans. Île d'end stone,
      piliers d'obsidienne, cristaux, tours de purpur avec coffres, ciel violet.
    * L'Ender Dragon : il tourne autour des piliers, fonce, crache son souffle
      et se soigne grâce aux cristaux ; barre de vie, rayons de lumière à sa
      mort, portail de retour, œuf du dragon, élytres et générique de fin.
    * Endermen : ne les regardez pas dans les yeux ! Ils se téléportent,
      craignent l'eau et lâchent des perles de l'Ender.
    * Élytres : sautez dans le vide puis appuyez encore sur Espace pour planer
      (physique de l'original) ; une fusée d'artifice pour accélérer.
    * Feux d'artifice : boule, double boule, étoile, anneau, cœur, saule doré,
      visage de creeper… avec lueurs, traînées, crépitements et éclair.
    * Ciel nocturne : aurores boréales (certaines nuits, surtout dans le froid),
      étoiles filantes (parfois des pluies entières), lucioles dans l'herbe.
    * Pêche : lancer, flotteur, sillage du poisson, touche, ferrage ; poissons,
      déchets et trésors (étiquette, coquille de nautile, émeraudes…).
    * Vie aquatique et grottes : calmars (encre), calmars luisants, morues et
      saumons en bancs, poissons tropicaux de toutes les couleurs,
      poissons-globes qui gonflent et piquent, chauves-souris suspendues.
    * Sous l'eau : reflets de lumière ondulants sur le fond, vision qui
      s'éclaircit en restant immergé, fonds marins mieux éclairés.
    * Étiquettes : clic droit sur une créature pour lui donner un nom.
    * Écran titre de nuit avec aurores et feux d'artifice, panneau des
      nouveautés, guide « Comment aller dans l'End », écran des succès (27).
    * Nouveaux sons libres (dragon, Endermen, élytres, feux d'artifice, pêche,
      calmars, chauves-souris), détaillés dans assets/sounds/CREDITS.md.
  - Version 2.1 (l'update des enchantements) :
    * Les 43 enchantements de Minecraft Java Edition, avec leurs vraies
      données (niveau maximum, rareté, objets compatibles, incompatibilités)
      et leurs vrais effets : Protection (et contre le feu, les explosions,
      les projectiles), Chute amortie, Épines, Respiration, Affinité
      aquatique, Agilité aquatique, Semelles givrantes, Agilité des âmes,
      Furtivité, Tranchant, Châtiment, Fléau des arthropodes, Recul, Aura de
      feu, Butin, Affilage, Efficacité, Toucher de soie, Fortune, Solidité,
      Raccommodage, Puissance, Frappe, Flamme, Infinité, Chance de la mer,
      Appât, Loyauté, Empalement, Impulsion, Canalisation, Charge rapide,
      Tir multiple, Perforation, Densité, Brèche, Explosion de vent, Fente,
      Malédiction du lien éternel et Malédiction de disparition.
    * Table d'enchantement (1 livre, 2 diamants, 4 obsidiennes) : jusqu'à
      15 bibliothèques autour, 3 choix payés en lapis-lazuli et en niveaux
      (même calcul que le jeu original), indice au survol, écriture
      mystérieuse, livre animé qui s'ouvre et suit le joueur, runes qui
      volent des bibliothèques vers la table.
    * Enclume : combine deux objets, ou un objet et un livre enchanté (deux
      niveaux égaux donnent le niveau suivant), répare avec le matériau,
      renomme ; le coût augmente à chaque passage (« Trop cher ! » à 40
      niveaux) ; l'enclume s'abîme puis se casse, et tombe comme du sable.
    * Meule : retire les enchantements (pas les malédictions) contre de
      l'expérience et répare deux objets identiques ; l'établi aussi.
    * Nouvelles armes : arbalète (avec le crochet), trident (lâché par les
      noyés, nouveaux zombies des océans et des rivières), masse (coup
      écrasant après une chute) et lances en bois, pierre, fer, or et
      diamant (charge en courant et Fente).
    * Orages : Canalisation fait tomber la foudre sur la cible du trident.
    * Livres enchantés dans les coffres (donjons, forts, forteresses du
      Nether, cités de l'End), à la pêche et chez le bibliothécaire ; fiole
      d'expérience chez le prêtre ; équipement enchanté dans les cités de
      l'End.
    * Reflet violet des objets enchantés (inventaire, main, objets au sol),
      noms colorés selon la rareté, 4 nouveaux succès (30 en tout), guide
      « Comment enchanter ? » sur l'écran titre, nouveaux sons.
    * Commandes : /enchant <enchantement> [niveau], /xp 30L,
      /weather thunder.
    * La carte du monde (touche M) a été retirée : elle n'existe pas dans
      le vrai Minecraft.
  - Mode créatif (vol : double espace), commandes (/help, /gamemode,
    /time, /tp, /give, /weather, /summon, /seed, /xp, /enchant, /heal...).
  - Sauvegarde locale de plusieurs mondes (localStorage), sauvegarde auto.
  - Interface FR/EN, écran de débogage F3, vue à la 3e personne F5,
    succès, sons et musique d'ambiance générés procéduralement,
    support clavier AZERTY/QWERTY, manette et écran tactile.

Contrôles : ZQSD/WASD, Espace, C (s'accroupir), Maj (courir), E (inventaire),
clic gauche (miner), clic droit (placer/utiliser), molette/1-9 (barre),
R (jeter), T (chat), / (commande), F3 (debug), F5 (vue), F1 (masquer HUD).

Sauvegarde : la partie est enregistrée automatiquement toutes les 90 s,
avec Échap > « Sauvegarder », et quand vous quittez (« Sauvegarder et quitter »).
Pour rejouer : ouvrez minecraft-v2.html dans le MÊME navigateur, « Un joueur »,
choisissez votre monde dans la liste puis « Jouer ».
