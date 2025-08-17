// import { connectDb } from "@/lib/connectDb";
// import responseHelper from "@/lib/responseHelper";
// import Product from "@/models/Product";
// import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

// export const dynamic = "force-dynamic";

// export async function GET(req, context) {
//   await connectDb();

//   try {
//     const url = new URL(req.url);
//     const search = url.searchParams.get("search") || "";
//     const category = url.searchParams.get("category") || "";

//     const query = {};

//     if (search) {
//       query.name = { $regex: search, $options: "i" }; // case-insensitive search
//     }

//     if (category) {
//       query.category = category;
//     }

//     const products = await Product.find(query)
//       .populate("category")
//       .sort({ createdAt: -1 });

//     return responseHelper.success({ data: products }, "Products fetched");
//   } catch (err) {
//     console.error("Admin GET Products Error:", err);
//     return responseHelper.serverError("Failed to fetch products");
//   }
// }

// export async function POST(req) {
//   await connectDb();

//   try {
//     const body = await req.json();
//     const {
//       name,
//       slug,
//       description,
//       price,
//       originalPrice,
//       category,
//       tags,
//       sizes,
//       discount,
//       images, // base64 images or URLs from client
//       inStock,
//       isFeatured,
//     } = body;

//     // Validation
//     const missingFields = [];
//     if (!name) missingFields.push("name");
//     if (!slug) missingFields.push("slug");
//     if (!price) missingFields.push("price");
//     if (!category) missingFields.push("category");
//     if (!images?.length) missingFields.push("images");

//     if (missingFields.length > 0) {
//       return responseHelper.badRequest({
//         message: "Some required fields are missing",
//         missingFields,
//       });
//     }

//     // Duplicate slug check
//     const exists = await Product.findOne({ slug: slug.trim() });
//     if (exists) {
//       return responseHelper.badRequest({
//         message: "Product already exists with this slug",
//         field: "slug",
//       });
//     }

//     // Upload images and thumbnails to Cloudinary
//     const uploadedImages = [];
//     for (const img of images) {
//       const uploaded = await uploadImageToCloudinary(
//         img,
//         "bottomshub/products"
//       );
//       uploadedImages.push({
//         url: uploaded.url,
//         thumbnailUrl: uploaded.thumbnailUrl,
//       });
//     }



//     // Create new product with images array of objects
//     const product = await Product.create({
//       name: name.trim(),
//       slug: slug.trim(),
//       description,
//       price,
//       originalPrice,
//       category,
//       tags,
//       sizes,
//       discount,
//       images: uploadedImages, // <-- IMPORTANT: directly pass array of {url, thumbnailUrl}
//       inStock,
//       isFeatured,
//     });

//     return responseHelper.success({ data: product }, "Product created");
//   } catch (err) {
//     console.error("Admin POST Product Error:", err);
//     return responseHelper.serverError("Failed to create product");
//   }
// }




import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Product from "@/models/Product";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

export const dynamic = "force-dynamic";

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
    console.log("Body", body)
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      originalPrice,
      category,
      sku,
      sizes,
      tags,
      discountApplied,
      discount,
      images,
      inStock,
      isFeatured,
    } = body;

    // Validation
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!slug) missingFields.push("slug");
    if (!price) missingFields.push("price");
    if (!category) missingFields.push("category");
    if (!sku) missingFields.push("sku");
    if (!tags) missingFields.push("tags");
    if (!images?.length) missingFields.push("images");

    if (discountApplied) {
      if (!discount?.type) missingFields.push("discount.type");
      if (discount?.value == null) missingFields.push("discount.value");
    }

    if (!sizes?.length) missingFields.push("sizes");

    if (missingFields.length > 0) {
      return responseHelper.badRequest({
        message: "Some required fields are missing",
        missingFields,
      });
    }

    // Duplicate slug check
    const existsSlug = await Product.findOne({ slug: slug.trim() });
    if (existsSlug) {
      return responseHelper.badRequest({
        message: "Product already exists with this slug",
        field: "slug",
      });
    }

    // Duplicate SKU check
    const existsSKU = await Product.findOne({ sku: sku.trim() });
    if (existsSKU) {
      return responseHelper.badRequest({
        message: "Product already exists with this SKU",
        field: "sku",
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

    // Map sizes to required format {size, quantity}
    const formattedSizes = sizes
      .filter((s) => s.size && s.quantity > 0) // only include sizes with quantity > 0
      .map((s) => ({
        size: s.size,
        quantity: s.quantity,
      }));

    // Create new product
    const product = await Product.create({
      name: name.trim(),
      slug: slug.trim(),
      description: description || "",
      shortDescription: shortDescription || "",
      price,
      originalPrice: originalPrice || 0,
      category,
      sku: sku.trim(),
      sizes: formattedSizes,
      tags: tags || "",
      discountApplied: discountApplied || false,
      discount: discountApplied ? discount : undefined,
      images: uploadedImages,
      inStock: inStock !== undefined ? inStock : true,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
    });

    return responseHelper.success({ data: product }, "Product created");
  } catch (err) {
    console.error("Admin POST Product Error:", err);
    return responseHelper.serverError("Failed to create product");
  }
}





// last updated
// export async function POST(req) {
//   await connectDb();

//   try {
//     const body = await req.json();
//     const {
//       name,
//       slug,
//       description,
//       shortDescription,
//       price,
//       originalPrice,
//       category,
//       sku,
//       quantity,
//       discountValue,
//       tags,
//       sizes,
//       discount,
//       images, // base64 images or URLs from client
//       inStock,
//       isFeatured,
//     } = body;

//     // Validation
//     const missingFields = [];
//     if (!name) missingFields.push("name");
//     if (!slug) missingFields.push("slug");
//     if (!price) missingFields.push("price");
//     if (!category) missingFields.push("category");
//     if (!sku) missingFields.push("sku");
//     if (!images?.length) missingFields.push("images");

//     if (missingFields.length > 0) {
//       return responseHelper.badRequest({
//         message: "Some required fields are missing",
//         missingFields,
//       });
//     }

//     // Duplicate slug check
//     const existsSlug = await Product.findOne({ slug: slug.trim() });
//     if (existsSlug) {
//       return responseHelper.badRequest({
//         message: "Product already exists with this slug",
//         field: "slug",
//       });
//     }

//     // Duplicate SKU check
//     const existsSKU = await Product.findOne({ sku: sku.trim() });
//     if (existsSKU) {
//       return responseHelper.badRequest({
//         message: "Product already exists with this SKU",
//         field: "sku",
//       });
//     }

//     // Upload images and thumbnails to Cloudinary
//     const uploadedImages = [];
//     for (const img of images) {
//       const uploaded = await uploadImageToCloudinary(
//         img,
//         "bottomshub/products"
//       );
//       uploadedImages.push({
//         url: uploaded.url,
//         thumbnailUrl: uploaded.thumbnailUrl,
//       });
//     }

//     // Create new product with all fields
//     const product = await Product.create({
//       name: name.trim(),
//       slug: slug.trim(),
//       description: description || "",
//       shortDescription: shortDescription || "",
//       price,
//       originalPrice: originalPrice || 0,
//       category,
//       sku: sku.trim(),
//       quantity: quantity || 0,
//       discountValue: discountValue || 0,
//       tags: tags || "",
//       sizes: sizes || [],
//       discount: discount || "flat",
//       images: uploadedImages,
//       inStock: inStock !== undefined ? inStock : true,
//       isFeatured: isFeatured !== undefined ? isFeatured : false,
//     });

//     return responseHelper.success({ data: product }, "Product created");
//   } catch (err) {
//     console.error("Admin POST Product Error:", err);
//     return responseHelper.serverError("Failed to create product");
//   }
// }
