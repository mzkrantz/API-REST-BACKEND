var Comentario = require('../models/comentario.model');

exports.createComentario = function(comentarioData) {

  var comentario = new Comentario({
    nombre: comentarioData.nombre,
    comentario: comentarioData.comentario,
    cursoId: comentarioData.idCurso,
    calificacion: comentarioData.calificacion,
  });
  return comentario.save();
};

exports.getComentariosByCursoId = function(cursoId) {
  return Comentario.find({ curso: cursoId });
};

exports.updateComentario = function(comentarioId, comentarioData) {
  return Comentario.findByIdAndUpdate(comentarioId, comentarioData, { new: true });
};

exports.deleteComentario = function(comentarioId) {
  return Comentario.findByIdAndRemove(comentarioId);
};