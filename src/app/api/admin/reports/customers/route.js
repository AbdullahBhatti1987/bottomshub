// // /app/api/admin/reports/customers/route.js
// import { NextResponse } from "next/server";
// import { jsPDF } from "jspdf";
// import { Parser } from "json2csv";
// import User from "@/models/User";
// import { connectDb } from "@/lib/connectDb";
// import responseHelper from "@/lib/responseHelper";

// export async function GET(req) {
//   try {
//     await connectDb();

//     const { searchParams } = new URL(req.url);
//     const type = searchParams.get("type");
//     const from = searchParams.get("from");
//     const to = searchParams.get("to");

//     if (!from || !to) {
//       return NextResponse.json(
//         { error: "from and to dates are required" },
//         { status: 400 }
//       );
//     }

//     // Parse dates for querying
//     const fromDate = new Date(from);
//     const toDate = new Date(to);
//     // Set toDate end of the day for inclusive filtering
//     toDate.setHours(23, 59, 59, 999);

//     // Fetch users registered in date range
//     const users = await User.find({
//       role: "customer",
//       createdAt: { $gte: fromDate, $lte: toDate },
//     }).select("name email mobile createdAt -_id"); // role excluded

//     const data = users.map((u, i) => ({
//       SrNo: i + 1,
//       Name: u.name,
//       Email: u.email,
//       Mobile: u.mobile,
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
//       const doc = new jsPDF();
//       doc.text(`Customer Report from ${from} to ${to}`, 10, 10);
//       data.forEach((item, i) => {
//         const line = `${item.SrNo}. ${item.Name} | ${item.Email} | ${item.Mobile} | ${item.RegisteredOn}`;
//         doc.text(line, 10, 20 + i * 10);
//       });
//       buffer = doc.output("arraybuffer");
//       mimeType = "application/pdf";
//       ext = "pdf";
//     } else if (type === "csv") {
//       const parser = new Parser({
//         fields: ["SrNo", "Name", "Email", "Mobile", "RegisteredOn"],
//       });
//       const csv = parser.parse(data);
//       buffer = new TextEncoder().encode(csv);
//       mimeType = "text/csv";
//       ext = "csv";
//     } else {
//       return responseHelper.badRequest("Invalid file type");
//     }

//     return new NextResponse(buffer, {
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


import { jsPDF } from "jspdf";
import { Parser } from "json2csv";
import User from "@/models/User";
import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";

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

    const users = await User.find({
      role: "customer",
      createdAt: { $gte: fromDate, $lte: toDate },
    }).select("name email mobile createdAt -_id");

    const data = users.map((u, i) => ({
      SrNo: i + 1,
      Name: u.name,
      Email: u.email,
      Mobile: u.mobile,
      RegisteredOn: u.createdAt.toISOString().split("T")[0],
    }));

    if (data.length === 0) {
      // Use badRequest or serverError or custom response (404 not found)
      return responseHelper.badRequest("No customer data found for selected dates");
    }

    let buffer;
    let mimeType;
    let ext;

    if (type === "pdf") {
      const doc = new jsPDF();
      doc.text(`Customer Report from ${from} to ${to}`, 10, 10);
      data.forEach((item, i) => {
        const line = `${item.SrNo}. ${item.Name} | ${item.Email} | ${item.Mobile} | ${item.RegisteredOn}`;
        doc.text(line, 10, 20 + i * 10);
      });
      buffer = doc.output("arraybuffer");
      mimeType = "application/pdf";
      ext = "pdf";
    } else if (type === "csv") {
      const parser = new Parser({
        fields: ["SrNo", "Name", "Email", "Mobile", "RegisteredOn"],
      });
      const csv = parser.parse(data);
      buffer = new TextEncoder().encode(csv);
      mimeType = "text/csv";
      ext = "csv";
    } else {
      return responseHelper.badRequest("Invalid file type");
    }

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename=customer-report.${ext}`,
      },
    });
  } catch (err) {
    console.error(err);
    return responseHelper.serverError(
      "Something went wrong while generating report"
    );
  }
}











// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const type = searchParams.get("type");
//     const from = searchParams.get("from");
//     const to = searchParams.get("to");

//     // TODO: Fetch your DB data here based on from/to
//     const data = [
//       { name: "John Doe", amount: 200, date: "2025-08-01" },
//       { name: "Jane Smith", amount: 300, date: "2025-08-05" },
//     ];

//     let buffer;
//     let mimeType;
//     let ext;

//     if (type === "pdf") {
//       const doc = new jsPDF();
//       doc.text(`Report from ${from} to ${to}`, 10, 10);
//       data.forEach((item, i) => {
//         doc.text(`${i + 1}. ${item.name} - $${item.amount}`, 10, 20 + i * 10);
//       });
//       buffer = doc.output("arraybuffer");
//       mimeType = "application/pdf";
//       ext = "pdf";
//     } else if (type === "csv") {
//       const parser = new Parser();
//       const csv = parser.parse(data);
//       buffer = new TextEncoder().encode(csv);
//       mimeType = "text/csv";
//       ext = "csv";
//     } else {
//       return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
//     }

//     return new NextResponse(buffer, {
//       headers: {
//         "Content-Type": mimeType,
//         "Content-Disposition": `attachment; filename=report.${ext}`,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }
