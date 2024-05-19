const adminModel = require("./dd_adminModel");
const bcrypt = require("../../utils/bcryptFn")

async function createNewAdmin(req, res) {
    const { email, password } = req.body
    try {
        // check for admin with the same email.
        const emailExists = await adminModel.findAdminByEmail(email)
        if(emailExists) {
            res.status(400).json({ message: "Duplicate credentials." })
            return;
        }

        // hash password.
        const hashPassword = await bcrypt.hashPassword(password)
        // create admin
        const data = {
            email: email,
            password: hashPassword
        }
        const newAdmin = await adminModel.createAdmin(data)
        delete newAdmin.password
        // return result.
        res.status(201).json({ 
            message: "Admin created",
            admin: newAdmin,
        })
    }catch(err) {
        console.log(err);
        res.status(500).json({ message: "Interval server error." })
    }
}

async function createCourse(req, res) {
    const { title, code, units, description, adminID } = req.body;
    try {
        // check if a course already has this course code
        const courseWithCourseCode = await adminModel.findCourseByCourseCode(code)
        if(courseWithCourseCode) {
            res.status(400).json({ message: "Course code must be unique" })
            return;
        }

        // check if a course already has this course title
        const courseWithCourseTitle = await adminModel.findCourseByCourseTitle(title);
        if(courseWithCourseTitle) {
            res.status(400).json({ message: "Course exists."})
            return;
        }

        // create the course
        const data = {
            title: title,
            code: code,
            units: units,
            description: description,
            admin_id: adminID
        }
        const newCourse = await adminModel.createCourses(data)

        // return the response.
        res.status(201).json({
            message: "Course created",
            course: newCourse
        })

    }catch(err) {
        console.log(err)
        res.status(500).json({ message: "Interval server error."})
    }
}

async function getAdminCourses(req, res) {
    const adminID = req.params.id
    try {
        const adminCourses = await adminModel.findCoursesCreatedByAdmin(adminID)
        res.status(200).json({
            message: "All courses created by admin",
            courses: adminCourses,
        })
    }catch(err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { 
    createNewAdmin, 
    createCourse,
    getAdminCourses
 }