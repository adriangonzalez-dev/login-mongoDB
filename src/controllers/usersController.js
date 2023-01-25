const User = require("../database/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const SECRET = process.env.SECRET;

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;

    const user = new User({
      email,
      password: bcrypt.hashSync(password, 10),
    });

    try {
      await user.save();
      return res.status(201).json({
        msg: "Usuario registrado",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        msg: "Usuario no creado",
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "El usuario no existe",
        status: 404,
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        msg: "Usuario o contrseña incorrecta",
        status: 400,
      });
    }

    let token = jwt.sign(
      {
        email: user.email,
      },
      SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({
      user,
      token,
    });
  },
};
