const electron = require('electron');
// Used to spawn processes
const child_process = require('child_process');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
// Do the same for the backend web server
let backendServer;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function createBackendServer () {
  backendServer = child_process.spawn('./static-resources/backend-exe');
}

app.on('ready', createWindow);

// Start the backend web server when Electron has finished initializing
app.on('ready', createBackendServer);

// Close the server when the application is shut down
app.on('will-quit', function() {
  backendServer.kill();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
