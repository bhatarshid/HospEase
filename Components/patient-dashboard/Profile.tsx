"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Pencil } from "lucide-react"

// This would typically come from an API or database
const initialPatientData = {
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
  primaryCarePhysician: "Dr. Smith",
  insuranceProvider: "HealthCare Insurance",
  insurancePolicyNumber: "ABC123456789",
  allergies: "Peanuts, Penicillin",
  currentMedications: "Aspirin 81mg",
  familyMedicalHistory: "Diabetes, Heart Disease",
  pastMedicalHistory: "Appendectomy (2010)",
  identificationType: "Driver's License",
  identificationNumber: "DL1234567"
}

export default function PatientProfile() {
  const [patientData, setPatientData] = useState(initialPatientData)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState("")

  const handleEdit = (field: string, value: string) => {
    setEditingField(field)
    setTempValue(value)
  }

  const handleSave = () => {
    if (editingField) {
      setPatientData(prev => ({ ...prev, [editingField]: tempValue }))
      setEditingField(null)
    }
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  const renderField = (label: string, field: keyof typeof patientData) => (
    <div className="relative">
      <Label>{label}</Label>
      {editingField === field ? (
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="mt-1">{patientData[field]}</p>
      )}
      {editingField !== field && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0"
          onClick={() => handleEdit(field, patientData[field])}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {renderField("First Name", "firstName")}
          {renderField("Last Name", "lastName")}
          {renderField("Email", "email")}
          {renderField("Phone Number", "phoneNumber")}
          {renderField("Date of Birth", "dateOfBirth")}
          {renderField("Gender", "gender")}
          {renderField("Address", "address")}
          {renderField("Occupation", "occupation")}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {renderField("Name", "emergencyContactName")}
          {renderField("Phone Number", "emergencyPhoneNumber")}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {renderField("Primary Care Physician", "primaryCarePhysician")}
          {renderField("Insurance Provider", "insuranceProvider")}
          {renderField("Insurance Policy Number", "insurancePolicyNumber")}
          {renderField("Allergies", "allergies")}
          {renderField("Current Medications", "currentMedications")}
          {renderField("Family Medical History", "familyMedicalHistory")}
          {renderField("Past Medical History", "pastMedicalHistory")}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Identification and Verification</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {renderField("Identification Type", "identificationType")}
          {renderField("Identification Number", "identificationNumber")}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 mt-4">
        <Button variant="outline" onClick={handleCancel} disabled={!editingField}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!editingField}>
          Save
        </Button>
      </div>
    </div>
  )
}