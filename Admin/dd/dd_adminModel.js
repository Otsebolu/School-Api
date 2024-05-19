const dbConn = require("../../config/db")

// 1. Create admin
// 2. Create courses.
function createAdmin(data) {
    const sql = `INSERT INTO admins (email, password) VALUES (?, ?)`
    const valuesToInsert = [data.email, data.password]

    return new Promise((resolve, reject) => {
        dbConn.execute(sql, valuesToInsert, async (err, result) => {
            if(err){
                reject(err)
            }else{
                const admin = await findAdminByEmail(data.email)
                resolve(admin)
            }
        })
    })
}

function createCourses(data) {
    const sql = `INSERT INTO courses (course_title, course_code, course_units,course_description,admin_id)
                VALUES (?, ?, ?, ?, ?)`
    const valuesToInsert = [data.title, data.code, data.units, data.description, data.admin_id]
    return new Promise((resolve, reject) => {
        dbConn.execute(sql, valuesToInsert, async (err, result) => {
            if(err){
                reject(err)
            }else{
                const course = await findCourseByCourseTitle(data.title)
                resolve(course)
            }
        })
    })
}

function findAdminByEmail(email) {
    const sql = `SELECT * FROM admins WHERE email = ?`
    const valueToSelect = email;
    return new Promise((resolve, reject) => {
        dbConn.execute(sql, [valueToSelect], (err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result[0])
            }
        })
    })

}

function findCourseByCourseCode(code) {
    const sql = `SELECT * FROM courses WHERE course_code = ?`
    const valueToSelect = [code]
    return new Promise((resolve, reject) => {
        dbConn.execute(sql, valueToSelect, (err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result[0])
            }
        })
    })
}

function findCourseByCourseTitle(title) {
    const sql = `SELECT * FROM courses WHERE course_title = ?`;
    const valueToSelect = [title]
    return new Promise((resolve, reject) => {
        dbConn.execute(sql, valueToSelect, (err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result[0])
            }
        })
    })
}

function findCoursesCreatedByAdmin(adminID) {
    const sql = `SELECT * FROM courses WHERE admin_id = ?`
    const valueToSelect = [adminID];

    return new Promise((resolve, reject) => {
        dbConn.execute(sql, valueToSelect,  (err, result) => {
            if(err) {
                reject(err)
            }else {
                resolve(result)
            }
        })
    })
}

module.exports = { 
    createAdmin, 
    createCourses, 
    findAdminByEmail,
    findCourseByCourseCode,
    findCourseByCourseTitle,
    findCoursesCreatedByAdmin
}