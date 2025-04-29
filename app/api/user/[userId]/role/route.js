import { connectDB } from "@/config/database";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import { ASSIGNABLE_ROLES, ROLES } from "@/constants/roles";

export const GET = async (req, { params: { userId } }) => {
  try {
    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");

    return successResponse(200, "User Role", { role: user.role });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PUT = async (req, { params: { userId: targetUserId } }) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (![ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(user.role))
      return errorResponse(403, "Unauthorized Access");

    const { role: requestedRole } = await req.json();
    if (!requestedRole)
      return errorResponse(400, "Please specify Requested Role");

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return errorResponse(404, "User not found");

    if (!ASSIGNABLE_ROLES.includes(requestedRole))
      return errorResponse(404, "Invalid Role");

    if (targetUser.role === ROLES.SUPER_ADMIN)
      return errorResponse(403, "Role Change Disabled");

    if (targetUser.role === ROLES.ADMIN && user.role !== ROLES.SUPER_ADMIN)
      return errorResponse(403, "Unauthorized Role Assignment");

    if (requestedRole === ROLES.ADMIN && user.role !== ROLES.SUPER_ADMIN)
      return errorResponse(403, "Unauthorized Role Assignment");

    targetUser.role = requestedRole;
    await targetUser.save();

    return successResponse(200, "Role Assigned");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const DELETE = async (req, { params: { userId: targetUserId } }) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (![ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(user.role))
      return errorResponse(403, "Unauthorized Access");

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return errorResponse(404, "User not found");

    if (targetUser.role === ROLES.SUPER_ADMIN)
      return errorResponse(403, "Role Change Disabled");

    if (targetUser.role === ROLES.ADMIN && user.role !== ROLES.SUPER_ADMIN)
      return errorResponse(403, "Unauthorized Role Deletion");

    targetUser.role = undefined;
    await targetUser.save();

    return successResponse(200, "Role Removed");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
