import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    child: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.show = true;
      state.child = action.payload.child;
    },
    close: (state) => {
      state.show = false;
      state.child = "";
    },
  },
});

export const { openModal, close } = modalSlice.actions;
export default modalSlice.reducer;
