import { NextRequest, NextResponse } from "next/server";
import { UserDataType } from "@/types/entities";
import { getUserById } from "@/services/user-service";
import { handleErrorNextResponse } from "@/lib/App-Error";

// GET /api/user/:id
// Get signle user
export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const id = params.userId;
    
    if (!id) {
      throw new Error('Missing or invalid id');
    }

    const user: UserDataType = await getUserById(id);

    return NextResponse.json({ user }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}