import { mockApi } from './api';

const getPatientLabs = (patientId) => {
  return mockApi.get(`/labs/${patientId}`);
};

const getAllLabs = () => {
  return mockApi.get('/labs');
};

const createLab = (labData) => {
  return mockApi.post('/labs', labData);
};

const labsService = {
  getPatientLabs,
  getAllLabs,
  createLab
};

export default labsService;
