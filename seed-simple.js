require('dotenv').config({ path: __dirname + '/.env' });
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const seedCardiacData = async () => {
  try {
    await client.connect();
    console.log('🔗 Connected to database');
    
    // Get admin user ID
    const adminResult = await client.query('SELECT id FROM users WHERE email = $1', ['admin@cardiac.com']);
    const adminId = adminResult.rows[0].id;
    
    // Realistic cardiac patients with different conditions
    const patients = [
      {
        dni: '12345678',
        first_name: 'Juan',
        last_name: 'Perez',
        date_of_birth: '1955-05-15', // 71 years old - typical age for cardiac issues
        gender: 'male',
        blood_type: 'O+',
        phone: '+51 987 654 321',
        email: 'juan.perez@email.com',
        address: 'Av. Arequipa 2341, Lince, Lima, Peru',
        emergency_contact_name: 'Maria Perez',
        emergency_contact_phone: '+51 987 654 322',
        insurance_provider: 'EsSalud',
        insurance_number: 'ES123456',
        created_by: adminId,
        condition: 'Heart Failure with reduced ejection fraction',
        religion: 'Católica',
        marital_status: 'Casado',
        education_level: 'Secundaria Completa',
        city_of_origin: 'Lima',
        whatsapp: '+51 987 654 321',
        photo_url: '/uploads/patients/juan_perez.jpg',
        occupation: 'Jubilado - Ex Contador',
        physical_activity_level: 'Sedentario',
        emergency_contact_relationship: 'Esposa',
        calm_program_date: '2025-01-15'
      },
      {
        dni: '87654321',
        first_name: 'Rosa',
        last_name: 'Garcia',
        date_of_birth: '1962-08-22', // 64 years old
        gender: 'female',
        blood_type: 'A+',
        phone: '+51 987 123 456',
        email: 'rosa.garcia@email.com',
        address: 'Calle Los Olivos 567, San Isidro, Lima, Peru',
        emergency_contact_name: 'Luis Garcia',
        emergency_contact_phone: '+51 987 123 457',
        insurance_provider: 'Pacifico Seguros',
        insurance_number: 'PS789012',
        created_by: adminId,
        condition: 'Atrial Fibrillation',
        religion: 'Católica',
        marital_status: 'Viuda',
        education_level: 'Universitaria',
        city_of_origin: 'Arequipa',
        whatsapp: '+51 987 123 456',
        photo_url: '/uploads/patients/rosa_garcia.jpg',
        occupation: 'Jubilada - Ex Profesora',
        physical_activity_level: 'Ligera',
        emergency_contact_relationship: 'Hijo',
        calm_program_date: '2025-01-20'
      },
      {
        dni: '11223344',
        first_name: 'Carlos',
        last_name: 'Rodriguez',
        date_of_birth: '1948-12-10', // 78 years old
        gender: 'male',
        blood_type: 'B+',
        phone: '+51 987 555 666',
        email: 'carlos.rodriguez@email.com',
        address: 'Jr. Puno 234, Cercado, Arequipa, Peru',
        emergency_contact_name: 'Ana Rodriguez',
        emergency_contact_phone: '+51 987 555 667',
        insurance_provider: 'Rimac Seguros',
        insurance_number: 'RS345678',
        created_by: adminId,
        condition: 'Coronary Artery Disease - Post MI',
        religion: 'Católica',
        marital_status: 'Casado',
        education_level: 'Primaria Completa',
        city_of_origin: 'Arequipa',
        whatsapp: '+51 987 555 666',
        photo_url: '/uploads/patients/carlos_rodriguez.jpg',
        occupation: 'Jubilado - Ex Mecánico',
        physical_activity_level: 'Moderada',
        emergency_contact_relationship: 'Esposa',
        calm_program_date: '2024-12-10'
      },
      {
        dni: '55667788',
        first_name: 'Mercedes',
        last_name: 'Torres',
        date_of_birth: '1970-03-18', // 56 years old
        gender: 'female',
        blood_type: 'AB+',
        phone: '+51 987 222 333',
        email: 'mercedes.torres@email.com',
        address: 'Av. La Marina 1890, Pueblo Libre, Lima, Peru',
        emergency_contact_name: 'Pedro Torres',
        emergency_contact_phone: '+51 987 222 334',
        insurance_provider: 'Mapfre',
        insurance_number: 'MF456789',
        created_by: adminId,
        condition: 'Hypertensive Heart Disease',
        religion: 'Evangélica',
        marital_status: 'Divorciada',
        education_level: 'Universitaria',
        city_of_origin: 'Trujillo',
        whatsapp: '+51 987 222 333',
        photo_url: '/uploads/patients/mercedes_torres.jpg',
        occupation: 'Administradora de Empresa',
        physical_activity_level: 'Moderada',
        emergency_contact_relationship: 'Hermano',
        calm_program_date: '2025-02-01'
      },
      {
        dni: '99887766',
        first_name: 'Jorge',
        last_name: 'Sanchez',
        date_of_birth: '1958-11-25', // 68 years old
        gender: 'male',
        blood_type: 'O-',
        phone: '+51 987 444 555',
        email: 'jorge.sanchez@email.com',
        address: 'Calle Las Begonias 456, San Borja, Lima, Peru',
        emergency_contact_name: 'Elena Sanchez',
        emergency_contact_phone: '+51 987 444 556',
        insurance_provider: 'EsSalud',
        insurance_number: 'ES987654',
        created_by: adminId,
        condition: 'Valvular Heart Disease - Aortic Stenosis',
        religion: 'Católica',
        marital_status: 'Casado',
        education_level: 'Secundaria Completa',
        city_of_origin: 'Cusco',
        whatsapp: '+51 987 444 555',
        photo_url: '/uploads/patients/jorge_sanchez.jpg',
        occupation: 'Jubilado - Ex Vendedor',
        physical_activity_level: 'Ligera',
        emergency_contact_relationship: 'Hija',
        calm_program_date: '2024-11-15'
      }
    ];
    
    // Insert patients
    console.log('\n👥 Adding cardiac patients...');
    for (const patient of patients) {
      const patientResult = await client.query(`
        INSERT INTO patients (id, dni, first_name, last_name, date_of_birth, gender, blood_type, 
        phone, email, address, emergency_contact_name, emergency_contact_phone, 
        insurance_provider, insurance_number, created_by, created_at, updated_at,
        religion, marital_status, education_level, city_of_origin, whatsapp, photo_url,
        occupation, physical_activity_level, emergency_contact_relationship, calm_program_date)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
        RETURNING id
      `, [
        patient.dni, patient.first_name, patient.last_name, patient.date_of_birth,
        patient.gender, patient.blood_type, patient.phone, patient.email,
        patient.address, patient.emergency_contact_name, patient.emergency_contact_phone,
        patient.insurance_provider, patient.insurance_number, patient.created_by,
        new Date(), new Date(),
        patient.religion, patient.marital_status, patient.education_level, patient.city_of_origin,
        patient.whatsapp, patient.photo_url, patient.occupation, patient.physical_activity_level,
        patient.emergency_contact_relationship, patient.calm_program_date
      ]);
      
      const patientId = patientResult.rows[0].id;
      patientIds.push({ id: patientId, name: `${patient.first_name} ${patient.last_name}`, condition: patient.condition });
      console.log(`✅ Added patient: ${patient.first_name} ${patient.last_name} - ${patient.condition}`);
    }
    
    // Add cardiac diagnoses
    console.log('\n🏥 Adding cardiac diagnoses...');
    const diagnoses = [
      { patientIdx: 0, code: 'I50.1', name: 'Heart Failure (HFrEF)', severity: 'moderate' },
      { patientIdx: 0, code: 'I25.10', name: 'Coronary Artery Disease', severity: 'moderate' },
      { patientIdx: 1, code: 'I48.91', name: 'Atrial Fibrillation', severity: 'moderate' },
      { patientIdx: 1, code: 'I10', name: 'Essential Hypertension', severity: 'mild' },
      { patientIdx: 2, code: 'I21.9', name: 'Acute Myocardial Infarction (Old)', severity: 'severe' },
      { patientIdx: 2, code: 'E78.5', name: 'Hyperlipidemia', severity: 'moderate' },
      { patientIdx: 3, code: 'I11.0', name: 'Hypertensive Heart Disease', severity: 'moderate' },
      { patientIdx: 3, code: 'E11.9', name: 'Type 2 Diabetes Mellitus', severity: 'moderate' },
      { patientIdx: 4, code: 'I35.0', name: 'Aortic Stenosis', severity: 'severe' },
      { patientIdx: 4, code: 'I50.9', name: 'Heart Failure', severity: 'moderate' }
    ];
    
    for (const diag of diagnoses) {
      await client.query(`
        INSERT INTO diagnoses (id, patient_id, diagnosis_code, diagnosis_name, severity, 
        diagnosed_date, diagnosed_by, is_active, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        patientIds[diag.patientIdx].id, diag.code, diag.name, diag.severity,
        new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within last year
        adminId, true, new Date(), new Date()
      ]);
    }
    console.log(`✅ Added ${diagnoses.length} cardiac diagnoses`);
    
    // Add vital signs (realistic cardiac patient vitals with trends)
    console.log('\n💓 Adding vital signs with trends...');
    for (let i = 0; i < patientIds.length; i++) {
      const patient = patientIds[i];
      // Add 10 vital sign entries over the past 3 months to show trends
      for (let day = 0; day < 90; day += 9) {
        const recordDate = new Date(Date.now() - day * 24 * 60 * 60 * 1000);
        
        // Different vital patterns per patient condition
        let vitals = {};
        switch(i) {
          case 0: // Heart Failure patient - elevated BP and HR
            vitals = {
              systolic_bp: 145 + Math.floor(Math.random() * 20) - day * 0.3, // Improving over time
              diastolic_bp: 90 + Math.floor(Math.random() * 10) - day * 0.1,
              heart_rate: 88 + Math.floor(Math.random() * 15),
              respiratory_rate: 18 + Math.floor(Math.random() * 4),
              oxygen_saturation: 94 + Math.floor(Math.random() * 4),
              weight: 82 - day * 0.05 // Gradual weight loss (fluid management)
            };
            break;
          case 1: // AFib patient - irregular HR
            vitals = {
              systolic_bp: 138 + Math.floor(Math.random() * 15),
              diastolic_bp: 85 + Math.floor(Math.random() * 10),
              heart_rate: 95 + Math.floor(Math.random() * 30), // More variable
              respiratory_rate: 16 + Math.floor(Math.random() * 3),
              oxygen_saturation: 96 + Math.floor(Math.random() * 3),
              weight: 68
            };
            break;
          case 2: // Post-MI patient - controlled vitals
            vitals = {
              systolic_bp: 125 + Math.floor(Math.random() * 10),
              diastolic_bp: 78 + Math.floor(Math.random() * 8),
              heart_rate: 72 + Math.floor(Math.random() * 10),
              respiratory_rate: 14 + Math.floor(Math.random() * 3),
              oxygen_saturation: 97 + Math.floor(Math.random() * 2),
              weight: 75
            };
            break;
          case 3: // Hypertensive - high BP
            vitals = {
              systolic_bp: 155 + Math.floor(Math.random() * 15) - day * 0.25,
              diastolic_bp: 95 + Math.floor(Math.random() * 10) - day * 0.1,
              heart_rate: 78 + Math.floor(Math.random() * 12),
              respiratory_rate: 16 + Math.floor(Math.random() * 3),
              oxygen_saturation: 96 + Math.floor(Math.random() * 3),
              weight: 85
            };
            break;
          case 4: // Aortic stenosis - moderate vitals
            vitals = {
              systolic_bp: 132 + Math.floor(Math.random() * 12),
              diastolic_bp: 82 + Math.floor(Math.random() * 8),
              heart_rate: 76 + Math.floor(Math.random() * 10),
              respiratory_rate: 16 + Math.floor(Math.random() * 4),
              oxygen_saturation: 95 + Math.floor(Math.random() * 4),
              weight: 78
            };
            break;
        }
        
        await client.query(`
          INSERT INTO vital_signs (id, patient_id, recorded_by, recorded_at, 
          systolic_bp, diastolic_bp, heart_rate, respiratory_rate, oxygen_saturation, weight, 
          created_at, updated_at)
          VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
          patient.id, adminId, recordDate,
          vitals.systolic_bp, vitals.diastolic_bp, vitals.heart_rate,
          vitals.respiratory_rate, vitals.oxygen_saturation, vitals.weight,
          recordDate, recordDate
        ]);
      }
      console.log(`✅ Added vital signs for ${patient.name}`);
    }
    
    // Add cardiac medications
    console.log('\n💊 Adding cardiac medications...');
    const medications = [
      // Patient 0 - Heart Failure
      { patientIdx: 0, name: 'Furosemide', dosage: '40mg', frequency: 'Once daily', route: 'Oral' },
      { patientIdx: 0, name: 'Enalapril', dosage: '10mg', frequency: 'Twice daily', route: 'Oral' },
      { patientIdx: 0, name: 'Carvedilol', dosage: '25mg', frequency: 'Twice daily', route: 'Oral' },
      { patientIdx: 0, name: 'Spironolactone', dosage: '25mg', frequency: 'Once daily', route: 'Oral' },
      
      // Patient 1 - AFib
      { patientIdx: 1, name: 'Warfarin', dosage: '5mg', frequency: 'Once daily', route: 'Oral' },
      { patientIdx: 1, name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', route: 'Oral' },
      { patientIdx: 1, name: 'Diltiazem', dosage: '180mg', frequency: 'Once daily', route: 'Oral' },
      
      // Patient 2 - Post-MI
      { patientIdx: 2, name: 'Aspirin', dosage: '100mg', frequency: 'Once daily', route: 'Oral' },
      { patientIdx: 2, name: 'Clopidogrel', dosage: '75mg', frequency: 'Once daily', route: 'Oral' },
      { patientIdx: 2, name: 'Atorvastatin', dosage: '80mg', frequency: 'Once daily at bedtime', route: 'Oral' },
      { patientIdx: 2, name: 'Ramipril', dosage: '10mg', frequency: 'Once daily', route: 'Oral' },
      { patientIdx: 2, name: 'Bisoprolol', dosage: '10mg', frequency: 'Once daily', route: 'Oral' },
      
      // Patient 3 - Hypertensive
      { patientIdx: 3, name: 'Amlodipine', dosage: '10mg', frequency: 'Once daily', route: 'Oral' },
      { patientIdx: 3, name: 'Losartan', dosage: '100mg', frequency: 'Once daily', route: 'Oral' },
      { patientIdx: 3, name: 'Hydrochlorothiazide', dosage: '25mg', frequency: 'Once daily', route: 'Oral' },
      
      // Patient 4 - Aortic Stenosis
      { patientIdx: 4, name: 'Digoxin', dosage: '0.125mg', frequency: 'Once daily', route: 'Oral' },
      { patientIdx: 4, name: 'Furosemide', dosage: '20mg', frequency: 'Once daily', route: 'Oral' }
    ];
    
    for (const med of medications) {
      await client.query(`
        INSERT INTO medications (id, patient_id, medication_name, dosage, frequency, route, 
        start_date, prescribed_by, is_active, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        patientIds[med.patientIdx].id, med.name, med.dosage, med.frequency, med.route,
        new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000), // Started within last 6 months
        adminId, true, new Date(), new Date()
      ]);
    }
    console.log(`✅ Added ${medications.length} cardiac medications`);
    
    // Add cardiac lab results
    console.log('\n🧪 Adding cardiac lab results...');
    const labResults = [
      // Cardiac enzymes and biomarkers
      { patientIdx: 0, test_name: 'BNP (Brain Natriuretic Peptide)', value: '680', unit: 'pg/mL', reference: '<100', abnormal: true },
      { patientIdx: 0, test_name: 'Troponin I', value: '0.02', unit: 'ng/mL', reference: '<0.04', abnormal: false },
      { patientIdx: 0, test_name: 'Ejection Fraction (Echo)', value: '35', unit: '%', reference: '50-70', abnormal: true },
      
      { patientIdx: 1, test_name: 'INR', value: '2.8', unit: 'ratio', reference: '2.0-3.0', abnormal: false },
      { patientIdx: 1, test_name: 'Thyroid TSH', value: '2.1', unit: 'mIU/L', reference: '0.4-4.0', abnormal: false },
      
      { patientIdx: 2, test_name: 'Total Cholesterol', value: '165', unit: 'mg/dL', reference: '<200', abnormal: false },
      { patientIdx: 2, test_name: 'LDL Cholesterol', value: '85', unit: 'mg/dL', reference: '<100', abnormal: false },
      { patientIdx: 2, test_name: 'HDL Cholesterol', value: '52', unit: 'mg/dL', reference: '>40', abnormal: false },
      { patientIdx: 2, test_name: 'Triglycerides', value: '140', unit: 'mg/dL', reference: '<150', abnormal: false },
      { patientIdx: 2, test_name: 'Troponin I', value: '0.01', unit: 'ng/mL', reference: '<0.04', abnormal: false },
      
      { patientIdx: 3, test_name: 'Creatinine', value: '1.2', unit: 'mg/dL', reference: '0.7-1.3', abnormal: false },
      { patientIdx: 3, test_name: 'eGFR', value: '68', unit: 'mL/min/1.73m²', reference: '>60', abnormal: false },
      { patientIdx: 3, test_name: 'HbA1c', value: '7.2', unit: '%', reference: '<5.7', abnormal: true },
      
      { patientIdx: 4, test_name: 'BNP', value: '420', unit: 'pg/mL', reference: '<100', abnormal: true },
      { patientIdx: 4, test_name: 'Aortic Valve Area (Echo)', value: '0.8', unit: 'cm²', reference: '3.0-4.0', abnormal: true }
    ];
    
    for (const lab of labResults) {
      await client.query(`
        INSERT INTO lab_results (id, patient_id, test_name, result_value, unit, reference_range, 
        is_abnormal, test_date, ordered_by, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        patientIds[lab.patientIdx].id, lab.test_name, lab.value, lab.unit, lab.reference,
        lab.abnormal, new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Within last month
        adminId, new Date(), new Date()
      ]);
    }
    console.log(`✅ Added ${labResults.length} cardiac lab results`);
    
    // Add cardiac procedures
    console.log('\n🏥 Adding cardiac procedures...');
    const procedures = [
      { patientIdx: 0, name: 'Echocardiogram (Transthoracic)', findings: 'EF 35%, dilated left ventricle, mild mitral regurgitation' },
      { patientIdx: 1, name: 'ECG (12-lead)', findings: 'Atrial fibrillation with controlled ventricular response, rate 78 bpm' },
      { patientIdx: 1, name: 'Holter Monitor (24-hour)', findings: 'Persistent atrial fibrillation, no significant pauses' },
      { patientIdx: 2, name: 'Coronary Angiography', findings: '80% stenosis LAD, 70% stenosis RCA. Stents placed successfully.' },
      { patientIdx: 2, name: 'Stress Test (Exercise)', findings: 'Negative for ischemia at 85% max HR. Good exercise tolerance.' },
      { patientIdx: 3, name: 'ECG (12-lead)', findings: 'Left ventricular hypertrophy, normal sinus rhythm' },
      { patientIdx: 4, name: 'Echocardiogram (Transthoracic)', findings: 'Severe aortic stenosis, valve area 0.8 cm², mean gradient 48 mmHg' },
      { patientIdx: 4, name: 'Cardiac CT', findings: 'Heavy calcification of aortic valve, no significant CAD' }
    ];
    
    for (const proc of procedures) {
      await client.query(`
        INSERT INTO procedures (id, patient_id, procedure_name, procedure_date, 
        performed_by, findings, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
      `, [
        patientIds[proc.patientIdx].id, proc.name,
        new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000), // Within last 2 months
        adminId, proc.findings, new Date(), new Date()
      ]);
    }
    console.log(`✅ Added ${procedures.length} cardiac procedures`);
    
    // Add allergies
    console.log('\n⚠️  Adding medication allergies...');
    const allergies = [
      { patientIdx: 1, allergen: 'Penicillin', reaction: 'Hives and itching', severity: 'moderate' },
      { patientIdx: 2, allergen: 'ACE Inhibitors', reaction: 'Angioedema', severity: 'severe' },
      { patientIdx: 3, allergen: 'Sulfa drugs', reaction: 'Rash', severity: 'mild' }
    ];
    
    for (const allergy of allergies) {
      await client.query(`
        INSERT INTO allergies (id, patient_id, allergen, reaction, severity, 
        recorded_by, recorded_at, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        patientIds[allergy.patientIdx].id, allergy.allergen, allergy.reaction, allergy.severity,
        adminId, new Date(), new Date(), new Date()
      ]);
    }
    console.log(`✅ Added ${allergies.length} allergies`);
    
    console.log('\n🎉 Cardiac mock data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${patientIds.length} cardiac patients`);
    console.log(`   - ${diagnoses.length} diagnoses`);
    console.log(`   - ${patientIds.length * 10} vital sign entries (with trends)`);
    console.log(`   - ${medications.length} medications`);
    console.log(`   - ${labResults.length} lab results`);
    console.log(`   - ${procedures.length} procedures`);
    console.log(`   - ${allergies.length} allergies`);
    
  } catch (error) {
    console.error('❌ Error seeding cardiac data:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
};

seedCardiacData();