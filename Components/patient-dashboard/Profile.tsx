"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/Components/ui/button"
import { Pencil, Check, X } from "lucide-react"
import { Form, FormControl } from "@/Components/ui/form"
import { useForm } from "react-hook-form"
import CustomFormField, { FormFieldType } from "@/Components/CustomFormField"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { SelectItem } from "../ui/select"
import SubmitButton from "../SubmitButton"
import { toast } from "react-toastify";

type PatientData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  address: string
  occupation: string
  emergencyContactName: string
  emergencyPhoneNumber: string
  primaryPhysician: string
  insuranceProvider: string
  insurancePolicyNumber: string
  allergies: string
  currentMedications: string
  familyMedicalHistory: string
  pastMedicalHistory: string
  identificationType: string
  identificationNumber: string
}

export default function PatientProfile() {
  const [editingField, setEditingField] = useState<keyof PatientData | null>(null)

  const Doctors = [{ id: '123', firstName: 'John', lastName: 'doe'},
    { id: '456', firstName: 'Daniel', lastName: 'bait'}
  ]

  const Gender = ["male", "female"];
  const IdentificationTypes = ["Aadhar", "Election Id", "Licence"]; 

  const form = useForm<PatientData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "+1 234 567 8900",
      dateOfBirth: "1990-01-01",
      gender: "Male",
      address: "123 Street, City, State, ZIP",
      occupation: "Software Engineer",
      emergencyContactName: "Jane Doe",
      emergencyPhoneNumber: "+1 234 567 8901",
      primaryPhysician: "Dr. Smith",
      insuranceProvider: "HealthCare Insurance",
      insurancePolicyNumber: "ABC123456789",
      allergies: "Peanuts, Penicillin",
      currentMedications: "Aspirin 81mg",
      familyMedicalHistory: "Diabetes, Heart Disease",
      pastMedicalHistory: "Appendectomy (2010)",
      identificationType: "Driver's License",
      identificationNumber: "DL1234567"
    }
  })

  const { control, handleSubmit, watch } = form

  const onSave = (data: PatientData) => {
    setEditingField(null)
  }

  const handleEdit = (field: keyof PatientData) => {
    setEditingField(field)
  }

  const handleCancel = (field: keyof PatientData) => {
    if (form.formState.defaultValues) {
      form.setValue(field, form.formState.defaultValues[field] as string);
    }
    setEditingField(null);
  };

  const handleChange = () => {
    setEditingField(null)
  }

  const handleFormReset = () => {
    form.reset()
    setEditingField(null)
    toast.success("All changes have been discarded.")
  }

  const renderField = (label: string, field: keyof PatientData, type: FormFieldType) => {
    const value = watch(field)

    const renderEditMode = () => {
      let fieldContent

      switch (type) {
        case FormFieldType.SELECT:
          if (field === "primaryPhysician") {
            fieldContent = (
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
            )
          } else if (field === "identificationType") {
            fieldContent = (
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="identificationType"
                label="Identification Type"
                placeholder="Select an ID"
              >
                {IdentificationTypes && IdentificationTypes.map((idType) => (
                  <SelectItem key={idType} value={idType}>
                    <p>{idType}</p>
                  </SelectItem>
                ))}
              </CustomFormField>
            )
          }
          break
        case FormFieldType.SKELETON:
          fieldContent = (
            <CustomFormField 
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultChecked={field.value}>
                    {Gender.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          )
          break
        default:
          fieldContent = (
            <CustomFormField
              fieldType={type}
              control={control}
              name={field}
              label={label}
              placeholder={label}
            />
          )
      }

      return (
        <div className="relative flex items-center">
          {fieldContent}
          <div className="absolute right-0 top-1/2 bottom-0 flex items-center">
            <Button variant="ghost" size="icon" onClick={handleChange} className="h-full">
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleCancel(field)} className="h-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    }

    const renderViewMode = () => (
      <>
        <Label className="shad-input-label">{label}</Label>
        <p className="mt-1 bg-[#e5e3e3] p-2 border rounded-[6px] font-normal">{value}</p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0"
          onClick={() => handleEdit(field)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </>
    )

    return (
      <div className="relative">
        {editingField === field ? renderEditMode() : renderViewMode()}
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSave)} className="text-gray-800 space-y-5 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {renderField("First Name", "firstName", FormFieldType.INPUT)}
            {renderField("Last Name", "lastName", FormFieldType.INPUT)}
            {renderField("Email", "email", FormFieldType.INPUT)}
            {renderField("Phone Number", "phoneNumber", FormFieldType.PHONE_INPUT)}
            {renderField("Date of Birth", "dateOfBirth", FormFieldType.DATE_PICKER)}
            {renderField("Gender", "gender", FormFieldType.SKELETON)}
            {renderField("Address", "address", FormFieldType.INPUT)}
            {renderField("Occupation", "occupation", FormFieldType.INPUT)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {renderField("Emergency Contact Name", "emergencyContactName", FormFieldType.INPUT)}
            {renderField("Emergency Phone Number", "emergencyPhoneNumber", FormFieldType.PHONE_INPUT)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {renderField("Primary Care Physician", "primaryPhysician", FormFieldType.SELECT)}
            {renderField("Insurance Provider", "insuranceProvider", FormFieldType.INPUT)}
            {renderField("Insurance Policy Number", "insurancePolicyNumber", FormFieldType.INPUT)}
            {renderField("Allergies", "allergies", FormFieldType.TEXTAREA)}
            {renderField("Current Medications", "currentMedications", FormFieldType.TEXTAREA)}
            {renderField("Family Medical History", "familyMedicalHistory", FormFieldType.TEXTAREA)}
            {renderField("Past Medical History", "pastMedicalHistory", FormFieldType.TEXTAREA)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Identification and Verification</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {renderField("Identification Type", "identificationType", FormFieldType.SELECT)}
            {renderField("Identification Number", "identificationNumber", FormFieldType.INPUT)}
          </CardContent>
        </Card>
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" className="border rounded-[6px] border-dark2 w-" onClick={handleFormReset}>
            Cancel
          </Button>
          <SubmitButton className="shad-primary-btn" isLoading={false}>Save Changes</SubmitButton>

        </div>
      </form>
    </Form>
  )
}