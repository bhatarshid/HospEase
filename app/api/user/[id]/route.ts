import { NextRequest, NextResponse } from "next/server";
import { UserDataType } from "@/types/entities";
import { getUser } from "@/services/user-service";
import { handleErrorNextResponse } from "@/lib/App-Error";

// GET /api/user/:id
// Get signle user

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
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