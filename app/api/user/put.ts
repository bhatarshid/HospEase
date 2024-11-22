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
      firstName: formData.get('firstName') as string ?? null,
      lastName: formData.get('lastName') as string ?? null,
      emailId: formData.get('emailId') as string ?? null,
      dateOfBirth: formData.get('dateOfBirth') ? new Date(formData.get('dateOfBirth') as string) : null,
      address: formData.get('address') as string ?? null,
      occupation: formData.get('occupation') as string ?? null,
      gender: formData.get('gender') as "male" | "female" | null ?? null,
      emergencyContactName: formData.get('emergencyContactName') as string ?? null,
      emergencyContactNumber:formData.get('emergencyContackNumber') as string ?? null,
      allergies: formData.get('allergies') as string ?? null,
      currentMedications: formData.get('currentMedications') as string ?? null,
      familyMedicalHistory: formData.get('familyMedicalHistory') as string ?? null,
      pastMedicalHistory: formData.get('pastMedicalHistory') as string ?? null,
      primaryPhysician: formData.get('primaryPhysician') as string ?? null,
      idDocType:  formData.get('idDocType') as string ?? null,
      idNumber: formData.get('idNumber') as string ?? null,
      idDoc,
      insurancePolicyNumber: formData.get('insurancePolicyNumber') as string ?? null,
      insuranceProvider: formData.get('insuranceProvider') as string ?? null,
      picture
    }

    profileUpdateSchema.parse(profileData);

    const userId: string | null = JSON.parse(request.headers.get('user_id')!);

    if (userId === null) {
      throw new AppError('You are not authenticated', 403);
    }

    // const response: string = await updateProfileService(userId, profileData);

    return NextResponse.json({
      message: 'response',
    }, { status: 200 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}