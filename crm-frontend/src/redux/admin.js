
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  admin: "user",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminTrue: (state) => {
      state.admin = "admin";
    },
    setAdminFalse: (state) => {
      state.admin = "user";
    },
  },
});

export const { setAdminTrue, setAdminFalse } = adminSlice.actions;
export default adminSlice.reducer;
