// // src/app/api/auth/send-otp/route.js
// import { connectDb } from "@/lib/connectDb";
// import Otp from "@/models/Otp";
// import bcrypt from "bcryptjs";
// import responseHelper from "@/lib/responseHelper";
// import { sendSMS } from "@/lib/sendSMS";

// export async function POST(req) {
//   await connectDb();

//   const { mobile } = await req.json();

//   if (!mobile) {
//     return responseHelper.badRequest("Mobile number is required");
//   }

//   // Format mobile (Pakistan case)
//   let formattedMobile = mobile;
//   if (!mobile.startsWith("+")) {
//     formattedMobile = "+92" + mobile.replace(/^0/, "");
//   }

//   const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
//   const hashedOtp = await bcrypt.hash(otpValue, 10);

//   await Otp.create({ mobile: formattedMobile, otp: hashedOtp });

//   // Send SMS using Twilio
//   const smsRes = await sendSMS({
//     mobile: formattedMobile,
//     message: `Your OTP is ${otpValue}`,
//   });

//   if (!smsRes.success) {
//     console.error("Failed to send OTP SMS:", smsRes.error);
//     return responseHelper.serverError("Failed to send OTP SMS");
//   }

//   return responseHelper.success({ message: "OTP sent successfully" });
// }

// src/app/api/auth/send-otp/route.js
import { connectDb } from "@/lib/connectDb";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import responseHelper from "@/lib/responseHelper";
import { sendSMS } from "@/lib/sendSMS";
import User from "@/models/User";

export async function POST(req) {
  await connectDb();

  try {
    console.log("Received request to send OTP", req);
    const { mobile } = await req.json();
    console.log("mobile", mobile);

    if (!mobile) {
      return responseHelper.badRequest("Mobile number is required");
    }

    const user = await User.findOne({ mobile });

    if (user) {
      return responseHelper.badRequest("User already exists with this mobile number");
    }

    // Pakistan format => +92XXXXXXXXXX
    let formattedMobile = mobile;
    if (!mobile.startsWith("+")) {
      formattedMobile = "+92" + mobile.replace(/^0/, "");
    }

    // Generate OTP
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otpValue, 10);

    // Save OTP in DB
    await Otp.create({ mobile: formattedMobile, otp: hashedOtp });

    // Send SMS
    const smsRes = await sendSMS({
      mobile: formattedMobile,
      message: `Your OTP is ${otpValue}`,
    });

    console.log("Twilio sendSMS response:", smsRes);

    // Some helpers return success: true, some return status or sid — check both
    if (!smsRes || smsRes.success === false) {
      return responseHelper.serverError("Failed to send OTP SMS");
    }

    return responseHelper.success({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return responseHelper.serverError("Something went wrong while sending OTP");
  }
}
