import { createSlice } from '@reduxjs/toolkit';

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    errorMessage: undefined,
    active: null,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.jobs = payload.jobs;
    },
    onActiveJob: (state, { payload }) => {
      state.active = payload;
    },
    onError: (state, { payload }) => {
      state.errorMessage = {
        type: 'error',
        title: 'Error',
        text: payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLoad, onActiveJob, onError } = jobSlice.actions;
