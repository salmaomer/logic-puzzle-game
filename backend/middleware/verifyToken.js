require("dotenv").config(); 
const jwt = require('jsonwebtoken');

function RouteGuard(req, res, next) {
   
    const authHeader = req.headers["authorization"];
    const tokenFromHeader = authHeader ? authHeader.split(" ")[1] : null;
    const tokenFromQuery = req.query.token;

    const token = tokenFromHeader || tokenFromQuery;
    
    if (!token) {
        return res.status(401).send("No token provided, Access Denied");
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;

        next();
    } catch (error) {
        return res.status(403).send("Invalid or expired token");
    }
}

module.exports = RouteGuard;
