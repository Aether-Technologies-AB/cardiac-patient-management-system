require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const seedUser = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Insert the admin user
    const result = await client.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email
    `, [
      'admin@cardiac.com',
      hashedPassword,
      'Admin',
      'User',
      'admin',
      true
    ]);
    
    console.log('Admin user created successfully:', result.rows[0].email);
    console.log('User ID:', result.rows[0].id);
    
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
};

seedUser();
