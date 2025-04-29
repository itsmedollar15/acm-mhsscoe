import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "../initialState";

const authReducer = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login: (state, { payload }) => ({
      ...state,
      isLoggedIn: true,
      profilePicture: payload?.profilePicture,
      name: payload?.name,
      email: payload?.email,
      role: payload?.role ?? undefined,
    }),
    logout: () => ({
      isLoggedIn: false,
      profilePicture: undefined,
      name: undefined,
      email: undefined,
      role: undefined,
    }),
    profileIncomplete: (state) => ({
      ...state,
      isProfileIncomplete: true,
    }),
    profileComplete: (state) => ({
      ...state,
      isProfileIncomplete: undefined,
    }),
  },
});

export const {
  login: loginState,
  logout: logoutState,
  profileIncomplete: profileIncompleteState,
  profileComplete: profileCompleteState,
} = authReducer.actions;

export default authReducer.reducer;
