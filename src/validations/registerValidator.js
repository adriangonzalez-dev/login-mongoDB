const { check, body } = require("express-validator");
const { userExists } = require("../helpers/dbValidations");

const registerValidator = [
  check("email", "El email es requerido y debe ser válido")
    .notEmpty()
    .bail()
    .isEmail()
    .bail(),

  body("email", "El email ya se encuentra registrado")
    .custom(async (email) => userExists(email))
    .bail(),

  check(
    "password",
    "La contraseña es requerida y debe tener entre 8 y 12 caracteres"
  )
    .notEmpty()
    .bail()
    .isLength({ min: 8, max: 12 })
    .bail(),
];

module.exports = registerValidator;
