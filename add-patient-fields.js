require('dotenv').config({ path: __dirname + '/.env' });
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const addPatientFields = async () => {
  try {
    await client.connect();
    console.log('🔗 Connected to database');
    
    // Add new columns to patients table
    console.log('\n📝 Adding new patient fields...');
    
    const newColumns = [
      "religion VARCHAR(100)",
      "marital_status VARCHAR(50)",
      "education_level VARCHAR(100)",
      "city_of_origin VARCHAR(255)",
      "whatsapp VARCHAR(50)",
      "photo_url VARCHAR(500)",
      "occupation VARCHAR(255)",
      "physical_activity_level VARCHAR(100)",
      "emergency_contact_relationship VARCHAR(100)",
      "calm_program_date DATE"
    ];
    
    for (const column of newColumns) {
      try {
        await client.query(`ALTER TABLE patients ADD COLUMN IF NOT EXISTS ${column}`);
        console.log(`✅ Added column: ${column.split(' ')[0]}`);
      } catch (error) {
        console.log(`⚠️  Column ${column.split(' ')[0]} may already exist:`, error.message);
      }
    }
    
    // Update existing patients with realistic data
    console.log('\n👥 Updating existing patients with additional data...');
    
    const patientsResult = await client.query('SELECT id, first_name, last_name FROM patients ORDER BY created_at');
    const patients = patientsResult.rows;
    
    const additionalData = [
      {
        patientIdx: 0, // Juan Perez
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
        patientIdx: 1, // Rosa Garcia
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
        patientIdx: 2, // Carlos Rodriguez
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
        patientIdx: 3, // Mercedes Torres
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
        patientIdx: 4, // Jorge Sanchez
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
    
    for (const data of additionalData) {
      const patient = patients[data.patientIdx];
      await client.query(`
        UPDATE patients 
        SET religion = $1, marital_status = $2, education_level = $3, city_of_origin = $4,
            whatsapp = $5, photo_url = $6, occupation = $7, physical_activity_level = $8,
            emergency_contact_relationship = $9, calm_program_date = $10,
            updated_at = $11
        WHERE id = $12
      `, [
        data.religion, data.marital_status, data.education_level, data.city_of_origin,
        data.whatsapp, data.photo_url, data.occupation, data.physical_activity_level,
        data.emergency_contact_relationship, data.calm_program_date,
        new Date(), patient.id
      ]);
      
      console.log(`✅ Updated ${patient.first_name} ${patient.last_name}`);
    }
    
    // Calculate and display ages
    console.log('\n📊 Patient ages (auto-calculated):');
    for (const patient of patients) {
      const ageResult = await client.query(`
        SELECT 
          first_name,
          last_name,
          date_of_birth,
          EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)) as age
        FROM patients 
        WHERE id = $1
      `, [patient.id]);
      
      const p = ageResult.rows[0];
      console.log(`   ${p.first_name} ${p.last_name}: ${Math.floor(p.age)} años (${p.date_of_birth})`);
    }
    
    console.log('\n🎉 Patient fields added successfully!');
    console.log('\n📋 New fields added:');
    console.log('   - Religión');
    console.log('   - Estado civil');
    console.log('   - Grado de instrucción');
    console.log('   - Ciudad de origen');
    console.log('   - WhatsApp');
    console.log('   - Foto del paciente');
    console.log('   - Ocupación');
    console.log('   - Nivel de actividad física');
    console.log('   - Relación con contacto de emergencia');
    console.log('   - Fecha de ingreso al Programa CALM');
    console.log('   - Edad (calculada automáticamente)');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
};

addPatientFields();
