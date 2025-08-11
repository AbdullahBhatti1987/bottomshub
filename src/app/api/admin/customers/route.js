// src/app/api/users/route.js
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import responseHelper from "@/lib/responseHelper";

export async function GET() {
  await connectDb();
  try {
    const users = await User.find().sort({ createdAt: -1 });
    console.log("Fetched users:", users);
    return responseHelper.successArray(users);
  } catch (error) {
    return responseHelper.serverError("Failed to fetch users");
  }
}
