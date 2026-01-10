require('dotenv').config({ path: __dirname + '/.env' });
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const addRiskFactors = async () => {
  try {
    await client.connect();
    console.log('🔗 Connected to database');
    
    // Add risk factor columns to patients table
    console.log('\n📋 Adding atherosclerotic risk factor fields...');
    
    const riskFactors = [
      "hta BOOLEAN DEFAULT FALSE", // Hipertensión Arterial
      "diabetes_mellitus BOOLEAN DEFAULT FALSE",
      "dislipidemia BOOLEAN DEFAULT FALSE",
      "tabaquismo BOOLEAN DEFAULT FALSE",
      "sedentarismo BOOLEAN DEFAULT FALSE",
      "obesidad_sobrepeso BOOLEAN DEFAULT FALSE",
      "trastornos_sueño BOOLEAN DEFAULT FALSE", // Ronquido, apnea probable
      "ansiedad_depresion BOOLEAN DEFAULT FALSE",
      "consumo_alcohol BOOLEAN DEFAULT FALSE"
    ];
    
    for (const factor of riskFactors) {
      try {
        await client.query(`ALTER TABLE patients ADD COLUMN IF NOT EXISTS ${factor}`);
        console.log(`✅ Added risk factor: ${factor.split(' ')[0]}`);
      } catch (error) {
        console.log(`⚠️  Risk factor ${factor.split(' ')[0]} may already exist:`, error.message);
      }
    }
    
    // Update existing patients with realistic risk factor data
    console.log('\n👥 Updating existing patients with risk factors...');
    
    const patientsResult = await client.query('SELECT id, first_name, last_name FROM patients ORDER BY created_at');
    const patients = patientsResult.rows;
    
    const riskFactorData = [
      {
        patientIdx: 0, // Jorge Sanchez - 67 years, Aortic Stenosis
        hta: true,
        diabetes_mellitus: false,
        dislipidemia: true,
        tabaquismo: true,
        sedentarismo: true,
        obesidad_sobrepeso: false,
        trastornos_sueño: true,
        ansiedad_depresion: false,
        consumo_alcohol: false
      },
      {
        patientIdx: 1, // Mercedes Torres - 55 years, Hypertensive Heart Disease
        hta: true,
        diabetes_mellitus: true,
        dislipidemia: true,
        tabaquismo: false,
        sedentarismo: false,
        obesidad_sobrepeso: true,
        trastornos_sueño: false,
        ansiedad_depresion: true,
        consumo_alcohol: false
      },
      {
        patientIdx: 2, // Carlos Rodriguez - 77 years, Post-MI
        hta: true,
        diabetes_mellitus: true,
        dislipidemia: true,
        tabaquismo: true,
        sedentarismo: true,
        obesidad_sobrepeso: false,
        trastornos_sueño: true,
        ansiedad_depresion: false,
        consumo_alcohol: true
      },
      {
        patientIdx: 3, // Rosa Garcia - 63 years, Atrial Fibrillation
        hta: true,
        diabetes_mellitus: false,
        dislipidemia: false,
        tabaquismo: false,
        sedentarismo: false,
        obesidad_sobrepeso: false,
        trastornos_sueño: true,
        ansiedad_depresion: true,
        consumo_alcohol: false
      },
      {
        patientIdx: 4, // Juan Perez - 70 years, Heart Failure
        hta: true,
        diabetes_mellitus: true,
        dislipidemia: true,
        tabaquismo: true,
        sedentarismo: true,
        obesidad_sobrepeso: true,
        trastornos_sueño: false,
        ansiedad_depresion: true,
        consumo_alcohol: false
      },
      {
        patientIdx: 5, // Andres Test - 55 years
        hta: false,
        diabetes_mellitus: false,
        dislipidemia: false,
        tabaquismo: false,
        sedentarismo: false,
        obesidad_sobrepeso: false,
        trastornos_sueño: false,
        ansiedad_depresion: false,
        consumo_alcohol: false
      },
      {
        patientIdx: 6, // Ana Martinez - 50 years (new patient)
        hta: false,
        diabetes_mellitus: false,
        dislipidemia: false,
        tabaquismo: false,
        sedentarismo: false,
        obesidad_sobrepeso: false,
        trastornos_sueño: false,
        ansiedad_depresion: false,
        consumo_alcohol: false
      }
    ];
    
    for (const data of riskFactorData) {
      if (data.patientIdx < patients.length) {
        const patient = patients[data.patientIdx];
        await client.query(`
          UPDATE patients 
          SET hta = $1, diabetes_mellitus = $2, dislipidemia = $3, tabaquismo = $4,
              sedentarismo = $5, obesidad_sobrepeso = $6, trastornos_sueño = $7,
              ansiedad_depresion = $8, consumo_alcohol = $9,
              updated_at = $10
          WHERE id = $11
        `, [
          data.hta, data.diabetes_mellitus, data.dislipidemia, data.tabaquismo,
          data.sedentarismo, data.obesidad_sobrepeso, data.trastornos_sueño,
          data.ansiedad_depresion, data.consumo_alcohol,
          new Date(), patient.id
        ]);
        
        console.log(`✅ Updated risk factors for ${patient.first_name} ${patient.last_name}`);
        
        // Show risk factor summary
        const activeFactors = [];
        if (data.hta) activeFactors.push('HTA');
        if (data.diabetes_mellitus) activeFactors.push('Diabetes');
        if (data.dislipidemia) activeFactors.push('Dislipidemia');
        if (data.tabaquismo) activeFactors.push('Tabaquismo');
        if (data.sedentarismo) activeFactors.push('Sedentarismo');
        if (data.obesidad_sobrepeso) activeFactors.push('Obesidad/Sobrepeso');
        if (data.trastornos_sueño) activeFactors.push('Trastornos del sueño');
        if (data.ansiedad_depresion) activeFactors.push('Ansiedad/Depresión');
        if (data.consumo_alcohol) activeFactors.push('Consumo de alcohol');
        
        console.log(`   📊 Risk factors: ${activeFactors.length > 0 ? activeFactors.join(', ') : 'None'}`);
      }
    }
    
    console.log('\n🎉 Risk factors added successfully!');
    console.log('\n📋 Risk factors added:');
    console.log('   - HTA (Hipertensión Arterial)');
    console.log('   - Diabetes Mellitus');
    console.log('   - Dislipidemia');
    console.log('   - Tabaquismo');
    console.log('   - Sedentarismo');
    console.log('   - Obesidad/Sobrepeso');
    console.log('   - Trastornos del sueño (ronquido, apnea probable)');
    console.log('   - Ansiedad/Depresión');
    console.log('   - Consumo de alcohol');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
};

addRiskFactors();
