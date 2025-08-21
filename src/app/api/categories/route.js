
// GET All Categories

import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectDb();
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit")) || 0; // 0 = no limit
    
    let query = Category.find().sort({ createdAt: -1 });

    if (limit > 0) query = query.limit(limit);

    const categories = await query;
    // console.log("categories", categories)
    return responseHelper.success({ data: categories }, "Categories fetched");
  } catch (err) {
    console.error("GET Categories Error:", err);
    return responseHelper.serverError("Failed to fetch categories");
  }
}
