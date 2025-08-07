import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/auth';
import responseHelper from '@/lib/responseHelper';
import Order from '@/models/Order';

export const PUT = authenticateAdmin(async (req, res, { params }) => {
  await connectDb();

  const { id } = params;
  const { status } = await req.json();

  if (!status) {
    return responseHelper.badRequest(res, 'Status field is required.');
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate('user', 'name email mobile')
    .populate('items.product', 'title slug images');

  if (!updatedOrder) {
    return responseHelper.badRequest(res, 'Order not found or could not be updated.');
  }

  return responseHelper.success(res, 'Order status updated successfully.', { order: updatedOrder });
});
