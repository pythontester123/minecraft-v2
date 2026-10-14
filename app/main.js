// Minecraft V2 — application de bureau (Electron).
// Ouvre le jeu dans sa propre fenêtre (plein écran par défaut), sans navigateur,
// et embarque le serveur « Ouvrir en réseau local » (plus besoin de node server.js).
const { app, BrowserWindow, Menu, ipcMain, protocol, shell, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const lan = require('./lan');

const GAME_DIR = path.join(__dirname, 'game');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon', '.md': 'text/plain; charset=utf-8' };

// Ordinateurs portables avec deux cartes graphiques : utiliser la plus puissante.
app.commandLine.appendSwitch('force_high_performance_gpu');
// Les sauvegardes (IndexedDB) sont liées à cette adresse : elle ne doit jamais changer.
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }]);

let win = null, quitting = false;
const statePath = () => path.join(app.getPath('userData'), 'fenetre.json');
function loadState() { try { return JSON.parse(fs.readFileSync(statePath(), 'utf8')); } catch (e) { return { fullscreen: true }; } }
function saveState() {
  if (!win || win.isDestroyed()) return;
  try { fs.writeFileSync(statePath(), JSON.stringify({ fullscreen: win.isFullScreen(), maximized: win.isMaximized(), bounds: win.getNormalBounds() })); } catch (e) {}
}
function visible(b) { return b && screen.getAllDisplays().some(d => { const a = d.workArea; return b.x < a.x + a.width - 50 && b.x + b.width > a.x + 50 && b.y >= a.y - 10 && b.y < a.y + a.height - 50; }); }

function createWindow() {
  const st = loadState();
  const area = screen.getPrimaryDisplay().workAreaSize;
  const def = { width: Math.min(1600, Math.round(area.width * 0.85)), height: Math.min(900, Math.round(area.height * 0.85)) };
  const b = visible(st.bounds) ? st.bounds : def;
  win = new BrowserWindow({
    ...b, minWidth: 800, minHeight: 480, show: false, backgroundColor: '#000000', title: 'Minecraft V2',
    icon: path.join(__dirname, 'icon.png'), autoHideMenuBar: true, fullscreen: st.fullscreen !== false,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true, backgroundThrottling: false, spellcheck: false },
  });
  if (st.maximized && !st.fullscreen) win.maximize();
  win.once('ready-to-show', () => win.show());
  win.loadURL('app://minecraft/index.html');

  // Liens externes : navigateur du système. Aucune autre navigation.
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('app://minecraft/')) e.preventDefault(); });
  // F11 ou Alt+Entrée : plein écran ; Ctrl+Maj+I : outils de développement (dépannage).
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11' || (input.alt && input.key === 'Enter')) { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
    else if (input.control && input.shift && (input.key === 'I' || input.key === 'i')) { win.webContents.toggleDevTools(); e.preventDefault(); }
  });
  // Export d'un monde : fenêtre « Enregistrer sous » en français, dans Documents par défaut.
  win.webContents.session.on('will-download', (e, item) => {
    item.setSaveDialogOptions({ title: 'Exporter le monde', defaultPath: path.join(app.getPath('documents'), item.getFilename()), filters: [{ name: 'Monde Minecraft V2', extensions: ['mcv2'] }] });
  });
  win.webContents.on('zoom-changed', () => win.webContents.setZoomLevel(0)); // pas de zoom avec Ctrl+molette
  win.webContents.on('render-process-gone', (e, d) => { if (d.reason !== 'clean-exit' && !quitting) setTimeout(() => { if (win && !win.isDestroyed()) win.reload(); }, 500); });
  // Fermeture (croix, Alt+F4) : le jeu sauvegarde le monde, puis l'application se ferme.
  win.on('close', e => {
    saveState();
    if (quitting) return;
    e.preventDefault(); quitting = true;
    win.webContents.send('app:close-request');
    setTimeout(() => { if (win && !win.isDestroyed()) win.destroy(); }, 5000);
  });
  win.on('closed', () => { win = null; });
}

// Une seule fenêtre du jeu à la fois (un double-clic de plus ramène la fenêtre existante).
if (!app.requestSingleInstanceLock()) app.quit();
else {
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  protocol.handle('app', async req => {
    const u = new URL(req.url);
    let p = decodeURIComponent(u.pathname); if (p === '/' || p === '') p = '/index.html';
    const file = path.normalize(path.join(GAME_DIR, p));
    if (!file.startsWith(GAME_DIR + path.sep)) return new Response('Introuvable', { status: 404 });
    try { const data = await fs.promises.readFile(file); return new Response(data, { headers: { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' } }); }
    catch (e) { return new Response('Introuvable', { status: 404 }); }
  });
  ipcMain.handle('app:quit', () => { quitting = true; if (win && !win.isDestroyed()) win.destroy(); });
  ipcMain.handle('app:fullscreen', (e, on) => { if (!win) return false; if (typeof on === 'boolean') win.setFullScreen(on); return win.isFullScreen(); });
  ipcMain.handle('app:info', () => ({ version: app.getVersion(), platform: process.platform }));
  ipcMain.handle('lan:start', (e, port) => lan.start(port, path.join(GAME_DIR, 'index.html'), path.join(__dirname, 'icon.png')));
  ipcMain.handle('lan:stop', () => lan.stop());
  createWindow();
});

app.on('window-all-closed', () => { lan.stop(); app.quit(); });
}
