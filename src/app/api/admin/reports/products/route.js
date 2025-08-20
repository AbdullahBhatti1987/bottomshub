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
    const orientation = searchParams.get("orientation") || "landscape";

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

    // const sizeOrder = ["small", "medium", "large", "x-large", "xx-large"];
    // const sizesStr = (prod.sizes || [])
    //   .sort((a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size))
    //   .map((s) => `${s.size}-${s.quantity}`)
    //   .join(", ");

    // // --- Map to report data (all fields) ---
    // const data = products.map((prod, i) => ({
    //   SrNo: i + 1,
    //   Name: prod.name,
    //   Slug: prod.slug,
    //   SKU: prod.sku,
    //   Description: prod.description || "N/A",
    //   ShortDescription: prod.shortDescription || "N/A",
    //   Category: prod.category?.name || "N/A",
    //   Price: prod.price,
    //   OriginalPrice: prod.originalPrice || 0,
    //   Quantity: prod.quantity || 0,
    //   DiscountValue: prod.discountValue || 0,
    //   // Sizes: prod.sizes?.join(", ") || "",
    //    Sizes: (prod.sizes || [])
    //         .sort((a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size))
    //         .map(s => `${s.size}-${s.quantity}`)
    //         .join(", "),
    //   Tags: prod.tags || "",
    //   Stock: prod.inStock ? "Yes" : "No",
    //   Featured: prod.isFeatured ? "Yes" : "No",
    //   Images: prod.images?.length || 0,
    //   Thumbnails: prod.images?.length || 0,
    //   CreatedOn: prod.createdAt.toISOString().split("T")[0],
    // }));

    const sizeOrder = ["small", "medium", "large", "x-large", "xx-large"];

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
  Sizes: (prod.sizes || [])
          .sort((a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size))
          .map(s => `${s.size}-${s.quantity}`)
          .join(", "),
  Tags: prod.tags || "",
  Stock: prod.inStock ? "Yes" : "No",
  Featured: prod.isFeatured ? "Yes" : "No",
  Images: prod.images?.length || 0,
  Thumbnails: prod.images?.length || 0,
  CreatedOn: prod.createdAt.toISOString().split("T")[0],
}));


    const columns = [
      { key: "SrNo", label: "Sr No", align: "center", width: 20 },
      { key: "Name", label: "Name", align: "left", width: 60 },
      { key: "Slug", label: "Slug", align: "left", width: 40 },
      { key: "SKU", label: "SKU", align: "left", width: 40 },
      // { key: "Description", label: "Description", align: "left", width: 100 },
      // {
      //   key: "ShortDescription",
      //   label: "Short Desc",
      //   align: "left",
      //   width: 60,
      // },
      { key: "Category", label: "Category", align: "left", width: 40 },
      { key: "Price", label: "Price", align: "right", width: 30 },
      {
        key: "OriginalPrice",
        label: "Original Price",
        align: "right",
        width: 35,
      },
      { key: "Quantity", label: "Qty", align: "center", width: 30 },
      { key: "DiscountValue", label: "Discount", align: "center", width: 30 },
      { key: "Sizes", label: "Sizes", align: "left", width: 50 },
      { key: "Tags", label: "Tags", align: "left", width: 50 },
      { key: "Stock", label: "Stock", align: "center", width: 25 },
      { key: "Featured", label: "Featured", align: "center", width: 25 },
      { key: "Images", label: "Images", align: "center", width: 25 },
      { key: "Thumbnails", label: "Thumbnails", align: "center", width: 25 },
      { key: "CreatedOn", label: "Created On", align: "center", width: 30 },
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
      orientation,
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
