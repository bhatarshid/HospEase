import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import doctorReducer from './features/doctor-slice';
import profileReducer from './features/profile-slice';
import serviceReducer from './features/service-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    profile: profileReducer,
    service: serviceReducer
  },    // function takes current state, action and returns new state
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;