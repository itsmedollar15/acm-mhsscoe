import { connectDB } from "@/config/database";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import { ROLES } from "@/constants/roles";

export const PUT = async (req, { params: { userId: targetUserId } }) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (
      ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_USERS].includes(user.role)
    )
      return errorResponse(403, "Unauthorized Access");

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return errorResponse(404, "User not found");

    const membershipResponse = await fetch(
      process.env.MEMBERSHIP_API + `?email=${targetUser.email}`
    );
    if (!membershipResponse.ok)
      return errorResponse(400, "Error updating membership");

    const {
      success,
      message,
      data: { membershipId } = {},
    } = await membershipResponse.json();

    if (!success) {
      targetUser.membershipId = undefined;
      await targetUser.save();
      return errorResponse(400, message);
    }

    targetUser.membershipId = membershipId;
    await targetUser.save();

    return successResponse(200, "Membership Updated");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
