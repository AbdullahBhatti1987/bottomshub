import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { startOfDay, endOfDay } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDb();

  try {
    const [userCount, productCount, orderStats, todayOrders] =
      await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.aggregate([
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalAmount" },
              totalOrders: { $sum: 1 },
              pendingOrders: {
                $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
              },
            },
          },
        ]),
        Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfDay(new Date()),
                $lte: endOfDay(new Date()),
              },
            },
          },
          {
            $group: {
              _id: null,
              todaySales: { $sum: "$totalAmount" },
              todayOrders: { $sum: 1 },
            },
          },
        ]),
      ]);

    const overview = {
      users: userCount,
      products: productCount,
      totalOrders: orderStats[0]?.totalOrders || 0,
      totalSales: orderStats[0]?.totalSales || 0,
      pendingOrders: orderStats[0]?.pendingOrders || 0,
      todaySales: todayOrders[0]?.todaySales || 0,
      todayOrders: todayOrders[0]?.todayOrders || 0,
    };

    return responseHelper.success({ data: overview }, "Overview fetched");
  } catch (error) {
    console.error("Admin Overview Error:", error);
    return responseHelper.serverError("Failed to fetch admin overview");
  }
}
