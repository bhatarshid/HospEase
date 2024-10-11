import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    }
  }
})


export const { logOut } = authSlice.actions
export default authSlice.reducer