const { app, BrowserWindow } = require('electron');
const path = require('path');

let ppapi_flash_path;
let mainWindow;

if(process.platform  == 'win32'){
    ppapi_flash_path = path.join(__dirname, 'pepflashplayer.dll');
} else if (process.platform == 'linux') {
    ppapi_flash_path = path.join(__dirname, 'libpepflashplayer.so');
} else if (process.platform == 'darwin') {
    ppapi_flash_path = path.join(__dirname, 'PepperFlashPlayer.plugin');
}

console.log(ppapi_flash_path);

app.commandLine.appendSwitch('ppapi-flash-path', ppapi_flash_path);
app.commandLine.appendSwitch('ppapi-flash-version', '32.0.0.453');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            plugins: true,
            nodeIntegration: true,
            javascript: true
        }, 
    });

    mainWindow.removeMenu();
	
    mainWindow.loadURL('https://naruto.oasgames.com/en/');
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});