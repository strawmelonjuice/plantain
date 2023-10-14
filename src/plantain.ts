import { app, BrowserWindow, shell } from 'electron';
import { Logger, ILogObj } from "tslog";
import Main from './main';
import { default as UImainHTML } from './ui/home';
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
serv.get("/webopen", async (req, res) => {
	if (typeof req.query.uri == "string") {
	log.log(0,"WebOpen", req.query.uri);
	shell.openExternal(req.query.uri);
	}
	// res.redirect("back");
});
const UIserv = serv.listen(0, () => {
	log.info(`UI hosted on ${UIserv.address().port}`);
	Main.main(app, BrowserWindow, KiviBananen, log, UIserv.address().port);
});
