const express = require("express")

const { adminRouter } = require('./Admin/dd/dd_adminRouter')
const { studentRouter } = require('./Student/dd/dd_studentRouter')

const app = express();
app.use(express.json())

app.use("/admins", adminRouter)
app.use("/students", studentRouter)


const PORT = 3000
app.listen(PORT, () => {
    console.log(`DD server listening on port ${PORT}`)
})