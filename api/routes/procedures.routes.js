const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getProcedures,
  addProcedure,
  getProcedure
} = require('../controllers/procedures.controller');

const { protect, authorize } = require('../middleware/auth');

// All routes below are protected
router.use(protect);

// Routes nested under /api/patients/:patientId/procedures
router.route('/')
  .get(authorize('doctor', 'nurse', 'staff', 'admin'), getProcedures)
  .post(authorize('doctor', 'admin'), addProcedure);

// Separate route for getting a single procedure by its own ID
const singleProcedureRouter = express.Router();
singleProcedureRouter.use(protect);
singleProcedureRouter.route('/:id').get(authorize('doctor', 'nurse', 'staff', 'admin'), getProcedure);

module.exports = { nested: router, single: singleProcedureRouter };
