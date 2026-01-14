const Medication = require('../models/Medication');
const Patient = require('../models/Patient');

// @desc    Get all medications for a patient
// @route   GET /api/patients/:patientId/medications
// @access  Private
const getMedications = async (req, res, next) => {
  try {
    const medications = await Medication.findAll({
      where: { patient_id: req.params.patientId },
      order: [['start_date', 'DESC']]
    });
    res.status(200).json({ success: true, count: medications.length, data: medications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add a new medication for a patient
// @route   POST /api/patients/:patientId/medications
// @access  Private
const addMedication = async (req, res, next) => {
  try {
    req.body.patient_id = req.params.patientId;
    req.body.prescribed_by = req.user.id;

    const patient = await Patient.findByPk(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const medication = await Medication.create(req.body);
    res.status(201).json({ success: true, data: medication });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a medication
// @route   PUT /api/medications/:id
// @access  Private
const updateMedication = async (req, res, next) => {
  try {
    let medication = await Medication.findByPk(req.params.id);

    if (!medication) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }

    medication = await medication.update(req.body);

    res.status(200).json({ success: true, data: medication });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a medication
// @route   DELETE /api/medications/:id
// @access  Private
const deleteMedication = async (req, res, next) => {
  try {
    const medication = await Medication.findByPk(req.params.id);

    if (!medication) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }

    await medication.destroy();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getMedications,
  addMedication,
  updateMedication,
  deleteMedication
};
