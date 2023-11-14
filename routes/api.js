var express = require('express');
var router = express.Router();
var users = require('./api/user.route');
var cursos = require('./api/cursos.route');

// Rutas de usuarios
router.use('/users', users);

// Rutas de cursos
router.use('/cursos', cursos);

module.exports = router;
