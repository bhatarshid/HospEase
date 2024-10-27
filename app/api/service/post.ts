import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { bookAppointmentRequest } from "@/lib/validations/service.schema";
import { bookAppointmentService } from "@/services/services-service";
import { NextRequest, NextResponse } from "next/server";

export async function bookAppointment(request: NextRequest) {
  try {
    const body = await request.json();
    bookAppointmentRequest.parse(body);

    const userId: string | null = JSON.parse(request.headers.get('user_id')!);

    if (userId === null) {
      throw new AppError('You are not authenticated', 403);
    }
    const response: string = await bookAppointmentService(userId, body);

    return NextResponse.json({
      message: response
    }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}