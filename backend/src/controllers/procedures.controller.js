const Procedure = require('../models/Procedure');
const Patient = require('../models/Patient');

// @desc    Get all procedures for a patient
// @route   GET /api/patients/:patientId/procedures
// @access  Private
const getProcedures = async (req, res, next) => {
  try {
    const procedures = await Procedure.findAll({
      where: { patient_id: req.params.patientId },
      order: [['procedure_date', 'DESC']]
    });
    res.status(200).json({ success: true, count: procedures.length, data: procedures });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add a new procedure for a patient
// @route   POST /api/patients/:patientId/procedures
// @access  Private
const addProcedure = async (req, res, next) => {
  try {
    req.body.patient_id = req.params.patientId;
    req.body.performed_by = req.user.id;

    const patient = await Patient.findByPk(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const procedure = await Procedure.create(req.body);
    res.status(201).json({ success: true, data: procedure });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get a single procedure
// @route   GET /api/procedures/:id
// @access  Private
const getProcedure = async (req, res, next) => {
    try {
      const procedure = await Procedure.findByPk(req.params.id);
  
      if (!procedure) {
        return res.status(404).json({ success: false, message: 'Procedure not found' });
      }
  
      res.status(200).json({ success: true, data: procedure });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };

module.exports = {
  getProcedures,
  addProcedure,
  getProcedure
};
