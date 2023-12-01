var express = require("express");
var router = express.Router();
var CursosController = require("../../controllers/cursos.controller");
var Authorization = require("../../auth/authorization");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Obtener todos los cursos
router.get("/", CursosController.getAllCursos);

// Crear un nuevo curso
router.post(
  "/",
  Authorization,
  upload.single("image"),
  CursosController.createCurso
);

// Obtener un curso por ID
router.get("/:id", CursosController.getCursosByProfesorId);

// Actualizar un curso por ID
router.patch("/:id", Authorization, CursosController.updateCurso);

// Eliminar un curso por ID
router.delete("/:id", Authorization, CursosController.deleteCurso);

// Actualizar la imagen de un curso por ID
router.patch(
  "/:id/image",
  Authorization,
  upload.single("image"),
  CursosController.updateCursoImage
);

module.exports = router;
