import { createSlice } from "@reduxjs/toolkit";

export const linkSlice = createSlice({
  name: "links",
  initialState: {
    links: [],
  },
  reducers: {
    initializeLinks: (state, action) => {
      state.links = [u];
      action.payload.links.map(item => {
        state.links.push(item);
      });
    },
    addLinks: (state, action) => {
      state.links.push(action.payload);
    },
    editLinks: (state, action) => {
      state.folders.map(item => {
        if (item._id === action.payload.id) {
          item.key = action.payload.value;
        }
      });
    },
    removeLink: (state, action) => {
      state.links = state.links.filter(item => {
        return item._id !== action.payload.id;
      });
    },
    removeWithParent: (state, action) => {
      state.links = state.links.filter(item => {
        return item.parent !== action.payload.parent;
      });
    },
  },
});

export const {
  initializeLinks,
  addLinks,
  editLinks,
  removeLink,
  removeWithParent,
} = linkSlice.actions;
export default linkSlice.reducer;
