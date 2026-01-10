require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});

// Define the User model without enums for now
const User = sequelize.define('User', {
  tableName: 'users',
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  specialty: {
    type: Sequelize.STRING
  },
  license_number: {
    type: Sequelize.STRING
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

const createTables = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Failed to create tables:', error);
  }
  process.exit(0);
};

createTables();
