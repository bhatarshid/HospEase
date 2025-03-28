import { bookAppointmentAPI, cancelAppointmentAPI, fetchAllAppointmentsAPI } from "@/lib/actions/service.actions";
import { AppointmentDetails } from "@/types/entities/service-types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppointmentState {
  appointments: AppointmentDetails[];
  appointment: any | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AppointmentState = {
  appointments: [],
  appointment: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const bookAppointment = createAsyncThunk('appointment/book',
  async (appointmentData: any, thunkApi) => {
    try {
      const response: any = await bookAppointmentAPI(appointmentData);
      return response.data.message;
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal Server Error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const fetchAllAppointments = createAsyncThunk('appointment/fetchAll',
  async (_, thunkApi) => {
    try {
      const response: any = await fetchAllAppointmentsAPI();
      return response.data.appointments;
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal Server Error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const cancelAppointment = createAsyncThunk('appointment/cancel',
  async (appointmentId: string, thunkApi) => {
    try {
      const response: any = await cancelAppointmentAPI(appointmentId);
      return { message: response.data.message, appointmentId };
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal Server Error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.appointments = []
      state.appointment = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(fetchAllAppointments.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = '';
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(cancelAppointment.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        const index = state.appointments.findIndex(app => app.id === action.payload.appointmentId);
        if (index !== -1) {
          state.appointments[index].status = 'CANCELLED';
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
  }
})

export const { reset } = appointmentSlice.actions
export default appointmentSlice.reducer