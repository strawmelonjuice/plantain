console.clear();
import { app, BrowserWindow } from 'electron';
import Main from './main';
import fs from 'fs';
import { Logger, ILogObj } from "tslog";

const log: Logger<ILogObj> = new Logger();
import { KiviBananen as KiviBananen } from 'kivi-bananen';
console.log(typeof KiviBananen);
Main.main(app, BrowserWindow, KiviBananen, log);