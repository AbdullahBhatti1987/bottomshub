import connectDb from '@/lib/connectDb';
import { authenticateUser } from '@/middlewares/auth';
import { responseHelper } from '@/lib/responseHelper';
import Review from '@/models/Review';

export async function GET(req, { params }) {
  await connectDb();
  try {
    const reviews = await Review.find({ product: params.productId }).populate('user', 'name');
    return responseHelper.ok(reviews);
  } catch (err) {
    return responseHelper.serverError('Failed to fetch reviews');
  }
}

export async function POST(req, { params }) {
  await connectDb();
  const user = await authenticateUser();
  if (!user) return responseHelper.unauthorized();

  try {
    const body = await req.json();
    const existing = await Review.findOne({ user: user._id, product: params.productId });

    if (existing) {
      existing.rating = body.rating;
      existing.comment = body.comment;
      await existing.save();
      return responseHelper.ok(existing, 'Review updated');
    }

    const newReview = await Review.create({
      user: user._id,
      product: params.productId,
      rating: body.rating,
      comment: body.comment,
    });

    return responseHelper.created(newReview);
  } catch (err) {
    return responseHelper.serverError('Failed to submit review');
  }
}
