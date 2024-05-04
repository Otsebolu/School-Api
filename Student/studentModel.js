const { query } = require("express");
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
                    resolve(result[0])
                }
            })
        })
    }catch(err) {
        throw err
    }
}



//Rose, I edited David Mark's owm 
async function studentLogin(email){
    try {
        const sql= "SELECT * FROM students WHERE email = ?";
        return new Promise((resolve,reject)=>{
            dBConnection.execute(sql,[email],(err,results)=>{
            if(err){
                reject(err);
            }
            console.log(err,results)
            resolve(results[0]);
        });
    });
    } 
    catch (error) {
        throw error;  
    }
}
   


    

async function getAdminByEmail(email){
    try{
        const sql = `SELECT * FROM admins WHERE email = '${email}'`;
        return new Promise((resolve,reject)=>{
            dBConnection.execute(sql,(err,results)=>{
            if(err){
                reject(err);
            }
            console.log(err,results)
            resolve(results);
        });
    });
    }
    catch(error){
        throw error;
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


function findAStudent(email){
    try{
        const query = "SELECT * FROM students WHERE email = ? "; 
        return new Promise((resolve, reject) => {
            dBConnection.query(query, [email], (err, result) => {
                if(err){
                    reject(err)
                }else{
                    console.log(err,result)
                    resolve(result)  
                } 
            })           
        })  
    }catch(err) {
        throw err;
    }
}

function deleteStudent(email){
    try {
        const query = "DELETE FROM students WHERE email = ?";
        return new Promise((resolve, reject) => {
            dBConnection.execute(query, [email],(err,result) =>{
                if(err) {
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }catch (err) {
        throw err;
    }
} 

function updateStudent(email){
    try{
        const sql = `
            UPDATE students(email) 
            VALUES('${email}')`;
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


module.exports={createStudent,registerCourse, getStudentEmail, fetchAllStudents, studentLogin, findAStudent, deleteStudent, updateStudent}