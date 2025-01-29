'use client'

import { fetchServiceDetails, reset } from '@/redux/features/service-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { HeroSection } from '@/Components/patient-dashboard/service-details/hero-section';
import { FeaturesGrid } from '@/Components/patient-dashboard/service-details/feature-grid';
import { Loader2 } from 'lucide-react';
import { DoctorsList } from '@/Components/patient-dashboard/service-details/doctor-list';

interface SearchParamProps {
  params: {
    serviceId: string
  }
}

export default function ServiceDetailsPage({ params: { serviceId } }: SearchParamProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { service, isError, isLoading } = useSelector((state: RootState) => state.service);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch data. Please refresh page')
      dispatch(reset())
    }

    if (isLoading === false) {
      setLoading(false)
    }

    dispatch(fetchServiceDetails(serviceId))
  }, [dispatch, serviceId])

  return (
    <>
      {loading || isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="min-h-screen">
          <HeroSection picture={service?.picture} serviceName={service?.serviceName!} description={service?.description!} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <FeaturesGrid features={service?.features!} />
            <DoctorsList doctors={service?.serviceDoctors!} />
          </div>
        </div>
      )}
    </>
  )
}