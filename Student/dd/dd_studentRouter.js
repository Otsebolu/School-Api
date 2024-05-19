const { Router } = require('express')
const studentController = require('./dd_studentController');

const studentRouter = Router()


studentRouter
    .post('/', studentController.createNewStudent)


module.exports = { 
    studentRouter,
}