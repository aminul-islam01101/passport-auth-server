const express = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

// register route
router.post('/register', register);

// login route
router.post('/login', login);

module.exports = router;
