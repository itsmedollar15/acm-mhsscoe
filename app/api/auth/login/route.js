import { connectDB } from "@/config/database";
import User from "@/models/user";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const POST = async (req) => {
  try {
    let { email, password } = await req.json();
    if (!email || !password)
      return errorResponse(400, "Please fill all the fields");

    email = email.toLowerCase();

    await connectDB();

    const user = await User.findOne({ email }).select("+password");
    if (!user) return errorResponse(404, "Account not found");

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) return errorResponse(403, "Incorrect Credentials");

    const response = successResponse(200, "Logged in successfully", {
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
