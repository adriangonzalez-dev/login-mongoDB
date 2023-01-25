const { validationResult } = require("express-validator");

const handleError = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    return res.status(400).json({
      errors: errors.mapped(),
    });
  }
};

module.exports = handleError