const JWT = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}

module.exports = authMiddleware;