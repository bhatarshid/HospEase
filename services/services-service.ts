import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import { SingleServiceType } from "@/types/entities/service-types";
import { Service } from "@prisma/client";

export const fetchAllServices = async (): Promise<Service[]> => {
  try {
    const services: Service[] = await prisma.service.findMany();
    return services;
  }
  catch (error) {
    throw error;
  }
}

export const fetchServiceDetails = async (id: string): Promise<SingleServiceType> => {
  try {
    const service: SingleServiceType | null = await prisma.service.findUnique({
      where: { id },
      select: {
        id: true,
        serviceName: true,
        description: true,
        features: true,
        picture: true,
        serviceDoctors: {
          select: {
            id: true,
            cost: true,
            slots: true,
            doctor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                emailId: true,
                picture: true,
                specialization: true,
                department: true,
                experience: true
              }
            }
          }
        }
      }
    });

    if (!service) {
      throw new AppError('Service not found', 404);
    }

    return service;
  }
  catch (error) {
    throw error;
  }
}