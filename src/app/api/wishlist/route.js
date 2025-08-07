import { connectDb } from '@/lib/connectDb';
import responseHelper from '@/lib/responseHelper';
import Wishlist from '@/models/Wishlist';
import { auth } from '@/middlewares/auth';

export async function GET(req) {
  await connectDb();
  const user = await auth(req);
  if (!user) return responseHelper.unauthorized();

  const wishlist = await Wishlist.findOne({ user: user._id }).populate('products');
  return responseHelper.ok(wishlist || { products: [] });
}
