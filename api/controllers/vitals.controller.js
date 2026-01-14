const VitalSigns = require('../models/VitalSigns');
const Patient = require('../models/Patient');

// @desc    Get all vital signs for a patient
// @route   GET /api/patients/:patientId/vitals
// @access  Private
const getVitals = async (req, res, next) => {
  try {
    const vitals = await VitalSigns.findAll({
      where: { patient_id: req.params.patientId },
      order: [['recorded_at', 'DESC']]
    });
    res.status(200).json({ success: true, count: vitals.length, data: vitals });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add new vital signs for a patient
// @route   POST /api/patients/:patientId/vitals
// @access  Private
const addVitals = async (req, res, next) => {
  try {
    req.body.patient_id = req.params.patientId;
    req.body.recorded_by = req.user.id;

    const patient = await Patient.findByPk(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const vitals = await VitalSigns.create(req.body);
    res.status(201).json({ success: true, data: vitals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get latest vital signs for a patient
// @route   GET /api/patients/:patientId/vitals/latest
// @access  Private
const getLatestVitals = async (req, res, next) => {
  try {
    const vitals = await VitalSigns.findOne({
      where: { patient_id: req.params.patientId },
      order: [['recorded_at', 'DESC']]
    });
    res.status(200).json({ success: true, data: vitals });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getVitals,
  addVitals,
  getLatestVitals
};
