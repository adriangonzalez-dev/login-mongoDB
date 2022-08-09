const {check, body}=require('express-validator');
const User = require('../database/models/User')
const bcrypt = require('bcryptjs')

let loginValidator = [
    check('email')
                .notEmpty()
                .isEmail().withMessage('Debe ingresar un email').bail(),

    body('email').custom(async (value,{req})=>{

        const user = await User.findOne({ email: req.body.email });
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return Promise.reject('Usuario o contraseña Incorrecta');
        }
        return true;

    }).withMessage('Email o contraseña Incorrecta').bail(),

    body('password').notEmpty().withMessage('Ingrese su contraseña').bail()
]

module.exports= loginValidator;