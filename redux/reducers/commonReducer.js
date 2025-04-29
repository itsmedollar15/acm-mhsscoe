import { createSlice } from "@reduxjs/toolkit";
import { commonInitialState } from "../initialState";

const commonReducer = createSlice({
  name: "common",
  initialState: commonInitialState,
  reducers: {
    loading: (state, { payload: isLoading }) => ({ ...state, isLoading }),
  },
});

export const { loading: loadingState } = commonReducer.actions;

export default commonReducer.reducer;
