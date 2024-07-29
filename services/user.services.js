const { users } = require("../data");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

class AuthUserServices {
  findUserByEmail(email) {
    return users.find((item) => item.email === email);
  }

  findUserById(id) {
    return users.find((item) => item.id === id);
  }

  validatePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  IssueToken(payload) {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });
  }

  updatePrefernces(preferences, email) {
    users.forEach((item) => {
      if (item.email === email) {
        item.preferences = preferences;
      }
    });
    return users.find((item) => item.email === email);
  }
}

const AuthUserService = new AuthUserServices();

module.exports = AuthUserService;
