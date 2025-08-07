import connectDb from '@/lib/connectDb';
import { authenticateAdmin } from '@/middlewares/auth';
import { responseHelper } from '@/lib/responseHelper';
import ChatMessage from '@/models/ChatMessage';

export async function GET(_, { params }) {
  await connectDb();
  const admin = await authenticateAdmin();
  if (!admin) return responseHelper.unauthorized();

  try {
    const messages = await ChatMessage.find({ user: params.userId }).sort({ createdAt: 1 });
    return responseHelper.ok(messages);
  } catch (err) {
    return responseHelper.serverError('Failed to fetch user messages');
  }
}

export async function POST(req, { params }) {
  await connectDb();
  const admin = await authenticateAdmin();
  if (!admin) return responseHelper.unauthorized();

  try {
    const { message } = await req.json();
    const newMessage = await ChatMessage.create({
      user: params.userId,
      message,
      sender: 'admin',
    });
    return responseHelper.created(newMessage);
  } catch (err) {
    return responseHelper.serverError('Failed to send admin message');
  }
}
