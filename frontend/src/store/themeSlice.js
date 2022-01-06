import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {},
  reducers: {
    changeTheme: (state, payload) => {},
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
