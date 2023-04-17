import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    roles: {},
    errorMessage: undefined,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.users = payload.users;
      state.roles = payload.roles;
    },
    onError: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
});

export const { onLoad, onError } = userSlice.actions;
