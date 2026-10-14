// Minecraft V2 : serveur « Ouvrir en réseau local » pour jouer dans le navigateur, sans l'application.
// Utilisation : npm install (la première fois), puis node server.js
// C'est le même serveur que celui intégré à l'application (app/lan.js) : il sert le jeu aux amis
// et relaie les messages entre l'hôte et ses invités. Le monde reste dans le jeu de l'hôte.
const path = require('path');
const lan = require('./app/lan');

const PORT = Number(process.env.PORT) || 3000;
lan.start(PORT, path.join(__dirname, 'minecraft-v2.html'), path.join(__dirname, 'app', 'build', 'icon.png')).then(r => {
  if (!r.ok) { console.error(`Impossible d'ouvrir le port ${PORT} (${r.error}) : le serveur est peut-être déjà lancé.`); process.exit(1); }
  console.log('\n  Minecraft V2 : serveur réseau local');
  console.log(`  Sur ce PC        ➜  http://localhost:${r.port}`);
  console.log(`  Pour les amis    ➜  http://${r.ips[0] || '<adresse de ce PC>'}:${r.port}`);
  console.log('  (Ctrl+C pour arrêter)\n');
});
