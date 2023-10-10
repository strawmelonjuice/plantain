function parseBool(bool) {
  if (bool === "true" || bool === "1" || bool === true) return true;
  else return false;
}
function CheckIfMaximized() {
  ipcRender.invoke("getmaximizedbool").then((ismaxxed) => {
    // console.log(ismaxxed);
    if (ismaxxed) {
      if (!document.body.classList.contains("maximized")) {
        document.body.classList.add("maximized");
      }
    } else {
      if (document.body.classList.contains("maximized")) {
        document.body.classList.remove("maximized");
      }
    }
  });
}
setInterval(() => {
  ipcRender.invoke("getcd").then((currentDir) => {
    // console.log("currentDir:" + currentDir)
  const disp= document.getElementById("kivi-cwd-disp");
  if (disp !== null) {
    disp.value = currentDir;
  }
})}, 500);
function handleWindowControls() {
  document.getElementById("min-button").addEventListener("click", (event) => {
    window.ipcRender.send("window:minify");
  });

  document.getElementById("max-button").addEventListener("click", (event) => {
    window.ipcRender.send("window:maxify");
    document.body.classList.add("maximized");
  });

  document
    .getElementById("restore-button")
    .addEventListener("click", (event) => {
      window.ipcRender.send("window:unmaxify");
      document.body.classList.remove("maximized");
    });

  document.getElementById("close-button").addEventListener("click", (event) => {
    window.ipcRender.send("window:close");
  });
}
handleWindowControls();

document.body.setScaledFont = function (f) {
  const s = this.offsetWidth;
  if (this.offsetWidth < 701) {
    fs = s * (f / 30);
    console.log("Scaling in small mode.");
  } else if (this.offsetWidth < 1600) {
    fs = s * (f / 100);
    console.log(`Scaling in laptop mode. Width: ${this.offsetWidth}`);
  } else if (this.offsetWidth >= 1600) {
    fs = s * (f / 150);
    console.log(`Scaling in desktop mode. Width: ${this.offsetWidth}`);
  }
  this.style.fontSize = `${fs}%`;
  return this;
};
const ScaleFontsTo = 10.1;
if (
  typeof localStorage.getItem("zoomdiffersetting") === "undefined" ||
  localStorage.getItem("zoomdiffersetting") == null
) {
  localStorage.setItem("zoomdiffersetting", parseInt(0));
}
ScaleNow();
function ScaleNow() {



  scft = ScaleFontsTo + localStorage.getItem("zoomdiffersetting") / 10;
  // console.log(
  //   `Scaling fonts to: ${ScaleFontsTo}\nzoomdiffer setting: ${localStorage.getItem(
  //     "zoomdiffersetting"
  //   )}\n\n That makes SCFT: ${scft}.`
  // );
  // e.g. 180% = 18.1
  document.body.setScaledFont(scft);
  CheckIfMaximized();
  window.onresize = function () {
    CheckIfMaximized();
    getTitleBarHeight();
    document.body.setScaledFont(scft);
  };
}
function getTitleBarHeight() {
  document
		.querySelector(":root")
		.style.setProperty(
			"--titlebarHeight",
			document.getElementById("titlebar").offsetHeight + "px"
		);
}
getTitleBarHeight();
menubutton = document.getElementById("menubuttonlogo");
document
  .getElementById("window-menubutton")
  .addEventListener("click", (event) => {
    if (menubutton.dataset.menustatus === "closed") {
      document.getElementById("navigation").style.display = "";
      document.getElementById("content-body").style.top =
			"calc(var(--titlebarHeight) + .5px + 25px)";
      document.getElementById("content-body").style.height =
			"calc(100vh - (var(--titlebarHeight) + .5px + 75px))";
      menubutton.src = "./assets/svg/menu-close.svg";
      menubutton.dataset.menustatus = "opened";
    } else {
      closeMenu();
    }
  });
  function closeMenu() {
    setTimeout(() => {
      document.getElementById("navigation").style.display = "none";
      document.getElementById("content-body").style.top = "";
      document.getElementById("content-body").style.height = ""; menubutton.src =
      "./assets/svg/menu-open.svg";
      menubutton.dataset.menustatus = "closed";
    }, 50);
  }
  closeMenu()
  document.getElementById("navigation").setAttribute("onclick","closeMenu()");
  function showCredits() {
    window.open("/creds",'creditsWindow',
                                   `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    menu=no,
                                    scrollbars=no,
                                    resizable=yes,
                                    width=300,
                                    height=300`);
  };

  function showE (ElementId) {
    document.getElementById(ElementId).style.display = "block";
  };
  function restoreED (ElementId) {
    document.getElementById(ElementId).style.display = "";
  };