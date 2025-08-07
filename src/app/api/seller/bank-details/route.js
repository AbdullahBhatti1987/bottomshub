import connectDb from '@/lib/connectDb';
import { authenticateSeller } from '@/middlewares/sellerAuth';
import SellerBank from '@/models/SellerBank';
import responseHelper from '@/helpers/responseHelper';

// GET - Fetch current seller's bank details
export const GET = authenticateSeller(async (req, res) => {
  await connectDb();
  const bank = await SellerBank.findOne({ seller: req.userId });

  if (!bank) return responseHelper.badRequest(res, 'Bank details not found');
  return responseHelper.success(res, 'Bank details retrieved', { bank });
});

// POST or PATCH - Add/Update bank details
export const POST = authenticateSeller(async (req, res) => {
  await connectDb();
  const body = await req.json();

  const updated = await SellerBank.findOneAndUpdate(
    { seller: req.userId },
    { ...body, seller: req.userId },
    { upsert: true, new: true }
  );

  return responseHelper.success(res, 'Bank details updated', { bank: updated });
});
