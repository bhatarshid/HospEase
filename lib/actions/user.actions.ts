/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserInput, LoginInput, LoginResponse, SignupResponse } from '@/types/entities';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const USER_API = '/api/user';

export const signupAPI = async (user: CreateUserInput): Promise<SignupResponse> => {
  try {
    const response: SignupResponse = await axios.post(`${USER_API}?action=signup`, user);
    return response;
  }
  catch (error: any) {
    throw error;
  }
}

export const signinApi = async (loginData: LoginInput): Promise<LoginResponse> => {
  try { 
    const response: LoginResponse = await axios.get(`${USER_API}?action=single&id=${encodeURIComponent(loginData.phoneNumber)}`);
   
    await signIn("credentials", {
      phoneNumber: loginData.phoneNumber,
      password: loginData.password,
      redirect: false,
    });

    return response;
  }
  catch (error: any) {
    throw error;
  }
}