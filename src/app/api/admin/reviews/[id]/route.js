// src/app/api/admin/reviews/[id]/route.js
import { connectDb } from "@/lib/connectDb";
import Review from "@/models/Review";
import responseHelper from "@/lib/responseHelper";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  await connectDb();
  try {
    const { id } = params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return responseHelper.badRequest("Invalid review id");
    }

    const review = await Review.findById(id)
      .populate("user", "name email")
      .populate("product", "name sku")
      .lean();

    if (!review) return responseHelper.badRequest("Review not found");

    return responseHelper.success({ data: review });
  } catch (err) {
    console.error("Admin GET Review Error:", err);
    return responseHelper.serverError("Failed to fetch review");
  }
}

export async function PUT(req, { params }) {
  await connectDb();
  try {
    const { id } = params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return responseHelper.badRequest("Invalid review id");
    }

    const body = await req.json();
    const { rating, comment } = body;

    const update = {};
    if (rating !== undefined) {
      const r = Number(rating);
      if (Number.isNaN(r) || r < 1 || r > 5) {
        return responseHelper.badRequest("Rating must be between 1 and 5");
      }
      update.rating = r;
    }
    if (comment !== undefined) update.comment = comment;

    const updated = await Review.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    })
      .populate("user", "name email")
      .populate("product", "name")
      .lean();

    if (!updated) return responseHelper.badRequest("Review not found");

    return responseHelper.success({ data: updated }, "Review updated");
  } catch (err) {
    console.error("Admin PUT Review Error:", err);
    return responseHelper.serverError("Failed to update review");
  }
}

export async function DELETE(req, { params }) {
  await connectDb();
  try {
    const { id } = params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return responseHelper.badRequest("Invalid review id");
    }

    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) return responseHelper.badRequest("Review not found");

    return responseHelper.success({}, "Review deleted");
  } catch (err) {
    console.error("Admin DELETE Review Error:", err);
    return responseHelper.serverError("Failed to delete review");
  }
}
