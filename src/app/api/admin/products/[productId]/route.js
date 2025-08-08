import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Product from "@/models/Product";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

export const dynamic = "force-dynamic";

// GET One Product
export async function GET(req, { params }) {
  await connectDb();
  try {
    const product = await Product.findById(params.productId).populate("category");
    if (!product) return responseHelper.badRequest("Product not found");
    return responseHelper.success({ data: product }, "Product fetched");
  } catch (err) {
    console.error("Admin GET Product Error:", err);
    return responseHelper.serverError("Failed to fetch product");
  }
}

// PUT Update Product
export async function PUT(req, { params }) {
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

    const product = await Product.findById(params.productId);
    if (!product) return responseHelper.badRequest("Product not found");

    let updatedImages = product.images;

    if (images?.length) {
      updatedImages = [];
      for (const img of images) {
        if (img.startsWith("http")) {
          updatedImages.push(img); // already hosted
        } else {
          const uploaded = await uploadImageToCloudinary(img, "bottomshub/products");
          updatedImages.push(uploaded.url);
        }
      }
    }

    const updated = await Product.findByIdAndUpdate(
      params.productId,
      {
        name: name?.trim() || product.name,
        slug: slug?.trim() || product.slug,
        description: description ?? product.description,
        price: price ?? product.price,
        originalPrice: originalPrice ?? product.originalPrice,
        category: category ?? product.category,
        tags: tags ?? product.tags,
        sizes: sizes ?? product.sizes,
        discount: discount ?? product.discount,
        images: updatedImages,
        inStock: inStock ?? product.inStock,
        isFeatured: isFeatured ?? product.isFeatured,
      },
      { new: true }
    );

    return responseHelper.success({ data: updated }, "Product updated");
  } catch (err) {
    console.error("Admin PUT Product Error:", err);
    return responseHelper.serverError("Failed to update product");
  }
}

// DELETE Product
export async function DELETE(req, { params }) {
  await connectDb();
  try {
    const deleted = await Product.findByIdAndDelete(params.productId);
    if (!deleted) return responseHelper.badRequest("Product not found");
    return responseHelper.success({ data: deleted }, "Product deleted");
  } catch (err) {
    console.error("Admin DELETE Product Error:", err);
    return responseHelper.serverError("Failed to delete product");
  }
}
