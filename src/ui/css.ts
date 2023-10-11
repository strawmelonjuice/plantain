import fs from 'fs';
import path from 'path';
export default function CSS(page: string) {
	let cstm = "";
	if (page == "main") cstm = (`

.changetypes {
  overflow: hidden;
  height: 3em;
  margin-top: 0px;
  width: 100%
}

.changetypes button {
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 2s;
  font-size: 1em;
  width: 25%;
}

.addercontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
  height: max-content;
}


.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: var(--window-border-color);
}
.tab button {
  float: right;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 2s;
  font-size: 1em;
}

.tab button.active, .changetypes button {
  background-color: var(--button-bg-color-2);
}

.changetypes button.active {
  background-color: var(--button-bg-color-1);
}

.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  margin: 0px;
  overflow-x: auto;
  height: -webkit-fill-available;
}

#ReadBackSpan {
  font-size: 0.7em;
  user-select: text;
}
.regen-init-button {
  float: right;
}
`);
    return (`@import url("/assets/styles.css");${cstm}`);
};
