const dBConnection = require("../config/db");

async function getAdminByEmail(email){
    try{
        const sql = `SELECT * FROM admin WHERE email = '${email}'`;
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

module.exports = {getAdminByEmail}