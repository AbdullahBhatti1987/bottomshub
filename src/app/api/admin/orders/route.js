// src/app/api/admin/orders/route.js
import { connectDb } from "@/lib/connectDb";
import Order from "@/models/Order";
import responseHelper from "@/lib/responseHelper";


export const dynamic = "force-dynamic";

export async function GET(req, context) {
  await connectDb();
  console.log("Received request to fetch orders", context);
  console.log("Received request to fetch orders", req);
  try {
    const { search = "", page = 1, limit = 10 } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Search condition
    const searchQuery = search
      ? {
          $or: [
            { orderNumber: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
            { "customer.name": { $regex: search, $options: "i" } },
            { "customer.email": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const pipeline = [
      { $match: searchQuery },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limitNum }],
          totalCount: [{ $count: "count" }],
        },
      },
      {
        $project: {
          data: 1,
          totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ];

    const result = await Order.aggregate(pipeline);

    const orders = result[0]?.data || [];
    const totalCount = result[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limitNum);

    return responseHelper.success({
      orders,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNum,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return responseHelper.serverError("Failed to fetch orders");
  }
}
