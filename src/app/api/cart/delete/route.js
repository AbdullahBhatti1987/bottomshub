import connectDb from '@/lib/connectDb';
import { authenticateUser } from '@/middlewares/auth';
import responseHelper from '@/lib/responseHelper';
import Cart from '@/models/Cart';

export const DELETE = authenticateUser(async (req, res) => {
  await connectDb();

  const { productId } = await req.json();

  if (!productId) {
    return responseHelper.badRequest(res, 'Product ID is required.');
  }

  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return responseHelper.badRequest(res, 'Cart not found.');
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return responseHelper.badRequest(res, 'Item not found in cart.');
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();

  return responseHelper.success(res, 'Item removed from cart.', { cart });
});
