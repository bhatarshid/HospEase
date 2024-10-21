import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
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