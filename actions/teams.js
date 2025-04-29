"use server";
import { connectDB } from "@/config/database";
import Post from "@/models/post";
import Team from "@/models/team";

export const getAllTeams = async () => {
  try {
    await connectDB();

    let teams = await Team.find({}).select("year");
    if (!teams) throw { status: 404, message: "No Teams found" };

    teams.sort(
      ({ year: yearA }, { year: yearB }) => yearB.slice(-2) - yearA.slice(-2)
    );

    teams = teams.map((team) => {
      team = team.toObject();
      team._id = team._id.toString();
      return team;
    });

    return teams;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

export const getTeamSections = async (teamYear) => {
  try {
    await connectDB();

    const team = await Team.findOne({ year: teamYear });
    if (!team) throw { status: 404, message: "Team not found for this Year" };

    const sections = team.sections.map((section) => {
      return section._id.toString();
    });

    return sections;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

export const getTeamSectionDetails = async (teamYear, sectionId) => {
  try {
    await connectDB();

    const team = await Team.findOne({ year: teamYear }).populate({
      path: "sections.posts",
      populate: {
        path: "user",
        select: "profilePicture name email year branch",
      },
    });
    if (!team) throw { status: 404, message: "Team not found for this Year" };

    if (!sectionId.match(/^[0-9a-fA-F]{24}$/))
      throw { status: 404, message: "Section not found for this Team" };

    const sectionIndex = team.sections.indexOf(
      team.sections.filter(
        ({ _id }) => _id.toString() === sectionId.toString()
      )[0]
    );

    if (sectionIndex < 0)
      throw { status: 404, message: "Section not found for this Team" };

    const posts = team.sections[sectionIndex].posts.map((post) => {
      post = post.toObject();
      post._id = post._id.toString();
      post.user._id = post.user._id.toString();
      return post;
    });

    const section = {
      title: team.sections[sectionIndex].title,
      posts,
    };

    return section;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};
