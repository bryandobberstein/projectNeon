import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
    selected: "",
  },
  reducers: {
    initializeFolders: (state, action) => {
      state.folders = [];
      action.payload.map(item => {
        return state.folders.push(item);
      });
    },
    add: (state, action) => {
      state.folders.push(action.payload);
    },
    remove: (state, action) => {
      state.folders = state.folders.filter(item => {
        return item._id !== action.payload.id;
      });
    },
    edit: (state, action) => {
      state.folders.map(item => {
        if (item.id === action.payload.id) {
          item.key = action.payload.value;
        }
      });
    },
    setSelected: (state, action) => {
      state.selected = action.payload.id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initializeFolders, add, remove, edit, setSelected } =
  folderSlice.actions;

export default folderSlice.reducer;
