var ProfesorService = require("../services/profesor.service.js");

_this = this;

exports.obtenerProfesores = async function (req, res, next) {
  var query = {};
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    var profesores = await ProfesorService.obtenerProfesores({}, page, limit);
    return res
      .status(200)
      .json({
        status: 200,
        data: profesores,
        message: "Profesores recibidos exitosamente",
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.obtenerTodosProfesores = async function (req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try {
    const profesores = await ProfesorService.obtenerTodosProfesores(
      {},
      page,
      limit
    );
    return res.status(200).json({
      status: 200,
      data: profesores,
      message: "Profesores recibidos exitosamente",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.obtenerProfesoresPorCorreo = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  let filtro = { email: req.headers.email };

  try {
    var profesores = await ProfesorService.obtenerProfesores(
      filtro,
      page,
      limit
    );
    return res
      .status(200)
      .json({
        status: 200,
        data: profesores,
        message: "Profesores recibidos exitosamente",
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.smessage });
  }
};

exports.obtenerProfesorPorId = async function (req, res, next) {
  try {
    var profesor = await ProfesorService.obtenerProfesorPorId(req.params.id);
    if (!profesor) {
      return res
        .status(404)
        .json({ status: 404, message: "Profesor no encontrado" });
    }
    return res
      .status(200)
      .json({
        status: 200,
        data: profesor,
        message: "Profesor recibido exitosamente",
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.crearProfesor = async function (req, res, next) {
  var profesor = {
    name: req.body.name,
    subject: req.body.subject,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    image: req.body.image,
    description: req.body.description,
    background: req.body.background,
    courseId: req.body.courseId,
    userId: req.body.userId,
  };

  try {
    var profesorCreado = await ProfesorService.crearProfesor(profesor);
    return res
      .status(201)
      .json({ profesorCreado, message: "Profesor creado exitosamente" });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({
        status: 400,
        message: "La creación del profesor no fue exitosa",
      });
  }
};

exports.actualizarProfesor = async function (req, res, next) {
  var profesor = {};

  if (req.body.name) profesor.name = req.body.name;
  if (req.body.subject) profesor.subject = req.body.subject;
  if (req.body.age) profesor.age = req.body.age;
  if (req.body.email) profesor.email = req.body.email;
  if (req.body.phone) profesor.phone = req.body.phone;
  if (req.body.image) profesor.image = req.body.image;
  if (req.body.description) profesor.description = req.body.description;
  if (req.body.background) profesor.background = req.body.background;
  if (req.body.courseId) profesor.courseId = req.body.courseId;
  if (req.body.userId) profesor.userId = req.body.userId;

  try {
    var profesorActualizado = await ProfesorService.actualizarProfesor(
      profesor
    );
    return res
      .status(200)
      .json({
        status: 200,
        data: profesorActualizado,
        message: "Profesor actualizado exitosamente",
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.eliminarProfesor = async function (req, res, next) {
  var id = req.body.id;
  try {
    var eliminado = await ProfesorService.eliminarProfesor(id);
    res.status(200).send("Eliminado exitosamente...");
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
