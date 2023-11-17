const express = require('express');
const router = express.Router();
const ProfesorController = require('../../controllers/profesor.controller');
const Authorization = require('../../auth/authorization');

// Autorizar cada API con middleware y asignar a las funciones del controlador
router.get('/', function(req, res, next) {
  res.send('Llegaste a la ruta de api/profesor.routes');
});

router.post('/registro', ProfesorController.crearProfesor);
router.get('/profesores', Authorization, ProfesorController.obtenerProfesores);
  router.get('/profesorPorCorreo', Authorization, ProfesorController.obtenerProfesoresPorCorreo);
router.put('/actualizar', Authorization, ProfesorController.actualizarProfesor);
router.delete('/eliminar', Authorization, ProfesorController.eliminarProfesor);

// Exportar el enrutador
module.exports = router;
