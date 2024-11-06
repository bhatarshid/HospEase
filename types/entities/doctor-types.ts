import { createDoctorBody, updateDoctorBody } from "@/lib/validations/doctor.schema";
import { Doctor } from "@prisma/client";
import { z } from "zod";

export type { Doctor as DoctorType }
export type CreateDoctorBody = z.infer<typeof createDoctorBody>;
export type UpdateDoctorBody = z.infer<typeof updateDoctorBody>;