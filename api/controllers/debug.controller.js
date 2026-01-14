const { User } = require('../models/UserFirebase');

// @desc    Debug login process
// @route   POST /api/debug/login
// @access  Public
const debugLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log('🔍 Debug login request:', { email, password: '***' });
    
    // Check for user
    const user = await User.findByEmail(email);
    console.log('👤 User found:', !!user);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found', debug: { email } });
    }

    console.log('🔑 User data:', { id: user.id, email: user.email, hasPassword: !!user.password_hash });

    // Check if password matches
    const isMatch = await User.matchPassword(password, user.password_hash);
    console.log('🔐 Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Password does not match', debug: { email } });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      debug: { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('❌ Debug login error:', error);
    res.status(500).json({ success: false, message: error.message, debug: { email } });
  }
};

module.exports = { debugLogin };
