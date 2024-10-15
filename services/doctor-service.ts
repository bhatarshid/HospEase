import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
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