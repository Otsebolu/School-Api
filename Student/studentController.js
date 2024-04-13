const studentModel = require("./studentModel");
const jwt = require("../utils/jwtFn");
const bcrypt = require("../utils/bcryptFn");

function register(req,res){
    try{
        const {email,password,dob} = req.body;
        studentModel.createStudent(email,password,dob);
        const token = jwt.generateToken({email:email,role:"student"});
        res.header('Authorization',`Bearer ${token}`);
        res.status(200).json({message:"Student Registered Successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

function registerCourse(req,res){
    try{
        const {course_code} = req.body;
        const email = req.user.email
        const result = studentModel.registerCourse(course_code,email);
        if(!result){
            return res.status(400).json({message:"Invalid Course Code"});
        }
        res.status(200).json({message:"Course Registered Successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports={register,registerCourse};