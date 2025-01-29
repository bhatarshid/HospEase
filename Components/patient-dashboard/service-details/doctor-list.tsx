"use client"

import { useState } from "react"
import { DoctorCard } from "./doctor-card"
import { AppointmentModal } from "@/Components/AppointmentModal"

interface DoctorsListProps {
  doctors: any[]
}

export function DoctorsList({ doctors }: DoctorsListProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const handleBookNow = (doctorData: any) => {
    setSelectedDoctor(doctorData)
    setIsBookingModalOpen(true)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-darkcolor-high mb-8">Our Specialists</h2>
      <div className="space-y-6">
        {doctors?.map((doctor, index) => <DoctorCard key={index} doctor={doctor} onBookNow={handleBookNow} />) || (
          <p>No doctors available</p>
        )}
      </div>
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        doctorData={selectedDoctor!}
      />
    </div>
  )
}

