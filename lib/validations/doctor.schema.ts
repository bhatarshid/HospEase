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

export const updateDoctorBody = z.object({
  id: z.string(),
  firstName: z.string().min(3, 'First Name must be at least 3 characters long').optional(),
  lastName: z.string().min(3, 'Last Name must be at least 3 characters long').optional(),
  phoneNumber: phoneSchema.optional(),
  emailId: z.string().email().optional(),
  picture: z.instanceof(Buffer).optional(),
  specialization: z.string().optional(),
  department: z.string().optional(),
  experience: z.number().int().optional()
});

export const serviceDoctorBody = z.object({
  serviceId: z.string(),
  doctorId: z.string(),
  cost: z.number().int(),
  description: z.string().min(3, 'Description should be at least 3 characters long').optional()
});

export const timeSlot = z.object({
  serviceDoctorId: z.string(),
  doctorId: z.string(),
  startTime: z.date(),
  status: z.string()
})