const { verifyToken } = require("../utils/jwtFn");

//Authentication middleware
const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers['x-auth'];
        if(!token){
           return res.status(400).json({message:"Token not found"})
        }
        const decodedToken = verifyToken(token);
        if(!decodedToken){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const {email,role} = decodedToken;
        req.user = {email,role};
        next();
    }
    catch(error){
        res.status(500).json({ message: 'Internal Server Error',error:error.message });
    }
}

//Authorization middleware
const authorizeUser = (user) => {
    return (req, res, next) => {
        const {role} = req.user
        if (role!=user) {
            return res.status(403).json({ message: 'Forbidden privileges' });
        }
        next()
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}
