import { connectDb } from '@/lib/connectDb';
import responseHelper from '@/lib/responseHelper';
import Category from '@/models/Category';
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  await connectDb();
  try {
    const category = await Category.findById(params.categoryId);
    if (!category) return responseHelper.badRequest('Category not found');
    return responseHelper.success({ data: category }, 'Category fetched');
  } catch (err) {
    console.error('Admin GET Category Error:', err);
    return responseHelper.serverError('Failed to fetch category');
  }
}
export async function PUT(req, { params }) {
  await connectDb();

  try {
    const body = await req.json();
    const { name, slug, description, image } = body;
      
    // Fetch existing category first
    const category = await Category.findById(params.categoryId);
    if (!category) return responseHelper.badRequest("Category not found");

    // Default to existing values
    let imageUrl = category.imageUrl;
    let thumbnailUrl = category.thumbnailUrl;

    // If new image is provided, upload it
    if (image) {
      const uploaded = await uploadImageToCloudinary(
        image,
        "bottomshub/categories"
      );
      imageUrl = uploaded.url;
      thumbnailUrl = uploaded.thumbnailUrl;
    }

    // Prepare update object (only overwrite if value exists)
    const updatedFields = {
      name: name?.trim() || category.name,
      slug: slug?.trim() || category.slug,
      description: description ?? category.description,
      imageUrl,
      thumbnailUrl,
    };

    // Perform update
    const updated = await Category.findByIdAndUpdate(
      params.categoryId,
      updatedFields,
      { new: true }
    );

    return responseHelper.success({ data: updated }, "Category updated");
  } catch (err) {
    console.error("Admin PUT Category Error:", err);
    return responseHelper.serverError("Failed to update category");
  }
}



export async function DELETE(req, { params }) {
  await connectDb();
  try {
    const deleted = await Category.findByIdAndDelete(params.categoryId);
    if (!deleted) return responseHelper.badRequest('Category not found');
    return responseHelper.success({ data: deleted }, 'Category deleted');
  } catch (err) {
    console.error('Admin DELETE Category Error:', err);
    return responseHelper.serverError('Failed to delete category');
  }
}
