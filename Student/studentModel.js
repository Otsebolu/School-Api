const dBConnection = require("../config/db");
const courseModel = require("../Course/courseModel");

function createStudent(email,password,dob, first_name, last_name, age){
    try{
        const sql = `
            INSERT INTO students(email,password,dob, first_name,last_name,age) 
            VALUES('${email}','${password}','${dob}', '${first_name}', '${last_name}', '${age}')`;
        return new Promise((resolve,reject)=>{
            dBConnection.execute(sql,(err,results)=>{
            if(err){
                reject(err);
            }
            resolve(results);
        });
    });
    }
    catch(error){
        throw new Error(error)
    }
}

function registerCourse(course_code,email){
    try{
        const course = courseModel.getCourseByCode(course_code);
        if(!course){
            return false;
        }
        const sql = `INSERT INTO registered_courses(course_code,email) VALUES('${course_code}','${email}')`;
        return new Promise((resolve,reject)=>{
            dBConnection.execute(sql,(err,results)=>{
            if(err){
                reject(err);
            }
            resolve(results[0]);
        });
    });
    }
    catch(error){
        throw error;
    }
}

// David-Dada
// Hint: [Use this for delete request but change the query]
function getStudentEmail(email) {
    const query = "SELECT * FROM students WHERE email = ?"
    try {
        return new Promise((resolve, reject) => {
            dBConnection.execute(query, [email], (err, result) => {
                if(err) {
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }catch(err) {
        throw err
    }
}

// David-Dada
function fetchAllStudents() {
    try{
        const query = "SELECT * FROM students";
        return new Promise((resolve, reject) => {
            dBConnection.query(query, (err, result) => {
                if(err){
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    }catch(err) {
        throw err;
    }
}

module.exports={createStudent,registerCourse, getStudentEmail, fetchAllStudents}