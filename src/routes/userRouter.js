const express = require('express');
const router = express.Router();

//Controllers
const {register,login} = require('../controllers/usersController');

//Validators
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator')

router.post('/register',registerValidator,register);
router.post('/login',loginValidator,login);

module.exports = router;