"use client"

import { Form, FormControl } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "@/Components/ui/label";
import { FileUploader } from "../FileUploader";
import { SelectItem } from "../ui/select";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const IdentificationTypes = ["Aadhar", "Election Id", "Licence"]
  const Doctors = ["Peter", "John", "Rashid"]
  const form = useForm({
    defaultValues: {
      
    },
  });

  const onSubmit = () => {
    // handle form submission
    console.log("onSubmit")
    setIsLoading(true)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-800 space-y-5">
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="firstNmae"
          label="Please enter your first name"
          placeholder="John"
        />

        <div className="flex flex-col gap-6 xl:flex-row ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
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
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
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
                  {["Male", "Female"].map((option) => (
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
            {Doctors.map((doctor) => (
              <SelectItem key={doctor} value={doctor}>
                <p>{doctor}</p>
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
            name="currentMedication"
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
            name="identificationType"
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
            name="identificationNumber"
            label="Identification Number"
            placeholder="ex 1234567"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
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
          name="privacyConsent"
          label="I consent to privacy policy"
        />
        
        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  )
}

export default SignupForm