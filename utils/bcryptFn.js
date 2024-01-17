const bcrypt = require('bcrypt');

//hash-password
async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword;
}

//compare-password
async function comparePassword(password,hashPassword){
    const comparedPassword = await bcrypt.compare(password,hashPassword);
    return comparedPassword;
}

module.exports = {
    hashPassword,
    comparePassword
}