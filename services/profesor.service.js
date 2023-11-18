const Profesor = require('../models/profesor.model.js');
const bcrypt = require('bcryptjs');

// Obtener la lista de profesores paginada
exports.obtenerProfesores = async function (query, page, limit) {
  try {
    var profesores = await Profesor.findOne({ email: query.email });
    return profesores;
  } catch (e) {
    throw Error('Error al obtener los profesores');
  }
};

// Crear un nuevo profesor
exports.crearProfesor = async function (profesor) {
  
  var nuevoProfesor = new Profesor({
    name: profesor.name,
    lastName: profesor.lastName,
    subject: profesor.subject,
    age: profesor.age,
    email: profesor.email,
    phone: profesor.phone,
    image: profesor.image,
    description: profesor.description,
    background: profesor.background,
    courseId: profesor.courseId,
    userId: profesor.userId,
  });

  try {
    var profesorCreado = await nuevoProfesor.save();
    return profesorCreado;
  } catch (e) {
    console.log(e);
    throw Error('Error al crear un nuevo profesor');
  }
};

// Actualizar un profesor
exports.actualizarProfesor = async function (profesorData) {
  var email = { email: profesorData.email };

  try {
    var oldProfesor = await Profesor.findOne(email);
  } catch (e) {
    throw new Error("Error al encontrar el profesor");
  }

  if (!oldProfesor) {
    throw new Error("Profesor no encontrado");
  }

  // Verificar si cada campo existe antes de establecerlo
  if (profesorData.name) oldProfesor.name = profesorData.name;
  if (profesorData.subject) oldProfesor.subject = profesorData.subject;
  if (profesorData.age) oldProfesor.age = profesorData.age;
  if (profesorData.phone) oldProfesor.phone = profesorData.phone;
  if (profesorData.description) oldProfesor.description = profesorData.description;
  if (profesorData.background) oldProfesor.background = profesorData.background;

  try {
    var profesorActualizado = await oldProfesor.save();
    return profesorActualizado;
  } catch (e) {
    throw new Error("Error al actualizar el profesor: " + e.message);
  }
};

// Eliminar un profesor
exports.eliminarProfesor = async function (req, res, next) {
  var id = req.body.id;

  try {
    var eliminado = await Profesor.remove({ _id: id });

    if (eliminado.n === 0 && eliminado.ok === 1) {
      return res.status(404).json({ status: 404, message: "El profesor no pudo ser encontrado" });
    }

    return res.status(200).json({ status: 200, message: "Profesor eliminado exitosamente" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Error al eliminar el profesor" });
  }
};
