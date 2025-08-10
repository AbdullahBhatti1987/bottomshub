import { connectDb } from "@/lib/connectDb";
import responseHelper from "@/lib/responseHelper";
import Otp from "@/models/Otp";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDb();

  try {
    const { mobile, otp, name, email } = await req.json();
    // console.log("Verify OTP request received:", {
    //   mobile,
    //   otp,
    //   name,
    //   email,
    // });

    if (!mobile || !otp || !name || !email) {
      return responseHelper.badRequest("Mobile, OTP, Name, Email are required");
    }

    // Format mobile (Pakistan case)
    let formattedMobile = mobile;
    if (!mobile.startsWith("+")) {
      formattedMobile = "+92" + mobile.replace(/^0/, "");
    }

    // Latest OTP entry
    const otpEntry = await Otp.findOne({ mobile: formattedMobile }).sort({
      createdAt: -1,
    });

    if (!otpEntry) {
      return responseHelper.notFound("OTP not found or expired");
    }

    // OTP match
    const isMatch = await bcrypt.compare(otp, otpEntry.otp);
    if (!isMatch) {
      return responseHelper.badRequest("Invalid OTP");
    }

    // console.log("Generated Data");

    const user = await User.create({
      name: name,
      mobile: formattedMobile,
      email: email,
      role: "customer",
      isVerified: true,
    });
    // console.log("User created:", user);

    // Delete OTP entry after successful verification
    await Otp.deleteMany({ mobile: formattedMobile });

  
    return responseHelper.success({ data: user }, "User registered & verified successfully");
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return responseHelper.serverError(
      "Something went wrong while verifying OTP"
    );
  }
}
