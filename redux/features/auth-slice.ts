import { signupAPI } from '@/lib/actions/user.actions';
import { CreateUserInput, SignupResponse } from '@/types/entities';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: SignupResponse | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const signup = createAsyncThunk('auth/signup',
  async (user: CreateUserInput, thunkApi) => {
    try {
      return await signupAPI(user);
    }
    catch (error: any) {
      const message = error.response.data.error
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(signup.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(signup.fulfilled, (state, action: PayloadAction<SignupResponse>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Welcome! Your account is ready."
    })
    .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      state.user = null;
    })
  }
})


export const { reset } = authSlice.actions
export default authSlice.reducer