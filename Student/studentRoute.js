const express = require("express");
const router = express.Router();
const studentController = require("./studentController");
const {authorizeUser,authenticateUser} = require("../middlewares/auth");


router.post("/register",studentController.register);
router.post("/login",studentController.login);
router.post("/logout",authenticateUser,studentController.logout);
router.post("/register-Course",authenticateUser,authorizeUser('student'),studentController.registerCourse);
router.delete("/drop-Course",authenticateUser,authorizeUser('student'),studentController.dropCourse);

module.exports = router;