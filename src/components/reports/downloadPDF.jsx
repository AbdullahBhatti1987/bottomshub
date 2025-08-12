import jsPDF from "jspdf";
import "jspdf-autotable"; // Optional for tables

export function downloadPDF(data, filename = "report.pdf") {
  const doc = new jsPDF();

  doc.text("Report", 14, 10);

  // Optional table format
  const tableColumn = Object.keys(data[0]);
  const tableRows = data.map(item => Object.values(item));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save(filename);
}



// downloadPDF([
//   { name: "John", age: 25 },
//   { name: "Alice", age: 30 }
// ], "users.pdf");
