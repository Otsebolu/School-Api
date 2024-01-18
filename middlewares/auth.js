const connection = require("../config/db");
const { verifyToken } = require("../utils/jwtFn")
//Authentication middleware
const authenticateUser = (req, res, next) => {
    try {
        console.log(req.header.authorization)
        const authorizationHeader = req.header("Authorization")
        console.log({ "authorizationHeader": authorizationHeader });

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "Access denied. Token is not provided" })
        }

        const token = authorizationHeader.split(" ")[1]
        console.log({ "token": token })
        const decoded = verifyToken(token)
        console.log({ "decoded": decoded })
        const { role, email } = decoded
        let user;
        if (role === "admin") {
            user = "admin"
        } else if (role === "student") {
            user = "student"
        } else {
            user = "teacher"
        }
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" })
        }
        req.user = { role, email }
        next()
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}
//Authorization middleware
const authorizeUser = (roles) => {
    return (req, res, next) => {
        const {role} = req.user
        if (!roles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden privileges' });
        }
        next()
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}
