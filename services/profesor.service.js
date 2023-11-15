const Profesor = require('../models/profesor.model.js');
const bcrypt = require('bcryptjs');

// Obtener la lista de profesores paginada
exports.obtenerProfesores = async function (req, res, next) {
  var query = {}; // Puedes ajustar esto según tus necesidades
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    var profesores = await Profesor.paginate(query, { page, limit });
    return res.status(200).json({ status: 200, data: profesores, message: "Profesores obtenidos exitosamente" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Crear un nuevo profesor
exports.crearProfesor = async function (profesor) {
  
  var nuevoProfesor = new Profesor({
    name: profesor.name,
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
exports.actualizarProfesor = async function (req, res, next) {
  var profesorData = req.body;
  var id = { name: profesorData.name };

  try {
    var oldProfesor = await Profesor.findOne(id);
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Error al encontrar el profesor" });
  }

  if (!oldProfesor) {
    return res.status(404).json({ status: 404, message: "Profesor no encontrado" });
  }

  var hashedPassword = bcrypt.hashSync(profesorData.password, 8);
  oldProfesor.set(profesorData);

  try {
    var profesorActualizado = await oldProfesor.save();
    return res.status(200).json({ status: 200, data: profesorActualizado, message: "Profesor actualizado exitosamente" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Error al actualizar el profesor" });
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
