import { getMyDetailsApi, registerPatientApi, updateProfileApi } from '@/lib/actions/user.actions';
import { PatientRequestType, ProfileType, ProfileUpdateInput } from '@/types/entities';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  profile: ProfileType | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ProfileState = {
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const registerPatient = createAsyncThunk('auth/register',
  async (patientData: any, thunkApi) => {
    try {
      const response: any = await registerPatientApi(patientData);
      return response.data.message;
    }
    catch (error: any) {
      const message = error.response.data.error || 'Internal Server Error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const updateProfile = createAsyncThunk('auth/profile', 
  async (patientData: any, thunkApi) => {
    try {
      const response: any = await updateProfileApi(patientData);
      return response.data.message;
    }
    catch (error: any) {
      const message = error.message.data.error || 'Internal Server Error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const getMyDetails = createAsyncThunk('auth/details', 
  async (_, thunkApi) => {
    try {
      const response: any = await getMyDetailsApi();
      return response;
    }
    catch (error: any) {
      const message = error.message.data.error || 'Internal Server Error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.profile = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerPatient.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload as string;
      })
      .addCase(registerPatient.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(getMyDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload as string;
        state.profile = action.payload.data.profile
      })
      .addCase(getMyDetails.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
  }
})

export const { reset } = profileSlice.actions
export default profileSlice.reducer