import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Product from "@/models/Product";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

export const dynamic = "force-dynamic";

// // GET All Products
//   export async function GET(req, context) {
//     const { params } = await context;
//   await connectDb();
//   try {
//     const products = await Product.find()
//       .populate("category")
//       .sort({ createdAt: -1 });
//     return responseHelper.success({ data: products }, "Products fetched");
//   } catch (err) {
//     console.error("Admin GET Products Error:", err);
//     return responseHelper.serverError("Failed to fetch products");
//   }
// }

export async function GET(req, context) {
  await connectDb();

  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "";

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .populate("category")
      .sort({ createdAt: -1 });

    return responseHelper.success({ data: products }, "Products fetched");
  } catch (err) {
    console.error("Admin GET Products Error:", err);
    return responseHelper.serverError("Failed to fetch products");
  }
}

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
      images, // base64 images or URLs from client
      inStock,
      isFeatured,
    } = body;

    // Validation
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!slug) missingFields.push("slug");
    if (!price) missingFields.push("price");
    if (!category) missingFields.push("category");
    if (!images?.length) missingFields.push("images");

    if (missingFields.length > 0) {
      return responseHelper.badRequest({
        message: "Some required fields are missing",
        missingFields,
      });
    }

    // Duplicate slug check
    const exists = await Product.findOne({ slug: slug.trim() });
    if (exists) {
      return responseHelper.badRequest({
        message: "Product already exists with this slug",
        field: "slug",
      });
    }

    // Upload images and thumbnails to Cloudinary
    const uploadedImages = [];
    for (const img of images) {
      const uploaded = await uploadImageToCloudinary(
        img,
        "bottomshub/products"
      );
      uploadedImages.push({
        url: uploaded.url,
        thumbnailUrl: uploaded.thumbnailUrl,
      });
    }

    for (const img of images) {
      const uploaded = await uploadImageToCloudinary(
        img,
        "bottomshub/products"
      );
      console.log("Uploaded image info:", uploaded);
      uploadedImages.push({
        url: uploaded.url,
        thumbnailUrl: uploaded.thumbnailUrl,
      });
    }

    // Create new product with images array of objects
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
      images: uploadedImages, // <-- IMPORTANT: directly pass array of {url, thumbnailUrl}
      inStock,
      isFeatured,
    });

    return responseHelper.success({ data: product }, "Product created");
  } catch (err) {
    console.error("Admin POST Product Error:", err);
    return responseHelper.serverError("Failed to create product");
  }
}
