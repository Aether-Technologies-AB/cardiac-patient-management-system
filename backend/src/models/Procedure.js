const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');
const User = require('./User');

const Procedure = sequelize.define('Procedure', {
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
  procedure_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  procedure_type: {
    type: DataTypes.STRING
  },
  procedure_date: {
    type: DataTypes.DATEONLY
  },
  performed_by: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  findings: {
    type: DataTypes.TEXT
  },
  report_url: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'procedures',
  timestamps: false
});

Procedure.belongsTo(Patient, { foreignKey: 'patient_id' });
Procedure.belongsTo(User, { foreignKey: 'performed_by' });

module.exports = Procedure;
