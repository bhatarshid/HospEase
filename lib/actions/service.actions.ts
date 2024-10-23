import { SingleServiceType } from "@/types/entities/service-types";
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

export const fetchServiceDetailsAPI = async (serviceId: string): Promise<SingleServiceType> => {
  try {
    const response: SingleServiceType = await axios.get(`${SERVICE_API}?action=view&id=${serviceId}`);
    return response;
  }
  catch (error: any) {
    throw error;
  }
}