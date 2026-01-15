import { mockApi } from './api';

const getPatients = () => {
  // Use mock API for testing
  return mockApi.get('/patients');
};

const getPatient = (id) => {
  // Use mock API for testing
  return mockApi.get(`/patients/${id}`);
};

const createPatient = (patientData) => {
  // Use mock API for testing
  return mockApi.post('/patients', patientData);
};

const updatePatient = (id, patientData) => {
  // Use mock API for testing
  return mockApi.put(`/patients/${id}`, patientData);
};

const deletePatient = (id) => {
  // Use mock API for testing
  return mockApi.delete(`/patients/${id}`);
};

const patientService = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
};

export default patientService;
