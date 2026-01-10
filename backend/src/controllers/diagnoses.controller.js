const Diagnosis = require('../models/Diagnosis');
const Patient = require('../models/Patient');

// @desc    Get all diagnoses for a patient
// @route   GET /api/patients/:patientId/diagnoses
// @access  Private
const getDiagnoses = async (req, res, next) => {
  try {
    const diagnoses = await Diagnosis.findAll({
      where: { patient_id: req.params.patientId },
      order: [['diagnosed_date', 'DESC']]
    });
    res.status(200).json({ success: true, count: diagnoses.length, data: diagnoses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add a new diagnosis for a patient
// @route   POST /api/patients/:patientId/diagnoses
// @access  Private
const addDiagnosis = async (req, res, next) => {
  try {
    req.body.patient_id = req.params.patientId;
    req.body.diagnosed_by = req.user.id;

    const patient = await Patient.findByPk(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const diagnosis = await Diagnosis.create(req.body);
    res.status(201).json({ success: true, data: diagnosis });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a diagnosis
// @route   PUT /api/diagnoses/:id
// @access  Private
const updateDiagnosis = async (req, res, next) => {
  try {
    let diagnosis = await Diagnosis.findByPk(req.params.id);

    if (!diagnosis) {
      return res.status(404).json({ success: false, message: 'Diagnosis not found' });
    }

    diagnosis = await diagnosis.update(req.body);

    res.status(200).json({ success: true, data: diagnosis });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDiagnoses,
  addDiagnosis,
  updateDiagnosis
};
