require('dotenv').config({ path: __dirname + '/.env' });
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const seedMockData = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Get admin user ID
    const adminResult = await client.query('SELECT id FROM users WHERE email = $1', ['admin@cardiac.com']);
    const adminId = adminResult.rows[0].id;
    
    // Insert sample patients
    const patients = [
      {
        dni: '12345678',
        first_name: 'Juan',
        last_name: 'Perez',
        date_of_birth: '1980-05-15',
        gender: 'male',
        blood_type: 'O+',
        phone: '+51 987 654 321',
        email: 'juan.perez@email.com',
        address: 'Av. Lima 123, Lima, Peru',
        emergency_contact_name: 'Maria Perez',
        emergency_contact_phone: '+51 987 654 322',
        insurance_provider: 'Pacific Seguros',
        insurance_number: 'PS123456',
        created_by: adminId
      },
      {
        dni: '87654321',
        first_name: 'Maria',
        last_name: 'Garcia',
        date_of_birth: '1975-08-22',
        gender: 'female',
        blood_type: 'A+',
        phone: '+51 987 123 456',
        email: 'maria.garcia@email.com',
        address: 'Calle Arequipa 456, Cusco, Peru',
        emergency_contact_name: 'Luis Garcia',
        emergency_contact_phone: '+51 987 123 457',
        insurance_provider: 'Rimac Seguros',
        insurance_number: 'RS789012',
        created_by: adminId
      },
      {
        dni: '11223344',
        first_name: 'Carlos',
        last_name: 'Rodriguez',
        date_of_birth: '1990-12-10',
        gender: 'male',
        blood_type: 'B+',
        phone: '+51 987 555 666',
        email: 'carlos.rodriguez@email.com',
        address: 'Jr. Cusco 789, Arequipa, Peru',
        emergency_contact_name: 'Ana Rodriguez',
        emergency_contact_phone: '+51 987 555 667',
        insurance_provider: 'Mapfre',
        insurance_number: 'MF345678',
        created_by: adminId
      }
    ];
    
    for (const patient of patients) {
      const patientResult = await client.query(`
        INSERT INTO patients (dni, first_name, last_name, date_of_birth, gender, blood_type, 
        phone, email, address, emergency_contact_name, emergency_contact_phone, 
        insurance_provider, insurance_number, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id
      `, [
        patient.dni, patient.first_name, patient.last_name, patient.date_of_birth,
        patient.gender, patient.blood_type, patient.phone, patient.email,
        patient.address, patient.emergency_contact_name, patient.emergency_contact_phone,
        patient.insurance_provider, patient.insurance_number, patient.created_by
      ]);
      
      const patientId = patientResult.rows[0].id;
      
      // Add vital signs for each patient
      await client.query(`
        INSERT INTO vital_signs (patient_id, recorded_by, systolic_bp, diastolic_bp, 
        heart_rate, respiratory_rate, oxygen_saturation, temperature, weight, height, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        patientId, adminId, 120, 80, 72, 16, 98, 36.5, 175,
        'Patient stable, normal vital signs'
      ]);
      
      // Add medications for each patient
      const medications = [
        {
          medication_name: 'Aspirin',
          dosage: '100mg',
          frequency: 'Once daily',
          route: 'oral',
          start_date: '2024-01-01',
          notes: 'For blood thinning'
        },
        {
          medication_name: 'Metoprolol',
          dosage: '50mg',
          frequency: 'Twice daily',
          route: 'oral',
          start_date: '2024-01-01',
          notes: 'Beta blocker for blood pressure'
        }
      ];
      
      for (const med of medications) {
        await client.query(`
          INSERT INTO medications (patient_id, medication_name, dosage, frequency, route, 
          start_date, prescribed_by, notes)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          patientId, med.medication_name, med.dosage, med.frequency,
          med.route, med.start_date, adminId, med.notes
        ]);
      }
      
      // Add lab results for each patient
      await client.query(`
        INSERT INTO lab_results (patient_id, test_name, test_type, result_value, 
        unit, reference_range, is_abnormal, test_date, ordered_by, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        patientId, 'Troponin I', 'Cardiac Markers', '0.02',
        'ng/mL', '<0.04', false, '2024-01-15', adminId,
        'Normal troponin levels'
      ]);
      
      // Add diagnoses for each patient
      await client.query(`
        INSERT INTO diagnoses (patient_id, diagnosis_code, diagnosis_name, severity, 
        diagnosed_date, diagnosed_by, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        patientId, 'I25.1', 'Atherosclerotic heart disease', 'moderate',
        '2024-01-10', adminId, 'Coronary artery disease'
      ]);
      
      console.log(`Added patient: ${patient.first_name} ${patient.last_name}`);
    }
    
    console.log('Mock data seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding mock data:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
};

seedMockData();
