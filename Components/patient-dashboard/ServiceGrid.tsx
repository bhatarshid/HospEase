'use client';
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { fetchServices, reset } from '@/redux/features/service-slice';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { getImageSrc } from '@/lib/utils';
import { Service } from '@/types/entities';
import SkeletonCard from '../SkeletonCard';

interface ServiceCardProps {
  service?: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service = { id: '', serviceName: '', description: '', picture: '' } }) => {
  const router = useRouter();

  const { id, serviceName, description, picture } = service;

  const viewService = () => {
    if (!id) {
      toast.error('Service ID is missing.');
      return;
    }
    router.push(`/patient/services/${id}`);
  };

  return (
    <Card className="max-w-96 flex-shrink-0 transition-all hover:shadow-lg rounded-[6px]">
      <CardHeader className="relative pb-0">
        <img
          src={getImageSrc(picture)}
          alt={serviceName || 'Service Image'}
          className="h-48 w-full rounded-[6px] object-cover"
          aria-label="Service Image"
        />
        <div className="absolute bottom-2 left-4 right-4 bg-black/60 p-2 rounded-[6px]">
          <CardTitle className="text-lg font-semibold text-white">
            {serviceName || 'Service Name'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {description || 'No description available.'}
        </p>

        <Button
          onClick={viewService}
          className="w-full bg-primary text-white py-2 rounded-[6px] hover:bg-blue-700 transition-colors"
          aria-label="View Service"
        >
          View Service
        </Button>
      </CardContent>
    </Card>
  );
};

interface ServiceGridProps {
  service?: 'dashboard' | 'full';
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ service = 'full' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, isLoading, isError } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    dispatch(fetchServices())
      .unwrap()
      .catch((err) => {
        toast.error(`Failed to fetch services: ${err.message}`);
      });
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong');
      dispatch(reset()); // Reset the error state after displaying it
    }
  }, [isError, services, dispatch]);

  if ((!services || services.length === 0) && !isLoading ) {
    return <div className="text-center py-8">No services available.</div>;
  }

  return (
    <div className="shadow-sm shadow-dark3 p-3">
      <div className="pb-2 flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <p className="text-sm text-dark3">
            We offer a wide range of services to help you stay healthy and well-rounded.
          </p>
        </div>
        {service === 'dashboard' && (
          <Link
            href="/patient/services"
            className="bg-dark3 text-white text-xs rounded-[6px] p-2 h-1/2"
            aria-label="View All Services"
          >
            View All
          </Link>
        )}
      </div>
      {isLoading ? (
        <div className={service === 'dashboard' ? 'max-w-72 flex space-x-4 remove-scrollbar overflow-x-auto' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'}>
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ):(
        <>
          {service === 'dashboard' ? (
            <div className="flex space-x-4 remove-scrollbar overflow-x-auto">
              {services && services.map((service: Service, index: number) => (
                <ServiceCard key={service.id || index} service={service} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {services && services.map((service: any, index: number) => (
                <ServiceCard key={service.id || index} service={service} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};