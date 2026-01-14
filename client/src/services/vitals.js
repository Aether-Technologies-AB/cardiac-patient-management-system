import { mockApi } from './api';

const getPatientVitals = (patientId) => {
  return mockApi.get(`/mock-vitals/${patientId}`);
};

const getAllVitals = () => {
  return mockApi.get('/mock-vitals');
};

const createVitals = (vitalData) => {
  return mockApi.post('/mock-vitals', vitalData);
};

const vitalsService = {
  getPatientVitals,
  getAllVitals,
  createVitals
};

export default vitalsService;
