import { HTTP_METHODS } from "@/constants/httpMethods";
import httpRequest from "@/utils/httpRequest";

const EventService = {
  getAllEvents: async () => {
    const res = await httpRequest(`/api/events`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  getEventDetails: async (eventId) => {
    const res = await httpRequest(`/api/events/${eventId}`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  createNewEvent: async (details) => {
    let form = new FormData();
    Object.keys(details).forEach((key) => form.append(key, details[key]));
    const res = await httpRequest(`/api/events`, HTTP_METHODS.POST, form, true);
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  updateEventDetails: async (eventId, details) => {
    let form = new FormData();
    Object.keys(details).forEach((key) => form.append(key, details[key]));
    const res = await httpRequest(
      `/api/events/${eventId}`,
      HTTP_METHODS.PUT,
      form,
      true
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  deleteEvent: async (eventId) => {
    const res = await httpRequest(
      `/api/events/${eventId}`,
      HTTP_METHODS.DELETE
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },
};

export default EventService;
