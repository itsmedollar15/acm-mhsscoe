import { connectDB } from "@/config/database";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    const userId = await checkAuth(req);
    if (!userId)
      return successResponse(200, "Auth Check", { isLoggedIn: false });

    await connectDB();

    let user = await User.findById(userId);
    if (!user)
      return successResponse(200, "Auth Check", {
        isLoggedIn: false,
      });

    return successResponse(200, "Auth Check", {
      isLoggedIn: true,
      profilePicture: user.profilePicture,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const DELETE = async (req) => {
  try {
    const response = successResponse(200, "Logged out successfully");
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
