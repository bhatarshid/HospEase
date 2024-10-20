import React from 'react';
import { Calendar, Clock, DollarSign, User, Building2, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

const ServiceCard = ({ service = {} }: any) => {
  const {
    service_name = 'Service Name',
    description = 'Service description',
    picture = ''
  } = service;

  return (
    <Card className="w-64 flex-shrink-0 transition-all hover:shadow-lg">
      <CardHeader className="relative pb-0">
        <img
          src={picture || "/api/placeholder/400/200"}
          alt={service_name}
          className="h-48 w-full rounded-t-lg object-cover"
        />
        <div className="absolute bottom-2 left-4 right-4 bg-black/60 p-2 rounded-[6px]">
          <CardTitle className="text-lg font-semibold text-white">
            {service_name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <button className="w-full bg-primary text-white py-2 rounded-[6px] hover:bg-blue-700 transition-colors">
          View Service
        </button>
      </CardContent>
    </Card>
  );
};

// Container for multiple service cards in a single row
export const ServiceGrid = () => {
  const services = [
    {
      service_name: "General Consultation",
      description: "Comprehensive medical consultation with experienced healthcare professional",
      picture: "",
    },
    {
      service_name: "Pediatric Consultation",
      description: "Specialized consultation for children and infants with our pediatric experts.",
      picture: ""
    },
    {
      service_name: "Dental Check-up",
      description: "Routine dental examination to ensure optimal oral health.",
      picture: "",
    },
    {
      service_name: "Cardiology",
      description: "Heart health check-ups and consultations with our cardiologists.",
      picture: ""
    }
  ];

  if (!services || services.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className='shadow-sm shadow-dark3 p-3'>
      <div className='pb-2'>
        <h2 className="text-2xl font-semibold">Our Services</h2>
        <p className="text-sm text-dark3">
          We offer a wide range of services to help you stay healthy and well-rounded.
        </p>
      </div>
      <div className="flex space-x-4 remove-scrollbar overflow-x-hidden">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};
