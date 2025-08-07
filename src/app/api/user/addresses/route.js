
import { connectDb } from '@/lib/connectDb';
import UserAddress from '@/models/UserAddress';
import responseHelper from '@/lib/responseHelper';
import { auth } from '@/middlewares/auth';

export async function GET(req) {
  await connectDb();
  const user = await auth(req);
  if (!user) return responseHelper.unauthorized();

  const addresses = await UserAddress.find({ user: user._id });
  return responseHelper.ok(addresses);
}
