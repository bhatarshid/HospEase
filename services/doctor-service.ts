import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import { CreateDoctorBody } from "@/types/entities";
import { Doctor } from "@prisma/client";

export const fetchAllDoctors = async (): Promise<Doctor[]> => {
  try {
    const doctors = await prisma.doctor.findMany();
    return doctors;
  }
  catch (error) {
    throw error;
  }
}

export const fetchDoctorById = async (id: string): Promise<Doctor> => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (!doctor) {
      throw new AppError('Doctor not found', 404);
    }

    return doctor;
  }
  catch (error) {
    throw error;
  }
}

export const createDoctorFunction = async (data: CreateDoctorBody): Promise<string> => {
  try {
    const doctor = await prisma.doctor.findUnique({ 
      where: {
        phoneNumber: data.phoneNumber 
      } 
    });

    if (doctor) {
      throw new AppError('Doctor with the same name already exists', 400);
    }

    await prisma.doctor.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        emailId: data.emailId,
        picture: data.picture,
        specialization: data.specialization,
        experience: data.experience,
        department: data.department,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return 'Doctor created'
  }
  catch (error) {
    throw error;
  }
}