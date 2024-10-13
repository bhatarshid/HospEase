import { z } from "zod";
import { passwordSchema, phoneSchema } from "./common.schema";

export const signupRequest = z.object({
  phoneNumber: phoneSchema,
  password: passwordSchema,
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
});

export const loginRequest = z.object({
  phone_no: phoneSchema,
  password: passwordSchema,
})

export const registerPatientRequest = z.object({
  emailId: z.string().email(),
  dateOfBirth: z.coerce.date(),
  address: z.string(),
  occupation: z.string(),
  gender: z.enum(['male', 'female']), 
  emergencyContactName: z.string(),
  emergencyContactNumber: phoneSchema, // Basic phone number validation
  allergies: z.string(),
  currentMedications: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  primaryPhysician: z.string().uuid().nullable().or(z.literal('')),
  idDocType: z.enum(["Aadhar", "Election Id", "Licence"]), // Adjust based on your allowed types
  idNumber: z.string(),
  idDoc: z.instanceof(Buffer).optional(), // For Bytes type
  treatmentConsent: z.boolean(),
  disclosureConsent: z.boolean(),
  privacyPolicy: z.boolean(),
  insurancePolicyNumber: z.string().optional(), // Optional for insurance policy number, depending on the system requirements
  insuranceProvider: z.string().optional(),
})