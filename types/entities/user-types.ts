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

export type RegistrationData = {
  email: string;
  birthDate: string;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  currentMedication: string;
  allergies: string;
  familyMedicalHistory: string;
  identificationNumber: string;
  identificationType: string;
  identificationDocument: string;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
}