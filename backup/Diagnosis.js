const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');
const User = require('./User');

const Diagnosis = sequelize.define('Diagnosis', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  patient_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    }
  },
  diagnosis_code: {
    type: DataTypes.STRING
  },
  diagnosis_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  severity: {
    type: DataTypes.ENUM('mild', 'moderate', 'severe')
  },
  diagnosed_date: {
    type: DataTypes.DATEONLY
  },
  diagnosed_by: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'diagnoses',
  timestamps: false
});

Diagnosis.belongsTo(Patient, { foreignKey: 'patient_id' });
Diagnosis.belongsTo(User, { foreignKey: 'diagnosed_by' });

module.exports = Diagnosis;
