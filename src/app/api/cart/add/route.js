import connectDb from '@/lib/connectDb';
import { authenticateUser } from '@/middlewares/auth';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import responseHelper from '@/lib/responseHelper';

export const POST = authenticateUser(async (req, res) => {
  await connectDb();

  const { productId, quantity = 1 } = await req.json();

  if (!productId) {
    return responseHelper.badRequest(res, 'Product ID is required');
  }

  const product = await Product.findById(productId);
  if (!product) {
    return responseHelper.badRequest(res, 'Invalid product');
  }

  let cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    cart = await Cart.create({
      user: req.userId,
      items: [{ product: productId, quantity }],
    });
  } else {
    const existingItem = cart.items.find((item) =>
      item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
  }

  return responseHelper.success(res, 'Item added to cart', { cart });
});
