var express = require("express");
var router = express.Router();
var SolicitudesController = require("../../controllers/solicitudes.controller.js");
const Authorization = require("../../auth/authorization");

// Obtener todas las solicitudes
router.get("/", SolicitudesController.getAllSolicitudes);

// Crear una nueva solicitud
router.post("/", SolicitudesController.createSolicitud);

// Obtener una solicitud por ID
router.get("/:id", Authorization, SolicitudesController.getSolicitudById);

// Actualizar una solicitud por ID
router.put("/:id", SolicitudesController.updateSolicitud);

// Eliminar una solicitud por ID
router.delete("/:id", SolicitudesController.deleteSolicitud);

module.exports = router;
