const dBConnection = require("../config/db");

function getAdminByEmail(email){
    try{
        const sql = `SELECT * FROM admin WHERE email = ${email}`;
        const result = dBConnection.execute(sql);
        console.log(result);
    }
    catch(error){
        throw error;
    }
}

module.exports = {getAdminByEmail}