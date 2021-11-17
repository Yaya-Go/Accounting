const express = require('express');
const router = express.Router();

const Auth = require('../controllers/auth.controller');

router.post('/login', Auth.Login);
router.post('/register', Auth.Register);

module.exports = router;
