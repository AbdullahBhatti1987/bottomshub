// src/app/api/auth/login/route.js
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import responseHelper from "@/lib/responseHelper";

export async function POST(req) {
  await connectDb();

  try {
    const { mobile } = await req.json();
    if (!mobile) return responseHelper.badRequest("Mobile is required");

    let formattedMobile = mobile.startsWith("+92")
      ? mobile
      : "+92" + mobile.replace(/^0/, "");

    const user = await User.findOne({ mobile: formattedMobile });
    if (!user) return responseHelper.notFound("User not found");

    if (!user.isVerified) {
      return responseHelper.badRequest("User not verified");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return responseHelper.success({ user, token });
  } catch (error) {
    return responseHelper.serverError("Login failed");
  }
}
