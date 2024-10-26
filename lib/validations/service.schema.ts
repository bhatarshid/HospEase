import { z } from "zod";

export const bookAppointmentRequest = z.object({
  serviceDoctorId: z.string(),
  appointmentDate: z.string(),
  reason: z.string()
})