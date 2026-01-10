const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows us to access params from parent router (patients)

const {
  getVitals,
  addVitals,
  getLatestVitals
} = require('../controllers/vitals.controller');

const { protect, authorize } = require('../middleware/auth');

// All routes below are protected
router.use(protect);

router.route('/')
  .get(authorize('doctor', 'nurse', 'staff', 'admin'), getVitals)
  .post(authorize('doctor', 'nurse', 'admin'), addVitals);

router.route('/latest')
    .get(authorize('doctor', 'nurse', 'staff', 'admin'), getLatestVitals);

module.exports = router;
