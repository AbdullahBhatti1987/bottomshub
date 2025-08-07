import connectDb from '@/lib/connectDb';
import Cart from '@/models/Cart';
import Coupon from '@/models/Coupon';
import { authenticateUser } from '@/middlewares/auth';
import responseHelper from '@/helpers/responseHelper';

const handler = async (req, res) => {
  if (req.method !== 'POST') return responseHelper.methodNotAllowed(res);

  await connectDb();

  const { code } = req.body;
  if (!code) return responseHelper.badRequest(res, 'Coupon code required');

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
  if (!coupon) return responseHelper.badRequest(res, 'Invalid coupon');

  if (coupon.expiresAt && new Date() > coupon.expiresAt)
    return responseHelper.badRequest(res, 'Coupon expired');

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit)
    return responseHelper.badRequest(res, 'Coupon usage limit reached');

  const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
  if (!cart || cart.items.length === 0)
    return responseHelper.badRequest(res, 'Cart is empty');

  const cartTotal = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  if (cartTotal < coupon.minCartValue)
    return responseHelper.badRequest(res, `Minimum cart value is ${coupon.minCartValue}`);

  cart.coupon = coupon._id;
  await cart.save();

  return responseHelper.success(res, 'Coupon applied', { coupon });
};

export default authenticateUser(handler);
