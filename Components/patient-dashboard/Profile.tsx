"use client"

import { useEffect, useState } from "react"
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
import { AppDispatch, RootState } from "@/redux/store";
import { ProfileUpdateInput } from "@/types/entities"
import { useDispatch, useSelector } from "react-redux"
import { fetchDoctors, reset as doctorReset } from "@/redux/features/doctor-slice"
import { getMyDetails, updateProfile, reset } from "@/redux/features/profile-slice"

export default function PatientProfile() {
  const [editingField, setEditingField] = useState<keyof ProfileUpdateInput | null>(null);
  const [formInitialized, setFormInitialized] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const {profile, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.profile);
  const { doctors: Doctors, isError: doctorError, isSuccess: doctorSuccess } = useSelector((state: RootState) => state.doctor);

  const Gender = ["male", "female"];
  const IdentificationTypes = ["Aadhar", "Election Id", "Licence"]; 

  const form = useForm<ProfileUpdateInput>();

  // Initialize form when profile data is available
  useEffect(() => {
    if (profile && !formInitialized) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        emailId: profile.patient?.emailId,
        dateOfBirth: profile.patient?.dateOfBirth,
        gender: profile.patient?.gender as "male" | "female" | undefined,
        address: profile.patient?.address,
        occupation: profile.patient?.occupation,
        emergencyContactName: profile.patient?.emergencyContactName,
        emergencyContactNumber: profile.patient?.emergencyContactNumber,
        primaryPhysicianName: `${profile.patient?.doctor?.firstName ?? ""} ${profile.patient?.doctor?.lastName ?? ""}`,
        primaryPhysician: profile.patient?.doctor?.id ?? "",
        insuranceProvider: profile.patient?.insuranceProvider ?? "",
        insurancePolicyNumber: profile.patient?.insurancePolicyNumber ?? "",
        allergies: profile.patient?.allergies,
        currentMedications: profile.patient?.currentMedications ?? "",
        familyMedicalHistory: profile.patient?.familyMedicalHistory ?? "",
        pastMedicalHistory: profile.patient?.pastMedicalHistory ?? "",
        idDocType: profile.patient?.idDocType as "Aadhar" | "Election Id" | "Licence" | undefined,
        idNumber: profile.patient?.idNumber ?? ""
      });
      setFormInitialized(true);
    }
  }, [profile, form, formInitialized]);

  useEffect(() => {
    if (doctorError) {
      toast.error("Failed to fetch doctors. Please refresh page");
      dispatch(doctorReset());
    }

    if (isError) {
      toast.error(message)
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success('Profile data updated successfully')
      dispatch(reset());
    }

  }, [isError, isSuccess, message, dispatch])

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsInitialLoading(true);
      await Promise.all([
        dispatch(fetchDoctors()),
        dispatch(getMyDetails())
      ]);
      setIsInitialLoading(false);
    };

    fetchInitialData();
  }, [dispatch]);

  const { control, handleSubmit, watch } = form

  const onSave = async (data: ProfileUpdateInput) => {
    setEditingField(null)
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
    await dispatch(updateProfile(formData));
    dispatch(getMyDetails());
  }

  const handleEdit = (field: keyof ProfileUpdateInput) => {
    setEditingField(field)
  }

  const handleCancel = (field: keyof ProfileUpdateInput) => {
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

  const renderField = (label: string, field: keyof ProfileUpdateInput, type: FormFieldType) => {
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
          } else if (field === "idDocType") {
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
        <p className="mt-1 bg-[#e5e3e3] p-2 border rounded-[6px] font-normal">
          {field === "primaryPhysician" 
            ? (Doctors?.find(d => d.id === form.getValues("primaryPhysician"))?.firstName + " " + 
               Doctors?.find(d => d.id === form.getValues("primaryPhysician"))?.lastName) || "Not selected"
            : (typeof value === 'string' ? value : value?.toLocaleString())}
        </p>
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
            {renderField("Email", "emailId", FormFieldType.INPUT)}
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
            {renderField("Emergency Phone Number", "emergencyContactNumber", FormFieldType.PHONE_INPUT)}
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
            {renderField("Identification Type", "idDocType", FormFieldType.SELECT)}
            {renderField("Identification Number", "idNumber", FormFieldType.INPUT)}
          </CardContent>
        </Card>
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" className="border rounded-[6px] border-dark2 w-" onClick={handleFormReset}>
            Cancel
          </Button>
          <SubmitButton className="shad-primary-btn" isLoading={isLoading}>Save Changes</SubmitButton>

        </div>
      </form>
    </Form>
  )
}