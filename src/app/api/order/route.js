import connectDb from '@/lib/connectDb';
import { authenticateUser } from '@/middlewares/auth';
import responseHelper from '@/lib/responseHelper';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Cart from '@/models/Cart';


import { authenticateAdmin } from '@/middlewares/auth';


export const POST = authenticateUser(async (req, res) => {
  await connectDb();

  const body = await req.json();
  const { shippingAddress, paymentMethod } = body;

  if (!shippingAddress || !paymentMethod) {
    return responseHelper.badRequest(res, 'Shipping address and payment method are required.');
  }

  const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return responseHelper.badRequest(res, 'Cart is empty.');
  }

  // Calculate total
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Create order object
  const order = await Order.create({
    user: req.userId,
    items: cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    })),
    shippingAddress,
    paymentMethod,
    totalAmount: total,
    status: 'processing',
  });

  // Reduce product stock
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity }
    });
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  return responseHelper.success(res, 'Order placed successfully.', { order });
});



export const GET = authenticateAdmin(async (req, res) => {
  await connectDb();

  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate('user', 'name email mobile')
    .populate('items.product', 'title slug images');

  return responseHelper.success(res, 'All orders fetched successfully.', { orders });
});