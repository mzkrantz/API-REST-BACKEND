var UserService = require("../services/user.service");
var ProfesorService = require("../services/profesor.service");
var jwt = require("jsonwebtoken");
const cloudinary = require("../services/cloudinary");

_this = this;

exports.createUser = async function (req, res, next) {
  try {
    const emailExists = await UserService.verificarEmailExistente(
      req.body.email
    );
    if (emailExists) {
      return res.status(400).json({
        status: 400,
        message: "El correo electrónico ya existe en la base de datos",
      });
    }

    // Subir la imagen a Cloudinary
    const fileBuffer = req.file.buffer;
    const urlImg = await cloudinary.uploadImage(fileBuffer);

    var newUser = {
      image: urlImg,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      password: req.body.password,
      resetToken: "",
      resetTokenExpires: "",
    };

    var createdUser = await UserService.createUser(newUser);

    // Obtener el token del usuario creado
    var token = createdUser;
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No se proporcionó un token." });

    var userId;

    // Verificar el token
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Fallo al autenticar el token." });
      userId = decoded.id;
    });

    // Crear un nuevo profesor asociado al usuario
    var newProfesor = {
      image: urlImg,
      name: req.body.nombre,
      lastName: req.body.apellido,
      email: req.body.email,
      phone: req.body.telefono,
      subject: req.body.materia,
      age: req.body.edad,
      description: req.body.descripcion,
      background: req.body.experiencia,
      userId: userId,
    };

    await ProfesorService.crearProfesor(newProfesor);

    return res.status(201).json({
      token: createdUser,
      message: "Usuario y Profesor creados exitosamente",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "La creación de usuario y profesor no fue exitosa",
    });
  }
};

exports.getUsers = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  try {
    var Users = await UserService.getUsers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: Users,
      message: "Succesfully Users Recieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getUsersByMail = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  let filtro = { email: req.body.email };
  console.log(filtro);
  try {
    var Users = await UserService.getUsers(filtro, page, limit);
    return res.status(200).json({
      status: 200,
      data: Users,
      message: "Succesfully Users Recieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.updateUser = async function (req, res, next) {
  if (!req.body.email) {
    return res
      .status(400)
      .json({ status: 400, message: "email must be present" });
  }

  var id = req.body.email;

  var user = {
    id,
    nombre: req.body.nombre ? req.body.nombre : null,
    apellido: req.body.apellido ? req.body.apellido : null,
    email: req.body.email ? req.body.email : null,
    telefono: req.body.telefono ? req.body.telefono : null,
    password: req.body.password ? req.body.password : null,
    profesor: req.body.profesor ? req.body.profesor : null,
  };

  try {
    var updatedUser = await UserService.updateUser(user);
    return res.status(200).json({
      status: 200,
      data: updatedUser,
      message: "Succesfully Updated User",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.removeUser = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await UserService.deleteUser(id);
    return res
      .status(204)
      .json({ status: 204, message: "Succesfully User Deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.loginUser = async function (req, res, next) {
  console.log("body", req.body);
  var User = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    var loginUser = await UserService.loginUser(User);
    if (loginUser === 0)
      return res.status(400).json({ message: "Error en la contraseña" });
    else
      return res.status(201).json({ loginUser, message: "Succesfully login" });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid username or password" });
  }
};

exports.getImagenUsuario = async function (req, res, next) {
  var email = req.params.email;

  try {
    var user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res
      .status(200)
      .json({
        status: 200,
        message: "User image retrieved successfully",
        image: user.image,
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
