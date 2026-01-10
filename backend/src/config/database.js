require('dotenv').config({ path: __dirname + '/../../.env' });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: console.log,  // Enable logging to see the actual database name
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    // Use socket path for macOS Homebrew
    // You may need to adjust this based on your PostgreSQL installation
    // socketPath: '/tmp/.s.PGSQL.5432'
  },
  define: {
    // Disable foreign key checks during initial sync
    // Remove this after first successful sync
    timestamps: true,
    underscored: true
  }
});

module.exports = sequelize;
