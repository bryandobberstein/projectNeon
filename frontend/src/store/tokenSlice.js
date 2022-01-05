import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    storeToken: (state, payload) => {
      state.token = payload.token;
    },
  },
});

export const { storeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
