const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

// Ruta para obtener todos los entrenadores
router.get('/trainer', trainerController.getAllTrainers);

// Ruta para crear un nuevo entrenador
router.post('/trainer', trainerController.createTrainer);

module.exports = router;
