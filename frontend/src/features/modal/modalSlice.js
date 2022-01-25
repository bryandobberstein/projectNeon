import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    child: null,
  },
  reducer: {
    open: (state, action) => {
      state.show = true;
      state.child = action.child;
    },
    close: (state) => {
      state.show = false;
      state.child = null;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
