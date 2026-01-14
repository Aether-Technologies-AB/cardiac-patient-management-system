import { mockApi } from './api';

const getPatientLabs = (patientId) => {
  return mockApi.get(`/mock-labs/${patientId}`);
};

const getAllLabs = () => {
  return mockApi.get('/mock-labs');
};

const createLab = (labData) => {
  return mockApi.post('/mock-labs', labData);
};

const labsService = {
  getPatientLabs,
  getAllLabs,
  createLab
};

export default labsService;
