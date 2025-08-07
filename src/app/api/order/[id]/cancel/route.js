import connectDb from '@/lib/connectDb';
import { authenticateUser } from '@/middlewares/auth';
import responseHelper from '@/lib/responseHelper';
import Order from '@/models/Order';

export const PUT = authenticateUser(async (req, res, { params }) => {
  await connectDb();

  const { id } = params;
  const userId = req.userId;

  const order = await Order.findById(id);

  if (!order) {
    return responseHelper.badRequest(res, 'Order not found.');
  }

  if (order.user.toString() !== userId) {
    return responseHelper.unauthorized(res, 'You can only cancel your own orders.');
  }

  if (['shipped', 'delivered'].includes(order.status)) {
    return responseHelper.badRequest(res, 'Order cannot be cancelled at this stage.');
  }

  order.status = 'cancelled';
  await order.save();

  return responseHelper.success(res, 'Order cancelled successfully.', { order });
});
