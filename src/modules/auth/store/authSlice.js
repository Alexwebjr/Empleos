import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', //'checking', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.id;
      state.email = payload.email;
      state.displayName = payload.userName;
      //state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload.errorMessage;
    },
    onCheckingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLogin, onLogout, onCheckingCredentials } = authSlice.actions;
