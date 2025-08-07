import { connectDb } from '@/lib/connectDb';
import User from '@/models/User';
import responseHelper from '@/lib/responseHelper';
import { auth } from '@/middlewares/auth';

export async function GET(req) {
  await connectDb();
  const user = await auth(req);
  if (!user) return responseHelper.unauthorized();

  const data = await User.findById(user._id).select('recentlyViewed').populate('recentlyViewed');
  return responseHelper.ok(data.recentlyViewed || []);
}

