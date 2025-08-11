// src/app/api/admin/reviews/route.js
import { connectDb } from "@/lib/connectDb";
import Review from "@/models/Review";
import responseHelper from "@/lib/responseHelper";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectDb();

  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "20"));
    const skip = (page - 1) * limit;

    const productId = searchParams.get("productId");
    const userId = searchParams.get("userId");
    const rating = searchParams.get("rating"); // numeric
    const search = searchParams.get("search"); // search in comment or user email/name
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const filter = {};

    if (productId) filter.product = productId;
    if (userId) filter.user = userId;
    if (rating) filter.rating = parseInt(rating);

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    // Base query
    let query = Review.find(filter);

    // If search provided, do a text-like search on comment (and we'll also try to join later)
    if (search) {
      const regex = new RegExp(search, "i");
      query = query.find({ comment: regex });
    }

    // count
    const total = await Review.countDocuments(query.getFilter());

    // fetch with populate user and product (select only useful fields)
    const reviews = await query
      .populate("user", "name email")
      .populate("product", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return responseHelper.success({
      data: { reviews, total, page, pages: Math.ceil(total / limit) || 1 },
    });
  } catch (err) {
    console.error("Admin GET Reviews Error:", err);
    return responseHelper.serverError("Failed to fetch reviews");
  }
}
