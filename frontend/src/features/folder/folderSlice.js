import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
    selected: "",
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
      console.log(action);
      state.folders = state.folders.filter((item) => {
        return item._id !== action.payload.id;
      });
      state.selected = null;
    },
    edit: (state, action) => {
      state.folders = state.folders.map((item) => {
        if (item.id === action.payload.id) {
          item[action.payload.key] = action.payload.value;
        }
      });
      state.selected = "";
    },
    setSelected: (state, action) => {
      state.selected = action.payload.id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialize, add, remove, edit, setSelected } =
  folderSlice.actions;

export default folderSlice.reducer;
