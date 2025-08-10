
import responseHelper from "@/lib/responseHelper";
import Category from "@/models/Category";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
export const dynamic = "force-dynamic";

export async function GET() {
 
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return responseHelper.success({ data: categories }, "Categories fetched");
  } catch (err) {
    console.error("Admin GET Categories Error:", err);
    return responseHelper.serverError("Failed to fetch categories");
  }
}




export async function POST(req) {
  await connectDb();

  try {
    const body = await req.json();
    const { name, slug, description, image } = body;

    if (!name || !image) {
      return responseHelper.badRequest("Name and image are required");
    }

    // Upload image to Cloudinary
    const { url: imageUrl, thumbnailUrl } = await uploadImageToCloudinary(
      image,
      "bottomshub/categories"
    );

    // Check if category already exists
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) return responseHelper.badRequest("Category already exists");

    // Create new category
    const category = await Category.create({
      name: name.trim(),
      slug: slug.trim(),
      description,
      imageUrl,
      thumbnailUrl,
    });

    return responseHelper.success({ data: category }, "Category created");
  } catch (err) {
    console.error("Admin POST Category Error:", err);
    return responseHelper.serverError("Failed to create category");
  }
}
