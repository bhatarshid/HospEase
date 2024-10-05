import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import { SignupResponse, UserDataType } from "@/types/entities";
import { createUser, fetchAllUsers } from "@/services/user-service";
import AppError from "@/lib/App-Error";

const signupRequest = z.object({
  phone_no: z.string().min(10, "Phone number should be at least 10 characters"),
  password: z.string().min(8, "Password is required"),
  first_name: z.string().min(3, "First name is required"),
  last_name: z.string().min(3, "Last name is required"),
});

// get all users
export async function GET() {
  try {
    const users: UserDataType[] = await fetchAllUsers();

    return NextResponse.json({ users }, { status: 200 });
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// signup user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    signupRequest.parse(body);

    const user: SignupResponse = await createUser({
      firstName: body.first_name,
      lastName: body.last_name,
      phoneNumber: body.phone_no,
      password: body.password,
    });

    return NextResponse.json({ 
      message: 'User signed up successfully',
      data: user
    }, { status: 201 });
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}