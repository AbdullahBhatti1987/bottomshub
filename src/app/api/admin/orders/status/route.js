// src/app/api/admin/orders/status/route.js

import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/auth';
import responseHelper from '@/lib/responseHelper';
import Order from '@/models/Order';

export const PUT = authenticateAdmin(async (req, res, { params }) => {
  await connectDb();

  const { id } = params;
  const body = await req.json();
  const { status } = body;

  const validStatuses = ['pending', 'packed', 'shipped', 'delivered', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return responseHelper.badRequest(res, 'Invalid order status.');
  }

  const order = await Order.findById(id);

  if (!order) {
    return responseHelper.badRequest(res, 'Order not found.');
  }

  order.status = status;
  await order.save();

  return responseHelper.success(res, 'Order status updated.', { order });
});
