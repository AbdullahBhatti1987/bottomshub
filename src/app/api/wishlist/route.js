import Wishlist from '@/models/Wishlist';
import Product from '@/models/Product';

export async function GET(req) {
  await connectDb();

  // Aggregate most wishlisted products
  const mostWishlisted = await Wishlist.aggregate([
    { $unwind: "$products" },
    { $group: { _id: "$products", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  // Get full product details
  const productIds = mostWishlisted.map(item => item._id);
  const products = await Product.find({ _id: { $in: productIds } });

  return responseHelper.ok(products);
}
