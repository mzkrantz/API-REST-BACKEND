var Comentario = require("../models/comentario.model");
var CursosService = require("../services/cursos.service");
const Curso = require("../models/cursos.model");

exports.createComentario = function (comentarioData) {
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

exports.getComentariosByCursoId = function (id) {
  return Comentario.find({ cursoId: id, publicar: true });
};

exports.getComentariosByProfesorId = function (id) {
  return Comentario.find({ profesorId: id, publicar: false });
};

// Actualizar comentario y luego asignar puntaje
exports.updateComentario = async function (comentarioId) {
  try {
    // Actualizar comentario a publicar
    const updatedComentario = await Comentario.findByIdAndUpdate(
      comentarioId,
      { publicar: true },
      { new: true }
    );

    // Asignar puntaje al curso asociado
    await exports.asignarPuntaje(updatedComentario.cursoId);

    console.log(
      `Comentario actualizado y puntaje asignado para curso con ID ${updatedComentario.cursoId}`
    );

    return updatedComentario;
  } catch (error) {
    console.error(
      `Error al actualizar comentario con ID ${comentarioId}: ${error.message}`
    );
    throw error;
  }
};

exports.deleteComentario = function (comentarioId) {
  return Comentario.findByIdAndRemove(comentarioId);
};

exports.asignarPuntaje = async function (idCurso) {
  try {
    // Obtener comentarios publicados asociados al curso
    const comentarios = await exports.getComentariosByCursoId(idCurso);

    console.log(`Comentarios para el curso con ID ${idCurso}:`, comentarios);

    // Calcular el puntaje promedio
    if (comentarios.length > 0) {
      const totalCalificaciones = comentarios.reduce(
        (total, comentario) => total + comentario.calificacion,
        0
      );
      const puntajePromedio = totalCalificaciones / comentarios.length;

      // Actualizar el campo Stars en el modelo del curso
      const updatedCurso = await CursosService.updateCurso(idCurso, {
        stars: puntajePromedio,
      });
    } else {
      console.log(
        `No hay comentarios publicados para el curso con ID ${idCurso}`
      );
    }
  } catch (error) {
    console.error(
      `Error al asignar puntaje al curso con ID ${idCurso}: ${error.message}`
    );
  }
};
