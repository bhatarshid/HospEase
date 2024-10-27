import { BookAppointment, ServiceDetailsResponse } from "@/types/entities/service-types";
import { Service } from "@prisma/client";
import axios from "axios";

const SERVICE_API = '/api/service';

export const fetchServicesAPI = async (): Promise<Service[]> => {
  try {
    const response: Service[] = await axios.get(`${SERVICE_API}?action=all`);
    return response;
  }
  catch (error: any) {
    throw error;
  }
}

export const fetchServiceDetailsAPI = async (serviceId: string): Promise<ServiceDetailsResponse> => {
  try {
    const response: ServiceDetailsResponse = await axios.get(`${SERVICE_API}?action=view&id=${serviceId}`);
    return response;
  }
  catch (error: any) {
    throw error;
  }
}

export const bookAppointmentAPI = async (data: BookAppointment) => {
  try {
    const response: string = await axios.post(`${SERVICE_API}?action=appointment`, data);
    return response;
  }
  catch (error: any) {
    throw error;
  }
}