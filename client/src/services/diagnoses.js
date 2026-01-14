import { mockApi } from './api';

const getPatientDiagnoses = (patientId) => {
  return mockApi.get(`/mock-diagnoses/${patientId}`);
};

const getAllDiagnoses = () => {
  return mockApi.get('/mock-diagnoses');
};

const createDiagnosis = (diagnosisData) => {
  return mockApi.post('/mock-diagnoses', diagnosisData);
};

const diagnosesService = {
  getPatientDiagnoses,
  getAllDiagnoses,
  createDiagnosis
};

export default diagnosesService;
