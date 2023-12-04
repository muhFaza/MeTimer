const Helper = require("../helper/helper");
const { User } = require("../model/index");

class UserController {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!email || !password) {
        throw {
          name: "INVALID_INPUT",
          message: "Missing one or more input in post register",
        };
      }

      const userData = {
        firstName,
        lastName,
        email,
        password: Helper.hashPassword(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Validate for unique username and email
      const newUser = await User.findOrCreate(email, userData);
      // console.log(newUser, "<<new user");
      if (!newUser) {
        throw {
          name: "ALREADY_EXIST",
          message: "Username or email already exist",
        };
      }
      console.log(newUser);
      res
        .status(201)
        .json({ message: "New user successfully created", id: newUser });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "INVALID_INPUT",
          message: "Missing email in post login",
        };
      }
      if (!password) {
        throw {
          name: "INVALID_INPUT",
          message: "Missing password in post login",
        };
      }
      const user = await User.findByEmail(email);
      if (!user) {
        throw {
          name: "INVALID_CREDENTIAL",
          message: "Email or password is incorrect",
        };
      }
      const isValidPassword = Helper.comparePassword(password, user.password);
      if (!isValidPassword) {
        throw {
          name: "INVALID_CREDENTIAL",
          message: "Email or password is incorrect",
        };
      }
      const payload = {
        id: user._id,
        email: user.email,
      };

      const access_token = Helper.generateToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getUserDetail(req, res, next) {
    const { id } = req.user;
    try {
      const user = await User.findByPk(id);
      res.send(user);
    } catch (error) {
      console.log(err);
    }
  }
}

module.exports = UserController;
