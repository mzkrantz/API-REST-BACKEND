const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cursoNombre: {
    type: String,
    required: true,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  estado: {
    type: Number,
    default: 0, // 0 Pendiente, 1 Aceptado, 2 Finalizada, 3 Cancelada
  },
});

const Solicitud = mongoose.model("Solicitudes", solicitudSchema);

const getAllSolicitudes = async () => {
  return await Solicitud.find();
};

const createSolicitud = async (solicitudData) => {
  return await Solicitud.create(solicitudData);
};

const getSolicitudById = async (profesorId) => {
  return await Solicitud.find({ profesor: profesorId });
};

const updateSolicitud = async (id, nuevoEstado, solicitudData) => {
  const updatedSolicitud = await Solicitud.findByIdAndUpdate(id, {
    estado: nuevoEstado,
    ...solicitudData,
  });
  return updatedSolicitud;
};

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
