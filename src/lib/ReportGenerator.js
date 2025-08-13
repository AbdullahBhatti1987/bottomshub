// // lib/ReportGenerator.js
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// export function formatMobile(mobile) {
//   /* same as before */
// }

// export async function generateReport({
//   data,
//   columns,
//   reportType = "pdf",
//   from,
//   to,
//   companyName = "Bottom's Hub",
//   logo = null,
// }) {
//   if (reportType === "pdf") {
//     const doc = new jsPDF({
//       orientation: "portrait",
//       unit: "pt",
//       format: "a4",
//     });
//     const pageWidth = doc.internal.pageSize.getWidth();

//     // --- Header ---
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text(companyName, 40, 40);
//     doc.text("Customer Report", pageWidth / 2, 40, { align: "center" });
//     doc.setFontSize(6);
//     doc.text(
//       `From: ${from} To: ${to} | Generated: ${new Date().toLocaleString()}`,
//       pageWidth / 2,
//       50,
//       { align: "center" }
//     );

//     // --- Table ---
//     autoTable(doc, {
//       startY: 70,
//       head: [columns.map((c) => c.label || c.key)],
//       body: data.map((d) =>
//         columns.map((c) =>
//           c.key === "Mobile" ? formatMobile(d[c.key]) : d[c.key]
//         )
//       ),
//       styles: { fontSize: 7, cellPadding: 4, textColor: 0 },
//       headStyles: { fillColor: [229, 231, 235], halign: "center" },
//       columnStyles: {
//         0: { halign: "center" },
//         3: { halign: "center" },
//         4: { halign: "center" },
//       },
//       didDrawCell: function (dataArg) {
//         const { cell } = dataArg;
//         doc.setDrawColor(0);
//         doc.setLineWidth(0.25);
//         doc.rect(cell.x, cell.y, cell.width, cell.height);
//       },
//     });

//     const buffer = doc.output("arraybuffer");
//     return { buffer, mimeType: "application/pdf", ext: "pdf" };
//   } else if (reportType === "csv") {
//     const headerRows = [
//       [companyName],
//       [`From: ${from} To: ${to} | Generated: ${new Date().toLocaleString()}`],
//       [],
//     ];
//     const tableHeader = columns.map((c) => c.label || c.key);
//     const tableBody = data.map((row, i) =>
//       columns.map((col) =>
//         col.key === "Mobile" ? formatMobile(row[col.key]) : row[col.key]
//       )
//     );
//     const csvData = [...headerRows, tableHeader, ...tableBody];
//     const csv = csvData
//       .map((row) => row.map((cell) => `"${cell ?? ""}"`).join(","))
//       .join("\r\n");
//     return {
//       buffer: new TextEncoder().encode(csv),
//       mimeType: "text/csv",
//       ext: "csv",
//     };
//   }
// }


import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function formatMobile(mobile) {
  if (!mobile) return "";
  const cleaned = mobile.replace("+92", "0");
  return cleaned.slice(0, 4) + "-" + cleaned.slice(4);
}

export async function generateReport({
  data,
  columns,
  reportType = "pdf",
  from,
  to,
  companyName = "Bottom's Hub",
}) {
  if (reportType === "pdf") {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(companyName, 40, 40);
    doc.text("Customer Report", pageWidth / 2, 40, { align: "center" });
    doc.setFontSize(6);
    doc.text(`From: ${from} To: ${to} | Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 50, { align: "center" });

    // Table
    autoTable(doc, {
  startY: 70,
  head: [columns.map((c) => c.label || c.key)],
  body: data.map((d) =>
    columns.map((c) =>
      c.key === "Mobile" ? formatMobile(d[c.key]) : d[c.key] ?? ""
    )
  ),
  styles: { fontSize: 7, cellPadding: 4, textColor: 0 },
  headStyles: { fillColor: [229, 231, 235], halign: "center" },
  columnStyles: {
    0: { halign: "center" },
    3: { halign: "center" },
    4: { halign: "center" },
  },
  didDrawCell: function (dataArg) {
    const { cell } = dataArg;
    doc.setDrawColor(0);
    doc.setLineWidth(0.25);
    doc.rect(cell.x, cell.y, cell.width, cell.height);
  },
  didDrawPage: function (dataArg) {
    const pageCount = doc.internal.getNumberOfPages();
    const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    // Left bottom: total customers
    doc.text(
      `Total: ${data.length} customers`,
      dataArg.settings.margin.left,
      doc.internal.pageSize.getHeight() - 10
    );

    // Right bottom: page numbers
    doc.text(
      `Page ${pageCurrent} of ${pageCount}`,
      doc.internal.pageSize.getWidth() - dataArg.settings.margin.right,
      doc.internal.pageSize.getHeight() - 10,
      { align: "right" }
    );
  },
});


    const buffer = doc.output("arraybuffer");
    return { buffer, mimeType: "application/pdf", ext: "pdf" };
  } else if (reportType === "csv") {
    const headerRows = [
      [companyName],
      [`From: ${from} To: ${to} | Generated: ${new Date().toLocaleString()}`],
      [],
    ];

    const tableHeader = columns.map((c) => c.label || c.key);
    const tableBody = data.map((row) =>
      columns.map((col) =>
        col.key === "Mobile" ? formatMobile(row[col.key]) : row[col.key] ?? ""
      )
    );

    const csvData = [...headerRows, tableHeader, ...tableBody];
    const csv = csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\r\n");

    return { buffer: new TextEncoder().encode(csv), mimeType: "text/csv", ext: "csv" };
  }
}
