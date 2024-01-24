const adminModel = require('./adminModel');
const jwt = require("../utils/jwtFn")
const bcrypt = require("../utils/bcryptFn")

function login(req, res) {
  try{
    const {email, password} = req.body;
    const admin = adminModel.getAdminByEmail(email);
    if(!admin){
      return res.status(400).json({message:"Invalid Email"})
    }
    const isMatch = bcrypt.comparePassword(password, admin.password);
    if(!isMatch){
      res.status(400).json({message:"Invalid Password"})
    }
    const token = jwt.generateToken({email:admin.email,role:"admin"});
    res.header("x-auth",token);
    res.status(200).json({message:"Login Successfull"});
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error",error:error.message});
  }
}



function logOut(req, res) {
  try{
    res.header['x-auth']='';
    res.status(200).json({message:"Logout Successfull"});
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error"});
  }
}


module.exports = { login, logOut}