import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./reducers/commonReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: { common: commonReducer, auth: authReducer },
});

export const dispatch = (action) => store.dispatch(action);

export default store;
