import { mockApi } from './api';

const getPatientVitals = (patientId) => {
  return mockApi.get(`/vitals/${patientId}`);
};

const getAllVitals = () => {
  return mockApi.get('/vitals');
};

const createVitals = (vitalData) => {
  return mockApi.post('/vitals', vitalData);
};

const vitalsService = {
  getPatientVitals,
  getAllVitals,
  createVitals
};

export default vitalsService;
