const router = require("express").Router();
const Auth = require("../controller/authController");

router.get("/login", Auth.loginUser);

module.exports = router;
