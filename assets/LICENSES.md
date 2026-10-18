# Ressources externes utilisées par `minecraft-v2.html`

Ces fichiers sont des copies des ressources intégrées dans `minecraft-v2.html`
(en base64, pour que le jeu fonctionne en ouvrant simplement le fichier).
Ils sont conservés ici pour pouvoir les vérifier, les remplacer ou les réutiliser.

| Fichier | Origine | Licence |
|---|---|---|
| `fonts/monocraft-subset.woff2` | Police [Monocraft](https://github.com/IdreesInc/Monocraft) par Idrees Hassan, réduite aux caractères latins | SIL Open Font License 1.1 (`fonts/Monocraft-OFL.txt`) |
| `sounds/kenney_land.mp3` | Kenney, [Starter Kit 3D Platformer](https://github.com/KenneyNL/Starter-Kit-3D-Platformer), `sounds/land.ogg` | CC0 1.0 (domaine public) |
| `sounds/kenney_coin.mp3` | Kenney, même kit, `sounds/coin.ogg` | CC0 1.0 |
| `sounds/sfx/*.mp3` (197 sons : blocs, pas, animaux, monstres, coups, portes, coffres, TNT, arc, pluie, tonnerre, Endermen, Ender Dragon, chauves-souris, calmars, poissons, pêche, feux d'artifice, table d'enchantement, arbalète…) | Jeux de blocs libres [VoxeLibre](https://github.com/VoxeLibre/VoxeLibre), [Minetest Game](https://github.com/luanti-org/minetest_game), [mobs_animal](https://github.com/minetest-mirrors/mobs_animal) et [Animalia](https://github.com/ElCeejo/animalia) ; auteur et licence de chaque fichier dans `sounds/CREDITS.md` | CC0 1.0, CC BY 3.0, CC BY-SA 3.0, CC BY-SA 4.0 ou MIT selon le fichier |
| `music/vibe/freecopyright.mp3` (musique de l'option « vibe ») | Créée par pythontester123, propriétaire de ce projet ; volume ajusté par `music/embed_vibe.py` | Fournie par son auteur pour Minecraft V2 |

| `textures/pixel_perfection_sheet.png` | Textures d'objets, de blocs, de particules et d'animations (eau, lave, portail) du pack [Pixel Perfection Community Edition](https://github.com/Athemis/PixelPerfectionCE) (révision `28e38ca`), créé par XSSheep et mis à jour par la communauté (StonePendant, freejusticehere, Stingraych, Nova_Wostra, lazerl0rd et autres) ; index dans `textures/sheet_index.json` | CC BY-SA 4.0 (`textures/PixelPerfectionCE-LICENSE-CC-BY-SA-4.0.md`) |
| `textures/pixel_perfection_sky.png` | Même pack : `environment/sun.png` et `environment/moon_phases.png` | CC BY-SA 4.0 |
| `textures/pixel_perfection_entities.png` | Même pack : textures des créatures (`entity/…`) ; index dans `textures/entities_index.json` | CC BY-SA 4.0 |
| Planche `ENT_SHEET2` intégrée au jeu (version 3.0) : pillard, évocateur, vex (et vex en charge) | [VoxeLibre](https://github.com/VoxeLibre/VoxeLibre) : `textures/mobs_mc_pillager.png`, `mobs_mc_evoker.png`, `mobs_mc_vex.png`, `mobs_mc_vex_charging.png`, textures dérivées de Pixel Perfection (voir `LEGAL.md` de VoxeLibre) | CC BY-SA 4.0 |
| Bannière sinistre (même planche, version 3.0) | Motifs de bannière de VoxeLibre (`textures/mcl_banners_banner_base.png`, `mcl_banners_base.png` et motifs `rhombus`, `stripe_bottom`, `stripe_center`, `border`, `stripe_middle`, `half_horizontal`, `circle`), recolorés et superposés pour ce projet dans l'ordre des motifs de la bannière sinistre du jeu original | CC BY-SA 4.0 |
| Planche `ENT_SHEET3` intégrée au jeu (version 3.0) : ravageur | Texture originale peinte pour ce projet, sur le gabarit d’UV du modèle de ravageur | CC BY-SA 4.0 (comme les autres textures de créatures) |

### Pixel Perfection CE : modifications apportées

Conformément à la licence CC BY-SA 4.0, voici ce qui a été changé :
- 464 textures 16×16 réunies dans une seule planche (`textures/pixel_perfection_sheet.png`) : objets, blocs, fissures, particules et images des animations ;
- armures en cuir teintées avec la couleur de cuir par défaut (#A06540) puis superposées à leur calque `_overlay` ;
- icône du lit recolorée du bleu au rouge pour correspondre au lit du jeu ;
- textures teintées par le biome (dessus et côté de l'herbe, feuilles de chêne, herbes hautes, fougère, orbes d'expérience) : transparence fixée à 250/255 pour que le jeu y applique la couleur du biome ; côté de l'herbe fusionné avec son calque `_overlay` ;
- eau : convertie en niveaux de gris normalisés (transparence 184/255), recolorée par le jeu selon le biome ;
- particules d'explosion converties en niveaux de gris ;
- coffre : faces 16×16 recomposées à partir de `entity/chest/normal.png` ;
- soleil et phases de lune réduits à 64×64 pixels et réunis dans `textures/pixel_perfection_sky.png` ;
- créatures : textures réunies dans un atlas 512×512 ; laine du mouton et collier du loup convertis en niveaux de gris normalisés (teintés par le jeu) ;
- villageois : 35 textures composées (base `villager/villager.png` + tenue du biome `villager/type/…` + métier `villager/profession/…`, en masquant la tête du calque du biome selon les métadonnées `hat`, comme le jeu original) ;
- prêtre (absent du pack) : tenue du métier `nitwit` recolorée du vert au violet ;
- version 2.0 : icône de l'œuf du dragon (silhouette d'œuf remplie avec `block/dragon_egg`, légèrement ombrée) et icône de la barre de l'End (tige en diagonale recomposée à partir de `block/end_rod`).

Cette planche adaptée reste distribuée sous **CC BY-SA 4.0**. Le pack ne contient
pas de textures de Mojang pour ces fichiers (le projet tient une liste des
textures problématiques ; aucune de celles utilisées ici n'y figure).

### Fichiers d'origine utilisés (`assets/minecraft/textures/…`)

- **Blocs** : voir le tableau ci-dessous, plus `block/grass_block_top`, `grass_block_side` (+ `_overlay`), `oak_leaves`, `grass`, `fern`, les 16 laines `block/<couleur>_wool`, `block/destroy_stage_0…9`, `block/water_still`, `block/lava_still`, `block/nether_portal` (toutes les images de l'animation) ;
- **Particules** : `particle/flame`, `heart`, `critical_hit`, `bubble`, `generic_0…7`, `lava`, `angry`, `glint`, `damage`, `note`, `drip_fall`, `sweep_0…7`, `explosion_0…15`, `bubble_pop_0…4`, `splash_0…3` ; `entity/experience_orb` ;
- **Créatures** : `entity/steve`, `zombie/zombie`, `skeleton/skeleton`, `creeper/creeper`, `pig/pig`, `cow/cow`, `sheep/sheep`, `sheep/sheep_fur`, `chicken`, `spider/spider`, `spider_eyes`, `blaze`, `wolf/wolf`, `wolf/wolf_tame`, `wolf/wolf_angry`, `wolf/wolf_collar`, `villager/villager`, `villager/type/*` (7 biomes), `villager/profession/farmer`, `librarian`, `armorer`, `butcher`, `nitwit`, `entity/chest/normal` ;
- **Ciel** : `environment/sun`, `environment/moon_phases`.
- **Version 2.0** : `block/end_stone`, `end_stone_bricks`, `purpur_block`, `purpur_pillar`, `purpur_pillar_top`, `end_portal_frame_top`, `end_portal_frame_side`, `end_portal_frame_eye`, `end_rod`, `dragon_egg`, `iron_bars` ; `item/ender_eye`, `end_crystal`, `elytra`, `firework_rocket`, `fishing_rod`, `fishing_rod_cast`, `cod`, `salmon`, `tropical_fish`, `pufferfish`, `cooked_cod`, `cooked_salmon`, `ink_sac`.
- **Version 2.1** : `block/enchanting_table_top`, `enchanting_table_side`, `enchanting_table_bottom`, `anvil`, `anvil_top`, `chipped_anvil_top`, `damaged_anvil_top`, `grindstone_side`, `grindstone_round`, `grindstone_pivot`, `frosted_ice_0…3`, `tripwire_hook` ; `item/enchanted_book`, `experience_bottle`, `crossbow_standby`, `crossbow_pulling_0…2`, `crossbow_arrow`, `crossbow_firework`, `trident` ; `particle/enchanted_hit`.

Les créatures et objets ajoutés en 2.0 sans texture du pack (Enderman, Ender Dragon, cristal de l'End, élytres portées, calmars, poissons,
poisson-globe, chauve-souris, étiquette, coquille de nautile, poche d'encre luisante, flotteur, étincelles) sont dessinés pixel par pixel
par le code du jeu : ce sont des créations originales de ce projet. De même pour ceux de la 2.1 : masse, lances, noyé, livre animé
de la table d'enchantement, écriture mystérieuse de la table et reflet violet des objets enchantés.

Les modèles 3D des créatures (taille et position des boîtes, coordonnées de texture,
animations) sont écrits dans le code du jeu pour correspondre à ces textures.

| Bloc dans le jeu | Fichier Pixel Perfection CE |
|---|---|
| `dirt` | `block/dirt.png` |
| `coarse_dirt` | `block/coarse_dirt.png` |
| `podzol_top` | `block/podzol_top.png` |
| `podzol_side` | `block/podzol_side.png` |
| `stone` | `block/stone.png` |
| `smooth_stone` | `block/smooth_stone.png` |
| `cobblestone` | `block/cobblestone.png` |
| `mossy_cobblestone` | `block/mossy_cobblestone.png` |
| `mossy_stone` | `block/mossy_cobblestone.png` |
| `sand` | `block/sand.png` |
| `gravel` | `block/gravel.png` |
| `clay` | `block/clay.png` |
| `sandstone_top` | `block/sandstone_top.png` |
| `sandstone_bottom` | `block/sandstone_bottom.png` |
| `sandstone_side` | `block/sandstone.png` |
| `bedrock` | `block/bedrock.png` |
| `granite` | `block/granite.png` |
| `diorite` | `block/diorite.png` |
| `andesite` | `block/andesite.png` |
| `polished_granite` | `block/polished_granite.png` |
| `polished_diorite` | `block/polished_diorite.png` |
| `polished_andesite` | `block/polished_andesite.png` |
| `stone_bricks` | `block/stone_bricks.png` |
| `mossy_stone_bricks` | `block/mossy_stone_bricks.png` |
| `cracked_stone_bricks` | `block/cracked_stone_bricks.png` |
| `chiseled_stone_bricks` | `block/chiseled_stone_bricks.png` |
| `bricks` | `block/bricks.png` |
| `oak_planks` | `block/oak_planks.png` |
| `birch_planks` | `block/birch_planks.png` |
| `spruce_planks` | `block/spruce_planks.png` |
| `oak_log` | `block/oak_log.png` |
| `oak_log_top` | `block/oak_log_top.png` |
| `birch_log` | `block/birch_log.png` |
| `birch_log_top` | `block/birch_log_top.png` |
| `spruce_log` | `block/spruce_log.png` |
| `spruce_log_top` | `block/spruce_log_top.png` |
| `birch_leaves` | `block/birch_leaves.png` |
| `spruce_leaves` | `block/spruce_leaves.png` |
| `ice` | `block/ice.png` |
| `packed_ice` | `block/packed_ice.png` |
| `snow` | `block/snow.png` |
| `glass` | `block/glass.png` |
| `coal_ore` | `block/coal_ore.png` |
| `iron_ore` | `block/iron_ore.png` |
| `gold_ore` | `block/gold_ore.png` |
| `diamond_ore` | `block/diamond_ore.png` |
| `redstone_ore` | `block/redstone_ore.png` |
| `lapis_ore` | `block/lapis_ore.png` |
| `emerald_ore` | `block/emerald_ore.png` |
| `gold_block` | `block/gold_block.png` |
| `iron_block` | `block/iron_block.png` |
| `diamond_block` | `block/diamond_block.png` |
| `emerald_block` | `block/emerald_block.png` |
| `lapis_block` | `block/lapis_block.png` |
| `redstone_block` | `block/redstone_block.png` |
| `coal_block` | `block/coal_block.png` |
| `tnt_side` | `block/tnt_side.png` |
| `tnt_top` | `block/tnt_top.png` |
| `tnt_bottom` | `block/tnt_bottom.png` |
| `bookshelf` | `block/bookshelf.png` |
| `obsidian` | `block/obsidian.png` |
| `netherrack` | `block/netherrack.png` |
| `glowstone` | `block/glowstone.png` |
| `sponge` | `block/sponge.png` |
| `hay_top` | `block/hay_block_top.png` |
| `hay_side` | `block/hay_block_side.png` |
| `crafting_table_top` | `block/crafting_table_top.png` |
| `crafting_table_side` | `block/crafting_table_side.png` |
| `crafting_table_front` | `block/crafting_table_front.png` |
| `furnace_top` | `block/furnace_top.png` |
| `furnace_side` | `block/furnace_side.png` |
| `furnace_front` | `block/furnace_front.png` |
| `furnace_front_on` | `block/furnace_front_on.png` |
| `farmland_dry` | `block/farmland.png` |
| `farmland_wet` | `block/farmland_moist.png` |
| `door_top` | `block/oak_door_top.png` |
| `door_bottom` | `block/oak_door_bottom.png` |
| `cactus_side` | `block/cactus_side.png` |
| `cactus_top` | `block/cactus_top.png` |
| `cactus_bottom` | `block/cactus_bottom.png` |
| `pumpkin_side` | `block/pumpkin_side.png` |
| `pumpkin_top` | `block/pumpkin_top.png` |
| `pumpkin_face` | `block/carved_pumpkin.png` |
| `jack_face` | `block/jack_o_lantern.png` |
| `melon_side` | `block/melon_side.png` |
| `melon_top` | `block/melon_top.png` |
| `nether_quartz_ore` | `block/nether_quartz_ore.png` |
| `soul_sand` | `block/soul_sand.png` |
| `nether_bricks` | `block/nether_bricks.png` |
| `quartz_block` | `block/quartz_block_side.png` |
| `blaze_spawner` | `block/spawner.png` |
| `sugar_cane` | `block/sugar_cane.png` |

Correspondance objet dans le jeu → fichier d'origine (`assets/minecraft/textures/…`) :

| Nom dans le jeu | Fichier Pixel Perfection CE |
|---|---|
| `stick` | `item/stick.png` |
| `coal` | `item/coal.png` |
| `charcoal` | `item/charcoal.png` |
| `iron_ingot` | `item/iron_ingot.png` |
| `gold_ingot` | `item/gold_ingot.png` |
| `diamond` | `item/diamond.png` |
| `emerald` | `item/emerald.png` |
| `redstone` | `item/redstone.png` |
| `lapis_lazuli` | `item/lapis_lazuli.png` |
| `flint` | `item/flint.png` |
| `string` | `item/string.png` |
| `feather` | `item/feather.png` |
| `leather` | `item/leather.png` |
| `bone` | `item/bone.png` |
| `bone_meal` | `item/bone_meal.png` |
| `gunpowder` | `item/gunpowder.png` |
| `rotten_flesh` | `item/rotten_flesh.png` |
| `spider_eye` | `item/spider_eye.png` |
| `arrow` | `item/arrow.png` |
| `bow` | `item/bow.png` |
| `wheat_seeds` | `item/wheat_seeds.png` |
| `wheat` | `item/wheat.png` |
| `bread` | `item/bread.png` |
| `apple` | `item/apple.png` |
| `golden_apple` | `item/golden_apple.png` |
| `porkchop` | `item/porkchop.png` |
| `cooked_porkchop` | `item/cooked_porkchop.png` |
| `beef` | `item/beef.png` |
| `cooked_beef` | `item/cooked_beef.png` |
| `chicken` | `item/chicken.png` |
| `cooked_chicken` | `item/cooked_chicken.png` |
| `mutton` | `item/mutton.png` |
| `cooked_mutton` | `item/cooked_mutton.png` |
| `egg` | `item/egg.png` |
| `carrot` | `item/carrot.png` |
| `potato` | `item/potato.png` |
| `baked_potato` | `item/baked_potato.png` |
| `melon_slice` | `item/melon_slice.png` |
| `pumpkin_seeds` | `item/pumpkin_seeds.png` |
| `sugar` | `item/sugar.png` |
| `paper` | `item/paper.png` |
| `book` | `item/book.png` |
| `bucket` | `item/bucket.png` |
| `water_bucket` | `item/water_bucket.png` |
| `lava_bucket` | `item/lava_bucket.png` |
| `milk_bucket` | `item/milk_bucket.png` |
| `shears` | `item/shears.png` |
| `flint_and_steel` | `item/flint_and_steel.png` |
| `clock` | `item/clock_00.png` |
| `compass` | `item/compass_16.png` |
| `snowball` | `item/snowball.png` |
| `clay_ball` | `item/clay_ball.png` |
| `brick` | `item/brick.png` |
| `glowstone_dust` | `item/glowstone_dust.png` |
| `cookie` | `item/cookie.png` |
| `pumpkin_pie` | `item/pumpkin_pie.png` |
| `red_dye` | `item/red_dye.png` |
| `yellow_dye` | `item/yellow_dye.png` |
| `blue_dye` | `item/blue_dye.png` |
| `green_dye` | `item/green_dye.png` |
| `black_dye` | `item/black_dye.png` |
| `white_dye` | `item/white_dye.png` |
| `orange_dye` | `item/orange_dye.png` |
| `purple_dye` | `item/purple_dye.png` |
| `pink_dye` | `item/pink_dye.png` |
| `lime_dye` | `item/lime_dye.png` |
| `light_blue_dye` | `item/light_blue_dye.png` |
| `cyan_dye` | `item/cyan_dye.png` |
| `gray_dye` | `item/gray_dye.png` |
| `light_gray_dye` | `item/light_gray_dye.png` |
| `magenta_dye` | `item/magenta_dye.png` |
| `brown_dye` | `item/brown_dye.png` |
| `cocoa_beans` | `item/cocoa_beans.png` |
| `ender_pearl` | `item/ender_pearl.png` |
| `nether_brick` | `item/nether_brick.png` |
| `quartz` | `item/quartz.png` |
| `blaze_rod` | `item/blaze_rod.png` |
| `blaze_powder` | `item/blaze_powder.png` |
| `wooden_sword` | `item/wooden_sword.png` |
| `wooden_pickaxe` | `item/wooden_pickaxe.png` |
| `wooden_axe` | `item/wooden_axe.png` |
| `wooden_shovel` | `item/wooden_shovel.png` |
| `wooden_hoe` | `item/wooden_hoe.png` |
| `stone_sword` | `item/stone_sword.png` |
| `stone_pickaxe` | `item/stone_pickaxe.png` |
| `stone_axe` | `item/stone_axe.png` |
| `stone_shovel` | `item/stone_shovel.png` |
| `stone_hoe` | `item/stone_hoe.png` |
| `iron_sword` | `item/iron_sword.png` |
| `iron_pickaxe` | `item/iron_pickaxe.png` |
| `iron_axe` | `item/iron_axe.png` |
| `iron_shovel` | `item/iron_shovel.png` |
| `iron_hoe` | `item/iron_hoe.png` |
| `golden_sword` | `item/golden_sword.png` |
| `golden_pickaxe` | `item/golden_pickaxe.png` |
| `golden_axe` | `item/golden_axe.png` |
| `golden_shovel` | `item/golden_shovel.png` |
| `golden_hoe` | `item/golden_hoe.png` |
| `diamond_sword` | `item/diamond_sword.png` |
| `diamond_pickaxe` | `item/diamond_pickaxe.png` |
| `diamond_axe` | `item/diamond_axe.png` |
| `diamond_shovel` | `item/diamond_shovel.png` |
| `diamond_hoe` | `item/diamond_hoe.png` |
| `leather_helmet` | `item/leather_helmet.png` |
| `leather_chestplate` | `item/leather_chestplate.png` |
| `leather_leggings` | `item/leather_leggings.png` |
| `leather_boots` | `item/leather_boots.png` |
| `iron_helmet` | `item/iron_helmet.png` |
| `iron_chestplate` | `item/iron_chestplate.png` |
| `iron_leggings` | `item/iron_leggings.png` |
| `iron_boots` | `item/iron_boots.png` |
| `golden_helmet` | `item/golden_helmet.png` |
| `golden_chestplate` | `item/golden_chestplate.png` |
| `golden_leggings` | `item/golden_leggings.png` |
| `golden_boots` | `item/golden_boots.png` |
| `diamond_helmet` | `item/diamond_helmet.png` |
| `diamond_chestplate` | `item/diamond_chestplate.png` |
| `diamond_leggings` | `item/diamond_leggings.png` |
| `diamond_boots` | `item/diamond_boots.png` |
| `bow_pulling_0` | `item/bow_pulling_0.png` |
| `bow_pulling_1` | `item/bow_pulling_1.png` |
| `bow_pulling_2` | `item/bow_pulling_2.png` |
| `door_icon` | `item/oak_door.png` |
| `lantern_icon` | `item/lantern.png` |
| `sugar_cane_icon` | `item/sugar_cane.png` |
| `bed_icon` | `item/bed.png` |
| `oak_sapling` | `block/oak_sapling.png` |
| `birch_sapling` | `block/birch_sapling.png` |
| `spruce_sapling` | `block/spruce_sapling.png` |
| `dandelion` | `block/dandelion.png` |
| `poppy` | `block/poppy.png` |
| `blue_orchid` | `block/blue_orchid.png` |
| `oxeye_daisy` | `block/oxeye_daisy.png` |
| `brown_mushroom` | `block/brown_mushroom.png` |
| `red_mushroom` | `block/red_mushroom.png` |
| `dead_bush` | `block/dead_bush.png` |
| `cobweb` | `block/cobweb.png` |
| `torch` | `block/torch.png` |
| `ladder` | `block/ladder.png` |
| `wheat_0` | `block/wheat_stage0.png` |
| `wheat_1` | `block/wheat_stage1.png` |
| `wheat_2` | `block/wheat_stage2.png` |
| `wheat_3` | `block/wheat_stage3.png` |
| `wheat_4` | `block/wheat_stage4.png` |
| `wheat_5` | `block/wheat_stage5.png` |
| `wheat_6` | `block/wheat_stage6.png` |
| `wheat_7` | `block/wheat_stage7.png` |
| `carrots_0` | `block/carrots_stage0.png` |
| `potatoes_0` | `block/potatoes_stage0.png` |
| `carrots_1` | `block/carrots_stage1.png` |
| `potatoes_1` | `block/potatoes_stage1.png` |
| `carrots_2` | `block/carrots_stage2.png` |
| `potatoes_2` | `block/potatoes_stage2.png` |
| `carrots_3` | `block/carrots_stage3.png` |
| `potatoes_3` | `block/potatoes_stage3.png` |

Les fichiers audio ont été convertis en MP3 mono avec ffmpeg (volume normalisé, silence de début coupé,
sons longs raccourcis avec un fondu) ; ces modifications sont signalées dans `sounds/CREDITS.md`.
Aucune ressource de Mojang ou de Minecraft n'est utilisée : les textures viennent de
Pixel Perfection CE (ou sont dessinées par le code du jeu), les sons viennent des jeux libres cités
ci-dessus ou sont générés par le code ; la musique « vibe » a été créée par le
propriétaire du projet.

Crédit facultatif mais apprécié : Kenney (www.kenney.nl).
