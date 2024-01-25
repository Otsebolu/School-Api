const express = require("express");
const router = express.Router();
const courseController = require("./courseController");

// router.post("/",courseController.createCourse);
// router.get("/:name",courseController.getCourse);
// router.get("/",courseController.getCourses);
// router.delete("/:name", middleware.authorize("admin"), courseController.deleteCourse);
// router.put("/:name",courseController.updateCourse);

module.exports = router;

//req.params :/:name req.params.name
//req.query ?name=ahmed 
// req and res on mozila docs

//req.query.q