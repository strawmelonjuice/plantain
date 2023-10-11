console.clear();
import { app, BrowserWindow } from 'electron';
import Main from './main';
import fs from 'fs';
import { Logger, ILogObj } from "tslog";
import { default as UImainHTML } from './ui/main';
import { default as UIcredsHTML } from './ui/creds';
import { default as UIstyling } from './ui/css';
const log: Logger<ILogObj> = new Logger();
import { KiviBananen } from 'kivi-bananen';
import express from 'express';
const serv = express();
serv.use('/assets', express.static('assets'));
serv.get('/creds', (req: any, res: { send: (arg0: string) => void; }) => {
	res.send(UIcredsHTML(UIstyling("creds")))});
serv.get('/main', (req: any, res: { send: (arg0: string) => void; }) => {
	res.send(UImainHTML(UIstyling("main")))});
const UIserv = serv.listen(0, () => {
	console.log(`UI hosted on ${UIserv.address().port}`);
	Main.main(app, BrowserWindow, KiviBananen, log, UIserv.address().port);
});
