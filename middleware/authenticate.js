const jwt = require("jsonwebtoken");
const Auth = require("../models/auth");
const ApiError = require("../utils/apiError");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return next(new ApiError("Token doesn't exist", 401));
    }

    const token = bearerToken.split("Bearer ")[1];

    if (!token) {
      return next(new ApiError("Invalid token format", 401));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.geUsertById(payload.userId);

    if (!user) {
      return next(new ApiError("User not found", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ApiError(err.message, 500));
  }
};
