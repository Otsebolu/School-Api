const jwt = require('jsonwebtoken');
require("dotenv").config();

//jwt-generateToken
function generateToken(payload){
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
}

//jwt-verifyToken
function verifyToken(token){
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
      } catch(err) {
        throw new Error(err);
      }
}

module.exports = {
    generateToken,
    verifyToken
}