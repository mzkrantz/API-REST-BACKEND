const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProfesorSchema = new mongoose.Schema({
  name: { type: String },
  subject: { type: String },
  age: { type: Number },
  email: { type: String },
  phone: { type: String },
  image: { type: String },
  description: { type: String },
  background: { type: String },
  courseId: { type: String },
  userId: { type: String },
});

ProfesorSchema.plugin(mongoosePaginate);

const Profesor = mongoose.model('Profesor', ProfesorSchema, 'profesores');

module.exports = Profesor;
