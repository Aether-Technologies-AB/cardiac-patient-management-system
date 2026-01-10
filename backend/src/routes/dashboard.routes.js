const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

router.get('/stats', async (req, res) => {
  try {
    // Basic counts
    const [patientCount] = await sequelize.query('SELECT COUNT(*) as count FROM patients');
    const [diagnosisCount] = await sequelize.query('SELECT COUNT(*) as count FROM diagnoses');
    const [vitalCount] = await sequelize.query('SELECT COUNT(*) as count FROM vital_signs');
    const [medCount] = await sequelize.query('SELECT COUNT(*) as count FROM medications');
    
    // Cardiac-specific metrics
    const [riskFactors] = await sequelize.query(`
      SELECT 
        COUNT(*) FILTER (WHERE hta = true) as hta_count,
        COUNT(*) FILTER (WHERE diabetes_mellitus = true) as diabetes_count,
        COUNT(*) FILTER (WHERE dislipidemia = true) as dislipidemia_count,
        COUNT(*) FILTER (WHERE tabaquismo = true) as smoking_count,
        COUNT(*) FILTER (WHERE sedentarismo = true) as sedentary_count,
        COUNT(*) FILTER (WHERE obesidad_sobrepeso = true) as obesity_count,
        COUNT(*) FILTER (WHERE ansiedad_depresion = true) as anxiety_count,
        COUNT(*) FILTER (WHERE consumo_alcohol = true) as alcohol_count
      FROM patients
    `);
    
    // Age demographics
    const [ageDistribution] = await sequelize.query(`
      SELECT 
        CASE 
          WHEN age < 50 THEN '<50'
          WHEN age BETWEEN 50 AND 65 THEN '50-65'
          WHEN age > 65 THEN '>65'
        END as age_group,
        COUNT(*) as count
      FROM (
        SELECT 
          id,
          EXTRACT(YEAR FROM AGE(date_of_birth)) as age
        FROM patients
      ) age_data
      GROUP BY age_group
      ORDER BY age_group
    `);
    
    // High-risk patients (3+ risk factors)
    const [highRiskPatients] = await sequelize.query(`
      SELECT COUNT(*) as count
      FROM (
        SELECT 
          id,
          (hta::int + diabetes_mellitus::int + dislipidemia::int + 
           tabaquismo::int + sedentarismo::int + obesidad_sobrepeso::int + 
           ansiedad_depresion::int + consumo_alcohol::int) as risk_count
        FROM patients
      ) risk_data
      WHERE risk_count >= 3
    `);
    
    // Latest blood pressure averages
    const [bpStats] = await sequelize.query(`
      SELECT 
        AVG(systolic_bp) as avg_systolic,
        AVG(diastolic_bp) as avg_diastolic,
        COUNT(*) as total_readings
      FROM (
        SELECT DISTINCT ON (patient_id) 
          systolic_bp, diastolic_bp, patient_id
        FROM vital_signs
        ORDER BY patient_id, recorded_at DESC
      ) latest_vitals
    `);
    
    // CALM program enrollment
    const [calmStats] = await sequelize.query(`
      SELECT 
        COUNT(*) FILTER (WHERE calm_program_date IS NOT NULL) as enrolled_count,
        COUNT(*) as total_count
      FROM patients
    `);
    
    const riskData = riskFactors[0];
    const ageData = ageDistribution;
    const bpData = bpStats[0];
    const calmData = calmStats[0];
    
    res.json({
      success: true,
      data: {
        // Basic metrics
        totalPatients: parseInt(patientCount[0].count),
        totalDiagnoses: parseInt(diagnosisCount[0].count),
        totalVitals: parseInt(vitalCount[0].count),
        totalMedications: parseInt(medCount[0].count),
        
        // Cardiac risk metrics
        riskFactors: {
          hta: parseInt(riskData.hta_count),
          diabetes: parseInt(riskData.diabetes_count),
          dislipidemia: parseInt(riskData.dislipidemia_count),
          smoking: parseInt(riskData.smoking_count),
          sedentary: parseInt(riskData.sedentary_count),
          obesity: parseInt(riskData.obesity_count),
          anxiety: parseInt(riskData.anxiety_count),
          alcohol: parseInt(riskData.alcohol_count)
        },
        
        // High-risk patients
        highRiskPatients: parseInt(highRiskPatients[0].count),
        highRiskPercentage: Math.round((highRiskPatients[0].count / patientCount[0].count) * 100),
        
        // Blood pressure metrics
        avgSystolicBP: Math.round(bpData.avg_systolic || 0),
        avgDiastolicBP: Math.round(bpData.avg_diastolic || 0),
        bpReadingsCount: parseInt(bpData.total_readings || 0),
        
        // Age distribution
        ageDistribution: ageData,
        
        // CALM program
        calmProgramEnrollment: parseInt(calmData.enrolled_count),
        calmProgramPercentage: Math.round((calmData.enrolled_count / calmData.total_count) * 100)
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
