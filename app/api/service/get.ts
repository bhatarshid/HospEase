import { handleErrorNextResponse } from "@/lib/App-Error";
import { fetchAllServices } from "@/services/services-service";
import { NextResponse } from "next/server";
import { Service } from "@prisma/client";

export async function getAllServices() {
  try {
    const services: Service[] = await fetchAllServices();    

    return NextResponse.json({ services }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}