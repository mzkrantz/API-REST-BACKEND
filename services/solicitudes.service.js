
const mongoose = require('mongoose');

// Definir el esquema de la solicitud
const solicitudSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
    mail: {
      type: String,
      required: true
    },
    horario: {
      type: String,
      required: true
    },
    mensaje: {
      type: String,
      required: true
    },
    curso: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    cursoNombre: {
      type: String,
      required: true
    },
    profesor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    aceptado: {
      type: Boolean,
      default: false
    }
  });

// Crear el modelo de la solicitud
const Solicitud = mongoose.model('Solicitudes', solicitudSchema);

// Obtener todas las solicitudes
const getAllSolicitudes = async () => {
  return await Solicitud.find();
};

// Crear una nueva solicitud
const createSolicitud = async (solicitudData) => {
  return await Solicitud.create(solicitudData);
};

// Obtener una solicitud por ID
const getSolicitudById = async (profesorId) => {
  return await Solicitud.find({profesor: profesorId});
};

// Actualizar una solicitud por ID
const updateSolicitud = async (id, solicitudData) => {
  return await Solicitud.findByIdAndUpdate(id, solicitudData, { new: true });
};

// Eliminar una solicitud por ID
const deleteSolicitud = async (id) => {
  return await Solicitud.findByIdAndDelete(id);
};

module.exports = {
  getAllSolicitudes,
  createSolicitud,
  getSolicitudById,
  updateSolicitud,
  deleteSolicitud,
};
