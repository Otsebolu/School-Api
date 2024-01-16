const express = require("express");
require('dotenv').config();
//logger-file
const logger = require("./utils/logger");

//database connection
const db = require("./config/db");

//server-instance
const server = express();
server.use(express.json());

// routes
const adminRoutes = require("./Admin/adminRoute");
// const studentRoutes = require("./Student/studentRoute.js");
// const courseRoutes = require("./Course/courseRoute");
// const teacherRoutes = require("./Teacher/teacherRoute");

server.use('/admin',adminRoutes);
// server.use("/api",studentRoutes)
// server.use("/api",courseRoutes)
// server.use("/api",teacherRoutes)


server.use((req,res,next)=>{
    next(`${req.url} PAGE NOT FOUND`);
})

server.use((err,req,res,next)=>{
    console.log(err);
    res.status(400).json({error:err});
})

const port = process.env.PORT;

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    server.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
});