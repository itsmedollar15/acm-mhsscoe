import { connectDB } from "@/config/database";
import { ROLES } from "@/constants/roles";
import Post from "@/models/post";
import Team from "@/models/team";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req, { params: { teamYear } }) => {
  try {
    await connectDB();

    const team = await Team.findOne({ year: teamYear });
    if (!team) return errorResponse(404, "Team not found for this Year");

    return successResponse(200, "Team Details", { team });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

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
    if (team) return errorResponse(409, "Team already Exists for this Year");

    await Team.create({ year: teamYear });

    return successResponse(200, "Team Created Successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const DELETE = async (req, { params: { teamYear } }) => {
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

    const team = await Team.findOneAndDelete({ year: teamYear });
    if (!team) return errorResponse(404, "Team not found for this Year");

    if (team.sections.length > 0)
      await Promise.all(
        team.sections.map(async ({ posts }) => {
          if (posts.length > 0)
            await Promise.all(
              posts.map(async (postId) => {
                const post = await Post.findByIdAndDelete(postId);
                if (!post)
                  return errorResponse(404, "Post not found for this Section");

                const postHolder = await User.findById(post.user);
                if (!postHolder) return errorResponse(404, "User not found");

                const postHolderTeamIndex = postHolder.teams.indexOf(
                  postHolder.teams.filter(
                    ({ post: holderPostId }) =>
                      holderPostId.toString() === postId.toString()
                  )[0]
                );

                postHolder.teams.splice(postHolderTeamIndex, 1);
                await postHolder.save();
              })
            );
        })
      );

    return successResponse(200, "Team Deleted Successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
