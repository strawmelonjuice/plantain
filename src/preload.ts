import { contextBridge, ipcRenderer } from "electron";
import fs from "fs";
const ipc = {
	render: {
		send: [
			"window:unmaxify",
			"window:maxify",
			"window:minify",
			"window:close",
			"plantain:lic",
			"plantain:cd",
			"plantain:forcerestart",
		],
		receive: [],
		sendReceive: [
			"ping",
			"getcd",
			"getmaximizedbool",
			"kivicall",
			"synchronous-message",
			"getmd",
			"getbananenconfig"
		],
	},
};
contextBridge.exposeInMainWorld("ipcRender", {
	send: (channel, args) => {
		const validChannels = ipc.render.send;
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, args);
		}
	},
	receive: (channel, listener) => {
		const validChannels = ipc.render.receive;
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => listener(...args));
		}
	},
	invoke: (channel, args) => {
		const validChannels = ipc.render.sendReceive;
		if (validChannels.includes(channel)) {
			return ipcRenderer.invoke(channel, args);
		}
	},
});
