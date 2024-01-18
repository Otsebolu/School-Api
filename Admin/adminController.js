const adminModel = require('./adminModel');
const connection = require("../config/db")
const jwt = require("../utils/jwtFn")

function login(req, res) {
  try {
    const { email, password } = req.body;

    connection.query(
      'SELECT * FROM admin WHERE email = ? AND password = ?',
      [email, password],
      (error, results) => {
        if (error) {
          console.error('Invalid email or password:');
          return res.status(500).json({ success: false, error: 'Invalid email or password' });
        }

        if (results.length > 0) {
          const token = jwt.generateToken({ role : "admin", email})
          console.log({"token" : token})
          res.json({ success: true, message: 'Login successful', data: results[0], token });
        } else {
          res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}



function logOut(req, res) {
  // ...
  req.session.admin = false;
  res.redirect('/login');
  // ...
}

const createAdmin = async (req, res) => {
  try {
    connection.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `, (createTableError, createTableResults) => {
      if (createTableError) {
        console.error('Error creating admin table:', createTableError);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        return;
      }
      const { name, email, role, password } = req.body;
      connection.query(
        'INSERT INTO admin (name, email, role, password) VALUES (?, ?, ?, ?)',
        [name, email, role, password],
        (insertError, insertResults) => {
          if (insertError) {
            console.error('Error inserting admin record:', insertError);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          } else {
            res.json({ success: true, data: insertResults });
          }
        }
      );
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = { login, logOut, createAdmin }