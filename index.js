import * as fs from "fs";
import * as XLSX from "xlsx";
import { sheets } from "./sheets.js";

XLSX.set_fs(fs);

const wb = XLSX.utils.book_new();

wb.Props = {
  Title: "Teresa's Leads",
  Author: "Teresa Del Rosario",
  CreatedDate: new Date(),
};

// const sheetName = "Test Sheet";
// const ws_data = [["hello", "world long to see strech"]];

sheets.map(({ name, data }) => {
  wb.SheetNames.push(name);
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = [{ wch: 10 }, { wch: 20 }];
  wb.Sheets[name] = ws;
});

XLSX.writeFile(wb, "test.xlsx", { compression: true });
