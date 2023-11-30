var express = require('express');
var router = express.Router();
var users = require('./api/user.route');
var cursos = require('./api/cursos.route');
var profesores = require('./api/profesor.route');
var comentarios = require('./api/comentarios.route');
var solicitudes = require('./api/solicitudes.route.js');

// Rutas de usuarios
router.use('/users', users);

// Rutas de cursos
router.use('/cursos', cursos);

// Rutas de profesores
router.use('/profesores', profesores);

// Rutas de comentarios
router.use('/comentarios', comentarios);

// Rutas de solicitudes
router.use('/solicitudes', solicitudes);



module.exports = router;
