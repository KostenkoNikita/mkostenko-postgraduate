import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import * as path from 'path';
import * as url from 'url';
import { Core } from "@mkostenko/core";
import { FACTORIAL_API_ITEM } from "../shared";
import {Nullable} from "@mkostenko/core";

let mainWindow: Nullable<Electron.BrowserWindow>;

function createWindow() {
   mainWindow = new BrowserWindow({
      width: 1200,
      height: 900,
      webPreferences: {
         nodeIntegration: true,
         preload: path.join(__dirname, 'preload.js'),
      },
   });
   
   ipcMain.on(FACTORIAL_API_ITEM.channel, (event: IpcMainEvent, arg: number) => {
      const result = Core.math.common.factorial(arg);
      
      event.reply(FACTORIAL_API_ITEM.channelReply, result);
   });
   
   if (process.env.NODE_ENV === 'development') {
      mainWindow.loadURL(`http://localhost:3000`);

      mainWindow.webContents.openDevTools({ mode: "detach" });
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
