import { connectDb } from '@/lib/connectDb';
import Order from '@/models/Order';
import responseHelper from '@/lib/responseHelper';
import { auth } from '@/middlewares/auth';

export async function POST(req, { params }) {
  await connectDb();
  const user = await auth(req);
  if (!user) return responseHelper.unauthorized();

  const order = await Order.findOne({ _id: params.id, user: user._id });
  if (!order) return responseHelper.notFound('Order not found');

  order.status = 'return_requested';
  await order.save();

  return responseHelper.ok({ message: 'Return requested' });
}
