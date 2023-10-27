import fs from "fs";
import handlebars from "handlebars";
import path from "path";
export default function HTML(css: string) {
	const vars = {
		css: css,
	}
	return handlebars.compile(
    fs.readFileSync(
      path.join(__dirname, "/../../assets/handlebars/main.handlebars"),
      { encoding: "utf8", flag: "r" }
	  ))(vars);
	
}
