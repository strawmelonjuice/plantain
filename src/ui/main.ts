function HTML() {
    return (`
  	<!doctype html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Plaintain</title>
		<link
			rel="stylesheet"
			href="assets/styles.css"
			content-type="text/css"
			charset="utf-8"
		/>
		<!-- <meta http-equiv="Content-Security-Policy" content="script-src file://* http://localhost:* https://cdn.jsdelivr.net/ 'unsafe-inline';" /> -->
	</head>

	<body>
		<div id="innerbody">
			<header id="titlebar">
				<!-- <span id="window-menubutton"><img src="./icons/menu-open.svg" id="menubuttonlogo" class="icon-recolor-main"
        data-status="closed"></span> -->
				<div id="drag-region">
					<div id="window-menubuttonplaceholder">
						<span id="window-menubutton"
							><img
								src="./assets/svg/menu-open.svg"
								id="menubuttonlogo"
								class="icon-recolor-main"
								data-menustatus="closed"
								draggable="false"
						/></span>
					</div>
					<div id="window-title">
						<span>Plantain 🍌</span>
					</div>

					<div id="window-controls">
						<div class="button" id="min-button">
							<img
								class="icon icon-recolor-main"
								src="./assets/svg/window-minimize.svg"
								draggable="false"
							/>
						</div>
						<div class="button" id="max-button">
							<img
								class="icon icon-recolor-main"
								src="./assets/svg/window-maximize.svg"
								draggable="false"
							/>
						</div>
						<div class="button" id="restore-button">
							<img
								class="icon icon-recolor-main"
								src="./assets/svg/window-restore.svg"
								draggable="false"
							/>
						</div>
						<div class="button" id="close-button">
							<img
								class="icon icon-recolor-main"
								src="./assets/svg/window-close.svg"
								draggable="false"
							/>
						</div>
					</div>
				</div>
			</header>
			<div id="navigation">
				<a href="javascript:void" onclick="showCredits()">Credits</a>
				<a href="javascript:window.ipcRender.send('plantain:gh')"
					>GitHub</a
				>
				<a
					href="javascript:void()"
					onmouseenter="showE('reloadoptionstooltip')"
					onmouseover="showE('reloadoptionstooltip')"
					onmouseout="restoreED('reloadoptionstooltip')"
					style="width: 6em"
					><div
						onclick="window.location.reload(false);"
						style="width: 100%; height: 100%"
					>
						Reload
					</div>
					<div id="reloadoptionstooltip">
						<div
							onclick="window.location.reload(false);"
							style="width: 100%; height: 25px"
						>
							Force reload
						</div>
						<div
							onclick="window.ipcRender.send('plantain:forcerestart')"
							style="width: 100%; height: 25px"
						>
							Restart
						</div>
					</div></a
				>
			</div>
			<main id="content-body">
				<div style="text-align: center">
					<label for="kivi-cwd-disp"
						><text style="float: left">Current directory:</text
						><button
							onclick="window.ipcRender.send('plantain:cd')"
							style="float: right; border-radius: 90px"
						>
							Change
						</button></label
					><input
						type="text"
						disabled
						id="kivi-cwd-disp"
						style="
							width: 90vw;
							margin-left: auto;
							margin-right: auto;
							margin-top: 5px;
						"
					/>
				</div>
				<br />
				<div id="inside-body">
					<p>hello?</p>
				</div>
			</main>
			<script src="./assets/js/renderer.js"></script>
		</div>
	</body>
</html>
`)}; 
export default HTML();