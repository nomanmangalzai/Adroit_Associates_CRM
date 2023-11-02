import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popup: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopupTrue: (state) => {
      state.popup = true;
    },
    setPopupFalse: (state) => {
      state.popup = false;
    },
  },
});

export const { setPopupTrue, setPopupFalse } = popupSlice.actions;
export default popupSlice.reducer;
