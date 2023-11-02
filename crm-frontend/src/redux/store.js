import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/admin";
import popupReducer from "../redux/popup";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    popup: popupReducer,
  },
});
