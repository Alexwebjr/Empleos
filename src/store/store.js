import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../modules/auth/store/authSlice';
import { jobSlice } from '../modules/jobs/store';
import { userSlice } from '../modules/admin/store';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    job: jobSlice.reducer,
    user: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//export type AppDispatch = typeof store.dispatch;
