'use client'

import { CalendarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardContent } from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useEffect, useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { fetchAllAppointments } from "@/redux/features/service-slice";
import Image from "next/image";
import { formatDate, formatTimeSlot, getImageSrc } from "@/lib/utils";

const RightsideBar = () => {
  const { appointments, isError } = useSelector((state: RootState) => state.service);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    if(isError) {
      toast.error("Failed to load appointments. Please refresh page");
    }

    dispatch(fetchAllAppointments())
  }, [isError])


  return (
    <div className="fixed inset-y-0 right-0 w-[20%] flex-col h-screen pt-[58px] bg-background hidden lg:flex">
      <Card className="flex-grow overflow-hidden mb-0">
        <CardContent className="flex flex-col h-full p-2">
          <h2 className="text-xl font-medium mb-4">Upcoming Schedule</h2>
          <ScrollArea className="flex-grow h-[60%]">
            {appointments
              ?.filter((appointment: any) => appointment.status === "PENDING" && new Date(appointment.appointmentDate) >= new Date())
              .reverse()
              .map((appointment: any) => (
                <div key={appointment.id} className="mb-4 p-4 bg-white rounded-xl">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={getImageSrc(appointment.doctorPicture)}
                      alt="doctor"
                      height={1000}
                      width={1000}
                      className='w-16 h-16 rounded-full mx-auto sm:mx-0'
                    />
                    <div>
                      <h3 className="font-normal">Dr. {appointment.doctorFirstName} {appointment.doctorLastName}</h3>
                      <p className="text-sm text-gray-500">{appointment.doctorSpecialization}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-[11px] font-base space-x-2">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-blue-500" />
                      <span>{formatDate(appointment.appointmentDate)}</span>
                    </div>
                    <div>{formatTimeSlot(appointment.appointmentDate)}</div>
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