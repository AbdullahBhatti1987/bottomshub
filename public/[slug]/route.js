// app/api/products/[slug]/route.js
import connectDb from '@/lib/connectDb';
import Product from '@/models/Product';
import responseHelper from '@/lib/responseHelper';

// GET - Public: Fetch single product by slug
export const GET = async (req, res) => {
  try {
    await connectDb();

    const slug = req.url.split('/products/')[1]; // Extract slug from URL
    const product = await Product.findOne({ slug });

    if (!product) {
      return responseHelper.badRequest(res, 'Product not found');
    }

    return responseHelper.success(res, 'Product fetched successfully', { product });
  } catch (err) {
    console.error('Get product by slug error:', err);
    return responseHelper.badRequest(res, 'Failed to fetch product');
  }
};
