import { connectDB } from "@/config/database";
import { ROLES } from "@/constants/roles";
import Post from "@/models/post";
import Team from "@/models/team";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const PUT = async (req, { params: { teamYear, sectionId, postId } }) => {
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
      team.sections.filter(({ _id }) => _id.toString() === sectionId)[0]
    );

    if (sectionIndex < 0)
      return errorResponse(404, "Section not found for this Team");

    if (!postId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Post not found for this Section");
    const post = await Post.findById(postId);
    if (!post) return errorResponse(404, "Post not found for this Section");

    const { title, level, userId: newPostHolderId } = await req.json();
    if (!title || !newPostHolderId || level === undefined)
      return errorResponse(400, "Please fill all the fields");
    if (level < 0 || level > 3)
      return errorResponse(400, "Level must be between 0 and 3");

    if (post.user.toString() !== newPostHolderId) {
      const currPostHolder = await User.findById(post.user);
      if (!currPostHolder) return errorResponse(404, "User not found");

      if (!newPostHolderId.match(/^[0-9a-fA-F]{24}$/))
        return errorResponse(404, "User not found");

      const newPostHolder = await User.findById(newPostHolderId);
      if (!newPostHolder) return errorResponse(404, "User not found");

      const isAlreadyAssigned = newPostHolder.teams.find(
        ({ team: newPostHolderCurrTeamId }) =>
          newPostHolderCurrTeamId.toString() === team._id.toString()
      );

      if (isAlreadyAssigned)
        return errorResponse(409, "User already Assigned to a Post");

      const currPostHolderTeamIndex = currPostHolder.teams.indexOf(
        currPostHolder.teams.filter(
          ({ post: currHolderPostId }) =>
            currHolderPostId.toString() === postId.toString()
        )[0]
      );

      currPostHolder.teams.splice(currPostHolderTeamIndex, 1);

      newPostHolder.teams.push({
        team: team._id,
        section: sectionId,
        post: postId,
      });

      await currPostHolder.save();
      await newPostHolder.save();
    }

    post.title = title;
    post.level = level;
    post.user = newPostHolderId;

    await post.save();

    return successResponse(200, "Post Updated");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PATCH = async (
  req,
  { params: { teamYear, sectionId, postId } }
) => {
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

    if (!postId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Post not found for this Section");
    const post = await Post.findById(postId);
    if (!post) return errorResponse(404, "Post not found for this Section");

    const postIndex = team.sections[sectionIndex].posts.indexOf(
      team.sections[sectionIndex].posts.filter(
        ({ _id }) => _id.toString() === postId.toString()
      )[0]
    );

    const { direction } = await req.json();
    if (!direction) return errorResponse(400, "Please specify direction");
    if (direction !== "LEFT" && direction !== "RIGHT")
      return errorResponse(400, "Invalid Direction");

    const targetIndex = direction === "LEFT" ? postIndex - 1 : postIndex + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= team.sections[sectionIndex].posts.length
    )
      return errorResponse(400, "Invalid Movement");

    [
      team.sections[sectionIndex].posts[postIndex],
      team.sections[sectionIndex].posts[targetIndex],
    ] = [
      team.sections[sectionIndex].posts[targetIndex],
      team.sections[sectionIndex].posts[postIndex],
    ];

    await team.save();

    return successResponse(200, "Post Moved");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const DELETE = async (
  req,
  { params: { teamYear, sectionId, postId } }
) => {
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

    if (!postId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Post not found for this Section");
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return errorResponse(404, "Post not found for this Section");

    const postHolder = await User.findById(post.user);
    if (!postHolder) return errorResponse(404, "User not found");

    const postHolderTeamIndex = postHolder.teams.indexOf(
      postHolder.teams.filter(
        ({ post: currHolderPostId }) =>
          currHolderPostId.toString() === postId.toString()
      )[0]
    );

    postHolder.teams.splice(postHolderTeamIndex, 1);
    await postHolder.save();

    team.sections[sectionIndex].posts.splice(
      team.sections[sectionIndex].posts.indexOf(postId),
      1
    );
    await team.save();

    return successResponse(200, "Post Removed");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
