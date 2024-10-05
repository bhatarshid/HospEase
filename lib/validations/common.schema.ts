import { z } from "zod";
import { passwordRegex } from "../utils";

export const phoneSchema = z
  .string()
  .trim()
  .refine((val) => val.length === 10, {
    message: 'Phone number must be exactly 10 digits'
  });

// Type for the validated phone number
export type PhoneSchema = z.infer<typeof phoneSchema>;

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(50, "Password cannot exceed 50 characters")
  .regex(passwordRegex, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  });