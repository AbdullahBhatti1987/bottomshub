// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import User from "@/models/User";
// import { connectDb } from "@/lib/connectDb";
// import responseHelper from "@/lib/responseHelper";

// function formatMobile(mobile) {
//   if (!mobile) return "";
//   const cleaned = mobile.replace("+92", "0");
//   return cleaned.slice(0, 4) + "-" + cleaned.slice(4);
// }

// export async function GET(req) {
//   try {
//     await connectDb();

//     const { searchParams } = new URL(req.url);
//     const type = searchParams.get("type");
//     const from = searchParams.get("from");
//     const to = searchParams.get("to");

//     if (!from || !to) {
//       return responseHelper.badRequest("from and to dates are required");
//     }

//     const fromDate = new Date(from);
//     const toDate = new Date(to);
//     toDate.setHours(23, 59, 59, 999);

//     const users = await User.find({
//       role: "customer",
//       createdAt: { $gte: fromDate, $lte: toDate },
//     }).select("name email mobile createdAt -_id");

//     const data = users.map((u, i) => ({
//       SrNo: i + 1,
//       Name: u.name,
//       Email: u.email,
//       Mobile: formatMobile(u.mobile),
//       RegisteredOn: u.createdAt.toISOString().split("T")[0],
//     }));

//     if (data.length === 0) {
//       return responseHelper.notFound(
//         "No customer data found for selected dates"
//       );
//     }

//     let buffer;
//     let mimeType;
//     let ext;

//     if (type === "pdf") {
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "pt",
//         format: "a4",
//       });

//       const pageWidth = doc.internal.pageSize.getWidth();

//       // --- Logo + Company Name ---
//       const logoSize = 40;
//       // Dummy rectangle as logo placeholder
//       doc.setFillColor(200);
//       doc.rect(40, 20, logoSize, logoSize, "F");
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "bold");
//       doc.text("Bottom's Hub", 90, 45);

//       // --- Heading ---
//       doc.setFontSize(12); // half size
//       doc.setFont("helvetica", "bold");
//       doc.text("Customer Report", pageWidth / 2, 40, { align: "center" });

//       // --- Report time ---
//       doc.setFontSize(6); // half size
//       const now = new Date();
//       doc.text(
//         `From: ${from} To: ${to} | Generated: ${now.toLocaleString()}`,
//         pageWidth / 2,
//         50,
//         { align: "center" }
//       );

//       // --- Table ---
//       autoTable(doc, {
//         startY: 70,
//         head: [["Sr No", "Name", "Email", "Mobile", "Registered On"]],
//         body: data.map((d) => [
//           d.SrNo,
//           d.Name,
//           d.Email,
//           d.Mobile,
//           d.RegisteredOn,
//         ]),
//         styles: { fontSize: 7, cellPadding: 4, textColor: 0 },
//         headStyles: {
//           fillColor: [229, 231, 235], // gray-200
//           textColor: 0,
//           halign: "center",
//         },
//         columnStyles: {
//           0: { halign: "center" },
//           1: { halign: "left", overflow: "linebreak" },
//           2: { halign: "left", overflow: "linebreak" }, // email wrap
//           3: { halign: "center" },
//           4: { halign: "center" },
//         },
//         tableWidth: "auto", // auto stretch
//         lineWidth: 0.25, // border thickness
//         alternateRowStyles: { fillColor: 255 },
//         didDrawCell: function (dataArg) {
//           // draw border manually
//           const { cell } = dataArg;
//           doc.setDrawColor(0);
//           doc.setLineWidth(0.25);
//           doc.rect(cell.x, cell.y, cell.width, cell.height);
//         },
//         didDrawPage: function (dataArg) {
//           const pageCount = doc.internal.getNumberOfPages();
//           const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
//           doc.setFontSize(8);
//           doc.setFont("helvetica", "normal");

//           // Left bottom: total customers
//           doc.text(
//             `Total: ${data.length} customers`,
//             dataArg.settings.margin.left,
//             doc.internal.pageSize.getHeight() - 10
//           );

//           // Right bottom: page numbers
//           doc.text(
//             `Page ${pageCurrent} of ${pageCount}`,
//             doc.internal.pageSize.getWidth() - dataArg.settings.margin.right,
//             doc.internal.pageSize.getHeight() - 10,
//             { align: "right" }
//           );
//         },
//       });

//       buffer = doc.output("arraybuffer");
//       mimeType = "application/pdf";
//       ext = "pdf";
//     } else if (type === "csv") {
//       // --- Prepare header rows ---
//       const now = new Date();
//       const headerRows = [
//         ["Bottom's Hub"], // Company Name / Logo placeholder
//         [`From: ${from} To: ${to} | Generated: ${now.toLocaleString()}`],
//         [], // blank row before table
//       ];

//       // --- Table columns ---
//       const tableHeader = ["Sr No", "Name", "Email", "Mobile", "Registered On"];

//       // Prepare table body
//       const tableBody = data.map((d, index) => {
//         const mobileFormatted = d.Mobile
//           ? d.Mobile.replace("+92", "0").replace(/(\d{4})(\d{7})/, "$1-$2")
//           : "";
//         return [
//           d.Sr_No !== undefined ? d.Sr_No : index + 1, // fallback if Sr_No missing
//           d.Name || "",
//           d.Email || "",
//           mobileFormatted,
//           d.RegisteredOn || "",
//         ];
//       });

//       // Merge header + table
//       const csvData = [...headerRows, tableHeader, ...tableBody];

//       // Convert to CSV manually
//       const csv = csvData
//         .map((row) =>
//           row
//             .map((cell) => `"${cell !== undefined ? cell : ""}"`) // wrap in quotes
//             .join(",")
//         )
//         .join("\r\n");

//       buffer = new TextEncoder().encode(csv);
//       mimeType = "text/csv";
//       ext = "csv";
//     } else {
//       return responseHelper.badRequest("Invalid file type");
//     }

//     return new Response(buffer, {
//       status: 200,
//       headers: {
//         "Content-Type": mimeType,
//         "Content-Disposition": `attachment; filename=customer-report.${ext}`,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return responseHelper.serverError(
//       "Something went wrong while generating report"
//     );
//   }
// }


import User from "@/models/User";
import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import { generateReport } from "@/lib/ReportGenerator";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return responseHelper.badRequest("from and to dates are required");
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    // --- Fetch users ---
    const users = await User.find({
      role: "customer",
      createdAt: { $gte: fromDate, $lte: toDate },
    }).select("name email mobile createdAt -_id");

    if (!users.length) {
      return responseHelper.notFound("No customer data found for selected dates");
    }

    // --- Map to report data ---
    const data = users.map((u, i) => ({
      SrNo: i + 1,
      Name: u.name,
      Email: u.email,
      Mobile: u.mobile,
      RegisteredOn: u.createdAt.toISOString().split("T")[0],
    }));

    const columns = [
      { key: "SrNo", label: "Sr No" },
      { key: "Name" },
      { key: "Email" },
      { key: "Mobile" },
      { key: "RegisteredOn", label: "Registered On" },
    ];

    // --- Generate PDF/CSV ---
    const { buffer, mimeType, ext } = await generateReport({
      data,
      columns,
      reportType: type,
      from,
      to,
      companyName: "Bottom's Hub",
    });

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename=customer-report.${ext}`,
      },
    });
  } catch (err) {
    console.error(err);
    return responseHelper.serverError("Something went wrong while generating report");
  }
}
