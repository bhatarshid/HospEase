import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { fetchAllServices, fetchServiceDetails, fetchAllAppointments } from "@/services/services-service";
import { NextRequest, NextResponse } from "next/server";
import { Service } from "@prisma/client";
import { AppointmentDetails, ServiceDetailsResponse } from "@/types/entities/service-types";
import { getToken } from "next-auth/jwt";
import { AuthToken } from "../auth/[...nextauth]/route";

export async function getAllServices() {
  try {
    const services: Service[] = await fetchAllServices();    

    return NextResponse.json({ services }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}

export async function getServiceDetails(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      throw new AppError("Provide Id of service", 400);
    }

    const service: ServiceDetailsResponse = await fetchServiceDetails(id);

    return NextResponse.json({ service }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}

export async function getAllAppointments(request: NextRequest) {
  try {
    const token = (await getToken({ req: request })) as AuthToken | null
    const userId = token?.id;

    if (userId === null) {
      throw new AppError("You are not authenticated", 403);
    }

    const appointments: AppointmentDetails[] = await fetchAllAppointments(userId!);

    return NextResponse.json({ appointments }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}