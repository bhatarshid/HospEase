import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { bookAppointmentRequest } from "@/lib/validations/service.schema";
import { bookAppointmentService } from "@/services/services-service";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AuthToken } from "../auth/[...nextauth]/route";

export async function bookAppointment(request: NextRequest) {
  try {
    const body = await request.json();
    bookAppointmentRequest.parse(body);

    const token = (await getToken({ req: request })) as AuthToken | null;
    const userId = token?.id;
    
    if (!userId) {
      throw new AppError("Please authenticate", 401)
    }

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