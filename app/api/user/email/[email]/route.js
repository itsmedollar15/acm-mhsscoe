import { connectDB } from "@/config/database";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req, { params: { email } }) => {
  try {
    await connectDB();

    let user = await User.findOne({ email: email + "@mhssce.ac.in" }).populate(
      "teams.team teams.post"
    );
    if (!user) return errorResponse(404, "Account not found");

    const teams = user.teams.map(({ team, section, post }) => ({
      year: team.year,
      section: team.sections.find(
        ({ _id: sectionId }) => section.toString() === sectionId.toString()
      ).title,
      post: post.title,
      level: post.level,
    }));

    return successResponse(200, "User Details", {
      user: { ...user._doc, teams },
    });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
