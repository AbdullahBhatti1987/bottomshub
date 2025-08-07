import connectDb from '@/lib/connectDb';
import { responseHelper } from '@/lib/responseHelper';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';

export async function POST(req) {
  await connectDb();
  try {
    const { email } = await req.json();
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) return responseHelper.badRequest('Already subscribed');

    const subscriber = await NewsletterSubscriber.create({ email });
    return responseHelper.created(subscriber, 'Subscribed successfully');
  } catch (err) {
    return responseHelper.serverError('Subscription failed');
  }
}
