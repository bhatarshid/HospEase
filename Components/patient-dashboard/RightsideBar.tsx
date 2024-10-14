'use client'

import { CalendarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardContent } from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const RightsideBar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  // dummy data
  const appointments = [
    { id: 1, doctor: "Dr. Alexander Boje", specialty: "Orthopedic", date: "June 12, 2025", time: "09:00 - 10:00" },
    { id: 2, doctor: "Dr. Sarah Lee", specialty: "Cardiologist", date: "June 13, 2025", time: "11:00 - 12:00" },
    { id: 3, doctor: "Dr. Michael Chen", specialty: "Dermatologist", date: "June 14, 2025", time: "14:00 - 15:00" },
    { id: 4, doctor: "Dr. Emily Brown", specialty: "Neurologist", date: "June 15, 2025", time: "10:00 - 11:00" },
    { id: 5, doctor: "Dr. David Kim", specialty: "Pediatrician", date: "June 16, 2025", time: "13:00 - 14:00" },
  ]

  return (
    <div className="fixed inset-y-0 right-0 w-[20%] flex-col h-screen pt-[58px] bg-background hidden lg:flex">
      <Card className="flex-grow overflow-hidden mb-0">
        <CardContent className="flex flex-col h-full p-2">
          <h2 className="text-xl font-medium mb-4">Upcoming Schedule</h2>
          <ScrollArea className="flex-grow h-[60%]">
            {appointments.map(appointment => (
              <div key={appointment.id} className="mb-4 p-4 bg-white rounded-xl">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${appointment.doctor}`} />
                    <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-normal">{appointment.doctor}</h3>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center text-[11px] font-base space-x-2">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-blue-500" />
                    <span>{appointment.date}</span>
                  </div>
                  <div>{appointment.time}</div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="h-[45%] mt-1">
        <h2 className="text-xl font-medium mb-3 xl:mb-4 px-2">Calendar</h2>
        <CardContent className="h-[80%] px-2 overflow-y-scroll remove-scrollbar">
          <Calendar 
            value={new Date()}
            className="text-[10px] xl:text-[15px] rounded-xl"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default RightsideBar