const User = require('../models/UserFirebase');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    
    // Remove passwords from response
    const usersWithoutPasswords = users.map(user => {
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.status(200).json({ success: true, count: usersWithoutPasswords.length, data: usersWithoutPasswords });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent password hash from being updated directly here
    delete req.body.password_hash;

    user = await User.update(req.params.id, req.body);

    res.status(200).json({ success: true, data: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a user (soft delete by deactivating)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await User.update(req.params.id, { is_active: false });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
