import connectDb from '@/lib/connectDb';
import Order from '@/models/Order';
import responseHelper from '@/helpers/responseHelper';

export async function GET(request, { params }) {
  await connectDb();

  const { id } = params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return responseHelper.badRequest('Invalid order ID');
  }

  try {
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product', 'name image')
      .populate('coupon');

    if (!order) return responseHelper.badRequest('Order not found');

    return responseHelper.success({ order });
  } catch (err) {
    return responseHelper.serverError(err.message);
  }
}

export async function PUT(request, { params }) {
  await connectDb();

  const { id } = params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return responseHelper.badRequest('Invalid order ID');
  }

  try {
    const updates = await request.json();

    const allowedFields = ['paymentStatus', 'orderStatus', 'notes', 'paidAt'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (field in updates) updateData[field] = updates[field];
    });

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) return responseHelper.badRequest('Order not found');

    return responseHelper.success({ order: updatedOrder }, 'Order updated successfully');
  } catch (err) {
    return responseHelper.badRequest(err.message);
  }
}

export async function DELETE(request, { params }) {
  await connectDb();

  const { id } = params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return responseHelper.badRequest('Invalid order ID');
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) return responseHelper.badRequest('Order not found');

    return responseHelper.success({}, 'Order deleted successfully');
  } catch (err) {
    return responseHelper.serverError(err.message);
  }
}
