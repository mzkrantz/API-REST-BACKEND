var express = require('express');
var router = express.Router();
var Authorization = require('../../auth/authorization');
var ComentariosController = require('../../controllers/comentarios.controller');

router.post('/', ComentariosController.createComentario);
router.get('/curso/:cursoId', ComentariosController.getComentariosByCursoId);
router.get('/profesor/:profesorId', ComentariosController.getComentariosByProfesorId);
router.put('/:id', Authorization, ComentariosController.updateComentario);
router.delete('/:id', Authorization, ComentariosController.deleteComentario);

module.exports = router;