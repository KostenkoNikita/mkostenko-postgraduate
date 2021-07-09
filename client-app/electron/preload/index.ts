import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

import { ICoreResult } from "@mkostenko/core";

import { ELECTRON_API_KEY, FACTORIAL_API_ITEM } from "../shared";

contextBridge.exposeInMainWorld(
   ELECTRON_API_KEY,
   {
      [FACTORIAL_API_ITEM.method]: (arg: number, callback: (res: ICoreResult<number, Error>) => any) => {
         ipcRenderer.on(FACTORIAL_API_ITEM.channelReply, (event: IpcRendererEvent, arg: ICoreResult<number, Error>) => {
            callback(arg);
         });
         ipcRenderer.send(FACTORIAL_API_ITEM.channel, arg);
      },
   }
)
