const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getLabResults,
  addLabResult,
  getLabResult
} = require('../controllers/labs.controller');

const { protect, authorize } = require('../middleware/auth');

// All routes below are protected
router.use(protect);

// Routes nested under /api/patients/:patientId/labs
router.route('/')
  .get(authorize('doctor', 'nurse', 'staff', 'admin'), getLabResults)
  .post(authorize('doctor', 'nurse', 'admin'), addLabResult);

// Separate route for getting a single lab result by its own ID
const singleLabRouter = express.Router();
singleLabRouter.use(protect);
singleLabRouter.route('/:id').get(authorize('doctor', 'nurse', 'staff', 'admin'), getLabResult);

module.exports = { nested: router, single: singleLabRouter };
