
import responseHelper from "@/lib/responseHelper";
import Category from "@/models/Category";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
import { connectDb } from "@/lib/connectDb";
export const dynamic = "force-dynamic";

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
          name: { $regex: search, $options: "i" },
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

    const result = await Category.aggregate(pipeline);

    const categories = result[0]?.data || [];
    const totalCount = result[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limitNum);

    return responseHelper.success({
      categories,
      pagination: {
        totalCount,
        totalPages,
        currentPage: pageNum,
      },
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
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

    // Check if category already exists
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) return responseHelper.badRequest("Category already exists");


    // Upload image to Cloudinary
    const { url: imageUrl, thumbnailUrl } = await uploadImageToCloudinary(
      image,
      "bottomshub/categories"
    );


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
