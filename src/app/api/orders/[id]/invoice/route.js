// // api/admin/order/[id]/invoice/route.js
// import connectDb from '@/lib/connectDb';
// import { authenticateUser } from '@/middlewares/auth';
// import Order from '@/models/Order';
// import PDFDocument from 'pdfkit';
// import { NextResponse } from 'next/server';
// import { Readable } from 'stream';

// export const GET = authenticateUser(async (req, res, { params }) => {
//   await connectDb();
//   const { id } = params;

//   const order = await Order.findById(id).populate('user');
//   if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

//   const doc = new PDFDocument();
//   const stream = new Readable().wrap(doc);

//   doc.fontSize(20).text('BottomsHub - Order Invoice', { align: 'center' });
//   doc.moveDown();
//   doc.fontSize(12).text(`Order ID: ${order._id}`);
//   doc.text(`Customer: ${order.user.name}`);
//   doc.text(`Email: ${order.user.email}`);
//   doc.text(`Order Date: ${order.createdAt.toDateString()}`);
//   doc.moveDown();
//   doc.text('Items:');

//   order.items.forEach((item, index) => {
//     doc.text(
//       `${index + 1}. ${item.name} - ${item.quantity} x Rs.${item.price} = Rs.${item.price * item.quantity}`
//     );
//   });

//   doc.moveDown();
//   doc.fontSize(14).text(`Total: Rs.${order.total}`, { align: 'right' });

//   doc.end();

//   return new Response(stream, {
//     headers: {
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename=invoice-${order._id}.pdf`,
//     },
//   });
// });


// /app/api/orders/[id]/invoice/route.js
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

    const invoice = {
      invoiceNumber: order._id.toString().slice(-6).toUpperCase(),
      date: order.createdAt,
      customer: order.user,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      items: order.items.map(i => ({
        name: i.name,
        quantity: i.quantity,
        price: i.priceAtPurchase,
        total: i.priceAtPurchase * i.quantity,
      })),
      totalAmount: order.totalAmount,
      orderStatus: order.orderStatus,
      notes: order.notes,
    };

    return responseHelper.success({ invoice });
  } catch (err) {
    return responseHelper.serverError(err.message);
  }
}
