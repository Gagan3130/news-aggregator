const { validationResult } = require("express-validator");
const errorCodes = require("../utils/error-codes");
const { ValidationError } = require("../utils/custom-error");

function validateRequestSchema (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError({
      message: errors.array()[0].msg,
      code: errorCodes.VALIDATION_ERROR,
    });
  }
  next();
}

module.exports = { validateRequestSchema };