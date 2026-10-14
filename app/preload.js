// Pont entre le jeu (page web isolée) et l'application : rien d'autre n'est exposé.
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('mcApp', {
  isApp: true,
  info: () => ipcRenderer.invoke('app:info'),
  quit: () => ipcRenderer.invoke('app:quit'),
  fullscreen: on => ipcRenderer.invoke('app:fullscreen', on),
  startLan: port => ipcRenderer.invoke('lan:start', port),
  stopLan: () => ipcRenderer.invoke('lan:stop'),
  onCloseRequest: cb => { ipcRenderer.on('app:close-request', () => cb()); },
});
