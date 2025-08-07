import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/auth';
import { responseHelper } from '@/lib/responseHelper';
import Banner from '@/models/Banner';

export async function GET() {
  await connectDb();
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    return responseHelper.ok(banners);
  } catch (err) {
    return responseHelper.serverError('Failed to fetch banners');
  }
}

export async function POST(req) {
  await connectDb();
  const admin = await authenticateAdmin();
  if (!admin) return responseHelper.unauthorized();

  try {
    const body = await req.json();
    const newBanner = await Banner.create(body);
    return responseHelper.created(newBanner);
  } catch (err) {
    return responseHelper.serverError('Failed to create banner');
  }
}

export async function DELETE(req) {
  await connectDb();
  const admin = await authenticateAdmin();
  if (!admin) return responseHelper.unauthorized();

  try {
    const { id } = await req.json();
    await Banner.findByIdAndDelete(id);
    return responseHelper.ok(null, 'Banner deleted');
  } catch (err) {
    return responseHelper.serverError('Failed to delete banner');
  }
}
