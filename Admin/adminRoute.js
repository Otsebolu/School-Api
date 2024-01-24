const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth")
const adminController = require("./adminController");

router.post("/login", adminController.login);
router.post("/logout", middleware.authenticateUser, adminController.logOut);

module.exports = router;
