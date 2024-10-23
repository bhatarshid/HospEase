'use client'

import { fetchServiceDetails, reset } from '@/redux/features/service-slice'
import { AppDispatch, RootState } from '@/redux/store'
import { Calendar, Clock, Medal, Phone, DollarSign, Star } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Skeleton } from "@/Components/ui/skeleton"

interface SearchParamProps {
  params: {
    serviceId: string
  }
}

export default function ServiceDetailsPage({ params: { serviceId } }: SearchParamProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { service, isError, isLoading } = useSelector((state: RootState) => state.service)

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch data. Please refresh page')
      dispatch(reset())
    }

    dispatch(fetchServiceDetails(serviceId))
  }, [isError, dispatch, serviceId])

  const getImageSrc = (picture: any) => {
    if (!picture) {
      return '/placeholder';
    }

    if (picture.type === 'Buffer' && picture.data) {
      const buffer = Buffer.from(picture.data);
      return `data:image/jpg;base64,${buffer.toString('base64')}`;
    }
    
    return '/placeholder/400/320';
  };

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative bg-primary text-white">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={getImageSrc(service?.picture)} 
            alt="Radiology Department"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-10">{service?.serviceName || 'Service Details'}</h1>
          <p className="max-w-3xl text-lg opacity-90">{service?.description || 'Loading service description...'}</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-indigo-800">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service?.features?.map((feature: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 font-medium">{feature}</p>
                </div>
              )) || (
                <div className="col-span-2 text-center text-gray-500">
                  <p>Loading features...</p>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Doctors Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Our Specialists</h2>
        <div className="space-y-6">
          {service?.serviceDoctors?.map((doctor: any, index: number) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Doctor Image Column */}
                <div className="lg:col-span-3 relative">
                  <img 
                    src={getImageSrc(doctor.doctor.picture)}
                    alt={`Dr. ${doctor.doctor.firstname} ${doctor.doctor.lastname}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Doctor Info Section */}
                <div className="lg:col-span-4 p-6 bg-gray-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Dr. {doctor.doctor.firstName} {doctor.doctor.lastName}
                  </h3>
                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700">4.0</span>
                    <span className="ml-1 text-gray-500">(193 reviews)</span>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <Medal className="h-4 w-4 mr-2" />
                      <span>{doctor.doctor.specialization}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{doctor.doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{doctor.doctor.phoneNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>${doctor.cost} per visit</span>
                    </div>
                  </div>
                </div>

                {/* Timeslots Section */}
                <div className="lg:col-span-3 p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {doctor?.slots?.map((slot: string, slotIndex: number) => (
                      <button
                        key={slotIndex}
                        className="flex items-center justify-center px-4 py-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {slot}
                      </button>
                    )) || <p>No available times</p>}
                  </div>
                </div>

                {/* Action Section */}
                <div className="lg:col-span-2 p-6 bg-gray-50 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-3">
                    Book Now
                  </button>
                  <button className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          )) || <p>No doctors available</p>}
        </div>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Skeleton className="h-10 w-3/4 mb-10" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Skeleton className="h-64 w-full" />
          <div>
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
          </div>
        </div>
        <Skeleton className="h-8 w-1/4 mb-8" />
        <div className="space-y-6">
          {[1, 2].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}