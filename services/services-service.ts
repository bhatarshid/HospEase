import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import { groupSlotsByDate } from "@/lib/utils";
import { ServiceDetails, Service, ServiceDetailsResponse, ServiceDoctorDetails } from "@/types/entities/service-types";

export const fetchAllServices = async (): Promise<Service[]> => {
  try {
    const services: Service[] = await prisma.service.findMany();
    return services;
  }
  catch (error) {
    throw error;
  }
}

export const fetchServiceDetails = async (id: string): Promise<ServiceDetailsResponse> => {
  try {
    const service: ServiceDetails | null = await prisma.service.findUnique({
      where: { id },
      include: {
        serviceDoctors: {
          include: {
            doctor: true
          }
        }
      }
    });

    if (!service) {
      throw new AppError('Service not found', 404);
    }

    const serviceDoctors: ServiceDoctorDetails[] = []
    service.serviceDoctors.forEach((serviceDoctor) => {
      serviceDoctors.push({
        id: serviceDoctor.id,
        cost: serviceDoctor.cost,
        slots: groupSlotsByDate(serviceDoctor.slots),
        doctorId: serviceDoctor.doctor.id,
        firstName: serviceDoctor.doctor.firstName,
        lastName: serviceDoctor.doctor.lastName,
        phoneNumber: serviceDoctor.doctor.phoneNumber,
        emailId: serviceDoctor.doctor.emailId,
        doctorPicture: serviceDoctor.doctor.picture,
        specialization: serviceDoctor.doctor.specialization,
        department: serviceDoctor.doctor.department,
        experience: serviceDoctor.doctor.experience
      })
    });

    return {
      id: service.id,
      serviceName: service.serviceName,
      description: service.description,
      features: service.features,
      picture: service.picture,
      serviceDoctors
    }
  }
  catch (error) {
    throw error;
  }
}