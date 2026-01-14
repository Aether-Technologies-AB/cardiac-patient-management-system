const express = require('express');
const router = express.Router();

// Mock patient data
const mockPatients = [
  {
    id: 'patient-001',
    first_name: 'John',
    last_name: 'Doe',
    date_of_birth: '1980-01-01',
    gender: 'Male',
    phone: '+1234567890',
    email: 'john.doe@email.com',
    address: '123 Main St, City, State',
    emergency_contact: 'Jane Doe, +1234567891',
    medical_history: 'Hypertension, Diabetes Type 2',
    medications: 'Metformin, Lisinopril',
    allergies: 'Penicillin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'patient-002',
    first_name: 'Jane',
    last_name: 'Smith',
    date_of_birth: '1975-05-15',
    gender: 'Female',
    phone: '+1234567892',
    email: 'jane.smith@email.com',
    address: '456 Oak Ave, City, State',
    emergency_contact: 'John Smith, +1234567893',
    medical_history: 'Asthma, Allergies',
    medications: 'Albuterol inhaler',
    allergies: 'Pollen, Dust',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// @desc    Get all patients (mock)
// @route   GET /api/mock-patients
// @access  Private
const getPatients = async (req, res, next) => {
  res.status(200).json({ 
    success: true, 
    count: mockPatients.length, 
    data: mockPatients 
  });
};

// @desc    Get single patient (mock)
// @route   GET /api/mock-patients/:id
// @access  Private
const getPatient = async (req, res, next) => {
  const patient = mockPatients.find(p => p.id === req.params.id);

  if (!patient) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
  }

  res.status(200).json({ success: true, data: patient });
};

// @desc    Create patient (mock)
// @route   POST /api/mock-patients
// @access  Private
const createPatient = async (req, res, next) => {
  const newPatient = {
    id: `patient-${Date.now()}`,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  mockPatients.push(newPatient);

  res.status(201).json({ success: true, data: newPatient });
};

// @desc    Update patient (mock)
// @route   PUT /api/mock-patients/:id
// @access  Private
const updatePatient = async (req, res, next) => {
  const index = mockPatients.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
  }

  mockPatients[index] = {
    ...mockPatients[index],
    ...req.body,
    updated_at: new Date().toISOString()
  };

  res.status(200).json({ success: true, data: mockPatients[index] });
};

// @desc    Delete patient (mock)
// @route   DELETE /api/mock-patients/:id
// @access  Private
const deletePatient = async (req, res, next) => {
  const index = mockPatients.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
  }

  mockPatients.splice(index, 1);

  res.status(200).json({ success: true, data: {} });
};

router.route('/').get(getPatients).post(createPatient);
router.route('/:id').get(getPatient).put(updatePatient).delete(deletePatient);

module.exports = router;
