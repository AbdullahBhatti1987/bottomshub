import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Product from "@/models/Product";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

export const dynamic = "force-dynamic";

// GET All Products
export async function GET() {
  await connectDb();
  try {
    const products = await Product.find().populate("category").sort({ createdAt: -1 });
    return responseHelper.success({ data: products }, "Products fetched");
  } catch (err) {
    console.error("Admin GET Products Error:", err);
    return responseHelper.serverError("Failed to fetch products");
  }
}

// POST Create Product
export async function POST(req) {
  await connectDb();

  try {
    const body = await req.json();
    const {
      name,
      slug,
      description,
      price,
      originalPrice,
      category,
      tags,
      sizes,
      discount,
      images,
      inStock,
      isFeatured
    } = body;

    if (!name || !slug || !price || !category || !images?.length) {
      return responseHelper.badRequest("Required fields missing");
    }

    // Check duplicate
    const exists = await Product.findOne({ slug: slug.trim() });
    if (exists) return responseHelper.badRequest("Product already exists");

    // Upload images to Cloudinary
    const uploadedImages = [];
    for (const img of images) {
      const uploaded = await uploadImageToCloudinary(img, "bottomshub/products");
      uploadedImages.push(uploaded.url);
    }

    // Create product
    const product = await Product.create({
      name: name.trim(),
      slug: slug.trim(),
      description,
      price,
      originalPrice,
      category,
      tags,
      sizes,
      discount,
      images: uploadedImages,
      inStock,
      isFeatured,
    });

    return responseHelper.success({ data: product }, "Product created");
  } catch (err) {
    console.error("Admin POST Product Error:", err);
    return responseHelper.serverError("Failed to create product");
  }
}
