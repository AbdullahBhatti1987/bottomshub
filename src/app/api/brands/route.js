import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/auth';
import { responseHelper } from '@/lib/responseHelper';
import Brand from '@/models/Brand';

export async function GET() {
  await connectDb();
  try {
    const brands = await Brand.find().sort({ name: 1 });
    return responseHelper.ok(brands);
  } catch (err) {
    return responseHelper.serverError('Failed to fetch brands');
  }
}

export async function POST(req) {
  await connectDb();
  const admin = await authenticateAdmin();
  if (!admin) return responseHelper.unauthorized();

  try {
    const body = await req.json();
    const newBrand = await Brand.create({ name: body.name });
    return responseHelper.created(newBrand);
  } catch (err) {
    return responseHelper.serverError('Brand creation failed');
  }
}
