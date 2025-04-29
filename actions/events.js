"use server";
import { connectDB } from "@/config/database";
import Event from "@/models/event";

export const getAllEvents = async () => {
  try {
    await connectDB();

    let events = await Event.find({}).select("title description poster startDate");

    events.sort(
      ({ startDate: startDateA }, { startDate: startDateB }) =>
        startDateA - startDateB
    );

    events = events.map((event) => {
      event = event.toObject();
      event._id = event._id.toString();
      return event;
    });

    return events;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};

export const getEventDetails = async (eventId) => {
  try {
    if (!eventId.match(/^[0-9a-fA-F]{24}$/))
      throw { status: 404, message: "Event not found" };

    await connectDB();

    let event = await Event.findById(eventId);
    if (!event) throw { status: 404, message: "Event not found" };

    event = event.toObject();
    event._id = event._id.toString();

    return event;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
};
