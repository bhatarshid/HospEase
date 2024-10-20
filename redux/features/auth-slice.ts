import { signinApi, signupAPI } from '@/lib/actions/user.actions';
import { CreateUserInput, LoginInput, SignupResponse } from '@/types/entities';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';

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
      const message = error.response.data.error || 'Internal server error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const signin = createAsyncThunk('auth/signin', 
  async (credentials: LoginInput, thunkApi) => {
    try {
      const response: any = await signinApi(credentials);
      return response;
    }
    catch (error: any) {
      const message = error.message || 'Internal Server Error';
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const signout = createAsyncThunk('auth/signout', 
  async (_,thunkApi) => {
    try {
      await signOut()
      return 'Signout Successfull';
    }
    catch (error: any) {
      const message: string = 'Logout failed'
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
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
      state.isError = false;
      state.message = "Welcome! Your account is ready."
    })
    .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      state.user = null;
    })
    .addCase(signin.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(signin.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Sign in successful."
      state.user = (action.payload.data.user);
    })
    .addCase(signin.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload as string;
      state.user = null;
    })
    .addCase(signout.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(signout.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload as string;
      state.user = null;
    })
    .addCase(signout.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload as string;
    })
  }
})


export const { reset } = authSlice.actions
export default authSlice.reducer