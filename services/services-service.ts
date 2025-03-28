import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import { groupSlotsByDate } from "@/lib/utils";
import { Service, ServiceDetailsResponse, ServiceDoctorDetails, BookAppointment, AppointmentWithDetails, AppointmentDetails, CreateServiceBody, ServiceDoctorBody, ServiceDoctor } from "@/types/entities/service-types";
import { AppointmentStatus, SlotStatus } from "@prisma/client";

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
            doctor: {
              include: {
                user: true
              }
            },
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
      let slots: any = []
      serviceDoctor.slots.forEach((slot) => {
        if(slot.startTime > new Date() && slot.status === 'OPEN') {
          slots.push({ startTime: slot.startTime, id: slot.id });
        }
      });
      
      serviceDoctors.push({
        id: serviceDoctor.id,
        cost: serviceDoctor.cost,
        slots: groupSlotsByDate(slots),
        doctorId: serviceDoctor.doctor.id,
        firstName: serviceDoctor.doctor.user.firstName,
        lastName: serviceDoctor.doctor.user.lastName,
        phoneNumber: serviceDoctor.doctor.user.phoneNumber,
        emailId: serviceDoctor.doctor.emailId,
        doctorPicture: serviceDoctor.doctor.user.profilePicture,
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
    
    const appointment = await prisma.appointment.findFirst({
      where: { patientId: patient.id, slotId: data.appointmentDate }
    });
    if (appointment) {
      throw new AppError('Appointment already exists for this date and time', 400);
    }

    const slot = await prisma.slot.findFirst({
      where: { id: data.appointmentDate }
    });
    if (!slot) {
      throw new AppError('Slot not found', 404);
    }
    if (slot.status === SlotStatus.BOOKED) {
      throw new AppError('Slot is already booked', 400);
    }
    
    await prisma.appointment.create({
      data: {
        patientId: patient.id,
        serviceDoctorId: data.serviceDoctorId,
        slotId: data.appointmentDate,
        reason: data.reason,
        createdAt: new Date()
      }
    });
    await prisma.slot.update({
      where: { id: slot.id },
      data: {
        bookedSlots: slot.bookedSlots + 1,
        status: slot.bookedSlots + 1 === slot.totalSlots ? SlotStatus.BOOKED : SlotStatus.OPEN
      }
    });

    return 'Appointment Booked Successfully'
  }
  catch (error) {
    console.log({error})
    throw error;
  }
}

export const fetchAllAppointments = async (userId: string) : Promise<any> => {
  try {
    const user: { id: string; firstName: string; lastName: string; } | null = await prisma.user.findUnique({
      where : { id: userId },
      select: { id: true, firstName: true, lastName: true }
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
            doctor: {
              include: {
                user: true
              }
            },
            service: true
          }
        },
        slot: true
      }
    });

    const appointments = appointmentsWithDetails.map((appointment) => {
      return {
        id: appointment.id,
        appointmentDate: appointment.slot.startTime,
        reason: appointment.reason,
        status: appointment.status,
        serviceName: appointment.serviceDoctor.service.serviceName,
        cost: appointment.serviceDoctor.cost,
        doctorId: appointment.serviceDoctor.doctor.id,
        doctorFirstName: appointment.serviceDoctor.doctor.user.firstName,
        doctorLastName: appointment.serviceDoctor.doctor.user.lastName,
        doctorSpecialization: appointment.serviceDoctor.doctor.specialization,     
        doctorPicture: appointment.serviceDoctor.doctor.user.profilePicture
      }
    });

    return appointments;
  }
  catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

export const cancelAppointmentService = async (userId: string, appointmentId: string): Promise<string> => {
  try {
    const user: { id: string } | null = await prisma.user.findUnique({
      where: { id: userId },
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

    const appointment = await prisma.appointment.findFirst({
      where: { 
        id: appointmentId,
        patientId: patient.id,
        status: AppointmentStatus.PENDING
      },
      include: {
        slot: true
      }
    });

    if (!appointment) {
      throw new AppError('Appointment not found or cannot be cancelled', 404);
    }

    // Update appointment status to cancelled
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: AppointmentStatus.CANCELLED }
    });

    // Update slot status back to OPEN and decrease booked slots
    await prisma.slot.update({
      where: { id: appointment.slotId },
      data: {
        bookedSlots: appointment.slot.bookedSlots - 1,
        status: SlotStatus.OPEN
      }
    });

    return 'Appointment Cancelled Successfully';
  }
  catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
}

// export const createServiceFunction = async (data: CreateServiceBody): Promise<string> => {
//   try {
//     const service = await prisma.service.findUnique({ where: { serviceName: data.serviceName } });

//     if (service) {
//       throw new AppError('Service with the same name already exists', 400);
//     }

//     await prisma.service.create({
//       data: {
//         serviceName: data.serviceName,
//         description: data.description,
//         features: data.features,
//         picture: data.picture ? new Uint8Array(data.picture) : undefined,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     });

//     return 'Service created'
//   }
//   catch (error) {
//     throw error;
//   }
// }

// export const addServiceDoctorFunction = async (data: ServiceDoctorBody): Promise<string> => {
//   try {
//     await prisma.$transaction(async (prisma) => {
//       const serviceDoctor = await prisma.serviceDoctor.create({
//         data: {
//           serviceId: data.serviceId,
//           doctorId: data.doctorId,
//           cost: data.cost,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         }
//       });

//       const slots = await prisma.slot.updateMany({
//         where: {
//           id: { in: data.slotId },
//           status: 'OPEN',
//           doctorId: data.doctorId
//         },
//         data: {
//           serDocId: serviceDoctor.id,
//           status: 'PENDING'
//         }
//       });
      
//       if (slots.count < data.slotId.length) {
//         throw new AppError('Some slots are not available', 404);
//       }
//     });

//     return 'Details of service added';
//   }
//   catch (error) {
//     throw error;
//   }
// }

// export const updateServiceFunction = async (data: any) => {
//   try {
//     // modify this
//     await prisma.$transaction(async (prisma) => {
//       // const serviceDoctor = await prisma.serviceDoctor.update();

//       const slots = await prisma.slot.updateMany({
//         where: {
//           id: { in: data.slotId },
//           status: 'OPEN',
//           doctorId: data.doctorId
//         },
//         data: {
//           // serDocId: serviceDoctor.id,
//           status: 'PENDING'
//         }
//       });
      
//       if (slots.count < data.slotId.length) {
//         throw new AppError('Some slots are not available', 404);
//       }
//     });

//     return 'Details of service added';
//   }
//   catch (error) {
//     throw error;
//   }
// }