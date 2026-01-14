const express = require('express');
const router = express.Router();
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patients.controller');

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers (temporarily disabled - need Firebase migration)
// const vitalsRouter = require('./vitals.routes');
// const medicationsRouter = require('./medications.routes');
// const { nested: labsRouter } = require('./labs.routes');
// const { nested: diagnosesRouter } = require('./diagnoses.routes');
// const { nested: proceduresRouter } = require('./procedures.routes');

// router.use('/:patientId/vitals', vitalsRouter);
// router.use('/:patientId/medications', medicationsRouter);
// router.use('/:patientId/labs', labsRouter);
// router.use('/:patientId/diagnoses', diagnosesRouter);
// router.use('/:patientId/procedures', proceduresRouter);

// All routes below are protected
router.use(protect);

router.route('/')
  .get(authorize('doctor', 'nurse', 'staff', 'admin'), getPatients)
  .post(authorize('doctor', 'nurse', 'admin'), createPatient);

router.route('/:id')
  .get(authorize('doctor', 'nurse', 'staff', 'admin'), getPatient)
  .put(authorize('doctor', 'nurse', 'admin'), updatePatient)
  .delete(authorize('admin'), deletePatient);

module.exports = router;
