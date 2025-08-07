// models/Otp.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
    },
    otp: {
      type: String, // will store bcrypt hashed OTP
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: '5m' }, // Auto-delete after 5 minutes
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Otp || mongoose.model('Otp', otpSchema);
