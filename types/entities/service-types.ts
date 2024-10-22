import { Prisma } from "@prisma/client";

export type SingleServiceType = Prisma.ServiceGetPayload<{
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
            experience: true,
            
          }
        }
      }
    }
  }
}>;


