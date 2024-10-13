import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import { CreateUserInput, PatientRequestType, SignupResponse, UserDataType } from "@/types/entities";
import { Patient, User } from "@prisma/client";
import bcrypt from 'bcrypt';

export async function fetchAllUsers(): Promise<UserDataType[]> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        profilePicture: true,
        refreshToken: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return users;
  }
  catch (error) {
    throw error;
  }
}

export async function createUser(data: CreateUserInput): Promise<SignupResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber: data.phoneNumber,
      }
    });

    if (user) {
      throw new AppError('User already exists', 409);
    }

    const hashPassword: string = await bcrypt.hash(data.password, 10)

    const newUser: SignupResponse = await prisma.user.create({
      data: {
        phoneNumber: data.phoneNumber,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: new Date()
      },
      select: {
        id: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return newUser;
  }
  catch (error) {
    throw error;
  }
}

export async function getUser(id: string): Promise<UserDataType> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: id },
          { phoneNumber: id }
        ]
      },
      select: {
        id: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        profilePicture: true,
        updatedAt: true,
        patient: true
      }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
  catch (error) {
    throw error;
  }
}

export async function registerPatientService(userId: string, data: PatientRequestType): Promise<string> {
  try {
    const user: { id: string } | null = await prisma.user.findUnique({
      where : { id: userId },
      select: { id: true }
    });
    console.log(user)
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userRegistered: Patient | null = await prisma.patient.findUnique({
      where: { userId: user.id }
    });
    if (userRegistered) {
      throw new AppError('User already registered', 400);
    }

    await prisma.patient.create({
      data: {
        emailId: data.emailId,
        dateOfBirth: new Date(data.dateOfBirth),
        address: data.address,
        occupation: data.occupation,
        gender: data.gender,
        emergencyContactName: data.emergencyContactName,
        emergencyContactNumber: data.emergencyContactNumber,
        allergies: data.allergies,
        currentMedications: data.currentMedications,
        familyMedicalHistory: data.familyMedicalHistory,
        pastMedicalHistory: data.pastMedicalHistory,
        idDocType: data.idDocType,
        idNumber: data.idNumber,
        treatmentConsent: data.treatmentConsent,
        disclosureConsent: data.disclosureConsent,
        privacyPolicy: data.privacyPolicy,
        createdAt: new Date(),
        idDoc: data.idDoc || undefined,
        primaryPhysician: data.primaryPhysician || undefined,
        insuranceProvider: data.insuranceProvider || undefined,
        insurancePolicyNumber: data.insurancePolicyNumber || undefined,
        userId: userId,
      }
    });

    return 'Registration complete';
  }
  catch (error) {
    throw error;
  }
} 