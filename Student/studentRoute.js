const express = require("express");
const router = express.Router();
const studentController = require("./studentController");

router.post("/student/register-Course",studentController.registerCourse);
router.delete("/student/drop-Course",studentController.dropCourse);