import { Prisma } from "@prisma/client";

export type ServiceDetails = Prisma.ServiceGetPayload<{
  include: {
    serviceDoctors: {
      include: {
        doctor: true
      }
    }
  }
}>

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
  experience: string;
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