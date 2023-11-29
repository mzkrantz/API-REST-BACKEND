var Cursos = require("../models/cursos.model");
var mongoose = require("mongoose");

// Guardar el contexto de este módulo dentro de la variable _this
_this = this;

// Función asincrónica para obtener la lista de cursos
exports.getCursos = async function (query, page, limit) {
  // Configuración de opciones para la paginación de Mongoose
  var options = {
    page,
    limit,
  };
  // Intenta manejar la promesa esperada para manejar errores
  try {
    var cursos = await Cursos.paginate(query, options);
    // Devuelve la lista de cursos retornada por la promesa de Mongoose
    return cursos;
  } catch (e) {
    // Devuelve un mensaje de error describiendo la razón
    console.log("Error en servicios", e);
    throw Error("Error al paginar cursos");
  }
};

exports.createCurso = async function (curso) {
  // Crea un nuevo objeto Mongoose utilizando la palabra clave new
  var newCurso = new Cursos(curso);

  try {
    // Guarda el curso
    var savedCurso = await newCurso.save();
    return savedCurso;
  } catch (e) {
    // Devuelve un mensaje de error describiendo la razón
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
    console.error(e); // Imprime el error original
    throw Error("Error al obtener los cursos por ID de profesor");
  }
};

exports.updateCurso = async function (id, cursoData) {
  try {
    // Verifica si el curso con el ID proporcionado existe antes de intentar actualizar
    const existingCurso = await Cursos.findById(id);
    if (!existingCurso) {
      throw new Error("Curso no encontrado");
    }

    // Actualiza el curso y devuelve el documento actualizado
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
    throw e; // Lanza el error original para que pueda ser manejado en el nivel superior
  }
};


exports.deleteCurso = async function (id) {
  // Busca el curso
  try {
    var curso = await Cursos.findById(id);
    if (!curso) {
      throw Error("Curso no encontrado");
    }
  } catch (e) {
    throw Error("Error al buscar el curso");
  }

  // Elimina el curso
  try {
    var deleted = await curso.remove();
    console.log("deleted", deleted);
    return deleted;
  } catch (e) {
    throw Error("Error al eliminar el curso");
  }
};
