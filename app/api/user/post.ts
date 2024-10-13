import { NextRequest, NextResponse } from "next/server";
import { SignupResponse, UserDataType } from "@/types/entities";
import { createUser, getUser } from "@/services/user-service";
import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { signupRequest } from "@/lib/validations/user.schema";
import { signIn } from "next-auth/react";

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
