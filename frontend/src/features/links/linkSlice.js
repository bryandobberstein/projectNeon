import { createSlice } from "@reduxjs/toolkit";

export const linkSlice = createSlice({
  name: "links",
  initialState: {
    links: [],
  },
  reducers: {
    initialize: (state, action) => {
      state.links = [u];
      action.payload.links.map(item => {
        state.links.push(item);
      });
    },
    add: (state, action) => {
      state.links.push(action.payload);
    },
    edit: (state, action) => {
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

export const { initialize, add, edit, removeLink, removeWithParent } =
  linkSlice.actions;
export default linkSlice.reducer;
