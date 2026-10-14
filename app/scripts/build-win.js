// Fabrique l'installateur Windows « Minecraft-V2-Installation-x.y.z.exe » (dossier dist/).
// Sous Windows, electron-builder fait tout seul. Depuis Linux ou macOS, le désinstalleur NSIS est
// extrait du programme d'installation sans le lancer (méthode qu'electron-builder utilise déjà sur
// macOS), ce qui évite d'avoir besoin de Wine.
if (process.platform !== 'win32') require('app-builder-lib/out/util/macosVersion').isMacOsCatalina = () => true;
const { build, Platform, Arch } = require('electron-builder');
require('./prepare');
build({ targets: Platform.WINDOWS.createTarget(process.argv.includes('--dir') ? 'dir' : 'nsis', Arch.x64), publish: 'never' })
  .then(files => { console.log('\nFichiers produits :'); for (const f of files) console.log('  ' + f); })
  .catch(err => { console.error(err); process.exit(1); });
