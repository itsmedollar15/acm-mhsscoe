import { connectDB } from "@/config/database";
import Team from "@/models/team";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    await connectDB();

    let teams = await Team.find({}).select("year");
    if (!teams) return errorResponse(404, "No Teams found");

    teams.sort(
      ({ year: yearA }, { year: yearB }) => yearB.slice(-2) - yearA.slice(-2)
    );

    return successResponse(200, "All Teams", { teams });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
