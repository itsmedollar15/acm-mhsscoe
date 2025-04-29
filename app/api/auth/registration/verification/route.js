import { errorResponse, successResponse } from "@/utils/sendResponse";
import { generateEmailToken } from "@/utils/verification";
import { sendVerificationMail } from "@/utils/mail";
import { connectDB } from "@/config/database";
import User from "@/models/user";

export const POST = async (req) => {
  try {
    let { email } = await req.json();
    if (!email) return errorResponse(400, "Please enter email address");
    if (!email.endsWith("@mhssce.ac.in")) return errorResponse(400, "Please enter a valid college domain email");
    email = email.toLowerCase();
    
    await connectDB();

    const user = await User.findOne({ email }).select("password");
    if (user?.password) return errorResponse(403, "Already registered");

    const { name } = email.split(".")[0];
    const token = generateEmailToken(email);
    const confirmation_link = `${process.env.CLIENT_URL}/register/${token}`;

    await sendVerificationMail(name, email, confirmation_link, "registration");

    return successResponse(200, "Verification mail sent");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
