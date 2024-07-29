const { UnAuthorisedError } = require("../utils/custom-error");
const errorCodes = require("../utils/error-codes");
const jsonwebtoken = require("jsonwebtoken");

const authorizeUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || 'Bearer ';
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        error: "Access Denied",
        code: errorCodes.ACCESS_DENIED,
      });
    }

    const payload =  jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload
    next();
  } catch (error) {
    throw new UnAuthorisedError({
      code: errorCodes.UNAUTHORISED,
      message: "Token is invalid or expired",
    });
  }
};

module.exports = { authorizeUser };
