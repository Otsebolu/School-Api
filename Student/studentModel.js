const dBConnection = require("../config/db");
const courseModel = require("../Course/courseModel");

function createStudent(email,password,dob){
    try{
        const sql = `INSERT INTO students(email,password,dob) VALUES('${email}','${password}','${dob}')`;
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

module.exports={createStudent,registerCourse}