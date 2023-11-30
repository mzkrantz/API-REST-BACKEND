var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

const UserSchema = new Schema({
    image: String,
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    password: String,
    profesor: { type: Schema.Types.ObjectId, ref: 'Profesor' },
    resetToken: "",
    resetTokenExpires: "",
});

UserSchema.plugin(mongoosePaginate);
var User = mongoose.model('User', UserSchema);

module.exports = User;