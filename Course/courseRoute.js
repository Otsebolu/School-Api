const express = require("express");
const router = express.Router();
const courseController = require("./courseController");
const {authorizeUser,authenticateUser} = require("../middlewares/auth")


router.post("/",authenticateUser,authorizeUser('admin'),courseController.createCourse);
router.get("/:title",courseController.getCourse);
router.get("/",courseController.getCourses);
router.delete("/:name", middleware.authorize("admin"), courseController.deleteCourse);
router.put("/:name",courseController.updateCourse);

module.exports = router;

//req.params :/:name req.params.name
//req.query ?name=ahmed 
// req and res on mozila docs
req.params.title
//req.query.q


const courseTitle =  req.params.title;
courseModel.getCourse(courseTitle);
swql