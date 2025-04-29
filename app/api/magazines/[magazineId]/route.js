import { errorResponse, successResponse } from "@/utils/sendResponse";
import Magazine from "@/models/magazine";
import { connectDB } from "@/config/database";
import { deleteFile } from "@/utils/fileStorage";

export const GET = async (req, { params: { magazineId } }) => {
  try {
    await connectDB();
    const magazine = await Magazine.findById(magazineId);
    if (!magazine) return errorResponse(404, "Magazine not found");
    return successResponse(200, "Magazine Details", { magazine });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const DELETE = async (req, { params: { magazineId } }) => {
  try {
    await connectDB();
    const magazine = await Magazine.findById(magazineId);
    if (!magazine) return errorResponse(404, "Magazine not found");

    await Promise.all(
      magazine.pages.map(async (pagePath, index) => {
        pagePath && (await deleteFile(pagePath));
      })
    );

    await Magazine.findByIdAndDelete(magazineId);
    
    return successResponse(200, "Magazine Deleted Successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
