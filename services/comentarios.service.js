var Comentario = require('../models/comentario.model');

exports.createComentario = function(comentarioData) {

  var comentario = new Comentario({
    nombre: comentarioData.nombre,
    comentario: comentarioData.comentario,
    cursoId: comentarioData.idCurso,
    nombreCurso: comentarioData.nombreCurso,
    profesorId: comentarioData.idProfesor,
    calificacion: comentarioData.calificacion,
    publicar: comentarioData.publicar,
  });
  return comentario.save();
};

exports.getComentariosByCursoId = function(id) {
  return Comentario.find({ cursoId: id, publicar: true });
};

exports.getComentariosByProfesorId = function(id) {
  return Comentario.find({ profesorId: id});
};


exports.updateComentario = function(comentarioId) {
  return Comentario.findByIdAndUpdate(comentarioId, { publicar: true}, {new: true});
};

exports.deleteComentario = function(comentarioId) {
  return Comentario.findByIdAndRemove(comentarioId);
};