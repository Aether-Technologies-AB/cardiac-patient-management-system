const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/mock-auth.routes');
const dashboardRoutes = require('./routes/mock-dashboard.routes');
const patientsRoutes = require('./routes/mock-patients.routes');
const vitalsRoutes = require('./routes/mock-vitals.routes');
const diagnosesRoutes = require('./routes/mock-diagnoses.routes');
const labsRoutes = require('./routes/mock-labs.routes');

// Mount routes with clean paths
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/vitals', vitalsRoutes);
app.use('/api/diagnoses', diagnosesRoutes);
app.use('/api/labs', labsRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Cardiac Patient Management System API is running...');
});

app.get('/api', (req, res) => {
  res.json({ 
    status: 'running',
    message: 'Cardiac Patient Management System API',
    endpoints: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/dashboard/stats',
      '/api/patients',
      '/api/patients/:id',
      '/api/vitals/:patientId',
      '/api/diagnoses/:patientId',
      '/api/labs/:patientId'
    ]
  });
});

// For Vercel serverless
module.exports = app;
