var ComentariosService = require('../services/comentarios.service');

exports.createComentario = function(req, res) {
  ComentariosService.createComentario(req.body)
    .then(function (comentario) {
      res.status(200).json(comentario);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};

exports.getComentariosByCursoId = function(req, res) {
  ComentariosService.getComentariosByCursoId(req.params.cursoId)
    .then(function (comentarios) {
      res.status(200).json(comentarios);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};

exports.getComentariosByProfesorId = function(req, res) {
  ComentariosService.getComentariosByProfesorId(req.params.profesorId)
    .then(function (comentarios) {
      res.status(200).json(comentarios);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};


exports.updateComentario = function(req, res) {
  ComentariosService.updateComentario(req.params.id)
    .then(function (comentario) {
      res.status(200).json(comentario);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};

exports.deleteComentario = function(req, res) {
  ComentariosService.deleteComentario(req.params.id)
    .then(function () {
      res.status(200).json({message: "Comentario eliminado con éxito"});
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};