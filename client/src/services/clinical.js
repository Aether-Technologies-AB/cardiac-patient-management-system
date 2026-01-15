import api from './api';

// Vitals
const getVitalsForPatient = (patientId) => {
  return api.get(`/vitals/${patientId}`);
};

const addVitalsForPatient = (patientId, vitalsData) => {
  return api.post(`/vitals/${patientId}`, vitalsData);
};

// Medications (endpoint doesn't exist yet, return empty)
const getMedicationsForPatient = async (patientId) => {
  return Promise.resolve({ data: { success: true, data: [] } });
};

// Lab Results
const getLabsForPatient = (patientId) => {
  return api.get(`/labs/${patientId}`);
};

// Diagnoses
const getDiagnosesForPatient = (patientId) => {
  return api.get(`/diagnoses/${patientId}`);
};

// Procedures (endpoint doesn't exist yet, return empty)
const getProceduresForPatient = async (patientId) => {
  return Promise.resolve({ data: { success: true, data: [] } });
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
