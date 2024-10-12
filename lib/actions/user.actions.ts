/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserInput, SignupResponse } from '@/types/entities';
import { ApiErrorType } from '@/types/entities/common-types';
import axios from 'axios';

const USER_API = '/api/user';

export const signupAPI = async (user: CreateUserInput): Promise<SignupResponse> => {
  try {
    const response: SignupResponse = await axios.post(USER_API, user);
    return response;
  }
  catch (error: any) {
    throw error;
  }
}