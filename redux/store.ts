import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import userReducer from './features/user-slice';
import doctorReducer from './features/doctor-slice';
import serviceReducer from './features/service-slice';
import appointmentReducer from './features/appointment-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    doctor: doctorReducer,
    service: serviceReducer,
    appointment: appointmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;