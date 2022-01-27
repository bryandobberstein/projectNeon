import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
    selected: null,
  },
  reducers: {
    initialize: (state, action) => {
      action.payload.map((item) => {
        state.folders.push(item);
      });
    },
    add: (state, action) => {
      state.folders.push(action.payload);
    },
    remove: (state, action) => {
      state.folders = state.folders.filter((item) => item != action.id);
      state.selected = null;
    },
    edit: (state, action) => {
      state.folders = state.folders.map((item) => {
        if (item.id == action.id) {
          item[action.key] = action.value;
        }
      });
      state.selected = null;
    },
    setSelected: (state, action) => {
      state.selected = action.id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialize, add, remove, edit, setSelected } =
  folderSlice.actions;

export default folderSlice.reducer;
