import { createSlice } from "@reduxjs/toolkit";

export const linkSlice = createSlice({
  name: "links",
  initialState: {
    links: [],
    selected: "",
  },
  reducers: {
    initializeLinks: (state, action) => {
      state.links = [];
      action.payload.forEach(item => {
        return state.links.push(item);
      });
    },
    addLink: (state, action) => {
      state.links.push(action.payload);
    },
    editLink: (state, action) => {
      state.folders.forEach(item => {
        if (item._id === action.payload.id) {
          return (item.key = action.payload.value);
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
    setLinkSelected: (state, action) => {
      state.selected = action.payload.id;
    },
  },
});

export const {
  initializeLinks,
  addLink,
  editLink,
  removeLink,
  removeWithParent,
  setLinkSelected,
} = linkSlice.actions;
export default linkSlice.reducer;
