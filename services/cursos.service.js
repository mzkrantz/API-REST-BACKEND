// Obtener el modelo Mongoose recién creado
var Cursos = require('../models/cursos.model');

// Guardar el contexto de este módulo dentro de la variable _this
_this = this;

// Función asincrónica para obtener la lista de cursos
exports.getCursos = async function (query, page, limit) {
  // Configuración de opciones para la paginación de Mongoose
  var options = {
    page,
    limit
  };
  // Intenta manejar la promesa esperada para manejar errores
  try {
    console.log("Query", query);
    var cursos = await Cursos.paginate(query, options);
    // Devuelve la lista de cursos retornada por la promesa de Mongoose
    return cursos;
  } catch (e) {
    // Devuelve un mensaje de error describiendo la razón
    console.log("Error en servicios", e);
    throw Error('Error al paginar cursos');
  }
}

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
}

exports.getCursoById = async function (id) {
  try {
    // Encuentra el objeto de curso por ID
    var curso = await Cursos.findById(id);
    return curso;
  } catch (e) {
    throw Error("Error al buscar el curso");
  }
}

exports.updateCurso = async function (id, curso) {
  try {
    // Encuentra el objeto de curso antiguo por el ID
    var oldCurso = await Cursos.findByIdAndUpdate(id, curso, { new: true });
    return oldCurso;
  } catch (e) {
    throw Error("Error al actualizar el curso");
  }
}

exports.deleteCurso = async function (id) {
  // Elimina el curso
  try {
    var deleted = await Cursos.findByIdAndRemove(id);
    return deleted;
  } catch (e) {
    throw Error("Error al eliminar el curso");
  }
}
