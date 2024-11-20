"use client"

import { Form, FormControl } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FileUploader } from "../FileUploader";
import { SelectItem } from "../ui/select";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import { registerPatient, reset } from "@/redux/features/profile-slice";
import { fetchDoctors, reset as doctorReset } from "@/redux/features/doctor-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { PatientRequestType } from "@/types/entities";
import { registerPatientRequest } from "@/lib/validations/user.schema";
// import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: RootState) => state.auth)
  const {isLoading, isError, isSuccess, message} = useSelector((state: RootState) => state.profile);
  const { doctors: Doctors, isError: doctorError } = useSelector((state: RootState) => state.doctor);

  const IdentificationTypes = ["Aadhar", "Election Id", "Licence"];

  const form = useForm<z.infer<typeof registerPatientRequest>>({
    // resolver: zodResolver(registerPatientRequest),
    defaultValues: {
      emailId: '',
      dateOfBirth: new Date(),
      gender: undefined,
      address: '',
      occupation: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      primaryPhysician: null,
      insuranceProvider: '',
      insurancePolicyNumber: '',
      currentMedications: '',
      pastMedicalHistory: null,
      allergies: '',
      familyMedicalHistory: null,
      treatmentConsent: false,
      disclosureConsent: false,
      privacyPolicy: false,
      idDocType: undefined,
      idNumber: '',
      idDoc: undefined,
      picture: undefined
    },
  });

  useEffect(() => {
    if (doctorError) {
      toast.error("Failed to fetch doctors. Please refresh page");
      dispatch(doctorReset());
    }

    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      router.push('/patient/dashboard')
    }

    dispatch(reset());
  }, [isError, doctorError, isSuccess, message, user, dispatch])

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [isSuccess, isError, doctorError, dispatch]);

  const onSubmit = (data: PatientRequestType) => {
    console.log(data)
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'idDoc' || key === 'picture') {
        // Ensure value is an array before iterating
        if (Array.isArray(value)) {
          value.forEach((file) => {
            formData.append(key, file);
          });
        }
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    dispatch(registerPatient(formData));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-800 space-y-5 p-4">
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="firstName"
            label="Please enter your first name"
            placeholder={user?.firstName}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="lastName"
            label="Please enter your last name"
            placeholder={user?.lastName}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emailId"
            label="Email"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder={user?.phoneNumber}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="Select a date"
          />

          <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6  xl:justify-between" onValueChange={field.onChange} defaultChecked={field.value}>
                  {["male", "female"].map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="14th Street, New York"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergence Contact Name"
            placeholder="Gaurdian's Name"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Phone number"
            placeholder="(555) 123-4567"
          />  
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
        
        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors && Doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                <p>{`${doctor.firstName} ${doctor.lastName}`}</p>
              </SelectItem>
            ))}

          </CustomFormField>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="BlueCross BlueShield"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="ABC123456789"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Penicillin, Pollen"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedications"
            label="Current Medication"
            placeholder="Ibuprofen 200mg, Paracetomol 500mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History (if any)"
            placeholder="Mother had a allergies."
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Appendectomy"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <CustomFormField 
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="idDocType"
            label="Identificatin Type"
            placeholder="Select ID Type"
          >
            {IdentificationTypes.map((id) => (
              <SelectItem key={id} value={id}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{id}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="idNumber"
            label="Identification Number"
            placeholder="ex 1234567"
          />
          <div className="flex space-x-3">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="idDoc"
              label="Scanned copy of identification document"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader 
                    files={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="picture"
              label="Upload Profile Picture"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader 
                    files={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            />
          </div>
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        
        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
        />
        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />
        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyPolicy"
          label="I consent to privacy policy"
        />
        
        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  )
}

export default SignupForm