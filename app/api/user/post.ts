import { NextRequest, NextResponse } from "next/server";
import { createUser, registerPatientService } from "@/services/user-service";
import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { registerPatientRequest, signupRequest } from "@/lib/validations/user.schema";
import { SignupResponse } from "@/types/entities";

// signup user
export async function signup(request: NextRequest) {
  try {
    const body = await request.json();
    signupRequest.parse(body);

    const user: SignupResponse = await createUser({
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      password: body.password,
    });

    return NextResponse.json({ 
      message: 'User signed up successfully',
      data: user
    }, { status: 201 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}

export async function registerPatient (request: NextRequest) {
  try {
    const body = await request.json();
    registerPatientRequest.parse(body);

    const userId: string | null = JSON.parse(request.headers.get('user_id')!);

    if (userId === null) {
      throw new AppError("You are not authenticated", 403);
    }
    const response: string = await registerPatientService(userId, body);

    return NextResponse.json({
      message: response
    }, { status: 201 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}