import { createSlice } from '@reduxjs/toolkit';

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    errorMessage: null,
  },
  reducers: {
    onLoad: (state, { payload }) => {
      state.jobs = payload.jobs;
      state.errorMessage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLoad } = jobSlice.actions;
