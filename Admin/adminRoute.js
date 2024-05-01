const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth") //import <auth> file in another folder<middleware>=middlewares/auth>=file in another folder
const adminController = require("./adminController"); //import <adminController> in same folder
const adminLogin = require("./adminValidation");
const validateFn = require("../middlewares/validationFn");

router.post("/login",validateFn(adminLogin), adminController.login);  //import <login function > from adminController.js
router.post("/logout", middleware.authenticateUser, adminController.logOut); // IMPORT <authenticateUser> FROM <middlewares/auth>, import  logOut function from adminController.js 
router.delete("/delete", adminController.DeleteAdmin)//By Rose
router.get("/all-admins",adminController.getAllAdmins)//By Rose
router.post("/signup-admin", adminController.register)//By Rose
router.post("/update-admin",adminController.UpdateAdmin)//Rose
module.exports = router;
