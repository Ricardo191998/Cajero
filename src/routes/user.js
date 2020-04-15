const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller')

router.get('/profile', userController.isLoggedIn,userController.getProfile);

//Hacer una transacción

router.post('/transaction', userController.transaction);
router.post('/draw_on', userController.draw_on);
router.post('/insert_money', userController.insert_money);

module.exports = router;