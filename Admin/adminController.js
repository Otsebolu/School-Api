function login(req, res) {
  // ...
  if (req.body.password === 'admin') {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
  // ...
}


function logOut(req, res) {
  // ...
  req.session.admin = false;
  res.redirect('/login');
  // ...
}

module.exports = {login,logOut}