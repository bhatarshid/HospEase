import { serviceDoctorBody } from "@/lib/validations/service.schema";
import { createServiceBody } from "@/lib/validations/service.schema";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export type ServiceDetails = Prisma.ServiceGetPayload<{
  include: {
    serviceDoctors: {
      include: {
        doctor: true
      }
    }
  }
}>

export type AppointmentWithDetails = Prisma.AppointmentGetPayload<{
  include: {
    serviceDoctor: {
      include: {
        doctor: true
        service: true
      }
    }
  }
}>

export type ServiceDoctor = Prisma.ServiceDoctorGetPayload<{
  include: {
    doctor: true
    slots: true
  }
}>;

export type Service = Prisma.ServiceGetPayload<{}>

export type ServiceDoctorDetails = {
  id: string;
  doctorId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailId: string | null;
  doctorPicture: Buffer | null;
  specialization: string;
  department: string;
  experience: number;
  cost: number;
  slots: Record<string, string[]>;
}

export type ServiceDetailsResponse = {
  id: string;
  serviceName: string;
  description: string;
  features: string[];
  picture: Buffer | null;
  serviceDoctors: ServiceDoctorDetails[];
}

export type BookAppointment = {
  serviceDoctorId: string;
  doctorId: string;
  appointmentDate: string;
  reason: string;
}

export type AppointmentDetails = {
  id: string;
  appointmentDate: Date;
  reason: string;
  status: string;
  serviceName: string;
  cost: number;
  doctorId: string;
  doctorFirstName: string;
  doctorLastName: string;
  doctorPicture: Buffer | null;
  doctorSpecialization: string;
}[]

export type CreateServiceBody = z.infer<typeof createServiceBody>;
export type ServiceDoctorBody = z.infer<typeof serviceDoctorBody>;
export type Slot = {
  id: string;
  startTime: Date;
  status: string;
  doctorId: string;
  serDocId?: string | null;
}