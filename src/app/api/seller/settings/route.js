// import connectDb from '@/lib/connectDb';
// import { authenticateSeller } from '@/middlewares/sellerAuth';
// import Seller from '@/models/Seller';
// import responseHelper from '@/helpers/responseHelper';

// // GET - Fetch seller store settings
// export const GET = authenticateSeller(async (req, res) => {
//   await connectDb();

//   const seller = await Seller.findById(req.userId).select(
//     'storeName contactEmail contactPhone codEnabled returnPolicy aboutUs facebook instagram'
//   );

//   if (!seller) return responseHelper.badRequest(res, 'Seller not found');

//   return responseHelper.success(res, 'Seller settings fetched', { settings: seller });
// });

// // PATCH - Update store settings
// export const PATCH = authenticateSeller(async (req, res) => {
//   await connectDb();
//   const body = await req.json();

//   const updatedSeller = await Seller.findByIdAndUpdate(req.userId, body, {
//     new: true,
//     runValidators: true,
//   }).select('-password -__v');

//   if (!updatedSeller) return responseHelper.badRequest(res, 'Seller not found');

//   return responseHelper.success(res, 'Seller settings updated', { seller: updatedSeller });
// });






import connectDb from '@/lib/connectDb';
import SellerSettings from '@/models/SellerSettings';
import { authenticateUser } from '@/middlewares/auth';
import responseHelper from '@/helpers/responseHelper';

const handler = async (req, res) => {
  await connectDb();

  const userId = req.userId; // from auth middleware

  if (req.method === 'GET') {
    const settings = await SellerSettings.findOne({ seller: userId });
    if (!settings) {
      return responseHelper.badRequest(res, 'Settings not found');
    }
    return responseHelper.success(res, 'Seller settings fetched', { settings });
  } else if (req.method === 'POST' || req.method === 'PUT') {
    const data = req.body;

    const updatedSettings = await SellerSettings.findOneAndUpdate(
      { seller: userId },
      data,
      { upsert: true, new: true }
    );
    return responseHelper.success(res, 'Seller settings updated', { settings: updatedSettings });
  } else {
    return responseHelper.methodNotAllowed(res);
  }
};

export default authenticateUser(handler);
