// import connectDb from '@/lib/connectDb';
// import { authenticateAdmin } from '@/middlewares/adminAuth';
// import SellerPayout from '@/models/SellerPayout';
// import responseHelper from '@/helpers/responseHelper';

// // GET - List all payouts
// export const GET = authenticateAdmin(async (req, res) => {
//   await connectDb();
//   const payouts = await SellerPayout.find()
//     .populate('seller', 'name email')
//     .sort({ createdAt: -1 });

//   return responseHelper.success(res, 'Payout history retrieved', { payouts });
// });

// // PATCH - Update payout status (approve, paid, rejected)
// export const PATCH = authenticateAdmin(async (req, res) => {
//   await connectDb();
//   const { id, status, notes } = await req.json();

//   const updated = await SellerPayout.findByIdAndUpdate(
//     id,
//     { status, notes },
//     { new: true }
//   );

//   if (!updated) return responseHelper.badRequest(res, 'Payout not found');
//   return responseHelper.success(res, 'Payout updated', { payout: updated });
// });


import connectDb from '@/lib/connectDb';
import SellerPayout from '@/models/SellerPayout';
import { authenticateAdmin } from '@/middlewares/auth';
import responseHelper from '@/helpers/responseHelper';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await connectDb();

    const { seller, amount, paymentMethod, notes } = req.body;

    if (!seller || !amount) {
      return responseHelper.badRequest(res, 'Seller and amount are required');
    }

    try {
      const payout = await SellerPayout.create({
        seller,
        amount,
        paymentMethod,
        notes,
      });
      return responseHelper.success(res, 'Payout request created', { payout });
    } catch (error) {
      return responseHelper.badRequest(res, error.message);
    }
  } else if (req.method === 'PATCH') {
    await connectDb();
    const { id, status, notes } = req.body;

    const updated = await SellerPayout.findByIdAndUpdate(
      id,
      { status, notes, processedAt: new Date() },
      { new: true }
    );

    if (!updated) return responseHelper.badRequest(res, 'Payout not found');
    return responseHelper.success(res, 'Payout updated', { payout: updated });
  } else {
    return responseHelper.methodNotAllowed(res);
  }
};

export default authenticateAdmin(handler);
