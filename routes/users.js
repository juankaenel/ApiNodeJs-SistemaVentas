// Cargamos el modulo express
const express = require('express');
const router = express.Router();

// Cargamos el controlador del usuario
const userController = require('../controllers/userController.js');

// ------------------ Usuarios ------------------
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;