import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "../initialState";

const authReducer = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    startAuthLoading: (state) => ({
      ...state,
      isAuthLoading: true,
    }),
    login: (state, { payload }) => ({
      ...state,
      isLoggedIn: true,
      isAuthLoading: false,
      profilePicture: payload?.profilePicture,
      name: payload?.name,
      email: payload?.email,
      role: payload?.role ?? undefined,
    }),
    logout: () => ({
      isLoggedIn: false,
      isAuthLoading: false,
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
  startAuthLoading: startAuthLoadingState,
  profileIncomplete: profileIncompleteState,
  profileComplete: profileCompleteState,
} = authReducer.actions;

export default authReducer.reducer;
