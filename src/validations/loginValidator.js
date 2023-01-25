const { check } = require("express-validator");

let loginValidator = [
  check("email", 'Debe ingresar su email')
    .notEmpty()
    .isEmail()
    .bail(),

  check("password", 'Debe ingresar su contraseña').notEmpty().bail(),
];

module.exports = loginValidator;
