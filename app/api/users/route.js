import { connectDB } from "@/config/database";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    const type = req.nextUrl.searchParams.get("type") ?? "all";
    console.log(type);

    await connectDB();

    let users;

    if (type === "all") {
      users = await User.find({}).select(
        "name email rollno profilePicture branch year role"
      );
    }

    if (type === "members") {
      users = await User.find({ membershipId: { $ne: null } }).select(
        "name email rollno profilePicture branch year role"
      );
    }

    if (type === "roles") {
      users = await User.find({ role: { $ne: null } }).select(
        "name email rollno profilePicture branch year role"
      );
    }

    if (!users) return errorResponse(404, "Users not found");

    return successResponse(200, "Users with Roles", { users });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
