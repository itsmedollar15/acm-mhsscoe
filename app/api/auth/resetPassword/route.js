import { connectDB } from "@/config/database";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import { verifyPasswordToken } from "@/utils/verification";

export const POST = async (req) => {
  try {
    const { token: passwordToken, password } = await req.json();
    if (!passwordToken || !password)
      return errorResponse(400, "Please fill all the fields");

    const { email } = verifyPasswordToken(passwordToken);
    if (!email) return errorResponse(401, "Invalid token");
    if (!email.endsWith("@mhssce.ac.in"))
      return errorResponse(400, "Please enter a valid college domain email");

    await connectDB();

    let user = await User.findOne({ email });
    if (!user) return errorResponse(403, "Account not found");

    user.password = password;
    await user.save();

    return successResponse(200, "Password Reset done successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
