/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserInput, LoginInput, LoginResponse, ProfileType, ProfileUpdateInput, SignupResponse } from '@/types/entities';
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
    const signinApi: string = `${USER_API}?action=single&id=${encodeURIComponent(loginData.phoneNumber)}`
    const response: LoginResponse = await axios.get(signinApi);

    const signinResponse = await signIn("credentials", {
      phoneNumber: loginData.phoneNumber,
      password: loginData.password,
      redirect: false,
    });

    if (signinResponse?.error) {
      throw new Error('Invalid credentials');
    }

    return response;
  }
  catch (error: any) {
    throw new Error('Invalid credentials')
  }
}

export const registerPatientApi = async (registerPatientData: any): Promise<string> => {
  try {
    const response: string = await axios.post(`${USER_API}?action=register`, registerPatientData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }
  catch (error: any) {
    throw error;
  }
}

export const updateProfileApi = async (data: ProfileUpdateInput): Promise<string> => {
  try {
    const response: string = await axios.put(`${USER_API}?action=update`, data);
    return response;
  }
  catch (error) {
    throw error;
  }
}

export const getMyDetailsApi = async (): Promise<ProfileType> => {
  try {
    const response: ProfileType = await axios.get(`${USER_API}?action=me`);
    return response;
  }
  catch (error) {
    throw error;
  }
}