const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

class Patient {
  static collection = db.collection('patients');

  static async create(patientData) {
    const id = uuidv4();
    const patient = {
      id,
      ...patientData,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    await this.collection.doc(id).set(patient);
    return patient;
  }

  static async findById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    
    const patient = { id: doc.id, ...doc.data() };
    patient.age = this.calculateAge(patient.date_of_birth);
    return patient;
  }

  static async findByDni(dni) {
    const snapshot = await this.collection.where('dni', '==', dni).get();
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    const patient = { id: doc.id, ...doc.data() };
    patient.age = this.calculateAge(patient.date_of_birth);
    return patient;
  }

  static async findAll() {
    const snapshot = await this.collection.get();
    const patients = [];
    
    snapshot.forEach(doc => {
      const patient = { id: doc.id, ...doc.data() };
      patient.age = this.calculateAge(patient.date_of_birth);
      patients.push(patient);
    });
    
    return patients;
  }

  static async update(id, updateData) {
    const patient = {
      ...updateData,
      updated_at: new Date()
    };
    
    await this.collection.doc(id).update(patient);
    return this.findById(id);
  }

  static async delete(id) {
    await this.collection.doc(id).delete();
    return true;
  }

  static calculateAge(dateOfBirth) {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}

module.exports = Patient;
