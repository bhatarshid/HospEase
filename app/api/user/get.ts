import { NextRequest, NextResponse } from "next/server";
import { UserDataType } from "@/types/entities";
import { fetchAllUsers, getUser, getMeService } from "@/services/user-service";
import AppError, { handleErrorNextResponse } from "@/lib/App-Error";

// get all users
export async function getAllUsers() {
  try {
    const users: UserDataType[] = await fetchAllUsers();

    return NextResponse.json({ users }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}

export async function getUserFromPhoneNumberOrID (request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');

    if (!id) {
      throw new Error('Missing or invalid id');
    }

    const user: UserDataType = await getUser(id);

    return NextResponse.json({ user }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}

export async function getMe (request: NextRequest) {
  try {
    const userId: string | null = JSON.parse(request.headers.get('user_id')!);
    
    if (!userId) {
      throw new AppError('Please authenticate', 401)
    }

    const profile: any = await getMeService(userId);

    return NextResponse.json({ profile });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}