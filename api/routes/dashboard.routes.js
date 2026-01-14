const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

router.get('/stats', async (req, res) => {
  try {
    // Get all patients
    const patientsSnapshot = await db.collection('patients').get();
    const patients = patientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Basic counts
    const totalPatients = patients.length;
    const totalDiagnoses = 0; // Will be 0 until diagnoses are migrated
    const totalVitals = 0; // Will be 0 until vitals are migrated
    const totalMedications = 0; // Will be 0 until medications are migrated
    
    // Cardiac-specific metrics
    const riskFactors = {
      hta: patients.filter(p => p.hta).length,
      diabetes: patients.filter(p => p.diabetes_mellitus).length,
      dislipidemia: patients.filter(p => p.dislipidemia).length,
      smoking: patients.filter(p => p.tabaquismo).length,
      sedentary: patients.filter(p => p.sedentarismo).length,
      obesity: patients.filter(p => p.obesidad_sobrepeso).length,
      anxiety: patients.filter(p => p.ansiedad_depresion).length,
      alcohol: patients.filter(p => p.consumo_alcohol).length
    };
    
    // Age demographics
    const ageDistribution = patients.reduce((acc, patient) => {
      if (!patient.date_of_birth) return acc;
      
      const age = calculateAge(patient.date_of_birth);
      let ageGroup;
      if (age < 50) ageGroup = '<50';
      else if (age >= 50 && age <= 65) ageGroup = '50-65';
      else ageGroup = '>65';
      
      const existing = acc.find(item => item.age_group === ageGroup);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ age_group: ageGroup, count: 1 });
      }
      return acc;
    }, []).sort((a, b) => a.age_group.localeCompare(b.age_group));
    
    // High-risk patients (3+ risk factors)
    const highRiskPatients = patients.filter(patient => {
      const riskCount = [
        patient.hta,
        patient.diabetes_mellitus,
        patient.dislipidemia,
        patient.tabaquismo,
        patient.sedentarismo,
        patient.obesidad_sobrepeso,
        patient.ansiedad_depresion,
        patient.consumo_alcohol
      ].filter(Boolean).length;
      return riskCount >= 3;
    }).length;
    
    // Blood pressure metrics (0 until vitals migrated)
    const bpStats = {
      avg_systolic: 0,
      avg_diastolic: 0,
      total_readings: 0
    };
    
    // CALM program enrollment
    const calmStats = {
      enrolled_count: patients.filter(p => p.calm_program_date).length,
      total_count: totalPatients
    };
    
    res.json({
      success: true,
      data: {
        // Basic metrics
        totalPatients,
        totalDiagnoses,
        totalVitals,
        totalMedications,
        
        // Cardiac risk metrics
        riskFactors,
        
        // High-risk patients
        highRiskPatients,
        highRiskPercentage: totalPatients > 0 ? Math.round((highRiskPatients / totalPatients) * 100) : 0,
        
        // Blood pressure metrics
        avgSystolicBP: Math.round(bpStats.avg_systolic || 0),
        avgDiastolicBP: Math.round(bpStats.avg_diastolic || 0),
        bpReadingsCount: parseInt(bpStats.total_readings || 0),
        
        // Age distribution
        ageDistribution,
        
        // CALM program
        calmProgramEnrollment: parseInt(calmStats.enrolled_count),
        calmProgramPercentage: calmStats.total_count > 0 ? Math.round((calmStats.enrolled_count / calmStats.total_count) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Helper function to calculate age
function calculateAge(dateOfBirth) {
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

module.exports = router;
