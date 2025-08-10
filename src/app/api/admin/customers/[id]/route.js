// src/app/api/users/[id]/route.js
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import responseHelper from "@/lib/responseHelper";

export async function GET(req, { params }) {
  await connectDb();
  try {
    const user = await User.findById(params.id);
    if (!user) return responseHelper.notFound("User not found");
    return responseHelper.success(user);
  } catch (error) {
    return responseHelper.serverError("Failed to fetch user");
  }
}

export async function PUT(req, { params }) {
  await connectDb();
  try {
    const body = await req.json();
    const user = await User.findByIdAndUpdate(params.id, body, { new: true });
    if (!user) return responseHelper.notFound("User not found");
    return responseHelper.success(user);
  } catch (error) {
    return responseHelper.serverError("Failed to update user");
  }
}

export async function DELETE(req, { params }) {
  await connectDb();
  try {
    const deleted = await User.findByIdAndDelete(params.id);
    if (!deleted) return responseHelper.notFound("User not found");
    return responseHelper.success("User deleted");
  } catch (error) {
    return responseHelper.serverError("Failed to delete user");
  }
}
