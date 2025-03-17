import { NextRequest, NextResponse } from "next/server";
import { createUser, registerPatientService } from "@/services/user-service";
import AppError, { handleErrorNextResponse } from "@/lib/App-Error";
import { registerPatientRequest, signupRequest } from "@/lib/validations/user.schema";
import { RegisterPatientRequest, SignupResponse, UserType } from "@/types/entities";
import { getToken } from "next-auth/jwt";
import { AuthToken } from "../auth/[...nextauth]/route";

// signup user
export async function signup(request: NextRequest) {
  try {
    const body = await request.json();
    signupRequest.parse(body);

    const user: SignupResponse = await createUser({
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      password: body.password,
      user: UserType.PATIENT
    });

    return NextResponse.json({ 
      message: "User signed up successfully",
      data: user
    }, { status: 201 });
  }
  catch (error) {
    return handleErrorNextResponse(error);
  }
}

export async function registerPatient (request: NextRequest) {
  try {
    const formData = await request.formData();

    const picture = formData.get("picture") instanceof Blob 
        ? Buffer.from(await (formData.get("picture") as Blob).arrayBuffer())
        : undefined;
    const idDoc = formData.get("idDoc") instanceof Blob 
        ? Buffer.from(await (formData.get("idDoc") as Blob).arrayBuffer())
        : undefined

    const profileData: RegisterPatientRequest = {
      emailId: formData.get("emailId") as string,
      dateOfBirth: new Date(formData.get("dateOfBirth") as string),
      address: formData.get("address") as string,
      occupation: formData.get("occupation") as string,
      gender: formData.get("gender") as "male" | "female",
      emergencyContactName: formData.get("emergencyContactName") as string,
      emergencyContactNumber:formData.get("emergencyContactNumber") as string,
      allergies: formData.get("allergies") as string ?? null,
      currentMedications: formData.get("currentMedications") as string,
      familyMedicalHistory: formData.get("familyMedicalHistory") as string,
      pastMedicalHistory: formData.get("pastMedicalHistory") as string,
      primaryPhysician: formData.get("primaryPhysician") as string,
      idDocType:  formData.get("idDocType") as "Aadhar" | "Election Id" | "Licence",
      idNumber: formData.get("idNumber") as string,
      insurancePolicyNumber: formData.get("insurancePolicyNumber") as string,
      insuranceProvider: formData.get("insuranceProvider") as string,
      idDoc,
      picture,
      treatmentConsent: formData.get("treatmentConsent") !== null ? (formData.get("treatmentConsent") as string) === "true" : false,
      disclosureConsent: formData.get("disclosureConsent") !== null ? (formData.get("disclosureConsent") as string) === "true" : false,
      privacyPolicy: formData.get("privacyPolicy") !== null ? (formData.get("privacyPolicy") as string) === "true" : false
    }

    registerPatientRequest.parse(profileData);

    const token = (await getToken({ req: request })) as AuthToken | null
    const userId = token?.id;
    
    if (userId === null) {
      throw new AppError("You are not authenticated", 403);
    }
    const response: string = await registerPatientService(userId!, profileData);

    return NextResponse.json({
      message: response
    }, { status: 201 });
  }
  catch (error) {
    console.log({ error})
    return handleErrorNextResponse(error);
  }
}