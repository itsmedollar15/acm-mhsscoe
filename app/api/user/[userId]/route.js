import { connectDB } from "@/config/database";
import { ROLES } from "@/constants/roles";
import { checkAuth } from "@/utils/auth";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import { deleteFile, uploadFile } from "@/utils/fileStorage";

export const GET = async (req, { params: { userId } }) => {
  try {
    await connectDB();

    let user = await User.findById(userId).populate("teams.team teams.post");
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

export const PUT = async (req, { params: { userId: targetUserId } }) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (
      ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER_PROFILE].includes(user.role)
    )
      return errorResponse(403, "Unauthorized Access");

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return errorResponse(404, "User not found");
    if (targetUser.role === ROLES.SUPER_ADMIN)
      return errorResponse(403, "Unauthorized Access");

    let body = Object.fromEntries(await req.formData());
    const { profilePicture, name, rollno, branch, year } = body;
    const links = body.links ? JSON.parse(body.links) : undefined;

    if (!name || !rollno || !branch || !year)
      return errorResponse(400, "Please fill all the fields");

    if (!targetUser.profilePicture && !profilePicture)
      return errorResponse(400, "Please fill all the fields");

    if (profilePicture) {
      const profilePicturePath = await uploadFile(
        profilePicture,
        "profile_pictures",
        `${targetUser._id}-${Date.now()}`
      );

      if (targetUser.profilePicture)
        await deleteFile(targetUser.profilePicture);

      targetUser.profilePicture = profilePicturePath;
    }

    targetUser.name = name;
    targetUser.rollno = rollno;
    targetUser.branch = branch;
    targetUser.year = year;

    if (targetUser.membershipId) targetUser.links = links;

    await targetUser.save();

    return successResponse(200, "Profile updated successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
