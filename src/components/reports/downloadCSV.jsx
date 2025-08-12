import { utils, writeFile } from 'xlsx';
import Papa from "papaparse";

export function downloadCSV(data, filename = "report.csv") {
  const csv = Papa.unparse(data); // Convert JSON to CSV
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// downloadCSV([
//   { name: "John", age: 25 },
//   { name: "Alice", age: 30 }
// ], "users.csv");
