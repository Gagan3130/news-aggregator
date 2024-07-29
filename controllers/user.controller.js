const { v4: uuidv4 } = require("uuid");
const AuthUserServices = require("../services/user.services");
const { NotFoundError, ValidationError } = require("../utils/custom-error");
const errorCodes = require("../utils/error-codes");
const { users } = require("../data");

const userRegistration = async (req, res) => {
  const { name, password, email, preferences } = req.body;

  if (AuthUserServices.findUserByEmail(email)) {
    // throw new ValidationError({
    //   code: errorCodes.VALIDATION_ERROR,
    //   message: "Email already exist",
    // });
    return res.status(400).json({
      error: "Email already exist",
      code: "VALIDATION_ERROR",
    });
  }

  const user = {
    id: uuidv4(),
    name,
    password: await AuthUserServices.hashPassword(password),
    preferences,
    email,
    createdAt: Date.now(),
  };
  users.push(user);
  return res.status(201).send("User registered Successfully");
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = AuthUserServices.findUserByEmail(email);

  console.log(user, "user");

  if (!user) {
    console.log("user not found");
    // throw new NotFoundError({
    //   code: errorCodes.USER_NOT_FOUND,
    //   message: "User not found",
    // });
    return res.status(404).json({
      error: "User not found",
      code: errorCodes.USER_NOT_FOUND,
    });
  }

  const validatePassword = await AuthUserServices.validatePassword(
    password,
    user.password
  );

  console.log(validatePassword, "validatePass");

  if (!validatePassword) {
    // throw new ValidationError({
    //   code: errorCodes.VALIDATION_ERROR,
    //   message: "Incorrect password",
    // });
    return res.status(400).json({
      error: "Incorrect password",
      code: errorCodes.VALIDATION_ERROR,
    });
  }

  return res.status(200).json({
    token: AuthUserServices.IssueToken({ id: user.id, email: user.email }),
    id: user.id,
    name: user.name,
    email: user.email,
    preferences: user.preferences,
    createdAt: user.createdAt,
  });
};

const getUserNewsPreference = (req, res) => {
  const { id } = req.user;

  const user = AuthUserServices.findUserById(id);

  console.log(user, "user");

  if (!user) {
    throw new NotFoundError({
      code: errorCodes.USER_NOT_FOUND,
      message: "USer not found",
    });
  }

  return res.status(200).json(user.preferences);
};

const updateUserNewsPrefernces = (req, res) => {
  const { email } = req.user;
  const { preferences = [] } = req.body;

  const response = AuthUserServices.updatePrefernces(preferences, email);

  console.log(response);

  return res.status(200).json({
    id: response.id,
    name: response.name,
    email: response.email,
    preferences: response.preferences,
  });
};

module.exports = {
  userRegistration,
  userLogin,
  getUserNewsPreference,
  updateUserNewsPrefernces,
};
