var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComentarioSchema = new Schema({
  contenido: { type: String, required: true },
  curso: { type: Schema.Types.ObjectId, ref: 'Curso', required: true },
});

module.exports = mongoose.model('Comentario', ComentarioSchema);