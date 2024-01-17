const adminModel = require('./adminModel');

function login(req, res) {
  // ...
  res.status(200).send("OK");
  // ...
}


function logOut(req, res) {
  // ...
  req.session.admin = false;
  res.redirect('/login');
  // ...
}

module.exports = {login,logOut}