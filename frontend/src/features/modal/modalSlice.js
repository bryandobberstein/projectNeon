import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    child: "",
  },
  reducers: {
    openModal: (state, action) => {
      return { ...state, show: true, child: action.payload.child };
    },
    close: state => {
      return { ...state, show: false, child: "" };
    },
  },
});

export const { openModal, close } = modalSlice.actions;
export default modalSlice.reducer;
