import { bookAppointmentAPI } from "@/lib/actions/service.actions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppointmentState {
  appointments: any | null;
  appointment: any | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AppointmentState = {
  appointments: null,
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

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.appointments = null
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
        state.message = '';
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
    }
})

export const { reset } = appointmentSlice.actions
export default appointmentSlice.reducer