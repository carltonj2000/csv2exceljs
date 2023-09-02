import { colWidthMax } from "./getSheets.js";
const data = [
  ["a", "b", "c"],
  ["aa", "bbbb", "ccc"],
];

const cwm = colWidthMax(data);

console.log({ cwm });
