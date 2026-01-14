const express = require('express');
const router = express.Router();

// Mock vitals data for each patient
const mockVitals = {
  'patient-001': [
    {
      id: 'vital-001-1',
      patient_id: 'patient-001',
      blood_pressure_systolic: 140,
      blood_pressure_diastolic: 90,
      heart_rate: 78,
      temperature: 98.6,
      weight: 180,
      height: 72,
      oxygen_saturation: 98,
      respiratory_rate: 16,
      recorded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Dr. Smith'
    },
    {
      id: 'vital-001-2',
      patient_id: 'patient-001',
      blood_pressure_systolic: 135,
      blood_pressure_diastolic: 85,
      heart_rate: 75,
      temperature: 98.4,
      weight: 179,
      height: 72,
      oxygen_saturation: 99,
      respiratory_rate: 14,
      recorded_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Nurse Johnson'
    }
  ],
  'patient-002': [
    {
      id: 'vital-002-1',
      patient_id: 'patient-002',
      blood_pressure_systolic: 118,
      blood_pressure_diastolic: 76,
      heart_rate: 72,
      temperature: 98.2,
      weight: 145,
      height: 64,
      oxygen_saturation: 97,
      respiratory_rate: 12,
      recorded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Dr. Williams'
    }
  ],
  'patient-003': [
    {
      id: 'vital-003-1',
      patient_id: 'patient-003',
      blood_pressure_systolic: 145,
      blood_pressure_diastolic: 95,
      heart_rate: 85,
      temperature: 99.1,
      weight: 195,
      height: 70,
      oxygen_saturation: 94,
      respiratory_rate: 18,
      recorded_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Dr. Brown'
    },
    {
      id: 'vital-003-2',
      patient_id: 'patient-003',
      blood_pressure_systolic: 150,
      blood_pressure_diastolic: 98,
      heart_rate: 88,
      temperature: 99.3,
      weight: 196,
      height: 70,
      oxygen_saturation: 93,
      respiratory_rate: 20,
      recorded_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Nurse Davis'
    }
  ],
  'patient-004': [
    {
      id: 'vital-004-1',
      patient_id: 'patient-004',
      blood_pressure_systolic: 125,
      blood_pressure_diastolic: 80,
      heart_rate: 95,
      temperature: 98.8,
      weight: 160,
      height: 66,
      oxygen_saturation: 96,
      respiratory_rate: 16,
      recorded_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Dr. Miller'
    }
  ],
  'patient-005': [
    {
      id: 'vital-005-1',
      patient_id: 'patient-005',
      blood_pressure_systolic: 130,
      blood_pressure_diastolic: 85,
      heart_rate: 110,
      temperature: 99.5,
      weight: 210,
      height: 68,
      oxygen_saturation: 91,
      respiratory_rate: 22,
      recorded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Dr. Wilson'
    }
  ],
  'patient-006': [
    {
      id: 'vital-006-1',
      patient_id: 'patient-006',
      blood_pressure_systolic: 115,
      blood_pressure_diastolic: 75,
      heart_rate: 68,
      temperature: 98.0,
      weight: 135,
      height: 65,
      oxygen_saturation: 99,
      respiratory_rate: 12,
      recorded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Dr. Taylor'
    }
  ],
  'patient-007': [
    {
      id: 'vital-007-1',
      patient_id: 'patient-007',
      blood_pressure_systolic: 138,
      blood_pressure_diastolic: 88,
      heart_rate: 92,
      temperature: 98.6,
      weight: 175,
      height: 69,
      oxygen_saturation: 95,
      respiratory_rate: 16,
      recorded_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Dr. Anderson'
    }
  ],
  'patient-008': [
    {
      id: 'vital-008-1',
      patient_id: 'patient-008',
      blood_pressure_systolic: 142,
      blood_pressure_diastolic: 92,
      heart_rate: 76,
      temperature: 98.4,
      weight: 155,
      height: 63,
      oxygen_saturation: 97,
      respiratory_rate: 14,
      recorded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      recorded_by: 'Dr. Thomas'
    }
  ]
};

// @desc    Get vitals for a patient
// @route   GET /api/mock-vitals/:patientId
// @access  Private
const getPatientVitals = async (req, res, next) => {
  const { patientId } = req.params;
  const vitals = mockVitals[patientId] || [];
  
  res.status(200).json({ 
    success: true, 
    count: vitals.length, 
    data: vitals 
  });
};

// @desc    Get all vitals
// @route   GET /api/mock-vitals
// @access  Private
const getAllVitals = async (req, res, next) => {
  const allVitals = [];
  Object.values(mockVitals).forEach(patientVitals => {
    allVitals.push(...patientVitals);
  });
  
  // Sort by date (most recent first)
  allVitals.sort((a, b) => new Date(b.recorded_at) - new Date(a.recorded_at));
  
  res.status(200).json({ 
    success: true, 
    count: allVitals.length, 
    data: allVitals 
  });
};

// @desc    Create vitals for a patient
// @route   POST /api/mock-vitals
// @access  Private
const createVitals = async (req, res, next) => {
  const { patient_id, ...vitalData } = req.body;
  
  const newVital = {
    id: `vital-${patient_id}-${Date.now()}`,
    patient_id,
    ...vitalData,
    recorded_at: new Date().toISOString(),
    recorded_by: 'Current User'
  };
  
  if (!mockVitals[patient_id]) {
    mockVitals[patient_id] = [];
  }
  mockVitals[patient_id].push(newVital);
  
  res.status(201).json({ success: true, data: newVital });
};

router.get('/', getAllVitals);
router.get('/:patientId', getPatientVitals);
router.post('/', createVitals);

module.exports = router;
