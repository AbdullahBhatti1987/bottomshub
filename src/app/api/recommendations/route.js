import { connectDb } from '@/lib/connectDb';
import Product from '@/models/Product';
import responseHelper from '@/lib/responseHelper';

export async function GET() {
  await connectDb();

  const recommended = await Product.find().sort({ createdAt: -1 }).limit(10);
  return responseHelper.ok(recommended);
}
