import { connectDB } from "@/config/database";
import { ROLES } from "@/constants/roles";
import Post from "@/models/post";
import Team from "@/models/team";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req, { params: { teamYear, sectionId } }) => {
  try {
    await connectDB();

    const team = await Team.findOne({ year: teamYear }).populate({
      path: "sections.posts",
      populate: {
        path: "user",
        select: "profilePicture name email year branch",
      },
    });
    if (!team) return errorResponse(404, "Team not found for this Year");

    if (!sectionId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Section not found for this Team");

    const sectionIndex = team.sections.indexOf(
      team.sections.filter(
        ({ _id }) => _id.toString() === sectionId.toString()
      )[0]
    );

    if (sectionIndex < 0)
      return errorResponse(404, "Section not found for this Team");

    return successResponse(200, "Team Section Details", {
      section: team.sections[sectionIndex],
    });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const POST = async (req, { params: { teamYear, sectionId } }) => {
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
    if (!sectionId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Section not found for this Team");

    const sectionIndex = team.sections.indexOf(
      team.sections.filter(
        ({ _id }) => _id.toString() === sectionId.toString()
      )[0]
    );

    if (sectionIndex < 0)
      return errorResponse(404, "Section not found for this Team");

    const { title, level, userId: postHolderId } = await req.json();
    if (!title || !postHolderId || level === undefined)
      return errorResponse(400, "Please fill all the fields");
    if (level < 0 || level > 3)
      return errorResponse(400, "Level must be between 0 and 3");

    if (!postHolderId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "User not found");

    const postHolder = await User.findById(postHolderId);
    if (!postHolder) return errorResponse(404, "User not found");

    const isAlreadyAssigned = postHolder.teams.find(
      ({ team: postHolderCurrTeamId }) =>
        postHolderCurrTeamId.toString() === team._id.toString()
    );

    if (isAlreadyAssigned)
      return errorResponse(409, "User already Assigned to a Post");

    const post = await Post.create({ title, level, user: postHolderId });

    team.sections[sectionIndex].posts.push(post._id);
    await team.save();

    postHolder.teams.push({
      team: team._id,
      section: sectionId,
      post: post._id,
    });
    await postHolder.save();

    return successResponse(200, "Post Assigned");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PUT = async (req, { params: { teamYear, sectionId } }) => {
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
    if (!sectionId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Section not found for this Team");

    const sectionIndex = team.sections.indexOf(
      team.sections.filter(
        ({ _id }) => _id.toString() === sectionId.toString()
      )[0]
    );

    if (sectionIndex < 0)
      return errorResponse(404, "Section not found for this Team");

    const { title } = await req.json();

    team.sections[sectionIndex].title = title !== "" ? title : undefined;
    await team.save();

    return successResponse(200, "Section Title Updated");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PATCH = async (req, { params: { teamYear, sectionId } }) => {
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
    if (!sectionId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Section not found for this Team");

    const sectionIndex = team.sections.indexOf(
      team.sections.filter(
        ({ _id }) => _id.toString() === sectionId.toString()
      )[0]
    );

    if (sectionIndex < 0)
      return errorResponse(404, "Section not found for this Team");

    const { direction } = await req.json();
    if (!direction) return errorResponse(400, "Please specify direction");
    if (direction !== "UP" && direction !== "DOWN")
      return errorResponse(400, "Invalid Direction");

    const targetIndex =
      direction === "UP" ? sectionIndex - 1 : sectionIndex + 1;

    if (targetIndex < 0 || targetIndex >= team.sections.length)
      return errorResponse(400, "Invalid Movement");

    [team.sections[sectionIndex], team.sections[targetIndex]] = [
      team.sections[targetIndex],
      team.sections[sectionIndex],
    ];

    await team.save();

    return successResponse(200, "Section Moved");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
export const DELETE = async (req, { params: { teamYear, sectionId } }) => {
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
    if (!sectionId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Section not found for this Team");

    const sectionIndex = team.sections.indexOf(
      team.sections.filter(
        ({ _id }) => _id.toString() === sectionId.toString()
      )[0]
    );

    if (sectionIndex < 0)
      return errorResponse(404, "Section not found for this Team");

    const sectionPosts = team.sections[sectionIndex].posts;

    if (sectionPosts.length > 0)
      await Promise.all(
        sectionPosts.map(async (postId) => {
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

    team.sections.splice(sectionIndex, 1);
    await team.save();

    return successResponse(200, "Section Deleted");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
