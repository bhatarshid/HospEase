import { Patient } from "@prisma/client"

export type UserData = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string   
  password: string
  profilePicture?: string | null,
  refreshToken?: string | null,
  createdAt: Date
  updatedAt: Date 
}

export type CreateUserInput = Omit<UserData, 'id' | 'createdAt' | 'updatedAt' | 'profilePicture' | 'refreshToken'>;
export type UserDataType = Omit<UserData, 'password'>;
export type SignupResponse = Omit<UserDataType, 'refreshToken' | 'profilePicture'>;
export type LoginResponse = Omit<UserData, 'password' | 'createdAt'| 'updatedAt'>;
export type LoginInput = { phoneNumber: string; password: string };

// export type PatientType = Omit<Patient, 'user' | 'appointments' | 'feedback' | 'medicalHistory' | 'doctor'>

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