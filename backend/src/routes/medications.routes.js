const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getMedications,
  addMedication,
  updateMedication,
  deleteMedication
} = require('../controllers/medications.controller');

const { protect, authorize } = require('../middleware/auth');

// All routes below are protected
router.use(protect);

router.route('/')
  .get(authorize('doctor', 'nurse', 'staff', 'admin'), getMedications)
  .post(authorize('doctor', 'admin'), addMedication);

router.route('/:id')
    .put(authorize('doctor', 'admin'), updateMedication)
    .delete(authorize('doctor', 'admin'), deleteMedication);

module.exports = router;
