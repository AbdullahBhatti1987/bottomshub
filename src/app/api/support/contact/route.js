import { connectDb } from '@/lib/connectDb';
import responseHelper from '@/lib/responseHelper';
import SupportRequest from '@/models/SupportRequest';

export async function POST(req) {
  await connectDb();
  const body = await req.json();

  const support = await SupportRequest.create(body);
  return responseHelper.created(support);
}
