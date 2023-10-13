import fs from 'fs';
import path from 'path';
export default function CSS(page: string) {
	let cstm = "";
  if (page == "main") cstm = (`@import url("/assets/css/home.css")`);
    return (`@import url("/assets/css/main.css");${cstm}`);
};
