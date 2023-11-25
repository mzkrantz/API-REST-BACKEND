var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
  res.send('Llegaste a la ruta de  api/user.routes');
});

router.post('/registration', upload.single('image'),UserController.createUser);
router.post('/login/', UserController.loginUser);
router.get('/users',Authorization, UserController.getUsers);
router.post('/userByMail', Authorization, UserController.getUsersByMail);
router.put('/update', Authorization, UserController.updateUser);
router.delete('/delete', Authorization, UserController.removeUser);

module.exports = router;