import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
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
      state.folders = state.folders.filter((item) => item != action.payload);
    },
    edit: (state, action) => {
      state.folders = state.folders.map((item) => {
        if (item.id == action.id) {
          item[action.key] = action.value;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = folderSlice.actions;

export default folderSlice.reducer;
