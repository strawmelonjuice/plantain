function parseBool(bool) {
	return "true" === bool || "1" === bool || !0 === bool;
}
function CheckIfMaximized() {
	ipcRender.invoke("getmaximizedbool").then((ismaxxed) => {
		ismaxxed
			? document.body.classList.contains("maximized") ||
			  document.body.classList.add("maximized")
			: document.body.classList.contains("maximized") &&
			  document.body.classList.remove("maximized");
	});
}
function handleWindowControls() {
	document.getElementById("min-button").addEventListener("click", (event) => {
		window.ipcRender.send("window:minify");
	}),
		document.getElementById("max-button").addEventListener("click", (event) => {
			window.ipcRender.send("window:maxify"),
				document.body.classList.add("maximized");
		}),
		document
			.getElementById("restore-button")
			.addEventListener("click", (event) => {
				window.ipcRender.send("window:unmaxify"),
					document.body.classList.remove("maximized");
			}),
		document
			.getElementById("close-button")
			.addEventListener("click", (event) => {
				window.ipcRender.send("window:close");
			});
}
setInterval(() => {
	ipcRender.invoke("getcd").then((currentDir) => {
		const disp = document.getElementById("kivi-cwd-disp");
		null !== disp && (disp.value = currentDir);
	});
}, 500),
	handleWindowControls(),
	(document.body.setScaledFont = function (f) {
		const s = this.offsetWidth;
		return (
			this.offsetWidth < 701
				? ((fs = s * (f / 30)), console.log("Scaling in small mode."))
				: this.offsetWidth < 1600
				? ((fs = s * (f / 100)),
				  console.log(`Scaling in laptop mode. Width: ${this.offsetWidth}`))
				: this.offsetWidth >= 1600 &&
				  ((fs = s * (f / 150)),
				  console.log(`Scaling in desktop mode. Width: ${this.offsetWidth}`)),
			(this.style.fontSize = `${fs}%`),
			this
		);
	});
const ScaleFontsTo = 10.1;
function ScaleNow() {
	(scft = 10.1 + localStorage.getItem("zoomdiffersetting") / 10),
		document.body.setScaledFont(scft),
		CheckIfMaximized(),
		(window.onresize = function () {
			CheckIfMaximized(),
				getTitleBarHeight(),
				document.body.setScaledFont(scft);
		});
}
function getTitleBarHeight() {
	document
		.querySelector(":root")
		.style.setProperty(
			"--titlebarHeight",
			document.getElementById("titlebar").offsetHeight + "px"
		);
}
function closeMenu() {
	setTimeout(() => {
		(document.getElementById("navigation").style.display = "none"),
			(document.getElementById("content-body").style.top = ""),
			(document.getElementById("content-body").style.height = ""),
			(menubutton.src = "./assets/svg/menu-open.svg"),
			(menubutton.dataset.menustatus = "closed");
	}, 50);
}
function showCredits() {
	window.open(
		"/creds",
		"creditsWindow",
		"toolbar=no,\n                                    location=no,\n                                    status=no,\n                                    menubar=no,\n                                    menu=no,\n                                    scrollbars=no,\n                                    resizable=yes,\n                                    width=300,\n                                    height=300"
	);
}
function showE(ElementId) {
	document.getElementById(ElementId).style.display = "block";
}
function restoreED(ElementId) {
	document.getElementById(ElementId).style.display = "";
}
function switchToTab(evt, tab) {
	let i, tabcontent, tablinks;
	for (
		tabcontent = document.getElementsByClassName("tabcontent"), i = 0;
		i < tabcontent.length;
		i++
	)
		tabcontent[i].style.display = "none";
	for (
		tablinks = document.getElementsByClassName("tablinks"), i = 0;
		i < tablinks.length;
		i++
	)
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	(document.getElementById(tab).style.display = "block"),
		(evt.currentTarget.className += " active");
}
function changeTypeForms(evt, additionType) {
	var i, addercontent, changetypeswitchers;
	for (
		addercontent = document.getElementsByClassName("addercontent"), i = 0;
		i < addercontent.length;
		i++
	)
		addercontent[i].style.display = "none";
	for (
		changetypeswitchers = document.getElementsByClassName(
			"changetypeswitchers"
		),
			i = 0;
		i < changetypeswitchers.length;
		i++
	)
		changetypeswitchers[i].className = changetypeswitchers[i].className.replace(
			" active",
			""
		);
	(document.getElementById(additionType).style.display = "block"),
		(evt.currentTarget.className += " active");
}
function collectBananenQuery(type) {
	let msg = document.getElementById(type + "-msg").value.replaceAll("`", "`"),
		breaking = document.getElementById(type + "-breaking").checked;
	if ("" == msg) window.alert("Changelog addition cannot be empty.");
	else {
		let typen;
		switch (type) {
			case "add":
				typen = 1;
				break;
			case "upd":
				typen = 2;
				break;
			case "fix":
				typen = 3;
				break;
			case "rem":
				typen = 4;
		}
		window.ipcRender.invoke("kivicall", ["add", typen, msg, breaking]),
			window.location.reload(!1);
	}
}
function bananenDubq() {
	let vername = document
		.getElementById("rel-relname")
		.value.replaceAll("`", "`");
	"" == vername
		? window.alert("Release name cannot be empty.")
		: (window.ipcRender.invoke("kivicall", ["dub", vername]),
		  window.location.reload(!1));
}
(void 0 !== localStorage.getItem("zoomdiffersetting") &&
	null != localStorage.getItem("zoomdiffersetting")) ||
	localStorage.setItem("zoomdiffersetting", parseInt(0)),
	ScaleNow(),
	getTitleBarHeight(),
	(menubutton = document.getElementById("menubuttonlogo")),
	document
		.getElementById("window-menubutton")
		.addEventListener("click", (event) => {
			"closed" === menubutton.dataset.menustatus
				? ((document.getElementById("navigation").style.display = ""),
				  (document.getElementById("content-body").style.top =
						"calc(var(--titlebarHeight) + .5px + 25px)"),
				  (document.getElementById("content-body").style.height =
						"calc(100vh - (var(--titlebarHeight) + .5px + 75px))"),
				  (menubutton.src = "./assets/svg/menu-close.svg"),
				  (menubutton.dataset.menustatus = "opened"))
				: closeMenu();
		}),
	closeMenu(),
	document.getElementById("navigation").setAttribute("onclick", "closeMenu()"),
	null !== document.getElementById("ReadBackSpan") &&
		setInterval(() => {
			ipcRender.invoke("getcd").then((currentDir) => {
				ipcRender.invoke("getbananenconfig").then((conf) => {
					null == conf
						? (document.getElementById("ReadBackSpan").innerHTML =
								"<button class=\"regen-init-button\" onclick=\"window.ipcRender.invoke('kivicall', ['init'])\">Initialise</button>This directory does not have a BananenConfig (yet)\n Initialise it to view a clean Bananen changelog here!")
						: ipcRender
								.invoke("getmd", [
									currentDir + "/" + conf.config.changelogfile,
									!1,
								])
								.then((markdownasHTML) => {
									null == markdownasHTML ||
										(document.getElementById("ReadBackSpan").innerHTML =
											"\n          <button class=\"regen-init-button\" onclick=\"window.ipcRender.invoke('kivicall', ['regen'])\">Regenerate</button>" +
											markdownasHTML);
								});
				});
			});
		}, 800),
	ipcRender.invoke("getbananenversion").then((ver) => {
		"none" === ver
			? (window.alert(
					"Bananen not available, not installed or not found on path. Please install Bananen first."
			  ),
			  (window.location.href =
					"/webopen?uri=https://strawmelonjuice.com/?p=projects/bananen/get"),
			  setTimeout(() => {
					window.ipcRender.send("window:close");
			  }, 3e3),
			  console.info("[Kivi] Bananen not found."))
			: console.info("[Kivi] Connected to Bananen v" + ver);
	});
