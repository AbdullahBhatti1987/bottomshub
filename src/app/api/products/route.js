// import { connectDb } from "@/lib/connectDb";
// import responseHelper from "@/lib/responseHelper";
// import Product from "@/models/Product";

// export const dynamic = "force-dynamic";

// // GET Products with Pagination & Category Filter
// export async function GET(req) {
//   await connectDb();

//   try {
//     const url = new URL(req.url);
//     const page = parseInt(url.searchParams.get("page")) || 1;
//     const limit = parseInt(url.searchParams.get("limit")) || 10;
//     const search = url.searchParams.get("search") || "";
//     const category = url.searchParams.get("category") || "";
//     const minPrice = url.searchParams.get("minPrice");
//     const maxPrice = url.searchParams.get("maxPrice");

//     const query = {};

//     // Search by product name
//     if (search) {
//       query.name = { $regex: search, $options: "i" };
//     }

//     // Filter by category slug
//     if (category) {
//       query.category = category; // make sure Product.category stores slug
//     }

//     // Filter by price range
//     if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
//     if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

//     // Count total matching products
//     const total = await Product.countDocuments(query);

//     // Fetch products with pagination, latest first
//     const products = await Product.find(query)
//       .populate("category") // optional
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     return responseHelper.success(
//       {
//         data: products,
//         page,
//         totalPages: Math.ceil(total / limit),
//         total,
//       },
//       "Products fetched"
//     );
//   } catch (err) {
//     console.error("GET Products Error:", err);
//     return responseHelper.serverError("Failed to fetch products");
//   }
// }




import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Product from "@/models/Product";
import Category from "@/models/Category"; // Add this import

export const dynamic = "force-dynamic";

// GET Products with Pagination & Category Filter
export async function GET(req) {
  await connectDb();

  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const search = url.searchParams.get("search") || "";
    const categorySlug = url.searchParams.get("category") || "";
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");

    const query = {};

    // Search by product name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by category slug
    if (categorySlug) {
      // Find category ObjectId by slug
      const cat = await Category.findOne({ slug: categorySlug });
      if (cat) query.category = cat._id; // ObjectId for Product.category
    }

    // Filter by price range
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    // Count total matching products
    const total = await Product.countDocuments(query);

    // Fetch products with pagination, latest first
    const products = await Product.find(query)
      .populate("category") // optional
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return responseHelper.success(
      {
        data: products,
        page,
        totalPages: Math.ceil(total / limit),
        total,
      },
      "Products fetched"
    );
  } catch (err) {
    console.error("GET Products Error:", err);
    return responseHelper.serverError("Failed to fetch products");
  }
}
