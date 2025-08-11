import { connectDb } from "@/lib/connectDb";
import Brand from "@/models/Brand";
import responseHelper from "@/lib/responseHelper";

export async function GET(req) {
  await connectDb();
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) return responseHelper.notFound("Brand not found");
    return responseHelper.success(brand);
  } catch (error) {
    return responseHelper.serverError("Failed to fetch brand");
  }
}

export async function PUT(req) {
  await connectDb();
  try {
    const { id } = req.params;
    const updates = await req.json();

    const updatedBrand = await Brand.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBrand) return responseHelper.notFound("Brand not found");

    return responseHelper.success(updatedBrand, "Brand updated successfully");
  } catch (error) {
    return responseHelper.serverError("Failed to update brand");
  }
}

export async function DELETE(req) {
  await connectDb();
  try {
    const { id } = req.params;

    // Soft delete: set isActive to false
    const deletedBrand = await Brand.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!deletedBrand) return responseHelper.notFound("Brand not found");

    return responseHelper.success(null, "Brand deleted successfully");
  } catch (error) {
    return responseHelper.serverError("Failed to delete brand");
  }
}
