'use client'
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { fetchServices, reset } from '@/redux/features/service-slice';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const ServiceCard = ({ service = {} }: any) => {
  const router = useRouter()

  const { id, serviceName, description, picture } = service;

  const getImageSrc = () => {
    if (!picture) {
      return '/placeholder';
    }

    if (picture.type === 'Buffer' && picture.data) {
      const buffer = Buffer.from(picture.data);
      return `data:image/jpg;base64,${buffer.toString('base64')}`;
    }
    
    return '/placeholder/400/320';
  };

  const viewService = () => {
    router.push(`/patient/services/${id}`);
  }

  return (
    <Card className="w-72 md:w-80 lg:w-96 flex-shrink-0 transition-all hover:shadow-lg rounded-[6px]">
      <CardHeader className="relative pb-0">
        <img
          src={getImageSrc()}
          alt={serviceName}
          className="h-48 w-full rounded-[6px] object-cover"
        />
        <div className="absolute bottom-2 left-4 right-4 bg-black/60 p-2 rounded-[6px]">
          <CardTitle className="text-lg font-semibold text-white">
            {serviceName}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <Button onClick={viewService} className="w-full bg-primary text-white py-2 rounded-[6px] hover:bg-blue-700 transition-colors">
          View Service
        </Button>
      </CardContent>
    </Card>
  );
};

// Container for multiple service cards in a single row
export const ServiceGrid = ({ service }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, isError } = useSelector((state: RootState) => state.service)

  useEffect(() => {
    if(isError) {
      toast.error('Failed to fetch services. Please refresh page')
      dispatch(reset())
    }

    dispatch(fetchServices());
  }, [isError, dispatch]);

  return (
    <div className='shadow-sm shadow-dark3 p-3'>
      <div className='pb-2 flex justify-between'>
        <div className=''>
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <p className="text-sm text-dark3">
            We offer a wide range of services to help you stay healthy and well-rounded.
          </p>
        </div>
        {service === 'dashboard' && <Link href="/patient/services" className="bg-dark3 text-white text-xs rounded-[6px] p-2 h-1/2">
          View All
        </Link>}
      </div>
      {service === 'dashboard' ? 
        (<div className="flex space-x-4 remove-scrollbar overflow-x-hidden">
          {services?.map((service: any, index: any) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {services?.map((service: any, index: any) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        )
      }
    </div>
  );
};
