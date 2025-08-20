import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Product from "@/models/Product";
import Wishlist from "@/models/Wishlist";

export async function GET() {
  await connectDb();

  try {
    // Find all products with count of how many wishlists they are in
    const topProducts = await Wishlist.aggregate([
      { $unwind: "$products" },
      { $group: { _id: "$products", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }, // top 10 products
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $replaceRoot: { newRoot: "$product" } },
    ]);

    return responseHelper.success({ data: topProducts }, "Top products fetched");
  } catch (err) {
    console.error(err);
    return responseHelper.serverError("Failed to fetch top products");
  }
}
