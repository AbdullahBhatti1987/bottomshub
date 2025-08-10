// // src/app/api/admin/orders/route.js
// import connectDb from '@/lib/connectDb';
// import { authenticateAdmin } from '@/middlewares/auth';
// import responseHelper from '@/lib/responseHelper';
// import Order from '@/models/Order';

// export const GET = authenticateAdmin(async (request) => {
//   await connectDb();

//   const orders = await Order.find({})
//     .sort({ createdAt: -1 })
//     .populate('user', 'name email mobile')
//     .populate('items.product', 'title slug images');

//   return responseHelper.success(null, 'All orders fetched successfully.', { orders });
// });


// src/app/api/admin/orders/route.js
import { connectDb } from "@/lib/connectDb";
import responseHelper from '@/lib/responseHelper';
import Order from '@/models/Order';

export const GET = async (request) => {
 await connectDb();

  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate('user', 'name email mobile')
    .populate('items.product', 'title slug images');

  return responseHelper.success(null, 'All orders fetched successfully.', { orders });
};
