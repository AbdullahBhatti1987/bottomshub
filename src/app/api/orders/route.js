import connectDb from '@/lib/connectDb';
import Order from '@/models/Order';
import responseHelper from '@/helpers/responseHelper';

export async function GET(request) {
  await connectDb();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const query = userId ? { user: userId } : {};
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name image')
      .populate('coupon')
      .sort({ createdAt: -1 });

    return responseHelper.success({ orders });
  } catch (err) {
    return responseHelper.serverError(err.message);
  }
}

export async function POST(request) {
  await connectDb();

  try {
    const orderData = await request.json();

    const newOrder = new Order(orderData);
    await newOrder.save();

    return responseHelper.success({ order: newOrder }, 'Order created successfully');
  } catch (err) {
    return responseHelper.badRequest(err.message);
  }
}
