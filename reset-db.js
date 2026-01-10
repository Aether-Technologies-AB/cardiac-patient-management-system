require('dotenv').config();
const sequelize = require('./backend/src/config/database');

const resetDatabase = async () => {
  try {
    // Drop all tables
    await sequelize.drop();
    console.log('All tables dropped.');
    
    // Recreate tables
    await sequelize.sync({ force: true, logging: console.log });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Failed to reset database:', error);
  }
  process.exit(0);
};

resetDatabase();
