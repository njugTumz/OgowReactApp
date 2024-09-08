// facilitiesService.ts
import axios from 'axios';
import { FacilityFData, HealthFacility, HealthWorker, Patient } from '../models/types';

const API_URL = import.meta.env.VITE_API_TEST_URL;
const healthFac = 'HealthFacility';
const healthWorker = 'HealthWorker';
const patient = 'Patients';

// Health Facility CRUD Operations
export const fetchHealthFacilities = async (): Promise<HealthFacility[]> => {
  const response = await axios.get(`${API_URL}/${healthFac}`);
  return response.data;
};

export const createHealthFacility = async (formData: FacilityFData): Promise<HealthFacility> => {
  const response = await axios.post(`${API_URL}/${healthFac}`, formData);
  return response.data;
};

export const updateHealthFacility = async (id: number, formData: FacilityFData): Promise<HealthFacility> => {
  const response = await axios.put(`${API_URL}/${healthFac}/${id}`, formData);
  return response.data;
};

export const deleteHealthFacility = async (id: number) => {
  await axios.delete(`${API_URL}/${healthFac}/${id}`);
};

// Health Worker CRUD Operations
export const fetchHealthWorkers = async (): Promise<HealthWorker[]> => {
  const response = await axios.get(`${API_URL}/${healthWorker}`);
  return response.data;
};

export const createHealthWorker = async (formData: HealthWorker): Promise<HealthWorker> => {
  const response = await axios.post(`${API_URL}/${healthWorker}`, formData);
  return response.data;
};

export const updateHealthWorker = async (id: number, formData: HealthWorker): Promise<HealthWorker> => {
  const response = await axios.put(`${API_URL}/${healthWorker}/${id}`, formData);
  return response.data;
};

export const deleteHealthWorker = async (id: number) => {
  await axios.delete(`${API_URL}/${healthWorker}/${id}`);
};

// Patient CRUD Operations
export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await axios.get(`${API_URL}/${patient}`);
  return response.data;
};

export const createPatient = async (formData: Patient): Promise<Patient> => {
  const response = await axios.post(`${API_URL}/${patient}`, formData);
  return response.data;
};

export const updatePatient = async (id: number, formData: Patient): Promise<Patient> => {
  const response = await axios.put(`${API_URL}/${patient}/${id}`, formData);
  return response.data;
};

export const deletePatient = async (id: number) => {
  await axios.delete(`${API_URL}/${patient}/${id}`);
};
