const express = require('express');
const router = express.Router();

// @desc    Get dashboard stats (mock)
// @route   GET /api/mock-dashboard/stats
// @access  Private
const getStats = async (req, res, next) => {
  const stats = {
    totalPatients: 156,
    activePatients: 142,
    newPatientsThisMonth: 12,
    upcomingAppointments: 8,
    criticalPatients: 3,
    recentActivity: [
      {
        id: 1,
        type: 'patient_added',
        message: 'New patient John Doe registered',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        type: 'appointment_scheduled',
        message: 'Appointment scheduled for Jane Smith',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        type: 'vital_signs_updated',
        message: 'Vital signs updated for Robert Johnson',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ],
    patientDistribution: {
      byGender: {
        male: 85,
        female: 71
      },
      byAgeGroup: {
        '0-18': 12,
        '19-35': 34,
        '36-50': 48,
        '51-65': 42,
        '65+': 20
      }
    },
    appointmentsToday: 5,
    pendingTasks: 7
  };

  res.status(200).json({ success: true, data: stats });
};

router.get('/stats', getStats);

module.exports = router;
