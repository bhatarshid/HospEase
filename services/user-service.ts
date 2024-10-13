import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import { CreateUserInput, SignupResponse, UserDataType } from "@/types/entities";
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
    console.log({id})
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