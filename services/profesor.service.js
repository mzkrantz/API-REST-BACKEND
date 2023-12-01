const Profesor = require("../models/profesor.model.js");
const bcrypt = require("bcryptjs");

exports.obtenerProfesores = async function (query, page, limit) {
  try {
    var profesores = await Profesor.findOne({ email: query.email });
    return profesores;
  } catch (e) {
    throw Error("Error al obtener los profesores");
  }
};

exports.obtenerTodosProfesores = async function (query, page, limit) {
  var options = {
    page,
    limit,
  };
  try {
    var profesores = await Profesor.paginate(query, options);
    return profesores;
  } catch (e) {
    console.log("Error en servicios", e);
    throw Error("Error al paginar profesores");
  }
};

exports.crearProfesor = async function (profesor) {
  var nuevoProfesor = new Profesor({
    image: profesor.image,
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
    throw Error("Error al crear un nuevo profesor");
  }
};

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

  if (profesorData.name) oldProfesor.name = profesorData.name;
  if (profesorData.subject) oldProfesor.subject = profesorData.subject;
  if (profesorData.age) oldProfesor.age = profesorData.age;
  if (profesorData.phone) oldProfesor.phone = profesorData.phone;
  if (profesorData.description)
    oldProfesor.description = profesorData.description;
  if (profesorData.background) oldProfesor.background = profesorData.background;

  try {
    var profesorActualizado = await oldProfesor.save();
    return profesorActualizado;
  } catch (e) {
    throw new Error("Error al actualizar el profesor: " + e.message);
  }
};

exports.eliminarProfesor = async function (req, res, next) {
  var id = req.body.id;

  try {
    var eliminado = await Profesor.remove({ _id: id });

    if (eliminado.n === 0 && eliminado.ok === 1) {
      return res
        .status(404)
        .json({ status: 404, message: "El profesor no pudo ser encontrado" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Profesor eliminado exitosamente" });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Error al eliminar el profesor" });
  }
};

exports.obtenerProfesorPorId = async function (id) {
  try {
    var profesor = await Profesor.findById(id);
    return profesor;
  } catch (e) {
    throw Error("Error al obtener el profesor");
  }
};
