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

export type BookAppointment = {
  serviceDoctorId: string;
  appointmentDate: string;
  reason: string;
}

export type AppointmentDetails = {
      id: string;
      appointmentDate: Date;
      reason: string;
      status: boolean;
      closed: boolean;
      serviceName: string;
      cost: number;
      doctorId: string;
      doctorFirstName: string;
      doctorLastName: string;
      doctorPicture: Buffer | null;
      doctorSpecialization: string;
    }[]