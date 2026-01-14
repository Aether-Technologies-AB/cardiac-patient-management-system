const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING
  },
  blood_type: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.TEXT
  },
  emergency_contact_name: {
    type: DataTypes.STRING
  },
  emergency_contact_phone: {
    type: DataTypes.STRING
  },
  insurance_provider: {
    type: DataTypes.STRING
  },
  insurance_number: {
    type: DataTypes.STRING
  },
  // New fields for CALM program
  religion: {
    type: DataTypes.STRING
  },
  marital_status: {
    type: DataTypes.STRING
  },
  education_level: {
    type: DataTypes.STRING
  },
  city_of_origin: {
    type: DataTypes.STRING
  },
  whatsapp: {
    type: DataTypes.STRING
  },
  photo_url: {
    type: DataTypes.STRING
  },
  occupation: {
    type: DataTypes.STRING
  },
  physical_activity_level: {
    type: DataTypes.STRING
  },
  emergency_contact_relationship: {
    type: DataTypes.STRING
  },
  calm_program_date: {
    type: DataTypes.DATEONLY
  },
  // Atherosclerotic Risk Factors
  hta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  diabetes_mellitus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  dislipidemia: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tabaquismo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sedentarismo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  obesidad_sobrepeso: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  trastornos_sueño: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ansiedad_depresion: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  consumo_alcohol: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_by: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'patients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Patient.belongsTo(User, { foreignKey: 'created_by' });

// Virtual field for age calculation
Patient.prototype.getAge = function() {
  if (!this.date_of_birth) return null;
  const today = new Date();
  const birthDate = new Date(this.date_of_birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Add age to JSON output
Patient.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  values.age = this.getAge();
  return values;
};

module.exports = Patient;
