import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import { groupSlotsByDate } from "@/lib/utils";
import { Service, ServiceDetailsResponse, ServiceDoctorDetails, BookAppointment, AppointmentWithDetails, AppointmentDetails, CreateServiceBody, ServiceDoctorBody, ServiceDoctor } from "@/types/entities/service-types";

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
    const service: any = await prisma.service.findUnique({
      where: { id },
      include: {
        serviceDoctors: {
          include: {
            doctor: true,
            slots: true
          }
        }
      }
    });

    if (!service) {
      throw new AppError('Service not found', 404);
    }

    const serviceDoctors: ServiceDoctorDetails[] = []
    service.serviceDoctors.forEach((serviceDoctor: ServiceDoctor) => {
      let slots: Date[] = []
      serviceDoctor.slots.forEach((slot) => {
        if(slot.startTime > new Date()) {
          slots.push(slot.startTime);
        }
      });
      
      serviceDoctors.push({
        id: serviceDoctor.id,
        cost: serviceDoctor.cost,
        slots: groupSlotsByDate(slots),
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

export const bookAppointmentService = async (userId: string, data: BookAppointment): Promise<string> => {
  try {
    const user: { id: string } | null = await prisma.user.findUnique({
      where : { id: userId },
      select: { id: true }
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const patient: { id: string } | null = await prisma.patient.findUnique({
      where: { userId: user.id },
      select: { id: true }
    });
    if (!patient) {
      throw new AppError('User is not registered as patient', 400);
    }

    await prisma.appointment.create({
      data: {
        patientId: patient.id,
        serviceDoctorId: data.serviceDoctorId,
        appointmentDate: data.appointmentDate,
        reason: data.reason,
        createdAt: new Date()
      }
    });

    return 'Appointment Booked Successfully'
  }
  catch (error) {
    throw error;
  }
}

export const fetchAllAppointments = async (userId: string) : Promise<any> => {
  try {
    const user: { id: string } | null = await prisma.user.findUnique({
      where : { id: userId },
      select: { id: true }
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const patient: { id: string } | null = await prisma.patient.findUnique({
      where: { userId: user.id },
      select: { id: true }
    });
    if (!patient) {
      throw new AppError('User is not registered as patient', 400);
    }

    const appointmentsWithDetails: AppointmentWithDetails[] = await prisma.appointment.findMany({
      where: { patientId: patient.id },
      include: {
        serviceDoctor: {
          include: {
            doctor: true,
            service: true
          }
        }
      },
      orderBy: {
        appointmentDate: 'desc'
      }
    });

    const appointments: AppointmentDetails = appointmentsWithDetails.map((appointment) => {
      return {
        id: appointment.id,
        appointmentDate: appointment.appointmentDate,
        reason: appointment.reason,
        status: appointment.status,
        serviceName: appointment.serviceDoctor.service.serviceName,
        cost: appointment.serviceDoctor.cost,
        doctorId: appointment.serviceDoctor.doctor.id,
        doctorFirstName: appointment.serviceDoctor.doctor.firstName,
        doctorLastName: appointment.serviceDoctor.doctor.lastName,
        doctorSpecialization: appointment.serviceDoctor.doctor.specialization,     
        doctorPicture: appointment.serviceDoctor.doctor.picture
      }
    })

    return appointments;
  }
  catch (error) {
    throw error;
  }
}

export const createServiceFunction = async (data: CreateServiceBody): Promise<string> => {
  try {
    const service = await prisma.service.findUnique({ where: { serviceName: data.serviceName } });

    if (service) {
      throw new AppError('Service with the same name already exists', 400);
    }

    await prisma.service.create({
      data: {
        serviceName: data.serviceName,
        description: data.description,
        features: data.features,
        picture: data.picture,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return 'Service created'
  }
  catch (error) {
    throw error;
  }
}

export const addServiceDoctorFunction = async (data: ServiceDoctorBody): Promise<string> => {
  try {
    await prisma.$transaction(async (prisma) => {
      const serviceDoctor = await prisma.serviceDoctor.create({
        data: {
          serviceId: data.serviceId,
          doctorId: data.doctorId,
          cost: data.cost,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      const slots = await prisma.slot.updateMany({
        where: {
          id: { in: data.slotId },
          status: 'OPEN',
          doctorId: data.doctorId
        },
        data: {
          serDocId: serviceDoctor.id,
          status: 'PENDING'
        }
      });
      
      if (slots.count < data.slotId.length) {
        throw new AppError('Some slots are not available', 404);
      }
    });

    return 'Details of service added';
  }
  catch (error) {
    throw error;
  }
}

export const updateServiceFunction = async (data: any) => {
  try {

  }
  catch (error) {
    throw error;
  }
}