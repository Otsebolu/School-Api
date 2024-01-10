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
const studentRoutes = require("./Student/studentRoute");
const courseRoutes = require("./Course/courseRoute");
const teacherRoutes = require("./Teacher/teacherRoute");

server.use("/api",adminRoutes)
server.use("/api",studentRoutes)
server.use("/api",courseRoutes)
server.use("/api",teacherRoutes)

const port = process.env.PORT;

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
