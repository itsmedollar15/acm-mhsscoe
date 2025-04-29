import { connectDB } from "@/config/database";
import { ROLES } from "@/constants/roles";
import Event from "@/models/event";
import User from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { uploadFile, deleteFile } from "@/utils/fileStorage";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req, { params: { eventId } }) => {
  try {
    if (!eventId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Event not found");

    await connectDB();

    const event = await Event.findById(eventId);
    if (!event) return errorResponse(404, "Event not found");

    return successResponse(200, "All Event", { event });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PUT = async (req, { params: { eventId } }) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (
      ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_EVENTS].includes(user.role)
    )
      return errorResponse(403, "Unauthorized Access");

    if (!eventId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Event not found");

    const event = await Event.findById(eventId);
    if (!event) return errorResponse(404, "Event not found");

    const body = Object.fromEntries(await req.formData());
    const {
      title,
      description,
      poster,
      startDate,
      endDate,
      registrationEndDate,
      entryFees,
      membersEntryFees,
      registrationLink,
      blog,
    } = body;

    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      !registrationEndDate ||
      !entryFees ||
      !membersEntryFees ||
      !blog
    )
      return errorResponse(400, "Please fill all the fields");

    let posterPath;
    if (poster) {
      posterPath = await uploadFile(
        poster,
        "event_posters",
        `${event._id}-${Date.now()}`
      );

      if (event.poster) await deleteFile(event.poster);
    }

    if (!registrationLink) {
      event.registrationLink = undefined;
      await event.save();
    }

    await Event.findByIdAndUpdate(eventId, {
      title,
      description,
      startDate,
      endDate,
      registrationEndDate,
      entryFees,
      membersEntryFees,
      ...(registrationLink ? { registrationLink } : {}),
      blog,
      ...(poster ? { poster: posterPath } : {}),
    });

    return successResponse(200, "Event Updated successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const DELETE = async (req, { params: { eventId } }) => {
  try {
    const userId = await checkAuth(req);
    if (!userId) return errorResponse(403, "Please login first");

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return errorResponse(404, "Account not found");
    if (
      ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_EVENTS].includes(user.role)
    )
      return errorResponse(403, "Unauthorized Access");

    if (!eventId.match(/^[0-9a-fA-F]{24}$/))
      return errorResponse(404, "Event not found");

    const event = await Event.findByIdAndDelete(eventId);
    if (!event) return errorResponse(404, "Event not found");
    await deleteFile(event.poster);

    return successResponse(200, "Event Deleted successfully");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
