const express = require('express');
const router = express.Router();

// Mock patient data with more realistic data
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
  },
  {
    id: 'patient-003',
    first_name: 'Robert',
    last_name: 'Johnson',
    date_of_birth: '1965-03-22',
    gender: 'Male',
    phone: '+1234567894',
    email: 'robert.johnson@email.com',
    address: '789 Pine Rd, City, State',
    emergency_contact: 'Mary Johnson, +1234567895',
    medical_history: 'Coronary artery disease, High cholesterol',
    medications: 'Atorvastatin, Aspirin',
    allergies: 'None',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'patient-004',
    first_name: 'Mary',
    last_name: 'Williams',
    date_of_birth: '1972-08-10',
    gender: 'Female',
    phone: '+1234567896',
    email: 'mary.williams@email.com',
    address: '321 Elm St, City, State',
    emergency_contact: 'David Williams, +1234567897',
    medical_history: 'Arrhythmia, Hypertension',
    medications: 'Beta blockers, ACE inhibitors',
    allergies: 'Sulfa drugs',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'patient-005',
    first_name: 'James',
    last_name: 'Brown',
    date_of_birth: '1958-11-30',
    gender: 'Male',
    phone: '+1234567898',
    email: 'james.brown@email.com',
    address: '654 Maple Dr, City, State',
    emergency_contact: 'Susan Brown, +1234567899',
    medical_history: 'Heart failure, Diabetes Type 1',
    medications: 'Furosemide, Insulin',
    allergies: 'Latex',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'patient-006',
    first_name: 'Patricia',
    last_name: 'Davis',
    date_of_birth: '1985-06-18',
    gender: 'Female',
    phone: '+1234567800',
    email: 'patricia.davis@email.com',
    address: '987 Cedar Ln, City, State',
    emergency_contact: 'Michael Davis, +1234567801',
    medical_history: 'Mitral valve prolapse',
    medications: 'Propranolol',
    allergies: 'None',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'patient-007',
    first_name: 'Michael',
    last_name: 'Miller',
    date_of_birth: '1970-09-25',
    gender: 'Male',
    phone: '+1234567802',
    email: 'michael.miller@email.com',
    address: '147 Birch Way, City, State',
    emergency_contact: 'Lisa Miller, +1234567803',
    medical_history: 'Atrial fibrillation, Hypertension',
    medications: 'Warfarin, Metoprolol',
    allergies: 'Penicillin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'patient-008',
    first_name: 'Linda',
    last_name: 'Wilson',
    date_of_birth: '1968-04-12',
    gender: 'Female',
    phone: '+1234567804',
    email: 'linda.wilson@email.com',
    address: '258 Spruce St, City, State',
    emergency_contact: 'Robert Wilson, +1234567805',
    medical_history: 'Angina, High cholesterol',
    medications: 'Nitroglycerin, Statins',
    allergies: 'Iodine',
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
