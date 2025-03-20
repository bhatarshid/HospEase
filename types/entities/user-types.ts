import { profileUpdateSchema, registerPatientRequest, signupRequest } from "@/lib/validations/user.schema"
import { Patient, User } from "@prisma/client"
import { z } from "zod"

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string ;  
  password: string;
  profilePicture?: Buffer | null;
  refreshToken?: string | null;
  isRegistered: boolean;
  userType: string;
  createdAt: Date;
  updatedAt: Date ;
  patient?: Patient | null;
}

export type CreateUserInput = z.infer<typeof signupRequest>
export type UserDataType = Omit<User, 'password'>;
export type SignupResponse = Omit<UserDataType, 'refreshToken' | 'profilePicture'>;
export type LoginResponse = Omit<UserData, 'password' | 'createdAt'| 'updatedAt'>;
export type LoginInput = { phoneNumber: string; password: string };


export type RegisterPatientRequest = z.infer<typeof registerPatientRequest>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema> & { primaryPhysicianName?: string };

export type ProfileType = User & Patient
export enum UserType {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT"
}