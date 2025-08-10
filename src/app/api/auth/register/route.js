import User from "@/models/User";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import responseHelper from "@/lib/responseHelper";
import { sendSMS } from "@/lib/sendSMS";
import { connectDb } from "@/lib/connectDb";

export async function POST(req) {
  await connectDb();

  const { name, mobile, email, role } = await req.json();
  console.log("Register request received:", { name, mobile, email, role });

  // Basic validation
  if (!mobile) {
    return responseHelper.badRequest("Mobile number is required");
  }
  if (!name) {
    return responseHelper.badRequest("Name is required for registration");
  }

  // Format mobile (Pakistan case)
  let formattedMobile = mobile;
  if (!mobile.startsWith("+")) {
    formattedMobile = "+92" + mobile.replace(/^0/, "");
  }

  // Check if user already exists
  let user = await User.findOne({ mobile: formattedMobile });
  if (user) {
    return responseHelper.badRequest(
      "User already exists with this mobile number"
    );
  }

  // Generate OTP
  const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otpValue, 10);

  // Create JWT for tempData
  console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

  const tempData = { name, mobile: formattedMobile, email, role };
  const tempToken = jwt.sign(tempData, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  console.log("Generated tempToken:", tempToken);

  const otpDoc = await Otp.create({
    mobile: formattedMobile,
    otp: hashedOtp,
    tempData: tempToken,
  });
  console.log("Saved OTP Document:", otpDoc);

  // Send OTP via SMS
  const smsRes = await sendSMS({
    mobile: formattedMobile,
    message: `Your OTP is ${otpValue}`,
  });

  if (!smsRes.success) {
    return responseHelper.serverError("Failed to send OTP SMS");
  }

  return responseHelper.success({
    step: "otp_sent",
    message:
      "OTP sent successfully. Please verify using /api/auth/verify-otp within 30 minutes.",
  });
}
