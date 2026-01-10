require('dotenv').config({ path: __dirname + '/.env' });
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const clearAndReseed = async () => {
  try {
    await client.connect();
    console.log('🔗 Connected to database');
    
    // Clear all existing data except users
    console.log('\n🗑️  Clearing existing data...');
    await client.query('DELETE FROM allergies');
    await client.query('DELETE FROM procedures');
    await client.query('DELETE FROM lab_results');
    await client.query('DELETE FROM medications');
    await client.query('DELETE FROM vital_signs');
    await client.query('DELETE FROM diagnoses');
    await client.query('DELETE FROM appointments');
    await client.query('DELETE FROM patients');
    console.log('✅ Data cleared');
    
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
        condition: 'Heart Failure with reduced ejection fraction'
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
        condition: 'Atrial Fibrillation'
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
        condition: 'Coronary Artery Disease - Post MI'
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
        condition: 'Hypertensive Heart Disease'
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
        condition: 'Valvular Heart Disease - Aortic Stenosis'
      }
    ];
    
    const patientIds = [];
    
    // Insert patients
    console.log('\n👥 Adding cardiac patients...');
    for (const patient of patients) {
      const patientResult = await client.query(`
        INSERT INTO patients (id, dni, first_name, last_name, date_of_birth, gender, blood_type, 
        phone, email, address, emergency_contact_name, emergency_contact_phone, 
        insurance_provider, insurance_number, created_by, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING id
      `, [
        patient.dni, patient.first_name, patient.last_name, patient.date_of_birth,
        patient.gender, patient.blood_type, patient.phone, patient.email,
        patient.address, patient.emergency_contact_name, patient.emergency_contact_phone,
        patient.insurance_provider, patient.insurance_number, patient.created_by,
        new Date(), new Date()
      ]);
      
      const patientId = patientResult.rows[0].id;
      patientIds.push({ id: patientId, name: `${patient.first_name} ${patient.last_name}`, condition: patient.condition });
      console.log(`✅ Added patient: ${patient.first_name} ${patient.last_name} - ${patient.condition}`);
    }
    
    console.log('\n🎉 Cardiac patients seeded successfully!');
    console.log(`\n📊 Summary: ${patientIds.length} cardiac patients added`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
};

clearAndReseed();
