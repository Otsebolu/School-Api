const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth")
const adminController = require("./adminController");
const validateFn = require("../middlewares/validationFn");
const adminLogin = require("./adminValidation");

router.post("/login", adminController.login);
router.post("/create-admin", adminController.createAdmin);
router.post("/logout", middleware.authenticateUser, adminController.logOut);

module.exports = router;
