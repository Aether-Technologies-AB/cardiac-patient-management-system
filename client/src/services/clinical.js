import api from './api';

// Vitals
const getVitalsForPatient = (patientId) => {
  return api.get(`/patients/${patientId}/vitals`);
};

const addVitalsForPatient = (patientId, vitalsData) => {
  return api.post(`/patients/${patientId}/vitals`, vitalsData);
};

// Medications
const getMedicationsForPatient = (patientId) => {
  return api.get(`/patients/${patientId}/medications`);
};

// Lab Results
const getLabsForPatient = (patientId) => {
  return api.get(`/patients/${patientId}/labs`);
};

// Diagnoses
const getDiagnosesForPatient = (patientId) => {
  return api.get(`/patients/${patientId}/diagnoses`);
};

// Procedures
const getProceduresForPatient = (patientId) => {
  return api.get(`/patients/${patientId}/procedures`);
};

const clinicalService = {
  getVitalsForPatient,
  addVitalsForPatient,
  getMedicationsForPatient,
  getLabsForPatient,
  getDiagnosesForPatient,
  getProceduresForPatient,
};

export default clinicalService;
