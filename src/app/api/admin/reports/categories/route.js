import Category from "@/models/Category";
import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import { generateReport } from "@/lib/ReportGenerator";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // csv | pdf
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return responseHelper.badRequest("from and to dates are required");
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    // --- Fetch categories ---
    const categories = await Category.find({
      createdAt: { $gte: fromDate, $lte: toDate },
    }).select("name slug description imageUrl thumbnailUrl createdAt -_id");

    if (!categories.length) {
      return responseHelper.notFound(
        "No category data found for selected dates"
      );
    }

    // // --- Map to report data ---
    // const data = categories.map((cat, i) => ({
    //   SrNo: i + 1,
    //   Name: cat.name,
    //   Slug: cat.slug,
    //   Description: cat.description || "N/A",
    //   Image: type === "pdf" ? "Yes" : cat.imageUrl || "N/A",
    //   Thumbnail: type === "pdf" ? "Yes" : cat.thumbnailUrl || "N/A",
    //   CreatedOn: cat.createdAt.toISOString().split("T")[0],
    // }));

    function truncateText(text, maxLength = 50) {
      if (!text) return "N/A";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    }

    const data = categories.map((cat, i) => ({
      SrNo: i + 1,
      Name: type === "pdf" ? truncateText(cat.name, 30) : cat.name, // limit name length
      Slug: cat.slug,
      Description:
        type === "pdf"
          ? truncateText(cat.description, 60)
          : cat.description || "N/A",
      Image: type === "pdf" ? "Yes" : cat.imageUrl || "N/A",
      Thumbnail: type === "pdf" ? "Yes" : cat.thumbnailUrl || "N/A",
      CreatedOn: cat.createdAt.toISOString().split("T")[0],
    }));

    // const columns = [
    //   { key: "SrNo", label: "Sr No", align: "center" },
    //   { key: "Name" },
    //   { key: "Slug" },
    //   { key: "Description", align: "left" },
    //   { key: "Image" },
    //   { key: "Thumbnail", align: "center" },
    //   { key: "CreatedOn", label: "Created On", align: "center" },
    // ];

    const columns = [
      { key: "SrNo", label: "Sr No", align: "center" },
      { key: "Name", align: "left" },
      { key: "Slug" },
      { key: "Description", align: "left" },
      { key: "Image", align: "center", styles: { cellWidth: 25 } },
      { key: "Thumbnail", align: "center", styles: { cellWidth: 25 } },
      {
        key: "CreatedOn",
        label: "Created On",
        align: "center",
        styles: { cellWidth: 25 },
      },
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
        "Content-Disposition": `attachment; filename=category-report.${ext}`,
      },
    });
  } catch (err) {
    console.error(err);
    return responseHelper.serverError(
      "Something went wrong while generating category report"
    );
  }
}
