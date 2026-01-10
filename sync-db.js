require('dotenv').config();
const sequelize = require('./backend/src/config/database');

// Import all models to ensure they're registered with Sequelize
const User = require('./backend/src/models/User');
const Patient = require('./backend/src/models/Patient');
const VitalSigns = require('./backend/src/models/VitalSigns');
const Medication = require('./backend/src/models/Medication');
const LabResult = require('./backend/src/models/LabResult');
const Diagnosis = require('./backend/src/models/Diagnosis');
const Procedure = require('./backend/src/models/Procedure');
const Allergy = require('./backend/src/models/Allergy');
const AuditLog = require('./backend/src/models/AuditLog');
const Appointment = require('./backend/src/models/Appointment');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true, logging: console.log });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Failed to synchronize database:', error);
  }
  process.exit(0);
};

syncDatabase();
