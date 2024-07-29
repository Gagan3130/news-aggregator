const express = require("express");
const {
  userRegistration,
  userLogin,
  getUserNewsPreference,
  updateUserNewsPrefernces,
} = require("../controllers/user.controller");
const {
  userRegistrationValidator,
  userLoginValidator,
  updateUserPreferencesValidator,
} = require("../validators/user.validator");
const { authorizeUser } = require("../middleware/user.middleware");
const { validateRequestSchema } = require("../validators/ValidateRequestSchema");
const router = express.Router();

router
  .route("/signup")
  .post(userRegistrationValidator, validateRequestSchema, userRegistration);
router
  .route("/login")
  .post(userLoginValidator, validateRequestSchema, userLogin);
router
  .route("/preferences")
  .get(authorizeUser, getUserNewsPreference)
  .put(authorizeUser, updateUserPreferencesValidator, updateUserNewsPrefernces);

module.exports = router;
