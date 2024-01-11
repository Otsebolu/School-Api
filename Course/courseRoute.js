const express = require("express");
const router = express.Router();
const courseController = require("./courseController");

router.post("/course",courseController.createCourse);
router.get("/course/:name",courseController.getCourse);
router.get("/course",courseController.getCourses);
router.delete("/course/:name",courseController.deleteCourse);
router.put("/course/:name",courseController.updateCourse);

module.exports = router;