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
      state.errorMessage = {
        type: 'success',
        title: 'User edited',
        text: 'User modify',
      };
    },
    onDelete: (state, { payload }) => {
      //state.users = state.users.filter((x) => x.id != payload.userId);
      const ind = state.users.findIndex((x) => x.id == payload);
      state.users[ind] = { ...state.users[ind], status: false };
      state.errorMessage = {
        type: 'success',
        title: 'User deleted',
        text: 'User deleted',
      };
    },
    onError: (state, { payload }) => {
      state.errorMessage = {
        type: 'error',
        title: 'Error',
        text: payload,
      };
    },
    onOpenModal: (state) => {
      state.openModal = true;
    },
    onCloseModal: (state) => {
      state.active = {};
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
