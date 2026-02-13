const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');
const loadURL = serve({ directory: 'dist' });

function createWindow() {
    const win = new BrowserWindow({
        width: 450, height: 800,
        webPreferences: { nodeIntegration: true },
        autoHideMenuBar: true,
        title: "Anchor"
    });
    loadURL(win);
}
app.whenReady().then(createWindow);
