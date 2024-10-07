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