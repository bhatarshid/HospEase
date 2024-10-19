import { profileUpdateSchema } from "@/lib/validations/user.schema"
import { Patient } from "@prisma/client"
import { z } from "zod"

export type UserData = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string   
  password: string
  profilePicture?: string | null,
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
  dateOfBirth: string;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician?: string | null;
  insuranceProvider?: string | null;
  insurancePolicyNumber?: string | null;
  currentMedications: string;
  pastMedicalHistory: string;
  allergies: string;
  familyMedicalHistory: string;
  identificationNumber: string;
  identificationType: string;
  identificationDocument: string;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyPolicy: boolean;
  idDocType: string;
  idNumber: string;
  idDoc?: Buffer;
}

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema> & { primaryPhysicianId: string };

export type ProfileType = {
    id: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    profilePicture?: string | null;
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
