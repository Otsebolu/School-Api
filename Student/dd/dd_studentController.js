const studentModel = require('./dd_studentModel');
const bcrypt = require('../../utils/bcryptFn')

async function createNewStudent(req, res) {
    const { first_name, last_name, age, dob, email, password } = req.body;

    try{
        // check if student email already exists.
        const studentExists = await studentModel.findStudentByEmail(email);
        if(studentExists) {
            res.status(400).json({ message: "Student with email already exists."})
            return;
        }
        
        // hash user password
        const hashedPassword = await bcrypt.hashPassword(password)
        // create the new student

        const data = {
            first_name: first_name,
            last_name: last_name,
            age: age,
            password: hashedPassword,
            dob: dob,
            email: email,
        }
        const newStudent = await studentModel.createStudent(data)
        // remove password from response data so that it does not show
        // to the frontend because they're not supposed to see it.
        delete newStudent.password
        // return the newly created student to the frontend
        res.status(201).json({ 
            message: "New student created",
            student: newStudent,
        });
    }catch(err) {
        console.log(err);
        res.status(200).json({ message: "Internal server error."})
    }
}

module.exports = { 
    createNewStudent,
}