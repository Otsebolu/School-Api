const dBConnection = require("../config/db");

async function createCourse(course_data){
    try{
        const sql = `SELECT * FROM courses WHERE course_code = '${course_data.course_code}'`;
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

async function getCourse(course_data){
    try{
       const sql = `SELECT * FROM courses WHERE course_name = '${course_data.course_name}' `
       return new Promise((resolve,reject)=>{
        dBConnection.execute(sql,(err,results)=>{
        if(err){
            reject(err);
        }
        resolve(results);
    });
});
    }catch(error){
        throw error;
    }
}




















module.exports={createCourse};