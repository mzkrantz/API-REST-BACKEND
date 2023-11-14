var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


// Definir un esquema para los cursos
var CursosSchema = new mongoose.Schema({
    id: Number,
    image: String,
    title: String,
    description: String,
    duration: String,
    frequency: String,
    price: String,
    buttonLink: String,
    category: String,
    extendedDescription: String,
    subjects: [String],
    stars: String,
    type: String,
    teacher: Number,
    published: Boolean
  });

CursosSchema.plugin(mongoosePaginate)

const Cursos = mongoose.model('Cursos', CursosSchema)

module.exports = Cursos;