export default function HTML(css: string) {
    return (`
		<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Plaintain credits</title>
		<style>
		${css}
		</style>
		<!-- <meta http-equiv="Content-Security-Policy" content="script-src file://* http://localhost:* https://cdn.jsdelivr.net/ 'unsafe-inline';" /> -->
		<script>
			const window = window.opener;
		</script>
	</head>

	<body>
		<div id="innerbody">
			<main id="content-body"><div style="text-align: center;" id="creditsded">

				<!-- <textarea disabled style="width: 90VW; height: 10em; resize: none;">
					Plantain, an Electron GUI for Bananen.

					Both by MLC Bloeiman (@strawmelonjuice)
				</textarea> -->
			</div>
			</main>
			<div id="bnav">
				<a href="javascript:void()" onclick="window.close()" class="active">Close</a>
				<a href="javascript:window.opener.ipcRender.send('plantain:gh')">GitHub</a>
				<a href="javascript:window.opener.ipcRender.send('plantain:lic')">License.txt</a>
			</div>
			<script src="/assets/js/renderer.js"></script>
		</div>
	</body>
</html>

		`)};