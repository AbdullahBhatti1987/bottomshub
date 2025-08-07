// middlewares/auth.js
import { verifyToken } from '@/lib/jwt';

export const authenticateUser = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.userId = decoded.userId; // Attach userId to request
    return handler(req, res);
  };
};
