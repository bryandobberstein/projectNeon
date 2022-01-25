import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    child: null,
  },
  reducer: {
    open: (state, action) => {
      state.open = true;
      state.child = action.child;
    },
    close: (state) => {
      state.open = false;
      state.child = null;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
