import { handleErrorNextResponse } from "@/lib/App-Error";
import { createDoctorBody } from "@/lib/validations/doctor.schema";
import { createDoctorFunction } from "@/services/doctor-service";
import { CreateDoctorBody } from "@/types/entities";
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

    await createDoctorFunction(doctorData);

    return NextResponse.json({ message: "Doctor Created Sucessfully!" }, { status: 201 })
  }
  catch (error) {
    console.log(error)
    return handleErrorNextResponse(error); 
  }
}