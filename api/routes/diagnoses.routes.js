const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getDiagnoses,
  addDiagnosis,
  updateDiagnosis
} = require('../controllers/diagnoses.controller');

const { protect, authorize } = require('../middleware/auth');

// All routes below are protected
router.use(protect);

// Routes nested under /api/patients/:patientId/diagnoses
router.route('/')
  .get(authorize('doctor', 'nurse', 'staff', 'admin'), getDiagnoses)
  .post(authorize('doctor', 'admin'), addDiagnosis);

// Separate route for updating a single diagnosis by its own ID
const singleDiagnosisRouter = express.Router();
singleDiagnosisRouter.use(protect);
singleDiagnosisRouter.route('/:id').put(authorize('doctor', 'admin'), updateDiagnosis);

module.exports = { nested: router, single: singleDiagnosisRouter };
