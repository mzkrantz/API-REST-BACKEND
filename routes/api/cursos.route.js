var express = require('express');
var router = express.Router();
var CursosController = require('../../controllers/cursos.controller');
var Authorization = require('../../auth/authorization');

// Obtener todos los cursos
router.get('/', CursosController.getAllCursos);

// Crear un nuevo curso
router.post('/', Authorization, CursosController.createCurso);

// Obtener un curso por ID
router.get('/:id', CursosController.getCursosByProfesorId);

// Actualizar un curso por ID
router.put('/:id', Authorization, CursosController.updateCurso);

// Eliminar un curso por ID
router.delete('/:id', Authorization, CursosController.deleteCurso);

module.exports = router;
