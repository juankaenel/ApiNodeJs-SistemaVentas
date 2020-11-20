// Cargamos el modulo express
const express = require('express');
const router = express.Router();

// Cargamos el controlador del usuario
const userController = require('../controllers/userController.js');

// ------------------ Usuarios ------------------
router.post('/register', userController.authenticate);
router.post('/authenticate', userController.authenticate);
router.get('/', userController.lists);
module.exports = router;