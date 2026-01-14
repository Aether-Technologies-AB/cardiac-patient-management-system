import api, { mockApi } from './api';

const getPatients = () => {
  // Use mock API for testing
  return mockApi.get('/mock-patients');
};

const getPatient = (id) => {
  // Use mock API for testing
  return mockApi.get(`/mock-patients/${id}`);
};

const createPatient = (patientData) => {
  // Use mock API for testing
  return mockApi.post('/mock-patients', patientData);
};

const updatePatient = (id, patientData) => {
  // Use mock API for testing
  return mockApi.put(`/mock-patients/${id}`, patientData);
};

const deletePatient = (id) => {
  // Use mock API for testing
  return mockApi.delete(`/mock-patients/${id}`);
};

const patientService = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
};

export default patientService;
