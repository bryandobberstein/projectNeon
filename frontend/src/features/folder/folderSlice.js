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
      state = action.payload.map(folder => {
        return state.folders.push(folder);
      });
    },
    add: (state, action) => {
      state.folders.concat(action.payload);
    },
    remove: (state, action) => {
      return {
        ...state,
        folders: state.folders.filter(folder => {
          return folder._id !== action.payload.id;
        }),
      };
    },
    edit: (state, action) => {
      state.folders.forEach(folder => {
        if (folder._id === action.payload.id) {
          folder.key = action.payload.value;
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
