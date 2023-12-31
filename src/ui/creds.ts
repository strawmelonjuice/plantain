import fs from "fs";
import handlebars from "handlebars";
import path from "path";
export default function HTML(css: string) {
	let vars = {
		css: css,
	}
	return handlebars.compile(
		fs.readFileSync(
			path.join(__dirname, "/../../assets/handlebars/creds.handlebars"),
			{ encoding: "utf8", flag: "r" }
		))(vars);

}