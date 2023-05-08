import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    roles: [],
    jobs: [],
    ads: [],
    active: {},
    openModal: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.users = payload.users;
      state.roles = payload.roles;
      state.jobs = payload.jobs;
    },
    onLoadJobs: (state, { payload }) => {
      state.jobs = payload.jobs;
    },
    onLoadUsers: (state, { payload }) => {
      state.users = payload.users;
      state.roles = payload.roles;
    },
    onLoadAds: (state, { payload }) => {
      state.ads = payload.ads;
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
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined;
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
  onLoadJobs,
  onLoadUsers,
  onLoadAds,
  onError,
  onSave,
  onEdit,
  onDelete,
  onActiveUser,
  onOpenModal,
  onCloseModal,
  onClearErrorMessage,
} = adminSlice.actions;
