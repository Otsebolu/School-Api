const express = require("express");
const router = express.Router();
const teacherController = require("./teacherController");
const {authenticateUser ,authorizeUser} = require("../middlewares/auth");

router.post("/register", teacherController.registerTeacher);
router.post("/login", teacherController.loginTeacher);
router.post("/logout", authenticateUser, teacherController.logoutTeacher);
// router.get("/", teacherController.getTeachers);
// router.get("/:email", authenticateUser, teacherController.getTeacher);
// router.put("/", authenticateUser, authorizeUser('teacher'),teacherController.updateTeacher);
// router.delete("/",authenticateUser, authorizeUser("admin"), teacherController.deleteTeacher);

module.exports = router;