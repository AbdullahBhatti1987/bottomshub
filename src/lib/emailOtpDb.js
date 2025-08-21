import { connectDb } from "@/lib/connectDb"; // apka db connection function
import EmailOtp from "@/models/EmailOtp";

// Save OTP to DB with 5 min expiry
export const saveOtpToDb = async (email, otp) => {
  await connectDb();

  // Purana OTP delete kar do (same email ka)
  await EmailOtp.deleteMany({ email });

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  const newOtp = new EmailOtp({ email, otp, expiresAt });
  await newOtp.save();
};

// Verify OTP from DB
export const verifyOtpFromDb = async (email, otp) => {
  await connectDb();

  const record = await EmailOtp.findOne({ email, otp });

  if (!record) return false;

  // Check expiry
  if (record.expiresAt < new Date()) {
    await EmailOtp.deleteOne({ _id: record._id });
    return false;
  }

  // OTP valid → delete after use
  await EmailOtp.deleteOne({ _id: record._id });
  return true;
};
