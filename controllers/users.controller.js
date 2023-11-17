var UserService = require("../services/user.service");
var ProfesorService = require("../services/profesor.service");
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.createUser = async function (req, res, next) {

  var newUser = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    password: req.body.password,
    
  };

  

  try {
    var createdUser = await UserService.createUser(newUser);

    var token = createdUser;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    var userId;
  
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userId = decoded.id;
    });
    

    var newProfesor = {
      name: req.body.nombre,
      email: req.body.email,
      phone: req.body.telefono,
      userId: userId,
    };

    await ProfesorService.crearProfesor(newProfesor);

    return res
      .status(201)
      .json({
        token: createdUser,
        message: "Succesfully Created User and Profesor",
      });
  } catch (e) {
    return res
      .status(400)
      .json({
        status: 400,
        message: "User and Profesor Creation was Unsuccesfull",
      });
  }
};

exports.getUsers = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
  try {
    var Users = await UserService.getUsers({}, page, limit);
    return res
      .status(200)
      .json({
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
    return res
      .status(200)
      .json({
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
    return res
      .status(200)
      .json({
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
  // Req.Body contains the form submit values.
  console.log("body", req.body);
  var User = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    // Calling the Service function with the new object from the Request Body
    var loginUser = await UserService.loginUser(User);
    if (loginUser === 0)
      return res.status(400).json({ message: "Error en la contraseña" });
    else
      return res.status(201).json({ loginUser, message: "Succesfully login" });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Invalid username or password" });
  }
};
