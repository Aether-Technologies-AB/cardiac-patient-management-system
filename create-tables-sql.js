require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const createTables = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        specialty VARCHAR(255),
        license_number VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Users table created successfully');
    
    // Create patients table
    await client.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        dni VARCHAR(20) UNIQUE,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        date_of_birth DATE,
        gender VARCHAR(20),
        blood_type VARCHAR(10),
        phone VARCHAR(50),
        email VARCHAR(255),
        address TEXT,
        emergency_contact_name VARCHAR(255),
        emergency_contact_phone VARCHAR(50),
        insurance_provider VARCHAR(255),
        insurance_number VARCHAR(100),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Patients table created successfully');
    
    // Create vital_signs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS vital_signs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES patients(id),
        recorded_by UUID REFERENCES users(id),
        recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        systolic_bp INTEGER,
        diastolic_bp INTEGER,
        heart_rate INTEGER,
        respiratory_rate INTEGER,
        oxygen_saturation DECIMAL(5,2),
        temperature DECIMAL(4,1),
        weight DECIMAL(5,2),
        height DECIMAL(5,2),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Vital signs table created successfully');
    
    // Create medications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS medications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES patients(id),
        medication_name VARCHAR(255) NOT NULL,
        dosage VARCHAR(100),
        frequency VARCHAR(100),
        route VARCHAR(50),
        start_date DATE,
        end_date DATE,
        prescribed_by UUID REFERENCES users(id),
        is_active BOOLEAN DEFAULT true,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Medications table created successfully');
    
    // Create lab_results table
    await client.query(`
      CREATE TABLE IF NOT EXISTS lab_results (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES patients(id),
        test_name VARCHAR(255) NOT NULL,
        test_type VARCHAR(100),
        result_value VARCHAR(255),
        unit VARCHAR(50),
        reference_range TEXT,
        is_abnormal BOOLEAN DEFAULT false,
        test_date DATE,
        ordered_by UUID REFERENCES users(id),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Lab results table created successfully');
    
    // Create diagnoses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS diagnoses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES patients(id),
        diagnosis_code VARCHAR(20),
        diagnosis_name VARCHAR(255) NOT NULL,
        severity VARCHAR(20),
        diagnosed_date DATE,
        diagnosed_by UUID REFERENCES users(id),
        is_active BOOLEAN DEFAULT true,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Diagnoses table created successfully');
    
    // Create procedures table
    await client.query(`
      CREATE TABLE IF NOT EXISTS procedures (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES patients(id),
        procedure_name VARCHAR(255) NOT NULL,
        procedure_type VARCHAR(100),
        procedure_date DATE,
        performed_by UUID REFERENCES users(id),
        findings TEXT,
        report_url VARCHAR(500),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Procedures table created successfully');
    
    // Create allergies table
    await client.query(`
      CREATE TABLE IF NOT EXISTS allergies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES patients(id),
        allergen VARCHAR(255) NOT NULL,
        reaction VARCHAR(255),
        severity VARCHAR(20),
        recorded_by UUID REFERENCES users(id),
        recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Allergies table created successfully');
    
    // Create audit_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        action VARCHAR(20),
        table_name VARCHAR(50),
        record_id UUID,
        old_values JSON,
        new_values JSON,
        ip_address INET,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Audit logs table created successfully');
    
    // Create appointments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES patients(id),
        doctor_id UUID REFERENCES users(id),
        appointment_date DATE,
        appointment_time TIME,
        status VARCHAR(20) DEFAULT 'scheduled',
        reason TEXT,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('Appointments table created successfully');
    
    console.log('All tables created successfully!');
    
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
};

createTables();
