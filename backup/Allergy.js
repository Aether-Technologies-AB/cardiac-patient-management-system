const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');
const User = require('./User');

const Allergy = sequelize.define('Allergy', {
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
  allergen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reaction: {
    type: DataTypes.TEXT
  },
  severity: {
    type: DataTypes.ENUM('mild', 'moderate', 'severe', 'life-threatening')
  },
  recorded_by: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  recorded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'allergies',
  timestamps: false
});

Allergy.belongsTo(Patient, { foreignKey: 'patient_id' });
Allergy.belongsTo(User, { foreignKey: 'recorded_by' });

module.exports = Allergy;
