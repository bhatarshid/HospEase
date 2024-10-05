import { z } from "zod";
import { passwordSchema, phoneSchema } from "./common.schema";

export const signupRequest = z.object({
  phone_no: phoneSchema,
  password: passwordSchema,
  first_name: z.string().min(3, "First name is required"),
  last_name: z.string().min(3, "Last name is required"),
});