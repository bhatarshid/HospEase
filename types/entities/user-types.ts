import { profileUpdateSchema } from "@/lib/validations/user.schema"
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

export type CreateUserInput = Omit<UserData, 'id' | 'createdAt' | 'updatedAt' | 'profilePicture' | 'refreshToken' | 'isRegistered'>;
export type UserDataType = Omit<UserData, 'password'>;
export type SignupResponse = Omit<UserDataType, 'refreshToken' | 'profilePicture'>;
export type LoginResponse = Omit<UserData, 'password' | 'createdAt'| 'updatedAt'>;
export type LoginInput = { phoneNumber: string; password: string };


export type PatientRequestType = {
  emailId: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician?: string | null;
  insuranceProvider?: string | null;
  insurancePolicyNumber?: string | null;
  currentMedications: string;
  pastMedicalHistory?: string | null;
  allergies: string;
  familyMedicalHistory?: string | null;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyPolicy: boolean;
  idDocType: string;
  idNumber: string;
  idDoc?: Buffer;
  picture?: Buffer;
}

export type ProfileUpdateInput = {
  firstName?:  string
  lastName?: string
  emailId?:  string
  dateOfBirth?:  Date | null
  address?:  string
  occupation?: string
  gender?: string | null
  emergencyContactName?: string
  emergencyContactNumber?: string
  allergies?:  string
  currentMedications?: string
  familyMedicalHistory?: string
  pastMedicalHistory?: string
  primaryPhysician?: string
  primaryPhysicianName?: string
  idDocType?:  string
  idNumber?: string
  idDoc?:  Buffer
  insurancePolicyNumber?:  string
  insuranceProvider?:  string
  picture?:  Buffer
}

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
