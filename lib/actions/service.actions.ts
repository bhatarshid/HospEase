import { ServiceDetailsResponse } from "@/types/entities";
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

export const bookAppointmentAPI = async (bookAppointmentData: any): Promise<string> => {
  try {
    const response: string = await axios.post(`${SERVICE_API}?action=appointment`, bookAppointmentData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }
  catch (error: any) {
    throw error;
  }
}

export const fetchAllAppointmentsAPI = async () => {
  try {
    const response = await axios.get(`${SERVICE_API}?action=appointment`);
    return response;
  }
  catch (error: any) {
    throw error;
  }
}

export const cancelAppointmentAPI = async (appointmentId: string) => {
  try {
    const response = await axios.put(`${SERVICE_API}?action=appointment&id=${appointmentId}`, {
      status: 'CANCELLED'
    });
    return response;
  }
  catch (error: any) {
    throw error;
  }
}