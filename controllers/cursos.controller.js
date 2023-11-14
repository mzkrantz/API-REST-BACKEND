const CursosService = require('../services/cursos.service');

// Obtener todos los cursos
exports.getAllCursos = async function (req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  
  try {
    const cursos = await CursosService.getCursos({}, page, limit);
    return res.status(200).json({ status: 200, data: cursos, message: "Cursos recibidos exitosamente" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Crear un nuevo curso
exports.createCurso = async function (req, res, next) {
  const cursoData = {
    id: req.body.id,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    frequency: req.body.frequency,
    price: req.body.price,
    buttonLink: req.body.buttonLink,
    category: req.body.category,
    extendedDescription: req.body.extendedDescription,
    subjects: req.body.subjects,
    stars: req.body.stars,
    type: req.body.type,
    teacher: req.body.teacher,
    published: req.body.published,
  };

  try {
    const createdCurso = await CursosService.createCurso(cursoData);
    return res.status(201).json({ createdCurso, message: "Curso creado exitosamente" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "La creación del curso fue infructuosa" });
  }
};

// Obtener un curso por ID
exports.getCursoById = async function (req, res, next) {
  const cursoId = req.params.id;

  try {
    const curso = await CursosService.getCursoById(cursoId);
    return res.status(200).json(curso);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Actualizar un curso por ID
exports.updateCurso = async function (req, res, next) {
  const cursoId = req.params.id;
  const updatedCursoData = {
    id: req.body.id,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    frequency: req.body.frequency,
    price: req.body.price,
    buttonLink: req.body.buttonLink,
    category: req.body.category,
    extendedDescription: req.body.extendedDescription,
    subjects: req.body.subjects,
    stars: req.body.stars,
    type: req.body.type,
    teacher: req.body.teacher,
    published: req.body.published,
  };

  try {
    const updatedCurso = await CursosService.updateCurso(cursoId, updatedCursoData);
    return res.status(200).json({ status: 200, data: updatedCurso, message: "Curso actualizado exitosamente" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Eliminar un curso por ID
exports.deleteCurso = async function (req, res, next) {
  const cursoId = req.params.id;

  try {
    await CursosService.deleteCurso(cursoId);
    return res.status(204).send("Eliminación exitosa");
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
