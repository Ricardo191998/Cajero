const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller')


// SINGIN
router.get('/signin', authController.renderSignIn);
router.post('/signin', authController.signIn);
router.get('/logout', authController.logout);

module.exports = router;

