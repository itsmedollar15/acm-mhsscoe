import { connectDB } from "@/config/database";
import { ROLES } from "@/constants/roles";
import Team from "@/models/team";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const POST = async (req, { params: { teamYear } }) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (
      ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_TEAMS].includes(user.role)
    )
      return errorResponse(403, "Unauthorized Access");

    const team = await Team.findOne({ year: teamYear });
    if (!team) return errorResponse(404, "Team not found for this Year");

    team.sections.push({});
    await team.save();

    return successResponse(200, "Section added Successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
