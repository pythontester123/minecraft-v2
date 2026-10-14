// Serveur « Ouvrir en réseau local » intégré à l'application (même protocole que server.js).
// Le monde reste dans le jeu de l'hôte : ce serveur ne fait que relayer les messages entre
// l'hôte et ses invités, et il sert aussi le jeu aux amis qui jouent depuis un navigateur.
const http = require('http');
const fs = require('fs');
const os = require('os');
const WebSocket = require('ws');

let server = null, wss = null, current = null;
const v2 = { host: null, guests: new Map(), nextId: 1 };

// Adresses IPv4 du PC sur le réseau local, les plus probables d'abord
// (on écarte les cartes virtuelles : VirtualBox, VMware, Hyper-V/WSL, Docker…).
function localIps() {
  const out = [];
  for (const [name, list] of Object.entries(os.networkInterfaces())) {
    for (const i of list || []) {
      if (i.family !== 'IPv4' && i.family !== 4) continue;
      if (i.internal || i.address.startsWith('169.254.')) continue;
      const virt = /virtual|vmware|vbox|hyper-v|vethernet|wsl|docker|loopback|tap|tun|zerotier|hamachi|tailscale|br-|veth/i.test(name);
      const a = i.address;
      const rank = (virt ? 10 : 0) + (a.startsWith('192.168.') ? 0 : a.startsWith('10.') ? 1 : /^172\.(1[6-9]|2\d|3[01])\./.test(a) ? 2 : 3);
      out.push({ a, rank });
    }
  }
  return out.sort((x, y) => x.rank - y.rank).map(x => x.a);
}

function send(ws, obj) { if (ws && ws.readyState === WebSocket.OPEN) ws.send(typeof obj === 'string' ? obj : JSON.stringify(obj)); }

function onConnection(ws) {
  const id = v2.nextId++;
  ws.role = null; ws.name = '';
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (!m || typeof m !== 'object') return;
    if (!ws.role) {
      if (m.t !== 'hello') return;
      ws.name = String(m.name || '').replace(/[<>&"]/g, '').slice(0, 16) || ('Joueur' + id);
      if (m.role === 'host') {
        if (v2.host && v2.host.readyState === WebSocket.OPEN) { send(ws, { t: 'error', e: 'busy' }); ws.close(); return; }
        v2.host = ws; ws.role = 'host';
        const ips = localIps();
        send(ws, { t: 'welcome', id, role: 'host', ip: ips[0] || 'localhost', ips, port: current.port });
      } else {
        if (!v2.host || v2.host.readyState !== WebSocket.OPEN) { send(ws, { t: 'error', e: 'nohost' }); ws.close(); return; }
        if (v2.guests.size >= 7) { send(ws, { t: 'error', e: 'full' }); ws.close(); return; }
        ws.role = 'guest'; v2.guests.set(id, ws);
        send(ws, { t: 'welcome', id, role: 'guest', host: v2.host.name });
        send(v2.host, { t: 'join', id, name: ws.name });
      }
      return;
    }
    if (ws.role === 'host') {
      const to = m.to; delete m.to; const data = JSON.stringify(m);
      if (to === undefined || to === '*') v2.guests.forEach(g => send(g, data)); else send(v2.guests.get(to), data);
    } else {
      m.from = id; const data = JSON.stringify(m);
      send(v2.host, data);
      if (m.t === 'p' || m.t === 'chat') v2.guests.forEach((g, gid) => { if (gid !== id) send(g, data); });
    }
  });
  ws.on('close', () => {
    if (ws.role === 'host' && v2.host === ws) {
      v2.host = null;
      v2.guests.forEach(g => { send(g, { t: 'hostLeft' }); g.close(); }); v2.guests.clear();
    } else if (ws.role === 'guest') {
      v2.guests.delete(id); send(v2.host, { t: 'leave', id });
      v2.guests.forEach(g => send(g, { t: 'leave', id }));
    }
  });
  ws.on('error', () => {});
}

// Démarre le serveur sur le port demandé (3000 par défaut). Renvoie { ok, port, ips } ou { ok:false, error }.
function start(port, gameFile, iconFile) {
  port = (port | 0) || 3000;
  if (server && current && current.port === port) return Promise.resolve({ ok: true, port, ips: localIps() });
  stop();
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      const url = (req.url || '/').split('?')[0];
      if (url === '/' || url === '/v2' || url === '/v2/' || url === '/index.html' || url === '/minecraft-v2.html') {
        fs.readFile(gameFile, (err, data) => {
          if (err) { res.writeHead(500); res.end('Jeu introuvable'); return; }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }); res.end(data);
        });
      } else if (url === '/favicon.ico' && iconFile) {
        fs.readFile(iconFile, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': 'image/png' }); res.end(data); });
      } else { res.writeHead(404); res.end('Introuvable'); }
    });
    const ws = new WebSocket.Server({ noServer: true, maxPayload: 256 * 1024 * 1024 });
    srv.on('upgrade', (req, socket, head) => {
      if (!(req.url || '').startsWith('/v2')) { socket.destroy(); return; }
      ws.handleUpgrade(req, socket, head, c => onConnection(c));
    });
    srv.once('error', err => { try { srv.close(); } catch (e) {} resolve({ ok: false, error: err.code || String(err) }); });
    srv.listen(port, '0.0.0.0', () => { server = srv; wss = ws; current = { port }; resolve({ ok: true, port, ips: localIps() }); });
  });
}

function stop() {
  if (wss) { for (const c of wss.clients) { try { c.terminate(); } catch (e) {} } try { wss.close(); } catch (e) {} }
  if (server) { try { server.close(); } catch (e) {} }
  server = null; wss = null; current = null; v2.host = null; v2.guests.clear();
  return true;
}

module.exports = { start, stop, localIps };
