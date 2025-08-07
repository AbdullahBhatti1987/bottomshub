import connectDb from '@/lib/connectDb';
import Coupon from '@/models/Coupon';
import { authenticateAdmin } from '@/middlewares/auth';
import responseHelper from '@/helpers/responseHelper';

const handler = async (req, res) => {
  if (req.method !== 'POST') return responseHelper.methodNotAllowed(res);

  await connectDb();

  try {
    const coupon = await Coupon.create(req.body);
    return responseHelper.success(res, 'Coupon created', { coupon });
  } catch (err) {
    return responseHelper.badRequest(res, err.message);
  }
};

export default authenticateAdmin(handler);
