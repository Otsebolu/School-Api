const express = require("express");
require('dotenv').config();

//database connection
const db = require("./config/db");

//logger-file
const logger = require("./utils/logger");

// routes
const adminRoutes = require("./Admin/adminRoute");
// const courseRoutes = require("./Course/courseRoute");

//server-instance
const server = express();
server.use(express.json());

server.use('/api/admin', adminRoutes);
// server.use('/api/course', courseRoutes);

server.use((req, res, next) => {
    next(`${req.url} PAGE NOT FOUND`);
})

server.use((err, req, res, next) => {
    res.status(400).json({ error: err });
})

const port = process.env.PORT || 8000;

db.connect((err) => {
    if (err) {
        console.error('Error Connecting: ' + err.stack);
        return;
    }
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});