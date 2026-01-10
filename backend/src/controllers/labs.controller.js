const LabResult = require('../models/LabResult');
const Patient = require('../models/Patient');

// @desc    Get all lab results for a patient
// @route   GET /api/patients/:patientId/labs
// @access  Private
const getLabResults = async (req, res, next) => {
  try {
    const labResults = await LabResult.findAll({
      where: { patient_id: req.params.patientId },
      order: [['test_date', 'DESC']]
    });
    res.status(200).json({ success: true, count: labResults.length, data: labResults });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add a new lab result for a patient
// @route   POST /api/patients/:patientId/labs
// @access  Private
const addLabResult = async (req, res, next) => {
  try {
    req.body.patient_id = req.params.patientId;
    req.body.ordered_by = req.user.id;

    const patient = await Patient.findByPk(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const labResult = await LabResult.create(req.body);
    res.status(201).json({ success: true, data: labResult });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get a single lab result
// @route   GET /api/labs/:id
// @access  Private
const getLabResult = async (req, res, next) => {
    try {
      const labResult = await LabResult.findByPk(req.params.id);
  
      if (!labResult) {
        return res.status(404).json({ success: false, message: 'Lab result not found' });
      }
  
      res.status(200).json({ success: true, data: labResult });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };

module.exports = {
  getLabResults,
  addLabResult,
  getLabResult
};
