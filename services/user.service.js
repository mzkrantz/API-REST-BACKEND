var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var User = require('../models/user.model');

_this = this;

exports.getUsers = async function (query, page, limit) {
    var options = {
        page,
        limit
    }

    try {
        var Users = await User.paginate(query, options)
        return Users;
    } catch (e) {
        throw Error('Error while Paginating Users');
    }
}

exports.verificarEmailExistente = async function (email) {
    try {
        var existingUser = await User.findOne({ email: email });
        return existingUser !== null;
    } catch (e) {
        throw Error("Error while checking existing email");
    }
};

exports.createUser = async function (user) {
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    
    var newUser = new User({
        image: user.image,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: user.telefono,
        password: hashedPassword,
        

    })

    try {
        var savedUser = await newUser.save();
        
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        throw Error('Error while Creating User');
    }
}

exports.updateUser = async function (user) {
    var id = {email: user.email}
    try {
        var oldUser = await User.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    if (!oldUser) {
        return false;
    }
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.nombre = user.nombre
    oldUser.apellido = user.apellido
    oldUser.telefono = user.telefono
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {
    try {
        var deleted = await User.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}

exports.getUserByEmail = async function (email) {
    try {
        var user = await User.findOne({ email: email });
        return user;
    } catch (e) {
        throw Error("Error Occurred while Fetching User by Email");
    }
}
