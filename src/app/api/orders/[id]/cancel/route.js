import connectDb from '@/lib/connectDb';
import Order from '@/models/Order';
import responseHelper from '@/helpers/responseHelper';

export async function PUT(request, { params }) {
  await connectDb();

  const { id } = params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return responseHelper.badRequest('Invalid order ID');
  }

  try {
    const order = await Order.findById(id);
    if (!order) {
      return responseHelper.badRequest('Order not found');
    }

    if (['shipped', 'delivered', 'canceled', 'returned'].includes(order.orderStatus)) {
      return responseHelper.badRequest(`Cannot cancel order in status: ${order.orderStatus}`);
    }

    const { cancelReason = '' } = await request.json();

    order.orderStatus = 'canceled';
    order.cancelReason = cancelReason;
    await order.save();

    return responseHelper.success({ order }, 'Order canceled successfully');
  } catch (err) {
    return responseHelper.serverError(err.message);
  }
}
