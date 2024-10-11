import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';

export const store = configureStore({
  reducer: {
    authReducer
  },    // function takes current state, action and returns new state
});