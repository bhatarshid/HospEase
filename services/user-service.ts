import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import { CreateUserInput, PatientRequestType, ProfileType, ProfileUpdateInput, SignupResponse, UserDataType } from "@/types/entities";
import { Patient } from "@prisma/client";
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
        updatedAt: true,
        isRegistered: true
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
        isRegistered: true,
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
        patient: true,
        isRegistered: true
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

    await prisma.user.update({
      where: { id: userId },
      data: { isRegistered: true, profilePicture: data.picture }
    });
    
    return 'Registration complete';
  }
  catch (error) {
    console.log(error)
    throw error;
  }
} 

export const updateProfileService = async (userId: string, data: ProfileUpdateInput): Promise<string> => {
  try {
    const user: { id: string } | null = await prisma.user.findUnique({
      where : { id: userId },
      select: { id: true }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const patient: { id: string } | null = await prisma.patient.findUnique({
      where : { userId },
      select: { id: true }
    });

    if (!patient) {
      throw new AppError('User not registered', 400);
    }

    const updateUserData: any = {
      firstName: data.firstName ?? undefined,
      lastName: data.lastName ?? undefined
    }

    const updatePatientData: any = {
      emailId: data.emailId ?? undefined,
      dateOfBirth: data.dateOfBirth? new Date(data.dateOfBirth) : undefined,
      address: data.address ?? undefined,
      occupation: data.occupation ?? undefined,
      gender: data.gender ?? undefined,
      emergencyContactName: data.emergencyContactName ?? undefined,
      emergencyContactNumber: data.emergencyContactNumber ?? undefined,
      allergies: data.allergies ?? undefined,
      currentMedications: data.currentMedications ?? undefined,
      familyMedicalHistory: data.familyMedicalHistory ?? undefined,
      pastMedicalHistory: data.pastMedicalHistory ?? undefined,
      idDocType: data.idDocType ?? undefined,
      idNumber: data.idNumber ?? undefined,
      idDoc: data.idDoc ?? undefined,
      insuranceProvider: data.insuranceProvider ?? undefined,
      insurancePolicyNumber: data.insurancePolicyNumber ?? undefined,
      primaryPhysician: data.primaryPhysician?? undefined
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateUserData
    });

    await prisma.patient.update({
      where: { id: patient.id },
      data: updatePatientData
    });

    return 'Profile data updated successfully';
  }
  catch (error) { 
    throw error;
  }
}

export const getMeService = async (userId: string): Promise<ProfileType> => {
  try {
    const profile: ProfileType | null = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        profilePicture: true,
        isRegistered: true,
        patient: {
          select: {
            id: true,
            emailId: true,
            dateOfBirth: true,
            gender: true,
            address: true,
            occupation: true,
            emergencyContactName: true,
            emergencyContactNumber: true,
            doctor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            insuranceProvider: true,
            insurancePolicyNumber: true,
            allergies: true,
            currentMedications: true,
            familyMedicalHistory: true,
            pastMedicalHistory: true,
            idDocType: true,
            idNumber: true,
          }
        }
      }
    });
    
    if (!profile) {
      throw new AppError('You need to signup first', 404);
    }

    if (!profile.patient) {
      throw new AppError('User is not registered', 404);
    }

    return profile
  }
  catch (error) {
    throw error;
  }
}