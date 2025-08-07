// src/app/api/auth/verify-otp/route.js
import connectDb from '@/lib/connectDb';
import Otp from '@/models/Otp';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import responseHelper from '@/lib/responseHelper';

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== 'POST') return responseHelper.methodNotAllowed(res);

  const { mobile, otp } = req.body;
  if (!mobile || !otp) return responseHelper.badRequest(res, 'Mobile and OTP required');

  const existingOtp = await Otp.findOne({ mobile }).sort({ createdAt: -1 });
  if (!existingOtp) return responseHelper.unauthorized(res, 'OTP not found');

  const isMatch = await bcrypt.compare(otp, existingOtp.otp);
  if (!isMatch) return responseHelper.unauthorized(res, 'Invalid OTP');

  // Create user if not exists
  let user = await User.findOne({ mobile });
  if (!user) {
    user = await User.create({ mobile, name: 'New User' });
  }

  // Create token
  const token = signToken({ userId: user._id });

  // Optionally delete used OTP
  await Otp.deleteMany({ mobile });

  return res.status(200).json({
    message: 'OTP verified successfully',
    token,
    user: { _id: user._id, mobile: user.mobile, name: user.name },
  });
}





export async function POST(req) {
  await connectDb();

  try {
    const { mobile, otp } = await req.json();

    if (!mobile || !otp) {
      return responseHelper.badRequest('Mobile number and OTP are required');
    }

    const otpEntry = await Otp.findOne({ mobile }).sort({ createdAt: -1 });

    if (!otpEntry) {
      return responseHelper.badRequest('OTP not found or expired');
    }

    const isValid = await bcrypt.compare(otp, otpEntry.otp);

    if (!isValid) {
      return responseHelper.badRequest('Invalid OTP');
    }

    // Check if user exists
    let user = await User.findOne({ mobile });

    if (!user) {
      // Create user if not exists
      user = await User.create({
        mobile,
        name: 'New User', // Change if you collect name during signup
      });
    }

    // Optionally delete OTP after success
    await Otp.deleteMany({ mobile });

    return responseHelper.success('OTP verified', {
      userId: user._id,
      name: user.name,
      mobile: user.mobile,
    });

  } catch (error) {
    console.error('OTP verify error:', error);
    return responseHelper.serverError('Something went wrong during verification');
  }
}
