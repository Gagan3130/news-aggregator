const { body, query, checkExact } = require("express-validator");
const { categories } = require("../config");

const userRegistrationValidator = checkExact([
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Please provide valid name"),
  body("email")
    .notEmpty()
    .withMessage("Please provide email")
    .isEmail()
    .withMessage("Please provide valid email"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("preferences")
    .isArray({ min: 1 })
    .withMessage("User preference must be an array with at least one item"),
  body("preferences.*")
    .isString()
    .withMessage("Each preference must be a string")
    .isIn(categories)
    .withMessage(
      `Invalid Preferences. Allowed preference are ${categories.join(",")}`
    ),
]);

const userLoginValidator = checkExact([
  body("email")
    .notEmpty()
    .withMessage("Please provide email")
    .isEmail()
    .withMessage("Please provide valid email"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

const updateUserPreferencesValidator = checkExact([
  body("preferences")
    .isArray({ min: 1 })
    .withMessage("User preference must be an array with at least one item"),
  body("preferences.*")
    .isString()
    .withMessage("Each preference must be a string")
    .isIn(categories)
    .withMessage(
      `Invalid Preferences. Allowed preference are ${categories.join(",")}`
    ),
]);

module.exports = {
  userRegistrationValidator,
  userLoginValidator,
  updateUserPreferencesValidator,
};
