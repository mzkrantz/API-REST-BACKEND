const cloudinary = require("../services/cloudinary");
const CursosService = require("../services/cursos.service");

// Obtener todos los cursos
exports.getAllCursos = async function (req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try {
    const cursos = await CursosService.getCursos({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: cursos,
      message: "Cursos recibidos exitosamente",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Crear un nuevo curso
exports.createCurso = async function (req, res, next) {
  const fileBuffer = req.file.buffer;

  try {
    const urlImg = await cloudinary.uploadImage(fileBuffer);
    let subjectsArray = req.body.subjects;

    // Intenta parsear el string JSON. Si tiene éxito, asigna el resultado a subjectsArray.
    try {
      subjectsArray = JSON.parse(subjectsArray);
    } catch (error) {
      // Si hay un error al parsear, asume que ya es un array o realiza otra lógica según sea necesario.
      console.error("Error parsing subjects:", error);
    }

    // Asegúrate de que subjectsArray sea un array de strings.
    if (!Array.isArray(subjectsArray)) {
      // Si no es un array, intenta dividir el string por comas y eliminar espacios en blanco.
      subjectsArray = subjectsArray.split(",").map((subject) => subject.trim());
    }
    
    const cursoData = {
      image: urlImg,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      frequency: req.body.frequency,
      price: req.body.price,
      buttonLink: req.body.buttonLink,
      category: req.body.category,
      extendedDescription: req.body.extendedDescription,
      subjects: subjectsArray,
      stars: req.body.stars,
      type: req.body.type,
      teacher: req.body.teacher,
      published: req.body.published,
    };

    const createdCurso = await CursosService.createCurso(cursoData);
    return res
      .status(201)
      .json({ createdCurso, message: "Curso creado exitosamente" });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "La creación del curso fue infructuosa" });
  }
};

// Obtener todos los cursos por ID de profesor
exports.getCursosByProfesorId = async function (req, res, next) {
  const profesorId = req.params.id;

  try {
    const cursos = await CursosService.getCursosByProfesorId(profesorId);
    return res.status(200).json(cursos);
  } catch (e) {
    console.error(e); // Imprime el error original
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Actualizar un curso por ID
exports.updateCurso = async function (req, res, next) {
  const cursoId = req.params.id;
  const updatedCursoData = req.body;

  try {
    const updatedCurso = await CursosService.updateCurso(
      cursoId,
      updatedCursoData
    );
    return res.status(200).json({
      status: 200,
      data: updatedCurso,
      message: "Curso actualizado exitosamente",
    });
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

// Actualizar la imagen del curso por ID

exports.updateCursoImage = async function (req, res, next) {

  const cursoId = req.params.id;
  const fileBuffer = req.file.buffer;

  try {
    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploadImage(fileBuffer);

    // Actualizar la URL de la imagen en la base de datos
    const updatedCurso = await CursosService.updateCursoImage(
      cursoId,
      result
    );

    return res.status(200).json({
      status: 200,
      data: updatedCurso,
      message: "Imagen del curso actualizada exitosamente",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

