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
  currentMedications: z.string(),
  familyMedicalHistory: z.string().nullable().optional(),
  pastMedicalHistory: z.string().nullable().optional(),
  primaryPhysician: z.string().uuid().nullable().or(z.literal('')),
  idDocType: z.enum(["Aadhar", "Election Id", "Licence"]), // Adjust based on your allowed types
  idNumber: z.string(),
  idDoc: z.instanceof(Buffer).optional(), // For Bytes type
  treatmentConsent: z.boolean(),
  disclosureConsent: z.boolean(),
  privacyPolicy: z.boolean(),
  insurancePolicyNumber: z.string().nullable().optional(), // Optional for insurance policy number, depending on the system requirements
  insuranceProvider: z.string().nullable().optional(),
  picture: z.instanceof(Buffer).optional(), 
})

export const profileUpdateSchema = z.object({
  firstName: z.string().min(3, "First name is required").nullable().optional(),
  lastName: z.string().min(3, "Last name is required").nullable().optional(),
  emailId: z.string().email().nullable().optional(),
  dateOfBirth: z.coerce.date().nullable().optional(),
  address: z.string().nullable().optional(),
  occupation: z.string().nullable().optional(),
  gender: z.enum(['male', 'female']).nullable().optional(), 
  emergencyContactName: z.string().nullable().optional(),
  emergencyContactNumber: phoneSchema.nullable().optional(), // Basic phone number validation
  allergies: z.string().nullable().optional(),
  currentMedications: z.string().nullable().optional(),
  familyMedicalHistory: z.string().nullable().optional(),
  pastMedicalHistory: z.string().optional(),
  primaryPhysician: z.string().uuid().nullable().or(z.literal('')).optional(),
  idDocType: z.enum(["Aadhar", "Election Id", "Licence"]).nullable().optional(), // Adjust based on your allowed types
  idNumber: z.string().nullable().optional(),
  idDoc: z.instanceof(Buffer).optional(), // For Bytes type
  insurancePolicyNumber: z.string().nullable().optional(), // Optional for insurance policy number, depending on the system requirements
  insuranceProvider: z.string().nullable().optional(),
  picture: z.instanceof(Buffer).optional() 
})