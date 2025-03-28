import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMyDetailsApi, registerPatientApi, updateProfileApi } from '@/lib/actions/user.actions';
import { ProfileType } from '@/types/entities';

interface ProfileState {
  profile: any | null;
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

export const getMyDetails = createAsyncThunk('user/details', 
  async (_, thunkApi) => {
    try {
      const response = await getMyDetailsApi();
      return response;
    }
    catch (error: any) {
      const message = error.message.data.error || 'Internal Server Error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const registerPatient = createAsyncThunk('user/register',
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

export const userSlice = createSlice({
  name: 'user',
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
        state.message = "Profile updated"
      })
      .addCase(updateProfile.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
  }
})

export const { reset } = userSlice.actions
export default userSlice.reducer