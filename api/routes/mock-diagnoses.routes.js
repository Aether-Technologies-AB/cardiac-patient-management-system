const express = require('express');
const router = express.Router();

// Mock diagnoses data for each patient
const mockDiagnoses = {
  'patient-001': [
    {
      id: 'diag-001-1',
      patient_id: 'patient-001',
      diagnosis_code: 'I10',
      diagnosis_name: 'Essential (primary) hypertension',
      description: 'Chronic elevated blood pressure requiring medication management',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2022-03-15',
      diagnosed_by: 'Dr. Smith',
      treatment_plan: 'Lisininopril 10mg daily, lifestyle modifications, regular monitoring'
    },
    {
      id: 'diag-001-2',
      patient_id: 'patient-001',
      diagnosis_code: 'E11.9',
      diagnosis_name: 'Type 2 diabetes mellitus without complications',
      description: 'Insulin resistance requiring oral medication management',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2021-08-20',
      diagnosed_by: 'Dr. Johnson',
      treatment_plan: 'Metformin 500mg twice daily, dietary management, glucose monitoring'
    }
  ],
  'patient-002': [
    {
      id: 'diag-002-1',
      patient_id: 'patient-002',
      diagnosis_code: 'J45.909',
      diagnosis_name: 'Unspecified asthma, uncomplicated',
      description: 'Reversible airway obstruction with intermittent symptoms',
      severity: 'Mild',
      status: 'Active',
      diagnosed_date: '2020-12-10',
      diagnosed_by: 'Dr. Williams',
      treatment_plan: 'Albuterol inhaler as needed, avoid triggers, regular pulmonary function tests'
    }
  ],
  'patient-003': [
    {
      id: 'diag-003-1',
      patient_id: 'patient-003',
      diagnosis_code: 'I25.10',
      diagnosis_name: 'Atherosclerotic heart disease of native coronary artery without angina pectoris',
      description: 'Coronary artery disease with plaque buildup, currently asymptomatic',
      severity: 'Severe',
      status: 'Active',
      diagnosed_date: '2019-05-12',
      diagnosed_by: 'Dr. Brown',
      treatment_plan: 'Atorvastatin 40mg daily, Aspirin 81mg daily, cardiac rehabilitation, stress management'
    },
    {
      id: 'diag-003-2',
      patient_id: 'patient-003',
      diagnosis_code: 'E78.5',
      diagnosis_name: 'Hyperlipidemia, unspecified',
      description: 'Elevated cholesterol and triglycerides requiring treatment',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2019-05-12',
      diagnosed_by: 'Dr. Brown',
      treatment_plan: 'Continue statin therapy, low-fat diet, regular exercise, lipid panel monitoring'
    }
  ],
  'patient-004': [
    {
      id: 'diag-004-1',
      patient_id: 'patient-004',
      diagnosis_code: 'I49.9',
      diagnosis_name: 'Cardiac arrhythmia, unspecified',
      description: 'Irregular heart rhythm requiring rate control',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2021-02-28',
      diagnosed_by: 'Dr. Miller',
      treatment_plan: 'Beta blockers, regular ECG monitoring, avoid stimulants'
    },
    {
      id: 'diag-004-2',
      patient_id: 'patient-004',
      diagnosis_code: 'I10',
      diagnosis_name: 'Essential (primary) hypertension',
      description: 'Chronic elevated blood pressure',
      severity: 'Mild',
      status: 'Active',
      diagnosed_date: '2021-02-28',
      diagnosed_by: 'Dr. Miller',
      treatment_plan: 'ACE inhibitors, sodium restriction, regular BP monitoring'
    }
  ],
  'patient-005': [
    {
      id: 'diag-005-1',
      patient_id: 'patient-005',
      diagnosis_code: 'I50.9',
      diagnosis_name: 'Heart failure, unspecified',
      description: 'Reduced cardiac output requiring multiple medications',
      severity: 'Severe',
      status: 'Active',
      diagnosed_date: '2018-11-05',
      diagnosed_by: 'Dr. Wilson',
      treatment_plan: 'Furosemide 40mg daily, fluid restriction, daily weight monitoring, low sodium diet'
    },
    {
      id: 'diag-005-2',
      patient_id: 'patient-005',
      diagnosis_code: 'E10.9',
      diagnosis_name: 'Type 1 diabetes mellitus without complications',
      description: 'Autoimmune diabetes requiring insulin therapy',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2017-06-15',
      diagnosed_by: 'Dr. Davis',
      treatment_plan: 'Insulin therapy, carbohydrate counting, regular glucose monitoring, diabetic diet'
    }
  ],
  'patient-006': [
    {
      id: 'diag-006-1',
      patient_id: 'patient-006',
      diagnosis_code: 'I34.1',
      diagnosis_name: 'Mitral (valve) prolapse',
      description: 'Mitral valve leaflet prolapse without significant regurgitation',
      severity: 'Mild',
      status: 'Active',
      diagnosed_date: '2022-09-18',
      diagnosed_by: 'Dr. Taylor',
      treatment_plan: 'Propranolol as needed for symptoms, regular echocardiograms, avoid excessive caffeine'
    }
  ],
  'patient-007': [
    {
      id: 'diag-007-1',
      patient_id: 'patient-007',
      diagnosis_code: 'I48.91',
      diagnosis_name: 'Atrial fibrillation',
      description: 'Irregular supraventricular rhythm requiring anticoagulation',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2020-07-22',
      diagnosed_by: 'Dr. Anderson',
      treatment_plan: 'Warfarin therapy with INR monitoring, Metoprolol for rate control, avoid alcohol'
    },
    {
      id: 'diag-007-2',
      patient_id: 'patient-007',
      diagnosis_code: 'I10',
      diagnosis_name: 'Essential (primary) hypertension',
      description: 'Chronic elevated blood pressure complicating atrial fibrillation',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2020-07-22',
      diagnosed_by: 'Dr. Anderson',
      treatment_plan: 'Continue antihypertensive therapy, monitor for medication interactions'
    }
  ],
  'patient-008': [
    {
      id: 'diag-008-1',
      patient_id: 'patient-008',
      diagnosis_code: 'I20.9',
      diagnosis_name: 'Angina pectoris, unspecified',
      description: 'Chest pain due to myocardial ischemia',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2021-04-10',
      diagnosed_by: 'Dr. Thomas',
      treatment_plan: 'Nitroglycerin PRN, statin therapy, stress test monitoring, cardiac rehabilitation'
    },
    {
      id: 'diag-008-2',
      patient_id: 'patient-008',
      diagnosis_code: 'E78.5',
      diagnosis_name: 'Hyperlipidemia, unspecified',
      description: 'Elevated cholesterol contributing to coronary artery disease',
      severity: 'Moderate',
      status: 'Active',
      diagnosed_date: '2021-04-10',
      diagnosed_by: 'Dr. Thomas',
      treatment_plan: 'Intensive statin therapy, dietary modifications, regular lipid panels'
    }
  ]
};

// @desc    Get diagnoses for a patient
// @route   GET /api/mock-diagnoses/:patientId
// @access  Private
const getPatientDiagnoses = async (req, res, next) => {
  const { patientId } = req.params;
  const diagnoses = mockDiagnoses[patientId] || [];
  
  res.status(200).json({ 
    success: true, 
    count: diagnoses.length, 
    data: diagnoses 
  });
};

// @desc    Get all diagnoses
// @route   GET /api/mock-diagnoses
// @access  Private
const getAllDiagnoses = async (req, res, next) => {
  const allDiagnoses = [];
  Object.values(mockDiagnoses).forEach(patientDiagnoses => {
    allDiagnoses.push(...patientDiagnoses);
  });
  
  // Sort by diagnosis date (most recent first)
  allDiagnoses.sort((a, b) => new Date(b.diagnosed_date) - new Date(a.diagnosed_date));
  
  res.status(200).json({ 
    success: true, 
    count: allDiagnoses.length, 
    data: allDiagnoses 
  });
};

// @desc    Create diagnosis for a patient
// @route   POST /api/mock-diagnoses
// @access  Private
const createDiagnosis = async (req, res, next) => {
  const { patient_id, ...diagnosisData } = req.body;
  
  const newDiagnosis = {
    id: `diag-${patient_id}-${Date.now()}`,
    patient_id,
    ...diagnosisData,
    status: 'Active',
    diagnosed_date: new Date().toISOString().split('T')[0],
    diagnosed_by: 'Current User'
  };
  
  if (!mockDiagnoses[patient_id]) {
    mockDiagnoses[patient_id] = [];
  }
  mockDiagnoses[patient_id].push(newDiagnosis);
  
  res.status(201).json({ success: true, data: newDiagnosis });
};

router.get('/', getAllDiagnoses);
router.get('/:patientId', getPatientDiagnoses);
router.post('/', createDiagnosis);

module.exports = router;
