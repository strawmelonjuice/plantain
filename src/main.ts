import { app, BrowserWindow, ipcMain, shell, dialog } from "electron";
import path from 'path';
import { KiviBananen } from 'kivi-bananen';
import { Logger, ILogObj } from "tslog";
import os from 'os';
import { spawn } from 'child_process';
// import { parse as parseJsonC } from "comment-json";
const  parseJsonC= JSON.parse
import fs from "fs";
import handlebars from "handlebars";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});
function parseBool(bool: string | boolean | number) {
  if (bool === "true" || bool === "1" || bool === true) return true
  else return false
}
export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: Electron.BrowserWindow;
  static UIport: number;
  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
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

  static main(app: Electron.App, browserWindow: Electron.BrowserWindow, kivi: typeof KiviBananen, logger: Logger<ILogObj>, port: number) {
    let kiviinstance: KiviBananen;
    logger.info("Starting Kivi instance!")
    kiviinstance = new kivi(process.cwd());
    
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.UIport = port;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    kiviinstance.do(() => {
      console.log("Kivi is ready.");
    });
    Main.application.on('ready', Main.onReady);
    
    
    ipcMain.handle("getmaximizedbool", () => {
      return Main.mainWindow.isMaximized();
    });
    ipcMain.handle("getcd", () => {
      return kiviinstance.cwd;
    });
    function BananenConfig() {
      if (!fs.existsSync(path.join(kiviinstance.cwd, "/bananen.json"))) return undefined;
      return parseJsonC(fs.readFileSync(path.join(kiviinstance.cwd, "/bananen.json"), { encoding: "utf8", flag: "r" }
      ).toString());
    }
    ipcMain.handle("getbananenconfig", () => {
      return BananenConfig();
    });
    ipcMain.handle("openurl", (event, url) => {
      shell.openExternal(url);
    });
    ipcMain.handle("getmd", (event, args) => {
      const pkgjso = parseJsonC(fs.readFileSync(path.join(__dirname, "/../package.json"), { encoding: "utf8", flag: "r" }
      ).toString());
      const vars = {
        plantain: {
          version: pkgjso.version
        },
        kivi: {
          version: kiviinstance.info.versions.kivi
        },
        bananen: {
          version: kiviinstance.info.versions.bananen
        }
      }
      let filepath = path.join(__dirname, "/../", args[0]);
      if (parseBool(args[1]) == false) filepath = path.normalize(args[0]);
      if (!fs.existsSync(filepath)) return "...";
      return (handlebars.compile(md.render(fs.readFileSync(filepath, { encoding: "utf8", flag: "r" }))))(vars);
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
      shell.openPath(path.join(__dirname, "../LICENSE.TXT"));
    });
    ipcMain.on("plantain:cd", async () => {
      dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] }).then((picked) => {
        console.trace(picked)
        if (picked.canceled == false) {
          const folder: string = picked.filePaths[0];
          kiviinstance.chdir(path.join(folder));
          console.log(folder);
        };
      })
    });

    ipcMain.on("plantain:forcerestart", async () => {
      logger.info("forcerestarting pid: " + process.pid);
      setTimeout(function () {
        process.on("exit", function () {
          require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached: true,
            stdio: "inherit"
          });
        });
        process.exit();
      });
    });
    ipcMain.handle("kivicall", (event, args) => {
      switch (args[0]) {
        case "add":
          kiviinstance.add(args[1], parseBool(args[2]), `${args[3]}`);
          break;
        case "regen":
          logger.info(`Regenerating '${path.join(kiviinstance.cwd, BananenConfig().config.changelogfile)}...`);
          kiviinstance.regen();
          break;
        case "init":
          logger.info(`Initialising '${path.join(kiviinstance.cwd)}...`);
          kiviinstance.init();
          kiviinstance.regen();
          break;
        default:
          break;
      }
    });
  }
}
