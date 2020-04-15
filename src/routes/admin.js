const route = require('express').Router();
const adminController = require('../controller/admin.controller');
//CREAR USUARIO
route.post('/createUser', adminController.createUser);

//GET USER 
route.get('/user/:id', adminController.getUser);

//GET USERS 
route.get('/users', adminController.getUsers);

//GET COUNT 
route.get('/count/:id', adminController.getCount);

//GET COUNTS
route.get('/counts', adminController.getCounts);

//GET DEPOSITS
route.get('/deposit', adminController.getDeposits);

//CREANDO UNA NUEVA CUENTA 
route.post('/createCount', adminController.createCount);

//DELETE USER
route.get('/deleteUser/:id', adminController.deleteUser);

//DELETE COUNT
route.get('/deleteCount/:id', adminController.deleteCount);

//UPDATE USER
route.post('/updateUser', adminController.updateUser);

module.exports = route;