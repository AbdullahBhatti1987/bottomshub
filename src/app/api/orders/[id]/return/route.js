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

    if (order.orderStatus !== 'delivered') {
      return responseHelper.badRequest('Return only allowed after delivery');
    }

    const { returnReason = '' } = await request.json();

    order.orderStatus = 'returned';
    order.returnReason = returnReason;
    order.returnRequestDate = new Date();

    await order.save();

    return responseHelper.success({ order }, 'Return requested successfully');
  } catch (err) {
    return responseHelper.serverError(err.message);
  }
}
