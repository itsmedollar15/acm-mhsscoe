import { connectDB } from "@/config/database";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import { verifyEmailToken } from "@/utils/verification";

export const POST = async (req) => {
  try {
    const { token: emailToken, password } = await req.json();
    if (!emailToken || !password)
      return errorResponse(400, "Please fill all the fields");

    const { email } = verifyEmailToken(emailToken);
    if (!email) return errorResponse(401, "Invalid token");
    if (!email.endsWith("@mhssce.ac.in"))
      return errorResponse(400, "Please enter a valid college domain email");

    await connectDB();

    let user = await User.findOne({ email }).select("+password");

    if (user) {
      if (user.password) return errorResponse(403, "Already registered");
      user.password = password;
      await user.save();
    } else {
      user = await User.create({ email, password });
    }

    const membershipResponse = await fetch(
      process.env.MEMBERSHIP_API + `?email=${user.email}`
    );
    if (membershipResponse.ok) {
      const { success, data: { membershipId } = {} } =
        await membershipResponse.json();

      if (success) {
        user.membershipId = membershipId;
        await user.save();
      }
    }

    const response = successResponse(200, "Registration done successfully", {
      profilePicture: user.profilePicture,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const token = user.generateToken();

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 30,
    });

    return response;
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
