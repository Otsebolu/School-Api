const express = require("express");
const router = express.Router();
const studentController = require("./studentController");
const {authorizeUser,authenticateUser} = require("../middlewares/auth");
const validateFn = require("../middlewares/validationFn");
const {studentRegistration, studentLogin} = require("./studentValidation")

router.post("/register",validateFn(studentRegistration),studentController.register);
router.post("/login",validateFn(studentLogin),studentController.signIn);

// David-Dada
router.get("/all-students", studentController.getAllStudents)
//Roselyn
router.get("/findstd", studentController.findStudent)
router.get('/delete',  studentController.DeleteStudent)
router.put("/update", studentController.UpdateStudent)
// router.post("/logout",authenticateUser,studentController.logout);
// router.post("/register-Course",authenticateUser,authorizeUser('student'),studentController.registerCourse);
// router.delete("/drop-Course",authenticateUser,authorizeUser('student'),studentController.dropCourse);

module.exports = router;

