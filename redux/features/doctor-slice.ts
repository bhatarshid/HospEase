import { fetchDoctorsAPI } from "@/lib/actions/doctor.actions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DoctorState {
  doctors: any[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: DoctorState = {
  doctors: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const fetchDoctors = createAsyncThunk('doctor/all', 
  async (_, thunkApi) => {
    try {
      const response: any = await fetchDoctorsAPI();
      return response;
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal server error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.doctors = null
    }
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
        state.message = '';
      })
     .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = '';
        state.doctors = (action.payload.data.doctors);
      })
     .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
  }
})

export const { reset } = doctorSlice.actions
export default doctorSlice.reducer