// app/api/products/route.js
import connectDb from '@/lib/connectDb';
import Product from '@/models/Product';
import { authenticateUser } from '@/middlewares/auth';
import responseHelper from '@/lib/responseHelper';


export const POST = authenticateUser(async (req, res) => {
  try {
    await connectDb();

    const body = await req.json();

    // Basic validation
    if (!body.name || !body.slug || !body.price || !body.category) {
      return responseHelper.badRequest(res, 'Missing required fields');
    }

    const existing = await Product.findOne({ slug: body.slug });
    if (existing) {
      return responseHelper.badRequest(res, 'Slug already exists');
    }

    const product = await Product.create(body);
    return responseHelper.success(res, 'Product created successfully', { product });
  } catch (err) {
    console.error('Product creation error:', err);
    return responseHelper.badRequest(res, 'Failed to create product');
  }
});



// GET - Public: Fetch All Products
export const GET = async (req, res) => {
  try {
    await connectDb();

    const products = await Product.find().sort({ createdAt: -1 });
    return responseHelper.success(res, 'Products fetched successfully', { products });
  } catch (err) {
    console.error('Fetch products error:', err);
    return responseHelper.badRequest(res, 'Failed to fetch products');
  }
};