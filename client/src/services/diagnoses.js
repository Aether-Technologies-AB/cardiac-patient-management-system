import { mockApi } from './api';

const getPatientDiagnoses = (patientId) => {
  return mockApi.get(`/diagnoses/${patientId}`);
};

const getAllDiagnoses = () => {
  return mockApi.get('/diagnoses');
};

const createDiagnosis = (diagnosisData) => {
  return mockApi.post('/diagnoses', diagnosisData);
};

const diagnosesService = {
  getPatientDiagnoses,
  getAllDiagnoses,
  createDiagnosis
};

export default diagnosesService;
