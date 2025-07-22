const express = require('express');
const router = express.Router();
const controller = require('../controllers/estudiantesController'); // Nombre corregido

router.get('/', controller.obtenerEstudiantes);
router.post('/', controller.agregarEstudiante);
router.delete('/:id', controller.eliminarEstudiante);
router.put('/:id', controller.actualizarEstudiante);

module.exports = router;
