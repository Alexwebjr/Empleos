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
    setActiveJob: (state, { payload }) => {
      state.active = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLoad, setActiveJob } = jobSlice.actions;
