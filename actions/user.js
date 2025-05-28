"use server";
import { connectDB } from "@/config/database";
import User from "@/models/user";

export const getUserDetailsByEmail = async (userEmail) => {
  try {
    await connectDB();

    let user = await User.findOne({
      email: userEmail.replaceAll(" ", "+"),
    }).populate("teams.team teams.post");

    if (!user) throw { status: 404, message: "User not found" };

    user = user.toObject();
    user._id = user._id.toString();

    const teams = user.teams.map(({ team, section, post }) => ({
      year: team.year,
      section: team.sections.find(
        ({ _id: sectionId }) => section.toString() === sectionId.toString()
      ).title,
      post: post.title,
      level: post.level,
    }));

    const userDetails = { ...user, teams };

    return userDetails;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};
