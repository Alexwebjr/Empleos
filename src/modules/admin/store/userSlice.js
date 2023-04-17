import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    errorMessage: undefined,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.users = payload.users;
    },
    onError: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
});

export const { onLoad, onError } = userSlice.actions;
