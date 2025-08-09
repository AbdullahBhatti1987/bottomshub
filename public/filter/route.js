import { connectDb } from '@/lib/connectDb';
import Product from '@/models/Product';
import responseHelper from '@/lib/responseHelper';

export async function POST(req) {
  await connectDb();
  const { category, priceRange, tags, sizes } = await req.json();

  const query = {};
  if (category) query.category = category;
  if (tags?.length) query.tags = { $in: tags };
  if (sizes?.length) query.sizes = { $in: sizes };
  if (priceRange) query.price = { $gte: priceRange[0], $lte: priceRange[1] };

  const products = await Product.find(query);
  return responseHelper.ok(products);
}
