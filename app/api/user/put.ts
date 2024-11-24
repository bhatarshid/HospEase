import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { profileUpdateSchema } from "@/lib/validations/user.schema";
import { updateProfileService } from "@/services/user-service";
import { ProfileUpdateInput } from "@/types/entities";
import { NextRequest, NextResponse } from "next/server";

export async function updateProfile (request: NextRequest) {
  try {
    const formData = await request.formData();

    const picture = formData.get('picture') instanceof Blob 
        ? Buffer.from(await (formData.get('picture') as Blob).arrayBuffer())
        : undefined
    const idDoc = formData.get('idDoc') instanceof Blob 
        ? Buffer.from(await (formData.get('idDoc') as Blob).arrayBuffer())
        : undefined

    const profileData: ProfileUpdateInput = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      emailId: formData.get('emailId') as string,
      dateOfBirth: new Date(formData.get('dateOfBirth') as string),
      address: formData.get('address') as string,
      occupation: formData.get('occupation') as string,
      gender: formData.get('gender') as "male" | "female",
      emergencyContactName: formData.get('emergencyContactName') as string,
      emergencyContactNumber:formData.get('emergencyContackNumber') as string,
      allergies: formData.get('allergies') as string,
      currentMedications: formData.get('currentMedications') as string,
      familyMedicalHistory: formData.get('familyMedicalHistory') as string,
      pastMedicalHistory: formData.get('pastMedicalHistory') as string,
      primaryPhysician: formData.get('primaryPhysician') as string,
      idDocType:  formData.get('idDocType') as string,
      idNumber: formData.get('idNumber') as string,
      insurancePolicyNumber: formData.get('insurancePolicyNumber') as string,
      insuranceProvider: formData.get('insuranceProvider') as string,
      idDoc,
      picture,
    }

    profileUpdateSchema.parse(profileData);

    const userId: string | null = JSON.parse(request.headers.get('user_id')!);

    if (userId === null) {
      throw new AppError('You are not authenticated', 403);
    }

    const response: string = await updateProfileService(userId, profileData);

    return NextResponse.json({
      message: response,
    }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}