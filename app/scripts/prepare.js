// Copie le jeu (../minecraft-v2.html), les licences et l'icône dans l'application avant l'empaquetage.
const fs = require('fs');
const path = require('path');
const APP = path.join(__dirname, '..');
const ROOT = path.join(APP, '..');
fs.mkdirSync(path.join(APP, 'game'), { recursive: true });
fs.copyFileSync(path.join(ROOT, 'minecraft-v2.html'), path.join(APP, 'game', 'index.html'));
fs.copyFileSync(path.join(ROOT, 'assets', 'LICENSES.md'), path.join(APP, 'game', 'LICENSES.md'));
fs.copyFileSync(path.join(ROOT, 'assets', 'sounds', 'CREDITS.md'), path.join(APP, 'game', 'CREDITS-SONS.md'));
fs.copyFileSync(path.join(APP, 'build', 'icon.png'), path.join(APP, 'icon.png'));
console.log('Jeu copié dans app/game/ (' + Math.round(fs.statSync(path.join(APP, 'game', 'index.html')).size / 1024) + ' Ko)');
