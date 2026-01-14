const express = require('express');
const router = express.Router();

// Mock lab results data for each patient
const mockLabs = {
  'patient-001': [
    {
      id: 'lab-001-1',
      patient_id: 'patient-001',
      test_name: 'Comprehensive Metabolic Panel',
      test_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'Glucose': { value: 145, unit: 'mg/dL', reference_range: '70-100', status: 'High' },
        'Creatinine': { value: 1.1, unit: 'mg/dL', reference_range: '0.6-1.2', status: 'Normal' },
        'Sodium': { value: 140, unit: 'mmol/L', reference_range: '135-145', status: 'Normal' },
        'Potassium': { value: 4.2, unit: 'mmol/L', reference_range: '3.5-5.0', status: 'Normal' },
        'Total Cholesterol': { value: 210, unit: 'mg/dL', reference_range: '<200', status: 'High' },
        'LDL': { value: 135, unit: 'mg/dL', reference_range: '<100', status: 'High' },
        'HDL': { value: 38, unit: 'mg/dL', reference_range: '>40', status: 'Low' },
        'Triglycerides': { value: 185, unit: 'mg/dL', reference_range: '<150', status: 'High' }
      },
      ordered_by: 'Dr. Smith',
      performed_by: 'Central Lab',
      status: 'Final'
    },
    {
      id: 'lab-001-2',
      patient_id: 'patient-001',
      test_name: 'Hemoglobin A1c',
      test_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'HbA1c': { value: 7.8, unit: '%', reference_range: '<5.7', status: 'High' }
      },
      ordered_by: 'Dr. Johnson',
      performed_by: 'Central Lab',
      status: 'Final'
    }
  ],
  'patient-002': [
    {
      id: 'lab-002-1',
      patient_id: 'patient-002',
      test_name: 'Complete Blood Count with Differential',
      test_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'WBC': { value: 8.5, unit: 'K/uL', reference_range: '4.5-11.0', status: 'Normal' },
        'RBC': { value: 4.5, unit: 'M/uL', reference_range: '4.0-5.5', status: 'Normal' },
        'Hemoglobin': { value: 13.8, unit: 'g/dL', reference_range: '12.0-15.5', status: 'Normal' },
        'Hematocrit': { value: 41.2, unit: '%', reference_range: '36-46', status: 'Normal' },
        'Platelets': { value: 285, unit: 'K/uL', reference_range: '150-450', status: 'Normal' },
        'Eosinophils': { value: 0.6, unit: 'K/uL', reference_range: '0.0-0.5', status: 'High' }
      },
      ordered_by: 'Dr. Williams',
      performed_by: 'Central Lab',
      status: 'Final'
    }
  ],
  'patient-003': [
    {
      id: 'lab-003-1',
      patient_id: 'patient-003',
      test_name: 'Lipid Panel',
      test_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'Total Cholesterol': { value: 245, unit: 'mg/dL', reference_range: '<200', status: 'High' },
        'LDL': { value: 165, unit: 'mg/dL', reference_range: '<100', status: 'High' },
        'HDL': { value: 32, unit: 'mg/dL', reference_range: '>40', status: 'Low' },
        'Triglycerides': { value: 240, unit: 'mg/dL', reference_range: '<150', status: 'High' }
      },
      ordered_by: 'Dr. Brown',
      performed_by: 'Central Lab',
      status: 'Final'
    },
    {
      id: 'lab-003-2',
      patient_id: 'patient-003',
      test_name: 'Cardiac Enzymes',
      test_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'Troponin I': { value: 0.02, unit: 'ng/mL', reference_range: '<0.04', status: 'Normal' },
        'CK-MB': { value: 2.1, unit: 'ng/mL', reference_range: '0.0-3.0', status: 'Normal' },
        'BNP': { value: 125, unit: 'pg/mL', reference_range: '<100', status: 'High' }
      },
      ordered_by: 'Dr. Brown',
      performed_by: 'Central Lab',
      status: 'Final'
    }
  ],
  'patient-004': [
    {
      id: 'lab-004-1',
      patient_id: 'patient-004',
      test_name: 'Thyroid Panel',
      test_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'TSH': { value: 2.4, unit: 'mIU/L', reference_range: '0.4-4.0', status: 'Normal' },
        'Free T4': { value: 1.2, unit: 'ng/dL', reference_range: '0.8-1.8', status: 'Normal' },
        'Free T3': { value: 3.1, unit: 'pg/mL', reference_range: '2.3-4.2', status: 'Normal' }
      },
      ordered_by: 'Dr. Miller',
      performed_by: 'Central Lab',
      status: 'Final'
    }
  ],
  'patient-005': [
    {
      id: 'lab-005-1',
      patient_id: 'patient-005',
      test_name: 'Basic Metabolic Panel',
      test_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'Glucose': { value: 185, unit: 'mg/dL', reference_range: '70-100', status: 'High' },
        'Creatinine': { value: 1.8, unit: 'mg/dL', reference_range: '0.6-1.2', status: 'High' },
        'BUN': { value: 35, unit: 'mg/dL', reference_range: '7-20', status: 'High' },
        'Sodium': { value: 138, unit: 'mmol/L', reference_range: '135-145', status: 'Normal' },
        'Potassium': { value: 4.8, unit: 'mmol/L', reference_range: '3.5-5.0', status: 'Normal' }
      },
      ordered_by: 'Dr. Wilson',
      performed_by: 'Central Lab',
      status: 'Final'
    }
  ],
  'patient-006': [
    {
      id: 'lab-006-1',
      patient_id: 'patient-006',
      test_name: 'Coagulation Panel',
      test_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'PT': { value: 12.5, unit: 'seconds', reference_range: '11.0-13.5', status: 'Normal' },
        'INR': { value: 1.0, unit: '', reference_range: '0.8-1.2', status: 'Normal' },
        'PTT': { value: 28.5, unit: 'seconds', reference_range: '25.0-35.0', status: 'Normal' }
      },
      ordered_by: 'Dr. Taylor',
      performed_by: 'Central Lab',
      status: 'Final'
    }
  ],
  'patient-007': [
    {
      id: 'lab-007-1',
      patient_id: 'patient-007',
      test_name: 'INR Monitoring',
      test_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'INR': { value: 2.3, unit: '', reference_range: '2.0-3.0', status: 'Therapeutic' }
      },
      ordered_by: 'Dr. Anderson',
      performed_by: 'Point of Care',
      status: 'Final'
    },
    {
      id: 'lab-007-2',
      patient_id: 'patient-007',
      test_name: 'Liver Function Panel',
      test_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'ALT': { value: 45, unit: 'U/L', reference_range: '7-55', status: 'Normal' },
        'AST': { value: 38, unit: 'U/L', reference_range: '8-48', status: 'Normal' },
        'Alkaline Phosphatase': { value: 85, unit: 'U/L', reference_range: '40-129', status: 'Normal' },
        'Total Bilirubin': { value: 0.8, unit: 'mg/dL', reference_range: '0.3-1.2', status: 'Normal' }
      },
      ordered_by: 'Dr. Anderson',
      performed_by: 'Central Lab',
      status: 'Final'
    }
  ],
  'patient-008': [
    {
      id: 'lab-008-1',
      patient_id: 'patient-008',
      test_name: 'Cardiac Risk Panel',
      test_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      results: {
        'Total Cholesterol': { value: 238, unit: 'mg/dL', reference_range: '<200', status: 'High' },
        'LDL': { value: 158, unit: 'mg/dL', reference_range: '<100', status: 'High' },
        'HDL': { value: 35, unit: 'mg/dL', reference_range: '>40', status: 'Low' },
        'Triglycerides': { value: 225, unit: 'mg/dL', reference_range: '<150', status: 'High' },
        'hs-CRP': { value: 3.2, unit: 'mg/L', reference_range: '<1.0', status: 'High' }
      },
      ordered_by: 'Dr. Thomas',
      performed_by: 'Central Lab',
      status: 'Final'
    }
  ]
};

// @desc    Get lab results for a patient
// @route   GET /api/mock-labs/:patientId
// @access  Private
const getPatientLabs = async (req, res, next) => {
  const { patientId } = req.params;
  const labs = mockLabs[patientId] || [];
  
  res.status(200).json({ 
    success: true, 
    count: labs.length, 
    data: labs 
  });
};

// @desc    Get all lab results
// @route   GET /api/mock-labs
// @access  Private
const getAllLabs = async (req, res, next) => {
  const allLabs = [];
  Object.values(mockLabs).forEach(patientLabs => {
    allLabs.push(...patientLabs);
  });
  
  // Sort by test date (most recent first)
  allLabs.sort((a, b) => new Date(b.test_date) - new Date(a.test_date));
  
  res.status(200).json({ 
    success: true, 
    count: allLabs.length, 
    data: allLabs 
  });
};

// @desc    Create lab results for a patient
// @route   POST /api/mock-labs
// @access  Private
const createLab = async (req, res, next) => {
  const { patient_id, test_name, results } = req.body;
  
  const newLab = {
    id: `lab-${patient_id}-${Date.now()}`,
    patient_id,
    test_name,
    test_date: new Date().toISOString().split('T')[0],
    results,
    ordered_by: 'Current User',
    performed_by: 'Central Lab',
    status: 'Final'
  };
  
  if (!mockLabs[patient_id]) {
    mockLabs[patient_id] = [];
  }
  mockLabs[patient_id].push(newLab);
  
  res.status(201).json({ success: true, data: newLab });
};

router.get('/', getAllLabs);
router.get('/:patientId', getPatientLabs);
router.post('/', createLab);

module.exports = router;
