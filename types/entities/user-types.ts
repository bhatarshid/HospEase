import { profileUpdateSchema, registerPatientRequest, signupRequest } from "@/lib/validations/user.schema"
import { Patient } from "@prisma/client"
import { z } from "zod"

export type UserData = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string   
  password: string
  profilePicture?: Buffer | null,
  refreshToken?: string | null,
  isRegistered: boolean
  createdAt: Date
  updatedAt: Date 
  patient?: Patient | null
}

export type CreateUserInput = z.infer<typeof signupRequest>
export type UserDataType = Omit<UserData, 'password'>;
export type SignupResponse = Omit<UserDataType, 'refreshToken' | 'profilePicture'>;
export type LoginResponse = Omit<UserData, 'password' | 'createdAt'| 'updatedAt'>;
export type LoginInput = { phoneNumber: string; password: string };


export type RegisterPatientRequest = z.infer<typeof registerPatientRequest>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

export type ProfileType = {
    id: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    profilePicture?: Buffer | null;
    isRegistered: boolean;
    patient?: {
        id: string;
        emailId: string;
        dateOfBirth: Date;
        gender: string;
        address: string;
        occupation: string;
        emergencyContactName: string;
        emergencyContactNumber: string;
        doctor?: {
          id: string;
          firstName: string;
          lastName: string;
        } | null;
        insuranceProvider?: string | null;
        insurancePolicyNumber?: string | null;
        allergies: string;
        currentMedications?: string | null;
        familyMedicalHistory?: string | null;
        pastMedicalHistory?: string | null;
        idDocType: string;
        idNumber: string;
    } | null;
}
