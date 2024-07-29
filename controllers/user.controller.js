const { v4: uuidv4 } = require("uuid");
const AuthUserServices = require("../services/user.services");
const { NotFoundError, ValidationError } = require("../utils/custom-error");
const errorCodes = require("../utils/error-codes");
const { users } = require("../data");
const asyncHandler = require("express-async-handler");

// error thrown using throw keyword in synchronous code is automatically handled by express and pass it down to error middleware in app
// error thrown in async code must be handle either by passing error in next argument and if you are using throw keyword then express will not pass down that error to error middleware so either you can write your own code layer to handle it or you can use express-async-handle library which pass the error down to error middleware

const userRegistration = asyncHandler(async (req, res, next) => {
  const { name, password, email, preferences } = req.body;

  if (AuthUserServices.findUserByEmail(email)) {
    next(
      new ValidationError({
        code: errorCodes.VALIDATION_ERROR,
        message: "Email already exist",
      })
    );
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
});

const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = AuthUserServices.findUserByEmail(email);

  console.log(user, "user");

  if (!user) {
    console.log("user not found");

    throw new NotFoundError({
      code: errorCodes.USER_NOT_FOUND,
      message: "User not found",
    });
  }

  const validatePassword = await AuthUserServices.validatePassword(
    password,
    user.password
  );

  console.log(validatePassword, "validatePass");

  if (!validatePassword) {
    new ValidationError({
      code: errorCodes.VALIDATION_ERROR,
      message: "Incorrect password",
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
});

const getUserNewsPreference = (req, res, next) => {
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

const updateUserNewsPrefernces = (req, res, next) => {
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
