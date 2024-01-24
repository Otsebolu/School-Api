const courseModel = require("./courseModel");

function createCourse(req,res){
    try{
    const { name,course_code,course_units}=req.body;
    if(courseModel.getCourse(course_name)){
        res.status(400).json({message:"Course exists already"});
    }
    courseModel.createCourse(name,course_code,course_units)}
    catch(err){
        res.status(400).json({message:"Error creating course",error:err});
    }    
}
