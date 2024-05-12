const joi = require("joi");

const studentRegistration = joi.object({
    first_name:joi.string().required(),
    last_name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    age:joi.number().required(),
    dob:joi.date()
})

const studentLogin = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})

//course
//course code, student email, 

module.exports = {studentLogin , studentRegistration};