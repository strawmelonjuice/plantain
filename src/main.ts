import { app, BrowserWindow, ipcMain, shell, dialog } from "electron";
import path from 'path';
import { KiviBananen } from 'kivi-bananen';
import { Logger, ILogObj } from "tslog";
import os from 'os';
import {spawn} from 'child_process';
export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: BrowserWindow;
  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }
  private parseBool(bool: string | boolean | number) {
  if (bool === "true" || bool === "1" || bool === true) return true;
  else return false
}
  private static onClose() {
    Main.mainWindow.destroy;
  }

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({
      width: 400,
      height: 550,
      minWidth: 400,
      minHeight: 550,
      // icon: path.join(__dirname, "/assets/icons/app-512x512.png"),
      frame: false,
      transparent: true,
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "./preload.js"),
      },
    });
    Main.mainWindow
      // .loadFile(path.join(__dirname, '../index.html'));
     .loadURL(`http://localhost:${Main.UIport}/main`);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow, kivi: typeof KiviBananen, logger: Logger<ILogObj>, port: number) {
    let kiviinstance: KiviBananen;
    logger.info("Starting Kivi instance!")
    kiviinstance = new kivi(process.cwd());
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.UIport = port;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);


    ipcMain.handle("getmaximizedbool", () => {
      return Main.mainWindow.isMaximized();
    });
    ipcMain.handle("getcd", () => {
      return kiviinstance.cwd;
    });
    ipcMain.on("window:maxify", () => {
      Main.mainWindow.maximize();
    });
    ipcMain.on("window:unmaxify", () => {
      Main.mainWindow.restore();
      Main.mainWindow.setSize(400, 550);
    });
    ipcMain.on("window:close", () => {
      Main.mainWindow.close();
    });
    ipcMain.on("window:minify", () => {
      Main.mainWindow.minimize();
    });
    ipcMain.on("plantain:gh", () => {
      logger.info("GitHub page launched.");
      shell.openExternal('https://github.com/strawmelonjuice/plantain/');
    });
    ipcMain.on("plantain:lic", () => {
      shell.openPath(path.join(__dirname,"../LICENSE.TXT"));
    });
    ipcMain.on("plantain:cd", async () => {
      dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] }).then((picked) =>{
        console.trace(picked)
        if (picked.canceled == false) {
          const folder: string = picked.filePaths[0];
              kiviinstance.chdir(path.join(folder));
              console.log(folder);
              };
    }
    });
    ipcMain.on("plantain:forcerestart", async () => {
      logger.info("forcerestarting pid: " + process.pid);
      setTimeout(function () {
        process.on("exit", function () {
          require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached : true,
            stdio: "inherit"
        });
    });
    process.exit();
    });
    ipcMain.handle("kivi:bananencall", (event, args) => {
      switch (args[1]) {
        case "add":
          kivi.add(1, parseBool(args[2]), `${args[3]}`);
          break;
      
        default:
          break;
      }
    });
  }
}
