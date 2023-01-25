const express = require('express');
const router = express.Router();

//Controllers
const {register,login} = require('../controllers/usersController');

//middlewares
const { handleErrors } = require('../middlewares')

//Validators
const {loginValidator, registerValidator} = require('../validations')

router.post('/register',registerValidator, handleErrors, register);
router.post('/login',loginValidator, handleErrors, login);

module.exports = router;