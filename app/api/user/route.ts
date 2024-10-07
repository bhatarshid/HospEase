import { NextRequest, NextResponse } from "next/server";
import { SignupResponse, UserDataType } from "@/types/entities";
import { createUser, fetchAllUsers } from "@/services/user-service";
import { handleErrorNextResponse } from "@/lib/App-Error";
import { signupRequest } from "@/lib/validations/user.schema";

// get all users
export async function GET() {
  try {
    const users: UserDataType[] = await fetchAllUsers();

    return NextResponse.json({ users }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}

// signup user
export async function POST(request: NextRequest) {
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