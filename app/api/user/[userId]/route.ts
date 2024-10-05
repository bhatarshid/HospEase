import { NextRequest, NextResponse } from "next/server";
import { UserDataType } from "@/types/entities";
import { getUserById } from "@/services/user-service";
import AppError from "@/lib/App-Error";
import { z } from "zod";

// GET /api/user/:id
// Get signle user
export async function GET(
  request: NextRequest,
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
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}