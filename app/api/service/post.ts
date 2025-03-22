import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { bookAppointmentRequest } from "@/lib/validations/service.schema";
import { bookAppointmentService } from "@/services/services-service";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AuthToken } from "../auth/[...nextauth]/route";

export async function bookAppointment(request: NextRequest) {
  try {
    const body = await request.formData();
    // bookAppointmentRequest.parse(body);

    const token = (await getToken({ req: request })) as AuthToken | null
    const userId = token?.id;

    const appointmentData = {
      serviceDoctorId: body.get("serviceDoctorId") as string,
      doctorId: body.get("doctorId") as string,
      appointmentDate: body.get("appointmentDate") as string,
      reason: body.get("reason") as string,
    };

    const response: string = await bookAppointmentService(userId!, appointmentData);

    return NextResponse.json({
      message: response
    }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}