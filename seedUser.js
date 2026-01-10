require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./backend/src/models/User');

const seedUser = async () => {
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create the user
    const user = await User.create({
      email: 'admin@cardiac.com',
      password_hash: hashedPassword,
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      is_active: true
    });

    console.log('User created successfully:', user.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating user:', error);
    process.exit(1);
  }
};

seedUser();
