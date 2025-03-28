import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { cancelAppointmentService } from "@/services/services-service";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AuthToken } from "../auth/[...nextauth]/route";

export async function cancelAppointment(request: NextRequest) {
  try {
    const token = (await getToken({ req: request })) as AuthToken | null;
    const userId = token?.id;

    if (!userId) {
      throw new AppError("You are not authenticated", 403);
    }

    const { searchParams } = new URL(request.url);
    const appointmentId = searchParams.get("id");

    if (!appointmentId) {
      throw new AppError("Appointment ID is required", 400);
    }

    const response = await cancelAppointmentService(userId, appointmentId);

    return NextResponse.json({
      message: response
    }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
} 