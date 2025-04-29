import { connectDB } from "@/config/database";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { deleteFile, uploadFile } from "@/utils/fileStorage";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");

    return successResponse(200, "Profile Details", user);
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PUT = async (req) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");

    let body = Object.fromEntries(await req.formData());
    const { profilePicture, name, rollno, branch, year } = body;
    const links = body.links ? JSON.parse(body.links) : undefined;

    if (!name || !rollno || !branch || !year)
      return errorResponse(400, "Please fill all the fields");

    if (!user.profilePicture && !profilePicture)
      return errorResponse(400, "Please fill all the fields");

    if (profilePicture) {
      const profilePicturePath = await uploadFile(
        profilePicture,
        "profile_pictures",
        `${user._id}-${Date.now()}`
      );

      if (user.profilePicture) await deleteFile(user.profilePicture);

      user.profilePicture = profilePicturePath;
    }

    user.name = name;
    user.rollno = rollno;
    user.branch = branch;
    user.year = year;

    if (user.membershipId) user.links = links;

    await user.save();

    return successResponse(200, "Profile updated successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
