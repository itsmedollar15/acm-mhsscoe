import { connectDB } from "@/config/database";
import { ROLES } from "@/constants/roles";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (
      ![
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.MANAGE_TEAMS,
        ROLES.MANAGE_USERS,
        ROLES.USER_PROFILE,
      ].includes(user.role)
    )
      return errorResponse(403, "Unauthorized Access");

    const searchQuery = req.nextUrl.searchParams.get("query");

    const users = await User.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    });

    return successResponse(200, "Searched Users", { users });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
