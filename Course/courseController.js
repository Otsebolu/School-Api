const courseModel = require("./courseModel");

function createCourse(req, res) {
  try {
    const { course_title, course_code, course_units, course_description } =
      req.body;
    const course = courseModel.getCourse(course_title);
    if (course) {
      res.status(400).json({ message: "Course exists already" });
    }
    const createdCourse = courseModel.createCourse({
      course_title,
      course_code,
      course_units,
      course_description}
    );
    res.status(200).json({message:"Course Created successfully",data:createdCourse})
  } catch (err) {
    res.status(500).json({ message: "Error creating course", error: err });
  }
}

function getAllCourses(req,res){
    try{
        const courses = courseModel.getAllCourses();
        res.status(200).json({courses});
    }
    catch(err){
        res.status(500).json({message:"Error fetching courses",error:err});
    }
}



























module.exports={createCourse};