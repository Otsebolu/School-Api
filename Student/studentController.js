const studentModel = require("./studentModel");
const jwt = require("../utils/jwtFn");
const bcrypt = require("../utils/bcryptFn");

async function register(req,res){
    try{
        let {first_name, last_name, age, email,password,dob} = req.body;
        password = await bcrypt.hashPassword(password)
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
//this is not correct for signin function
async function signIn(req, res) {
    const { email, password } = req.body
    try {
        const stduser = await studentModel.studentLogin(email);
        if(!stduser) {
            return res.status(400).json({message: "Student's record not found."})
        }

        const isMatch = await bcrypt.comparePassword(password, stduser.password); //which of the 2 pw is for the DB and for the new one just put in?
        if(!isMatch){
          res.status(400).json({message:"Invalid Password"})
        }
        const token = jwt.generateToken({email:stduser.email});
        res.header("Authorization",`Bearer ${token}`);
        res.status(200).json({message:"Login Successfull", data: `Bearer ${token}`});
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