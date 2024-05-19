const dbConn = require('../../config/db')

// create a student
// assign a course to a student.

function createStudent(data) {
    const sql = `INSERT INTO students (email, password, dob, first_name, last_name, age) 
                VALUES (?,?,?,?,?,?)`;
    const valuesToInsert = [
        data.email,
        data.password,
        new Date(data.dob),
        data.first_name,
        data.last_name,
        data.age
    ]

    console.log(valuesToInsert)

    return new Promise((resolve,reject) => {
        dbConn.execute(sql, valuesToInsert, async (err, result) => {
            if(err){
                reject(err)
            }else{
                // we need to fetch the student data after inserting.
                const student = await findStudentByEmail(data.email)
                resolve(student)
            }
        })
    })
}

function findStudentByEmail(email) {
    const sql = `SELECT * FROM students WHERE email = ?`
    const valuesToSelect = [email]

    return new Promise((resolve, reject) => {
        dbConn.execute(sql, valuesToSelect, (err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result[0])
            }
        })
    })
}

module.exports = {
    createStudent,
    findStudentByEmail,
}