import { bookAppointmentAPI, fetchAllAppointmentsAPI, fetchServiceDetailsAPI, fetchServicesAPI } from "@/lib/actions/service.actions";
import { AppointmentDetails, BookAppointment, ServiceDetailsResponse } from "@/types/entities/service-types";
import { Service } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ServiceState {
  services: Service[] | null;
  service: ServiceDetailsResponse | null;
  appointments: AppointmentDetails[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ServiceState = {
  services: null,
  service: null,
  appointments: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const fetchServices = createAsyncThunk('service/all', 
  async (_, thunkApi) => {
    try {
      const response: any = await fetchServicesAPI();
      return response;
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal server error';
      return thunkApi.rejectWithValue(message);
    }
  }
)
export const fetchServiceDetails = createAsyncThunk('service/view', 
  async (serviceId: string, thunkApi) => {
    try {
      const response: any = await fetchServiceDetailsAPI(serviceId);
      return response;
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal server error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const bookAppointment = createAsyncThunk('service/book', 
  async (appointmentData: BookAppointment, thunkApi) => {
    try {
      const response: any = await bookAppointmentAPI(appointmentData);
      return response;
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal server error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const fetchAllAppointments = createAsyncThunk('appointment/view', 
  async (_, thunkApi) => {
    try {
      const response: any = await fetchAllAppointmentsAPI();
      return response;
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal server error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const serviceSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.services = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = '';
        state.services = (action.payload.data.services);
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(fetchServiceDetails.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
      .addCase(fetchServiceDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = '';
        state.service = (action.payload.data.service as ServiceDetailsResponse);
      })
      .addCase(fetchServiceDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(bookAppointment.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = 'Appointment Booked Successfully';
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
        state.appointments = (action.payload.data.appointments as AppointmentDetails[]);
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
  }
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer