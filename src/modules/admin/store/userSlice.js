import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    roles: {},
    active: {},
    openModal: false,
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
    onActiveUser: (state, { payload }) => {
      state.active = payload;
    },
    onEdit: (state, { payload }) => {
      const ind = state.users.findIndex((x) => x.id == payload.id);
      state.users[ind] = { ...payload };
      state.errorMessage = 'User edited';
    },
    onDelete: (state, { payload }) => {
      state.users = state.users.filter((x) => x.id != payload.userId);
      state.errorMessage = 'User deleted';
    },
    onError: (state, { payload }) => {
      state.errorMessage = payload;
    },
    onOpenModal: (state) => {
      state.openModal = true;
    },
    onCloseModal: (state) => {
      state.openModal = false;
    },
  },
});

export const {
  onLoad,
  onError,
  onSave,
  onEdit,
  onDelete,
  onActiveUser,
  onOpenModal,
  onCloseModal,
} = userSlice.actions;
