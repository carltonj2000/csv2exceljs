import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
import { baseDir, getSheets } from "./getSheets.js";

(async () => {
  const nNd = await getSheets();
  XLSX.set_fs(fs);

  const wb = XLSX.utils.book_new();

  wb.Props = {
    Title: "Teresa's Leads",
    Author: "Teresa Del Rosario",
    CreatedDate: new Date(),
  };

  // const sheetName = "Test Sheet";
  // const ws_data = [["hello", "world long to see strech"]];

  nNd.map(({ name, data, cwm }) => {
    wb.SheetNames.push(name);
    const ws = XLSX.utils.aoa_to_sheet(data);
    // ws["!cols"] = [{ wch: 10 }, { wch: 20 }];
    ws["!cols"] = cwm.map((m) => ({ wch: m }));
    wb.Sheets[name] = ws;
  });

  XLSX.writeFile(wb, path.join(baseDir, "teresasleads.xlsx"), {
    compression: true,
  });
})();
