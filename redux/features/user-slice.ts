import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMyDetailsApi } from '@/lib/actions/user.actions';
import { ProfileType } from '@/types/entities';

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

export const getMyDetails = createAsyncThunk('auth/details', 
  async (_, thunkApi) => {
    try {
      const response: ProfileType = await getMyDetailsApi();
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