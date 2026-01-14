const express = require('express');
const router = express.Router();
const { debugLogin } = require('../controllers/debug.controller');

router.post('/login', debugLogin);

module.exports = router;
