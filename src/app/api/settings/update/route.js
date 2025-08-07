import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/auth';
import { responseHelper } from '@/lib/responseHelper';
import SellerSettings from '@/models/SellerSettings';

export async function PUT(req) {
  await connectDb();
  const admin = await authenticateAdmin();
  if (!admin) return responseHelper.unauthorized();

  try {
    const body = await req.json();
    const settings = await SellerSettings.findOne();
    if (settings) {
      Object.assign(settings, body);
      await settings.save();
      return responseHelper.ok(settings, 'Settings updated');
    } else {
      const newSettings = await SellerSettings.create(body);
      return responseHelper.created(newSettings);
    }
  } catch (err) {
    return responseHelper.serverError('Failed to update settings');
  }
}

export async function GET() {
  await connectDb();
  try {
    const settings = await SellerSettings.findOne();
    return responseHelper.ok(settings);
  } catch (err) {
    return responseHelper.serverError('Failed to get settings');
  }
}
