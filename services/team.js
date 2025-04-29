import { HTTP_METHODS } from "@/constants/httpMethods";
import httpRequest from "@/utils/httpRequest";

const TeamService = {
  getAllTeams: async () => {
    const res = await httpRequest(`/api/teams`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  getTeamDetails: async (teamYear) => {
    const res = await httpRequest(`/api/teams/${teamYear}`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  createTeam: async (teamYear) => {
    const res = await httpRequest(`/api/teams/${teamYear}`, HTTP_METHODS.POST);
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  deleteTeam: async (teamYear) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}`,
      HTTP_METHODS.DELETE
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  createTeamSection: async (teamYear) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/sections`,
      HTTP_METHODS.POST
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  getTeamSectionDetails: async (teamYear, sectionId) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/${sectionId}`,
      HTTP_METHODS.GET
    );
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  updateTeamSectionTitle: async (teamYear, sectionId, title) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/${sectionId}`,
      HTTP_METHODS.PUT,
      { title }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  moveTeamSection: async (teamYear, sectionId, direction) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/${sectionId}`,
      HTTP_METHODS.PATCH,
      { direction }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  deleteTeamSection: async (teamYear, sectionId) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/${sectionId}`,
      HTTP_METHODS.DELETE
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  assignPost: async (teamYear, sectionId, details) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/${sectionId}`,
      HTTP_METHODS.POST,
      details
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  updatePostDetails: async (teamYear, sectionId, postId, details) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/${sectionId}/${postId}`,
      HTTP_METHODS.PUT,
      details
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  moveTeamSectionPost: async (teamYear, sectionId, postId, direction) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/${sectionId}/${postId}`,
      HTTP_METHODS.PATCH,
      { direction }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  removePost: async (teamYear, sectionId, postId) => {
    const res = await httpRequest(
      `/api/teams/${teamYear}/${sectionId}/${postId}`,
      HTTP_METHODS.DELETE
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },
};

export default TeamService;
