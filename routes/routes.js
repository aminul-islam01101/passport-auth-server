const express = require('express');
const usersRouter = require('./users.route');
const authRouter = require('./auth.route');

// const app = express();
const router = express.Router();

router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);

module.exports = router;
