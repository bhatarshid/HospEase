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