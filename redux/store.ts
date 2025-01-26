import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },    // function takes current state, action and returns new state
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;