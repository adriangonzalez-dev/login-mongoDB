const {check, body} = require('express-validator');

const User = require('../database/models/User')

const registerValidator = [
    check('email')
                .notEmpty().withMessage('El email es requerido').bail()
                .isEmail().withMessage('Ingrese un mail válido').bail(),

    body('email').custom(async (value)=>{

       const user = await User.findOne({ email: value });
        if (user) {
            return Promise.reject('El email ya se encuentra registrado');
        }
     }).withMessage('El email ya se encuentra registrado').bail(),

    check('password')
                .notEmpty().withMessage('La contraseña es requerida').bail()
                .isLength({min: 8, max: 12}).withMessage('La contraseña debe tener como mínimo 8 carácteres').bail(),

]

module.exports = registerValidator;