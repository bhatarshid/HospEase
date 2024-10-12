/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserInput, LoginInput, LoginResponse, SignupResponse } from '@/types/entities';
import { ApiErrorType } from '@/types/entities/common-types';
import axios from 'axios';
import { signIn } from 'next-auth/react';

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

export const signInApi = async (loginData: LoginInput): Promise<LoginResponse> => {
  try {
    const response = await signIn("credentials", {
      phoneNumber: loginData.phoneNumber,
      password: loginData.password,
      redirect: false,
    });

    if(response?.error) {
      throw response.error
    }

    const apiResponse = await axios.get(`${USER_API}/${loginData.phoneNumber}`);

    return {
      id: apiResponse.data.user.id,
      firstName: apiResponse.data.user.firstName,
      lastName: apiResponse.data.user.lastName,
      phoneNumber: apiResponse.data.user.phoneNumber,
      profilePicture: apiResponse.data.user.profilePicture,
      refreshToken: apiResponse.data.user.refreshToken
    }

  }
  catch (error: any) {
    throw error;
  }
}
