import { handleErrorNextResponse } from "@/lib/App-Error";
import { createServiceBody, serviceDoctorBody } from "@/lib/validations/service.schema";
import { addServiceDoctorFunction, createServiceFunction, /*updateServiceFunction */ } from "@/services/services-service";
import { CreateServiceBody } from "@/types/entities";
import { NextRequest, NextResponse } from "next/server";

export async function createService(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const picture = formData.get('picture') instanceof Blob 
        ? Buffer.from(await (formData.get('picture') as Blob).arrayBuffer())
        : undefined
    const featuresString: string = formData.get('features') as string;
    const features: string[] = JSON.parse(featuresString);

    const serviceData: CreateServiceBody = {
      serviceName: formData.get('serviceName') as string,
      description: formData.get('description') as string,
      features,
      picture
    };
    createServiceBody.parse(serviceData);

    await createServiceFunction(serviceData);

    return NextResponse.json({ message: "Service Created Sucessfully!" }, { status: 201 })
  }
  catch (error) {
    console.log(error)
    return handleErrorNextResponse(error); 
  }
}

export async function updateService(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const picture = formData.get('picture') instanceof Blob 
        ? Buffer.from(await (formData.get('picture') as Blob).arrayBuffer())
        : undefined
    const featuresString: string = formData.get('features') as string;
    const features: string[] = JSON.parse(featuresString);

    // TODO: pending work
    // await updateServiceFunction(serviceData);
    return NextResponse.json({ message: "Service Updated Sucessfully!" }, { status: 200 })
  }
  catch (error) {
    return handleErrorNextResponse(error); 
  }
}

export async function addServiceDoctor(request: NextRequest) {
  try {
    const body = await request.json();
    serviceDoctorBody.parse(body);
    
    await addServiceDoctorFunction(body);
    return NextResponse.json({ message: "Data added successfully!" }, { status: 201 });
  }
  catch (error) {
    console.log(error)
    return handleErrorNextResponse(error)
  }
}