import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', //'checking', 'authenticated'
    id: null,
    email: null,
    userName: null,
    photoURL: null,
    errorMessage: undefined,
    loading: false,
  },
  reducers: {
    onLoading: (state, { payload }) => {
      state.loading = payload;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.id = payload.id;
      state.email = payload.email;
      state.userName = payload.userName;
      //state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.id = null;
      state.email = null;
      state.userName = null;
      state.photoURL = null;
      state.errorMessage = undefined;
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    onCheckingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onLoading,
  onLogin,
  onLogout,
  onCheckingCredentials,
  onClearErrorMessage,
} = authSlice.actions;
