const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');
const User = require('./User');

const VitalSigns = sequelize.define('VitalSigns', {
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
  recorded_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  recorded_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  systolic_bp: {
    type: DataTypes.INTEGER
  },
  diastolic_bp: {
    type: DataTypes.INTEGER
  },
  heart_rate: {
    type: DataTypes.INTEGER
  },
  respiratory_rate: {
    type: DataTypes.INTEGER
  },
  oxygen_saturation: {
    type: DataTypes.DECIMAL(5, 2)
  },
  temperature: {
    type: DataTypes.DECIMAL(5, 2)
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2)
  },
  height: {
    type: DataTypes.DECIMAL(5, 2)
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'vital_signs',
  timestamps: false
});

VitalSigns.belongsTo(Patient, { foreignKey: 'patient_id' });
VitalSigns.belongsTo(User, { foreignKey: 'recorded_by' });

module.exports = VitalSigns;
