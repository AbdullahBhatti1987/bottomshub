import connectDb from '@/lib/connectDb';
import { getLoggedInUser } from '@/middlewares/auth';
import { responseHelper } from '@/lib/responseHelper';
import ChatMessage from '@/models/ChatMessage';

export async function GET() {
  await connectDb();
  const user = await getLoggedInUser();
  if (!user) return responseHelper.unauthorized();

  try {
    const messages = await ChatMessage.find({ user: user._id }).sort({ createdAt: 1 });
    return responseHelper.ok(messages);
  } catch (err) {
    return responseHelper.serverError('Failed to fetch chat messages');
  }
}

export async function POST(req) {
  await connectDb();
  const user = await getLoggedInUser();
  if (!user) return responseHelper.unauthorized();

  try {
    const { message } = await req.json();
    const newMessage = await ChatMessage.create({
      user: user._id,
      message,
      sender: 'user',
    });
    return responseHelper.created(newMessage);
  } catch (err) {
    return responseHelper.serverError('Failed to send message');
  }
}
