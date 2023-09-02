import { readdir, readFile } from "fs/promises";
import path from "path";
export const baseDir = "/media/renderws/carltonData/cj2023/teresa/groups/";

export const getSheets = async () => {
  const files = await readdir(baseDir);
  const csvFiles = files.filter((f) => f.includes(".csv"));
  const fnNd = await Promise.all(
    csvFiles.map(async (fn) => {
      const str = (
        await readFile(path.join(baseDir, fn), { encoding: "utf8" })
      ).toString();
      const data = str
        .trim()
        .split("\n")
        .map((l) => l.trim().split(","));
      const name = fn.split(".")[0];
      const cwm = colWidthMax(data.slice(1));
      return { name, data, cwm };
    })
  );
  return fnNd;
};

export const colWidthMax = (data) => {
  const colWithInitial = Array(data[0].length).fill(5);
  const colWidth = data.reduce((a, r) => {
    const max = r.map((c, j) => Math.max(c.length, a[j]));
    return max;
  }, colWithInitial);
  return colWidth;
};
