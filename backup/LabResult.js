const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');
const User = require('./User');

const LabResult = sequelize.define('LabResult', {
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
  test_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  test_type: {
    type: DataTypes.STRING
  },
  result_value: {
    type: DataTypes.STRING
  },
  unit: {
    type: DataTypes.STRING
  },
  reference_range: {
    type: DataTypes.STRING
  },
  is_abnormal: {
    type: DataTypes.BOOLEAN
  },
  test_date: {
    type: DataTypes.DATEONLY
  },
  ordered_by: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'lab_results',
  timestamps: false
});

LabResult.belongsTo(Patient, { foreignKey: 'patient_id' });
LabResult.belongsTo(User, { foreignKey: 'ordered_by' });

module.exports = LabResult;
