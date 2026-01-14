const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const { protect, authorize } = require('../middleware/auth');

// All routes below are protected and restricted to admins
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
