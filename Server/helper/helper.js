const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

class Helper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET);
  }

  static verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}

module.exports = Helper;
