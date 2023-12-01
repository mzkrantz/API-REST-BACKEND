var Cursos = require("../models/cursos.model");
var mongoose = require("mongoose");

_this = this;

exports.getCursos = async function (query, page, limit) {
  // Configuración de opciones para la paginación de Mongoose
  var options = {
    page,
    limit,
  };
  try {
    var cursos = await Cursos.paginate(query, options);
    return cursos;
  } catch (e) {
    console.log("Error en servicios", e);
    throw Error("Error al paginar cursos");
  }
};

exports.createCurso = async function (curso) {
  var newCurso = new Cursos(curso);

  try {
    var savedCurso = await newCurso.save();
    return savedCurso;
  } catch (e) {
    console.log(e);
    throw Error("Error al crear el curso");
  }
};

exports.getCursosByProfesorId = async function (profesorId) {
  if (!mongoose.Types.ObjectId.isValid(profesorId)) {
    throw Error("ID de profesor no válido");
  }

  try {
    const cursos = await Cursos.find({ teacher: profesorId });
    return cursos;
  } catch (e) {
    console.error(e);
    throw Error("Error al obtener los cursos por ID de profesor");
  }
};

exports.updateCurso = async function (id, cursoData) {
  try {
    const existingCurso = await Cursos.findById(id);
    if (!existingCurso) {
      throw new Error("Curso no encontrado");
    }

    const updatedCurso = await Cursos.findOneAndUpdate(
      { _id: id },
      { $set: cursoData },
      { new: true }
    );

    if (!updatedCurso) {
      throw new Error("Error al actualizar el curso");
    }

    return updatedCurso;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.deleteCurso = async function (id) {
  try {
    var curso = await Cursos.findById(id);
    if (!curso) {
      throw Error("Curso no encontrado");
    }
  } catch (e) {
    throw Error("Error al buscar el curso");
  }

  try {
    var deleted = await curso.remove();
    console.log("deleted", deleted);
    return deleted;
  } catch (e) {
    throw Error("Error al eliminar el curso");
  }
};

exports.updateCursoImage = async function (id, image) {
  try {
    const existingCurso = await Cursos.findById(id);
    if (!existingCurso) {
      throw new Error("Curso no encontrado");
    }

    const updatedCurso = await Cursos.findOneAndUpdate(
      { _id: id },
      { $set: { image: image } },
      { new: true }
    );

    if (!updatedCurso) {
      throw new Error("Error al actualizar la imagen del curso");
    }

    return updatedCurso;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
