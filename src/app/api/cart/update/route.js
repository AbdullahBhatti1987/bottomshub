import connectDb from '@/lib/connectDb';
import { authenticateUser } from '@/middlewares/auth';
import responseHelper from '@/lib/responseHelper';
import Cart from '@/models/Cart';

export const PUT = authenticateUser(async (req, res) => {
  await connectDb();

  const { productId, quantity } = await req.json();

  if (!productId || typeof quantity !== 'number') {
    return responseHelper.badRequest(res, 'Product ID and valid quantity are required.');
  }

  let cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return responseHelper.badRequest(res, 'Cart not found.');
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

  if (itemIndex === -1) {
    return responseHelper.badRequest(res, 'Item not found in cart.');
  }

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1); // remove item
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();

  return responseHelper.success(res, 'Cart updated successfully', { cart });
});
