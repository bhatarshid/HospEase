import { z } from "zod";
import { phoneSchema } from "./common.schema";

export const createDoctorBody = z.object({
  firstName: z.string().min(3, 'First Name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Last Name must be at least 3 characters long'),  
  phoneNumber: phoneSchema,
  emailId: z.string().email().optional(),
  picture: z.instanceof(Buffer).optional(),
  specialization: z.string().min(3, 'Specialization must be at least 3 characters long'),
  department: z.string().min(3, 'Department must be at least 3 characters long'),
  experience: z.number().int().max(50, 'Experience must be at most 50')
})