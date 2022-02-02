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
      return {
        ...state,
        links: action.payload.map(link => {
          return { ...state.links.push(link) };
        }),
      };
    },
    addLink: (state, action) => {
      return { ...state, links: { ...state.links.concat(action.payload) } };
    },
    editLink: (state, action) => {
      return {
        ...state,
        links: state.links.map(link => {
          if (link._id === action.payload.id)
            return {
              ...state.links,
              link: (action.payload.key = action.payload.value),
            };
          return false;
        }),
      };
    },
    removeLink: (state, action) => {
      return {
        ...state,
        links: state.links.filter(link => {
          return link._id !== action.payload.id;
        }),
      };
    },
    removeWithParent: (state, action) => {
      return {
        ...state,
        links: state.links.filter(link => {
          return link.parent !== action.payload.parent;
        }),
      };
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
