import { NextRequest, NextResponse } from "next/server";
import { UserDataType } from "@/redux/entities";
import { fetchAllUsers, getUser } from "@/services/user-service";
import { handleErrorNextResponse } from "@/lib/App-Error";

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

export async function getUserFromPhoneNumberOrID (req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
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