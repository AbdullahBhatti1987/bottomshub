import { connectDb } from '@/lib/connectDb';
import { authenticateUser } from '@/middlewares/auth';
import Cart from '@/models/Cart';
import responseHelper from '@/lib/responseHelper';

export const GET = authenticateUser(async (req, res) => {
  await connectDb();

  const cart = await Cart.findOne({ user: req.userId }).populate('items.product');

  if (!cart) {
    return responseHelper.success(res, 'Cart is empty', { items: [] });
  }

  return responseHelper.success(res, 'Cart retrieved', { cart });
});
