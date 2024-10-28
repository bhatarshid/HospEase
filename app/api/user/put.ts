import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { profileUpdateSchema } from "@/lib/validations/user.schema";
import { updateProfileService } from "@/services/user-service";
import { NextRequest, NextResponse } from "next/server";

export async function updateProfile (request: NextRequest) {
  try {
    const data = await request.json();
    profileUpdateSchema.parse(data);

    const userId: string | null = JSON.parse(request.headers.get('user_id')!);

    if (userId === null) {
      throw new AppError('You are not authenticated', 403);
    }

    const response: string = await updateProfileService(userId, data);

    return NextResponse.json({
      message: response,
    }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}