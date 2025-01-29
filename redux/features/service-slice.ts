import { fetchServiceDetailsAPI, fetchServicesAPI } from "@/lib/actions/service.actions";
import { AppointmentDetails, ServiceDetailsResponse } from "@/types/entities/service-types";
import { Service } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ServiceState {
  services: Service[] | null;
  service: ServiceDetailsResponse | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ServiceState = {
  services: null,
  service: null,
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

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.services = null
      state.service = null
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
    }
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer