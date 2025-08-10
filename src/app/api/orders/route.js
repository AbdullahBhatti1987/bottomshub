// src/app/api/order/route.js
import { connectDb } from "@/lib/connectDb";
import { authenticateUser } from "@/middlewares/auth";
import responseHelper from "@/lib/responseHelper";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Cart from "@/models/Cart";

import { authenticateAdmin } from "@/middlewares/auth";



// export async function POST(req) {
//   await connectDb();

//   // User authentication logic (example)
//   // Agar aap middleware use kar rahe ho to wo alag handle hota hai.

//   const body = await req.json();
//   const { shippingAddress, paymentMethod, userId } = body;

//   if (!shippingAddress || !paymentMethod || !userId) {
//     return NextResponse.json(
//       { error: 'Shipping address, payment method, and userId are required.' },
//       { status: 400 }
//     );
//   }

//   // Fetch cart for userId
//   const cart = await Cart.findOne({ user: userId }).populate('items.product');
//   if (!cart || cart.items.length === 0) {
//     return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
//   }

//   // Calculate total amount
//   const total = cart.items.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0
//   );

//   // Create order
//   const order = await Order.create({
//     user: userId,
//     items: cart.items.map(item => ({
//       product: item.product._id,
//       quantity: item.quantity,
//       priceAtPurchase: item.product.price,
//       name: item.product.name,
//       image: item.product.images?.[0]?.url || '', // First image URL as snapshot
//       // category: item.product.category (agar chahiye to)
//     })),
//     shippingAddress,
//     paymentMethod,
//     totalAmount: total,
//     orderStatus: 'processing',
//   });

//   // Reduce product stock
//   for (const item of cart.items) {
//     await Product.findByIdAndUpdate(item.product._id, {
//       $inc: { inStock: -item.quantity }
//     });
//   }

//   // Clear cart
//   cart.items = [];
//   await cart.save();

//   return NextResponse.json({ message: 'Order placed successfully', order });
// }

// export const POST = authenticateUser(async (req, res) => {
export async function POST(req) {
  await connectDb();

  // Parse JSON body once
  const body = await req.json();
  const { shippingAddress, paymentMethod } = body;

  if (!shippingAddress || !paymentMethod) {
    return responseHelper.badRequest('Shipping address and payment method are required.');
  }

  // Extract userId - this depends on your auth system.
  // For example, if using JWT in headers, decode here.
  // For now, let's assume userId is passed in headers (replace as needed):
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return responseHelper.unauthorized('User not authenticated.');
  }

  // Find user's cart and populate products
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return responseHelper.badRequest('Cart is empty.');
  }

  // Calculate total
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Create order
  const order = await Order.create({
    user: userId,
    items: cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      priceAtPurchase: item.product.price, // use priceAtPurchase per your schema
      name: item.product.name,
      image: item.product.images?.[0] || '',
      category: item.product.category,
      selectedSize: item.selectedSize || null, // optional
    })),
    shippingAddress,
    paymentMethod,
    totalAmount: total,
    orderStatus: 'processing',
    paymentStatus: 'pending',
  });

  // Reduce stock for each product
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  return responseHelper.success({ order }, 'Order placed successfully.');
}

export const GET = authenticateUser(async (req, res) => {
// export const GET = authenticateAdmin(async (req, res) => {
  await connectDb();

  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("user", "name email mobile")
    .populate("items.product", "title slug images");

  return responseHelper.success(res, "All orders fetched successfully.", {
    orders,
  });
});
