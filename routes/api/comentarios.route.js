var express = require('express');
var router = express.Router();

var ComentariosController = require('../../controllers/comentarios.controller');

router.post('/', ComentariosController.createComentario);
router.get('/curso/:cursoId', ComentariosController.getComentariosByCursoId);
router.put('/:id', ComentariosController.updateComentario);
router.delete('/:id', ComentariosController.deleteComentario);

module.exports = router;