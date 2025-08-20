// /app/api/reviews/route.js
import Review from '@/models/Review';
import User from '@/models/User';
import Product from '@/models/Product';
import { connectDb } from '@/lib/connectDb';
import responseHelper from '@/lib/responseHelper';

// export async function GET() {
//   await connectDb();
//   try {
//     const reviews = await Review.find()
//       .populate('user', 'name')
//       .populate('product', 'name');

//     return responseHelper.success({ data: reviews }, 'Reviews fetched');
//   } catch (err) {
//     console.error('GET /reviews error:', err);
//     return responseHelper.serverError('Failed to fetch all reviews');
//   }
// }

export async function GET(req) {
  await connectDb();

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit')) || 10; // default 10
    const skip = parseInt(searchParams.get('skip')) || 0;    // default 0

    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('product', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest first

    return responseHelper.success({ data: reviews }, 'Reviews fetched');
  } catch (err) {
    console.error('GET /reviews error:', err);
    return responseHelper.serverError('Failed to fetch reviews');
  }
}

// POST /api/reviews
export async function POST(req) {
  await connectDb();

  try {
    const body = await req.json();
    let { user, product, review, rating } = body;

    if (!user || !product || !review) {
      return responseHelper.badRequest(
        "User ID, product ID, and review text are required"
      );
    }

    rating = Number(rating) || 5;

    const existing = await Review.findOne({ user, product });
    if (existing) {
      existing.rating = rating;
      existing.review = review;
      await existing.save();
      return responseHelper.success(
        { data: existing.toObject() },
        "Review updated successfully"
      );
    }

    const newReview = await Review.create({ user, product, rating, review });

    return responseHelper.success(
      { data: newReview.toObject() },
      "Review submitted successfully"
    );
  } catch (err) {
    console.error("POST /reviews error:", err);
    return responseHelper.serverError("Failed to submit review");
  }
}
