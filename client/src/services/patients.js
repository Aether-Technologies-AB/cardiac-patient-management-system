import api from './api';

const getPatients = () => {
  return api.get('/patients');
};

const getPatient = (id) => {
  return api.get(`/patients/${id}`);
};

const createPatient = (patientData) => {
  return api.post('/patients', patientData);
};

const updatePatient = (id, patientData) => {
  return api.put(`/patients/${id}`, patientData);
};

const deletePatient = (id) => {
  return api.delete(`/patients/${id}`);
};

const patientService = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
};

export default patientService;
