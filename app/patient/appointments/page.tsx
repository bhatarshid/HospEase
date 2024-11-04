'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogContent, AlertDialogDescription, AlertDialogTrigger } from '@/Components/ui/alert-dialog'
import { Button } from '@/Components/ui/button'
import { Card, CardContent } from '@/Components/ui/card'
import { AppDispatch, RootState } from '@/redux/store'
import { Calendar, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchAllAppointments } from '@/redux/features/service-slice'
import { formatDate, formatTimeSlot, getImageSrc } from '@/lib/utils'

const Appointment = () => {
  const { appointments } = useSelector((state: RootState) => state.service);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchAllAppointments())
  }, [dispatch])

  const handleCancelAppointment = () => {
    console.log('Appointment cancelled')
  }

  const getStatus = (value: string) => {
    switch (value) {
      case 'PENDING':
        return <span className='px-3 py-1 rounded-3xl text-sm font-medium bg-yellow-200 text-yellow-800 whitespace-nowrap'>Pending</span>
      case 'CONFIRMED':
        return <span className='px-3 py-1 rounded-3xl text-sm font-medium bg-green-200 text-green-800 whitespace-nowrap'>Confirmed</span>
      case 'CLOSED':
        return <span className='px-3 py-1 rounded-3xl text-sm font-medium bg-red-200 text-red-800 whitespace-nowrap'>Closed</span>
      case 'COMPLETED':
        return <span className='px-3 py-1 rounded-3xl text-sm font-medium bg-blue-200 text-blue-800 whitespace-nowrap'>Completed</span>
      default:
        return <span className='px-3 py-1 rounded-3xl text-sm font-medium bg-gray-200 text-gray-800 whitespace-nowrap'>Unknown</span>
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className='mx-auto'>
        <div className='mb-6 md:mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-dark1'>
            My Appointments
          </h1>
          <p className='text-dark2 mt-2'>
            View your upcoming appointments and manage your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          {appointments?.map((appointment: any, index) => (
            <Card key={index} className='w-full max-w-sm mx-auto transition-all hover:shadow-lg rounded-[6px]'>
              <CardContent className='p-4 md:p-6'>
                <div className='flex flex-col sm:flex-row gap-4 md:gap-6'>
                  <Image
                    src={getImageSrc(appointment.doctorPicture)}
                    alt="doctor"
                    height={1000}
                    width={1000}
                    className='w-16 h-16 rounded-full mx-auto sm:mx-0'
                  />

                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-start gap-2'>
                      <div>
                        <h3 className='text-lg font-semibold text-dark1 break-words'>
                          Dr. {appointment.doctorFirstName} {appointment.doctorLastName}
                        </h3>
                        <p className='text-sm text-dark3'>{appointment.doctorSpecialization}</p>
                      </div>
                    
                      {getStatus(appointment.status)}
                    </div>

                    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4'>
                      <div className='flex items-center gap-2 text-dark2'>
                        <Calendar className='w-4 h-4 flex-shrink-0' />
                        <span className='text-sm'>{formatDate(appointment.appointmentDate)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className='text-sm'>{formatTimeSlot(appointment.appointmentDate)}</span>
                      </div>
                    </div>
                    
                    <div className='mt-2 flex items-center gap-2 text-dark2'>
                      <MapPin className='w-4 h-4 flex-shrink-0' />
                      <span className='text-sm break-words'>{appointment.serviceName}</span>
                    </div>

                    <div className="mt-4 p-3 bg-[#dfd9d9] rounded-lg">
                      <p className="text-sm text-gray-600 line-clamp-3 break-words">
                        <span className="font-medium">Reason for visit:</span> {appointment.reason}
                      </p>
                    </div>

                    <div className='mt-4 flex justify-end'>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className='bg-red-400 hover:bg-red-600 rounded-xl w-full sm:w-auto' size="sm">
                            Cancel Appointment
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-white mx-4'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel your appointment with Dr. {appointment.doctorFirstName} {appointment.doctorLastName} Bhat on {' '}
                              {formatDate(appointment.appointmentDate)} at {formatTimeSlot(appointment.appointmentDate)}?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className='flex-col sm:flex-row gap-2'>
                            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancelAppointment()}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Yes, Cancel Appointment
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Appointment