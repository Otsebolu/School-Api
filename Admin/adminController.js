const adminModel = require('./adminModel');
const jwt = require("../utils/jwtFn")
const bcrypt = require("../utils/bcryptFn");
const { message } = require('./adminValidation');

//             ASSIGNMENT
//TODO: ---------------------------------
// 1. Create 'Register' for Admin
async function register(req,res){
  try{
      const {email,password} = req.body;
      await adminModel.createAdmin(email,password);
      res.status(200).json({
          message:"Admin Registered Successfully",
      });
  }
  catch(error){
      res.status(500).json({message:"Internal Server Error"});
  }
}

// 2. Create 'FetchAllAdmins' for Admin
//TODO: -----------------------------------
async function getAllAdmins(req, res){
  try{
    const admins =await adminModel.fetchAllAdmins();
    res.status(200).json({ message: "All the admins", data:admins})
  }catch(err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error [fetch admins]"})
  }
}

//3. Delete Admin
function DeleteAdmin(req, res) {
  const { email } = req.body
  adminModel.deleteAdmin(email)
  res.status(200).json({message: "Admin deleted"})
}

//4. update admin.
//hope its correct
async function UpdateAdmin(req, res) {
  try{
    const { email } = req.body
    await adminModel.updateAdmin(email)
    res.status(200).json({message: "Admin information updated"})
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Internal server error [error updating admins]"})
  }
}


//this <login>fxn is working with <getAdminByEmail> in <adminModel.js>
async function login(req, res) {
  try{
    const {email, password} = req.body; //accepting email and password
    const admin = await adminModel.getAdminByEmail(email); //send request to database

    if(!admin){
      return res.status(400).json({message:"Invalid Email"})
    }
    const isMatch = await bcrypt.comparePassword(password, admin.password);
    if(!isMatch){
      res.status(400).json({message:"Invalid Password"})
    }
    const token = jwt.generateToken({email:admin.email,role:"admin"});
    res.header("Authorization",`Bearer ${token}`);
    res.status(200).json({message:"Login Successfull"});
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error",error:error.message});
  }
}



function logOut(req, res) {
  try{
    res.setHeader("Authorization","");
    res.status(200).json({message:"Logout Successfull"});
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error"});
  }
}


module.exports = { login, DeleteAdmin, logOut, getAllAdmins, register,UpdateAdmin}