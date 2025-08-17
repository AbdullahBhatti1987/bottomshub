// app/api/products/[slug]/route.js
import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  await connectDb();

  try {
    const { slug } = params;

    if (!slug) {
      return responseHelper.badRequest({ message: "Slug is required" });
    }

    // Fetch product by slug and populate category
    const product = await Product.findOne({ slug })
      .populate("category", "name")
      .lean();

    if (!product) {
      return responseHelper.notFound({ message: "Product not found" });
    }

    return responseHelper.success({ data: product }, "Product fetched successfully");
  } catch (err) {
    console.error("Error fetching product:", err);
    return responseHelper.serverError("Failed to fetch product");
  }
}
