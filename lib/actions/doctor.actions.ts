import { DoctorType } from "@/types/entities/doctor-types";
import axios from "axios";

const DOCTOR_API = '/api/doctor';

export const fetchDoctorsAPI = async (): Promise<DoctorType> => {
  try {
    const response: DoctorType = await axios.get(`${DOCTOR_API}?action=all`);
    return response;
  }
  catch (error: any) {
    throw error;
  }
}