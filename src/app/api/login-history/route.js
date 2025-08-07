import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/auth';
import { responseHelper } from '@/lib/responseHelper';
import LoginHistory from '@/models/LoginHistory';

export async function GET() {
  await connectDb();
  const admin = await authenticateAdmin();
  if (!admin) return responseHelper.unauthorized();

  try {
    const logs = await LoginHistory.find().populate('user', 'name email mobile').sort({ createdAt: -1 });
    return responseHelper.ok(logs);
  } catch (err) {
    return responseHelper.serverError('Failed to fetch login logs');
  }
}
