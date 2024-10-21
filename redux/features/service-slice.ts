import { fetchServicesAPI } from "@/lib/actions/service.actions";
import { Service } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ServiceState {
  services: Service[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ServiceState = {
  services: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const fetchServices = createAsyncThunk('doctor/all', 
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
  }
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer