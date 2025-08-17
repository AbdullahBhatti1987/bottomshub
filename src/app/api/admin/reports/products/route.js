import Product from "@/models/Product";
import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import { generateReport } from "@/lib/ReportGenerator";

// export async function GET(req) {
//   try {
//     await connectDb();

//     const { searchParams } = new URL(req.url);
//     const type = searchParams.get("type"); // csv | pdf
//     const from = searchParams.get("from");
//     const to = searchParams.get("to");

//     if (!from || !to) {
//       return responseHelper.badRequest("from and to dates are required");
//     }

//     const fromDate = new Date(from);
//     const toDate = new Date(to);
//     toDate.setHours(23, 59, 59, 999);

//     // --- Fetch products with category populated ---
//     const products = await Product.find({
//       createdAt: { $gte: fromDate, $lte: toDate },
//     })
//       .populate("category", "name")
//       .select(
//         "name slug description price originalPrice category images createdAt -_id"
//       );

//     if (!products.length) {
//       return responseHelper.notFound(
//         "No product data found for selected dates"
//       );
//     }

//     function truncateText(text, maxLength = 50) {
//       if (!text) return "N/A";
//       return text.length > maxLength
//         ? text.substring(0, maxLength) + "..."
//         : text;
//     }

//     // --- Map to report data ---
//     const data = products.map((prod, i) => ({
//       SrNo: i + 1,
//       Name: type === "pdf" ? truncateText(prod.name, 30) : prod.name,
//       Slug: prod.slug,
//       Description:
//         type === "pdf"
//           ? truncateText(prod.description, 60)
//           : prod.description || "N/A",
//       Category: prod.category?.name || "N/A",
//       Price: prod.price,
//       OriginalPrice: prod.originalPrice || 0,
//       Images: prod.images?.length || 0, // count
//       Thumbnails: prod.images?.length || 0, // same count
//       CreatedOn: prod.createdAt.toISOString().split("T")[0],
//     }));

//     const columns = [
//       { key: "SrNo", label: "Sr No", align: "center" },
//       { key: "Name", align: "left" },
//       { key: "Slug", align: "left" },
//       { key: "Description", align: "left" },
//       { key: "Category", align: "left" },
//       { key: "Price", align: "right" },
//       { key: "OriginalPrice", label: "Original Price", align: "right" },
//       { key: "Images", align: "center" },
//       { key: "Thumbnails", align: "center" },
//       { key: "CreatedOn", label: "Created On", align: "center" },
//     ];

//     // --- Generate PDF/CSV ---
//     const { buffer, mimeType, ext } = await generateReport({
//       data,
//       columns,
//       reportType: type,
//       from,
//       to,
//       itemLabel: "Products",
//       reportTitle: "Product Report",
//       companyName: "Bottom's Hub",
//     });

//     return new Response(buffer, {
//       status: 200,
//       headers: {
//         "Content-Type": mimeType,
//         "Content-Disposition": `attachment; filename=product-report.${ext}`,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return responseHelper.serverError(
//       "Something went wrong while generating product report"
//     );
//   }
// }


export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // csv | pdf
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const orientation = searchParams.get("orientation") || "portrait";

    if (!from || !to) {
      return responseHelper.badRequest("from and to dates are required");
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    const products = await Product.find({
      createdAt: { $gte: fromDate, $lte: toDate },
    })
      .populate("category", "name")
      .select(
        "name slug shortDescription description price originalPrice sku quantity discountValue sizes tags inStock isFeatured category images createdAt"
      );

    if (!products.length) {
      return responseHelper.notFound(
        "No product data found for selected dates"
      );
    }

    // --- Map to report data (all fields) ---
    const data = products.map((prod, i) => ({
      SrNo: i + 1,
      Name: prod.name,
      Slug: prod.slug,
      SKU: prod.sku,
      Description: prod.description || "N/A",
      ShortDescription: prod.shortDescription || "N/A",
      Category: prod.category?.name || "N/A",
      Price: prod.price,
      OriginalPrice: prod.originalPrice || 0,
      Quantity: prod.quantity || 0,
      DiscountValue: prod.discountValue || 0,
      Sizes: prod.sizes?.join(", ") || "",
      Tags: prod.tags?.join(", ") || "",
      Stock: prod.inStock ? "Yes" : "No",
      Featured: prod.isFeatured ? "Yes" : "No",
      Images: prod.images?.length || 0,
      Thumbnails: prod.images?.length || 0,
      CreatedOn: prod.createdAt.toISOString().split("T")[0],
    }));

    const columns = [
      { key: "SrNo", label: "Sr No", align: "center" },
      { key: "Name", align: "left" },
      { key: "Slug", align: "left" },
      { key: "SKU", align: "left" },
      { key: "Description", align: "left" },
      { key: "ShortDescription", label: "Short Description", align: "left" },
      { key: "Category", align: "left" },
      { key: "Price", align: "right" },
      { key: "OriginalPrice", label: "Original Price", align: "right" },
      { key: "Quantity", align: "center" },
      { key: "DiscountValue", label: "Discount", align: "center" },
      { key: "Sizes", align: "left" },
      { key: "Tags", align: "left" },
      { key: "Stock", align: "center" },
      { key: "Featured", align: "center" },
      { key: "Images", align: "center" },
      { key: "Thumbnails", align: "center" },
      { key: "CreatedOn", label: "Created On", align: "center" },
    ];

    const { buffer, mimeType, ext } = await generateReport({
      data,
      columns,
      reportType: type,
      from,
      to,
      itemLabel: "Products",
      reportTitle: "Product Report",
      companyName: "Bottom's Hub",
      orientation, // <-- pass orientation
    });

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename=product-report.${ext}`,
      },
    });
  } catch (err) {
    console.error(err);
    return responseHelper.serverError(
      "Something went wrong while generating product report"
    );
  }
}
