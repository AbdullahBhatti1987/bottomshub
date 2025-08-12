// // src/app/api/users/route.js
// import { connectDb } from "@/lib/connectDb";
// import User from "@/models/User";
// import responseHelper from "@/lib/responseHelper";

// export async function GET() {
//   await connectDb();
//   try {
//     const users = await User.find().sort({ createdAt: -1 });
//     console.log("Fetched users:");
//     return responseHelper.successArray(users);
//   } catch (error) {
//     return responseHelper.serverError("Failed to fetch users");
//   }
// }



// src/app/api/admin/users/route.js
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import responseHelper from "@/lib/responseHelper";

export async function GET(req) {
  await connectDb();

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
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { mobile: { $regex: search, $options: "i" } },
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

    const result = await User.aggregate(pipeline);

    const users = result[0]?.data || [];
    const totalCount = result[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limitNum);

    return responseHelper.success({
      users,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNum,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return responseHelper.serverError("Failed to fetch users");
  }
}
