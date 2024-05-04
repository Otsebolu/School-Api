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
//Done by Roselyn, edited by David Dada
async function signIn(req, res) {
    const { email, password } = req.body     //GETTING EMAIL, PW FROM USER (OUTSIDE WORLD)
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

//find a student
async function findStudent(req, res){
    const { email } = req.body
    try{
        const std = await studentModel.findAStudent(email);
        res.status(200).json({ message: "Found the students", data: std})
    }catch(err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error [fetch students]"})
    }   
}


//3. Delete student
async function DeleteStudent(req, res) {
    const { email } = req.body
    try{
        const std = await studentModel.findAStudent(email)
        console.log("std", std)
        if(std) {
            const std1 = await studentModel.deleteStudent(email);
            res.status(200).json({message: "Student deleted", data: std1})
        }else {
            res.status(400).json({ message: "Student not found."})
        }
        
    }catch(err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error [deleting students]"})
    }
}


  //
//4. update student.
//hope its correct
async function UpdateStudent(req, res) {
    try{
      const { email } = req.body
      await studentModel.updateStudent(email)
      res.status(200).json({message: "Admin information updated"})
    }catch(err){
      console.log(err)
      res.status(500).json({ message: "Internal server error [error updating admins]"})
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

module.exports={register,registerCourse, signIn, getAllStudents, findStudent, DeleteStudent, UpdateStudent};