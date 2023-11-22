const Auth = require("../models/auth");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await Auth.authenticateUser(email, password);

    if (user) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        status: "Success",
        message: "Login successful",
        jwt: token,
      });
    } else {
      next(new ApiError("Email or password does not match", 401));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  loginUser,
};
