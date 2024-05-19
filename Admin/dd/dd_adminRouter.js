const { Router } = require('express')
const adminController = require('./dd_adminController')

const adminRouter = Router();

adminRouter
    .post('/', adminController.createNewAdmin)
    .get("/:id/courses", adminController.getAdminCourses)
    .post('/new-course', adminController.createCourse)

module.exports = { adminRouter }