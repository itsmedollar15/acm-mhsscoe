import { HTTP_METHODS } from "@/constants/httpMethods";
import {
  loginState,
  logoutState,
  profileCompleteState,
  profileIncompleteState,
} from "@/redux/reducers/authReducer";
import { dispatch } from "@/redux/store";
import httpRequest from "@/utils/httpRequest";

const UserService = {
  getAuthStatus: async () => {
    const res = await httpRequest(`/api/auth`, HTTP_METHODS.GET);
    if (res.success) {
      if (res.data.isLoggedIn) {
        dispatch(loginState(res.data));
        UserService.getProfileStatus();
      } else {
        dispatch(logoutState());
      }
    } else {
      dispatch(logoutState());
    }
  },

  getProfileStatus: async () => {
    const res = await httpRequest(`/api/user/profile/status`, HTTP_METHODS.GET);
    if (res.success) {
      if (res.data.isProfileIncomplete) {
        dispatch(profileIncompleteState());
        return res.message;
      } else {
        dispatch(profileCompleteState());
        return res.message;
      }
    } else {
      throw res.message;
    }
  },

  logout: async () => {
    const res = await httpRequest(`/api/auth`, HTTP_METHODS.DELETE);
    if (res.success) {
      dispatch(logoutState());
      return res.message;
    } else {
      throw res.message;
    }
  },

  getVerificationMail: async (email) => {
    const res = await httpRequest(
      `/api/auth/registration/verification`,
      HTTP_METHODS.POST,
      {
        email,
      }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  registerUser: async (password, token) => {
    const res = await httpRequest(`/api/auth/registration`, HTTP_METHODS.POST, {
      password,
      token,
    });

    if (res.success) {
      dispatch(loginState(res.data));
      return res.message;
    } else {
      throw res.message;
    }
  },

  login: async (email, password) => {
    const res = await httpRequest(`/api/auth/login`, HTTP_METHODS.POST, {
      email,
      password,
    });

    if (res.success) {
      dispatch(loginState(res.data));
      return res.message;
    } else {
      throw res.message;
    }
  },

  getPasswordResetMail: async (email) => {
    const res = await httpRequest(
      `/api/auth/resetPassword/verification`,
      HTTP_METHODS.POST,
      {
        email,
      }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  resetPassword: async (password, token) => {
    const res = await httpRequest(
      `/api/auth/resetPassword`,
      HTTP_METHODS.POST,
      {
        password,
        token,
      }
    );

    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  getProfileDetails: async () => {
    const res = await httpRequest(`/api/user/profile`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  updateProfileDetails: async (details) => {
    let form = new FormData();
    Object.keys(details).forEach((key) =>
      form.append(
        key,
        key === "links" ? JSON.stringify(details[key]) : details[key]
      )
    );

    const res = await httpRequest(
      `/api/user/profile`,
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

  searchUsers: async (searchQuery) => {
    const res = await httpRequest(
      `/api/user/search?query=${searchQuery}`,
      HTTP_METHODS.GET
    );
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  getUserDetails: async (userId) => {
    const res = await httpRequest(`/api/user/${userId}`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  createUser: async (details) => {
    let form = new FormData();
    Object.keys(details).forEach((key) => form.append(key, details[key]));

    const res = await httpRequest(`/api/user`, HTTP_METHODS.POST, form, true);
    if (res.success) {
      return { message: res.message, data: res.data };
    } else {
      throw res.message;
    }
  },

  updateUserDetails: async (userId, details) => {
    let form = new FormData();
    Object.keys(details).forEach((key) =>
      form.append(
        key,
        key === "links" ? JSON.stringify(details[key]) : details[key]
      )
    );

    const res = await httpRequest(
      `/api/user/${userId}`,
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

  updateMembership: async (userId) => {
    const res = await httpRequest(
      `/api/user/${userId}/membership`,
      HTTP_METHODS.PUT
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  assignRole: async (userId, role) => {
    const res = await httpRequest(
      `/api/user/${userId}/role`,
      HTTP_METHODS.PUT,
      { role }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  removeRole: async (userId) => {
    const res = await httpRequest(
      `/api/user/${userId}/role`,
      HTTP_METHODS.DELETE
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  getUserRole: async (userId) => {
    const res = await httpRequest(`/api/user/${userId}/role`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  getUsersByType: async (type = "all") => {
    const res = await httpRequest(`/api/users?type=${type}`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },
};

export default UserService;
