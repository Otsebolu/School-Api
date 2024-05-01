const mysql = require('mysql2');
require("dotenv").config();
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.dbpassword,
  database : 'school'
});

module.exports = connection;