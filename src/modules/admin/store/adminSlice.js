import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    roles: [],
    jobs: [],
    ads: [],
    activeUser: {},
    activeJob: {},
    activeAdd: {},
    openModal: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.users = payload.users;
      state.roles = payload.roles;
      state.jobs = payload.jobs;
    },
    onLoadUsers: (state, { payload }) => {
      state.users = payload.users;
      state.roles = payload.roles;
    },
    onLoadJobs: (state, { payload }) => {
      state.jobs = payload.jobs;
    },
    onLoadAds: (state, { payload }) => {
      state.ads = payload.ads;
    },
    onSaveUser: (state, { payload }) => {
      state.users.push(payload.user);
    },
    onSaveJob: (state, { payload }) => {
      state.users.push(payload.job);
    },
    onSaveAdd: (state, { payload }) => {
      state.users.push(payload.add);
    },
    onActiveUser: (state, { payload }) => {
      state.activeUser = payload;
    },
    onActiveJob: (state, { payload }) => {
      state.activeJob = payload;
    },
    onActiveAdd: (state, { payload }) => {
      state.activeAdd = payload;
    },
    onEditUser: (state, { payload }) => {
      const ind = state.users.findIndex((x) => x.id == payload.id);
      state.users[ind] = { ...payload };
      state.errorMessage = {
        type: 'success',
        title: 'User edited',
        text: 'User modify',
      };
    },
    onEditJob: (state, { payload }) => {
      const ind = state.jobs.findIndex((x) => x.id == payload.id);
      state.jobs[ind] = { ...payload };
      state.errorMessage = {
        type: 'success',
        title: 'Job edited',
        text: 'Job modify',
      };
    },
    onDeleteJob: (state, { payload }) => {
      //state.users = state.users.filter((x) => x.id != payload.userId);
      const ind = state.jobs.findIndex((x) => x.id == payload);
      state.jobs[ind] = { ...state.jobs[ind], status: false };
      state.errorMessage = {
        type: 'success',
        title: 'Job deleted',
        text: 'Job deleted',
      };
    },
    onDeleteUser: (state, { payload }) => {
      //state.users = state.users.filter((x) => x.id != payload.userId);
      const ind = state.users.findIndex((x) => x.id == payload);
      state.users[ind] = { ...state.users[ind], status: false };
      state.errorMessage = {
        type: 'success',
        title: 'User deleted',
        text: 'User deleted',
      };
    },
    onDeleteAd: (state, { payload }) => {
      //state.users = state.users.filter((x) => x.id != payload.userId);
      const ind = state.ads.findIndex((x) => x.id == payload);
      state.ads[ind] = { ...state.ads[ind], status: false };
      state.errorMessage = {
        type: 'success',
        title: 'Ads deleted',
        text: 'Ads deleted',
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
      state.activeUser = {};
      state.activeJob = {};
      state.activeAdd = {};
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
  onSaveUser,
  onSaveJob,
  onSaveAdd,
  onEditUser,
  onEditJob,
  onDeleteUser,
  onDeleteJob,
  onDeleteAd,
  onActiveUser,
  onActiveJob,
  onOpenModal,
  onCloseModal,
  onClearErrorMessage,
} = adminSlice.actions;
