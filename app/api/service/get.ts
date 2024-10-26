import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { fetchAllServices, fetchServiceDetails } from "@/services/services-service";
import { NextRequest, NextResponse } from "next/server";
import { Service } from "@prisma/client";
import { ServiceDetailsResponse } from "@/types/entities/service-types";

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
    const id = searchParams.get('id');

    if (!id) {
      throw new AppError('Provide Id of service', 400);
    }

    const service: ServiceDetailsResponse = await fetchServiceDetails(id);

    return NextResponse.json({ service }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}