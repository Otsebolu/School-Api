const dBConnection = require("../config/db");

function register(email,password,dob){
    try{
        const sql = `INSERT INTO teacher(email,password,dob) VALUES(${email},${password},${dob})`;
        const result = dBConnection.execute(sql);
        console.log(result);
        return result;
    }
    catch(error){
        throw error;
    }
}

function getTeacherByEmail(email){
    try{
        const sql = `SELECT * FROM teacher WHERE email = ${email}`;
        const result = dBConnection.execute(sql);
        console.log(result);
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    register,
    getTeacherByEmail
}