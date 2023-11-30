const SolicitudesService = require('../services/solicitudes.service');

// Obtener todas las solicitudes
const getAllSolicitudes = async (req, res) => {
  try {
    const solicitudes = await SolicitudesService.getAllSolicitudes();
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva solicitud
const createSolicitud = async (req, res) => {
  try {
    const solicitud = await SolicitudesService.createSolicitud(req.body);
    res.status(201).json(solicitud);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una solicitud por ID
const getSolicitudById = async (req, res) => {
  try {
    const solicitud = await SolicitudesService.getSolicitudById(req.params.id);
    if (!solicitud) {
      res.status(404).json({ message: 'Solicitud no encontrada' });
    } else {
      res.status(200).json(solicitud);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una solicitud por ID
const updateSolicitud = async (req, res) => {
  try {
    const solicitud = await SolicitudesService.updateSolicitud(req.params.id, req.body);
    if (!solicitud) {
      res.status(404).json({ message: 'Solicitud no encontrada' });
    } else {
      res.status(200).json(solicitud);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una solicitud por ID
const deleteSolicitud = async (req, res) => {
  try {
    const solicitud = await SolicitudesService.deleteSolicitud(req.params.id);
    if (!solicitud) {
      res.status(404).json({ message: 'Solicitud no encontrada' });
    } else {
      res.status(200).json({ message: 'Solicitud eliminada correctamente' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSolicitudes,
  createSolicitud,
  getSolicitudById,
  updateSolicitud,
  deleteSolicitud,
};
