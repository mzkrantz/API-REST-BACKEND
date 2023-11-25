var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComentarioSchema = new Schema({
  nombre: { type: String, },
  comentario: { type: String},
  cursoId: { type: Schema.Types.ObjectId},
  calificacion: { type: Number},
});

module.exports = mongoose.model('Comentario', ComentarioSchema);