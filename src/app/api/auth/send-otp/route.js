// src/app/api/auth/send-otp/route.js
import connectDb from '@/lib/connectDb';
import Otp from '@/models/Otp';
import bcrypt from 'bcryptjs';
import responseHelper from '@/lib/responseHelper';

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== 'POST') return responseHelper.methodNotAllowed(res);

  const { mobile } = req.body;
  if (!mobile) return responseHelper.badRequest(res, 'Mobile number is required');

  const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otpValue, 10);

  await Otp.create({ mobile, otp: hashedOtp });

  console.log(`👉 OTP for ${mobile}: ${otpValue}`); // Replace with SMS integration later

  return responseHelper.success(res, 'OTP sent successfully');
}
