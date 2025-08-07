import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/adminAuth';
import Seller from '@/models/Seller';
import responseHelper from '@/helpers/responseHelper';

// PATCH: Update seller's feature list
export const PATCH = authenticateAdmin(async (req, res, { params }) => {
  await connectDb();
  const { sellerId } = params;
  const { features } = await req.json();

  if (!Array.isArray(features)) {
    return responseHelper.badRequest(res, 'Invalid features format');
  }

  const seller = await Seller.findById(sellerId);
  if (!seller) return responseHelper.badRequest(res, 'Seller not found');

  seller.features = features;
  await seller.save();

  return responseHelper.success(res, 'Seller features updated', { features });
});

// GET: Get current feature list of a seller
export const GET = authenticateAdmin(async (req, res, { params }) => {
  await connectDb();
  const { sellerId } = params;

  const seller = await Seller.findById(sellerId).select('features name');
  if (!seller) return responseHelper.badRequest(res, 'Seller not found');

  return responseHelper.success(res, 'Seller features fetched', { seller });
});
