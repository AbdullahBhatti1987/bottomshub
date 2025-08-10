// models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
    },
    otp: {
      type: String, 
      required: true,
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      index: { expires: 0 }, // expire exactly at expireAt
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
