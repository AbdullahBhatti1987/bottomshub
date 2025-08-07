import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/auth';
import { responseHelper } from '@/lib/responseHelper';
import CMSPage from '@/models/CMSPage';

export async function GET() {
  await connectDb();
  try {
    const pages = await CMSPage.find().sort({ slug: 1 });
    return responseHelper.ok(pages);
  } catch (err) {
    return responseHelper.serverError('Failed to fetch CMS pages');
  }
}

export async function POST(req) {
  await connectDb();
  const admin = await authenticateAdmin();
  if (!admin) return responseHelper.unauthorized();

  try {
    const body = await req.json();
    const existing = await CMSPage.findOne({ slug: body.slug });
    if (existing) {
      existing.title = body.title;
      existing.content = body.content;
      await existing.save();
      return responseHelper.ok(existing, 'Page updated');
    }

    const newPage = await CMSPage.create(body);
    return responseHelper.created(newPage);
  } catch (err) {
    return responseHelper.serverError('Failed to save CMS page');
  }
}
