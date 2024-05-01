const dBConnection = require("../config/db");

//2. fetch all admins
function fetchAllAdmins(){
    try{
        const query = "SELECT * from admins";
        return new Promise((resolve, reject) =>{
            dBConnection.query(query, (err, result) => {
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }

            })
        })
    }catch (err) {
        throw(err)
    }
}

//1. Create 'Register' for Admin
function createAdmin(email, password){
    try{
        const sql = `
            INSERT INTO admins(email,password) 
            VALUES('${email}','${password}')`;
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

// 3. Create 'delete' for Admin
function deleteAdmin(email){
    const query = "DELETE from admins where email = ?"
    try {
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
        throw err
    }
} 

//4. update admin
//hope this is correct?
function updateAdmin(email){
    try{
        const sql = `
            UPDATE admins(email) 
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

//check if this is correct please?
//shd <async> be here?

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

module.exports = {getAdminByEmail, deleteAdmin,fetchAllAdmins,createAdmin,updateAdmin}