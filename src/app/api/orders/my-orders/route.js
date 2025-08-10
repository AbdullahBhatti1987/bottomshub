// src/app/api/order/my-order/route.js
import connectDb from '@/lib/connectDb';
import { authenticateUser } from '@/middlewares/auth';
import responseHelper from '@/lib/responseHelper';
import Order from '@/models/Order';

export const GET = authenticateUser(async (req, res) => {
  await connectDb();

  const orders = await Order.find({ user: req.userId })
    .sort({ createdAt: -1 })
    .populate('items.product', 'title price images slug');

  return responseHelper.success(res, 'User orders fetched.', { orders });
});
