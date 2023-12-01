const express = require("express");
const router = express.Router();
const ProfesorController = require("../../controllers/profesor.controller");
const Authorization = require("../../auth/authorization");

// Autorizar cada API con middleware y asignar a las funciones del controlador
router.get("/", ProfesorController.obtenerTodosProfesores);

router.post("/registro", ProfesorController.crearProfesor);
router.get("/profesores", Authorization, ProfesorController.obtenerProfesores);
router.get(
  "/profesorPorCorreo",
  Authorization,
  ProfesorController.obtenerProfesoresPorCorreo
);
router.get("/profesor/:id", ProfesorController.obtenerProfesorPorId);
router.put("/actualizar", Authorization, ProfesorController.actualizarProfesor);
router.delete("/eliminar", Authorization, ProfesorController.eliminarProfesor);

module.exports = router;
