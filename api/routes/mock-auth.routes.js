const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock user data
const mockUsers = [
  {
    id: 'admin-001',
    email: 'admin@cardiac.com',
    password: 'admin123',
    first_name: 'System',
    last_name: 'Administrator',
    role: 'admin',
    is_active: true
  }
];

// @desc    Login user (mock)
// @route   POST /api/mock-auth/login
// @access  Public
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'fallback-secret', {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        is_active: user.is_active
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get current logged in user (mock)
// @route   GET /api/mock-auth/me
// @access  Private
const getMe = async (req, res, next) => {
  const user = mockUsers.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      is_active: user.is_active
    }
  });
};

router.post('/login', login);
router.get('/me', getMe);

module.exports = router;
