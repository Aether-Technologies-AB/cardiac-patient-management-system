const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const sequelize = require('./src/config/database');

// Import all models
const User = require('./src/models/User');
const Patient = require('./src/models/Patient');
const VitalSigns = require('./src/models/VitalSigns');
const Medication = require('./src/models/Medication');
const LabResult = require('./src/models/LabResult');
const Diagnosis = require('./src/models/Diagnosis');
const Procedure = require('./src/models/Procedure');
const Allergy = require('./src/models/Allergy');
const AuditLog = require('./src/models/AuditLog');
const Appointment = require('./src/models/Appointment');

async function initDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('📋 Database config:');
    console.log('   Host:', process.env.DB_HOST);
    console.log('   Port:', process.env.DB_PORT);
    console.log('   Database:', process.env.DB_NAME);
    console.log('   User:', process.env.DB_USER);
    
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    console.log('🔨 Creating tables...');
    await sequelize.sync({ force: false });
    console.log('✅ All tables created successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to initialize database:', error.message);
    process.exit(1);
  }
}

initDatabase();
