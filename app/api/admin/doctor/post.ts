import { handleErrorNextResponse } from "@/lib/App-Error";
import { createDoctorBody } from "@/lib/validations/doctor.schema";
import { createDoctorService, updateDoctorService } from "@/services/doctor-service";
import { CreateDoctorBody, UpdateDoctorBody } from "@/types/entities";
import { NextRequest, NextResponse } from "next/server";

export async function createDoctor(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const picture = formData.get('picture') instanceof Blob 
        ? Buffer.from(await (formData.get('picture') as Blob).arrayBuffer())
        : undefined

    const doctorData: CreateDoctorBody = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      emailId: formData.get('emailId') as string,
      picture,
      specialization: formData.get('specialization') as string,
      department: formData.get('department') as string,
      experience: parseInt(formData.get('experience') as string),
    };
    createDoctorBody.parse(doctorData);

    await createDoctorService(doctorData);

    return NextResponse.json({ message: "Doctor Created Sucessfully!" }, { status: 201 })
  }
  catch (error) {
    console.log(error)
    return handleErrorNextResponse(error); 
  }
}

export async function updateDoctor(request: NextRequest) {
  try {
    const formData = await request.formData();

    const picture = formData.get('picture') instanceof Blob 
        ? Buffer.from(await (formData.get('picture') as Blob).arrayBuffer())
        : undefined

    const doctorData: UpdateDoctorBody = {
      id: formData.get('id') as string,
      firstName: formData.get('firstName') as string ?? null,
      lastName: formData.get('lastName') as string ?? null,
      phoneNumber: formData.get('phoneNumber') as string ?? null,
      emailId: formData.get('emailId') as string ?? null,
      picture,
      specialization: formData.get('specialization') as string ?? null,
      department: formData.get('department') as string ?? null,
      experience: formData.get('experience') as string ? parseInt(formData.get('experience') as string) : undefined,
    };

    await updateDoctorService(doctorData);

    return NextResponse.json({ message: "Doctor Created updated!" }, { status: 200 })
  }
  catch (error) {
    console.log(error)
    return handleErrorNextResponse(error);
  }
}