import { app, BrowserWindow, ipcMain } from "electron";
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
   
   console.log(`\n\n\n${path.join(__dirname, 'preload.js')}\n\n\n`);
   
   mainWindow = new BrowserWindow({
      width: 1200,
      height: 600,
      webPreferences: {
         nodeIntegration: true,
         preload: path.join(__dirname, 'preload.js'),
      },
   });
   
   ipcMain.on("do-a-thing", () => {
      console.log("do-a-thing");
   });
   
   if (process.env.NODE_ENV === 'development') {
      mainWindow.loadURL(`http://localhost:3000`);
   } else {
      mainWindow.loadURL(
         url.format({
            pathname: path.join(__dirname, '../build/view/index.html'),
            protocol: 'file:',
            slashes: true
         })
      );
   }
   
   mainWindow.on('closed', () => {
      mainWindow = null;
   });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.allowRendererProcessReuse = true;
