import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/admin";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
