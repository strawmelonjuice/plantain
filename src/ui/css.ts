export default function CSS(page: string) {
    return (`
    @import url("/assets/fonts/notocoloremoji/notocoloremoji.css");
@import url("/assets/fonts/ubuntumono/ubuntumono.css");
@import url("/assets/fonts/ubuntu/ubuntu.css");
@import url("/assets/fonts/Inconsolata/inconsolata.css");
@import url("/assets/fonts/pixelify-sans/pixelify-sans.css");
:root {
	--main-font-family: "Inconsolata", "Ubuntu", sans-serif;
	--ui-font-family: "Pixelify Sans", "Ubuntu", sans-serif;
	font-size: 14px;

	--general-border-radius-px: 9px;
	--window-border-radius-px: 15px;
	--theme-color: #ffcc00;
	/* --titlebarHeight: 26px; */
	color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
	:root {
		--body-backgroundcolor: #445d5e;
		--main-textcolor: #ddffd7;
		--title-bar-color: #252423;
		--button-bg-color-1: #f8bea1;
		--button-bg-color-2: #aa9404;
		--button-text-color: #131341;
		--window-border-color: rgba(0, 0, 0, 0);
		--filter-icon-recolor-main: invert(100%);
		--inside-body-backgroundcolor: grey;
	}
}
@media (prefers-color-scheme: light) {
	:root {
		--body-backgroundcolor: #eafcf8;
		--main-textcolor: #303a2e;
		--title-bar-color: purple;
		--button-bg-color-1: #3d3a0d;
		--button-bg-color-2: #aa9404;
		--button-text-color: #7979ff;
		--window-border-color: rgba(255, 255, 255, 0.021);
		--filter-icon-recolor-main: none();
	}
}
:root,
html,
body {
	margin: 0px;
	padding: 0px;
	bottom: 0px;
}

#innerbody {
	position: fixed;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	margin: 0px;
	border-right: 1px solid #ffffff;
	border-bottom: 1px solid #ffffff;
	border-left: 1px solid #ffffff;
}

::-webkit-scrollbar {
	width: 12px;
	border: 1px solid var(--theme-color);
	margin-bottom: 10px;
	margin-top: 10px;
	background-color: var(--title-bar-color);
	border-radius: calc(var(--general-border-radius-px) / 25 * 10);
}

::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px var(--theme-color);
	border-radius: calc(var(--general-border-radius-px) / 25 * 10);
}

::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 5);
}

#content-body {
	position: fixed;
	margin: 8px;
	height: calc(100vh - 50px);
	width: calc(100vw - 15px);
	left: 0px;
	right: 13.5px;
	top: 40px;
	bottom: 2px;
	font-size: 0.9em;
	overflow-x: auto;
}

#titlebar {
	display: block;
	position: fixed;
	height: 30px;
	width: calc(100vw - 18px);
}

.maximized #titlebar {
	width: calc(100vw - 5px);
	padding: 0;
	border-radius: 0px 0px var(--general-border-radius-px)
		var(--general-border-radius-px);
}

#main {
	height: calc(100% - 42px);
	margin-top: 32px;
	padding: 20px;
	overflow-y: auto;
}

#titlebar {
	padding: 4px;
}

#titlebar #drag-region {
	width: 90%;
	height: 100%;
	-webkit-app-region: drag;
}

#titlebar {
	-webkit-user-select: none;
	user-select: none;
	background-color: var(--title-bar-color);
	/* border-radius: 0px 0px calc(var(--general-border-radius-px) + 10px) calc(var(--general-border-radius-px) - 10px); */
	border-radius: var(--general-border-radius-px);
	border-top: none;
	border-right: 5px var(--theme-color);
	border-bottom: 5px var(--theme-color);
	border-left: 5px var(--theme-color);
	border-style: ridge;
	z-index: 60;
}

#titlebar #window-title {
	color: var(--theme-color);
	/* filter: invert(1); */
}

#titlebar #drag-region {
	display: grid;
	grid-template-columns: 38px auto 138px;
}

#window-menubutton {
	position: absolute;
	top: 4px;
	display: block;
	align-items: center;
	width: 20px;
	height: 20px;
	margin: 0px;
	overflow: hidden;
	background-color: var(--body-backgroundcolor);
	border-radius: calc(var(--general-border-radius-px) - 15px);
	align-content: center;
	padding: 0px;
	justify-content: center;
}

.maximized #window-menubutton {
	border: var(--theme-color) double 3px;
}

#window-menubutton #menubuttonlogo {
	width: 20px;
	height: 20px;
}

#window-menubutton,
#window-menubutton #menubuttonlogo {
	-webkit-app-region: no-drag;
	z-index: 100;
}

#window-title {
	/* position: absolute;*/
	top: 8px;
	/* left: 45px;  */
	grid-column: 2;
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;
	overflow: hidden;
	font-family: var(--ui-font-family);
	font-size: 0.6em;
}

.maximized #window-title {
	margin-left: 12px;
}

#window-title span {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 1.5;
}

#window-controls {
	display: grid;
	grid-template-columns: repeat(3, 46px);
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
}

#window-controls,
#window-menubuttonplaceholder {
	-webkit-app-region: no-drag;
}

#window-controls .button {
	grid-row: 1 / span 1;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}

@media (-webkit-device-pixel-ratio: 1.5),
	(device-pixel-ratio: 1.5),
	(-webkit-device-pixel-ratio: 2),
	(device-pixel-ratio: 2),
	(-webkit-device-pixel-ratio: 3),
	(device-pixel-ratio: 3) {
	#window-controls .icon {
		width: 10px;
		height: 10px;
	}
}

#window-controls .button {
	user-select: none;
}

#window-controls .button:hover {
	background: rgba(255, 255, 255, 0.1);
}

#window-controls .button:active {
	background: rgba(255, 255, 255, 0.2);
}

#close-button:hover {
	background: #e81123 !important;
}

#close-button:active {
	background: #f1707a !important;
}

#close-button:active .icon {
	filter: invert(1);
}

#min-button {
	grid-column: 1;
}

#max-button,
#restore-button {
	grid-column: 2;
}

#close-button {
	grid-column: 3;
	border-radius: calc(var(--general-border-radius-px) - 4px);
	overflow: hidden;
}

.maximized #close-button {
	border-radius: 0px 0px calc(var(--general-border-radius-px) - 4px);
}

#restore-button {
	display: none !important;
}

.maximized #restore-button {
	display: flex !important;
}

.maximized #max-button {
	display: none;
}

.button-like,
button {
	/*background-image: linear-gradient(
		135deg,
		var(--button-bg-color-1) 10%,
		var(--button-bg-color-2) 100%
	);*/
	background-color: var(--button-bg-color-1);
	color: var(--button-text-color);
}

#content-body {
	background-color: var(--body-backgroundcolor);
	margin-left: auto;
	margin-right: auto;
	border-radius: 0px 0px var(--window-border-radius-px)
		var(--window-border-radius-px);
	font-size: 0.8em;
}

#innerbody {
	color: var(--main-textcolor);
	font-family: var(--main-font-family);
	transition: font-size cubic-bezier(0.77, 0, 0.18, 1) 0.8s;
	background-color: var(--body-backgroundcolor);
	border-radius: var(--window-border-radius-px);
	overflow: hidden;
	/* yeah here it is */
	-webkit-user-select: none;
	user-select: none;
	/* why? because I like it this way. */
}

.maximized #innerbody {
	border-radius: 0px;
}

.icon-recolor-main {
	filter: brightness(0) saturate(100%) var(--filter-icon-recolor-main);
}

.icon-recolor-trans {
	filter: var(--filter-icon-recolor-main);
}
#navigation {
	position: fixed;
	background-color: var(--theme-color);
	/*  overflow: clip;*/
	top: calc(var(--titlebarHeight) + 0.5px);
	min-width: 100vw;
	height: 25px;
	right: 0px;
	z-index: 300;
}
#navigation a {
	float: right;
	display: block;
	color: var(--button-text-color);
	text-align: center;
	padding-left: 0.4em;
	padding-right: 0.4em;
	padding-top: 0px;
	padding-bottom: 0px;
	text-decoration: none;
	font-size: 0.8em;
	height: 25px;
	line-height: 25px;
}
#navigation a:hover,
#reloadoptionstooltip div:hover,
#bnav a:hover {
	background-color: var(--button-bg-color-1);
}
#navigation a.active {
	background-color: var(--button-bg-color-2);
}
#navigation .icon {
	display: none;
}
#bnav {
	position: fixed;
	background-color: var(--theme-color);
	overflow: hidden;
	bottom: 0px;
	min-width: 100vw;
	height: 40px;
	right: 0px;
	z-index: 300;
}
#bnav a {
	height: 100%;
	float: right;
	display: block;
	color: var(--button-text-color);
	text-align: center;
	padding: 0.4em 1em;
	text-decoration: none;
	font-size: 1em;
}
#bnav a.active {
	background-color: var(--button-bg-color-2);
}
#bnav .icon {
	display: none;
}
#inside-body {
	margin: 15px;
	margin-left: auto;
	margin-right: auto;
	width: 90%;
	height: 60%;
	bottom: 0;
	background-color: var(--inside-body-backgroundcolor);
	display: block;
}

#reloadoptionstooltip {
	display: none;
	position: relative;
	bottom: -0.7px;
	align-self: center;
	height: 50px;
	background-color: var(--theme-color);
	width: 100%;
	z-index: 300;
	margin: 0px;
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 0.4em;
	padding-right: 0.4em;
	color: var(--button-text-color);
}
`)
};
