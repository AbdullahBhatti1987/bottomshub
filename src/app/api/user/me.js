// pages/api/user/me.js
import { authenticateUser } from '@/middlewares/auth';
import User from '@/models/User';
import connectDb from '@/lib/connectDb';

const handler = async (req, res) => {
  await connectDb();

  const user = await User.findById(req.userId).select('-__v');
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.status(200).json({ user });
};

export default authenticateUser(handler);
