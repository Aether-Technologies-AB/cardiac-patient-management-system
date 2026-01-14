const express = require('express');
const router = express.Router();

// @desc    Get dashboard stats (mock)
// @route   GET /api/mock-dashboard/stats
// @access  Private
const getStats = async (req, res, next) => {
  const stats = {
    totalPatients: 8,
    activePatients: 7,
    newPatientsThisMonth: 2,
    upcomingAppointments: 5,
    criticalPatients: 2,
    recentActivity: [
      {
        id: 1,
        type: 'patient_added',
        message: 'New patient Linda Wilson registered',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        type: 'appointment_scheduled',
        message: 'Appointment scheduled for James Brown',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        type: 'vital_signs_updated',
        message: 'Vital signs updated for Robert Johnson',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        type: 'medication_updated',
        message: 'Medication adjusted for Mary Williams',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        type: 'lab_results',
        message: 'Lab results available for Michael Miller',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      }
    ],
    patientDistribution: {
      byGender: {
        male: 4,
        female: 4
      },
      byAgeGroup: {
        '0-18': 0,
        '19-35': 1,
        '36-50': 2,
        '51-65': 3,
        '65+': 2
      },
      byCondition: {
        'Hypertension': 4,
        'Diabetes': 2,
        'Heart Disease': 3,
        'Arrhythmia': 2,
        'High Cholesterol': 3
      }
    },
    appointmentsToday: 3,
    pendingTasks: 4,
    medicationsManaged: 15,
    averageAge: 68,
    riskFactors: {
      highBloodPressure: 4,
      diabetes: 2,
      smoking: 1,
      obesity: 2,
      familyHistory: 3
    }
  };

  res.status(200).json({ success: true, data: stats });
};

router.get('/stats', getStats);

module.exports = router;
