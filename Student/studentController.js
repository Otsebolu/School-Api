const studentModel = require("./studentModel");
const jwt = require("../utils/jwtFn");
const bcrypt = require("../utils/bcryptFn");

async function register(req,res){
    try{
        const {first_name, last_name, age, email,password,dob} = req.body;
        await studentModel.createStudent(email,password,dob, first_name, last_name, age);
        // const token = jwt.generateToken({email:email,role:"student"});
        // res.header('Authorization',`Bearer ${token}`);
        res.status(200).json({
            message:"Student Registered Successfully",
        });
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

//David-Dada
async function signIn(req, res) {
    const { email } = req.body
    try {
        const user = await studentModel.getStudentEmail(email);
        if(!user) {
            res.status(400).json({
                message: "Students record not found."
            })
        }

        return res.status(200).json({
            student: user,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Internal server error [Login]"})
    }
}

// David-Dada
async function getAllStudents(req, res) {
    try {
        const students = await studentModel.fetchAllStudents();
        res.status(200).json({ message: "All the students", data: students})
    }catch(err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error [fetch students]"})
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

module.exports={register,registerCourse, signIn, getAllStudents};