import { z } from "zod";

export const bookAppointmentRequest = z.object({
  serviceDoctorId: z.string(),
  appointmentDate: z.string(),
  reason: z.string()
})

export const createServiceBody = z.object({
  serviceName: z.string().min(4, 'Service Name must be at least 4 characters long'),
  description: z.string().min(4, 'Service Description must be at least 4 characters long'),
  picture: z.instanceof(Buffer).optional(),
  features: z.array(z.string())
})