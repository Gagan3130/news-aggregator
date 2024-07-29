const { param, checkExact } = require("express-validator");

const NewsQueryValidator = checkExact([
  param("query")
    .notEmpty()
    .withMessage("Please provide query string")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Atleast 3 character needed"),
]);

module.exports = { NewsQueryValidator };
