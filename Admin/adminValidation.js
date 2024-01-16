const joi = require("joi");

const adminLogin = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
});

module.exports = adminLogin;