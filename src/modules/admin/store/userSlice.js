import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    roles: {},
    active: {},
    errorMessage: undefined,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.users = payload.users;
      state.roles = payload.roles;
    },
    onSave: (state, { payload }) => {
      state.users.push(payload.user);
    },
    onEdit: (state, { payload }) => {
      const ind = state.users.findIndex((x) => x.id == payload.user.id);
      state.users[ind] = payload.user;
      state.errorMessage = 'User edited';
    },
    onDelete: (state, { payload }) => {
      state.users = state.users.filter((x) => x.id != payload.userId);
      state.errorMessage = 'User deleted';
    },
    onError: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
});

export const { onLoad, onError, onSave, onEdit, onDelete } = userSlice.actions;
