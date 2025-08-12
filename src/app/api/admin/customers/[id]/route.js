// src/app/api/users/[id]/route.js
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import responseHelper from "@/lib/responseHelper";

export async function GET(req, { params }) {
  await connectDb();
  try {
    const user = await User.findById(params.id);
    console.log("user", user);
    if (!user) return responseHelper.notFound("User not found");
    return successArray(user);
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

export async function DELETE(req, context) {
  console.log("Deleting user with ID:", context);
  const { id } = await context.params;

  console.log("Deleting user with ID:", id);

  await connectDb();

  try {
    if (!id) {
      return responseHelper.badRequest("Invalid user selected");
    }
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return responseHelper.notFound("User not found");
    }

    return responseHelper.success("User deleted successfully");
  } catch (error) {
    console.error(error);
    return responseHelper.serverError("Something went wrong");
  }
}
