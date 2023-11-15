var ProfesorService = require('../services/profesor.service.js');

_this = this;

exports.obtenerProfesores = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    var profesores = await ProfesorService.obtenerProfesores({}, page, limit);
    return res.status(200).json({ status: 200, data: profesores, message: "Profesores recibidos exitosamente" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.obtenerProfesoresPorCorreo = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  let filtro = { email: req.body.email };

  try {
    var profesores = await ProfesorService.obtenerProfesores(filtro, page, limit);
    return res.status(200).json({ status: 200, data: profesores, message: "Profesores recibidos exitosamente" });
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
    return res.status(201).json({ profesorCreado, message: "Profesor creado exitosamente" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: "La creación del profesor no fue exitosa" });
  }
};

exports.actualizarProfesor = async function (req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ status: 400, message: "El nombre debe estar presente" });
  }

  var profesor = {
    name: req.body.name ? req.body.name : null,
    subject: req.body.subject ? req.body.subject : null,
    age: req.body.age ? req.body.age : null,
    email: req.body.email ? req.body.email : null,
    phone: req.body.phone ? req.body.phone : null,
    image: req.body.image ? req.body.image : null,
    description: req.body.description ? req.body.description : null,
    background: req.body.background ? req.body.background : null,
    courseId: req.body.courseId ? req.body.courseId : null,
    userId: req.body.userId ? req.body.userId : null,
  };

  try {
    var profesorActualizado = await ProfesorService.actualizarProfesor(profesor);
    return res.status(200).json({ status: 200, data: profesorActualizado, message: "Profesor actualizado exitosamente" });
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
